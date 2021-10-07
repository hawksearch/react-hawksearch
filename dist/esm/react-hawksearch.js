import React__default, { useContext, useState, useRef, useEffect, createElement } from 'react';
import { useCookies } from 'react-cookie';
import Downshift from 'downshift';

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _typeof$1 = unwrapExports(_typeof_1);

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var consoleLogger = {
  type: 'logger',
  log: function log(args) {
    this.output('log', args);
  },
  warn: function warn(args) {
    this.output('warn', args);
  },
  error: function error(args) {
    this.output('error', args);
  },
  output: function output(type, args) {
    if (console && console[type]) console[type].apply(console, args);
  }
};

var Logger = function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Logger);

    this.init(concreteLogger, options);
  }

  _createClass(Logger, [{
    key: "init",
    value: function init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || 'i18next:';
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.forward(args, 'log', '', true);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.forward(args, 'warn', '', true);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.forward(args, 'error', '');
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.forward(args, 'warn', 'WARNING DEPRECATED: ', true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (typeof args[0] === 'string') args[0] = "".concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger(this.logger, _objectSpread({}, {
        prefix: "".concat(this.prefix, ":").concat(moduleName, ":")
      }, this.options));
    }
  }]);

  return Logger;
}();

var baseLogger = new Logger();

var EventEmitter = function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.observers = {};
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;

      events.split(' ').forEach(function (event) {
        _this.observers[event] = _this.observers[event] || [];

        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      if (!this.observers[event]) return;

      if (!listener) {
        delete this.observers[event];
        return;
      }

      this.observers[event] = this.observers[event].filter(function (l) {
        return l !== listener;
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function (observer) {
          observer.apply(void 0, args);
        });
      }

      if (this.observers['*']) {
        var _cloned = [].concat(this.observers['*']);

        _cloned.forEach(function (observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);

  return EventEmitter;
}();

function defer() {
  var res;
  var rej;
  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return '';
  return '' + object;
}
function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}

function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf('###') > -1 ? key.replace(/###/g, '.') : key;
  }

  function canNotTraverseDeeper() {
    return !object || typeof object === 'string';
  }

  var stack = typeof path !== 'string' ? [].concat(path) : path.split('.');

  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();

    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object = object[key];
    } else {
      object = {};
    }
  }

  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}

function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object),
      obj = _getLastOfPath.obj,
      k = _getLastOfPath.k;

  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object),
      obj = _getLastOfPath2.obj,
      k = _getLastOfPath2.k;

  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path),
      obj = _getLastOfPath3.obj,
      k = _getLastOfPath3.k;

  if (!obj) return undefined;
  return obj[k];
}
function getPathWithDefaults(data, defaultData, key) {
  var value = getPath(data, key);

  if (value !== undefined) {
    return value;
  }

  return getPath(defaultData, key);
}
function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if (prop !== '__proto__' && prop !== 'constructor') {
      if (prop in target) {
        if (typeof target[prop] === 'string' || target[prop] instanceof String || typeof source[prop] === 'string' || source[prop] instanceof String) {
          if (overwrite) target[prop] = source[prop];
        } else {
          deepExtend(target[prop], source[prop], overwrite);
        }
      } else {
        target[prop] = source[prop];
      }
    }
  }

  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}
var _entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;'
};
function escape(data) {
  if (typeof data === 'string') {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }

  return data;
}
var isIE10 = typeof window !== 'undefined' && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('MSIE') > -1;

var ResourceStore = function (_EventEmitter) {
  _inherits(ResourceStore, _EventEmitter);

  function ResourceStore(data) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ['translation'],
      defaultNS: 'translation'
    };

    _classCallCheck(this, ResourceStore);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceStore).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.data = data || {};
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    return _this;
  }

  _createClass(ResourceStore, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);

      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var path = [lng, ns];
      if (key && typeof key !== 'string') path = path.concat(key);
      if (key && typeof key === 'string') path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
      }

      return getPath(this.data, path);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined) keySeparator = '.';
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        value = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit('added', lng, ns, key, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };

      for (var m in resources) {
        if (typeof resources[m] === 'string' || Object.prototype.toString.apply(resources[m]) === '[object Array]') this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }

      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false
      };
      var path = [lng, ns];

      if (lng.indexOf('.') > -1) {
        path = lng.split('.');
        deep = resources;
        resources = ns;
        ns = path[1];
      }

      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || {};

      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = _objectSpread({}, pack, resources);
      }

      setPath(this.data, path, pack);
      if (!options.silent) this.emit('added', lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }

      this.removeNamespaces(ns);
      this.emit('removed', lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === 'v1') return _objectSpread({}, {}, this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);

  return ResourceStore;
}(EventEmitter);

var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;

    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};

var checkedLoadedFor = {};

var Translator = function (_EventEmitter) {
  _inherits(Translator, _EventEmitter);

  function Translator(services) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Translator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Translator).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    copy(['resourceStore', 'languageUtils', 'pluralResolver', 'interpolator', 'backendConnector', 'i18nFormat', 'utils'], services, _assertThisInitialized(_this));
    _this.options = options;

    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = '.';
    }

    _this.logger = baseLogger.create('translator');
    return _this;
  }

  _createClass(Translator, [{
    key: "changeLanguage",
    value: function changeLanguage(lng) {
      if (lng) this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator !== undefined ? options.nsSeparator : this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ':';
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS;

      if (nsSeparator && key.indexOf(nsSeparator) > -1) {
        var m = key.match(this.interpolator.nestingRegexp);

        if (m && m.length > 0) {
          return {
            key: key,
            namespaces: namespaces
          };
        }

        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }

      if (typeof namespaces === 'string') namespaces = [namespaces];
      return {
        key: key,
        namespaces: namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options, lastKey) {
      var _this2 = this;

      if (_typeof(options) !== 'object' && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }

      if (!options) options = {};
      if (keys === undefined || keys === null) return '';
      if (!Array.isArray(keys)) keys = [String(keys)];
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;

      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options),
          key = _this$extractFromKey.key,
          namespaces = _this$extractFromKey.namespaces;

      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;

      if (lng && lng.toLowerCase() === 'cimode') {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          return namespace + nsSeparator + key;
        }

        return key;
      }

      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ['[object Number]', '[object Function]', '[object RegExp]'];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== 'string' && typeof res !== 'boolean' && typeof res !== 'number';

      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === 'string' && resType === '[object Array]')) {
        if (!options.returnObjects && !this.options.returnObjects) {
          this.logger.warn('accessing an object - but returnObjects options is not enabled!');
          return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : "key '".concat(key, " (").concat(this.language, ")' returned an object instead of string.");
        }

        if (keySeparator) {
          var resTypeIsArray = resType === '[object Array]';
          var copy = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;

          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = "".concat(newKeyToUse).concat(keySeparator).concat(m);
              copy[m] = this.translate(deepKey, _objectSpread({}, options, {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy[m] === deepKey) copy[m] = res[m];
            }
          }

          res = copy;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === 'string' && resType === '[object Array]') {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options, lastKey);
      } else {
        var usedDefault = false;
        var usedKey = false;
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var hasDefaultValue = Translator.hasDefaultValue(options);
        var defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, options.count) : '';
        var defaultValue = options["defaultValue".concat(defaultValueSuffix)] || options.defaultValue;

        if (!this.isValidLookup(res) && hasDefaultValue) {
          usedDefault = true;
          res = defaultValue;
        }

        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }

        var updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;

        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? 'updateKey' : 'missingKey', lng, namespace, key, updateMissing ? defaultValue : res);

          if (keySeparator) {
            var fk = this.resolve(key, _objectSpread({}, options, {
              keySeparator: false
            }));
            if (fk && fk.res) this.logger.warn('Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.');
          }

          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);

          if (this.options.saveMissingTo === 'fallback' && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === 'all') {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }

          var send = function send(l, k, fallbackValue) {
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? fallbackValue : res, updateMissing, options);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? fallbackValue : res, updateMissing, options);
            }

            _this2.emit('missingKey', l, namespace, k, res);
          };

          if (this.options.saveMissing) {
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function (language) {
                _this2.pluralResolver.getSuffixes(language).forEach(function (suffix) {
                  send([language], key + suffix, options["defaultValue".concat(suffix)] || defaultValue);
                });
              });
            } else {
              send(lngs, key, defaultValue);
            }
          }
        }

        res = this.extendTranslation(res, keys, options, resolved, lastKey);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = "".concat(namespace, ":").concat(key);
        if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
      }

      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key, options, resolved, lastKey) {
      var _this3 = this;

      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved: resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init(_objectSpread({}, options, {
          interpolation: _objectSpread({}, this.options.interpolation, options.interpolation)
        }));
        var skipOnVariables = options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
        var nestBef;

        if (skipOnVariables) {
          var nb = res.match(this.interpolator.nestingRegexp);
          nestBef = nb && nb.length;
        }

        var data = options.replace && typeof options.replace !== 'string' ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = _objectSpread({}, this.options.interpolation.defaultVariables, data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language, options);

        if (skipOnVariables) {
          var na = res.match(this.interpolator.nestingRegexp);
          var nestAft = na && na.length;
          if (nestBef < nestAft) options.nest = false;
        }

        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          if (lastKey && lastKey[0] === args[0] && !options.context) {
            _this3.logger.warn("It seems you are nesting recursively key: ".concat(args[0], " in key: ").concat(key[0]));

            return null;
          }

          return _this3.translate.apply(_this3, args.concat([key]));
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }

      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === 'string' ? [postProcess] : postProcess;

      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? _objectSpread({
          i18nResolved: resolved
        }, options) : options, this);
      }

      return res;
    }
  }, {
    key: "resolve",
    value: function resolve(keys) {
      var _this4 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === 'string') keys = [keys];
      keys.forEach(function (k) {
        if (_this4.isValidLookup(found)) return;

        var extracted = _this4.extractFromKey(k, options);

        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && typeof options.count !== 'string';
        var needsContextHandling = options.context !== undefined && typeof options.context === 'string' && options.context !== '';
        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
        namespaces.forEach(function (ns) {
          if (_this4.isValidLookup(found)) return;
          usedNS = ns;

          if (!checkedLoadedFor["".concat(codes[0], "-").concat(ns)] && _this4.utils && _this4.utils.hasLoadedNamespace && !_this4.utils.hasLoadedNamespace(usedNS)) {
            checkedLoadedFor["".concat(codes[0], "-").concat(ns)] = true;

            _this4.logger.warn("key \"".concat(usedKey, "\" for languages \"").concat(codes.join(', '), "\" won't get resolved as namespace \"").concat(usedNS, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
          }

          codes.forEach(function (code) {
            if (_this4.isValidLookup(found)) return;
            usedLng = code;
            var finalKey = key;
            var finalKeys = [finalKey];

            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);
              if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
              if (needsContextHandling) finalKeys.push(finalKey += "".concat(_this4.options.contextSeparator).concat(options.context));
              if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
            }

            var possibleKey;

            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey: usedKey,
        exactUsedKey: exactUsedKey,
        usedLng: usedLng,
        usedNS: usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === '');
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
  }], [{
    key: "hasDefaultValue",
    value: function hasDefaultValue(options) {
      var prefix = 'defaultValue';

      for (var option in options) {
        if (Object.prototype.hasOwnProperty.call(options, option) && prefix === option.substring(0, prefix.length) && undefined !== options[option]) {
          return true;
        }
      }

      return false;
    }
  }]);

  return Translator;
}(EventEmitter);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

var LanguageUtil = function () {
  function LanguageUtil(options) {
    _classCallCheck(this, LanguageUtil);

    this.options = options;
    this.whitelist = this.options.supportedLngs || false;
    this.supportedLngs = this.options.supportedLngs || false;
    this.logger = baseLogger.create('languageUtils');
  }

  _createClass(LanguageUtil, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return null;
      var p = code.split('-');
      if (p.length === 2) return null;
      p.pop();
      if (p[p.length - 1].toLowerCase() === 'x') return null;
      return this.formatLanguageCode(p.join('-'));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf('-') < 0) return code;
      var p = code.split('-');
      return this.formatLanguageCode(p[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === 'string' && code.indexOf('-') > -1) {
        var specialCases = ['hans', 'hant', 'latn', 'cyrl', 'cans', 'mong', 'arab'];
        var p = code.split('-');

        if (this.options.lowerCaseLng) {
          p = p.map(function (part) {
            return part.toLowerCase();
          });
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== 'sgn' && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }

        return p.join('-');
      }

      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isWhitelisted",
    value: function isWhitelisted(code) {
      this.logger.deprecate('languageUtils.isWhitelisted', 'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.');
      return this.isSupportedCode(code);
    }
  }, {
    key: "isSupportedCode",
    value: function isSupportedCode(code) {
      if (this.options.load === 'languageOnly' || this.options.nonExplicitSupportedLngs) {
        code = this.getLanguagePartFromCode(code);
      }

      return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.indexOf(code) > -1;
    }
  }, {
    key: "getBestMatchFromCodes",
    value: function getBestMatchFromCodes(codes) {
      var _this = this;

      if (!codes) return null;
      var found;
      codes.forEach(function (code) {
        if (found) return;

        var cleanedLng = _this.formatLanguageCode(code);

        if (!_this.options.supportedLngs || _this.isSupportedCode(cleanedLng)) found = cleanedLng;
      });

      if (!found && this.options.supportedLngs) {
        codes.forEach(function (code) {
          if (found) return;

          var lngOnly = _this.getLanguagePartFromCode(code);

          if (_this.isSupportedCode(lngOnly)) return found = lngOnly;
          found = _this.options.supportedLngs.find(function (supportedLng) {
            if (supportedLng.indexOf(lngOnly) === 0) return supportedLng;
          });
        });
      }

      if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
      return found;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === 'function') fallbacks = fallbacks(code);
      if (typeof fallbacks === 'string') fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === '[object Array]') return fallbacks;
      if (!code) return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
      if (!found) found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this2 = this;

      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];

      var addCode = function addCode(c) {
        if (!c) return;

        if (_this2.isSupportedCode(c)) {
          codes.push(c);
        } else {
          _this2.logger.warn("rejecting language code not found in supportedLngs: ".concat(c));
        }
      };

      if (typeof code === 'string' && code.indexOf('-') > -1) {
        if (this.options.load !== 'languageOnly') addCode(this.formatLanguageCode(code));
        if (this.options.load !== 'languageOnly' && this.options.load !== 'currentOnly') addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== 'currentOnly') addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === 'string') {
        addCode(this.formatLanguageCode(code));
      }

      fallbackCodes.forEach(function (fc) {
        if (codes.indexOf(fc) < 0) addCode(_this2.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);

  return LanguageUtil;
}();

var sets = [{
  lngs: ['ach', 'ak', 'am', 'arn', 'br', 'fil', 'gun', 'ln', 'mfe', 'mg', 'mi', 'oc', 'pt', 'pt-BR', 'tg', 'tl', 'ti', 'tr', 'uz', 'wa'],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ['af', 'an', 'ast', 'az', 'bg', 'bn', 'ca', 'da', 'de', 'dev', 'el', 'en', 'eo', 'es', 'et', 'eu', 'fi', 'fo', 'fur', 'fy', 'gl', 'gu', 'ha', 'hi', 'hu', 'hy', 'ia', 'it', 'kn', 'ku', 'lb', 'mai', 'ml', 'mn', 'mr', 'nah', 'nap', 'nb', 'ne', 'nl', 'nn', 'no', 'nso', 'pa', 'pap', 'pms', 'ps', 'pt-PT', 'rm', 'sco', 'se', 'si', 'so', 'son', 'sq', 'sv', 'sw', 'ta', 'te', 'tk', 'ur', 'yo'],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ['ay', 'bo', 'cgg', 'fa', 'ht', 'id', 'ja', 'jbo', 'ka', 'kk', 'km', 'ko', 'ky', 'lo', 'ms', 'sah', 'su', 'th', 'tt', 'ug', 'vi', 'wo', 'zh'],
  nr: [1],
  fc: 3
}, {
  lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ['ar'],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ['cs', 'sk'],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ['csb', 'pl'],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ['cy'],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ['fr'],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ['ga'],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ['gd'],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ['is'],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ['jv'],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ['kw'],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ['lt'],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ['lv'],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ['mk'],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ['mnk'],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ['mt'],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ['or'],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ['ro'],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ['sl'],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ['he', 'iw'],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 && n % 100 != 11 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n == 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};

function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}

var PluralResolver = function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, PluralResolver);

    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create('pluralResolver');
    this.rules = createRules();
  }

  _createClass(PluralResolver, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var rule = this.getRule(code);
      return rule && rule.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key) {
      return this.getSuffixes(code).map(function (suffix) {
        return key + suffix;
      });
    }
  }, {
    key: "getSuffixes",
    value: function getSuffixes(code) {
      var _this = this;

      var rule = this.getRule(code);

      if (!rule) {
        return [];
      }

      return rule.numbers.map(function (number) {
        return _this.getSuffix(code, number);
      });
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var _this2 = this;

      var rule = this.getRule(code);

      if (rule) {
        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];

        if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = 'plural';
          } else if (suffix === 1) {
            suffix = '';
          }
        }

        var returnSuffix = function returnSuffix() {
          return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
        };

        if (this.options.compatibilityJSON === 'v1') {
          if (suffix === 1) return '';
          if (typeof suffix === 'number') return "_plural_".concat(suffix.toString());
          return returnSuffix();
        } else if (this.options.compatibilityJSON === 'v2') {
          return returnSuffix();
        } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          return returnSuffix();
        }

        return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
      }

      this.logger.warn("no plural rule found for: ".concat(code));
      return '';
    }
  }]);

  return PluralResolver;
}();

var Interpolator = function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Interpolator);

    this.logger = baseLogger.create('interpolator');
    this.options = options;

    this.format = options.interpolation && options.interpolation.format || function (value) {
      return value;
    };

    this.init(options);
  }

  _createClass(Interpolator, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var iOpts = options.interpolation;
      this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || '{{';
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || '}}';
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ',';
      this.unescapePrefix = iOpts.unescapeSuffix ? '' : iOpts.unescapePrefix || '-';
      this.unescapeSuffix = this.unescapePrefix ? '' : iOpts.unescapeSuffix || '';
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape('$t(');
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(')');
      this.nestingOptionsSeparator = iOpts.nestingOptionsSeparator ? iOpts.nestingOptionsSeparator : iOpts.nestingOptionsSeparator || ',';
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
      this.alwaysFormat = iOpts.alwaysFormat !== undefined ? iOpts.alwaysFormat : false;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options) this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = "".concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, 'g');
      var regexpUnescapeStr = "".concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, 'g');
      var nestingRegexpStr = "".concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, 'g');
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data, lng, options) {
      var _this = this;

      var match;
      var value;
      var replaces;
      var defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};

      function regexSafe(val) {
        return val.replace(/\$/g, '$$$$');
      }

      var handleFormat = function handleFormat(key) {
        if (key.indexOf(_this.formatSeparator) < 0) {
          var path = getPathWithDefaults(data, defaultData, key);
          return _this.alwaysFormat ? _this.format(path, undefined, lng) : path;
        }

        var p = key.split(_this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(_this.formatSeparator).trim();
        return _this.format(getPathWithDefaults(data, defaultData, k), f, lng, options);
      };

      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      var skipOnVariables = options && options.interpolation && options.interpolation.skipOnVariables || this.options.interpolation.skipOnVariables;
      var todos = [{
        regex: this.regexpUnescape,
        safeValue: function safeValue(val) {
          return regexSafe(val);
        }
      }, {
        regex: this.regexp,
        safeValue: function safeValue(val) {
          return _this.escapeValue ? regexSafe(_this.escape(val)) : regexSafe(val);
        }
      }];
      todos.forEach(function (todo) {
        replaces = 0;

        while (match = todo.regex.exec(str)) {
          value = handleFormat(match[1].trim());

          if (value === undefined) {
            if (typeof missingInterpolationHandler === 'function') {
              var temp = missingInterpolationHandler(str, match, options);
              value = typeof temp === 'string' ? temp : '';
            } else if (skipOnVariables) {
              value = match[0];
              continue;
            } else {
              _this.logger.warn("missed to pass in variable ".concat(match[1], " for interpolating ").concat(str));

              value = '';
            }
          } else if (typeof value !== 'string' && !_this.useRawValueToEscape) {
            value = makeString(value);
          }

          str = str.replace(match[0], todo.safeValue(value));
          todo.regex.lastIndex = 0;
          replaces++;

          if (replaces >= _this.maxReplaces) {
            break;
          }
        }
      });
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var _this2 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;

      var clonedOptions = _objectSpread({}, options);

      clonedOptions.applyPostProcessor = false;
      delete clonedOptions.defaultValue;

      function handleHasOptions(key, inheritedOptions) {
        var sep = this.nestingOptionsSeparator;
        if (key.indexOf(sep) < 0) return key;
        var c = key.split(new RegExp("".concat(sep, "[ ]*{")));
        var optionsString = "{".concat(c[1]);
        key = c[0];
        optionsString = this.interpolate(optionsString, clonedOptions);
        optionsString = optionsString.replace(/'/g, '"');

        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = _objectSpread({}, inheritedOptions, clonedOptions);
        } catch (e) {
          this.logger.warn("failed parsing options string in nesting for key ".concat(key), e);
          return "".concat(key).concat(sep).concat(optionsString);
        }

        delete clonedOptions.defaultValue;
        return key;
      }

      while (match = this.nestingRegexp.exec(str)) {
        var formatters = [];
        var doReduce = false;

        if (match[0].includes(this.formatSeparator) && !/{.*}/.test(match[1])) {
          var r = match[1].split(this.formatSeparator).map(function (elem) {
            return elem.trim();
          });
          match[1] = r.shift();
          formatters = r;
          doReduce = true;
        }

        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== 'string') return value;
        if (typeof value !== 'string') value = makeString(value);

        if (!value) {
          this.logger.warn("missed to resolve ".concat(match[1], " for nesting ").concat(str));
          value = '';
        }

        if (doReduce) {
          value = formatters.reduce(function (v, f) {
            return _this2.format(v, f, options.lng, options);
          }, value.trim());
        }

        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }

      return str;
    }
  }]);

  return Interpolator;
}();

function remove(arr, what) {
  var found = arr.indexOf(what);

  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}

var Connector = function (_EventEmitter) {
  _inherits(Connector, _EventEmitter);

  function Connector(backend, store, services) {
    var _this;

    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    _classCallCheck(this, Connector);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Connector).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.backend = backend;
    _this.store = store;
    _this.services = services;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = baseLogger.create('backendConnector');
    _this.state = {};
    _this.queue = [];

    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }

    return _this;
  }

  _createClass(Connector, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options, callback) {
      var _this2 = this;

      var toLoad = [];
      var pending = [];
      var toLoadLanguages = [];
      var toLoadNamespaces = [];
      languages.forEach(function (lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function (ns) {
          var name = "".concat(lng, "|").concat(ns);

          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
            if (pending.indexOf(name) < 0) pending.push(name);
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending.indexOf(name) < 0) pending.push(name);
            if (toLoad.indexOf(name) < 0) toLoad.push(name);
            if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
          }
        });
        if (!hasAllNamespaces) toLoadLanguages.push(lng);
      });

      if (toLoad.length || pending.length) {
        this.queue.push({
          pending: pending,
          loaded: {},
          errors: [],
          callback: callback
        });
      }

      return {
        toLoad: toLoad,
        pending: pending,
        toLoadLanguages: toLoadLanguages,
        toLoadNamespaces: toLoadNamespaces
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name, err, data) {
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      if (err) this.emit('failedLoading', lng, ns, err);

      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }

      this.state[name] = err ? -1 : 2;
      var loaded = {};
      this.queue.forEach(function (q) {
        pushPath(q.loaded, [lng], ns);
        remove(q.pending, name);
        if (err) q.errors.push(err);

        if (q.pending.length === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function (l) {
            if (!loaded[l]) loaded[l] = [];

            if (q.loaded[l].length) {
              q.loaded[l].forEach(function (ns) {
                if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
              });
            }
          });
          q.done = true;

          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit('loaded', loaded);
      this.queue = this.queue.filter(function (q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;

      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 350;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      return this.backend[fcName](lng, ns, function (err, data) {
        if (err && data && tried < 5) {
          setTimeout(function () {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }

        callback(err, data);
      });
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;

      if (!this.backend) {
        this.logger.warn('No backend was added via i18next.use. Will not load resources.');
        return callback && callback();
      }

      if (typeof languages === 'string') languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === 'string') namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);

      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }

      toLoad.toLoad.forEach(function (name) {
        _this4.loadOne(name);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name) {
      var _this5 = this;

      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var s = name.split('|');
      var lng = s[0];
      var ns = s[1];
      this.read(lng, ns, 'read', undefined, undefined, function (err, data) {
        if (err) _this5.logger.warn("".concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) _this5.logger.log("".concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);

        _this5.loaded(name, err, data);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      if (this.services.utils && this.services.utils.hasLoadedNamespace && !this.services.utils.hasLoadedNamespace(namespace)) {
        this.logger.warn("did not save key \"".concat(key, "\" as the namespace \"").concat(namespace, "\" was not yet loaded"), 'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!');
        return;
      }

      if (key === undefined || key === null || key === '') return;

      if (this.backend && this.backend.create) {
        this.backend.create(languages, namespace, key, fallbackValue, null, _objectSpread({}, options, {
          isUpdate: isUpdate
        }));
      }

      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }]);

  return Connector;
}(EventEmitter);

function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ['translation'],
    defaultNS: ['translation'],
    fallbackLng: ['dev'],
    fallbackNS: false,
    whitelist: false,
    nonExplicitWhitelist: false,
    supportedLngs: false,
    nonExplicitSupportedLngs: false,
    load: 'all',
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: 'fallback',
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    postProcessPassResolved: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (_typeof(args[1]) === 'object') ret = args[1];
      if (typeof args[1] === 'string') ret.defaultValue = args[1];
      if (typeof args[2] === 'string') ret.tDescription = args[2];

      if (_typeof(args[2]) === 'object' || _typeof(args[3]) === 'object') {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }

      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng, options) {
        return value;
      },
      prefix: '{{',
      suffix: '}}',
      formatSeparator: ',',
      unescapePrefix: '-',
      nestingPrefix: '$t(',
      nestingSuffix: ')',
      nestingOptionsSeparator: ',',
      maxReplaces: 1000,
      skipOnVariables: false
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === 'string') options.ns = [options.ns];
  if (typeof options.fallbackLng === 'string') options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === 'string') options.fallbackNS = [options.fallbackNS];

  if (options.whitelist) {
    if (options.whitelist && options.whitelist.indexOf('cimode') < 0) {
      options.whitelist = options.whitelist.concat(['cimode']);
    }

    options.supportedLngs = options.whitelist;
  }

  if (options.nonExplicitWhitelist) {
    options.nonExplicitSupportedLngs = options.nonExplicitWhitelist;
  }

  if (options.supportedLngs && options.supportedLngs.indexOf('cimode') < 0) {
    options.supportedLngs = options.supportedLngs.concat(['cimode']);
  }

  return options;
}

function noop() {}

var I18n = function (_EventEmitter) {
  _inherits(I18n, _EventEmitter);

  function I18n() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, I18n);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(I18n).call(this));

    if (isIE10) {
      EventEmitter.call(_assertThisInitialized(_this));
    }

    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };

    if (callback && !_this.isInitialized && !options.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options, callback);

        return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
      }

      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }

    return _this;
  }

  _createClass(I18n, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      if (options.whitelist && !options.supportedLngs) {
        this.logger.deprecate('whitelist', 'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.');
      }

      if (options.nonExplicitWhitelist && !options.nonExplicitSupportedLngs) {
        this.logger.deprecate('whitelist', 'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.');
      }

      this.options = _objectSpread({}, get(), this.options, transformOptions(options));
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;

      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === 'function') return new ClassOrObject();
        return ClassOrObject;
      }

      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }

        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        s.interpolator = new Interpolator(this.options);
        s.utils = {
          hasLoadedNamespace: this.hasLoadedNamespace.bind(this)
        };
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on('*', function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });

        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s.languageDetector.init(s, this.options.detection, this.options);
        }

        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }

        this.translator = new Translator(this.services, this.options);
        this.translator.on('*', function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function (m) {
          if (m.init) m.init(_this2);
        });
      }

      if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
        var codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
        if (codes.length > 0 && codes[0] !== 'dev') this.options.lng = codes[0];
      }

      if (!this.services.languageDetector && !this.options.lng) {
        this.logger.warn('init: no languageDetector is used and no lng is defined');
      }

      var storeApi = ['getResource', 'hasResourceBundle', 'getResourceBundle', 'getDataByLanguage'];
      storeApi.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store;

          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var storeApiChained = ['addResource', 'addResources', 'addResourceBundle', 'removeResourceBundle'];
      storeApiChained.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store2;

          (_this2$store2 = _this2.store)[fcName].apply(_this2$store2, arguments);

          return _this2;
        };
      });
      var deferred = defer();

      var load = function load() {
        var finish = function finish(err, t) {
          if (_this2.isInitialized) _this2.logger.warn('init: i18next is already initialized. You should call init just once!');
          _this2.isInitialized = true;
          if (!_this2.options.isClone) _this2.logger.log('initialized', _this2.options);

          _this2.emit('initialized', _this2.options);

          deferred.resolve(t);
          callback(err, t);
        };

        if (_this2.languages && _this2.options.compatibilityAPI !== 'v1' && !_this2.isInitialized) return finish(null, _this2.t.bind(_this2));

        _this2.changeLanguage(_this2.options.lng, finish);
      };

      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }

      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources(language) {
      var _this3 = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var usedCallback = callback;
      var usedLng = typeof language === 'string' ? language : this.language;
      if (typeof language === 'function') usedCallback = language;

      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (usedLng && usedLng.toLowerCase() === 'cimode') return usedCallback();
        var toLoad = [];

        var append = function append(lng) {
          if (!lng) return;

          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);

          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };

        if (!usedLng) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function (l) {
            return append(l);
          });
        } else {
          append(usedLng);
        }

        if (this.options.preload) {
          this.options.preload.forEach(function (l) {
            return append(l);
          });
        }

        this.services.backendConnector.load(toLoad, this.options.ns, usedCallback);
      } else {
        usedCallback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, function (err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use(module) {
      if (!module) throw new Error('You are passing an undefined module! Please check the object you are passing to i18next.use()');
      if (!module.type) throw new Error('You are passing a wrong module! Please check the object you are passing to i18next.use()');

      if (module.type === 'backend') {
        this.modules.backend = module;
      }

      if (module.type === 'logger' || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }

      if (module.type === 'languageDetector') {
        this.modules.languageDetector = module;
      }

      if (module.type === 'i18nFormat') {
        this.modules.i18nFormat = module;
      }

      if (module.type === 'postProcessor') {
        postProcessor.addPostProcessor(module);
      }

      if (module.type === '3rdParty') {
        this.modules.external.push(module);
      }

      return this;
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(lng, callback) {
      var _this4 = this;

      this.isLanguageChangingTo = lng;
      var deferred = defer();
      this.emit('languageChanging', lng);

      var done = function done(err, l) {
        if (l) {
          _this4.language = l;
          _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);

          _this4.translator.changeLanguage(l);

          _this4.isLanguageChangingTo = undefined;

          _this4.emit('languageChanged', l);

          _this4.logger.log('languageChanged', l);
        } else {
          _this4.isLanguageChangingTo = undefined;
        }

        deferred.resolve(function () {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback) callback(err, function () {
          return _this4.t.apply(_this4, arguments);
        });
      };

      var setLng = function setLng(lngs) {
        var l = typeof lngs === 'string' ? lngs : _this4.services.languageUtils.getBestMatchFromCodes(lngs);

        if (l) {
          if (!_this4.language) {
            _this4.language = l;
            _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
          }

          if (!_this4.translator.language) _this4.translator.changeLanguage(l);
          if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
        }

        _this4.loadResources(l, function (err) {
          done(err, l);
        });
      };

      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        this.services.languageDetector.detect(setLng);
      } else {
        setLng(lng);
      }

      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT(lng, ns) {
      var _this5 = this;

      var fixedT = function fixedT(key, opts) {
        var options;

        if (_typeof(opts) !== 'object') {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }

          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        } else {
          options = _objectSpread({}, opts);
        }

        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        return _this5.t(key, options);
      };

      if (typeof lng === 'string') {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }

      fixedT.ns = ns;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t() {
      var _this$translator;

      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists() {
      var _this$translator2;

      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "hasLoadedNamespace",
    value: function hasLoadedNamespace(ns) {
      var _this6 = this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!this.isInitialized) {
        this.logger.warn('hasLoadedNamespace: i18next was not initialized', this.languages);
        return false;
      }

      if (!this.languages || !this.languages.length) {
        this.logger.warn('hasLoadedNamespace: i18n.languages were undefined or empty', this.languages);
        return false;
      }

      var lng = this.languages[0];
      var fallbackLng = this.options ? this.options.fallbackLng : false;
      var lastLng = this.languages[this.languages.length - 1];
      if (lng.toLowerCase() === 'cimode') return true;

      var loadNotPending = function loadNotPending(l, n) {
        var loadState = _this6.services.backendConnector.state["".concat(l, "|").concat(n)];

        return loadState === -1 || loadState === 2;
      };

      if (options.precheck) {
        var preResult = options.precheck(this, loadNotPending);
        if (preResult !== undefined) return preResult;
      }

      if (this.hasResourceBundle(lng, ns)) return true;
      if (!this.services.backendConnector.backend) return true;
      if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
      return false;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces(ns, callback) {
      var _this7 = this;

      var deferred = defer();

      if (!this.options.ns) {
        callback && callback();
        return Promise.resolve();
      }

      if (typeof ns === 'string') ns = [ns];
      ns.forEach(function (n) {
        if (_this7.options.ns.indexOf(n) < 0) _this7.options.ns.push(n);
      });
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === 'string') lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function (lng) {
        return preloaded.indexOf(lng) < 0;
      });

      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }

      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
      if (!lng) return 'rtl';
      var rtlLngs = ['ar', 'shu', 'sqr', 'ssh', 'xaa', 'yhd', 'yud', 'aao', 'abh', 'abv', 'acm', 'acq', 'acw', 'acx', 'acy', 'adf', 'ads', 'aeb', 'aec', 'afb', 'ajp', 'apc', 'apd', 'arb', 'arq', 'ars', 'ary', 'arz', 'auz', 'avl', 'ayh', 'ayl', 'ayn', 'ayp', 'bbz', 'pga', 'he', 'iw', 'ps', 'pbt', 'pbu', 'pst', 'prp', 'prd', 'ug', 'ur', 'ydd', 'yds', 'yih', 'ji', 'yi', 'hbo', 'men', 'xmn', 'fa', 'jpr', 'peo', 'pes', 'prs', 'dv', 'sam'];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? 'rtl' : 'ltr';
    }
  }, {
    key: "createInstance",
    value: function createInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this8 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;

      var mergedOptions = _objectSpread({}, this.options, options, {
        isClone: true
      });

      var clone = new I18n(mergedOptions);
      var membersToCopy = ['store', 'services', 'language'];
      membersToCopy.forEach(function (m) {
        clone[m] = _this8[m];
      });
      clone.services = _objectSpread({}, this.services);
      clone.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on('*', function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      clone.translator.backendConnector.services.utils = {
        hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone)
      };
      return clone;
    }
  }]);

  return I18n;
}(EventEmitter);

