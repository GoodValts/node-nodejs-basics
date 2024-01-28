import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { cp } from 'fs';
const __dirname = dirname(fileURLToPath(import.meta.url));

const copy = async () => {
    const sourcePath = join(__dirname, 'files');
    const targetPath = join(__dirname, 'files_copy');
    const errorMessage= '\x1b[31mFS operation failed\x1b[37m';

    cp(sourcePath, targetPath, {errorOnExist: true, force: false, recursive: true}, (error) => {
        if (error) throw new Error(errorMessage);
    });
};

await copy();
