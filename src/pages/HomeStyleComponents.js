import styled, {keyframes} from 'styled-components'
import wallPaper from '../assets/backgrounds/background-dark.jpeg'
import { device } from '../utils/style/device';

export const Desktop = styled.div`
  background-color:black;
  background-image:url(${wallPaper});
  background-size:cover;
  padding:10px;

  &:before{
    content: " ";
    display: block;
    position: fixed;
    height:100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18,16,16,0) 50%,rgba(0,0,0,.25) 0),linear-gradient(90deg,rgba(255,0,0,.06),rgba(0,255,0,.02),rgba(0,0,255,.06));
    z-index: 200;
    background-size: 100% 2px,3px 100%;
    pointer-events: none;
  }
`

export const IconDeskManager = styled.div`
  display:grid;
  grid-template-columns: repeat(3, minmax(75px, 75px));
  grid-template-rows: repeat(autofit, minmax(70px, 70px));
  gap:10px;
`

export const Icon = styled.div`
  width:75px;
  height:70px;

  display:grid;
  grid-template-rows:50px 20px;
  align-items:center;
  text-align: center;
  justify-content: center;

  cursor:pointer;
`

export const IconTxtDesktop = styled.span`
  color:white;
  font-size:14px;
`
export const IconTxtWindows = styled.span`
  color:black;
`

export const IconCenterImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const IconImg = styled.img`
  height: 45px;
  image-rendering:pixelated;
`

export const IconDustBin = styled(Icon)`
  position:fixed;
  right:10px;
  bottom:10px;
`

export const HeaderWindow = styled.div`
  height:25px;
  width:100%;

  background-color: #000;
  color: #fff;

  display:flex;
  align-items:center;
  justify-content: center;

  cursor:grab;
`

export const CloseIconWindow = styled.button`
  all: unset;
  -webkit-appearance: none;
  -moz-appearance: none;
  height: 13px;
  width: 13px;
  background-color: #FF6347;
  border-radius: 50%;
  border:none;
  position:absolute;
  top:5px;
  left:7.5px;
  cursor:pointer;
`

export const Window = styled.div`
  height:350px;
  width:350px;

  position:absolute;
  overflow:hidden;

  background-color: #000;
  border: 3px solid #000;
  border-radius:10px;

  border-color: -internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133));
  box-shadow: 5px 5px 30px 1px rgba(0, 0, 255, .25);

  @media ${device.tablet} {
    height:200px;
    width:300px;
  }
`

export const ContentWindow = styled.div`
  color:black;

  height:90%;
  width:100%;

  border-bottom-left-radius:4px;
  border-bottom-right-radius:4px;
`

export const HeaderWindowTv = styled(HeaderWindow)`
  position:absolute;
  opacity:0;
  z-index:11;

  @media ${device.tablet} {
    height:15px;
    opacity:1;
    font-size:10px;
  }
`

export const CloseIconWindowTv = styled(CloseIconWindow)`
  position:absolute;
  opacity:0;
  z-index:12;

  @media ${device.tablet} {
    opacity:1;
  }
`

export const WindowTv = styled(Window)`
    height: 375px;
    width: 620px;
    min-height: 149px;
    min-width: 265px;

    resize:both;
    overflow:hidden;

    z-index: 10;

    top:2.5vh;

    &:hover ${HeaderWindowTv}{
      opacity:1;
    }

    &:hover ${CloseIconWindowTv}{
      opacity:1;
    }

    @media ${device.tablet} {
      height:200px;
      width:300px;
    }
`

export const TwitchEmbed = styled.div`
  height:100%;
  width:100%;
  z-index:9;
  margin-top:15px;
`

export const HeaderWindowTvChat = styled(HeaderWindow)`
  position:absolute;
  z-index:11;
`

export const CloseIconWindowTvChat = styled(CloseIconWindow)`
  position:absolute;
  z-index:12;
`

