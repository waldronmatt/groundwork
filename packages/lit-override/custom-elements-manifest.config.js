import fs from 'fs';
import { customElementsManifestToMarkdown } from '@custom-elements-manifest/to-markdown';

const manifest = JSON.parse(fs.readFileSync('./custom-elements.json', 'utf-8'));
const markdown = customElementsManifestToMarkdown(manifest, {
  headingOffset: 1,
  omitDeclarations: ['mixins', 'variables'],
  omitSections: ['super-class', 'static-methods'],
});

fs.writeFileSync('./custom-elements.md', markdown);
