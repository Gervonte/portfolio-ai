#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Cache directories and files to manage
const cacheItems = [
  { path: '.next/cache', type: 'directory' },
  { path: '.next/static', type: 'directory' },
  { path: 'node_modules/.cache', type: 'directory' },
  { path: '.eslintcache', type: 'file' },
  { path: 'tsconfig.tsbuildinfo', type: 'file' },
];

// Cache size calculation
function getItemSize(itemPath, itemType) {
  if (!fs.existsSync(itemPath)) return 0;

  if (itemType === 'file') {
    return fs.statSync(itemPath).size;
  } else {
    let totalSize = 0;
    const files = fs.readdirSync(itemPath);

    for (const file of files) {
      const filePath = path.join(itemPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        totalSize += getItemSize(filePath, 'directory');
      } else {
        totalSize += stats.size;
      }
    }

    return totalSize;
  }
}

// Format bytes to human readable
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Clear cache items
function clearCache() {
  console.log('🧹 Clearing build caches...\n');

  let totalCleared = 0;

  for (const item of cacheItems) {
    const fullPath = path.join(projectRoot, item.path);

    if (fs.existsSync(fullPath)) {
      const size = getItemSize(fullPath, item.type);
      console.log(`📁 ${item.path}: ${formatBytes(size)}`);

      try {
        fs.rmSync(fullPath, { recursive: true, force: true });
        totalCleared += size;
        console.log(`   ✅ Cleared`);
      } catch (error) {
        console.log(`   ❌ Error: ${error.message}`);
      }
    } else {
      console.log(`📁 ${item.path}: Not found`);
    }
  }

  console.log(`\n🎉 Total cleared: ${formatBytes(totalCleared)}`);
}

// Show cache status
function showCacheStatus() {
  console.log('📊 Build Cache Status\n');

  let totalSize = 0;

  for (const item of cacheItems) {
    const fullPath = path.join(projectRoot, item.path);

    if (fs.existsSync(fullPath)) {
      const size = getItemSize(fullPath, item.type);
      totalSize += size;
      console.log(`📁 ${item.path}: ${formatBytes(size)}`);
    } else {
      console.log(`📁 ${item.path}: Not found`);
    }
  }

  console.log(`\n📈 Total cache size: ${formatBytes(totalSize)}`);
}

// Main function
function main() {
  const command = process.argv[2];

  switch (command) {
    case 'clear':
    case 'clean':
      clearCache();
      break;
    case 'status':
    case 'info':
      showCacheStatus();
      break;
    default:
      console.log('🔧 Cache Management Tool\n');
      console.log('Usage:');
      console.log('  node scripts/cache-management.js clear   - Clear all caches');
      console.log('  node scripts/cache-management.js status  - Show cache status');
      console.log('\nAvailable caches:');
      cacheItems.forEach(item => console.log(`  - ${item.path} (${item.type})`));
      break;
  }
}

main();
