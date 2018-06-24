import express = require('express');

const server = express();
const portNumber = 8080;

function requestListener(request: express.Request, response: express.Response) {
  response.send("Hello World!");
}

server.get("/", requestListener);

server.listen(portNumber, () => {
  console.log(`Listening on localhost:${ portNumber }`);
});
