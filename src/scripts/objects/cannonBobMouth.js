import Entity from './entity';
import Fireball from './fireball';

export default class CannonBobMouth extends Entity {
  constructor(scene, x, y, angle) {
    super(scene, x, y, 'cannonbobmouth', 'CannonBobMouth');
    this.play('cannonbobmouth');
    this.body.velocity.y = 100;
    this.angle = angle;
    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback() {
        const laser = new Fireball(
          this.scene,
          this.x,
          this.y,
          this.angle,
        );
        laser.setScale(0.1);
        this.scene.fireballs.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}