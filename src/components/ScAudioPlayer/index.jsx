import React, {useRef} from "react"
import styled from 'styled-components'
import ScReactPlayer from 'react-player/soundcloud'
import Duration from "../Duration"

import fgTape from '../../assets/foregroundPlayer.png'
import bgTape from '../../assets/backgroundPlayer.png'
// import glass from '../../assets/glass.png'
import wheel from '../../assets/tapeWheel.gif'
// import playIcon from '../../assets/playIcon.png'
// import pauseIcon from '../../assets/pauseIcon.png'

const DivGrid = styled.div`
    display: grid; 
    grid-template-columns: 1fr; 
    grid-template-rows: 1.6fr 0.6fr 0.8fr; 
    gap: 0px 0px; 
    grid-template-areas: 
    "Tape"
    "RangeControls"
    "ButtonsControls"; 
`

// const PlayPause = styled.div`
//     grid-area: 1 / 1;
//     display: flex;
//     flex-direction: column;
//     align-items:center;
//     justify-content:center;
//     position:relative;
//     margin-top:15px;
// `

// const PlayPauseInner = styled.div`
//     width:100%;
//     height:100%;
//     display:flex;
//     align-items:center;
//     justify-content:center;
// `

// const Btn = styled.button`
//     background:none;
//     color: inherit;
//     border: none;
//     padding: 0;
//     font: inherit;
//     cursor: pointer;
//     outline: inherit;
//     width: 50px;
//     height: 50px;
// `

// const OuterCircle = styled.div`
//     cursor:pointer;
//     background: #c0ced6;
//     border-radius: 50%;
//     height: 50px;
//     width: 50px;
//     position: relative;
//     border: solid;
//     border-color: #1E1F24;
// `

// const InnerCirclePressed = styled.div`
//     position: absolute;
//     background: #c0ced6;
//     border-radius: 50%;
//     height: 36px;
//     width: 36px;
//     top: 54%;
//     left: 53%;
//     margin: -21px 0px 0px -21px;
//     border: solid;
//     border-width:thin;
//     border-color: #1E1F24;
//     box-shadow: inset 2px 0px 0px 2px rgb(167 175 181);
// `

// const InnerCircle = styled.div`
//     position: absolute;
//     background: #abb3ba;
//     border-radius: 50%;
//     height: 36px;
//     width: 36px;
//     top: 53%;
//     left: 53%;
//     margin: -21px 0px 0px -21px;
//     border: solid;
//     border-width:thin;
//     border-color: #1E1F24;
//     box-shadow: 2px 0px 0px 1px rgb(167, 175, 181);
// `

const TapePlayer = styled.div`
    grid-area: Tape;
`

const TapeBorder = styled.div`
    border: solid;
    width: 344px;
    margin-left: 7px;
    border-color: black;
    box-shadow: 0px 1px 1px 1px grey, inset 0px -1px 0px 1.5px #333;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border-width: thin;
    border-top-width: 1px;
    padding-bottom: 20px;
    padding-top: 10px;
`

const FgTape = styled.img`
    pointer-events: none;
    height: 170px;
    margin-left: 12px;
    margin-top: 10px;
    position: absolute;
    z-index:4;
`

// const Glass = styled.img`
//     pointer-events: none;
//     height: 144px;
//     margin-left: 80px;
//     margin-top: 38px;
//     margin-bottom: -10px;
//     position: absolute;
//     opacity: 0.2;
//     z-index: 3;
// `

const BgTape = styled.img`
    pointer-events: none;
    height: 170px;
    margin-left: 12px;
    margin-top: 10px;
`

const Wheel = styled.img`
    pointer-events: none;
    height: 33px;
    margin-left: 120px;
    margin-top: 84px;
    position: absolute;
    z-index: 2;
`

// excess height to improve interactive area / accessibility
const height = "23px";
const thumbHeight = 23.5;
const trackHeight = "5px";

// colours
//color after thumb
const upperColor = "#8B8B8B";
//color before thumb
const lowerColor = "#81b0de";
const thumbColor = "#c091b9";
const thumbHoverColor = "#c898c1";
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;

// Webkit cannot style progress so we fake it with a long shadow on the thumb element
const makeLongShadow = (color, size) => {
  let i = 10;
  let shadow = `${i}px 0 0 ${size} ${color}`;

  for (; i < 300; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }

  return shadow;
};

