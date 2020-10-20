import Pad from '@/components/pad';
import InputHandler from '@/components/inputHandler';
import Ball from '@/components/ball';
import Brick from '@/components/brick';

export default class Game {
  pad: Pad;
  ball: Ball;
  brick: Brick;
  constructor(public gameWidth: number, public gameHeight: number) {
    this.pad = new Pad(this);
    this.ball = new Ball(this);
    this.brick = new Brick();
    new InputHandler(this.pad, this.ball);
  }
  
  draw(context: CanvasRenderingContext2D) {
    this.pad.draw(context);
    this.ball.draw(context);
    this.brick.draw(context);
  }
  update(deltaTime: number) {
    this.pad.update(deltaTime);
    this.ball.update(deltaTime);
  }
}