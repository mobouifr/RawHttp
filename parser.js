function parser(fullReqData)
{
    const dataTable = fullReqData.split("\r\n");

    const requestLine = dataTable[0].split(" ");

    const method = requestLine[0];
    const path = requestLine[1];
    const protocol = requestLine[2];

    const headers = {};

    let i = 1;

    while (dataTable[i] && dataTable[i] !== '')
    {
        const separatorIndex = dataTable[i].indexOf(":");

        const key = dataTable[i].slice(0, separatorIndex);
        const value = dataTable[i].slice(separatorIndex + 2);

        headers[key] = value;

        i++;
    }

    const fragmentedBody = dataTable.slice(i + 1);

    const body = fragmentedBody.join("\r\n");

    return {
        method,
        path,
        protocol,
        headers,
        body
    };
}

module.exports = parser;