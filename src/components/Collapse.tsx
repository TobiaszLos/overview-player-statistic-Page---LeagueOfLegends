import { useState } from 'react'
import { MatchDTO, Server } from '../types'
import { Link } from 'react-router-dom'
import { CollapseParticipant } from './CollapseParticipant'

interface CollapseProps {
  match: MatchDTO
  versionPatch: string
  server: Server
  summonerName: string
}

export const Collapse = ({
  match,
  versionPatch,
  server,
  summonerName,
}: CollapseProps) => {
  return (
    <div>
      <CollapseParticipant
        match={match}
        versionPatch={versionPatch}
        server={server}
        start={0}
        end={5}
      />

      <CollapseParticipant
        match={match}
        versionPatch={versionPatch}
        server={server}
        start={5}
        end={match.info.participants.length}
      />
    </div>
  )
}
