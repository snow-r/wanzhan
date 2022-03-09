(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["subpages/common/vendor"],{

/***/ 713:
/*!*************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcode.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var barcodes = __webpack_require__(/*! ./barcodes/index.js */ 714)['default'];

var _barcode = {};

(function () {
  // 初始化
  _barcode = function barcode(cont, ctxid, options, ctxsize, result) {
    var ops = {},
        newOptions,
        encodings,
        globaContext,
        ctx,
        globaCtxid,
        cbCanvasSize,
        cbResult;
    globaCtxid = ctxid;
    cbCanvasSize = ctxsize;
    cbResult = result;
    newOptions = Object.assign(ops, options); // 修成margin

    fixMargin(newOptions); // 处理options 数据

    if (newOptions.text == '' || cont == '') {
      return false;
    } // 获取ctx


    globaContext = cont;
    ctx = uni.createCanvasContext(globaCtxid, globaContext); // 获取编码数据

    encodings = new barcodes[newOptions.format.toUpperCase()](newOptions.text, newOptions).encode();
    var fixencodings = fixEncodings(encodings, newOptions); // 返回canvas实际大小

    cbCanvasSize({
      width: fixencodings.width,
      height: fixencodings.height
    }); // 绘制canvas

    setTimeout(function () {
      drawCanvas.render(newOptions, fixencodings);
    }, 50); // 绘制canvas

    var drawCanvas = {
      render: function render(options, encoding) {
        var _this = this;

        this.prepare(options, encoding);
        encoding.encodings.forEach(function (v, i) {
          _this.barcode(options, v);

          _this.text(options, v);

          _this.move(v);
        });
        this.draw(options, encoding);
      },
      barcode: function barcode(options, encoding) {
        var binary = encoding.data;
        var yFrom;

        if (options.textPosition == "top") {
          yFrom = options.marginTop + options.fontSize + options.textMargin;
        } else {
          yFrom = options.marginTop;
        } // 绘制条码


        ctx.fillStyle = options.lineColor;

        for (var b = 0; b < binary.length; b++) {
          var x = b * options.width + encoding.barcodePadding;
          var height = options.height;

          if (encoding.options) {
            if (encoding.options.height != undefined) {
              height = encoding.options.height;
            }
          }

          if (binary[b] === "1") {
            ctx.fillRect(x, yFrom, options.width, height);
          } else if (binary[b]) {
            ctx.fillRect(x, yFrom, options.width, height * binary[b]);
          }
        }
      },
      text: function text(options, encoding) {
        if (options.displayValue) {
          var x, y, align, size;

          if (options.textPosition == "top") {
            y = options.marginTop + options.fontSize;
          } else {
            y = options.height + options.textMargin + options.marginTop + options.fontSize;
          }

          if (encoding.options) {
            if (encoding.options.textAlign != undefined) {
              align = encoding.options.textAlign;
            }

            if (encoding.options.fontSize != undefined) {
              size = encoding.options.fontSize;
            }
          } else {
            align = options.textAlign;
            size = options.fontSize;
          }

          ctx.setFontSize(size);

          if (align == "left" || encoding.barcodePadding > 0) {
            x = 0;
            ctx.setTextAlign('left');
          } else if (align == "right") {
            x = encoding.width - 1;
            ctx.setTextAlign('right');
          } else {
            x = encoding.width / 2;
            ctx.setTextAlign('center');
          }

          ctx.fillStyle = options.fontColor;

          if (encoding.text != undefined) {
            ctx.fillText(encoding.text, x, y);
          }
        }
      },
      move: function move(encoding) {
        ctx.translate(encoding.width, 0);
      },
      prepare: function prepare(options, encoding) {
        // 绘制背景
        if (options.background) {
          ctx.fillStyle = options.background;
          ctx.fillRect(0, 0, encoding.width, encoding.height);
        }

        ctx.translate(options.marginLeft, 0);
      },
      draw: function draw(options, encoding) {
        var _this2 = this;

        ctx.draw(false, function () {
          _this2.toImgs(options, encoding);
        });
      },
      toImgs: function toImgs(options, encoding) {
        setTimeout(function () {
          uni.canvasToTempFilePath({
            width: encoding.width,
            height: encoding.height,
            destWidth: encoding.width,
            destHeight: encoding.height,
            canvasId: globaCtxid,
            fileType: 'png',
            success: function success(res) {
              cbResult(res.tempFilePath);
            },
            fail: function fail(res) {
              cbResult(res);
            },
            complete: function complete() {// uni.hideLoading();
            }
          }, globaContext);
        }, options.text.length + 100);
      }
    }; // 混入canvas数据

    function fixEncodings(encoding, options) {
      var encodingArr = [],
          width = options.marginLeft + options.marginRight,
          height;

      if (!Array.isArray(encoding)) {
        encodingArr[0] = JSON.parse(JSON.stringify(encoding));
      } else {
        encodingArr = _toConsumableArray(encoding);
      }

      encodingArr.forEach(function (v, i) {
        // 获取文本宽度
        var textWidth = ctx.measureText(encodingArr[i].text ? encodingArr[i].text : '').width; // 获取条形码宽度

        var barcodeWidth = encodingArr[i].data.length * options.width; // 获取内边距

        var barcodePadding = 0;

        if (options.displayValue && barcodeWidth < textWidth) {
          if (options.textAlign == "center") {
            barcodePadding = Math.floor((textWidth - barcodeWidth) / 2);
          } else if (options.textAlign == "left") {
            barcodePadding = 0;
          } else if (options.textAlign == "right") {
            barcodePadding = Math.floor(textWidth - barcodeWidth);
          }
        } // 混入encodingArr[i]


        encodingArr[i].barcodePadding = barcodePadding;
        encodingArr[i].width = Math.ceil(Math.max(textWidth, barcodeWidth));
        width += encodingArr[i].width;

        if (encodingArr[i].options) {
          if (encodingArr[i].options.height != undefined) {
            encodingArr[i].height = encodingArr[i].options.height + (options.displayValue && (encodingArr[i].text ? encodingArr[i].text : '').length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
          } else {
            encodingArr[i].height = height = options.height + (options.displayValue && (encodingArr[i].text ? encodingArr[i].text : '').length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
          }
        } else {
          encodingArr[i].height = height = options.height + (options.displayValue && (encodingArr[i].text ? encodingArr[i].text : '').length > 0 ? options.fontSize + options.textMargin : 0) + options.marginTop + options.marginBottom;
        }
      });
      return {
        encodings: encodingArr,
        width: width,
        height: height
      };
    } // 修正Margin


    function fixMargin(options) {
      options.marginTop = options.marginTop == undefined ? options.margin : options.marginTop;
      options.marginBottom = options.marginBottom == undefined ? options.margin : options.marginBottom;
      options.marginRight = options.marginRight == undefined ? options.margin : options.marginRight;
      options.marginLeft = options.marginLeft == undefined ? options.margin : options.marginLeft;
    }
  };
})();

var _default = _barcode;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 714:
/*!********************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/index.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CODE = __webpack_require__(/*! ./CODE39/ */ 715);

var _CODE2 = __webpack_require__(/*! ./CODE128/ */ 717);

var _EAN_UPC = __webpack_require__(/*! ./EAN_UPC/ */ 725);

var _ITF = __webpack_require__(/*! ./ITF/ */ 735);

var _MSI = __webpack_require__(/*! ./MSI/ */ 739);

var _pharmacode = __webpack_require__(/*! ./pharmacode/ */ 746);

var _codabar = __webpack_require__(/*! ./codabar */ 747);

var _GenericBarcode = __webpack_require__(/*! ./GenericBarcode/ */ 748);

exports.default = {
  CODE39: _CODE.CODE39,
  CODE128: _CODE2.CODE128,
  CODE128A: _CODE2.CODE128A,
  CODE128B: _CODE2.CODE128B,
  CODE128C: _CODE2.CODE128C,
  EAN13: _EAN_UPC.EAN13,
  EAN8: _EAN_UPC.EAN8,
  EAN5: _EAN_UPC.EAN5,
  EAN2: _EAN_UPC.EAN2,
  UPC: _EAN_UPC.UPC,
  UPCE: _EAN_UPC.UPCE,
  ITF14: _ITF.ITF14,
  ITF: _ITF.ITF,
  MSI: _MSI.MSI,
  MSI10: _MSI.MSI10,
  MSI11: _MSI.MSI11,
  MSI1010: _MSI.MSI1010,
  MSI1110: _MSI.MSI1110,
  PHARMACODE: _pharmacode.pharmacode,
  CODABAR: _codabar.codabar,
  GENERICBARCODE: _GenericBarcode.GenericBarcode
};

/***/ }),

/***/ 715:
/*!***************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE39/index.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CODE39 = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// https://en.wikipedia.org/wiki/Code_39#Encoding


var CODE39 = function (_Barcode) {
  _inherits(CODE39, _Barcode);

  function CODE39(data, options) {
    _classCallCheck(this, CODE39);

    data = data.toUpperCase(); // Calculate mod43 checksum if enabled

    if (options.mod43) {
      data += getCharacter(mod43checksum(data));
    }

    return _possibleConstructorReturn(this, (CODE39.__proto__ || Object.getPrototypeOf(CODE39)).call(this, data, options));
  }

  _createClass(CODE39, [{
    key: "encode",
    value: function encode() {
      // First character is always a *
      var result = getEncoding("*"); // Take every character and add the binary representation to the result

      for (var i = 0; i < this.data.length; i++) {
        result += getEncoding(this.data[i]) + "0";
      } // Last character is always a *


      result += getEncoding("*");
      return {
        data: result,
        text: this.text
      };
    }
  }, {
    key: "valid",
    value: function valid() {
      return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/) !== -1;
    }
  }]);

  return CODE39;
}(_Barcode3.default); // All characters. The position in the array is the (checksum) value


var characters = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "-", ".", " ", "$", "/", "+", "%", "*"]; // The decimal representation of the characters, is converted to the
// corresponding binary with the getEncoding function

var encodings = [20957, 29783, 23639, 30485, 20951, 29813, 23669, 20855, 29789, 23645, 29975, 23831, 30533, 22295, 30149, 24005, 21623, 29981, 23837, 22301, 30023, 23879, 30545, 22343, 30161, 24017, 21959, 30065, 23921, 22385, 29015, 18263, 29141, 17879, 29045, 18293, 17783, 29021, 18269, 17477, 17489, 17681, 20753, 35770]; // Get the binary representation of a character by converting the encodings
// from decimal to binary

function getEncoding(character) {
  return getBinary(characterValue(character));
}

function getBinary(characterValue) {
  return encodings[characterValue].toString(2);
}

function getCharacter(characterValue) {
  return characters[characterValue];
}

function characterValue(character) {
  return characters.indexOf(character);
}

function mod43checksum(data) {
  var checksum = 0;

  for (var i = 0; i < data.length; i++) {
    checksum += characterValue(data[i]);
  }

  checksum = checksum % 43;
  return checksum;
}

exports.CODE39 = CODE39;

/***/ }),

/***/ 716:
/*!**********************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/Barcode.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Barcode = function Barcode(data, options) {
  _classCallCheck(this, Barcode);

  this.data = data;
  this.text = options.text || data;
  this.options = options;
};

exports.default = Barcode;

/***/ }),

