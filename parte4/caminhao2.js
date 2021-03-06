const net = require('net');
var fs = require('fs');
var readline = require('readline');

var resp = "";
var picked;
var nameClient = "Caminhao";
var caminhaoID = "666";
var centralID = "2424";
var containerID = "1691";

var optionsCentral = {
    host: '',
    port: ''
};

var optionsContainer = {
    host: '',
    port: ''
};

var dataFile = fs.readFileSync('lista_dispositivos.txt', 'utf8'); 

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function connectCentral() {
    var connectionCentral = net.createConnection(optionsCentral, () => {
        console.log('Conectado a Central.');
        connectionCentral.write('LIVRE ' + caminhaoID + '\r\n');
    });
    
    connectionCentral.on('data', data => {
        console.log(data.toString());
        containerID = data.toString().split("COLETAR ")[1]
        connectionCentral.end();
    });

    connectionCentral.on('end', () => {
        console.log('Desconectado da Central.');
    });
}

function connectContainer() {
    var connectionContainer = net.createConnection(optionsContainer, () => {
        console.log('Conectado ao Container.');
        client.write('CHEGUEI_CONTAINER ' + caminhaoID + '\r\n');
    });
    
    connectionContainer.on('data', data => {
        console.log(data.toString());
        connectionCentral.end();
    });

    connectionContainer.on('end', () => {
        console.log('Desconectado do Container.');
    });
}

try {   
    const servers = dataFile.toString().split("\n").map((aux) => {
        const obj = aux.split(' ');
        return {
            name: obj[0],
            ip: obj[1],
            port: obj[2].split("\r")[0]
        }
    });
    console.log(servers);  
    
    const centralServer = servers.find(o => o.name === centralID);
    
    optionsCentral = {
        host: centralServer.ip,
        port: centralServer.port
    };

    console.log(optionsCentral);

    while(true) {
        try {

            connectCentral();
        
            var containerServer = servers.find(o => o.name === containerID);
        
            optionsContainer = {
                host: containerServer.ip,
                port: containerServer.port
            };
        
            var randomTimer = Math.floor((Math.random() * 15) + 5);
            console.log("Tempo de chegada ao Container: " + randomTimer + "\n")
        
            setTimeout(function(){
                await connectContainer()
            }, randomTimer * 1000);
        
            randomTimer = Math.floor((Math.random() * 15) + 5);
            console.log("Tempo de chegada a Central: " + randomTimer + "\n")

            setTimeout(function(){
                console.log("Caminh??o chegou a central")
            }, randomTimer * 1000);

        } catch (error) {
            console.log('Error:', e.stack);
        }
    }
} catch(e) {
    console.log('Error:', e.stack);
}