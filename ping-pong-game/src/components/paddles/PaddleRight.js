import React from 'react';
import './Paddles.css';

const PaddleRight = ({ paddles, gameRunning }) => (
  <div
    className={`paddle paddle-right ${gameRunning ? '' : 'paused'}`}
    id="paddle-right"
    style={{ top: `${paddles.right}px`, left: '580px' }}
  />
);

export default PaddleRight;