export const randomNum = (max: number, min: number = 0) =>
  min + Math.round(Math.random() * (max - min));

export const randomID = ()=> Math.random().toString(36).slice(2);