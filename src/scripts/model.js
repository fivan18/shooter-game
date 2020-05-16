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

  // instance score, paired with local storage
  set score(s) {
    this._score = s;
    this.local.value = s;
  }

  get score() {
    return this._score;
  }

  localScore() {
    return this.local.value;
  }

  // only api storage
  async apiScore(playerName){
    const scores = await this.api.retrieve();
    let maxScore = 1;
    const playerScores = scores.filter(score => score.user === playerName)
          .map(score => score.score);
    return Math.max(...playerScores, maxScore);
  }

  save() {
    const user = this._score.user;
    const instanceScore = this._score.score;
    this.api.retrieve()
      .then(scores => {
        const exist = scores.some(score => score.user === user && score.score === instanceScore);
        if(!exist) {
          this.api.save(this._score);
        }
      });
  }
}