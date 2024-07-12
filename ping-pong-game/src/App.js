import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Ball from './components/ball/Ball';
import PaddleLeft from './components/paddles/PaddleLeft';
import PaddleRight from './components/paddles/PaddleRight';
import Circle from './styling/Circle';
import Line from './styling/Line';
import {Container, Row, Col} from 'reactstrap';

const App = () => {
  const initialBallState = { x: 439, y: 341, speedX: 10, speedY: 10 };
  const initialPaddleState = { left: 300, right: 300 };

  const [ball, setBall] = useState(initialBallState);
  const [paddles, setPaddles] = useState(initialPaddleState);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const ballRef = useRef(null);

  
  useEffect(() => {
    if(!gameRunning){
      const handleKeyPress = (e) => {
      switch (e.code){
        case 'Enter':
              setGameRunning(true);
              break;
          default:
            break;
      }
      }
    }
    else {
      const handleKeyPress = (e) => {
        switch (e.code) {
          case 'ArrowUp':
            setPaddles((prev) => ({ ...prev, right: Math.max(prev.right - 10, 0) }));
            break;
          case 'ArrowDown':
            setPaddles((prev) => ({ ...prev, right: Math.min(prev.right + 10, 600) }));
            break;
          case 'KeyW':
            setPaddles((prev) => ({ ...prev, left: Math.max(prev.left - 10, 0) }));
            break;
          case 'KeyS':
            setPaddles((prev) => ({ ...prev, left: Math.min(prev.left + 10, 600) }));
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
      if (ball.y >= 675){
      setBall((prevBall) => ({ ...prevBall, speedY: -Math.abs(prevBall.speedY) }));
      }
      if (ball.y <= 12) {
        setBall((prevBall) => ({ ...prevBall, speedY: Math.abs(prevBall.speedX)}));
      }

      // Check for game over
      if (ball.x < 0 || ball.x > 880) {
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
    <>
    <Container>
    <Row className="mt-2 controls d-flex btn-group justify-content-center">
      <Col>
        <button className="btn btn-success btn-lg offset-1" onClick={startGame}>Start</button>
        </Col>
        <Col>
        <button className="btn btn-primary btn-lg offset-4" onClick={restartGame}>Restart</button>
        </Col>
        <Col>
        <button className="btn btn-warning btn-lg offset-8" onClick={pauseGame}>Pause</button>
        </Col>
      </Row>
      </Container>
    <div className="ping-pong-container" tabIndex="0">
      
      <PaddleLeft paddles={paddles} gameRunning={gameRunning} />
      <PaddleRight paddles={paddles} gameRunning={gameRunning} />
      <Ball ball={ball} gameRunning={gameRunning} ref={ballRef} />
      {gameOver && <div className="game-over">Game Over</div>}
      <Circle />
      <Line />
    </div>
    </>
    
  );
};

export default App;