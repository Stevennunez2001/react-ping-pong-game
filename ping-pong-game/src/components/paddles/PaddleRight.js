import React from 'react';
import './Paddles.css';

var colors = ['#7FFFD4', '#FF1493', '#4B0082', '#8A2BE2', '#DC143C', '#FF7F50'];
var random_color = colors[Math.floor(Math.random() * colors.length)];

const PaddleRight = ({ paddles, gameRunning }) => (
  <div
    className={`paddle paddle-right ${gameRunning ? '' : 'paused'}`}
    id="paddle-right"
    style={{ top: `${paddles.right}px`, left: '878px', backgroundColor: `${random_color}` }}
  />
);

export default PaddleRight;