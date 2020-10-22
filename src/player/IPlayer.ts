export interface IPlayer{
    getHealth() : number
    getName(): string
    addWins() : void
    addLoses() : void
    getGamesPlayed() : number
    getLoses() : number
    getWins() : number
}