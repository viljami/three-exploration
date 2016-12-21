
'use strict';

import randomControl from '../controls/random';
import homingControl from '../controls/homing';

const ROAM_TIME = 10500;
const ATTACK_TIME = 3500;

const isHuman = body => body.userData && body.userData.type !== 'zombie';
const getHuman = collisions => collisions.find(o => isHuman(o.other));

function Coma (gameObject){
  this.gameObject = gameObject;
  this.gameObject.graphics.color = 'rgba(25,0,0,0.7)';
  this.startTime = Date.now();
  randomControl.remove(this.gameObject);
  homingControl.remove(this.gameObject);
}

Coma.prototype.update = function(){
  const sensor = this.gameObject.sensor;
  const collision = getHuman(sensor.collisions);

  if (! collision) return this;

  const other = collision.other;
  const type = other.userData && other.userData.type;

  if (type === 'zombie') return this;

  return new Attack(this.gameObject, other);
};


function Roam (gameObject){
  this.startTime = Date.now();
  this.gameObject = gameObject;
  this.gameObject.graphics.color = 'rgba(50,0,0,0.7)';
  randomControl.add(this.gameObject);
  homingControl.remove(this.gameObject);
}

Roam.prototype.update = function(){
  const sensor = this.gameObject.sensor;
  const collision = getHuman(sensor.collisions);

  if (! collision){
    if (this.isLosingFocus()) return new Coma(this.gameObject);
    return this;
  }

  const other = collision.other;
  const type = other.userData && other.userData.type;

  if (type === 'zombie'){
    return this.isLosingFocus() ? new Coma(this.gameObject) : this;
  }

  return new Attack(this.gameObject, other);
};

Roam.prototype.isLosingFocus = function(){
  return Date.now() - this.startTime > ROAM_TIME;
};

function Attack (gameObject, targetBody){
  this.startTime = Date.now();
  this.targetBody = targetBody;
  this.gameObject = gameObject;
  this.gameObject.graphics.color = 'rgba(75,0,0,0.7)';
  randomControl.remove(this.gameObject);
  homingControl.add(this.gameObject, this.targetBody);

  this.gameObject.sensor.collisions.forEach(o => {
    if (o.other.userData.type === 'zombie'){
      o.other.userData.sensor.collisions.push(o);
    }
  });
}

Attack.prototype.update = function(){
  const humanCollision = getHuman(this.gameObject.body.collisions);
  if (humanCollision){
    humanCollision.other.userData.inflictDamage(this.gameObject);
  }

  const sensor = this.gameObject.sensor;
  this.gameObject.graphics.color = 'rgba(75,0,0,0.7)';

  if (! sensor.collisions.length){
    return this.isLosingFocus() ? new Roam(this.gameObject) : this;
  }

  if (sensor.collisions.find(o => this.targetBody === o.other)){
    this.startTime = Date.now();
    return this;
  }

  return this.isLosingFocus() ? new Roam(this.gameObject) : this;
};

Attack.prototype.isLosingFocus = function(){
  return Date.now() - this.startTime > ATTACK_TIME;
};

export default function ZombieAI(gameObject) {
  this.gameObject = gameObject;
  this.state = new Coma(gameObject);
}

ZombieAI.prototype.update = function(){
  this.state = this.state.update();
};

ZombieAI.prototype._destroy = function(){
  this.isDestroyed = true;
  this.state = undefined;
  randomControl.remove(this.gameObject);
  homingControl.remove(this.gameObject);
  this.gameObject = undefined;
};
