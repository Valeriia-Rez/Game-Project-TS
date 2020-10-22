import {IPlayer} from "../player/IPlayer";

export class Player implements IPlayer {
    protected readonly id: number;
    protected name: string;
    protected health: number;
    protected wins: number;
    protected loses: number;
    protected gamesPlayed: number;
    public constructor(
      id: number,
      name:string, 
      health:number, 
      wins:number,
      loses:number, 
      gamesPlayed:number
    ) {
      this.id = id;
      this.name = name;
      this.health = health;
      this.wins = wins;
      this.loses = loses;
      this.gamesPlayed = gamesPlayed;
    }

    public getHealth(): number {
      return this.health;
    }
  
    private updateHealth(): void {
      if (this.health > 0) {
        this.health = this.health - 1;
      }
    }
  
    public getName(): string {
      return this.name;
    }
  
    public getGamesPlayed(): number {
      return this.gamesPlayed;
    }
  
    public getWins(): number {
      return this.wins;
    }
  
    public addWins(): void {
      this.wins += 1;
      this.gamesPlayed += 1;
    }
  
    public getLoses(): number {
      return this.loses;
    }
  
    public addLoses(): void {
      this.loses += 1;
      this.updateHealth();
      this.gamesPlayed += 1;
    }
  }
  
  
  
