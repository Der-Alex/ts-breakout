import Pad from '@/components/pad';
import InputHandler from '@/components/inputHandler';

class Game {
  constructor(
  private app: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('app'),
  private context: CanvasRenderingContext2D = <CanvasRenderingContext2D>app.getContext('2d'),
  private gameWidth: number = 1280,
  private gameHeight: number = 720,
  private lastTime: number = 0,
  private pad: Pad = new Pad(gameWidth, gameHeight)) {}
  
  gameLoop = (timeStamp: number) => {
    let deltaTime: number = timeStamp - this.lastTime;
    
    this.lastTime = timeStamp;
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.pad.update(deltaTime);
    this.pad.draw(this.context);
    requestAnimationFrame(this.gameLoop);
  }
  
  start() {
    this.gameLoop(0);
    new InputHandler(this.pad);
  }
  
}
new Game().start();