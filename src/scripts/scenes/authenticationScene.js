import 'phaser';
import InputText from 'phaser3-rex-plugins/plugins/inputtext.js';
 
export default class AuthenticationScene extends Phaser.Scene {
  constructor () {
    super('Authentication');
  }
 
  preload() {
    // add background to this scene
    this.add.image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(1);
  }

  validateName(name){
    return (/^[a-z]+$/g).test(name);
  }
 
  create () {
    let printText = this.add.text(400, 200, "Enter your username...", {
      fontSize: 30,
      fixedWidth: 800,
      fixedHeight: 100,
      fontStyle: 'bold',
      color: '#808080',
      align: 'center'
    }).setOrigin(0.5);

    let inputText = this.add
      .rexInputText(400, 250, 10, 10, {
        type: 'text',
        placeholder: 'username',
        fontSize: '24px',
        color: '#A9A9A9',
        align: 'center'
      })
      .resize(400, 100)
      .setOrigin(0.5)
      .on('textchange', inputText => {
        if(this.validateName(inputText.text)) {
          printText.text = 'Valid name';
        } else {
          printText.text = 'Your username is invalid';
        }
      });

    // set event
    this.input.keyboard.addKey('ENTER').on('down', () => {
      if(this.validateName(inputText.text.trim())) {
        const globals = this.sys.game.globals;
        globals.playerName = inputText.text.trim();
        globals.model.score = { score: 1, user: globals.playerName };
        globals.model.save();

        // syncronize scores 
        globals.model.apiScore(globals.playerName).
        then(score => {
          if (score > globals.model.score.score) {
            globals.model.score = { score, user: globals.playerName };
          } else if (globals.model.score.score > score) {
            globals.model.save();
          }
        });

        this.scene.start('Title');
      }
    });
  }
};