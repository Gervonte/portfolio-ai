import { clearCache, getCacheStats } from '@/lib/screenshot-cache';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const stats = await getCacheStats();

    return NextResponse.json({
      success: true,
      stats,
      message: 'Cache statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Cache stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get cache statistics' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearCache();

    return NextResponse.json({
      success: true,
      message: 'Cache cleared successfully',
    });
  } catch (error) {
    console.error('Cache clear error:', error);
    return NextResponse.json({ success: false, error: 'Failed to clear cache' }, { status: 500 });
  }
}
