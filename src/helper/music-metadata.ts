const MusicMetadata = require('music-metadata')
const fs = require('fs')

export const getArtistAndSongname = async (filename:string) => {
    const metadata = await MusicMetadata.parseFile(`uploads/${filename}`)
    let artist = metadata.common.artist 
        ?    metadata.common.artist 
        :   'Неизвестен'
    let songname = metadata.common.title 
        ? metadata.common.title
        : 'Без названия'
    let duration = metadata.format.duration
        ? metadata.format.duration
        : 0    
    let picture = metadata.common?.picture && metadata.common?.picture[0]
        ? metadata.common.picture[0].data.toString('base64')
        : null
    
    if(picture !== null){
        picture = filename + '.jpg'
        fs.writeFile(`uploads/${picture}`,
        metadata.common.picture[0].data.toString('base64'),
         'base64',
          function(err) {
        console.log(err);
      })
    }
    
    return [artist, songname, duration, picture]
}