import Entity from './entity';

export default class EnemyLaser extends Entity {
  constructor(scene, x, y, angle) {
    super(scene, x, y, 'fireball');
    this.angle = angle + 90;
    if (angle === 90) {
      this.body.velocity.x = -200;
    } else {
      this.body.velocity.x = 200;
    }
  }
}