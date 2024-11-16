import { tileStyles } from '../common/constants'

export const getBlockStyle = (value: number) =>
  tileStyles[value] || 'bg-gray-800 text-white'
