import React, { Component } from 'react';
import cn from '../../../util/classname';
import './index.less';

export default class MkpChromeTop extends Component {
    mkpChromeTop = null;

    state = {
        isShowMkpChromeTop: false,
    };

    render() {
        const { title } = this.props;
        const { isShowMkpChromeTop } = this.state;
        return (
            <div
                ref={node => (this.mkpChromeTop = node)}
                className={cn('mkp-chrome-top', `${isShowMkpChromeTop ? 'active' : ''}`)}>
                <div className="mkp-title-text">
                    <a target="_blank" className="mkp-title-link">
                        {title}
                    </a>
                </div>
            </div>
        );
    }
}
