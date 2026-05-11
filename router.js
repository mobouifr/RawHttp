const fs = require('fs');

function router(parsedData, socket)
{
    if (parsedData.method === "GET")
    {
        if (parsedData.path === "/")
        {
            fs.readFile("./public/index.html", "utf-8", (error, data) => 
            {
                if (error)
                {
                    socket.write("HTTP/1.1 404 Not Found\r\n" +
                            "Content-Type: text/plain\r\n" +
                            "\r\n" +
                            "404 Not Found");
                }
                else
                {
                    socket.write( "HTTP/1.1 200 OK\r\n" +
                            "Content-Type: text/html\r\n" +
                            "\r\n" + data);
                }
                socket.end();
            });
        }

        else if (parsedData.path === "/style.css")
        {
            fs.readFile("./public/style.css", "utf-8", (error, data) => 
            {
                if (error)
                {
                    socket.write("HTTP/1.1 404 Not Found\r\n" +
                            "Content-Type: text/plain\r\n" +
                            "\r\n" +
                            "404 Not Found");
                }
                else
                {
                    socket.write( "HTTP/1.1 200 OK\r\n" +
                            "Content-Type: text/css\r\n" +
                            "\r\n" + data);
                }
                socket.end();
            });
        }

        else if (parsedData.path === "/app.js")
        {
            fs.readFile("./public/app.js", "utf-8", (error, data) => 
            {
                if (error)
                {
                    socket.write("HTTP/1.1 404 Not Found\r\n" +
                            "Content-Type: text/plain\r\n" +
                            "\r\n" +
                            "404 Not Found");
                }
                else
                {
                    socket.write( "HTTP/1.1 200 OK\r\n" +
                            "Content-Type: application/javascript\r\n" +
                            "\r\n" + data);
                }
                socket.end();
            });
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