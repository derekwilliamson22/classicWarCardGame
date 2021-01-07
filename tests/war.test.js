const {
    dealTheCards,
    getRandomInt,
    shuffleDeck,
    gameOfWar
} = require('./warTests.js');

const array = [1,2,3,4];

test('test is a test', () => {
    let result = 1
    expect(result).toBe(1);
  });

test('shuffleDeck returns an array', () => {
    let result = shuffleDeck(array)
    expect(result).toBe([]);
});