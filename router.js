
function router(parsedData, socket)
{
    if (parsedData.method === "GET" && parsedData.path === "/")
    {
        const body = "Hello from my server";
        const response =
            "HTTP/1.1 200 OK\r\n" +
            "Content-Type: text/plain\r\n" +
            "\r\n" +
            body;

        socket.write(response);
        socket.end();
    }

    else if (parsedData.method === "POST" && parsedData.path === "/data")
    {
        const parsedBody = JSON.parse(parsedData.body);

        const body = JSON.stringify(parsedBody);

        const response =
            "HTTP/1.1 200 OK\r\n" +
            "Content-Type: application/json\r\n" +
            "\r\n" +
            body;

        socket.write(response);
        socket.end();
    }
    
    else
    {
        const response =
            "HTTP/1.1 404 Not Found\r\n" +
            "Content-Type: text/plain\r\n" +
            "\r\n" +
            "404 Not Found";

        socket.write(response);
        socket.end();
    }
}

module.exports = router;