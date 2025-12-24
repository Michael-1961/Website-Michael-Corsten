#!/usr/bin/env node
/**
 * Validates that all publication references in research projects and focus areas exist
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load publications data
const publicationsPath = join(__dirname, '../src/content/publikationen.json');
const publicationsData = JSON.parse(readFileSync(publicationsPath, 'utf-8'));

const allPublicationIds = new Set();
publicationsData.publications.forEach((yearGroup) => {
  yearGroup.entries.forEach((entry) => {
    if (entry.id) {
      allPublicationIds.add(entry.id);
    }
  });
});

console.log(`Found ${allPublicationIds.size} publications with IDs`);

// Function to extract frontmatter from markdown files
function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = '';

  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      // Array item
      const value = line.trim().substring(1).trim().replace(/^["']|["']$/g, '');
      if (currentKey && Array.isArray(frontmatter[currentKey])) {
        frontmatter[currentKey].push(value);
      }
    } else if (line.includes(':')) {
      // Key-value pair
      const [key, ...valueParts] = line.split(':');
      const value = valueParts.join(':').trim();
      currentKey = key.trim();

      if (value === '') {
        // Might be start of array
        frontmatter[currentKey] = [];
      } else {
        frontmatter[currentKey] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return frontmatter;
}

// Check research projects and focus areas
const errors = [];
const contentDirs = [
  'src/content/forschungsprojekte/de',
  'src/content/forschungsprojekte/en',
  'src/content/forschungsschwerpunkte/de',
  'src/content/forschungsschwerpunkte/en',
];

contentDirs.forEach((dir) => {
  const fullPath = join(__dirname, '..', dir);
  try {
    const files = readdirSync(fullPath);

    files.forEach((file) => {
      if (!file.endsWith('.md')) return;

      const filePath = join(fullPath, file);
      const content = readFileSync(filePath, 'utf-8');
      const frontmatter = extractFrontmatter(content);

      if (frontmatter?.papers && Array.isArray(frontmatter.papers)) {
        frontmatter.papers.forEach((paperId) => {
          if (!allPublicationIds.has(paperId)) {
            errors.push(`${dir}/${file}: Invalid publication ID "${paperId}"`);
          }
        });
      }
    });
  } catch (err) {
    // Directory might not exist yet, skip
  }
});

if (errors.length > 0) {
  console.error('\n❌ Publication validation failed:\n');
  errors.forEach((err) => console.error(`  - ${err}`));
  console.error('');
  process.exit(1);
} else {
  console.log('✅ All publication references are valid');
}
