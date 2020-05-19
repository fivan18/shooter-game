import Model from '../src/app/model';
import data from './data';

let scores;
beforeEach(() => {
  scores = data;
});

describe('Model.playersNames', () => {
  // happy path
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

  // validation test cases, parameters
  test('enter a string', () => {
    expect(() => Model.playersNames('array')).toThrow(TypeError);
  });

  test('enter an object', () => {
    expect(() => Model.playersNames({ obj: 'obj' })).toThrow(TypeError);
  });

  test('enter a number', () => {
    expect(() => Model.playersNames(5)).toThrow(TypeError);
  });

  test('enter null', () => {
    expect(() => Model.playersNames(null)).toThrow(TypeError);
  });
});

describe('Model.maxScore', () => {
  // happy path
  test('get the max score for a given player', () => {
    expect(Model.maxScore('ivan', scores)).toEqual({ user: 'ivan', score: 92 });
  });

  test("enter a player that doesn't exist", () => {
    expect(Model.maxScore('noexists', scores)).toBeUndefined();
  });

  // validation test cases, parameters
  // scores
  test('enter a string for scores', () => {
    expect(() => Model.maxScore('ivan', 'array')).toThrow(TypeError);
  });

  test('enter an object for scores', () => {
    expect(() => Model.maxScore('ivan', { obj: 'obj' })).toThrow(TypeError);
  });

  test('enter a number for scores', () => {
    expect(() => Model.maxScore('ivan', 5)).toThrow(TypeError);
  });

  test('enter null for scores', () => {
    expect(() => Model.maxScore('ivan', null)).toThrow(TypeError);
  });

  // playerName
  test('enter an array for playerName', () => {
    expect(() => Model.maxScore([], scores)).toThrow(TypeError);
  });

  test('enter an object for playerName', () => {
    expect(() => Model.maxScore({ obj: 'obj' }, scores)).toThrow(TypeError);
  });

  test('enter a number for playerName', () => {
    expect(() => Model.maxScore(5, scores)).toThrow(TypeError);
  });

  test('enter null for playerName', () => {
    expect(() => Model.maxScore(null, scores)).toThrow(TypeError);
  });
});

describe('Model.exists', () => {
  // happy path
  test('check if a score exists with an existing one', () => {
    expect(Model.exists({ user: 'ivan', score: 92 }, scores)).toBe(true);
  });

  test('check a none existing score', () => {
    expect(Model.exists({ user: 'noexists', score: 120 }, scores)).toBe(false);
  });

  // validation test cases, parameters
  // scores
  test('enter a string for scores', () => {
    expect(() => Model.exists({ user: 'ivan', score: 92 }, 'array')).toThrow(TypeError);
  });

  test('enter an object for scores', () => {
    expect(() => Model.exists({ user: 'ivan', score: 92 }, { obj: 'obj' })).toThrow(TypeError);
  });

  test('enter a number for scores', () => {
    expect(() => Model.exists({ user: 'ivan', score: 92 }, 5)).toThrow(TypeError);
  });

  test('enter null for scores', () => {
    expect(() => Model.exists({ user: 'ivan', score: 92 }, null)).toThrow(TypeError);
  });

  // targetScore
  test('enter an array for targetScore', () => {
    expect(() => Model.exists([], scores)).toThrow(TypeError);
  });

  test('enter a string for targetScore', () => {
    expect(() => Model.exists('string', scores)).toThrow(TypeError);
  });

  test('enter a number for targetScore', () => {
    expect(() => Model.exists(5, scores)).toThrow(TypeError);
  });

  test('enter null for targetScore', () => {
    expect(() => Model.exists(null, scores)).toThrow(TypeError);
  });

  test('enter no rigth property user for targetScore', () => {
    expect(() => Model.exists({ name: 'ivan', score: 92 }, scores)).toThrow(TypeError);
  });

  test('enter no rigth property score for targetScore', () => {
    expect(() => Model.exists({ user: 'ivan', number: 92 }, scores)).toThrow(TypeError);
  });
});