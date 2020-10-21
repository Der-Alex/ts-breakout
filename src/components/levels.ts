import Brick from '@/components/brick';
import Game from '@/components/game';

export const level1: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1 ,1 ,1 ,1, 1, 1, 1, 1, 1],
];
  /**
   * max brick length is 20
   */

  
  export function buildLevel(game: Game, level: number[][]): Brick[] {
    let bricks: Brick[] = [];
    level.forEach((row, rowIndex) => {
      row.forEach((brick, brickIndex) => {
        if (brick === 1) {
          bricks.push(new Brick(game, { x: 64 * brickIndex, y: 32 * rowIndex + 32}));
        }
      });
    });
    return bricks;
  }