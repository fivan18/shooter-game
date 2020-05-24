/* global Phaser */
/* eslint import/no-unresolved: [2, { ignore: ['^phaser$'] }] */

import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,

  // config for input plugin
  parent: 'phaser-example',
  dom: {
    createContainer: true,
  },
};