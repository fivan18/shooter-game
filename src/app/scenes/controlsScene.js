/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */
/* eslint-disable no-unused-expressions */

import 'phaser';
import Button from '../objects/button';

export default class ControlsScene extends Phaser.Scene {
  constructor() {
    super('Controls');
  }

  preload() {
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }

  create() {
    const displayText = (height, text, fontSize) => {
      this.currentScore = this.add.text(this.game.config.width * 0.5,
        height,
        text,
        {
          fontFamily: 'monospace',
          fontSize,
          fontStyle: 'bold',
          color: '#808080',
          align: 'center',
        });
      this.currentScore.setOrigin(0.5);
    };

    // controls title
    displayText(128, 'Controls', 35);

    // controls keys
    const keys = [
      '← : left_',
      '→ : right',
      '↑ : up___',
      '↓ : down_',
      '⎵ : shoot',
    ];
    const fontSize = 25;
    let height = 200;
    keys.forEach(key => {
      displayText(height, key, fontSize);
      height += 35;
    });

    // return to title scene
    this.menuButton = new Button(this, 400, 450, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}