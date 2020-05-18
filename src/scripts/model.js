/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

import LocalStorage from './persistence/localStorage';
import ApiStorage from './persistence/apiStorage';

export default class Model {
  constructor() {
    this.local = new LocalStorage('score');
    this.api = new ApiStorage('38RKgIYmFf81u1FUyPyI');

    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._score = this.local.value;
  }

  // background music
  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
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
  static playersNames(scores) {
    const names = scores.map(score => score.user);
    // console.log(names.filter((a, b) => names.indexOf(a) === b));
    return names.filter((a, b) => names.indexOf(a) === b);
  }

  static maxScore(playerName, scores) {
    const playerScores = scores.filter(score => score.user === playerName);
    // console.log(playerScores);
    return playerScores.length > 0
      ? playerScores.reduce((maxScore, score) => (score.score > maxScore.score ? score : maxScore))
      : undefined;
  }

  static exists(targetScore, scores) {
    return scores.some(score => score.user === targetScore.user
                                && score.score === targetScore.score);
  }

  async apiScore(playerName) {
    const scores = await this.api.retrieve();
    if (scores) {
      const max = Model.maxScore(playerName, scores);
      return max.score || 1;
    }
    return null;
  }

  async apiAllScores() {
    const scores = await this.api.retrieve();
    if (scores) {
      const players = Model.playersNames(scores);
      // console.log(scores);
      const allScores = [];
      players.forEach(player => {
        allScores.push(Model.maxScore(player, scores));
      });
      return allScores;
    }
    return null;
  }

  save() {
    this.api.retrieve()
      .then(scores => {
        if (scores && !Model.exists(this._score, scores)) {
          this.api.save(this._score);
        }
      });
  }
}