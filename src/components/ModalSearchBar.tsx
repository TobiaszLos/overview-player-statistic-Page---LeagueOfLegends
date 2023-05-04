import { FormEvent, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Server, SummonerBasic } from '../types'
import { fetchSummonerDataByName } from '../services'
import { SelectRegion } from './SelectRegion'

interface ModalSearchProps {
  isOpen: boolean
  onClose: () => void
  // onSearch: (event: FormEvent<HTMLFormElement>) => void
  openModal: () => void
  // searchSummonerByName: (name: string, region: Server) => void

  onSearch: (name: string) => void
}

export const ModalSearchBar = ({
  isOpen,
  onClose,
  onSearch,
  openModal,
}: ModalSearchProps) => {
  const [isCtrlKeyPressed, setIsCtrlKeyPressed] = useState(false)

  const [summonerData, setSummonerData] = useState<
    SummonerBasic | null | undefined
  >()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }

      if (event.ctrlKey && event.key === 'Enter') {
        setIsCtrlKeyPressed(true)
        openModal()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const modal = document.querySelector('.modal') as HTMLElement
      if (event.target === modal) {
        // onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [onClose])

  useEffect(() => {
    if (isCtrlKeyPressed && !isOpen) {
      setIsCtrlKeyPressed(false)
      onClose()
    }
  }, [isCtrlKeyPressed, isOpen, onClose])

  const searchOne = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const name = formData.get('summonerName') as string

    searchSummonerByName(name, 'EUW1')

    // onSearch(e)
    // onClose()
  }

  const searchSummonerByName = async (name: string, region: Server) => {
    try {
      const data = await fetchSummonerDataByName(region, name)

      if (data?.id) {
        setSummonerData(data)
   
      }
    } catch (error) {
      console.log('asdasdsdasddasads')
      console.log(error)
    }
  }

  console.log(summonerData, 'summonerData z miniSearch Bar')

  useEffect(() => {}, [summonerData])

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 flex items-center justify-center flex-col text-white bg-black bg-opacity-80 backdrop-blur-lg">
      <div className="relative modal-content p-4 rounded-md shadow-lg flex">
        <div className="flex justify-between min-[300px] bg-transparent">
          <form
            onSubmit={(e) => {
              searchOne(e)
            }}
          >
            <SelectRegion
              style={`  h-full border-r border-slate-400 rounded-l-lg font-bold focus:outline-none text-sm text-slate-600 md:px-2`}
            />
            <input
              className=" bg-white text-black "
              type="text"
              name="summonerName"
            />
            <button>Submit</button>
          </form>
        </div>

        <button
          className="modal-close ml-4 border border-white  rounded-full p-4 px-6 absolute top-[-40px] right-[-100px]"
          onClick={onClose}
        >
          X
        </button>
      </div>

      {summonerData ? (
        <div
          onClick={() => {
            onSearch(summonerData.name)
            onClose()
          }}
        >
          <div className="border border-white mt-8">
            <div>{summonerData.name}</div>
            <div className=" w-48">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/${summonerData.profileIconId}.png`}
                alt=""
              />
            </div>
          </div>
        </div>
      ) : (
        <>sumoner doesnt exist</>
      )}

      {summonerData === null && 'player doesnt exist'}
    </div>,
    document.body
  )
}
