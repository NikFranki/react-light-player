import React, { Component } from 'react';
import Slider from '../slider';
import cn from '../../../util/classname';
import { getTime } from '../../../util';
import { TooltipHook } from '../../../components/tooltip';
import { PALY_BACK_UP_SPEED, VOLUME_RAISE_OR_DOWN_SPEED } from '../../../constant';
import './index.less';

export default class ControlBar extends Component {
    mkpChromeBottom = null;
    processSlider = null;
    volumeSlider = null;
    volume = null;

    state = {
        curVolume: this.props.volume || 1,
        isPlay: this.props.isPlay || false,
        isShowMkpChromeBottom: false,
        isFullScreen: false,
    };

    handleFullscreenChange = type => {
        ['', 'moz', 'webkit', 'ms'].forEach(prefix => {
            const method = prefix + 'fullscreenchange';
            const emiter = `${type}EventListener`;
            document[emiter](method, e => {
                console.log('lala', method, e.keyCode);
                const { isTheaterMode, onFullscreenChange } = this.props;
                const isFullScreen =
                    this.runPrefixMethod(document, 'FullScreen') ||
                    this.runPrefixMethod(document, 'IsFullScreen');
                const { innerWidth, sliderWidth, bodyWidth } = this.calReleaseWidth();
                this.setState({ isFullScreen });
                if (onFullscreenChange) {
                    onFullscreenChange(isFullScreen);
                }
                if (isFullScreen) {
                    setTimeout(() => {
                        const position = isTheaterMode
                            ? parseFloat(innerWidth / bodyWidth)
                            : parseFloat(innerWidth / sliderWidth);
                        this.processSlider.setSliderInnerWidth(position, bodyWidth);
                        this.processSlider.setSliderInnerLoadedWidth(position, bodyWidth);
                    }, 0);
                } else {
                    setTimeout(() => {
                        const position = parseFloat(innerWidth / bodyWidth);
                        if (isTheaterMode) {
                            this.processSlider.setSliderInnerWidth(position, bodyWidth);
                            this.processSlider.setSliderInnerLoadedWidth(position, bodyWidth);
                        } else {
                            this.processSlider.setSliderInnerWidth(position, sliderWidth);
                            this.processSlider.setSliderInnerLoadedWidth(position, sliderWidth);
                        }
                    }, 0);
                }
            });
        });
    };

    handleKeyEvent = e => {
        const { video } = this.props;
        const { curVolume } = this.state;
        if (e && e.keyCode === 38) {
            // up
            console.log('up');
            this.handleVolumeControl(Number((curVolume + VOLUME_RAISE_OR_DOWN_SPEED).toFixed(2)));
        } else if (e && e.keyCode === 40) {
            // down
            console.log('down');
            this.handleVolumeControl(Number((curVolume - VOLUME_RAISE_OR_DOWN_SPEED).toFixed(2)));
        } else if (e && e.keyCode === 37) {
            // left
            console.log('left');
            this.handleSliderControl('back');
        } else if (e && e.keyCode === 39) {
            // right
            console.log('right');
            this.handleSliderControl('forward');
        } else if (e && e.keyCode === 32) {
            // space space (paly or pause)
            console.log('space');
            video.playOrPauseVide();
            e.preventDefault();
        }
    };

    handleSliderControl = direction => {
        const { isTheaterMode } = this.props;
        const isFullScreen =
            this.runPrefixMethod(document, 'FullScreen') ||
            this.runPrefixMethod(document, 'IsFullScreen');
        const { innerWidth, sliderWidth, bodyWidth } = this.calReleaseWidth();
        this.handleSliderProcess(
            direction,
            innerWidth,
            isTheaterMode || isFullScreen ? bodyWidth : sliderWidth,
            PALY_BACK_UP_SPEED,
        );
    };

