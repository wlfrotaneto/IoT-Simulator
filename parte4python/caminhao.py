import socket, random, time

nameClient = "Caminhao"
caminhaoID = "666"
centralID = "2424"
containerID = "1691"

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

def waitRandomTime(message):
    randomTime = random.randint(5, 20)
    print(message + ": " + str(randomTime))
    time.sleep(randomTime)

def runSimulation():
    #Searches Central TCP Host
    centralHost = findServerHost(centralID)
    print('Central Host: ' + centralHost[1] + ' | ' + centralHost[2].split('\n')[0])

    #Connects to Central TCP Server
    centralData = connectCentral(centralHost[1], int(centralHost[2].split('\n')[0]))
    centralResponse = centralData.split("b'")[1].split("'")[0]
    print('Central: ' + centralResponse)
    
    #Searches Container TCP Host
    containerID = centralResponse.split('COLETAR ')[1]
    containerHost = findServerHost(containerID)
    print('Container Host: ' + containerHost[1] + ' | ' + containerHost[2].split('\n')[0])

    #Wait Time to arrive at Container
    waitRandomTime('Tempo para chegar ao Container')

    #Connects to Container TCP Server
    containerData = connectContainer(containerHost[1], int(containerHost[2].split('\n')[0]))
    containerResponse = containerData.split("b'")[1].split("'")[0]
    print('Container: ' + containerResponse)

    #Wait Time to arrive at Central
    waitRandomTime('Tempo para retornar a Central')

while(True): runSimulation()