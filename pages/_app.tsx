import type { AppProps } from 'next/app'
import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import '@assets/index.css'
import Cookies from 'js-cookie'
import { initUserAttributes } from '@builder.io/personalization-utils/dist/init-user-attributes'
// TODO: dynamic
import { Configurator } from '@builder.io/personalization-utils/dist/configurator';
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'


initUserAttributes(Cookies.get())

builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {' '}
      <Component {...pageProps} /> <Configurator></Configurator>
    </>
  )
}
