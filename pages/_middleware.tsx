import type { EdgeRequest, EdgeResponse, EdgeNext } from 'next'
import { targetingAttributes } from '@lib/constants'
import { getUrlSegment } from '@lib/url-utils';

export default function middleware(req: EdgeRequest, res: EdgeResponse,   next: EdgeNext
  ) {
  // Get and set the bucket cookie
  if (req.url?.pathname.includes('favicon')) {
    return next();
  }
  const attributes = Object.keys(targetingAttributes);
  const values = attributes.reduce((acc, attr) => {
    const val= req.cookies[`builder.userAttributes.${attr}`];
    return {
      ...acc,
      ...(val && {[attr]: val}),
    }
  }, {});


  if (Object.keys(values).length > 0 ) {
    res.rewrite(`/builder/${getUrlSegment({
      urlPath: req.url?.pathname!,
      ...values,
    }).join('/')}`);  
  } else {
    next();
  }
}