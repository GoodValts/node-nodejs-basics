import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = 'fileToWrite.txt';
const __dirname = dirname(fileURLToPath(import.meta.url));
const pathToFile = join(__dirname, 'files', __filename);

const write = async () => {
    const stream = fs.createWriteStream(pathToFile);

    process.stdin.setEncoding('utf8');

    process.stdin.on('data', (data) => {
        const input = data;

        if (input.trim().toLowerCase() === 'close') {
            stream.end();
            process.stdin.end();
        } else {
            stream.write(data);
        }
    });

    process.on('SIGINT', () => {
        stream.end();
        console.log(`\n\x1b[34mData has been written to \x1b[33m${pathToFile}\x1b[37m`);
        console.log('\n\x1b[31mProcess have been terminated by user\x1b[37m');
        process.exit();
    });

    return new Promise((resolve, reject) => {
        stream.on('open', () => {
            console.log('\x1b[32mProcess created!\x1b[30m\nType \'\x1b[35mclose\x1b[30m\' to exit\x1b[37m\n');
        });

        stream.on('close', () => {
            console.log(`\n\x1b[34mData has been written to \x1b[33m${pathToFile}\x1b[37m`);
            resolve();
            process.exit();
        });
    
        stream.on('error', (err) => {
            console.log(err);
            reject(err);
        });
    });
};

await write();