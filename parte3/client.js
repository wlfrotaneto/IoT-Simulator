const net = require('net');
var fs = require('fs');
var readline = require('readline');

var resp = "";
var picked;
var nameClient = "WalterClient";

var reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

try {  
    var dataFile = fs.readFileSync('lista_dispositivos.txt', 'utf8');  
    const servers = dataFile.toString().split("\n").map((aux) => {
        const obj = aux.split(' ');
        return {
            name: obj[0],
            ip: obj[1],
            port: obj[2].split("\r")[0]
        }
    });
    console.log(servers);   
    reader.question("What server name do you want to connect?\n", function(answer) {
        resp = answer;
        if(servers.find(o => o.name === resp) != undefined){
            picked = servers.find(o => o.name === resp);
            console.log("\nServer '" + resp + "' choosed.");

            const options = {
                host: picked.ip,
                port: picked.port
            };

            console.log(options);

            const client = net.createConnection(options, () => {
                console.log('Connected to server.');
                client.write(nameClient + ' CONECTAR ' + resp + '\r\n');
            });
            
            client.on('data', data => {
                console.log(data.toString());
                // setTimeout(function(){ client.end(); }, 15000);
                // client.end();
            });

        } else {
            console.log("Didn't find any server with this name.");
        }
        reader.close();
    });   
    
} catch(e) {
    console.log('Error:', e.stack);
}
// const client = net.createConnection(options, () => {
//     console.log('Connected to server.');
//     client.write('WalterGod\r\n');
// });

// client.on('data', data => {
//     console.log(data.toString());
//     client.end();
// });
