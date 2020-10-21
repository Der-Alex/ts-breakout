import Pad from '@/components/pad';
import InputHandler from '@/components/inputHandler';
import Ball from '@/components/ball';
import Brick from '@/components/brick';
import { level1, level2, buildLevel } from '@/components/levels';
import { collisionDetection } from '@/components/collisionDetection';
import {Drawable} from '@/abstracts/drawable';

export default class Game {
  pad: Pad;
  ball: Ball;
  bricks!: Brick[];
  gameObjects!: Drawable[];
  constructor(public gameWidth: number, public gameHeight: number) {
    this.pad = new Pad(this);
    this.ball = new Ball(this);
    this.bricks = buildLevel(this, level2);
    this.gameObjects = [
      this.pad,
      this.ball,
      ...this.bricks
    ];

    new InputHandler(this.pad, this.ball);
  }
  
  draw(context: CanvasRenderingContext2D) {
    this.gameObjects.forEach( gameObject => {
      gameObject.draw(context)
    });
  }
  update(deltaTime: number) {
    this.gameObjects.forEach( gameObject => {
      gameObject.update(deltaTime)
    });
    this.gameObjects = this.gameObjects.filter(gameObject => !(gameObject as Brick).markForDeletion);
  }
}