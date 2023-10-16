import fs from 'node:fs/promises';
import crypto from 'crypto';

fs.readFile('secret.txt','utf8').then(data=>{
    const secret= data.toString('utf-8');
    fs.readFile('temp.txt').then(data=>{
        // console.log(data.toString('utf-8'));
        const text= data.toString('utf-8');
        const cipher = crypto.createCipher('aes256',secret);
    
        let encryptedDataUsingAes256 = cipher.update(text,'utf-8','hex')+cipher.final('hex');
    
        fs.writeFile('encrypted.txt',encryptedDataUsingAes256);
    }).catch(err=>console.log(err));
})