import React, {useRef} from "react"
import ScReactPlayer from 'react-player/soundcloud'
import Duration from "../Duration"

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

    function handleDuration(dur){
        setPlayerState({...playerState, duration:dur})
    }

    function handleEnded(){
        setPlayerState({...playerState, playing:false})
    }

    return(
        <div>
            <ScReactPlayer 
                style={{display:'none'}} 
                url={playerState.scUrl}
                playing={playerState.playing} 
                volume={volume}
                onProgress={handleProgress}
                onDuration={handleDuration}
                onEnded={handleEnded}
                ref={player}/>
            <button onClick={()=>setPlayerState({...playerState, playing:!playerState.playing, duration:playerState.duration})}>PLAY/PAUSE</button>
            <Duration seconds={playerState.duration * playerState.played}/>
            <input
                type='range' min={0} max={0.999999} step='any'
                value={playerState.played}
                onMouseDown={handleSeekMouseDown}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
            />
            <Duration seconds={playerState.duration}/>
        </div> 
    );
}

export default ScAudioPlayer