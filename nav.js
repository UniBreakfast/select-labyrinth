export {dict, reverse, shift};

const dict = {
  n: 'north', s: 'south', 
  w: 'west',  e: 'east',
  u: 'up',    d: 'down', 
  i: 'in',    o: 'out',
};

const reverse = {
  n: 's', s: 'n', 
  w: 'e', e: 'w',
  u: 'd', d: 'u', 
  i: 'o', o: 'i',
};

const shift = {
  n: [0, -1, 0], s: [0, 1, 0],
  w: [0, 0, -1], e: [0, 0, 1],
  u: [-1, 0, 0], d: [1, 0, 0],
};
