import type { GetStaticPropsContext } from 'next'
import Path from '../[[...path]]'
import { getPersonalizedPage } from '@builder.io/personalization-utils'
import builderConfig from '@config/builder'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[] }>) {
  const page = await getPersonalizedPage(
    params?.path!,
    'page',
    builderConfig.apiKey
  )
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