var i18next = new I18n();

var objectWithoutPropertiesLoose = createCommonjsModule(function (module) {
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

module.exports = _objectWithoutPropertiesLoose;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(objectWithoutPropertiesLoose);

var objectWithoutProperties = createCommonjsModule(function (module) {
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

module.exports = _objectWithoutProperties;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(objectWithoutProperties);

var defineProperty = createCommonjsModule(function (module) {
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
}

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _defineProperty$1 = unwrapExports(defineProperty);

var classCallCheck = createCommonjsModule(function (module) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _classCallCheck$1 = unwrapExports(classCallCheck);

var createClass = createCommonjsModule(function (module) {
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _createClass$1 = unwrapExports(createClass);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultOptions = {
  bindI18n: 'languageChanged',
  bindI18nStore: '',
  transEmptyNodeValue: '',
  transSupportBasicHtmlNodes: true,
  transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
  useSuspense: true
};
var i18nInstance;
var I18nContext = React__default.createContext();
function setDefaults() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defaultOptions = _objectSpread$1(_objectSpread$1({}, defaultOptions), options);
}
function getDefaults() {
  return defaultOptions;
}
var ReportNamespaces = function () {
  function ReportNamespaces() {
    _classCallCheck$1(this, ReportNamespaces);

    this.usedNamespaces = {};
  }

  _createClass$1(ReportNamespaces, [{
    key: "addUsedNamespaces",
    value: function addUsedNamespaces(namespaces) {
      var _this = this;

      namespaces.forEach(function (ns) {
        if (!_this.usedNamespaces[ns]) _this.usedNamespaces[ns] = true;
      });
    }
  }, {
    key: "getUsedNamespaces",
    value: function getUsedNamespaces() {
      return Object.keys(this.usedNamespaces);
    }
  }]);

  return ReportNamespaces;
}();
function setI18n(instance) {
  i18nInstance = instance;
}
function getI18n() {
  return i18nInstance;
}
var initReactI18next = {
  type: '3rdParty',
  init: function init(instance) {
    setDefaults(instance.options.react);
    setI18n(instance);
  }
};

function warn() {
  if (console && console.warn) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'string') args[0] = "react-i18next:: ".concat(args[0]);

    (_console = console).warn.apply(_console, args);
  }
}
var alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  if (typeof args[0] === 'string' && alreadyWarned[args[0]]) return;
  if (typeof args[0] === 'string') alreadyWarned[args[0]] = new Date();
  warn.apply(void 0, args);
}
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, function () {
    if (i18n.isInitialized) {
      cb();
    } else {
      var initialized = function initialized() {
        setTimeout(function () {
          i18n.off('initialized', initialized);
        }, 0);
        cb();
      };

      i18n.on('initialized', initialized);
    }
  });
}
function hasLoadedNamespace(ns, i18n) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (!i18n.languages || !i18n.languages.length) {
    warnOnce('i18n.languages were undefined or empty', i18n.languages);
    return true;
  }

  var lng = i18n.languages[0];
  var fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  var lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === 'cimode') return true;

  var loadNotPending = function loadNotPending(l, n) {
    var loadState = i18n.services.backendConnector.state["".concat(l, "|").concat(n)];
    return loadState === -1 || loadState === 2;
  };

  if (options.bindI18n && options.bindI18n.indexOf('languageChanging') > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}

var arrayWithHoles = createCommonjsModule(function (module) {
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(arrayWithHoles);

var iterableToArrayLimit = createCommonjsModule(function (module) {
function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (_i = _i.call(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(iterableToArrayLimit);

var arrayLikeToArray = createCommonjsModule(function (module) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(arrayLikeToArray);

var unsupportedIterableToArray = createCommonjsModule(function (module) {
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(unsupportedIterableToArray);

var nonIterableRest = createCommonjsModule(function (module) {
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

unwrapExports(nonIterableRest);

var slicedToArray = createCommonjsModule(function (module) {
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
});

var _slicedToArray = unwrapExports(slicedToArray);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useTranslation(ns) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var i18nFromProps = props.i18n;

  var _ref = useContext(I18nContext) || {},
      i18nFromContext = _ref.i18n,
      defaultNSFromContext = _ref.defaultNS;

  var i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();

  if (!i18n) {
    warnOnce('You will need to pass in an i18next instance by using initReactI18next');

    var notReadyT = function notReadyT(k) {
      return Array.isArray(k) ? k[k.length - 1] : k;
    };

    var retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }

  if (i18n.options.react && i18n.options.react.wait !== undefined) warnOnce('It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.');

  var i18nOptions = _objectSpread$2(_objectSpread$2(_objectSpread$2({}, getDefaults()), i18n.options.react), props);

  var useSuspense = i18nOptions.useSuspense;
  var namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === 'string' ? [namespaces] : namespaces || ['translation'];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  var ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every(function (n) {
    return hasLoadedNamespace(n, i18n, i18nOptions);
  });

  function getT() {
    return i18n.getFixedT(null, i18nOptions.nsMode === 'fallback' ? namespaces : namespaces[0]);
  }

  var _useState = useState(getT),
      _useState2 = _slicedToArray(_useState, 2),
      t = _useState2[0],
      setT = _useState2[1];

  var isMounted = useRef(true);
  useEffect(function () {
    var bindI18n = i18nOptions.bindI18n,
        bindI18nStore = i18nOptions.bindI18nStore;
    isMounted.current = true;

    if (!ready && !useSuspense) {
      loadNamespaces(i18n, namespaces, function () {
        if (isMounted.current) setT(getT);
      });
    }

    function boundReset() {
      if (isMounted.current) setT(getT);
    }

    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return function () {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(' ').forEach(function (e) {
        return i18n.off(e, boundReset);
      });
      if (bindI18nStore && i18n) bindI18nStore.split(' ').forEach(function (e) {
        return i18n.store.off(e, boundReset);
      });
    };
  }, [i18n, namespaces.join()]);
  var isInitial = useRef(true);
  useEffect(function () {
    if (isMounted.current && !isInitial.current) {
      setT(getT);
    }

    isInitial.current = false;
  }, [i18n]);
  var ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise(function (resolve) {
    loadNamespaces(i18n, namespaces, function () {
      resolve();
    });
  });
}

// TODO: move them in a JSON file and import them

var resources = {};
i18next.use(initReactI18next) // passes i18n down to react-i18next
.init({
  interpolation: {
    escapeValue: false // react already safes from xss

  },
  keySeparator: false,
  // we do not use keys in form messages.welcome
  lng: 'en',
  resources: resources
});

var ConfigContext = /*#__PURE__*/React__default.createContext({});

function ConfigProvider(_ref) {
  var config = _ref.config,
      children = _ref.children;

  if (config.assetPath) {
    var path = config.assetPath; // ensure the provided path both starts and ends with a slash

    if (!path.startsWith('/')) {
      path = '/' + path;
    }

    if (!path.endsWith('/')) {
      path = path + '/';
    } // allow consumers to tell webpack where to load code split/lazy loaded files from, as they may not be
    // hosting our JS from /assets/ (the default path)


    __webpack_public_path__ = path;
  }

  return /*#__PURE__*/React__default.createElement(ConfigContext.Provider, {
    value: {
      config: config
    }
  }, children);
}

function useHawkConfig() {
  var context = useContext(ConfigContext);

  if (!context.config) {
    throw new Error('No HawksearchConfig is available, did you forget to wrap your components in a ConfigProvider component?');
  }

  return context;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (_i = _i.call(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray$1(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

var bind = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

var isBuffer = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
};

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

var utils = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};

var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
var enhanceError = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
var createError = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
var settle = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
var buildURL = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
var parseHeaders = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

var isURLSameOrigin = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);

var cookies = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);

var xhr = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies$1 = cookies;

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies$1.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = xhr;
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = xhr;
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

var defaults_1 = defaults;

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

var InterceptorManager_1 = InterceptorManager;

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
var transformData = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

var isCancel = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
var isAbsoluteURL = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
var combineURLs = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
var dispatchRequest = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults_1.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager_1(),
    response: new InterceptorManager_1()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults_1, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

var Axios_1 = Axios;

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

var Cancel_1 = Cancel;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel_1(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

var CancelToken_1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
var spread = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios_1(defaultConfig);
  var instance = bind(Axios_1.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios_1.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults_1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios_1;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults_1, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = Cancel_1;
axios.CancelToken = CancelToken_1;
axios.isCancel = isCancel;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread;

var axios_1 = axios;

// Allow use of default import syntax in TypeScript
var default_1 = axios;
axios_1.default = default_1;

var axios$1 = axios_1;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FacetSelectionState;

(function (FacetSelectionState) {
  FacetSelectionState[FacetSelectionState["NotSelected"] = 0] = "NotSelected";
  FacetSelectionState[FacetSelectionState["Selected"] = 1] = "Selected";
  FacetSelectionState[FacetSelectionState["Negated"] = 2] = "Negated";
})(FacetSelectionState || (FacetSelectionState = {}));

var SearchStore = /*#__PURE__*/function () {
  /** This represents the next search request that will be executed. */

  /**
   * Whether or not the next search request will perform history actions (pushing the search into browser
   * history).
   */

  /** Whether or not a search request is waiting for completion. */

  /** The results of the last search request, if one has been performed. Otherwise, `undefined`. */
  function SearchStore(initial) {
    _classCallCheck(this, SearchStore);

    _defineProperty(this, "pendingSearch", void 0);

    _defineProperty(this, "doHistory", void 0);

    _defineProperty(this, "isLoading", void 0);

    _defineProperty(this, "itemsToCompare", void 0);

    _defineProperty(this, "itemsToCompareIds", void 0);

    _defineProperty(this, "comparedResults", void 0);

    _defineProperty(this, "productDetails", void 0);

    _defineProperty(this, "searchResults", void 0);

    _defineProperty(this, "requestError", void 0);

    Object.assign(this, initial);
  }
  /**
   * Returns whether or not this is the initial load of the search results.
   */


  _createClass(SearchStore, [{
    key: "isInitialLoad",
    get: function get() {
      return this.isLoading && !this.searchResults;
    }
    /**
     * Determines whether or not the given facet and facet value is selected, and returns info regarding the selection.
     * @param facet The facet for which the facet value will be checked for selection.
     * @param facetValue The facet value that will be checked for selection.
     */

  }, {
    key: "isFacetSelected",
    value: function isFacetSelected(facet, facetValue) {
      var facetName = typeof facet === 'string' ? facet : facet.Name;
      var facetField = typeof facet === 'string' ? facet : facet.selectionField;
      var valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
      var valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

      if (!valueValue) {
        console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
        return {
          state: FacetSelectionState.NotSelected
        };
      }

      var facetSelections = this.pendingSearch.FacetSelections;

      if (!facetSelections || !facetSelections[facetField]) {
        return {
          state: FacetSelectionState.NotSelected
        };
      }

      var selectionIdx = facetSelections[facetField].indexOf(valueValue);
      var negationIdx = facetSelections[facetField].indexOf("-".concat(valueValue));

      if (selectionIdx !== -1) {
        // if the exact facet value exists, then we're normally selected
        return {
          state: FacetSelectionState.Selected,
          selectedValue: valueValue,
          selectionIndex: selectionIdx
        };
      } else if (negationIdx !== -1) {
        // if the facet value is selected but prefixed with a -, then we're negated
        return {
          state: FacetSelectionState.Negated,
          selectedValue: "-".concat(valueValue),
          selectionIndex: negationIdx
        };
      }

      return {
        state: FacetSelectionState.NotSelected
      };
    }
    /**
     * Returns an object containing the selections that have been made in both the next search request and also
     * in the previous search request. This should be used when iterating selections instead of pulling the values
     * out from the search result or pending search - as this will merge the values together and provide an accurate
     * view of all facet selections.
     */

  }, {
    key: "facetSelections",
    get: function get() {
      var _this = this;

      var _this$pendingSearch = this.pendingSearch,
          clientSelections = _this$pendingSearch.FacetSelections,
          SearchWithin = _this$pendingSearch.SearchWithin,
          searchResults = this.searchResults;
      var selections = {};

      if (!clientSelections && !SearchWithin) {
        return selections;
      } // if we've made selections on the client, transform these into more detailed selections.
      // the client-side selections are just facet fields and values without any labels - so we
      // need to combine this information with the list of facets received from the server in the
      // previous search in order to return a rich list of selections


      var facets = searchResults ? searchResults.Facets : null;

      if (!facets) {
        // but we can only do this if we've received facet information from the server. without this
        // info we can't determine what labels should be used
        return selections;
      } // manually handle the `searchWithin` selection, as this doesn't usually behave like a normal facet selection
      // but instead a field on the search request


      if (SearchWithin) {
        var facet = facets.find(function (f) {
          return f.selectionField === 'searchWithin';
        });

        if (facet) {
          selections.searchWithin = {
            facet: facet,
            label: facet.Name,
            items: [{
              label: SearchWithin,
              value: SearchWithin
            }]
          };
        }
      }

      if (!clientSelections) {
        return selections;
      }

      Object.keys(clientSelections).forEach(function (fieldName) {
        var selectionValues = clientSelections[fieldName];

        if (!selectionValues) {
          // if this selection has no values, it's not really selected
          return;
        }

        var facet = facets.find(function (f) {
          return f.selectionField === fieldName;
        });

        if (!facet) {
          // if there's no matching facet from the server, we can't show this since we'll have no labels
          return;
        }

        var items = [];

        if (facet.FieldType === 'range') {
          // if the facet this selection is for is a range, there won't be a matching value and thus there won't be a label.
          // so because of this we'll just use the selection value as the label
          selectionValues.forEach(function (selectionValue) {
            items.push({
              label: selectionValue,
              value: selectionValue
            });
          });
        } else if (facet.FieldType === 'tab') {
          // do not return the selection value for tab facet
          return;
        } else {
          // for other types of facets, try to find a matching value
          selectionValues.forEach(function (selectionValue) {
            var matchingVal = _this.findMatchingValue(selectionValue, facet.Values);

            if (!matchingVal || !matchingVal.Label) {
              // if there's no matching value from the server, we cannot display because there would
              // be no label - same if there's no label at all
              return;
            }

            items.push({
              label: matchingVal.Label,
              value: selectionValue
            });
          });
        }

        selections[fieldName] = {
          facet: facet,
          label: facet.Name,
          items: items
        };
      });
      return selections;
    }
  }, {
    key: "findMatchingValue",
    value: function findMatchingValue(selectionValue, facetValues) {
      var matchingValue = null;

      if (!facetValues || facetValues.length === 0) {
        return null;
      }

      var _iterator = _createForOfIteratorHelper(facetValues),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var facetValue = _step.value;
          var isMatchingVal = facetValue.Value === selectionValue || "-".concat(facetValue.Value) === selectionValue; // loop through children

          if (!isMatchingVal) {
            matchingValue = this.findMatchingValue(selectionValue, facetValue.Children);
          } else {
            matchingValue = facetValue;
          }

          if (matchingValue) {
            return matchingValue;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return matchingValue;
    }
  }]);

  return SearchStore;
}();

var Pagination =
/** Number of total items in the result set. */

/** The page number returned. */

/** The number of items returned for the page. */

/** The total number of pages for the result set - with the current @see MaxPerPage. */

/** Set of pagination options */
function Pagination(init) {
  _classCallCheck(this, Pagination);

  _defineProperty(this, "NofResults", void 0);

  _defineProperty(this, "CurrentPage", void 0);

  _defineProperty(this, "MaxPerPage", void 0);

  _defineProperty(this, "NofPages", void 0);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new PaginationItem(i);
  });
};
var PaginationItem =
/** Display label for user's pagination option (i.e. 24 per page). */

/** The maximum number of items that will be returned per page when this option is selected. */

/** Indicates if this is the option selected. Only one pagination item will have this set to `true`. */

/** Indicates if this is the default option. Only one pagination item will have this set to `true`. */
function PaginationItem(init) {
  _classCallCheck(this, PaginationItem);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "PageSize", void 0);

  _defineProperty(this, "Selected", void 0);

  _defineProperty(this, "Default", void 0);

  Object.assign(this, init);
};

var Result = /*#__PURE__*/function () {
  function Result(init) {
    _classCallCheck(this, Result);

    _defineProperty(this, "DocId", void 0);

    _defineProperty(this, "Score", void 0);

    _defineProperty(this, "Document", void 0);

    _defineProperty(this, "Explain", void 0);

    _defineProperty(this, "IsPin", void 0);

    _defineProperty(this, "BestFragment", void 0);

    Object.assign(this, init);
  }

  _createClass(Result, [{
    key: "getDocumentValue",
    value:
    /** Unique identifier for this search result item. */

    /** Calculated relevancy score. */

    /**
     * Contains the fields for the search result item, as an object of string keys to an array
     * of string values. The keys correspond to the name of the field within the hawk dashboard,
     * and the value of the map is an array of strings for each of the values for that field.
     */

    /**
     * Returns a single document value, by the given field name. If the field does not exist in
     * the document, or has no values, then `undefined` is returned instead.
     * @param field The field within the result document to retrieve the value of.
     */
    function getDocumentValue(field) {
      if (this.Document) {
        var values = this.Document[field];

        if (values && values.length > 0) {
          return values[0];
        }
      }

      return undefined;
    }
  }]);

  return Result;
}();

var Sorting =
/** The sorting items. */
function Sorting(init) {
  _classCallCheck(this, Sorting);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new SortingItem(i);
  });
};
var SortingItem =
/** Name of the sorting option. This is the label to display to users. */

/**
 * The value to be used to specify the sort order once user selects it. This value is passed in the @see Request.SortBy
 * field in the @see Request object.
 */

/** Indicates if this sorting option was configured to be the default. */

/** Indicates if this sorting option is currently being used for the current result set. */
function SortingItem(init) {
  _classCallCheck(this, SortingItem);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "IsDefault", void 0);

  _defineProperty(this, "Selected", void 0);

  Object.assign(this, init);
};

var Selections = function Selections(init) {
  var _this = this;

  _classCallCheck(this, Selections);

  Object.assign(this, init);
  Object.keys(init).forEach(function (key) {
    var selFacet = init[key];
    _this[key] = new SelectionFacet(selFacet);
  });
};
var SelectionFacet =
/** Display name for facet. */

/** Will contain an entry for each selection made within the facet. */
function SelectionFacet(init) {
  _classCallCheck(this, SelectionFacet);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new SelectionFacetValue(i);
  });
};
var SelectionFacetValue =
/** Display label for facet value. */

/** Value for facet value. */
function SelectionFacetValue(init) {
  _classCallCheck(this, SelectionFacetValue);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  Object.assign(this, init);
};

var Value =
/** Label of the value to display. */

/** Value to use when setting the facet value selection. */

/** Number of results in current set that have this facet value. */

/** Indicates if this facet value has been selected. */

/**
 * Used for displaying the slider facet. @see RangeStart indicates what the starting point of the range
 * to display, either on basis of what the user selected by sliding the slider, or if they have no
 * selection it reflects the lowest price product.
 */

/**
 * Used for displaying the slider facet. @see RangeEnd indicates what the end point of the range to
 * display is, either on basis of what the user selected by sliding the slider, or if they have no
 * selection, it reflects the highest price product.
 */

/**
 * Used for displaying the slider facet. @see RangeMin indicates lowest value for the range in the list
 * of products displayed.
 */

/**
 * Used for displaying the slider facet. @see RangeMax indicates highest value for the range in the list
 * of products displayed.
 */

/** Used for nested facets. */

/** Set of pagination options */
function Value(init) {
  _classCallCheck(this, Value);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "Count", void 0);

  _defineProperty(this, "Selected", void 0);

  _defineProperty(this, "RangeStart", void 0);

  _defineProperty(this, "RangeEnd", void 0);

  _defineProperty(this, "RangeMin", void 0);

  _defineProperty(this, "RangeMax", void 0);

  _defineProperty(this, "Path", void 0);

  _defineProperty(this, "Children", void 0);

  _defineProperty(this, "Level", void 0);

  Object.assign(this, init);
};

var Swatch =
/** Match this value to the @see Value object in the @see Values array of @see Facet. */

/** Name of the asset. */

/** URL of the asset. */

/** Indicates if value is the default. */

/** Color of the asset. */
function Swatch(init) {
  _classCallCheck(this, Swatch);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "AssetName", void 0);

  _defineProperty(this, "AssetUrl", void 0);

  _defineProperty(this, "IsDefault", void 0);

  _defineProperty(this, "Color", void 0);

  Object.assign(this, init);
};

var Range =
/** Label of the value to display. */

/** Value to use when setting the facet value selection. */

/** Indicates if the values are numeric. */

/** Lower value of the range. */

/** Upper value of the range. */

/** Asset Url */
function Range(init) {
  _classCallCheck(this, Range);

  _defineProperty(this, "Label", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "IsNumeric", void 0);

  _defineProperty(this, "LBound", void 0);

  _defineProperty(this, "UBound", void 0);

  _defineProperty(this, "AssetFullUrl", void 0);

  Object.assign(this, init);
};

var Facet = /*#__PURE__*/function () {
  function Facet(init) {
    _classCallCheck(this, Facet);

    _defineProperty(this, "FacetId", void 0);

    _defineProperty(this, "Name", void 0);

    _defineProperty(this, "Field", void 0);

    _defineProperty(this, "FieldType", void 0);

    _defineProperty(this, "FacetType", void 0);

    _defineProperty(this, "DisplayType", void 0);

    _defineProperty(this, "MaxCount", void 0);

    _defineProperty(this, "MinHitCount", void 0);

    _defineProperty(this, "ParamName", void 0);

    _defineProperty(this, "SortBy", void 0);

    _defineProperty(this, "ExpandSelection", void 0);

    _defineProperty(this, "IsNumeric", void 0);

    _defineProperty(this, "IsCurrency", void 0);

    _defineProperty(this, "CurrencySymbol", void 0);

    _defineProperty(this, "IsCollapsible", void 0);

    _defineProperty(this, "IsCollapsedDefault", void 0);

    _defineProperty(this, "IsVisible", void 0);

    _defineProperty(this, "IsSearch", void 0);

    _defineProperty(this, "ScrollHeight", void 0);

    _defineProperty(this, "ScrollThreshold", void 0);

    _defineProperty(this, "TruncateThreshold", void 0);

    _defineProperty(this, "SearchThreshold", void 0);

    _defineProperty(this, "Tooltip", void 0);

    _defineProperty(this, "AlwaysVisible", void 0);

    _defineProperty(this, "SortOrder", void 0);

    _defineProperty(this, "NofVisible", void 0);

    _defineProperty(this, "SwatchData", void 0);

    _defineProperty(this, "FacetRangeDisplayType", void 0);

    _defineProperty(this, "PreloadChildren", void 0);

    _defineProperty(this, "ShowSliderInputs", void 0);

    _defineProperty(this, "Ranges", void 0);

    _defineProperty(this, "Values", void 0);

    _defineProperty(this, "DataType", void 0);

    Object.assign(this, init);
    this.SwatchData = init.SwatchData.map(function (s) {
      return new Swatch(s);
    });
    this.Ranges = init.Ranges.map(function (r) {
      return new Range(r);
    });
    this.Values = init.Values.map(function (v) {
      return new Value(v);
    });
  }

  _createClass(Facet, [{
    key: "shouldTruncate",
    get:
    /** Unique identifier of the facet. */

    /** Display name of the facet. */

    /** The name of the field that is linked to this facet. */

    /** Indicates the maximum number of facet values that are returned. */

    /** Indicates the minimum number of results each facet value needs to have in order to be returned. */

    /**
     * If this is set, it is to be used as the facet name if passed in the `FacetSelections`. If not set,
     * the value of the Field object would be used. (This is only applicable when a slider and range
     * facets are both configured for the same field.)
     */

    /**
     * Indicates the sorting logic that is used for this facet’s values. The possible values for this
     * are the parameters for sorting set options that are configured in "Workbench > Data Configuration
     * > Sorting/Pagination".
     */

    /** Indicates if the user should be able to apply more than one filter value from this facet. */

    /** Indicates if facet values are numeric. */

    /** Indicates if facet values are currency (and should be displayed appropriately). */

    /** Indicates currency symbol in case of currency type facets */

    /** Indicates if the facet can be collapsed and expanded by the user. */

    /** If @see IsCollapsible is `true`, this indicates if the facet should initially be collapsed or expanded. */

    /** Indicates if the facet is set to be visible. */

    /**
     * Indicates if search is enabled for this facet. If it is enabled, a search box should be available for
     * users to filter the facet values by typing in the search box.
     */

    /**
     * If facet display type is Scrolling, this value is the height in pixels for the window inside scroll box.
     * Only to be used if @see DisplayType is `"scrolling"`.
     */

    /**
     * If the number of facet values exceeds this number and @see DisplayType is `"scrolling"`, then the facet
     * should be displayed as scrolling list; if not, display as `"default"`.
     */

    /**
     * If the number of facet values exceeds this number and @see DisplayType is `"truncate"`, then the facet
     * should be displayed as truncated list; if not, display as `"default"`.
     */

    /**
     * To be used if @see IsSearch is `true`. The number of facet values must be this number or higher for the
     * facet search box to display.
     */

    /** Text to display when user hovers over a help icon. */

    /**
     * If `false`, indicates that sometimes this facet will not be returned. The conditions that trigger its
     * display are maintained in the Workbench.
     */

    /**
     * The display order of the facet in the facet list.
     */

    /** This is maximum number of values that could be returned for the facet. */

    /** Will be included if @see FacetType is `"swatch"`. */

    /** Indicates type of facet range display. */

    /** Indicates if setting in Workbench is set to On or Off. */

    /**
     * To be used if @see FacetType is `"slider"`. If @see ShowSliderInputs is `true`, input boxes should be
     * available for user to enter values.
     */

    /** Always present, but will only be populated if the facet is numeric and not a slider. */

    /** The values for this facet. */
    // Data type for datetime facet type

    /** Whether or not the facet should be rendered as truncated. */
    function get() {
      // the facet does truncated listing of values if configured for truncating and we have too many facets
      return this.DisplayType === 'truncating' && this.Values.length > this.TruncateThreshold;
    }
    /** Whether or not the facet should have a quick lookup search input. */

  }, {
    key: "shouldSearch",
    get: function get() {
      // the facet should have a search box if configured to do so, and the number of facet values is greater
      // than the threshold
      return this.IsSearch && this.Values.length > this.SearchThreshold;
    }
    /**
     * Returns the name of the key when using this facet for a selection. This will take into consideration
     * @see ParamName and @see Field in determining which value should be returned.
     */

  }, {
    key: "selectionField",
    get: function get() {
      return this.ParamName ? this.ParamName : this.Field;
    }
  }]);

  return Facet;
}();

var Rule = function Rule(init) {
  _classCallCheck(this, Rule);

  _defineProperty(this, "RuleType", void 0);

  _defineProperty(this, "Field", void 0);

  _defineProperty(this, "Condition", void 0);

  _defineProperty(this, "Value", void 0);

  _defineProperty(this, "Operator", void 0);

  _defineProperty(this, "Rules", void 0);

  _defineProperty(this, "Parent", void 0);

  Object.assign(this, init);

  if (init.Parent) {
    this.Parent = new Rule(init.Parent);
  }

  this.Rules = init.Rules ? init.Rules.map(function (i) {
    return new Rule(i);
  }) : [];
};
var RuleType;

(function (RuleType) {
  RuleType[RuleType["Group"] = 0] = "Group";
  RuleType[RuleType["Eval"] = 1] = "Eval";
})(RuleType || (RuleType = {}));

var RuleOperatorType;

(function (RuleOperatorType) {
  RuleOperatorType[RuleOperatorType["All"] = 0] = "All";
  RuleOperatorType[RuleOperatorType["Any"] = 1] = "Any";
  RuleOperatorType[RuleOperatorType["None"] = 2] = "None";
})(RuleOperatorType || (RuleOperatorType = {}));

var BannerTrigger = function BannerTrigger(init) {
  _classCallCheck(this, BannerTrigger);

  _defineProperty(this, "BannerGroupId", void 0);

  _defineProperty(this, "Name", void 0);

  _defineProperty(this, "SortOrder", void 0);

  _defineProperty(this, "Rule", void 0);

  Object.assign(this, init);
  this.Rule = new Rule(this.Rule);
};

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var FeaturedItems = function FeaturedItems(init) {
  _classCallCheck(this, FeaturedItems);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);

  if (init && init.Items) {
    this.Items = init.Items.map(function (i) {
      return new FeaturedItem(i);
    });
  }
};
var Merchandising = function Merchandising(init) {
  _classCallCheck(this, Merchandising);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);

  if (init && init.Items) {
    this.Items = init.Items.map(function (i) {
      return new MerchandisingItem(i);
    });
  }
};
var PageContentItem = function PageContentItem(init) {
  _classCallCheck(this, PageContentItem);

  _defineProperty(this, "Zone", void 0);

  _defineProperty(this, "ContentType", void 0);

  _defineProperty(this, "ImageUrl", void 0);

  _defineProperty(this, "AltTag", void 0);

  _defineProperty(this, "ForwardUrl", void 0);

  _defineProperty(this, "Output", void 0);

  _defineProperty(this, "WidgetArgs", void 0);

  _defineProperty(this, "Title", void 0);

  _defineProperty(this, "Name", void 0);

  _defineProperty(this, "DateFrom", void 0);

  _defineProperty(this, "DateTo", void 0);

  _defineProperty(this, "IsMobile", void 0);

  _defineProperty(this, "MobileContentType", void 0);

  _defineProperty(this, "MobileImageUrl", void 0);

  _defineProperty(this, "MobileOutput", void 0);

  _defineProperty(this, "MobileWidgetArgs", void 0);

  _defineProperty(this, "IsTrackingEnabled", void 0);

  _defineProperty(this, "MobileIsTrackingEnabled", void 0);

  _defineProperty(this, "FeaturedItems", void 0);

  _defineProperty(this, "Items", void 0);

  _defineProperty(this, "Target", void 0);

  _defineProperty(this, "MobileTarget", void 0);

  _defineProperty(this, "MobileAltTag", void 0);

  _defineProperty(this, "MobileForwardUrl", void 0);

  _defineProperty(this, "MobileWidth", void 0);

  _defineProperty(this, "MobileHeight", void 0);

  _defineProperty(this, "Trigger", void 0);

  Object.assign(this, init);

  if (init.FeaturedItems) {
    this.FeaturedItems = init.FeaturedItems.map(function (i) {
      return new Result(i);
    });
  }

  if (init.Trigger) {
    this.Trigger = new BannerTrigger(init.Trigger);
  }
};
var FeaturedItem = /*#__PURE__*/function (_PageContentItem) {
  _inherits(FeaturedItem, _PageContentItem);

  var _super = _createSuper(FeaturedItem);

  function FeaturedItem(init) {
    var _this;

    _classCallCheck(this, FeaturedItem);

    _this = _super.call(this, init);

    _defineProperty(_assertThisInitialized(_this), "Items", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    _this.Items = init.Items.map(function (i) {
      return new Result(i);
    });
    return _this;
  }

  return FeaturedItem;
}(PageContentItem);
var MerchandisingItem = /*#__PURE__*/function (_PageContentItem2) {
  _inherits(MerchandisingItem, _PageContentItem2);

  var _super2 = _createSuper(MerchandisingItem);

  function MerchandisingItem(init) {
    var _this2;

    _classCallCheck(this, MerchandisingItem);

    _this2 = _super2.call(this, init);
    Object.assign(_assertThisInitialized(_this2), init);
    return _this2;
  }

  return MerchandisingItem;
}(PageContentItem);

var PageContent = function PageContent(init) {
  _classCallCheck(this, PageContent);

  _defineProperty(this, "ZoneName", void 0);

  _defineProperty(this, "Items", void 0);

  Object.assign(this, init);
  this.Items = init.Items.map(function (i) {
    return new PageContentItem(i);
  });
};

var Response =
/** Indicates if request was successful. */

/** Summary of pagination details and a set of pagination options. */

/**
 * The Keyword value that was sent to Hawksearch in the request. If no Keyword was set in the
 * request, the value will be empty.
 */

/**
 * If this is populated, it indicates that the Keyword value returned 0 results, but the results
 * in this response are from this AdjustedKeyword.  A message should be displayed to the user
 * informing them that their search was corrected to this string.
 *
 * This is the result of Auto Correct, which is configured in the Workbench > Keyword Search >
 * Did You Mean.
 */

/** An entry in the array for each item returned in search results. */

/**
 * Will contain an entry for each facet that has one or more selections. Will be empty if no facet
 * selections have been made.
 */

/**
 * If any strings are returned in the array, they should be displayed to the user as suggested
 * search terms.
 *
 * This is the result of Did You Mean, which is configured in the Workbench > Keyword Search >
 * Did You Mean.
 */

/**
 * Merchandising can be placed by using Campaigns in the Hawksearch Workbench. The Campaign will
 * determine if the content should appear and in what zone.
 */
// TODO: merchandising object
// TODO: featured items object

/**
 * Properties that gets populated when user requests landing page related results
 *
 */
// end of landing page related fields
function Response(init) {
  _classCallCheck(this, Response);

  _defineProperty(this, "Success", void 0);

  _defineProperty(this, "Pagination", void 0);

  _defineProperty(this, "Keyword", void 0);

  _defineProperty(this, "AdjustedKeyword", void 0);

  _defineProperty(this, "Results", void 0);

  _defineProperty(this, "Facets", void 0);

  _defineProperty(this, "Selections", void 0);

  _defineProperty(this, "Sorting", void 0);

  _defineProperty(this, "DidYouMean", void 0);

  _defineProperty(this, "Merchandising", void 0);

  _defineProperty(this, "FeaturedItems", void 0);

  _defineProperty(this, "SearchDuration", void 0);

  _defineProperty(this, "DocExplain", void 0);

  _defineProperty(this, "Breadcrumb", void 0);

  _defineProperty(this, "CustomHtml", void 0);

  _defineProperty(this, "HeaderTitle", void 0);

  _defineProperty(this, "MetaDescription", void 0);

  _defineProperty(this, "MetaKeywords", void 0);

  _defineProperty(this, "MetaRobots", void 0);

  _defineProperty(this, "Name", void 0);

  _defineProperty(this, "Next", void 0);

  _defineProperty(this, "Prev", void 0);

  _defineProperty(this, "PageHeading", void 0);

  _defineProperty(this, "PageContent", void 0);

  _defineProperty(this, "RelCanonical", void 0);

  _defineProperty(this, "PageLayoutId", void 0);

  _defineProperty(this, "TrackingId", void 0);

  _defineProperty(this, "VisitorTargets", void 0);

  _defineProperty(this, "Redirect", void 0);

  Object.assign(this, init);
  this.Pagination = new Pagination(init.Pagination);
  this.Merchandising = new Merchandising(init.Merchandising);
  this.FeaturedItems = new FeaturedItems(init.FeaturedItems);
  this.Results = init.Results.map(function (r) {
    return new Result(r);
  });
  this.Facets = init.Facets.map(function (f) {
    return new Facet(f);
  });
  this.PageContent = init.PageContent ? init.PageContent.map(function (p) {
    return new PageContent(p);
  }) : [];
  this.Selections = new Selections(init.Selections);
  this.Sorting = new Sorting(init.Sorting);
};

var ContentType;

(function (ContentType) {
  ContentType["Image"] = "image";
  ContentType["Widget"] = "widget";
  ContentType["Featured"] = "featured";
  ContentType["Custom"] = "custom";
  ContentType["LandingPage"] = "landingPage";
})(ContentType || (ContentType = {}));

var AuthToken = /*#__PURE__*/function () {
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  function AuthToken() {
    _classCallCheck(this, AuthToken);

    _defineProperty(this, "refreshToken", void 0);

    _defineProperty(this, "accessToken", void 0);
  }
  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */


  _createClass(AuthToken, [{
    key: "setTokens",
    value: function setTokens(accessToken, refreshToken) {
      this.refreshToken = refreshToken;
      this.accessToken = accessToken;
    }
  }, {
    key: "getTokens",
    value: function getTokens() {
      return {
        refreshToken: this.refreshToken,
        accessToken: this.accessToken
      };
    }
  }], [{
    key: "getInstance",
    value: function getInstance(url) {
      if (!AuthToken.instance) {
        AuthToken.instance = new AuthToken();
      }

      return AuthToken.instance;
    }
  }]);

  return AuthToken;
}();

_defineProperty(AuthToken, "instance", void 0);

var AuthToken$1 = AuthToken.getInstance();

var HawkClient = /*#__PURE__*/function () {
  function HawkClient(config) {
    var _this = this;

    _classCallCheck(this, HawkClient);

    _defineProperty(this, "baseUrl", void 0);

    _defineProperty(this, "searchUrl", void 0);

    _defineProperty(this, "dashboardUrl", void 0);

    _defineProperty(this, "autocompleteUrl", void 0);

    _defineProperty(this, "compareItemsURL", void 0);

    _defineProperty(this, "refreshTokenURL", void 0);

    _defineProperty(this, "pinItemURL", void 0);

    _defineProperty(this, "updatePinOrderURL", void 0);

    _defineProperty(this, "rebuildIndexURL", void 0);

    _defineProperty(this, "productDetailsURL", void 0);

    _defineProperty(this, "axiosInstance", axios$1.create());

    this.baseUrl = config.apiUrl || 'https://searchapi-dev.hawksearch.net';
    this.dashboardUrl = config.dashboardUrl || 'http://test.hawksearch.net/';
    this.searchUrl = config.searchUrl || '/api/v2/search';
    this.autocompleteUrl = config.autocompleteUrl || '/api/autocomplete';
    this.refreshTokenURL = config.refreshTokenURL || '/api/internal-preview/refresh-token/';
    this.pinItemURL = config.pinItemURL || '/api/pinning/set-pinning/';
    this.updatePinOrderURL = config.updatePinOrderURL || '/api/pinning/update-pin-order/';
    this.productDetailsURL = config.productDetailsURL || '/api/internal-preview/item-detail';
    this.axiosInstance.interceptors.request.use(function (conf) {
      var accessToken = AuthToken$1.getTokens().accessToken;

      if ((conf.url || '').indexOf('refresh-token') !== -1 || !accessToken) {
        delete conf.headers.common.Authorization;
        delete conf.headers.common.ClientGuid;
      } else {
        conf.headers.Authorization = "Bearer ".concat(accessToken);
        conf.headers.ClientGuid = config.clientGuid;
      }

      return conf;
    }, function (error) {
      Promise.reject(error);
    });
    this.axiosInstance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      var originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        var token = AuthToken$1.getTokens();
        return _this.axiosInstance.post(new URL(_this.refreshTokenURL, _this.baseUrl).href, {
          ClientGuid: config.clientGuid,
          Token: token.accessToken,
          RefreshToken: token.refreshToken
        }).then(function (res) {
          if (res.status === 200) {
            AuthToken$1.setTokens(res.data.Token, res.data.RefreshToken);
            _this.axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + res.data.Token;
            return _this.axiosInstance(originalRequest);
          }

          return;
        });
      }

      return Promise.reject(error);
    });
    this.compareItemsURL = config.compareItemsURL || '/api/compare';
  }

  _createClass(HawkClient, [{
    key: "pinItem",
    value: function () {
      var _pinItem = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.axiosInstance.post(new URL(this.pinItemURL, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result.data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function pinItem(_x, _x2) {
        return _pinItem.apply(this, arguments);
      }

      return pinItem;
    }()
  }, {
    key: "updatePinOrder",
    value: function () {
      var _updatePinOrder = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.axiosInstance.post(new URL(this.updatePinOrderURL, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context2.sent;
                return _context2.abrupt("return", result.data);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function updatePinOrder(_x3, _x4) {
        return _updatePinOrder.apply(this, arguments);
      }

      return updatePinOrder;
    }()
  }, {
    key: "search",
    value: function () {
      var _search = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.axiosInstance.post(new URL(this.searchUrl, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result.data);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function search(_x5, _x6) {
        return _search.apply(this, arguments);
      }

      return search;
    }()
  }, {
    key: "autocomplete",
    value: function () {
      var _autocomplete = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return axios$1.post(new URL(this.autocompleteUrl, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result.data);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function autocomplete(_x7, _x8) {
        return _autocomplete.apply(this, arguments);
      }

      return autocomplete;
    }()
  }, {
    key: "getComparedItems",
    value: function () {
      var _getComparedItems = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return axios$1.post(new URL(this.compareItemsURL, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", result.data);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getComparedItems(_x9, _x10) {
        return _getComparedItems.apply(this, arguments);
      }

      return getComparedItems;
    }()
  }, {
    key: "getProductDetails",
    value: function () {
      var _getProductDetails = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(request, cancellationToken) {
        var result;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return axios$1.post(new URL(this.productDetailsURL, this.baseUrl).href, request, {
                  cancelToken: cancellationToken
                });

              case 2:
                result = _context6.sent;
                return _context6.abrupt("return", new Result(result.data));

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getProductDetails(_x11, _x12) {
        return _getProductDetails.apply(this, arguments);
      }

      return getProductDetails;
    }()
  }]);

  return HawkClient;
}();

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useMergableState(initialValue, typeConstructor) {
  var _useState = useState(new typeConstructor(initialValue)),
      _useState2 = _slicedToArray$1(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  function setStateAndMerge(value) {
    if (typeof value === 'function') {
      // if we're being passed a function, we're setting state in the form of setState(prevState => ...).
      setState(function (prevState) {
        // so we derive the new state from the previous state
        var newState = value(prevState); // and then set the new merged state

        return new typeConstructor(_objectSpread$3(_objectSpread$3({}, prevState), newState));
      });
      return;
    } // otherwise, the new state was simply passed in


    setState(function (prevState) {
      // merge state together and set it
      return new typeConstructor(_objectSpread$3(_objectSpread$3({}, prevState), value));
    });
  }

  return [state, setStateAndMerge];
}

var getVisitorExpiry = function getVisitorExpiry() {
  var d = new Date(); // 1 year

  d.setTime(d.getTime() + 360 * 24 * 60 * 60 * 1000);
  return d.toUTCString();
};
var getVisitExpiry = function getVisitExpiry() {
  var d = new Date(); // 4 hours

  d.setTime(d.getTime() + 4 * 60 * 60 * 1000);
  return d.toUTCString();
};
var createGuid = function createGuid() {
  var s = [];
  var hexDigits = '0123456789abcdef';

  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }

  s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
  // tslint:disable-next-line: no-bitwise

  s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

  s[8] = s[13] = s[18] = s[23] = '-';
  var uuid = s.join('');
  return uuid;
};
var getCookie = function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';'); // tslint:disable-next-line: prefer-for-of

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length);
    }
  }

  return null;
};
var setCookie = function setCookie(name, value, expiry) {
  var expires;

  if (expiry) {
    expires = '; expires=' + expiry;
  } else {
    expires = '';
  }

  document.cookie = name + '=' + value + expires + '; path=/';
};

var E_T;

(function (E_T) {
  E_T[E_T["pageLoad"] = 1] = "pageLoad";
  E_T[E_T["search"] = 2] = "search";
  E_T[E_T["click"] = 3] = "click";
  E_T[E_T["addToCart"] = 4] = "addToCart";
  E_T[E_T["rate"] = 5] = "rate";
  E_T[E_T["sale"] = 6] = "sale";
  E_T[E_T["bannerClick"] = 7] = "bannerClick";
  E_T[E_T["bannerImpression"] = 8] = "bannerImpression";
  E_T[E_T["recommendationClick"] = 10] = "recommendationClick";
  E_T[E_T["autoCompleteClick"] = 11] = "autoCompleteClick";
  E_T[E_T["add2CartMultiple"] = 14] = "add2CartMultiple";
})(E_T || (E_T = {}));

var P_T;

(function (P_T) {
  P_T[P_T["item"] = 1] = "item";
  P_T[P_T["landing"] = 2] = "landing";
  P_T[P_T["cart"] = 3] = "cart";
  P_T[P_T["order"] = 4] = "order";
  P_T[P_T["custom"] = 5] = "custom";
})(P_T || (P_T = {}));

var SuggestType;

(function (SuggestType) {
  SuggestType[SuggestType["PopularSearches"] = 1] = "PopularSearches";
  SuggestType[SuggestType["TopCategories"] = 2] = "TopCategories";
  SuggestType[SuggestType["TopProductMatches"] = 3] = "TopProductMatches";
  SuggestType[SuggestType["TopContentMatches"] = 4] = "TopContentMatches";
})(SuggestType || (SuggestType = {}));

var SearchType;

(function (SearchType) {
  SearchType[SearchType["Initial"] = 1] = "Initial";
  SearchType[SearchType["Refinement"] = 2] = "Refinement";
})(SearchType || (SearchType = {}));

var TrackingEvent = /*#__PURE__*/function () {
  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  function TrackingEvent() {
    _classCallCheck(this, TrackingEvent);

    _defineProperty(this, "trackingURL", void 0);

    _defineProperty(this, "clientGUID", void 0);
  }
  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */


  _createClass(TrackingEvent, [{
    key: "setTrackingURL",
    value:
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    function setTrackingURL(url) {
      this.trackingURL = url;
    }
  }, {
    key: "getTrackingURL",
    value: function getTrackingURL() {
      return this.trackingURL;
    }
  }, {
    key: "setClientGUID",
    value: function setClientGUID(guid) {
      this.clientGUID = guid;
    }
  }, {
    key: "getClientGUID",
    value: function getClientGUID() {
      return this.getClientGUID;
    }
  }, {
    key: "getVisitorExpiry",
    value: function getVisitorExpiry() {
      var d = new Date(); // 1 year

      d.setTime(d.getTime() + 360 * 24 * 60 * 60 * 1000);
      return d.toUTCString();
    }
  }, {
    key: "getVisitExpiry",
    value: function getVisitExpiry() {
      var d = new Date(); // 4 hours

      d.setTime(d.getTime() + 4 * 60 * 60 * 1000);
      return d.toUTCString();
    }
  }, {
    key: "createGuid",
    value: function createGuid() {
      var s = [];
      var hexDigits = '0123456789abcdef';

      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }

      s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
      // tslint:disable-next-line: no-bitwise

      s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01

      s[8] = s[13] = s[18] = s[23] = '-';
      var uuid = s.join('');
      return uuid;
    }
  }, {
    key: "getCookie",
    value: function getCookie(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';'); // tslint:disable-next-line: prefer-for-of

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) === ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) === 0) {
          return c.substring(nameEQ.length, c.length);
        }
      }

      return null;
    }
  }, {
    key: "setCookie",
    value: function setCookie(name, value, expiry) {
      var expires;

      if (expiry) {
        expires = '; expires=' + expiry;
      } else {
        expires = '';
      }

      document.cookie = name + '=' + value + expires + '; path=/';
    }
  }, {
    key: "writePageLoad",
    value: function writePageLoad(pageType) {
      var c = document.documentElement;
      var pl = {
        EventType: E_T.pageLoad,
        EventData: btoa(JSON.stringify({
          PageTypeId: P_T[pageType],
          RequestPath: window.location.pathname,
          Qs: window.location.search,
          ViewportHeight: c.clientHeight,
          ViewportWidth: c.clientWidth
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeSearchTracking",
    value: function writeSearchTracking(trackingId, typeId) {
      if (typeId === SearchType.Initial) {
        this.setCookie('hawk_query_id', this.createGuid());
      }

      var queryId = this.getCookie('hawk_query_id');
      var c = document.documentElement;
      var pl = {
        EventType: E_T.search,
        EventData: btoa(JSON.stringify({
          QueryId: queryId,
          TrackingId: trackingId,
          TypeId: typeId,
          ViewportHeight: c.clientHeight,
          ViewportWidth: c.clientWidth
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeClick",
    value: function writeClick(event, uniqueId, trackingId, url) {
      var c = document.documentElement;
      var pl = {
        EventType: E_T.click,
        EventData: btoa(JSON.stringify({
          Url: url,
          Qs: window.location.search,
          RequestPath: window.location.pathname,
          TrackingId: trackingId,
          UniqueId: uniqueId,
          ViewportHeight: c.clientHeight,
          ViewportWidth: c.clientWidth
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeBannerClick",
    value: function writeBannerClick(bannerId, campaignId, trackingId) {
      var pl = {
        EventType: E_T.bannerClick,
        EventData: btoa(JSON.stringify({
          CampaignId: campaignId,
          BannerId: bannerId,
          TrackingId: trackingId
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeBannerImpression",
    value: function writeBannerImpression(bannerId, campaignId, trackingId) {
      var pl = {
        EventType: E_T.bannerImpression,
        EventData: btoa(JSON.stringify({
          CampaignId: campaignId,
          BannerId: bannerId,
          TrackingId: trackingId
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeSale",
    value: function writeSale(orderNo, itemList, total, subTotal, tax, currency) {
      var pl = {
        EventType: E_T.sale,
        EventData: btoa(JSON.stringify({
          OrderNo: orderNo,
          ItemList: itemList,
          Total: total,
          Tax: tax,
          SubTotal: subTotal,
          Currency: currency
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeAdd2Cart",
    value: function writeAdd2Cart(uniqueId, price, quantity, currency) {
      var pl = {
        EventType: E_T.addToCart,
        EventData: btoa(JSON.stringify({
          UniqueId: uniqueId,
          Quantity: quantity,
          Price: price,
          Currency: currency
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeAdd2CartMultiple",
    value: function writeAdd2CartMultiple(args) {
      var pl = {
        EventType: E_T.add2CartMultiple,
        EventData: btoa(JSON.stringify({
          ItemsList: args
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeRate",
    value: function writeRate(uniqueId, value) {
      var pl = {
        EventType: E_T.rate,
        EventData: btoa(JSON.stringify({
          UniqueId: uniqueId,
          Value: value
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeRecommendationClick",
    value: function writeRecommendationClick(widgetGuid, uniqueId, itemIndex, requestId) {
      var pl = {
        EventType: E_T.recommendationClick,
        EventData: btoa(JSON.stringify({
          ItemIndex: itemIndex,
          RequestId: requestId,
          UniqueId: uniqueId,
          WidgetGuid: widgetGuid
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "writeAutoCompleteClick",
    value: function writeAutoCompleteClick(keyword, suggestType, name, url) {
      var pl = {
        EventType: E_T.autoCompleteClick,
        EventData: btoa(JSON.stringify({
          Keyword: keyword,
          Name: name,
          SuggestType: suggestType,
          Url: url
        }))
      };
      this.mr(pl);
    }
  }, {
    key: "mr",
    value: function mr(data) {
      var visitId = this.getCookie('hawk_visit_id');
      var visitorId = this.getCookie('hawk_visitor_id');

      if (!visitId) {
        this.setCookie('hawk_visit_id', this.createGuid(), this.getVisitExpiry());
        visitId = this.getCookie('hawk_visit_id');
      }

      if (!visitorId) {
        this.setCookie('hawk_visitor_id', this.createGuid(), this.getVisitorExpiry());
        visitorId = this.getCookie('hawk_visitor_id');
      }

      var pl = Object.assign({
        ClientGuid: this.clientGUID,
        VisitId: visitId,
        VisitorId: visitorId // TrackingProperties: hs.Context,
        // CustomDictionary: hs.Context.Custom,

      }, data);
      fetch(this.trackingURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pl)
      }).then(function (resp) {
        console.log('Success:', resp.status);
      })["catch"](function (error) {
        console.error('Error:', error);
      });
    }
  }, {
    key: "track",
    value: function track(eventName, args) {
      if (!this.trackingURL || !this.clientGUID) {
        return;
      }

      switch (eventName.toLowerCase()) {
        case 'pageload':
          // HawkSearch.Context.add("uniqueid", "123456789");
          return this.writePageLoad(args.pageType);

        case 'searchtracking':
          // HawkSearch.Tracking.track("searchtracking", {trackingId:"a9bd6e50-e434-45b9-9f66-489eca07ad0a", typeId: HawkSearch.Tracking.SearchType.Initial});
          // HawkSearch.Tracking.track("searchtracking", {trackingId:"a9bd6e50-e434-45b9-9f66-489eca07ad0a", typeId: HawkSearch.Tracking.SearchType.Refinement});
          return this.writeSearchTracking(args.trackingId, args.typeId);
        // CHANGED

        case 'click':
          // HawkSearch.Tracking.track('click',{event: e, uniqueId: "33333", trackingId: "75a0801a-a93c-4bcb-81f1-f4b011f616e3"});
          return this.writeClick(args.event, args.uniqueId, args.trackingId, '');
        // CHANGED

        case 'bannerclick':
          // HawkSearch.Tracking.track('bannerclick',{bannerId: 1, campaignId: 2, trackingId:"2d652a1e-2e05-4414-9d76-51979109f724"});
          return this.writeBannerClick(args.bannerId, args.campaignId, args.trackingId);
        // CHANGED

        case 'bannerimpression':
          // HawkSearch.Tracking.track('bannerimpression',{bannerId: "2", campaignId: "2", trackingId:"2d652a1e-2e05-4414-9d76-51979109f724"});
          return this.writeBannerImpression(args.bannerId, args.campaignId, args.trackingId);
        // CHANGED

        case 'sale':
          // HawkSearch.Tracking.track('sale', {orderNo: 'order_123',itemList: [{uniqueid: '123456789', itemPrice: 12.99, quantity: 2}], total: 25.98, subTotal: 22, tax: 3.98, currency: 'USD'});
          return this.writeSale(args.orderNo, args.itemList, args.total, args.subTotal, args.tax, args.currency);

        case 'add2cart':
          // HawkSearch.Tracking.track('add2cart',{uniqueId: '123456789', price: 19.99, quantity: 3, currency: 'USD'});
          return this.writeAdd2Cart(args.uniqueId, args.price, args.quantity, args.currency);

        case 'add2cartmultiple':
          // HawkSearch.Tracking.track('add2cartmultiple', [{uniqueId: '123456789',price: 15.97,quantity: 1,currency: 'USD'},{uniqueId: '987465321', price: 18.00, quantity: 1, currency: 'USD'}]);
          return this.writeAdd2CartMultiple(args);

        case 'rate':
          // HawkSearch.Tracking.track('rate', {uniqueId: '123456789',value: 3.00});
          return this.writeRate(args.uniqueId, args.value);

        case 'recommendationclick':
          // HawkSearch.Tracking.track('recommendationclick',{uniqueId: "223222", itemIndex: "222", widgetGuid:"2d652a1e-2e05-4414-9d76-51979109f724", requestId:"2d652a1e-2e05-4414-9d76-51979109f724"});
          return this.writeRecommendationClick(args.widgetGuid, args.uniqueId, args.itemIndex, args.requestId);

        case 'autocompleteclick':
          // HawkSearch.Tracking.track('autocompleteclick',{keyword: "test", suggestType: HawkSearch.Tracking.SuggestType.PopularSearches, name:"tester", url:"/test"});
          return this.writeAutoCompleteClick(args.keyword, args.suggestType, args.name, args.url);
        // CHANGED
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance(url) {
      if (!TrackingEvent.instance) {
        TrackingEvent.instance = new TrackingEvent();
      }

      return TrackingEvent.instance;
    }
  }]);

  return TrackingEvent;
}(); // export TrackingEvent.getInstance();


_defineProperty(TrackingEvent, "instance", void 0);

var TrackingEvent$1 = TrackingEvent.getInstance();

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function useHawkState(initialSearch) {
  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var client = new HawkClient(config);

  var _useMergableState = useMergableState(new SearchStore({
    pendingSearch: initialSearch || {
      FacetSelections: {}
    },
    isLoading: true,
    itemsToCompare: [],
    comparedResults: [],
    itemsToCompareIds: [],
    productDetails: {}
  }), SearchStore),
      _useMergableState2 = _slicedToArray$1(_useMergableState, 2),
      store = _useMergableState2[0],
      setStore = _useMergableState2[1];

  useEffect(function () {
    // when the pending search changes, trigger a search
    var cts = axios$1.CancelToken.source();
    search(cts.token);
    return function () {
      cts.cancel();
    };
  }, [store.pendingSearch]);
  /**
   * Performs a search with the currently configured pending search request. The search request can be
   * configured via the `setSearch` method. This method usually doesn't need to be called directly, as
   * the `StoreProvider` component will usually trigger searches directly in response to calls to
   * `setSearch`.
   * @returns A promise that resolves when the search request has been completed.
   */

  function search(_x) {
    return _search.apply(this, arguments);
  }

  function _search() {
    _search = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(cancellationToken) {
      var searchResults, searchParams, visitId, visitorId, updatedRequest, selectedFacets;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setStore({
                isLoading: true
              });
              searchResults = null;
              searchParams = _objectSpread$4(_objectSpread$4({}, store.pendingSearch), {}, {
                // pass parameter for extended response
                IsInPreview: config.isInPreview,
                // and override some of the request fields with config values
                ClientGuid: config.clientGuid,
                Keyword: store.pendingSearch.Keyword ? decodeURIComponent(store.pendingSearch.Keyword || '') : store.pendingSearch.Keyword,
                SearchWithin: store.pendingSearch.SearchWithin ? decodeURIComponent(store.pendingSearch.SearchWithin || '') : store.pendingSearch.SearchWithin
              }); // The index name in the configuration takes priority over the one supplied from the URL

              if (config.indexName) {
                Object.assign(searchParams, {
                  IndexName: config.indexName
                });
              } // If the index name is required and no value is provided from the config or the URL, the request is canceled


              if (!(config.indexNameRequired && !searchParams.IndexName)) {
                _context.next = 7;
                break;
              }

              setStore({
                isLoading: false
              });
              return _context.abrupt("return");

            case 7:
              // Fill clientdata
              visitId = getCookie('hawk_visit_id');
              visitorId = getCookie('hawk_visitor_id');

              if (!visitId) {
                setCookie('hawk_visit_id', createGuid(), getVisitExpiry());
                visitId = getCookie('hawk_visit_id');
              }

              if (!visitorId) {
                setCookie('hawk_visitor_id', createGuid(), getVisitorExpiry());
                visitorId = getCookie('hawk_visitor_id');
              }

              updatedRequest = _objectSpread$4({
                ClientData: {
                  VisitorId: visitorId || '',
                  VisitId: visitId || '',
                  UserAgent: navigator.userAgent,
                  PreviewBuckets: store.searchResults ? store.searchResults.VisitorTargets.map(function (v) {
                    return v.Id;
                  }) : []
                }
              }, searchParams);
              _context.prev = 12;
              _context.next = 15;
              return client.search(updatedRequest, cancellationToken);

            case 15:
              searchResults = _context.sent;
              _context.next = 24;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](12);

              if (!axios$1.isCancel(_context.t0)) {
                _context.next = 22;
                break;
              }

              return _context.abrupt("return");

            case 22:
              console.error('Search request error:', _context.t0);
              setStore({
                requestError: true
              });

            case 24:
              setStore({
                isLoading: false
              });

              if (searchResults) {
                if (!searchResults.Success) {
                  console.error('Search result error:', searchResults);
                  setStore({
                    requestError: true
                  });
                } else {
                  selectedFacets = searchParams.FacetSelections ? Object.keys(searchParams.FacetSelections) : [];

                  if (searchParams.SortBy || searchParams.PageNo || searchParams.MaxPerPage || selectedFacets.length || searchParams.SearchWithin) {
                    TrackingEvent$1.track('searchtracking', {
                      trackingId: searchResults.TrackingId,
                      typeId: SearchType.Refinement,
                      keyword: searchParams.Keyword
                    });
                  } else {
                    TrackingEvent$1.track('searchtracking', {
                      trackingId: searchResults.TrackingId,
                      typeId: SearchType.Initial,
                      keyword: searchParams.Keyword
                    });
                  }

                  setStore({
                    searchResults: new Response(searchResults),
                    requestError: false
                  });
                }
              }

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[12, 18]]);
    }));
    return _search.apply(this, arguments);
  }

  function pinItem(_x2, _x3) {
    return _pinItem.apply(this, arguments);
  }

  function _pinItem() {
    _pinItem = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(request, cancellationToken) {
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return client.pinItem(request, cancellationToken);

            case 2:
              return _context2.abrupt("return", _context2.sent);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _pinItem.apply(this, arguments);
  }

  function updatePinOrder(_x4, _x5) {
    return _updatePinOrder.apply(this, arguments);
  }
  /**
   * Performs a comparision between two or more than two products based on ID
   * user can use this method from view application.
   * @returns A promise that resolves when the compare request has been completed.
   */


  function _updatePinOrder() {
    _updatePinOrder = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(request, cancellationToken) {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return client.updatePinOrder(request, cancellationToken);

            case 2:
              return _context3.abrupt("return", _context3.sent);

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _updatePinOrder.apply(this, arguments);
  }

  function getComparedItems(_x6, _x7) {
    return _getComparedItems.apply(this, arguments);
  }
  /**
   * Get product details by ID
   * @returns A promise that resolves when the product details request has been completed.
   */


  function _getComparedItems() {
    _getComparedItems = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(request, cancellationToken) {
      return regenerator.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return client.getComparedItems(request, cancellationToken);

            case 2:
              return _context4.abrupt("return", _context4.sent);

            case 3:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));
    return _getComparedItems.apply(this, arguments);
  }

  function getProductDetails(_x8, _x9) {
    return _getProductDetails.apply(this, arguments);
  }
  /**
   * Configures the next search request that will be executed. This will also execute a search in response to
   * the next search request changing.
   * @param search The partial search request object. This will be merged with previous calls to `setSearch`.
   * @param doHistory Whether or not this search request will push a history entry into the browser. If
   * 					not specified, the default is `true`.
   */


  function _getProductDetails() {
    _getProductDetails = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(request, cancellationToken) {
      return regenerator.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return client.getProductDetails(request, cancellationToken);

            case 2:
              return _context5.abrupt("return", _context5.sent);

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _getProductDetails.apply(this, arguments);
  }

  function setSearch(pendingSearch, doHistory) {
    if (doHistory === undefined) {
      doHistory = true;
    }

    setStore(function (prevState) {
      var newState = {
        pendingSearch: _objectSpread$4(_objectSpread$4({}, prevState.pendingSearch), pendingSearch),
        doHistory: doHistory
      };

      if (newState.pendingSearch.Keyword === '') {
        newState.pendingSearch.Keyword = undefined;
      }

      return newState;
    });
  }
  /**
   * Sets the facet selections and search within configuration for the next search request. This will also
   * clear the page number of the next request to display the first page of results.
   * @param selections The facet selections to set.
   * @param searchWithin The search within value to set.
   */


  function setSearchSelections(selections, searchWithin) {
    setSearch({
      FacetSelections: selections,
      SearchWithin: searchWithin,
      // when we change facet selections, also clear the current page so that we navigate
      // back to the first page of results
      PageNo: undefined
    });
  }
  /**
   * Toggles a facet value for the next search request that will be executed. Internally, this will call
   * `setSearch` to configure the next search with this selected facet.
   * @param facet The facet for which the value is being selected.
   * @param facetValue The facet value being selected.
   * @param negate  Whether or not this selection is considered a negation.
   */


  function toggleFacetValue(facet, facetValue, negate) {
    if (negate === undefined) {
      negate = false;
    }

    var facetName = typeof facet === 'string' ? facet : facet.Name;
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
    var valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

    if (!valueValue) {
      console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
      return;
    }

    var facetSelections = store.pendingSearch.FacetSelections; // handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
    // search request.

    if (facetField === 'searchWithin') {
      // set the search within to the facet value provided
      setSearchSelections(facetSelections,
      /* searchWithin */
      valueValue);
      return;
    }

    if (!facetSelections) {
      facetSelections = {};
    }

    if (!facetSelections[facetField]) {
      facetSelections[facetField] = [];
    }

    var _store$isFacetSelecte = store.isFacetSelected(facet, facetValue),
        selState = _store$isFacetSelecte.state,
        selectionIndex = _store$isFacetSelecte.selectionIndex;

    if (selState === FacetSelectionState.Selected || selState === FacetSelectionState.Negated) {
      // we're selecting this facet, and it's already selected
      // first, remove it from our selections
      facetSelections[facetField].splice(selectionIndex, 1);

      if (selState === FacetSelectionState.Selected && negate || selState === FacetSelectionState.Negated && !negate) {
        // if we're toggling from negation to non-negation or vice versa, then push the new selection
        facetSelections[facetField].push(negate ? "-".concat(valueValue) : valueValue);
      }
    } else {
      // not selected, so we want to select it
      facetSelections[facetField].push(negate ? "-".concat(valueValue) : valueValue);
    }

    if (facetSelections[facetField].length === 0) {
      // clean up any facets that no longer have any selected facet values
      delete facetSelections[facetField];
    }

    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }

  function setFacetValues(facet, facetValues) {
    var facetName = typeof facet === 'string' ? facet : facet.Name;
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var facetSelections = store.pendingSearch.FacetSelections;

    if (!facetSelections) {
      facetSelections = {};
    }

    facetSelections[facetField] = [];

    var _iterator = _createForOfIteratorHelper$1(facetValues),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _facetValue = _step.value;
        var valueValue = typeof _facetValue === 'string' ? _facetValue : _facetValue.Value;
        var valueLabel = typeof _facetValue === 'string' ? _facetValue : _facetValue.Label;

        if (!valueValue) {
          console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
          return;
        }

        facetSelections[facetField].push(valueValue);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }
  /**
   * Entirely clears all the values of the given facet from the current selection.
   * @param facet The facet to clear.
   */


  function clearFacet(facet) {
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var facetSelections = store.pendingSearch.FacetSelections; // handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
    // search request.

    if (facetField === 'searchWithin') {
      // set searchWithin to undefined to clear it
      setSearchSelections(facetSelections,
      /* searchWithin */
      undefined);
      return;
    }

    if (!facetSelections || !facetSelections[facetField]) {
      // if there are no facet selections or the facet isn't selected at all, there's nothing to clear
      return;
    }

    delete facetSelections[facetField];
    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }
  /**
   * Clears a given facet value of the given facet from the current selection.
   * @param facet The facet to clear.
   * @param facetValue The facet value to clear.
   */


  function clearFacetValue(facet, facetValue) {
    var facetName = typeof facet === 'string' ? facet : facet.Name;
    var facetField = typeof facet === 'string' ? facet : facet.selectionField;
    var valueValue = typeof facetValue === 'string' ? facetValue : facetValue.Value;
    var valueLabel = typeof facetValue === 'string' ? facetValue : facetValue.Label;

    if (!valueValue) {
      console.error("Facet ".concat(facetName, " (").concat(facetField, ") has no facet value for ").concat(valueLabel));
      return;
    } // handle `searchWithin` facet, which isn't a facet selection but is instead a field on the
    // search request.


    if (facetField === 'searchWithin') {
      // set searchWithin to undefined to clear it
      setSearchSelections(store.pendingSearch.FacetSelections,
      /* searchWithin */
      undefined);
      return;
    }

    var _store$isFacetSelecte2 = store.isFacetSelected(facet, facetValue),
        selState = _store$isFacetSelecte2.state,
        selectionIndex = _store$isFacetSelecte2.selectionIndex;

    if (selState === FacetSelectionState.NotSelected) {
      // if there are no facet selections or the facet isn't selected at all, there's nothing to clear
      return;
    }

    var facetSelections = store.pendingSearch.FacetSelections; // remove it from the selections

    facetSelections[facetField].splice(selectionIndex, 1);

    if (facetSelections[facetField].length === 0) {
      // clean up any facets that no longer have any selected facet values
      delete facetSelections[facetField];
    }

    setSearchSelections(facetSelections, store.pendingSearch.SearchWithin);
  }
  /**
   * Clears all selected facets from the current selection.
   */


  function clearAllFacets() {
    setSearchSelections(undefined, undefined);
  }

  function setItemsToCompare(resultItem, isCheck) {
    var itemsArray = _toConsumableArray(store.itemsToCompare);

    if (isCheck) {
      // append
      itemsArray = [].concat(_toConsumableArray(itemsArray), [resultItem]);
    } else {
      // filter out
      itemsArray = itemsArray.filter(function (item) {
        return item.DocId !== resultItem.DocId;
      });
    } // setStore({ itemsToCompare: itemsArray });


    setStore({
      itemsToCompare: itemsArray,
      itemsToCompareIds: itemsArray.map(function (item) {
        return item.DocId;
      })
    });
  }

  function setComparedResults(data) {
    setStore({
      comparedResults: data
    });
  }

  function setProductDetailsResults(data) {
    setStore({
      productDetails: data
    });
  }

  function clearItemsToCompare() {
    setStore({
      itemsToCompare: [],
      itemsToCompareIds: []
    });
  }

  var actor = {
    search: search,
    setSearch: setSearch,
    toggleFacetValue: toggleFacetValue,
    setFacetValues: setFacetValues,
    clearFacet: clearFacet,
    clearFacetValue: clearFacetValue,
    clearAllFacets: clearAllFacets,
    pinItem: pinItem,
    updatePinOrder: updatePinOrder,
    setItemsToCompare: setItemsToCompare,
    setComparedResults: setComparedResults,
    clearItemsToCompare: clearItemsToCompare,
    getComparedItems: getComparedItems,
    getProductDetails: getProductDetails,
    setProductDetailsResults: setProductDetailsResults
  };
  return [store, actor];
}

var HawkContext = /*#__PURE__*/React__default.createContext({});

/**
 * This component acts as the global store for the hawksearch application state. Only one instance of this component
 * should exist, and it should be the root level component.
 */
function StoreProvider(_ref) {
  var initialSearch = _ref.initialSearch,
      children = _ref.children;

  var _useHawkState = useHawkState(initialSearch),
      _useHawkState2 = _slicedToArray$1(_useHawkState, 2),
      store = _useHawkState2[0],
      actor = _useHawkState2[1];

  return /*#__PURE__*/React__default.createElement(HawkContext.Provider, {
    value: {
      store: store,
      actor: actor
    }
  }, children);
}
/**
 * Retrieves the global hawk store for use within a component.
 */


function useHawksearch() {
  return useContext(HawkContext);
}

function Hawksearch(props) {
  if (props.config.trackEventUrl) {
    // Set URL to track event
    TrackingEvent$1.setTrackingURL(props.config.trackEventUrl);
    TrackingEvent$1.setClientGUID(props.config.clientGuid);
  }

  return /*#__PURE__*/React__default.createElement(ConfigProvider, {
    config: props.config
  }, /*#__PURE__*/React__default.createElement(StoreProvider, {
    initialSearch: props.initialSearch
  }, props.children));
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var SuggestionType;

(function (SuggestionType) {
  SuggestionType["Product"] = "product";
  SuggestionType["Category"] = "category";
  SuggestionType["Content"] = "content";
  SuggestionType["Popular"] = "popular";
})(SuggestionType || (SuggestionType = {}));

var Suggestion = function Suggestion(suggestionType) {
  _classCallCheck(this, Suggestion);

  _defineProperty(this, "SuggestionType", void 0);

  this.SuggestionType = suggestionType;
};

function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Category = /*#__PURE__*/function (_Suggestion) {
  _inherits(Category, _Suggestion);

  var _super = _createSuper$1(Category);

  /** Display name of category (example: Men &raquo; Jackets). */

  /**
   * URL for displaying contents of the category, ex:
   * http://dev.hawksearch.net/sites/elasticdemo?department_nest=Jackets_4
   */
  function Category(init) {
    var _this;

    _classCallCheck(this, Category);

    _this = _super.call(this, SuggestionType.Category);

    _defineProperty(_assertThisInitialized(_this), "Value", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Category;
}(Suggestion);
var CategoryStrategy = /*#__PURE__*/function () {
  function CategoryStrategy() {
    _classCallCheck(this, CategoryStrategy);
  }

  _createClass(CategoryStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.Value : '';
    }
  }]);

  return CategoryStrategy;
}();

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Product = /*#__PURE__*/function (_Suggestion) {
  _inherits(Product, _Suggestion);

  var _super = _createSuper$2(Product);

  /** Name of the item (if applicable). */

  /* Sku of the item (if applicable). */

  /** URL of image of the item (if applicable). */

  /** URL of product page (if applicable). */

  /** HTML to display the item in autocomplete. */

  /**
   * This will only be populated if the request parameter @see Request.DisplayFullResponse is sent
   * as `true`.
   */
  function Product(init) {
    var _this;

    _classCallCheck(this, Product);

    _this = _super.call(this, SuggestionType.Product);

    _defineProperty(_assertThisInitialized(_this), "ProductName", void 0);

    _defineProperty(_assertThisInitialized(_this), "Sku", void 0);

    _defineProperty(_assertThisInitialized(_this), "Thumb", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    _defineProperty(_assertThisInitialized(_this), "Html", void 0);

    _defineProperty(_assertThisInitialized(_this), "Results", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Product;
}(Suggestion);
var ProductStrategy = /*#__PURE__*/function () {
  function ProductStrategy() {
    _classCallCheck(this, ProductStrategy);
  }

  _createClass(ProductStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.ProductName : '';
    }
  }]);

  return ProductStrategy;
}();

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Content = /*#__PURE__*/function (_Suggestion) {
  _inherits(Content, _Suggestion);

  var _super = _createSuper$3(Content);

  /** Display label for the content item in Autocomplete. */

  /** The URL for the link created. */

  /** The display label in HTML format, if applicable. */
  function Content(init) {
    var _this;

    _classCallCheck(this, Content);

    _this = _super.call(this, SuggestionType.Content);

    _defineProperty(_assertThisInitialized(_this), "Value", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    _defineProperty(_assertThisInitialized(_this), "Html", void 0);

    _defineProperty(_assertThisInitialized(_this), "Results", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Content;
}(Suggestion);
var ContentStrategy = /*#__PURE__*/function () {
  function ContentStrategy() {
    _classCallCheck(this, ContentStrategy);
  }

  _createClass(ContentStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.Value : '';
    }
  }]);

  return ContentStrategy;
}();

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$4(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$4() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var Popular = /*#__PURE__*/function (_Suggestion) {
  _inherits(Popular, _Suggestion);

  var _super = _createSuper$4(Popular);

  /** Display label for the popular search term. */

  /** The URL for the link created. */
  function Popular(init) {
    var _this;

    _classCallCheck(this, Popular);

    _this = _super.call(this, SuggestionType.Popular);

    _defineProperty(_assertThisInitialized(_this), "Value", void 0);

    _defineProperty(_assertThisInitialized(_this), "Url", void 0);

    Object.assign(_assertThisInitialized(_this), init);
    return _this;
  }

  return Popular;
}(Suggestion);
var PopularStrategy = /*#__PURE__*/function () {
  function PopularStrategy() {
    _classCallCheck(this, PopularStrategy);
  }

  _createClass(PopularStrategy, [{
    key: "handleItemChange",
    value: function handleItemChange(item, downshift) {
      location.assign(item.Url);
    }
  }, {
    key: "toString",
    value: function toString(item) {
      return this ? item.Value : '';
    }
  }]);

  return PopularStrategy;
}();

var Response$1 =
/** Number of products that would be in search results if search was executed. */

/** Number of content items that would be in search results if search was executed.  */

/**
 * Pairs of display values and URLs for matching category names.  The number of categories returned
 * is configured in the Hawksearch Workbench unless overridden by the request parameters.
 */

/**
 * A set of objects for each content item returned. The number returned is configured in the
 * Hawksearch Workbench > Keyword Search > Auto-complete > Update Top Content.
 */

/**
 * A set of Value and Url for each popular search term. The definition of Popular can be defined in
 * the Hawksearch Workbench > Keyword Search > Auto-complete > Update Popular Searches.
 */

/** Search website URL to be used to complete links. */

/** The name of the parameter used to pass the keyword entered by user. */

/**
 * Will be included in the response if there are results to display. The `CategoryHeading` contains
 * the text to display above the list of categories to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `ContentHeading` contains
 * the text to display above the list of content items to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `ProductHeading` contains
 * the text to display above the list of products to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `PopularHeading` contains
 * the text to display above the list of popular search terms to display in Autocomplete.
 */

/**
 * Will be included in the response if there are results to display. The `ViewAllButtonLabel` contains
 * the text to display for the link to return all results from searching with the term entered.
 */
function Response(init) {
  _classCallCheck(this, Response);

  _defineProperty(this, "Count", void 0);

  _defineProperty(this, "ContentCount", void 0);

  _defineProperty(this, "Categories", void 0);

  _defineProperty(this, "Products", void 0);

  _defineProperty(this, "Content", void 0);

  _defineProperty(this, "Popular", void 0);

  _defineProperty(this, "SearchWebsiteUrl", void 0);

  _defineProperty(this, "KeywordField", void 0);

  _defineProperty(this, "CategoryHeading", void 0);

  _defineProperty(this, "ContentHeading", void 0);

  _defineProperty(this, "ProductHeading", void 0);

  _defineProperty(this, "PopularHeading", void 0);

  _defineProperty(this, "ViewAllButtonLabel", void 0);

  Object.assign(this, init);
  this.Categories = init.Categories.map(function (r) {
    return new Category(r);
  });
  this.Products = init.Products.map(function (r) {
    return new Product(r);
  });
  this.Popular = init.Popular.map(function (r) {
    return new Popular(r);
  });
  this.Content = init.Content.map(function (r) {
    return new Content(r);
  });
};

function hasAllEmpty(popular, categories, products, content) {
  var hasPopular = popular && popular.length === 0;
  var hasCategories = categories && categories.length === 0;
  var hasProducts = products && products.length === 0;
  var hasContent = content && content.length === 0;
  return hasPopular && hasCategories && hasProducts && hasContent;
}

function SearchSuggestionsList(_ref) {
  var isLoading = _ref.isLoading,
      searchResults = _ref.searchResults,
      downshift = _ref.downshift,
      onViewMatches = _ref.onViewMatches,
      SuggestionList = _ref.SuggestionList;
  var popular = searchResults.Popular,
      categories = searchResults.Categories,
      products = searchResults.Products,
      content = searchResults.Content;
  var isRecordEmpty = hasAllEmpty(popular, categories, products, content);

  if (isRecordEmpty) {
    return null;
  }

  return SuggestionList ? /*#__PURE__*/React__default.createElement(SuggestionList, {
    isLoading: isLoading,
    downshift: downshift,
    searchResults: searchResults,
    onViewMatches: onViewMatches
  }) : null;
}

function SearchSuggestions(_ref) {
  var query = _ref.query,
      downshift = _ref.downshift,
      onViewMatches = _ref.onViewMatches,
      SuggestionList = _ref.SuggestionList;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var client = new HawkClient(config);

  var _useState = useState({}),
      _useState2 = _slicedToArray$1(_useState, 2),
      results = _useState2[0],
      setResults = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1]; // debounce the input search string so that we only do an autocomplete query every so often


  useEffect(function () {
    // default to 200ms if not specified
    var debounceMs = config.autocompleteDebounce || 200;
    var cts = axios$1.CancelToken.source();
    var timeout = setTimeout(function () {
      return doAutocomplete(query, cts.token);
    }, debounceMs);
    return function () {
      cts.cancel();
      clearTimeout(timeout);
    };
  }, [query, config.autocompleteDebounce]);
  /**
   * Performs an autocomplete request to the Hawk API and populates the result set of this component.
   * @param input The user entered search string that results will be autocompleted for.
   */

  function doAutocomplete(_x, _x2) {
    return _doAutocomplete.apply(this, arguments);
  }

  function _doAutocomplete() {
    _doAutocomplete = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(input, cancellationToken) {
      var response;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoading(true);
              response = null;
              _context.prev = 2;
              _context.next = 5;
              return client.autocomplete({
                ClientGuid: config.clientGuid,
                Keyword: decodeURIComponent(input),
                IndexName: config.indexName,
                DisplayFullResponse: true,
                IsInPreview: config.isInPreview
              }, cancellationToken).then(function (o) {
                // ensure, returned object will return response
                // since by default, axios uses JSON.parse to parse an object,
                // it doesn't recognize it as Response type - this line is to prevent it
                return Object.assign(new Response$1(o));
              });

            case 5:
              response = _context.sent;
              _context.next = 13;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);

              if (!axios$1.isCancel(_context.t0)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return");

            case 12:
              console.error('Autocomplete request error:', _context.t0);

            case 13:
              setIsLoading(false);

              if (response) {
                setResults(response);
              }

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8]]);
    }));
    return _doAutocomplete.apply(this, arguments);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "autosuggest-menu"
  }, /*#__PURE__*/React__default.createElement(SearchSuggestionsList, {
    onViewMatches: onViewMatches,
    downshift: downshift,
    isLoading: isLoading,
    searchResults: results,
    SuggestionList: SuggestionList
  }));
}

/**
 * Plus SVG
 *
 * @returns
 */
function PlusSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1z"
  }));
}

/**
 * Minus SVG
 *
 * @returns
 */
function MinusSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M0 13v6c0 0.552 0.448 1 1 1h30c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1h-30c-0.552 0-1 0.448-1 1z"
  }));
}

/**
 * Questionmark SVG
 *
 * @returns
 */
function QuestionmarkSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M 10.976562 14.785156 C 10.976562 15.324219 10.539062 15.761719 10 15.761719 C 9.460938 15.761719 9.023438 15.324219 9.023438 14.785156 C 9.023438 14.246094 9.460938 13.808594 10 13.808594 C 10.539062 13.808594 10.976562 14.246094 10.976562 14.785156 Z M 10.976562 14.785156 "
  }), /*#__PURE__*/createElement("path", {
    d: "M 10 0 C 4.472656 0 0 4.472656 0 10 C 0 15.527344 4.472656 20 10 20 C 15.527344 20 20 15.527344 20 10 C 20 4.472656 15.527344 0 10 0 Z M 10 18.4375 C 5.335938 18.4375 1.5625 14.664062 1.5625 10 C 1.5625 5.335938 5.335938 1.5625 10 1.5625 C 14.664062 1.5625 18.4375 5.335938 18.4375 10 C 18.4375 14.664062 14.664062 18.4375 10 18.4375 Z M 10 18.4375 "
  }), /*#__PURE__*/createElement("path", {
    d: "M 10 5.019531 C 8.277344 5.019531 6.875 6.421875 6.875 8.144531 C 6.875 8.574219 7.226562 8.925781 7.65625 8.925781 C 8.085938 8.925781 8.4375 8.574219 8.4375 8.144531 C 8.4375 7.28125 9.136719 6.582031 10 6.582031 C 10.863281 6.582031 11.5625 7.28125 11.5625 8.144531 C 11.5625 9.007812 10.863281 9.707031 10 9.707031 C 9.570312 9.707031 9.21875 10.058594 9.21875 10.488281 L 9.21875 12.441406 C 9.21875 12.871094 9.570312 13.222656 10 13.222656 C 10.429688 13.222656 10.78125 12.871094 10.78125 12.441406 L 10.78125 11.171875 C 12.128906 10.824219 13.125 9.597656 13.125 8.144531 C 13.125 6.421875 11.722656 5.019531 10 5.019531 Z M 10 5.019531 "
  }));
}

var FacetContext = /*#__PURE__*/React__default.createContext({});

function getInitialCollapsibleState(facet, cookies) {
  var cookieValue = cookies[facet.Field];

  if (cookieValue !== undefined) {
    return cookieValue === 'true'; // Convert string to boolean
  }

  return facet.IsCollapsible && facet.IsCollapsedDefault;
}

function Facet$1(_ref) {
  var facet = _ref.facet,
      children = _ref.children;

  var _useHawksearch = useHawksearch(),
      searchActor = _useHawksearch.actor;

  var wrapperRef = useRef(null);

  var _useState = useState(''),
      _useState2 = _slicedToArray$1(_useState, 2),
      filter = _useState2[0],
      setFilter = _useState2[1];

  var _useState3 = useState(facet.shouldTruncate),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isTruncated = _useState4[0],
      setTruncated = _useState4[1];

  var _useCookies = useCookies([facet.Field]),
      _useCookies2 = _slicedToArray$1(_useCookies, 2),
      cookies = _useCookies2[0],
      setCookie = _useCookies2[1];

  var _useState5 = useState(getInitialCollapsibleState(facet, cookies)),
      _useState6 = _slicedToArray$1(_useState5, 2),
      isCollapsed = _useState6[0],
      setCollapsed = _useState6[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  function selectFacet(facetValue) {
    setFilter('');
    searchActor.toggleFacetValue(facet, facetValue);
  }

  function setFacets(values) {
    setFilter('');
    searchActor.setFacetValues(facet, values);
  }

  function negateFacet(facetValue) {
    setFilter('');
    searchActor.toggleFacetValue(facet, facetValue,
    /* negate */
    true);
  }

  function renderTruncation() {
    // only show the toggle button if the facet is configured for truncation and we're not filtering
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, facet.shouldTruncate && !filter && /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return actor.setTruncated(!isTruncated);
      },
      className: "hawk-facet-rail__show-more-btn"
    }, isTruncated ? "(+) Show ".concat(remainingFacets, " More") : '(-) Show Less'));
  } // TODO: sort facet values


  var facetValues = facet.Values; // first, perform any filtering if enabled and a filter has been typed in

  if (facet.shouldSearch && filter) {
    facetValues = facet.Values.filter(function (val) {
      if (!val.Label) {
        // if a facet value doesn't have a label, we can't really filter down to it
        // so exclude it
        return false;
      }

      return val.Label.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
    });
  } // next, handle truncation


  var remainingFacets = 0;

  if (facet.shouldTruncate && isTruncated) {
    var valuesBeforeTrunc = facetValues.length;
    facetValues = facetValues.slice(0, facet.TruncateThreshold);
    remainingFacets = valuesBeforeTrunc - facet.TruncateThreshold;
  }

  var actor = {
    selectFacet: selectFacet,
    negateFacet: negateFacet,
    setFacets: setFacets,
    setFilter: setFilter,
    setTruncated: setTruncated,
    setCollapsed: setCollapsed
  };
  var state = {
    facetValues: facetValues,
    filter: filter,
    isTruncated: isTruncated,
    isCollapsed: isCollapsed,
    remainingFacets: remainingFacets,
    decimalPrecision: 2
  };
  var renderer = {
    renderTruncation: renderTruncation
  };

  function toggleCollapsible(event) {
    if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
      return;
    }

    setCookie(facet.Field, !isCollapsed);
    setCollapsed(!isCollapsed);
  }

  return /*#__PURE__*/React__default.createElement(FacetContext.Provider, {
    value: {
      facet: facet,
      state: state,
      actor: actor,
      renderer: renderer
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-heading",
    onClick: function onClick(event) {
      return toggleCollapsible(event);
    }
  }, /*#__PURE__*/React__default.createElement("h4", null, facet.Name), facet.Tooltip && /*#__PURE__*/React__default.createElement("div", {
    className: "custom-tooltip",
    ref: wrapperRef
  }, /*#__PURE__*/React__default.createElement(QuestionmarkSVG, {
    "class": "hawk-questionmark"
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React__default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: facet.Tooltip
    }
  }), /*#__PURE__*/React__default.createElement("i", null))), isCollapsed ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusSVG, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Expand facet category"), ' ') : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(MinusSVG, null), " ", /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Collapse facet category"))), !isCollapsed && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-body"
  }, facet.shouldSearch && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet__quick-lookup"
  }, /*#__PURE__*/React__default.createElement("input", {
    value: filter,
    onChange: function onChange(e) {
      return setFilter(e.currentTarget.value);
    },
    type: "text",
    placeholder: t('Quick Lookup')
  })), children)));
}

function useFacet() {
  return useContext(FacetContext);
}

/**
 * Dash circle SVG
 *
 * @returns
 */
function DashCircleSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon icon-help-header ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    fill: "#5c5c5c",
    d: "M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16v0c0-8.837 7.163-16 16-16v0z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#fff",
    d: "M21.51 17.594h-11.733c-0.884 0-1.6-0.716-1.6-1.6s0.716-1.6 1.6-1.6h11.733c0.884 0 1.6 0.716 1.6 1.6s-0.716 1.6-1.6 1.6z"
  }));
}

/**
 * Checkmark SVG
 *
 * @returns
 */
function CheckmarkSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M27 4l-15 15-7-7-5 5 12 12 20-20z"
  }));
}

/**
 * Plus SVG
 *
 * @returns
 */
function PlusCircleSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 20 20",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M11 9v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0z"
  }));
}

function Checkbox() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  function renderOptions() {
    if (facet.FieldType === 'range') {
      return facetValues.map(function (value) {
        var correspondingRange = facet.Ranges.find(function (c) {
          return c.Value === value.Value;
        });
        var rangeValueAssetUrl = correspondingRange ? config.dashboardUrl + correspondingRange.AssetFullUrl : ''; // facets can be selected or negated, so explicitly check that the facet is not selected

        var selectionState = store.isFacetSelected(facet, value).state;
        var isSelected = selectionState !== FacetSelectionState.NotSelected;
        var isNegated = selectionState === FacetSelectionState.Negated;
        return /*#__PURE__*/React__default.createElement("li", {
          key: value.Value,
          className: "hawk-facet-rail__facet-list-item"
        }, /*#__PURE__*/React__default.createElement("button", {
          onClick: function onClick(e) {
            return actor.selectFacet(value);
          },
          className: "hawk-facet-rail__facet-btn",
          "aria-pressed": isSelected
        }, renderCheckMark(isSelected), rangeValueAssetUrl !== '' ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
          className: "hawk-selectionInner"
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "hawk-range-asset",
          title: value.Label
        }), /*#__PURE__*/React__default.createElement("img", {
          src: rangeValueAssetUrl,
          alt: value.Label
        })), /*#__PURE__*/React__default.createElement("span", {
          style: isNegated ? {
            textDecoration: 'line-through'
          } : undefined,
          className: "hawk-facet-rail__facet-name"
        }, value.Label, " (", value.Count, ")")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
          style: isNegated ? {
            textDecoration: 'line-through'
          } : undefined,
          className: "hawk-facet-rail__facet-name"
        }, value.Label, " (", value.Count, ")"))), renderFacetActions(value.Value || '', isNegated));
      });
    } else {
      return facetValues.map(function (value) {
        // facets can be selected or negated, so explicitly check that the facet is not selected
        var selectionState = store.isFacetSelected(facet, value).state;
        var isSelected = selectionState !== FacetSelectionState.NotSelected;
        var isNegated = selectionState === FacetSelectionState.Negated;
        return /*#__PURE__*/React__default.createElement("li", {
          key: value.Value,
          className: "hawk-facet-rail__facet-list-item"
        }, /*#__PURE__*/React__default.createElement("button", {
          onClick: function onClick(e) {
            return actor.selectFacet(value);
          },
          className: "hawk-facet-rail__facet-btn",
          "aria-pressed": isSelected
        }, renderCheckMark(isSelected), /*#__PURE__*/React__default.createElement("span", {
          style: isNegated ? {
            textDecoration: 'line-through'
          } : undefined,
          className: "hawk-facet-rail__facet-name"
        }, value.Label, " (", value.Count, ")")), renderFacetActions(value.Value || '', isNegated));
      });
    }
  }

  function renderCheckMark(isSelected) {
    return /*#__PURE__*/React__default.createElement("span", {
      className: isSelected ? 'hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox--checked' : 'hawk-facet-rail__facet-checkbox'
    }, isSelected ? /*#__PURE__*/React__default.createElement(CheckmarkSVG, {
      "class": "hawk-facet-rail__facet-checkbox-icon"
    }) : null);
  }

  function renderFacetActions(value, isNegated) {
    return /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick(e) {
        return actor.negateFacet(value);
      },
      className: "hawk-facet-rail__facet-btn-exclude"
    }, isNegated ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusCircleSVG, {
      "class": "hawk-facet-rail__facet-btn-include"
    }), /*#__PURE__*/React__default.createElement("span", {
      className: "visually-hidden"
    }, "Include facet")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DashCircleSVG, null), /*#__PURE__*/React__default.createElement("span", {
      className: "visually-hidden"
    }, "Exclude facet")));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-checkbox"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, renderOptions())), renderer.renderTruncation());
}

