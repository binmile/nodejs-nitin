import fs from "node:fs/promises";
import fss from "fs";
import zlip  from "node:zlib";

// reading file synchronously
const fileContent = fss.readFileSync("./demo.txt", "utf8");

console.log(fileContent);

// reading file asynchronous
fs.readFile("./demo.txt", "utf-8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// writing new data to file
fs.writeFile("./demo.txt", "this is my file", (err) => {});

// adding extra data to file
fs.appendFile("./demo.txt", "\nho ho this is new data", (err) => {});

setTimeout(() => {
  fs.appendFile("./demo.txt", "\n -): ho ho this is new data", (err) => {});
}, 3000);

// readable stream and writeable stream
const readableStream = fss.createReadStream("demo.txt", {
  encoding: "utf-8",
  highWaterMark:2
});

const writeableStream = fss.createWriteStream("demo1.txt");
readableStream.on("data", (data) => {
  writeableStream.write(data);
  console.log(data);
});

// creating compress file using gzip compression and streaming concepts
const gzip = zlip.createGzip();

const newWriteableStream = fss.createWriteStream('demo.txt.gz');

readableStream.pipe(gzip).pipe(newWriteableStream);