import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
    parentPort.on('message', (data) => {
        // console.log('ws data=', data);
        const result = nthFibonacci(data);
        // console.log('ws res=', result);
        parentPort.postMessage(result);
    });
};

sendResult();