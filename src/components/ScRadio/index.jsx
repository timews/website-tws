import React, {useRef, useState} from "react"
import ScReactPlayer from 'react-player/soundcloud'
import Duration from "../Duration"
import styled from "styled-components"

import fastForward from '../../assets/fast-forward.svg'
import playPause from '../../assets/play-pause.svg'
import vibe from '../../assets/radioVibe.gif'

// excess height to improve interactive area / accessibility
const heightTrack = "24px";
const thumbHeight = 23.5;
const trackHeight = "25px";

// colours
//color after thumb
const upperColor = "#c0ced6";
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

  for (; i < 310; i++) {
    shadow = `${shadow}, ${i}px 0 0 ${size} ${color}`;
  }

  return shadow;
};

const SeekBar = styled.input`
    grid-area: 2 / 2 / 3 / 4;
    cursor:grab;
    overflow: hidden;
    display: block;
    appearance: none;
    width: 100%;
    height: ${heightTrack};
    cursor: pointer;
  
    &:focus {
      outline: none;
    }
  
    &::-webkit-slider-runnable-track {
      width: 100%;
      height: ${heightTrack};
      background: ${lowerBackground};
    }
  
    &::-webkit-slider-thumb {
      position: relative;
      appearance: none;
      height: 25px;
      width: 2px;
      background: ${thumbColor};
      top: 50%;
      transform: translateY(-50%);
      box-shadow: ${makeLongShadow(upperColor, "10px")};
      transition: background-color 150ms;
      cursor:grab;
    }
  
    &::-moz-range-track,
    &::-moz-range-progress {
      width: 100%;
      height: ${heightTrack};
      background: ${upperBackground};
    }
  
    &::-moz-range-progress {
      background: ${lowerBackground};
    }
  
    &::-moz-range-thumb {
      position: relative;
      appearance: none;
      height: 25px;
      width: 2px;
      background: ${thumbColor};
      top: 50%;
      transition: background-color 150ms;
      cursor:grab;
    }
  
    &::-ms-track {
      width: 100%;
      height: ${heightTrack};
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

const GridRadio = styled.div`
  height:100%;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr 1fr;
  grid-template-rows: 0.7fr 1.3fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "Details Details Comments"
    "Controls Channels Channels";
`

const Details = styled.div`
  grid-area: Details;
  border-bottom: solid;
  border-right:solid;
  padding-left: 40px;
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  padding-right: 40px;
`

const GifContainer = styled.div`
  grid-area: Comments;
  border-bottom: solid;
  display:flex;
  padding: 15px 20px 15px 20px;
  max-height:117px;
  justify-content:center;
  align-items:center;
`

const GifScreen = styled.div`
  background-color:black;
  height: 105px;
  width: 145px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  border: solid;
  box-shadow: inset 0px 0px 0px 2px rgb(167 175 181);
`

const GifVibe = styled.div`
    height: 100px;
    width: 100px;
    margin-top:2px;
    background-image:url(${vibe});
    background-size: contain;
`
// const Comments = styled.div`
//   grid-area: Comments;
//   border-bottom: solid;
//   display:flex;
//   flex-direction:column;
//   gap:10px;
//   padding: 15px 20px 5px 20px;
//   max-height:117px;
// `

// const ListComments = styled.ul`
//   display:flex;
//   flex-direction:column;
//   align-items:center;
//   justify-content: flex-start;
//   overflow:auto;
//   font-size:11px;
//   list-style:none;
//   margin-top:0;
//   padding-left:0;
// `

// const FooterComments = styled.div`
//   background: linear-gradient(0deg,rgba(231,240,244,1) 65%,rgba(231,240,244,0.5) 100%);
//   grid-area: Comments;
//   height: 25px;
//   align-self: flex-end;
//   margin-bottom: 5px;
// `

const Controls = styled.div`
  grid-area: Controls; 
  border-right:solid;
  display: grid; 
  grid-template-columns: 0.5fr 1.5fr; 
  grid-template-rows: 0.5fr 1.5fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "Title Title"
    "PlayPause ChannelSeekerControl";
`

const SmallControl = styled.div`
  grid-area:PlayPause;
  width: 97px;
  height: 135px;
  display:flex;
  flex-direction:column;
  align-items:center;
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
    -webkit-margin-after:10px;
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
    top: 24px;
    left: 24px;
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
    top: 24px;
    left: 24px;
    margin: -21px 0px 0px -21px;
    border: solid;
    border-width:thin;
    border-color: #1E1F24;
    box-shadow: 3px 0px 0px 0px rgb(167, 175, 181);

    display:flex;
    align-items:center;
    justify-content:center;
`