function Search() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store,
      hawkActor = _useHawksearch.actor;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      actor = _useFacet.actor;

  var _useState = useState(undefined),
      _useState2 = _slicedToArray$1(_useState, 2),
      input = _useState2[0],
      setInput = _useState2[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  function onKeyDown(event) {
    if (event.key === 'Enter') {
      setInput(undefined); // clear the user's entered value as we want to be driven by the store again

      actor.selectFacet(event.currentTarget.value);
    }
  }

  function clearFacet() {
    setInput(undefined); // clear the user's entered value as we want to be driven by the store again

    hawkActor.clearFacet(facet);
  }

  function getInputValue() {
    if (input !== undefined) {
      // if the user type an input, that's the value for the input
      return input;
    } // otherwise, use the value from the store


    return decodeURIComponent(store.pendingSearch.SearchWithin || '');
  }

  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values__search"
  }, /*#__PURE__*/React__default.createElement("input", {
    value: getInputValue(),
    onChange: function onChange(e) {
      return setInput(e.currentTarget.value);
    },
    onKeyDown: onKeyDown
  }))), store.pendingSearch.SearchWithin && /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values__search-clear"
  }, /*#__PURE__*/React__default.createElement("button", {
    className: "link-button",
    onClick: clearFacet
  }, t('Clear'))));
}

