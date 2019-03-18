import React, { Component } from 'react';
import './css/Home.css';
import CanvasJSReact from '../utils/canvasjs.react';
import SpotifyWebApi from 'spotify-web-api-js';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

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
                url: null
            },
            me: {
                display_name: null,
                profile_img: null,
                followers: null
            },
            genres: {
                rock: null,
                rap: null,
                soul: null,
                folk: null,
                indie: null,
                classics: null,
                country: null,
                electronic: null,
                other: null
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
                    url: song.item.external_urls.spotify
                }
            });
            console.log(song.item.external_urls.spotify)

            let me = await spotifyApi.getMe();
            this.setState({
                me: {
                    display_name: me.display_name,
                    profile_img: me.images[0].url,
                    followers: me.followers.total
                }
            });

            let genres = await spotifyApi.getMyTopArtists();
            let n = 20;
            let rockArray = [];
            let popArray = [];
            let rapArray = [];
            let soulArray = [];
            let folkArray = [];
            let indieArray = [];
            let classicsArray = [];
            let countryArray = [];
            let electronicArray = [];
            let otherArray = [];
            for (let i = 0; i < n; i++) {
                genres.items[i].genres.forEach(genre => {
                    if (genre.includes('rock') || genre.includes('metal') || genre.includes('post-grunge') || genre.includes('alternative') || genre.includes('punk')) {
                        rockArray.push(genre)
                    } else if (genre.includes('hip hop') || genre.includes('rap')) {
                        rapArray.push(genre)
                    } else if (genre.includes('pop')) {
                        popArray.push(genre)
                    } else if (genre.includes('soul')) {
                        soulArray.push(genre)
                    } else if (genre.includes('folk') || genre.includes('americana') || genre.includes('indiecoustica')) {
                        folkArray.push(genre)
                    } else if (genre.includes('indie') || genre.includes('singer-songwriter')) {
                        indieArray.push(genre)
                    } else if (genre.includes('adult standards') || genre.includes('classic')) {
                        classicsArray.push(genre)
                    } else if (genre.includes('country') || genre.includes('bluegrass') || genre.includes('holler')) {
                        countryArray.push(genre)
                    } else if (genre.includes('mellow') || genre.includes('house') || genre.includes('wave') || genre.includes('escape')) {
                        electronicArray.push(genre)
                    } else (
                        otherArray.push(genre)
                    )
                });
            };

            this.setState({
                genres: {
                    rock: rockArray.length,
                    rap: rapArray.length,
                    soul: soulArray.length,
                    folk: folkArray.length,
                    indie: indieArray.length,
                    classics: classicsArray.length,
                    country: countryArray.length,
                    electronic: electronicArray.length,
                    other: otherArray.length
                }
            });
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        const options = {
            theme: "dark2",
            animationEnabled: true,
            exportFileName: "Top Genres",
            exportEnabled: true,
            title: {
                text: "Top Genres from your library"
            },
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: this.state.genres.rock, label: "Rock" },
                    { y: this.state.genres.rap, label: "Hip Hop" },
                    { y: this.state.genres.indie, label: "Indie" },
                    { y: this.state.genres.folk, label: "Folk" },
                    { y: this.state.genres.soul, label: "Soul" },
                    { y: this.state.genres.classics, label: "Classics" },
                    { y: this.state.genres.country, label: "Country" },
                    { y: this.state.genres.electronic, label: "Electronic" },
                    { y: this.state.genres.other, label: "Other" }
                ]
            }]
        }

        return (
            <div className="Home">
                <div className='me p-5'>
                    <img className='me-pic' alt='profile image' src={this.state.me.profile_img} />
                    <div className='me-text'>
                        <h3 className='text-white'>{this.state.me.display_name}</h3>
                        <h5 className='text-white'>Followers: {this.state.me.followers}</h5>
                    </div>
                </div>
                <div className='genre-chart'>
                    <CanvasJSChart options={options} />
                </div>
                <footer className='fixed-bottom'>
                    <div className='song-container'>
                        <img className='song-img m-3' src={this.state.nowPlaying.albumArt} />
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