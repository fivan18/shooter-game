import 'phaser';
import './assets/css/style.css';
import sky from './assets/images/sky.png';
import ground from './assets/images/platform.png';
import star from './assets/images/star.png';
import bomb from './assets/images/bomb.png';
import dude from './assets/images/dude.png';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

let game = new Phaser.Game(config);

function preload ()
{
  this.load.image('sky', sky);
  this.load.image('ground', ground);
  this.load.image('star', star);
  this.load.image('bomb', bomb);
  this.load.spritesheet('dude', 
      dude,
      { frameWidth: 32, frameHeight: 48 }
  );
}


let platforms;
function create ()
{
  this.add.image(400, 300, 'sky');
  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
}

function update ()
{
}
