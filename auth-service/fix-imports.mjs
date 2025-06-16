import { readdir, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const extsToFix = ['.js']; // Only patch .js files post-build
const importRegex = /((?:import|export)[^'"]+from\s+['"])(\.{1,2}\/[^'"]+?)(?<!\.js|\.ts|\.json)(['"])/g;

async function processFile(filePath) {
  const code = await readFile(filePath, 'utf8');

  if (!importRegex.test(code)) {
    console.log(`⚠️  No matches in: ${filePath}`);
    return;
  }

  const fixedCode = code.replace(importRegex, '$1$2.js$3');

  if (code !== fixedCode) {
    console.log(`✅ Fixed: ${filePath}`);
    await writeFile(filePath, fixedCode, 'utf8');
  }
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (extsToFix.includes(extname(entry.name))) {
      await processFile(fullPath);
    }
  }
}

console.log(`🔍 Scanning ./dist...`);
await walk('./dist');
