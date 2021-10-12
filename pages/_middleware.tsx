import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { getPersonalizedRewrite } from '@builder.io/personalization-utils'

export default function middleware(
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) {
  if (
    req.url?.pathname.includes("favicon") ||
    req.url?.pathname.includes("api")
  ) {
    return next();
  }

  const rewrite = getPersonalizedRewrite(req.url?.pathname!, req.cookies);

  if (rewrite) {
    res.rewrite(rewrite);
  } else {
    next();
  }
}
