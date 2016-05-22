const fs = require('fs');

function countTotal(entries) {
  return entries.reduce((stats, entry) => {
    stats[entry] = stats.hasOwnProperty(entry) ? stats[entry] + 1 : 0;

    return stats;
  }, {});
}

function getTop(entries, count) {
  return Object.keys(entries)
    .map(name => ({
      name,
      count: entries[name]
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, count)
    .map(entry => entry.name);
}

function analyze(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      }

      const reduced = countTotal(data.split('\n'));
      const analyzed = getTop(reduced, 10);
      resolve(analyzed);
    });
  });
}

module.exports = {
  analyze
}
