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

      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  )
}