const SeekBar = styled.input`
    grid-area: RangeControls;
    margin-left: 10px;
    margin-top: 10px;
    cursor:grab;
    overflow: hidden;
    display: block;
    appearance: none;
    max-width: 315px;
    width: 185px;
    height: ${height};
    cursor: pointer;
    box-shadow: inset 0px 0px 20px 20px rgb(55,55,55);
    border: solid;
    border-radius:3px;
    border-color: #1E1F24;
  
    &:focus {
      outline: none;
    }
  
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: ${height};
      background: ${lowerBackground};
      box-shadow: inset -10px 0px 0px 10px rgb(55,55,55);
    }
  
    &::-webkit-slider-thumb {
      position: relative;
      appearance: none;
      height: ${thumbHeight}px;
      width: ${thumbHeight}px;
      background: ${thumbColor};
      border-radius: 10%;
      border: solid;
      border-color: #28242e;
      top: 50%;
      transform: translateY(-50%);
      box-shadow: ${makeLongShadow(upperColor, "-10px")};
      box-shadow: 3px 0px 2px #25272A, ${makeLongShadow(upperColor, "-10px")};
      transition: background-color 150ms;
      cursor:grab;
    }
  
    &::-moz-range-track,
    &::-moz-range-progress {
      width: 100%;
      height: ${height};
      background: ${upperBackground};
    }
  
    &::-moz-range-progress {
      background: ${lowerBackground};
    }
  
    &::-moz-range-thumb {
      appearance: none;
      margin: 0;
      height: 19.5px;
      width: ${thumbHeight}px;
      background: ${thumbColor};
      border-radius: 10%;
      border: solid;
      border-width: 3px;
      border-color: #28242e;
      box-shadow: 3px 0px 2px #25272A;
      transition: background-color 150ms;
    }
  
    &::-ms-track {
      width: 100%;
      height: ${height};
      border: 0;
      /* color needed to hide track marks */
      color: transparent;
      background: transparent;
    }
  
    &::-ms-fill-lower {
      background: ${lowerBackground};
    }
  
    &::-ms-fill-upper {
      background: ${upperBackground};
    }
  
    &::-ms-thumb {
      appearance: none;
      height: ${thumbHeight}px;
      width: ${thumbHeight}px;
      background: ${thumbColor};
      border: solid;
      border-color: #28242e;
      transition: background-color 150ms;
      /* IE Edge thinks it can support -webkit prefixes */
      top: 0;
      margin: 0;
      box-shadow: none;
    }
  
    &:hover,
    &:focus {
      &::-webkit-slider-thumb {
        background-color: ${thumbHoverColor};
      }
      &::-moz-range-thumb {
        background-color: ${thumbHoverColor};
      }
      &::-ms-thumb {
        background-color: ${thumbHoverColor};
      }
    }
`

//TIMERS
const ProgressDuration = styled.div`
    grid-area: RangeControls;
    margin-left: 210px;
    margin-top: 8px;
    padding: 5px;
    width: 50px;
    height: 17px;
    display: flex;
    justify-content: center;
    background: #80c8d0;
    // box-shadow: inset 0px 0px 3px 2px rgb(150 190 175);
    box-shadow: inset 0px 0px 0px 4px #000, inset 0px 0px 3px 5px rgb(150 190 175);
    border:solid;
    border-radius:10px;
`

const TotalDuration = styled.div`
    grid-area: Tape;
    color:#555555;
    position: absolute;
    margin-top: -128px;
    margin-left: 95px;
`

const ButtonsControls = styled.div`
    margin-top: -15px;
    border-top: solid;
    box-shadow: 0px -1px 1px 1px grey, inset 0px 0px 0px 1.5px #333;
    background-color: #444;
    border-top-width:thin;
    height: 92px;
    width: 344px;
    margin-left: 7px;
    grid-area: ButtonsControls;
    display: flex;
`

const Button = styled.div`
    width: 110px;
    border: solid;
    border-width: thin;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: #e7f0f4;
    margin-left:2px;
`

const ButtonDecoration = styled.div`
    width: 70px;
    background-color: #8B8B8B;
    height: 40px;
    margin-top: 35px;
    margin-left: 21.5px;
    border-radius: 3px;
    border: solid;
    border-width: thin;
    display:flex;
    justify-content:center;
`

const ButtonLabel = styled.div`
    margin-top: -58px;
    font-size: 14px;
`

