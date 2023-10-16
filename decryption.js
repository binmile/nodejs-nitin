import fs from "node:fs/promises";
import crypto from "crypto";

fs.readFile("secret.txt", "utf8").then((data) => {
  const secret = data.toString("utf-8");
  fs.readFile("encrypted.txt").then((data) => {
    // console.log(data.toString('utf-8'));
    const text = data.toString("utf-8");
    const decipher = crypto.createDecipher("aes256", secret);

    var decryptedDataUsingAes256 =
      decipher.update(text, "hex", "utf-8") +
      decipher.final("utf8");
    console.log(decryptedDataUsingAes256);
    // fs.writeFile('encrypted.txt',encryptedDataUsingAes256);
  }).catch(err=>{
    console.log(err);
  }).catch(err=>console.log(err));
});
