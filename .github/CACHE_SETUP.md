# Build Cache Setup for CI/CD

This repository uses advanced build caching to speed up CI/CD pipelines and reduce build times.

## 🚀 What's Cached

- **Dependencies**: `node_modules` and `~/.npm`
- **Next.js Build Cache**: `.next/cache`, `.next/static`, `.next/standalone`
- **ESLint Cache**: `.eslintcache` for faster linting
- **TypeScript Cache**: `.tsbuildinfo` for incremental compilation

## 📊 Performance Benefits

- **Faster Builds**: 50-80% reduction in build time
- **Faster Linting**: ESLint cache reduces lint time by 60-90%
- **Faster Type Checking**: TypeScript incremental compilation
- **Reduced CI Costs**: Less compute time = lower costs

## 🔧 Cache Management

### Update Cache Version

```bash
# Update to new version (e.g., v3)
npm run cache:update v3

# Or manually
node scripts/update-cache-version.js v3
```

### Cache Invalidation

- Cache automatically invalidates when `package-lock.json` changes
- Cache automatically invalidates when source code changes
- Increment `CACHE_VERSION` in workflow files to force refresh

### Monitor Cache Performance

Check GitHub Actions logs for cache hit rates:

- Look for "Cache restored from key" messages
- Look for "Cache not found for input keys" messages

## 📁 Files

- `.github/workflows/ci-cd.yml` - Main workflow with advanced caching
- `.github/cache-config.yml` - Cache configuration documentation
- `scripts/update-cache-version.js` - Cache version management script

## 🎯 Cache Strategy

1. **Primary Key**: OS + Node version + package-lock.json hash + source code hash
2. **Restore Keys**: Fallback to less specific keys for better hit rates
3. **Retention**: 30 days (configurable)
4. **Cleanup**: Automatic cleanup of old caches

## 🔍 Troubleshooting

### Cache Misses

- Check if `package-lock.json` changed
- Check if source code changed significantly
- Verify cache version is consistent across jobs

### Build Failures

- Clear cache by incrementing `CACHE_VERSION`
- Check for corrupted cache entries
- Verify all cached paths are correct

### Performance Issues

- Monitor cache hit rates in logs
- Adjust cache keys if needed
- Consider cache size limits (GitHub has 10GB limit per repo)

## 📈 Expected Results

With proper caching, you should see:

- **First run**: Normal build time
- **Subsequent runs**: 50-80% faster builds
- **Dependency changes**: Only affected parts rebuild
- **Source changes**: Only changed files recompile
