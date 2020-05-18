import Entity from './entity';
import EnemyLaser from './enemyLaser';

export default class GunShip extends Entity {
  constructor(scene, x, y, angle) {
    super(scene, x, y, 'cannonbobmouth', 'GunShip');
    this.play('cannonbobmouth');
    this.body.velocity.y = 100;// Phaser.Math.Between(50, 100);
    this.angle = angle;
    this.shootTimer = this.scene.time.addEvent({
      delay: 2000,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
          this.angle,
        );
        laser.setScale(0.1);
        this.scene.enemyLasers.add(laser);
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