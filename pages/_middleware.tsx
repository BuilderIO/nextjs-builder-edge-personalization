import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { usePersonalizeMiddleware } from '@lib/edge-personalization/use-personalize-middleware'

export default function middleware(
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) {
  usePersonalizeMiddleware(req, res, next)
}
