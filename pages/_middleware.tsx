import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { usePersonalizeMiddleware } from '@builder.io/personalization-utils/dist/use-personalize-middleware'

export default function middleware(
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) {
  usePersonalizeMiddleware(req, res, next)
}
