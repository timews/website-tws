import styled from 'styled-components'
import React, {useState, useEffect, useRef} from "react";

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
    const[pause, setPause] = useState(false);

    const intervalRef = useRef(null)

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            if(pause){
                return;
            }
            if(seconds === 0) {
                if(minutes !==0) {
                    setSeconds(59);
                    setMinutes(prevState => prevState - 1);
                } else {
                    displayMessage ? setMinutes(24): setMinutes(4);
                    setMinutes(25);
                    setDisplayMessage(!displayMessage);
                }
            } else {
                setSeconds(prevState => prevState - 1);
            }
        }, 1000)
        return () => clearInterval(intervalRef.current)
    }, [minutes, seconds, displayMessage, pause]);

    function resetSession(){
        let minutes = 25
        let seconds = 0;

        setSeconds(seconds);
        setMinutes(minutes);
        setDisplayMessage(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null
    }

    function resetBreak(){
        let minutes = 5
        let seconds = 0;

        setSeconds(seconds);
        setMinutes(minutes);
        setDisplayMessage(true);
        clearInterval(intervalRef.current);
        intervalRef.current = null
    }

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
                <Controls label="New session" onClick={resetSession} >New session</Controls>
                <Controls label="Break time" onClick={resetBreak} >Break time</Controls>
                <Controls label="PlayPause" onClick={() => setPause(prevState => !prevState)} >{pause ? <span>Pause</span>:<span>Play</span>}</Controls>
            </PomodoroWrapper>
        </PomodoroWindow>
    );
}

export default Pomodoro