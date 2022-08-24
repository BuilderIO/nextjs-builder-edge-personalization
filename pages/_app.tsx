import type { AppProps } from 'next/app'
import { builder } from '@builder.io/react'
import builderConfig from '../config/builder'
import { ContextMenu } from '@builder.io/personalization-context-menu'
import '../assets/index.css'
// only needed for context menu styling
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import '@builder.io/widgets/dist/lib/builder-widgets-async'

builder.init(builderConfig.apiKey)

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <ContextMenu />
    </>
  )
}
