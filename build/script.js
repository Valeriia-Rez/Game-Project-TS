"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Human_1 = require("./human/Human");
const ScoreBoard_1 = require("./scoreBoard/ScoreBoard");
const Game_1 = require("./game/Game");
const board = new ScoreBoard_1.ScoreBoard();
const alex = new Human_1.Human(1, "Alex", 50, 0, 0, 0, 1991, "male");
const ivan = new Human_1.Human(2, "Ivan", 50, 0, 0, 0, 1987, "male");
const max = new Human_1.Human(3, "Max", 50, 0, 0, 0, 1994, "male");
const game = new Game_1.Game([alex, ivan, max], 1, board);
//console.log(game);
//console.log(alex,ivan,max);
//console.log(max.getHealth());
game.startGame();
//console.log(board.getLatestGames(2));
//console.log(board.getHistoryOfGamesForCurrentWeek());
//console.log(game.getPlayers());
console.log(board.getMostFrequentWinner());
/*board
  .getHistoryOfGames(1, 2000)
  .then((data) => {
    console.log(data);
    return board.getHistoryOfGames(2, 3000);
  })
  .then((data) => {
    console.log(data);
    return board.getHistoryOfGames(10, 5000);
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });*/
function getHistoryOfGames() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result1 = yield board.getHistoryOfGames(1, 1000);
            console.log(result1);
            const result2 = yield board.getHistoryOfGames(2, 3000);
            console.log(result2);
            const result3 = yield board.getHistoryOfGames(5, 5000);
            console.log(result3);
        }
        catch (error) {
            console.log(error);
        }
    });
}
;
getHistoryOfGames();
