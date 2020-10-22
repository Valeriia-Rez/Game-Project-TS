import {Human} from "./human/Human";
import {ScoreBoard} from "./scoreBoard/ScoreBoard";
import {Game} from "./game/Game";

const board = new ScoreBoard();
const alex = new Human(1, "Alex", 50, 0, 0, 0, 1991, "male");
const ivan = new Human(2, "Ivan", 50, 0, 0, 0, 1987, "male");
const max = new Human(3, "Max", 50, 0, 0, 0, 1994, "male");
const game = new Game([alex, ivan, max], 1, board);
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

  const getHistoryOfGames = async () => {
    try {
      const result1 = await board.getHistoryOfGames(1, 1000);
      console.log(result1);
      const result2 = await board.getHistoryOfGames(2, 3000);
      console.log(result2);
      const result3 = await board.getHistoryOfGames(5, 5000);
      console.log(result3);
    } catch (error) {
      console.log(error);
    }
  };
  
  getHistoryOfGames();