/***/ 717:
/*!****************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CODE128C = exports.CODE128B = exports.CODE128A = exports.CODE128 = undefined;

var _CODE128_AUTO = __webpack_require__(/*! ./CODE128_AUTO.js */ 718);

var _CODE128_AUTO2 = _interopRequireDefault(_CODE128_AUTO);

var _CODE128A = __webpack_require__(/*! ./CODE128A.js */ 722);

var _CODE128A2 = _interopRequireDefault(_CODE128A);

var _CODE128B = __webpack_require__(/*! ./CODE128B.js */ 723);

var _CODE128B2 = _interopRequireDefault(_CODE128B);

var _CODE128C = __webpack_require__(/*! ./CODE128C.js */ 724);

var _CODE128C2 = _interopRequireDefault(_CODE128C);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.CODE128 = _CODE128_AUTO2.default;
exports.CODE128A = _CODE128A2.default;
exports.CODE128B = _CODE128B2.default;
exports.CODE128C = _CODE128C2.default;

/***/ }),

/***/ 718:
/*!***********************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/CODE128_AUTO.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CODE2 = __webpack_require__(/*! ./CODE128 */ 719);

var _CODE3 = _interopRequireDefault(_CODE2);

var _auto = __webpack_require__(/*! ./auto */ 721);

var _auto2 = _interopRequireDefault(_auto);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CODE128AUTO = function (_CODE) {
  _inherits(CODE128AUTO, _CODE);

  function CODE128AUTO(data, options) {
    _classCallCheck(this, CODE128AUTO); // ASCII value ranges 0-127, 200-211


    if (/^[\x00-\x7F\xC8-\xD3]+$/.test(data)) {
      var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, (0, _auto2.default)(data), options));
    } else {
      var _this = _possibleConstructorReturn(this, (CODE128AUTO.__proto__ || Object.getPrototypeOf(CODE128AUTO)).call(this, data, options));
    }

    return _possibleConstructorReturn(_this);
  }

  return CODE128AUTO;
}(_CODE3.default);

exports.default = CODE128AUTO;

/***/ }),

/***/ 719:
/*!******************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/CODE128.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _constants = __webpack_require__(/*! ./constants */ 720);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // This is the master class,
// it does require the start code to be included in the string


var CODE128 = function (_Barcode) {
  _inherits(CODE128, _Barcode);

  function CODE128(data, options) {
    _classCallCheck(this, CODE128); // Get array of ascii codes from data


    var _this = _possibleConstructorReturn(this, (CODE128.__proto__ || Object.getPrototypeOf(CODE128)).call(this, data.substring(1), options));

    _this.bytes = data.split('').map(function (_char) {
      return _char.charCodeAt(0);
    });
    return _this;
  }

  _createClass(CODE128, [{
    key: 'valid',
    value: function valid() {
      // ASCII value ranges 0-127, 200-211
      return /^[\x00-\x7F\xC8-\xD3]+$/.test(this.data);
    } // The public encoding function

  }, {
    key: 'encode',
    value: function encode() {
      var bytes = this.bytes; // Remove the start code from the bytes and set its index

      var startIndex = bytes.shift() - 105; // Get start set by index

      var startSet = _constants.SET_BY_CODE[startIndex];

      if (startSet === undefined) {
        throw new RangeError('The encoding does not start with a start character.');
      }

      if (this.shouldEncodeAsEan128() === true) {
        bytes.unshift(_constants.FNC1);
      } // Start encode with the right type


      var encodingResult = CODE128.next(bytes, 1, startSet);
      return {
        text: this.text === this.data ? this.text.replace(/[^\x20-\x7E]/g, '') : this.text,
        data: // Add the start bits
        CODE128.getBar(startIndex) + // Add the encoded bits
        encodingResult.result + // Add the checksum
        CODE128.getBar((encodingResult.checksum + startIndex) % _constants.MODULO) + // Add the end bits
        CODE128.getBar(_constants.STOP)
      };
    } // GS1-128/EAN-128

  }, {
    key: 'shouldEncodeAsEan128',
    value: function shouldEncodeAsEan128() {
      var isEAN128 = this.options.ean128 || false;

      if (typeof isEAN128 === 'string') {
        isEAN128 = isEAN128.toLowerCase() === 'true';
      }

      return isEAN128;
    } // Get a bar symbol by index

  }], [{
    key: 'getBar',
    value: function getBar(index) {
      return _constants.BARS[index] ? _constants.BARS[index].toString() : '';
    } // Correct an index by a set and shift it from the bytes array

  }, {
    key: 'correctIndex',
    value: function correctIndex(bytes, set) {
      if (set === _constants.SET_A) {
        var charCode = bytes.shift();
        return charCode < 32 ? charCode + 64 : charCode - 32;
      } else if (set === _constants.SET_B) {
        return bytes.shift() - 32;
      } else {
        return (bytes.shift() - 48) * 10 + bytes.shift() - 48;
      }
    }
  }, {
    key: 'next',
    value: function next(bytes, pos, set) {
      if (!bytes.length) {
        return {
          result: '',
          checksum: 0
        };
      }

      var nextCode = void 0,
          index = void 0; // Special characters

      if (bytes[0] >= 200) {
        index = bytes.shift() - 105;
        var nextSet = _constants.SWAP[index]; // Swap to other set

        if (nextSet !== undefined) {
          nextCode = CODE128.next(bytes, pos + 1, nextSet);
        } // Continue on current set but encode a special character
        else {
            // Shift
            if ((set === _constants.SET_A || set === _constants.SET_B) && index === _constants.SHIFT) {
              // Convert the next character so that is encoded correctly
              bytes[0] = set === _constants.SET_A ? bytes[0] > 95 ? bytes[0] - 96 : bytes[0] : bytes[0] < 32 ? bytes[0] + 96 : bytes[0];
            }

            nextCode = CODE128.next(bytes, pos + 1, set);
          }
      } // Continue encoding
      else {
          index = CODE128.correctIndex(bytes, set);
          nextCode = CODE128.next(bytes, pos + 1, set);
        } // Get the correct binary encoding and calculate the weight


      var enc = CODE128.getBar(index);
      var weight = index * pos;
      return {
        result: enc + nextCode.result,
        checksum: weight + nextCode.checksum
      };
    }
  }]);

  return CODE128;
}(_Barcode3.default);

exports.default = CODE128;

/***/ }),

/***/ 720:
/*!********************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/constants.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _SET_BY_CODE;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
} // constants for internal usage


var SET_A = exports.SET_A = 0;
var SET_B = exports.SET_B = 1;
var SET_C = exports.SET_C = 2; // Special characters

var SHIFT = exports.SHIFT = 98;
var START_A = exports.START_A = 103;
var START_B = exports.START_B = 104;
var START_C = exports.START_C = 105;
var MODULO = exports.MODULO = 103;
var STOP = exports.STOP = 106;
var FNC1 = exports.FNC1 = 207; // Get set by start code

var SET_BY_CODE = exports.SET_BY_CODE = (_SET_BY_CODE = {}, _defineProperty(_SET_BY_CODE, START_A, SET_A), _defineProperty(_SET_BY_CODE, START_B, SET_B), _defineProperty(_SET_BY_CODE, START_C, SET_C), _SET_BY_CODE); // Get next set by code

var SWAP = exports.SWAP = {
  101: SET_A,
  100: SET_B,
  99: SET_C
};
var A_START_CHAR = exports.A_START_CHAR = String.fromCharCode(208); // START_A + 105

var B_START_CHAR = exports.B_START_CHAR = String.fromCharCode(209); // START_B + 105

var C_START_CHAR = exports.C_START_CHAR = String.fromCharCode(210); // START_C + 105
// 128A (Code Set A)
// ASCII characters 00 to 95 (0–9, A–Z and control codes), special characters, and FNC 1–4

var A_CHARS = exports.A_CHARS = "[\x00-\x5F\xC8-\xCF]"; // 128B (Code Set B)
// ASCII characters 32 to 127 (0–9, A–Z, a–z), special characters, and FNC 1–4

var B_CHARS = exports.B_CHARS = "[\x20-\x7F\xC8-\xCF]"; // 128C (Code Set C)
// 00–99 (encodes two digits with a single code point) and FNC1

var C_CHARS = exports.C_CHARS = "(\xCF*[0-9]{2}\xCF*)"; // CODE128 includes 107 symbols:
// 103 data symbols, 3 start symbols (A, B and C), and 1 stop symbol (the last one)
// Each symbol consist of three black bars (1) and three white spaces (0).

var BARS = exports.BARS = [11011001100, 11001101100, 11001100110, 10010011000, 10010001100, 10001001100, 10011001000, 10011000100, 10001100100, 11001001000, 11001000100, 11000100100, 10110011100, 10011011100, 10011001110, 10111001100, 10011101100, 10011100110, 11001110010, 11001011100, 11001001110, 11011100100, 11001110100, 11101101110, 11101001100, 11100101100, 11100100110, 11101100100, 11100110100, 11100110010, 11011011000, 11011000110, 11000110110, 10100011000, 10001011000, 10001000110, 10110001000, 10001101000, 10001100010, 11010001000, 11000101000, 11000100010, 10110111000, 10110001110, 10001101110, 10111011000, 10111000110, 10001110110, 11101110110, 11010001110, 11000101110, 11011101000, 11011100010, 11011101110, 11101011000, 11101000110, 11100010110, 11101101000, 11101100010, 11100011010, 11101111010, 11001000010, 11110001010, 10100110000, 10100001100, 10010110000, 10010000110, 10000101100, 10000100110, 10110010000, 10110000100, 10011010000, 10011000010, 10000110100, 10000110010, 11000010010, 11001010000, 11110111010, 11000010100, 10001111010, 10100111100, 10010111100, 10010011110, 10111100100, 10011110100, 10011110010, 11110100100, 11110010100, 11110010010, 11011011110, 11011110110, 11110110110, 10101111000, 10100011110, 10001011110, 10111101000, 10111100010, 11110101000, 11110100010, 10111011110, 10111101110, 11101011110, 11110101110, 11010000100, 11010010000, 11010011100, 1100011101011];

/***/ }),

/***/ 721:
/*!***************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/auto.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(/*! ./constants */ 720); // Match Set functions


var matchSetALength = function matchSetALength(string) {
  return string.match(new RegExp('^' + _constants.A_CHARS + '*'))[0].length;
};

var matchSetBLength = function matchSetBLength(string) {
  return string.match(new RegExp('^' + _constants.B_CHARS + '*'))[0].length;
};

var matchSetC = function matchSetC(string) {
  return string.match(new RegExp('^' + _constants.C_CHARS + '*'))[0];
}; // CODE128A or CODE128B


function autoSelectFromAB(string, isA) {
  var ranges = isA ? _constants.A_CHARS : _constants.B_CHARS;
  var untilC = string.match(new RegExp('^(' + ranges + '+?)(([0-9]{2}){2,})([^0-9]|$)'));

  if (untilC) {
    return untilC[1] + String.fromCharCode(204) + autoSelectFromC(string.substring(untilC[1].length));
  }

  var chars = string.match(new RegExp('^' + ranges + '+'))[0];

  if (chars.length === string.length) {
    return string;
  }

  return chars + String.fromCharCode(isA ? 205 : 206) + autoSelectFromAB(string.substring(chars.length), !isA);
} // CODE128C


