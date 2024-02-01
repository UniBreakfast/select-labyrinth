import planLabyrinth from './labyrinth.js';
import {dict, shift} from './nav.js';

const size = {y: 4, z: 4, x: 4};

const {start, labyrinth, finish} = planLabyrinth(size.y, size.z, size.x);

const selects = [];
const selectDict = {};

const sp = String.prototype; sp.if = sp.repeat;

let steps = 0;

showSelect(start);

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
  const color = `rgb(${
    255 / size.y * level
  }, ${
    255 / size.z * row
  }, ${
    255 / size.x * room
  })`;
  select.style.boxShadow = `0 0 2px 3px ${color}`;
  selectDict[coords] = select;

  body.append(select);
}

function handleSelect({ target }) {
  while (target.nextSibling) {
    target.nextSibling.remove();
    steps++;
  }

  const { coords } = target.dataset;

  if (target.value == 'o') return endGame();

  const [level, row, room] = coords.split('').map(Number);
  const nextCoords = [level, row, room].map(
    (num, i) => num + shift[target.value][i]
  ).join('');

  steps++;
  showSelect(nextCoords);
}

function endGame() {
  alert(`You escaped in ${steps} steps!`);
}
