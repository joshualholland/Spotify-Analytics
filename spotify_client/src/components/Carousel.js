import React from 'react';
import Genre from './Genre';
import Decades from './Decades';
import Other from './Other';

const Carousel = () => {
    return (
        <div id="demo" className="carousel slide">


            <ul className="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" className="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
            </ul>

            <div className="carousel-inner">
                <div className="carousel-item active">
                    <Genre />
                </div>
                <div className="carousel-item">
                    <Decades />
                </div>
                <div className="carousel-item">
                    <Other />
                </div>
            </div>


            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next">
                <span className="carousel-control-next-icon"></span>
            </a>
        </div>

    )
}

export default Carousel;