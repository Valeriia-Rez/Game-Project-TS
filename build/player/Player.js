"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(id, name, health, wins, loses, gamesPlayed) {
        this.id = id;
        this.name = name;
        this.health = health;
        this.wins = wins;
        this.loses = loses;
        this.gamesPlayed = gamesPlayed;
    }
    getHealth() {
        return this.health;
    }
    updateHealth() {
        if (this.health > 0) {
            this.health = this.health - 1;
        }
    }
    getName() {
        return this.name;
    }
    getGamesPlayed() {
        return this.gamesPlayed;
    }
    getWins() {
        return this.wins;
    }
    addWins() {
        this.wins += 1;
        this.gamesPlayed += 1;
    }
    getLoses() {
        return this.loses;
    }
    addLoses() {
        this.loses += 1;
        this.updateHealth();
        this.gamesPlayed += 1;
    }
}
exports.Player = Player;
