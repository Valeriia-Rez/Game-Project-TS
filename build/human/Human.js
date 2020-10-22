"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Human = void 0;
const Player_1 = require("../player/Player");
class Human extends Player_1.Player {
    constructor(id, name, health, wins, loses, gamesPlayed, yearOfBirth, gender) {
        super(id, name, health, wins, loses, gamesPlayed);
        this.yearOfBirth = yearOfBirth;
        this.gender = gender;
    }
    getGender() {
        return this.gender;
    }
}
exports.Human = Human;
