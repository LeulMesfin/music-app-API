const mongoose = require('mongoose')

// Schema for a Track in the Spotify Web API
const trackSchema = mongoose.Schema (
    {
        spotifyId: {type: String, required: true},
        name: {type: String, required: true},
        artists: [{type: String}],
        album: {type: String},
        uri: {type: String, required: true}
    }
)

// Schema for a Playlist in the Spotify Web API
const playlistSchema = mongoose.Schema (
    {
       name: {type: String, required: true},
       description: {type: String},
       public: {type: Boolean, default: true},
       collaborative: {type: Boolean, default: true},
       tracks: [trackSchema]
    }
)

// Schema for a User in the Spotify Web API
const userSchema = mongoose.Schema (
    {
      email: {type: String, required: true, unique: true},
      playlists: [playlistSchema],
    }, 
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);
module.exports = User;