import 'phaser';
import './assets/css/style.css';
import sky from './assets/images/sky.png';
import ground from './assets/images/platform.png';
import start from './assets/images/star.png';
import bomb from './assets/images/bomb.png';
import dude from './assets/images/dude.png';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', sky);
  this.load.image('ground', ground);
  this.load.image('star', start);
  this.load.image('bomb', bomb);
  this.load.spritesheet('dude', 
      dude,
      { frameWidth: 32, frameHeight: 48 }
  );
}

function create ()
{
  this.add.image(400, 300, 'sky');
  this.add.image(400, 300, 'star');
}

function update ()
{
}
