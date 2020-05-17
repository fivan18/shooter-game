import 'phaser';
import { Player, ChaserShip, GunShip, ScrollingBackground } from '../objects/entitties';
import sprBg0 from "../../assets/images/sprBg0.png";
import sprBg1 from "../../assets/images/sprBg1.png";
import sprExplosion from "../../assets/images/sprExplosion.png";
import sprEnemy0 from "../../assets/images/sprEnemy0.png";
import sprEnemy1 from "../../assets/images/sprEnemy1.png";
import sprEnemy2 from "../../assets/images/sprEnemy2.png";
import sprLaserEnemy0 from "../../assets/images/sprLaserEnemy0.png";
import dodo from "../../assets/images/dodo.png";
import egg from "../../assets/images/egg.png";
import sndExplode0 from "../../assets/audio/sndExplode0.wav";
import sndExplode1 from "../../assets/audio/sndExplode1.wav";
import sndLaser from "../../assets/audio/sndLaser.wav";

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
    this.score = 1;
  }

  getEnemiesByType(type) {
    var arr = [];
    for (var i = 0; i < this.enemies.getChildren().length; i++) {
      var enemy = this.enemies.getChildren()[i];
      if (enemy.getData("type") == type) {
        arr.push(enemy);
      }
    }
    return arr;
  }
 
  preload () {
    // load images
    this.load.image("sprBg0", sprBg0);
    this.load.image("sprBg1", sprBg1);
    this.load.spritesheet("sprExplosion", sprExplosion, {
      frameWidth: 32,
      frameHeight: 32
    });
    this.load.spritesheet("sprEnemy0", sprEnemy0, {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprEnemy1", sprEnemy1);
    this.load.spritesheet("sprEnemy2", sprEnemy2, {
      frameWidth: 16,
      frameHeight: 16
    });
    this.load.image("sprLaserEnemy0", sprLaserEnemy0);
    this.load.image("egg", egg);
    this.load.spritesheet("dodo", dodo, {
      frameWidth: 48,
      frameHeight: 64
    });


    this.load.audio("sndExplode0", sndExplode0);
    this.load.audio("sndExplode1", sndExplode1);
    this.load.audio("sndLaser", sndLaser);

  }
 
  create () {
    this.anims.create({
      key: "sprEnemy0",
      frames: this.anims.generateFrameNumbers("sprEnemy0"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprEnemy2",
      frames: this.anims.generateFrameNumbers("sprEnemy2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "sprExplosion",
      frames: this.anims.generateFrameNumbers("sprExplosion"),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "dodo",
      frames: this.anims.generateFrameNumbers("dodo"),
      frameRate: 20,
      repeat: -1
    });

    this.sfx = {
      explosions: [
        this.sound.add("sndExplode0"),
        this.sound.add("sndExplode1")
      ],
      laser: this.sound.add("sndLaser")
    };

    this.backgrounds = [];
    for (var i = 0; i < 4; i++) { // create five scrolling backgrounds
      var bg = new ScrollingBackground(this, "sprBg0", i * 10);
      this.backgrounds.push(bg);
    }

    // import player entity
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      "dodo"
    );

    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();
    

    // spawn event
    this.time.addEvent({
      delay: 2000,
      callback: function() {
        let enemy = new ChaserShip(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0
        );
        enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true
    });

    let enemyRigth = new GunShip(
      this,
      this.game.config.width - 10,
      0,
      90
    );
    enemyRigth.setScale(Phaser.Math.Between(10, 20) * 0.1);
    this.enemies.add(enemyRigth);

    let enemyLeft = new GunShip(
      this,
      10,
      this.game.config.height,
      270
    );
    enemyLeft.setScale(Phaser.Math.Between(10, 20) * 0.1);
    this.enemies.add(enemyLeft);

    // collide and overlap
    this.physics.add.collider(this.playerLasers, this.enemies, function(playerLaser, enemy) {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        playerLaser.destroy();
      }
    });

    this.physics.add.overlap(this.player, this.enemies, function(player, enemy) {
      if (!player.getData("isDead") &&
          !enemy.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, function(player, laser) {
      if (!player.getData("isDead") &&
          !laser.getData("isDead")) {
        player.explode(false);
        player.onDestroy();
        laser.destroy();
      }
    });

    // Score 
    this.currentScore = this.add.text(16, 16, "Score: 1", {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center'
    });
    this.currentScore.setOrigin(0);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.score += 1;
        this.currentScore.setText('Score: ' + this.score);
      },
      callbackScope: this,
      loop: true
    });
  }

  update() {
    if (!this.player.getData("isDead")) {
      this.player.update();
      if (this.keyW.isDown) {
        this.player.moveUp();
      }
      else if (this.keyS.isDown) {
        this.player.moveDown();
      }
      if (this.keyA.isDown) {
        this.player.moveLeft();
      }
      else if (this.keyD.isDown) {
        this.player.moveRight();
      }
    
      if (this.keySpace.isDown) {
        this.player.setData("isShooting", true);
      }
      else {
        this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
        this.player.setData("isShooting", false);
      }
    }

    this.enemies.getChildren().forEach((enemy) => {
      enemy.update();
      if (enemy.y < 0) {
        enemy.body.velocity.y = 100; 
      } else if(enemy.y > this.game.config.height){
        enemy.body.velocity.y = -100;
      }
    }, this);

    for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
      var laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
      var laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth ||
        laser.x > this.game.config.width + laser.displayWidth ||
        laser.y < -laser.displayHeight * 4 ||
        laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }

    for (var i = 0; i < this.backgrounds.length; i++) {
      this.backgrounds[i].update();
    }
  } 
};