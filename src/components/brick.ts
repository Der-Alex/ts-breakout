import Game from '@/components/game';
import {PositionInterface} from '@/interfaces/position.interface';
import {Drawable} from '@/abstracts/drawable';
import {collisionDetection} from '@/components/collisionDetection';

export default class Brick extends Drawable {
  brickImage: HTMLImageElement;
  width: number = 64;
  height: number = 32;
  markForDeletion: boolean = false;
  
  constructor(private game: Game, public position: PositionInterface) {
    super();
    this.brickImage = <HTMLImageElement>document.getElementById('brick');
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.brickImage, this.position.x, this.position.y, this.width, this.height);
  }
  update(deltaTime:number) {
    super.update(deltaTime);
  
    if (collisionDetection(this.game.ball, this)) {
      this.markForDeletion = true;
      this.game.ball.ballSpeed.y *= -1;
    }
  }
}