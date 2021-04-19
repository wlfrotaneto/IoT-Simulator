const net = require('net');

var serverActivated = true;
var nameServer = "WalterServer";
var updateTime = 5000;

const server = net.createServer(conn => {

    try {  
        console.log('Client connected.');

        conn.on('data', data => {
            conn.write('Server: Client connected.');
            conn.write(nameServer + ' ' + (serverActivated ? 'ATIVADO' : 'DESATIVADO') + ' ' + updateTime/1000);
            if(serverActivated) {
                console.log('Client sent: ' + data);
                tempetatureUpdate = setInterval(function(){
                    conn.write('Temperature: ' + (Math.floor(Math.random() * 6) + 28));
                }, 5000);
            } else {
                console.log('Server DESATIVADO.');
            }
            // conn.write(data + '\r\n');
        });

        conn.on('error', () => {
            console.log('Client connection ended.');
        });

        conn.on('end', () => {
            console.log('Client disconnected.');
        });

    } catch(e) {
        console.log('Error:', e.stack);
    }
});

server.listen(9090);