import socket, random, time

nameClient = "Caminhao";
caminhaoID = "666";
centralID = "2424";
containerID = "1691";

HOST = '6.tcp.ngrok.io'
PORT = 17115

devicesTxt = open('lista_dispositivos.txt', 'r')
linesDevices = devicesTxt.readlines()

def findServerHost(id):
    for line in linesDevices:
        if(line.count(id) > 0):
            listFind = line.split(' ')
    return listFind
    
def connectCentral(HOST, PORT):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(b'LIVRE ' + caminhaoID.encode())
        data = s.recv(1024)
    return repr(data)

def connectContainer(HOST, PORT):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(b'CHEGUEI_CONTAINER ' + caminhaoID.encode())
        data = s.recv(1024)
    return repr(data)

def runSimulation():
    centralHost = findServerHost(centralID)
    print(centralHost[1])
    print(centralHost[2].split('\n')[0])

    centralData = connectCentral(centralHost[1], int(centralHost[2].split('\n')[0]))
    centralResponse = centralData.split("b'")[1].split("'")[0]
    print('Central: ' + centralResponse)
    # print(centralResponse.split('COLETAR ')[1])

    randomTime = random.randint(5, 20)
    print("Tempo para chegar ao Container: " + str(randomTime))
    time.sleep(randomTime)



runSimulation()

# lineHost = findServerHost('1691')
# print(lineHost[2].split('\n')[0])

# centralMessage = connectCentral(HOST, PORT)
# print(centralMessage)

# with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
#     s.connect((HOST, PORT))
#     s.sendall(b'Hello, world')
#     data = s.recv(1024)
# 
# print(repr(data))