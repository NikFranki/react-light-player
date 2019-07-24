import React, { Component } from 'react';
import cn from '../../../util/classname';
import { getTime } from '../../../util';
import './index.less';

export default class Slider extends Component {
    slider = null;
    inner = null;
    loaded = null;

    state = {
        isSliderHover: false,
    };

    handleSlider = event => {
        const { setVolume, onSetProcessByPosition } = this.props;
        const pageX = event.pageX;
        const left = document.querySelector('.player').getBoundingClientRect().left;
        const offsetLeft = event.currentTarget.firstChild.offsetLeft;
        const offsetWidth = event.currentTarget.firstChild.offsetWidth;
        const position = this.calPosition(pageX, left, offsetLeft, offsetWidth);
        this.setSliderInnerWidth(position, offsetWidth);
        setVolume && setVolume(position);
        onSetProcessByPosition && onSetProcessByPosition(position);
    };

    handleMousedown = event => {
        const { setVolume, onSetProcessByPosition } = this.props;
        const left = document.querySelector('.player').getBoundingClientRect().left;
        const offsetLeft = event.currentTarget.firstChild.offsetLeft;
        const offsetWidth = event.currentTarget.firstChild.offsetWidth;
        document.onmousemove = e => {
            const pageX = e.pageX;
            const position = this.calPosition(pageX, left, offsetLeft, offsetWidth);
            this.setSliderInnerWidth(position, offsetWidth);
            setVolume && setVolume(position);
            onSetProcessByPosition && onSetProcessByPosition(position);
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    handleMouseover = e => {
        const { type, preview, duration } = this.props;
        if (type === 'process' && preview) {
            this.setState({
                isSliderHover: true,
            });
            const offsetLeft = e.target.offsetLeft;
            const offsetWidth = e.target.offsetWidth;
            const min = offsetLeft;
            const max = offsetLeft + offsetWidth;
            const halfPreviewWidth = preview.mkpTooltip.offsetWidth / 2;
            if (e.pageX < min || e.pageX > max) return;
            let left = e.pageX - halfPreviewWidth;
            const limitLeftMin = min + halfPreviewWidth;
            const limitLeftMax = min + (offsetWidth - halfPreviewWidth);
            if (e.pageX <= limitLeftMin) {
                left = offsetLeft;
            } else if (e.pageX >= limitLeftMax) {
                left = limitLeftMax - halfPreviewWidth;
            }
            const pos = (e.pageX - min) / offsetWidth;
            preview.setState({
                isShowMkpTooltip: true,
                tooltipPos: { left: `${left}px` },
                tick: getTime(pos * duration),
            });
        }
    };

    handleMouseOut = () => {
        const { type, preview } = this.props;
        if (type === 'process' && preview) {
            this.setState({
                isSliderHover: false,
            });
            preview.setState({
                isShowMkpTooltip: false,
            });
        }
    };

    calPosition = (pageX, left, offsetLeft, offsetWidth) => {
        let position = parseFloat((pageX - left - offsetLeft) / offsetWidth);
        if (position > 1) {
            position = 1;
        } else if (position < 0) {
            position = 0;
        }
        return position;
    };

    setSliderInnerWidth = (position, offsetWidth) => {
        this.inner.style.width = position * offsetWidth + 'px';
    };

    setSliderInnerLoadedWidth = (position, offsetWidth) => {
        this.loaded.style.width = position * offsetWidth + 'px';
    };

    resetSliderInnerWidth = () => {
        this.inner.style.width = 0;
    };

    resetSliderInnerLoadedWidth = () => {
        this.loaded.style.width = 0;
    };

    render() {
        const { type } = this.props;
        const { isSliderHover } = this.state;
        return (
            <div
                ref={node => (this.slider = node)}
                className={cn(
                    `mkp-${type}-panel`,
                    `${type === 'process' && isSliderHover ? 'hover' : ''}`,
                )}
                role="slider"
                onClick={this.handleSlider}
                onMouseDown={this.handleMousedown}
                onMouseMove={this.handleMouseover}
                onMouseOut={this.handleMouseOut}>
                <div className={`mkp-${type}-slider`}>
                    <div className="wrapper">
                        <div ref={node => (this.inner = node)} className={`inner-${type}`}>
                            {type === 'volume' && <div className="slider-handler" />}
                            {type === 'process' && (
                                <div ref={node => (this.loaded = node)} className="loaded" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
