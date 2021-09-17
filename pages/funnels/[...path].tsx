import { useRouter } from 'next/router'
import {
  BuilderComponent,
  BuilderContent,
  builder,
  Builder,
} from '@builder.io/react'
import Head from 'next/head'
import { Link } from '@components/Link/Link'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import builderConfig from '@config/builder'

builder.init(builderConfig.apiKey)
Builder.isStatic = true

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  const topLevelPath = params?.path[0]
  const funnel = await resolveBuilderContent('funnel', {
    urlPath: '/' + (params?.path?.join('/') || ''),
  })
  const page = await resolveBuilderContent('funneled-page', {
    urlPath: '/' + (params?.path?.join('/') || ''),
  })

  return {
    props: {
      page,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 5 seconds
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  const pages = await builder.getAll('funnelled-pages', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  })

  const funnels = await builder.getAll('funnel', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  })

  // paths consist of funnel.subPath + page.data.url
  const paths = funnels
    .map((funnel) => {
      return pages
        .filter((page) => page.data?.funnel.id === funnel.id)
        .map((page) => `${funnel.data!.topLevelPath}/${page.data!.url}`)
    })
    .flat()
  return {
    paths,
    fallback: true,
  }
}

export default function Path({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <BuilderContent model="funnel">
        {(data) => {
          return (
            <BuilderComponent
              renderLink={Link}
              model="funneled-page"
              options={{
                query: {
                  'data.funnel': data.name || 'test',
                },
              }}
            />
          )
        }}
      </BuilderContent>
    </>
  )
}
