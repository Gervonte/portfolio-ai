import { NextRequest, NextResponse } from 'next/server';
import { getCachedScreenshot, cacheScreenshot } from '@/lib/screenshot-cache';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const width = parseInt(searchParams.get('width') || '1200');
  const height = parseInt(searchParams.get('height') || '630');
  const fullPage = searchParams.get('fullPage') === 'true';

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Validate URL
    const targetUrl = new URL(url);

    // Check cache first
    const cachedImage = await getCachedScreenshot(url, width, height);
    if (cachedImage) {
      return new NextResponse(cachedImage as BodyInit, {
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'public, max-age=604800', // Cache for 7 days
          'X-Cache': 'HIT',
        },
      });
    }

    // Use a reliable screenshot service
    // For full page screenshots, we'll request a taller image to capture more content
    let screenshotUrl;

    if (fullPage) {
      // Request a taller image to capture more content vertically
      // This will show more of the page content
      const fullPageHeight = Math.max(height * 2, 400); // 2x the requested height
      screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(targetUrl.toString())}/${width}/${fullPageHeight}`;
    } else {
      // Regular screenshot
      screenshotUrl = `https://v1.screenshot.11ty.dev/${encodeURIComponent(targetUrl.toString())}/${width}/${height}`;
    }

    // Fetch the screenshot
    const response = await fetch(screenshotUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Screenshot-Bot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Screenshot API returned ${response.status}`);
    }

    const imageBuffer = await response.arrayBuffer();
    let buffer = Buffer.from(imageBuffer);

    // If this was a full page request, we need to crop it to the requested dimensions
    if (fullPage) {
      // For now, we'll return the full image and let the browser handle cropping
      // In a production environment, you might want to use a library like sharp to crop
      // the image server-side to the exact dimensions
    }

    // Cache the screenshot
    await cacheScreenshot(url, width, height, buffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=604800', // Cache for 7 days
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Screenshot generation error:', error);

    // Fallback to a simple placeholder using Vercel's OG image generation
    const domain = new URL(url).hostname.replace('www.', '');

    // Generate a simple placeholder image
    const placeholderSvg = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E91E63;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#F8BBD9;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle">${domain}</text>
      </svg>
    `;

    return new NextResponse(placeholderSvg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
        'X-Cache': 'PLACEHOLDER',
      },
    });
  }
}
