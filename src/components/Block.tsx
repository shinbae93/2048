import { getBlockStyle } from '../utils'

interface Props {
  num: number
}

export const Block = ({ num }: Props) => {
  return (
    <div
      className={`flex items-center justify-center h-20 w-20 rounded-md text-3xl font-bold ${getBlockStyle(
        num
      )}`}>
      {num}
    </div>
  )
}
