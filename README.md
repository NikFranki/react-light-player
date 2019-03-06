
# react-light-player

> react-light-player is a web video player, it is base on video tag, This project was started early 2019, more fun you will get.

## Table of Contents

* [Quick Start](#quick-start)
* [Contributing](#contributing)
* [License](#license)

## Quick Start

### Installation

```
$ npm install react-light-player
```

Usage
----
```js
<Player
    width={640}
    height={360}
    centered={true}
    autoPlay={true}
    src='http://qiniu.sevenyuan.cn/POP_STARS.mp4'
/>
```

Example
-----
```js
import React, { Component } from 'react';
class App extends Component {
  render() {
    return (
        <Player
            width={640}
            height={360}
            centered={true}
            autoPlay={true}
            src='http://qiniu.sevenyuan.cn/POP_STARS.mp4'
        />
    )
  }
}
```

## Contributing

react-light-player is a free and open source library, and we appreciate any help you're willing to give - whether it's fixing bugs, improving documentation, or suggesting new features. Check out the [contributing guide][contributing] for more!

## [License][license]

MIT

## Performance
![image][logo]

[logo]: http://qiniu.sevenyuan.cn/player.gif

[license]: LICENSE

[coc]: CODE_OF_CONDUCT.md