function autoSelectFromC(string) {
  var cMatch = matchSetC(string);
  var length = cMatch.length;

  if (length === string.length) {
    return string;
  }

  string = string.substring(length); // Select A/B depending on the longest match

  var isA = matchSetALength(string) >= matchSetBLength(string);
  return cMatch + String.fromCharCode(isA ? 206 : 205) + autoSelectFromAB(string, isA);
} // Detect Code Set (A, B or C) and format the string


exports.default = function (string) {
  var newString = void 0;
  var cLength = matchSetC(string).length; // Select 128C if the string start with enough digits

  if (cLength >= 2) {
    newString = _constants.C_START_CHAR + autoSelectFromC(string);
  } else {
    // Select A/B depending on the longest match
    var isA = matchSetALength(string) > matchSetBLength(string);
    newString = (isA ? _constants.A_START_CHAR : _constants.B_START_CHAR) + autoSelectFromAB(string, isA);
  }

  return newString.replace(/[\xCD\xCE]([^])[\xCD\xCE]/, // Any sequence between 205 and 206 characters
  function (match, _char) {
    return String.fromCharCode(203) + _char;
  });
};

/***/ }),

/***/ 722:
/*!*******************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/CODE128A.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _CODE2 = __webpack_require__(/*! ./CODE128.js */ 719);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(/*! ./constants */ 720);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CODE128A = function (_CODE) {
  _inherits(CODE128A, _CODE);

  function CODE128A(string, options) {
    _classCallCheck(this, CODE128A);

    return _possibleConstructorReturn(this, (CODE128A.__proto__ || Object.getPrototypeOf(CODE128A)).call(this, _constants.A_START_CHAR + string, options));
  }

  _createClass(CODE128A, [{
    key: 'valid',
    value: function valid() {
      return new RegExp('^' + _constants.A_CHARS + '+$').test(this.data);
    }
  }]);

  return CODE128A;
}(_CODE3.default);

exports.default = CODE128A;

/***/ }),

/***/ 723:
/*!*******************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/CODE128B.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _CODE2 = __webpack_require__(/*! ./CODE128.js */ 719);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(/*! ./constants */ 720);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CODE128B = function (_CODE) {
  _inherits(CODE128B, _CODE);

  function CODE128B(string, options) {
    _classCallCheck(this, CODE128B);

    return _possibleConstructorReturn(this, (CODE128B.__proto__ || Object.getPrototypeOf(CODE128B)).call(this, _constants.B_START_CHAR + string, options));
  }

  _createClass(CODE128B, [{
    key: 'valid',
    value: function valid() {
      return new RegExp('^' + _constants.B_CHARS + '+$').test(this.data);
    }
  }]);

  return CODE128B;
}(_CODE3.default);

exports.default = CODE128B;

/***/ }),

/***/ 724:
/*!*******************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/CODE128/CODE128C.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _CODE2 = __webpack_require__(/*! ./CODE128.js */ 719);

var _CODE3 = _interopRequireDefault(_CODE2);

var _constants = __webpack_require__(/*! ./constants */ 720);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var CODE128C = function (_CODE) {
  _inherits(CODE128C, _CODE);

  function CODE128C(string, options) {
    _classCallCheck(this, CODE128C);

    return _possibleConstructorReturn(this, (CODE128C.__proto__ || Object.getPrototypeOf(CODE128C)).call(this, _constants.C_START_CHAR + string, options));
  }

  _createClass(CODE128C, [{
    key: 'valid',
    value: function valid() {
      return new RegExp('^' + _constants.C_CHARS + '+$').test(this.data);
    }
  }]);

  return CODE128C;
}(_CODE3.default);

exports.default = CODE128C;

/***/ }),

/***/ 725:
/*!****************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPCE = exports.UPC = exports.EAN2 = exports.EAN5 = exports.EAN8 = exports.EAN13 = undefined;

var _EAN = __webpack_require__(/*! ./EAN13.js */ 726);

var _EAN2 = _interopRequireDefault(_EAN);

var _EAN3 = __webpack_require__(/*! ./EAN8.js */ 730);

var _EAN4 = _interopRequireDefault(_EAN3);

var _EAN5 = __webpack_require__(/*! ./EAN5.js */ 731);

var _EAN6 = _interopRequireDefault(_EAN5);

var _EAN7 = __webpack_require__(/*! ./EAN2.js */ 732);

var _EAN8 = _interopRequireDefault(_EAN7);

var _UPC = __webpack_require__(/*! ./UPC.js */ 733);

var _UPC2 = _interopRequireDefault(_UPC);

var _UPCE = __webpack_require__(/*! ./UPCE.js */ 734);

var _UPCE2 = _interopRequireDefault(_UPCE);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.EAN13 = _EAN2.default;
exports.EAN8 = _EAN4.default;
exports.EAN5 = _EAN6.default;
exports.EAN2 = _EAN8.default;
exports.UPC = _UPC2.default;
exports.UPCE = _UPCE2.default;

/***/ }),

/***/ 726:
/*!****************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/EAN13.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var _constants = __webpack_require__(/*! ./constants */ 727);

var _EAN2 = __webpack_require__(/*! ./EAN */ 728);

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Binary_encoding_of_data_digits_into_EAN-13_barcode
// Calculate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


var checksum = function checksum(number) {
  var res = number.substr(0, 12).split('').map(function (n) {
    return +n;
  }).reduce(function (sum, a, idx) {
    return idx % 2 ? sum + a * 3 : sum + a;
  }, 0);
  return (10 - res % 10) % 10;
};

var EAN13 = function (_EAN) {
  _inherits(EAN13, _EAN);

  function EAN13(data, options) {
    _classCallCheck(this, EAN13); // Add checksum if it does not exist


    if (data.search(/^[0-9]{12}$/) !== -1) {
      data += checksum(data);
    } // Adds a last character to the end of the barcode


    var _this = _possibleConstructorReturn(this, (EAN13.__proto__ || Object.getPrototypeOf(EAN13)).call(this, data, options));

    _this.lastChar = options.lastChar;
    return _this;
  }

  _createClass(EAN13, [{
    key: 'valid',
    value: function valid() {
      return this.data.search(/^[0-9]{13}$/) !== -1 && +this.data[12] === checksum(this.data);
    }
  }, {
    key: 'leftText',
    value: function leftText() {
      return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftText', this).call(this, 1, 6);
    }
  }, {
    key: 'leftEncode',
    value: function leftEncode() {
      var data = this.data.substr(1, 6);
      var structure = _constants.EAN13_STRUCTURE[this.data[0]];
      return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'leftEncode', this).call(this, data, structure);
    }
  }, {
    key: 'rightText',
    value: function rightText() {
      return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightText', this).call(this, 7, 6);
    }
  }, {
    key: 'rightEncode',
    value: function rightEncode() {
      var data = this.data.substr(7, 6);
      return _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'rightEncode', this).call(this, data, 'RRRRRR');
    } // The "standard" way of printing EAN13 barcodes with guard bars

  }, {
    key: 'encodeGuarded',
    value: function encodeGuarded() {
      var data = _get(EAN13.prototype.__proto__ || Object.getPrototypeOf(EAN13.prototype), 'encodeGuarded', this).call(this); // Extend data with left digit & last character


      if (this.options.displayValue) {
        data.unshift({
          data: '000000000000',
          text: this.text.substr(0, 1),
          options: {
            textAlign: 'left',
            fontSize: this.fontSize
          }
        });

        if (this.options.lastChar) {
          data.push({
            data: '00'
          });
          data.push({
            data: '00000',
            text: this.options.lastChar,
            options: {
              fontSize: this.fontSize
            }
          });
        }
      }

      return data;
    }
  }]);

  return EAN13;
}(_EAN3.default);

exports.default = EAN13;

/***/ }),

/***/ 727:
/*!********************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/constants.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
}); // Standard start end and middle bits

var SIDE_BIN = exports.SIDE_BIN = '101';
var MIDDLE_BIN = exports.MIDDLE_BIN = '01010';
var BINARIES = exports.BINARIES = {
  'L': [// The L (left) type of encoding
  '0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
  'G': [// The G type of encoding
  '0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111'],
  'R': [// The R (right) type of encoding
  '1110010', '1100110', '1101100', '1000010', '1011100', '1001110', '1010000', '1000100', '1001000', '1110100'],
  'O': [// The O (odd) encoding for UPC-E
  '0001101', '0011001', '0010011', '0111101', '0100011', '0110001', '0101111', '0111011', '0110111', '0001011'],
  'E': [// The E (even) encoding for UPC-E
  '0100111', '0110011', '0011011', '0100001', '0011101', '0111001', '0000101', '0010001', '0001001', '0010111']
}; // Define the EAN-2 structure

var EAN2_STRUCTURE = exports.EAN2_STRUCTURE = ['LL', 'LG', 'GL', 'GG']; // Define the EAN-5 structure

var EAN5_STRUCTURE = exports.EAN5_STRUCTURE = ['GGLLL', 'GLGLL', 'GLLGL', 'GLLLG', 'LGGLL', 'LLGGL', 'LLLGG', 'LGLGL', 'LGLLG', 'LLGLG']; // Define the EAN-13 structure

var EAN13_STRUCTURE = exports.EAN13_STRUCTURE = ['LLLLLL', 'LLGLGG', 'LLGGLG', 'LLGGGL', 'LGLLGG', 'LGGLLG', 'LGGGLL', 'LGLGLG', 'LGLGGL', 'LGGLGL'];

/***/ }),

/***/ 728:
/*!**************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/EAN.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _constants = __webpack_require__(/*! ./constants */ 727);

var _encoder = __webpack_require__(/*! ./encoder */ 729);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(/*! ../Barcode */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Base class for EAN8 & EAN13


var EAN = function (_Barcode) {
  _inherits(EAN, _Barcode);

  function EAN(data, options) {
    _classCallCheck(this, EAN); // Make sure the font is not bigger than the space between the guard bars


    var _this = _possibleConstructorReturn(this, (EAN.__proto__ || Object.getPrototypeOf(EAN)).call(this, data, options));

    _this.fontSize = !options.flat && options.fontSize > options.width * 10 ? options.width * 10 : options.fontSize; // Make the guard bars go down half the way of the text

    _this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
    return _this;
  }

  _createClass(EAN, [{
    key: 'encode',
    value: function encode() {
      return this.options.flat ? this.encodeFlat() : this.encodeGuarded();
    }
  }, {
    key: 'leftText',
    value: function leftText(from, to) {
      return this.text.substr(from, to);
    }
  }, {
    key: 'leftEncode',
    value: function leftEncode(data, structure) {
      return (0, _encoder2.default)(data, structure);
    }
  }, {
    key: 'rightText',
    value: function rightText(from, to) {
      return this.text.substr(from, to);
    }
  }, {
    key: 'rightEncode',
    value: function rightEncode(data, structure) {
      return (0, _encoder2.default)(data, structure);
    }
  }, {
    key: 'encodeGuarded',
    value: function encodeGuarded() {
      var textOptions = {
        fontSize: this.fontSize
      };
      var guardOptions = {
        height: this.guardHeight
      };
      return [{
        data: _constants.SIDE_BIN,
        options: guardOptions
      }, {
        data: this.leftEncode(),
        text: this.leftText(),
        options: textOptions
      }, {
        data: _constants.MIDDLE_BIN,
        options: guardOptions
      }, {
        data: this.rightEncode(),
        text: this.rightText(),
        options: textOptions
      }, {
        data: _constants.SIDE_BIN,
        options: guardOptions
      }];
    }
  }, {
    key: 'encodeFlat',
    value: function encodeFlat() {
      var data = [_constants.SIDE_BIN, this.leftEncode(), _constants.MIDDLE_BIN, this.rightEncode(), _constants.SIDE_BIN];
      return {
        data: data.join(''),
        text: this.text
      };
    }
  }]);

  return EAN;
}(_Barcode3.default);

exports.default = EAN;

/***/ }),

