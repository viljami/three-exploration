
'use strict';

import randomControl from '../controls/random';
import homingControl from '../controls/homing';

// const states = {
//   roam: {control: randomControl},
//   attack: {control: homingControl}
// };

export default function ZombieAI(gameObject) {
  this.gameObject = gameObject;
}

const isRoaming = state => state === 'roam';

ZombieAI.prototype.update = function(){
  const sensor = this.gameObject.sensor;

  if (sensor.collisions.length){
    const body = sensor.collisions[0].other;

    if (isRoaming(this.state) || ! this.state){
      this.state = 'attack';
      randomControl.remove(this.gameObject);
      homingControl.add([this.gameObject, body]);
    }
  } else {
    if (! isRoaming(this.state) || ! this.state){
      this.state = 'roam';
      this.roamStartTime = Date.now();
      homingControl.remove(this.gameObject);
      randomControl.add(this.gameObject);
    } else if (
        this.roamStartTime &&
        Date.now() - this.roamStartTime > 5000
    ){
      this.state = 'standingComa';
      randomControl.remove(this.gameObject);
    }
  }
};
