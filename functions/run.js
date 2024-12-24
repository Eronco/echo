const fs = require('fs');
const path = require('path');

(async () => {
    const [,, funcName] = process.argv;

    const functions = fs.readdirSync(path.join(__dirname))
        .filter(file => file.endsWith('.js') && file != 'run.js')
        .map(file => file.replace('.js', ''))
    
    if (!funcName) {
        console.error('Please provide a function name to run.');
        process.exit(1);
    }

    if (!functions.includes(funcName)){
        console.error(funcName + ' is not a valid function name. avlalable functions: ' + functions.join(', '));
        process.exit(1);
    }

    try {
        const func = require(path.join(__dirname, `${funcName}.js`));
        if (typeof func !== 'function') throw new Error(`No valid function found in ${funcName}`);
        await func();
    } catch (error) {
        console.error(`Error running function "${funcName}":`, error.message);
    }
})();