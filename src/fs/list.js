import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const list = async () => {
    const errorMessage= 'FS operation failed';
    const folderName = join(__dirname, 'files');

    fs.readdir(folderName, (err, files) => {
        if (err) {
            throw new Error(errorMessage)
        } else {
            console.log(files);
        }
    })
};

await list();