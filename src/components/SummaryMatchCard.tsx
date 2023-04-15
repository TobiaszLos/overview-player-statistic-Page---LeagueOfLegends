import { MatchDTO, Participant } from '../types'
import { getGameType } from '../utilities/gameModeSwich'
import { timeFormat } from '../utilities/helpers/timeFormat'

interface SummaryMatchCard {
  match: MatchDTO
  summonerGameDetails: Participant
}

export const SummaryMatchCard = ({
  match,
  summonerGameDetails,
}: SummaryMatchCard) => {
  return (
    <>
      <div className="text-sm font-medium text-gray-600 dark:text-gray-100">
        {getGameType(match.info.queueId)}
      </div>
      <div className="text-sm dark:text-gray-400">
        {timeFormat(match.info.gameCreation, 'fromNow')}
      </div>
      <div className="flex pt-2">
        <div
          className={`${
            summonerGameDetails.win ? 'text-blue-500' : 'text-red-500'
          } font-medium text-sm`}
        >
          {summonerGameDetails.win ? 'WIN' : 'LOSS'}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 pl-1">
          {timeFormat(match.info.gameDuration, 'duration')}
        </div>
      </div>
    </>
  )
}

export default SummaryMatchCard