const ScAudioPlayer = ({playerState, setPlayerState, volume}) => {

    const player = useRef(null)

    function handleSeekMouseDown(e){
        setPlayerState({...playerState, seeking:true})
    }

    function handleSeekChange(e){
        setPlayerState({...playerState, played:parseFloat(e.target.value)})
    }

    function handleSeekMouseUp(e){
        setPlayerState({...playerState, seeking:false})
        player.current.seekTo(parseFloat(e.target.value))
    }

    function handleProgress(state){
        if (!playerState.seeking) {
        setPlayerState({...playerState, played:state.played})
        }
    }

    const handleDuration = (dur) => {
        setPlayerState({...playerState, duration:dur})
        console.log(dur)
    }

    const handleEnded = () => {
        setPlayerState({...playerState, playing:false})
    }

    // const handlePlayPause = () => {
    //     setPlayerState({...playerState, playing:!playerState.playing, duration:playerState.duration})
    // }

    // const handlePlay = () => {
    //     setPlayerState({...playerState, playing:true, duration:playerState.duration})
    // }

    // const handlePause = () => {
    //     setPlayerState({...playerState, playing:false, duration:playerState.duration})
    // }

    return(
        <>
            <ScReactPlayer 
                key={playerState.scUrl}
                style={{display:'none'}} 
                url={playerState.scUrl}
                playing={playerState.playing} 
                volume={volume}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onEnded={handleEnded}
                ref={player}
            />
            <DivGrid>
                {/* {playerState.playing?
                    <PlayPause>
                        <PlayPauseInner>
                            <Btn>
                                <OuterCircle onClick={handlePlay}>
                                    <InnerCirclePressed>
                                    </InnerCirclePressed>
                                </OuterCircle>
                                <img style={{position:"absolute", top:"30px", left:"35px"}} src={playIcon} alt='iconBtn'/>
                            </Btn>
                        </PlayPauseInner>
                        <PlayPauseInner>
                            <Btn onClick={handlePause}>
                                <OuterCircle>
                                    <InnerCircle>
                                    </InnerCircle>
                                </OuterCircle>
                                <img style={{position:"absolute", top:"121px", left:"33px"}} src={pauseIcon} alt='iconBtn'/>
                            </Btn>
                        </PlayPauseInner>
                    </PlayPause>:
                    <PlayPause>
                        <PlayPauseInner>
                            <Btn onClick={handlePlay}>
                                <OuterCircle>
                                    <InnerCircle>
                                    </InnerCircle>
                                </OuterCircle>
                                <img style={{position:"absolute", top:"28px", left:"35px"}} src={playIcon} alt='iconBtn'/>
                            </Btn>
                        </PlayPauseInner>
                        <PlayPauseInner>
                            <Btn onClick={handlePause}>
                                <OuterCircle>
                                    <InnerCirclePressed>
                                    </InnerCirclePressed>
                                </OuterCircle>
                                <img style={{position:"absolute", top:"123px", left:"33px"}} src={pauseIcon} alt='iconBtn'/>
                            </Btn>
                        </PlayPauseInner>
                    </PlayPause>
                } */}
                <TapePlayer>
                    <TapeBorder>
                        <FgTape alt="fgTape" src={fgTape}/>
                        {/* <Glass alt="glass" src={glass}></Glass> */}
                        <Wheel alt="wheel" src={wheel}></Wheel>
                        <Wheel style={{marginLeft:"228px"}} alt="wheel" src={wheel}></Wheel>
                        <BgTape alt="bgTape" src={bgTape}/>
                        <TotalDuration><Duration seconds={playerState.duration}/></TotalDuration>
                    </TapeBorder>
                </TapePlayer>
                <SeekBar
                    type='range' min={0} max={0.999999} step='any'
                    value={playerState.played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
                <ProgressDuration>
                    <Duration style={{alignSelf:"center"}}seconds={playerState.duration * playerState.played}/>
                </ProgressDuration>
                <ButtonsControls>
                    <Button><ButtonDecoration><ButtonLabel>STOP</ButtonLabel></ButtonDecoration></Button>
                    <Button><ButtonDecoration><ButtonLabel>PLAY</ButtonLabel></ButtonDecoration></Button>
                    <Button><ButtonDecoration><ButtonLabel>PAUSE</ButtonLabel></ButtonDecoration></Button>
                </ButtonsControls>
            </DivGrid>
        </> 
    );
}

export default ScAudioPlayer