/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */

import 'phaser';
import config from './config/config';
import GameScene from './scenes/gameScene';
import GameOverScene from './scenes/gameOverScene';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import AuthenticationScene from './scenes/authenticationScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import LeaderBoardScene from './scenes/leaderBoardScene';
import Model from './model';

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
    this.scene.add('LeaderBoard', LeaderBoardScene);
    this.scene.add('Game', GameScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}

const run = () => {
  window.game = new Game();
};

export { run };
