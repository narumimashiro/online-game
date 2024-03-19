import globalStyle from '../../Global.module.scss'
import dialogStyles from '../Dialog.module.scss'
import styles from './ConfirmDialog.module.scss'

interface ConfirmDialogProps {
  title: string
  children: React.ReactNode
  colorTheme?: 'light' | 'dark'
  buttonString?: string
  ariaLabel?: string
  onConfirm: () => void
}

export const ConfirmDialog = ({
  title,
  children,
  colorTheme = 'light',
  buttonString = 'OK',
  ariaLabel = 'Confirm OK',
  onConfirm
}: ConfirmDialogProps) => {

  return (
    <div className={dialogStyles[`dialog-${colorTheme}`]}>
      <div className={styles.wrapDialog}>
        <div className={styles.container}>
          <h2 className={styles.title}>{title}</h2>
          <div className={`${styles.content} ${globalStyle['invisible-scroll']}`}>
            {children}
          </div>
        </div>
        <div className={styles.confirm}>
          <div className={globalStyle[`webHorizon-${colorTheme}`]}/>
          <button
            className={`${globalStyle[`button-${colorTheme}`]} ${styles.confirmButton}`}
            aria-label={ariaLabel}
            onClick={onConfirm}
          >
            {buttonString}
          </button>
        </div>
      </div>
    </div>
  )
}