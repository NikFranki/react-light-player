import React, { Component } from 'react';
import './index.less';

export default class MkpChromeTop extends Component {
    render() {
        const { curPlayIndex, src } = this.props;
        return (
            <div ref="mkpChromeTop" className="mkp-chrome-top">
                <div className="mkp-title-text">
                    <a target="_blank" className="mkp-title-link">{src[curPlayIndex]['title']}</a>
                </div>
            </div>
        )
    }
}
