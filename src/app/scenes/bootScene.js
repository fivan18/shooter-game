/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */

import 'phaser';
import background from '../../assets/images/backgroundGame.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('background', background);
  }

  create() {
    this.scene.start('Preloader');
  }
}