/***/ 729:
/*!******************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/encoder.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(/*! ./constants */ 727); // Encode data string


var encode = function encode(data, structure, separator) {
  var encoded = data.split('').map(function (val, idx) {
    return _constants.BINARIES[structure[idx]];
  }).map(function (val, idx) {
    return val ? val[data[idx]] : '';
  });

  if (separator) {
    var last = data.length - 1;
    encoded = encoded.map(function (val, idx) {
      return idx < last ? val + separator : val;
    });
  }

  return encoded.join('');
};

exports.default = encode;

/***/ }),

/***/ 730:
/*!***************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/EAN8.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var _EAN2 = __webpack_require__(/*! ./EAN */ 728);

var _EAN3 = _interopRequireDefault(_EAN2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// http://www.barcodeisland.com/ean8.phtml
// Calculate the checksum digit


var checksum = function checksum(number) {
  var res = number.substr(0, 7).split('').map(function (n) {
    return +n;
  }).reduce(function (sum, a, idx) {
    return idx % 2 ? sum + a : sum + a * 3;
  }, 0);
  return (10 - res % 10) % 10;
};

var EAN8 = function (_EAN) {
  _inherits(EAN8, _EAN);

  function EAN8(data, options) {
    _classCallCheck(this, EAN8); // Add checksum if it does not exist


    if (data.search(/^[0-9]{7}$/) !== -1) {
      data += checksum(data);
    }

    return _possibleConstructorReturn(this, (EAN8.__proto__ || Object.getPrototypeOf(EAN8)).call(this, data, options));
  }

  _createClass(EAN8, [{
    key: 'valid',
    value: function valid() {
      return this.data.search(/^[0-9]{8}$/) !== -1 && +this.data[7] === checksum(this.data);
    }
  }, {
    key: 'leftText',
    value: function leftText() {
      return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftText', this).call(this, 0, 4);
    }
  }, {
    key: 'leftEncode',
    value: function leftEncode() {
      var data = this.data.substr(0, 4);
      return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'leftEncode', this).call(this, data, 'LLLL');
    }
  }, {
    key: 'rightText',
    value: function rightText() {
      return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightText', this).call(this, 4, 4);
    }
  }, {
    key: 'rightEncode',
    value: function rightEncode() {
      var data = this.data.substr(4, 4);
      return _get(EAN8.prototype.__proto__ || Object.getPrototypeOf(EAN8.prototype), 'rightEncode', this).call(this, data, 'RRRR');
    }
  }]);

  return EAN8;
}(_EAN3.default);

exports.default = EAN8;

/***/ }),

/***/ 731:
/*!***************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/EAN5.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _constants = __webpack_require__(/*! ./constants */ 727);

var _encoder = __webpack_require__(/*! ./encoder */ 729);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(/*! ../Barcode */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_5#Encoding


var checksum = function checksum(data) {
  var result = data.split('').map(function (n) {
    return +n;
  }).reduce(function (sum, a, idx) {
    return idx % 2 ? sum + a * 9 : sum + a * 3;
  }, 0);
  return result % 10;
};

var EAN5 = function (_Barcode) {
  _inherits(EAN5, _Barcode);

  function EAN5(data, options) {
    _classCallCheck(this, EAN5);

    return _possibleConstructorReturn(this, (EAN5.__proto__ || Object.getPrototypeOf(EAN5)).call(this, data, options));
  }

  _createClass(EAN5, [{
    key: 'valid',
    value: function valid() {
      return this.data.search(/^[0-9]{5}$/) !== -1;
    }
  }, {
    key: 'encode',
    value: function encode() {
      var structure = _constants.EAN5_STRUCTURE[checksum(this.data)];

      return {
        data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
        text: this.text
      };
    }
  }]);

  return EAN5;
}(_Barcode3.default);

exports.default = EAN5;

/***/ }),

/***/ 732:
/*!***************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/EAN2.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _constants = __webpack_require__(/*! ./constants */ 727);

var _encoder = __webpack_require__(/*! ./encoder */ 729);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(/*! ../Barcode */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// https://en.wikipedia.org/wiki/EAN_2#Encoding


var EAN2 = function (_Barcode) {
  _inherits(EAN2, _Barcode);

  function EAN2(data, options) {
    _classCallCheck(this, EAN2);

    return _possibleConstructorReturn(this, (EAN2.__proto__ || Object.getPrototypeOf(EAN2)).call(this, data, options));
  }

  _createClass(EAN2, [{
    key: 'valid',
    value: function valid() {
      return this.data.search(/^[0-9]{2}$/) !== -1;
    }
  }, {
    key: 'encode',
    value: function encode() {
      // Choose the structure based on the number mod 4
      var structure = _constants.EAN2_STRUCTURE[parseInt(this.data) % 4];

      return {
        // Start bits + Encode the two digits with 01 in between
        data: '1011' + (0, _encoder2.default)(this.data, structure, '01'),
        text: this.text
      };
    }
  }]);

  return EAN2;
}(_Barcode3.default);

exports.default = EAN2;

/***/ }),

/***/ 733:
/*!**************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/UPC.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

exports.checksum = checksum;

var _encoder = __webpack_require__(/*! ./encoder */ 729);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding


var UPC = function (_Barcode) {
  _inherits(UPC, _Barcode);

  function UPC(data, options) {
    _classCallCheck(this, UPC); // Add checksum if it does not exist


    if (data.search(/^[0-9]{11}$/) !== -1) {
      data += checksum(data);
    }

    var _this = _possibleConstructorReturn(this, (UPC.__proto__ || Object.getPrototypeOf(UPC)).call(this, data, options));

    _this.displayValue = options.displayValue; // Make sure the font is not bigger than the space between the guard bars

    if (options.fontSize > options.width * 10) {
      _this.fontSize = options.width * 10;
    } else {
      _this.fontSize = options.fontSize;
    } // Make the guard bars go down half the way of the text


    _this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
    return _this;
  }

  _createClass(UPC, [{
    key: "valid",
    value: function valid() {
      return this.data.search(/^[0-9]{12}$/) !== -1 && this.data[11] == checksum(this.data);
    }
  }, {
    key: "encode",
    value: function encode() {
      if (this.options.flat) {
        return this.flatEncoding();
      } else {
        return this.guardedEncoding();
      }
    }
  }, {
    key: "flatEncoding",
    value: function flatEncoding() {
      var result = "";
      result += "101";
      result += (0, _encoder2.default)(this.data.substr(0, 6), "LLLLLL");
      result += "01010";
      result += (0, _encoder2.default)(this.data.substr(6, 6), "RRRRRR");
      result += "101";
      return {
        data: result,
        text: this.text
      };
    }
  }, {
    key: "guardedEncoding",
    value: function guardedEncoding() {
      var result = []; // Add the first digit

      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text.substr(0, 1),
          options: {
            textAlign: "left",
            fontSize: this.fontSize
          }
        });
      } // Add the guard bars


      result.push({
        data: "101" + (0, _encoder2.default)(this.data[0], "L"),
        options: {
          height: this.guardHeight
        }
      }); // Add the left side

      result.push({
        data: (0, _encoder2.default)(this.data.substr(1, 5), "LLLLL"),
        text: this.text.substr(1, 5),
        options: {
          fontSize: this.fontSize
        }
      }); // Add the middle bits

      result.push({
        data: "01010",
        options: {
          height: this.guardHeight
        }
      }); // Add the right side

      result.push({
        data: (0, _encoder2.default)(this.data.substr(6, 5), "RRRRR"),
        text: this.text.substr(6, 5),
        options: {
          fontSize: this.fontSize
        }
      }); // Add the end bits

      result.push({
        data: (0, _encoder2.default)(this.data[11], "R") + "101",
        options: {
          height: this.guardHeight
        }
      }); // Add the last digit

      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text.substr(11, 1),
          options: {
            textAlign: "right",
            fontSize: this.fontSize
          }
        });
      }

      return result;
    }
  }]);

  return UPC;
}(_Barcode3.default); // Calulate the checksum digit
// https://en.wikipedia.org/wiki/International_Article_Number_(EAN)#Calculation_of_checksum_digit


function checksum(number) {
  var result = 0;
  var i;

  for (i = 1; i < 11; i += 2) {
    result += parseInt(number[i]);
  }

  for (i = 0; i < 11; i += 2) {
    result += parseInt(number[i]) * 3;
  }

  return (10 - result % 10) % 10;
}

exports.default = UPC;

/***/ }),

/***/ 734:
/*!***************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/EAN_UPC/UPCE.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _encoder = __webpack_require__(/*! ./encoder */ 729);

var _encoder2 = _interopRequireDefault(_encoder);

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

var _UPC = __webpack_require__(/*! ./UPC.js */ 733);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#Encoding
//
// UPC-E documentation:
// https://en.wikipedia.org/wiki/Universal_Product_Code#UPC-E


var EXPANSIONS = ["XX00000XXX", "XX10000XXX", "XX20000XXX", "XXX00000XX", "XXXX00000X", "XXXXX00005", "XXXXX00006", "XXXXX00007", "XXXXX00008", "XXXXX00009"];
var PARITIES = [["EEEOOO", "OOOEEE"], ["EEOEOO", "OOEOEE"], ["EEOOEO", "OOEEOE"], ["EEOOOE", "OOEEEO"], ["EOEEOO", "OEOOEE"], ["EOOEEO", "OEEOOE"], ["EOOOEE", "OEEEOO"], ["EOEOEO", "OEOEOE"], ["EOEOOE", "OEOEEO"], ["EOOEOE", "OEEOEO"]];

