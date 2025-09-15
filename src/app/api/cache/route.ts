import { NextRequest, NextResponse } from 'next/server';
import { getCacheStats, clearCache } from '@/lib/screenshot-cache';

export async function GET(request: NextRequest) {
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

export async function DELETE(request: NextRequest) {
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
