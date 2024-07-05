import React from 'react';
import './Paddles.css';

const PaddleLeft = ({ paddles, gameRunning }) => (
  <div
    className={`paddle paddle-left ${gameRunning ? '' : 'paused'}`}
    id="paddle-left"
    style={{ top: `${paddles.left}px` }}
  />
);

export default PaddleLeft;