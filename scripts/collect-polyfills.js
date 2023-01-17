const glob = require('glob');
const path = require('path');
const fs = require('fs');

/**
 * Read all files from the polyfill folder and put every thing in key => value object inside the
 * polyfill.ts file
 */
async function collect(depName) {
    const allFiles = glob.sync('**/*', {
        cwd: path.join(__dirname, '../polyfills'),
        nodir: true
    });
    const allFilesContents = {};
    for (const f of allFiles) {
        allFilesContents[f] = fs.readFileSync(path.join(__dirname, '../polyfills', f), 'utf8');
    }
    fs.writeFileSync(path.join(__dirname, '../src/polyfills.ts'), `export default ${JSON.stringify(allFilesContents)}`);
}

collect();
