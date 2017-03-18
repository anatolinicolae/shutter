<p align="center">
  <img src="https://github.com/anatolinicolae/shutter/raw/master/assets/shutter.png" height="128" />
  <h3 align="center">Shutter</h3>
  <p align="center">Lightweight and simple MediaRecorder API for modern browsers</p>
  <p align="center">
    <a href="https://github.com/anatolinicolae/shutter/releases"><img src="https://img.shields.io/github/release/anatolinicolae/shutter.svg" alt="GitHub version"></a>
    <a href="https://travis-ci.org/anatolinicolae/shutter"><img src="https://img.shields.io/travis/anatolinicolae/shutter.svg" alt="Travis"></a>
  </p>
</p>

## The Basic Use Case

HTML

```html
<video id="video"></video>
```

JS

```js
// Pass in a query selector of the video element you want to use
// You can initialize with a string selector, or an options object
// Explained in more depth below
let shutter = new Shutter('#video')

shutter.getUserMedia()

shutter.start()

// Optional Pause/Resume if that's your jam:
shutter.pause()
shutter.resume()

shutter.stop((url) => {

  // Do whatever you want with the link to the finished video here
  // Potential Ideas:

  // Setting a download so the user can download the video file
  let link = document.getElementById('download')
  link.href = url
  link.download = 'video.webm'

  // Upload the video to your server
  let formData = new FormData()
  formData.append('video', url)

  let request = new XMLHttpRequest()
  request.open("POST", "http://foo.com/submitform.php")
  request.send(formData)

  // Set the src of the video element to the url to replay the captured footage
  document.getElementById('video').src = url

})
```

## Additional Methods

``` js
// Returns the elapsed time of the recorded video in milliseconds
shutter.getCurrentTime();

// Returns the file size of the video in megabits
// Can only be called after recording has completed and stop() used
shutter.getFileSize();

// Returns a link to the blob URL file of the recorded video
// Can only be called after recording has completed and stop() used
shutter.getLinkToFile();

```

## Methods for Understanding the MediaRecorder API

```js
// While in the spec, pausing is only supported in Chrome 51+ and all Firefox
shutter.isPausingSupported();

// Chrome 49+ and Firefox 25+ are the only browsers supported
shutter.isRecordingSupported();

// Possible types for Chrome:
// ['video/webm','audio/webm','video/webm;codecs=vp8','video/webm;codecs=vp9'];
shutter.isTypeSupported(type);
```

## Options for Initialization

```js
{
  // The width of the video to record
  // Only certain resolutions are supported by webcams so be careful
  width: 640,

  // The height of the video
  height: 480,

  // The file type of the recorded file
  // Possible types for Chrome:
  // ['video/webm','audio/webm','video/webm;codecs=vp8','video/webm;codecs=vp9'];
  mimeType: 'video/webm',

  // The selector of the video element
  selector: '#video',

  // Verbose mode
  logging: false
}
```

## Notes

The MediaRecorder API is still pretty new and full of fun little bugs/features that need to be kept in mind.

- Getting webcam video requires `HTTPS` on websites. Insecure domains will not be able to use this library.
- The MediaRecorder API is supported on Chrome 49+ and Firefox 25+
- Although Chrome for Android has added this feature, this library has not been tested on it
- When using getUserMedia, the video element should have `autoplay` turned on so the stream is displayed immediately
- It's also recommended to have `muted` on during recording to avoid any weird feedback effects.
- Configuring the bitrate for the video and audio is in the spec, but due to a [mix-up with kilobits and bits](https://bugs.chromium.org/p/chromium/issues/detail?id=605750&can=1&q=MediaRecorder%20bitrate&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified) it does not work in Chrome
- Likewise, pausing and resuming does not work in Chrome 49 and Chrome 50 due to [this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=593560&can=1&q=MediaRecorder%20pausing&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified)

## Resources

 - [Chrome MediaRecorder Announcement](https://developers.google.com/web/updates/2016/01/mediarecorder?hl=en)
 - [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder), the most comprehensive resource

## Credits

The code was initially written by [Sean Carney](/carnye), who shut down the repository some time ago :cry:
