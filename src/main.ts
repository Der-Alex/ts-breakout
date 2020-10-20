import Game from '@/components/game';

class App {
  constructor (
    private app: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('app'),
    private context: CanvasRenderingContext2D = <CanvasRenderingContext2D>app.getContext('2d'),
    private gameWidth: number = 1280,
    private gameHeight: number = 720,
    private lastTime: number = 0,
    private game: Game = new Game(gameWidth, gameHeight)
  ) {}
  

  gameLoop = (timeStamp: number) => {
    let deltaTime: number = timeStamp - this.lastTime;
    
    this.lastTime = timeStamp;
    this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
    this.game.update(deltaTime);
    this.game.draw(this.context);

    requestAnimationFrame(this.gameLoop);
  }

  start() {
    this.gameLoop(0);
  }
}
new App().start();