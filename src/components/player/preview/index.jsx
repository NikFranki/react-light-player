import React, { Component } from 'react';
import cn from '../../../util/classname';
import './index.less';

export default class Preview extends Component {
    mkpTooltip = null;

    state = {
        isShowMkpTooltip: false,
        tooltipPos: { left: '12px' },
        tick: this.props.currentTime || 0,
    };

    render() {
        const { isShowMkpTooltip, tooltipPos, tick } = this.state;
        return (
            <div
                data-layer="4"
                aria-live="polite"
                style={tooltipPos}
                ref={node => (this.mkpTooltip = node)}
                className={cn(
                    'mkp-tooltip',
                    'mkp-bottom',
                    'mkp-preview',
                    `${isShowMkpTooltip ? 'active' : ''}`,
                )}>
                <div className="mkp-tooltip-bg">
                    <div className="mkp-tooltip-duration" />
                </div>
                <div className="mkp-tooltip-text-wrapper">
                    <div className="mkp-tooltip-image" />
                    <div className="mkp-tooltip-title" />
                    <span className="mkp-tooltip-text">{tick}</span>
                </div>
            </div>
        );
    }
}
