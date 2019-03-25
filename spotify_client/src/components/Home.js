import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons';

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
                id: null,
            },
            me: {
                display_name: null,
                profile_img: null,
                followers: null
            },
            progress: null,
            isPaused: false
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
            // console.log(song)
            this.setState({
                nowPlaying: {
                    name: song.item.name,
                    albumArt: song.item.album.images[0].url,
                    artist: song.item.artists[0].name,
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

            let test = await spotifyApi.getMyCurrentPlayingTrack();
            this.setState({
                progress: test.progress_ms
            })
            console.log(test)

            // let audio = await spotifyApi.getAudioAnalysisForTrack(this.state.nowPlaying.id);
            // console.log(audio)
        } catch (e) {
            console.log(e)
        }
    }

    async pauseTrack() {
        try {
            await spotifyApi.pause()
            this.setState({
                isPaused: true
            })
        } catch (e) {
            console.log(e)
        }
    }

    async playTrack() {
        try {
            await spotifyApi.play()
            this.setState({
                isPaused: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    switchButtons() {
        if(this.state.isPaused === false) {
            return(<FontAwesomeIcon type='button' id='play' icon={faPauseCircle} size={"lg"} color={'white'} onClick={e => this.pauseTrack()}/>)
        } else if(this.state.isPaused === true) {
            return(<FontAwesomeIcon type='button' id='play' icon={faPlayCircle} size={"lg"} color={'white'} onClick={e => this.playTrack()}/>)
        }
    }

    render() {
        return (
            <div className="Home">
                <div className='me'>
                    <img className='me-pic ml-3 mt-3' alt='profile' src={this.state.me.profile_img} />
                    <div className='me-text mr-3 mt-3'>
                        <h3 className='text-white'>{this.state.me.display_name}</h3>
                        <h5 className='text-white'>Followers: {this.state.me.followers}</h5>
                    </div>
                </div>
                <ul className='genre-button list-unstyled text-center'>
                    <Link to='/home?:anything' className='toggle mr-4 active'>Analytics</Link>
                    <Link to='/visualize' className='toggle ml-4'>Visualizer</Link>
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
                    <div id='wrapper'>
                        <audio id='mytrack'>

                        </audio>
                        <div id='buttons'>
                            {this.switchButtons()}
                            <span className='text-white' id='currentTime'>0:00</span>/<span className='text-white' id='fullDuration'>0:00</span>
                        </div>
                        <div id='defaultbar'>
                            <div id='progressbar'>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        );
    }
}

export default Home;