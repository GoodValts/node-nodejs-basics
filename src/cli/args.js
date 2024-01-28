const parseArgs = () => {
  for (let i = 2; i < process.argv.length; i += 2) {
    const argName = process.argv[i].replace(/--/, '');
    const argValue = process.argv[i + 1];
    
    console.log(`\x1b[34m${argName}\x1b[37m is \x1b[33m${argValue}\x1b[37m`);
  }
};

parseArgs();