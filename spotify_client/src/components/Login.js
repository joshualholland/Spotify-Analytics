// import React, { Component } from 'react';


// class Login extends Component {
//   constructor() {
//     super();
//     const params = this.getHashParams();
//     this.state = {
//       loggedIn: params.access_token ? true : false
//     }
//   }

//   getHashParams() {
//     var hashParams = {};
//     var e, r = /([^&;=]+)=?([^&;]*)/g,
//         q = window.location.hash.substring(1);
//     while ( e = r.exec(q)) {
//        hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }

//   render() {
//     return (
//       <div className="Login">
//         <a href='http://localhost:8888'>
//           <button className='btn text-white'>Login with Spotify</button>
//         </a>
//       </div>
//     );
//   }
// }

// export default Login;

// import React, { Component } from 'react';
// import './css/Login.css';
// import CanvasJSReact from '../utils/canvasjs.react';

// import SpotifyWebApi from 'spotify-web-api-js';
// const spotifyApi = new SpotifyWebApi();

// const CanvasJS = CanvasJSReact.CanvasJS;
// const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// export default class Login extends Component {
//   constructor() {
//     super()
//     const params = this.getHashParams();
//     const token = params.access_token;
//     if (token) {
//       spotifyApi.setAccessToken(token)
//     };
//     this.state = {
//       loggedIn: params.access_token ? true : false,
//       nowPlaying: { name: '', albumArt: '' }
//     }
//   }

//   getHashParams() {
//     var hashParams = {};
//     var e, r = /([^&;=]+)=?([^&;]*)/g,
//         q = window.location.hash.substring(1);
//     while ( e = r.exec(q)) {
//        hashParams[e[1]] = decodeURIComponent(e[2]);
//     }
//     return hashParams;
//   }

//   getNowPlaying() {
//     spotifyApi.getMyCurrentPlaybackState()
//       .then((res) => {
//         this.setState({
//           nowPlaying: {
//             name: res.item.name,
//             albumArt: res.item.album.images[0]
//           }
//         })
//       })
//   }



//   render() {
//     const options = {
//       theme: "dark2",
//       animationEnabled: true,
//       exportFileName: "New Year Resolutions",
//       exportEnabled: true,
//       title: {
//         text: `Your Top Genres!`
//       },
//       data: [{
//         type: "pie",
//         showInLegend: true,
//         legendText: "{label}",
//         toolTipContent: "{label}: <strong>{y}%</strong>",
//         indexLabel: "{y}%",
//         indexLabelPlacement: "inside",
//         dataPoints: [
//           { y: 32, label: "Health" },
//           { y: 22, label: "Finance" },
//           { y: 15, label: "Education" },
//           { y: 19, label: "Career" },
//           { y: 5, label: "Family" },
//           { y: 7, label: "Real Estate" }
//         ]
//       }]
//     }
//     return (
//       <>
//         <div className="Login">
//           <a href='http://localhost:8888'>
//             <button className='btn text-white'>Login with Spotify</button>
//           </a>
//         </div>
//         <div>
//           <button onClick={() => this.getNowPlaying()}>
//             Check Now Playing
//             </button>
//         </div>
//         <div>
//           Now Playing: {this.state.nowPlaying.name}
//         </div>
//         <div>
//           <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }} alt='Album art' />
//         </div>


//         <div>
//           <CanvasJSChart options={options} />
//         </div>
//       </>
//     )
//   }
// }
