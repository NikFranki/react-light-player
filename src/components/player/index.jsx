import React, { Component } from 'react';
import MkpChromeTop from './chrometop';
import MkpBezel from './bezel';
import MkpPopup from './popup';
import Video from './video';
import ControlBar from './control-bar';
import Preview from './preview';
import cn from '../../util/classname';
import { getTime, debounce } from '../../util';
import './index.less';

export default class ReactLightPlayer extends Component {
    video = null;
    mkpChromeBottom = null;
    mkpChromeTop = null;
    player = null;
    mkpPopup = null;
    processSlider = null;
    mkpBazelText = null;
    preview = null;

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
        src:
            [
                { title: 'pop star', src: 'http://qiniu.sevenyuan.cn/POP_STARS.mp4' },
                { title: 'league', src: 'http://qiniu.sevenyuan.cn/2019.mp4' },
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
        speedIndex: 3,
        isShowTheaterMode: false,
    };

    handleShowTheaterMode = isShow => {
        this.setState({
            isShowTheaterMode: isShow,
        });
    };

    mkpChromeControl = () => {
        clearTimeout(this.timeouter);
        this.mkpChromeBottom.setState({ isShowMkpChromeBottom: true });
        this.mkpChromeTop.setState({ isShowMkpChromeTop: true });
        this.video.video.style.cursor = 'unset';
        this.timeouter = setTimeout(() => {
            if (this.state.showSettingItems) {
                return;
            }
            // this.mkpChromeBottom.setState({ isShowMkpChromeBottom: false });
            this.mkpChromeTop.setState({ isShowMkpChromeTop: false });
            this.video.video.style.cursor = 'none';
        }, 7000);
    };

    componentDidMount() {
        this.mkpChromeControl();
        this.player.addEventListener('mousemove', this.mkpChromeControl, false);
    }

    componentWillUnmount() {
        this.player.addEventListener('mousemove', this.mkpChromeControl, false);
    }

    haneleSettings = () => {
        clearTimeout(this.timeouter);
        this.mkpChromeBottom.setState({ isShowMkpChromeBottom: true });
        this.mkpChromeTop.setState({ isShowMkpChromeTop: true });
        this.setState({ showSettingItems: !this.state.showSettingItems });
    };

    handleAutoPlay = checked => {
        this.setState({
            autoPlay: checked,
        });
    };

    handleSpeedSelect = (item, index) => {
        this.setState({ speedIndex: index });
        this.video.video.playbackRate = item === '正常' ? 1 : parseFloat(item);
    };

    setProcessByPostion = position => {
        const duration = this.state.duration;
        const currentTime = Math.round(position * duration);
        this.video.video.currentTime = currentTime;
        this.video.setState({
            currentTime,
        });
        this.setState({
            currentTime,
        });
    };

    setProcessByCurTime = currentTime => {
        this.video.video.currentTime = currentTime;
        this.video.setState({
            currentTime,
        });
        this.setState({
            currentTime,
        });
    };

    handleIsPlay = isPlay => {
        this.setState({ isPlay });
    };

    handleIsEnd = isEnd => {
        this.setState({
            isEnd: isEnd,
        });
    };

    handleDuration = duration => {
        this.setState({ duration });
    };

    handleCurrentTime = currentTime => {
        this.setState({ currentTime });
    };

    handleCurPlayIndex = curPlayIndex => {
        this.setState({ curPlayIndex });
    };

    handleTheaterMode = () => {
        this.setState({
            isTheaterMode: !this.state.isTheaterMode,
        });
    };

    handleFullScreen = isFullScreen => {
        if (this.props.onFullscreenChange) {
            this.props.onFullscreenChange(isFullScreen);
        }
    };

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
            disableFullscreenMode,
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
            speedIndex,
            isShowTheaterMode,
        } = this.state;

        const wrapperStyle = {
            display: 'flex',
            width: '100%',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
        };

        return (
            <div
                className={cn('player-wrapper', `${className}`)}
                style={centered && !isTheaterMode ? wrapperStyle : {}}>
                <div
                    style={{ width: width, height: height }}
                    ref={node => (this.player = node)}
                    className={cn(
                        'player',
                        'style-scope',
                        'ytd-watch-flexy',
                        `${isShowTheaterMode ? 'theater-mode' : ''}`,
                    )}>
                    <div
                        id="player-container"
                        className="player-container style-scope mkd-watch-flexy">
                        <div id="container" className="ytd-player style-scope ytd-player">
                            <div
                                id="movie_player"
                                className="html5-video-player mkp-hide-info-bar mkp-fullscreen mkp-large-width-mode mkp-big-mode"
                                aria-label="player">
                                <MkpChromeTop
                                    ref={node => (this.mkpChromeTop = node)}
                                    title={
                                        src instanceof Array
                                            ? src[curPlayIndex]['title']
                                            : this.props.title || ''
                                    }
                                />
                                <MkpPopup
                                    ref={node => (this.mkpPopup = node)}
                                    speeds={speeds}
                                    speedIndex={speedIndex}
                                    autoPlay={autoPlay}
                                    showSettingItems={showSettingItems}
                                    onAutoPlay={this.handleAutoPlay}
                                    onSpeedSelect={this.handleSpeedSelect}
                                />
                                <Preview
                                    ref={node => (this.preview = node)}
                                    currentTime={getTime(currentTime)}
                                />
                                <ControlBar
                                    ref={node => (this.mkpChromeBottom = node)}
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
                                    player={this.player}
                                    onHandleShowTheaterMode={this.handleShowTheaterMode}
                                    video={this.video}
                                    preview={this.preview}
                                    onCurPlayIndex={this.handleCurPlayIndex}
                                    onIsEnd={this.handleIsEnd}
                                    onSettings={this.haneleSettings}
                                    onTheaterMode={this.handleTheaterMode}
                                    onResize={this.resize}
                                    onSetProcessByPosition={this.setProcessByPostion}
                                    onSetProcessByCurTime={this.setProcessByCurTime}
                                    onFullscreenChange={this.handleFullScreen}
                                />
                                <MkpBezel ref={node => (this.mkpBazelText = node)} />
                                <Video
                                    ref={node => (this.video = node)}
                                    src={src}
                                    speeds={speeds}
                                    preload={preload}
                                    isEnd={isEnd}
                                    poster={poster}
                                    volume={volume}
                                    speedIndex={speedIndex}
                                    mkpPopup={this.mkpPopup}
                                    mkpChromeBottom={this.mkpChromeBottom}
                                    mkpBazelText={this.mkpBazelText}
                                    autoPlay={autoPlay}
                                    curPlayIndex={curPlayIndex}
                                    onIsPlay={this.handleIsPlay}
                                    onIsEnd={this.handleIsEnd}
                                    onDuration={this.handleDuration}
                                    onHandleCurrentTime={this.handleCurrentTime}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