    handleSliderProcess = (type, innerWidth, outerWidth, speed) => {
        const { onSetProcessByCurTime, duration, currentTime } = this.props;
        const speedWidth = (outerWidth / duration) * speed; // 每次回退5s
        const timeAction = new Map([
            ['forward', currentTime + speed],
            ['back', currentTime - speed],
        ]);

        let newTime = timeAction.get(type);
        if (newTime <= -speed || newTime >= duration + speed) return;
        if (newTime < 0) {
            newTime = 0;
        } else if (newTime > duration) {
            newTime = duration;
        }

        const innerWidthAction = new Map([
            ['forward', innerWidth + speedWidth],
            ['back', innerWidth - speedWidth],
        ]);
        let curInnerWidth = innerWidthAction.get(type);
        if (curInnerWidth < 0) {
            curInnerWidth = 0;
        } else if (curInnerWidth > outerWidth) {
            curInnerWidth = outerWidth;
        }

        const position = curInnerWidth / outerWidth;
        this.processSlider.setSliderInnerWidth(position, outerWidth);
        onSetProcessByCurTime && onSetProcessByCurTime(newTime);
    };

    componentDidMount() {
        this.setState({ isShowMkpChromeBottom: true }, () => {
            const width = this.volumeSlider.slider.firstChild.getBoundingClientRect().width;
            this.volumeSlider.setSliderInnerWidth(this.props.volume, width);
        });
        this.handleFullscreenChange('add');
        document.addEventListener('keyup', this.handleKeyEvent, false);
    }

    componentWillUnmount() {
        this.handleFullscreenChange('remove');
        document.removeEventListener('keyup', this.handleKeyEvent, false);
    }

    // prev
    handlePrev = () => {
        const { video, curPlayIndex, onCurPlayIndex, src } = this.props;
        this.processSlider.resetSliderInnerWidth();
        this.processSlider.resetSliderInnerLoadedWidth();
        if (src instanceof Array) {
            let prevIndex = curPlayIndex - 1;
            if (prevIndex < 0) {
                prevIndex = src.length - 1;
            }
            if (onCurPlayIndex) {
                onCurPlayIndex(prevIndex);
            }
        }
        video.resetPlay(true);
        this.setState(
            {
                isPlay: true,
            },
            () => {
                video.video.play();
            },
        );
    };

    // next
    handleNext = () => {
        const { video, curPlayIndex, onCurPlayIndex, src } = this.props;
        this.processSlider.resetSliderInnerWidth();
        this.processSlider.resetSliderInnerLoadedWidth();
        if (src instanceof Array) {
            let nextIndex = curPlayIndex + 1;
            if (nextIndex > src.length - 1) {
                nextIndex = 0;
            }
            if (onCurPlayIndex) {
                onCurPlayIndex(nextIndex);
            }
        }
        video.resetPlay(true);
        this.setState(
            {
                isPlay: true,
            },
            () => {
                video.video && video.video.play();
                // TODO if not video.video, find video element
                document.querySelector('.video-stream') &&
                    document.querySelector('.video-stream').play();
            },
        );
    };

    handleVolumeOnOrOff = () => {
        const { curVolume } = this.state;
        const status = this.volume.getAttribute('aria-label');
        const width = this.volumeSlider.slider.firstChild.getBoundingClientRect().width;
        const strategy = {
            on: () => {
                this.volume.setAttribute('aria-value', curVolume);
                this.volume.setAttribute('aria-label', 'off');
                this.volumeSlider.resetSliderInnerWidth();
                this.setVolume(0);
            },
            off: () => {
                const value = this.volume.getAttribute('aria-value') || 1;
                this.volume.setAttribute('aria-label', 'on');
                this.volumeSlider.setSliderInnerWidth(value, width);
                this.setVolume(value);
            },
        };
        strategy[status]();
    };

    setProcessByPosition = position => {
        const { onSetProcessByPosition } = this.props;
        if (onSetProcessByPosition) {
            onSetProcessByPosition(position);
        }
    };

    processBar = () => {
        return (
            <Slider
                ref={node => (this.processSlider = node)}
                preview={this.props.preview}
                onSetProcessByPosition={this.setProcessByPosition}
                duration={this.props.duration}
                type="process"
            />
        );
    };

