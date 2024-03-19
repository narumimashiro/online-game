import { useApiStatus } from '@/hooks/useApiStatus'
import { anonymouseSignin } from '@/lib/firebaseAnonymouseSignin'

export const AuthFirebase = () => {

  const { status, startLoading, setSuccess, setFailed } = useApiStatus()

  const authFirebase = async () => {

    startLoading()

    const authentication = await anonymouseSignin()

    if(authentication) {
      setSuccess()
    } else {
      setFailed()
    }
  }

  return { status, authFirebase }
}