function Link() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  function setLinkFacet(value, selectionState) {
    if (selectionState) {
      // Deselect the facet
      actor.selectFacet(value);
    } else {
      // Select the facet
      actor.setFacets([value]);
    }
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facetValues.map(function (value) {
    // facets can be selected or negated, so explicitly check that the facet is not selected
    var selectionState = store.isFacetSelected(facet, value).state;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    return /*#__PURE__*/React__default.createElement("li", {
      key: value.Value,
      className: "hawk-facet-rail__facet-list-item"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick(e) {
        return setLinkFacet(value, selectionState);
      },
      className: isSelected ? 'hawk-facet-rail__facet-btn selected' : 'hawk-facet-rail__facet-btn',
      "aria-pressed": isSelected
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "hawk-facet-rail__facet-name"
    }, value.Label, " (", value.Count, ")")));
  }))), renderer.renderTruncation());
}

function formatDate(unixFormat) {
  var date = new Date(unixFormat);
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return year + '-' + month + '-' + day;
}

function SliderCalendarInputs(sliderProps) {
  var _useState = useState(0),
      _useState2 = _slicedToArray$1(_useState, 2),
      minValue = _useState2[0],
      setMinValue = _useState2[1];

  var _useState3 = useState(0),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxValue = _useState4[0],
      setMaxValue = _useState4[1];

  function onMinUpdate(event) {
    var value = new Date(event.target.value).getTime();
    var newMinValue = Number(value);

    if (isNaN(newMinValue) || minValue === value) {
      return;
    }

    setMinValue(value);
    sliderProps.onValueChange(Number(newMinValue), Number(maxValue));
  }

  function onMaxUpdate(event) {
    var value = new Date(event.target.value).getTime();
    var newMaxValue = Number(value);

    if (isNaN(newMaxValue) || maxValue === value) {
      return;
    }

    setMaxValue(value);
    sliderProps.onValueChange(Number(minValue), Number(newMaxValue));
  }

  useEffect(function () {
    setMinValue(sliderProps.values[0]);
    setMaxValue(sliderProps.values[1]);
  }, [sliderProps]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-sliderNumeric"
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "date",
    value: formatDate(Number(minValue)),
    className: "hawk-text-input hawk-date-value-start",
    min: formatDate(sliderProps.min),
    max: formatDate(sliderProps.max),
    onChange: onMinUpdate
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "date",
    value: formatDate(Number(maxValue)),
    className: "hawk-text-input hawk-date-value-end",
    min: formatDate(sliderProps.min),
    max: formatDate(sliderProps.max),
    onChange: onMaxUpdate
  }));
}

