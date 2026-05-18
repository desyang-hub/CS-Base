import { rm, readdir, mkdir, copyFile, readFile, writeFile } from 'fs/promises';
import { join, dirname } from 'path';

const docsDir = join(import.meta.dirname, '..');

const renames = [
  { name: 'cs-learn', src: 'cs_learn' },
  { name: 'reader-note', src: 'reader_nb' },
];

async function copyDir(src, dest) {
  await mkdir(dest, { recursive: true });
  const entries = await readdir(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await mkdir(dirname(destPath), { recursive: true });
      await copyFile(srcPath, destPath);
    }
  }
}

async function fixMdLinks(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await fixMdLinks(fullPath);
    } else if (entry.name.endsWith('.md')) {
      let content = await readFile(fullPath, 'utf-8');

      // Convert .html links to .md
      content = content.replace(/\(([./\w-]*)\.html\)/g, '($1.md)');

      // Fix broken links: /cs_learn/ -> /cs-learn/, /reader_nb/ -> /reader-note/
      content = content.replace(/\/cs_learn\//g, '/cs-learn/');
      content = content.replace(/\/reader_nb\//g, '/reader-note/');

      // Fix links like /os/3_memory/linux_mem -> keep as-is (file exists)
      // Fix [text](/reader_nb/1_reader) -> [text](/reader_nb/1_reader.md)
      content = content.replace(/\(([./\w-]*)\)/g, (match, p1) => {
        if (p1.includes('.md') || p1.includes('.html')) return match;
        // Add .md extension for links without extension
        if (p1.startsWith('/') || p1.startsWith('./') || p1.startsWith('../')) {
          return `(${p1}.md)`;
        }
        return match;
      });

      await writeFile(fullPath, content, 'utf-8');
    }
  }
}

async function main() {
  console.log('=== Setting up docs/ for VitePress ===\n');

  for (const rename of renames) {
    const srcPath = join(docsDir, rename.src);
    const dstPath = join(docsDir, rename.name);

    console.log(`${rename.src} -> ${rename.name} ...`);
    await rm(dstPath, { recursive: true, force: true });
    await copyDir(srcPath, dstPath);
    await fixMdLinks(dstPath);
    await rm(srcPath, { recursive: true });
    console.log('  OK');
  }

  console.log('\nDone! Run `npm run docs:dev` or `npm run docs:build`.');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
