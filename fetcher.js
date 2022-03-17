const request = require("request");
const fs = require("fs");
const URL = process.argv[2];
const filePath = process.argv[3];
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

request(URL, (error, response, body) => {
  if (error) return console.error("URL invalid");
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.error("File Path invalid");
      return;
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    process.exit();
  });
});
