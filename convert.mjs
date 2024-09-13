import * as readline from 'node:readline';
import { HTMLToJSON } from 'html-to-json-parser';
import { readFileSync, writeFileSync } from 'fs';
import { exit } from 'node:process';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const text = {
    enter: 'Enter the HTML file path: ',
    start: 'Started processing...',
    loaded: 'File is loaded...',
    converted: 'File is converted...',
    finished: 'Finished! See file:',
};

async function go(fileName) {
    const param = {
        html_filename: `${fileName}.html`,
        json_filename: `${fileName}.json`,
        html_encoding: 'utf-8',
    }
    console.log(text.start);
    const rawHTML = readFileSync(param.html_filename, param.html_encoding);
    console.log(text.loaded);
    const rawJSON = await HTMLToJSON(rawHTML, true);
    console.log(text.converted);
    writeFileSync(param.json_filename, rawJSON);
    console.log(`${text.finished} ${param.json_filename}`);
    exit();
}

rl.question(text.enter, fileName => {
    rl.close();
    go(fileName);
});