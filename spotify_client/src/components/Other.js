import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

export default class Other extends Component {
    constructor(props) {
        super(props)
        this.state = {
            popularity: null,
            playlists: null,
            main: null,
            top: null
        }
    }

    async componentDidMount() {
        let popularity = await spotifyApi.getMyTopTracks();
        let n = 20;
        let total = 0;
        for (let i = 0; i < n; i++) {
            total += popularity.items[i].popularity;
        };
        total = total / 20;
        this.setState({
            popularity: total
        });

        let playlists = await spotifyApi.getUserPlaylists();
        this.setState({
            playlists: playlists.items.length
        })

        let main = await spotifyApi.getMyTopArtists();
        this.setState({
            main: main.items[0].name
        })

        let top = await spotifyApi.getMyTopTracks();
        this.setState({
            top: top.items[0].name
        })
    };

    render() {
        return (
            <div className='Other mt-4'>
                <div className='card' style={{ width: 45 + '%' }}>
                    <div className='card-body'>
                        <h3 className='card-title text-white'>Other Stats</h3>
                        <hr />
                        <ul className='list-unstyled text-left'>
                            <li className='other-items'>Mainstreamness: {this.state.popularity}%</li>
                            <li className='other-items'>Playlists Followed: {this.state.playlists}</li>
                            <li className='other-items'>Most listened to Artist: {this.state.main}</li>
                            <li className='other-items'>Most listened to Track: {this.state.top}</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}