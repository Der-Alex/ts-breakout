import { Drawable } from '@/abstracts/drawable';
import { PositionInterface } from '@/interfaces/position.interface';

export default class Ball extends Drawable {
  width: number = 0;
  height: number = 0;
  position: PositionInterface = {
    x: 0,
    y: 0
  };
  speed: number = 0;
  maxSpeed: number = 30;
  speedCounter: number = 0;
  ballImage!: HTMLImageElement;
  
  constructor() {
    super();
    this.ballImage = <HTMLImageElement>document.getElementById('ball');
  }
  
  getBall(): HTMLImageElement {
    return this.ballImage;
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.ballImage, 10, 10, 16, 16);
  }
  update(deltaTime: number) {
    super.update(deltaTime);
  }
};
