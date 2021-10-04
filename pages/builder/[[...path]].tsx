import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import 'react-tiny-fab/dist/styles.css';
import { targetingAttributes } from '@lib/constants'
import { getTargetingValues, getUrlSegment } from '@lib/url-utils'
import Path from '../[[...path]]';
export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[], targeting?: any}>) {
  const page = await resolveBuilderContent('page', {
    ...getTargetingValues(params?.path!)
  }, true)

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
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  }) 

  const paths = pages.reduce((acc: any[], page) => {
    return [
      ...acc,
      // todo generic
      ...targetingAttributes.gender.map(gender => ({
        params: {
          path: getUrlSegment({
            url: page.data?.url,
            gender,
          }),
        }
      }))
    ]
  } ,[]);
  return {
    paths,
    fallback: true,
  }
}


export default Path;