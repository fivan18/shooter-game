import LocalStorage from './persistence/localStorage';
import ApiStorage from './persistence/apiStorage';

export default class Model {
  constructor() {
    this.local = new LocalStorage('score');
    this.api = new ApiStorage('38RKgIYmFf81u1FUyPyI');

    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._score = this.local.value;
  }
 
  set musicOn(value) {
    this._musicOn = value;
  }
 
  get musicOn() {
    return this._musicOn;
  }
 
  set soundOn(value) {
    this._soundOn = value;
  }
 
  get soundOn() {
    return this._soundOn;
  }
 
  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }
 
  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }

  set score(s) {
    this._score = s;
    this.local.value = s;
  }

  get score() {
    return this._score;
  }

  save() {
    this.api.save(this._score);
  }

  async apiScore(playerName){
    const scores = await this.api.retrieve();
    let maxScore = 1;
    const playerScores = scores.filter(score => score.name === playerName)
          .map(score => score.score);
    return Math.max(...playerScores, maxScore);
  }

  localScore() {
    return this.local.value;
  }
}