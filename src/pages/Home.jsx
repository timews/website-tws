import React, {useState} from 'react'
import Draggable from 'react-draggable'
import useSound from 'use-sound'
import { useEffect } from 'react'

import Header from '../components/Header'
import Pomodoro from '../components/Pomodoro'
import ScAudioPlayer from '../components/ScAudioPlayer'
import ScRadio from '../components/ScRadio'
import FirstLoader from '../components/FirstLoader'
import WeatherAPI from '../components/Weather'

import {Desktop, Icon, IconCenterImg, IconImg, IconTxtDesktop, MainImg,
    Window, HomeWindow, CloseIconWindow, HeaderWindow, IconTxtWindows,
    ContentWindow, MixtapeWindow, HeaderWindowTv, CloseIconWindowTv,
    WindowTv, HeaderWindowTvChat, CloseIconWindowTvChat, WindowTvChat,
    WindowMain, WindowMixtape, WindowAudioPlayer, WindowPomodoro, 
    MainButtons, IconDustBin, IconDeskManager, ContentWindowAbout, 
    WindowRadio, WindowInsta, TwitchEmbed} 
    from './HomeStyleComponents'

import {icone1, icone2, icone3, icone4, icone5, icone6, 
    icone7, icone8, icone9, icone10, icone11,
    icon_dustbin, icon_cd} 
    from '../assets/icones/index.jsx'

import tws_home from '../assets/home_tws.mp4'
import jingle from '../assets/audios/dondadamixtape.mp3'
import instaQR from '../assets/insta_qr.png'

