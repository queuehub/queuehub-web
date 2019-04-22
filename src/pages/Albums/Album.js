import React, { useEffect, useState } from 'react'
import { spotify } from '../../data/spotify'
import { addSong } from '../../data/api'
import { Subscribe } from 'unstated'
import { RoomContainer } from '../../store/room'
import AlbumCover from '../../components/Album'

import extractAlbum from '../../data/extractors/album'
import AddList from '../../components/Songs/AddList'

const Album = (props) => {
  const {
    match
  } = props 
  
  const [album, setAlbum] = useState({})
  const [loading, setLoading] = useState(true)
  useEffect(function retreive(){
    spotify.getAlbum(match.params.id).then(res => {
      const album = extractAlbum(res)
      setAlbum(album)

      setLoading(false)
    })
  }, [])
  

  if(loading) {
    return <div>Loading...</div>
  } else {
    return (
      <Subscribe to={[RoomContainer]}>
        {
          room => (
            <div style={{ width: '100%' }}>
              <AlbumCover dim={250} {...album} />
              <AddList 
                style={{ width: '100%' }}
                songs={album.songs}
                onAdd={song => addSong(room.state.name, song)}
              />
            </div>
          )
        }
      </Subscribe>
    )
  } 
}

export default Album 
