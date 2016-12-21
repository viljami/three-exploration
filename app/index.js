
'use strict';

import App from './src/app';

const app = new App();

window.addEventListener('load', function load(){
  window.removeEventListener('load', load);
  app.start();
  console.log('App started.', app.name);
});
