import React, { Component } from 'react';
import cn from '../../../util/classname';
import './index.less';

export default class MkpBezel extends Component {
    mkpBazelText = null;

    state = {
        isPlay: false,
        isHide: true,
    };

    handlePlayStatus = isPlay => {
        this.setState({ isPlay });
    };

    render() {
        const { isPlay, isHide } = this.state;
        return (
            <div
                className={cn('mkp-bezel-text-hide', `${isHide ? '' : 'active'}`)}
                ref={node => (this.mkpBazelText = node)}>
                <div className="mkp-bezel" role="status" aria-label={isPlay ? 'play' : 'pause'}>
                    <div className="mkp-bezel-icon">
                        <img
                            src={
                                isPlay
                                    ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABTklEQVRYR+2YPU7EMBBG34fEKSgoERVHgBtwDQr+LkALLOICewx+Gqq9BaIDCe4ANBiNFDeITRhnHFyspVRJnKd5tmcmorGhxnhYAQ0Z6Y1QSmkf2ATmkj6HJou4vxQopbQFPAJrwAtwIOkh4qN9c/QB7QGLHy/fAceSDLDK8AIZxAdwaVcNjSVAOTJVNI4BymC3wKGk1wiHEUBZ4wUwG6sxCihMYzRQBrsBjko01gIysHfANF55NNYEKtI4BZBL45RAeTeeSbpedkRMDZQ5tiU9/Qb1H0BfVkFIemsByPLgqaR5C8r+lGKmUOZKwjWBisqUWkD3XepwF3LRQC49NXeZ6ZlZ7vLkrVpAVvhbA+DWEw303J0ptp3DRskasv7M9JyP1RMRoVA9XqANwLSsd43iiaRQPS4geziltAPsNtFKh61S50Sr3zFDAWsuQt+JzKsl1DH+zgAAAABJRU5ErkJggg=='
                                    : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAg0lEQVRYR+2XwQrAIAxDzZ/vzzt2GMhwxDIPnTyPttaYRKlqxYaK4WkAcorA0J4MRcQxOpmk4Xw2v6895aGIiBdAw/XZfADdDEiyitiEq1hWgmw+kiHZ80nAQ84TMARDX28NHsJDeKhj4Lf9UK0m3/2lVsanJFu5oasFIBhyDLh4OQ+d9xSwJVowjfEAAAAASUVORK5CYII='
                            }
                            alt="img"
                        />
                    </div>
                </div>
            </div>
        );
    }
}
