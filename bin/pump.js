#!/usr/bin/env node

const program = require('commander');
const pump = require('node-file-pumper');

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

let file = program.file;
let size = parseInt(program.size);
let type = program.type;
new Promise((resolve, reject) => {
    return pump(file, size, type, (error) => {
        if (error) { return reject(error); }
        return resolve();
    });
});