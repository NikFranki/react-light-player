import React, { Component } from 'react';
import { Loading } from '../../loading';
import cn from '../../../util/classname';
import './index.less';

export default class Video extends Component {
    video = null;

    state = {
        isEnd: this.props.isEnd || false,
        showLoading: false,
        duration: 0,
        currentTime: 0,
        showLoading: false,
        isVideoMode: false,
    };

    resetPlay = isPlay => {
        this.setState({
            duration: 0,
            currentTime: 0,
            isPlay,
        });
    };

    getState = () => {
        return this.state;
    };

    playOrPauseVide = () => {
        if (this.props.onIsPlay) {
            this.props.onIsPlay(!this.state.isPlay);
        }
        const { mkpBazelText, mkpChromeBottom } = this.props;
        mkpBazelText.handlePlayStatus(!this.state.isPlay);
        mkpChromeBottom.setState({ isPlay: !this.state.isPlay });
        mkpBazelText.setState({ isHide: false });
        let timer = setTimeout(() => {
            mkpBazelText.setState({ isHide: true });
            timer = null;
        }, 500);
        const { isPlay } = this.state;
        if (isPlay) {
            // play
            this.video.pause();
        } else {
            // pause
            this.video.play();
        }
        this.setState({
            isPlay: !this.state.isPlay,
        });
    };

    // video start
    handleLoadStart = () => {
        this.video.volume = this.props.volume;
        this.setState({ showLoading: true });
    };

    // handle can play
    handleCanplay = () => {
        if (this.props.onDuration) {
            this.props.onDuration(this.video.duration);
        }
        const { speeds, speedIndex } = this.props;
        this.setState({
            duration: this.video.duration,
            showLoading: false,
        });
        this.video.playbackRate =
            speeds[speedIndex] === '正常' ? 1 : parseFloat(speeds[speedIndex]);
    };

    // video load data
    handleLoadedData = () => {
        if (this.video.readyState === 4) {
            if (this.props.onDuration) {
                this.props.onDuration(this.video.duration);
            }
            this.setState({
                duration: this.video.duration,
                showLoading: false,
            });
        }
    };

    // video play update
    handleTimeupdate = () => {
        const { processSlider } = this.props.mkpChromeBottom;
        if (this.state.isPlay) {
            const width = processSlider.slider.getBoundingClientRect().width;
            const position = parseFloat(this.video.currentTime / this.state.duration);
            processSlider.setSliderInnerWidth(position, width);
            if (this.props.onHandleCurrentTime) {
                this.props.onHandleCurrentTime(this.video.currentTime);
            }
            this.setState({
                currentTime: this.video.currentTime,
            });
        }
    };

    // video play end
    handleEnded = () => {
        const { autoPlay, mkpChromeBottom, onIsEnd } = this.props;
        if (autoPlay) {
            if (this.props.onHandleCurrentTime) {
                this.props.onHandleCurrentTime(0);
            }
            this.setState({
                currentTime: 0,
                isPlay: false,
            });
            mkpChromeBottom.handleNext();
        } else {
            if (onIsEnd) {
                this.setState({ isPlay: false });
                onIsEnd(true);
            }
        }
    };

    handleProgress = () => {
        const { mkpChromeBottom } = this.props;
        if (mkpChromeBottom) {
            const { processSlider } = mkpChromeBottom;
            const sliderWidth = processSlider && processSlider.slider.getBoundingClientRect().width;
            const position = parseFloat(this.video.buffered.end(0) / this.video.duration);
            processSlider && processSlider.setSliderInnerLoadedWidth(position, sliderWidth);
        }
    };

    handleEroor = () => {
        console.log('load error');
    };

    render() {
        const { src, curPlayIndex, preload, poster, isEnd } = this.props;

        const { isVideoMode } = this.state;

        const { showLoading } = this.state;
        return (
            <div className="html5-video-container">
                <video
                    ref={node => (this.video = node)}
                    src={src instanceof Array ? src[curPlayIndex]['src'] : src}
                    // src="//mblock-how-tos.oss-cn-shenzhen.aliyuncs.com/9192612040f711e9aed94ba0a7494a91?type=video/mp4"
                    className={cn(
                        'video-stream',
                        'html5-main-video',
                        `${isEnd ? 'play-end' : ''}`,
                        `${isVideoMode ? 'video-mode' : ''}`,
                    )}
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
                    preload={preload}>
                    your browser is not supported video
                </video>
                {showLoading && <Loading />}
            </div>
        );
    }
}