const BigControl = styled.div`
  grid-area:ChannelSeekerControl;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 130px;
`

const ChannelSeeker = styled.input`
  height: 135px;
  width: 135px;
  cursor:grab;
  border-radius: 50%;
  box-shadow: 0px -8px 0px 0px rgb(167, 175, 181);
  transform: rotate(90deg);
`

const ChannelSeekerButton = styled.div`
  display: block;
  position: absolute;
  transform: rotate(-150deg);
  pointer-events: none;

  width: 135px;
  height: 135px;
  background: #abb3ba;
  border: solid;
  border-radius: 50%;
  border-color: #1E1F24;
`

const ChannelSeekerIcon = styled.div`
  display: block;
  position: absolute;
  transform: rotate(-130deg);
  pointer-events: none;
  width: 20px;
  height:5px;
  background: #c091b9;
  left: 30px;
  top: 30px;
  border:solid;
  border-width:thin;
`

const Channels = styled.div`
  grid-area: Channels;
  display: grid; 
  grid-template-columns: 0.5fr 2fr 0.5fr; 
  grid-template-rows: 0.3fr 1.7fr; 
  gap: 0px 0px; 
  grid-template-areas: 
    "Title Title Title"
    "ColumnLeft Board ColumnRight"; 
`

const Title = styled.div`
  grid-area: Title;
  padding: 15px 0px 20px 20px;
`

const Column = styled.ul`
  font-size: 12px;
  display:flex;
  flex-direction:column;
  list-style:none;
  margin-top:0;
  padding-left:0;
  justify-self: center;

  &>li:first-child{
    margin-bottom:10px;
  }
  &>li:last-child{
    margin-top:10px;
  }
  &>li{
    align-self:center;
  }
`

const ColumnLeft = styled(Column)`
  grid-area: ColumnLeft;
`

const ColumnRight = styled(Column)`
  grid-area: ColumnRight;
`

const Board = styled.div`
  grid-area: Board;
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;

  &>span{
    font-size:12px;
  }
`

const Pannel = styled.div`
  display:flex;
  width: 252px;
  height: 135px;
  border:solid;
  border-width:thin;

  &>div:nth-child(odd){
    width:28px;
    background:rgb(172 178 184);
  }

  &>div:nth-child(even){
    width:28px;
    background:rgb(234 240 244);
  }
`

const PannelBorder = styled.div`
  position:absolute;
  box-shadow: inset 0px 0px 0px 2px rgb(55,55,55), inset 2px 0px 5px 2px rgb(20,20,20);
  top:15px;
  width:252px;
  height: 136px;
`

const Band = styled.div`
  width: 250px;
  height:30px;
  background-color:#81b0de;
  position:absolute;
  top:100px;
`

const Wave = styled.div`
  width:250px;
  height:3px;
  background-color:#c091b9;
  position:absolute;
  top:114px;
  margin-top:14px;
`


