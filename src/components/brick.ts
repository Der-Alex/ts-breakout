import Game from '@/components/game';
import {PositionInterface} from '@/interfaces/position.interface';

export default class Brick {
  brickImage: HTMLImageElement;
  position: PositionInterface;
  constructor() {
    this.brickImage = <HTMLImageElement>document.getElementById('brick');
    this.position = {
      x: 10,
      y: 10
    }
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.brickImage, 100, 100, 64, 32);
  }
  update() {
  }
}