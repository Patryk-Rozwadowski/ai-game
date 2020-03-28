
const canvas = document.getElementById('gameContainer');
canvas.width = 800;
canvas.height = 500;
export const Settings = {
  gameContainer: document.getElementById('gameContainer'),
  canvasWidth: canvas.width,
  canvasHeight: canvas.height,
  ctx: canvas.getContext('2d')
};