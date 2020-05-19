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
    if (!Array.isArray(scores)) {
      throw new TypeError('scores is not an Array', 'model.js', 48);
    }

    const names = scores.map(score => score.user);
    return names.filter((a, b) => names.indexOf(a) === b);
  }

  static maxScore(playerName, scores) {
    if (!Array.isArray(scores)) {
      throw new TypeError('scores is not an Array', 'model.js', 57);
    }
    if (typeof playerName !== 'string') {
      throw new TypeError('playerName is not an String', 'model.js', 57);
    }

    const playerScores = scores.filter(score => score.user === playerName);
    return playerScores.length > 0
      ? playerScores.reduce((maxScore, score) => (score.score > maxScore.score ? score : maxScore))
      : undefined;
  }

  static exists(targetScore, scores) {
    if (!Array.isArray(scores)) {
      throw new TypeError('scores is not an Array', 'model.js', 71);
    }
    if (typeof targetScore !== 'object'
        || targetScore === null
        || !Object.prototype.hasOwnProperty.call(targetScore, 'user')
        || !Object.prototype.hasOwnProperty.call(targetScore, 'score')
    ) {
      throw new TypeError('targetScore is not the Object expected', 'model.js', 71);
    }

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