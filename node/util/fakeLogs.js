const fs = require('fs');

const data = [];
const LENGTH = 1000;

for (let i = 0; i < LENGTH; i++) {
  data.push('1.2.3.' + Math.floor(Math.random() * 255));
}

fs.writeFile(`${__dirname}/log`, data.join('\n'));
