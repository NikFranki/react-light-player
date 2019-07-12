import React, { Component } from 'react';
import cn from '../../util/classname';
import './index.less';

export default class Switch extends Component {
    switchNode = null;
    state = {
        isChecked: false,
    };

    checkNum = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    };

    render() {
        const { isChecked } = this.state;
        return (
            <div
                ref={node => (this.switchNode = node)}
                onClick={this.checkNum}
                className={cn(
                    'mkp-menuitem-toggle-checkbox',
                    `${isChecked ? 'checked' : ''}`,
                )}
            />
        );
    }
}
