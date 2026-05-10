function parser(fullReqData)
{
    const dataTable = fullReqData.split("\r\n");
    
    const requestLine = dataTable[0].split(" ");
    
    const method = requestLine[0];
    const path = requestLine[1];
    const protocol = requestLine[2];
    
    const headers = {};

    let i = 1;
    
    while (dataTable[i] !== '')
        {
            const headerLine = dataTable[i].split(": ");
            
            const key = headerLine[0];
            const value = headerLine[1];
            
            headers[key] = value;
            
            i++;
        }
        
        const fragmentedBody = dataTable.slice(i + 1);
        
        const body = fragmentedBody.join("\r\n");
        
        return { method, path, protocol, headers, body};
    }
    
    module.exports = parser;
    

/*  
    HTTP request format:
    
    REQUEST LINE
    HEADERS
    EMPTY LINE
    BODY
    
    Example:
    
    POST /data HTTP/1.1
    Host: localhost:4000
    Content-Type: application/json
    
    {"name":"test"}
*/