import { FiSearch } from 'react-icons/fi'
import { FormEvent, useState } from 'react'

import { ModalSearch } from './ModalSearchBar'

interface TopSearchBarProps {
  onSearch: (event: FormEvent<HTMLFormElement>) => void
}

export const TopSearchBar = ({ onSearch }: TopSearchBarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  return (
    <div className="flex px-8 justify-center md:justify-end pt-2 cursor-pointer ">
      <div
        className=" bg-white flex items-center min-w-[215px] py-2  dark:bg-slate-800 bg-opacity-75 border border-slate-300  dark:border-slate-700 rounded-2xl"
        onClick={handleOpenModal}
      >
        <FiSearch
          className="ml-2 mr-2 text-slate-600 dark:text-slate-300 "
          size={'1.5rem'}
        />
        <div className="text-sm font-medium text-slate-400 dark:text-slate-500 ">
          Search{' '}
          <span className="text-slate-800  dark:text-slate-400">Ctrl +</span>
          <span className="text-slate-800 dark:text-slate-400">Enter</span>
        </div>
      </div>

  
      <ModalSearch
        isOpen={isOpen}
        onClose={handleCloseModal}
        onSearch={onSearch}
        openModal={handleOpenModal}
      />
    </div>
  )
}
