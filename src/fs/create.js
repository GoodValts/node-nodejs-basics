import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const create = async () => {
    const fileName = 'fresh.txt';
    const fileContent = 'I am fresh and young';
    const pathToFile = join(__dirname, 'files', fileName);
    const errorMessage= '\x1b[31mFS operation failed\x1b[37m';
  
    fs.access(pathToFile, (err) => {
        if (err) {
            fs.writeFile(pathToFile, fileContent, () => {});
        } else {
            throw new Error(errorMessage);
        }
    });
};

await create();
