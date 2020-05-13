import 'phaser';
import './assets/css/style.css';
import config from './scripts/config/config';
import GameScene from './scripts/scenes/gameScene';
import BootScene from './scripts/scenes/bootScene';
import PreloaderScene from './scripts/scenes/preloaderScene';
import TitleScene from './scripts/scenes/titleScene';
import OptionsScene from './scripts/scenes/optionsScene';
import CreditsScene from './scripts/scenes/creditsScene';

class Game extends Phaser.Game {
  constructor () {
    super(config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.start('Boot');
  }
}
 
window.game = new Game();


