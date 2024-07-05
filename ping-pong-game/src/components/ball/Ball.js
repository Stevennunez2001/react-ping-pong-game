import React from 'react';
import './Ball.css';

const Ball = React.forwardRef(({ ball, gameRunning }, ref) => (
  <div
    className={`ball ${gameRunning ? '' : 'paused'}`}
    ref={ref}
    style={{ top: `${ball.y}px`, left: `${ball.x}px` }}
  />
));

export default Ball;