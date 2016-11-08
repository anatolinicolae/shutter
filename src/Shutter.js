import Adapter from 'webrtc-adapter';
import Stopwatch from 'timer-stopwatch';

class Shutter {

  // The only necesary parameter is an id of the video element to use
  constructor(options) {
    this.logging = options.logging || false;
    this.stream = null;
    // The options can just be a string and it'll use all the defaults
    this.selector = typeof options === 'string' ? options : options.selector;

    this.width = options.width || 640;
    this.height = options.height || 480;

    this.mimeType = options.mimeType || 'video/webm';
    this.fileSize = 0;

    if (!this.isTypeSupported(this.mimeType)) {
      this.error('This browser does not support the mimeType "', this.mimeType, '"');
    }

    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];
    this.timer = new Stopwatch();
    this.currentTime = 0;
    this.timer.onTime((time) => {
      this.currentTime = time.ms;
    });
    if (!location.protocol === 'https:' && location.host !== 'localhost') {
      this.error('Webcam videos are not allowed on insecure origins. Please use HTTPS');
    }

    this.video = document.querySelector('video' + this.selector);

    if (!this.video) {
      this.error('No video element found');
    }

    this.video.setAttribute('autoplay', true);
    this.video.muted = true;

    this.log('Created Recorder');
  }

  // The same name as the browser for easy remembering
  // Just gets permission for the browser to use the webcam
  getUserMedia(callback) {
    // There are the optional constraints but those are very unpredictable
    const constraints = {
      video: { width: this.width, height: this.height },
      audio: true,
    };
    return navigator.mediaDevices.getUserMedia(constraints)
      .then((mediaStream) => {
        this.log('Webcam hooked up');
        // We can't pass this in as a handler because then the handleStream would lose the lexical
        // scope of this
        this.handleStream(mediaStream);
        if (callback && typeof(callback) === 'function') {
          callback(mediaStream);
        }
        return mediaStream;
      })
      .catch((error) => {
        this.error(error);
      });
  }

  isReadyToRecord() {
    return !! this.stream;
  }

  // Private method called to handle hte media stream once permission has been granted by the user
  handleStream(mediaStream) {
    this.video.src = window.URL.createObjectURL(mediaStream);
    this.stream = mediaStream;
    const options = { mimeType: this.mimeType };
    this.mediaRecorder = new MediaRecorder(this.stream, options);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.chunks.push(event.data);
      }
    };

    this.mediaRecorder.onerror = (error) => {
      this.error(error);
    };
    this.mediaRecorder.onpause = () => {
      this.timer.stop();
    };
    this.mediaRecorder.onresume = () => {
      this.timer.start();
    };
    this.mediaRecorder.onstart = () => {
      this.timer.start();
    };
    this.mediaRecorder.onstop = () => {
      this.timer.stop();
    };
    this.mediaRecorder.onwarning = (warning) => {
      this.error(warning);
    };
  }

  getState() {
    if (!this.mediaRecorder) {
      return 'inactive';
    }
    return this.mediaRecorder.state;
  }

  start() {
    this.mediaRecorder.start(10);
    this.log('Recording Started');
  }

  pause() {
    const event = new Event('timeupdate');
    this.mediaRecorder.dispatchEvent(event);
    if (this.isPausingSupported() && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.log('Recording Paused');
    }
  }

  isPausingSupported() {
    return Adapter.browserDetails.browser !== 'firefox' || Adapter.browserDetails.version >= 51;
  }

  resume() {
    if (this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.log('Recording Resumed');
    }
  }

  stop(callback) {
    this.mediaRecorder.stop();
    this.blob = new Blob(this.chunks, { type: this.mimeType });
    this.log('Recording Finished');
    this.fileSize = (this.blob.size / 1048576).toFixed(3);
    this.log('Video Length: ' + this.getCurrentTime()/1000 + ' sec');
    this.log('Video Size: ' + this.fileSize + 'mb');
    if (callback && typeof(callback) === 'function') {
      callback(this.getLinkToFile());
    }

    this.video.setAttribute('autoplay', false);
    this.video.muted = false;
    this.releaseWebcam();
  }

  getCurrentTime() {
    return this.currentTime;
  }

  // Only works after stop() has been called and the blob has been created
  // Returns in mbs
  getFileSize() {
    return this.fileSize;
  }


  releaseWebcam() {
    if (!this.stream) {
      return;
    }
    const tracks = this.stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
      tracks[i].stop();
    }
  }

  getLinkToFile() {
    return window.URL.createObjectURL(this.blob);
  }

  isRecordingSupported() {
    return !! MediaRecorder;
  }


  isTypeSupported(type) {
    // I think firefox has different method for this idk?
    /* global no-undef  MediaRecorder */
    return MediaRecorder.isTypeSupported(type);
  }

  getTypesSupported() {
    const chromeTypes = [
      'video/webm',
      'audio/webm',
      'video/webm;codecs=vp8',
      'video/webm;codecs=vp9'
    ];

    return chromeTypes;
  }

  error(message) {
    console.log('Recorder Error: ', message);
  }

  log(message) {
    if (this.logging) {
      console.log(message);
    }
  }

}

module.exports = Shutter;
