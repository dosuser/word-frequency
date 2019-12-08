const fs = require('fs');
const readline = require('readline');

/*
https://www.npmjs.com/package/commander#commanderjs
const program = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
 */

exports.dum = dum;
exports.checkRegularFile = checkRegularFile;

/**
 *
 * @param outputFile
 * @param inputStream
 * @param dictionary
 * @param callback(words) opt.
 */
function dum(inputStream, dictionary, callback) {
  const dic = {}
  createDic(dictionary, dic, function () {
    processLineByLine(inputStream,dic, function (words) {
      if(callback != undefined) {
        callback(words)
      }else{
        flushToSteam(process.stdout, words, function () {
        })
      }
    });
  });
}



function write(stream, data, cb) {
  if (!stream.write(data)) {
    // stream.once('drain', function(...args){
    //   cb("dragin", args)
    // });
  }
  // else {
  //   process.nextTick( function (...args){
  //     cb("nextTic", args)
  //   });
  // }
}
function CommonException(message) {
  this.message = message;
  this.category = 'common';
}

function checkRegularFile(filePath){
  if((fs.existsSync(filePath) && fs.lstatSync(filePath).isFile()) == false){
    throw new CommonException("file not found : " + filePath);
  }
}

function createDic(filePath, dic, completeCallback) {
  if(filePath != undefined){
    checkRegularFile(filePath)
    fs.readFile(filePath, 'utf8', function (err, data) {
      const words = data.split("\n");
      for(let i in words){
        let word = words[i].replace("\r","").trim().split(/\W+/gm)[0]
        if(word.length ==0){
          continue
        }
        dic[word] = word
      }
      completeCallback(dic)
    });
  }else{
    completeCallback(dic)
  }
}

function flushToSteam(stream, words, closeCallback) {

  for(let i in words) {
    write(stream, words[i][0]+"\t" + words[i][1] +"\n", function (args) {
      // console.debug("cb", args)
    })
  }
  closeCallback()
}

function processLineByLine(inputSteam, dic, callback) {
  // console.log("dic Length", dic.length)
  const rl = readline.createInterface({
    input: inputSteam, // process.stdin, fs.createReadStream('file.txt');
  });

  var words = {}

  rl.on("line", function (line) {
    parse(words, dic, line)
  })
  rl.on("close", function () {
    // console.debug("sorted words", )
    callback(sortWords(words))
  })
}

function sortWords(words) {
  var items = Object.keys(words).map(function (key) {
    return [key, words[key]];
  });

// Sort the array based on the second element
  items.sort(function (first, second) {
    return second[1] - first[1];
  });

  return items;
}



function parse(words, dic, text) {
  const step1Regex = /[^a-zA-Z]+/gm
  const step2Regex = /\W+/gm
  let o = text.toLowerCase().replace(step1Regex, ' ');
  o = o.split(step2Regex)
  for (var n2 in o) {

    if (o[n2].length == 0) {
      continue
    }
    if (o[n2].length < 3) {
      continue
    }
    if (dic[o[n2]] != undefined) {
      continue
    }
    words[o[n2]] = (words[o[n2]] == undefined) ? 1 : words[o[n2]] + 1
  }

}



