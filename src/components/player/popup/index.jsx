import React, { Component } from 'react';
import Switch from '../../switch';
import cn from '../../../util/classname';
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
                                        <Switch />
                                    </div>
                                </div>
                            </div>
                            <div
                                ref={node => (this.menuspeed = node)}
                                className={cn(
                                    'mkp-menuitem',
                                    `${isHideMenuspeed ? 'hide' : ''}`,
                                )}
                                aria-haspopup="true"
                                role="menuitem"
                                tabIndex="0"
                                onClick={this.handleShowSpeedArea}>
                                <div className="mkp-menuitem-label">速度</div>
                                <div className="mkp-menuitem-content">
                                    {speeds[speedIndex]}
                                    <img
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAX0lEQVQ4T2NkoBAwouv///+/AUiMkZHxAjFm4zJgAwMDQwAxhmAYALIV6gqiDMFqACmG4DSAWEPwGkCMIQQNIGQI7Q0gFCO0C0RCNsNSKfUTErE243QBxZmJmByIrAYA2c5EEfKVrEUAAAAASUVORK5CYII="
                                        alt="right"
                                    />
                                </div>
                            </div>
                            <div
                                ref={node => (this.mkpSpeed = node)}
                                className={cn(
                                    'mkp-speed',
                                    `${isClickedMkpSpeed ? 'active' : ''}`,
                                )}>
                                <header
                                    className="mkp-speed-header"
                                    onClick={this.handleSpeedBack}>
                                    <img
                                        className="mkp-speed-header-img"
                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAjUlEQVQ4T6WTUQ2AMBBDWwc4IDgBJSAFKUjAAUgARUcu2ceAHXdk+1361rQdUXkY0YtIA2ADcJKcco0LyMQdgJ7kEQZ4YgWZDiJiExAVFwF/xBZgATACGEjuXkuvDESkGqCd68ttcnGr7emo2ELKIQTxanQhn0uMOIlO2XTiAjS05GTVcEnO4b/gbUDvL8WGRhHnd4YFAAAAAElFTkSuQmCC"
                                        alt="left"
                                    />
                                    <span className="mkp-speed-header-label">速度</span>
                                </header>
                                <ul className='mkp-speed-list'>
                                    {speeds.map((item, index) => {
                                        return (
                                            <li
                                                className="mkp-speed-list-item"
                                                onClick={() =>
                                                    this.handleSpeedSelect(
                                                        item,
                                                        index,
                                                    )
                                                }
                                                key={index}>
                                                {speedIndex ===
                                                    index && (
                                                    <img
                                                        className="mkp-speed-list-item-img"
                                                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA50lEQVQ4T6WTbVHDYBAGdxVQCTggVQBIQAEgoQpoHYACggMk4ABQABLq4Jink2QyncAk5Wby5/3Yu9t7I/8MT7lfVQ2wUt9OBXwDe7VZDKiqLfAA3KvtIkBVrYAv4FO9SvtLAS1wC1yn/0WATtw78KLe9fJnV1BVyRj7jRqJh5gFqKpkfAZ2aiQOcQB05WUsA7k/0YlL6arnx++mB6S8SyCSNup+BOjHdqO+/gYIOQdjOJe36lNVZT3Zh7FNAkbZMttH4AJIO/mytlY/pp79pMROWkBnx2P7s4LxZicv9tuxk9mAuX/pD2RfVxGOulPmAAAAAElFTkSuQmCC"
                                                        alt="tick"
                                                    />
                                                )}
                                                <span className="mkp-speed-list-item-label" />
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
