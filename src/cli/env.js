const parseEnv = () => {
    for (let key in process.env) {
        if (key.startsWith("RSS_")) {
            const value = process.env[key];
            console.log('\x1b[32m', `${key}=${value}`, '\x1b[37m');
        }
    }
};

parseEnv();