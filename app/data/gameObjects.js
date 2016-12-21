
'use strict';

export default {
  human: {
    color: 0x00ff00, health: 100, armor: 10, damage: 20, topSpeed: 2,
    perception: 0, r: 5, model: 'Steve'
  },
  zombie: {
    color: 0xff0000, health: 100, armor: 5, damage: 10,
    topSpeed: 0.5,
    perception: 100, r: 7
  },
  zombieBoss: {
    color: 0xff0000, health: 200, armor: 20, damage: 50, topSpeed: 1,
    perception: 200, r: 14
  },
  wall: {
    color: 0x0000ff, health: 500, armor: 50, damage: 0, topSpeed: 0,
    perception: 10, r: 5, isStatic: true
  },
  house: {
    color: 0x0000ff, health: 200, armor: 20, damage: 0, topSpeed: 0,
    perception: 10, r: 20, isStatic: true
  }
};
