import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
    const fileName = join(__dirname, 'files', 'fileToRemove.txt');
    const errorMessage= '\x1b[31mFS operation failed\x1b[37m';

    fs.rm(fileName, (err => {
        if (err) throw new Error(errorMessage);
    }))
};

await remove();