# Troubleshooting Guide

Quick solutions to common issues with the Portfolio AI project.

## 🖼️ Image Issues

### Images Not Showing (404 Errors)

**Problem**: Images return 404 errors in browser console

```
GET /images/projects/portfolio-ai2.png 404
```

**Solution**:

1. **Check file exists**: Ensure the image file is in `/public/images/projects/`
2. **Verify filename**: Check the `imagePath` in `projects-metadata.json` matches exactly
3. **Check file permissions**: Ensure the file is readable
4. **Restart dev server**: Sometimes needed after adding new files

**Quick Fix**:

```bash
# Check if file exists
ls -la public/images/projects/

# Restart dev server
npm run dev
```

### Current Image Status

- ✅ `portfolio-ai.svg` - Working (SVG format)
- ✅ `audio-analyzer.svg` - Working (SVG format)
- ❌ `portfolio-ai2.png` - Missing file (404 error)
- ❌ `audio-analyzer3.png` - Missing file (404 error)

**To Fix**: Either add the missing PNG files or update the metadata to use the existing SVG files.

## 🔧 Build Issues

### JSON Parse Errors

**Problem**:

```
Module parse failed: Cannot parse JSON: Unexpected token ']'
```

**Solution**:

1. Check `src/data/projects-metadata.json` for syntax errors
2. Look for trailing commas or missing quotes
3. Use a JSON validator

**Quick Fix**:

```bash
# Validate JSON
node -e "JSON.parse(require('fs').readFileSync('src/data/projects-metadata.json', 'utf8'))"
```

### TypeScript Errors

**Problem**: Type errors in components

**Solution**:

1. Run `npm run lint:fix`
2. Check import statements
3. Verify type definitions

## 🚀 Performance Issues

### Slow Loading

**Problem**: Images or pages load slowly

**Solution**:

1. **Optimize images**: Compress before adding
2. **Check caching**: Verify cache headers
3. **Use local images**: Faster than external screenshots

### Memory Issues

**Problem**: High memory usage during development

**Solution**:

1. Restart dev server periodically
2. Clear Next.js cache: `rm -rf .next`
3. Check for memory leaks in components

## 🌐 Network Issues

### Screenshot API Failures

**Problem**: Screenshot generation fails

**Solution**:

1. **Use local images**: More reliable
2. **Check network**: Ensure internet connection
3. **Fallback system**: Will use SVG placeholders

### CORS Issues

**Problem**: Cross-origin request blocked

**Solution**:

1. Check API route configuration
2. Verify headers in response
3. Use local images as fallback

## 📱 Responsive Issues

### Mobile Display Problems

**Problem**: Layout breaks on mobile

**Solution**:

1. Test with browser dev tools
2. Check Mantine responsive props
3. Verify CSS media queries

### Image Sizing

**Problem**: Images don't fit containers properly

**Solution**:

1. Use `object-fit: cover` and `object-position: center top`
2. Ensure proper aspect ratios
3. Test with different image sizes

## 🔍 Debugging Tips

### Enable Debug Mode

```bash
# Verbose logging
DEBUG=* npm run dev

# Check specific modules
DEBUG=next:* npm run dev
```

### Browser Dev Tools

1. **Console**: Check for JavaScript errors
2. **Network**: Monitor image loading
3. **Elements**: Inspect CSS and HTML

### Common Console Errors

- `404` - File not found
- `CORS` - Cross-origin issues
- `TypeError` - JavaScript errors
- `Module not found` - Import issues

## 🆘 Getting Help

### Before Asking for Help

1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Try the quick fixes above
4. Check browser console for errors

### When Reporting Issues

Include:

- Error messages from console
- Steps to reproduce
- Browser and device info
- Screenshots if applicable

### Quick Commands

```bash
# Check project status
npm run lint
npm run build

# Clear caches
rm -rf .next
npm run dev

# Validate data
node -e "console.log(JSON.parse(require('fs').readFileSync('src/data/projects-metadata.json', 'utf8')))"
```

---

**Still having issues?** Check the [Development Guide](DEVELOPMENT.md) or open a GitHub issue.