var UPCE = function (_Barcode) {
  _inherits(UPCE, _Barcode);

  function UPCE(data, options) {
    _classCallCheck(this, UPCE);

    var _this = _possibleConstructorReturn(this, (UPCE.__proto__ || Object.getPrototypeOf(UPCE)).call(this, data, options)); // Code may be 6 or 8 digits;
    // A 7 digit code is ambiguous as to whether the extra digit
    // is a UPC-A check or number system digit.


    _this.isValid = false;

    if (data.search(/^[0-9]{6}$/) !== -1) {
      _this.middleDigits = data;
      _this.upcA = expandToUPCA(data, "0");
      _this.text = options.text || '' + _this.upcA[0] + data + _this.upcA[_this.upcA.length - 1];
      _this.isValid = true;
    } else if (data.search(/^[01][0-9]{7}$/) !== -1) {
      _this.middleDigits = data.substring(1, data.length - 1);
      _this.upcA = expandToUPCA(_this.middleDigits, data[0]);

      if (_this.upcA[_this.upcA.length - 1] === data[data.length - 1]) {
        _this.isValid = true;
      } else {
        // checksum mismatch
        return _possibleConstructorReturn(_this);
      }
    } else {
      return _possibleConstructorReturn(_this);
    }

    _this.displayValue = options.displayValue; // Make sure the font is not bigger than the space between the guard bars

    if (options.fontSize > options.width * 10) {
      _this.fontSize = options.width * 10;
    } else {
      _this.fontSize = options.fontSize;
    } // Make the guard bars go down half the way of the text


    _this.guardHeight = options.height + _this.fontSize / 2 + options.textMargin;
    return _this;
  }

  _createClass(UPCE, [{
    key: 'valid',
    value: function valid() {
      return this.isValid;
    }
  }, {
    key: 'encode',
    value: function encode() {
      if (this.options.flat) {
        return this.flatEncoding();
      } else {
        return this.guardedEncoding();
      }
    }
  }, {
    key: 'flatEncoding',
    value: function flatEncoding() {
      var result = "";
      result += "101";
      result += this.encodeMiddleDigits();
      result += "010101";
      return {
        data: result,
        text: this.text
      };
    }
  }, {
    key: 'guardedEncoding',
    value: function guardedEncoding() {
      var result = []; // Add the UPC-A number system digit beneath the quiet zone

      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text[0],
          options: {
            textAlign: "left",
            fontSize: this.fontSize
          }
        });
      } // Add the guard bars


      result.push({
        data: "101",
        options: {
          height: this.guardHeight
        }
      }); // Add the 6 UPC-E digits

      result.push({
        data: this.encodeMiddleDigits(),
        text: this.text.substring(1, 7),
        options: {
          fontSize: this.fontSize
        }
      }); // Add the end bits

      result.push({
        data: "010101",
        options: {
          height: this.guardHeight
        }
      }); // Add the UPC-A check digit beneath the quiet zone

      if (this.displayValue) {
        result.push({
          data: "00000000",
          text: this.text[7],
          options: {
            textAlign: "right",
            fontSize: this.fontSize
          }
        });
      }

      return result;
    }
  }, {
    key: 'encodeMiddleDigits',
    value: function encodeMiddleDigits() {
      var numberSystem = this.upcA[0];
      var checkDigit = this.upcA[this.upcA.length - 1];
      var parity = PARITIES[parseInt(checkDigit)][parseInt(numberSystem)];
      return (0, _encoder2.default)(this.middleDigits, parity);
    }
  }]);

  return UPCE;
}(_Barcode3.default);

function expandToUPCA(middleDigits, numberSystem) {
  var lastUpcE = parseInt(middleDigits[middleDigits.length - 1]);
  var expansion = EXPANSIONS[lastUpcE];
  var result = "";
  var digitIndex = 0;

  for (var i = 0; i < expansion.length; i++) {
    var c = expansion[i];

    if (c === 'X') {
      result += middleDigits[digitIndex++];
    } else {
      result += c;
    }
  }

  result = '' + numberSystem + result;
  return '' + result + (0, _UPC.checksum)(result);
}

exports.default = UPCE;

/***/ }),

/***/ 735:
/*!************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/ITF/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ITF14 = exports.ITF = undefined;

var _ITF = __webpack_require__(/*! ./ITF */ 736);

var _ITF2 = _interopRequireDefault(_ITF);

var _ITF3 = __webpack_require__(/*! ./ITF14 */ 738);

var _ITF4 = _interopRequireDefault(_ITF3);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.ITF = _ITF2.default;
exports.ITF14 = _ITF4.default;

/***/ }),

/***/ 736:
/*!**********************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/ITF/ITF.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _constants = __webpack_require__(/*! ./constants */ 737);

var _Barcode2 = __webpack_require__(/*! ../Barcode */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var ITF = function (_Barcode) {
  _inherits(ITF, _Barcode);

  function ITF() {
    _classCallCheck(this, ITF);

    return _possibleConstructorReturn(this, (ITF.__proto__ || Object.getPrototypeOf(ITF)).apply(this, arguments));
  }

  _createClass(ITF, [{
    key: 'valid',
    value: function valid() {
      return this.data.search(/^([0-9]{2})+$/) !== -1;
    }
  }, {
    key: 'encode',
    value: function encode() {
      var _this2 = this; // Calculate all the digit pairs


      var encoded = this.data.match(/.{2}/g).map(function (pair) {
        return _this2.encodePair(pair);
      }).join('');
      return {
        data: _constants.START_BIN + encoded + _constants.END_BIN,
        text: this.text
      };
    } // Calculate the data of a number pair

  }, {
    key: 'encodePair',
    value: function encodePair(pair) {
      var second = _constants.BINARIES[pair[1]];
      return _constants.BINARIES[pair[0]].split('').map(function (first, idx) {
        return (first === '1' ? '111' : '1') + (second[idx] === '1' ? '000' : '0');
      }).join('');
    }
  }]);

  return ITF;
}(_Barcode3.default);

exports.default = ITF;

/***/ }),

/***/ 737:
/*!****************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/ITF/constants.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var START_BIN = exports.START_BIN = '1010';
var END_BIN = exports.END_BIN = '11101';
var BINARIES = exports.BINARIES = ['00110', '10001', '01001', '11000', '00101', '10100', '01100', '00011', '10010', '01010'];

/***/ }),

/***/ 738:
/*!************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/ITF/ITF14.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _ITF2 = __webpack_require__(/*! ./ITF */ 736);

var _ITF3 = _interopRequireDefault(_ITF2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Calculate the checksum digit


var checksum = function checksum(data) {
  var res = data.substr(0, 13).split('').map(function (num) {
    return parseInt(num, 10);
  }).reduce(function (sum, n, idx) {
    return sum + n * (3 - idx % 2 * 2);
  }, 0);
  return Math.ceil(res / 10) * 10 - res;
};

var ITF14 = function (_ITF) {
  _inherits(ITF14, _ITF);

  function ITF14(data, options) {
    _classCallCheck(this, ITF14); // Add checksum if it does not exist


    if (data.search(/^[0-9]{13}$/) !== -1) {
      data += checksum(data);
    }

    return _possibleConstructorReturn(this, (ITF14.__proto__ || Object.getPrototypeOf(ITF14)).call(this, data, options));
  }

  _createClass(ITF14, [{
    key: 'valid',
    value: function valid() {
      return this.data.search(/^[0-9]{14}$/) !== -1 && +this.data[13] === checksum(this.data);
    }
  }]);

  return ITF14;
}(_ITF3.default);

exports.default = ITF14;

/***/ }),

/***/ 739:
/*!************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/index.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSI1110 = exports.MSI1010 = exports.MSI11 = exports.MSI10 = exports.MSI = undefined;

var _MSI = __webpack_require__(/*! ./MSI.js */ 740);

var _MSI2 = _interopRequireDefault(_MSI);

var _MSI3 = __webpack_require__(/*! ./MSI10.js */ 741);

var _MSI4 = _interopRequireDefault(_MSI3);

var _MSI5 = __webpack_require__(/*! ./MSI11.js */ 743);

var _MSI6 = _interopRequireDefault(_MSI5);

var _MSI7 = __webpack_require__(/*! ./MSI1010.js */ 744);

var _MSI8 = _interopRequireDefault(_MSI7);

var _MSI9 = __webpack_require__(/*! ./MSI1110.js */ 745);

var _MSI10 = _interopRequireDefault(_MSI9);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

exports.MSI = _MSI2.default;
exports.MSI10 = _MSI4.default;
exports.MSI11 = _MSI6.default;
exports.MSI1010 = _MSI8.default;
exports.MSI1110 = _MSI10.default;

/***/ }),

/***/ 740:
/*!**********************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/MSI.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation
// https://en.wikipedia.org/wiki/MSI_Barcode#Character_set_and_binary_lookup


var MSI = function (_Barcode) {
  _inherits(MSI, _Barcode);

  function MSI(data, options) {
    _classCallCheck(this, MSI);

    return _possibleConstructorReturn(this, (MSI.__proto__ || Object.getPrototypeOf(MSI)).call(this, data, options));
  }

  _createClass(MSI, [{
    key: "encode",
    value: function encode() {
      // Start bits
      var ret = "110";

      for (var i = 0; i < this.data.length; i++) {
        // Convert the character to binary (always 4 binary digits)
        var digit = parseInt(this.data[i]);
        var bin = digit.toString(2);
        bin = addZeroes(bin, 4 - bin.length); // Add 100 for every zero and 110 for every 1

        for (var b = 0; b < bin.length; b++) {
          ret += bin[b] == "0" ? "100" : "110";
        }
      } // End bits


      ret += "1001";
      return {
        data: ret,
        text: this.text
      };
    }
  }, {
    key: "valid",
    value: function valid() {
      return this.data.search(/^[0-9]+$/) !== -1;
    }
  }]);

  return MSI;
}(_Barcode3.default);

function addZeroes(number, n) {
  for (var i = 0; i < n; i++) {
    number = "0" + number;
  }

  return number;
}

exports.default = MSI;

/***/ }),

/***/ 741:
/*!************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/MSI10.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MSI2 = __webpack_require__(/*! ./MSI.js */ 740);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(/*! ./checksums.js */ 742);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MSI10 = function (_MSI) {
  _inherits(MSI10, _MSI);

  function MSI10(data, options) {
    _classCallCheck(this, MSI10);

    return _possibleConstructorReturn(this, (MSI10.__proto__ || Object.getPrototypeOf(MSI10)).call(this, data + (0, _checksums.mod10)(data), options));
  }

  return MSI10;
}(_MSI3.default);

exports.default = MSI10;

/***/ }),

/***/ 742:
/*!****************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/checksums.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mod10 = mod10;
exports.mod11 = mod11;

function mod10(number) {
  var sum = 0;

  for (var i = 0; i < number.length; i++) {
    var n = parseInt(number[i]);

    if ((i + number.length) % 2 === 0) {
      sum += n;
    } else {
      sum += n * 2 % 10 + Math.floor(n * 2 / 10);
    }
  }

  return (10 - sum % 10) % 10;
}

function mod11(number) {
  var sum = 0;
  var weights = [2, 3, 4, 5, 6, 7];

  for (var i = 0; i < number.length; i++) {
    var n = parseInt(number[number.length - 1 - i]);
    sum += weights[i % weights.length] * n;
  }

  return (11 - sum % 11) % 11;
}

/***/ }),

/***/ 743:
/*!************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/MSI11.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MSI2 = __webpack_require__(/*! ./MSI.js */ 740);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(/*! ./checksums.js */ 742);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MSI11 = function (_MSI) {
  _inherits(MSI11, _MSI);

  function MSI11(data, options) {
    _classCallCheck(this, MSI11);

    return _possibleConstructorReturn(this, (MSI11.__proto__ || Object.getPrototypeOf(MSI11)).call(this, data + (0, _checksums.mod11)(data), options));
  }

  return MSI11;
}(_MSI3.default);

