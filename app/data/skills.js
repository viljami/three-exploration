
'use strict';

export default [
  {name: 'zombie sense', depends: [], effect: {perception: 10}},
  {name: 'runner', depends: ['zombie sense'], effect: {topSpeed: 5}},
  {name: 'melee', depends: ['runner'], effect: {damage: 10}},
  {name: 'hand guns', depends: ['melee'], effect: {guns: ['hand gun']}},
  {name: 'rifles', depends: ['hand guns'], effect: {guns: ['rifle']}},
  {name: 'automatic guns', depends: ['rifles'], effect: {guns: ['automatic']}},
  {name: 'builder', depends: ['zombie sense'], effect: {build: ['wall']}},
  {name: 'mechanic', depends: ['zombie sense'], effect: {build: ['gate']}},
  {name: 'electronics', depends: [], effect: {build: ['light']}},
  {
    name: 'engineer',
    depends: ['builder', 'electronics'],
    effect: {build: ['turret']}
  },
  {
    name: 'scientist',
    depends: ['mechanic', 'electronics'],
    effect: {build: ['radio']}
  },
  {name: 'first aid', depends: ['runner'], effect: {health: 10, healing: 1}},
  {name: 'nurse', depends: ['first aid'], effect: {health: 20, healing: 2}},
  {name: 'doctor', depends: ['nurse'], effect: {health: 30, healing: 3}},
  {
    name: 'natural resistance',
    depends: ['doctor'],
    effect: {health: 40, healing: 4}
  },
  {name: 'scout', depends: ['zombie sense'], effect: {leadership: 10}},
  {name: 'boss', depends: ['scout'], effect: {leadership: 20}},
  {name: 'leader', depends: ['boss'], effect: {leadership: 50}}
];
