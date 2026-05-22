import { NextRequest, NextResponse } from 'next/server'

const BLOG_HOST = 'blog.pulsepointheart.com'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase()

  if (host !== BLOG_HOST) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()

  if (url.pathname === '/') {
    url.pathname = '/blog'
    return NextResponse.rewrite(url)
  }

  if (!url.pathname.startsWith('/blog')) {
    url.pathname = `/blog${url.pathname}`
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|robots.txt|sitemap.xml).*)'],
}
