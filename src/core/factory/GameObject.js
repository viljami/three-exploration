
'use strict';

import physics from '../physics/';
import graphics from '../graphics/';

export default function GameObject(x, y, r, color){
  this.body = physics.create(x, y, r);
  this.graphics = graphics.create(x, y, r, color);
  this.health = 100;
  this.armor = 10;
  this.weapons = [
    {type:'fists', damage: 10, isPiercing: false, isSpread: false}
  ];
  this.activeWeaponIndex = 0;
  this.topSpeed = 6;
}

GameObject.prototype.move = function(x, y){
  const v = this.body.velocity;
  v.x += x;
  v.y += y;
  v.normalize();
  v.x *= this.topSpeed;
  v.y *= this.topSpeed;
};

GameObject.prototype.update = function(){
  this.graphics.update(this.body.position.x, this.body.position.y, this.body.r);
};
