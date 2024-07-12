import React from 'react';
import './Paddles.css';

var colors = ['#7FFFD4', '#FF1493', '#4B0082', '#8A2BE2', '#DC143C', '#FF7F50'];
var random_color = colors[Math.floor(Math.random() * colors.length)];
const PaddleLeft = ({ paddles, gameRunning }) => (
  <div
    className={`paddle paddle-left ${gameRunning ? '' : 'paused'}`}
    id="paddle-left"
    style={{ top: `${paddles.left}px`, backgroundColor: `${random_color}`}}
  />
);

export default PaddleLeft;