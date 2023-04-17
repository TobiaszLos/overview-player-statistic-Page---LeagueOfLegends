import { useEffect, useState } from 'react'
import { MatchDTO, Participant, Rune, RuneReforged, Server } from '../types'
import DetailsMatchCard from './DetailsMatchCard'
import ParticipantsMatchCard from './ParticipantsMatchCard'
import SummaryMatchCard from './SummaryMatchCard'
import { Collapse } from './Collapse'

import { BiCaretDown } from 'react-icons/bi'

interface MatchCardProps {
  match: MatchDTO
  summonerName: string
  versionPatch: string
  runesInfo: RuneReforged[]
  server: Server
}

export const MatchCard = ({
  match,
  summonerName,
  versionPatch,
  server,
  runesInfo,
}: MatchCardProps) => {
  const [mainSummoner, setMainSummoner] = useState<Participant>()
  const [runes, setRunes] = useState<{
    primarySlot: Rune
    subSlot: RuneReforged
  }>()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const findSummonerByName = () => {
      const summoner = match.info.participants.find(
        (summoner: Participant) =>
          summoner.summonerName.toLocaleLowerCase() ===
          summonerName.toLocaleLowerCase()
      )

      setMainSummoner(summoner)
    }

    findSummonerByName()
  }, [])

  useEffect(() => {
    selectRunes()
  }, [mainSummoner])

  const selectRunes = () => {
    if (!mainSummoner) return

    const primaryStylePerks = mainSummoner.perks.styles[0]
    const subStylePerks = mainSummoner.perks.styles[1]

    const selectedPrimaryRune = runesInfo.find(
      (rune: RuneReforged) => rune.id === primaryStylePerks.style
    )

    const selectedSubStyleRune = runesInfo.find(
      (rune: RuneReforged) => rune.id === subStylePerks.style
    )

    if (!selectedPrimaryRune) return
    if (!selectedSubStyleRune) return

    const selectedPrimarySlot = selectedPrimaryRune.slots[0].runes.find(
      (slot) => slot.id === primaryStylePerks.selections[0].perk
    )

    if (!selectedPrimarySlot) return

    const filteredRunes = {
      primarySlot: selectedPrimarySlot,
      subSlot: selectedSubStyleRune,
    }

    setRunes(filteredRunes)
  }

  return (
    <>
      {mainSummoner && (
        <>
          <div className="flex mb-2">
            <div
              key={match.metadata.matchId}
              className={` w-[96%] py-2 ${
                mainSummoner.win
                  ? 'border-l-4 border-l-blue-400 bg-sky-100 dark:border-l-blue-700 dark:bg-sky-900 dark:bg-opacity-20'
                  : 'border-l-4 border-l-red-400 bg-red-400 bg-opacity-20 dark:border-l-rose-700 dark:bg-rose-800 dark:bg-opacity-20 '
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
                  runes={runes!}
                  versionPatch={versionPatch}
                  summonerGameDetails={mainSummoner}
                  matchInfo={match}
                />
              </div>
                  
              <div className="hidden md:grid col-span-2 grid-cols-2 text-xs text-slate-500 dark:text-slate-500  tracking-wide">
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
                  : '  bg-red-400  dark:bg-rose-600 dark:bg-opacity-20 '
              } rounded-r-lg flex items-end justify-center '`}
            >
              <div
                className={`flex justify-center pb-4 ${
                  mainSummoner.win ? 'text-blue-500' : 'text-rose-900'
                }`}
              >
                <BiCaretDown size={'1.2rem'} />
              </div>
            </div>
          </div>

          {isOpen && (
            <Collapse
              match={match}
              runesInfo={runesInfo}
              versionPatch={versionPatch}
              server={server}
            />
          )}
        </>
      )}
    </>
  )
}
