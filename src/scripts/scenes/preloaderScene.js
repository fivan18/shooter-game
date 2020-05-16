import 'phaser';
import blueButton1 from "../../assets/images/ui/blue_button02.png";
import blueButton2 from "../../assets/images/ui/blue_button03.png";
import phaserLogo from "../../assets/images/logo.png";
import box from '../../assets/images/ui/grey_box.png';
import checkBox from '../../assets/images/ui/blue_boxCheckmark.png';
import townTheme from '../../assets/audio/TownTheme.mp3';
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }
 
  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      if(this.sys.game.globals.playerName) {
        this.scene.start('Title');
      } else {
        this.scene.start('Authentication');
      }
    }
  }

  preload () {
    // add logo image
    this.add.image(400, 200, 'logo');
  
    // display progress bar
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);
  
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
  
    let percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
  
    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
  
    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
  
    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
  
    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));

    // delay to show the logo
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
  
    // load assets needed in our game
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('phaserLogo', phaserLogo);
    this.load.image('phaserLogo', 'assets/logo.png');
    this.load.image('box', box);
    this.load.image('checkedBox', checkBox);
    this.load.audio('bgMusic', [townTheme]);

    // get player name and syncronize scores if there is something in the localStorage
    if(this.sys.game.globals.model.localScore()) {
      const globals = this.sys.game.globals;
      globals.model.score = globals.model.localScore();
      globals.playerName = globals.model.score.name;

      globals.model.apiScore(globals.playerName).
        then(score => {
          if (score > globals.model.score.score) {
            globals.model.score = { score, name: globals.playerName };
          } else if (globals.model.score.score > score) {
            globals.model.save();
          }
        });
    }
  }
 
  create () {
  }
};