let server_addr = [];

const interfaces = require("os").networkInterfaces();
for (let k in interfaces) {
    for (let k2 in interfaces[k]) {
        let address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            server_addr.push(address.address);
        }
    }
};

server_addr = (server_addr[0] === undefined) ? "localhost" : server_addr[0];

const Ipvify = ip => ip.replace("::ffff:", "");

const SocketIP = handshake => {
    return { ip: handshake.headers['x-forwarded-for'] || handshake.address }
};

//RETURN THE CURRENT MACHINE'S IP ADDRESS
exports.myAddr = exports.myAddress = exports._MY_ADDR = exports._MY_ADDRESS = server_addr;

//PROPERLY FORMAT AN IP ADDRESS
exports.ipvify = exports.toIP = exports.to_ip
exports._IPVIFY = exports._TO_IP = ip => Ipvify(ip);

//PICK THE IP ADDRESS OFF A SOCKET HANDSHAKE
exports.socketIp = exports._SOCKET_IP = handshake => new Ipvify(new SocketIP(handshake).ip).ip;