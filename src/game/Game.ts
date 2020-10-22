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

    private playGame(difficulty: number, players: IPlayer[], scoreBoard: IScoreBoard): void {
        
      players.forEach((player, indexForCurrentPlayer) => {
          if (indexForCurrentPlayer === players.length - 1) {
            return;
          }
          const currentPlayer:{player:IPlayer, attemptScore:number}  = {
            player,
            attemptScore: Math.floor(Math.random() * 500),
          };
          const currentPlayerName: string = currentPlayer.player.getName();
    
          players.forEach((player, index) => {
            let indexForNextPlayer;
            indexForCurrentPlayer === 0
              ? (indexForNextPlayer = index + 1)
              : (indexForNextPlayer = indexForCurrentPlayer + index + 1);
    
            if (indexForNextPlayer > players.length - 1) {
              return;
            }
    
            const nextPlayer = {
              player: players[indexForNextPlayer],
              attemptScore: Math.floor(Math.random() * 500),
            };
            const nextPlayerName: string = nextPlayer.player.getName();
    
            let winner;
            if (currentPlayer.attemptScore > nextPlayer.attemptScore) {
              winner = currentPlayer;
              currentPlayer.player.addWins();
              nextPlayer.player.addLoses();
            } else {
              winner = nextPlayer;
              nextPlayer.player.addWins();
              currentPlayer.player.addLoses();
            }
   
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
          
          });
        });
      }
    

    public startGame(): void {
        const playersWithEnoughHealthToEntryGame: IPlayer[] = this.players.filter((player) =>
          this.checkIfPlayerHasEnoughHealth(player, this.difficulty)
        );
    
        if (playersWithEnoughHealthToEntryGame.length < 2) {
          return;
        }
    
        this.playGame(
          this.difficulty,
          playersWithEnoughHealthToEntryGame,
          this.scoreBoard
        );
      }
}