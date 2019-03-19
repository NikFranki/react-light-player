import React, { Component } from 'react';
import { Loading } from '../../loading';
import './index.less';

export default class Video extends Component {
    state = {
        isEnd: this.props.isEnd || false,
        showLoading: false,
        duration: 0,
        currentTime: 0,
        showLoading: false,
    };

    resetPlay = (isPlay) => {
        this.setState({
            duration: 0,
            currentTime: 0,
            isPlay,
        });
    }

    getState = () => {
        return this.state;
    }

    playOrPauseVide = () => {
        if (this.props.onIsPlay) {
            this.props.onIsPlay(!this.state.isPlay);
        }
        const { mkpBazelText, mkpChromeBottom } = this.props;
        mkpBazelText.handlePlayStatus(!this.state.isPlay);
        mkpChromeBottom.setState({ isPlay: !this.state.isPlay });
        mkpBazelText.refs['mkp-bazel-text'].classList.add('active');
        let timer = setTimeout(() => {
            mkpBazelText.refs['mkp-bazel-text'].classList.remove('active');
            timer = null;
        }, 500);
        const { isPlay } = this.state;
        if (isPlay) { // play
            this.refs.video.pause();
        } else { // pause
            this.refs.video.play();
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }

    // video start
    handleLoadStart = () => {
        this.refs.video.volume = this.props.volume;
        this.setState({ showLoading: true });
    }

    // handle can play
    handleCanplay = () => {
        if (this.props.onDuration) {
            this.props.onDuration(this.refs.video.duration);
        }
        const { speeds, speedIndex } = this.props;
        this.setState({
            duration: this.refs.video.duration,
            showLoading: false
        });
        this.refs.video.playbackRate = speeds[speedIndex] === '正常' ? 1 : parseFloat(speeds[speedIndex]);
    }

    // video load data
    handleLoadedData = () => {
        if (this.refs.video.readyState === 4) {
            if (this.props.onDuration) {
                this.props.onDuration(this.refs.video.duration);
            }
            this.setState({
                duration: this.refs.video.duration,
                showLoading: false
            });
        }
    }

    // video play update
    handleTimeupdate = () => {
        const { processSlider } = this.props.mkpChromeBottom.refs;
        if (this.state.isPlay) {
            const width = processSlider.refs.slider.getBoundingClientRect().width;
            const position = parseFloat(this.refs.video.currentTime / this.state.duration);
            processSlider.setSliderInnerWidth(position, width);
            if (this.props.onCurrentTime) {
                this.props.onCurrentTime(this.refs.video.currentTime);
            }
            this.setState({
                currentTime: this.refs.video.currentTime
            });
        }
    }

    // video play end
    handleEnded = () => {
        const { autoPlay, mkpChromeBottom, onIsEnd } = this.props;
        if (autoPlay) {
            if (this.props.onCurrentTime) {
                this.props.onCurrentTime(0);
            }
            this.setState({
                currentTime: 0,
                isPlay: false
            });
            mkpChromeBottom.handleNext();
        } else {
            if (onIsEnd) {
                this.setState({ isPlay: false });
                onIsEnd(true);
            }
        }
    }

    handleProgress = () => {
        const { processSlider } = this.props.mkpChromeBottom.refs;
        const sliderWidth = processSlider.refs.slider.getBoundingClientRect().width;
        const position = parseFloat(this.refs.video.buffered.end(0) / this.refs.video.duration);
        processSlider.setSliderInnerLoadedWidth(position, sliderWidth);
    }

    handleEroor = () => {
        console.log('load error');
    }

    render() {
        const { 
            src,
            curPlayIndex,
            preload,
            poster,
            isEnd
        } = this.props;

        const { showLoading } = this.state;
        return (
            <div className="html5-video-container">
                <video
                    ref="video"
                    src={
                        src instanceof Array
                            ?
                            src[curPlayIndex]['src']
                            :
                            src
                    }
                    // src="//mblock-how-tos.oss-cn-shenzhen.aliyuncs.com/9192612040f711e9aed94ba0a7494a91?type=video/mp4"
                    className={`video-stream html5-main-video ${isEnd ? 'play-end' : '' }`}
                    onClick={this.playOrPauseVide}
                    onLoadStart={this.handleLoadStart}
                    onCanPlay={this.handleCanplay}
                    onLoadedData={this.handleLoadedData}
                    onTimeUpdate={this.handleTimeupdate}
                    onEnded={this.handleEnded}
                    onError={this.handleEroor}
                    onProgress={this.handleProgress}
                    autoPlay={this.props.autoPlay}
                    poster={poster}
                    preload={preload}
                >
                    your browser is not supported video
                </video>
                {showLoading && <Loading />}
            </div>
        )
    }
}
