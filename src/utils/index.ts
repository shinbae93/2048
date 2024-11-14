import { tileStyles } from '../common/constants'

export const getBlockStyle = (value: number) =>
  tileStyles[value] || { backgroundColor: '#3c3a32', color: '#f9f6f2' }
