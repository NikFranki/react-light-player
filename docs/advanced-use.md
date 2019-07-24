### Props

Prop | Description | Default
---- | ----------- | -------
`src` | The url of a video or song to play<br/>&nbsp; ◦ &nbsp;Can be an [array] | ''
`className` | Set to media inline class | ''
`centered` | Set to `true` or `false` to position the media | `false`
`width` | Set the width of the player | `600px`
`height` | Set the height of the player | `337px`
`title` | Set the title of the player | ''
`disableSettings` | Set to `true` or `false` to disable the media showing settings | `true`
`disableTheaterMode` | Set to `true` or `false` to disable the media showing theater mode | `true`
`disableFullscreenMode` | Set to `true` or `false` to disable the media showing fullscreen mode | `false`

#### Callback props

Callback props take a function that gets fired on various player events:

Prop | Description
---- | -----------
`onFullscreenChange` | Called when media is fullscreenchange. | Called when media starts open fullscreen or close fullscreen

### Full Usage

```js
class ResponsivePlayer extends Component {
  render () {
    return (
        <Player
            width={600}
            height={337}
            centered={false}
            autoPlay={false}
            title="pop stars"
            disableSettings={true}
            disableTheaterMode={true}
            onFullscreenChange={(value) => console.log(value)}
            disableFullscreenMode={true}
            src='http://qiniu.sevenyuan.cn/POP_STARS.mp4'
        />
    )
  }
}
```