var Rheostat = /*#__PURE__*/React__default.lazy(function () {
  return import(
  /* webpackChunkName: "rheostat" */
  'rheostat');
});

function formatDate$1(date) {
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  return year + '-' + month + '-' + day;
}

function replaceHyphen(date) {
  if (!date) {
    return date;
  }

  return date.replace(/-/g, '/');
}

function getTime(date) {
  return date && Number(new Date(date || '').getTime());
}

function SliderDate() {
  var _useHawksearch = useHawksearch(),
      facetSelections = _useHawksearch.store.facetSelections;

  var _useFacet = useFacet(),
      _useFacet$state = _useFacet.state,
      facetValues = _useFacet$state.facetValues,
      decimalPrecision = _useFacet$state.decimalPrecision,
      facet = _useFacet.facet,
      actor = _useFacet.actor; // the range of the slider is defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;

  var _useState = useState(range && getTime(range.RangeMin)),
      _useState2 = _slicedToArray$1(_useState, 2),
      rangeMin = _useState2[0],
      setMinRange = _useState2[1];

  var _useState3 = useState(range && getTime(range.RangeMax)),
      _useState4 = _slicedToArray$1(_useState3, 2),
      rangeMax = _useState4[0],
      setMaxRange = _useState4[1];

  var _useState5 = useState(range && getTime(range.RangeStart)),
      _useState6 = _slicedToArray$1(_useState5, 2),
      rangeStart = _useState6[0],
      setStartRange = _useState6[1];

  var _useState7 = useState(range && getTime(range.RangeEnd)),
      _useState8 = _slicedToArray$1(_useState7, 2),
      rangeEnd = _useState8[0],
      setEndRange = _useState8[1]; // if there's no range, initialize to zeros


  var _useState9 = useState(),
      _useState10 = _slicedToArray$1(_useState9, 2),
      minValue = _useState10[0],
      setMinValue = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray$1(_useState11, 2),
      maxValue = _useState12[0],
      setMaxValue = _useState12[1];

  useEffect(function () {
    var paramName = facet.ParamName || facet.Field; // clear min and max value if these were cleared

    if (!paramName || !(paramName in facetSelections)) {
      setMinValue(undefined);
      setMaxValue(undefined);
    }
  }, [facetSelections]);
  useEffect(function () {
    var newRange = facetValues.length > 0 ? facetValues[0] : null;
    setMinRange(newRange && getTime(newRange.RangeMin));
    setMaxRange(newRange && getTime(newRange.RangeMax));
    setStartRange(newRange && getTime(newRange.RangeStart));
    setEndRange(newRange && getTime(newRange.RangeEnd));
  }, [facetValues]);

  if (rangeMin === null || isNaN(rangeMin) || rangeMax === null || isNaN(rangeMax) || rangeStart === null || isNaN(rangeStart) || rangeEnd === null || isNaN(rangeEnd)) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function onSliderDrag(state) {
    var _state$values = _slicedToArray$1(state.values, 2),
        newMin = _state$values[0],
        newMax = _state$values[1];

    setMinValue(newMin);
    setMaxValue(newMax);
  }

  function onSliderValueChange(state) {
    var _state$values2 = _slicedToArray$1(state.values, 2),
        newMin = _state$values2[0],
        newMax = _state$values2[1];

    setFacetValues(newMin, newMax);
  }

  function onValueChange(newMinValue, newMaxValue) {
    var currentMinValue = minValue;
    var currentMaxValue = maxValue; // if min value wasn't yet selected use range start

    if (minValue === undefined && rangeStart !== null) {
      currentMinValue = rangeStart; // setMinValue(rangeStart);
    } // if max value wasn't yet selected use range end


    if (maxValue === undefined && rangeEnd !== null) {
      currentMaxValue = rangeEnd;
    }

    if (currentMinValue === undefined || currentMaxValue === undefined) {
      return;
    }

    if (currentMinValue !== newMinValue && newMinValue <= currentMaxValue) {
      if (rangeMin !== null && newMinValue <= rangeMin) {
        currentMinValue = rangeMin;
      } else {
        currentMinValue = newMinValue;
      }
    }

    if (currentMaxValue !== newMaxValue && newMaxValue >= currentMinValue) {
      if (rangeMax !== null && newMaxValue >= rangeMax) {
        currentMaxValue = rangeMax;
      } else {
        currentMaxValue = newMaxValue;
      }
    }

    setFacetValues(currentMinValue, currentMaxValue);
  }

  function setFacetValues(minVal, maxVal) {
    if (minVal === undefined || maxVal === undefined || isNaN(minVal) || isNaN(maxVal)) {
      return;
    }

    setMinValue(minVal);
    setMaxValue(maxVal);
    var formattedMinVal = replaceHyphen(formatDate$1(new Date(minVal)));
    var formattedMaxVal = replaceHyphen(formatDate$1(new Date(maxVal))); // this selection is sent to hawk separated by commas, so build the value here

    var selection = "".concat(formattedMinVal, ",").concat(formattedMaxVal);
    actor.setFacets([selection]);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement(React__default.Suspense, {
    fallback: /*#__PURE__*/React__default.createElement("div", null, "Loading...")
  }, /*#__PURE__*/React__default.createElement(SliderCalendarInputs, {
    min: rangeMin,
    max: rangeMax,
    values: [minValue === undefined ? rangeStart : Math.max(minValue, rangeMin), maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax)],
    onValueChange: onValueChange
  }), /*#__PURE__*/React__default.createElement(Rheostat, {
    min: rangeMin,
    max: rangeMax,
    values: [Math.floor(minValue === undefined ? rangeStart : Math.max(minValue, rangeMin)), Math.ceil(maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax))],
    onValuesUpdated: onSliderDrag,
    onChange: onSliderValueChange
  }))));
}

/**
 * react-number-format - 4.5.5
 * Author : Sudhanshu Yadav
 * Copyright (c) 2016, 2021 to Sudhanshu Yadav, released under the MIT license.
 * https://github.com/s-yadav/react-number-format
 */

