import { AnimalType } from 'shared'

export const video = new Map<AnimalType, string[]>([
  [AnimalType.Cat, ['QtC3Bo9B0yI', 'fQ_DTui804I', 'hY7m5jjJ9mM']],
  [AnimalType.Dog, ['QSE1gOKJq-E', 'GVuMplvq8bw', 'GXNJ4yLizR8']],
  [AnimalType.Fox, ['CmznhiM9VOg', 'HdkVCGi1dSc', 'PksLFWuXoqI']],
  [AnimalType.Bunny, ['dpvUQagTRHM', '3ThEAZlKBwA', 'pfVh3oL7Gzk']],
  [AnimalType.Duck, ['e90eWYPNtJ8', 'eSil84l-he0', 'HU8BIk0aAwY']],
  [AnimalType.Lizard, ['4MZpmzuVLb4', 'ioblgpA5eTo', 'KMT1FLzEn9I']],
  [AnimalType.Shiba, ['7w8HlfC5Mb8', 'YZlskzJGPzA', 'syuYwpGCW1Q']],
  [AnimalType.Koala, ['oI3ADcDH0Uc', 'PzU-DjUMzsg', 'SHn3cSMYUFE']],
  [AnimalType.Panda, ['D7xWXk5T3-g', 'Z9E1GM5GoP8', ',oipC38mYiNM']]
])

export const allVideos = (): string[] => {
  const result = []
  for (const val of video.values()) result.push(...val)
  return result
}
