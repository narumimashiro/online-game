import { signInAnonymously } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { ConsoleError, ConsoleLog } from '@/lib/logging'

export const anonymouseSignin = async () => {

  // Anonymouse Login
  return await signInAnonymously(auth).then(() => {
    ConsoleLog('Anonymouse Login Success')
    return true
  })
  .catch(error => {
    ConsoleError(error.message)
    return false
  })
}