import type { AppProps } from 'next/app'

import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import '@assets/index.css'
import { getTargetingCookies } from '@lib/cookie-utils'
import Cookies from 'js-cookie';


if (Builder.isBrowser) {
  const targeting = getTargetingCookies().reduce((acc, cookie) => {
    const value = Cookies.get(cookie);
    const key = cookie.split('builder.userAttributes.')[1];
    return {
      ...acc,
      [key]: value,
    }
  }, {});
  builder.setUserAttributes(targeting);
}

builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
