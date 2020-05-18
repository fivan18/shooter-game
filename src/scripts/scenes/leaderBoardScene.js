/* global Phaser */

import 'phaser';
import Button from '../objects/button';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  preload() {
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }

  create() {
    //  Create our own Event Emitter for API to fetch info
    let emitter = new Phaser.Events.EventEmitter();
    const displayText = (text, height) => {
      this.add.text(this.game.config.width * 0.5, 
        height, 
        text,
        {
          fontFamily: 'monospace',
          fontSize: 48,
          fontStyle: 'bold',
          color: '#808080',
          align: 'center',
        }
      ).setOrigin(0.5);
    };

    emitter.on('infoLoaded', (scores) => {
      let height = 128;
      if(scores.length == 0) {
        displayText("No scores found", height);
      } else if (scores.length < 4) {
        scores.forEach(score => {
          displayText(`${score.user} : ${score.score}`, height);
          height += 70;
        });
      } else {
        scores.slice(0, 3).forEach(score => {
          displayText(`${score.user} : ${score.score}`, height);
          height += 70;
        });
      }
    }, this);

    this.sys.game.globals.model.apiAllScores()
      .then(scores => {
        if(scores) {
          const sortedScores = scores.sort((a , b) => b.score - a.score);
          emitter.emit('infoLoaded', sortedScores);
        } else {
          displayText('Try again please', 128);
        }
      });

    // return to title scene
    this.menuButton = new Button(this, 400, 350, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}