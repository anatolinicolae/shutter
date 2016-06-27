# Shutter 

A lightweight and simple implementation of the MediaRecorder API for modern versions of Chrome and Firefox. 

## Download

#### npm
```
npm install shutter
```


## The Simplest Use

```js
<video id="video"></video>
...
// Pass in a query selector of the video element you want to use
var mediaRecorder = new Shutter('#video');
mediaRecorder.getUserMedia();
...
mediaRecorder.start();
...
mediaRecorder.stop(function(url){
   // Do whatever you want with the url here
   // Examples include:
   // Setting a download link so the user can download the video file
   // Upload the URL to a server
});

```



## How to use


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


    // Verbose mode
    logging: false,

  }
```
 
### Notes

A few common problems when using the MediaRecorder API:

- Getting webcam video requires `HTTPS` on websites. Insecure domains will not be able to use this library.
- The MediaRecorder API is supported on Chrome 49+ and Firefox 25+
- Although Chrome for Android has added this feature, this library has not been tested on it
- When using getUserMedia, the video element should have `autoplay` turned on so the stream is displayed immediately
- It's also recommended to have `muted` on during recording to avoid any weird feedback effects.


### Future Work


### Resources

 - [Chrome MediaRecorder Announcement](https://developers.google.com/web/updates/2016/01/mediarecorder?hl=en)
 - 

### Demo
View the example link provided near the top of this README or see it in action on my
[website](http://www.connoratherton.com/walkway).