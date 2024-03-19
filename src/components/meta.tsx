import Head from 'next/head'

const Meta = (props: { pageTitle: string }) => {

  const { pageTitle } = props

  return (
    <Head>
      <title>{ pageTitle }</title>
      <meta name='description' content='Online Game' />
      <meta charSet='UTF-8' />
      <meta http-equiv='Content-Language' content='ja' />
      {/* TODO change title to suit your project */}
      <meta property='og:title' content='change title' />
      {/* TODO change description to suit your project*/}
      <meta property='og:description' content='change description' />
      <meta property='og:image' content='/favicon.svg' />
      {/* TODO change prod url */}
      <meta property='og:url' content={`${process.env.PROD_URL}`} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.svg' />
    </Head>
  )
}
export default Meta
