/* global Phaser */

import 'phaser';
// gameScene
import sprExplosion from '../../assets/images/sprExplosion.png';
import fireball from '../../assets/images/fireball.png';
import dodo from '../../assets/images/dodo.png';
import egg from '../../assets/images/egg.png';
import spikedball from '../../assets/images/spikedball.png';
import cannonbobmouth from '../../assets/images/cannonbobmouth.png';
import sndExplode0 from '../../assets/audio/sndExplode0.wav';
import sndExplode1 from '../../assets/audio/sndExplode1.wav';
import eggSound from '../../assets/audio/eggSound.wav';
// rest
import blueButton1 from '../../assets/images/ui/blue_button02.png';
import blueButton2 from '../../assets/images/ui/blue_button03.png';
import box from '../../assets/images/ui/grey_box.png';
import checkBox from '../../assets/images/ui/blue_boxCheckmark.png';
import backgroundGame from '../../assets/images/backgroundGame.png';
import bgMusic from '../../assets/audio/bgMusic.wav';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      if (this.sys.game.globals.playerName) {
        this.scene.start('Title');
      } else {
        this.scene.start('Authentication');
      }
    }
  }

  preload() {
    /* ***************************** Preload for preloaderScene ***************************** */
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);

    /* ************************ What is displayed while all is loaded ************************ */
    // display game's name
    const gameName = this.add.text(this.game.config.width * 0.5, 128, 'BIRD SURVIVING', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#808080',
      align: 'center',
    });
    gameName.setOrigin(0.5);

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#A9A9A9',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#A9A9A9',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#A9A9A9',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', value => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', file => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // let scene know all have been loaded
    this.load.on('complete', () => {
      this.ready();
    });

    // wait two seconds before continue the next scene when all have been loaded
    this.timedEvent = this.time.delayedCall(2000, this.ready, [], this);

    /* ***************************** Load assets for all the game ***************************** */
    // gameScene
    this.load.spritesheet('sprExplosion', sprExplosion, {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('cannonbobmouth', cannonbobmouth, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('spikedball', spikedball);
    this.load.image('fireball', fireball);
    this.load.image('egg', egg);
    this.load.spritesheet('dodo', dodo, {
      frameWidth: 48,
      frameHeight: 64,
    });
    this.load.audio('sndExplode0', sndExplode0);
    this.load.audio('sndExplode1', sndExplode1);
    this.load.audio('eggSound', eggSound);

    // rest
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('box', box);
    this.load.image('checkedBox', checkBox);
    this.load.image('backgroundGame', backgroundGame);
    this.load.audio('bgMusic', [bgMusic]);

    /* ********************** Check for user if exist in local storage ********************** */
    // get player name and syncronize scores with api if there is something in the localStorage
    //    if not we will redirect to authentication scene
    if (this.sys.game.globals.model.localScore()) {
      const { globals } = this.sys.game;
      globals.model.score = globals.model.localScore();
      globals.playerName = globals.model.score.user;

      globals.model.apiScore(globals.playerName)
        .then(score => {
          if (score && (score > globals.model.score.score)) {
            globals.model.score = { score, user: globals.playerName };
          } else if (score && (globals.model.score.score > score)) {
            globals.model.save();
          } else {
            // this means it was a problem retrieving the data from api
            globals.model.save();
          }
        });
    }
  }
}