function createCommonjsModule$1(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule$1(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

//     

                                                               

// basic noop function
function noop$1() {}
function returnTrue() {
  return true;
}

function charIsNumber(char         ) {
  return !!(char || '').match(/\d/);
}

function isNil(val     ) {
  return val === null || val === undefined;
}

function escapeRegExp(str        ) {
  return str.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&');
}

function getThousandsGroupRegex(thousandsGroupStyle        ) {
  switch (thousandsGroupStyle) {
    case 'lakh':
      return /(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;
    case 'wan':
      return /(\d)(?=(\d{4})+(?!\d))/g;
    case 'thousand':
    default:
      return /(\d)(?=(\d{3})+(?!\d))/g;
  }
}

function applyThousandSeparator(
  str        ,
  thousandSeparator        ,
  thousandsGroupStyle        
) {
  var thousandsGroupRegex = getThousandsGroupRegex(thousandsGroupStyle);
  var index = str.search(/[1-9]/);
  index = index === -1 ? str.length : index;
  return (
    str.substring(0, index) +
    str.substring(index, str.length).replace(thousandsGroupRegex, '$1' + thousandSeparator)
  );
}

//spilt a float number into different parts beforeDecimal, afterDecimal, and negation
function splitDecimal(numStr        , allowNegative) {
  if ( allowNegative === void 0 ) allowNegative          = true;

  var hasNagation = numStr[0] === '-';
  var addNegation = hasNagation && allowNegative;
  numStr = numStr.replace('-', '');

  var parts = numStr.split('.');
  var beforeDecimal = parts[0];
  var afterDecimal = parts[1] || '';

  return {
    beforeDecimal: beforeDecimal,
    afterDecimal: afterDecimal,
    hasNagation: hasNagation,
    addNegation: addNegation,
  };
}

function fixLeadingZero(numStr         ) {
  if (!numStr) { return numStr; }
  var isNegative = numStr[0] === '-';
  if (isNegative) { numStr = numStr.substring(1, numStr.length); }
  var parts = numStr.split('.');
  var beforeDecimal = parts[0].replace(/^0+/, '') || '0';
  var afterDecimal = parts[1] || '';

  return ("" + (isNegative ? '-' : '') + beforeDecimal + (afterDecimal ? ("." + afterDecimal) : ''));
}

/**
 * limit decimal numbers to given scale
 * Not used .fixedTo because that will break with big numbers
 */
function limitToScale(numStr        , scale        , fixedDecimalScale         ) {
  var str = '';
  var filler = fixedDecimalScale ? '0' : '';
  for (var i = 0; i <= scale - 1; i++) {
    str += numStr[i] || filler;
  }
  return str;
}

function repeat(str, count) {
  return Array(count + 1).join(str)
}

function toNumericString(num) {  
  num += ''; // typecast number to string

  // store the sign and remove it from the number.
  var sign = num[0] === '-' ? '-' : '';
  if (sign) { num = num.substring(1); }

  // split the number into cofficient and exponent
  var ref = num.split(/[eE]/g);
  var coefficient = ref[0];
  var exponent = ref[1];

  // covert exponent to number;
  exponent = Number(exponent);

  // if there is no exponent part or its 0, return the coffiecient with sign
  if (!exponent) { return sign + coefficient; }

  coefficient = coefficient.replace('.', '');

  /**
   * for scientific notation the current decimal index will be after first number (index 0)
   * So effective decimal index will always be 1 + exponent value
   */
  var decimalIndex = 1 + exponent;

  var coffiecientLn = coefficient.length;

  if (decimalIndex < 0) {
    // if decimal index is less then 0 add preceding 0s
    // add 1 as join will have 
    coefficient = '0.' + repeat('0', Math.abs(decimalIndex)) + coefficient;
  } else if (decimalIndex >= coffiecientLn) {
    // if decimal index is less then 0 add leading 0s
    coefficient = coefficient + repeat('0', decimalIndex - coffiecientLn);
  } else {
    // else add decimal point at proper index
    coefficient = (coefficient.substring(0, decimalIndex) || '0') + '.' + coefficient.substring(decimalIndex);
  }

  return sign + coefficient;
}

/**
 * This method is required to round prop value to given scale.
 * Not used .round or .fixedTo because that will break with big numbers
 */
function roundToPrecision(numStr        , scale        , fixedDecimalScale         ) {
  //if number is empty don't do anything return empty string
  if (['', '-'].indexOf(numStr) !== -1) { return numStr; }

  var shoudHaveDecimalSeparator = numStr.indexOf('.') !== -1 && scale;
  var ref = splitDecimal(numStr);
  var beforeDecimal = ref.beforeDecimal;
  var afterDecimal = ref.afterDecimal;
  var hasNagation = ref.hasNagation;
  var floatValue = parseFloat(("0." + (afterDecimal || '0')));
  var floatValueStr =
    afterDecimal.length <= scale ? toNumericString(floatValue) : floatValue.toFixed(scale);
  var roundedDecimalParts = floatValueStr.split('.');
  var intPart = beforeDecimal
    .split('')
    .reverse()
    .reduce(function (roundedStr, current, idx) {
      if (roundedStr.length > idx) {
        return (
          (Number(roundedStr[0]) + Number(current)).toString() +
          roundedStr.substring(1, roundedStr.length)
        );
      }
      return current + roundedStr;
    }, roundedDecimalParts[0]);

  var decimalPart = limitToScale(
    roundedDecimalParts[1] || '',
    Math.min(scale, afterDecimal.length),
    fixedDecimalScale
  );
  var negation = hasNagation ? '-' : '';
  var decimalSeparator = shoudHaveDecimalSeparator ? '.' : '';
  return ("" + negation + intPart + decimalSeparator + decimalPart);
}

function omit(obj        , keyMaps        ) {
  var filteredObj = {};
  Object.keys(obj).forEach(function (key) {
    if (!keyMaps[key]) { filteredObj[key] = obj[key]; }
  });
  return filteredObj;
}

/** set the caret positon in an input field **/
function setCaretPosition(el                  , caretPos        ) {
  el.value = el.value;
  // ^ this is used to not only get 'focus', but
  // to make sure we don't have it everything -selected-
  // (it causes an issue in chrome, and having it doesn't hurt any other browser)
  if (el !== null) {
    if (el.createTextRange) {
      var range = el.createTextRange();
      range.move('character', caretPos);
      range.select();
      return true;
    }
    // (el.selectionStart === 0 added for Firefox bug)
    if (el.selectionStart || el.selectionStart === 0) {
      el.focus();
      el.setSelectionRange(caretPos, caretPos);
      return true;
    }

    // fail city, fortunately this never happens (as far as I've tested) :)
    el.focus();
    return false;
  }
}

/**
  Given previous value and newValue it returns the index
  start - end to which values have changed.
  This function makes assumption about only consecutive
  characters are changed which is correct assumption for caret input.
*/
function findChangedIndex(prevValue        , newValue        ) {
  var i = 0,
    j = 0;
  var prevLength = prevValue.length;
  var newLength = newValue.length;
  while (prevValue[i] === newValue[i] && i < prevLength) { i++; }

  //check what has been changed from last
  while (
    prevValue[prevLength - 1 - j] === newValue[newLength - 1 - j] &&
    newLength - j > i &&
    prevLength - j > i
  ) {
    j++;
  }

  return { start: i, end: prevLength - j };
}

/*
  Returns a number whose value is limited to the given range
*/
function clamp(num        , min        , max        ) {
  return Math.min(Math.max(num, min), max);
}

function getCurrentCaretPosition(el                  ) {
  /*Max of selectionStart and selectionEnd is taken for the patch of pixel and other mobile device caret bug*/
  return Math.max(el.selectionStart, el.selectionEnd);
}

function addInputMode(format                                   ) {
  return format || !(navigator.platform && /iPhone|iPod/.test(navigator.platform));
}

//     


var propTypes$1 = {
  thousandSeparator: propTypes.oneOfType([propTypes.string, propTypes.oneOf([true])]),
  decimalSeparator: propTypes.string,
  allowedDecimalSeparators: propTypes.arrayOf(propTypes.string),
  thousandsGroupStyle: propTypes.oneOf(['thousand', 'lakh', 'wan']),
  decimalScale: propTypes.number,
  fixedDecimalScale: propTypes.bool,
  displayType: propTypes.oneOf(['input', 'text']),
  prefix: propTypes.string,
  suffix: propTypes.string,
  format: propTypes.oneOfType([
    propTypes.string,
    propTypes.func
  ]),
  removeFormatting: propTypes.func,
  mask: propTypes.oneOfType([propTypes.string, propTypes.arrayOf(propTypes.string)]),
  value: propTypes.oneOfType([
    propTypes.number,
    propTypes.string
  ]),
  defaultValue: propTypes.oneOfType([
    propTypes.number,
    propTypes.string
  ]),
  isNumericString: propTypes.bool,
  customInput: propTypes.elementType,
  allowNegative: propTypes.bool,
  allowEmptyFormatting: propTypes.bool,
  allowLeadingZeros: propTypes.bool,
  onValueChange: propTypes.func,
  onKeyDown: propTypes.func,
  onMouseUp: propTypes.func,
  onChange: propTypes.func,
  onFocus: propTypes.func,
  onBlur: propTypes.func,
  type: propTypes.oneOf(['text', 'tel', 'password']),
  isAllowed: propTypes.func,
  renderText: propTypes.func,
  getInputRef: propTypes.oneOfType([
    propTypes.func, // for legacy refs
    propTypes.shape({ current: propTypes.any })
  ])
};

var defaultProps = {
  displayType: 'input',
  decimalSeparator: '.',
  thousandsGroupStyle: 'thousand',
  fixedDecimalScale: false,
  prefix: '',
  suffix: '',
  allowNegative: true,
  allowEmptyFormatting: false,
  allowLeadingZeros: false,
  isNumericString: false,
  type: 'text',
  onValueChange: noop$1,
  onChange: noop$1,
  onKeyDown: noop$1,
  onMouseUp: noop$1,
  onFocus: noop$1,
  onBlur: noop$1,
  isAllowed: returnTrue
};
var NumberFormat = /*@__PURE__*/(function (superclass) {
  function NumberFormat(props        ) {
    superclass.call(this, props);

    var defaultValue = props.defaultValue;

    //validate props
    this.validateProps();

    var formattedValue = this.formatValueProp(defaultValue);

    this.state = {
      value: formattedValue,
      numAsString: this.removeFormatting(formattedValue),
      mounted: false,
    };

    this.selectionBeforeInput = {
      selectionStart: 0,
      selectionEnd: 0
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  if ( superclass ) NumberFormat.__proto__ = superclass;
  NumberFormat.prototype = Object.create( superclass && superclass.prototype );
  NumberFormat.prototype.constructor = NumberFormat;

  NumberFormat.prototype.componentDidMount = function componentDidMount () {
    // set mounted state
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      mounted: true
    });
  };

  NumberFormat.prototype.componentDidUpdate = function componentDidUpdate (prevProps        ) {
    this.updateValueIfRequired(prevProps);
  };

  NumberFormat.prototype.componentWillUnmount = function componentWillUnmount () {
    clearTimeout(this.focusTimeout);
  };

  NumberFormat.prototype.updateValueIfRequired = function updateValueIfRequired (prevProps        ) {
    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var focusedElm = ref.focusedElm;
    var stateValue = state.value;
    var lastNumStr = state.numAsString; if ( lastNumStr === void 0 ) lastNumStr = '';

    // If only state changed no need to do any thing
    if(prevProps !== props) {
      //validate props
      this.validateProps();

      var lastValueWithNewFormat = this.formatNumString(lastNumStr);

      var formattedValue = isNil(props.value) ? lastValueWithNewFormat : this.formatValueProp();
      var numAsString = this.removeFormatting(formattedValue);

      var floatValue = parseFloat(numAsString);
      var lastFloatValue = parseFloat(lastNumStr);

      if (
        //while typing set state only when float value changes
        ((!isNaN(floatValue) || !isNaN(lastFloatValue)) && floatValue !== lastFloatValue) ||
        //can also set state when float value is same and the format props changes
        lastValueWithNewFormat !== stateValue ||
        //set state always when not in focus and formatted value is changed
        (focusedElm === null && formattedValue !== stateValue)
      ) {
        this.updateValue({ formattedValue: formattedValue, numAsString: numAsString, input: focusedElm });
      }
    }
  };

  /** Misc methods **/
  NumberFormat.prototype.getFloatString = function getFloatString (num) {
    if ( num === void 0 ) num         = '';

    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    var numRegex = this.getNumberRegex(true);

    //remove negation for regex check
    var hasNegation = num[0] === '-';
    if(hasNegation) { num = num.replace('-', ''); }

    //if decimal scale is zero remove decimal and number after decimalSeparator
    if (decimalSeparator && decimalScale === 0) {
      num = num.split(decimalSeparator)[0];
    }

    num  = (num.match(numRegex) || []).join('').replace(decimalSeparator, '.');

    //remove extra decimals
    var firstDecimalIndex = num.indexOf('.');

    if (firstDecimalIndex !== -1) {
      num = (num.substring(0, firstDecimalIndex)) + "." + (num.substring(firstDecimalIndex + 1, num.length).replace(new RegExp(escapeRegExp(decimalSeparator), 'g'), ''));
    }

    //add negation back
    if(hasNegation) { num = '-' + num; }

    return num;
  };

  //returned regex assumes decimalSeparator is as per prop
  NumberFormat.prototype.getNumberRegex = function getNumberRegex (g         , ignoreDecimalSeparator          ) {
    var ref = this.props;
    var format = ref.format;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    return new RegExp('\\d' + (decimalSeparator && decimalScale !== 0 && !ignoreDecimalSeparator && !format ? '|' + escapeRegExp(decimalSeparator) : ''), g ? 'g' : undefined);
  };

  NumberFormat.prototype.getSeparators = function getSeparators () {
    var ref = this.props;
    var decimalSeparator = ref.decimalSeparator;
    var ref$1 = this.props;
    var thousandSeparator = ref$1.thousandSeparator;
    var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;

    if (thousandSeparator === true) {
      thousandSeparator = ',';
    }
    if (!allowedDecimalSeparators) {
      allowedDecimalSeparators = [decimalSeparator, '.'];
    }

    return {
      decimalSeparator: decimalSeparator,
      thousandSeparator: thousandSeparator,
      allowedDecimalSeparators: allowedDecimalSeparators,
    }
  };

  NumberFormat.prototype.getMaskAtIndex = function getMaskAtIndex (index        ) {
    var ref = this.props;
    var mask = ref.mask; if ( mask === void 0 ) mask = ' ';
    if (typeof mask === 'string') {
      return mask;
    }

    return mask[index] || ' ';
  };

  NumberFormat.prototype.getValueObject = function getValueObject (formattedValue        , numAsString        ) {
    var floatValue = parseFloat(numAsString);

    return {
      formattedValue: formattedValue,
      value: numAsString,
      floatValue: isNaN(floatValue) ? undefined : floatValue
    };

  };

  NumberFormat.prototype.validateProps = function validateProps () {
    var ref = this.props;
    var mask = ref.mask;

    //validate decimalSeparator and thousandSeparator
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;
    var thousandSeparator = ref$1.thousandSeparator;

    if (decimalSeparator === thousandSeparator) {
      throw new Error(("\n          Decimal separator can't be same as thousand separator.\n          thousandSeparator: " + thousandSeparator + " (thousandSeparator = {true} is same as thousandSeparator = \",\")\n          decimalSeparator: " + decimalSeparator + " (default value for decimalSeparator is .)\n       "));
    }

    //validate mask
    if (mask) {
      var maskAsStr = mask === 'string' ? mask : mask.toString();
      if (maskAsStr.match(/\d/g)) {
        throw new Error(("\n          Mask " + mask + " should not contain numeric character;\n        "))
      }
    }

  };
  /** Misc methods end **/

  /** caret specific methods **/
  NumberFormat.prototype.setPatchedCaretPosition = function setPatchedCaretPosition (el                  , caretPos        , currentValue        ) {
    /* setting caret position within timeout of 0ms is required for mobile chrome,
    otherwise browser resets the caret position after we set it
    We are also setting it without timeout so that in normal browser we don't see the flickering */
    setCaretPosition(el, caretPos);
    setTimeout(function () {
      if(el.value === currentValue) { setCaretPosition(el, caretPos); }
    }, 0);
  };

  /* This keeps the caret within typing area so people can't type in between prefix or suffix */
  NumberFormat.prototype.correctCaretPosition = function correctCaretPosition (value        , caretPos        , direction         ) {
    var ref = this.props;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var format = ref.format;

    //if value is empty return 0
    if (value === '') { return 0; }

    //caret position should be between 0 and value length
    caretPos = clamp(caretPos, 0, value.length);

    //in case of format as number limit between prefix and suffix
    if (!format) {
      var hasNegation = value[0] === '-';
      return clamp(caretPos, prefix.length + (hasNegation ? 1 : 0), value.length - suffix.length);
    }

    //in case if custom format method don't do anything
    if (typeof format === 'function') { return caretPos; }

    /* in case format is string find the closest # position from the caret position */

    //in case the caretPos have input value on it don't do anything
    if (format[caretPos] === '#' && charIsNumber(value[caretPos])) { return caretPos; }

    //if caretPos is just after input value don't do anything
    if (format[caretPos - 1] === '#' && charIsNumber(value[caretPos - 1])) { return caretPos; }

    //find the nearest caret position
    var firstHashPosition = format.indexOf('#');
    var lastHashPosition = format.lastIndexOf('#');

    //limit the cursor between the first # position and the last # position
    caretPos = clamp(caretPos, firstHashPosition, lastHashPosition + 1);

    var nextPos = format.substring(caretPos, format.length).indexOf('#');
    var caretLeftBound = caretPos;
    var caretRightBound = caretPos + (nextPos === -1 ? 0 : nextPos);

    //get the position where the last number is present
    while (caretLeftBound > firstHashPosition && (format[caretLeftBound] !== '#' || !charIsNumber(value[caretLeftBound]))) {
      caretLeftBound -= 1;
    }

    var goToLeft = !charIsNumber(value[caretRightBound])
    || (direction === 'left' && caretPos !== firstHashPosition)
    || (caretPos - caretLeftBound < caretRightBound - caretPos);

    if (goToLeft) {
      //check if number should be taken after the bound or after it
      //if number preceding a valid number keep it after
      return charIsNumber(value[caretLeftBound]) ? caretLeftBound + 1 : caretLeftBound;
    }

    return caretRightBound;
  };

  NumberFormat.prototype.getCaretPosition = function getCaretPosition (inputValue        , formattedValue        , caretPos        ) {
    var ref = this.props;
    var format = ref.format;
    var stateValue = this.state.value;
    var numRegex = this.getNumberRegex(true);
    var inputNumber = (inputValue.match(numRegex) || []).join('');
    var formattedNumber = (formattedValue.match(numRegex) || []).join('');
    var j, i;

    j = 0;

    for(i=0; i<caretPos; i++){
      var currentInputChar = inputValue[i] || '';
      var currentFormatChar = formattedValue[j] || '';
      //no need to increase new cursor position if formatted value does not have those characters
      //case inputValue = 1a23 and formattedValue =  123
      if(!currentInputChar.match(numRegex) && currentInputChar !== currentFormatChar) { continue; }

      //When we are striping out leading zeros maintain the new cursor position
      //Case inputValue = 00023 and formattedValue = 23;
      if (currentInputChar === '0' && currentFormatChar.match(numRegex) && currentFormatChar !== '0' && inputNumber.length !== formattedNumber.length) { continue; }

      //we are not using currentFormatChar because j can change here
      while(currentInputChar !== formattedValue[j] && j < formattedValue.length) { j++; }
      j++;
    }

    if ((typeof format === 'string' && !stateValue)) {
      //set it to the maximum value so it goes after the last number
      j = formattedValue.length;
    }

    //correct caret position if its outside of editable area
    j = this.correctCaretPosition(formattedValue, j);

    return j;
  };
  /** caret specific methods ends **/


  /** methods to remove formattting **/
  NumberFormat.prototype.removePrefixAndSuffix = function removePrefixAndSuffix (val        ) {
    var ref = this.props;
    var format = ref.format;
    var prefix = ref.prefix;
    var suffix = ref.suffix;

    //remove prefix and suffix
    if (!format && val) {
      var isNegative = val[0] === '-';

      //remove negation sign
      if (isNegative) { val = val.substring(1, val.length); }

      //remove prefix
      val = prefix && val.indexOf(prefix) === 0 ? val.substring(prefix.length, val.length) : val;

      //remove suffix
      var suffixLastIndex = val.lastIndexOf(suffix);
      val = suffix && suffixLastIndex !== -1 && suffixLastIndex === val.length - suffix.length ? val.substring(0, suffixLastIndex) : val;

      //add negation sign back
      if (isNegative) { val = '-' + val; }
    }

    return val;
  };

  NumberFormat.prototype.removePatternFormatting = function removePatternFormatting (val        ) {
    var ref = this.props;
    var format = ref.format;
    var formatArray = format.split('#').filter(function (str) { return str !== ''; });
    var start = 0;
    var numStr = '';

    for (var i=0, ln=formatArray.length; i <= ln; i++) {
      var part = formatArray[i] || '';

      //if i is the last fragment take the index of end of the value
      //For case like +1 (911) 911 91 91 having pattern +1 (###) ### ## ##
      var index = i === ln ? val.length : val.indexOf(part, start);

      /* in any case if we don't find the pattern part in the value assume the val as numeric string
      This will be also in case if user has started typing, in any other case it will not be -1
      unless wrong prop value is provided */
      if (index === -1) {
        numStr = val;
        break;
      } else {
        numStr += val.substring(start, index);
        start = index + part.length;
      }
    }

    return (numStr.match(/\d/g) || []).join('');
  };

  NumberFormat.prototype.removeFormatting = function removeFormatting (val        ) {
    var ref = this.props;
    var format = ref.format;
    var removeFormatting = ref.removeFormatting;
    if (!val) { return val; }

    if (!format) {
      val = this.removePrefixAndSuffix(val);
      val = this.getFloatString(val);
    } else if (typeof format === 'string') {
      val = this.removePatternFormatting(val);
    } else if (typeof removeFormatting === 'function') { //condition need to be handled if format method is provide,
      val = removeFormatting(val);
    } else {
      val = (val.match(/\d/g) || []).join('');
    }
    return val;
  };
  /** methods to remove formattting end **/


  /*** format specific methods start ***/
  /**
   * Format when # based string is provided
   * @param  {string} numStr Numeric String
   * @return {string}        formatted Value
   */
  NumberFormat.prototype.formatWithPattern = function formatWithPattern (numStr        ) {
    var ref = this.props;
    var format = ref.format;
    var hashCount = 0;
    var formattedNumberAry = format.split('');
    for (var i = 0, ln = format.length; i < ln; i++) {
      if (format[i] === '#') {
        formattedNumberAry[i] = numStr[hashCount] || this.getMaskAtIndex(hashCount);
        hashCount += 1;
      }
    }
    return formattedNumberAry.join('');
  };
  /**
   * @param  {string} numStr Numeric string/floatString] It always have decimalSeparator as .
   * @return {string} formatted Value
   */
  NumberFormat.prototype.formatAsNumber = function formatAsNumber (numStr        ) {
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var allowNegative = ref.allowNegative;
    var thousandsGroupStyle = ref.thousandsGroupStyle;
    var ref$1 = this.getSeparators();
    var thousandSeparator = ref$1.thousandSeparator;
    var decimalSeparator = ref$1.decimalSeparator;

    var hasDecimalSeparator = numStr.indexOf('.') !== -1 || (decimalScale && fixedDecimalScale);
    var ref$2 = splitDecimal(numStr, allowNegative);
    var beforeDecimal = ref$2.beforeDecimal;
    var afterDecimal = ref$2.afterDecimal;
    var addNegation = ref$2.addNegation; // eslint-disable-line prefer-const

    //apply decimal precision if its defined
    if (decimalScale !== undefined) { afterDecimal = limitToScale(afterDecimal, decimalScale, fixedDecimalScale); }

    if(thousandSeparator) {
      beforeDecimal = applyThousandSeparator(beforeDecimal, thousandSeparator, thousandsGroupStyle);
    }

    //add prefix and suffix
    if(prefix) { beforeDecimal = prefix + beforeDecimal; }
    if(suffix) { afterDecimal = afterDecimal + suffix; }

    //restore negation sign
    if (addNegation) { beforeDecimal = '-' + beforeDecimal; }

    numStr = beforeDecimal + (hasDecimalSeparator && decimalSeparator ||  '') + afterDecimal;

    return numStr;
  };

  NumberFormat.prototype.formatNumString = function formatNumString (numStr) {
    if ( numStr === void 0 ) numStr         = '';

    var ref = this.props;
    var format = ref.format;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var formattedValue = numStr;

    if (numStr === '' && !allowEmptyFormatting) {
      formattedValue = '';
    } else if (numStr === '-' && !format) {
      formattedValue = '-';
    } else if (typeof format === 'string') {
      formattedValue = this.formatWithPattern(formattedValue);
    } else if (typeof format === 'function') {
      formattedValue = format(formattedValue);
    } else {
      formattedValue = this.formatAsNumber(formattedValue);
    }

    return formattedValue;
  };

  NumberFormat.prototype.formatValueProp = function formatValueProp (defaultValue               ) {
    var ref = this.props;
    var format = ref.format;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var allowEmptyFormatting = ref.allowEmptyFormatting;
    var ref$1 = this.props;
    var value = ref$1.value;
    var isNumericString = ref$1.isNumericString;

    // if value is undefined or null, use defaultValue instead
    value = isNil(value) ? defaultValue : value;

    var isNonNumericFalsy = !value && value !== 0;

    if (isNonNumericFalsy && allowEmptyFormatting) {
      value = '';
    }

    // if value is not defined return empty string
    if (isNonNumericFalsy && !allowEmptyFormatting) { return ''; }

    if (typeof value === 'number') {
      value = toNumericString(value);
      isNumericString = true;
    }

    //change infinity value to empty string
    if (value === 'Infinity' && isNumericString) {
      value = '';
    }

    //round the number based on decimalScale
    //format only if non formatted value is provided
    if (isNumericString && !format && typeof decimalScale === 'number') {
      value = roundToPrecision(value, decimalScale, fixedDecimalScale);
    }

    var formattedValue = isNumericString ? this.formatNumString(value) : this.formatInput(value);

    return formattedValue;
  };

  NumberFormat.prototype.formatNegation = function formatNegation (value) {
    if ( value === void 0 ) value         = '';

    var ref = this.props;
    var allowNegative = ref.allowNegative;
    var negationRegex = new RegExp('(-)');
    var doubleNegationRegex = new RegExp('(-)(.)*(-)');

    // Check number has '-' value
    var hasNegation = negationRegex.test(value);

    // Check number has 2 or more '-' values
    var removeNegation = doubleNegationRegex.test(value);

    //remove negation
    value = value.replace(/-/g, '');

    if (hasNegation && !removeNegation && allowNegative) {
      value = '-' + value;
    }

    return value;
  };

  NumberFormat.prototype.formatInput = function formatInput (value) {
    if ( value === void 0 ) value         = '';

    var ref = this.props;
    var format = ref.format;

    //format negation only if we are formatting as number
    if (!format) {
      value = this.removePrefixAndSuffix(value);
      value = this.formatNegation(value);
    }

    //remove formatting from number
    value = this.removeFormatting(value);

    return this.formatNumString(value);
  };

  /*** format specific methods end ***/
  NumberFormat.prototype.isCharacterAFormat = function isCharacterAFormat (caretPos        , value        ) {
    var ref = this.props;
    var format = ref.format;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var ref$1 = this.getSeparators();
    var decimalSeparator = ref$1.decimalSeparator;

    //check within format pattern
    if (typeof format === 'string' && format[caretPos] !== '#') { return true; }

    //check in number format
    if (!format && (caretPos < prefix.length
      || caretPos >= value.length - suffix.length
      || (decimalScale && fixedDecimalScale && value[caretPos] === decimalSeparator))
    ) {
      return true;
    }

    return false;
  };

  NumberFormat.prototype.checkIfFormatGotDeleted = function checkIfFormatGotDeleted (start        , end        , value        ) {
    for (var i = start; i < end; i++) {
      if (this.isCharacterAFormat(i, value)) { return true; }
    }
    return false;
  };

  /**
   * This will check if any formatting got removed by the delete or backspace and reset the value
   * It will also work as fallback if android chome keyDown handler does not work
   **/
  NumberFormat.prototype.correctInputValue = function correctInputValue (caretPos        , lastValue        , value        ) {
    var ref = this.props;
    var format = ref.format;
    var allowNegative = ref.allowNegative;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var decimalScale = ref.decimalScale;
    var ref$1 = this.getSeparators();
    var allowedDecimalSeparators = ref$1.allowedDecimalSeparators;
    var decimalSeparator = ref$1.decimalSeparator;
    var lastNumStr = this.state.numAsString || '';
    var ref$2 = this.selectionBeforeInput;
    var selectionStart = ref$2.selectionStart;
    var selectionEnd = ref$2.selectionEnd;
    var ref$3 = findChangedIndex(lastValue, value);
    var start = ref$3.start;
    var end = ref$3.end;

    /** Check for any allowed decimal separator is added in the numeric format and replace it with decimal separator */
    if (!format && start === end && allowedDecimalSeparators.indexOf(value[selectionStart]) !== -1  ) {
      var separator = decimalScale === 0 ? '' : decimalSeparator;
      return value.substr(0, selectionStart) + separator + value.substr(selectionStart + 1, value.length);
    }


    var leftBound = !!format ? 0 : prefix.length;
    var rightBound = lastValue.length - (!!format ? 0 : suffix.length);

    if (
      // don't do anything if something got added
      value.length > lastValue.length ||
      // or if the new value is an empty string 
      !value.length ||
      // or if nothing has changed, in which case start will be same as end
      start === end ||
      // or in case if whole input is selected and new value is typed
      (selectionStart === 0 && selectionEnd === lastValue.length) ||
      // or in case if the whole content is replaced by browser, example (autocomplete)
      (start === 0 && end === lastValue.length) ||
      // or if charcters between prefix and suffix is selected. 
      // For numeric inputs we apply the format so, prefix and suffix can be ignored
      (selectionStart === leftBound && selectionEnd === rightBound)
    ) {
      return value;
    }

    //if format got deleted reset the value to last value
    if (this.checkIfFormatGotDeleted(start, end, lastValue)) {
      value = lastValue;
    }

    //for numbers check if beforeDecimal got deleted and there is nothing after decimal,
    //clear all numbers in such case while keeping the - sign
    if (!format) {
      var numericString = this.removeFormatting(value);
      var ref$4 = splitDecimal(numericString, allowNegative);
      var beforeDecimal = ref$4.beforeDecimal;
      var afterDecimal = ref$4.afterDecimal;
      var addNegation = ref$4.addNegation; // eslint-disable-line prefer-const

      //clear only if something got deleted
      var isBeforeDecimalPoint = caretPos < value.indexOf(decimalSeparator) + 1;
      if (numericString.length < lastNumStr.length && isBeforeDecimalPoint && beforeDecimal === '' && !parseFloat(afterDecimal)) {
        return addNegation ? '-' : '';
      }
    }

    return value;
  };

  /** Update value and caret position */
  NumberFormat.prototype.updateValue = function updateValue (params   
                             
                          
                         
                              
                       
                                
     
  ) {
    var formattedValue = params.formattedValue;
    var input = params.input;
    var setCaretPosition = params.setCaretPosition; if ( setCaretPosition === void 0 ) setCaretPosition = true;
    var numAsString = params.numAsString;
    var caretPos = params.caretPos;
    var ref = this.props;
    var onValueChange = ref.onValueChange;
    var ref$1 = this.state;
    var lastValue = ref$1.value;

    if (input) {
      //set caret position, and value imperatively when element is provided
      if (setCaretPosition) {

        //calculate caret position if not defined
        if (!caretPos) {
          var inputValue = params.inputValue || input.value;

          var currentCaretPosition = getCurrentCaretPosition(input);

          /**
           * set the value imperatively, this is required for IE fix
           * This is also required as if new caret position is beyond the previous value.
           * Caret position will not be set correctly
           */
          input.value = formattedValue;

          //get the caret position
          caretPos = this.getCaretPosition(inputValue, formattedValue, currentCaretPosition);
        }

        //set caret position
        this.setPatchedCaretPosition(input, caretPos, formattedValue);
      } else {
        /**
         * if we are not setting caret position set the value imperatively.
         * This is required on onBlur method
         */
        input.value = formattedValue;
      }
    }


    //calculate numeric string if not passed
    if (numAsString === undefined) {
      numAsString = this.removeFormatting(formattedValue);
    }

    //update state if value is changed
    if (formattedValue !== lastValue) {
      this.setState({ value : formattedValue, numAsString: numAsString });

      // trigger onValueChange synchronously, so parent is updated along with the number format. Fix for #277, #287
      onValueChange(this.getValueObject(formattedValue, numAsString));
    }
  };

  NumberFormat.prototype.onChange = function onChange (e                     ) {
    var el = e.target;
    var inputValue = el.value;
    var ref = this;
    var state = ref.state;
    var props = ref.props;
    var isAllowed = props.isAllowed;
    var lastValue = state.value || '';

    var currentCaretPosition = getCurrentCaretPosition(el);

    inputValue =  this.correctInputValue(currentCaretPosition, lastValue, inputValue);

    var formattedValue = this.formatInput(inputValue) || '';
    var numAsString = this.removeFormatting(formattedValue);

    var valueObj = this.getValueObject(formattedValue, numAsString);
    var isChangeAllowed = isAllowed(valueObj);

    if (!isChangeAllowed) {
      formattedValue = lastValue;
    }

    this.updateValue({ formattedValue: formattedValue, numAsString: numAsString, inputValue: inputValue, input: el });

    if(isChangeAllowed) {
      props.onChange(e);
    }
  };

  NumberFormat.prototype.onBlur = function onBlur (e                     ) {
    var ref = this;
    var props = ref.props;
    var state = ref.state;
    var format = props.format;
    var onBlur = props.onBlur;
    var allowLeadingZeros = props.allowLeadingZeros;
    var numAsString = state.numAsString;
    var lastValue = state.value;
    this.focusedElm = null;

    clearTimeout(this.focusTimeout);


    if (!format) {
      // if the numAsString is not a valid number reset it to empty
      if (isNaN(parseFloat(numAsString))) {
        numAsString = '';
      }

      if (!allowLeadingZeros) {
        numAsString = fixLeadingZero(numAsString);
      }

      var formattedValue = this.formatNumString(numAsString);

      //change the state
      if (formattedValue !== lastValue) {
        // the event needs to be persisted because its properties can be accessed in an asynchronous way
        this.updateValue({ formattedValue: formattedValue, numAsString: numAsString, input: e.target, setCaretPosition: false });
        onBlur(e);
        return;
      }
    }
    onBlur(e);
  };

  NumberFormat.prototype.onKeyDown = function onKeyDown (e                             ) {
    var el = e.target;
    var key = e.key;
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value; if ( value === void 0 ) value = '';
    var expectedCaretPosition;
    var ref = this.props;
    var decimalScale = ref.decimalScale;
    var fixedDecimalScale = ref.fixedDecimalScale;
    var prefix = ref.prefix;
    var suffix = ref.suffix;
    var format = ref.format;
    var onKeyDown = ref.onKeyDown;
    var ignoreDecimalSeparator = decimalScale !== undefined && fixedDecimalScale;
    var numRegex = this.getNumberRegex(false, ignoreDecimalSeparator);
    var negativeRegex = new RegExp('-');
    var isPatternFormat = typeof format === 'string';

    this.selectionBeforeInput = {
      selectionStart: selectionStart,
      selectionEnd: selectionEnd
    };

    //Handle backspace and delete against non numerical/decimal characters or arrow keys
    if (key === 'ArrowLeft' || key === 'Backspace') {
      expectedCaretPosition = selectionStart - 1;
    } else if (key === 'ArrowRight') {
      expectedCaretPosition = selectionStart + 1;
    } else if (key === 'Delete') {
      expectedCaretPosition = selectionStart;
    }

    //if expectedCaretPosition is not set it means we don't want to Handle keyDown
    //also if multiple characters are selected don't handle
    if (expectedCaretPosition === undefined || selectionStart !== selectionEnd) {
      onKeyDown(e);
      return;
    }

    var newCaretPosition = expectedCaretPosition;
    var leftBound = isPatternFormat ? format.indexOf('#') : prefix.length;
    var rightBound = isPatternFormat ? format.lastIndexOf('#') + 1 : value.length - suffix.length;

    if (key === 'ArrowLeft' || key === 'ArrowRight') {
      var direction = key === 'ArrowLeft' ? 'left' : 'right';
      newCaretPosition = this.correctCaretPosition(value, expectedCaretPosition, direction);
    } else if (key === 'Delete' && !numRegex.test(value[expectedCaretPosition]) && !negativeRegex.test(value[expectedCaretPosition])) {
      while (!numRegex.test(value[newCaretPosition]) && newCaretPosition < rightBound) { newCaretPosition++; }
    } else if (key === 'Backspace' && !numRegex.test(value[expectedCaretPosition])) {
      /* NOTE: This is special case when backspace is pressed on a
      negative value while the cursor position is after prefix. We can't handle it on onChange because
      we will not have any information of keyPress
      */
      if (selectionStart <= leftBound + 1 && value[0] === '-' && typeof format === 'undefined') {
        var newValue = value.substring(1);
        this.updateValue({formattedValue: newValue, caretPos: newCaretPosition, input: el});
      } else if (!negativeRegex.test(value[expectedCaretPosition])) {
        while (!numRegex.test(value[newCaretPosition - 1]) && newCaretPosition > leftBound){ newCaretPosition--; }
        newCaretPosition = this.correctCaretPosition(value, newCaretPosition, 'left');
      }
    }


    if (newCaretPosition !== expectedCaretPosition || expectedCaretPosition < leftBound || expectedCaretPosition > rightBound) {
      e.preventDefault();
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }

    /* NOTE: this is just required for unit test as we need to get the newCaretPosition,
            Remove this when you find different solution */
    if (e.isUnitTestRun) {
      this.setPatchedCaretPosition(el, newCaretPosition, value);
    }


    onKeyDown(e);

  };

  /** required to handle the caret position when click anywhere within the input **/
  NumberFormat.prototype.onMouseUp = function onMouseUp (e                          ) {
    var el = e.target;

    /**
     * NOTE: we have to give default value for value as in case when custom input is provided
     * value can come as undefined when nothing is provided on value prop.
    */
    var selectionStart = el.selectionStart;
    var selectionEnd = el.selectionEnd;
    var value = el.value; if ( value === void 0 ) value = '';

    if (selectionStart === selectionEnd) {
      var caretPosition = this.correctCaretPosition(value, selectionStart);
      if (caretPosition !== selectionStart) {
        this.setPatchedCaretPosition(el, caretPosition, value);
      }
    }

    this.props.onMouseUp(e);
  };

  NumberFormat.prototype.onFocus = function onFocus (e                     ) {
    var this$1 = this;

    // Workaround Chrome and Safari bug https://bugs.chromium.org/p/chromium/issues/detail?id=779328
    // (onFocus event target selectionStart is always 0 before setTimeout)
    e.persist();

    this.focusedElm = e.target;
    this.focusTimeout = setTimeout(function () {
      var el = e.target;
      var selectionStart = el.selectionStart;
      var selectionEnd = el.selectionEnd;
      var value = el.value; if ( value === void 0 ) value = '';

      var caretPosition = this$1.correctCaretPosition(value, selectionStart);

      //setPatchedCaretPosition only when everything is not selected on focus (while tabbing into the field)
      if (caretPosition !== selectionStart && !(selectionStart === 0 && selectionEnd === value.length)) {
        this$1.setPatchedCaretPosition(el, caretPosition, value);
      }

      this$1.props.onFocus(e);
    }, 0);
  };

  NumberFormat.prototype.render = function render () {
    var ref = this.props;
    var type = ref.type;
    var displayType = ref.displayType;
    var customInput = ref.customInput;
    var renderText = ref.renderText;
    var getInputRef = ref.getInputRef;
    var format = ref.format;
    var ref$1 = this.state;
    var value = ref$1.value;
    var mounted = ref$1.mounted;

    var otherProps = omit(this.props, propTypes$1);

    // add input mode on element based on format prop and device once the component is mounted 
    var inputMode = mounted && addInputMode(format) ? 'numeric' : undefined;

    var inputProps = Object.assign({ inputMode: inputMode }, otherProps, {
      type: type,
      value: value,
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
      onMouseUp: this.onMouseUp,
      onFocus: this.onFocus,
      onBlur: this.onBlur
    });

    if( displayType === 'text'){
      return renderText ? (renderText(value, otherProps) || null) : React__default.createElement( 'span', Object.assign({}, otherProps, { ref: getInputRef }), value);
    }

    else if (customInput) {
      var CustomInput = customInput;
      return (
        React__default.createElement( CustomInput, Object.assign({},
          inputProps, { ref: getInputRef }))
      )
    }

    return (
      React__default.createElement( 'input', Object.assign({},
        inputProps, { ref: getInputRef }))
    )
  };

  return NumberFormat;
}(React__default.Component));

NumberFormat.propTypes = propTypes$1;
NumberFormat.defaultProps = defaultProps;

function SliderNumericInputs(sliderProps) {
  var _useState = useState(''),
      _useState2 = _slicedToArray$1(_useState, 2),
      minValue = _useState2[0],
      setMinValue = _useState2[1];

  var _useState3 = useState(''),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxValue = _useState4[0],
      setMaxValue = _useState4[1];

  function onMinUpdate(values) {
    var formattedValue = values.formattedValue,
        value = values.value;
    var newMinValue = Number(value);

    if (isNaN(newMinValue) || minValue === value) {
      return;
    }

    setMinValue(value);
  }

  function onMaxUpdate(values) {
    var formattedValue = values.formattedValue,
        value = values.value;
    var newMaxValue = Number(value);

    if (isNaN(newMaxValue) || maxValue === value) {
      return;
    }

    setMaxValue(value);
  }

  function reloadFacets(event) {
    sliderProps.onValueChange(Number(minValue), Number(maxValue));
  }

  useEffect(function () {
    setMinValue(sliderProps.values[0].toString());
    setMaxValue(sliderProps.values[1].toString());
  }, [sliderProps]);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-sliderNumeric"
  }, /*#__PURE__*/React__default.createElement(NumberFormat, {
    thousandSeparator: sliderProps.isCurrency,
    prefix: sliderProps.isCurrency ? sliderProps.currencySymbol : '',
    value: minValue,
    className: "hawk-numericInput numeric-from",
    min: sliderProps.min,
    max: sliderProps.max,
    onValueChange: onMinUpdate,
    onBlur: reloadFacets,
    decimalScale: sliderProps.decimalPrecision
  }), /*#__PURE__*/React__default.createElement(NumberFormat, {
    thousandSeparator: sliderProps.isCurrency,
    prefix: sliderProps.isCurrency ? sliderProps.currencySymbol : '',
    value: maxValue,
    className: "hawk-numericInput numeric-to",
    min: sliderProps.min,
    max: sliderProps.max,
    onValueChange: onMaxUpdate,
    onBlur: reloadFacets,
    decimalScale: sliderProps.decimalPrecision
  }));
}

var Rheostat$1 = /*#__PURE__*/React__default.lazy(function () {
  return import(
  /* webpackChunkName: "rheostat" */
  'rheostat');
});

function SliderNumeric() {
  var _useHawksearch = useHawksearch(),
      facetSelections = _useHawksearch.store.facetSelections;

  var _useFacet = useFacet(),
      _useFacet$state = _useFacet.state,
      facetValues = _useFacet$state.facetValues,
      decimalPrecision = _useFacet$state.decimalPrecision,
      facet = _useFacet.facet,
      actor = _useFacet.actor; // the range of the slider is defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;

  var _useState = useState(range && Number(parseFloat(range.RangeMin || '').toFixed(2))),
      _useState2 = _slicedToArray$1(_useState, 2),
      rangeMin = _useState2[0],
      setMinRange = _useState2[1];

  var _useState3 = useState(range && Number(parseFloat(range.RangeMax || '').toFixed(2))),
      _useState4 = _slicedToArray$1(_useState3, 2),
      rangeMax = _useState4[0],
      setMaxRange = _useState4[1];

  var _useState5 = useState(range && Number(parseFloat(range.RangeStart || '').toFixed(2))),
      _useState6 = _slicedToArray$1(_useState5, 2),
      rangeStart = _useState6[0],
      setStartRange = _useState6[1];

  var _useState7 = useState(range && Number(parseFloat(range.RangeEnd || '').toFixed(2))),
      _useState8 = _slicedToArray$1(_useState7, 2),
      rangeEnd = _useState8[0],
      setEndRange = _useState8[1]; // if there's no range, initialize to zeros


  var _useState9 = useState(),
      _useState10 = _slicedToArray$1(_useState9, 2),
      minValue = _useState10[0],
      setMinValue = _useState10[1];

  var _useState11 = useState(),
      _useState12 = _slicedToArray$1(_useState11, 2),
      maxValue = _useState12[0],
      setMaxValue = _useState12[1];

  var _useState13 = useState(facet.IsCurrency),
      _useState14 = _slicedToArray$1(_useState13, 2),
      isCurency = _useState14[0],
      setIsCurrency = _useState14[1];

  var _useState15 = useState(facet.CurrencySymbol),
      _useState16 = _slicedToArray$1(_useState15, 2),
      currencySymbol = _useState16[0],
      setCurrencySymbol = _useState16[1];

  useEffect(function () {
    setCurrencySymbol(facet.CurrencySymbol || '$');
    setIsCurrency(facet.IsCurrency);
  }, [facet]);
  useEffect(function () {
    var paramName = facet.ParamName || facet.Field; // clear min and max value if these were cleared

    if (!paramName || !(paramName in facetSelections)) {
      setMinValue(undefined);
      setMaxValue(undefined);
    } else if (paramName in facetSelections && facetSelections[paramName].items && facetSelections[paramName].items.length > 0) {
      var selectedValues = facetSelections[paramName].items[0].value.split(',');
      setMinValue(Number(selectedValues[0]));
      setMaxValue(Number(selectedValues[1]));
    }
  }, [facetSelections]);
  useEffect(function () {
    var newRange = facetValues.length > 0 ? facetValues[0] : null;
    setMinRange(newRange && Number(parseFloat(newRange.RangeMin || '').toFixed(2)));
    setMaxRange(newRange && Number(parseFloat(newRange.RangeMax || '').toFixed(2)));
    setStartRange(newRange && Number(parseFloat(newRange.RangeStart || '').toFixed(2)));
    setEndRange(newRange && Number(parseFloat(newRange.RangeEnd || '').toFixed(2)));
  }, [facetValues]);

  if (rangeMin === null || isNaN(rangeMin) || rangeMax === null || isNaN(rangeMax) || rangeStart === null || isNaN(rangeStart) || rangeEnd === null || isNaN(rangeEnd)) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function onSliderValueChange(state) {
    var _state$values = _slicedToArray$1(state.values, 2),
        newMin = _state$values[0],
        newMax = _state$values[1];

    setFacetValues(newMin, newMax);
  }

  function onValueChange(newMinValue, newMaxValue) {
    var currentMinValue = minValue;
    var currentMaxValue = maxValue; // if min value wasn't yet selected use range start

    if (minValue === undefined && rangeStart !== null) {
      currentMinValue = rangeStart; // setMinValue(rangeStart);
    } // if max value wasn't yet selected use range end


    if (maxValue === undefined && rangeEnd !== null) {
      currentMaxValue = rangeEnd;
    }

    if (currentMinValue === undefined || currentMaxValue === undefined) {
      return;
    }

    if (currentMinValue !== newMinValue && newMinValue <= currentMaxValue) {
      if (rangeMin !== null && newMinValue <= rangeMin) {
        currentMinValue = rangeMin;
      } else {
        currentMinValue = newMinValue;
      }
    }

    if (currentMaxValue !== newMaxValue && newMaxValue >= currentMinValue) {
      if (rangeMax !== null && newMaxValue >= rangeMax) {
        currentMaxValue = rangeMax;
      } else {
        currentMaxValue = newMaxValue;
      }
    }

    setMinValue(currentMinValue);
    setMaxValue(currentMaxValue);
    setFacetValues(currentMinValue, currentMaxValue);
  }

  function setFacetValues(minVal, maxVal) {
    if (minVal === undefined || maxVal === undefined || isNaN(minVal) || isNaN(maxVal)) {
      return;
    }

    setMinValue(minVal);
    setMaxValue(maxVal); // this selection is sent to hawk separated by commas, so build the value here

    var selection = "".concat(minVal, ",").concat(maxVal);
    actor.setFacets([selection]);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement(React__default.Suspense, {
    fallback: /*#__PURE__*/React__default.createElement("div", null, "Loading...")
  }, /*#__PURE__*/React__default.createElement(SliderNumericInputs, {
    min: rangeMin,
    max: rangeMax,
    currencySymbol: currencySymbol,
    isCurrency: isCurency,
    values: [minValue === undefined ? rangeStart : Math.max(minValue, rangeMin), maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax)],
    onValueChange: onValueChange,
    decimalPrecision: decimalPrecision
  }), /*#__PURE__*/React__default.createElement(Rheostat$1, {
    min: rangeMin,
    max: rangeMax,
    values: [Math.floor(minValue === undefined ? rangeStart : Math.max(minValue, rangeMin)), Math.ceil(maxValue === undefined ? rangeEnd : Math.min(maxValue, rangeMax))],
    onChange: onSliderValueChange
  }))));
}

function Slider() {
  var _useFacet = useFacet(),
      facet = _useFacet.facet;

  if (facet.DataType && facet.DataType === 'datetime') {
    return /*#__PURE__*/React__default.createElement(SliderDate, null);
  }

  return /*#__PURE__*/React__default.createElement(SliderNumeric, null);
}

function SwatchItem(item) {
  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var facetValue = item.swatchValue.Value || ''; // facets can be selected or negated, so explicitly check that the facet is not selected

  var swatchUrl = config.dashboardUrl + (!item.facetSwatch.AssetUrl ? item.facetSwatch.AssetName : item.facetSwatch.AssetUrl);
  var colorSwatchStyle = {
    backgroundColor: item.facetSwatch.Color
  };
  var listItemClassNames = 'hawk-facet-rail__facet-list-item' + (item.isSelected ? ' hawkFacet-active' : '') + (item.isNegated ? ' hawkFacet-negative' : '');
  return /*#__PURE__*/React__default.createElement("li", {
    key: item.facetSwatch.Value,
    className: listItemClassNames
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick(e) {
      return item.onSwatchSelected(facetValue, false);
    },
    className: "hawk-facet-rail__facet-btn hawk-styleSwatch",
    "aria-pressed": item.isSelected
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-selectionInner"
  }, item.isColor ? /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-swatchColor",
    style: colorSwatchStyle,
    title: item.facetSwatch.Value
  }) : /*#__PURE__*/React__default.createElement("img", {
    src: swatchUrl,
    alt: item.facetSwatch.Value
  }))), /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-negativeIcon"
  }, /*#__PURE__*/React__default.createElement("i", {
    className: "hawkIcon-blocked",
    onClick: function onClick(e) {
      return item.onSwatchSelected(facetValue, true);
    }
  })));
}

function Swatch$1() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      actor = _useFacet.actor,
      facetValues = _useFacet.state.facetValues,
      renderer = _useFacet.renderer;

  function onSwatchSelected(facetValue, isNegated) {
    isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-swatch"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facet.SwatchData && facetValues.map(function (value) {
    var facetValue = value.Value || ''; // find swatch that is corresponding with value

    var facetSwatch = facet.SwatchData && facet.SwatchData.find(function (s) {
      return s.Value.toLowerCase() === facetValue.toLowerCase();
    });

    if (!facetSwatch) {
      return;
    }

    var selectionState = store.isFacetSelected(facet, value).state;
    var isNegated = selectionState === FacetSelectionState.Negated;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    var isColor = !!facetSwatch.Color;
    return /*#__PURE__*/React__default.createElement(SwatchItem, {
      key: facetValue,
      swatchValue: value,
      facetSwatch: facetSwatch,
      isSelected: isSelected,
      isColor: isColor,
      isNegated: isNegated,
      onSwatchSelected: onSwatchSelected
    });
  }))), renderer.renderTruncation());
}

