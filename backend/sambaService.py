import io
import os
from smb.SMBConnection import SMBConnection
from smb.smb_structs import OperationFailure
from smb.smb_constants import SMB_FILE_ATTRIBUTE_DIRECTORY, SMB_FILE_ATTRIBUTE_NORMAL
from smb.base import SharedFile
import logger
import pathlib
import typing


class SambaFile(typing.BinaryIO):
    def __init__(self, conn: SMBConnection, share_name: str, path: pathlib.Path, mode: str = 'r'):
        self.conn: SMBConnection = conn
        self.share_name: str = share_name
        self.path: pathlib.Path = path
        self._mode: str = mode
        try:
            self.attrs: SharedFile = self.conn.getAttributes(
                self.share_name, str(self.path))
        except OperationFailure as e:
            # suppose the file not exist
            if 'x' in self.mode or 'w' in self.mode:
                self.conn.storeFile(self.share_name, str(
                    self.path), io.BytesIO(b''))

        self.seek_pos = 0

    @property
    def mode(self) -> str:
        return self._mode

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

    def seek(self, offset: int, whence: int = os.SEEK_SET) -> int:
        if whence == os.SEEK_SET:
            self.seek_pos = offset
        elif whence == os.SEEK_CUR:
            self.seek_pos += offset
        elif whence == os.SEEK_END:
            self.seek_pos = self.attrs.file_size + offset
        return self.seek_pos

    def tell(self) -> int:
        return self.seek_pos

    def readable(self) -> bool:
        return 'r' in self.mode

    def writable(self) -> bool:
        return 'w' in self.mode

    def seekable(self) -> bool:
        return True

    def read(self, size: int = -1) -> bytes:
        try:
            if self.attrs.isDirectory:
                raise IsADirectoryError(f"Is a directory: {self.path}")
            buffer = io.BytesIO()
            self.conn.retrieveFileFromOffset(self.share_name, str(
                self.path), buffer, self.seek_pos, size, timeout=114514)
            buffer.seek(0)
            data = buffer.read(size)
            self.seek_pos += len(data)
            return data
        except OperationFailure as e:
            logger.Logger.log(f"Failed to read file {self.path}: {e}")
            raise e
        except Exception as e:
            logger.Logger.log(f"Failed to read file {self.path}: {e}")
            raise e

    def write(self, data: bytes) -> int:
        try:
            if 'w' not in self.mode:
                raise io.UnsupportedOperation("File not opened for writing")
            buffer = io.BytesIO(data)
            self.conn.storeFileFromOffset(self.share_name, str(
                self.path), buffer, self.seek_pos, timeout=114514)
            self.seek_pos += len(data)
            return len(data)
        except OperationFailure as e:
            logger.Logger.log(f"Failed to write file {self.path}: {e}")
            return 0
        except Exception as e:
            logger.Logger.log(f"Failed to write file {self.path}: {e}")
            return 0

    def close(self):
        self.conn.close()


