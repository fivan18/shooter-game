import 'phaser';
import background from "../../assets/images/background.png";
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('background', background);
  }
 
  create () {
    this.scene.start('Preloader');
  }
};