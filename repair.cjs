const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'src', 'js');
const files = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));

files.forEach(file => {
  const filePath = path.join(jsDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  content = content.replace(/\\`/g, '`');
  content = content.replace(/\\\${/g, '${');
  content = content.replace(/\\}/g, '}');
  
  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Fixed escape sequences in JS files.');
