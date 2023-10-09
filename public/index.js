import fs from "node:fs/promises";
import fss from "fs";
import zlip  from "node:zlib";

// creating directory
fss.mkdir('outputDir',(err)=>{
  if(err) {console.log(err);}
  else console.log("output created successfully");
})




// creating file 
fss.writeFileSync('demo.txt','this is temporary file');


// moving file into work directory
fss.renameSync('./demo.txt','./outputDir/demo.txt',(err)=>{
  if(err) console.log(err);
});

// reading file synchronously
const fileContent = fss.readFileSync("./outputDir/demo.txt", "utf8");

console.log(fileContent);

// reading file asynchronous
fs.readFile("./outputDir/demo.txt", "utf-8")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });

// writing new data to file
fs.writeFile("./outputDir/demo.txt", "this is my file", (err) => {});

// adding extra data to file
fs.appendFile("./outputDir/demo.txt", "\nho ho this is new data", (err) => {});

setTimeout(() => {
  fs.appendFile("./outputDir/demo.txt", "\n -): ho ho this is new data", (err) => {});
}, 3000);

// readable stream and writeable stream
const readableStream = fss.createReadStream("./outputDir/demo.txt", {
  encoding: "utf-8",
  highWaterMark:2
});

const writeableStream = fss.createWriteStream("./outputDir/demo1.txt");
readableStream.on("data", (data) => {
  writeableStream.write(data);
  console.log(data);
});

// creating compress file using gzip compression and streaming concepts
const gzip = zlip.createGzip();

const newWriteableStream = fss.createWriteStream('./outputDir/demo.txt.gz');

readableStream.pipe(gzip).pipe(newWriteableStream);


// rename the file demo to memo and rename directory
setTimeout(()=>{
  fss.renameSync('./outputDir/demo.txt','./outputDir/memo.txt');
  fss.renameSync('./outputDir','./tempOutputDir');
},5000)



// after all work is done delete work directory
setTimeout(()=>{
  fss.rmSync('tempOutputDir',{recursive:true,force:true})
},10000)