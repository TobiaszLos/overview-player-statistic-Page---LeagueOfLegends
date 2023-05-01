import { FormEvent, useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'

interface ModalSearchProps {
  isOpen: boolean
  onClose: () => void
  onSearch: (event: FormEvent<HTMLFormElement>) => void
  openModal: () => void
}

export const ModalSearch = ({
  isOpen,
  onClose,
  onSearch,
  openModal,
}: ModalSearchProps) => {
  const [isCtrlKeyPressed, setIsCtrlKeyPressed] = useState(false)

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
        onClose()
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

  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm ">
      <div className="relative modal-content p-4 rounded-md shadow-lg">
        <button
          className="modal-close absolute top-10 right-0 p-2"
          onClick={onClose}
        >
          X aaaaaaaaaaaaa
        </button>
        <div className="flex justify-between min-[300px] bg-transparent">
          <form
            onSubmit={(e) => {
              onSearch(e)
              onClose()
            }}
          >
            <input className=" bg-white" type="text" name="summonerName" />
            <button>Submit</button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  )
}
