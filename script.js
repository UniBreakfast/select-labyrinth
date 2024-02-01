const labyrinth = [
  [
    ['is', 'so',],
    ['nd', 'dn',],
  ],
  [
    ['se', 'ws',],
    ['un', 'nu',],
  ],
];

const dict = {
  n: 'north', s: 'south', e: 'east', w: 'west',
  u: 'up', d: 'down', i: 'in', o: 'out',
};

const shift = {
  n: [0, -1, 0],  s: [0, 1, 0],
  e: [0, 0, 1],  w: [0, 0, -1],
  u: [-1, 0, 0],  d: [1, 0, 0],
};

const IN = '000';
const OUT = '001';

const selects = [];
const selectDict = {};

const sp = String.prototype; sp.if = sp.repeat;

showSelect(IN);

body.onchange = handleSelect;

function showSelect(coords) {
  if (selectDict[coords]) {
    return body.append(selectDict[coords].cloneNode(true));
  }

  const select = document.createElement('select');
  const [level, row, room] = coords.split('').map(Number);
  const steps = [
    { value: '!', text: 'STEP!' },
    ...labyrinth[level][row][room].split('').map(
      dir => ({ value: dir, text: dict[dir] })
    )
  ];
  select.innerHTML = steps.map(
    ({ value, text }) => `<option value="${value}"
      ${'disabled'.if(value == 'i')} ${'hidden'.if(value == '!')}
    >${text}</option>`
  ).join('');

  select.dataset.coords = coords;
  selectDict[coords] = select;

  body.append(select);
}

function handleSelect({ target }) {
  while (target.nextSibling) target.nextSibling.remove();

  const { coords } = target.dataset;

  if (target.value == 'o') return endGame();

  const [level, row, room] = coords.split('').map(Number);
  const nextCoords = [level, row, room].map(
    (num, i) => num + shift[target.value][i]
  ).join('');

  showSelect(nextCoords);
}

function endGame() {
  const steps = body.querySelectorAll('select').length;

  alert(`You escaped in ${steps} steps!`);
}
