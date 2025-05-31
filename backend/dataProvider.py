import os
from datetime import timedelta
import json
import sqlite3
import threading
import time
import typing
import logger
import hashlib
import pathlib
import tools
import threading


class DatabaseObject:
    """
    Class representing a database connection object.

    Args:
        dbPath (str): Path to the SQLite database file.

    Methods:
        query(query, args=(), one=False):
            Execute an SQL query on the database.
        runScript(query):
            Execute an SQL script on the database.
        close():
            Close the database connection.
    """

    def __init__(self, dbPath: str) -> None:
        self.db = sqlite3.connect(dbPath, check_same_thread=False)
        self.lock = threading.Lock()

    def query(self, query, args=(), one=False) -> list[dict[str | typing.Any]] | dict[str | typing.Any]:
        """
        Execute an SQL query on the database.

        Args:
            query (str): The SQL query to be executed.
            args (tuple, optional): Query parameters. Defaults to ().
            one (bool, optional): Return only one result. Defaults to False.

        Returns:
            list[dict[str | typing.Any]] | dict[str | typing.Any]: Query result.
        """

        with self.lock:
            cur = self.db.execute(query, args)
            rv = [dict((cur.description[idx][0], value)
                       for idx, value in enumerate(row)) for row in cur.fetchall()]
            lastrowid = cur.lastrowid
            cur.close()
            if query.startswith('insert'):
                return lastrowid
            else:
                return (rv[0] if rv else None) if one else rv

    def runScript(self, query: str):
        """
        Execute an SQL script on the database.

        Args:
            query (str): The SQL script to be executed.
        """
        self.db.executescript(query)
        self.db.commit()
        return None

    def close(self):
        """Close the database connection."""
        self.db.close()


class _DataProvider:
    def __init__(self, db_path: str = './blob/database.db'):
        self.db = DatabaseObject(db_path)
        if not self.checkIfInitialized():
            logger.Logger.log('Database not initialized')
        pass

    def checkIfInitialized(self):
        """
        Check if the database is initialized.

        Returns:
            bool: True if initialized, False otherwise.
        """
        try:
            return len(self.db.query("select 1 from config")) != 0
        except:
            logger.Logger.log('Running initialization script')
            with open(f'./init.sql', 'r') as file:
                self.db.runScript(file.read())
                self.db.db.commit()
            return False

    def initialize(self, title: str, description: str, secret: str):
        """
        Initialize the database.
        """
        
        self.db.query("insert into config (title, description, secret) values (?,?,?)", (title, description, secret))
        self.db.db.commit()
        logger.Logger.log('Database initialized')
        
    def getSecret(self) -> typing.Optional[str]:
        """
        Get the secret key for the database.

        Returns:
            str: The secret key.
        """
        res = self.db.query("select secret from config", one=True)
        if res is not None:
            return res['secret']
        else:
            return None
        
    def getConfig(self, attr: str) -> typing.Optional[str]:
        """
        Get a configuration attribute.

        Args:
            attr (str): The attribute to get.

        Returns:
            str: The attribute value.
        """
        res = self.db.query("select * from config", one=True)
        if res is not None and attr in res:
            return res[attr]
        else:
            logger.Logger.log(f'Attribute {attr} not found in config')
            return None
        
    def setConfig(self, attr: str, value: str):
        """
        Set a configuration attribute.

        Args:
            attr (str): The attribute to set.
            value (str): The attribute value.
        """
        self.db.query(f"update config set {attr} = ?", (value,))
        logger.Logger.log(f'Attribute {attr} set to {value}')
        
    def createSambaService(self, name: str, description: str, service_name: str, share_name: str, user_id: str, password: str, use_ntlm_v2: bool, is_direct_tcp: bool):
        """
        Create a new Samba service.
        
        Args:
            name (str): The name of the service.
            description (str): The description of the service.
            service_name (str): The name of the Samba service.
            share_name (str): The name of the shared folder.
            user_id (str): The user ID for authentication.
            password (str): The password for authentication.
            use_ntlm_v2 (bool): Whether to use NTLMv2 for authentication.
            is_direct_tcp (bool): Whether to use direct TCP/IP for communication.
        """
        self.db.query("insert into samba_routes (name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp) values (?,?,?,?,?,?,?,?)", (name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp))

    def updateSambaService(self, id: int, name: str, description: str, service_name: str, share_name: str, user_id: str, password: str, use_ntlm_v2: bool, is_direct_tcp: bool):
        """
        Update a Samba service.
        
        Args:
            id (int): The ID of the service to update.
            name (str): The name of the service.
            description (str): The description of the service.
            service_name (str): The name of the Samba service.
            share_name (str): The name of the shared folder.
            user_id (str): The user ID for authentication.
            password (str): The password for authentication.
            use_ntlm_v2 (bool): Whether to use NTLMv2 for authentication.
            is_direct_tcp (bool): Whether to use direct TCP/IP for communication.
        """
        self.db.query("update samba_routes set name = ?, description = ?, service_name = ?, share_name = ?, user_id = ?, password = ?, use_ntlm_v2 = ?, is_direct_tcp = ? where id = ?", (name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp, id))
        
    def deleteSambaService(self, id: int):
        """
        Delete a Samba service.
        
        Args:
            id (int): The ID of the service to delete.
        """
        self.db.query("delete from samba_routes where id = ?", (id,))
        
    def getSambaServices(self) -> list[dict[str | typing.Any]]:
        """
        Get all Samba services.

        Returns:
            list[dict[str | typing.Any]]: A list of Samba services.
        """
        return self.db.query("select * from samba_routes")
        
    def getSambaService(self, id: int) -> dict[str | typing.Any]:
        """
        Get a Samba service by ID.

        Args:
            id (int): The ID of the service.

        Returns:
            dict[str | typing.Any]: The Samba service.
        """
        res = self.db.query("select * from samba_routes where id = ?", (id,), one=True)
        if res is not None:
            return res
        else:
            logger.Logger.log(f'Service {id} not found')
            return None
        
DataProvider = _DataProvider()