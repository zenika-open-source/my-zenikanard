const path = require('path');
const fs = require('fs');
const {capitalize, camelCase} = require('lodash');

const assetsFile = path.join(__dirname, 'src/assets-generated.ts');
const shapePath = path.join(__dirname, 'src/shapes');
const shapeFiles = fs.readdirSync(shapePath);

let assetsFileImports = '';
let assetsFileExport = '';
shapeFiles.forEach(function (file) {
  if (file.endsWith('.svg')) {
    const [name] = file.split('.');
    const componentName = capitalize(camelCase(name))
    assetsFileImports += `import ${componentName} from './shapes/${name}.svg';\n`; 
    assetsFileImports += `import Icon${componentName} from './icons/${name}.svg';\n`; 
    assetsFileExport += `{
    name: '${name}',
    asset: ${componentName},
    icon: Icon${componentName},
  },\n`
  }
});

const assetsFileContent = `
// @ts-nocheck
import { Asset } from './types'

${assetsFileImports}

export default [
  ${assetsFileExport}
] as Asset[];
`

// TODO make all async
fs.writeFileSync(assetsFile, assetsFileContent, 'utf8');

