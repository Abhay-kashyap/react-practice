import React, { useEffect,useState } from 'react'
import useAuth from './useAuth'
import Player from "./Player"
import TrackSearchResult from "./TrackSearchResult"
import {Container,Form} from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
// import axios from "axios"

const spotifyApi =new SpotifyWebApi({
    clientId:"8ac210cc6b2d4cbbac0329dcd968e1cd"
})

export default function Dashboard({code}){
    const accessToken=useAuth(code)
    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);

    useEffect(()=>{
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    },[accessToken])

    useEffect(() => {
        if (!search) return setSearchResult([])
        if (!accessToken) return
    
        let cancel = false
        spotifyApi.searchTracks(search).then(res => {
          if (cancel) return
          setSearchResult(
            res.body.tracks.items.map(track => {
              const smallestAlbumImage = track.album.images.reduce(
                (smallest, image) => {
                  if (image.height < smallest.height) return image
                  return smallest
                },
                track.album.images[0]
              )
                  console.log("Track",track)
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.uri,
                albumUrl: smallestAlbumImage.url,
              }
            })
          )
        })
    
        return () => (cancel = true)
        
      }, [search, accessToken])

      console.log("Search Result",searchResult)

      const chooseTrack = ()=>{

      }
    

    return(
        <Container className='d-flex flex-column py-2' style={{height:'100vh'}}>
            <Form.Control placeholder="Search Songs/Artists" type="search" 
            value={search}
            onChange= {(e)=>setSearch(e.target.value)}/>
            <div className="flex-grow-1 my-2" style={{overflow:'auto'}}>Songs
            {searchResult.map(track =>
             (
                <TrackSearchResult track={track}
                key={track.uri}
                chooseTrack={chooseTrack}
                />
            ))}
            {searchResult.length === 0 && (
          <div className="text-center" style={{ whiteSpace: "pre" }}>
            {/* {lyrics} */}
          </div>
        )}
      </div>
      <div>
        {
          searchResult?.map(track=>(
            <Player accessToken={accessToken} trackUri={track?.uri} />
          ))
        }
      </div>
        </Container>
    )
}