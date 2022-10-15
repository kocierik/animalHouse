export const getItem = (key: string, defaultValue: any, parse = false) => {
  const value = localStorage.getItem(key)
  if (parse) {
    let parsed = null
    try {
      parsed = JSON.parse(value!)
    } catch (e) {
      parsed = null
    }

    return parsed || defaultValue
  }

  return value || defaultValue
}

export const setItem = (key: string, value: string, stringify = false) => {
  localStorage.setItem(key, stringify ? JSON.stringify(value) : value)
}

export const keysMap = (n: number): number => {
  if (n === 38) return 0 // Up
  if (n === 39) return 1 // Right
  if (n === 40) return 2 // Down
  if (n === 37) return 3 // Left
  if (n === 75) return 0 // Vim up
  if (n === 76) return 1 // Vim right
  if (n === 74) return 2 // Vim down
  if (n === 72) return 3 // Vim left
  if (n === 87) return 0 // W
  if (n === 68) return 1 // D
  if (n === 83) return 2 // S
  if (n === 65) return 3 // A
  else return -1
}

export const vectorsMap = [
  { x: 0, y: -1 }, // Up,
  { x: 1, y: 0 }, // Right
  { x: 0, y: 1 }, // Down
  { x: -1, y: 0 }, // Left
]