    handleVolumeControl = vol => {
        const { mkpBazelText } = this.props;
        const width = this.volumeSlider.slider.firstChild.getBoundingClientRect().width;
        mkpBazelText &&
            mkpBazelText.setState({
                role: 'volume_up_or_down',
                isAddVolume: true,
                volume: parseInt((vol < 0 ? 0 : vol > 1 ? 1 : vol) * 100),
                isHide: false,
            });
        let timer = setTimeout(() => {
            mkpBazelText &&
                mkpBazelText.setState({
                    role: 'volume_up_or_down',
                    isHide: true,
                });
            timer = null;
        }, 500);
        if (vol < 0 || vol > 1 || vol === undefined) return;
        this.volumeSlider.setSliderInnerWidth(vol, width);
        this.setVolume(vol);
    };

    setVolume = position => {
        const { video } = this.props;
        video.video.volume = position;
        this.setState({ curVolume: position });
    };

    renderVolumeSlider = () => {
        return (
            <Slider
                ref={node => (this.volumeSlider = node)}
                setVolume={this.setVolume}
                type="volume"
            />
        );
    };

    runPrefixMethod = (elem, method) => {
        let usePrefixMethod;

        ['webkit', 'moz', 'ms', 'o', ''].map(prefix => {
            if (usePrefixMethod) return;
            if (prefix === '') {
                method = method.slice(0, 1).toLocaleLowerCase() + method.slice(1);
            }

            const type = typeof elem[prefix + method];

            if (type + '' !== 'undefined') {
                if (type === 'function') {
                    usePrefixMethod = elem[prefix + method]();
                } else {
                    usePrefixMethod = elem[prefix + method];
                }
            }
        });

        return usePrefixMethod;
    };

    calReleaseWidth = () => {
        const paddingLeft = parseInt(
            window.getComputedStyle(this.mkpChromeBottom).paddingLeft.replace(/px/, ''),
        );
        const paddingRight = parseInt(
            window.getComputedStyle(this.mkpChromeBottom).paddingRight.replace(/px/, ''),
        );
        const sliderWidth = this.props.width - paddingLeft - paddingRight;
        const innerWidth = this.processSlider.inner.getBoundingClientRect().width;
        const bodyWidth = window.innerWidth - paddingLeft - paddingRight;
        return {
            innerWidth,
            sliderWidth,
            bodyWidth,
        };
    };

    // fullscreen or exit fullscreen
    reqFullscreenOrExitFullscreen = () => {
        const isFullScreen =
            this.runPrefixMethod(document, 'FullScreen') ||
            this.runPrefixMethod(document, 'IsFullScreen');

        if (isFullScreen) {
            this.runPrefixMethod(document, 'CancelFullScreen');
        } else {
            this.runPrefixMethod(document.documentElement, 'RequestFullScreen');
        }
    };

    haneleSettings = () => {
        if (this.props.onSettings) {
            this.props.onSettings();
            return;
        }
    };

    // Theater Mode
    handleTheaterMode = () => {
        const { video, isTheaterMode, onTheaterMode, onHandleShowTheaterMode } = this.props;
        if (isTheaterMode) {
            onHandleShowTheaterMode && onHandleShowTheaterMode(false);
            video.setState({ isVideoMode: false });
        } else {
            onHandleShowTheaterMode && onHandleShowTheaterMode(true);
            video.setState({ isVideoMode: true });
        }
        if (onTheaterMode) {
            onTheaterMode();
        }
        video.handleProgress();
        const { innerWidth, sliderWidth, bodyWidth } = this.calReleaseWidth();
        if (!isTheaterMode) {
            setTimeout(() => {
                const position = parseFloat(innerWidth / sliderWidth);
                this.processSlider.setSliderInnerWidth(position, bodyWidth);
                this.processSlider.setSliderInnerLoadedWidth(position, bodyWidth);
            }, 0);
        } else {
            setTimeout(() => {
                const position = parseFloat(innerWidth / bodyWidth);
                this.processSlider.setSliderInnerWidth(position, sliderWidth);
                this.processSlider.setSliderInnerLoadedWidth(position, sliderWidth);
            }, 0);
        }
    };

