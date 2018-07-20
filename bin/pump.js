#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');

const VERSION = require('../package').version;

program
    .name('pump')
    .version(VERSION, '    --version')
    .option('-f, --file [name]', 'File name', "pump.txt")
    .option('-s, --size [int]', 'Size of file', 1)
    .option('-t, --type [type]', 'Choose size type [mb/kb]', 'mb')
    .parse(process.argv);

if (!process.argv.slice(4).length) {
    return console.log('[-] Missing argument!\n[+] Usage: pumper -f [file-name] -s [size] -t [-mb/-kb]');
}

let file = `./${program.file}`;
let size = parseInt(program.size);
let type = program.type;

console.log(file, size, type);
let bsize = 0;
let fopen = fs.openSync(file, 'w');
switch (type) {
    case 'kb':
        bsize = size * 10024;
        break;
    case 'mb':
        bsize = size * 1048576;
        break;
    default:
        return console.log("Use mb or kb");
        break;
}

let bufferSize = 256;
for (i = 0; i < bsize / bufferSize; i++) {
    fs.writeSync(fopen, '0'.repeat(bufferSize));
}

fs.closeSync(fopen);
return console.log("Done!");