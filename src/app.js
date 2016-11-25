
'use strict';

import factory from './core/factory/';
import Game from './game';

export default function App (options){
  this.name = 'Herd\'m';
  factory.setData(options.data);
  this.game = new Game(options);
}

App.prototype.start = function (){
  this.game.start();
};
