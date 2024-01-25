import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));


const read = async () => {
    const errorMessage= 'FS operation failed';
    const fileName = join(__dirname, 'files', 'fileToRead.txt');

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            throw new Error(errorMessage)
        } else {
            console.log(data);
        }
    })
};

await read();