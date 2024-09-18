import { useState } from 'react'
import { Block } from './components/Block'

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  return (
    <div className="m-auto w-max p-2 mt-3 rounded-md bg-[#AD9D8F]">
      {data.map((row, rowIndex) => {
        return (
          <div className="flex" key={rowIndex}>
            {row.map((num, index) => (
              <Block num={num} key={index}></Block>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default App
