const net = require('net');
const parser = require('./parser');
const router = require('./router');

const PORT = 4000;

const server = net.createServer((socket) =>
{
    console.log("Client connected");

    socket.on("data", async (data) =>
    {
        const rawRequest = data.toString();

        console.log("\nRAW REQUEST:\n");
        console.log(rawRequest);

        const parsedRequest = parser(rawRequest);

        console.log("\nPARSED REQUEST:\n");
        console.log(parsedRequest);

        await router(parsedRequest, socket);
    });

    socket.on("end", () =>
    {
        console.log("TCP connection ended");
    });
});

server.listen(PORT, () =>
{
    console.log(`TCP server listening on port ${PORT}`);
});