import socket

HOST = '6.tcp.ngrok.io'  # The server's hostname or IP address
PORT = 17115        # The port used by the server

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.connect((HOST, PORT))
    s.sendall(b'Hello, world')
    data = s.recv(1024)

print(repr(data))