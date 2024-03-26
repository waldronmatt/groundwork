import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

const getHtmlInputs = (dirPath) => {
  const entries = {};
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    if (file.endsWith('.html')) {
      const name = file.replace('.html', '');
      entries[name] = path.resolve(dirPath, file);
    }
  }

  return entries;
};

const htmlInputPath = './src/html';
const inputObject = getHtmlInputs(htmlInputPath);

export default defineConfig({
  base: './',
  server: {
    open: './src/html/index.html',
  },
  build: {
    rollupOptions: {
      input: inputObject,
    },
  },
});
