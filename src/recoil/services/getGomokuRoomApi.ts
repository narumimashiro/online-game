import { atom, useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { useApiStatus } from '@/hooks/useApiStatus'
import { anonymouseSignin } from '@/lib/firebaseAnonymouseSignin'
import { realtimeDB } from '@/lib/firebase'
import { ref, set, get, remove  } from 'firebase/database'
// import { ConsoleLog } from '@/lib/logging'

export const GOMOKUGAME = 'gomoku'
export const MASTER = 'room master'
export const PLAYER = 'room player'

export const ROOM_EMPTY = 'room empty'
export const ROOMSTATUS_WAITING = 'room waiting'
export const ROOMSTATUS_FULL = 'room full'
export const ROOM_ALREADY_EXIST = 'room already existed'
type RoomState = typeof ROOM_EMPTY | typeof ROOMSTATUS_WAITING | typeof ROOMSTATUS_FULL | typeof ROOM_ALREADY_EXIST

type GameRoomInformation = {
  roomId: string,
  roomState: RoomState,
  playerName: string,
  boardState: string[][]
}

export const gameRoomInfoState = atom<GameRoomInformation>({
  key: 'game room information',
  default: {
    roomId: '',
    roomState: ROOM_EMPTY,
    playerName: MASTER,
    boardState: Array.from({ length: 15 }, () => Array(15).fill(''))
  }
})

export const CreateRoomApi = () => {

  const { status, startLoading, setSuccess, setFailed } = useApiStatus()
  const [gameRoomInfo, setGameRoomInfo] = useRecoilState(gameRoomInfoState)

  const createRoomApi = async (roomId: string) => {

    startLoading()

    try {
      await anonymouseSignin()

      checkRoomExist(roomId).then(exists => {
        if(exists) {
          setGameRoomInfo({
            ...gameRoomInfo,
            roomState: ROOM_ALREADY_EXIST
          })
          setFailed()

        } else {
          const roomRef = ref(realtimeDB, `${GOMOKUGAME}/${roomId}`)

          set(roomRef, {
            ...gameRoomInfo,
            roomId: roomId,
            status: ROOMSTATUS_WAITING,
            playerName: PLAYER
          })
          .then(() => {
            setSuccess()
          })
          .catch(() => {

            setFailed()
          })
        }
      })

    } catch {
      setFailed()
    }
  }

  return { status, createRoomApi }
}

export const JoinRoomApi = () => {

  const { status, startLoading, setSuccess, setFailed } = useApiStatus()
  const [gameRoomInfo, setGameRoomInfo] = useRecoilState(gameRoomInfoState)

  const joinRoomApi = async (roomId: string) => {

    startLoading()

    try {
      await anonymouseSignin()

      checkRoomExist(roomId).then(exists => {
        if(exists) {
          const roomRef = ref(realtimeDB, `${GOMOKUGAME}/${roomId}`)

          set(roomRef, {
            ...gameRoomInfo,
            roomId: roomId,
            roomState: ROOMSTATUS_FULL,
            status: ROOMSTATUS_FULL,
            playerName: MASTER
          })
          .then(() => {
            setSuccess()
          })
          .catch(() => {
            setFailed()
          })

        } else {
          setFailed()
        }
      })
    } catch {
      setFailed()
    }
  }

  return { status, joinRoomApi }
}

export const RemoveRoomApi = () => {

  const { status, startLoading, setSuccess, setFailed } = useApiStatus()
  const resetGameRoomInfo = useResetRecoilState(gameRoomInfoState);

  const removeRoomApi = async (roomId: string) => {

    startLoading()

    const roomRef = ref(realtimeDB, `${GOMOKUGAME}/${roomId}`)

    remove(roomRef)
      .then(() => {
        resetGameRoomInfo()
        setSuccess()
      })
      .catch(() => {
        setFailed()
      })
  }


  return { status, removeRoomApi }
}

const checkRoomExist = async (roomId: string) => {

  const roomRef = ref(realtimeDB, `${GOMOKUGAME}/${roomId}`)

  try {
    const snapshot = await get(roomRef)
    return snapshot.exists()

  } catch {
    return false
  }
}

export const SetBoardState = () => {

  const { status, startLoading, setSuccess, setFailed } = useApiStatus()
  const gameRoomInfo = useRecoilValue(gameRoomInfoState)

  const setBoardState = async (player: string, boardState: string[][]) => {

    startLoading()

    try {
      const roomRef = ref(realtimeDB, `${GOMOKUGAME}/${gameRoomInfo.roomId}`)

      set(roomRef, {
        ...gameRoomInfo,
        playerName: player,
        boardState: boardState
      })
      .then(() => {
        setSuccess()
      })
      .catch(() => {
        setFailed()
      })
    } catch {
      setFailed()
    }
  }

  return { status, setBoardState }

}