import React from "react"

export default function TrackSearchResult({track,chooseTrack}){
    function handlePlay(){
        chooseTrack(track)
    }
    return (
        <div className="d-flex m-2 align-items-center" style={{cursor:"pointer",borderBottom:'2px solid #ddd'}} 
            onClick={handlePlay} >
                <img src={track.albumUrl} style={{height:"64px",width:"64px",marginRight:"12px"}}/>
            <div className="ml-3">
                <div style={({fontSize:'18px',color:'#fff'})}>{track.title}</div>
                <div className="f-5" style={{color:'#ddd'}}>{track.artist}
                </div>
             </div>
        </div>
    )
}