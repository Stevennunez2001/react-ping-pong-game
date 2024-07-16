import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Ball from './components/ball/Ball';
import PaddleLeft from './components/paddles/PaddleLeft';
import PaddleRight from './components/paddles/PaddleRight';
import Circle from './styling/Circle';
import Line from './styling/Line';
import  Scoreboard  from './components/scores/Scores';
import {Container, Row, Col, Button} from 'reactstrap';

let scoreArr = [0, 0];
const randomizer = Math.floor(Math.random() * 2);

const App = () => {
  const ballSpeed = Math.floor(Math.random() * 5) + 10
  const [randomBallSpeed, setRandomBallSpeed] = useState(ballSpeed);
  const initialBallState = { x: 439, y: 341, speedX: randomBallSpeed, speedY: randomBallSpeed };
  const gameOverBallState = {x: 920};
  const initialPaddleState = { left: 300, right: 300 };
  const gameOverPaddleState = {left: 900, right: 900};

  const [ball, setBall] = useState(initialBallState);
  const [paddles, setPaddles] = useState(initialPaddleState);
  const [gameOver, setGameOver] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  const ballRef = useRef(null);
  const initialScoreState = {playerLeft: 0, playerRight: 0}
  // let score = {playerLeft: 5, playerRight: 0};
  const ballDir = Math.floor(Math.random() * 2);
  const [randomBallDir, setRandomBallDir] = useState(ballDir);
  const [scores, setScores] = useState(initialScoreState)

  let posrOrNeg = '';
  if(randomBallDir > 0) {
    posrOrNeg = 1;
  } else {
    posrOrNeg = -1;
  };
  
  
 
  

  
  useEffect(() => {
    
    if(gameRunning){
      const handleKeyPress = (e) => {
        switch (e.code) {
          case 'ArrowUp':
            setPaddles((prev) => ({ ...prev, right: Math.max(prev.right - 10, 0) }));
            break;
          case 'ArrowDown':
            setPaddles((prev) => ({ ...prev, right: Math.min(prev.right + 10, 600) }));
            break;
          
        }

        switch (e.code) {
        case 'KeyW':
            setPaddles((prev) => ({ ...prev, left: Math.max(prev.left - 10, 0) }));
            break;
          case 'KeyS':
            setPaddles((prev) => ({ ...prev, left: Math.min(prev.left + 10, 600) }));
            break;
      };
    };
    
      const updateGame = () => {
        
        if(randomBallDir > 0) {
        setBall((prevBall) => ({
          ...prevBall,
          x: prevBall.x + prevBall.speedX,
          y: prevBall.y + prevBall.speedY,
        }
      ));
    } else {
      setBall((prevBall) => ({
        ...prevBall,
        x: prevBall.x - prevBall.speedX,
        y: prevBall.y - prevBall.speedY,
      }
    ));
    }

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
        setBall((prevBall) => ({ ...prevBall, speedX: posrOrNeg * Math.abs(prevBall.speedX)}));
        console.log(-posrOrNeg * Math.abs(ball.speedY))
      }

      // Check collision with right paddle
      if (
        ballRect.right >= paddleRightRect.left &&
        ballRect.left <= paddleRightRect.right &&
        ballRect.bottom >= paddleRightRect.top &&
        ballRect.top <= paddleRightRect.bottom
      ) {
        setBall((prevBall) => ({ ...prevBall, speedX: posrOrNeg*Math.abs(prevBall.speedX) }));
      }

      // Check for collisions with top
      if (ball.y >= 675){
      setBall((prevBall) => ({ ...prevBall, speedY: -posrOrNeg*Math.abs(prevBall.speedY) }));
      }
      if (ball.y <= 25) {
          setBall((prevBall) => ({ ...prevBall, speedY: posrOrNeg * Math.abs(prevBall.speedY)}));
      }
      

      // Check for game over
      if (ball.x > 880) {
        // setGameOver(true);
        setBall(initialBallState);
        // scoreArr[0]++;
        setScores((prevScore) => ({
          playerLeft: prevScore.playerLeft+1, 
          playerRight: prevScore.playerRight
       }));
        
        setPaddles(initialPaddleState);
        pauseGame();
        
      } else if (ball.x < 0) {
        // setGameOver(true);
        setBall(initialBallState);

        setScores((prevScore) => ({
           playerRight: prevScore.playerRight++, 
           playerLeft: prevScore.playerLeft
        }));
        setPaddles(initialPaddleState);
        
        
      
        
        
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


  useEffect(() => {
          if(scores.playerRight > 4) {
            endGame();
          }
          if(scores.playerLeft > 4) {
            endGame();
          }
        }, [scores])

  const startGame = () => {
    setGameRunning(true);
    setRandomBallSpeed(ballSpeed);
    setRandomBallDir(ballDir);
  };
  const endGame = () => {
    setGameOver(true);
    setPaddles(gameOverPaddleState);
    setBall(gameOverBallState);
  }


  const restartGame = () => {
    setScores(initialScoreState);
    setBall(initialBallState);
    setPaddles(initialPaddleState);
    setGameOver(false);
    pauseGame();
  };

  const pauseGame = () => {
    setGameRunning(false);
  };

  return (
    <>
    <Container>
    <Row className="mt-2 controls d-flex btn-group justify-content-center">
      <Col>
        <Button className="btn-success btn-lg offset-1" onClick={startGame}>Start</Button>
        </Col>
        <Col>
        <Button className="btn-info btn-lg offset-4" onClick={restartGame}>Restart</Button>
        </Col>
        <Col>
        <Button className="btn-warning btn-lg offset-8" onClick={pauseGame}>Pause</Button>
        </Col>
      </Row>
      <Row>
        <Col className='offset-2'>
          <Scoreboard score={scores}/>
        </Col>
      </Row>
      </Container>
    <div className="ping-pong-container" tabIndex="0">
      
      <PaddleLeft paddles={paddles} gameRunning={gameRunning} />
      <PaddleRight paddles={paddles} gameRunning={gameRunning} />
      <Ball ball={ball} gameRunning={gameRunning} ref={ballRef} />
      {gameOver && 
      <>
      <div className="game-over">Game Over</div>
      <PaddleLeft paddles={paddles} gameRunning={!gameRunning} />
      </>}
      <Circle />
      <Line />
      
    </div>
    
    </>
    
  );
};

export default App;