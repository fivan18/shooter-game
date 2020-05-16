import 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
 
export default class AuthenticationScene extends Phaser.Scene {
  constructor () {
    super('Authentication');
  }
 
  preload () {
  }

  validateName(name){
    return (/^[a-z]+$/g).test(name);
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
    .on('textchange', inputText => {
      if(this.validateName(inputText.text)) {
        printText.text = 'Valid name';
      } else {
        printText.text = 'Your name is invalid: upercase characters [a-z] and more than one please';
      }
    });

    this.input.keyboard.addKey('ENTER').on('down', event => {
      if(this.validateName(inputText.text.trim())) {
        const globals = this.sys.game.globals;
        globals.playerName = inputText.text.trim();
        globals.model.score = { score: 1, user: globals.playerName };
        globals.model.save();

        this.scene.start('Title');
      }
    });
  }

  update() {
  }
};