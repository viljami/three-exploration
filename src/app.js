
'use strict';

import Game from './game';

export default function App (){
  this.name = 'Herd\'m';
  this.game = new Game();
}

App.prototype.start = function (){
  this.game.start();
};