    btnHoverConfig = type => {
        const { video } = this.props;
        const { isPlay, isTheaterMode } = this.state;
        const isFullScreen =
            this.runPrefixMethod(document, 'FullScreen') ||
            this.runPrefixMethod(document, 'IsFullScreen');
        const outerWidth = video && video.video.getBoundingClientRect().width;
        const outerHeight = video && video.video.getBoundingClientRect().height;
        const hoverActions = new Map([
            [
                'settings',
                {
                    className: 'settings-tooltip',
                    placement: 'top',
                    position: {
                        right: Number(`${isFullScreen ? 28 : 70}`),
                        bottom: 35,
                    },
                    isShowArrow: false,
                    title: 'settings',
                    mouseEnterDelay: 0.5,
                    outerWidth,
                    outerHeight,
                },
            ],
            [
                'play',
                {
                    className: 'play-tooltip',
                    placement: 'top',
                    position: {
                        left: 12,
                        bottom: 35,
                    },
                    isShowArrow: false,
                    title: `${isPlay ? 'pause' : 'play'}`,
                    mouseEnterDelay: 0.5,
                    outerWidth,
                    outerHeight,
                },
            ],
            [
                'volume',
                {
                    className: 'volume-tooltip',
                    placement: 'top',
                    position: {
                        left: 40,
                        bottom: 35,
                    },
                    isShowArrow: false,
                    title: 'volume',
                    mouseEnterDelay: 0.5,
                    outerWidth,
                    outerHeight,
                },
            ],
            [
                'theater',
                {
                    className: 'theater-tooltip',
                    placement: 'top',
                    position: {
                        left: 525,
                        bottom: 35,
                    },
                    isShowArrow: false,
                    title: `${isTheaterMode ? 'default mode' : 'theater mode'}`,
                    mouseEnterDelay: 0.5,
                    outerWidth,
                    outerHeight,
                },
            ],
            [
                'fullscreen',
                {
                    className: 'fullscreen-tooltip',
                    placement: 'top',
                    position: {
                        right: 12,
                        bottom: 35,
                    },
                    isShowArrow: false,
                    title: `${isFullScreen ? 'exit fullscreen' : 'open fullscreen'}`,
                    mouseEnterDelay: 0.5,
                    outerWidth,
                    outerHeight,
                },
            ],
        ]);
        return hoverActions.get(type) || {};
    };

    handleBtnHover = type => {
        const self = this;
        return {
            onMouseOver() {
                TooltipHook.create(self.btnHoverConfig(type));
            },
            onMouseOut() {
                TooltipHook.distory();
            },
        };
    };

