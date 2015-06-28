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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Reg = __webpack_require__(1);

	var _Reg2 = _interopRequireDefault(_Reg);

	var _Util = __webpack_require__(3);

	window.generateRegex = generateRegex;

	function generateRegex(callback, flags) {
	  var reg = new _Reg2['default'](callback, flags),
	      str = reg.toString();
	  return new RegExp((0, _Util.join)(str), flags);
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Set = __webpack_require__(2);

	var _Set2 = _interopRequireDefault(_Set);

	var _Group = __webpack_require__(6);

	var _Group2 = _interopRequireDefault(_Group);

	var _Str = __webpack_require__(7);

	var _Str2 = _interopRequireDefault(_Str);

	var _Util = __webpack_require__(3);

	var Reg = (function () {
	  function Reg(callback, flags) {
	    _classCallCheck(this, Reg);

	    this.flags = flags;
	    this.cleanupSteps = [];
	    this.setup();
	    this.regex = callback();
	    this.cleanup();
	  }

	  _createClass(Reg, [{
	    key: 'setup',
	    value: function setup() {
	      var _this = this;

	      this.func('literal', _Str2['default']);
	      this.func('group', _Group2['default']);
	      this.func('set', _Set2['default']);
	      this.vari('numbers', '0-9');
	      this.vari('letters', {
	        toString: function toString() {
	          return _this.flags.indexOf('i') < 0 ? 'A-Za-z' : 'a-z';
	        },
	        uppercase: 'A-Z',
	        lowercase: 'a-z'
	      });
	      this.vari('start', '^');
	      this.vari('end', '$');
	      this.vari('space', '\\s');
	      this.vari('word', '\\w');
	    }
	  }, {
	    key: 'cleanup',
	    value: function cleanup() {
	      this.cleanupSteps.forEach(function (fn) {
	        return fn();
	      });
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      return this.regex;
	    }
	  }, {
	    key: 'func',
	    value: function func(key, obj) {
	      var backup = window[key];
	      this.cleanupSteps.push(function () {
	        return window[key] = backup;
	      });
	      window[key] = function () {
	        return new obj(arguments);
	      };
	    }
	  }, {
	    key: 'vari',
	    value: function vari(key, val) {
	      var backup = window[key];
	      this.cleanupSteps.push(function () {
	        return window[key] = backup;
	      });
	      window[key] = val;
	    }
	  }]);

	  return Reg;
	})();

	exports['default'] = Reg;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _Util = __webpack_require__(3);

	var _Base2 = __webpack_require__(4);

	var _Base3 = _interopRequireDefault(_Base2);

	var Set = (function (_Base) {
	  function Set(data) {
	    _classCallCheck(this, Set);

	    _get(Object.getPrototypeOf(Set.prototype), 'constructor', this).call(this, data, '[', ']');
	    this.flags.not = false;
	  }

	  _inherits(Set, _Base);

	  _createClass(Set, [{
	    key: 'not',
	    value: function not() {
	      this.flags.not = true;
	      return this;
	    }
	  }]);

	  return Set;
	})(_Base3['default']);

	exports['default'] = Set;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports.join = join;
	exports.makeArray = makeArray;

	function join(arr) {
	  arr = makeArray(arr);
	  return arr.map(function (item) {
	    return item.toString();
	  }).join('');
	}

	function makeArray(arr) {
	  switch (typeof arr) {
	    case 'string':
	      return [arr];
	    default:
	      return arr.hasOwnProperty('length') ? Array.prototype.slice.call(arr) : [arr];
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _Util = __webpack_require__(3);

	var _EscapedString = __webpack_require__(5);

	var _EscapedString2 = _interopRequireDefault(_EscapedString);

	var Base = (function () {
	  function Base(data) {
	    var open = arguments[1] === undefined ? '' : arguments[1];
	    var close = arguments[2] === undefined ? '' : arguments[2];

	    _classCallCheck(this, Base);

	    this.flags = {
	      some: false,
	      any: false,
	      min: false,
	      max: false,
	      optional: false
	    };
	    this.data = (0, _Util.makeArray)(data).map(this.escape);
	    this.open = open;
	    this.close = close;
	  }

	  _createClass(Base, [{
	    key: 'escape',
	    value: function escape(str) {
	      return typeof str === 'string' ? new _EscapedString2['default'](str) : str;
	    }
	  }, {
	    key: 'min',
	    value: function min(_min) {
	      return this.range(_min, this.flags.max);
	    }
	  }, {
	    key: 'max',
	    value: function max(_max) {
	      return this.range(this.flags.min, _max);
	    }
	  }, {
	    key: 'range',
	    value: function range(min, max) {
	      this.flags.min = min;
	      this.flags.max = max;
	      this.flags.any = false;
	      this.flags.some = false;
	      this.flags.optional = false;
	      return this;
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      var str = (0, _Util.join)(this.data);
	      if (str.length === 0) return '';
	      return this.open + (this.flags.not ? '^' : '') + (0, _Util.join)(this.data) + this.close + (this.flags.any ? '*' : '') + (this.flags.optional ? '?' : '') + this.getRange() + (this.flags.some ? '+' : '');
	    }
	  }, {
	    key: 'getRange',
	    value: function getRange() {
	      if (this.flags.min === false && this.flags.max === false) return '';
	      var range = '{';
	      range += this.flags.min === false ? '' : this.flags.min;
	      range += ',';
	      range += this.flags.max === false ? '' : this.flags.max;
	      range += '}';
	      return range;
	    }
	  }, {
	    key: 'some',
	    get: function get() {
	      this.flags.some = true;
	      this.flags.any = false;
	      this.flags.min = false;
	      this.flags.max = false;
	      this.flags.optional = false;
	      return this;
	    }
	  }, {
	    key: 'any',
	    get: function get() {
	      this.flags.any = true;
	      this.flags.some = false;
	      this.flags.min = false;
	      this.flags.max = false;
	      this.flags.optional = false;
	      return this;
	    }
	  }, {
	    key: 'optional',
	    get: function get() {
	      this.flags.optional = true;
	      this.flags.any = false;
	      this.flags.some = false;
	      this.flags.min = false;
	      this.flags.max = false;
	      return this;
	    }
	  }]);

	  return Base;
	})();

	exports['default'] = Base;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var EscapedString = (function () {
	  function EscapedString(data) {
	    _classCallCheck(this, EscapedString);

	    this.data = data.replace(/[\.\[\]\(\)\+\*\{\}\,]/g, '\\$&');
	  }

	  _createClass(EscapedString, [{
	    key: 'toString',
	    value: function toString() {
	      return this.data;
	    }
	  }]);

	  return EscapedString;
	})();

	exports['default'] = EscapedString;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _Util = __webpack_require__(3);

	var _Base2 = __webpack_require__(4);

	var _Base3 = _interopRequireDefault(_Base2);

	var Group = (function (_Base) {
	  function Group(data) {
	    _classCallCheck(this, Group);

	    _get(Object.getPrototypeOf(Group.prototype), 'constructor', this).call(this, data, '(', ')');
	  }

	  _inherits(Group, _Base);

	  return Group;
	})(_Base3['default']);

	exports['default'] = Group;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _Util = __webpack_require__(3);

	var _Group = __webpack_require__(6);

	var _Group2 = _interopRequireDefault(_Group);

	var _Base2 = __webpack_require__(4);

	var _Base3 = _interopRequireDefault(_Base2);

	var Str = (function (_Base) {
	  function Str(data) {
	    _classCallCheck(this, Str);

	    _get(Object.getPrototypeOf(Str.prototype), 'constructor', this).call(this, data);
	  }

	  _inherits(Str, _Base);

	  _createClass(Str, [{
	    key: 'hasFlags',
	    value: function hasFlags() {
	      for (var val in this.flags) {
	        if (this.flags[val]) return true;
	      }
	    }
	  }, {
	    key: 'toString',
	    value: function toString() {
	      var str = (0, _Util.join)(this.data);
	      if (this.hasFlags() && str.length > 1) {
	        var grp = new _Group2['default'](this.data);
	        grp.flags = this.flags;
	        return grp.toString();
	      } else {
	        return _get(Object.getPrototypeOf(Str.prototype), 'toString', this).call(this);
	      }
	    }
	  }]);

	  return Str;
	})(_Base3['default']);

	exports['default'] = Str;
	module.exports = exports['default'];

/***/ }
/******/ ]);