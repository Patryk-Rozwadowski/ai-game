const canvas = document.getElementById('gameContainer');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
export const Settings = {
  gameContainer: document.getElementById('gameContainer'),
  canvasWidth: canvas.width,
  canvasHeight: canvas.height,
  ctx: canvas.getContext('2d'),
};
