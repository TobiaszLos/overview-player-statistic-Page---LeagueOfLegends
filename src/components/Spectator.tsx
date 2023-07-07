import { useEffect, useState } from 'react'
import { fetchChampionsData, fetchSummonerSpectatorData } from '../services'
import { useOutletContext } from 'react-router-dom'
import { ChampionData, Server, SpectatorData } from '../types'
import { getGameType } from '../utilities/gameModeSwich'
import Countdown from '../utilities/Countdown'
import { ParticipantsSpectator } from './ParticipantsSpectator'

interface spectatorOutletProps {
  server: Server
  summonerId: string
}

export const Spectator = () => {
  const [live, setLive] = useState(false)
  const [championsData, setChampionsData] =
    useState<Record<string, ChampionData>>()
  const [gameData, setGameData] = useState<SpectatorData | undefined>()
  const c = useOutletContext<spectatorOutletProps>()

  useEffect(() => {
    const spectator = async () => {
      const spectatorData = await fetchSummonerSpectatorData(
        c.server,
        c.summonerId
      )

      console.log(spectatorData, 'spectatorData')

      if (spectatorData) {
        setLive(true)
        setGameData(spectatorData)
      } else {
        setLive(false)
        setGameData(undefined)
      }
    }

    spectator()
  }, [])

  useEffect(() => {
    const fetchChampions = async () => {
      const c = await fetchChampionsData()
      setChampionsData(c)
    }
    fetchChampions()
  }, [])

  return (
    <div>
      {!live ? (
        'Not in Game'
      ) : (
        <>
          {gameData && (
            <div>
              {' '}
              <span>{getGameType(gameData.gameQueueConfigId)}</span> |
              <Countdown gameLength={gameData.gameLength} />
              {championsData && (
                <ParticipantsSpectator
                  participants={gameData.participants}
                  champions={championsData}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
