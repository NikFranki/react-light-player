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
                    'mkp-preview',
                    'mkp-bottom',
                    'mkp-preview',
                    `${isShowMkpTooltip ? 'active' : ''}`,
                )}>
                <div className="mkp-preview-bg">
                    <div className="mkp-preview-duration" />
                </div>
                <div className="mkp-preview-text-wrapper">
                    <div className="mkp-preview-image" />
                    <div className="mkp-preview-title" />
                    <span className="mkp-preview-text">{tick}</span>
                </div>
            </div>
        );
    }
}
