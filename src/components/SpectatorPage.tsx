import { useEffect, useState } from 'react'
import { fetchChampionsData, fetchRunesReforged } from '../services'
import { useOutletContext } from 'react-router-dom'
import {
  ChampionData,
  ParticipantSpectatorType,
  RuneReforged,
  Server,
  SpectatorData,
} from '../types'
import { getGameType } from '../utilities/gameModeSwich'
import Countdown from '../utilities/Countdown'
import { ParticipantSpectator } from './ParticipantSpectator'

interface spectatorOutletProps {
  server: Server
  summonerId: string
  isLive: boolean
  gameData: SpectatorData
}

export const Spectator = () => {
  const [championsData, setChampionsData] =
    useState<Record<string, ChampionData>>()

  const [runesInfo, setRunesInfo] = useState<RuneReforged[]>()

  const c = useOutletContext<spectatorOutletProps>()

  useEffect(() => {}, [])

  useEffect(() => {
    const fetchChampions = async () => {
      const c = await fetchChampionsData()
      setChampionsData(c)
    }
    fetchChampions()
  }, [])

  useEffect(() => {
    getRunesFromAssetsApi()
  }, [])

  const getRunesFromAssetsApi = async () => {
    const getRunesInfo = await fetchRunesReforged()
    console.log(getRunesInfo)
    setRunesInfo(getRunesInfo!)
  }

  const selectRunes = (participant: ParticipantSpectatorType) => {
    const primaryStylePerks = participant.perks.perkStyle
    const subStylePerks = participant.perks.perkSubStyle

    if (!runesInfo) return

    const selectedPrimaryRune = runesInfo.find(
      (rune: RuneReforged) => rune.id === primaryStylePerks
    )

    const selectedSubStyleRune = runesInfo.find(
      (rune: RuneReforged) => rune.id === subStylePerks
    )

    if (!selectedPrimaryRune) return
    if (!selectedSubStyleRune) return

    const selectedPrimarySlot = selectedPrimaryRune.slots[0].runes.find(
      (slot) => participant.perks.perkIds.find((perk) => perk === slot.id)
    )

    if (!selectedPrimarySlot) return

    const filteredRunes = {
      primarySlot: selectedPrimarySlot,
      subSlot: selectedSubStyleRune,
    }

    return filteredRunes
  }

  const blueTeamParticipants = (gameData: SpectatorData) =>
    gameData.participants.filter((participant) => participant.teamId === 100)

  const redTeamParticipants = (gameData: SpectatorData) =>
    gameData.participants.filter((participant) => participant.teamId === 200)

  return (
    <div>
      {!c.isLive ? (
        <div className=' text-center mt-12'>The Summoner is not in-game right now.</div> 
      ) : (
        <div className="p-4">
          {c.gameData && (
            <div>
              <div>
                <span className="pr-1 font-medium text-lg">
                  {getGameType(c.gameData.gameQueueConfigId)}
                </span>
                | <Countdown gameLength={c.gameData.gameLength} />
              </div>

              {championsData && (
                <div className="mt-2">
             
                  {blueTeamParticipants(c.gameData).map((participant) => (
                    <ParticipantSpectator
                      key={participant.summonerName}
                      teamId={participant.teamId}
                      championsData={championsData}
                      participant={participant}
                      selectRunes={selectRunes}
                      team={'blue'}
                    />
                  ))}

                  <h2 className=" text-center text-lg font-medium my-2 mb-6">
                    VS
                  </h2>
                  <div>
                    {redTeamParticipants(c.gameData).map((participant) => (
                      <ParticipantSpectator
                        key={participant.summonerName}
                        teamId={participant.teamId}
                        championsData={championsData}
                        participant={participant}
                        selectRunes={selectRunes}
                        team={'red'}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
