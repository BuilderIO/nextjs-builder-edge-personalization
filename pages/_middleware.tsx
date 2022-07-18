import { NextResponse, NextRequest } from 'next/server'
import {
  PersonalizedURL,
  getUserAttributes
} from '@builder.io/personalization-utils'

const personalizedPrefix = '/builder'
const excludededPrefixes = ['/favicon', '/api', '/sw.js', personalizedPrefix]

export default function middleware(request: NextRequest) {
  const url = request.nextUrl
  let response = NextResponse.next()
  const usePath = url.pathname
  if (!excludededPrefixes.find(path => usePath.startsWith(path))) {
    const query = Object.fromEntries(url.searchParams)
    const personlizedURL = new PersonalizedURL({
      pathname: usePath,
      attributes: {
        ...getUserAttributes({ ...request.cookies, ...query }),
        domain: request.headers.get('Host') || '',
        country: request.geo?.country || '',
      }
    })
    url.pathname = personlizedURL.rewritePath()
    return NextResponse.rewrite(url)
  }
  return response
}
