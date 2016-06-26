# Shutter [

The new MediaRecorder API opened up the ability to record webcam videos 

## Download

#### npm
```
npm install shutter
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





svg.draw();

// If you don't want to change the default options you can
// also supply the constructor with a selector string.
var svg = new Walkway('#test');

svg.draw(function() {
  console.log('Animation finished');
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
- This is supported on Chrome 49+ and Firefox 25+
- Although Chrome for Android has added this feature, this library has not been tested on it


### Future Work


### Resources

- [Chrome MediaRecorder Announcement](https://developers.google.com/web/updates/2016/01/mediarecorder?hl=en)
- 

### Demo
View the example link provided near the top of this README or see it in action on my
[website](http://www.connoratherton.com/walkway).