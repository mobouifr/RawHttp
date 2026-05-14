const sendResponse = require('./response');
const serveFile = require('./serveFile');
const storage = require('./storage');

async function router(parsedData, socket)
{
    if ( parsedData.method === "GET" )
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

        else if (parsedData.path === "/items")
        {
            try
            {                
                const items = await storage.loadData();

                sendResponse(
                    socket,
                    "200 OK",
                    "application/json",
                    JSON.stringify(items, null, 4)
                );
            }
            catch (error)
            {
                sendResponse(
                    socket,
                    "500 Internal Server Error",
                    "text/plain",
                    "Internal Server Error"
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

    else if ( parsedData.method === "POST" && parsedData.path === "/items" )
    {
        
        let parsedBody;
        
        try
        {
            parsedBody = JSON.parse(parsedData.body);
        }
        catch (error)
        {
            sendResponse(
                socket,
                "400 Bad Request",
                "text/plain",
                "Invalid JSON"
            );

            return ;
        }

        try
        {

            const items = await storage.loadData();

            const newItem = 
            { 
                id: Date.now(),
                name: parsedBody.name
            };

            items.push(newItem);

            await storage.saveData(items);

            sendResponse(
                socket,
                "201 Created",
                "application/json",
                JSON.stringify(newItem, null, 4)
            );
        }
        catch (error)
        {
            sendResponse(
                socket,
                "500 Internal Server Error",
                "text/plain",
                "Internal Server Error"
            );
        }
    }
    else if ( parsedData.method === "DELETE" && parsedData.path.startsWith("/items/") )
    {
        //Extract ID from URL. Example: /items/123
        try
        {
            const id = Number(parsedData.path.split("/")[2]);

            const items = await storage.loadData();

            const filteredItems = items.filter((item) =>
            {
                return (item.id !== id);
            });

            await storage.saveData(filteredItems);

            sendResponse(
                socket,
                "200 OK",
                "text/plain",
                "Item deleted"
            );
        }
        catch (error)
        {
            sendResponse(
                socket,
                "500 Internal Server Error",
                "text/plain",
                "Internal Server Error"
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