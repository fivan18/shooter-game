import 'phaser';
import config from '../config/config';
 
export default class CreditsScene extends Phaser.Scene {
  constructor () {
    super('Credits');
  }

  preload() {
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }
 
  create () {
    /* ************************************ Creat the text ************************************ */
    this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '45px', fill: '#808080' });
    this.madeByText = this.add.text(0, 0, 'Created By: Ivan Guzman', { fontSize: '35px', fill: '#808080' });
    this.zone = this.add.zone(config.width/2, config.height/2, config.width, config.height);
    Phaser.Display.Align.In.Center(
      this.creditsText,
      this.zone
    );
    Phaser.Display.Align.In.Center(
      this.madeByText,
      this.zone
    );
    this.madeByText.setY(1000);

    /* ************************************** Add efects ************************************** */
    this.creditsTween = this.tweens.add({
      targets: this.creditsText,
      y: -100,
      ease: 'Power1',
      duration: 3000,
      delay: 500,
      onComplete: () => {
        this.creditsTween.destroy;
      }
    });
     
    this.madeByTween = this.tweens.add({
      targets: this.madeByText,
      y: -300,
      ease: 'Power1',
      duration: 8000,
      delay: 1000,
      onComplete: () => {
        this.madeByTween.destroy;
        this.scene.start('Title');
      }
    });
  }
};