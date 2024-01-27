import { rejects } from 'assert';
import { resolve } from 'path';
import { Transform } from 'stream';

const transform = async () => {
    process.stdout.write('\x1b[32mProcess created!\x1b[30m\nType \'\x1b[35mclose\x1b[30m\' to exit\x1b[37m\n\n');

    const reverseTransform = new Transform({
        transform(chunk, encoding, callback) {
            const reversedChunk = chunk.toString().split('').reverse().join('');
            this.push(reversedChunk + '\n\x1b[30m---\x1b[37m\n');
            callback();           
        }
    });

    process.stdin.on('data', (data) => {
        if (data.toString().trim().toLowerCase() === 'close') {
            console.log('\x1b[35mProcess has been closed\x1b[37m');
            process.stdin.pause();
        } else {
            reverseTransform.write(data);
        }
    });

    process.on('SIGINT', () => {
        console.log('\n\x1b[31mProcess has been terminated by user\x1b[37m');
        process.exit();
    });
        
    reverseTransform.pipe(process.stdout);
};

await transform();