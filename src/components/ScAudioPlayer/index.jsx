import React, {useRef} from "react"
import styled from 'styled-components'
import ScReactPlayer from 'react-player/soundcloud'
import Duration from "../Duration"

import fgTape from '../../assets/foregroundPlayer.png'
import bgTape from '../../assets/backgroundPlayer.png'
import glass from '../../assets/glass.png'
import wheel from '../../assets/tapeWheel.gif'
import playIcon from '../../assets/playIcon.png'
import pauseIcon from '../../assets/pauseIcon.png'

const DivGrid = styled.div`
    display: grid;
    grid-template-columns: 100px repeat(2, 1fr);
    grid-template-rows: 1fr repeat(2, 25px);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`

const PlayPause = styled.div`
    grid-area: 1 / 1;
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:center;
    position:relative;
    margin-top:15px;
`

const PlayPauseInner = styled.div`
    width:100%;
    height:100%;
    display:flex;
    align-items:center;
    justify-content:center;
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
    height: 50px;
    width: 50px;
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
    top: 54%;
    left: 53%;
    margin: -21px 0px 0px -21px;
    border: solid;
    border-width:thin;
    border-color: #1E1F24;
    box-shadow: inset 2px 0px 0px 2px rgb(167 175 181);
`

const InnerCircle = styled.div`
    position: absolute;
    background: #abb3ba;
    border-radius: 50%;
    height: 36px;
    width: 36px;
    top: 53%;
    left: 53%;
    margin: -21px 0px 0px -21px;
    border: solid;
    border-width:thin;
    border-color: #1E1F24;
    box-shadow: 2px 0px 0px 1px rgb(167, 175, 181);
`

const TapePlayer = styled.div`
    grid-area: 1 / 2 / 2 / 4;
`

const FgTape = styled.img`
    height: 196px;
    margin-left: 1px;
    margin-top: 10px;
    margin-bottom: -10px;
    position: absolute;
    z-index:4;
`

const Glass = styled.img`
    height: 144px;
    margin-left: 80px;
    margin-top: 38px;
    margin-bottom: -10px;
    position: absolute;
    opacity: 0.2;
    z-index: 3;
`

const BgTape = styled.img`
    height: 196px;
    margin-left: 1px;
    margin-top: 10px;
    margin-bottom: -10px;
`

const Wheel = styled.img`
    height: 35px;
    margin-left: 125px;
    margin-top: 97px;
    position: absolute;
    z-index: 2;
`

// excess height to improve interactive area / accessibility
const height = "23px";
const thumbHeight = 23.5;
const trackHeight = "5px";

// colours
// const upperColor = "#edf5f9";
// const lowerColor = "#0199ff";
// const thumbColor = "#ddd";
// const thumbHoverColor = "#ccc";
//color after thumb
const upperColor = "#8B8B8B";
//color before thumb
const lowerColor = "#81b0de";
const thumbColor = "#c091b9";
const thumbHoverColor = "#c898c1";
const upperBackground = `linear-gradient(to bottom, ${upperColor}, ${upperColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;
const lowerBackground = `linear-gradient(to bottom, ${lowerColor}, ${lowerColor}) 100% 50% / 100% ${trackHeight} no-repeat transparent`;

// const upperBackground = "#FF0000";
// const lowerBackground = "#FF0000";

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
    grid-area: 2 / 2 / 3 / 4;
    margin-left: 79px;
    margin-top: 1px;
    cursor:grab;
    overflow: hidden;
    display: block;
    appearance: none;
    max-width: 315px;
    width: 73%;
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

const ProgressDuration = styled.div`
    grid-area: 3 / 2 / 4 / 3;
    margin-left: 33px;
    margin-top: -17px;
`

const TotalDuration = styled.div`
    color:#555555;
    grid-area: 3 / 3 / 4 / 4;
    text-align: right;
    margin-right: 209px;
    margin-top: -159px;
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

    const handlePlay = () => {
        setPlayerState({...playerState, playing:true, duration:playerState.duration})
    }

    const handlePause = () => {
        setPlayerState({...playerState, playing:false, duration:playerState.duration})
    }

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
                {playerState.playing?
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
                }
                <TapePlayer>
                    <FgTape alt="fgTape" src={fgTape}/>
                    <Glass alt="glass" src={glass}></Glass>
                    <Wheel alt="wheel" src={wheel}></Wheel>
                    <Wheel style={{marginLeft:"255px"}} alt="wheel" src={wheel}></Wheel>
                    <BgTape alt="bgTape" src={bgTape}/>
                </TapePlayer>
                <SeekBar
                    type='range' min={0} max={0.999999} step='any'
                    value={playerState.played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                />
                <ProgressDuration>
                    <Duration seconds={playerState.duration * playerState.played}/>
                </ProgressDuration>
                <TotalDuration>
                    <Duration seconds={playerState.duration}/>
                </TotalDuration>
            </DivGrid>
        </> 
    );
}

export default ScAudioPlayer