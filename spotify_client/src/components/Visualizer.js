import React, { Component } from 'react';
import './css/Visualize.css';

export default class Visualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='Visualize'>
                <div className='song-info-wrapper'>
                    <div className='artist'>Unknown Artist</div>
                    <div className='title'>Unknown Title</div>
                    <div className='album'>Unknown Album</div>
                </div>
                <canvas id='freq' width='1024' height='525'></canvas>
            </div>
        )
    }
};