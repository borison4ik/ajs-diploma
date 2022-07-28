import { generateTeam } from './generators';
import PositionedCharacter from './PositionedCharacter';
import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Daemon from './characters/Daemon';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import GameState from './GameState';

export default class Team {
  constructor() {
    this.team = [];
    this.indexArray = [];

    GameState.currentLevel = 1;

    const userTeam = generateTeam([Bowman, Swordsman], 1, 2);
    userTeam.forEach((el) =>
      this.team.push(new PositionedCharacter(el, this.getIndex(true)))
    );

    const computerTeam = generateTeam([Daemon, Undead, Vampire], 1, 2);
    computerTeam.forEach((el) =>
      this.team.push(new PositionedCharacter(el, this.getIndex()))
    );
  }

  getIndex(user) {
    let index;
    if (user) {
      do {
        index = Math.round(Math.random()) + Math.round(Math.random() * 8) * 8;
      } while (this.indexArray.includes(index) || index > 63);
      this.indexArray.push(index);
      return index;
    }
    do {
      index = 6 + Math.round(Math.random()) + Math.round(Math.random() * 8) * 8;
    } while (this.indexArray.includes(index) || index > 63);
    this.indexArray.push(index);
    return index;
  }

  levelUp() {
    this.indexArray = [];
    GameState.currentLevel++;
    this.team.forEach((char) => {
      char.character.level++;
      char.position = this.getIndex(true);

      const attackAfter = +Math.max(
        char.character.attack,
        char.character.attack * (1.8 - char.character.health / 100)
      ).toFixed(2);
      char.character.attack = attackAfter;

      char.character.health += 80;
      if (char.character.health > 100) char.character.health = 100;

      if (char.character.player === 'computer') {
        this.team.splice(this.team.indexOf(char));
        this.indexArray.splice(this.team.indexOf(char));
      }
    });
    if (GameState.currentLevel === 2) {
      const userTeam = generateTeam([Bowman, Swordsman, Magician], 1, 1);
      userTeam.forEach((e) =>
        this.team.push(new PositionedCharacter(e, this.getIndex(true)))
      );

      const computerTeam = generateTeam(
        [Daemon, Undead, Vampire],
        2,
        this.team.length
      );
      computerTeam.forEach((e) => {
        e.health = 100;
        e.attack = e.attack * 1.25;
        this.team.push(new PositionedCharacter(e, this.getIndex()));
      });
    }

    if (GameState.currentLevel === 3) {
      const userTeam = generateTeam([Bowman, Swordsman, Magician], 2, 2);
      userTeam.forEach((e) =>
        this.team.push(new PositionedCharacter(e, this.getIndex(true)))
      );

      const computerTeam = generateTeam(
        [Daemon, Undead, Vampire],
        3,
        this.team.length
      );
      computerTeam.forEach((e) => {
        e.health = 100;
        e.attack = e.attack * 1.25;
        this.team.push(new PositionedCharacter(e, this.getIndex()));
      });
    }

    if (GameState.currentLevel === 4) {
      const userTeam = generateTeam([Bowman, Swordsman, Magician], 3, 2);
      userTeam.forEach((e) =>
        this.team.push(new PositionedCharacter(e, this.getIndex(true)))
      );

      const computerTeam = generateTeam(
        [Daemon, Undead, Vampire],
        4,
        this.team.length
      );
      computerTeam.forEach((e) => {
        e.health = 100;
        e.attack = e.attack * 1.25;
        this.team.push(new PositionedCharacter(e, this.getIndex()));
      });
    }
  }
}
