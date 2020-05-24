/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */

import 'phaser';
import Entity from './entity';


export default class SpeakedBall extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spikedball', 'SpeakedBall');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.states = {
      MOVE_DOWN: 'MOVE_DOWN',
      CHASE: 'CHASE',
    };
    this.state = this.states.MOVE_DOWN;
  }

  update() {
    if (!this.getData('isDead') && this.scene.bird) {
      if (Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.scene.bird.x,
        this.scene.bird.y,
      ) < 320) {
        this.state = this.states.CHASE;
      }

      if (this.state === this.states.CHASE) {
        const dx = this.scene.bird.x - this.x;
        const dy = this.scene.bird.y - this.y;

        const angle = Math.atan2(dy, dx);

        const speed = 100;
        this.body.setVelocity(
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
        );
      }
    }

    if (this.x < this.scene.bird.x) {
      this.angle -= 5;
    } else {
      this.angle += 5;
    }
  }
}