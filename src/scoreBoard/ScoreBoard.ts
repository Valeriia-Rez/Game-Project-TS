import {IScoreBoard} from "../scoreBoard/IScoreBoard";
import {IHistoryOfGame} from "../historyOfGames/IHistoryOfGames";


export class ScoreBoard implements IScoreBoard{
    protected historyOfGames: IHistoryOfGame[];
    public constructor(){
        this.historyOfGames = new Array<IHistoryOfGame>();
    }

    public addResult(resultOfGame: IHistoryOfGame): void {
        this.historyOfGames.push(resultOfGame);
    }

    public getHistoryOfGames(numberOfGames: number, time: number): Promise<IHistoryOfGame[]> {
      const games: IHistoryOfGame[] = this.historyOfGames.slice(
        this.historyOfGames.length - numberOfGames,
        this.historyOfGames.length
      );
      const historyOfGamesLength: number = this.historyOfGames.length;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (numberOfGames > historyOfGamesLength) {
            reject("Error");
          } else {
            resolve(games);
          }
        }, time);
      });
    }
  
    
    public getLatestGames(count: number): IHistoryOfGame[] {
        const latestGames: IHistoryOfGame[] = this.historyOfGames.slice(
          this.historyOfGames.length - count,
          this.historyOfGames.length
        );
        return latestGames;
    }
   
    private getStartAndEndDate(): Date[] {
        const now: Date = new Date();
        const dayOfWeek: number = now.getDay();
        const numDay: number = now.getDate();
        const start: Date = new Date(now);
        start.setDate(numDay - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        const end: Date = new Date(now);
        end.setDate(numDay + (7 - dayOfWeek));
        end.setHours(0, 0, 0, 0);
        return [start, end];
    }

    public getHistoryOfGamesForCurrentWeek(): IHistoryOfGame[] {
        const startAndEndDate: Date[] = this.getStartAndEndDate();
        return this.historyOfGames.filter(
          (game: IHistoryOfGame) =>
            +game.date >= +startAndEndDate[0] && +game.date < +startAndEndDate[1]
        );
    }

    private countWinsForEachPlayer(): {[playerName: string]: number} {
      return this.historyOfGames.reduce((acc: {[playerName: string]: number}, cur: IHistoryOfGame) => {
        if( acc[cur.winner.winnerName]){
          acc[cur.winner.winnerName] = acc[cur.winner.winnerName] + 1
        } else{
          acc[cur.winner.winnerName] = 1;
        } 
        return acc;
      }, {});
    }
  
    private getTopWinner(playersWithWinsCount:{[playerName: string]: number}): string {
      return Object.keys(playersWithWinsCount).reduce((acc:string, cur:string): string => {
        if(playersWithWinsCount[acc] > playersWithWinsCount[cur]){
          acc = acc
        } else {
          acc = cur
        }
        return acc;
      }, "");
    }
  
    public getMostFrequentWinner(): string {
      const playersWithWinsCount:{[playerName: string]: number}  = this.countWinsForEachPlayer();
      const winner: string = this.getTopWinner(playersWithWinsCount);
      return winner;
    }
    
    public clear(): void {
        this.historyOfGames = [];
    }
    
    }