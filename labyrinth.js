import { dict, reverse, shift } from './nav.js';

export default

  function planLabyrinth(ySize, zSize, xSize) {
  if (ySize > 10 || zSize > 10 || xSize > 10) {
    throw new Error('Labyrinth size is too big! Max is 10x10x10.');
  }

  const size = [ySize, zSize, xSize];
  const start = chooseSurfacePoint(size);
  let finish;

  while (!finish || finish == start) {
    finish = chooseSurfacePoint(size);
  }

  const labyrinth = prepMatrix(...size);

  labyrinth[start[0]][start[1]][start[2]] = 'i';
  labyrinth[finish[0]][finish[1]][finish[2]] = 'o';

  const rooms = [start];
  const allRooms = new Set([start]);

  while (true) {
    const lastRoom = rooms.at(-1);
    const options = ['n', 's', 'e', 'w', 'u', 'd']
      .map(dir => ({ dir, room: getRoom(dir, lastRoom) }))
      .filter(({ room }) => room && !allRooms.has(room));

    if (!options.length) {
      rooms.pop();

      const i = rnd(rooms.length);

      rooms.push(...rooms.splice(i, 1));

      continue;
    }

    const { dir, room: nextRoom } = rnd(options);

    addPath(lastRoom, dir);
    addPath(nextRoom, reverse[dir]);

    rooms.push(nextRoom);
    allRooms.add(nextRoom);

    if (nextRoom == finish) return { start, labyrinth, finish };
  }

  function addPath([y, z, x], dir) {
    labyrinth[y][z][x] += dir;
  }

  function getRoom(dir, [y, z, x]) {
    const [dy, dz, dx] = shift[dir];
    const coords = [+y + dy, +z + dz, +x + dx];

    if (coords.some((num, i) => num < 0 || num >= size[i])) return null;

    return coords.join('');
  }
}

function chooseSurfacePoint(size) {
  const start = [null, null, null];
  const dim = rnd(3);

  start[dim] = rnd([0, size[dim] - 1]);

  for (let i = 0; i < 3; i++) {
    if (i == dim) continue;

    start[i] = rnd(size[i]);
  }

  return start.join('');
}

function prepMatrix(ySize, zSize, xSize) {
  const matrix = [];

  for (let y = 0; y < ySize; y++) {
    const level = matrix[y] = [];

    for (let z = 0; z < zSize; z++) {
      level[z] = Array(xSize).fill('');
    }
  }

  return matrix;
}

function rnd(arg) {
  if (Array.isArray(arg)) {
    const arr = arg.slice();
    return arr[rnd(arr.length)];
  }
  const num = Number(arg);
  return Math.floor(Math.random() * num);
}
