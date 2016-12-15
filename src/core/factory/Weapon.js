
'use strict';

export default function Weapon (options){
  this.data = Object.assign({}, options.data);
  this.ammo = options.ammo; // -1 is infinite
}

Weapon.prototype.get = function(key){ return this.data[key]; };

Weapon.prototype.use = function(){
  const now = Date.now();
  if (now - this.lastUsedTime < this.data.reloadTime) return false;
  this.lastUsedTime = now;
  return this.data.damage;
};
