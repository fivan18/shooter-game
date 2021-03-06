/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */

import 'phaser';
import Button from '../objects/button';
import config from '../config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  preload() {
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }

  create() {
    // Game
    this.gameButton = new Button(this, config.width / 2, config.height / 2 - 150, 'blueButton1', 'blueButton2', 'Play', 'Game');

    // Options
    this.optionsButton = new Button(this, config.width / 2, config.height / 2 - 50, 'blueButton1', 'blueButton2', 'Options', 'Options');

    // Controls
    this.controlsButton = new Button(this, config.width / 2, config.height / 2 + 50, 'blueButton1', 'blueButton2', 'Controls', 'Controls');

    // Leader Board
    this.leaderBoardButton = new Button(this, config.width / 2, config.height / 2 + 150, 'blueButton1', 'blueButton2', 'Leader', 'LeaderBoard');

    // Turn on music
    this.model = this.sys.game.globals.model;
    if (this.model.musicOn === true && this.model.bgMusicPlaying === false) {
      this.bgMusic = this.sound.add('bgMusic', { volume: 0.5, loop: true });
      this.bgMusic.play();
      this.model.bgMusicPlaying = true;
      this.sys.game.globals.bgMusic = this.bgMusic;
    }
  }
}