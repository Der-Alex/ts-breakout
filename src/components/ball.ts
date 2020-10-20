import { Drawable } from '@/abstracts/drawable';
import { PositionInterface } from '@/interfaces/position.interface';
import Game from '@/components/game';

export enum BallState {
  moving,
  onPad
}

export default class Ball extends Drawable {
  width: number;
  height: number;
  position: PositionInterface;
  padSpeed: number;
  maxPadSpeed: number = 15;
  /**
   * Possible speeds should be
   * 0: -16,
   * 2: -14,
   * 4: -12,
   * 8:  -8,
   * 12: -6,
   * 16:  -4
   */
  ballSpeed: { x: number ,y: number } = {
    x: 0, y: 6
  };
  mouseX: number = 0;
  isMouse: boolean = false;
  ballImage!: HTMLImageElement;
  ballState: BallState = BallState.onPad
  
  
  constructor(private game: Game) {
    super();
    this.width = 16;
    this.height = 16;
    this.padSpeed = 0;
    this.ballImage = <HTMLImageElement>document.getElementById('ball');
    this.position = {
      x: (this.game.gameWidth / 2) - (this.width / 2),
      y: this.game.gameHeight - this.height - 42
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
        this.position.x += this.padSpeed;
      }
      if (this.position.x < 50 - (this.width / 2)) {
        this.position.x = 50 - (this.width / 2);
      }
      if (this.position.x > this.game.gameWidth - 50 - (this.width / 2)) {
        this.position.x = this.game.gameWidth - 50 - (this.width / 2);
      }
    } else {
      this.position.x += this.ballSpeed.x;
      this.position.y += this.ballSpeed.y;
      this.checkAppCollision();
    }
  }
  shoot() {
    this.ballSpeed = { x: 16 , y: -4 };
    this.ballState = BallState.moving;
  }
  land() {
    // TODO: Fix position
    this.ballState = BallState.onPad;
    this.position = {
      x: (this.game.gameWidth / 2) - (this.width / 2),
      y: this.game.gameHeight - this.height - 42
    };
  }
  checkAppCollision() {
    if (this.position.x <= 0 || this.position.x >= this.game.gameWidth - this.width) {
      this.ballSpeed.x *= -1 ;
    }
    if (this.position.y <= 0 || this.position.y >= this.game.gameHeight - this.height) {
      this.ballSpeed.y *= -1;
    }
  }
  moveLeft() {
    this.isMouse = false;
    this.padSpeed = -this.maxPadSpeed;
  }
  moveRight() {
    this.isMouse = false;
    this.padSpeed = this.maxPadSpeed;
  }
  moveX(positionX: number) {
    if (!this.isMouse) {
      this.isMouse = true;
    }
    this.mouseX = positionX;
  }
  
  stop() {
    this.padSpeed = 0;
  }
};
