import 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
 
export default class AuthenticationScene extends Phaser.Scene {
  constructor () {
    super('Authentication');
  }
 
  preload () {
  }
 
  create () {
    var printText = this.add.text(400, 200, '', {
      fontSize: '12px',
      fixedWidth: 100,
      fixedHeight: 100,
    }).setOrigin(0.5);
    printText.text = 'Enter your username...';

    var inputText = this.add.rexInputText(400, 400, 10, 10, {
      type: 'text',
      placeholder: 'username',
      fontSize: '12px',
    })
    .resize(100, 100)
    .setOrigin(0.5)
    .on('textchange', function (inputText) {
      //printText.text = inputText.text;
      console.log('testChange');
    });

    this.input.keyboard.addKey('ENTER').on('down', function (event) {
      printText.text = inputText.text;
    });
  }

  update() {
  }
};