import { getBlockStyle } from '../utils'

interface Props {
  num: number
}

export const Block = ({ num }: Props) => {
  return (
    <div
      className="w-20 h-20 bg-[lightgray] m-1 flex justify-center items-center text-5xl font-bold text-white"
      style={getBlockStyle(num)}>
      {num}
    </div>
  )
}
