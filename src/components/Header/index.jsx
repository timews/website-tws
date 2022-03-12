import logo from '../../assets/logo.svg'
import speaker from '../../assets/icones/speaker_white.ico'
import styled from 'styled-components'
import {useDate} from '../../utils/hooks'
import {useState} from 'react'
// import Volume from '../../components/Volume'
import { device } from '../../utils/style/device';

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

const HomeLogo = styled.img`
    height:18px;
    width:18px;
`

const ButtonHomeNav = styled.button`
    all: unset;
    border-right: 2px solid #343354;
    padding-left: 10px;
    padding-right: 10px;
    display:flex;
    align-items:center;
    justify-content: center;
    @media ${device.mobileL} {
        padding-left: 0px;
        padding-right: 0px;
    }
`

const SpanButtonHomeNav = styled.span`
    padding-left:15px;
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
    justify-content: center;

    &:nth-child(1){
        border-top: 1px solid #343354;
    }
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
    background-color:red;
    height:100%;
    grid-column:3/4;
    grid-row:2/6;
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

function Header({showOption, setShowOption}) {
    const {date, time} = useDate()
    const[showVolume,setShowVolume]=useState(false)
    const[showMenu,setShowMenu] = useState(false)
    const[showSns,setShowSns] = useState(false)

    return(
        <NavContainer>
            <ButtonHomeNav onClick={()=>setShowMenu(!showMenu)} >
                <HomeLogo src={logo} alt="TWS"/> 
                <SpanButtonHomeNav>TIME WS</SpanButtonHomeNav>
            </ButtonHomeNav>
            <SpaceBetween/>
            <InfoNavVolume onClick={()=>setShowVolume(!showVolume)}>
                    <InfoNavVolumeIcon src={speaker} alt="vol."/>
            </InfoNavVolume>
            <InfoNavTime>{time}</InfoNavTime>
            <InfoNavDate>{date}</InfoNavDate>
            {showVolume? <VolumeExtension><span style={{writingMode: "vertical-rl"}}>Volume</span></VolumeExtension>:null}
            {showMenu? <HomeNav>
                <HomeNavOptions>
                    Login
                </HomeNavOptions>
                <HomeNavOptions>
                    Themes
                </HomeNavOptions>
                <HomeNavOptions onClick={()=>setShowOption({...showOption, contact:true})}>
                    Contact Us
                </HomeNavOptions>
                <HomeNavOptions onClick={()=>setShowSns(!showSns)}>
                    Social Media
                </HomeNavOptions>
                <HomeNavOptions onClick={()=>setShowOption({...showOption, about:true})}>
                    About
                </HomeNavOptions>
                {showSns? <SnsNav>
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