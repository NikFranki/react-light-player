import React, { Component } from 'react';
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
            <input
                ref={node => (this.switchNode = node)}
                className="switch switch-anim"
                onChange={this.checkNum}
                type="checkbox"
                checked={isChecked}
            />
        );
    }
}
