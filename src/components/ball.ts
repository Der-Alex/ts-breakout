import { Drawable } from '@/abstracts/drawable';
import { PositionInterface } from '@/interfaces/position.interface';

export enum BallState {
  moving,
  onPad
}

export default class Ball extends Drawable {
  width: number;
  height: number;
  position: PositionInterface;
  speed: number;
  maxSpeed: number = 15;
  mouseX: number = 0;
  isMouse: boolean = false;
  ballImage!: HTMLImageElement;
  ballState: BallState = BallState.onPad
  
  
  constructor(private gameWidth: number, private gameHeight: number) {
    super();
    this.width = 16;
    this.height = 16;
    this.speed = 0;
    this.ballImage = <HTMLImageElement>document.getElementById('ball');
    this.position = {
      x: (this.gameWidth / 2) - (this.width / 2),
      y: this.gameHeight - this.height - 42
    };
  }
  
  getBall(): HTMLImageElement {
    return this.ballImage;
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.ballImage, this.position.x, this.position.y, this.width, this.height);
  }
  update(deltaTime: number) {
    super.update(deltaTime);
    if (this.ballState === BallState.onPad) {
      if (this.isMouse) {
        this.position.x = this.mouseX - (this.width / 2);
      } else {
        this.position.x += this.speed;
      }
      if (this.position.x < 50 - (this.width / 2)) {
        this.position.x = 50 - (this.width / 2);
      }
      if (this.position.x > this.gameWidth - 50 - (this.width / 2)) {
        this.position.x = this.gameWidth - 50 - (this.width / 2);
      }
    }
  }
  moveLeft() {
    this.isMouse = false;
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.isMouse = false;
    this.speed = this.maxSpeed;
  }
  moveX(positionX: number) {
    if (!this.isMouse) {
      this.isMouse = true;
    }
    this.mouseX = positionX;
  }
  
  stop() {
    this.speed = 0;
  }
};
