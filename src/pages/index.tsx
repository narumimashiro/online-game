import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Meta from "@/components/meta"

import { useDefaultLocale } from '@/hooks/useLocaleSlug'

const Home = () => {

  const { t } = useTranslation()
  const router = useRouter()
  const locale = useDefaultLocale()

  useEffect(() => {
    router.push(`/${locale}`)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'TEMP_オンラインゲーム')}/>
      <div>
        <h1>Hello, NextJs!!!</h1>
      </div>
    </>
  )
}
export default Home