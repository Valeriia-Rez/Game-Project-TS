"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(players, difficulty, scoreBoard) {
        this.players = players;
        this.difficulty = difficulty;
        this.scoreBoard = scoreBoard;
    }
    getPlayers() {
        return this.players;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    setScoreBoard(scoreBoard) {
        this.scoreBoard = scoreBoard;
    }
    getScoreBoard() {
        return this.scoreBoard;
    }
    getDifficulty() {
        return this.difficulty;
    }
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }
    checkIfPlayerHasEnoughHealth(player, difficulty) {
        return player.getHealth() >= difficulty || false;
    }
    addResultToScoreBoard(currentPlayer, nextPlayer, winner, scoreBoard) {
        const currentPlayerName = currentPlayer.player.getName();
        const nextPlayerName = nextPlayer.player.getName();
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
    getWinnerAndUpdatePlayers(currentPlayer, nextPlayer) {
        let winner;
        if (currentPlayer.attemptScore > nextPlayer.attemptScore) {
            winner = currentPlayer;
            currentPlayer.player.addWins();
            nextPlayer.player.addLoses();
        }
        else {
            winner = nextPlayer;
            nextPlayer.player.addWins();
            currentPlayer.player.addLoses();
        }
        return winner;
    }
    playGame(players, scoreBoard) {
        players.forEach((player, indexForCurrentPlayer) => {
            if (indexForCurrentPlayer === players.length - 1) {
                return;
            }
            const currentPlayer = {
                player,
                attemptScore: Math.floor(Math.random() * 500),
            };
            players.forEach((_, index) => {
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
                const winner = this.getWinnerAndUpdatePlayers(currentPlayer, nextPlayer);
                this.addResultToScoreBoard(currentPlayer, nextPlayer, winner, scoreBoard);
            });
        });
    }
    startGame() {
        const playersWithEnoughHealthToEntryGame = this.players.filter((player) => this.checkIfPlayerHasEnoughHealth(player, this.difficulty));
        if (playersWithEnoughHealthToEntryGame.length < 2) {
            return;
        }
        this.playGame(playersWithEnoughHealthToEntryGame, this.scoreBoard);
    }
}
exports.Game = Game;
