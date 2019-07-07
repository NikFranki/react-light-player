import React, { Component } from 'react';
import './index.less';

export default class Slider extends Component {
    slider = null;
    inner = null;
    loaded = null;

    handleSlider = event => {
        const pageX = event.pageX;
        const left = document.querySelector('.player').getBoundingClientRect().left;
        const offsetLeft = event.currentTarget.firstChild.offsetLeft;
        const offsetWidth = event.currentTarget.firstChild.offsetWidth;
        const position = this.calPosition(pageX, left, offsetLeft, offsetWidth);
        this.setSliderInnerWidth(position, offsetWidth);
        this.props.setVolume && this.props.setVolume(position);
        this.props.setProcess && this.props.setProcess(position);
    };

    handleMousedown = event => {
        const left = document.querySelector('.player').getBoundingClientRect().left;
        const offsetLeft = event.currentTarget.firstChild.offsetLeft;
        const offsetWidth = event.currentTarget.firstChild.offsetWidth;
        document.onmousemove = e => {
            const pageX = e.pageX;
            const position = this.calPosition(pageX, left, offsetLeft, offsetWidth);
            this.setSliderInnerWidth(position, offsetWidth);
            this.props.setVolume && this.props.setVolume(position);
            this.props.setProcess && this.props.setProcess(position);
        };

        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
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
        return (
            <div
                ref={node => (this.slider = node)}
                className={`mkp-${type}-panel`}
                role="slider"
                onClick={this.handleSlider}
                onMouseDown={this.handleMousedown}>
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
