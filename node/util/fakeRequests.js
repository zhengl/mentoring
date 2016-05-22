const http = require('http');
const LENGTH = 1000;

const paths = [
  '/coats',
  '/shirts',
  '/gifts',
  '/shoes',
  '/bags',
];

for (let i = 0; i < LENGTH; i++) {
  const request = http.request({
    hostname: 'localhost',
    port: 8080,
    path: paths[Math.floor(Math.random() * paths.length)]
  });

  request.end();
}
