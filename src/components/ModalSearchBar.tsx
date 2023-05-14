import { FormEvent, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Server, SummonerBasic } from '../types'
import { fetchSummonerDataByName } from '../services'
import { SelectRegion } from './SelectRegion'
import { BiSearch } from 'react-icons/bi'
import { VscClose } from 'react-icons/vsc'

interface ModalSearchProps {
  isOpen: boolean
  onClose: () => void
  openModal: () => void
  onSearch: (name: string, server: Server) => void
}

export const ModalSearchBar = ({
  isOpen,
  onClose,
  onSearch,
  openModal,
}: ModalSearchProps) => {
  const [isCtrlKeyPressed, setIsCtrlKeyPressed] = useState(false)

  const [summonerData, setSummonerData] = useState<SummonerBasic | null>()

  const [server, setServer] = useState<Server>()
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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
    return () => {
      setSummonerData(null)
      setMessage('')
    }
  }, [isCtrlKeyPressed, isOpen, onClose])

  const searchOne = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const name = formData.get('summonerName') as string
    const serverName = formData.get('region') as Server

    setServer(serverName)
    searchSummonerByName(name, serverName)
  }

  const searchSummonerByName = async (name: string, server: Server) => {
    try {
      setLoading(true)
      const data = await fetchSummonerDataByName(server, name)
      setLoading(false)
      if (data?.id) {
        loading
        setSummonerData(data)
      } else {
        setSummonerData(null)
        setMessage(`Player ${name} doesn't exist`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {}, [summonerData])

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 flex items-center justify-center flex-col text-white bg-black bg-opacity-80 backdrop-blur-lg ">
      <div className="relative modal-content p-4 rounded-md flex">
        <div className="flex justify-between min-[400px] bg-transparent">
          <form
            className="flex p-2"
            onSubmit={(e) => {
              searchOne(e)
            }}
          >
            <SelectRegion
              style={`  h-full border-r border-slate-400 rounded-l-lg font-bold focus:outline-none text-sm text-slate-600 md:px-2`}
            />
            <input
              className="pl-4 bg-white text-black  md:min-w-[400px] outline-none"
              type="text"
              name="summonerName"
            />
            <button className=" border border-white h-full p-2 rounded-r-2xl">
              {' '}
              <BiSearch size={`1.6rem`} />
            </button>
          </form>
        </div>
      </div>
      <button
        className="modal-close ml-4 border border-white  rounded-full  p-2  md:p-4  absolute top-20 right-10 md:top-40 md:right-40  hover:opacity-50"
        onClick={onClose}
      >
        <VscClose size={`4rem`} />
      </button>
      {summonerData ? (
        <div
          className=""
          onClick={() => {
            onSearch(summonerData.name, server as Server)
            onClose()
          }}
        >
          <div className="group border hover:border-white hover:text-white hover:cursor-pointer sm:border-slate-300  p-4  sm:text-slate-300 mt-8 text-center rounded-lg">
            <div className=" font-medium mb-2 ">{summonerData.name}</div>
            <div className=" w-48 relative ">
              <img
                className="opacity-75 group-hover:opacity-100 m-auto w-full"
                src={`http://ddragon.leagueoflegends.com/cdn/13.9.1/img/profileicon/${summonerData.profileIconId}.png`}
                alt=""
              />
              <div className="absolute bottom-0 bg-black bg-opacity-40 py-2 w-full  ">
                level {summonerData.summonerLevel}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{message}</>
      )}
      {loading ? 'loading...' : ''}
    </div>,
    document.body
  )
}
