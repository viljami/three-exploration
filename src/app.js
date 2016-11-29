
'use strict';

import Game from './game';

export default function App (options){
  this.name = 'Herd\'m';
  this.game = new Game(options);
}

App.prototype.start = function (){
  this.game.start();
};
