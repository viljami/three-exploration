
'use strict';

const HEALTH_BAR_WIDTH = 30;
const HEALTH_BAR_WIDTH_2 = HEALTH_BAR_WIDTH / 2;

export default function HealthBar (target){
  this.target = target;
}

HealthBar.prototype.draw = function (context, offset){
  if (this.target.health >= this.target.maxHealth) return;
  context.fillStyle = 'rgba(255, 0, 0, 0.7)';
  context.fillRect(
    offset.x - this.target.graphics.x - HEALTH_BAR_WIDTH_2,
    offset.y + this.target.graphics.y - 10 - this.target.body.r,
    HEALTH_BAR_WIDTH,
    5
  );
  context.fillStyle = 'rgba(0, 255, 0, 0.7)';
  if (this.target.health <= 0) return;
  const healthWidth = HEALTH_BAR_WIDTH * this.target.health / this.target.maxHealth;
  context.fillRect(
    offset.x - this.target.graphics.x - HEALTH_BAR_WIDTH_2,
    offset.y + this.target.graphics.y - 10 - this.target.body.r,
    healthWidth,
    5
  );
};