const ScRadio = ({playerState, setPlayerState, volume}) => {

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

    const handlePlayPause = () => {
        setPlayerState({...playerState, playing:!playerState.playing, duration:playerState.duration})
    }

    const[press, setPress] = useState(false);

    const next = () => {
      setPress(prevState => !prevState);
    }

    const [top, setTop] = useState(114)
    const [angle, setAngle] = useState()

    const seekChannel = (e) => {
      setTop(e.target.value)
      setAngle(e.target.value * 3)
      console.log(angle)
    }

    return(
        <GridRadio>
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
            <Details>
              <span style={{paddingBottom:"10px"}}>RADIO</span>
              <span style={{fontSize: "13px", fontStyle:"italic"}}>Korea FM</span>
              <div><Duration size="30px" seconds={playerState.duration * playerState.played}/></div>
              <SeekBar
                  type='range' min={0} max={0.99} step='any'
                  value={playerState.played}
                  onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp}
                  style={{cursor:"grab"}}
              />
              <div value={0.1} onMouseDown={handleSeekMouseDown}
                  onChange={handleSeekChange}
                  onMouseUp={handleSeekMouseUp} style={{backgroundColor:"#e7f0f4", top:"120px", left:"51px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"60px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"69px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"78px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"87px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"96px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"105px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"114px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"123px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"132px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"141px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"150px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"159px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"168px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"177px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"186px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"195px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"204px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"213px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"222px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"231px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"240px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"249px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"258px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"267px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"276px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"286px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"295px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"304px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"313px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"322px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"331px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"340px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"349px", position:"absolute", width:"1px", height:"30px"}}></div>
              <div style={{backgroundColor:"#e7f0f4", top:"120px", left:"358px", position:"absolute", width:"1px", height:"30px"}}></div>
            </Details>
            <GifContainer>
              <GifScreen>
                <GifVibe/>
              </GifScreen>
            </GifContainer>
              {/*<Comments>
              <span>COMMENTS</span>
              <ListComments>
                <li>Don't know what to write but I wanna contribute</li>
                <li>Design matters</li>
                <li>I am new here</li>
                <li>Best song</li>
                <li>Have a great day guys</li>
                <li>What's the name of the artist please ?</li>
                <li>I have to contiue</li>
                <li>BLA</li>
                <br/><br/>
              </ListComments>
            </Comments>
            <FooterComments/> */}
            <Controls>
              <Title>
                <span>CONTROLS</span>
              </Title>
              <SmallControl>
                  <Btn onMouseDown={next} onMouseUp={() => setPress(prevState => !prevState)}>
                      <OuterCircle>
                          {press?
                              <InnerCirclePressed>
                                  <img style={{marginTop:"8px", height:"42px", filter:"invert(69%) sepia(26%) saturate(382%) hue-rotate(258deg) brightness(86%) contrast(91%)"}} src={fastForward} alt='iconBtn'/>
                              </InnerCirclePressed>:
                              <InnerCircle>
                                  <img style={{marginTop:"6px", height:"42px", filter:"invert(69%) sepia(26%) saturate(382%) hue-rotate(258deg) brightness(86%) contrast(91%)"}} src={fastForward} alt='iconBtn'/>
                              </InnerCircle>
                          }
                      </OuterCircle>
                  </Btn>
                  <Btn onMouseDown={handlePlayPause}>
                      <OuterCircle>
                          {!playerState.playing?
                              <InnerCircle>
                                  <img style={{marginTop:"4px", height:"32px", filter:"invert(69%) sepia(26%) saturate(382%) hue-rotate(258deg) brightness(86%) contrast(91%)"}} src={playPause} alt='iconBtn'/>
                              </InnerCircle>:
                              <InnerCirclePressed>
                                  <img style={{marginTop:"6px", height:"32px", filter:"invert(69%) sepia(26%) saturate(382%) hue-rotate(258deg) brightness(86%) contrast(91%)"}} src={playPause} alt='iconBtn'/>
                              </InnerCirclePressed>
                          }
                      </OuterCircle>
                  </Btn>
              </SmallControl>
              <BigControl>
                <ChannelSeeker type="range" min={15} max={120} value={top} onChange={seekChannel}/>
                <ChannelSeekerButton style={{transform:"rotate("+(angle - 150)+"deg)"}}>
                  <ChannelSeekerIcon></ChannelSeekerIcon>
                </ChannelSeekerButton>
              </BigControl>
            </Controls>
            <Channels>
              <Title>
                <span>CHANNELS</span>
              </Title>
              <ColumnLeft>
                <li>FM</li>
                <li>106</li>
                <li value={31} style={{textDecoration: "underline", color:"#81b0de", cursor:"pointer"}} onClick={seekChannel}>102</li>
                <li>98</li>
                <li value={58} style={{textDecoration: "underline", color:"#81b0de", cursor:"pointer"}} onClick={seekChannel}>96</li>
                <li>92</li>
                <li>90</li>
                <li value={100} style={{textDecoration: "underline", color:"#81b0de", cursor:"pointer"}} onClick={seekChannel}>88</li>
                <li>86</li>
                <li>MHZ</li>
              </ColumnLeft>
              <Board>
                <span>5W</span>
                <Pannel>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </Pannel>
                <Band style={{top:top+"px"}}></Band>
                <Wave style={{top:top+"px"}}></Wave>
                <PannelBorder></PannelBorder>
                <span>MHZ</span>
              </Board>
              <ColumnRight>
                <li>AM</li>
                <li>1600</li>
                <li>1400</li>
                <li value={44} style={{textDecoration: "underline", color:"#81b0de", cursor:"pointer"}} onClick={seekChannel}>1200</li>
                <li>1000</li>
                <li>800</li>
                <li>700</li>
                <li>600</li>
                <li value={114} style={{textDecoration: "underline", color:"#81b0de", cursor:"pointer"}} onClick={seekChannel}>500</li>
                <li>KHZ</li>
              </ColumnRight>
            </Channels>
        </GridRadio> 
    );
}

export default ScRadio