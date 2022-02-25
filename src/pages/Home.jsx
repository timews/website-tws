import React, {useState} from 'react'
import Draggable from 'react-draggable'
import useSound from 'use-sound';

import Header from '../components/Header'
import Pomodoro from '../components/Pomodoro'
import ScAudioPlayer from '../components/ScAudioPlayer'
import FirstLoader from '../components/FirstLoader'

import {Desktop, Icon, IconCenterImg, IconImg, IconTxtDesktop, MainImg,
    Window, HomeWindow, CloseIconWindow, HeaderWindow, IconTxtWindows,
    ContentWindow, MixtapeWindow, WindowTV, WindowTvChat, WindowMain,
    WindowMixtape, WindowAudioPlayer, WindowPomodoro, MainButtons,
    IconDustBin, IconDeskManager, ContentWindowAbout} 
    from './HomeStyleComponents'

import {icone1, icone2, icone3, icone4, icone5, icone6, 
    icone7, icone8, icone9, icone10, icon_dustbin, icon_cd} 
    from '../assets/icones/index.jsx'

import tws_home from '../assets/home_tws.mp4'
import jingle from '../assets/audios/dondadamixtape.mp3'

function Home() {
  const[loaded,setLoaded]=useState(true);
  const [play] = useSound(jingle)

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
    radio:false,
    tv:false,
    tvChat:false,
    newsletter:false,
    news:false,
    insta:false,
    store:false,
    discord:false,
    dustbin:false
  })

  const[volume,setVolume]=useState(0.8)

  function handleVolumeChange(e) {
    setVolume(parseFloat(e.target.value))
  }

  const[playerState,setPlayerState]=useState({
    scUrl:'',
    playing:false,
    volume:0.8,
    played:0,
    duration:0,
    seeking:false
  })

  function openAndLoad(url){
    if(!show.audioPlayer){
      setShow({...show, audioPlayer:true})
    }
    setPlayerState({...playerState, scUrl:url, played: 0})
  }

  function preLoad(){
    setLoaded(false);
    play();
  }

  return (
    <>
    {loaded? <div style={{position: "absolute",
           height: "100vh", width: "100%",zIndex: "10000"}} 
           onClick={preLoad}>
             <FirstLoader/>
            </div>:null}
    <Header showOption={showOption} setShowOption={setShowOption}/>
    <Desktop>
      <IconDeskManager>
        <Icon onClick={()=>setShow({...show, launcher:true})}>
          <IconCenterImg><IconImg src={icone10} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Launcher</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, insta:true})}>
          <IconCenterImg><IconImg src={icone1} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Instagram</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, radio:true})}>
          <IconCenterImg><IconImg src={icone6} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>RadioFM</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, mixtape:true})}>
          {/* rajouter un le z-index onClick pour remettre les fenêtres en avant */}
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
        <Icon onClick={()=>setShow({...show, store:true})}>
          <IconCenterImg><IconImg src={icone8} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Store</IconTxtDesktop>
        </Icon>
        <Icon onClick={()=>setShow({...show, discord:true})}>
          <IconCenterImg><IconImg src={icone5} alt='icone' /></IconCenterImg>
          <IconTxtDesktop>Discord</IconTxtDesktop>
        </Icon>
      </IconDeskManager>
      <IconDustBin onClick={()=>setShow({...show, dustbin:true})}>
        <IconCenterImg><IconImg src={icon_dustbin} alt='icone' /></IconCenterImg>
        <IconTxtDesktop>DustBin</IconTxtDesktop>
      </IconDustBin>
      {show.tv? <Draggable handle="strong" bounds="body">
                  <WindowTV>
                    <CloseIconWindow onClick={()=>setShow({...show, tv:false, tvChat:false})}/>
                    <strong><HeaderWindow>TWS TV - 텔레비전</HeaderWindow></strong>
                    <ContentWindow> 
                    <div id="twitch-embed">
                      <iframe title="livetwitch" 
                        src="https://player.twitch.tv/?channel=otplol_&parent=timews.github.io&parent=github.io" 
                        frameBorder="0" allowFullScreen={true} scrolling="no" 
                        height="350" width="620">
                      </iframe>
                    </div>
                    </ContentWindow>
                  </WindowTV>
                </Draggable>
                :null
      }
      {show.tvChat? <Draggable handle="strong" bounds="body">
            <WindowTvChat>
              <CloseIconWindow onClick={()=>setShow({...show, tvChat:false})}/>
              <strong><HeaderWindow>TWS Chat</HeaderWindow></strong>
              <ContentWindow> 
              <div id="twitch-embed-chat">
                <iframe title="chattwitch"
                  id="chat_embed"
                  src="https://www.twitch.tv/embed/otplol_/chat?parent=timews.github.io&darkpopout"
                  height="500"
                  width="375">
                </iframe>
              </div>
              </ContentWindow>
            </WindowTvChat>
          </Draggable>
                :null
      }
      {/*<audio controls autoPlay><source src={testaudio} type="audio/mpeg"></source></audio>*/}
      {show.mixtape? <Draggable handle="strong" bounds="body">
                <WindowMixtape>
                  <div style={{position:"sticky", top:"0px"}}>
                    <CloseIconWindow onClick={()=>setShow({...show, mixtape:false})}/>
                    <strong><HeaderWindow>Mixtapes</HeaderWindow></strong>
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
                      <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>                       
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
                        <IconTxtWindows>Corée</IconTxtWindows>
                      </Icon>
                      <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                        <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                        <IconTxtWindows>France</IconTxtWindows>
                      </Icon>
                      <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                        <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                        <IconTxtWindows>프랑스</IconTxtWindows>
                      </Icon>
                      <Icon onClick={() => openAndLoad('https://soundcloud.com/tolsk/lofi-gaming-chill?si=76fec7befa3949aaabfe27037d3e3b3b')}>
                        <IconCenterImg><IconImg src={icon_cd} alt='icon' /></IconCenterImg>
                        <IconTxtWindows>한국</IconTxtWindows>
                      </Icon>
                      <Icon></Icon>
                    </MixtapeWindow>
                  </ContentWindow>
                </WindowMixtape>
              </Draggable>
            :null
      }
      {show.launcher? <Draggable handle="strong" bounds="body">
                <WindowMain>
                  <CloseIconWindow onClick={()=>setShow({...show, launcher:false})}/>
                  <strong><HeaderWindow>TIME WELL SPENT</HeaderWindow></strong>
                  <ContentWindow>
                    <HomeWindow>
                      <MainImg autoPlay loop muted>
                            <source src={tws_home} type='video/mp4'/>
                      </MainImg>
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
      {show.pomodoro? <Draggable handle="strong" bounds="body">
                <WindowPomodoro>
                  <CloseIconWindow onClick={()=>setShow({...show, pomodoro:false})}/>
                  <strong><HeaderWindow>Pomodoro Timer</HeaderWindow></strong>
                  <ContentWindow> 
                    <Pomodoro />
                  </ContentWindow>
                </WindowPomodoro>
              </Draggable>
            :null
      }
      {show.audioPlayer? <Draggable handle="strong" bounds="body">
                <WindowAudioPlayer>
                  <CloseIconWindow onClick={()=>setShow({...show, audioPlayer:false})}/>
                  <strong><HeaderWindow>AudioPlayer</HeaderWindow></strong>
                  <ContentWindow>
                    <ScAudioPlayer playerState={playerState} setPlayerState={setPlayerState} volume={volume}/>
                    <br/>
                    <input type='range' min={0} max={1} step='any'
                      value={volume} 
                      onChange={handleVolumeChange} 
                    />
                  </ContentWindow>
                </WindowAudioPlayer>
              </Draggable> 
            :null
      }
      {show.radio? <Draggable handle="strong" bounds="body">
                <Window>
                  <CloseIconWindow onClick={()=>setShow({...show, radio:false})}/>
                  <strong><HeaderWindow>RADIO FM</HeaderWindow></strong>
                  <ContentWindow>
                    Radio Tracks
                  </ContentWindow>
                </Window>
              </Draggable> 
            :null
      }
      {show.news? <Draggable handle="strong" bounds="body">
                <Window>
                  <CloseIconWindow onClick={()=>setShow({...show, news:false})}/>
                  <strong><HeaderWindow>NEWS</HeaderWindow></strong>
                  <ContentWindow>
                    NEWS, LOGS AND ROADMAP
                  </ContentWindow>
                </Window>
              </Draggable> 
            :null
      }
      {show.newsletter? <Draggable handle="strong" bounds="body">
                <Window>
                  <CloseIconWindow onClick={()=>setShow({...show, newsletter:false})}/>
                  <strong><HeaderWindow>Newsletter</HeaderWindow></strong>
                  <ContentWindow>
                    let us your email to be update about our news, 
                    our website updates or our drops on the store
                  </ContentWindow>
                </Window>
              </Draggable> 
            :null
      }
      {showOption.contact? <Draggable handle="strong" bounds="body">
                <Window>
                  <CloseIconWindow onClick={()=>setShowOption({...showOption, contact:false})}/>
                  <strong><HeaderWindow>Contact Us</HeaderWindow></strong>
                  <ContentWindow>
                  </ContentWindow>
                </Window>
              </Draggable> 
            :null
      }
      {showOption.about? <Draggable handle="strong" bounds="body">
                <Window>
                  <CloseIconWindow onClick={()=>setShowOption({...showOption, about:false})}/>
                  <strong><HeaderWindow>About</HeaderWindow></strong>
                  <ContentWindow>
                    <ContentWindowAbout>
                    Hi, welcome on Time Well Spent :)<br/>
                    Hope you will enjoy our website!<br/>
                    Listen to our music and the playlist we picked for you.
                    Join our community on Discord, follow us on Instagram, 
                    check our store and be aware of what is coming up 
                    here and later through the news 
                    and our newsletter!<br/>
                    Powered by SoundCloud and Twitch.<br/>
                    Developped by Théo J.
                    Inspiration from Poolsuite.net & windows93.net
                    Read our Privacy Policy
                    </ContentWindowAbout>
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
