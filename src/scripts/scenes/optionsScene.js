import 'phaser';
import Button from '../objects/button';
 
export default class OptionsScene extends Phaser.Scene {
  constructor () {
    super('Options');
  }

  init() {
    this.model = this.sys.game.globals.model;
  }

  preload() {
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }

  updateAudio() {
    if (this.model.musicOn === false) {
      this.musicCheckbox.setTexture('box');
      this.sys.game.globals.bgMusic.stop();
      this.model.bgMusicPlaying = false;
    } else {
      this.musicCheckbox.setTexture('checkedBox');
      if (this.model.bgMusicPlaying === false) {
        this.sys.game.globals.bgMusic.play();
        this.model.bgMusicPlaying = true;
      }
    }
  }
 
  create () {
    this.text = this.add.text(300, 100, 'Options', { fontSize: 40, fill: '#808080' });

    // checkbox 
    this.musicCheckbox = this.add.image(200, 200, 'checkedBox');
    this.musicText = this.add.text(250, 190, 'Music Enabled', { fontSize: 24, fill: '#808080' });
    this.musicCheckbox.setInteractive();
    this.musicCheckbox.on('pointerdown', () => {
      this.model.musicOn = !this.model.musicOn;
      this.updateAudio();
    });

    // return to title scene
    this.menuButton = new Button(this, 400, 350, 'blueButton1', 'blueButton2', 'Menu', 'Title');

    // update audio
    this.updateAudio();
  }
};