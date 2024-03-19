import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import styles from '@/styles/Top.module.sass'

import Meta from '@/components/meta'
import { useLocaleSlug } from '@/hooks/useLocaleSlug'

import {
  Dialog,
  TextField,
  Button
} from '@mui/material'

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
  const [isOpen, setIsOpen] = useState(false)
  const [inputRoomId, setInputRoomId] = useState('')

  const randomNumber = () => {
    return Math.floor(1000 + Math.random() * 9000)
  }

  const onConfirm = () => {
    router.push(`/${locale}/gomoku/${inputRoomId}?accessType=join`)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputRoomId(event.target.value);
  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'TEMP_Top')} />
      <p className={`text-2xl-bold ${styles.gameTitle}`}>{t('TEMP_五目並べ')}</p>
      <div className={styles.gameContents}>
        <button onClick={() => router.push(`/${locale}/gomoku/${randomNumber()}?accessType=master`)}>{t('TEMP_部屋を立てる')}</button>
        <button onClick={() => setIsOpen(true)}>{t('TEMP_部屋に入る')}</button>
      </div>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className={styles.dialogWrap}>
          <p>{t('TEMP_部屋番号を入力してください')}</p>
          <TextField
            label={t('TEMP_部屋番号')}
            variant="standard"
            value={inputRoomId}
            onChange={handleChange}
            inputProps={{ 
              maxLength: 4
            }}
          />
        </div>
        <Button
          onClick={onConfirm}
        >
          {t('TEMP_OK')}
        </Button>
      </Dialog>
    </>
  )
}
export default MainPage