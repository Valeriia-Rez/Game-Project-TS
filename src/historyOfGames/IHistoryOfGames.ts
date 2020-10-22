export interface IHistoryOfGame{
    player1: {
      name: string
      attemptScore: number
    }
    player2: {
      name: string
      attemptScore: number
    }
    winner: {
      winnerName: string
      attemptScore: number
    }
    date: Date
  }