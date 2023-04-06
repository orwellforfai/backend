const fs = require('fs')

const filename = './package.json';

const contenido = JSON.parse(fs.readFileSync(filename, 'utf-8'));
contenido.author = "Martin Beltramo"
fs.writeFileSync(filename, JSON.stringify(contenido, null,'\t'));


