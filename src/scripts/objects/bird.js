/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */

import 'phaser';
import Entity from './entity';
import Egg from './egg';

export default class Bird extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Bird');
    this.setData('speed', 200);
    this.play('dodo');

    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const { globals } = this.scene.sys.game;
        if (this.scene.score > globals.model.score.score) {
          globals.model.score = { score: this.scene.score, user: globals.model.score.user };
          globals.model.save();
        }
        globals.currentScore = this.scene.score;
        this.scene.score = 1;
        this.scene.scene.start('GameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }

  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
      } else {
        const laser = new Egg(this.scene, this.x, this.y);
        this.scene.eggs.add(laser);

        this.scene.sfx.laser.play();
        this.setData('timerShootTick', 0);
      }
    }
  }
}