import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRecoilValue } from 'recoil'

import Meta from '@/components/meta'
import styles from '@/styles/Gomoku.module.sass'

import { API_STATUS } from '@/hooks/useApiStatus'
import { CreateRoomApi, JoinRoomApi, RemoveRoomApi, ROOM_ALREADY_EXIST, MASTER, PLAYER, SetBoardState, gameRoomInfoState } from '@/recoil/services/getGomokuRoomApi'
import { useGomokuRoomListener } from '@/hooks/game/gomokuRoomListener'
// import { ConsoleLog } from '@/lib/logging'

// import { ConsoleError } from '@/lib/logging'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params }= context
  const roomId = params?.roomid

  if(!roomId || !/^\d{4}$/.test(roomId as string)) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      roomId
    }
  }
}

const Square = (props: { player: string, onClick: () => void }) => {

  const { player, onClick } = props

  return (
    <div onClick={onClick} className={`flex-center ${styles.square}`}>
      <div className={`${player === MASTER ? styles.squareMaster :
                         player === PLAYER ? styles.squarePlayer : ''}`}>
      </div>
    </div>
  )
}

const Gomoku = ({ roomId }: { roomId: string }) => {

  const { t } = useTranslation()
  const router = useRouter()
  const { status: createRoomFetchState, createRoomApi } = CreateRoomApi()
  const { status: joinRoomFetchState, joinRoomApi } = JoinRoomApi()
  const { removeRoomApi } = RemoveRoomApi()
  const { status: setBoardFetchState, setBoardState } = SetBoardState()
  const curGameRoomInfo = useGomokuRoomListener(roomId)
  const preGameRoomInfo = useRecoilValue(gameRoomInfoState)
  const [gameRoomInfo, setGameRoomInfo] = useState(preGameRoomInfo)
  const [overRay, setOverRay] = useState(false)
  const [yourTurn, setYourTurn] = useState(false)

  const { accessType } = router.query as unknown as {
    accessType: string | undefined
  }

  useEffect(() => {
    if(accessType === 'master') {
      createRoomApi(roomId)
    } else if(accessType === 'join') {
      joinRoomApi(roomId)
    } else {
      router.push('/404')
    }

    return () => {
      if(accessType === 'master') {
        removeRoomApi(roomId)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessType, router])

  useEffect(() => {

    if(createRoomFetchState === API_STATUS.FAILED) {
      if(curGameRoomInfo.roomState === ROOM_ALREADY_EXIST) {
        alert(curGameRoomInfo.roomState)
      } else {
        alert(t('TEMP_ルーム作成に失敗しました。'))
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRoomFetchState])

  useEffect(() => {

    if(joinRoomFetchState === API_STATUS.FAILED) {
      alert(t('TEMP_ルーム入室に失敗しました。'))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinRoomFetchState])

  useEffect(() => {
    if(createRoomFetchState === API_STATUS.SUCCESS || joinRoomFetchState === API_STATUS.SUCCESS) {
      if(accessType === 'master') {
        setOverRay(curGameRoomInfo.playerName === PLAYER)
        setYourTurn(curGameRoomInfo.playerName === MASTER)
      } else if(accessType === 'join') {
        setOverRay(curGameRoomInfo.playerName === MASTER)
        setYourTurn(curGameRoomInfo.playerName === PLAYER)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createRoomFetchState, curGameRoomInfo, joinRoomFetchState])

  useEffect(() => {
    if(setBoardFetchState === API_STATUS.SUCCESS) {
      setGameRoomInfo(curGameRoomInfo)
    } else {
      setGameRoomInfo(preGameRoomInfo)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setBoardFetchState, curGameRoomInfo])

  const onClickBoard = (x: number, y: number) => {
    const nextPlayer = curGameRoomInfo.playerName === MASTER ? PLAYER : MASTER
    const newBoardState = curGameRoomInfo.boardState.map(row => [...row])
    newBoardState[y][x] = curGameRoomInfo.playerName
    setBoardState(nextPlayer, newBoardState)
  }

  const judgeWinner = (x: number, y: number) => {

  }

  return (
    <>
      <Meta pageTitle={t('STRID_cmn_pagetitle').replace('{var}', 'TEMP_五目並べ')} />
      <div className={styles.gameWrap}>
        <p className='flex-center text-2xl-bold'>{t('TEMP_五目並べ')}</p>
        {
          createRoomFetchState === API_STATUS.SUCCESS || joinRoomFetchState === API_STATUS.SUCCESS ? (
            <>
              <p className='flex-center text-xl-bold'>
                {yourTurn ? t('TEMP_あなたのターンです') : t('相手のターンです')}
              </p>
              {overRay && <div className={styles.overray} />}
              <div className={styles.boardWrap}>
                {
                  gameRoomInfo.boardState.map((rowArray, yIndex) => (
                    rowArray.map((el, xIndex) => (
                      <Square player={el} onClick={() => onClickBoard(xIndex, yIndex)} key={`${xIndex}${yIndex}`} />
                    ))
                  ))
                }
              </div>
            </>
          ) : (
            <></>
          )
        }
        
      </div>
    </>
  )
}
export default Gomoku