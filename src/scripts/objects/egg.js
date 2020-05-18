import Entity from './entity';

export default class Egg extends Entity {
  constructor(scene, x, y) {
    super(scene, x + 20, y + 30, 'egg');
    this.body.velocity.y = 200;
    this.setScale(0.5);
  }
}