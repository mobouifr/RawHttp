const fs = require('fs');
const sendResponse = require('./response');

function serveFile(socket, filePath, contentType)
{
    fs.readFile(filePath, "utf-8", (error, data) =>
    {
        if (error)
        {
            sendResponse(
                socket,
                "404 Not Found",
                "text/plain",
                "404 Not Found"
            );

            return;
        }

        sendResponse(
            socket,
            "200 OK",
            contentType,
            data
        );
    });
}

module.exports = serveFile;