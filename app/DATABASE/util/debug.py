def d():
    import sys
    sys.path.append("/Applications/PyCharm.app/Contents/debug-eggs/pycharm-debug.egg")
    import pydevd
    pydevd.settrace('localhost', port=12345, stdoutToServer=True, stderrToServer=True)
