import Adapter from 'webrtc-adapter/out';


class Recorder {

  // The only necesary parameter is an id of the video element to use
  constructor(options) {
    this.stream = null;
    // The options can just be a string and it'll use all the defaults
    this.selector = typeof options === 'string' ? options : options.selector;

    this.height = options.height || 640;
    this.height = options.height || 480;
    this.mimeType = options.mimeType || 'video/webm';

    if (!this.isTypeSupported(this.mimeType)) {
      this.error('This browser does not support the mimeType "', this.mimeType, '"');
    }

    // Inner workings
    this.state = 'inactive';
    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];

    if (!location.protocol === 'https:' && location.host !== 'localhost') {
      this.error('Webcam videos are not allowed on insecure origins. Please use HTTPS');
    }

    this.video = document.querySelector('video');
    if (!this.video) {
      this.error('No video elemnt found');
    }
  }

  getUserMedia() {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        // We can't pass this in as a handler because then the handleStream would lose the lexical
        // scope of this
        this.handleStream(mediaStream);
      })
      .catch(this.getUserMediaError());
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

    this.mediaRecorder.onerror = () => {};
    this.mediaRecorder.onpause = () => {};
    this.mediaRecorder.onresume = () => {};
    this.mediaRecorder.onstart = () => {};
    this.mediaRecorder.onstop = () => {

    };
    this.mediaRecorder.onwarning = () => {};
  }

  getUserMediaError(error) {
    console.log(error);
  }

  start() {
    this.mediaRecorder.start();
  }

  stop() {
    this.mediaRecorder.stop();
  }

  getDownloadLink() {

  }


  isTypeSupported(type) {
    // I think firefox has different method for this idk?
    /* global no-undef  MediaRecorder */
    return MediaRecorder.isTypeSupported(type);
  }

  getTypesSupported() {
    const chromeTypes = ['video/webm',
                          'audio/webm',
                          'video/webm;codecs=vp8',
                          'video/webm;codecs=vp9'];
    return chromeTypes;
  }

  error(message) {
    console.log('Recorder Error: ', message);
  }

}

module.exports = Recorder;

