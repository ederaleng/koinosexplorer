const path = require('path');
const fs = require('fs');
const pbjs = require("protobufjs/cli").pbjs;
const pathInput = path.resolve(__dirname, "../koinos-proto/koinos");
const pathOut = path.resolve(__dirname, "../koinos-proto-js");

function getFiles(dir) {
  return fs.readdirSync(dir).flatMap((item) => {
    if(item.endsWith('.proto')) {
      return "../koinos-proto/koinos"+`${dir}/${item}`.replace(pathInput, "").replace(/\\/g, "/")
    }    
    let pathDir = path.resolve(dir, item)
    if (fs.statSync(pathDir).isDirectory()) {
      return getFiles(pathDir);
    }
  });
}

async function generate() {
  let filesProto = await getFiles(pathInput)
  if (!fs.existsSync(pathOut)) {
		fs.mkdirSync(pathOut, { recursive: true });
	}

  pbjs.main([ "--target", "static-module", "--wrap", "es6", "--out", "./../koinos-proto-js/index.js" ].concat(filesProto), function(err, output) {
    if (err) {
      throw err;
    }
    console.log("proto generated")
  });
}

generate()

