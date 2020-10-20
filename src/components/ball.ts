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
   * Ball speed x: right = + left = -, y: up = - down = +
   * Possible speeds should be
   * 0: -16,
   * 2: -14,
   * 4: -12,
   * 8:  -8,
   * 12: -6,
   * 16:  -4
   */
  ballSpeed: { x: number ,y: number } = {
    x: 0, y: -6
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
      this.checkPadCollision();
    }
  }
  shoot() {
    this.ballSpeed = { x: 4 , y: -12 };
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
    if (this.position.y <= 0) {
      this.ballSpeed.y *= -1;
    }
    if (this.position.y >= this.game.gameHeight - this.height) {
      this.land();
    }
  }
  checkPadCollision() {
    const pad = this.game.pad;
    const padTop: number = pad.position.y;
    const padLeft: number = pad.position.x;
    const padRight: number = padLeft + pad.width;
    const ballBottom: number = this.position.y + this.height;
    const ballLeft: number = this.position.x;
    const ballCenter: number = ballLeft + (this.width / 2);
    const ballRight: number = ballLeft + this.width;
    const areaWidth = Math.floor(pad.width / 13);
    /**
     * 1-13, default is middle (3)
     */
    let hitArea = 7;
  
    if (ballBottom > padTop) {
      if (ballLeft < padRight && ballRight > padLeft) {
        for (let i = 1; i < 13; i++) {
          if (ballCenter <= padLeft + (areaWidth * i)) {
            hitArea = i;
            break;
          }
        }
        
        switch (hitArea) {
          case 1:
            this.ballSpeed.x = -16;
            this.ballSpeed.y = -4;
            break;
          case 2:
            this.ballSpeed.x = -14;
            this.ballSpeed.y = -6;
            break;
          case 3:
            this.ballSpeed.x = -12;
            this.ballSpeed.y = -8;
            break;
          case 4:
            this.ballSpeed.x = -8;
            this.ballSpeed.y = -12;
  
            break;
          case 5:
            this.ballSpeed.x = -6;
            this.ballSpeed.y = -14;
  
            break;
          case 6:
            this.ballSpeed.x = -4;
            this.ballSpeed.y = -16;
  
            break;
          case 7:
            this.ballSpeed.x = 0;
            this.ballSpeed.y = -16;
            break;
          case 8:
            this.ballSpeed.x = 4;
            this.ballSpeed.y = -16;
            break;
          case 9:
            this.ballSpeed.x = 6;
            this.ballSpeed.y = -14;
            break;
          case 10:
            this.ballSpeed.x = 8;
            this.ballSpeed.y = -12;
            break;
          case 11:
            this.ballSpeed.x = 12;
            this.ballSpeed.y = -8;
            break;
          case 12:
            this.ballSpeed.x = 14;
            this.ballSpeed.y = -6;
            break;
          case 13:
            this.ballSpeed.x = 16;
            this.ballSpeed.y = -4;
            break;
        }
      }
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
