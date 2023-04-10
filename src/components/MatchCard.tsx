import { useEffect, useState } from 'react'
import { MatchDTO, ParticipantDTO, Server } from '../types'
import DetailsMatchCard from './DetailsMatchCard'
import ParticipantsMatchCard from './ParticipantsMatchCard'
import SummaryMatchCard from './SummaryMatchCard'
import { Collapse } from './Collapse'

import { BiCaretDown } from 'react-icons/bi'

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

  const [isOpen, setIsOpen] = useState(false)

  console.log(mainSummoner, match)
  return (
    <>
      {mainSummoner && (
        <>
          <div className="flex mb-4">
            <div
              key={match.metadata.matchId}
              className={` w-[96%] py-2 ${
                mainSummoner.win
                  ? 'border-l-8 border-l-blue-400 bg-sky-100 dark:border-l-blue-700 dark:bg-sky-900 dark:bg-opacity-20'
                  : 'border-l-8 border-l-red-400 bg-red-100 bg-opacity-40 dark:border-l-rose-700 dark:bg-rose-800 dark:bg-opacity-20 '
              } rounded-l-lg grid grid-cols-6 text-zinc-600 dark:text-zinc-300 font-normal`}
            >
              <div className="col-span-1 pl-2">
                <SummaryMatchCard
                  match={match}
                  summonerGameDetails={mainSummoner}
                />
              </div>
              <div className="col-span-3 flex justify-center">
                <DetailsMatchCard
                  versionPatch={versionPatch}
                  summonerGameDetails={mainSummoner}
                />
              </div>
              <div className="hidden md:grid col-span-2 grid-cols-2 text-xs text-slate-500 dark:text-slate-400 tracking-wide">
                <ParticipantsMatchCard
                  match={match}
                  versionPatch={versionPatch}
                  server={server}
                  summonerName={summonerName}
                />
              </div>
            </div>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className={`w-[4%] cursor-pointer hover:opacity-80  ${
                mainSummoner.win
                  ? '  bg-blue-300  dark:bg-sky-600 dark:bg-opacity-20'
                  : '  bg-red-300 bg-opacity-40  dark:bg-rose-600 dark:bg-opacity-20 '
              } rounded-r-lg flex items-end justify-center '`}
            >
              <div className={`flex justify-center pb-4 ${
                    mainSummoner.win ? 'text-blue-500' : 'text-red-500'
                  }`}>
                <BiCaretDown
                  size={'1.2rem'}
                
                />
              </div>
            </div>
          </div>

          {isOpen && (
            <Collapse
              match={match}
              versionPatch={versionPatch}
              server={server}
              summonerName={summonerName}
            />
          )}
        </>
      )}
    </>
  )
}
