// importing the net module required to create a TCP server
const net = require('net');
const parser = require('./parser');
const router = require('./router');

const PORT = 4000;

// creating a TCP server that will handle incoming client connections
const server = net.createServer((socket) =>
{
    console.log("Client connected");

    socket.on("data", (data) => 
    {
        console.log("Data received via TCP client:", data.toString());

        const parsedData = parser(data.toString());
        console.log("\nParsed data:", parsedData);

        router(parsedData, socket);
    });

    socket.on("end", () =>
    {
        console.log("TCP Connection ended");
    });
});

// starting the TCP server and listening on port 4000
server.listen(PORT, () =>
{
    console.log("TCP server open on port:", PORT);
});