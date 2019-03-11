import React from 'react';
import Player from "../components/player";
import './app.less';

const App = () => (
    <div>
        <Player 
            width={640}
            height={360}
            centered={true}
            autoPlay={false}
            src='http://qiniu.sevenyuan.cn/POP_STARS.mp4'
        />
    </div>
);

export default App;