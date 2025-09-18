#!/usr/bin/env node

/**
 * Script to update cache version across all workflow files
 * Usage: node scripts/update-cache-version.js [new-version]
 * Example: node scripts/update-cache-version.js v3
 */

const fs = require('fs');
const path = require('path');

const WORKFLOW_DIR = '.github/workflows';
const CACHE_CONFIG_FILE = '.github/cache-config.yml';

function updateCacheVersion(newVersion) {
  console.log(`🔄 Updating cache version to ${newVersion}...`);

  // Find all workflow files
  const workflowFiles = fs
    .readdirSync(WORKFLOW_DIR)
    .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
    .map(file => path.join(WORKFLOW_DIR, file));

  let updatedFiles = 0;

  workflowFiles.forEach(file => {
    try {
      let content = fs.readFileSync(file, 'utf8');

      // Update CACHE_VERSION in workflow files
      const cacheVersionRegex = /CACHE_VERSION:\s*['"]?v\d+['"]?/g;
      if (cacheVersionRegex.test(content)) {
        content = content.replace(cacheVersionRegex, `CACHE_VERSION: '${newVersion}'`);
        fs.writeFileSync(file, content);
        console.log(`✅ Updated ${file}`);
        updatedFiles++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${file}:`, error.message);
    }
  });

  // Update cache config file
  try {
    let configContent = fs.readFileSync(CACHE_CONFIG_FILE, 'utf8');
    const versionRegex = /Cache version can be incremented to force refresh/;
    if (versionRegex.test(configContent)) {
      configContent = configContent.replace(
        versionRegex,
        `Cache version can be incremented to force refresh (current: ${newVersion})`
      );
      fs.writeFileSync(CACHE_CONFIG_FILE, configContent);
      console.log(`✅ Updated ${CACHE_CONFIG_FILE}`);
      updatedFiles++;
    }
  } catch (error) {
    console.error(`❌ Error updating ${CACHE_CONFIG_FILE}:`, error.message);
  }

  console.log(`\n🎉 Updated ${updatedFiles} files with cache version ${newVersion}`);
  console.log('\n📝 Next steps:');
  console.log('1. Commit the changes');
  console.log('2. Push to trigger new cache creation');
  console.log('3. Monitor cache hit rates in GitHub Actions');
}

function getCurrentVersion() {
  try {
    const content = fs.readFileSync(path.join(WORKFLOW_DIR, 'ci-cd-optimized.yml'), 'utf8');
    const match = content.match(/CACHE_VERSION:\s*['"]([^'"]+)['"]/);
    return match ? match[1] : 'unknown';
  } catch (error) {
    return 'unknown';
  }
}

// Main execution
const newVersion = process.argv[2];
const currentVersion = getCurrentVersion();

if (!newVersion) {
  console.log(`Current cache version: ${currentVersion}`);
  console.log('\nUsage: node scripts/update-cache-version.js [new-version]');
  console.log('Example: node scripts/update-cache-version.js v3');
  process.exit(1);
}

if (newVersion === currentVersion) {
  console.log(`Cache version is already ${currentVersion}`);
  process.exit(0);
}

updateCacheVersion(newVersion);
