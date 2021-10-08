import type { AppProps } from 'next/app'
import { builder, Builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import '@assets/index.css'
import Cookies from 'js-cookie'
import { initUserAttributes } from '@builder.io/personalization-utils/dist/init-user-attributes'
// TODO: dynamic
import dynamic from 'next/dynamic';

const AsyncContextMenu = dynamic<any>(() => import('@components/ContextMenu').then(mod => mod.ConfiguratorContextMenu), { ssr: false})

initUserAttributes(Cookies.get())

builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <AsyncContextMenu />
    </>
  )
}