function debounce(fn, ms) {
  let timer;
  return _ => {
    clearTimeout(timer);
    timer = setTimeout(_ => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}

function Home() {

  // Resizing
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth
  });
  useEffect(() => {
    const debouncedHandleResize = debounce(function handleResize() {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth
    });
    }, 300);

    window.addEventListener("resize", debouncedHandleResize);

    return _ => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  });

  // Management of windows
  const[showOption,setShowOption]=useState({
    about:false,
    contact:false,
    theme:false
  })

  const[show,setShow]=useState({
    launcher:true,
    mixtape:false,
    pomodoro:false,
    audioPlayer:false,
    radio:true,
    tv:false,
    tvChat:false,
    newsletter:false,
    news:false,
    insta:false,
    store:false,
    discord:false,
    weather:false,
    dustbin:false
  })

  const [increment, setIncrement] = useState(13)
  const [styleIndex, setStyleIndex] = useState({
    launcher:"1",
    mixtape:"2",
    pomodoro:"3",
    audioPlayer:"4",
    radio:"5",
    tv:"6",
    tvChat:"7",
    newsletter:"8",
    news:"9",
    insta:"10",
    store:"11",
    discord:"12",
    dustbin:"13",
    weather:"14"
  })

  const handleIndex = (e) => {
       setIncrement(increment+1)
       let inc = increment+1
       setStyleIndex({...styleIndex, [e.currentTarget.id]: ""+inc})
  }

  const [activeHeader, setActiveHeader] = useState(true)

  const handleHeader = (e) => {
    if(e.type === "mousedown"){
      setActiveHeader(false)
    } else {
      setActiveHeader(true)
    }
    handleIndex(e)
  }

  // Management of audio player & radio 
  const[volume,setVolume]=useState(0.8)

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value))
  }

  const[audioState,setAudioState]=useState({
    scUrl:'',
    playing:false,
    volume:0.8,
    played:0,
    duration:0,
    seeking:false
  })

  const[radioState,setRadioState]=useState({
    scUrl:'https://soundcloud.com/hanriverlove/sets/r-lofi-beat',
    playing:false,
    volume:0.8,
    played:0,
    duration:0,
    seeking:false
  })
 
  const openAndLoad = (url) => {
    if(!show.audioPlayer){
      setShow({...show, audioPlayer:true})
    }
    setAudioState({...audioState, scUrl:url, played: 0})
  }

  const openAndLoadRadio = (url) => {
    if(!show.radio){
      setShow({...show, radio:true})
    }
    setRadioState({...radioState, scUrl:url})
  }

  // Preloader
  const[loaded,setLoaded]=useState(true)
  const [play] = useSound(jingle)

  const preLoad = () => {
    setLoaded(false);
    play();
    setRadioState({...radioState, playing:true})
  }

  const tabInsta = () => {
    const urlInsta = 'https://www.instagram.com/tws_korea/'
    window.open(urlInsta, '_blank');
  }

  return (
    <>
    {loaded? <div style={{position: "absolute",
        height:dimensions.height, width:dimensions.width, zIndex: "10000"}} 
        onClick={preLoad}>
          <FirstLoader/>
        </div>:null}
    <Header showOption={showOption} setShowOption={setShowOption} volume={volume} handleVolumeChange={handleVolumeChange}/>
    <Desktop style={{height:dimensions.height, width:dimensions.width}}>
      <IconDeskManager>
        <Icon onClick={()=>setShow({...show, launcher:true})}>
          <IconCenterImg><IconImg src={icone10} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Launcher</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, insta:true})}>
          <IconCenterImg><IconImg src={icone1} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Instagram</IconTxtDesktop>
        </Icon>
        <Icon onClick={() => openAndLoadRadio('https://soundcloud.com/hanriverlove/sets/r-lofi-beat')}>
          <IconCenterImg><IconImg src={icone6} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>RadioFM</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, mixtape:true})}>
          <IconCenterImg><IconImg src={icone3} alt='icone'/></IconCenterImg>
          <IconTxtDesktop>Tracks</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, tv:true, tvChat:true})}>
          <IconCenterImg><IconImg src={icone2} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>TV Live</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, newsletter:true})}>
          <IconCenterImg><IconImg src={icone4} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Newsletter</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, news:true})}>
          <IconCenterImg><IconImg src={icone9} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>News</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, pomodoro:true})}>
          <IconCenterImg><IconImg src={icone7} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Pomodoro</IconTxtDesktop>
        </Icon>
        {/* <Icon onClick={()=>setShow({...show, weather:true})}> */}
        <Icon style={{cursor:'auto'}}>
          <IconCenterImg><IconImg src={icone11} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Weather</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, discord:true})}>
          <IconCenterImg><IconImg src={icone5} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Discord</IconTxtDesktop>
        </Icon>
        {/* <Icon onClick={()=>setShow({...show, store:true})}> */}
        <Icon style={{cursor:'auto'}}>
          <IconCenterImg><IconImg src={icone8} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Store</IconTxtDesktop>
        </Icon>
      </IconDeskManager>
      {/* <IconDustBin onClick={()=>setShow({...show, dustbin:true})}> */}
      <IconDustBin style={{cursor:'auto'}}>
        <IconCenterImg><IconImg src={icon_dustbin} alt='icone' /></IconCenterImg>
        <IconTxtDesktop>DustBin</IconTxtDesktop>
      </IconDustBin>
      {show.tv? 
        <Draggable handle="strong" bounds="body" onStart={handleHeader} onStop={handleHeader}>
          <WindowTv id={"tv"} style={{zIndex:styleIndex.tv}}>
            <CloseIconWindowTv onClick={()=>setShow({...show, tv:false, tvChat:false})}/>
            <strong><HeaderWindowTv>TWS TV - ????????????</HeaderWindowTv></strong>
            {activeHeader? null: <div style={{position:"absolute", opacity:"0.1", height:"100%", width:"100%", backgroundColor:"black"}}></div>}
            <ContentWindow> 
            <TwitchEmbed id="twitch-embed">
              <iframe title="livetwitch" 
                src="https://player.twitch.tv/?channel=tws_walk&parent=timews.github.io" 
                // src="https://player.twitch.tv/?channel=tws_walk&parent=localhost" 
                frameBorder="0" allowFullScreen={true} scrolling="no" 
                height="100%" width="100%">
              </iframe>
            </TwitchEmbed>
            </ContentWindow>
          </WindowTv>
        </Draggable>
        :null
      }
      {show.tvChat? 
        <Draggable handle="strong" bounds="body" onStart={handleHeader} onStop={handleHeader}>
          <WindowTvChat id={"tvChat"} style={{zIndex:styleIndex.tvChat}}>
            <CloseIconWindowTvChat onClick={()=>setShow({...show, tvChat:false})}/>
            <strong><HeaderWindowTvChat>TWS CHAT</HeaderWindowTvChat></strong>
            {activeHeader? null: <div style={{position:"absolute", opacity:"0.1", height:"100%", width:"100%", backgroundColor:"black"}}></div>}
            <ContentWindow style={{marginTop:"25px", height:"100%"}}> 
              <div id="twitch-embed-chat" style={{height:"100%", width:"100%"}}>
                <iframe title="chattwitch"
                  id="chat_embed"
                  src="https://www.twitch.tv/embed/otplol_/chat?parent=timews.github.io&darkpopout"
                  // src="https://www.twitch.tv/embed/tws_walk/chat?parent=localhost&darkpopout"
                  height="94%"
                  width="99.2%">
                </iframe>
              </div>
            </ContentWindow>
          </WindowTvChat>
        </Draggable>
        :null
      }
      {show.mixtape? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <WindowMixtape id={"mixtape"} style={{zIndex:styleIndex.mixtape}} onClick={handleIndex}>
            <div style={{position:"sticky", top:"0px", width:"100%"}}>
              <CloseIconWindow onClick={()=>setShow({...show, mixtape:false})}/>
              <strong><HeaderWindow>MIXTAPES</HeaderWindow></strong>
            </div>
            <ContentWindow>
              <MixtapeWindow>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>                        
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Lo-Fi</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/ihatemodels/a1-eternal-loneliness?in=ihatemodels/sets/totsuka-no-tsurugi-artscore02')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Don Dada</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/dzinc/1-hour-studio-ghibli-lofi-hip-hop-mix')}>                       
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Alex</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Theo</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Pape</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Jefe</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>Cor??e</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>France</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>?????????</IconTxtWindows>
                </Icon>
                <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                  <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                  <IconTxtWindows>??????</IconTxtWindows>
                </Icon>
                <Icon></Icon>
              </MixtapeWindow>
            </ContentWindow>
          </WindowMixtape>
        </Draggable>
        :null
      }
      {show.launcher? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <WindowMain id={"launcher"} style={{zIndex:styleIndex.launcher}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, launcher:false})}/>
            <strong><HeaderWindow>TIME WELL SPENT</HeaderWindow></strong>
            <ContentWindow>
              <HomeWindow>
                <MainImg autoPlay loop muted>
                      <source src={tws_home} type='video/mp4'/>
                </MainImg>
                {/* <MainImg>
                  <img style={{width:"388px"}} src={giphy} alt="/"></img>
                </MainImg> */}
                <MainButtons>
                  <Icon onClick={()=>setShow({...show, store:true})}>
                    <IconCenterImg><IconImg src={icone8} alt='icone' /></IconCenterImg>
                    <IconTxtWindows>Store</IconTxtWindows>
                  </Icon>
                </MainButtons>
                <MainButtons>
                  <Icon onClick={()=>setShow({...show, tv:true, tvChat:true})}>
                    <IconCenterImg><IconImg src={icone2} alt='icone' /></IconCenterImg>
                    <IconTxtWindows>TV Live</IconTxtWindows>
                  </Icon>
                </MainButtons>
                <MainButtons>
                  <Icon onClick={()=>setShow({...show, radio:true})}>
                    <IconCenterImg><IconImg src={icone6} alt='icone' /></IconCenterImg>
                    <IconTxtWindows>RadioFM</IconTxtWindows>
                  </Icon>
                </MainButtons>
                <MainButtons>
                  <Icon onClick={()=>setShow({...show, insta:true})}>
                    <IconCenterImg><IconImg src={icone1} alt='icone' /></IconCenterImg>
                    <IconTxtWindows>Instagram</IconTxtWindows>
                  </Icon>
                </MainButtons>
                <MainButtons>
                  <Icon onClick={()=>setShow({...show, form:true})}>
                    <IconCenterImg><IconImg src={icone4} alt='icone' /></IconCenterImg>
                    <IconTxtWindows>Newsletter</IconTxtWindows>
                  </Icon>
                </MainButtons>
              </HomeWindow>
            </ContentWindow>
          </WindowMain>
        </Draggable>
        :null
      }
      {show.pomodoro? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <WindowPomodoro id={"pomodoro"} style={{zIndex:styleIndex.pomodoro}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, pomodoro:false})}/>
            <strong><HeaderWindow>POMODORO TIMER</HeaderWindow></strong>
            <ContentWindow> 
              <Pomodoro />
            </ContentWindow>
          </WindowPomodoro>
        </Draggable>
        :null
      }
      {show.audioPlayer? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <WindowAudioPlayer id={"audioPlayer"} style={{zIndex:styleIndex.audioPlayer}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, audioPlayer:false})}/>
            <strong><HeaderWindow>AUDIO PLAYER</HeaderWindow></strong>
            <ContentWindow>
              <ScAudioPlayer playerState={audioState} setPlayerState={setAudioState} volume={volume}/>
            </ContentWindow>
          </WindowAudioPlayer>
        </Draggable> 
        :null
      }
      {show.radio? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <WindowRadio id={"radio"} style={{zIndex:styleIndex.radio}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, radio:false})}/>
            <strong><HeaderWindow>RADIO FM</HeaderWindow></strong>
            <ScRadio playerState={radioState} setPlayerState={setRadioState} volume={volume}/>
            {/* <br/>
            <input type='range' min={0} max={1} step='any'
              value={volume} 
              onChange={handleVolumeChange}
              style={{cursor:"grab"}} 
            /> */}
          </WindowRadio>
        </Draggable> 
        :null
      }
      {show.news? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <Window id={"news"} style={{zIndex:styleIndex.news, top:"30vh", left:"10vw"}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, news:false})}/>
            <strong><HeaderWindow>NEWS</HeaderWindow></strong>
            <ContentWindow>
              <div style={{color:"white"}}>
                <span>Coming Soon in v1.1</span>
                <ul>
                  <li>Clean Music features</li>
                  <li>Pomodoro update</li>
                </ul>
                <span>Coming in v1.2</span>
                <ul>
                  <li>Weather update</li>
                  <li>Session Login</li>
                  <li>Theme</li>
                </ul>
                <span>This is not an exhaustive list, follow us on SNS for more!</span><br/>
                <span>Right click, sound effects, store... many things are coming on the website</span><br/>
                <span>Join the Discord to contribute :)</span><br/>
                <span>TIME WELL SPENT</span>
              </div>
            </ContentWindow>
          </Window>
        </Draggable> 
        :null
      }
      {show.newsletter? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <Window id={"newsletter"} style={{zIndex:styleIndex.newsletter, height:"100px", top:"15vh", left:"15vw"}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, newsletter:false})}/>
            <strong><HeaderWindow>NEWSLETTER</HeaderWindow></strong>
            <ContentWindow>
              <span style={{color:"white"}}>Nothing here... check the news and our SNS
               to get updates from us!<br/>
               We will ask you your email when the login session would be updated :)</span>
            </ContentWindow>
          </Window>
        </Draggable> 
        :null
      }
      {showOption.contact? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <Window id={"contact"} style={{zIndex:styleIndex.contact}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShowOption({...showOption, contact:false})}/>
            <strong><HeaderWindow>CONTACT US</HeaderWindow></strong>
            <ContentWindow style={{color:'white'}}>
              <span>We don't believe in boring emails discussion, join our discord or DM us on SNS :)</span><br/>
              <span>We don't believe in boring emails discussion, join our discord or DM us on SNS :)</span><br/>
              <span>We don't believe in boring emails discussion, join our discord or DM us on SNS :)</span><br/>
              <span>We don't believe in boring emails discussion, join our discord or DM us on SNS :)</span><br/>
              <span>We don't believe in boring emails discussion, join our discord or DM us on SNS :)</span><br/>
              <span>We don't believe in boring emails discussion, join our discord or DM us on SNS :)</span><br/>
            </ContentWindow>
          </Window>
        </Draggable> 
        :null
      }
      {showOption.about? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <Window id={"about"} style={{zIndex:styleIndex.about}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShowOption({...showOption, about:false})}/>
            <strong><HeaderWindow>ABOUT</HeaderWindow></strong>
            <ContentWindow>
              <ContentWindowAbout>
              Hi, welcome on Time Well Spent :)<br/>
              Hope you will enjoy our website!<br/>
              Listen to our music and the playlist we picked for you.
              Join our community on Discord, follow us on Instagram, 
              check our store and be aware of what is coming up 
              here and later through the news and SNS!<br/>
              Read our Privacy Policy..
              </ContentWindowAbout>
            </ContentWindow>
          </Window>
        </Draggable> 
        :null
      }
      {show.insta?
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <WindowInsta id={"insta"} style={{zIndex:styleIndex.insta}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, insta:false})}/>
            <strong><HeaderWindow>INSTAGRAM</HeaderWindow></strong>
            <ContentWindow>
              {/* <iframe title="instagram" width="320" height="440" src="" frameborder="0"></iframe> */}
              <img style={{imageRendering:"pixelated"}} src={instaQR} alt=''/>
              <button style={{width:"100%", fontSize:"9px"}} onClick={tabInsta}>CLICK TO OPEN INSTAGRAM IN A NEW TAB</button>
            </ContentWindow>
          </WindowInsta>
        </Draggable> 
        :null 
      }
      {show.weather? 
        <Draggable handle="strong" bounds="body" onStart={handleIndex}>
          <Window id={"weather"} style={{zIndex:styleIndex.weather}} onClick={handleIndex}>
            <CloseIconWindow onClick={()=>setShow({...show, weather:false})}/>
            <strong><HeaderWindow>WEATHER</HeaderWindow></strong>
            <ContentWindow>
              <WeatherAPI/>
            </ContentWindow>
          </Window>
        </Draggable> 
        :null
      }
    </Desktop>
    </>
  );
}

export default Home;
