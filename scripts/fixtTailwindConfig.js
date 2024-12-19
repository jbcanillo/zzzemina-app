// scripts/fixTailwindConfig.js
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'tailwind.config.js');

fs.readFile(configPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading tailwind.config.js:', err);
    process.exit(1);
  }

  // If the config is using ES module syntax, convert it to CommonJS
  if (data.includes('import') || data.includes('export default')) {
    console.log('Converting tailwind.config.js to CommonJS syntax...');

    const commonJSConfig = data
      .replace('export default', 'module.exports =')
      .replace('import', 'const')
      .replace('from', '=')
      .replace(/(require\(["'])(.*?)(["']\))/g, 'require($2)');

    fs.writeFile(configPath, commonJSConfig, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to tailwind.config.js:', err);
        process.exit(1);
      }
      console.log('tailwind.config.js converted to CommonJS syntax.');
    });
  }
});
