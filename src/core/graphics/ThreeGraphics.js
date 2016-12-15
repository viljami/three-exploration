
'use strict';

import THREE from '../../../node_modules/three/three.min';
// import HealthBar from './HealthBar';

const CAMERA_Z = 200;
const SCALE_X = 1;
const SCALE_Y = 1;
const materials = {};
let W = window.innerWidth;
let H = window.innerHeight;
let id = 0;

const getId = () => --id;

function GraphicsBody (mesh){
  this.id = getId();
  this.mesh = mesh;
}

GraphicsBody.prototype.update = function (x, y, r, c){
  this.mesh.position.set(x / SCALE_X, y / SCALE_Y, 0);
  this.r = r;
  if (c) this.setColor(c);
};

GraphicsBody.prototype.setColor = function (c){
  if (! materials[c]) materials[c] = new THREE.MeshBasicMaterial({color: c});
  this.mesh.material = materials[c];
};

function Graphics(){
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 1000);
  this.camera.position.z = CAMERA_Z;
  this.uiComponents = [];
  this.objects = [];

  this.spotLight = new THREE.SpotLight(0xffffff, 2, 500, Math.PI);
  this.scene.add(this.spotLight);

  const spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
  this.scene.add(spotLightHelper);
}

Graphics.prototype.addFog = function(radius){
};

Graphics.prototype.createUIComponent = function(type, options){
  // const o = new HealthBar(options);
  // this.uiComponents.push(o);
  // return o;
};

Graphics.prototype.createLayer = function(parentElement = document.body){
  this.renderer = new THREE.WebGLRenderer();
  parentElement.appendChild(this.renderer.domElement);
};

Graphics.prototype.draw = function(){
  this.spotLight.position.copy(this.cameraTarget.mesh.position);
  this.camera.position.copy(this.cameraTarget.mesh.position);
  this.camera.position.z = CAMERA_Z;
  this.spotLight.position.z = CAMERA_Z;
  this.renderer.render(this.scene, this.camera);
};

Graphics.prototype.setCameraTarget = function(graphicsObject){
  this.cameraTarget = graphicsObject;
};

Graphics.prototype.create = function(x,y,r,c){
  const o = new GraphicsBody(x,y,r,c);
  const geometry = new THREE.SphereGeometry(r);
  if (! materials[c]) materials[c] = new THREE.MeshLambertMaterial({color: c});
  const material = materials[c];
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.x = x / SCALE_X;
  mesh.position.y = y / SCALE_Y;
  mesh.position.z = 0;
  this.scene.add(mesh);

  o.mesh = mesh;
  this.objects.push(o);

  return o;
};

Graphics.prototype.remove = function(graphic){
  for (let i = 0; i < this.objects.length; i++){
    if (this.objects[i] === graphic){
      this.scene.remove(graphic.mesh);
      return this.objects.splice(i, 1);
    }
  }
};

Graphics.prototype.removeUIComponent = function(uiComponent){
  for(let i = 0; i < this.uiComponents.length; i++){
    if (this.uiComponents[i] === uiComponent){
      return this.uiComponents.splice(i, 1);
    }
  }
};

Graphics.prototype.start = function(){
  this.isRunning = true;

  const render = () => {
    if (this.isRunning) requestAnimationFrame(render);
    this.draw();
  };

  this.resize = this.resize.bind(this);
  window.addEventListener('resize', this.resize);

  render();
};

Graphics.prototype.stop = function(){
  this.isRunning = false;
  window.removeEventListener('resize', this.resize);
};

Graphics.prototype.resize = function (){
  W = window.innerWidth;
  H = window.innerHeight;
  this.renderer.setSize(W, H);
};

export default Graphics;
