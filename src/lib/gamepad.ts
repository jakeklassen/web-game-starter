import { Gamepad, Keyboard, or } from 'contro';

const gamepad = new Gamepad();
const keyboard = new Keyboard();

export const controls = {
  left: or(gamepad.button('Left'), keyboard.key('Left')),
  right: or(gamepad.button('Right'), keyboard.key('Right')),
};
