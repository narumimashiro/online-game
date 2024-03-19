import dialogStyles from '../Dialog.module.scss'
import styles from './LoadingDialog.module.scss'

interface LoadingDialogProps {
  colorTheme?: 'light' | 'dark'
  title: string
  message?: string
}

export const LoadingDialog = ({
  colorTheme = 'light',
  title,
  message,
}: LoadingDialogProps) => {

  return (
    <div className={`${dialogStyles[`dialog-${colorTheme}`]} ${styles.wrapDialog}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      <div className={styles.loading} />
    </div>
  )
}