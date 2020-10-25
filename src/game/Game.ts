import {IPlayer} from "../player/IPlayer";
import { IScoreBoard } from "../scoreBoard/IScoreBoard";

export class Game{
    protected players: IPlayer[];
    protected difficulty: number;
    protected scoreBoard: IScoreBoard;
    public constructor(
        players: IPlayer[],
        difficulty: number,
        scoreBoard: IScoreBoard
    ){
    this.players = players;
    this.difficulty = difficulty;
    this.scoreBoard = scoreBoard;
    }

    public getPlayers(): IPlayer[] {
        return this.players;
    }

    public addPlayer(player: IPlayer): void {
        this.players.push(player);
    }

    public setScoreBoard(scoreBoard: IScoreBoard): void {
        this.scoreBoard = scoreBoard;
    }

    public getScoreBoard(): IScoreBoard {
        return this.scoreBoard;
    }

    public  getDifficulty(): number {
        return this.difficulty;
    }
    
    public setDifficulty(difficulty: number): void {
        this.difficulty = difficulty;
    }

    private checkIfPlayerHasEnoughHealth(player: IPlayer, difficulty: number): boolean {
        return player.getHealth() >= difficulty || false;
    }

    private addResultToScoreBoard (currentPlayer: {player: IPlayer, attemptScore: number}, nextPlayer: {player: IPlayer, attemptScore: number}, winner:  {player: IPlayer, attemptScore: number}, scoreBoard: IScoreBoard): void{
      const currentPlayerName: string = currentPlayer.player.getName();
      const nextPlayerName: string = nextPlayer.player.getName();
      scoreBoard.addResult({
        player1: {
          name: currentPlayerName,
          attemptScore: currentPlayer.attemptScore,
        },

        player2: {
          name: nextPlayerName,
          attemptScore: nextPlayer.attemptScore,
        },

        winner: {
          winnerName: winner.player.getName(),
          attemptScore: winner.attemptScore,
        },
        date: new Date(),
      });
  }

    private getWinnerAndUpdatePlayers(currentPlayer: {player: IPlayer, attemptScore: number}, nextPlayer: {player: IPlayer, attemptScore: number}): {player: IPlayer, attemptScore: number}{
      let winner: {player: IPlayer, attemptScore: number};
      if (currentPlayer.attemptScore > nextPlayer.attemptScore) {
        winner = currentPlayer;
        currentPlayer.player.addWins();
        nextPlayer.player.addLoses();
      } else {
        winner = nextPlayer;
        nextPlayer.player.addWins();
        currentPlayer.player.addLoses();
      }
      return winner;
    }

    private playGame(players: IPlayer[], scoreBoard: IScoreBoard): void {
        players.forEach((player: IPlayer, indexForCurrentPlayer: number): void => {
          if (indexForCurrentPlayer === players.length - 1) {
            return;
          }
          const currentPlayer:{player:IPlayer, attemptScore:number}  = {
            player,
            attemptScore: Math.floor(Math.random() * 500),
          };
          
          players.forEach((_,index: number): void => {
            let indexForNextPlayer: number;
            indexForCurrentPlayer === 0
              ? (indexForNextPlayer = index + 1)
              : (indexForNextPlayer = indexForCurrentPlayer + index + 1);
    
            if (indexForNextPlayer > players.length - 1) {
              return;
            }
    
            const nextPlayer: {player: IPlayer, attemptScore: number} = {
              player: players[indexForNextPlayer],
              attemptScore: Math.floor(Math.random() * 500),
            };

            const winner = this.getWinnerAndUpdatePlayers(currentPlayer, nextPlayer);
            this.addResultToScoreBoard(currentPlayer, nextPlayer, winner, scoreBoard);
          });
        });
      }
    

    public startGame(): void {
        const playersWithEnoughHealthToEntryGame: IPlayer[] = this.players.filter((player: IPlayer) =>
          this.checkIfPlayerHasEnoughHealth(player, this.difficulty)
        );
    
        if (playersWithEnoughHealthToEntryGame.length < 2) {
          return;
        }
    
        this.playGame(
          playersWithEnoughHealthToEntryGame,
          this.scoreBoard
        );
      }
}