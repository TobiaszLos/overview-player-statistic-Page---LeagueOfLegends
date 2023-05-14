import { ChangeEvent } from 'react'
import { Server } from '../types'

type Options = {
  value: Server
  label: string
}[]

interface SelectRegionProps {
  style?: string
  onChangeEvent?: (e: ChangeEvent<HTMLSelectElement>) => void
}

export const SelectRegion = ({ style, onChangeEvent }: SelectRegionProps) => {
  const options: Options = [
    { value: 'EUW1', label: 'EUW' },
    { value: 'EUN1', label: 'EUNE' },
    { value: 'BR1', label: 'BR' },
    { value: 'JP1', label: 'JP' },
    { value: 'KR', label: 'KR' },
    { value: 'LA1', label: 'LAS' },
    { value: 'LA2', label: 'LAN' },
    { value: 'NA1', label: 'NA' },
    { value: 'OC1', label: 'OCE' },
    { value: 'PH2', label: 'PH' },
    { value: 'RU', label: 'RU' },
    { value: 'SG2', label: 'SG' },
    { value: 'TH2', label: 'TH' },
    { value: 'TR1', label: 'TR' },
    { value: 'TW2', label: 'TW' },
    { value: 'VN2', label: ' VN' },
  ]

  return (
    <select
      name="region"
      onChange={(e) => {
        if (onChangeEvent === undefined) return
        onChangeEvent(e)
      }}
      className={`${style}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
