import React, { Fragment, Component } from 'react';
import cn from '../../../util/classname';
import './index.less';

export default class MkpBezel extends Component {
    mkpBazelText = null;

    state = {
        role: 'video_play_or_pause',
        isPlay: false,
        isAddVolume: false,
        volume: 0,
        isHide: true,
    };

    content = () => {
        const { isPlay, isAddVolume, volume } = this.state;
        return {
            video_play_or_pause: (
                <div
                    className="mkp-bezel"
                    role="status"
                    aria-label={isPlay ? 'play' : 'pause'}>
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
            ),
            volume_up_or_down: (
                <Fragment>
                    <div className="mkp-bezel-text-wrapper">
                        <div className="mkp-bezel-text">{volume}%</div>
                    </div>
                    <div
                        className="mkp-bezel"
                        role="status"
                        aria-label={isAddVolume ? 'add' : 'minify'}>
                        <div className="mkp-bezel-icon">
                            <img
                                src={
                                    isAddVolume
                                        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAACjklEQVRYR+2Xz4uNURjHP9+FDVlYUTaKCclYWKixsaCUhSYSDU1KylLMoDDEhpn8ARaIosmvYaFYycLEygIrLGyElWJFHj23c6fj3PPe98798TaLeerWfd639zyf8/w8R8wx0RzjYR6oLCI98ZCZLZX0tcx47n2vgP4Az4GrwF1J1ipcV4DMbEzS+bpRM4sB3gNHJL1oBapjIDM7DoxLmlkrAXIO99hhSdfLoDoCqsO4kQRoDbAPOAUsiCBGJE00g2obKIZJgaLQbQAmgdURxAlJl4ug2gJKYYqA/LmZLQIeAtsCxF9gQNKrrlRZDqYZUAQ1DawPEJ+AVbnqm5WHimAyOTQVkvhbFL5+4I2nW3i2Q9KT1EsNQGa2BfBfKsuBQ4Wxb6yyj8BGST8iqBvAcNAfS9rZCtA5YKysPBsWypf9A0m7kiR3L7n8BJZI8pYwIzkPdRPIDW2S9DqC+gCsDPpmSS+rBpqQNBIB3QQOBH1YkuuVemhK0mAE5I3xWNBPSrpUNdB9SbsLgEYljVcNdFHSmQjoFrA/6AcleeVVFjKf+t4AvRHWxMzeAuuCul3S0yqB/Cy0J4JZBnypswGLJf0qAypqjCuiphavUfufOX58BvqTxngBOB0+npY0kC4029HhCejnnzKgR97VJX2PvOMbegcsDM+GJN3uCCjkQBYq9lBqJEz8dLj2SfLJ/5/MykPRbhugioACjA/breH77h4/iqByQGbmE/4e0Be54awkz6WstOWhHFSS1GuBIWA0OcJOStpbBFMrjmYvW3lnZrXwlRzyfakrgI+K3z0Fqid6MkDTa9BRSc9a2WDHHsoZMbP6RfEacKfyi2KmzOfWVbqV0PSkyjoxPA/Urvf+AVJrNzTYZb69AAAAAElFTkSuQmCC'
                                        : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAADEklEQVRYR+2XW4hOURiGnzcppxQp5UooRIikHMcFN5IkIsUVJVwockpIyCE3pHDhkBQKOSZySoq4QUo5XJMb5VCSV2ta87f+PXv/e4+Zqbmwamr2Xnt961nfer/DL7rYUBfj4T9Q2Y0Uesj2DEkPywzkzdseKOnTv6zNBbJ9GFgDrJR0oq2Gbf8GHgDHgYuSXNVGKyDbM4F7iYFSKNtbJe1uWWM7BXgDrJL0qApUkYfWAweqQNkOnjwsqWYrAxTMBI+Fg50sg2qkoSzUWklHUoO2V8RrIQM0AlgCbAa6J2s2SDrYCKph2NsuhLLdDXgOjAsbpEDJ1Y0FzgPDE4iNkvYXQZXmoZYrSQzUPGW7b9TbhDygsMZ2b+AyMCva+ANMlvQ0D6oUKBpt1kkBVNjwlqTpRaeOUE+AMfGbD8CwvOirBFQBqqekn8lVXYki/py8GwK8BMIBwpgj6Wb2EHlh3wSEv7yxCBhZJtIYZe+BcJVfE6gQuUGXYVyVNK8K0A5ge6NIyMy1ipwk7C9JWpAAjQJex+dvQD9JISXURp6H2goUjNVB2b4NzI67TJL0LIF6BwyNz1MkBW11OFAwuEPSzvCP7R7AHWAqcFDShgToNLAsPi+XdKazgOo8ZbsXEDz1RdL8Ah1tkrSvM4HyoEIirGnS9iFgXYTYImlvZwO10lS6oe0LwML4brWko50FtA3YlRjPrVu2PwKD43dN2Z6ro6KsuZbl1L5s9I0GXkWYX0B/Sd/LPFSUGMOplqeL6wzF9iOn9tWgbPeJQp8MXJc0N2uvcumI4Zxm2jpbmfYjW/tSqJ7AXWCPpBvtAmoEla32sVc6FjqTuGkKFerZj3YV10yktPJUQT8UEuCpPKjCqy+aKHtvuw6qAGg8cA0YVBZ9LfNt0lAWMoXKaGhiTH6LE++kywtb2XYBpZoqafJDlxg8lbYbuVDtBmqByhTQ9GfQW2CppBc5KWGapMcN81CZdqrMJz8UzwLnJIUk2DwSqLouoEM0VARne4CkLw3mZ0q6nzffIVdWxWtVv/kPVOapLuehv4xScTSTE+IpAAAAAElFTkSuQmCC'
                                }
                                alt="img"
                            />
                        </div>
                    </div>
                </Fragment>
            ),
        };
    }

    render() {
        const { role, isHide } = this.state;
        return (
            <div
                className={cn('mkp-bezel-text-hide', `${isHide ? '' : 'active'}`)}
                ref={node => (this.mkpBazelText = node)}>
                {this.content()[role]}
            </div>
        );
    }
}
