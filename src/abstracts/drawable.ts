import { PositionInterface } from '@/interfaces/position.interface';

export abstract class Drawable {
  abstract width: number;
  abstract height: number;
  abstract position: PositionInterface
  
  draw(context: CanvasRenderingContext2D) {}
  update(deltaTime: number) {}
}