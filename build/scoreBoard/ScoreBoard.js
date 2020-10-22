"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreBoard = void 0;
class ScoreBoard {
    constructor() {
        this.historyOfGames = new Array();
    }
    addResult(resultOfGame) {
        this.historyOfGames.push(resultOfGame);
    }
    getHistoryOfGames(numberOfGames, time) {
        const games = this.historyOfGames.slice(this.historyOfGames.length - numberOfGames, this.historyOfGames.length);
        const historyOfGamesLength = this.historyOfGames.length;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (numberOfGames > historyOfGamesLength) {
                    reject("Error");
                }
                else {
                    resolve(games);
                }
            }, time);
        });
    }
    getLatestGames(count) {
        const latestGames = this.historyOfGames.slice(this.historyOfGames.length - count, this.historyOfGames.length);
        return latestGames;
    }
    getStartAndEndDate() {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const numDay = now.getDate();
        const start = new Date(now);
        start.setDate(numDay - dayOfWeek);
        start.setHours(0, 0, 0, 0);
        const end = new Date(now);
        end.setDate(numDay + (7 - dayOfWeek));
        end.setHours(0, 0, 0, 0);
        return [start, end];
    }
    getHistoryOfGamesForCurrentWeek() {
        const startAndEndDate = this.getStartAndEndDate();
        return this.historyOfGames.filter((game) => +game.date >= +startAndEndDate[0] && +game.date < +startAndEndDate[1]);
    }
    countWinsForEachPlayer() {
        return this.historyOfGames.reduce((acc, cur) => {
            if (acc[cur.winner.winnerName]) {
                acc[cur.winner.winnerName] = acc[cur.winner.winnerName] + 1;
            }
            else {
                acc[cur.winner.winnerName] = 1;
            }
            return acc;
        }, {});
    }
    getTopWinner(playersWithWinsCount) {
        return Object.keys(playersWithWinsCount).reduce((acc, cur) => {
            if (playersWithWinsCount[acc] > playersWithWinsCount[cur]) {
                acc = acc;
            }
            else {
                acc = cur;
            }
            return acc;
        }, "");
    }
    getMostFrequentWinner() {
        const playersWithWinsCount = this.countWinsForEachPlayer();
        const winner = this.getTopWinner(playersWithWinsCount);
        return winner;
    }
    clear() {
        this.historyOfGames = [];
    }
}
exports.ScoreBoard = ScoreBoard;
