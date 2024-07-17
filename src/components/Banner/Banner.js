import React from 'react';
import './Banner.css';

function Banner() {
    return (
        <div className="banner">
            <img src="banner-image.jpg" alt="Video destacado" />
            <div className="banner-content">
                <span className="category">FRONT END</span>
                <h2>Challenge React</h2>
                <p>Haga como miles de programadores que están aprovechando las oportunidades de la transformación digital.</p>
            </div>
        </div>
    );
}

export default Banner;