exports.default = MSI11;

/***/ }),

/***/ 744:
/*!**************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/MSI1010.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MSI2 = __webpack_require__(/*! ./MSI.js */ 740);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(/*! ./checksums.js */ 742);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MSI1010 = function (_MSI) {
  _inherits(MSI1010, _MSI);

  function MSI1010(data, options) {
    _classCallCheck(this, MSI1010);

    data += (0, _checksums.mod10)(data);
    data += (0, _checksums.mod10)(data);
    return _possibleConstructorReturn(this, (MSI1010.__proto__ || Object.getPrototypeOf(MSI1010)).call(this, data, options));
  }

  return MSI1010;
}(_MSI3.default);

exports.default = MSI1010;

/***/ }),

/***/ 745:
/*!**************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/MSI/MSI1110.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MSI2 = __webpack_require__(/*! ./MSI.js */ 740);

var _MSI3 = _interopRequireDefault(_MSI2);

var _checksums = __webpack_require__(/*! ./checksums.js */ 742);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var MSI1110 = function (_MSI) {
  _inherits(MSI1110, _MSI);

  function MSI1110(data, options) {
    _classCallCheck(this, MSI1110);

    data += (0, _checksums.mod11)(data);
    data += (0, _checksums.mod10)(data);
    return _possibleConstructorReturn(this, (MSI1110.__proto__ || Object.getPrototypeOf(MSI1110)).call(this, data, options));
  }

  return MSI1110;
}(_MSI3.default);

exports.default = MSI1110;

/***/ }),

/***/ 746:
/*!*******************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/pharmacode/index.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pharmacode = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding documentation
// http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf


var pharmacode = function (_Barcode) {
  _inherits(pharmacode, _Barcode);

  function pharmacode(data, options) {
    _classCallCheck(this, pharmacode);

    var _this = _possibleConstructorReturn(this, (pharmacode.__proto__ || Object.getPrototypeOf(pharmacode)).call(this, data, options));

    _this.number = parseInt(data, 10);
    return _this;
  }

  _createClass(pharmacode, [{
    key: "encode",
    value: function encode() {
      var z = this.number;
      var result = ""; // http://i.imgur.com/RMm4UDJ.png
      // (source: http://www.gomaro.ch/ftproot/Laetus_PHARMA-CODE.pdf, page: 34)

      while (!isNaN(z) && z != 0) {
        if (z % 2 === 0) {
          // Even
          result = "11100" + result;
          z = (z - 2) / 2;
        } else {
          // Odd
          result = "100" + result;
          z = (z - 1) / 2;
        }
      } // Remove the two last zeroes


      result = result.slice(0, -2);
      return {
        data: result,
        text: this.text
      };
    }
  }, {
    key: "valid",
    value: function valid() {
      return this.number >= 3 && this.number <= 131070;
    }
  }]);

  return pharmacode;
}(_Barcode3.default);

exports.pharmacode = pharmacode;

/***/ }),

/***/ 747:
/*!****************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/codabar/index.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codabar = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} // Encoding specification:
// http://www.barcodeisland.com/codabar.phtml


var codabar = function (_Barcode) {
  _inherits(codabar, _Barcode);

  function codabar(data, options) {
    _classCallCheck(this, codabar);

    if (data.search(/^[0-9\-\$\:\.\+\/]+$/) === 0) {
      data = "A" + data + "A";
    }

    var _this = _possibleConstructorReturn(this, (codabar.__proto__ || Object.getPrototypeOf(codabar)).call(this, data.toUpperCase(), options));

    _this.text = _this.options.text || _this.text.replace(/[A-D]/g, '');
    return _this;
  }

  _createClass(codabar, [{
    key: "valid",
    value: function valid() {
      return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/) !== -1;
    }
  }, {
    key: "encode",
    value: function encode() {
      var result = [];
      var encodings = this.getEncodings();

      for (var i = 0; i < this.data.length; i++) {
        result.push(encodings[this.data.charAt(i)]); // for all characters except the last, append a narrow-space ("0")

        if (i !== this.data.length - 1) {
          result.push("0");
        }
      }

      return {
        text: this.text,
        data: result.join('')
      };
    }
  }, {
    key: "getEncodings",
    value: function getEncodings() {
      return {
        "0": "101010011",
        "1": "101011001",
        "2": "101001011",
        "3": "110010101",
        "4": "101101001",
        "5": "110101001",
        "6": "100101011",
        "7": "100101101",
        "8": "100110101",
        "9": "110100101",
        "-": "101001101",
        "$": "101100101",
        ":": "1101011011",
        "/": "1101101011",
        ".": "1101101101",
        "+": "101100110011",
        "A": "1011001001",
        "B": "1001001011",
        "C": "1010010011",
        "D": "1010011001"
      };
    }
  }]);

  return codabar;
}(_Barcode3.default);

exports.codabar = codabar;

/***/ }),

/***/ 748:
/*!***********************************************************************************!*\
  !*** ./src/subpages/components/code/tki-barcode/barcodes/GenericBarcode/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GenericBarcode = undefined;

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _Barcode2 = __webpack_require__(/*! ../Barcode.js */ 716);

var _Barcode3 = _interopRequireDefault(_Barcode2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GenericBarcode = function (_Barcode) {
  _inherits(GenericBarcode, _Barcode);

  function GenericBarcode(data, options) {
    _classCallCheck(this, GenericBarcode);

    return _possibleConstructorReturn(this, (GenericBarcode.__proto__ || Object.getPrototypeOf(GenericBarcode)).call(this, data, options)); // Sets this.data and this.text
  } // Return the corresponding binary numbers for the data provided


  _createClass(GenericBarcode, [{
    key: "encode",
    value: function encode() {
      return {
        data: "10101010101010101010101010101010101010101",
        text: this.text
      };
    } // Resturn true/false if the string provided is valid for this encoder

  }, {
    key: "valid",
    value: function valid() {
      return true;
    }
  }]);

  return GenericBarcode;
}(_Barcode3.default);

exports.GenericBarcode = GenericBarcode;

/***/ }),