class SambaService:
    def __init__(self, server_name, share_name, user_id, password, use_ntlm_v2=True, is_direct_tcp=True, is_encrypted=False, is_derived=False):
        """
        Initialize a SambaService object.

        Args:
            server_name (str): The name of the SMB server.
            share_name (str): The name of the SMB share.
            user_id (str): The user ID to use for authentication.
            password (str): The password to use for authentication.
            use_ntlm_v2 (bool, optional): Whether to use NTLMv2 for authentication. Defaults to True.
            is_direct_tcp (bool, optional): Whether to use direct TCP for communication. Defaults to True.
            is_derived (bool, optional): Whether this object is a derived connection from sub-operations of main object. Defaults to False.
        """
        self.server_name = server_name
        self.share_name = share_name
        self.user_id = user_id
        self.password = password
        self.use_ntlm_v2 = use_ntlm_v2
        self.is_direct_tcp = is_direct_tcp
        self.is_derived = is_derived
        self.conn = None

    def __enter__(self):
        self.connect()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.disconnect()

    def derive(self) -> 'SambaService':
        """
        Create a derived SambaService object.

        Returns:
            SambaService: A derived SambaService object.
        """
        return SambaService(self.server_name, self.share_name, self.user_id, self.password, self.use_ntlm_v2, self.is_direct_tcp, is_derived=True)

    def derive_bare(self) -> SMBConnection:
        """
        Create a derived SMBConnection object.

        Returns:
            SMBConnection: A derived SMBConnection object.
        """
        conn = SMBConnection(self.user_id, self.password, self.user_id, self.server_name, use_ntlm_v2=self.use_ntlm_v2, is_direct_tcp=self.is_direct_tcp)
        conn.connect(self.server_name, 445)
        return conn

    def connect(self):
        """
        Connect to the SMB server.
        """
        self.conn = SMBConnection(self.user_id, self.password, self.user_id,
                                  self.server_name, use_ntlm_v2=self.use_ntlm_v2, is_direct_tcp=self.is_direct_tcp)
        self.conn.connect(self.server_name, 445)
        logger.Logger.log(f"Connected to {self.server_name} as {self.user_id}")

    def disconnect(self):
        """
        Disconnect from the SMB server.
        """
        if self.conn is not None:
            self.conn.close()
            logger.Logger.log(f"Disconnected from {self.server_name}")
            self.conn = None

    def lsdir(self, path: pathlib.Path) -> list:
        """
        List the contents of a directory.

        Args:
            path (pathlib.Path): The path to the directory to list.

        Returns:
            list[dict[str, typing.Any]]: A list of dictionaries containing the attributes of each file in the directory.

        Raises:
            OperationFailure: If the operation fails.
            Exception: If an unexpected error occurs.
        """
        if self.is_derived:
            try:
                logger.Logger.log(f"Listing directory {path}")
                files: list[SharedFile] | list[dict[str, typing.Any]
                                               ] = self.conn.listPath(self.share_name, str(path.resolve()))
                files = [self.attrs_from_shared_file(f) for f in files]
                return files
            except OperationFailure as e:
                logger.Logger.log(f"Failed to list directory {path}: {e}")
                raise e
            except Exception as e:
                logger.Logger.log(f"Failed to list directory {path}: {e}")
                raise e
        else:
            with self.derive() as derived:
                return derived.lsdir(path)

    def mkdir(self, path: pathlib.Path):
        if self.is_derived:
            try:
                self.conn.createDirectory(self.share_name, str(path.resolve()))
            except OperationFailure as e:
                logger.Logger.log(f"Failed to create directory {path}: {e}")
                raise e
            except Exception as e:
                logger.Logger.log(f"Failed to create directory {path}: {e}")
                raise e
        else:
            with self.derive() as derived:
                derived.mkdir(path)

    def delete(self, path: pathlib.Path):
        if self.is_derived:
            try:
                self.conn.deleteFiles(self.share_name, str(path.resolve()))
            except OperationFailure as e:
                logger.Logger.log(f"Failed to delete file {path}: {e}")
                raise e
            except Exception as e:
                logger.Logger.log(f"Failed to delete file {path}: {e}")
                raise e
        else:
            with self.derive() as derived:
                derived.delete(path)

    def open(self, path: pathlib.Path, mode: str = 'r') -> SambaFile:
        derived_connection = self.derive_bare()
        return SambaFile(derived_connection, self.share_name, path.resolve(), mode)

    def attrs_from_shared_file(self, shared_file: SharedFile) -> dict[str, typing.Any]:
        return {
            'name': shared_file.filename,
            'size': shared_file.file_size,
            'created': int(shared_file.create_time),
            'changed': int(shared_file.last_attr_change_time),
            'accessed': int(shared_file.last_access_time),
            'is_dir': shared_file.file_attributes & SMB_FILE_ATTRIBUTE_DIRECTORY == SMB_FILE_ATTRIBUTE_DIRECTORY,
            'is_file': shared_file.file_attributes & SMB_FILE_ATTRIBUTE_DIRECTORY == 0,
            'allocated_size': shared_file.alloc_size,
        }

    def attrs(self, path: pathlib.Path) -> dict[str, typing.Any]:
        if self.is_derived:
            try:
                attrs: SharedFile = self.conn.getAttributes(
                    self.share_name, str(path.resolve()))
                return {
                    'name': attrs.filename,
                    'size': attrs.file_size,
                    'created': int(attrs.create_time),
                    'changed': int(attrs.last_attr_change_time),
                    'accessed': int(attrs.last_access_time),
                    'is_dir': attrs.file_attributes & SMB_FILE_ATTRIBUTE_DIRECTORY == SMB_FILE_ATTRIBUTE_DIRECTORY,
                    'is_file': attrs.file_attributes & SMB_FILE_ATTRIBUTE_DIRECTORY == 0,
                    'allocated_size': attrs.alloc_size,
                }
            except OperationFailure as e:
                logger.Logger.log(f"Failed to get attributes of {path}: {e}")
                raise e
            except Exception as e:
                logger.Logger.log(f"Failed to get attributes of {path}: {e}")
                raise e
        else:
            with self.derive() as derived:
                return derived.attrs(path)

    def rename(self, old_path: pathlib.Path, new_path: pathlib.Path):
        if self.is_derived:
            try:
                self.conn.rename(self.share_name, str(
                    old_path.resolve()), str(new_path.resolve()))
            except OperationFailure as e:
                logger.Logger.log(
                    f"Failed to rename {old_path} to {new_path}: {e}")
                raise e
            except Exception as e:
                logger.Logger.log(
                    f"Failed to rename {old_path} to {new_path}: {e}")
                raise e

            self.conn.rename(self.share_name, str(old_path), str(new_path))
        else:
            with self.derive() as derived:
                derived.rename(old_path, new_path)


