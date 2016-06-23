var Recorder =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Recorder = function () {

	  // The only necesary parameter is an id of the video element to use

	  function Recorder(options) {
	    _classCallCheck(this, Recorder);

	    this.stream = null;
	    // The options can just be a string and it'll use all the defaults
	    this.selector = typeof options === 'string' ? options : options.selector;

	    this.height = options.height || 640;
	    this.height = options.height || 480;
	    this.mimeType = options.mimeType || 'video/webm';
	    if (!this.isTypeSupported(options.mimeType)) {
	      this.error('This browser does not support the mimeType "' + options.mimeType + '"');
	    }
	  }

	  _createClass(Recorder, [{
	    key: 'isTypeSupported',
	    value: function isTypeSupported(type) {
	      // I think firefox has different method for this idk?
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
	      console.error('Recorder Error: ' + message);
	    }
	  }]);

	  return Recorder;
	}();

	module.exports = Recorder;

/***/ }
/******/ ]);