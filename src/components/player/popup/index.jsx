import React, { Component } from 'react';
import { Switch, Icon } from 'antd';
import 'antd/dist/antd.less';
import './index.less';

export default class MkpPopup extends Component {

    getState = () => {
        return this.state;
    }

    handleAutoPlay = (checked) => {
        if (this.props.onAutoPlay) {
            this.props.onAutoPlay(checked);
            return;
        }
    }

    handleShowSpeedArea = () => {
        this.refs.mkpPopup.classList.add('speed');
        this.refs.menucheckbox.classList.add('hide');
        this.refs.menuspeed.classList.add('hide');
        this.refs.mkpSpeed.classList.add('active');
    }

    handleSpeedBack = () => {
        this.refs.mkpPopup.classList.remove('speed');
        this.refs.menucheckbox.classList.remove('hide');
        this.refs.menuspeed.classList.remove('hide');
        this.refs.mkpSpeed.classList.remove('active');
    }

    handleSpeedSelect = (item, index) => {
        this.handleSpeedBack();
        if (this.props.onSpeedSelect) {
            this.props.onSpeedSelect(item, index);
            return;
        }
    }

    render() {
        const {
            speeds,
            showSettingItems,
            autoPlay,
            speedIndex
        } = this.props;
        return showSettingItems && (
            <div ref="mkpPopup" className="mkp-popup mkp-settings-menu" data-layer="6" id="mkp-id-17">
                <div className="mkp-panel">
                    <div className="mkp-panel-menu" role="menu">
                        <div ref="menucheckbox" className="mkp-menuitem" role="menuitemcheckbox" aria-checked={autoPlay} tabIndex="0">
                            <div className="mkp-menuitem-label">
                                自动播放
                            </div>
                            <div className="mkp-menuitem-content">
                                <div className="mkp-menuitem-toggle-checkbox">
                                    <Switch defaultChecked={autoPlay} onChange={this.handleAutoPlay} />
                                </div>
                            </div>
                        </div>
                        <div ref="menuspeed" className="mkp-menuitem" aria-haspopup="true" role="menuitem" tabIndex="0" onClick={this.handleShowSpeedArea}>
                            <div className="mkp-menuitem-label">速度</div>
                            <div className="mkp-menuitem-content">{speeds[speedIndex]}<Icon type="right" /></div>
                        </div>
                        <div ref="mkpSpeed" className="mkp-speed">
                            <header onClick={this.handleSpeedBack}>
                                <Icon type="left" />速度
                            </header>
                            <ul>
                                {
                                    speeds.map((item, index) => {
                                        return (
                                            <li onClick={() => this.handleSpeedSelect(item, index)} key={index}>{speedIndex === index && <Icon type="check" />}{item}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
