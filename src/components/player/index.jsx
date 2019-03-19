import React, { Component } from 'react';
import MyEmmiter from "../../util/events";
import MkpChromeTop from './chrometop';
import MkpBezel from './bezel';
import MkpPopup from './popup';
import Video from './video';
import ControlBar from './control-bar';
import './index.less';

export default class ReactLightPlayer extends Component {

    static defaultProps = {
        width: 500,
        height: 300,
        centered: false,
        disablePrev: false,
        disableNext: false,
        disableSettings: false,
        disableTheaterMode: false,
        disableFullscreenMode: false,
        autoPlay: false,
        src: [
            { title: 'pop star', src: 'http://qiniu.sevenyuan.cn/POP_STARS.mp4'},
            { title: 'league', src: 'http://qiniu.sevenyuan.cn/2019.mp4'},
        ] || 'http://video.pearvideo.com/mp4/short/20170414/cont-1064146-10369519-ld.mp4',
        speeds: ['0.25', '0.5', '0.75', '正常', '1.25', '1.75', '2'],
        preload: 'auto',
        poster: '',
        className: '',
        volume: 1,
    };

    state = {
        curPlayIndex: 0, // current play index
        isPlay: this.props.autoPlay || false, // false: pause true: play
        isEnd: false,
        isTheaterMode: false,
        duration: 0,
        currentTime: 0,
        showSettingItems: false,
        autoPlay: this.props.autoPlay || false,
        speedIndex: 3
    };

    mkpChromeBottomControl = () => {
        clearTimeout(this.timeouter);
        this.refs.mkpChromeBottom.refs.mkpChromeBottom.classList.add('active');
        this.refs.mkpChromeTop.refs.mkpChromeTop.classList.add('active');
        this.refs.video.refs.video.style.cursor = "unset";
        this.timeouter = setTimeout(() => {
            this.refs.mkpChromeBottom.refs.mkpChromeBottom.classList.remove('active');
            this.refs.mkpChromeTop.refs.mkpChromeTop.classList.remove('active');
            this.refs.video.refs.video.style.cursor = "none";
        }, 7000);
    }

    componentDidMount() {
        MyEmmiter.trigger('changeMessage', 'message');
        this.mkpChromeBottomControl();
        this.refs.player.addEventListener('mousemove', this.mkpChromeBottomControl, false);
    }
    
    componentWillUnmount() {
        this.refs.player.addEventListener('mousemove', this.mkpChromeBottomControl, false);
    }

    haneleSettings = () => {
        this.setState({showSettingItems: !this.state.showSettingItems});
    }

    handleAutoPlay = (checked) => {
        this.setState({
            autoPlay: checked
        });
    }

    handleSpeedSelect = (item, index) => {
        this.setState({ speedIndex: index });
        this.refs.video.refs.video.playbackRate = item === '正常' ? 1 : parseFloat(item);
    }

    setProcess = (position) => {
        const duration = this.state.duration;
        const currentTime = Math.floor(position * duration);
        this.refs.video.refs.video.currentTime = currentTime;
        this.refs.video.setState({
            currentTime
        });
        this.setState({
            currentTime
        });
    }

    handleIsPlay = (isPlay) => {
        this.setState({isPlay});
    }

    handleIsEnd = (isEnd) => {
        this.setState({
            isEnd: isEnd
        });
    }

    handleDuration = (duration) => {
        this.setState({ duration });
    }

    handleCurrentTime = (currentTime) => {
        this.setState({ currentTime });
    }

    handleCurPlayIndex = (curPlayIndex) => {
        this.setState({ curPlayIndex });
    }

    handleTheaterMode = () => {
        this.setState({
            isTheaterMode: !this.state.isTheaterMode
        });
    }

    handleFullScreen = (isFullScreen) =>{
        if (this.props.onFullscreenChange) {
            this.props.onFullscreenChange(isFullScreen);
        }
    }

    render() {
        const {
            className,
            width,
            height,
            centered,
            src,
            volume,
            speeds,
            preload,
            poster,
            disablePrev,
            disableNext,
            disableSettings,
            disableTheaterMode,
            disableFullscreenMode
        } = this.props;

        const { 
            isTheaterMode,
            isPlay,
            isEnd,
            curPlayIndex,
            showSettingItems,
            autoPlay,
            currentTime,
            duration,
            speedIndex
        } = this.state;

        const wrapperStyle = {
            display: 'flex',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        };

        return (
            <div className={`player-wrapper ${className}`} style={centered && !isTheaterMode ? wrapperStyle : {}}>
                <div style={{width: width, height: height}} ref="player" id="player" className="player style-scope ytd-watch-flexy">
                    <div id="player-container" className="player-container style-scope mkd-watch-flexy">
                        <div id="container" className="ytd-player style-scope ytd-player">
                            <div 
                                id="movie_player"
                                className="html5-video-player mkp-hide-info-bar mkp-fullscreen mkp-large-width-mode mkp-big-mode" 
                                aria-label="player"
                                >
                                <MkpChromeTop
                                    ref="mkpChromeTop"
                                    title={
                                        src instanceof Array ?
                                            src[curPlayIndex]['title']
                                        :
                                        (this.props.title || '')
                                    }
                                />
                                <MkpPopup
                                    ref="mkpPopup"
                                    speeds={speeds}
                                    speedIndex={speedIndex}
                                    autoPlay={autoPlay}
                                    showSettingItems={showSettingItems}
                                    onAutoPlay={this.handleAutoPlay}
                                    onSpeedSelect={this.handleSpeedSelect}
                                />
                                <ControlBar
                                    ref="mkpChromeBottom"
                                    disablePrev={disablePrev}
                                    disableNext={disableNext}
                                    src={src}
                                    width={width}
                                    volume={volume}
                                    isPlay={isPlay}
                                    isEnd={isEnd}
                                    currentTime={currentTime}
                                    duration={duration}
                                    curPlayIndex={curPlayIndex}
                                    disableSettings={disableSettings}
                                    disableTheaterMode={disableTheaterMode}
                                    disableFullscreenMode={disableFullscreenMode}
                                    isTheaterMode={isTheaterMode}
                                    player={this.refs.player}
                                    video={this.refs.video}
                                    onCurPlayIndex={this.handleCurPlayIndex}
                                    onIsEnd={this.handleIsEnd}
                                    onSettings={this.haneleSettings}
                                    onTheaterMode={this.handleTheaterMode}
                                    onResize={this.resize}
                                    onSetProcess={this.setProcess}
                                    onFullscreenChange={this.handleFullScreen}
                                />
                                <MkpBezel ref="mkp-bazel-text" />
                                <Video
                                    ref="video"
                                    src={src}
                                    speeds={speeds}
                                    preload={preload}
                                    isEnd={isEnd}
                                    poster={poster}
                                    volume={volume}
                                    speedIndex={speedIndex}
                                    mkpPopup={this.refs.mkpPopup}
                                    mkpChromeBottom={this.refs.mkpChromeBottom}
                                    processSlider={this.refs.processSlider}
                                    mkpBazelText={this.refs['mkp-bazel-text']}
                                    autoPlay={autoPlay}
                                    curPlayIndex={curPlayIndex}
                                    onIsPlay={this.handleIsPlay}
                                    onIsEnd={this.handleIsEnd}
                                    onDuration={this.handleDuration}
                                    onCurrentTime={this.handleCurrentTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
