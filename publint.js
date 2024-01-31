// lifted from https://github.com/formkit/formkit/blob/master/scripts/lint.mjs
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagesDir = resolve(__dirname, './packages');

function getPackages() {
  const availablePackages = fs.readdirSync(packagesDir);
  return availablePackages;
}

async function publint(packages) {
  if (!packages) {
    const packages = await getPackages();
    if (process.argv[2] && packages.includes(process.argv[2])) {
      return await publint([process.argv[2]]);
    }
    return await publint(packages);
  }
  const pkg = packages.shift();
  if (!pkg) return;
  await execa('npx', ['publint', `./packages/${pkg}`]).pipeStdout(process.stdout);
  publint(packages);
}

publint();
