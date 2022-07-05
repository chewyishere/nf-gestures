function map_range(value, low1, high1, low2, high2) {
  let _v = low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
  return _v > high2 ? high2 : _v < low2 ? low2 : _v;
}

function getRandomNum(max = 0, min = 0) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

export { map_range, getRandomNum };
