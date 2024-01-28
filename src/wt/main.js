import { Worker } from 'worker_threads';
import os from 'os';
import url from 'url';
import path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    console.log('\x1b[35mStarted\x1b[37m\n');

    const coreCount = os.cpus().length || 1;
    const resultArr = [];

    for (let i = 0; i < coreCount; i++) {
        const increment = 10;

        const worker = new Worker(path.join(__dirname, 'worker.js'));
        
        const resultPromise = new Promise((resolve) => {
            worker.on('message', (result) => {
                resolve({ status: 'resolved', data: result });
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });
        });

        worker.postMessage(increment + i);
        resultArr.push(resultPromise);
    }

    const output = await Promise.all(resultArr);

    console.log(`\x1b[34mResult:\x1b[37m`);
    console.log(output);

    console.log('\n\x1b[35mFinished\x1b[37m');

    process.exit()
};

performCalculations();