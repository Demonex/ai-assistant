import memoize from 'memoize';

export const convertRange = memoize((
  value: number,
  r1: [number, number],
  r2: [number, number]
) => {
  return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}, {cacheKey: JSON.stringify});


export const randomInt=(max: number)=> {
  return Math.floor(Math.random() * (max - 1 + 1) + 1);
}
