# Screenshot Caching System

This directory contains the screenshot caching system for the portfolio's dynamic project thumbnails.

## Overview

The caching system provides:

- **File System Caching** - Stores screenshots locally for 7 days
- **Automatic Cleanup** - Removes expired entries and manages size limits
- **Cache Statistics** - Monitor cache performance and usage
- **CDN Integration** - Works with Vercel's edge caching

## Files

- `screenshot-cache.ts` - Core caching logic and utilities
- `screenshot.ts` - Screenshot generation and management
- `../app/api/screenshot/route.ts` - Screenshot API endpoint
- `../app/api/cache/route.ts` - Cache management API
- `../components/CacheManagement.tsx` - Admin interface for cache management

## How It Works

### 1. Screenshot Request Flow

```
1. Client requests screenshot via /api/screenshot?url=...&width=...&height=...
2. Check cache for existing screenshot
3. If cached: Return cached image with X-Cache: HIT header
4. If not cached: Generate new screenshot, cache it, return with X-Cache: MISS
```

### 2. Cache Storage

- **Location**: `.next/cache/screenshots/`
- **Format**: PNG files with MD5 hash filenames
- **Metadata**: JSON file tracking cache entries and expiration

### 3. Cache Management

- **Expiration**: 7 days (configurable)
- **Size Limit**: 100MB (configurable)
- **Cleanup**: Automatic removal of expired entries
- **LRU**: Least Recently Used eviction when size limit exceeded

## Configuration

Edit `CACHE_CONFIG` in `screenshot-cache.ts`:

```typescript
const CACHE_CONFIG: CacheConfig = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxSize: 100 * 1024 * 1024, // 100MB
  cacheDir: path.join(process.cwd(), '.next/cache/screenshots'),
};
```

## API Endpoints

### GET /api/screenshot

Generate or retrieve a cached screenshot.

**Parameters:**

- `url` (required) - Target URL to screenshot
- `width` (optional) - Image width (default: 1200)
- `height` (optional) - Image height (default: 630)

**Response:**

- `Content-Type: image/png`
- `X-Cache: HIT|MISS` - Cache status
- `Cache-Control: public, max-age=604800` - CDN caching

### GET /api/cache

Get cache statistics.

**Response:**

```json
{
  "success": true,
  "stats": {
    "totalEntries": 15,
    "totalSize": 5242880,
    "maxSize": 104857600,
    "hitRate": 0.85
  }
}
```

### DELETE /api/cache

Clear all cached screenshots.

**Response:**

```json
{
  "success": true,
  "message": "Cache cleared successfully"
}
```

## Cache Management UI

Visit `/cache-management` to:

- View cache statistics
- Monitor cache usage
- Clear cache manually
- Refresh statistics

## Performance Benefits

### Before Caching

- Every screenshot request hits external service
- Slow response times (2-5 seconds)
- High bandwidth usage
- Rate limiting issues

### After Caching

- First request: Generate and cache (2-5 seconds)
- Subsequent requests: Instant response (<100ms)
- Reduced bandwidth usage
- No rate limiting issues

## Monitoring

### Cache Hit Rate

Monitor the `X-Cache` header to track cache performance:

- `HIT` - Served from cache
- `MISS` - Generated new screenshot

### Cache Statistics

Use the `/api/cache` endpoint to monitor:

- Total cached entries
- Cache size vs. max size
- Hit rate percentage

## Troubleshooting

### Cache Not Working

1. Check `.next/cache/screenshots/` directory exists
2. Verify file permissions
3. Check disk space
4. Review error logs

### High Memory Usage

1. Reduce `maxSize` in configuration
2. Decrease `maxAge` for faster cleanup
3. Clear cache manually

### Slow Screenshot Generation

1. Check external service status
2. Verify URL accessibility
3. Consider using different screenshot service
4. Implement retry logic

## Production Considerations

### Vercel Deployment

- Cache directory is ephemeral on Vercel
- Consider using external storage (S3, Cloudinary)
- Implement cache warming on deployment

### Alternative Storage

For production, consider:

- **AWS S3** - Persistent storage with CDN
- **Cloudinary** - Image optimization and caching
- **Redis** - In-memory caching for high performance

### Monitoring

- Set up alerts for cache hit rate
- Monitor cache size growth
- Track screenshot generation errors
- Implement health checks

## Development

### Testing Cache

```bash
# Generate a screenshot (will be cached)
curl "http://localhost:3000/api/screenshot?url=https://example.com&width=1200&height=630"

# Check cache statistics
curl "http://localhost:3000/api/cache"

# Clear cache
curl -X DELETE "http://localhost:3000/api/cache"
```

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` to see cache operations in console.

## Future Enhancements

1. **Redis Integration** - For distributed caching
2. **Image Optimization** - WebP conversion and compression
3. **Batch Processing** - Generate multiple sizes at once
4. **CDN Integration** - Direct upload to CDN
5. **Analytics** - Track screenshot usage patterns
