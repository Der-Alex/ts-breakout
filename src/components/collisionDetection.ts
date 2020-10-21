import { Drawable } from '@/abstracts/drawable';
import Ball from '@/components/ball';

export function collisionDetection(ball: Ball, gameObject: Drawable) {
  const ballTop: number = ball.position.y
  const ballBottom: number = ballTop + ball.height;
  const ballLeft: number = ball.position.x;
  const ballRight: number = ballLeft + ball.width;
  const gameObjectTop: number = gameObject.position.y;
  const gameObjectLeft: number = gameObject.position.x;
  const gameObjectRight: number = gameObjectLeft + gameObject.width;
  const gameObjectBottom: number = gameObjectTop + gameObject.height;
  
  return ballBottom >= gameObjectTop &&
    ballTop <= gameObjectBottom &&
    ballLeft >= gameObjectLeft &&
    ballRight <= gameObjectRight;
}
