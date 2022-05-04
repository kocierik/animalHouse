export const getItem = (key, defaultValue, parse = false) => {
  const value = localStorage.getItem(key);
  if (parse) {
    let parsed = null;
    try {
      parsed = JSON.parse(value);
    } catch (e) {
      parsed = null;
    }

    return parsed || defaultValue;
  }

  return value || defaultValue;
};

export const setItem = (key, value, stringify = false) => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : value);
};

export const keysMap = {
  38: 0, // Up
  39: 1, // Right
  40: 2, // Down
  37: 3, // Left
  75: 0, // Vim up
  76: 1, // Vim right
  74: 2, // Vim down
  72: 3, // Vim left
  87: 0, // W
  68: 1, // D
  83: 2, // S
  65: 3, // A
};

export const vectorsMap = [
  { x: 0, y: -1 }, // Up,
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Down
  { x: -1, y: 0 }, // Left
];
