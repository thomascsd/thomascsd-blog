import { rm, readFile, writeFile, cp, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

(async () => {
  try {
    const rootPath = resolve(process.cwd(), '..');
    const blogDistPath = 'thomascsd.github.io';
    const targetDir = join(rootPath, blogDistPath);
    const sourceDir = resolve('dist/analog/public');

    console.log(`Target directory: ${targetDir}`);
    console.log(`Source directory: ${sourceDir}`);

    // Step 1: Delete files in thomascsd.github.io (excluding dot files like .git)
    console.log('step1:刪除thomascsd.github.io內的檔案');
    try {
      const files = await readdir(targetDir);
      for (const file of files) {
        // Skip hidden files/directories (like .git)
        if (file.startsWith('.')) continue;

        const filePath = join(targetDir, file);
        await rm(filePath, { recursive: true, force: true });
        console.log(`Deleted: ${file}`);
      }
    } catch (err) {
      if (err.code !== 'ENOENT') {
         console.error('Error cleaning target directory:', err);
         throw err;
      } else {
        console.log('Target directory does not exist, skipping clean.');
      }
    }

    // Step 2: Update sitemap.xml
    console.log('step2:更新sitemap.xml的網址');
    const sitemapPath = join(sourceDir, 'sitemap.xml');
    try {
      const buffer = await readFile(sitemapPath, 'utf-8');
      let sitemap = buffer;
      // Replace <loc> content to ensure trailing slash
      sitemap = sitemap.replace(/<loc>(.*)<\/loc>/gm, '<loc>$1/</loc>');
      // Fix double slashes if any created or existing
      sitemap = sitemap.replace(/https:\/\/thomascsd\.github\.io\/\//g, 'https://thomascsd.github.io/');
      await writeFile(sitemapPath, sitemap);
    } catch (err) {
       console.error('Error updating sitemap:', err);
       // We continue, as sitemap might not exist in dev builds
    }

    // Step 3: Copy files to thomascsd.github.io
    console.log('step3:複製檔案至thomascsd.github.io內的檔案');
    try {
      const sourceFiles = await readdir(sourceDir);
      for (const file of sourceFiles) {
        const srcPath = join(sourceDir, file);
        const destPath = join(targetDir, file);
        await cp(srcPath, destPath, { recursive: true });
        console.log(`Copied: ${file}`);
      }
    } catch (err) {
       console.error('Error copying files:', err);
       throw err;
    }

    console.log('Deployment preparation complete.');

  } catch (err) {
    console.error('Deployment failed:', err);
    process.exit(1);
  }
})();
