import fs from 'fs';
import zlib from 'zlib';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

const decompress = async () => {
    const fileName = 'fileToCompress.txt';
    const compressedFileName = 'archive.gz';
    const pathToFile = join(__dirname, 'files', fileName);
    const pathToArchive = join(__dirname, 'files', compressedFileName);

    const readStream = fs.createReadStream(pathToArchive);
    const writeStream = fs.createWriteStream(pathToFile);
    const gunzipStream = zlib.createGunzip();

    return new Promise((resolve, reject) => {
        readStream.pipe(gunzipStream).pipe(writeStream);
    
        writeStream.on('finish', () => {
            console.log(`\x1b[33m${compressedFileName}\x1b[37m have been decompressed to \x1b[35m${fileName}\x1b[37m`);
            resolve();
        });
    
        writeStream.on('error', (error) => {
            reject(error);
        });
      });
};

await decompress();