import Model from '../src/scripts/model';
import data from './data';

let scores;
beforeEach(() => {
  scores = data;
});

describe('Model.playersNames', () => {
  test('get all players names', () => {
    expect(Model.playersNames(scores)).toEqual([
      'test',
      'another',
      'ivan',
      'ivancito',
      'other',
      'Ivancito']);
  });

  test('enter an empty array', () => {
    expect(Model.playersNames([])).toEqual([]);
  });
});

describe('Model.maxScore', () => {
  test('get the max score for a given player', () => {
    expect(Model.maxScore('ivan', scores)).toEqual({ user: 'ivan', score: 92 });
  });

  test("enter a player that doesn't exist", () => {
    expect(Model.maxScore('noexists', scores)).toBeUndefined();
  });
});

describe('Model.exists', () => {
  test('check if a score exists with an existing one', () => {
    expect(Model.exists({ user: 'ivan', score: 92 }, scores)).toBe(true);
  });

  test('check a none existing score', () => {
    expect(Model.exists({ user: 'noexists', score: 120 }, scores)).toBe(false);
  });
});