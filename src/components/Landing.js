import React from 'react';

const Landing = () => (
    <section className="landing">
        <div className="bloc-logo">
            <img className="bloc-logo-img" src='assets/images/bloc_jams_logo.png' alt="Bloc Jams logo" />
            <h1 className="hero-title">Turn the music up!</h1>
        </div>

        <section className="selling-points">
            <div className="point">
                <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
                <span className="icons ion-music-note"></span>
            </div>
            <div className="point">
                <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                <p className="point-description">No arbitrary limits. No distractions.</p>
                <span className="icons ion-play"></span>
            </div>
            <div className="point">
                <h2 className="point-title">Mobile enabled</h2>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
                <span className="icons ion-iphone"></span>
            </div>
        </section>
    </section>
);

export default Landing;