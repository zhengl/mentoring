const http = require('http');
const fs = require('fs');
const PORT = 8080;

function writeLog(entry) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${__dirname}/log`, entry, { flag: 'a' }, err => {
      err ? reject(err) : resolve();
    });
  })
}

const server = http.createServer((req, res) => {
  writeLog(`${req.url}\n`).then(() => {
    console.log('Write log: ' + req.url);
    res.end('OK');
  })

});

server.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
})
