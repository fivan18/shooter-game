/* global Phaser */

import 'phaser';
import Button from '../objects/button';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }

  preload() {
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }

  create() {
    // text
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#808080',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.currentScore = this.add.text(this.game.config.width * 0.5, 180,
      `Score: ${this.sys.game.globals.currentScore}`,
      {
        fontFamily: 'monospace',
        fontSize: 15,
        fontStyle: 'bold',
        color: '#808080',
        align: 'center',
      });
    this.currentScore.setOrigin(0.5);

    this.maxScore = this.add.text(this.game.config.width * 0.5, 200,
      `Max Score: ${this.sys.game.globals.model.score.score}`,
      {
        fontFamily: 'monospace',
        fontSize: 15,
        fontStyle: 'bold',
        color: '#808080',
        align: 'center',
      });
    this.maxScore.setOrigin(0.5);

    // return to title scene
    this.menuButton = new Button(this, 400, 350, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}