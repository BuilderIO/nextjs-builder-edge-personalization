import type { GetStaticPropsContext } from 'next'
import Path from '../[[...path]]'
import builderConfig from '@config/builder'
import { builder } from '@builder.io/sdk'
import { getTargetingValues } from '@builder.io/personalization-utils'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  // getting the personalized page based on middleware generated rewrite
  const page =
    (await builder
      .get('page', {
        userAttributes: getTargetingValues(params?.path!),
        apiKey: builderConfig.apiKey,
        cachebust: true,
      })
      .toPromise()) || null

  return {
    props: {
      page,
    },
    revalidate: 5,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export default Path
