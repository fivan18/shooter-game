/* global Phaser */

import 'phaser';
import Bird from '../objects/bird';
import SpeakedBall from '../objects/speakedBall';
import CannonBobMouth from '../objects/cannonBobMouth';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.score = 1;
  }

  preload() {
    this.add.image(0, 0, 'backgroundGame')
      .setOrigin(0, 0)
      .setScale(1);
  }

  create() {
    /* ******************************* Animations and sounds ******************************** */
    this.anims.create({
      key: 'cannonbobmouth',
      frames: this.anims.generateFrameNumbers('cannonbobmouth'),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion'),
      frameRate: 20,
      repeat: 0,
    });

    this.anims.create({
      key: 'dodo',
      frames: this.anims.generateFrameNumbers('dodo'),
      frameRate: 20,
      repeat: -1,
    });

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0'),
        this.sound.add('sndExplode1'),
      ],
      laser: this.sound.add('eggSound'),
    };

    /* ************************************** Keyboard ************************************** */
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    /* ************************************** Entities ************************************** */
    this.enemies = this.add.group();
    this.fireballs = this.add.group();
    this.eggs = this.add.group();

    this.bird = new Bird(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'dodo',
    );

    const enemyRigth = new CannonBobMouth(
      this,
      this.game.config.width - 10,
      0,
      90,
    ).setScale(1.5);
    this.enemies.add(enemyRigth);

    const enemyLeft = new CannonBobMouth(
      this,
      10,
      this.game.config.height,
      270,
    ).setScale(1.5);
    this.enemies.add(enemyLeft);

    this.time.addEvent({
      delay: 2000,
      callback() {
        const enemy = new SpeakedBall(
          this,
          Phaser.Math.Between(0, this.game.config.width),
          0,
        );
        enemy.setScale(Phaser.Math.Between(4, 10) * 0.1);
        this.enemies.add(enemy);
      },
      callbackScope: this,
      loop: true,
    });

    /* ************************ Collider and overlap beetwen entitties ************************ */
    this.physics.add.collider(this.eggs, this.enemies, (egg, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        egg.destroy();
      }
    });

    this.physics.add.overlap(this.bird, this.enemies, (bird, enemy) => {
      if (!bird.getData('isDead')
          && !enemy.getData('isDead')) {
        bird.explode(false);
        bird.onDestroy();
        enemy.explode(true);
      }
    });

    this.physics.add.overlap(this.bird, this.fireballs, (bird, laser) => {
      if (!bird.getData('isDead')
          && !laser.getData('isDead')) {
        bird.explode(false);
        bird.onDestroy();
        laser.destroy();
      }
    });

    /* **************************************** Score *************************************** */
    this.currentScore = this.add.text(16, 16, 'Score: 1', {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0);
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.score += 1;
        this.currentScore.setText(`Score: ${this.score}`);
      },
      callbackScope: this,
      loop: true,
    });
  }

  update() {
    /* *********************************** Bird movement ********************************** */
    if (!this.bird.getData('isDead')) {
      this.bird.update();
      if (this.keyW.isDown) {
        this.bird.moveUp();
      } else if (this.keyS.isDown) {
        this.bird.moveDown();
      }
      if (this.keyA.isDown) {
        this.bird.moveLeft();
      } else if (this.keyD.isDown) {
        this.bird.moveRight();
      }

      if (this.keySpace.isDown) {
        this.bird.setData('isShooting', true);
      } else {
        this.bird.setData('timerShootTick', this.bird.getData('timerShootDelay') - 1);
        this.bird.setData('isShooting', false);
      }
    }

    /* ********************* Maintain cannonbobmouth enemies beetwen edges ******************* */
    this.enemies.getChildren().forEach((enemy) => {
      enemy.update();
      if (enemy.y < 0) {
        enemy.body.velocity.y = 100;
      } else if (enemy.y > this.game.config.height) {
        enemy.body.velocity.y = -100;
      }
    });

    /* ************** Frustum culling to remove everything that moves off screen *************** */
    this.fireballs.getChildren().forEach((laser) => {
      laser.update();
      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    });

    this.eggs.getChildren().forEach((laser) => {
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    });
  }
}