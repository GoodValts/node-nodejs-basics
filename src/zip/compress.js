import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const compress = async () => {
    const fileName = 'fileToCompress.txt';
    const compressedFileName = 'archive.gz';
    const pathToFile = join(__dirname, 'files', fileName);
    const pathToArchive = join(__dirname, 'files', compressedFileName);

    const readStream = fs.createReadStream(pathToFile);
    const writeStream = fs.createWriteStream(pathToArchive);
    const gzipStream = zlib.createGzip();

    return new Promise((resolve, reject) => {
        readStream.pipe(gzipStream).pipe(writeStream);
    
        writeStream.on('finish', () => {
            console.log(`\x1b[35m${fileName}\x1b[37m have been compressed to \x1b[33m${compressedFileName}\x1b[37m`);
            resolve();
        });
    
        writeStream.on('error', (error) => {
            reject(error);
        });
    });
};

await compress();