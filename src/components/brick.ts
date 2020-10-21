import Game from '@/components/game';
import { PositionInterface } from '@/interfaces/position.interface';

export default class Brick {
  brickImage: HTMLImageElement;
  width: number = 64;
  height: number = 32;
  
  constructor(private game: Game, private position: PositionInterface) {
    this.brickImage = <HTMLImageElement>document.getElementById('brick');
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.brickImage, this.position.x, this.position.y, this.width, this.height);
  }
  update() {
  }
}