function NestedItem(item) {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet;

  var _useState = useState(false),
      _useState2 = _slicedToArray$1(_useState, 2),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var _useState3 = useState(facet.shouldTruncate),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isTruncated = _useState4[0],
      setIsTruncated = _useState4[1];

  var hierarchyValue = item.hierarchyValue || '';
  var hierarchyChildren = item.hierarchyValue.Children || [];
  var remainingValues = 0;
  var shouldTruncateChildren = facet.DisplayType === 'truncating' && hierarchyChildren.length > facet.TruncateThreshold;

  if (shouldTruncateChildren && isTruncated) {
    var valuesBeforeTrunc = hierarchyChildren.length;
    hierarchyChildren = hierarchyChildren.slice(0, facet.TruncateThreshold);
    remainingValues = valuesBeforeTrunc - facet.TruncateThreshold;
  }

  function renderChildTruncation() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, shouldTruncateChildren && /*#__PURE__*/React__default.createElement("li", {
      className: "hawk-facet-rail__facet-list-item hawk-show-more"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return setIsTruncated(!isTruncated);
      },
      className: "hawk-facet-rail__show-more-btn"
    }, isTruncated ? "(+) Show ".concat(remainingValues, " More") : '(-) Show Less')));
  }

  return /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-facet-rail__facet-list-item hawkFacet-group"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawkFacet-group__inline"
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      return item.onValueSelected(hierarchyValue, false);
    },
    className: "hawk-facet-rail__facet-btn",
    "aria-pressed": item.isSelected
  }, /*#__PURE__*/React__default.createElement("span", {
    className: item.isSelected ? 'hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox--checked' : 'hawk-facet-rail__facet-checkbox'
  }, item.isSelected ? /*#__PURE__*/React__default.createElement(CheckmarkSVG, {
    "class": "hawk-facet-rail__facet-checkbox-icon"
  }) : null), /*#__PURE__*/React__default.createElement("span", {
    style: item.isNegated ? {
      textDecoration: 'line-through'
    } : undefined,
    className: "hawk-facet-rail__facet-name"
  }, item.hierarchyValue.Label, " (", item.hierarchyValue.Count, ")")), /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick(e) {
      return item.onValueSelected(hierarchyValue, true);
    },
    className: "hawk-facet-rail__facet-btn-exclude"
  }, item.isNegated ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PlusCircleSVG, {
    "class": "hawk-facet-rail__facet-btn-include"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Include facet")) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DashCircleSVG, null), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Exclude facet"))), hierarchyChildren.length > 0 ? /*#__PURE__*/React__default.createElement("button", {
    className: isExpanded ? 'hawk-collapseState' : 'hawk-collapseState collapsed',
    "aria-expanded": "false",
    onClick: function onClick() {
      return setIsExpanded(!isExpanded);
    }
  }, "\xA0") : null), isExpanded && hierarchyChildren ? /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__w-100"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawkFacet-group-inside"
  }, hierarchyChildren.map(function (value) {
    var selectionState = store.isFacetSelected(facet, value).state;
    var isNegated = selectionState === FacetSelectionState.Negated;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    return /*#__PURE__*/React__default.createElement(NestedItem, {
      key: value.Path,
      hierarchyValue: value,
      isSelected: isSelected,
      isNegated: isNegated,
      onValueSelected: item.onValueSelected
    });
  }), renderChildTruncation())) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null));
}

function Nested() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  function onValueSelected(facetValue, isNegated) {
    isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-checkbox"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facetValues.map(function (value) {
    // facets can be selected or negated, so explicitly check that the facet is not selected
    var selectionState = store.isFacetSelected(facet, value).state;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    var isNegated = selectionState === FacetSelectionState.Negated;
    return /*#__PURE__*/React__default.createElement(NestedItem, {
      key: value.Value,
      hierarchyValue: value,
      isSelected: isSelected,
      isNegated: isNegated,
      onValueSelected: onValueSelected
    });
  }))), renderer.renderTruncation());
}

var moment = createCommonjsModule(function (module, exports) {
(function (global, factory) {
     module.exports = factory() ;
}(commonjsGlobal, (function () {
    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            'object' !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = commonjsRequire;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));
});

function replaceHyphen$1(date) {
  if (!date) {
    return date;
  }

  return date.replace(/-/g, '/');
}

function OpenRangeDatetime() {
  var _useHawksearch = useHawksearch(),
      hawkActor = _useHawksearch.actor;

  var _useHawksearch2 = useHawksearch(),
      facetSelections = _useHawksearch2.store.facetSelections;

  var _useFacet = useFacet(),
      facetValues = _useFacet.state.facetValues,
      facet = _useFacet.facet,
      actor = _useFacet.actor;

  var daterange = facetValues.length > 0 ? facetValues[0] : null;
  var rangeStartDate = daterange && daterange.RangeStart ? moment(daterange.RangeStart).format('YYYY-MM-DDTHH:mm') : '';
  var rangeEndDate = daterange && daterange.RangeEnd ? moment(daterange.RangeEnd).format('YYYY-MM-DDTHH:mm') : ''; // if there's no range, initialize to empty strings

  var _useState = useState(rangeStartDate || ''),
      _useState2 = _slicedToArray$1(_useState, 2),
      minDateValue = _useState2[0],
      setdateStartValue = _useState2[1];

  var _useState3 = useState(rangeEndDate || ''),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxDateValue = _useState4[0],
      setdateEndValue = _useState4[1]; // the open range boundary values are defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;
  var rangeStart = range && range.RangeStart || '';
  var rangeEnd = range && range.RangeEnd || '';
  useEffect(function () {
    var paramName = facet.ParamName || facet.Field; // Set min and max value if these were cleared

    if (!paramName || !(paramName in facetSelections)) {
      setdateStartValue(rangeStartDate);
      setdateEndValue(rangeEndDate);
    } else if (paramName in facetSelections && facetSelections[paramName].items && facetSelections[paramName].items.length > 0) {
      var selectedValues = facetSelections[paramName].items[0].value.split(',');
      setdateStartValue(selectedValues[0].replace(/\//g, '-'));
      setdateEndValue(selectedValues[1].replace(/\//g, '-'));
    }
  }, [facetSelections]);

  if (rangeStart === null || rangeEnd === null) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  function ondateRangeStartChange(event) {
    setdateFacetValues(event.currentTarget.value, maxDateValue);
  }

  function ondateRangeEndChange(event) {
    setdateFacetValues(minDateValue, event.currentTarget.value);
  }

  function setdateFacetValues(startVal, endVal) {
    setdateStartValue(startVal);
    setdateEndValue(endVal); // this selection is sent to hawk separated by commas, so build the value here

    if (startVal === '' && endVal === '') {
      hawkActor.clearFacet(facet);
    } else {
      var selection = "".concat(replaceHyphen$1(startVal), ",").concat(replaceHyphen$1(endVal));
      actor.setFacets([selection]);
    }
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-open-range hawk-facet-type-date"
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "datetime-local",
    className: "hawk-text-input hawk-date-value-start",
    value: minDateValue,
    min: rangeStartDate,
    max: rangeEndDate,
    onChange: ondateRangeStartChange
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "datetime-local",
    className: "hawk-text-input hawk-date-value-end",
    value: maxDateValue,
    min: rangeStartDate,
    max: rangeEndDate,
    onChange: ondateRangeEndChange
  }))));
}

function OpenRangeNumber() {
  var _useHawksearch = useHawksearch(),
      hawkActor = _useHawksearch.actor;

  var _useFacet = useFacet(),
      facetValues = _useFacet.state.facetValues,
      facet = _useFacet.facet,
      actor = _useFacet.actor; // the open range boundary values are defined by the first facet value. or null if there is no first value


  var range = facetValues.length > 0 ? facetValues[0] : null;
  var rangeStart = range && range.RangeStart || '';
  var rangeEnd = range && range.RangeEnd || ''; // if there's no range, initialize to empty strings

  var _useState = useState(rangeStart || ''),
      _useState2 = _slicedToArray$1(_useState, 2),
      minValue = _useState2[0],
      setStartValue = _useState2[1];

  var _useState3 = useState(rangeEnd || ''),
      _useState4 = _slicedToArray$1(_useState3, 2),
      maxValue = _useState4[0],
      setEndValue = _useState4[1];

  function onRangeStartChange(event) {
    setFacetValues(event.currentTarget.value, maxValue);
  }

  function onRangeEndChange(event) {
    setFacetValues(minValue, event.currentTarget.value);
  }

  function setFacetValues(startVal, endVal) {
    setStartValue(startVal);
    setEndValue(endVal); // this selection is sent to hawk separated by commas, so build the value here

    if (startVal === '' && endVal === '') {
      hawkActor.clearFacet(facet);
    } else {
      var selection = "".concat(startVal, ",").concat(endVal);
      actor.setFacets([selection]);
    }
  }

  if (rangeStart === null || rangeEnd === null) {
    // this facet is somehow misconfigured so don't render
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-link"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-open-range"
  }, /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    className: "hawk-text-input value-start",
    "data-type": "currency",
    value: minValue,
    onChange: onRangeStartChange
  }), /*#__PURE__*/React__default.createElement("input", {
    type: "text",
    className: "hawk-text-input value-end",
    onChange: onRangeEndChange,
    value: maxValue
  }))));
}

function OpenRange() {
  var _useFacet = useFacet(),
      facet = _useFacet.facet;

  if (facet.DataType && facet.DataType === 'datetime') {
    return /*#__PURE__*/React__default.createElement(OpenRangeDatetime, null);
  }

  return /*#__PURE__*/React__default.createElement(OpenRangeNumber, null);
}

function NestedLinkItem(item) {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet;

  var _useState = useState(false),
      _useState2 = _slicedToArray$1(_useState, 2),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var _useState3 = useState(facet.shouldTruncate),
      _useState4 = _slicedToArray$1(_useState3, 2),
      isTruncated = _useState4[0],
      setIsTruncated = _useState4[1];

  var hierarchyValue = item.hierarchyValue || '';
  var hierarchyChildren = item.hierarchyValue.Children || [];
  var remainingValues = 0;
  var shouldTruncateChildren = facet.DisplayType === 'truncating' && hierarchyChildren.length > facet.TruncateThreshold;

  if (shouldTruncateChildren && isTruncated) {
    var valuesBeforeTrunc = hierarchyChildren.length;
    hierarchyChildren = hierarchyChildren.slice(0, facet.TruncateThreshold);
    remainingValues = valuesBeforeTrunc - facet.TruncateThreshold;
  }

  function renderChildTruncation() {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, shouldTruncateChildren && /*#__PURE__*/React__default.createElement("li", {
      className: "hawk-facet-rail__facet-list-item hawk-show-more"
    }, /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return setIsTruncated(!isTruncated);
      },
      className: "hawk-facet-rail__show-more-btn"
    }, isTruncated ? "(+) Show ".concat(remainingValues, " More") : '(-) Show Less')));
  }

  return /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-facet-rail__facet-list-item hawkFacet-group"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawkFacet-group__inline"
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      return item.onValueSelected(hierarchyValue, false);
    },
    className: "hawk-facet-rail__facet-btn",
    "aria-pressed": item.isSelected
  }, /*#__PURE__*/React__default.createElement("span", {
    style: item.isNegated ? {
      textDecoration: 'line-through'
    } : undefined,
    className: item.isSelected ? 'hawk-facet-rail__facet-name checked' : 'hawk-facet-rail__facet-name'
  }, item.hierarchyValue.Label, " (", item.hierarchyValue.Count, ")")), hierarchyChildren.length > 0 ? /*#__PURE__*/React__default.createElement("button", {
    className: isExpanded ? 'hawk-collapseState hawk-linklist' : 'hawk-collapseState hawk-linklist collapsed',
    "aria-expanded": "false",
    onClick: function onClick() {
      return setIsExpanded(!isExpanded);
    }
  }, "\xA0") : null), isExpanded && hierarchyChildren ? /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__w-100"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawkFacet-group-inside"
  }, hierarchyChildren.map(function (value) {
    var selectionState = store.isFacetSelected(facet, value).state;
    var isNegated = selectionState === FacetSelectionState.Negated;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    return /*#__PURE__*/React__default.createElement(NestedLinkItem, {
      key: value.Path,
      hierarchyValue: value,
      isSelected: isSelected,
      isNegated: isNegated,
      onValueSelected: item.onValueSelected
    });
  }), renderChildTruncation())) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null));
}

function NestedLink() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useFacet = useFacet(),
      facet = _useFacet.facet,
      facetValues = _useFacet.state.facetValues,
      actor = _useFacet.actor,
      renderer = _useFacet.renderer;

  function onValueSelected(facetValue, isNegated) {
    isNegated ? actor.negateFacet(facetValue) : actor.selectFacet(facetValue);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-linklist"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, facetValues.map(function (value) {
    // facets can be selected or negated, so explicitly check that the facet is not selected
    var selectionState = store.isFacetSelected(facet, value).state;
    var isSelected = selectionState !== FacetSelectionState.NotSelected;
    var isNegated = selectionState === FacetSelectionState.Negated;
    return /*#__PURE__*/React__default.createElement(NestedLinkItem, {
      key: value.Value,
      hierarchyValue: value,
      isSelected: isSelected,
      isNegated: isNegated,
      onValueSelected: onValueSelected
    });
  }))), renderer.renderTruncation());
}

var FacetType;

(function (FacetType) {
  FacetType["Checkbox"] = "checkbox";
  FacetType["NestedCheckbox"] = "nestedcheckbox";
  FacetType["Link"] = "link";
  FacetType["Nestedlink"] = "nestedlinklist";
  FacetType["Slider"] = "slider";
  FacetType["Swatch"] = "swatch";
  FacetType["Rating"] = "rating";
  FacetType["Size"] = "size";
  FacetType["SearchWithin"] = "search";
  FacetType["RecentSearches"] = "recentsearches";
  FacetType["RelatedSearches"] = "relatedsearches";
  FacetType["OpenRange"] = "openRange";
})(FacetType || (FacetType = {}));

var defaultFacetComponents = [{
  facetType: FacetType.Checkbox,
  component: Checkbox
}, {
  facetType: FacetType.NestedCheckbox,
  component: Nested
}, {
  facetType: FacetType.SearchWithin,
  component: Search
}, {
  facetType: FacetType.Link,
  component: Link
}, {
  facetType: FacetType.Slider,
  component: Slider
}, {
  facetType: FacetType.Swatch,
  component: Swatch$1
}, {
  facetType: FacetType.OpenRange,
  component: OpenRange
}, {
  facetType: FacetType.Nestedlink,
  component: NestedLink
}];
var defaultAutocompleteStrategies = [{
  SuggestionType: SuggestionType.Product,
  SuggestionStrategy: new ProductStrategy()
}, {
  SuggestionType: SuggestionType.Category,
  SuggestionStrategy: new CategoryStrategy()
}, {
  SuggestionType: SuggestionType.Popular,
  SuggestionStrategy: new PopularStrategy()
}, {
  SuggestionType: SuggestionType.Content,
  SuggestionStrategy: new ContentStrategy()
}];
/**
 * Builds a list of all supported facet components by also taking into consideration overridden components.
 */

function getFacetComponents(overridedComponents) {
  var facetComponents = []; // tslint:disable-next-line:forin

  var _loop = function _loop(key) {
    var fType = FacetType[key];
    var fComponent = // check to see if the facet is overridden
    overridedComponents.find(function (component) {
      return component.facetType === fType;
    }) || // otherwise, pull from defaults
    defaultFacetComponents.find(function (component) {
      return component.facetType === fType;
    });

    if (fComponent) {
      facetComponents.push(fComponent);
    }
  };

  for (var key in FacetType) {
    _loop(key);
  }

  return facetComponents;
}
/**
 * Builds a list of all supported autocomplete suggestion strategiesby also taking into consideration overridden strategies.
 */

function getAutocompleteStrategies(overridedStrategies) {
  var suggestionStrategies = []; // tslint:disable-next-line:forin

  var _loop2 = function _loop2(key) {
    var sType = SuggestionType[key];
    var autocompleteStrategy = // check to see if the facet is overridden
    overridedStrategies.find(function (strategyMatch) {
      return strategyMatch.SuggestionType === sType;
    }) || // otherwise, pull from defaults
    defaultAutocompleteStrategies.find(function (strategyMatch) {
      return strategyMatch.SuggestionType === sType;
    });

    if (autocompleteStrategy) {
      suggestionStrategies.push(autocompleteStrategy);
    }
  };

  for (var key in SuggestionType) {
    _loop2(key);
  }

  return suggestionStrategies;
}

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SearchBoxBase(_ref) {
  var initialValue = _ref.initialValue,
      onSubmit = _ref.onSubmit,
      onViewMatches = _ref.onViewMatches,
      SuggestionList = _ref.SuggestionList;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var strategies = getAutocompleteStrategies(config.autocompleteStrategies || []);

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      pendingSearch = _useHawksearch$store.pendingSearch,
      searchResults = _useHawksearch$store.searchResults;

  var _useState = useState(''),
      _useState2 = _slicedToArray$1(_useState, 2),
      initialInput = _useState2[0],
      setInitialInput = _useState2[1]; // Will update the suggested selected keyword in the autocomplete input box


  useEffect(function () {
    setInitialInput(decodeURIComponent(pendingSearch.Keyword || ''));
  }, [pendingSearch.Keyword, initialValue, pendingSearch.IgnoreSpellcheck]); // Will update the Adjusted keyword in the autocomplete input box

  useEffect(function () {
    if (searchResults && searchResults.AdjustedKeyword) {
      setInitialInput(decodeURIComponent(searchResults.AdjustedKeyword));
    }
  }, [searchResults]);
  /** Called when the internal state of downshift changes - we're handling a couple custom behaviors here */

  function handleStateChange(state, changes) {
    if ( // NOTE: these strings are hardcoded to support code splitting downshift.
    // using the constants from the package will prevent code splitting from operating correctly
    changes.type === '__autocomplete_mouseup__' || changes.type === '__autocomplete_keydown_enter__' || changes.type === '__autocomplete_click_item__') {
      // when:
      //
      //  1. the mouse the clicked outside of downshift
      //  2. enter is pressed on the keyboard
      //  3. an item is selected from the dropdown
      //
      // then we want to retain the input value that was originally typed in. by default downshift
      // will clear the input value, so we're overriding this behavior here.
      return _objectSpread$5(_objectSpread$5({}, changes), {}, {
        inputValue: state.inputValue
      });
    }

    return changes;
  }
  /** Called when an item has been selected from the autocomplete results. */


  function handleItemChange(item, downshift) {
    if (!item) {
      return;
    }

    var matchedStrategy = strategies.find(function (strategy) {
      return strategy.SuggestionType === item.SuggestionType;
    });

    if (!matchedStrategy) {
      return;
    }

    matchedStrategy.SuggestionStrategy.handleItemChange(item, downshift);
  }

  function handleToString(item) {
    if (!item) {
      return '';
    }

    var matchedStrategy = strategies.find(function (strategy) {
      return strategy.SuggestionType === item.SuggestionType;
    });

    if (!matchedStrategy) {
      return '';
    }

    return matchedStrategy.SuggestionStrategy.toString(item);
  }

  return /*#__PURE__*/React__default.createElement(React__default.Suspense, {
    fallback: /*#__PURE__*/React__default.createElement("div", null, t('Loading'), "...")
  }, /*#__PURE__*/React__default.createElement(Downshift, {
    stateReducer: handleStateChange,
    itemToString: function itemToString(item) {
      return handleToString(item);
    },
    onChange: handleItemChange,
    initialInputValue: decodeURIComponent(initialValue || '')
  }, function (options) {
    var isOpen = options.isOpen,
        inputValue = options.inputValue,
        getInputProps = options.getInputProps,
        openMenu = options.openMenu,
        closeMenu = options.closeMenu;
    var showSuggestions = isOpen && inputValue && inputValue.length > 0;
    return /*#__PURE__*/React__default.createElement("div", {
      className: "hawk__searchBox__searchInput",
      "aria-labelledby": "autocomplete-search-box"
    }, /*#__PURE__*/React__default.createElement("div", {
      id: "autocomplete-search-box",
      className: "hidden-label"
    }, "Autocomplete search box"), /*#__PURE__*/React__default.createElement("input", _extends({
      type: "text",
      style: {
        width: '100%'
      }
    }, getInputProps({
      onKeyDown: function onKeyDown(event) {
        if (onSubmit) {
          onSubmit(event, options);
          closeMenu();
        }
      },
      // when the input is focused again, reopen the downshift menu
      onFocus: function onFocus() {
        if (inputValue && inputValue.length > 0) {
          openMenu();
        }
      },
      placeholder: t('Enter a search term'),
      'aria-labelledby': 'autocomplete-search-box'
    }))), showSuggestions ? /*#__PURE__*/React__default.createElement(SearchSuggestions, {
      query: inputValue || '',
      downshift: options,
      onViewMatches: onViewMatches,
      SuggestionList: SuggestionList
    }) : null);
  }));
}

/**
 * This component is a simple search input box (with autosuggest) that can be placed globally throughout the site.
 * This search box is intended to be used on non-search pages. On search pages, the `SearchBox` component should be
 * used instead.
 */

function GlobalSearchBox() {
  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config;

  var _useHawksearch = useHawksearch(),
      actor = _useHawksearch.actor;

  var searchUrl = config.searchPageUrl;

  function handleSubmit(event, downshift) {
    var inputValue = downshift.inputValue;

    if (event.key === 'Enter') {
      var redirect = "".concat(searchUrl, "?keyword=").concat(inputValue);

      if (config.indexName) {
        redirect += '&indexName=' + config.indexName;
      }

      location.assign(redirect);
    }
  } // On select view all matches from suggestions list


  function handleViewAllMatches(downshift) {
    var inputValue = downshift.inputValue,
        closeMenu = downshift.closeMenu;
    actor.setSearch({
      PageId: undefined,
      CustomUrl: undefined,
      Keyword: inputValue || ''
    });
    closeMenu();
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk hawk__searchBox"
  }, /*#__PURE__*/React__default.createElement(SearchBoxBase, {
    onSubmit: handleSubmit,
    onViewMatches: handleViewAllMatches
  }));
}

function SearchBox(_ref) {
  var SuggestionList = _ref.SuggestionList;

  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store,
      actor = _useHawksearch.actor;

  function handleSubmit(event, downshift) {
    if (event.key === 'Enter') {
      actor.setSearch({
        PageId: undefined,
        CustomUrl: undefined,
        Keyword: encodeURIComponent(event.currentTarget.value),
        FacetSelections: undefined,
        IgnoreSpellcheck: false
      });
    }
  } // On Select view all matches from suggestion list


  function handleViewAllMatches(downshift) {
    var inputValue = downshift.inputValue,
        closeMenu = downshift.closeMenu;
    actor.setSearch({
      PageId: undefined,
      CustomUrl: undefined,
      Keyword: inputValue || ''
    });
    closeMenu();
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk__searchBox"
  }, /*#__PURE__*/React__default.createElement(SearchBoxBase, {
    onViewMatches: handleViewAllMatches,
    initialValue: store && store.pendingSearch ? store.pendingSearch.Keyword : '',
    onSubmit: handleSubmit,
    SuggestionList: SuggestionList
  }));
}

function CompareTiles(_ref) {
  var imageURL = _ref.imageURL,
      itemName = _ref.itemName,
      onSelectTiles = _ref.onSelectTiles,
      item = _ref.item;

  if (item && onSelectTiles) {
    return /*#__PURE__*/React__default.createElement("div", {
      onClick: function onClick() {
        return onSelectTiles(item);
      },
      className: "hawk__compare-tiles"
    }, imageURL && /*#__PURE__*/React__default.createElement("img", {
      src: imageURL,
      alt: itemName
    }));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk__compare-tiles"
  }, imageURL && /*#__PURE__*/React__default.createElement("img", {
    src: imageURL,
    alt: itemName
  }));
}

function CompareItems(_ref2) {
  var itemsList = _ref2.itemsList,
      onSelectCompareItems = _ref2.onSelectCompareItems,
      clearItems = _ref2.clearItems,
      onSelectTiles = _ref2.onSelectTiles;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk__compare-container"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk__compare-container__list"
  }, _toConsumableArray(Array(5)).map(function (_, index) {
    if (itemsList && itemsList.length && itemsList[index]) {
      var imageURL = itemsList[index].getDocumentValue('image');
      var itemName = itemsList[index].getDocumentValue('itemname');
      return /*#__PURE__*/React__default.createElement(CompareTiles, {
        onSelectTiles: onSelectTiles,
        imageURL: imageURL || '',
        itemName: itemName || '',
        item: itemsList[index],
        key: index
      });
    }

    return /*#__PURE__*/React__default.createElement(CompareTiles, {
      onSelectTiles: onSelectTiles,
      imageURL: '',
      itemName: '',
      key: index
    });
  })), /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("button", {
    disabled: itemsList.length < 2,
    onClick: function onClick() {
      return onSelectCompareItems();
    },
    className: "hawk-btn hawk-btn-primary-outline"
  }, "Compare"), /*#__PURE__*/React__default.createElement("button", {
    onClick: function onClick() {
      return clearItems();
    },
    className: "hawk-btn hawk-btn-primary-outline"
  }, "Clear")));
}

function PlaceholderFacetValue() {
  var _useState = useState(Math.round(Math.random() * (200 - 100) + 100)),
      _useState2 = _slicedToArray$1(_useState, 1),
      width = _useState2[0];

  return /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-facet-rail__facet-list-item"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-facet-rail__facet-checkbox hawk-facet-rail__facet-checkbox-placeholder"
  }), /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-facet-rail__facet-btn"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-facet-rail__facet-name"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-name-placeholder",
    style: {
      width: "".concat(width, "px")
    }
  }))));
}

function PlaceholderFacet() {
  var _useState = useState(Math.round(Math.random() * (250 - 125) + 125)),
      _useState2 = _slicedToArray$1(_useState, 1),
      width = _useState2[0];

  var _useState3 = useState(Math.round(Math.random() * (8 - 1) + 1)),
      _useState4 = _slicedToArray$1(_useState3, 1),
      numValues = _useState4[0];

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-heading"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-heading-placeholder",
    style: {
      width: "".concat(width, "px")
    }
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-body"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values hawk-facet-rail__facet-values-placeholder"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-values-checkbox"
  }, /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-facet-rail__facet-list"
  }, _toConsumableArray(Array(numValues)).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PlaceholderFacetValue, {
      key: i
    });
  }))))));
}

function FacetList() {
  var _useHawksearch = useHawksearch(),
      searchResults = _useHawksearch.store.searchResults;

  var _useHawkConfig = useHawkConfig(),
      config = _useHawkConfig.config; // the number of random placeholders to render while we wait for results


  var _useState = useState(Math.round(Math.random() * (5 - 3) + 3)),
      _useState2 = _slicedToArray$1(_useState, 1),
      numPlaceholders = _useState2[0];

  var components = getFacetComponents(config.facetOverrides || []);
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__facet-list"
  }, searchResults ? // if there are search results, render the facets
  searchResults.Facets.map(function (facet) {
    if (!facet.IsVisible) {
      return null;
    }

    if (facet.FieldType === 'tab') {
      return null;
    }

    var registeredComponent = components.find(function (component) {
      return component.facetType === facet.FacetType;
    });
    var Component = !registeredComponent ? null : registeredComponent.component;
    return /*#__PURE__*/React__default.createElement(Facet$1, {
      key: facet.FacetId,
      facet: facet
    }, Component ? /*#__PURE__*/React__default.createElement(Component, null) : /*#__PURE__*/React__default.createElement("div", null, facet.FieldType, " ", facet.FacetType, " is not implemented!"));
  }) : // otherwise render a couple placeholders
  _toConsumableArray(Array(numPlaceholders)).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PlaceholderFacet, {
      key: i
    });
  }));
}

function FacetRail() {
  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__heading"
  }, t('Narrow Results')), /*#__PURE__*/React__default.createElement(FacetList, null));
}

/**
 * X Circle SVG
 *
 * @returns
 */
function XCircleSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 32 32",
    className: 'icon icon-help-header ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    fill: "#d9534f",
    d: "M15.998 0c8.837 0 16 7.163 16 16s-7.163 16-16 16c-8.837 0-16-7.163-16-16v0c0-8.837 7.163-16 16-16v0z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#fff",
    d: "M13.6 11.646l7.171 7.171c0.541 0.541 0.541 1.417 0 1.958l0.002-0.002c-0.541 0.541-1.417 0.541-1.958 0l-7.171-7.171c-0.541-0.541-0.541-1.417 0-1.958l-0.002 0.002c0.541-0.541 1.417-0.541 1.958 0z"
  }), /*#__PURE__*/createElement("path", {
    fill: "#fff",
    d: "M20.774 13.6l-7.174 7.174c-0.54 0.54-1.415 0.54-1.955 0l-0.002-0.002c-0.54-0.54-0.54-1.415 0-1.955l7.174-7.174c0.54-0.54 1.415-0.54 1.955 0l0.002 0.002c0.54 0.54 0.54 1.415 0 1.955z"
  }));
}

function Selections$1() {
  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      facetSelections = _useHawksearch$store.facetSelections,
      pendingSearch = _useHawksearch$store.pendingSearch,
      actor = _useHawksearch.actor;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n; // Added filter to hide selection for Tabs


  var keys = Object.keys(facetSelections).filter(function (key) {
    return key !== 'it';
  });

  if (keys.length === 0) {
    // no selections, so render nothing
    return null;
  }

  function clearSelection(facet, value) {
    if (value) {
      actor.clearFacetValue(facet, value.value);
    } else {
      actor.clearFacet(facet);
    }
  }

  function clearAll() {
    actor.clearAllFacets();
  }

  function renderRange(value, facet) {
    var displayValue = value.value;

    if (!displayValue || displayValue.indexOf(',') === -1) {
      // range facet selection values should include a comma, so if they don't then this likely isn't a valid
      // range value that we want to render
      var selectedRange = facet.Ranges.find(function (range) {
        return range.Value === value.value;
      });
      return selectedRange ? selectedRange.Label : displayValue;
    }

    var splittedValues = displayValue.split(',');

    if (facet.IsCurrency && splittedValues.length > 1) {
      return "".concat(facet.CurrencySymbol, " ").concat(splittedValues[0], " - ").concat(facet.CurrencySymbol, " ").concat(splittedValues[1]);
    } // return a prettier display value for ranges


    return displayValue.replace(',', ' - ');
  }

  function renderLabel(selection, item) {
    if (selection.facet.FacetType === 'openRange' && selection.facet.DataType === 'datetime') {
      var _split = (item.label || ',').split(','),
          _split2 = _slicedToArray$1(_split, 2),
          startDate = _split2[0],
          endDate = _split2[1];

      startDate = moment(startDate.replace(/\//g, '-')).format('LLLL');
      endDate = moment(endDate.replace(/\//g, '-')).format('LLLL');
      return "".concat(startDate, " - ").concat(endDate);
    } else if (selection.facet.FieldType === 'range') {
      return renderRange(item, selection.facet);
    } else if (selection.facet.FacetType === 'search') {
      return decodeURIComponent(item.label);
    }

    return item.label;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__selections"
  }, /*#__PURE__*/React__default.createElement("h4", null, t("You've Selected")), /*#__PURE__*/React__default.createElement("ul", {
    className: "hawk-selections"
  }, keys.map(function (key) {
    var selection = facetSelections[key];
    return /*#__PURE__*/React__default.createElement("li", {
      key: key,
      className: "hawk-selections__category"
    }, /*#__PURE__*/React__default.createElement("div", {
      className: "hawk-selections__category-wrapper"
    }, /*#__PURE__*/React__default.createElement("span", {
      className: "hawk-selections__category-name"
    }, selection.label, ":"), /*#__PURE__*/React__default.createElement("ul", {
      className: "hawk-selections__item-list"
    }, selection.items.map(function (item) {
      var negation = item.value.startsWith('-');
      return /*#__PURE__*/React__default.createElement("li", {
        key: item.value,
        className: "hawk-selections__item"
      }, /*#__PURE__*/React__default.createElement("button", {
        onClick: function onClick() {
          return clearSelection(key, item);
        },
        className: "hawk-selections__item-remove"
      }, /*#__PURE__*/React__default.createElement(XCircleSVG, null), /*#__PURE__*/React__default.createElement("span", {
        className: "visually-hidden"
      }, "Unselect facet ", selection.label, " ", item.label)), /*#__PURE__*/React__default.createElement("span", {
        className: negation ? 'hawk-selections__item-name hawk-selections__item-name--negated' : 'hawk-selections__item-name'
      }, renderLabel(selection, item)));
    }))), /*#__PURE__*/React__default.createElement("button", {
      onClick: function onClick() {
        return clearSelection(key);
      },
      className: "hawk-selections__category-remove"
    }, /*#__PURE__*/React__default.createElement(XCircleSVG, null), ' ', /*#__PURE__*/React__default.createElement("span", {
      className: "visually-hidden"
    }, "Unselect all facets for ", selection.label)));
  }), /*#__PURE__*/React__default.createElement("li", {
    className: "hawk-selections__category"
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: clearAll,
    className: "hawk-btn hawk-btn-primary-outline"
  }, t('Clear All')))));
}

function SearchResultsLabel() {
  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      pendingSearch = _useHawksearch$store.pendingSearch,
      searchResults = _useHawksearch$store.searchResults;

  var _useState = useState(''),
      _useState2 = _slicedToArray$1(_useState, 2),
      keyword = _useState2[0],
      setKeyword = _useState2[1];

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  useEffect(function () {
    if (searchResults && searchResults.AdjustedKeyword) {
      setKeyword(decodeURIComponent(searchResults.AdjustedKeyword));
    } else {
      setKeyword(decodeURIComponent(pendingSearch.Keyword || ''));
    }
  }, [searchResults]);

  if (!pendingSearch.Keyword) {
    // no selections, so render nothing
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-facet-rail__results-label"
  }, /*#__PURE__*/React__default.createElement("h3", null, pendingSearch.Keyword ? t('Search Results for') + ' ' + keyword : t('Search Results')));
}

function Sorting$1() {
  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      searchResults = _useHawksearch$store.searchResults,
      pendingSearch = _useHawksearch$store.pendingSearch,
      actor = _useHawksearch.actor;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  function onChange(event) {
    actor.setSearch({
      SortBy: event.currentTarget.value
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-sorting"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-sorting__label"
  }, t('Sort By')), /*#__PURE__*/React__default.createElement("select", {
    value: pendingSearch.SortBy,
    onChange: onChange
  }, searchResults ? searchResults.Sorting.Items.map(function (sortingItem) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: sortingItem.Value,
      value: sortingItem.Value
    }, sortingItem.Label);
  }) : /*#__PURE__*/React__default.createElement("option", {
    value: "score"
  }, "Best Match")));
}

