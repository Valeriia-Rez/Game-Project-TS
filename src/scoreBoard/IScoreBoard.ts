import { IHistoryOfGame } from "../historyOfGames/IHistoryOfGames";

export interface IScoreBoard{
    addResult(resultOfGame: IHistoryOfGame): void
    getHistoryOfGames(numberOfGames: number,time: number): Promise<IHistoryOfGame[]>
    getHistoryOfGamesForCurrentWeek(): IHistoryOfGame[]
    getLatestGames(count: number): IHistoryOfGame[]
    getMostFrequentWinner(): string
    clear(): void
}