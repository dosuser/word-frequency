#!/usr/bin/env node

const dum = require('./dum.js')
const program = require('commander');
const fs = require('fs');

program
    .description('count word frequency in stdin or file')
    .option('-d, --dictionary <dic>', 'dictionary file to exclude from the result (line separated, single word)')
    .option('-i, --inputFile <inputFile>', 'input text file, ')
    // .option('-o, --outputFile <outputFile>', 'exclude')

program.parse(process.argv);


try {
    let inputStream;
    if(program.inputFile!=undefined){
        dum.checkRegularFile(program.inputFile)
        inputStream = (program.inputFile!=undefined) ? fs.createReadStream(program.inputFile):process.stdin
    }else{
        inputStream = process.stdin;
    }

    dum.dum(inputStream, program.dictionary)
}catch (e) {
    //this works as stderr
    console.error(e.message)
}
