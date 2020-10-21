import Pad from '@/components/pad';
import InputHandler from '@/components/inputHandler';
import Ball from '@/components/ball';
import Brick from '@/components/brick';
import { level1, buildLevel } from '@/components/levels';

export default class Game {
  pad: Pad;
  ball: Ball;
  bricks!: Brick[];
  constructor(public gameWidth: number, public gameHeight: number) {
    this.pad = new Pad(this);
    this.ball = new Ball(this);

    new InputHandler(this.pad, this.ball);
  }
  
  draw(context: CanvasRenderingContext2D) {
    this.pad.draw(context);
    this.ball.draw(context);
    this.bricks = buildLevel(this, level1);
    this.bricks.forEach(brick => {
      brick.draw(context);
    });
  }
  update(deltaTime: number) {
    this.pad.update(deltaTime);
    this.ball.update(deltaTime);
  }
}