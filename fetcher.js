const request = require("request");
const fs = require("fs");
const URL = process.argv[2];
const filePath = process.argv[3];
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeFile = function (body) {
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    process.exit();
  });
};

fs.readFile(filePath, function (err, data) {
  if (err) {
    console.log("File Path invalid");
    process.exit();
  }
  request(URL, (error, response, body) => {
    if (error) {
      console.log("URL invalid");
      process.exit();
    }
    if (data.length === 0) {
      writeFile(body);
    } else {
      rl.question("Type in Y to overwrite the file    ", (answer) => {
        if (answer === "Y") {
          writeFile(body);
        }
        rl.close();
      });
    }
  });
});
