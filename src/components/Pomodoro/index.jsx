import styled from 'styled-components'
import React, {useState, useEffect } from "react";

const PomodoroWindow = styled.div`
    display:flex;
    height:100%;
    justify-content:center;
    align-items:center;
`

const PomodoroWrapper = styled.div`
    color:black;
`

const Message = styled.div`
    font-size:2em;
    text-align:center;
`

const MessageLabel = styled.div`
    color:black;
`

const Timer = styled.div`
    font-size:4em;
    display:flex;
    justify-content:center;
`

const Controls = styled.button`
    margin:1em;
`

const Pomodoro = () => {
    const[minutes, setMinutes] = useState(25);
    const[seconds, setSeconds] = useState(0);
    const[displayMessage, setDisplayMessage] = useState(false);

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);
            if(seconds === 0) {
                if(minutes !==0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                } else {
                    let minutes = displayMessage ? 24 : 4;
                    let seconds = 59;

                    setSeconds(seconds);
                    setMinutes(minutes);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(seconds - 1);
            }
        }, 1000)
    }, [seconds,minutes,displayMessage]);

    // function resetSession(){
    //     clearInterval(interval);
    //     let minutes = 24
    //     let seconds = 59;

    //     setSeconds(seconds);
    //     setMinutes(minutes);
    //     setDisplayMessage(false);
    // }

    // function resetBreak(){
    //     let minutes = 4
    //     let seconds = 59;

    //     setSeconds(seconds);
    //     setMinutes(minutes);
    //     setDisplayMessage(true);
    // }

    const timerMinutes = minutes < 10 ? `0${minutes}`: minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}`: seconds;

    return (
        <PomodoroWindow>
            <PomodoroWrapper>
                <Message>
                    {displayMessage? <MessageLabel>Break time! <br/>New session starts in:</MessageLabel>
                        :<MessageLabel>On progress..</MessageLabel> }
                </Message>
                <Timer>{timerMinutes}:{timerSeconds}</Timer>
                <Controls label="New session" >New session</Controls>
                <Controls label="Break time" >Break time</Controls>
            </PomodoroWrapper>
        </PomodoroWindow>
    );
}

export default Pomodoro