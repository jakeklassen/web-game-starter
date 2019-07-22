import bitmapFontUrl from '../assets/fonts/visitor/visitor1.ttf';
import { controls } from './lib/gamepad';
import MainLoop from 'mainloop.js';
import { getResolution } from './lib/screen';

const canvas = document.querySelector('#gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

if (ctx == null) {
  throw new Error('Failed to obtain 2d rendering context');
}

const assets: { [key: string]: any; asset<T>(name: string): () => T } = {
  asset<T>(name: string) {
    return assets[name] as T;
  },
};

// 16x9
const GAME_WIDTH = 256;
const GAME_HEIGHT = 144;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
ctx.imageSmoothingEnabled = false;
canvas.style.width = `${GAME_WIDTH}px`;
canvas.style.height = `${GAME_HEIGHT}px`;

const resize = () => {
  // Scale canvas to fit window while maintaining 16x9
  const { innerWidth, innerHeight } = window;
  const { width, height, factor } = getResolution(
    innerWidth,
    innerHeight,
    GAME_WIDTH,
    GAME_HEIGHT,
  );

  canvas.style.transform = `scale(${factor})`;
  canvas.style.left = `${innerWidth / 2 - canvas.width / 2}px`;
  canvas.style.top = `${innerHeight / 2 - canvas.height / 2}px`;
};

resize();

window.addEventListener('resize', resize);

function update(delta: number) {
  const dt = delta / 1000;
}

const camera = {
  a: 1,
  b: 0,
  c: 0,
  d: 1,
  e: 0,
  f: 0,
};

function draw(interpolation: number) {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.globalAlpha = 1;

  ctx.transform(camera.a, camera.b, camera.c, camera.d, camera.e, camera.f);

  ctx.resetTransform();
  ctx.fillStyle = 'white';
  ctx.font = '10px BitmapFont';

  ctx.fillText(
    `FPS: ${String(MainLoop.getFPS().toFixed(2))}`,
    GAME_WIDTH - 56,
    10,
  );
  ctx.fillText(
    `Interp: ${String(interpolation.toFixed(2))}`,
    GAME_WIDTH - 67,
    20,
  );
}

async function onload() {
  // @ts-ignore
  const font = new FontFace('BitmapFont', `url(${bitmapFontUrl})`);
  const bitmapFont = await font.load();
  // @ts-ignore
  document.fonts.add(bitmapFont);

  MainLoop.setUpdate(update)
    .setDraw(draw)
    .start();
}

window.onload = () => onload().catch(console.error);
