import React from 'react';
import './Scores.css'
import {Container, Row, Col} from 'reactstrap';

const Scoreboard = ({ score }) => {
    return (
        <Container>
            <Row>
                <Col className="score">Score: {score.playerLeft}</Col>
                <Col className="score offset-5">Score: {score.playerRight}</Col>
            </Row>
        </Container>
    );
}

export default Scoreboard;