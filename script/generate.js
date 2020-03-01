const path = require('path');
const fs = require('fs');
const {capitalize, camelCase} = require('lodash');

const shapePath = path.join(__dirname, '../src/assets/shapes');
const shapeFiles = fs.readdirSync(shapePath);

const assetsFile = path.join(__dirname, '../src/assets/index.js');

let assetsFileImports = '';
let assetsFileExport = 'export default [';
shapeFiles.forEach(function (file) {
  if (file.endsWith('.svg')) {
    const [name] = file.split('.');
    const componentName = capitalize(camelCase(name))
    assetsFileImports += `import {ReactComponent as ${componentName}} from './shapes/${name}.svg';\n`; 
    assetsFileImports += `import {ReactComponent as Icon${componentName}} from './icons/${name}.svg';\n`; 
    assetsFileExport += `{
    name: '${name}',
    asset: ${componentName},
    icon: Icon${componentName},
  },\n`
  }
});

const assetsFileContent = assetsFileImports + assetsFileExport + ']';
console.log(assetsFileContent)
fs.writeFileSync(assetsFile, assetsFileContent, 'utf8')

