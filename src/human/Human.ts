import {Player} from "../player/Player";

export class Human extends Player {
    protected yearOfBirth : number;
    protected gender : string;
    public constructor(
      id:number,
      name:string,
      health:number,
      wins:number, 
      loses:number,
      gamesPlayed:number,
      yearOfBirth:number, 
      gender:string
    ) {
      super(id, name, health, wins, loses, gamesPlayed);
      this.yearOfBirth = yearOfBirth;
      this.gender = gender;
    }
  
    public getGender() : string {
      return this.gender;
    }
  }
  
  
    