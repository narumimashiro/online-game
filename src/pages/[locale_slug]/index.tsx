import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Meta from '@/components/meta'
import { useLocaleSlug } from '@/hooks/useLocaleSlug'

export const getStaticPaths: GetStaticPaths = async () => {
  const { language }: { language: string[] } = require('@/locales/config')
  const paths = language.map(locale => ({
    params: { locale_slug: locale }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { locale_slug } = params!

  return {
    props: {
      locale: locale_slug
    }
  }
}

const MainPage = () => {

  const { t } = useTranslation()
  const router = useRouter()
  const locale = useLocaleSlug()

  const randomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000)
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'TEMP_Top')} />
      <button onClick={() => router.push(`/${locale}/gomoku/${randomNumber()}?accessType=master`)}>TEMP 五目並べ</button>
    </>
  )
}
export default MainPage