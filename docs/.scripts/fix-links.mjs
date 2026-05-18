import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dirs = [
  join(import.meta.dirname, '..', 'cs-learn'),
  join(import.meta.dirname, '..', 'reader-note'),
  join(import.meta.dirname, '..', 'os'),
  join(import.meta.dirname, '..', 'mysql'),
  join(import.meta.dirname, '..', 'network'),
  join(import.meta.dirname, '..', 'redis'),
];

async function fix(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dirPath, entry.name);
    if (entry.isDirectory()) {
      await fix(fullPath);
    } else if (entry.name.endsWith('.md')) {
      let content = await readFile(fullPath, 'utf-8');

      // Convert .html links to .md
      content = content.replace(/\(([./\w-]*)\.html\)/g, '($1.md)');

      // Fix path renames
      content = content.replace(/\/cs_learn\//g, '/cs-learn/');
      content = content.replace(/\/reader_nb\//g, '/reader-note/');

      // Fix broken relative links without extension
      // Match [text](/path/to/file) and convert to [text](/path/to/file.md)
      content = content.replace(
        /\]\(([./\w-]+)\)/g,
        (match, path) => {
          if (path.includes('.md') || path.includes('.html')) return match;
          if (path.startsWith('#')) return match; // anchor links
          if (!path.startsWith('/') && !path.startsWith('./') && !path.startsWith('../')) return match;
          return `](${path}.md)`;
        }
      );

      await writeFile(fullPath, content, 'utf-8');
      console.log(`Fixed: ${fullPath}`);
    }
  }
}

for (const dir of dirs) {
  try {
    await fix(dir);
  } catch (err) {
    console.error(`Skip ${dir}: ${err.message}`);
  }
}
console.log('Done.');
