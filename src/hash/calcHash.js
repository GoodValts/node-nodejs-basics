import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const calculateHash = async () => {
    const pathToFile = join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const hash = crypto.createHash('sha256');
    const stream = fs.createReadStream(pathToFile);

    return new Promise((resolve, reject) => {
        stream.on('data', (data) => {
            hash.update(data);
        });
    
        stream.on('end', () => {
            const fileHash = hash.digest('hex');
            console.log(fileHash);
            resolve();
        });
    
        stream.on('error', (err) => {
            reject(err);
        });
    });
};

await calculateHash();