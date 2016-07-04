'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _webrtcAdapter = require('webrtc-adapter');

var _webrtcAdapter2 = _interopRequireDefault(_webrtcAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shutter = function () {

  // The only necesary parameter is an id of the video element to use

  function Shutter(options) {
    _classCallCheck(this, Shutter);

    this.logging = options.logging || false;
    this.stream = null;
    // The options can just be a string and it'll use all the defaults
    this.selector = typeof options === 'string' ? options : options.selector;

    this.width = options.width || 640;
    this.height = options.height || 480;

    this.mimeType = options.mimeType || 'video/webm';

    if (!this.isTypeSupported(this.mimeType)) {
      this.error('This browser does not support the mimeType "', this.mimeType, '"');
    }

    this.stream = null;
    this.mediaRecorder = null;
    this.chunks = [];

    if (!location.protocol === 'https:' && location.host !== 'localhost') {
      this.error('Webcam videos are not allowed on insecure origins. Please use HTTPS');
    }

    this.video = document.querySelector('video' + this.selector);

    if (!this.video) {
      this.error('No video element found');
    }

    this.video.setAttribute('autoplay', true);
    this.video.setAttribute('muted', true);
    this.log('Created Recorder');
  }

  _createClass(Shutter, [{
    key: 'getUserMedia',
    value: function getUserMedia(callback) {
      var _this = this;

      // There are the optional constraints but those are very unpredictable
      var constraints = {
        video: { width: this.width, height: this.height },
        audio: true
      };
      return navigator.mediaDevices.getUserMedia(constraints).then(function (mediaStream) {
        _this.log('Webcam hooked up');
        // We can't pass this in as a handler because then the handleStream would lose the lexical
        // scope of this
        _this.handleStream(mediaStream);
        return mediaStream;
      }).catch(function () {
        _this.getUserMediaError();
      });
    }
  }, {
    key: 'isReadyToRecord',
    value: function isReadyToRecord() {
      return !!this.stream;
    }

    // Private method called to handle hte media stream once permission has been granted by the user

  }, {
    key: 'handleStream',
    value: function handleStream(mediaStream) {
      var _this2 = this;

      this.video.src = window.URL.createObjectURL(mediaStream);
      this.stream = mediaStream;
      var options = { mimeType: this.mimeType };
      this.mediaRecorder = new MediaRecorder(this.stream, options);

      this.mediaRecorder.ondataavailable = function (event) {
        if (event.data && event.data.size > 0) {
          _this2.chunks.push(event.data);
        }
      };

      this.mediaRecorder.onerror = function (error) {
        _this2.error(error);
      };
      this.mediaRecorder.onpause = function () {};
      this.mediaRecorder.onresume = function () {};
      this.mediaRecorder.onstart = function () {};
      this.mediaRecorder.onstop = function () {};
      this.mediaRecorder.onwarning = function (warning) {
        _this2.error(warning);
      };
    }
  }, {
    key: 'getState',
    value: function getState() {
      if (!this.mediaRecorder) {
        return 'inactive';
      }
      return this.mediaRecorder.state;
    }
  }, {
    key: 'getUserMediaError',
    value: function getUserMediaError(error) {
      this.error(error);
    }
  }, {
    key: 'start',
    value: function start() {
      this.mediaRecorder.start(10);
      this.log('Recording Started');
    }
  }, {
    key: 'stop',
    value: function stop(callback) {
      this.mediaRecorder.stop();
      this.blob = new Blob(this.chunks, { type: this.mimeType });
      this.log('Recording Finished');
      var fileSize = (this.blob.size / 1048576).toFixed(3) + 'mb';
      this.log('File Size: ' + fileSize);
      if (callback && typeof callback === 'function') {
        callback(this.getLinkToFile());
      }
    }
  }, {
    key: 'getLinkToFile',
    value: function getLinkToFile() {
      return window.URL.createObjectURL(this.blob);
    }
  }, {
    key: 'isTypeSupported',
    value: function isTypeSupported(type) {
      // I think firefox has different method for this idk?
      /* global no-undef  MediaRecorder */
      return MediaRecorder.isTypeSupported(type);
    }
  }, {
    key: 'getTypesSupported',
    value: function getTypesSupported() {
      var chromeTypes = ['video/webm', 'audio/webm', 'video/webm;codecs=vp8', 'video/webm;codecs=vp9'];
      return chromeTypes;
    }
  }, {
    key: 'error',
    value: function error(message) {
      console.log('Recorder Error: ', message);
    }
  }, {
    key: 'log',
    value: function log(message) {
      if (this.logging) {
        console.log(message);
      }
    }
  }]);

  return Shutter;
}();

module.exports = Shutter;
