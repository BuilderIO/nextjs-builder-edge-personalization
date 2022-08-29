import { NextResponse, NextRequest } from 'next/server'
import {
  getPersonlizedURL
} from '@builder.io/personalization-utils/next'

const regex = /^(.+\.)/

const shouldRewrite = (pathname: string) => {
  // only in netlify needed
  if (pathname.startsWith('/builder')) {
    return false;
  }
  // do not rewrite api requests
  if (pathname.startsWith('/api')) {
    return false;
  }
  // don't rewrite for asset requests (has a file extension)
  return !regex.test(pathname);
}

export default function middleware(request: NextRequest) {
  const url = request.nextUrl
  if (shouldRewrite(url.pathname)) {
    const personalizedURL = getPersonlizedURL(request)
    return NextResponse.rewrite(personalizedURL)
  }
  return NextResponse.next();
}