/***/ 756:
/*!***********************************************************!*\
  !*** ./src/subpages/components/code/tki-qrcode/qrcode.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var QRCode = {};

(function () {
  /**
   * 获取单个字符的utf8编码
   * unicode BMP平面约65535个字符
   * @param {num} code
   * return {array}
   */
  function unicodeFormat8(code) {
    // 1 byte
    var c0, c1, c2;

    if (code < 128) {
      return [code]; // 2 bytes
    } else if (code < 2048) {
      c0 = 192 + (code >> 6);
      c1 = 128 + (code & 63);
      return [c0, c1]; // 3 bytes
    } else {
      c0 = 224 + (code >> 12);
      c1 = 128 + (code >> 6 & 63);
      c2 = 128 + (code & 63);
      return [c0, c1, c2];
    }
  }
  /**
   * 获取字符串的utf8编码字节串
   * @param {string} string
   * @return {array}
   */


  function getUTF8Bytes(string) {
    var utf8codes = [];

    for (var i = 0; i < string.length; i++) {
      var code = string.charCodeAt(i);
      var utf8 = unicodeFormat8(code);

      for (var j = 0; j < utf8.length; j++) {
        utf8codes.push(utf8[j]);
      }
    }

    return utf8codes;
  }
  /**
   * 二维码算法实现
   * @param {string} data              要编码的信息字符串
   * @param {num} errorCorrectLevel 纠错等级
   */


  function QRCodeAlg(data, errorCorrectLevel) {
    this.typeNumber = -1; //版本

    this.errorCorrectLevel = errorCorrectLevel;
    this.modules = null; //二维矩阵，存放最终结果

    this.moduleCount = 0; //矩阵大小

    this.dataCache = null; //数据缓存

    this.rsBlocks = null; //版本数据信息

    this.totalDataCount = -1; //可使用的数据量

    this.data = data;
    this.utf8bytes = getUTF8Bytes(data);
    this.make();
  }

  QRCodeAlg.prototype = {
    constructor: QRCodeAlg,

    /**
     * 获取二维码矩阵大小
     * @return {num} 矩阵大小
     */
    getModuleCount: function getModuleCount() {
      return this.moduleCount;
    },

    /**
     * 编码
     */
    make: function make() {
      this.getRightType();
      this.dataCache = this.createData();
      this.createQrcode();
    },

    /**
     * 设置二位矩阵功能图形
     * @param  {bool} test 表示是否在寻找最好掩膜阶段
     * @param  {num} maskPattern 掩膜的版本
     */
    makeImpl: function makeImpl(maskPattern) {
      this.moduleCount = this.typeNumber * 4 + 17;
      this.modules = new Array(this.moduleCount);

      for (var row = 0; row < this.moduleCount; row++) {
        this.modules[row] = new Array(this.moduleCount);
      }

      this.setupPositionProbePattern(0, 0);
      this.setupPositionProbePattern(this.moduleCount - 7, 0);
      this.setupPositionProbePattern(0, this.moduleCount - 7);
      this.setupPositionAdjustPattern();
      this.setupTimingPattern();
      this.setupTypeInfo(true, maskPattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(true);
      }

      this.mapData(this.dataCache, maskPattern);
    },

    /**
     * 设置二维码的位置探测图形
     * @param  {num} row 探测图形的中心横坐标
     * @param  {num} col 探测图形的中心纵坐标
     */
    setupPositionProbePattern: function setupPositionProbePattern(row, col) {
      for (var r = -1; r <= 7; r++) {
        if (row + r <= -1 || this.moduleCount <= row + r) continue;

        for (var c = -1; c <= 7; c++) {
          if (col + c <= -1 || this.moduleCount <= col + c) continue;

          if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
            this.modules[row + r][col + c] = true;
          } else {
            this.modules[row + r][col + c] = false;
          }
        }
      }
    },

    /**
     * 创建二维码
     * @return {[type]} [description]
     */
    createQrcode: function createQrcode() {
      var minLostPoint = 0;
      var pattern = 0;
      var bestModules = null;

      for (var i = 0; i < 8; i++) {
        this.makeImpl(i);
        var lostPoint = QRUtil.getLostPoint(this);

        if (i == 0 || minLostPoint > lostPoint) {
          minLostPoint = lostPoint;
          pattern = i;
          bestModules = this.modules;
        }
      }

      this.modules = bestModules;
      this.setupTypeInfo(false, pattern);

      if (this.typeNumber >= 7) {
        this.setupTypeNumber(false);
      }
    },

    /**
     * 设置定位图形
     * @return {[type]} [description]
     */
    setupTimingPattern: function setupTimingPattern() {
      for (var r = 8; r < this.moduleCount - 8; r++) {
        if (this.modules[r][6] != null) {
          continue;
        }

        this.modules[r][6] = r % 2 == 0;

        if (this.modules[6][r] != null) {
          continue;
        }

        this.modules[6][r] = r % 2 == 0;
      }
    },

    /**
     * 设置矫正图形
     * @return {[type]} [description]
     */
    setupPositionAdjustPattern: function setupPositionAdjustPattern() {
      var pos = QRUtil.getPatternPosition(this.typeNumber);

      for (var i = 0; i < pos.length; i++) {
        for (var j = 0; j < pos.length; j++) {
          var row = pos[i];
          var col = pos[j];

          if (this.modules[row][col] != null) {
            continue;
          }

          for (var r = -2; r <= 2; r++) {
            for (var c = -2; c <= 2; c++) {
              if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }
      }
    },

    /**
     * 设置版本信息（7以上版本才有）
     * @param  {bool} test 是否处于判断最佳掩膜阶段
     * @return {[type]}      [description]
     */
    setupTypeNumber: function setupTypeNumber(test) {
      var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

      for (var i = 0; i < 18; i++) {
        var mod = !test && (bits >> i & 1) == 1;
        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
        this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
      }
    },

    /**
     * 设置格式信息（纠错等级和掩膜版本）
     * @param  {bool} test
     * @param  {num} maskPattern 掩膜版本
     * @return {}
     */
    setupTypeInfo: function setupTypeInfo(test, maskPattern) {
      var data = QRErrorCorrectLevel[this.errorCorrectLevel] << 3 | maskPattern;
      var bits = QRUtil.getBCHTypeInfo(data); // vertical

      for (var i = 0; i < 15; i++) {
        var mod = !test && (bits >> i & 1) == 1;

        if (i < 6) {
          this.modules[i][8] = mod;
        } else if (i < 8) {
          this.modules[i + 1][8] = mod;
        } else {
          this.modules[this.moduleCount - 15 + i][8] = mod;
        } // horizontal


        var mod = !test && (bits >> i & 1) == 1;

        if (i < 8) {
          this.modules[8][this.moduleCount - i - 1] = mod;
        } else if (i < 9) {
          this.modules[8][15 - i - 1 + 1] = mod;
        } else {
          this.modules[8][15 - i - 1] = mod;
        }
      } // fixed module


      this.modules[this.moduleCount - 8][8] = !test;
    },

    /**
     * 数据编码
     * @return {[type]} [description]
     */
    createData: function createData() {
      var buffer = new QRBitBuffer();
      var lengthBits = this.typeNumber > 9 ? 16 : 8;
      buffer.put(4, 4); //添加模式

      buffer.put(this.utf8bytes.length, lengthBits);

      for (var i = 0, l = this.utf8bytes.length; i < l; i++) {
        buffer.put(this.utf8bytes[i], 8);
      }

      if (buffer.length + 4 <= this.totalDataCount * 8) {
        buffer.put(0, 4);
      } // padding


      while (buffer.length % 8 != 0) {
        buffer.putBit(false);
      } // padding


      while (true) {
        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }

        buffer.put(QRCodeAlg.PAD0, 8);

        if (buffer.length >= this.totalDataCount * 8) {
          break;
        }

        buffer.put(QRCodeAlg.PAD1, 8);
      }

      return this.createBytes(buffer);
    },

    /**
     * 纠错码编码
     * @param  {buffer} buffer 数据编码
     * @return {[type]}
     */
    createBytes: function createBytes(buffer) {
      var offset = 0;
      var maxDcCount = 0;
      var maxEcCount = 0;
      var length = this.rsBlock.length / 3;
      var rsBlocks = new Array();

      for (var i = 0; i < length; i++) {
        var count = this.rsBlock[i * 3 + 0];
        var totalCount = this.rsBlock[i * 3 + 1];
        var dataCount = this.rsBlock[i * 3 + 2];

        for (var j = 0; j < count; j++) {
          rsBlocks.push([dataCount, totalCount]);
        }
      }

      var dcdata = new Array(rsBlocks.length);
      var ecdata = new Array(rsBlocks.length);

      for (var r = 0; r < rsBlocks.length; r++) {
        var dcCount = rsBlocks[r][0];
        var ecCount = rsBlocks[r][1] - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);

        for (var i = 0; i < dcdata[r].length; i++) {
          dcdata[r][i] = 0xff & buffer.buffer[i + offset];
        }

        offset += dcCount;
        var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
        var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
        var modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);

        for (var i = 0; i < ecdata[r].length; i++) {
          var modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
        }
      }

      var data = new Array(this.totalDataCount);
      var index = 0;

      for (var i = 0; i < maxDcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < dcdata[r].length) {
            data[index++] = dcdata[r][i];
          }
        }
      }

      for (var i = 0; i < maxEcCount; i++) {
        for (var r = 0; r < rsBlocks.length; r++) {
          if (i < ecdata[r].length) {
            data[index++] = ecdata[r][i];
          }
        }
      }

      return data;
    },

    /**
     * 布置模块，构建最终信息
     * @param  {} data
     * @param  {} maskPattern
     * @return {}
     */
    mapData: function mapData(data, maskPattern) {
      var inc = -1;
      var row = this.moduleCount - 1;
      var bitIndex = 7;
      var byteIndex = 0;

      for (var col = this.moduleCount - 1; col > 0; col -= 2) {
        if (col == 6) col--;

        while (true) {
          for (var c = 0; c < 2; c++) {
            if (this.modules[row][col - c] == null) {
              var dark = false;

              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) == 1;
              }

              var mask = QRUtil.getMask(maskPattern, row, col - c);

              if (mask) {
                dark = !dark;
              }

              this.modules[row][col - c] = dark;
              bitIndex--;

              if (bitIndex == -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }

          row += inc;

          if (row < 0 || this.moduleCount <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
  };
  /**
   * 填充字段
   */

  QRCodeAlg.PAD0 = 0xEC;
  QRCodeAlg.PAD1 = 0x11; //---------------------------------------------------------------------
  // 纠错等级对应的编码
  //---------------------------------------------------------------------

  var QRErrorCorrectLevel = [1, 0, 3, 2]; //---------------------------------------------------------------------
  // 掩膜版本
  //---------------------------------------------------------------------

  var QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7
  }; //---------------------------------------------------------------------
  // 工具类
  //---------------------------------------------------------------------

  var QRUtil = {
    /*
    每个版本矫正图形的位置
     */
    PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
    G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
    G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
    G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

    /*
    BCH编码格式信息
     */
    getBCHTypeInfo: function getBCHTypeInfo(data) {
      var d = data << 10;

      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
        d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
      }

      return (data << 10 | d) ^ QRUtil.G15_MASK;
    },

    /*
    BCH编码版本信息
     */
    getBCHTypeNumber: function getBCHTypeNumber(data) {
      var d = data << 12;

      while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
        d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
      }

      return data << 12 | d;
    },

    /*
    获取BCH位信息
     */
    getBCHDigit: function getBCHDigit(data) {
      var digit = 0;

      while (data != 0) {
        digit++;
        data >>>= 1;
      }

      return digit;
    },

    /*
    获取版本对应的矫正图形位置
     */
    getPatternPosition: function getPatternPosition(typeNumber) {
      return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    /*
    掩膜算法
     */
    getMask: function getMask(maskPattern, i, j) {
      switch (maskPattern) {
        case QRMaskPattern.PATTERN000:
          return (i + j) % 2 == 0;

        case QRMaskPattern.PATTERN001:
          return i % 2 == 0;

        case QRMaskPattern.PATTERN010:
          return j % 3 == 0;

        case QRMaskPattern.PATTERN011:
          return (i + j) % 3 == 0;

        case QRMaskPattern.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;

        case QRMaskPattern.PATTERN101:
          return i * j % 2 + i * j % 3 == 0;

        case QRMaskPattern.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 == 0;

        case QRMaskPattern.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 == 0;

        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    },

    /*
    获取RS的纠错多项式
     */
    getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
      var a = new QRPolynomial([1], 0);

      for (var i = 0; i < errorCorrectLength; i++) {
        a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
      }

      return a;
    },

    /*
    获取评价
     */
    getLostPoint: function getLostPoint(qrCode) {
      var moduleCount = qrCode.getModuleCount(),
          lostPoint = 0,
          darkCount = 0;

      for (var row = 0; row < moduleCount; row++) {
        var sameCount = 0;
        var head = qrCode.modules[row][0];

        for (var col = 0; col < moduleCount; col++) {
          var current = qrCode.modules[row][col]; //level 3 评价

          if (col < moduleCount - 6) {
            if (current && !qrCode.modules[row][col + 1] && qrCode.modules[row][col + 2] && qrCode.modules[row][col + 3] && qrCode.modules[row][col + 4] && !qrCode.modules[row][col + 5] && qrCode.modules[row][col + 6]) {
              if (col < moduleCount - 10) {
                if (qrCode.modules[row][col + 7] && qrCode.modules[row][col + 8] && qrCode.modules[row][col + 9] && qrCode.modules[row][col + 10]) {
                  lostPoint += 40;
                }
              } else if (col > 3) {
                if (qrCode.modules[row][col - 1] && qrCode.modules[row][col - 2] && qrCode.modules[row][col - 3] && qrCode.modules[row][col - 4]) {
                  lostPoint += 40;
                }
              }
            }
          } //level 2 评价


          if (row < moduleCount - 1 && col < moduleCount - 1) {
            var count = 0;
            if (current) count++;
            if (qrCode.modules[row + 1][col]) count++;
            if (qrCode.modules[row][col + 1]) count++;
            if (qrCode.modules[row + 1][col + 1]) count++;

            if (count == 0 || count == 4) {
              lostPoint += 3;
            }
          } //level 1 评价


          if (head ^ current) {
            sameCount++;
          } else {
            head = current;

            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }

            sameCount = 1;
          } //level 4 评价


          if (current) {
            darkCount++;
          }
        }
      }

      for (var col = 0; col < moduleCount; col++) {
        var sameCount = 0;
        var head = qrCode.modules[0][col];

        for (var row = 0; row < moduleCount; row++) {
          var current = qrCode.modules[row][col]; //level 3 评价

          if (row < moduleCount - 6) {
            if (current && !qrCode.modules[row + 1][col] && qrCode.modules[row + 2][col] && qrCode.modules[row + 3][col] && qrCode.modules[row + 4][col] && !qrCode.modules[row + 5][col] && qrCode.modules[row + 6][col]) {
              if (row < moduleCount - 10) {
                if (qrCode.modules[row + 7][col] && qrCode.modules[row + 8][col] && qrCode.modules[row + 9][col] && qrCode.modules[row + 10][col]) {
                  lostPoint += 40;
                }
              } else if (row > 3) {
                if (qrCode.modules[row - 1][col] && qrCode.modules[row - 2][col] && qrCode.modules[row - 3][col] && qrCode.modules[row - 4][col]) {
                  lostPoint += 40;
                }
              }
            }
          } //level 1 评价


          if (head ^ current) {
            sameCount++;
          } else {
            head = current;

            if (sameCount >= 5) {
              lostPoint += 3 + sameCount - 5;
            }

            sameCount = 1;
          }
        }
      } // LEVEL4


      var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    }
  }; //---------------------------------------------------------------------
  // QRMath使用的数学工具
  //---------------------------------------------------------------------

  var QRMath = {
    /*
    将n转化为a^m
     */
    glog: function glog(n) {
      if (n < 1) {
        throw new Error("glog(" + n + ")");
      }

      return QRMath.LOG_TABLE[n];
    },

    /*
    将a^m转化为n
     */
    gexp: function gexp(n) {
      while (n < 0) {
        n += 255;
      }

      while (n >= 256) {
        n -= 255;
      }

      return QRMath.EXP_TABLE[n];
    },
    EXP_TABLE: new Array(256),
    LOG_TABLE: new Array(256)
  };

  for (var i = 0; i < 8; i++) {
    QRMath.EXP_TABLE[i] = 1 << i;
  }

  for (var i = 8; i < 256; i++) {
    QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
  }

  for (var i = 0; i < 255; i++) {
    QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
  } //---------------------------------------------------------------------
  // QRPolynomial 多项式
  //---------------------------------------------------------------------

  /**
   * 多项式类
   * @param {Array} num   系数
   * @param {num} shift a^shift
   */


  function QRPolynomial(num, shift) {
    if (num.length == undefined) {
      throw new Error(num.length + "/" + shift);
    }

    var offset = 0;

    while (offset < num.length && num[offset] == 0) {
      offset++;
    }

    this.num = new Array(num.length - offset + shift);

    for (var i = 0; i < num.length - offset; i++) {
      this.num[i] = num[i + offset];
    }
  }

  QRPolynomial.prototype = {
    get: function get(index) {
      return this.num[index];
    },
    getLength: function getLength() {
      return this.num.length;
    },

    /**
     * 多项式乘法
     * @param  {QRPolynomial} e 被乘多项式
     * @return {[type]}   [description]
     */
    multiply: function multiply(e) {
      var num = new Array(this.getLength() + e.getLength() - 1);

      for (var i = 0; i < this.getLength(); i++) {
        for (var j = 0; j < e.getLength(); j++) {
          num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
        }
      }

      return new QRPolynomial(num, 0);
    },

    /**
     * 多项式模运算
     * @param  {QRPolynomial} e 模多项式
     * @return {}
     */
    mod: function mod(e) {
      var tl = this.getLength(),
          el = e.getLength();

      if (tl - el < 0) {
        return this;
      }

      var num = new Array(tl);

      for (var i = 0; i < tl; i++) {
        num[i] = this.get(i);
      }

      while (num.length >= el) {
        var ratio = QRMath.glog(num[0]) - QRMath.glog(e.get(0));

        for (var i = 0; i < e.getLength(); i++) {
          num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }

        while (num[0] == 0) {
          num.shift();
        }
      }

      return new QRPolynomial(num, 0);
    }
  }; //---------------------------------------------------------------------
  // RS_BLOCK_TABLE
  //---------------------------------------------------------------------

  /*
  二维码各个版本信息[块数, 每块中的数据块数, 每块中的信息块数]
   */

  var RS_BLOCK_TABLE = [// L
  // M
  // Q
  // H
  // 1
  [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], // 2
  [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], // 3
  [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], // 4
  [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], // 5
  [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], // 6
  [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], // 7
  [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], // 8
  [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], // 9
  [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], // 10
  [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], // 11
  [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], // 12
  [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], // 13
  [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], // 14
  [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], // 15
  [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], // 16
  [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], // 17
  [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], // 18
  [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], // 19
  [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], // 20
  [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], // 21
  [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], // 22
  [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], // 23
  [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], // 24
  [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], // 25
  [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], // 26
  [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], // 27
  [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], // 28
  [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], // 29
  [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], // 30
  [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], // 31
  [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], // 32
  [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], // 33
  [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], // 34
  [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], // 35
  [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], // 36
  [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], // 37
  [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], // 38
  [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], // 39
  [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], // 40
  [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];
  /**
   * 根据数据获取对应版本
   * @return {[type]} [description]
   */

  QRCodeAlg.prototype.getRightType = function () {
    for (var typeNumber = 1; typeNumber < 41; typeNumber++) {
      var rsBlock = RS_BLOCK_TABLE[(typeNumber - 1) * 4 + this.errorCorrectLevel];

      if (rsBlock == undefined) {
        throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + this.errorCorrectLevel);
      }

      var length = rsBlock.length / 3;
      var totalDataCount = 0;

      for (var i = 0; i < length; i++) {
        var count = rsBlock[i * 3 + 0];
        var dataCount = rsBlock[i * 3 + 2];
        totalDataCount += dataCount * count;
      }

      var lengthBytes = typeNumber > 9 ? 2 : 1;

      if (this.utf8bytes.length + lengthBytes < totalDataCount || typeNumber == 40) {
        this.typeNumber = typeNumber;
        this.rsBlock = rsBlock;
        this.totalDataCount = totalDataCount;
        break;
      }
    }
  }; //---------------------------------------------------------------------
  // QRBitBuffer
  //---------------------------------------------------------------------


  function QRBitBuffer() {
    this.buffer = new Array();
    this.length = 0;
  }

  QRBitBuffer.prototype = {
    get: function get(index) {
      var bufIndex = Math.floor(index / 8);
      return this.buffer[bufIndex] >>> 7 - index % 8 & 1;
    },
    put: function put(num, length) {
      for (var i = 0; i < length; i++) {
        this.putBit(num >>> length - i - 1 & 1);
      }
    },
    putBit: function putBit(bit) {
      var bufIndex = Math.floor(this.length / 8);

      if (this.buffer.length <= bufIndex) {
        this.buffer.push(0);
      }

      if (bit) {
        this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
      }

      this.length++;
    }
  }; // xzedit

  var qrcodeAlgObjCache = [];
  /**
   * 二维码构造函数，主要用于绘制
   * @param  {参数列表} opt 传递参数
   * @return {}
   */

  QRCode = function QRCode(opt) {
    //设置默认参数
    this.options = {
      text: '',
      size: 256,
      correctLevel: 3,
      background: '#ffffff',
      foreground: '#000000',
      pdground: '#000000',
      image: '',
      imageSize: 30,
      canvasId: opt.canvasId,
      context: opt.context,
      usingComponents: opt.usingComponents,
      showLoading: opt.showLoading,
      loadingText: opt.loadingText
    };

    if (typeof opt === 'string') {
      // 只编码ASCII字符串
      opt = {
        text: opt
      };
    }

    if (opt) {
      for (var i in opt) {
        this.options[i] = opt[i];
      }
    } //使用QRCodeAlg创建二维码结构


    var qrCodeAlg = null;

    for (var i = 0, l = qrcodeAlgObjCache.length; i < l; i++) {
      if (qrcodeAlgObjCache[i].text == this.options.text && qrcodeAlgObjCache[i].text.correctLevel == this.options.correctLevel) {
        qrCodeAlg = qrcodeAlgObjCache[i].obj;
        break;
      }
    }

    if (i == l) {
      qrCodeAlg = new QRCodeAlg(this.options.text, this.options.correctLevel);
      qrcodeAlgObjCache.push({
        text: this.options.text,
        correctLevel: this.options.correctLevel,
        obj: qrCodeAlg
      });
    }
    /**
     * 计算矩阵点的前景色
     * @param {Obj} config
     * @param {Number} config.row 点x坐标
     * @param {Number} config.col 点y坐标
     * @param {Number} config.count 矩阵大小
     * @param {Number} config.options 组件的options
     * @return {String}
     */


    var getForeGround = function getForeGround(config) {
      var options = config.options;

      if (options.pdground && (config.row > 1 && config.row < 5 && config.col > 1 && config.col < 5 || config.row > config.count - 6 && config.row < config.count - 2 && config.col > 1 && config.col < 5 || config.row > 1 && config.row < 5 && config.col > config.count - 6 && config.col < config.count - 2)) {
        return options.pdground;
      }

      return options.foreground;
    }; // 创建canvas


    var createCanvas = function createCanvas(options) {
      if (options.showLoading) {
        uni.showLoading({
          title: options.loadingText,
          mask: true
        });
      }

      var ctx = uni.createCanvasContext(options.canvasId, options.context);
      var count = qrCodeAlg.getModuleCount();
      var ratioSize = options.size;
      var ratioImgSize = options.imageSize; //计算每个点的长宽

      var tileW = (ratioSize / count).toPrecision(4);
      var tileH = (ratioSize / count).toPrecision(4); //绘制

      for (var row = 0; row < count; row++) {
        for (var col = 0; col < count; col++) {
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          var foreground = getForeGround({
            row: row,
            col: col,
            count: count,
            options: options
          });
          ctx.setFillStyle(qrCodeAlg.modules[row][col] ? foreground : options.background);
          ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
        }
      }

      if (options.image) {
        // 画圆角矩形
        var drawRoundedRect = function drawRoundedRect(ctxi, x, y, width, height, r, lineWidth, fill, stroke) {
          ctxi.setLineWidth(lineWidth);
          ctxi.setFillStyle(options.background);
          ctxi.setStrokeStyle(options.background);
          ctxi.beginPath(); // draw top and top right corner 

          ctxi.moveTo(x + r, y);
          ctxi.arcTo(x + width, y, x + width, y + r, r); // draw right side and bottom right corner 

          ctxi.arcTo(x + width, y + height, x + width - r, y + height, r); // draw bottom and bottom left corner 

          ctxi.arcTo(x, y + height, x, y + height - r, r); // draw left and top left corner 

          ctxi.arcTo(x, y, x + r, y, r);
          ctxi.closePath();

          if (fill) {
            ctxi.fill();
          }

          if (stroke) {
            ctxi.stroke();
          }
        };

        var x = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));
        var y = Number(((ratioSize - ratioImgSize) / 2).toFixed(2));
        drawRoundedRect(ctx, x, y, ratioImgSize, ratioImgSize, 2, 6, true, true);
        ctx.drawImage(options.image, x, y, ratioImgSize, ratioImgSize);
      }

      setTimeout(function () {
        ctx.draw(true, function () {
          // 保存到临时区域
          setTimeout(function () {
            uni.canvasToTempFilePath({
              width: options.width,
              height: options.height,
              destWidth: options.width,
              destHeight: options.height,
              canvasId: options.canvasId,
              quality: Number(1),
              success: function success(res) {
                if (options.cbResult) {
                  options.cbResult(res.tempFilePath);
                }
              },
              fail: function fail(res) {
                if (options.cbResult) {
                  options.cbResult(res);
                }
              },
              complete: function complete() {
                if (options.showLoading) {
                  uni.hideLoading();
                }
              }
            }, options.context);
          }, options.text.length + 100);
        });
      }, options.usingComponents ? 0 : 150);
    };

    createCanvas(this.options); // 空判定

    var empty = function empty(v) {
      var tp = _typeof(v),
          rt = false;

      if (tp == "number" && String(v) == "") {
        rt = true;
      } else if (tp == "undefined") {
        rt = true;
      } else if (tp == "object") {
        if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true;
      } else if (tp == "string") {
        if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true;
      } else if (tp == "function") {
        rt = false;
      }

      return rt;
    };
  };

  QRCode.prototype.clear = function (fn) {
    var ctx = uni.createCanvasContext(this.options.canvasId, this.options.context);
    ctx.clearRect(0, 0, this.options.size, this.options.size);
    ctx.draw(false, function () {
      if (fn) {
        fn();
      }
    });
  };
})();

var _default = QRCode;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/subpages/common/vendor.js.map