import React, { Component } from 'react';
import { Switch, Icon } from 'antd';
import cn from '../../../util/classname';
import 'antd/dist/antd.less';
import './index.less';

export default class MkpPopup extends Component {
    mkpPopup = null;
    menucheckbox = null;
    menuspeed = null;
    mkpSpeed = null;

    state = {
        isClickedspeed: false,
        isHideMenucheckbox: false,
        isHideMenuspeed: false,
        isClickedMkpSpeed: false,
    };

    getState = () => {
        return this.state;
    };

    handleAutoPlay = checked => {
        if (this.props.onAutoPlay) {
            this.props.onAutoPlay(checked);
            return;
        }
    };

    handleShowSpeedArea = () => {
        this.setState({
            isClickedspeed: true,
            isHideMenucheckbox: true,
            isHideMenuspeed: true,
            isClickedMkpSpeed: true,
        });
    };

    handleSpeedBack = () => {
        this.setState({
            isClickedspeed: false,
            isHideMenucheckbox: false,
            isHideMenuspeed: false,
            isClickedMkpSpeed: false,
        });
    };

    handleSpeedSelect = (item, index) => {
        this.handleSpeedBack();
        if (this.props.onSpeedSelect) {
            this.props.onSpeedSelect(item, index);
            return;
        }
    };

    render() {
        const { speeds, showSettingItems, autoPlay, speedIndex } = this.props;
        const {
            isClickedspeed,
            isHideMenucheckbox,
            isHideMenuspeed,
            isClickedMkpSpeed,
        } = this.state;
        return (
            showSettingItems && (
                <div
                    ref={node => (this.mkpPopup = node)}
                    className={cn(
                        'mkp-popup',
                        'mkp-settings-menu',
                        `${isClickedspeed ? 'speed' : ''}`,
                    )}
                    data-layer="6"
                    id="mkp-id-17">
                    <div className="mkp-panel">
                        <div className="mkp-panel-menu" role="menu">
                            <div
                                ref={node => (this.menucheckbox = node)}
                                className={cn(
                                    'mkp-menuitem',
                                    `${isHideMenucheckbox ? 'hide' : ''}`,
                                )}
                                role="menuitemcheckbox"
                                aria-checked={autoPlay}
                                tabIndex="0">
                                <div className="mkp-menuitem-label">自动播放</div>
                                <div className="mkp-menuitem-content">
                                    <div className="mkp-menuitem-toggle-checkbox">
                                        <Switch
                                            defaultChecked={autoPlay}
                                            onChange={this.handleAutoPlay}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div
                                ref={node => (this.menuspeed = node)}
                                className={cn('mkp-menuitem', `${isHideMenuspeed ? 'hide' : ''}`)}
                                aria-haspopup="true"
                                role="menuitem"
                                tabIndex="0"
                                onClick={this.handleShowSpeedArea}>
                                <div className="mkp-menuitem-label">速度</div>
                                <div className="mkp-menuitem-content">
                                    {speeds[speedIndex]}
                                    <Icon type="right" />
                                </div>
                            </div>
                            <div
                                ref={node => (this.mkpSpeed = node)}
                                className={cn('mkp-speed', `${isClickedMkpSpeed ? 'active' : ''}`)}>
                                <header onClick={this.handleSpeedBack}>
                                    <Icon type="left" />
                                    速度
                                </header>
                                <ul>
                                    {speeds.map((item, index) => {
                                        return (
                                            <li
                                                onClick={() => this.handleSpeedSelect(item, index)}
                                                key={index}>
                                                {speedIndex === index && <Icon type="check" />}
                                                {item}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}
