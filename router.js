const sendResponse = require('./response');
const serveFile = require('./serveFile');
const storage = require('./storage');

function router(parsedData, socket)
{
    if (parsedData.method === "GET")
    {
        if (parsedData.path === "/")
        {
            serveFile(
                socket,
                "./public/index.html",
                "text/html"
            );
        }

        else if (parsedData.path === "/style.css")
        {
            serveFile(
                socket,
                "./public/style.css",
                "text/css"
            );
        }

        else if (parsedData.path === "/app.js")
        {
            serveFile(
                socket,
                "./public/app.js",
                "application/javascript"
            );
        }

        else
        {
            sendResponse(
                socket,
                "404 Not Found",
                "text/plain",
                "404 Not Found"
            );
        }
    }

    else if ( parsedData.method === "POST" && parsedData.path === "/data")
    {
        try
        {
            const parsedBody = JSON.parse(parsedData.body);

            const body = JSON.stringify(parsedBody, null, 4);

            sendResponse(
                socket,
                "200 OK",
                "application/json",
                body
            );
        }
        catch
        {
            sendResponse(
                socket,
                "400 Bad Request",
                "text/plain",
                "Invalid JSON"
            );
        }
    }

    else
    {
        sendResponse(
            socket,
            "404 Not Found",
            "text/plain",
            "404 Not Found"
        );
    }
}

module.exports = router;