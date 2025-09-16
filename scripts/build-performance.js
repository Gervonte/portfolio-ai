#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Performance tracking
class BuildPerformance {
  constructor() {
    this.startTime = Date.now();
    this.steps = [];
  }

  step(name) {
    const now = Date.now();
    const duration = now - this.startTime;
    this.steps.push({ name, duration, timestamp: now });
    console.log(`⏱️  ${name}: ${duration}ms`);
    return now;
  }

  getTotalTime() {
    return Date.now() - this.startTime;
  }

  generateReport() {
    const totalTime = this.getTotalTime();
    const report = {
      timestamp: new Date().toISOString(),
      totalTime,
      steps: this.steps,
      summary: {
        'Total Build Time': `${totalTime}ms`,
        'Steps Count': this.steps.length,
        'Average Step Time': `${Math.round(totalTime / this.steps.length)}ms`,
      },
    };

    // Save report
    const reportPath = path.join(projectRoot, '.next', 'build-performance.json');
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    return report;
  }
}

// Build performance monitoring
function monitorBuild() {
  console.log('🚀 Starting build performance monitoring...\n');

  const perf = new BuildPerformance();

  try {
    // Clean build
    perf.step('Clean previous build');
    execSync('rm -rf .next', { cwd: projectRoot, stdio: 'pipe' });

    // Type check
    perf.step('Type checking');
    execSync('npm run type-check', { cwd: projectRoot, stdio: 'pipe' });

    // Linting
    perf.step('Linting');
    execSync('npm run lint', { cwd: projectRoot, stdio: 'pipe' });

    // Build
    perf.step('Next.js build');
    execSync('npm run build', { cwd: projectRoot, stdio: 'pipe' });

    // Generate report
    const report = perf.generateReport();

    console.log('\n📊 Build Performance Report:');
    console.log('============================');
    Object.entries(report.summary).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    console.log('\n📈 Step Breakdown:');
    report.steps.forEach((step, index) => {
      const percentage = ((step.duration / report.totalTime) * 100).toFixed(1);
      console.log(`${index + 1}. ${step.name}: ${step.duration}ms (${percentage}%)`);
    });

    console.log(`\n💾 Report saved to: .next/build-performance.json`);
  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

// Compare builds
function compareBuilds() {
  const reportPath = path.join(projectRoot, '.next', 'build-performance.json');

  if (!fs.existsSync(reportPath)) {
    console.log('❌ No build performance report found. Run "npm run build:perf" first.');
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));

  console.log('📊 Latest Build Performance:');
  console.log('============================');
  Object.entries(report.summary).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });

  console.log('\n📈 Step Breakdown:');
  report.steps.forEach((step, index) => {
    const percentage = ((step.duration / report.totalTime) * 100).toFixed(1);
    console.log(`${index + 1}. ${step.name}: ${step.duration}ms (${percentage}%)`);
  });
}

// Main function
function main() {
  const command = process.argv[2];

  switch (command) {
    case 'monitor':
    case 'perf':
      monitorBuild();
      break;
    case 'compare':
    case 'report':
      compareBuilds();
      break;
    default:
      console.log('🔧 Build Performance Tool\n');
      console.log('Usage:');
      console.log('  node scripts/build-performance.js monitor  - Monitor build performance');
      console.log('  node scripts/build-performance.js compare  - Show latest build report');
      break;
  }
}

main();
