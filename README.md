# shutter 

A lightweight and simple implementation of the MediaRecorder API for modern versions of Chrome and Firefox. 

## Download

#### npm
```
npm install shutter
```


### The Basic Use Case

HTML:
```html
<video id="video"></video>
```

JS:
```js
// Pass in a query selector of the video element you want to use
var shutter = new Shutter('#video');
...
shutter.getUserMedia();
...
shutter.start();
...
// Optional Pause/Resume if that's your jam: 
shutter.pause();
shutter.resume();
...
shutter.stop(function(url) {
   // Do whatever you want with the blob url here
   // Examples include:

   // Setting a download link so the user can download the video file
      var link = document.getElementById('download');
      link.href = url;
      link.download = 'video.webm';

   // Upload the blob to your server
      var formData = new FormData();
      formData.append('video', url);

      var request = new XMLHttpRequest();
      request.open("POST", "http://foo.com/submitform.php");
      request.send(formData);

   // Set the src of the video element to the url to replay the captured footage
      document.getElementById('video').src = url;

});

```



### More In-Depth Usage


``` js
// Create a new instance, options are explained below
var mediaRecorder = new Shutter(options);

// Request permission to use the webcam video.
mediaRecorder.getUserMedia(function(streamURL) {
  // Set a video src to the stream URL to display the webcam video the user
  document.getElementById('video').src = streamURL;
});
 
// Start recording
mediaRecorder.start();

// Stop Recording
mediaRecorder.stop(function(downloadURL) {
  // Set a link to this URL to let the user download the file
  // OR, use the URL to send the file to a server
});


```

### Options

```js
  {
    // The width of the video to record
    // Only certain resolutions are supported by webcams so be careful
    width: 640,

    // The height of the video
    height: 480,
    
    // The file type of the recorded file
    // Possible types for Chrome: ['video/webm','audio/webm','video/webm;codecs=vp8','video/webm;codecs=vp9'];
    mimeType: 'video/webm',
    
    // The selector of the video element
    selector: '#video'

    // Verbose mode
    logging: false,

  }
```
 
### Notes

The MediaRecorder API is still pretty new and full of fun little bugs/features that need to be kept in mind.

- Getting webcam video requires `HTTPS` on websites. Insecure domains will not be able to use this library.
- The MediaRecorder API is supported on Chrome 49+ and Firefox 25+
- Although Chrome for Android has added this feature, this library has not been tested on it
- When using getUserMedia, the video element should have `autoplay` turned on so the stream is displayed immediately
- It's also recommended to have `muted` on during recording to avoid any weird feedback effects.
- Configuring the bitrate for the video and audio is in the spec, but due to a [mix-up with kilobits and bits](https://bugs.chromium.org/p/chromium/issues/detail?id=605750&can=1&q=MediaRecorder%20bitrate&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified) it does not work in Chrome 
- Likewise, pausing and resuming does not work in Chrome 49 and Chrome 50 due to [this issue](https://bugs.chromium.org/p/chromium/issues/detail?id=593560&can=1&q=MediaRecorder%20pausing&colspec=ID%20Pri%20M%20Stars%20ReleaseBlock%20Component%20Status%20Owner%20Summary%20OS%20Modified)



### Resources

 - [Chrome MediaRecorder Announcement](https://developers.google.com/web/updates/2016/01/mediarecorder?hl=en)
 - [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder), the most comprehensive resource

### Demo
View the example link provided near the top of this README or see it in action on my
[website](http://www.connoratherton.com/walkway).