// importing the net module required to create a TCP server
const net = require('net');

const PORT = 4000;

// creating a TCP server that will handle incoming client connections
const server = net.createServer((socket) =>
{
    console.log("Client connected");

    // triggered whenever the client sends data through the TCP connection
    socket.on("data", (data) => 
    {
        console.log("Data received via TCP client:", data.toString());

        const body = "Hello from my server";
        const response =
            "HTTP/1.1 200 OK\r\n" +
            "Content-Type: text/plain\r\n" +
            "\r\n" +
            body;

        socket.write(response);
        socket.end();
    });

    // triggered when the client closes the connection
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