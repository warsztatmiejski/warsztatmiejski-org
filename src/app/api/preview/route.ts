// src/app/api/preview/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const slug = searchParams.get('slug') || '';
  const collection = searchParams.get('collection') || 'pages';

  // Construct the preview URL
  const url = `/${slug}?collection=${collection}&preview=true`;

  return NextResponse.redirect(new URL(url, req.url));
}