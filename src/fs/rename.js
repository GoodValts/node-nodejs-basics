import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const rename = async () => {
    const fileName = join(__dirname, 'files', 'wrongFilename.txt');
    const correctName = join(__dirname, 'files', 'properFilename.md');
    const errorMessage= 'FS operation failed';

    fs.access(correctName, (err) => {
        if (err) {
            fs.rename(fileName, correctName, (err) => {
                if (err) throw new Error(errorMessage);
            });
        } else {
            throw new Error(errorMessage);
        }
    });
};

await rename();