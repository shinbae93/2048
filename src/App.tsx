import { useEffect, useState } from 'react'
import { Block } from './components/Block'

function App() {
  const [data, setData] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])

  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleKeyPress = (event: KeyboardEvent) => {
    let newBoard = structuredClone(data)

    switch (event.key) {
      case 'ArrowLeft':
        slideLeft(newBoard)
        break
      case 'ArrowRight':
        slideRight(newBoard)
        break
      case 'ArrowUp':
        slideUp(newBoard)
        break
      case 'ArrowDown':
        slideDown(newBoard)
        break
      default:
        return
    }

    if (newBoard.toString() !== data.toString()) {
      addNewNumber(newBoard)
      setData(newBoard)
    }
  }

  function initialize() {
    let board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]

    addNewNumber(board)
    addNewNumber(board)

    setData(board)
  }

  function addNewNumber(board: number[][]) {
    let emptyCells = []

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (board[row][col] === 0) {
          emptyCells.push({ row, col })
        }
      }
    }

    if (emptyCells.length > 0) {
      const { row, col } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)]

      board[row][col] = Math.random() < 0.9 ? 2 : 4
    }
  }

  function slideRowLeft(row: number[]) {
    let filteredRow = row.filter((num) => num !== 0)

    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2
        filteredRow[i + 1] = 0
      }
    }

    filteredRow = filteredRow.filter((num) => num !== 0)

    while (filteredRow.length < 4) {
      filteredRow.push(0)
    }

    return filteredRow
  }

  function slideLeft(board: number[][]) {
    for (let row = 0; row < 4; row++) {
      board[row] = slideRowLeft(board[row])
    }
  }

  function slideRight(board: number[][]) {
    for (let row = 0; row < 4; row++) {
      board[row] = slideRowLeft(board[row].reverse()).reverse()
    }
  }

  function slideUp(board: number[][]) {
    for (let col = 0; col < 4; col++) {
      let column = [board[0][col], board[1][col], board[2][col], board[3][col]]

      column = slideRowLeft(column)

      for (let row = 0; row < 4; row++) {
        board[row][col] = column[row]
      }
    }
  }

  function slideDown(board: number[][]) {
    for (let col = 0; col < 4; col++) {
      let column = [
        board[0][col],
        board[1][col],
        board[2][col],
        board[3][col],
      ].reverse()

      column = slideRowLeft(column).reverse()

      for (let row = 0; row < 4; row++) {
        board[row][col] = column[row]
      }
    }
  }

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
