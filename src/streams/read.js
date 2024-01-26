import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {  
    const stream = fs.createReadStream(pathToFile);

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => {
            process.stdout.write(`\x1b[34m${chunk}\x1b[37m`);
        });

        stream.on('end', () => {
            console.log('');
            resolve();
        });

        stream.on('error', (err) => {
            console.log(err);
            reject(err);
        });
    });
};

await read();