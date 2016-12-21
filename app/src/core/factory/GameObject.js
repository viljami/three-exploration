
'use strict';

import physics from '../physics/';
import graphics from '../graphics/';

const PI2 = Math.PI / 2;
let id = 0;
const getId = () => ++id;
const getGroup = gameObject => gameObject.id;

export default function GameObject(){
  this.id = getId();
}

GameObject.prototype.init = function(x, y, data){
  this.data = Object.assign({}, data);

  return Promise.all([
    graphics.create(x, y, data.r, data.color, data.model)
  ])
  .then(results => {
    this.graphics = results[0];
    this.body = physics.create(x, y, data.r, data.isStatic, data.isSensor);
    this.body.userData = this;
    this.body.group = getGroup(this);

    Object.keys(data).forEach(key => this[key] = data[key]);
    this.maxHealth = this.health;

    if (this.perception){
      const group = getGroup(this);
      this.sensor = physics.create(x, y, this.perception, false, true);
      this.sensor.addGroup(group);
      this.body.addGroup(group);
    }

    this.healthBar = graphics.createUIComponent('healthBar', this);
    this.inflictDamageTime = 0;
    this.components = [];
  });
};

GameObject.prototype.addComponent = function(c){
  this.components.push(c);
};

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
  const body = this.body;
  const v = body.velocity;
  let rotation = v.x === 0 ? 0 : PI2  - Math.atan(v.x / v.y);
  this.graphics.update(
    body.position.x,
    body.position.y,
    body.r,
    rotation
  );
  this.components.forEach(o => o.update(this));
};

GameObject.prototype.inflictDamage = function(gameObject){
  const now = Date.now();
  if (now - this.inflictDamageTime < 100) return 0;
  this.inflictDamageTime = now;
  return this.health -= gameObject.damage;
};

GameObject.prototype.attack = function(direction){
  const weapon = this.weapons[this.activeWeaponIndex];


};

GameObject.prototype._destroy = function(){
  physics.remove(this.body);
  graphics.remove(this.graphics);
  graphics.removeUIComponent(this.healthBar);
  if (this.sensor) physics.remove(this.sensor);
  this.components.forEach(o => o._destroy(this));
};

GameObject.prototype.isAlive = function(){ return this.health > 0; };
