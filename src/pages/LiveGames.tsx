import { useEffect, useState } from 'react'
import { fetchFeaturedGames } from '../services'
import { SpectatorData } from '../types'

export const LiveGames = () => {
  const [state, setState] = useState<SpectatorData>()

  useEffect(() => {
        const getListOfFeaturedGames = async () => {
          const fetchList = await fetchFeaturedGames('EUW1')
          console.log(fetchList)
         // setState(fetchList)
        }
       // getListOfFeaturedGames()
           
  }, [])

  return (
    <div>
      <div>hi</div>
    </div>
  )
}