class SambaConnectionManager():
    def __init__(self):
        # keys are serialized into service_name:share_name
        self.connections: dict[str, SambaService] = {}

    def connect(self, service_name: str, share_name: str, user_id: str, password: str, use_ntlm_v2=True, is_direct_tcp=True):
        """
        Connect to a SMB server.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            user_id (str): The user ID to use for authentication.
            password (str): The password to use for authentication.
            use_ntlm_v2 (bool, optional): Whether to use NTLMv2 for authentication. Defaults to True.
            is_direct_tcp (bool, optional): Whether to use direct TCP for communication. Defaults to True.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            return self.connections[service_key]

        serv = SambaService(service_name, share_name, user_id,
                            password, use_ntlm_v2, is_direct_tcp)
        serv.connect()
        self.connections[service_key] = serv
        return serv

    def connected(self, service_name: str, share_name: str) -> bool:
        """
        Check if a SMB server is connected.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.

        Returns:
            bool: True if the server is connected, False otherwise.
        """
        service_key = f"{service_name}:{share_name}"
        return service_key in self.connections

    def disconnect(self, service_name: str, share_name: str):
        """
        Disconnect from a SMB server.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            self.connections[service_key].disconnect()
            del self.connections[service_key]

    def lsdir(self, service_name: str, share_name: str, path: pathlib.Path) -> list:
        """
        List the contents of a directory.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            path (pathlib.Path): The path to the directory to list.

        Returns:
            list[dict[str, typing.Any]]: A list of dictionaries containing the attributes of each file in the directory.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            return self.connections[service_key].lsdir(path)
        raise Exception(f"Not connected to {service_name}:{share_name}")

    def mkdir(self, service_name: str, share_name: str, path: pathlib.Path):
        """
        Create a directory.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            path (pathlib.Path): The path to the directory to create.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            self.connections[service_key].mkdir(path)
        else:
            raise Exception(f"Not connected to {service_name}:{share_name}")

    def delete(self, service_name: str, share_name: str, path: pathlib.Path):
        """
        Delete a file or directory.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            path (pathlib.Path): The path to the file or directory to delete.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            self.connections[service_key].delete(path)
        else:
            raise Exception(f"Not connected to {service_name}:{share_name}")

    def open(self, service_name: str, share_name: str, path: pathlib.Path, mode: str = 'r') -> SambaFile:
        """
        Open a file.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            path (pathlib.Path): The path to the file to open.
            mode (str, optional): The mode to open the file in. Defaults to 'r'.

        Returns:
            SambaFile: A file-like object for the file.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            return self.connections[service_key].open(path, mode)
        else:
            raise Exception(f"Not connected to {service_name}:{share_name}")
        return None

    def attrs(self, service_name: str, share_name: str, path: pathlib.Path) -> dict[str, typing.Any]:
        """
        Get the attributes of a file or directory.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            path (pathlib.Path): The path to the file or directory.

        Returns:
            dict[str, typing.Any]: A dictionary containing the attributes of the file or directory.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            return self.connections[service_key].attrs(path)
        else:
            raise Exception(f"Not connected to {service_name}:{share_name}")

    def rename(self, service_name: str, share_name: str, old_path: pathlib.Path, new_path: pathlib.Path):
        """
        Rename a file or directory.

        Args:
            service_name (str): The name of the SMB service.
            share_name (str): The name of the SMB share.
            old_path (pathlib.Path): The old path of the file or directory.
            new_path (pathlib.Path): The new path of the file or directory.
        """
        service_key = f"{service_name}:{share_name}"
        if service_key in self.connections:
            return self.connections[service_key].rename(old_path, new_path)
        else:
            raise Exception(f"Not connected to {service_name}:{share_name}")

    def close_all(self):
        """
        Close all connections.
        """
        for key in self.connections.keys():
            self.connections[key].disconnect()
        self.connections = {}
