import { useEffect, useState } from 'react'
import { Block } from './components/Block'

function App() {
  const [data, setData] = useState(createEmptyBoard())
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [score, setScore] = useState(0)

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

      if (checkWin(newBoard)) {
        setGameWon(true)
      } else if (isGameOver(newBoard)) {
        setGameOver(true)
      }
    }
  }

  function initialize() {
    let board = createEmptyBoard()

    addNewNumber(board)
    addNewNumber(board)

    setData(board)
    setScore(0)
    setGameOver(false)
    setGameWon(false)
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
    let points = 0

    for (let i = 0; i < filteredRow.length - 1; i++) {
      if (filteredRow[i] === filteredRow[i + 1]) {
        filteredRow[i] *= 2
        filteredRow[i + 1] = 0
        points += filteredRow[i]
      }
    }

    filteredRow = filteredRow.filter((num) => num !== 0)

    while (filteredRow.length < 4) {
      filteredRow.push(0)
    }

    return { newRow: filteredRow, points }
  }

  function slideLeft(board: number[][]) {
    let pointsGained = 0

    for (let row = 0; row < 4; row++) {
      const { newRow, points } = slideRowLeft(board[row])
      board[row] = newRow
      pointsGained += points
    }

    setScore(score + pointsGained)

    return board
  }

  function slideRight(board: number[][]) {
    let pointsGained = 0

    for (let row = 0; row < 4; row++) {
      const { newRow, points } = slideRowLeft(board[row].reverse())
      board[row] = newRow.reverse()
      pointsGained += points
    }

    setScore(score + pointsGained)

    return board
  }

  function slideUp(board: number[][]) {
    let pointsGained = 0

    for (let col = 0; col < 4; col++) {
      let column = [board[0][col], board[1][col], board[2][col], board[3][col]]

      const { newRow, points } = slideRowLeft(column)

      column = newRow
      pointsGained += points

      for (let row = 0; row < 4; row++) {
        board[row][col] = column[row]
      }
    }

    setScore(score + pointsGained)

    return board
  }

  function slideDown(board: number[][]) {
    let pointsGained = 0

    for (let col = 0; col < 4; col++) {
      let column = [
        board[0][col],
        board[1][col],
        board[2][col],
        board[3][col],
      ].reverse()

      const { newRow, points } = slideRowLeft(column)

      column = newRow.reverse()
      pointsGained += points

      for (let row = 0; row < 4; row++) {
        board[row][col] = column[row]
      }
    }

    setScore(score + pointsGained)

    return board
  }

  function createEmptyBoard() {
    return [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  }

  const isGameOver = (board: number[][]) => {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] === 0 ||
          (col < 3 && board[row][col] === board[row][col + 1]) ||
          (row < 3 && board[row][col] === board[row + 1][col])
        ) {
          return false
        }
      }
    }

    return true
  }

  const checkWin = (board: number[][]) => {
    for (let row of board) {
      if (row.includes(2048)) return true
    }
    return false
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-6">2048 Game</h1>
      <div className="flex justify-between w-full max-w-sm mb-4">
        <button
          onClick={initialize}
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600">
          New Game
        </button>
        <div className="text-xl font-bold">Score: {score}</div>
      </div>
      <div className="relative bg-gray-300 p-4 rounded-lg shadow-lg">
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-80 rounded-lg z-10">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">
              Game Over!
            </h2>
            <button
              onClick={initialize}
              className="px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-lg hover:bg-red-600">
              Restart
            </button>
          </div>
        )}
        {gameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-300 bg-opacity-80 rounded-lg z-10">
            <h2 className="text-3xl font-bold text-gray-700 mb-4">You Win!</h2>
            <button
              onClick={initialize}
              className="px-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600">
              Restart
            </button>
          </div>
        )}
        <div className="grid gap-2 bg-gray-400 p-4 rounded-lg">
          {data.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-4 gap-3">
              {row.map((value, colIndex) => (
                <Block key={colIndex} num={value} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
