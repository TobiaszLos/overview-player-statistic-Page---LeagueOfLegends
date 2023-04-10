import { useEffect, useState } from 'react'
import { MatchDTO, ParticipantDTO, Server } from '../types'
import { summonerSpells } from '../utilities/getSummonerSpellName'
import DetailsMatchCard from './DetailsMatchCard'
import ParticipantsMatchCard from './ParticipantsMatchCard'
import SummaryMatchCard from './SummaryMatchCard'

interface MatchCardProps {
  match: MatchDTO
  summonerName: string
  versionPatch: string
  server: Server
}

export const MatchCard = ({
  match,
  summonerName,
  versionPatch,
  server,
}: MatchCardProps) => {
  const [mainSummoner, setMainSummoner] = useState<ParticipantDTO>()

  useEffect(() => {
    const findSummonerByName = () => {
      const summoner = match.info.participants.find(
        (summoner: ParticipantDTO) => summoner.summonerName === summonerName
      )
      setMainSummoner(summoner)
    }

    findSummonerByName()
  }, [])

  console.log(mainSummoner, match)
  return (
    <>
      {mainSummoner && (
        <article
          key={match.metadata.matchId}
          className={`p-2 my-4 ${
            mainSummoner.win
              ? 'border-l-8 border-l-blue-400 bg-sky-100 dark:border-l-blue-700 dark:bg-sky-900 dark:bg-opacity-20'
              : 'border-l-8 border-l-red-400 bg-red-100 bg-opacity-40 dark:border-l-rose-700 dark:bg-rose-800 dark:bg-opacity-20 '
          } grid grid-cols-5 rounded-lg text-zinc-600 dark:text-zinc-300 font-normal`}
        >
          <SummaryMatchCard match={match} summonerGameDetails={mainSummoner} />

          <DetailsMatchCard
            versionPatch={versionPatch}
            summonerGameDetails={mainSummoner}
          />

          <ParticipantsMatchCard
            match={match}
            versionPatch={versionPatch}
            server={server}
          />
        </article>
      )}
    </>
  )
}