    mkpLeftControls = () => {
        const { disablePrev, disableNext, src, duration, video, currentTime, isEnd } = this.props;

        const { isPlay, curVolume } = this.state;

        return (
            <div className="mkp-left-controls">
                {/* prev video */}
                {!disablePrev && src instanceof Array && (
                    <a
                        className="mkp-prev-button mkp-button"
                        onClick={this.handlePrev}>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABC0lEQVRYR+2W0Q3CIBiE759AN9ANdAQ3UCfRDXQTu+mZS2hTrfWnKlATeOlDm/Dx3RUwzGzYzHhQgbxEqqFqyDPgvf/PDpFkuzIzm7wIkksANzM7/sTQN0Akd4IBsI5ZTNRqPwUieQVwmWI3CRDJbbCiZzeKGCJ5DlbUm4eRFagtLoDDWHGzAZEUhIo7sJI1smBFpVVM7khqaKy476hyADUANq6a8EFSIM0RItNec4qBSg7UQoRSy9aiWGTPEwdbgtoX/+37AGFjVIwDW9kie2FLR8ag8MWAet2ax+H6FKGuH7K1Km6oZ0pHSmNmo+dcd0WJ2T9yfhN1H6pAOQ14c9XIqiHPgPd+dh26A9PikCX0V4VlAAAAAElFTkSuQmCC"
                            alt="prev"
                        />
                    </a>
                )}
                {/* play btn */}
                <button
                    className="mkp-play-button mkp-button"
                    onClick={() => {
                        if (this.props.isEnd) {
                            this.props.onIsEnd && this.props.onIsEnd(false);
                        }
                        video && video.playOrPauseVide();
                    }}>
                    <img
                        {...this.handleBtnHover('play')}
                        src={
                            isEnd
                                ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAACW0lEQVRIS7WVS4iOcRTGf88CuSxExCwmpUiaKRJRkgVF08RCig2KUC6FKcwS5bJgZGMiZSEll7BRysYshCljMagJ4xKFUO48OnpnvPN+73dpvr7/8n3P/zznnP/zPEfU+KjG+RkAYLsRaAKOS/rcB257CDAXmAKMBXqBbqBTkksVmQU4AWwGNkhqtz0D2AMsAUbmJPoAnAVa0wWl47IAR4AdQABFwjVJ8HvgPPAWGAVMAxakQOP7ckkd2SKyAHuBfamgx0ALcE3S7/Rl28OApcAmYBHwC1gp6WKpDtYBp5KASNgGfAI6JN0oNmvbfYV9j7eS1NkXm+2gHngCDM0k65E0udRj2j4GbAUeAQ2SfkZ8AU1tzwNWJYx5A7wE7kq6UAYginoKTAS2SwrAQoBqdGF7F3AIuCVpYS0A6pKO4/1GSPrRPyLbQbvgfZukP4PtxHaMdTxQL6k3DXAbiPnPknSvCoCHwHSgUVJXGuBqYhMhmMtVAIToxgF1kl6nAYLzW4D9kloHA2A7GPQK+BoqD59KAzQDVxIdTC1nYnkF2N4JHAauSwrT/E9T2+E9L4DRwIpyvM8C2A4dPAMmAGslnSmgqe31wMmkzVBjmFxFx/ZRYBtwPyHKPxvPU/IlYBlwJ8xM0rtyCLZ3AweAj8BMST25XhQfbQ8HbiYLJhZLWPc5Sc+LuOlGYDHwBWiWFHf7T+7KTOZ5Glidio2OuoAYWwMwP7UPYvZNkkIDA07JnZyo+yAwu4hvBefbY4dI+pY3yoqWvu0xwBxgUrLRouJuSQ/KvU9FAOWSlPr/FzYc2BlAQdjPAAAAAElFTkSuQmCC'
                                : isPlay
                                ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAg0lEQVRYR+2XwQrAIAxDzZ/vzzt2GMhwxDIPnTyPttaYRKlqxYaK4WkAcorA0J4MRcQxOpmk4Xw2v6895aGIiBdAw/XZfADdDEiyitiEq1hWgmw+kiHZ80nAQ84TMARDX28NHsJDeKhj4Lf9UK0m3/2lVsanJFu5oasFIBhyDLh4OQ+d9xSwJVowjfEAAAAASUVORK5CYII='
                                : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABTklEQVRYR+2YPU7EMBBG34fEKSgoERVHgBtwDQr+LkALLOICewx+Gqq9BaIDCe4ANBiNFDeITRhnHFyspVRJnKd5tmcmorGhxnhYAQ0Z6Y1QSmkf2ATmkj6HJou4vxQopbQFPAJrwAtwIOkh4qN9c/QB7QGLHy/fAceSDLDK8AIZxAdwaVcNjSVAOTJVNI4BymC3wKGk1wiHEUBZ4wUwG6sxCihMYzRQBrsBjko01gIysHfANF55NNYEKtI4BZBL45RAeTeeSbpedkRMDZQ5tiU9/Qb1H0BfVkFIemsByPLgqaR5C8r+lGKmUOZKwjWBisqUWkD3XepwF3LRQC49NXeZ6ZlZ7vLkrVpAVvhbA+DWEw303J0ptp3DRskasv7M9JyP1RMRoVA9XqANwLSsd43iiaRQPS4geziltAPsNtFKh61S50Sr3zFDAWsuQt+JzKsl1DH+zgAAAABJRU5ErkJggg=='
                        }
                        alt="play"
                    />
                </button>
                {/* next video */}
                {!disableNext && src instanceof Array && (
                    <a
                        className="mkp-next-button mkp-button"
                        onClick={this.handleNext}>
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABTUlEQVRYR+2Wr0tFQRCFz5f9p/wjFDEYxCKCySYWk0WbwazNYDELYjUYDCaDTRBBRIs/GJnHvY/H8+msD3bvFXbizt253549Bxb1rOgZjypQdCNVoapQpEDU/58eMrNV4CA63aS+mZ2368BsNCNJITMzSaeSloHHaOhov9k7WALC/4Uf+KCRoQ+SFoGzVKjcQC3HvqQN4C0CKwXkHDeSFoDr36BKAjmHK7QlaRdwn32r0kAtwEWj1v04UVdAzvEkaQU4KZmyyMPeP5K0BryMJTRL7FOA3FdLwHEfgDxxnjxP4KC68pAnbE/SJvDetYc8Wa6KJ63z2HuiPFmesIlV6sqeJa0Dh5HLSwBdSpoH7iKY3Kb+kLQtaQf4TIHJCXQraQ64SgXJHfsZ4PWvMI1Cw1ciMHw9/jQr6YE2Dci0eypQpFxVqCoUKRD1e+ehLxmsvCUlbbTUAAAAAElFTkSuQmCC"
                            alt="next"
                        />
                    </a>
                )}
                {/* volume */}
                <span className="mkp-volume">
                    <button
                        ref={node => (this.volume = node)}
                        className="mkp-mute-button mkp-button"
                        onClick={this.handleVolumeOnOrOff}
                        aria-label={curVolume === 0 ? 'off' : 'on'}>
                        <img
                            {...this.handleBtnHover('volume')}
                            src={
                                curVolume === 0
                                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADEklEQVRYR+2XW4hOURiGnzcppxQp5UooRIikHMcFN5IkIsUVJVwockpIyCE3pHDhkBQKOSZySoq4QUo5XJMb5VCSV2ta87f+PXv/e4+Zqbmwamr2Xnt961nfer/DL7rYUBfj4T9Q2Y0Uesj2DEkPywzkzdseKOnTv6zNBbJ9GFgDrJR0oq2Gbf8GHgDHgYuSXNVGKyDbM4F7iYFSKNtbJe1uWWM7BXgDrJL0qApUkYfWAweqQNkOnjwsqWYrAxTMBI+Fg50sg2qkoSzUWklHUoO2V8RrIQM0AlgCbAa6J2s2SDrYCKph2NsuhLLdDXgOjAsbpEDJ1Y0FzgPDE4iNkvYXQZXmoZYrSQzUPGW7b9TbhDygsMZ2b+AyMCva+ANMlvQ0D6oUKBpt1kkBVNjwlqTpRaeOUE+AMfGbD8CwvOirBFQBqqekn8lVXYki/py8GwK8BMIBwpgj6Wb2EHlh3wSEv7yxCBhZJtIYZe+BcJVfE6gQuUGXYVyVNK8K0A5ge6NIyMy1ipwk7C9JWpAAjQJex+dvQD9JISXURp6H2goUjNVB2b4NzI67TJL0LIF6BwyNz1MkBW11OFAwuEPSzvCP7R7AHWAqcFDShgToNLAsPi+XdKazgOo8ZbsXEDz1RdL8Ah1tkrSvM4HyoEIirGnS9iFgXYTYImlvZwO10lS6oe0LwML4brWko50FtA3YlRjPrVu2PwKD43dN2Z6ro6KsuZbl1L5s9I0GXkWYX0B/Sd/LPFSUGMOplqeL6wzF9iOn9tWgbPeJQp8MXJc0N2uvcumI4Zxm2jpbmfYjW/tSqJ7AXWCPpBvtAmoEla32sVc6FjqTuGkKFerZj3YV10yktPJUQT8UEuCpPKjCqy+aKHtvuw6qAGg8cA0YVBZ9LfNt0lAWMoXKaGhiTH6LE++kywtb2XYBpZoqafJDlxg8lbYbuVDtBmqByhTQ9GfQW2CppBc5KWGapMcN81CZdqrMJz8UzwLnJIUk2DwSqLouoEM0VARne4CkLw3mZ0q6nzffIVdWxWtVv/kPVOapLuehv4xScTSTE+IpAAAAAElFTkSuQmCC'
                                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACjklEQVRYR+2Xz4uNURjHP9+FDVlYUTaKCclYWKixsaCUhSYSDU1KylLMoDDEhpn8ARaIosmvYaFYycLEygIrLGyElWJFHj23c6fj3PPe98798TaLeerWfd639zyf8/w8R8wx0RzjYR6oLCI98ZCZLZX0tcx47n2vgP4Az4GrwF1J1ipcV4DMbEzS+bpRM4sB3gNHJL1oBapjIDM7DoxLmlkrAXIO99hhSdfLoDoCqsO4kQRoDbAPOAUsiCBGJE00g2obKIZJgaLQbQAmgdURxAlJl4ug2gJKYYqA/LmZLQIeAtsCxF9gQNKrrlRZDqYZUAQ1DawPEJ+AVbnqm5WHimAyOTQVkvhbFL5+4I2nW3i2Q9KT1EsNQGa2BfBfKsuBQ4Wxb6yyj8BGST8iqBvAcNAfS9rZCtA5YKysPBsWypf9A0m7kiR3L7n8BJZI8pYwIzkPdRPIDW2S9DqC+gCsDPpmSS+rBpqQNBIB3QQOBH1YkuuVemhK0mAE5I3xWNBPSrpUNdB9SbsLgEYljVcNdFHSmQjoFrA/6AcleeVVFjKf+t4AvRHWxMzeAuuCul3S0yqB/Cy0J4JZBnypswGLJf0qAypqjCuiphavUfufOX58BvqTxngBOB0+npY0kC4029HhCejnnzKgR97VJX2PvOMbegcsDM+GJN3uCCjkQBYq9lBqJEz8dLj2SfLJ/5/MykPRbhugioACjA/breH77h4/iqByQGbmE/4e0Be54awkz6WstOWhHFSS1GuBIWA0OcJOStpbBFMrjmYvW3lnZrXwlRzyfakrgI+K3z0Fqid6MkDTa9BRSc9a2WDHHsoZMbP6RfEacKfyi2KmzOfWVbqV0PSkyjoxPA/Urvf+AVJrNzTYZb69AAAAAElFTkSuQmCC'
                            }
                            alt="volume"
                        />
                    </button>
                    {this.renderVolumeSlider()}
                </span>
                <div className="mkp-time-display notranslate">
                    <span className="mkp-time-current">{getTime(currentTime)}</span>
                    <span className="mkp-time-separator">{' / '}</span>
                    <span className="mkp-time-duration">{getTime(duration)}</span>
                </div>
            </div>
        );
    };

