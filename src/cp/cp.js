import url from 'url';
import path from 'path';
import { spawn } from 'child_process';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
    process.stdout.write('\x1b[32mProcess created!\x1b[30m\nType \'\x1b[35mCLOSE\x1b[30m\' to exit\x1b[37m\n\n');

    const childPath = path.join(__dirname, 'files', 'script.js');
    const childProcess = spawn('node', [childPath, ...args]);

    process.stdin.on('data', (data) => {
        childProcess.stdin.write(data);
        if (data.toString().trim() === 'CLOSE') {
            console.log('\n\x1b[32mClosed successfully!\x1b[37m');
            process.exit();
        }
    });
    
    process.stdin.on('end', () => {
        childProcess.stdin.end();
    });

    childProcess.stdout.on('data', (data) => {
        process.stdout.write(data.toString());
    });
};

const someArgumentsArr = [];

for (let i = 0; i < 5; i++) {
    someArgumentsArr.push(`someString${(i + 1).toString()}`);
}

spawnChildProcess(someArgumentsArr);
