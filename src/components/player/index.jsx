import React, { Component } from 'react';
import MyEmmiter from "../../util/events";
import MkpChromeTop from './chrometop';
import MkpBezel from './bezel';
import MkpPopup from './popup';
import Video from './video';
import ControlBar from './control-bar';
import './index.less';

export default class Player extends Component {

    static defaultProps = {
        width: 500,
        height: 300,
        centered: false,
        disablePrev: false,
        disableNext: false,
        disableTheaterMode: false,
        autoPlay: false,
        src: [
            { title: 'pop star', src: 'http://qiniu.sevenyuan.cn/POP_STARS.mp4'},
            { title: 'league', src: 'http://qiniu.sevenyuan.cn/2019.mp4'},
        ] || 'http://video.pearvideo.com/mp4/short/20170414/cont-1064146-10369519-ld.mp4',
        speeds: ['0.25', '0.5', '0.75', '正常', '1.25', '1.75', '2']
    };

    state = {
        curPlayIndex: 0, // current play index
        isPlay: this.props.autoPlay || false, // false: pause true: play
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
        this.timeouter = setTimeout(() => {
            this.refs.mkpChromeBottom.refs.mkpChromeBottom.classList.remove('active');
            this.refs.mkpChromeTop.refs.mkpChromeTop.classList.remove('active');
        }, 7000);
    }

    resize = () => {
        const paddingLeft = parseInt(window.getComputedStyle(this.refs.mkpChromeBottom.refs.mkpChromeBottom).paddingLeft.replace(/px/, ''));
        const paddingRight = parseInt(window.getComputedStyle(this.refs.mkpChromeBottom.refs.mkpChromeBottom).paddingRight.replace(/px/, ''));
        const sliderWidth = this.props.width - paddingLeft - paddingRight;
        const innerWidth = this.refs.mkpChromeBottom.refs.processSlider.refs.inner.getBoundingClientRect().width;
        const bodyWidth = document.body.clientWidth - paddingLeft - paddingRight;
        const videoWidth = this.refs.video.refs.video.getBoundingClientRect().width;
        const isFullScreen = document.body.clientWidth === videoWidth;
        const isPressCancelFullscreen = this.refs.mkpChromeBottom.refs.fullscreenBtn.getAttribute('aria-press-cancel') === 'true';
        // 仅当全屏模式下，按esc退出全屏，才执行设置进度
        if (!this.state.isTheaterMode && !isFullScreen && !isPressCancelFullscreen) {
            this.refs.video.handleProgress();
            setTimeout(() => {
                const position = parseFloat(innerWidth / bodyWidth);
                this.refs.mkpChromeBottom.refs.processSlider.setSliderInnerWidth(position, sliderWidth);
            }, 0);
        }
    }
    
    componentDidMount() {
        MyEmmiter.trigger('changeMessage', 'message');
        this.mkpChromeBottomControl();
        this.refs.player.addEventListener('mousemove', this.mkpChromeBottomControl, false);
        window.addEventListener('resize', this.resize, false);
    }
    
    componentWillUnmount() {
        this.refs.player.addEventListener('mousemove', this.mkpChromeBottomControl, false);
        window.removeEventListener('resize', this.resize, false);
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

    render() {
        const {
            width,
            height,
            centered,
            src,
            speeds,
            disablePrev,
            disableNext,
            disableTheaterMode
        } = this.props;

        const { 
            isTheaterMode,
            isPlay,
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
            <div className="player-wrapper" style={centered && !isTheaterMode ? wrapperStyle : {}}>
                <div style={{width: width, height: height}} ref="player" id="player" className="player style-scope ytd-watch-flexy">
                    <div id="player-container" className="player-container style-scope mkd-watch-flexy">
                        <div id="container" className="ytd-player style-scope ytd-player">
                            <div 
                                id="movie_player"
                                className="html5-video-player mkp-hide-info-bar mkp-fullscreen mkp-large-width-mode mkp-big-mode" 
                                aria-label="YouTube 视频播放器"
                                >
                                <MkpChromeTop
                                    ref="mkpChromeTop"
                                    src={src}
                                    curPlayIndex={curPlayIndex}
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
                                    isPlay={isPlay}
                                    currentTime={currentTime}
                                    duration={duration}
                                    curPlayIndex={curPlayIndex}
                                    disableTheaterMode={disableTheaterMode}
                                    isTheaterMode={isTheaterMode}
                                    player={this.refs.player}
                                    video={this.refs.video}
                                    onCurPlayIndex={this.handleCurPlayIndex}
                                    onSettings={this.haneleSettings}
                                    onTheaterMode={this.handleTheaterMode}
                                    onResize={this.resize}
                                    onSetProcess={this.setProcess}
                                />
                                <MkpBezel ref="mkp-bazel-text" />
                                <Video
                                    ref="video"
                                    src={src}
                                    speeds={speeds}
                                    speedIndex={speedIndex}
                                    mkpPopup={this.refs.mkpPopup}
                                    mkpChromeBottom={this.refs.mkpChromeBottom}
                                    processSlider={this.refs.processSlider}
                                    mkpBazelText={this.refs['mkp-bazel-text']}
                                    autoPlay={autoPlay}
                                    curPlayIndex={curPlayIndex}
                                    onIsPlay={this.handleIsPlay}
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
