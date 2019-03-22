import React, { Component } from 'react';
import './css/Home.css';
import SpotifyWebApi from 'spotify-web-api-js';
import Genre from './Genre';
import Decades from './Decades';
import Other from './Other';


const spotifyApi = new SpotifyWebApi();

class Home extends Component {
    constructor() {
        super();
        const params = this.getHashParams();
        const token = params.access_token;
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            loggedIn: token ? true : false,
            nowPlaying: {
                name: 'Not Checked',
                albumArt: '',
                artist: null,
                url: null,
                id: null
            },
            me: {
                display_name: null,
                profile_img: null,
                followers: null
            },
        }
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        console.log(hashParams)
        return hashParams;
    }

    async componentDidMount() {
        try {
            let song = await spotifyApi.getMyCurrentPlaybackState();
            this.setState({
                nowPlaying: {
                    name: song.item.name,
                    albumArt: song.item.album.images[0].url,
                    artist: song.item.artists[0].name,
                    url: song.item.external_urls.spotify,
                    id: song.item.id
                }
            });

            let me = await spotifyApi.getMe();
            this.setState({
                me: {
                    display_name: me.display_name,
                    profile_img: me.images[0].url,
                    followers: me.followers.total
                }
            });

            let audio = await spotifyApi.getAudioAnalysisForTrack(this.state.nowPlaying.id);
            console.log(audio)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className="Home">
                <div className='me p-5'>
                    <img className='me-pic mr-3' alt='profile' src={this.state.me.profile_img} />
                    <div className='me-text'>
                        <h3 className='text-white'>{this.state.me.display_name}</h3>
                        <h5 className='text-white'>Followers: {this.state.me.followers}</h5>
                    </div>
                </div>
                <ul className='genre-button list-unstyled'>
                    <li className='genre'>Analytics</li>
                </ul>
                <div className='analytics text-center'>
                    <Genre />
                    <Decades />
                    <Other />
                </div>
                <footer className='footer mt-5'>
                    <div className='song-container'>
                        <img className='song-img m-3' alt='album art' src={this.state.nowPlaying.albumArt} />
                        <div className='song-title'>
                            {this.state.nowPlaying.name}
                            <div className='song-artist'>
                                {this.state.nowPlaying.artist}
                            </div>
                        </div>
                    </div>
                    <div className='player text-center'>
                        <audio controls src={this.state.nowPlaying.url}>
                        </audio>
                    </div>
                </footer>
            </div>

        );
    }
}

export default Home;