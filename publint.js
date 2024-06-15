import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagesDir = resolve(__dirname, './packages');
const templatesDir = resolve(__dirname, './templates');

function getDirectories(dir) {
  return fs.readdirSync(dir).filter((file) => fs.statSync(resolve(dir, file)).isDirectory());
}

function getPackagesAndTemplates() {
  const packages = getDirectories(packagesDir);
  const templates = getDirectories(templatesDir);
  return [...packages.map((pkg) => `./packages/${pkg}`), ...templates.map((tmpl) => `./templates/${tmpl}`)];
}

async function publint(directories) {
  if (!directories) {
    const directories = await getPackagesAndTemplates();
    if (process.argv[2] && directories.includes(process.argv[2])) {
      return await publint([process.argv[2]]);
    }
    return await publint(directories);
  }
  const dir = directories.shift();
  if (!dir) return;
  await execa('npx', ['publint', dir]).pipeStdout(process.stdout);
  publint(directories);
}

publint();
