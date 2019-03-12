import React, { Component } from 'react';
import './css/Home.css';
import SpotifyWebApi from 'spotify-web-api-js';
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
            nowPlaying: { name: 'Not Checked', albumArt: '' }
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

    async getNowPlaying() {
        try {
            let result = await spotifyApi.getMyCurrentPlaybackState();
            console.log(result)
            this.setState({
                nowPlaying: {
                    name: result.item.name,
                    albumArt: result.item.album.images[0].url
                }
            })
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        return (
            <div className="Home">
                <div className='card bg-dark' style={{width: 18 + 'rem'}}>
                    <img className='card-img-top' src={this.state.nowPlaying.albumArt} />
                    <div className='card-title text-white'>
                        {this.state.nowPlaying.name}
                    </div>
                    {this.state.loggedIn &&
                        <button className='btn btn-success' onClick={() => this.getNowPlaying()}>
                            Check Now Playing
                    </button>
                    }
                </div>
            </div>

        );
    }
}

export default Home;