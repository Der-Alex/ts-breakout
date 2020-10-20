import { PositionInterface } from '@/interfaces/position.interface';
import { Drawable } from '@/abstracts/drawable';

export default class Pad extends Drawable {
  width: number;
  height: number;
  position: PositionInterface;
  speed: number;
  maxSpeed: number = 15;
  mouseX: number = 0;
  isMouse: boolean = false;
  
  constructor(private gameWidth: number, private gameHeight: number) {
    super();
    this.width = 150;
    this.height = 30;
    this.position = {
      x: (this.gameWidth / 2) - (this.width / 2),
      y: this.gameHeight - this.height - 10
    };
    this.speed = 0;
  }
  
  draw(context: CanvasRenderingContext2D) {
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  
  update(deltaTime: number) {
    super.update(deltaTime);
    
    if (this.isMouse) {
      this.position.x = this.mouseX - (this.width / 2);
    } else {
      this.position.x += this.speed;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x > this.gameWidth - this.width) {
      this.position.x = this.gameWidth - this.width;
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
  moveX(amount: number) {
    if (!this.isMouse) {
      this.isMouse = true;
    }
    this.mouseX = amount;
  }
  
  stop() {
    this.speed = 0;
  }
}