const fs = require('fs').promises;

function getSimpsons() {
  return fs.readFile("./simpsons.json", 'utf-8')
    .then((result) => JSON.parse(result));
}

function writeSimpson(newData) {
  return fs.writeFile(".simpsons.json", JSON.stringify(newData));
}

module.exports = {
  getSimpsons,
  writeSimpson,
}