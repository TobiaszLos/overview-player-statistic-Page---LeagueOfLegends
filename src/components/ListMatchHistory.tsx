import dayjs from 'dayjs'
import moment from 'moment'

export const ListMatchHistory = ({ historyList, summonerName }) => {
  console.log('historyList: ', historyList)

  const times = (timestamps: number, action: string) => {
    if (action === 'fromNow') {
      return moment(timestamps).fromNow()
    } else if (action === 'duration') {
      const duration = moment.duration(timestamps, 'seconds')

      return `${duration.minutes()} m ${duration.seconds()} s`
    }
  }

 const findSummoner = () => {

 }

  return (
    <div className="mb-4 bg-white shadow rounded dark:bg-slate-700 border dark:border-slate-600">
      <div className="p-4 border-b-2 text-slate-700 font-medium text-base dark:text-slate-100 ">
        Match History
      </div>

      <div className="p-4  text-slate-700 font-medium text-base dark:text-slate-100 ">
        {historyList.map((match) => {
          return (
            <div key={match.metadata.matchId} className='p-2'>

              <div>{match.info.gameMode}</div>
              <div>{times(match.info.gameCreation, 'fromNow')} </div>
              <div>{times(match.info.gameDuration, 'duration')} </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
