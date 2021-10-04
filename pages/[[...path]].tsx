import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { BuilderComponent, Builder, builder } from '@builder.io/react'
import builderConfig from '@config/builder'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { resolveBuilderContent } from '@lib/resolve-builder-content'
import { Link } from '@components/Link/Link'
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import Cookies from 'js-cookie'
import { AiFillCalculator, AiOutlineMan, AiOutlineWoman, AiOutlinePropertySafety } from 'react-icons/ai';
import { targetingAttributes } from '@lib/constants'

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ path: string[]}>) {
  const page = await resolveBuilderContent('page', {
    urlPath: '/' + (params?.path?.join('/') || '')
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
  const pages = await builder.getAll('page', {
    options: { noTargeting: true },
    apiKey: builderConfig.apiKey,
  }) 

  return {
    paths: pages.reduce((acc: any[], page) => {
      // unique by url, since we'll be generating the other variation under /builder
      const found = acc.find(path => path.params.path === page.data?.url);
      if (found) {
        return acc;
      }
      return [
        ...acc,
        {
          params: {
            path: page.data?.url.split('/'),
          }
        },
      ]
    } ,[]),
    fallback: true,
  }
}


export default function Path({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  
  const router = useRouter()
  const setCookie= (name: string, val: string) => () => {
    Cookies.set(`builder.userAttributes.${name}`, val);
    router.reload();
  }

  const reset = ()=> {
    Object.keys(Cookies.get()).filter(cookie => cookie.startsWith('builder.userAttributes')).forEach(cookie => {
      Cookies.remove(cookie);
    });
    router.reload();
  }
  
  if (router.isFallback) {
    return <h1>Loading...</h1>
  }
  const isLive = !Builder.isEditing && !Builder.isPreviewing
  if (!page && isLive) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <meta name="title"></meta>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  const { title, description, image } = page?.data! || {}
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          title,
          description,
          images: [
            {
              url: image,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
        }}
      />
      <BuilderComponent renderLink={Link} model="page" content={page} />
      <Fab
  icon={<AiFillCalculator />}
>
  <Action
      text="Female"
      onClick={setCookie('gender', 'female')}
    >
    <AiOutlineWoman></AiOutlineWoman>
  </Action>
  <Action
      text="Male"
      onClick={setCookie('gender', 'male')}
    >
    <AiOutlineMan></AiOutlineMan>
  </Action>
  
  <Action
      text="Reset"
      onClick={reset}
    >
    <AiOutlinePropertySafety></AiOutlinePropertySafety>
  </Action>

</Fab>

    </>
  )
}
