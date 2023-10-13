import crypto from 'crypto';

// hashing the text using sha256

const data = "this is my data";
console.log("using sha256")

const hashedDataUsingSha256 = crypto.createHash('sha256').update("").update(data).digest('base64');

console.log(hashedDataUsingSha256,'\n');

console.log("using sha512")
// hash same data using sha512
const hashDataUsingSha512 = crypto.createHash('sha512').update(data).digest('base64');

console.log(hashDataUsingSha512);