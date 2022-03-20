import logo from '../../assets/logo.svg'
import speaker from '../../assets/icones/speaker_white.ico'
import styled from 'styled-components'
import {useDate} from '../../utils/hooks'
import {useState} from 'react'
import { device } from '../../utils/style/device';
import dropDown from '../../assets/icones/dropdown.png'

const NavContainer = styled.nav`
    position:relative;
    color:white;
    border-bottom: 2px solid #343354;
    border-right: 2px solid #343354;
    font-size:16px;
    font-weight:bold;
    width:100%;

    display:grid;
    grid-template-columns: 150px 1fr 32px 62px 116px;
    grid-template-rows: repeat(7, 26px);

    @media ${device.mobileL} {
        display:grid;
        grid-template-columns: 130px 1fr 32px 0px 116px;
        grid-template-rows: repeat(7, 26px);
    }
`

const ButtonHomeNav = styled.button`
    all: unset;
    border-right: 2px solid #343354;
    padding-left: 10px;
    padding-right: 10px;
    display:flex;
    align-items:center;
    justify-content: center;
    cursor:pointer;
    @media ${device.mobileL} {
        padding-left: 0px;
        padding-right: 0px;
    }

    cursor:pointer;
`

const HomeLogo = styled.img`
    height:18px;
    width:18px;
`

const SpanButtonHomeNav = styled.span`
    padding-left:15px;
    padding-right:13px;
`

const HomeIcon = styled.img`
    width:5px;
    height:3px;
    color:white;
    image-rendering:pixelated;
`

const HomeNav = styled.div`
    height:100%;
    grid-column:1/3;
    grid-row:2/6;

    display:grid;
    grid-template-columns: 150px 150px;
    grid-template-rows: repeat(7, 26px);
`

const HomeNavOptions = styled.button`
    all: unset;
    background-color:black;
    grid-column:1;
    border-color:#343354;
    border-style:solid;
    border-width:0 2px 2px 2px;
    display:flex;
    align-items:center;
    padding-left:10px;
    // justify-content: center;

    cursor:pointer;

    &:nth-child(1){
        border-top: 1px solid #343354;
    }

    cursor:pointer;
`

const SnsNav = styled.div`
    grid-column:2;
    grid-row:3/8;
    margin-top:24px;
`

const SnsNavOptions = styled(HomeNavOptions)`
    width:100%;
    height:24px;
    border-left:0px;
    &:nth-child(1){
        border-top:2px solid #343354;
    }
    &:nth-child(3){
        margin-left:-2px;
        border-left:2px solid #343354;
    }
`

const SpaceBetween = styled.span`
    border-right: 2px solid #343354;
`

const InfoNav = styled.span`
    width:100%;
    height:100%;

    font-size:14px;

    display:flex;
    align-items:center;
    justify-content: center;
`

const InfoNavVolume = styled(InfoNav)`
    border-right: 2px solid #343354;
    grid-column:3/4;
    grid-row:1;
    cursor:pointer;
`

const InfoNavVolumeIcon = styled.img`
    height:15px;
    width:15px;
    color:white;
    image-rendering:pixelated;
`

const VolumeExtension = styled.div`
    color:white;
    border: 2px solid #343354;
    background-color:black;
    height:100%;
    grid-column:3/4;
    grid-row:2/6;
    cursor:grab;
`

const InfoNavTime = styled(InfoNav)`
    grid-column:4/5;
    grid-row:1;
    @media ${device.mobileL} {
        display:none;
    }
`

const InfoNavDate = styled(InfoNav)`
    border-left: 2px solid #343354;
    grid-column:5/6;
    grid-row:1;
`

const rangeStyles = `
    background: white;
    height: 2px;
`

const thumbStyles = `
    height:10px;
    width:10px;
    background:purple;
`


const VolumeInput = styled.input`
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg); 

    -webkit-appearance: none;
    -moz-transform-origin: 46px 5px;

    appearance: none;
    background: transparent;
    margin-top: 51px;
    margin-left:-28px;
    width: 85px;
    cursor: grab;

    &::-webkit-slider-runnable-track {
        ${rangeStyles};
    }

    &::-moz-range-track {
        ${rangeStyles};
        width:85px;
    }

    &::-webkit-slider-thumb{
        -webkit-appearance: none;
        margin-top:-4px;
        ${thumbStyles};
    }

    &::-moz-range-thumb{
        border: none;
        border-radius: 0;
        ${thumbStyles};
    }

`

function Header({showOption, setShowOption, volume, handleVolumeChange}) {
    const {date, time} = useDate();

    const[showNav,setShowNav]=useState({
        menu:false,
        volumeNav:false,
        sns:false
    });

    const handleNav = (e) => {
        let tempo = e.currentTarget.id;
        setShowNav(prevState => ({...prevState, [tempo]: !prevState[tempo] }));
        console.log(showNav);
    };

    return(
        <NavContainer>
            <ButtonHomeNav id="menu" onClick={handleNav} >
                <HomeLogo src={logo} alt="TWS"/> 
                <SpanButtonHomeNav>TIME WS</SpanButtonHomeNav>
                {showNav.menu? 
                    <HomeIcon src={dropDown} alt="dropDown" style={{transform:"rotate(180deg)"}}/>
                    : <HomeIcon src={dropDown} alt="dropDown"/>
                }
            </ButtonHomeNav>
            <SpaceBetween/>
            <InfoNavVolume id="volumeNav" onClick={handleNav}>
                    <InfoNavVolumeIcon src={speaker} alt="vol."/>
            </InfoNavVolume>
            <InfoNavTime>{time}</InfoNavTime>
            <InfoNavDate>{date}</InfoNavDate>
            {showNav.volumeNav? <VolumeExtension><VolumeInput type='range' min={0} max={1} step="any"
                      value={volume} 
                      onChange={handleVolumeChange}
                    />
                    </VolumeExtension>:null}
            {showNav.menu? <HomeNav>
                <HomeNavOptions>
                    Login
                </HomeNavOptions>
                <HomeNavOptions>
                    Themes
                </HomeNavOptions>
                <HomeNavOptions onClick={()=>setShowOption({...showOption, contact:true})}>
                    Contact Us
                </HomeNavOptions>
                <HomeNavOptions id='sns' onClick={handleNav}>
                    Social Media
                    {showNav.sns?
                        <HomeIcon src={dropDown} alt="dropDown" style={{transform:"rotate(90deg)", marginLeft:"7px"}}/>
                        : <HomeIcon src={dropDown} alt="dropDown" style={{transform:"rotate(-90deg)", marginLeft:"7px"}}/>
                    }
                </HomeNavOptions>
                <HomeNavOptions onClick={()=>setShowOption({...showOption, about:true})}>
                    About
                </HomeNavOptions>
                {showNav.sns? <SnsNav>
                    <SnsNavOptions>
                        Instagram
                    </SnsNavOptions>
                    <SnsNavOptions>
                        Discord
                    </SnsNavOptions>
                    <SnsNavOptions>
                        Soundcloud
                    </SnsNavOptions>
                </SnsNav>:null}
            </HomeNav>:null}
            
        </NavContainer>
    );
}

export default Header