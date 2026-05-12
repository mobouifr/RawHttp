function sendResponse(socket, status, contentType, body)
{
    socket.write(
        `HTTP/1.1 ${status}\r\n` +
        `Content-Type: ${contentType}\r\n` +
        `Content-Length: ${Buffer.byteLength(body)}\r\n` +
        `\r\n` +
        body
    );

    socket.end();
}

module.exports = sendResponse;