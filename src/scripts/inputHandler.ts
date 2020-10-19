import Pad from '@/scripts/pad';
export default class InputHandler {
  constructor (pad: Pad) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        pad.moveLeft();
      }
      if (event.key === 'ArrowRight') {
        pad.moveRight();
      }
    });
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && pad.speed < 0) {
        pad.stop();
      }
      if (event.key === 'ArrowRight' && pad.speed > 0) {
        pad.stop();
      }
    });
  }
}