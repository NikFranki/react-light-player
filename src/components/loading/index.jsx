import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';

export const Loading = () => (
    <div className="rotate-area">
        <div className="container">
            <div className="loader">
            </div>
        </div>
    </div>
);

export default {
    show: () => {
        if (!document.getElementById('loading')) {
            const div = document.createElement('div');
            div.setAttribute('id', 'loading');
            if (document.querySelector('.drawer-open')) {
                document.querySelector('.drawer-open').append(div);
                return;
            }
        }
        ReactDOM.render(<Loading />, document.getElementById('loading'))
    },
    hide: () => {
        if (!document.getElementById('loading')) {
            return;
        }
        ReactDOM.unmountComponentAtNode(document.getElementById('loading'))
    }
};
