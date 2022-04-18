import styled from 'styled-components'
import React, {useState, useEffect, useRef} from "react";

import knob from '../../assets/doorKnob.png'
import soap from '../../assets/soapCycle.gif'

import newSession from '../../assets/newSession.png'
import playIconPressed from '../../assets/playIconPressed.png'

const PomodoroWindow = styled.div`
    height:100%;
    display: grid; 
    grid-template-columns: 1.3fr 0.5fr 1.3fr;
    grid-template-rows: 0.6fr 2fr 0.4fr;
    gap: 0px 0px; 
    grid-template-areas: 
      "screen options controls"
      "door door door"
      "pannel pannel pannel"; 
`

//Sreen
const ScreenWrapper = styled.div`
    grid-area:screen;
    display:flex;
    align-items:center;
    justify-content:center;
`

const Screen = styled.div`
    width:100px;
    height:50px;
    background-color:#80c8d0;
    border:solid;
    border-radius:10px;
    border-color:#1E1F24;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
`

const Message = styled.div`
    font-size:11px;
`

const MessageLabel = styled.div`
    color:black;
`

const Timer = styled.div`
    font-size:20px;
    z-index: 2;
`

//Controls
const PlayPauseNewSession = styled.div`
    grid-area:controls;
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    column-gap:10px;
    justify-content:center;
    margin-left: -5px;
`

const Btn = styled.button`
    background:none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
    width: 50px;
    height: 50px;
`

const OuterCircle = styled.div`
    cursor:pointer;
    background: #c0ced6;
    border-radius: 50%;
    height: 44px;
    width: 44px;
    position: relative;
    border: solid;
    border-color: #1E1F24;
`

const InnerCirclePressed = styled.div`
    position: absolute;
    background: #c0ced6;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    top: 55%;
    left: 54%;
    margin: -21px 0px 0px -21px;
    border: solid;
    border-width:thin;
    border-color: #1E1F24;
    box-shadow: inset 2px 0px 0px 2px rgb(167 175 181);

    display:flex;
    align-items:center;
    justify-content:center;
`

const InnerCircle = styled.div`
    position: absolute;
    background: #abb3ba;
    border-radius:50%;
    height: 36px;
    width: 36px;
    top: 55%;
    left: 54%;
    margin: -21px 0px 0px -21px;
    border: solid;
    border-width:thin;
    border-color: #1E1F24;
    box-shadow: 3px 0px 0px 0px rgb(167, 175, 181);

    display:flex;
    align-items:center;
    justify-content:center;
`

//Door
const Door = styled.div`
    grid-area:door;
    display:flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
`

const DoorBorder = styled.div`
    height:100%;
    width:250px;
    background-color:#e7f0f4;
    border-radius: 50%;
    border-color: #1E1F24;
    border: solid;
    box-shadow: inset 0px 0px 0px 20px rgb(192 206 214), 6px 0px 2px 0px rgb(167 175 181);
`

const Pannel = styled.div`
    grid-area:pannel;
    display:flex;
    align-self: flex-end;
    justify-content:right;
`

const TrapDoor = styled.div`
    height: 40px;
    width: 100px;
    background-color: #abb3ba;
    margin-right: 10px;
    border-radius: 10px;
    border:solid;
    border-width:thin;
    margin-bottom: 1px;
`

// const Controls = styled.button`
//     margin:1em;
//     cursor:pointer;
// `

const Pomodoro = () => {

    const[minutes, setMinutes] = useState(25);
    const[seconds, setSeconds] = useState(0);
    const[displayMessage, setDisplayMessage] = useState(false);
    const[pause, setPause] = useState(true);
    const[reset, setReset] = useState(false);

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
        setReset(prevState => !prevState);
        let minutes = 25;
        let seconds = 0;

        setSeconds(seconds);
        setMinutes(minutes);
        setDisplayMessage(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null
        setPause(true);
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
            <img src={soap} style={{opacity:"0.9", position:"absolute", width:"69%", marginTop:"98px", marginLeft:"47px"}} alt="/"></img>
            <ScreenWrapper>
                <Screen>
                    <Message>
                            {displayMessage? <MessageLabel>BREAK TIME!</MessageLabel>
                                :<MessageLabel>IN PROGRESS</MessageLabel> }
                    </Message>
                    <Timer>{timerMinutes}:{timerSeconds}</Timer>
                </Screen>
            </ScreenWrapper>
            <PlayPauseNewSession>
                {/* basculer breaktime et newSession avec /2 */}
                <Btn onMouseDown={resetSession} onMouseUp={() => setReset(prevState => !prevState)}>
                    <OuterCircle>
                        {reset?
                            <InnerCirclePressed>
                                <img style={{marginLeft:"2px", marginTop:"1px", height:"80%"}} src={newSession} alt='iconBtn'/>
                            </InnerCirclePressed>:
                            <InnerCircle>
                                <img style={{marginLeft:"2px", marginTop:"-1px", height:"80%"}} src={newSession} alt='iconBtn'/>
                            </InnerCircle>
                        }
                    </OuterCircle>
                </Btn>
                <Btn onClick={() => setPause(prevState => !prevState)}>
                    <OuterCircle>
                        {pause?
                            <InnerCircle>
                                <img style={{marginLeft:"4px", marginTop:"-1px", height:"100%"}} src={playIconPressed} alt='iconBtn'/>
                            </InnerCircle>:
                            <InnerCirclePressed>
                                <img style={{marginLeft:"4px", marginTop:"1px", height:"100%"}} src={playIconPressed} alt='iconBtn'/>
                            </InnerCirclePressed>
                        }
                    </OuterCircle>
                </Btn>
            </PlayPauseNewSession>
            <Door>
                <DoorBorder>
                </DoorBorder>
                <img style={{position:"absolute", height:"78px", marginTop:"-4px", marginLeft:"214px"}} src={knob} alt='knob'></img>
            </Door>
            <Pannel>
                <TrapDoor></TrapDoor>
            </Pannel>
        </PomodoroWindow>
    );
}

export default Pomodoro