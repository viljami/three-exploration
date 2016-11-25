
'use strict';

import physics from '../physics/';
import graphics from '../graphics/';

export default function GameObject(x, y, r, data){
  this.body = physics.create(x, y, r);
  this.graphics = graphics.create(x, y, r, data.color);
  this.health = data.health || 100;
  this.armor = data.armor || 10;
  this.weapons = data.weapons || [
    {type:'fists', damage: 10, isPiercing: false, isSpread: false}
  ];
  this.activeWeaponIndex = 0;
  this.topSpeed = data.topSpeed;
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
