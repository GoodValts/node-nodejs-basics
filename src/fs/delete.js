import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const remove = async () => {
    const fileName = join(__dirname, 'files', 'fileToRemove.txt');
    const errorMessage= 'FS operation failed';

    fs.rm(fileName, (err => {
        if (err) throw new Error(errorMessage);
    }))
};

await remove();