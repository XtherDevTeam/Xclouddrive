import sambaService
import pathlib

# Testing the sambaService module
def test_samba_service():
    smb_service: sambaService.SambaService = sambaService.SambaService("192.168.1.7", "Yoimiya", "Jerry Chou", "Azhouby123")
    smb_service.connect()
    res = smb_service.lsdir(pathlib.Path("/"))
    print(res)
    smb_service.disconnect()

if __name__ == '__main__':
    test_samba_service()