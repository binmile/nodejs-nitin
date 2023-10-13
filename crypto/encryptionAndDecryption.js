import crypto from 'crypto';

const dataForEncryption = "this data has to be encrypted";

var key = 'password';

//  Symmetric encryption and decryption

// using aes-256 algorithm

const cipher = crypto.createCipher('aes256',key);

let encryptedDataUsingAes256 = cipher.update(dataForEncryption,'utf-8','hex')+cipher.final('hex');

console.log(encryptedDataUsingAes256);

// decrypt data using aes-256 algorithm
const decipher = crypto.createDecipher('aes256',key);


var decryptedDataUsingAes256 = decipher.update(encryptedDataUsingAes256, 'hex', 'utf-8') + decipher.final('utf8');

console.log(decryptedDataUsingAes256);

console.log("")

// using latest encryption and decryption algorithm using iv 

const salt = crypto.randomBytes(16); // Generate a random salt

const iKey = crypto.scryptSync(key, salt, 32);
const iv = crypto.randomBytes(16);

const algorithm = "aes-256-gcm";

const cipherIV = crypto.createCipheriv(algorithm, iKey, iv);
let encryptedData = cipherIV.update(dataForEncryption, 'utf8', 'hex');
encryptedData += cipherIV.final('hex');

// Get the authentication tag
const tag = cipherIV.getAuthTag();

const deciptheriv = crypto.createDecipheriv(algorithm, iKey, iv);
// Set the authentication tag
deciptheriv.setAuthTag(tag);
let decryptedData = deciptheriv.update(encryptedData, 'hex', 'utf8');
decryptedData += deciptheriv.final('utf8');

console.log(encryptedData);
console.log(decryptedData);

// Asymmetric Encryption and Decryption


// creating key pair public key and private key

const asymmetricAlgorithm = 'rsa';
const bits = 2048;

let keypair = crypto.generateKeyPairSync(asymmetricAlgorithm, {
    modulusLength: bits,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    }
});

const {privateKey,publicKey} = keypair;
console.log('Public Key:');
console.log(publicKey);

console.log('\nPrivate Key:');
console.log(privateKey);


let encryptedDataUsingRSA =  crypto.publicEncrypt(publicKey,Buffer.from(dataForEncryption));
let decryptionDataUsingRSA = crypto.privateDecrypt(privateKey,Buffer.from(encryptedDataUsingRSA));

console.log("encrypted data is ",encryptedDataUsingRSA.toString('hex'));
console.log("decryption data is ",decryptionDataUsingRSA.toString('utf8'));