    mkpRightControls = () => {
        const { disableSettings, disableTheaterMode, disableFullscreenMode } = this.props;
        const { isFullScreen } = this.state;
        return (
            <div className="mkp-right-controls">
                {/* settings */}
                {!disableSettings && (
                    <button
                        className="mkp-button mkp-settings-button mkp-hd-quality-badge"
                        onClick={this.haneleSettings}>
                        <img
                            {...this.handleBtnHover('settings')}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACsElEQVRYR92Yy4tPcRjGP49rM1ko9i4xITQLs3H5C6zGFBulGJFyidxKM4wSuRQWk5CNDTHZ+A9YCCVynZGdlaTccn301hkdM+f2Oxr98m7O5r083+f73r5HNJmoyfDw/wCyfQbYmsPwGUnb67BfmyHbL4HZOUGHJM39Z4Bsjwe+FwT8AUyWFN+GpBZDthcAj0sitUkabAgN5Ce17aB8JXBZ0pthx7bHAYeAAyXBQqdP0s+U7XRgFXBN0tss+1yGbN8FlgDfgBvAOeA9cAFYVPHkj4CNwBRgE9AJTADuSeqoDMh2N3C+YtC6at2SLo40HsWQ7anAKyC+YynvgFmS4vtbsgD1A5vHEknKd7+kLbmAbC8GHhQlew7Q6EmRGzMaPIiBdkkPh+3+YMh2T1JBVfxGsh8D4pSvw8D2TGADsC8BWMVPr6S+PEAtwCVgTYmnr0BH+mRpfdvtwB1gUomfK8A6SV8yAaX6xTbgFBAdOUv2SDpeFMz2fuBIjk6wu0vS2dIqS4GKBnY9x2GrpM8lgFqBjzk6nZKit42Sosa4FLidYfNM0vwqyWE7RsecDN3lkrJ8F46OZcCtvwT0Asia+iskZfkuBJR3ZTGbWiRFYueK7SiQTzkKXZIGKl+Z7ViuThYk9W5JJ0oA7QWO5ujE6rKzNKmTU1Ut+2hoT7MC2l4I3P/rsrfdCxyskrDAh2iCkq6m9W2vTnpZVFkV6ZF0eFhxZKeuMzpiOA4BE5PR0chQLh4dgdJ28wzXBFBzrR8JqOZZ0FKjI2uFjXERVxq5VkVirVifLHv1V9iEpWlAFzBQc8mPyjmYseSvBW7mvUjqPoNilj0poWiepOdVaEzr1AXUXA/F5ErjIRAbYpYMSmprlJ3Qr8VQAqjoZ8NpSTv+KaA6warY1GaoivM6Ok0H6BcU3P0lNMevkgAAAABJRU5ErkJggg=="
                            alt="settings"
                        />
                    </button>
                )}
                {/* Theater Mode */}
                {!disableTheaterMode && (
                    <button className="mkp-size-button mkp-button" onClick={this.handleTheaterMode}>
                        <img
                            {...this.handleBtnHover('theater')}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAA1klEQVRYR+2XTQrCMBBG36fgwp9DunPrCcQTuHXnIVUUUUcEG6qkpEKsKUy3TWYe75uSVBT2qDAeHCiViBv6ypCZLYE1MEttzPR+D6wkbap6b5GZ2QGYZGrWtsxR0rQJyNpWyblOUhDzaSgA1RflbF7VMrNoLwfqryEze8Z3D9NeG7S/zJADpb4yN9TC0AC4lTTUDhRLIxwdZuaGUoaGwLWkoXagfkf2ixO+qWb0Cvs6y87AqEsY4CRp3HTJ3wLzDqEuwE7SIgrUsZloO/+VTqXghnpn6AHp8K4l0J5iMQAAAABJRU5ErkJggg=="
                            alt="theater"
                        />
                    </button>
                )}
                {/* fullscreen */}
                {!disableFullscreenMode && (
                    <button
                        ref="fullscreenBtn"
                        className="mkp-fullscreen-button mkp-button"
                        onClick={this.reqFullscreenOrExitFullscreen}>
                        <img
                            src={`${
                                isFullScreen
                                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAZUlEQVRIS+2UwQoAIAhD3f9/tFEQVFgitYvUMcYebSaEfED2lw9wE3YjUlWtLgAm7e5+JSYF9OePz91FdNK0aK2W6AB3NAICt+SAlylNCqCXTAeMbf1VkXRMb3/vtABfmlle9A4KrCdQGeBs3msAAAAASUVORK5CYII='
                                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABCklEQVRYR+2XOw7CMBBEZ1rOwEHooKRMSw4D4TJQIloqaDgJZ6BkkaVEihI7a4dYCtKm9Honz+PfmpjZx5nxwIC0GfE6JCJbACs1max8fUTE297p+yR56+b3gESkAHDRYFycpC/ftX1i8gEUJK/tvj5BN7pDjOAEQBXJYwrQA8A9BMdxU7YBsK41k4GOoZ/GOBhYX86RvQGFHBQRc2hweZlD2u5LdkgTzB23215z2Bz6f4fq4qopP3Jcru3ypqev1UMGZA5pa9Qc+tWh3EV+8rYfPFh9zyCXICKinch1PApoB+AUIzgBUEnyrL3LFgBKAEsNauS7rJF9uYGTfA8CaRC541Z+aA7PzqEvH1fZJdb0wOQAAAAASUVORK5CYII='
                            }`}
                            {...this.handleBtnHover('fullscreen')}
                            alt="fullScreen"
                        />
                    </button>
                )}
            </div>
        );
    };

    render() {
        const { isShowMkpChromeBottom } = this.state;
        return (
            <div
                ref={node => (this.mkpChromeBottom = node)}
                className={cn('mkp-chrome-bottom', `${isShowMkpChromeBottom ? 'active' : ''}`)}>
                <div className="mkp-process-bar-container">{this.processBar()}</div>
                <div className="mkp-chrome-controls">
                    {this.mkpLeftControls()}
                    {this.mkpRightControls()}
                </div>
            </div>
        );
    }
}