/**
 * Left chevron SVG
 *
 * @returns
 */
function LeftChevronSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 19 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M18.462 27.891c0.457 0.427 0.742 1.034 0.742 1.707s-0.285 1.279-0.741 1.705l-0.001 0.001c-0.467 0.437-1.097 0.705-1.789 0.705s-1.322-0.268-1.79-0.706l0.002 0.001-14.146-13.598c-0.457-0.427-0.742-1.034-0.742-1.707s0.285-1.28 0.741-1.705l0.001-0.001 14.142-13.589c0.468-0.436 1.097-0.704 1.79-0.704s1.322 0.268 1.791 0.706l-0.002-0.001c0.457 0.427 0.742 1.034 0.742 1.707s-0.285 1.28-0.741 1.705l-0.001 0.001-11.597 11.883z"
  }));
}

/**
 * Right chevron SVG
 *
 * @returns
 */
function RightChevronSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    viewBox: "0 0 19 32",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("path", {
    d: "M0.738 4.109c-0.457-0.427-0.742-1.034-0.742-1.707s0.285-1.28 0.741-1.705l0.001-0.001c0.467-0.437 1.097-0.705 1.789-0.705s1.322 0.268 1.79 0.706l-0.002-0.001 14.146 13.598c0.457 0.427 0.742 1.034 0.742 1.707s-0.285 1.279-0.741 1.705l-0.001 0.001-14.142 13.589c-0.468 0.436-1.097 0.704-1.79 0.704s-1.322-0.268-1.791-0.706l0.002 0.001c-0.457-0.427-0.742-1.034-0.742-1.707s0.285-1.279 0.741-1.705l0.001-0.001 11.597-11.883z"
  }));
}

function Pager(_ref) {
  var page = _ref.page,
      totalPages = _ref.totalPages,
      onPageChange = _ref.onPageChange;

  var _useState = useState(undefined),
      _useState2 = _slicedToArray$1(_useState, 2),
      inputValue = _useState2[0],
      setInputValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray$1(_useState3, 2),
      hasError = _useState4[0],
      setHasError = _useState4[1];

  function goToPreviousPage() {
    goToPage(page - 1);
  }

  function goToNextPage() {
    goToPage(page + 1);
  }

  function goToPage(pageNo) {
    if (isNaN(pageNo)) {
      // not a valid number
      doInputError();
      return;
    }

    if (pageNo < 1) {
      // can't go beyond the first page
      doInputError();
      return;
    }

    if (pageNo > totalPages) {
      // can't go beyond the last page
      doInputError();
      return;
    } // once we've determined that we *do* want to do this page change, clear the user's input
    // because the input should be driven by props again


    setInputValue(undefined); // inform the consumer that we've changed pages

    onPageChange(pageNo);
  }
  /**
   * Returns the input value for the pager input control. If the user has typed in a value into the input then
   * that value will be returned; otherwise, the page value passed in via props will be returned.
   */


  function getInputValue() {
    if (inputValue !== undefined) {
      // if the user typed an input, that's the page value for the control
      return inputValue || '';
    } // otherwise, fall back to what's passed in through props


    return page;
  }

  function onKeyDown(event) {
    var wantedPageNo = parseInt(event.currentTarget.value, 10);

    if (event.key === 'Enter') {
      goToPage(wantedPageNo);
    }
  }

  function onBlur(event) {
    if (Number(event.currentTarget.value) !== page) {
      var wantedPageNo = parseInt(event.currentTarget.value, 10);
      goToPage(wantedPageNo);
    }
  }

  function onKeyPress(event) {
    var keyCode = event.keyCode || event.which;
    var keyValue = String.fromCharCode(keyCode);

    if (keyValue.match(/[+-.e]+/g)) {
      event.preventDefault();
    }
  }

  function onInput(event) {
    var wantedPageNo = parseInt(event.currentTarget.value, 10);

    if (wantedPageNo > totalPages) {
      wantedPageNo = totalPages;
      event.currentTarget.value = '';
      event.preventDefault();
    }

    if (wantedPageNo < 1) {
      wantedPageNo = 1;
      event.currentTarget.value = '';
      event.preventDefault();
    }
  }

  function doInputError() {
    setHasError(true); // in 500ms, clear the error animation

    setTimeout(function () {
      setHasError(false);
    }, 500);
  }

  function onChange(event) {
    setInputValue(event.currentTarget.value);
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-pagination__controls"
  }, /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-pagination__item",
    onClick: goToPreviousPage
  }, /*#__PURE__*/React__default.createElement(LeftChevronSVG, {
    "class": "hawk-pagination__left"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Previous page")), /*#__PURE__*/React__default.createElement("input", {
    type: "number",
    value: getInputValue(),
    onChange: onChange,
    onInput: onInput,
    onKeyDown: onKeyDown,
    onKeyPress: onKeyPress,
    onBlur: onBlur,
    min: "1",
    max: totalPages,
    className: hasError ? 'hawk-pagination__input error' : 'hawk-pagination__input'
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-pagination__total-text"
  }, "\xA0 of ", totalPages), /*#__PURE__*/React__default.createElement("button", {
    className: "hawk-pagination__item",
    onClick: goToNextPage
  }, /*#__PURE__*/React__default.createElement(RightChevronSVG, {
    "class": "hawk-pagination__right"
  }), /*#__PURE__*/React__default.createElement("span", {
    className: "visually-hidden"
  }, "Next page")));
}

function ItemsPerPage() {
  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      searchResults = _useHawksearch$store.searchResults,
      pendingSearch = _useHawksearch$store.pendingSearch,
      actor = _useHawksearch.actor;

  function onChange(event) {
    actor.setSearch({
      MaxPerPage: Number(event.currentTarget.value),
      PageNo: 1 // if we change our max items per page, reset to page 1

    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-items-per-page"
  }, /*#__PURE__*/React__default.createElement("select", {
    value: pendingSearch.MaxPerPage,
    onChange: onChange
  }, searchResults ? searchResults.Pagination.Items.map(function (paginationItem) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: paginationItem.PageSize,
      value: paginationItem.PageSize
    }, paginationItem.Label);
  }) : /*#__PURE__*/React__default.createElement("option", null, "12 Items Per Page")));
}

function Pagination$1() {
  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      searchResults = _useHawksearch$store.searchResults,
      pendingSearch = _useHawksearch$store.pendingSearch,
      actor = _useHawksearch.actor;

  function onPageChange(pageNo) {
    // when the pager's page changes, trigger a new search
    actor.setSearch({
      PageNo: pageNo
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-pagination"
  }, /*#__PURE__*/React__default.createElement(Pager, {
    page: searchResults ? pendingSearch.PageNo || 1 : 0,
    totalPages: searchResults ? searchResults.Pagination.NofPages : 0,
    onPageChange: onPageChange
  }), /*#__PURE__*/React__default.createElement(ItemsPerPage, null));
}

function ToolRow() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-tool-row"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-tool-row__item"
  }, /*#__PURE__*/React__default.createElement(Sorting$1, null)), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-tool-row__item"
  }, /*#__PURE__*/React__default.createElement(Pagination$1, null)));
}

/**
 * Plus SVG
 *
 * @returns
 */
function PlaceHolderSVG(props) {
  return /*#__PURE__*/createElement("svg", {
    x: "0px",
    y: "0px",
    viewBox: "0 0 489.4 489.4",
    className: 'icon ' + props["class"],
    focusable: "false",
    "aria-hidden": "true"
  }, /*#__PURE__*/createElement("g", null, /*#__PURE__*/createElement("g", null, /*#__PURE__*/createElement("path", {
    d: "M0,437.8c0,28.5,23.2,51.6,51.6,51.6h386.2c28.5,0,51.6-23.2,51.6-51.6V51.6c0-28.5-23.2-51.6-51.6-51.6H51.6\r C23.1,0,0,23.2,0,51.6C0,51.6,0,437.8,0,437.8z M437.8,464.9H51.6c-14.9,0-27.1-12.2-27.1-27.1v-64.5l92.8-92.8l79.3,79.3\r c4.8,4.8,12.5,4.8,17.3,0l143.2-143.2l107.8,107.8v113.4C464.9,452.7,452.7,464.9,437.8,464.9z M51.6,24.5h386.2\r c14.9,0,27.1,12.2,27.1,27.1v238.1l-99.2-99.1c-4.8-4.8-12.5-4.8-17.3,0L205.2,333.8l-79.3-79.3c-4.8-4.8-12.5-4.8-17.3,0\r l-84.1,84.1v-287C24.5,36.7,36.7,24.5,51.6,24.5z"
  }), /*#__PURE__*/createElement("path", {
    d: "M151.7,196.1c34.4,0,62.3-28,62.3-62.3s-28-62.3-62.3-62.3s-62.3,28-62.3,62.3S117.3,196.1,151.7,196.1z M151.7,96\r c20.9,0,37.8,17,37.8,37.8s-17,37.8-37.8,37.8s-37.8-17-37.8-37.8S130.8,96,151.7,96z"
  }))));
}

function PlaceholderImage(_ref) {
  var showSpinner = _ref.showSpinner;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-placeholder"
  }, /*#__PURE__*/React__default.createElement(PlaceHolderSVG, {
    "class": "hawk-placeholderSVG"
  }));
}

function PlaceholderItem() {
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-image"
  }, /*#__PURE__*/React__default.createElement(PlaceholderImage, {
    showSpinner: false
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-name"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-name-placeholder"
  })));
}

function Spinner(_ref) {
  var isVisible = _ref.isVisible;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  if (!isVisible) {
    return null;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: 'hawk-modal'
  }, /*#__PURE__*/React__default.createElement("div", {
    className: 'hawk-modal__content'
  }, t('Loading'), "..."));
}

function ResultImage(_ref) {
  var item = _ref.item,
      websiteUrl = _ref.websiteUrl,
      itemTitleFieldName = _ref.itemTitleFieldName,
      imageUrlFieldName = _ref.imageUrlFieldName,
      onLoadCallBack = _ref.onLoadCallBack;

  var _useState = useState(false),
      _useState2 = _slicedToArray$1(_useState, 2),
      imageLoaded = _useState2[0],
      setImageLoaded = _useState2[1];

  var imageUrl = imageUrlFieldName ? item.getDocumentValue(imageUrlFieldName) : item.getDocumentValue('image');

  if (!imageUrl) {
    return null;
  }

  var itemName = itemTitleFieldName ? item.getDocumentValue(itemTitleFieldName) : item.getDocumentValue('itemname');
  var absoluteUrlTester = new RegExp('^https?://|^//', 'i');

  if (!absoluteUrlTester.test(imageUrl) && websiteUrl) {
    imageUrl = websiteUrl + imageUrl;
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-image"
  }, /*#__PURE__*/React__default.createElement("div", {
    style: imageLoaded ? {} : {
      overflow: 'hidden',
      width: '0px',
      height: '0px'
    }
  }, /*#__PURE__*/React__default.createElement("img", {
    onLoad: function onLoad() {
      if (onLoadCallBack) {
        onLoadCallBack();
      }

      setImageLoaded(true);
    },
    src: imageUrl,
    alt: "Image for ".concat(itemName)
  })), !imageLoaded ?
  /*#__PURE__*/
  // if the main image hasn't loaded yet, show a placeholder
  React__default.createElement(PlaceholderImage, {
    showSpinner: true
  }) : null);
}

function ResultItem(_ref) {
  var item = _ref.item;
  var itemName = item.getDocumentValue('itemname');
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item"
  }, /*#__PURE__*/React__default.createElement(ResultImage, {
    item: item
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__item-name"
  }, /*#__PURE__*/React__default.createElement("span", null, itemName)));
}

function ResultListing(_ref) {
  var _ref$ResultItem = _ref.ResultItem,
      ResultItem$1 = _ref$ResultItem === void 0 ? ResultItem : _ref$ResultItem;

  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      isLoading = _useHawksearch$store.isLoading,
      searchResults = _useHawksearch$store.searchResults;

  var results = searchResults ? searchResults.Results : [];
  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__listing"
  }, /*#__PURE__*/React__default.createElement(Spinner, {
    isVisible: isLoading
  }), results.length ? // if we have results, display them
  results.map(function (result) {
    return /*#__PURE__*/React__default.createElement(ResultItem$1, {
      key: result.DocId,
      item: result
    });
  }) : // otherwise display placeholder items as we're loading
  _toConsumableArray(Array(12)).map(function (_, i) {
    return /*#__PURE__*/React__default.createElement(PlaceholderItem, {
      key: i
    });
  }));
}

function Results(_ref) {
  var _ref$ResultItem = _ref.ResultItem,
      ResultItem$1 = _ref$ResultItem === void 0 ? ResultItem : _ref$ResultItem;

  var _useHawksearch = useHawksearch(),
      _useHawksearch$store = _useHawksearch.store,
      isLoading = _useHawksearch$store.isLoading,
      searchResults = _useHawksearch$store.searchResults,
      requestError = _useHawksearch$store.requestError;

  var _useTranslation = useTranslation(),
      t = _useTranslation.t,
      i18n = _useTranslation.i18n;

  if (requestError) {
    return /*#__PURE__*/React__default.createElement("span", null, "An error occurred while searching for your results. Please contact the site administrator.");
  } // end of overrides


  if ((!searchResults || searchResults.Results.length === 0) && !isLoading) {
    return /*#__PURE__*/React__default.createElement("span", null, t('No Results'));
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results"
  }, /*#__PURE__*/React__default.createElement(SearchResultsLabel, null), /*#__PURE__*/React__default.createElement(Selections$1, null), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__top-tool-row"
  }, /*#__PURE__*/React__default.createElement(ToolRow, null)), /*#__PURE__*/React__default.createElement(ResultListing, {
    ResultItem: ResultItem$1
  }), /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-results__bottom-tool-row"
  }, /*#__PURE__*/React__default.createElement(ToolRow, null)));
}

function AdjustedKeyword() {
  var _useHawksearch = useHawksearch(),
      searchResults = _useHawksearch.store.searchResults,
      actor = _useHawksearch.actor;

  if (searchResults && searchResults.AdjustedKeyword) {
    return /*#__PURE__*/React__default.createElement("div", {
      className: "hawk__adjusted-keyword"
    }, "Showing results for ", /*#__PURE__*/React__default.createElement("b", null, searchResults.AdjustedKeyword), ". Search instead for", ' ', /*#__PURE__*/React__default.createElement("b", {
      onClick: function onClick() {
        return actor.setSearch({
          Keyword: searchResults.Keyword,
          IgnoreSpellcheck: true
        });
      }
    }, searchResults.Keyword), ".");
  }

  return null;
}

function LanguageSelector(_ref) {
  var title = _ref.title,
      languages = _ref.languages,
      facetName = _ref.facetName;

  var _useHawksearch = useHawksearch(),
      pendingSearch = _useHawksearch.store.pendingSearch,
      actor = _useHawksearch.actor;

  var _useState = useState('sl'),
      _useState2 = _slicedToArray$1(_useState, 2),
      selectedValue = _useState2[0],
      setValue = _useState2[1];

  useEffect(function () {
    var languageFacet = ((pendingSearch || {}).FacetSelections || {})[facetName];

    if (languageFacet) {
      setValue(languageFacet[0]);
    }
  }, [pendingSearch.FacetSelections]);

  function onChange(event) {
    actor.setSearch({
      FacetSelections: _defineProperty({}, facetName, [event.currentTarget.value])
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-language"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "hawk-language__label"
  }, title), /*#__PURE__*/React__default.createElement("select", {
    value: selectedValue,
    onChange: onChange
  }, [{
    value: 'sl',
    label: title
  }].concat(languages).map(function (language) {
    return /*#__PURE__*/React__default.createElement("option", {
      key: language.value,
      value: language.value,
      selected: selectedValue === language.value,
      disabled: language.value === 'sl'
    }, language.label);
  })));
}

function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

var isProduction = process.env.NODE_ENV === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }

    var text = "Warning: " + message;

    if (typeof console !== 'undefined') {
      console.warn(text);
    }

    try {
      throw Error(text);
    } catch (x) {}
  }
}

var isProduction$1 = process.env.NODE_ENV === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction$1) {
        throw new Error(prefix);
    }
    throw new Error(prefix + ": " + (message || ''));
}

function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolvePathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
    process.env.NODE_ENV !== "production" ? warning(prompt == null, 'A history supports only one prompt at a time') : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
          process.env.NODE_ENV !== "production" ? warning(false, 'A history needs a getUserConfirmation function in order to use a prompt message') : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ? process.env.NODE_ENV !== "production" ? invariant(false, 'Browser history needs a DOM') : invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
    process.env.NODE_ENV !== "production" ? warning(!basename || hasBasename(path, basename), 'You are attempting to use a basename on a page whose URL path does not begin ' + 'with the basename. Expected path "' + path + '" to begin with "' + basename + '".') : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to push when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot push state in browsers that do not support HTML5 history') : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
    process.env.NODE_ENV !== "production" ? warning(!(typeof path === 'object' && path.state !== undefined && state !== undefined), 'You should avoid providing a 2nd state argument to replace when the 1st ' + 'argument is a location-like object that already has state; it is ignored') : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
        process.env.NODE_ENV !== "production" ? warning(state === undefined, 'Browser history cannot replace state in browsers that do not support HTML5 history') : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var history = createBrowserHistory();

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/** Represents parts of the browser query string that are fixed and are always single strings. */

/**
 * Represents the parts of the browser query string that are dynamic (the selected facets). Facets
 * can have multiple values, so the value of these is always an array of strings.
 */

/**
 * Parses the input query string and returns an object that can be used to build a search request.
 * The object returned will usually have the keys: `keyword`, `sort`, `pg`,`lp`,`lpurl`, `mpp`, and then more keys
 * for every selected facet.
 * @param search The input query string.
 */
function parseQueryStringToObject(search) {
  var params = new URLSearchParams(search);
  var parsed = {};
  params.forEach(function (value, key) {
    if (key === 'keyword' || key === 'sort' || key === 'pg' || key === 'lp' || key === 'PageId' || key === 'lpurl' || key === 'mpp' || key === 'searchWithin' || key === 'is100Coverage' || key === 'indexName' || key === 'ignoreSpellcheck') {
      // `keyword` is special and should never be turned into an array
      parsed[key] = encodeURIComponent(value);
    } else {
      // everything else should be turned into an array
      if (!value) {
        // no useful value for this query param, so skip it
        return;
      } // multiple selections are split by commas, so split into an array


      var multipleValues = value.split(','); // and now handle any comma escaping - any single value that contained a comma is escaped to '::'

      for (var x = 0; x < multipleValues.length; ++x) {
        multipleValues[x] = multipleValues[x].replace('::', ',');
      }

      parsed[key] = multipleValues;
    }
  });
  return parsed;
}
/**
 * Parses the abosulte url into a `HawkClient` client search request object.
 * @param location The input location
 */


function parseLocation(location) {
  var searchUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '/search';
  var searchRequest = parseSearchQueryString(location.search); // customUrl have priority over keywords

  if (checkIfUrlRefsLandingPage(location.pathname, searchUrl)) {
    searchRequest.Keyword = undefined;
    searchRequest.CustomUrl = location.pathname.replace(searchUrl, '');
  }

  return searchRequest;
}
/**
 * Parses the input query string into a `HawkClient` client search request object.
 * @param search The input query string.
 */

function parseSearchQueryString(search) {
  var queryObj = parseQueryStringToObject(search); // extract out components, including facet selections

  var keyword = queryObj.keyword,
      sort = queryObj.sort,
      pg = queryObj.pg,
      mpp = queryObj.mpp,
      lp = queryObj.lp,
      PageId = queryObj.PageId,
      lpurl = queryObj.lpurl,
      searchWithin = queryObj.searchWithin,
      is100Coverage = queryObj.is100Coverage,
      indexName = queryObj.indexName,
      ignoreSpellcheck = queryObj.ignoreSpellcheck,
      facetSelections = _objectWithoutProperties(queryObj, ["keyword", "sort", "pg", "mpp", "lp", "PageId", "lpurl", "searchWithin", "is100Coverage", "indexName", "ignoreSpellcheck"]); // ignore landing pages if keyword is passed


  var pageId = lp || PageId;
  return {
    Keyword: lpurl || pageId ? '' : keyword,
    SortBy: sort,
    PageNo: pg ? Number(pg) : undefined,
    MaxPerPage: mpp ? Number(mpp) : undefined,
    PageId: pageId ? Number(pageId) : undefined,
    CustomUrl: lpurl,
    SearchWithin: searchWithin,
    Is100CoverageTurnedOn: is100Coverage ? Boolean(is100Coverage) : undefined,
    FacetSelections: facetSelections,
    IndexName: indexName,
    IgnoreSpellcheck: ignoreSpellcheck ? ignoreSpellcheck === 'true' : undefined
  };
}
function checkIfUrlRefsLandingPage(path, searchUrl) {
  if (!path) {
    // if there's no path, this request can't be for a landing page
    return false;
  }

  if (!path.endsWith('/')) {
    path = path + '/';
  }

  if (!searchUrl.endsWith('/')) {
    searchUrl = searchUrl + '/';
  }

  return path !== searchUrl;
}
/**
 * Converts a search query object (such as one returned from `parseSearchQueryString`) and converts
 * it into a browser query string
 * @param queryObj The query object to convert to a query string.
 */

function convertObjectToQueryString(queryObj) {
  var queryStringValues = [];

  for (var _key in queryObj) {
    if (queryObj.hasOwnProperty(_key)) {
      if (_key === 'keyword' || _key === 'sort' || _key === 'pg' || _key === 'mpp' || _key === 'searchWithin' || _key === 'is100Coverage' || _key === 'indexName' || _key === 'ignoreSpellcheck') {
        var value = queryObj[_key];

        if (value === undefined || value === null) {
          // if any of the special keys just aren't defined or are null, don't include them in
          // the query string
          continue;
        }

        if (typeof value !== 'string') {
          throw new Error("".concat(_key, " must be a string"));
        } // certain strings are special and are never arrays


        queryStringValues.push(_key + '=' + value);
      } else {
        var values = queryObj[_key]; // handle comma escaping - if any of the values contains a comma, they need to be escaped first

        var escapedValues = [];

        var _iterator = _createForOfIteratorHelper$2(values),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var unescapedValue = _step.value;
            escapedValues.push(unescapedValue.replace(',', '::'));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        queryStringValues.push(_key + '=' + escapedValues.join(','));
      }
    }
  }

  return '?' + queryStringValues.join('&');
}
/**
 * Converts a partial search request object into a browser query string.
 * @param searchRequest The search request object to convert.
 */


function getSearchQueryString(searchRequest) {
  var searchQuery = _objectSpread$6({
    keyword: searchRequest.Keyword,
    sort: searchRequest.SortBy,
    pg: searchRequest.PageNo ? String(searchRequest.PageNo) : undefined,
    mpp: searchRequest.MaxPerPage ? String(searchRequest.MaxPerPage) : undefined,
    is100Coverage: searchRequest.Is100CoverageTurnedOn ? String(searchRequest.Is100CoverageTurnedOn) : undefined,
    searchWithin: searchRequest.SearchWithin,
    indexName: searchRequest.IndexName,
    ignoreSpellcheck: !searchRequest.IgnoreSpellcheck || !searchRequest.IgnoreSpellcheck ? undefined : String(searchRequest.IgnoreSpellcheck)
  }, searchRequest.FacetSelections);

  return convertObjectToQueryString(searchQuery);
}

var doSearch = true;

function QueryStringListener() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store,
      actor = _useHawksearch.actor;

  useEffect(function () {
    // listen to history so that when we navigate backward/forward, trigger a new search based off
    // the new query string
    var unlisten = history.listen(function (location) {
      if (!doSearch) {
        // if the previous history change specified that we shouldn't do a search, clear the flag and bail
        doSearch = true;
        return;
      }

      var searchRequest = parseSearchQueryString(location.search);
      actor.setSearch(searchRequest, // explicitly flag this next search as not needing to push additional history, since this search
      // _is_ the result of history.

      /*doHistory*/
      false);
    });
    return function () {
      unlisten();
    };
  });
  useEffect(function () {
    // listen to changes in the pending search so that history records can be pushed to the browser's
    // query string
    if (store.doHistory) {
      // if we're pushing history, we don't want to to trigger a search as a result of this history
      // change
      doSearch = false;
      history.push({
        search: getSearchQueryString(store.pendingSearch)
      });
    }
  }, [store.pendingSearch]); // Extract access token and refresh token from query string on load

  useEffect(function () {
    var params = new URLSearchParams(location.search);
    AuthToken$1.setTokens(params.get('token') || '', (params.get('refreshToken') || '').replace(/ /g, '+') || '');
  }, []);
  return null;
}

function QueryStringListenerSF() {
  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store,
      actor = _useHawksearch.actor;

  useEffect(function () {
    // listen to history so that when we navigate backward/forward, trigger a new search based off
    // the new query string
    var unlisten = history.listen(function (location) {
      var searchRequest = parseSearchQueryString(location.search);
      actor.setSearch(searchRequest, // explicitly flag this next search as not needing to push additional history, since this search
      // _is_ the result of history.

      /*doHistory*/
      false);
    });
    return function () {
      unlisten();
    };
  });
  useEffect(function () {
    // listen to changes in the pending search so that history records can be pushed to the browser's
    // query string
    if (store.doHistory) {
      history.push({
        search: getSearchQueryString(store.pendingSearch)
      });
    }
  }, [store.pendingSearch]);
  return null;
}

function RedirectURLListener(_ref) {
  var RedirectAlertMessage = _ref.RedirectAlertMessage;

  var _useHawksearch = useHawksearch(),
      store = _useHawksearch.store;

  var _useState = useState(false),
      _useState2 = _slicedToArray$1(_useState, 2),
      showAlert = _useState2[0],
      setAlert = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray$1(_useState3, 2),
      shouldRedirect = _useState4[0],
      setRedirect = _useState4[1];

  var _useState5 = useState(''),
      _useState6 = _slicedToArray$1(_useState5, 2),
      redirectURL = _useState6[0],
      setRedirectURL = _useState6[1];

  useEffect(function () {
    if (store.searchResults && store.searchResults.Redirect.Location) {
      setRedirectURL(store.searchResults.Redirect.Location); // NOTE: This will set alert to show toast message

      setAlert(true);
    }
  }, [store.searchResults]); // NOTE: It will wait until the timeout is clear

  useEffect(function () {
    if (shouldRedirect) {
      setAlert(false); // NOTE: This will redirect the parent window to the given URL

      window.top.location.href = redirectURL;
    }

    return function () {
      setRedirect(false);
    };
  }, [shouldRedirect]);

  if (!showAlert) {
    return null;
  }

  if (RedirectAlertMessage) {
    return /*#__PURE__*/React__default.createElement(RedirectAlertMessage, {
      message: redirectURL,
      setRedirect: setRedirect
    });
  }

  return /*#__PURE__*/React__default.createElement("div", null, "Alert message component is missing.");
}

function AutoCorrectSuggestion() {
  var _useHawksearch = useHawksearch(),
      searchResults = _useHawksearch.store.searchResults,
      hawkActor = _useHawksearch.actor;

  function selectKeyword(keyword) {
    hawkActor.setSearch({
      Keyword: keyword
    });
  }

  return /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-autocorrect-suggestion-container"
  }, searchResults && searchResults.DidYouMean && searchResults.DidYouMean.length ? /*#__PURE__*/React__default.createElement("div", {
    className: "hawk-autocorrect-suggestion"
  }, /*#__PURE__*/React__default.createElement("h3", null, "Did you mean?"), searchResults.DidYouMean.map(function (keyword, index) {
    return /*#__PURE__*/React__default.createElement("span", {
      onClick: function onClick() {
        return selectKeyword(keyword);
      },
      key: index
    }, keyword);
  })) : null);
}

export { AdjustedKeyword, AuthToken$1 as AuthToken, AutoCorrectSuggestion, Checkbox, CompareItems, ConfigProvider, ContentType, Facet$1 as Facet, FacetList, FacetRail, FacetSelectionState, FacetType, GlobalSearchBox, Hawksearch, LanguageSelector, Link, Nested as NestedCheckbox, NestedLink, OpenRange, Pagination$1 as Pagination, PlaceholderItem, QueryStringListener, QueryStringListenerSF, RedirectURLListener, ResultImage, ResultListing, Results, RuleOperatorType, RuleType, Search, SearchBox, SearchResultsLabel, Selections$1 as Selections, Slider, Sorting$1 as Sorting, Spinner, StoreProvider, Suggestion, SuggestionType, Swatch$1 as Swatch, SwatchItem, ToolRow, TrackingEvent$1 as TrackingEvent, checkIfUrlRefsLandingPage, createGuid, getCookie, getSearchQueryString, getVisitExpiry, getVisitorExpiry, parseLocation, parseSearchQueryString, setCookie, i18next as tConfig, useFacet, useHawksearch };
//# sourceMappingURL=react-hawksearch.js.map
