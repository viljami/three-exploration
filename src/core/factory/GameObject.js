
'use strict';

import physics from '../physics/';
import graphics from '../graphics/';

let id = 0;
const getId = () => ++id;
const getGroup = gameObject => 'go' + gameObject.id;

export default function GameObject(x, y, r, data){
  this.id = getId();
  this.body = physics.create(x, y, data.r || r);
  this.body.group = getGroup(this);
  this.graphics = graphics.create(x, y, r, data.color);
  this.weapons = data.weapons || [
    {type:'fists', damage: 10, isPiercing: false, isSpread: false}
  ];

  // this.health = data.health || 100;
  // this.armor = data.armor || 10;
  // this.activeWeaponIndex = 0;
  // this.topSpeed = data.topSpeed;

  Object.keys(data).forEach(key => this[key] = data[key]);

  if (this.perception){
    this.sensor = physics.create(x, y, this.perception, false, true);
    const group = getGroup(this);
    this.sensor.addGroup(group);
    this.body.addGroup(group);
  }
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
  if (this.sensor) this.sensor.position.copy(this.body.position);
  this.graphics.update(this.body.position.x, this.body.position.y, this.body.r);
};
