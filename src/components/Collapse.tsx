
import { MatchDTO, RuneReforged, Server } from '../types'
import { CollapseParticipant } from './CollapseParticipant'

interface CollapseProps {
  match: MatchDTO
  versionPatch: string
  server: Server
  runesInfo: RuneReforged[]
}

export const Collapse = ({ match, versionPatch, server, runesInfo }: CollapseProps) => {
  return (
    <div className='mb-2  mt-[-3px]'>
      <CollapseParticipant
        match={match}
        versionPatch={versionPatch}
        runesInfo={runesInfo}
        server={server}
        start={0}
        end={5}
        part={1}
      />

      <CollapseParticipant
        match={match}
        versionPatch={versionPatch}
        runesInfo={runesInfo}
        server={server}
        start={5}
        end={match.info.participants.length}
        part={2}
      />
    </div>
  )
}
