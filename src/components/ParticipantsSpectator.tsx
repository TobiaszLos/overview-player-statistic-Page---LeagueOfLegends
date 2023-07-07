import { ChampionData, ParticipantSpectator } from '../types'
import { findChampionNameByKey } from '../utilities/helpers/findChampionNameByKey'

interface ParticipantsSpectatorProps {
  participants: ParticipantSpectator[]
  champions: Record<string, ChampionData>
}

export const ParticipantsSpectator = ({
  participants,
  champions
}: ParticipantsSpectatorProps) => {




console.log(champions, 'from enmf')
  return (
    <div>
      {participants.map((participant) => {
        return (
          <div key={participant.summonerName} className='flex'>
       
            <div>
              <img
                className="w-9 h-9 rounded-full bottom-1"
                src={`http://ddragon.leagueoflegends.com/cdn/${'13.13.1'}/img/champion/${
                  !findChampionNameByKey(champions, participant.championId.toString())
                    ? 'Fiddlesticks'
                    : findChampionNameByKey(champions, participant.championId.toString())
                }.png`}
                alt=""
              />
            </div>
            <div> {participant.summonerName}</div>
          </div>
        )
      })}
    </div>
  )
}
