# GitHub Actions CI/CD

This repository includes comprehensive GitHub Actions workflows for automated testing, building, and deployment.

## 🚀 Workflows

### 1. CI/CD Pipeline (`ci-cd.yml`)

**Triggers:** Push to `main`/`preview`, Pull Requests

**Jobs:**

- **Lint & Type Check**: ESLint, TypeScript, Prettier validation
- **Build & Test**: Production build verification
- **Security Audit**: Dependency vulnerability scanning
- **Performance Check**: Lighthouse CI on PRs
- **Deploy Preview**: Auto-deploy to Vercel preview
- **Deploy Production**: Auto-deploy to Vercel production

### 2. Security Scan (`security-scan.yml`)

**Triggers:** Push, PR, Daily schedule

**Features:**

- CodeQL analysis for security vulnerabilities
- Trivy filesystem scanning
- Dependency review on PRs
- Daily security monitoring

### 3. Performance Monitoring (`performance-monitor.yml`)

**Triggers:** Push, Daily schedule

**Features:**

- Lighthouse CI performance testing
- Core Web Vitals monitoring
- PR comments with performance scores
- Daily performance regression detection

### 4. Dependency Updates (`dependency-update.yml`)

**Triggers:** Weekly schedule, Manual

**Features:**

- Automatic dependency updates
- Security vulnerability fixes
- Automated PR creation
- Test verification after updates

## 🔧 Setup Requirements

### Required Secrets

Add these secrets to your GitHub repository:

```bash
# Vercel Deployment
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

### Getting Vercel Credentials

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project settings
3. Go to "General" tab
4. Copy the Project ID
5. Go to [Account Settings](https://vercel.com/account/tokens)
6. Create a new token
7. Get your Team ID from the URL or API

## 📊 Performance Thresholds

The workflows enforce these performance standards:

| Metric         | Threshold | Action  |
| -------------- | --------- | ------- |
| Performance    | ≥ 80%     | Warning |
| Accessibility  | ≥ 90%     | Error   |
| Best Practices | ≥ 80%     | Warning |
| SEO            | ≥ 80%     | Warning |
| LCP            | ≤ 4s      | Warning |
| FID            | ≤ 300ms   | Warning |
| CLS            | ≤ 0.1     | Warning |

## 🛠️ Local Development

To run the same checks locally:

```bash
# Install dependencies
pnpm install

# Run linting
pnpm lint

# Type check
pnpm type-check

# Check formatting
pnpm format:check

# Build
pnpm build

# Security audit
pnpm audit

# Start for testing
pnpm start
```

## 📈 Monitoring

- **Performance**: Check Lighthouse CI results in workflow logs
- **Security**: Monitor security alerts in GitHub Security tab
- **Dependencies**: Review automated PRs for updates
- **Deployments**: Check Vercel dashboard for deployment status

## 🔄 Workflow Status

All workflows include status badges that you can add to your README:

```markdown
![CI/CD](https://github.com/yourusername/portfolio-ai/workflows/CI/CD%20Pipeline/badge.svg)
![Security](https://github.com/yourusername/portfolio-ai/workflows/Security%20Scan/badge.svg)
![Performance](https://github.com/yourusername/portfolio-ai/workflows/Performance%20Monitoring/badge.svg)
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**: Check Node.js version compatibility
2. **Security Alerts**: Review and update vulnerable dependencies
3. **Performance Regression**: Check Lighthouse CI results
4. **Deployment Issues**: Verify Vercel credentials and project settings

### Getting Help

- Check workflow logs in the Actions tab
- Review GitHub's [Actions documentation](https://docs.github.com/en/actions)
- Check [Vercel's deployment docs](https://vercel.com/docs)
