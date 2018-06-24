import express = require('express');
const chromeLauncher = require('chrome-launcher');

const server = express();
const portNumber = 8080;

function defaultListener(request: express.Request, response: express.Response) {
  console.log('Hello World!');
  response.send('Hello World!');
}

server.get("/", defaultListener);

function runListener(request: express.Request, response: express.Response) {
  console.log('Launch Chrome');
  chromeLauncher.launch({
    startingUrl: `http://localhost:${portNumber}/`,
    chromeFlags: ['--headless', '--disable-gpu']
  }).then((chrome: any) => {
    console.log(`Chrome debugging port running on ${chrome.port}`);
    setTimeout(() => {
      chrome.kill()
        .then(() => {
          console.log('Kill Chrome');
          response.send('Launch Chrome');
        });
    }, 3000);
  });
}

server.get("/run", runListener);

server.listen(portNumber, () => {
  console.log(`Listening on localhost:${ portNumber }`);
});
