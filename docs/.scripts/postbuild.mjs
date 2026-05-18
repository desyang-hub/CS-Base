import { copyFile, readdir, readFile, writeFile, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dist = join(__dirname, '..', '.vitepress', 'dist');

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if ((await stat(fullPath)).isDirectory()) {
      await walk(fullPath);
    } else if (entry.name.endsWith('.html')) {
      let content = await readFile(fullPath, 'utf-8');
      // Rewrite home page link: /CS-Base/README.html -> /CS-Base/
      content = content.replace(/href="([^"]*?)\/CS-Base\/README\.html([^"]*?)"/g, 'href="/CS-Base/$2"');
      await writeFile(fullPath, content, 'utf-8');
    }
  }
}

async function main() {
  // Create .nojekyll
  if (!existsSync(join(dist, '.nojekyll'))) {
    await writeFile(join(dist, '.nojekyll'), '');
    console.log('Created .nojekyll');
  }

  // Create index.html from README.html
  if (existsSync(join(dist, 'README.html'))) {
    await copyFile(join(dist, 'README.html'), join(dist, 'index.html'));
    console.log('Created index.html');
  }

  // Fix HTML links in all pages
  await walk(dist);
  console.log('Fixed links');
}

main().catch(err => {
  console.error('Post-build error:', err.message);
  process.exit(1);
});
