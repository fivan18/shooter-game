/* global Phaser */

import 'phaser';
import './assets/css/style.css';
import config from './scripts/config/config';
import GameScene from './scripts/scenes/gameScene';
import GameOverScene from './scripts/scenes/gameOverScene';
import BootScene from './scripts/scenes/bootScene';
import PreloaderScene from './scripts/scenes/preloaderScene';
import AuthenticationScene from './scripts/scenes/authenticationScene';
import TitleScene from './scripts/scenes/titleScene';
import OptionsScene from './scripts/scenes/optionsScene';
import CreditsScene from './scripts/scenes/creditsScene';
import Model from './scripts/model';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = {
      model, bgMusic: null, playerName: null, currentScore: 0,
    };

    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Authentication', AuthenticationScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();
