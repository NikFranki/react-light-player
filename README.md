
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
<ReactLightPlayer
    title=""
    width={600}
    height={337}
    centered={false}
    autoPlay={false}
    title="pop stars"
    src='http://qiniu.sevenyuan.cn/POP_STARS.mp4'
/>
```
If you want to know more, please click on the link below
[more use](docs/advanced-use.md)

Example
-----
```js
import ReactLightPlayer from 'react-light-player';
class App extends Component {
  render() {
    return (
        <ReactLightPlayer
            title=""
            width={600}
            height={337}
            centered={false}
            autoPlay={false}
            title="pop stars"
            src='http://qiniu.sevenyuan.cn/POP_STARS.mp4'
        />
    )
  }
}
```

## Contributing

react-light-player is a free and open source library, and we appreciate any help you're willing to give - whether it's fixing bugs, improving documentation, or suggesting new features. Check out the [contributing guide][contributing] for more!

## Performance
![image][logo]

## [License][license]

MIT

[logo]: http://qiniu.sevenyuan.cn/play.png

[license]: LICENSE

[coc]: CODE_OF_CONDUCT.md
