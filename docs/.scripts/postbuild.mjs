import { copyFile, writeFile, readdir, readFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', '.vitepress', 'dist');
const PREFIX = '/CS-Base/';

// Recursively find all .html files
async function findAllHtml(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if ((await stat(fullPath)).isDirectory()) {
      files.push(...await findAllHtml(fullPath));
    } else if (entry.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Rewrite a single HTML file
function rewriteFile(filePath) {
  return readFile(filePath, 'utf-8').then(content => {
    // Rewrite href="X" or src="X" where X starts with / and is NOT already /CS-Base/
    // Skip href="/" (root link)
    const rewritten = content.replace(
      /(href|src)="\/(?!CS-Base)([^"]*)"/g,
      (match, attr, path) => {
        // Don't rewrite root link
        if (path === '/') return match;
        // Don't rewrite anchor links
        if (path.startsWith('#')) return match;
        // Don't rewrite external links
        if (path.startsWith('http')) return match;
        // Prefix with CS-Base
        return `${attr}="${PREFIX}${path}"`;
      }
    );
    return writeFile(filePath, rewritten, 'utf-8');
  }).catch(err => {
    console.error(`Failed to rewrite ${filePath}:`, err.message);
  });
}

async function main() {
  console.log('=== Post-build script ===');

  // Create .nojekyll
  if (!existsSync(join(dist, '.nojekyll'))) {
    await writeFile(join(dist, '.nojekyll'), '');
    console.log('Created .nojekyll');
  }

  // Create index.html from README.html
  if (existsSync(join(dist, 'README.html'))) {
    await copyFile(join(dist, 'README.html'), join(dist, 'index.html'));
    console.log('Created index.html from README.html');
  }

  // Find and rewrite all HTML files
  const htmlFiles = await findAllHtml(dist);
  console.log(`Found ${htmlFiles.length} HTML files to rewrite`);
  await Promise.all(htmlFiles.map(rewriteFile));
  console.log('Post-build done.');
}

main().catch(err => {
  console.error('Post-build error:', err.message);
  process.exit(1);
});
