import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
    constructor(props) {
        super(props);

        const album = albumData.find(album => {
            return album.slug === this.props.match.params.slug
        });

        this.state = {
            album: album,
            currentSong: album.songs[0],
            currentTime: 0,
            currentVolume: 1.0,
            duration: album.songs[0].duration,
            isPlaying: false,
            isHovered: false
        };

        this.audioElement = document.createElement('audio');
        this.audioElement.src = album.songs[0].audioSrc;
    }

    componentDidMount() {
        this.eventListeners = {
            timeupdate: e => {
                this.setState({ currentTime: this.audioElement.currentTime });
            },
            durationchange: e => {
                this.setState({ duration: this.audioElement.duration });
            }
        };
        this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    }

    componentWillUnmount() {
        this.audioElement.src = null;
        this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
        this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    }

    play() {
        this.audioElement.play();
        this.setState({ isPlaying: true });
    }

    pause() {
        this.audioElement.pause();
        this.setState({ isPlaying: false });
    }

    setSong(song) {
        this.audioElement.src = song.audioSrc;
        this.setState({ currentSong: song });
    }

    handleSongClick(song) {
        const isSameSong = this.state.currentSong === song;
        if (this.state.isPlaying && isSameSong) {
            this.pause();
        } else {
            if (!isSameSong) { this.setSong(song); }
            this.play();
        }
    }

    handlePrevClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex - 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleNextClick() {
        const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
        const newIndex = Math.max(0, currentIndex + 1);
        const newSong = this.state.album.songs[newIndex];
        this.setSong(newSong);
        this.play();
    }

    handleTimeChange(e) {
        const newTime = this.audioElement.duration * e.target.value;
        this.audioElement.currentTime = newTime;
        this.setState({ currentTime: newTime });
    }

    handleVolumeChange(e) {
        const newVolume = e.target.value;
        this.audioElement.volume = newVolume;
        this.setState({ currentVolume: newVolume })
    }


    onMouseEnter(index) {
        this.setState({ isHovered: index + 1 });
    }

    onMouseLeave(index) {
        this.setState({ isHovered: false });
    }

    showIcons(song, index) {
        if (this.state.isHovered === song) {
            return < span className="icon ion-ios-play" ></span >
        } else if (this.state.currentSong === song && this.state.isPlaying) {
            return < span className="icon ion-ios-pause" ></span >
        } else if (this.state.currentSong === song && !this.state.isPlaying) {
            return < span className="icon ion-ios-play" ></span >
        } else {
            return index + 1;
        }
    }

    formatTime(seconds) {
        const s = Math.floor(seconds % 60);
        const m = Math.floor(seconds / 60);
        const songDuration = m + ":" + s;
        return songDuration;
    }


    render() {
        return (
            <section className="album">
                <section id="album-info">
                    <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
                    <div className="album-details">
                        <h1 id="album-title">{this.state.album.title}</h1>
                        <h2 className="artist">{this.state.album.artist}</h2>
                        <div id="release-info">{this.state.album.releaseInfo}</div>
                    </div>
                </section>
                <table id="song-list">
                    <colgroup>
                        <col id="song-number-column" />
                        <col id="song-title-column" />
                        <col id="song-duration-column" />
                    </colgroup>
                    <tbody>
                        {this.state.album.songs.map((song, index) =>
                            <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.onMouseEnter(index + 1)} onMouseLeave={() => this.onMouseLeave(index + 1)} >
                                <td>{this.showIcons(song, index)}</td>
                                <td>{song.title}</td>
                                <td>{this.formatTime(song.duration)}</td>
                            </tr>

                        )}

                    </tbody>
                </table>
                <PlayerBar isPlaying={this.state.isPlaying} currentSong={this.state.currentSong} currentTime={this.audioElement.currentTime}
                    duration={this.audioElement.duration} handleSongClick={() => this.handleSongClick(this.state.currentSong)} handlePrevClick={() => this.handlePrevClick()} handleNextClick={() => this.handleNextClick()} handleTimeChange={(e) => this.handleTimeChange(e)} formatTime={(e) => this.formatTime(e)} handleVolumeChange={(e) => this.handleVolumeChange(e)} />
            </section>
        );
    }
}

export default Album;