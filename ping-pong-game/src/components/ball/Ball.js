import React from 'react';
import './Ball.css';

var colors = ['#000000', '#B22222', '#008000', '#0000CD', '#DC143C', '#FF7F50'];
var random_color = colors[Math.floor(Math.random() * colors.length)];

const Ball = React.forwardRef(({ ball, gameRunning }, ref) => (
  <div
    className={`ball ${gameRunning ? '' : 'paused'}`}
    ref={ref}
    style={{ top: `${ball.y}px`, left: `${ball.x}px`, backgroundColor: `${random_color}`}}
  />
));

export default Ball;