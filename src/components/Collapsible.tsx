import { useState } from "react"

export const Collapsible =({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="border-b border-gray-300"
    >
      <button className="flex justify-between items-center w-full px-4 py-2 font-medium text-left bg-gray-200 hover:bg-gray-300 focus:outline-none">
        <span>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform transform ${
            isOpen ? 'rotate-90' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.707 5.293a1 1 0 011.414 0L10 8.586l2.879-2.88a1 1 0 011.414 1.414l-3.536 3.535a1 1 0 01-1.414 0L8.586 9.414 5.707 6.536a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  )
}
