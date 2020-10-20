import Pad from '@/components/pad';
import Ball, {BallState} from '@/components/ball';

export default class InputHandler {
  constructor (pad: Pad, ball: Ball) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        pad.moveLeft();
        if (ball.ballState === BallState.onPad) {
          ball.moveLeft();
        }
      }
      if (event.key === 'ArrowRight') {
        pad.moveRight();
        if (ball.ballState === BallState.onPad) {
          ball.moveRight();
        }
      }
    });
    document.addEventListener('keyup', (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && pad.speed < 0) {
        pad.stop();
        if (ball.ballState === BallState.onPad) {
          ball.stop();
        }
      }
      if (event.key === 'ArrowRight' && pad.speed > 0) {
        pad.stop();
        if (ball.ballState === BallState.onPad) {
          ball.stop();
        }
      }
    });
    document.body.addEventListener('mousemove', (event: MouseEvent) => {
      pad.moveX(event.offsetX);
      if (ball.ballState === BallState.onPad) {
        ball.moveX(event.offsetX);
      }
    });
  }
}