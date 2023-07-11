const fs = require('fs');

if (process.argv[2] === undefined) {
    console.error(`Usage: node csv2json.js <file.csv>`);
    process.exit(1);
}

const filename = process.argv[2];
console.log(filename);
const fileText = fs.readFileSync(filename).toString();
const allLines = fileText.split('\r\n');

const header = allLines[0];
const dataLines = allLines.slice(1);

const fieldNames = header.split(',');

let ojbList = [];
for (let i = 0; i < dataLines.length; i++) {
    //si hay lineas vacias salta
    if (dataLines[i] === "") {
        continue;
    }
    let obj = {};
    const data = dataLines[i].split(',');

    for (let j = 0; j < fieldNames.length; j++) {

        const fieldname = fieldNames[j].toLowerCase();
        const asNumber = Number(data[j])
        //si asNumber no es numero es texto
        obj[fieldname] = isNaN(asNumber) ? data[j] : asNumber;
    }
    ojbList.push(obj);
}

const jsonTxt = JSON.stringify(ojbList, null, 4);
const outputFilename = filename.replace(".csv", ".json");
fs.writeFileSync(outputFilename, jsonTxt);

