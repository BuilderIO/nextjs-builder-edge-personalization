import type { GetStaticPropsContext } from 'next'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import 'react-tiny-fab/dist/styles.css';
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

  return {
    paths: [],
    fallback: true,
  }
}


export default Path;