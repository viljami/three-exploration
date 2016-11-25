
'use strict';

import App from './src/app';
import data from './data/gameObjects';

const app = new App({data});

window.addEventListener('load', function load(){
  window.removeEventListener('load', load);
  app.start();
  console.log('App started.', app.name);
});
