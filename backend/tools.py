import threading
import time
import typing

def TimeProvider() -> str:
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())


def DateProvider() -> str:
    return time.strftime('%Y-%m-%d', time.localtime())


def ThreadProvider(callable: typing.Callable) -> threading.Thread:
    th = threading.Thread(target=callable)
    th.start()
    return th