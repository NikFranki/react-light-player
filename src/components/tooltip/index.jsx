import React, { Fragment, Component } from 'react';
import ReactDOM from 'react-dom';
import cn from '../../util/classname';
import './index.less';

export default class Tooltip extends Component {

    static defaultProps = {
        className: '',
        direction: 'top',
        isShowArrow: true,
        position: {
            left: 0,
            top: 0,
        },
        title: 'tooltip',
        mouseEnterDelay: 0.5,
        outerWidth: '100%',
        outerHeight: '100%',
    };

    render() {
        const {
            className,
            direction,
            position,
            isShowArrow,
            title,
            mouseEnterDelay,
            outerWidth,
            outerHeight,
        } = this.props;
        return (
            <div
                style={{
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    width: outerWidth,
                    height: outerHeight,
                }}>
                <div>
                    <div
                        className={cn(
                            'mkp-tooltip',
                            className,
                            `mkp-tooltip-placement-${direction}`,
                        )}
                        style={{
                            ...position,
                            transformOrigin: '50% 45px',
                            animationDuration: `${mouseEnterDelay}s`,
                        }}>
                        <div className="mkp-tooltip-content">
                            {isShowArrow && <div className="mkp-tooltip-arrow" />}
                            <div className="mkp-tooltip-inner" role="tooltip">
                                <span>{typeof title === 'function' ? title() : title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class TooltipHooks {
    intance = null;

    static getInstance = () => {
        if (!this.instance) {
            return (this.instance = new TooltipHooks());
        }
        return this.instance;
    };

    createNode = () => {
        const root = document.getElementById('root');
        const tooltipRoot = document.getElementById('tooltip');
        if (tooltipRoot) {
            return tooltipRoot;
        }
        const tooltipIdEle = document.createElement('div');
        tooltipIdEle.id = 'tooltip';
        root.appendChild(tooltipIdEle);
        return tooltipIdEle;
    };

    create = props => {
        console.log('create tooltip');
        ReactDOM.render(
            <Fragment>
                <Tooltip {...props} />
                {/* <Tooltip {...props} /> */}
            </Fragment>,
            this.createNode(),
        );
    };

    distory = () => {
        console.log('distory tooltip');
        const root = document.getElementById('root');
        const tooltipRoot = document.getElementById('tooltip');
        if (tooltipRoot) {
            root.removeChild(tooltipRoot);
            ReactDOM.unmountComponentAtNode(tooltipRoot);
        }
    };
}

export const TooltipHook = TooltipHooks.getInstance();
