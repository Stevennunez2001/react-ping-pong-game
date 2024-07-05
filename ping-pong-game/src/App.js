import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Ball from './components/ball/Ball';
import PaddleLeft from './components/paddles/PaddleLeft';
import PaddleRight from './components/paddles/PaddleRight';

const App = () => {
  const initialBallState = { x: 300, y: 200, speedX: 5, speedY: 5 };
  const initialPaddleState = { left: 150, right: 150 };

  const [ball, setBall] = useState(initialBallState);
  const [paddles, setPaddles] = useState(initialPaddleState);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const ballRef = useRef(null);

  useEffect(() => {
    if (gameRunning) {
      const handleKeyPress = (e) => {
        switch (e.key) {
          case 'ArrowUp':
            setPaddles((prev) => ({ ...prev, right: Math.max(prev.right - 10, 0) }));
            break;
          case 'ArrowDown':
            setPaddles((prev) => ({ ...prev, right: Math.min(prev.right + 10, 300) }));
            break;
          case 'w':
            setPaddles((prev) => ({ ...prev, left: Math.max(prev.left - 10, 0) }));
            break;
          case 's':
            setPaddles((prev) => ({ ...prev, left: Math.min(prev.left + 10, 300) }));
            break;
          default:
            break;
        }
      };

      const updateGame = () => {
        setBall((prevBall) => ({
          ...prevBall,
          x: prevBall.x + prevBall.speedX,
          y: prevBall.y + prevBall.speedY,
        }
      ));

        const ballRect = ballRef.current.getBoundingClientRect();
        const paddleLeftRect = document.getElementById('paddle-left').getBoundingClientRect();
        const paddleRightRect = document.getElementById('paddle-right').getBoundingClientRect();

      // Check collision with left paddle
      if (
        ballRect.right >= paddleLeftRect.left &&
        ballRect.left <= paddleLeftRect.right &&
        ballRect.bottom >= paddleLeftRect.top &&
        ballRect.top <= paddleLeftRect.bottom
      ) {
        setBall((prevBall) => ({ ...prevBall, speedX: Math.abs(prevBall.speedX) }));
      }

      // Check collision with right paddle
      if (
        ballRect.right >= paddleRightRect.left &&
        ballRect.left <= paddleRightRect.right &&
        ballRect.bottom >= paddleRightRect.top &&
        ballRect.top <= paddleRightRect.bottom
      ) {
        setBall((prevBall) => ({ ...prevBall, speedX: -Math.abs(prevBall.speedX) }));
      }

      // Check for collisions with top
      if (ball.y >= 380){
        
       
      
      //Check for collision with bottom 
      setBall((prevBall) => ({ ...prevBall, speedY: -Math.abs(prevBall.speedY) }));
      }
      if (ball.y <= 0) {
        setBall((prevBall) => ({ ...prevBall, speedY: Math.abs(prevBall.speedX)}));
      }

      // Check for game over
      if (ball.x < 0 || ball.x > 600) {
        setGameOver(true);
        pauseGame();
      }
    };


      const intervalId = setInterval(updateGame, 50);

      window.addEventListener('keydown', handleKeyPress);

      return () => {
        clearInterval(intervalId);
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [gameRunning, ball]);

  const startGame = () => {
    setGameRunning(true);
  };

  const restartGame = () => {
    setBall(initialBallState);
    setPaddles(initialPaddleState);
    setGameOver(false);
  };

  const pauseGame = () => {
    setGameRunning(false);
  };

  return (
    <div className="ping-pong-container" tabIndex="0">
      <PaddleLeft paddles={paddles} gameRunning={gameRunning} />
      <PaddleRight paddles={paddles} gameRunning={gameRunning} />
      <Ball ball={ball} gameRunning={gameRunning} ref={ballRef} />
      <div className="controls">
        <button onClick={startGame}>Start</button>
        <button onClick={restartGame}>Restart</button>
        <button onClick={pauseGame}>Pause</button>
      </div>
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );
};

export default App;