export const WindowTvChat = styled(Window)`
    height: 500px;
    width: 350px;
    min-height: 300px;
    min-width: 251px;

    resize:both;
    overflow:hidden;

    z-index:10;
    
    top:37vh;
    left:1px;

    @media ${device.tablet} {
      height:370px;
      width:314px;
    }
`

export const WindowMain = styled(Window)`
    top:100px;
    right:25%;
    height: 510px;
    width: 590px;
    box-shadow: 5px 5px 30px 1px rgba(0, 0, 255, .3);
    
    @media ${device.tablet} {
      right:0 !important;
      height: 210px !important;
      width: 225px !important;
    }

    @media ${device.laptop} {
      height: 410px;
      width: 470px;
      right:15%;
    }

    @media ${device.laptopL} {
      height: 410px;
      width: 470px;
    }
`

export const WindowMixtape = styled(Window)`
    height:300px;
    width:190px;
    min-height:155px;
    min-width:190px;
    resize:both;
    overflow:hidden;
    top:5vh;
    left:5vw;

    background-color: #E7F0F4;
    @media ${device.tablet} {
      top:250px;
    }
`

export const WindowAudioPlayer = styled(Window)`
    height:400px;  
    width:360px;
    background-color: #e7f0f4;
    top:50vh;
    right:10vw;
    @media ${device.tablet} {
      height: 200px;
      width:200px;
      top:250px;
      left:100px;
    }
`

export const WindowRadio = styled(Window)`
    background-color: #e7f0f4;
    height: 400px;
    width:600px;
    right:50%;
    bottom:20%;
    top:25%;
    @media ${device.tablet} {
      height: 200px;
      width:200px;
      top:250px;
    }
`

export const WindowPomodoro = styled(Window)`
    height: 420px;
    width:300px;
    background-color: #e7f0f4;
    top:20vh;
`

export const WindowInsta = styled(Window)`
  height: 350px;
  width: 300px;
  top:20%;
  right:50%;
`

export const MixtapeWindow = styled.div`
  height:100%;
  width:100%;

  padding:15px 30px 15px 15px;
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 75px));
  grid-template-rows: repeat(auto-fit, minmax(70px, 70px));
  gap:10px;
  color:black;
  background-color:#e7f0f4;
  overflow:scroll;
`

export const HomeWindow = styled.div`
  width:100%;
  display:grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap:1px;

  @media ${device.laptop}{
    height:385px;
  }
  @media ${device.laptopL}{
    height:385px;
  }
  @media ${device.tablet} {
    display:grid;
    grid-template-columns: repeat(3, minmax(75px, 75px));
    grid-template-rows: 1fr 1fr 30px;
    height:185px;
  }
`

export const MainImg = styled.video`
  width:100%;
  grid-column: 1 / 6;
  grid-row: 1 / 5; 

  @media ${device.tablet} {
    display:none;
  }
`

// export const MainImg = styled.div`
//   width:100%;
//   grid-column: 1 / 6;
//   grid-row: 1 / 5;
//   display:flex;
//   align-items:center;
//   justify-content: center;

//   @media ${device.tablet} {
//     display:none;
//   }
// `

export const MainButtons = styled.button`
  grid-row: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor:pointer;
  background-color: #e7f0f4;
  margin:0px;
  @media ${device.tablet} {
    grid-row:auto;
  }

  cursor:pointer;
`

const textflicker = keyframes`
  from {
    text-shadow: 1px 0 0 #ea36af, -2px 0 0 #75fa69;
  }
  to {
    text-shadow: 2px 0.5px 2px #ea36af, -1px -0.5px 2px #75fa69;
  }
`

export const ContentWindowAbout = styled.div`
  background: #111;
  padding: 10px;
  height:100%;
  color: #eee;
  font-size: 1em;
  line-height: 1;
  text-shadow: 0.06rem 0 0.06rem #ea36af, -0.125rem 0 0.06rem #75fa69;
  letter-spacing: 0.1em;
  animation-duration: 0.01s;
  animation-name: ${textflicker};
  animation-iteration-count: infinite;
  animation-direction: alternate;
`
