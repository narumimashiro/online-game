import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { realtimeDB } from '@/lib/firebase'
import { ref, onValue, off, DataSnapshot  } from 'firebase/database'
import {
  gameRoomInfoState,
  GOMOKUGAME
} from '@/recoil/services/getGomokuRoomApi'

export const useGomokuRoomListener = (roomId: string) => {

  const [gameRoomInfo, setGameRoomInfo] = useRecoilState(gameRoomInfoState)

  useEffect(() => {

    const roomRef = ref(realtimeDB, `${GOMOKUGAME}/${roomId}`)

    const handlerDataChange = ((snapshot: DataSnapshot ) => {
      setGameRoomInfo(snapshot.val())
    })

    onValue(roomRef, handlerDataChange)

    return () => {
      off(roomRef, 'value', handlerDataChange)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return gameRoomInfo
}