import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { getUrlSegment } from './url-utils'

export const usePersonalizeMiddleware = (
  req: EdgeRequest,
  res: EdgeResponse,
  next: EdgeNext
) => {
  // Get and set the bucket cookie
  if (req.url?.pathname.includes('favicon')) {
    return next()
  }
  const attributes = Object.keys(req.cookies).filter((cookieName) =>
    cookieName.startsWith('builder.userAttributes')
  )

  const values = attributes.reduce((acc, cookie) => {
    const value = req.cookies[cookie]
    const key = cookie.split('builder.userAttributes.')[1]
    return {
      ...acc,
      ...(value && { [key]: value }),
    }
  }, {})

  if (Object.keys(values).length > 0) {
    res.rewrite(
      `/builder/${getUrlSegment({
        urlPath: req.url?.pathname!,
        ...values,
      }).join('/')}`
    )
  } else {
    next()
  }
}
