var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js
var require_iterator = __commonJS({
  "node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/iterator.js"(exports, module) {
    "use strict";
    module.exports = function(Yallist) {
      Yallist.prototype[Symbol.iterator] = function* () {
        for (let walker = this.head; walker; walker = walker.next) {
          yield walker.value;
        }
      };
    };
  }
});

// node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js
var require_yallist = __commonJS({
  "node_modules/.pnpm/yallist@4.0.0/node_modules/yallist/yallist.js"(exports, module) {
    "use strict";
    module.exports = Yallist;
    Yallist.Node = Node;
    Yallist.create = Yallist;
    function Yallist(list) {
      var self2 = this;
      if (!(self2 instanceof Yallist)) {
        self2 = new Yallist();
      }
      self2.tail = null;
      self2.head = null;
      self2.length = 0;
      if (list && typeof list.forEach === "function") {
        list.forEach(function(item) {
          self2.push(item);
        });
      } else if (arguments.length > 0) {
        for (var i = 0, l = arguments.length; i < l; i++) {
          self2.push(arguments[i]);
        }
      }
      return self2;
    }
    Yallist.prototype.removeNode = function(node) {
      if (node.list !== this) {
        throw new Error("removing node which does not belong to this list");
      }
      var next = node.next;
      var prev = node.prev;
      if (next) {
        next.prev = prev;
      }
      if (prev) {
        prev.next = next;
      }
      if (node === this.head) {
        this.head = next;
      }
      if (node === this.tail) {
        this.tail = prev;
      }
      node.list.length--;
      node.next = null;
      node.prev = null;
      node.list = null;
      return next;
    };
    Yallist.prototype.unshiftNode = function(node) {
      if (node === this.head) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var head = this.head;
      node.list = this;
      node.next = head;
      if (head) {
        head.prev = node;
      }
      this.head = node;
      if (!this.tail) {
        this.tail = node;
      }
      this.length++;
    };
    Yallist.prototype.pushNode = function(node) {
      if (node === this.tail) {
        return;
      }
      if (node.list) {
        node.list.removeNode(node);
      }
      var tail = this.tail;
      node.list = this;
      node.prev = tail;
      if (tail) {
        tail.next = node;
      }
      this.tail = node;
      if (!this.head) {
        this.head = node;
      }
      this.length++;
    };
    Yallist.prototype.push = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        push2(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.unshift = function() {
      for (var i = 0, l = arguments.length; i < l; i++) {
        unshift(this, arguments[i]);
      }
      return this.length;
    };
    Yallist.prototype.pop = function() {
      if (!this.tail) {
        return void 0;
      }
      var res = this.tail.value;
      this.tail = this.tail.prev;
      if (this.tail) {
        this.tail.next = null;
      } else {
        this.head = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.shift = function() {
      if (!this.head) {
        return void 0;
      }
      var res = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.prev = null;
      } else {
        this.tail = null;
      }
      this.length--;
      return res;
    };
    Yallist.prototype.forEach = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.head, i = 0; walker !== null; i++) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.next;
      }
    };
    Yallist.prototype.forEachReverse = function(fn, thisp) {
      thisp = thisp || this;
      for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
        fn.call(thisp, walker.value, i, this);
        walker = walker.prev;
      }
    };
    Yallist.prototype.get = function(n) {
      for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
        walker = walker.next;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.getReverse = function(n) {
      for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
        walker = walker.prev;
      }
      if (i === n && walker !== null) {
        return walker.value;
      }
    };
    Yallist.prototype.map = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.head; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.next;
      }
      return res;
    };
    Yallist.prototype.mapReverse = function(fn, thisp) {
      thisp = thisp || this;
      var res = new Yallist();
      for (var walker = this.tail; walker !== null; ) {
        res.push(fn.call(thisp, walker.value, this));
        walker = walker.prev;
      }
      return res;
    };
    Yallist.prototype.reduce = function(fn, initial) {
      var acc;
      var walker = this.head;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.head) {
        walker = this.head.next;
        acc = this.head.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = 0; walker !== null; i++) {
        acc = fn(acc, walker.value, i);
        walker = walker.next;
      }
      return acc;
    };
    Yallist.prototype.reduceReverse = function(fn, initial) {
      var acc;
      var walker = this.tail;
      if (arguments.length > 1) {
        acc = initial;
      } else if (this.tail) {
        walker = this.tail.prev;
        acc = this.tail.value;
      } else {
        throw new TypeError("Reduce of empty list with no initial value");
      }
      for (var i = this.length - 1; walker !== null; i--) {
        acc = fn(acc, walker.value, i);
        walker = walker.prev;
      }
      return acc;
    };
    Yallist.prototype.toArray = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.head; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.next;
      }
      return arr;
    };
    Yallist.prototype.toArrayReverse = function() {
      var arr = new Array(this.length);
      for (var i = 0, walker = this.tail; walker !== null; i++) {
        arr[i] = walker.value;
        walker = walker.prev;
      }
      return arr;
    };
    Yallist.prototype.slice = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
        walker = walker.next;
      }
      for (; walker !== null && i < to; i++, walker = walker.next) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.sliceReverse = function(from, to) {
      to = to || this.length;
      if (to < 0) {
        to += this.length;
      }
      from = from || 0;
      if (from < 0) {
        from += this.length;
      }
      var ret = new Yallist();
      if (to < from || to < 0) {
        return ret;
      }
      if (from < 0) {
        from = 0;
      }
      if (to > this.length) {
        to = this.length;
      }
      for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
        walker = walker.prev;
      }
      for (; walker !== null && i > from; i--, walker = walker.prev) {
        ret.push(walker.value);
      }
      return ret;
    };
    Yallist.prototype.splice = function(start, deleteCount, ...nodes) {
      if (start > this.length) {
        start = this.length - 1;
      }
      if (start < 0) {
        start = this.length + start;
      }
      for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
        walker = walker.next;
      }
      var ret = [];
      for (var i = 0; walker && i < deleteCount; i++) {
        ret.push(walker.value);
        walker = this.removeNode(walker);
      }
      if (walker === null) {
        walker = this.tail;
      }
      if (walker !== this.head && walker !== this.tail) {
        walker = walker.prev;
      }
      for (var i = 0; i < nodes.length; i++) {
        walker = insert(this, walker, nodes[i]);
      }
      return ret;
    };
    Yallist.prototype.reverse = function() {
      var head = this.head;
      var tail = this.tail;
      for (var walker = head; walker !== null; walker = walker.prev) {
        var p = walker.prev;
        walker.prev = walker.next;
        walker.next = p;
      }
      this.head = tail;
      this.tail = head;
      return this;
    };
    function insert(self2, node, value) {
      var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
      if (inserted.next === null) {
        self2.tail = inserted;
      }
      if (inserted.prev === null) {
        self2.head = inserted;
      }
      self2.length++;
      return inserted;
    }
    function push2(self2, item) {
      self2.tail = new Node(item, self2.tail, null, self2);
      if (!self2.head) {
        self2.head = self2.tail;
      }
      self2.length++;
    }
    function unshift(self2, item) {
      self2.head = new Node(item, null, self2.head, self2);
      if (!self2.tail) {
        self2.tail = self2.head;
      }
      self2.length++;
    }
    function Node(value, prev, next, list) {
      if (!(this instanceof Node)) {
        return new Node(value, prev, next, list);
      }
      this.list = list;
      this.value = value;
      if (prev) {
        prev.next = this;
        this.prev = prev;
      } else {
        this.prev = null;
      }
      if (next) {
        next.prev = this;
        this.next = next;
      } else {
        this.next = null;
      }
    }
    try {
      require_iterator()(Yallist);
    } catch (er) {
    }
  }
});

// node_modules/.pnpm/lru-cache@6.0.0/node_modules/lru-cache/index.js
var require_lru_cache = __commonJS({
  "node_modules/.pnpm/lru-cache@6.0.0/node_modules/lru-cache/index.js"(exports, module) {
    "use strict";
    var Yallist = require_yallist();
    var MAX = Symbol("max");
    var LENGTH = Symbol("length");
    var LENGTH_CALCULATOR = Symbol("lengthCalculator");
    var ALLOW_STALE = Symbol("allowStale");
    var MAX_AGE = Symbol("maxAge");
    var DISPOSE = Symbol("dispose");
    var NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
    var LRU_LIST = Symbol("lruList");
    var CACHE = Symbol("cache");
    var UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
    var naiveLength = () => 1;
    var LRUCache = class {
      constructor(options) {
        if (typeof options === "number")
          options = { max: options };
        if (!options)
          options = {};
        if (options.max && (typeof options.max !== "number" || options.max < 0))
          throw new TypeError("max must be a non-negative number");
        const max = this[MAX] = options.max || Infinity;
        const lc = options.length || naiveLength;
        this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
        this[ALLOW_STALE] = options.stale || false;
        if (options.maxAge && typeof options.maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
        this.reset();
      }
      set max(mL) {
        if (typeof mL !== "number" || mL < 0)
          throw new TypeError("max must be a non-negative number");
        this[MAX] = mL || Infinity;
        trim(this);
      }
      get max() {
        return this[MAX];
      }
      set allowStale(allowStale) {
        this[ALLOW_STALE] = !!allowStale;
      }
      get allowStale() {
        return this[ALLOW_STALE];
      }
      set maxAge(mA) {
        if (typeof mA !== "number")
          throw new TypeError("maxAge must be a non-negative number");
        this[MAX_AGE] = mA;
        trim(this);
      }
      get maxAge() {
        return this[MAX_AGE];
      }
      set lengthCalculator(lC) {
        if (typeof lC !== "function")
          lC = naiveLength;
        if (lC !== this[LENGTH_CALCULATOR]) {
          this[LENGTH_CALCULATOR] = lC;
          this[LENGTH] = 0;
          this[LRU_LIST].forEach((hit) => {
            hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
            this[LENGTH] += hit.length;
          });
        }
        trim(this);
      }
      get lengthCalculator() {
        return this[LENGTH_CALCULATOR];
      }
      get length() {
        return this[LENGTH];
      }
      get itemCount() {
        return this[LRU_LIST].length;
      }
      rforEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].tail; walker !== null; ) {
          const prev = walker.prev;
          forEachStep(this, fn, walker, thisp);
          walker = prev;
        }
      }
      forEach(fn, thisp) {
        thisp = thisp || this;
        for (let walker = this[LRU_LIST].head; walker !== null; ) {
          const next = walker.next;
          forEachStep(this, fn, walker, thisp);
          walker = next;
        }
      }
      keys() {
        return this[LRU_LIST].toArray().map((k) => k.key);
      }
      values() {
        return this[LRU_LIST].toArray().map((k) => k.value);
      }
      reset() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
        }
        this[CACHE] = /* @__PURE__ */ new Map();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      }
      dump() {
        return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
          k: hit.key,
          v: hit.value,
          e: hit.now + (hit.maxAge || 0)
        }).toArray().filter((h) => h);
      }
      dumpLru() {
        return this[LRU_LIST];
      }
      set(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        if (maxAge && typeof maxAge !== "number")
          throw new TypeError("maxAge must be a number");
        const now = maxAge ? Date.now() : 0;
        const len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          const node = this[CACHE].get(key);
          const item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET])
              this[DISPOSE](key, item.value);
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        const hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE])
            this[DISPOSE](key, value);
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      }
      has(key) {
        if (!this[CACHE].has(key))
          return false;
        const hit = this[CACHE].get(key).value;
        return !isStale(this, hit);
      }
      get(key) {
        return get(this, key, true);
      }
      peek(key) {
        return get(this, key, false);
      }
      pop() {
        const node = this[LRU_LIST].tail;
        if (!node)
          return null;
        del(this, node);
        return node.value;
      }
      del(key) {
        del(this, this[CACHE].get(key));
      }
      load(arr) {
        this.reset();
        const now = Date.now();
        for (let l = arr.length - 1; l >= 0; l--) {
          const hit = arr[l];
          const expiresAt = hit.e || 0;
          if (expiresAt === 0)
            this.set(hit.k, hit.v);
          else {
            const maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      }
      prune() {
        this[CACHE].forEach((value, key) => get(this, key, false));
      }
    };
    var get = (self2, key, doUse) => {
      const node = self2[CACHE].get(key);
      if (node) {
        const hit = node.value;
        if (isStale(self2, hit)) {
          del(self2, node);
          if (!self2[ALLOW_STALE])
            return void 0;
        } else {
          if (doUse) {
            if (self2[UPDATE_AGE_ON_GET])
              node.value.now = Date.now();
            self2[LRU_LIST].unshiftNode(node);
          }
        }
        return hit.value;
      }
    };
    var isStale = (self2, hit) => {
      if (!hit || !hit.maxAge && !self2[MAX_AGE])
        return false;
      const diff = Date.now() - hit.now;
      return hit.maxAge ? diff > hit.maxAge : self2[MAX_AGE] && diff > self2[MAX_AGE];
    };
    var trim = (self2) => {
      if (self2[LENGTH] > self2[MAX]) {
        for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
          const prev = walker.prev;
          del(self2, walker);
          walker = prev;
        }
      }
    };
    var del = (self2, node) => {
      if (node) {
        const hit = node.value;
        if (self2[DISPOSE])
          self2[DISPOSE](hit.key, hit.value);
        self2[LENGTH] -= hit.length;
        self2[CACHE].delete(hit.key);
        self2[LRU_LIST].removeNode(node);
      }
    };
    var Entry = class {
      constructor(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    };
    var forEachStep = (self2, fn, node, thisp) => {
      let hit = node.value;
      if (isStale(self2, hit)) {
        del(self2, node);
        if (!self2[ALLOW_STALE])
          hit = void 0;
      }
      if (hit)
        fn.call(thisp, hit.value, hit.key, self2);
    };
    module.exports = LRUCache;
  }
});

// node_modules/.pnpm/@whatwg-node+fetch@0.3.2/node_modules/@whatwg-node/fetch/dist/global-ponyfill.js
var require_global_ponyfill = __commonJS({
  "node_modules/.pnpm/@whatwg-node+fetch@0.3.2/node_modules/@whatwg-node/fetch/dist/global-ponyfill.js"(exports, module) {
    module.exports.fetch = globalThis.fetch;
    module.exports.Headers = globalThis.Headers;
    module.exports.Request = globalThis.Request;
    module.exports.Response = globalThis.Response;
    module.exports.FormData = globalThis.FormData;
    module.exports.AbortController = globalThis.AbortController;
    module.exports.ReadableStream = globalThis.ReadableStream;
    module.exports.WritableStream = globalThis.WritableStream;
    module.exports.TransformStream = globalThis.TransformStream;
    module.exports.Blob = globalThis.Blob;
    module.exports.File = globalThis.File;
    module.exports.crypto = globalThis.crypto;
    module.exports.btoa = globalThis.btoa;
    module.exports.TextEncoder = globalThis.TextEncoder;
    module.exports.TextDecoder = globalThis.TextDecoder;
    module.exports.Event = globalThis.Event;
    module.exports.EventTarget = globalThis.EventTarget;
    module.exports.createFetch = () => globalThis;
  }
});

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/enable-if.js
var EnableIfBranded;
(function(EnableIfBranded2) {
  EnableIfBranded2[EnableIfBranded2["DisabledPlugin"] = 0] = "DisabledPlugin";
})(EnableIfBranded || (EnableIfBranded = {}));
function isPluginEnabled(t) {
  return t !== EnableIfBranded.DisabledPlugin && t !== null;
}
function enableIf(condition, plugin) {
  if (condition) {
    return typeof plugin === "function" ? plugin() : plugin;
  }
  return EnableIfBranded.DisabledPlugin;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/version.mjs
var versionInfo = Object.freeze({
  major: 16,
  minor: 6,
  patch: 0,
  preReleaseTag: null
});

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/devAssert.mjs
function devAssert(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(message);
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/isPromise.mjs
function isPromise(value) {
  return typeof (value === null || value === void 0 ? void 0 : value.then) === "function";
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/isObjectLike.mjs
function isObjectLike(value) {
  return typeof value == "object" && value !== null;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/invariant.mjs
function invariant(condition, message) {
  const booleanCondition = Boolean(condition);
  if (!booleanCondition) {
    throw new Error(
      message != null ? message : "Unexpected invariant triggered."
    );
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/location.mjs
var LineRegExp = /\r\n|[\n\r]/g;
function getLocation(source, position) {
  let lastLineStart = 0;
  let line = 1;
  for (const match of source.body.matchAll(LineRegExp)) {
    typeof match.index === "number" || invariant(false);
    if (match.index >= position) {
      break;
    }
    lastLineStart = match.index + match[0].length;
    line += 1;
  }
  return {
    line,
    column: position + 1 - lastLineStart
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/printLocation.mjs
function printLocation(location) {
  return printSourceLocation(
    location.source,
    getLocation(location.source, location.start)
  );
}
function printSourceLocation(source, sourceLocation) {
  const firstLineColumnOffset = source.locationOffset.column - 1;
  const body = "".padStart(firstLineColumnOffset) + source.body;
  const lineIndex = sourceLocation.line - 1;
  const lineOffset = source.locationOffset.line - 1;
  const lineNum = sourceLocation.line + lineOffset;
  const columnOffset = sourceLocation.line === 1 ? firstLineColumnOffset : 0;
  const columnNum = sourceLocation.column + columnOffset;
  const locationStr = `${source.name}:${lineNum}:${columnNum}
`;
  const lines = body.split(/\r\n|[\n\r]/g);
  const locationLine = lines[lineIndex];
  if (locationLine.length > 120) {
    const subLineIndex = Math.floor(columnNum / 80);
    const subLineColumnNum = columnNum % 80;
    const subLines = [];
    for (let i = 0; i < locationLine.length; i += 80) {
      subLines.push(locationLine.slice(i, i + 80));
    }
    return locationStr + printPrefixedLines([
      [`${lineNum} |`, subLines[0]],
      ...subLines.slice(1, subLineIndex + 1).map((subLine) => ["|", subLine]),
      ["|", "^".padStart(subLineColumnNum)],
      ["|", subLines[subLineIndex + 1]]
    ]);
  }
  return locationStr + printPrefixedLines([
    [`${lineNum - 1} |`, lines[lineIndex - 1]],
    [`${lineNum} |`, locationLine],
    ["|", "^".padStart(columnNum)],
    [`${lineNum + 1} |`, lines[lineIndex + 1]]
  ]);
}
function printPrefixedLines(lines) {
  const existingLines = lines.filter(([_, line]) => line !== void 0);
  const padLen = Math.max(...existingLines.map(([prefix2]) => prefix2.length));
  return existingLines.map(([prefix2, line]) => prefix2.padStart(padLen) + (line ? " " + line : "")).join("\n");
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/error/GraphQLError.mjs
function toNormalizedOptions(args) {
  const firstArg = args[0];
  if (firstArg == null || "kind" in firstArg || "length" in firstArg) {
    return {
      nodes: firstArg,
      source: args[1],
      positions: args[2],
      path: args[3],
      originalError: args[4],
      extensions: args[5]
    };
  }
  return firstArg;
}
var GraphQLError = class extends Error {
  constructor(message, ...rawArgs) {
    var _this$nodes, _nodeLocations$, _ref;
    const { nodes, source, positions, path, originalError, extensions } = toNormalizedOptions(rawArgs);
    super(message);
    this.name = "GraphQLError";
    this.path = path !== null && path !== void 0 ? path : void 0;
    this.originalError = originalError !== null && originalError !== void 0 ? originalError : void 0;
    this.nodes = undefinedIfEmpty(
      Array.isArray(nodes) ? nodes : nodes ? [nodes] : void 0
    );
    const nodeLocations = undefinedIfEmpty(
      (_this$nodes = this.nodes) === null || _this$nodes === void 0 ? void 0 : _this$nodes.map((node) => node.loc).filter((loc) => loc != null)
    );
    this.source = source !== null && source !== void 0 ? source : nodeLocations === null || nodeLocations === void 0 ? void 0 : (_nodeLocations$ = nodeLocations[0]) === null || _nodeLocations$ === void 0 ? void 0 : _nodeLocations$.source;
    this.positions = positions !== null && positions !== void 0 ? positions : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => loc.start);
    this.locations = positions && source ? positions.map((pos) => getLocation(source, pos)) : nodeLocations === null || nodeLocations === void 0 ? void 0 : nodeLocations.map((loc) => getLocation(loc.source, loc.start));
    const originalExtensions = isObjectLike(
      originalError === null || originalError === void 0 ? void 0 : originalError.extensions
    ) ? originalError === null || originalError === void 0 ? void 0 : originalError.extensions : void 0;
    this.extensions = (_ref = extensions !== null && extensions !== void 0 ? extensions : originalExtensions) !== null && _ref !== void 0 ? _ref : /* @__PURE__ */ Object.create(null);
    Object.defineProperties(this, {
      message: {
        writable: true,
        enumerable: true
      },
      name: {
        enumerable: false
      },
      nodes: {
        enumerable: false
      },
      source: {
        enumerable: false
      },
      positions: {
        enumerable: false
      },
      originalError: {
        enumerable: false
      }
    });
    if (originalError !== null && originalError !== void 0 && originalError.stack) {
      Object.defineProperty(this, "stack", {
        value: originalError.stack,
        writable: true,
        configurable: true
      });
    } else if (Error.captureStackTrace) {
      Error.captureStackTrace(this, GraphQLError);
    } else {
      Object.defineProperty(this, "stack", {
        value: Error().stack,
        writable: true,
        configurable: true
      });
    }
  }
  get [Symbol.toStringTag]() {
    return "GraphQLError";
  }
  toString() {
    let output = this.message;
    if (this.nodes) {
      for (const node of this.nodes) {
        if (node.loc) {
          output += "\n\n" + printLocation(node.loc);
        }
      }
    } else if (this.source && this.locations) {
      for (const location of this.locations) {
        output += "\n\n" + printSourceLocation(this.source, location);
      }
    }
    return output;
  }
  toJSON() {
    const formattedError = {
      message: this.message
    };
    if (this.locations != null) {
      formattedError.locations = this.locations;
    }
    if (this.path != null) {
      formattedError.path = this.path;
    }
    if (this.extensions != null && Object.keys(this.extensions).length > 0) {
      formattedError.extensions = this.extensions;
    }
    return formattedError;
  }
};
function undefinedIfEmpty(array) {
  return array === void 0 || array.length === 0 ? void 0 : array;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/error/syntaxError.mjs
function syntaxError(source, position, description) {
  return new GraphQLError(`Syntax Error: ${description}`, {
    source,
    positions: [position]
  });
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/ast.mjs
var Location = class {
  constructor(startToken, endToken, source) {
    this.start = startToken.start;
    this.end = endToken.end;
    this.startToken = startToken;
    this.endToken = endToken;
    this.source = source;
  }
  get [Symbol.toStringTag]() {
    return "Location";
  }
  toJSON() {
    return {
      start: this.start,
      end: this.end
    };
  }
};
var Token = class {
  constructor(kind, start, end, line, column, value) {
    this.kind = kind;
    this.start = start;
    this.end = end;
    this.line = line;
    this.column = column;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
  get [Symbol.toStringTag]() {
    return "Token";
  }
  toJSON() {
    return {
      kind: this.kind,
      value: this.value,
      line: this.line,
      column: this.column
    };
  }
};
var QueryDocumentKeys = {
  Name: [],
  Document: ["definitions"],
  OperationDefinition: [
    "name",
    "variableDefinitions",
    "directives",
    "selectionSet"
  ],
  VariableDefinition: ["variable", "type", "defaultValue", "directives"],
  Variable: ["name"],
  SelectionSet: ["selections"],
  Field: ["alias", "name", "arguments", "directives", "selectionSet"],
  Argument: ["name", "value"],
  FragmentSpread: ["name", "directives"],
  InlineFragment: ["typeCondition", "directives", "selectionSet"],
  FragmentDefinition: [
    "name",
    "variableDefinitions",
    "typeCondition",
    "directives",
    "selectionSet"
  ],
  IntValue: [],
  FloatValue: [],
  StringValue: [],
  BooleanValue: [],
  NullValue: [],
  EnumValue: [],
  ListValue: ["values"],
  ObjectValue: ["fields"],
  ObjectField: ["name", "value"],
  Directive: ["name", "arguments"],
  NamedType: ["name"],
  ListType: ["type"],
  NonNullType: ["type"],
  SchemaDefinition: ["description", "directives", "operationTypes"],
  OperationTypeDefinition: ["type"],
  ScalarTypeDefinition: ["description", "name", "directives"],
  ObjectTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  FieldDefinition: ["description", "name", "arguments", "type", "directives"],
  InputValueDefinition: [
    "description",
    "name",
    "type",
    "defaultValue",
    "directives"
  ],
  InterfaceTypeDefinition: [
    "description",
    "name",
    "interfaces",
    "directives",
    "fields"
  ],
  UnionTypeDefinition: ["description", "name", "directives", "types"],
  EnumTypeDefinition: ["description", "name", "directives", "values"],
  EnumValueDefinition: ["description", "name", "directives"],
  InputObjectTypeDefinition: ["description", "name", "directives", "fields"],
  DirectiveDefinition: ["description", "name", "arguments", "locations"],
  SchemaExtension: ["directives", "operationTypes"],
  ScalarTypeExtension: ["name", "directives"],
  ObjectTypeExtension: ["name", "interfaces", "directives", "fields"],
  InterfaceTypeExtension: ["name", "interfaces", "directives", "fields"],
  UnionTypeExtension: ["name", "directives", "types"],
  EnumTypeExtension: ["name", "directives", "values"],
  InputObjectTypeExtension: ["name", "directives", "fields"]
};
var kindValues = new Set(Object.keys(QueryDocumentKeys));
function isNode(maybeNode) {
  const maybeKind = maybeNode === null || maybeNode === void 0 ? void 0 : maybeNode.kind;
  return typeof maybeKind === "string" && kindValues.has(maybeKind);
}
var OperationTypeNode;
(function(OperationTypeNode2) {
  OperationTypeNode2["QUERY"] = "query";
  OperationTypeNode2["MUTATION"] = "mutation";
  OperationTypeNode2["SUBSCRIPTION"] = "subscription";
})(OperationTypeNode || (OperationTypeNode = {}));

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/directiveLocation.mjs
var DirectiveLocation;
(function(DirectiveLocation2) {
  DirectiveLocation2["QUERY"] = "QUERY";
  DirectiveLocation2["MUTATION"] = "MUTATION";
  DirectiveLocation2["SUBSCRIPTION"] = "SUBSCRIPTION";
  DirectiveLocation2["FIELD"] = "FIELD";
  DirectiveLocation2["FRAGMENT_DEFINITION"] = "FRAGMENT_DEFINITION";
  DirectiveLocation2["FRAGMENT_SPREAD"] = "FRAGMENT_SPREAD";
  DirectiveLocation2["INLINE_FRAGMENT"] = "INLINE_FRAGMENT";
  DirectiveLocation2["VARIABLE_DEFINITION"] = "VARIABLE_DEFINITION";
  DirectiveLocation2["SCHEMA"] = "SCHEMA";
  DirectiveLocation2["SCALAR"] = "SCALAR";
  DirectiveLocation2["OBJECT"] = "OBJECT";
  DirectiveLocation2["FIELD_DEFINITION"] = "FIELD_DEFINITION";
  DirectiveLocation2["ARGUMENT_DEFINITION"] = "ARGUMENT_DEFINITION";
  DirectiveLocation2["INTERFACE"] = "INTERFACE";
  DirectiveLocation2["UNION"] = "UNION";
  DirectiveLocation2["ENUM"] = "ENUM";
  DirectiveLocation2["ENUM_VALUE"] = "ENUM_VALUE";
  DirectiveLocation2["INPUT_OBJECT"] = "INPUT_OBJECT";
  DirectiveLocation2["INPUT_FIELD_DEFINITION"] = "INPUT_FIELD_DEFINITION";
})(DirectiveLocation || (DirectiveLocation = {}));

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/kinds.mjs
var Kind;
(function(Kind2) {
  Kind2["NAME"] = "Name";
  Kind2["DOCUMENT"] = "Document";
  Kind2["OPERATION_DEFINITION"] = "OperationDefinition";
  Kind2["VARIABLE_DEFINITION"] = "VariableDefinition";
  Kind2["SELECTION_SET"] = "SelectionSet";
  Kind2["FIELD"] = "Field";
  Kind2["ARGUMENT"] = "Argument";
  Kind2["FRAGMENT_SPREAD"] = "FragmentSpread";
  Kind2["INLINE_FRAGMENT"] = "InlineFragment";
  Kind2["FRAGMENT_DEFINITION"] = "FragmentDefinition";
  Kind2["VARIABLE"] = "Variable";
  Kind2["INT"] = "IntValue";
  Kind2["FLOAT"] = "FloatValue";
  Kind2["STRING"] = "StringValue";
  Kind2["BOOLEAN"] = "BooleanValue";
  Kind2["NULL"] = "NullValue";
  Kind2["ENUM"] = "EnumValue";
  Kind2["LIST"] = "ListValue";
  Kind2["OBJECT"] = "ObjectValue";
  Kind2["OBJECT_FIELD"] = "ObjectField";
  Kind2["DIRECTIVE"] = "Directive";
  Kind2["NAMED_TYPE"] = "NamedType";
  Kind2["LIST_TYPE"] = "ListType";
  Kind2["NON_NULL_TYPE"] = "NonNullType";
  Kind2["SCHEMA_DEFINITION"] = "SchemaDefinition";
  Kind2["OPERATION_TYPE_DEFINITION"] = "OperationTypeDefinition";
  Kind2["SCALAR_TYPE_DEFINITION"] = "ScalarTypeDefinition";
  Kind2["OBJECT_TYPE_DEFINITION"] = "ObjectTypeDefinition";
  Kind2["FIELD_DEFINITION"] = "FieldDefinition";
  Kind2["INPUT_VALUE_DEFINITION"] = "InputValueDefinition";
  Kind2["INTERFACE_TYPE_DEFINITION"] = "InterfaceTypeDefinition";
  Kind2["UNION_TYPE_DEFINITION"] = "UnionTypeDefinition";
  Kind2["ENUM_TYPE_DEFINITION"] = "EnumTypeDefinition";
  Kind2["ENUM_VALUE_DEFINITION"] = "EnumValueDefinition";
  Kind2["INPUT_OBJECT_TYPE_DEFINITION"] = "InputObjectTypeDefinition";
  Kind2["DIRECTIVE_DEFINITION"] = "DirectiveDefinition";
  Kind2["SCHEMA_EXTENSION"] = "SchemaExtension";
  Kind2["SCALAR_TYPE_EXTENSION"] = "ScalarTypeExtension";
  Kind2["OBJECT_TYPE_EXTENSION"] = "ObjectTypeExtension";
  Kind2["INTERFACE_TYPE_EXTENSION"] = "InterfaceTypeExtension";
  Kind2["UNION_TYPE_EXTENSION"] = "UnionTypeExtension";
  Kind2["ENUM_TYPE_EXTENSION"] = "EnumTypeExtension";
  Kind2["INPUT_OBJECT_TYPE_EXTENSION"] = "InputObjectTypeExtension";
})(Kind || (Kind = {}));

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/characterClasses.mjs
function isWhiteSpace(code) {
  return code === 9 || code === 32;
}
function isDigit(code) {
  return code >= 48 && code <= 57;
}
function isLetter(code) {
  return code >= 97 && code <= 122 || code >= 65 && code <= 90;
}
function isNameStart(code) {
  return isLetter(code) || code === 95;
}
function isNameContinue(code) {
  return isLetter(code) || isDigit(code) || code === 95;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/blockString.mjs
function dedentBlockStringLines(lines) {
  var _firstNonEmptyLine2;
  let commonIndent = Number.MAX_SAFE_INTEGER;
  let firstNonEmptyLine = null;
  let lastNonEmptyLine = -1;
  for (let i = 0; i < lines.length; ++i) {
    var _firstNonEmptyLine;
    const line = lines[i];
    const indent3 = leadingWhitespace(line);
    if (indent3 === line.length) {
      continue;
    }
    firstNonEmptyLine = (_firstNonEmptyLine = firstNonEmptyLine) !== null && _firstNonEmptyLine !== void 0 ? _firstNonEmptyLine : i;
    lastNonEmptyLine = i;
    if (i !== 0 && indent3 < commonIndent) {
      commonIndent = indent3;
    }
  }
  return lines.map((line, i) => i === 0 ? line : line.slice(commonIndent)).slice(
    (_firstNonEmptyLine2 = firstNonEmptyLine) !== null && _firstNonEmptyLine2 !== void 0 ? _firstNonEmptyLine2 : 0,
    lastNonEmptyLine + 1
  );
}
function leadingWhitespace(str) {
  let i = 0;
  while (i < str.length && isWhiteSpace(str.charCodeAt(i))) {
    ++i;
  }
  return i;
}
function printBlockString(value, options) {
  const escapedValue = value.replace(/"""/g, '\\"""');
  const lines = escapedValue.split(/\r\n|[\n\r]/g);
  const isSingleLine = lines.length === 1;
  const forceLeadingNewLine = lines.length > 1 && lines.slice(1).every((line) => line.length === 0 || isWhiteSpace(line.charCodeAt(0)));
  const hasTrailingTripleQuotes = escapedValue.endsWith('\\"""');
  const hasTrailingQuote = value.endsWith('"') && !hasTrailingTripleQuotes;
  const hasTrailingSlash = value.endsWith("\\");
  const forceTrailingNewline = hasTrailingQuote || hasTrailingSlash;
  const printAsMultipleLines = !(options !== null && options !== void 0 && options.minimize) && (!isSingleLine || value.length > 70 || forceTrailingNewline || forceLeadingNewLine || hasTrailingTripleQuotes);
  let result = "";
  const skipLeadingNewLine = isSingleLine && isWhiteSpace(value.charCodeAt(0));
  if (printAsMultipleLines && !skipLeadingNewLine || forceLeadingNewLine) {
    result += "\n";
  }
  result += escapedValue;
  if (printAsMultipleLines || forceTrailingNewline) {
    result += "\n";
  }
  return '"""' + result + '"""';
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/tokenKind.mjs
var TokenKind;
(function(TokenKind2) {
  TokenKind2["SOF"] = "<SOF>";
  TokenKind2["EOF"] = "<EOF>";
  TokenKind2["BANG"] = "!";
  TokenKind2["DOLLAR"] = "$";
  TokenKind2["AMP"] = "&";
  TokenKind2["PAREN_L"] = "(";
  TokenKind2["PAREN_R"] = ")";
  TokenKind2["SPREAD"] = "...";
  TokenKind2["COLON"] = ":";
  TokenKind2["EQUALS"] = "=";
  TokenKind2["AT"] = "@";
  TokenKind2["BRACKET_L"] = "[";
  TokenKind2["BRACKET_R"] = "]";
  TokenKind2["BRACE_L"] = "{";
  TokenKind2["PIPE"] = "|";
  TokenKind2["BRACE_R"] = "}";
  TokenKind2["NAME"] = "Name";
  TokenKind2["INT"] = "Int";
  TokenKind2["FLOAT"] = "Float";
  TokenKind2["STRING"] = "String";
  TokenKind2["BLOCK_STRING"] = "BlockString";
  TokenKind2["COMMENT"] = "Comment";
})(TokenKind || (TokenKind = {}));

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/lexer.mjs
var Lexer = class {
  constructor(source) {
    const startOfFileToken = new Token(TokenKind.SOF, 0, 0, 0, 0);
    this.source = source;
    this.lastToken = startOfFileToken;
    this.token = startOfFileToken;
    this.line = 1;
    this.lineStart = 0;
  }
  get [Symbol.toStringTag]() {
    return "Lexer";
  }
  advance() {
    this.lastToken = this.token;
    const token = this.token = this.lookahead();
    return token;
  }
  lookahead() {
    let token = this.token;
    if (token.kind !== TokenKind.EOF) {
      do {
        if (token.next) {
          token = token.next;
        } else {
          const nextToken = readNextToken(this, token.end);
          token.next = nextToken;
          nextToken.prev = token;
          token = nextToken;
        }
      } while (token.kind === TokenKind.COMMENT);
    }
    return token;
  }
};
function isPunctuatorTokenKind(kind) {
  return kind === TokenKind.BANG || kind === TokenKind.DOLLAR || kind === TokenKind.AMP || kind === TokenKind.PAREN_L || kind === TokenKind.PAREN_R || kind === TokenKind.SPREAD || kind === TokenKind.COLON || kind === TokenKind.EQUALS || kind === TokenKind.AT || kind === TokenKind.BRACKET_L || kind === TokenKind.BRACKET_R || kind === TokenKind.BRACE_L || kind === TokenKind.PIPE || kind === TokenKind.BRACE_R;
}
function isUnicodeScalarValue(code) {
  return code >= 0 && code <= 55295 || code >= 57344 && code <= 1114111;
}
function isSupplementaryCodePoint(body, location) {
  return isLeadingSurrogate(body.charCodeAt(location)) && isTrailingSurrogate(body.charCodeAt(location + 1));
}
function isLeadingSurrogate(code) {
  return code >= 55296 && code <= 56319;
}
function isTrailingSurrogate(code) {
  return code >= 56320 && code <= 57343;
}
function printCodePointAt(lexer, location) {
  const code = lexer.source.body.codePointAt(location);
  if (code === void 0) {
    return TokenKind.EOF;
  } else if (code >= 32 && code <= 126) {
    const char = String.fromCodePoint(code);
    return char === '"' ? `'"'` : `"${char}"`;
  }
  return "U+" + code.toString(16).toUpperCase().padStart(4, "0");
}
function createToken(lexer, kind, start, end, value) {
  const line = lexer.line;
  const col = 1 + start - lexer.lineStart;
  return new Token(kind, start, end, line, col, value);
}
function readNextToken(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    switch (code) {
      case 65279:
      case 9:
      case 32:
      case 44:
        ++position;
        continue;
      case 10:
        ++position;
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 13:
        if (body.charCodeAt(position + 1) === 10) {
          position += 2;
        } else {
          ++position;
        }
        ++lexer.line;
        lexer.lineStart = position;
        continue;
      case 35:
        return readComment(lexer, position);
      case 33:
        return createToken(lexer, TokenKind.BANG, position, position + 1);
      case 36:
        return createToken(lexer, TokenKind.DOLLAR, position, position + 1);
      case 38:
        return createToken(lexer, TokenKind.AMP, position, position + 1);
      case 40:
        return createToken(lexer, TokenKind.PAREN_L, position, position + 1);
      case 41:
        return createToken(lexer, TokenKind.PAREN_R, position, position + 1);
      case 46:
        if (body.charCodeAt(position + 1) === 46 && body.charCodeAt(position + 2) === 46) {
          return createToken(lexer, TokenKind.SPREAD, position, position + 3);
        }
        break;
      case 58:
        return createToken(lexer, TokenKind.COLON, position, position + 1);
      case 61:
        return createToken(lexer, TokenKind.EQUALS, position, position + 1);
      case 64:
        return createToken(lexer, TokenKind.AT, position, position + 1);
      case 91:
        return createToken(lexer, TokenKind.BRACKET_L, position, position + 1);
      case 93:
        return createToken(lexer, TokenKind.BRACKET_R, position, position + 1);
      case 123:
        return createToken(lexer, TokenKind.BRACE_L, position, position + 1);
      case 124:
        return createToken(lexer, TokenKind.PIPE, position, position + 1);
      case 125:
        return createToken(lexer, TokenKind.BRACE_R, position, position + 1);
      case 34:
        if (body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
          return readBlockString(lexer, position);
        }
        return readString(lexer, position);
    }
    if (isDigit(code) || code === 45) {
      return readNumber(lexer, position, code);
    }
    if (isNameStart(code)) {
      return readName(lexer, position);
    }
    throw syntaxError(
      lexer.source,
      position,
      code === 39 ? `Unexpected single quote character ('), did you mean to use a double quote (")?` : isUnicodeScalarValue(code) || isSupplementaryCodePoint(body, position) ? `Unexpected character: ${printCodePointAt(lexer, position)}.` : `Invalid character: ${printCodePointAt(lexer, position)}.`
    );
  }
  return createToken(lexer, TokenKind.EOF, bodyLength, bodyLength);
}
function readComment(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.COMMENT,
    start,
    position,
    body.slice(start + 1, position)
  );
}
function readNumber(lexer, start, firstCode) {
  const body = lexer.source.body;
  let position = start;
  let code = firstCode;
  let isFloat = false;
  if (code === 45) {
    code = body.charCodeAt(++position);
  }
  if (code === 48) {
    code = body.charCodeAt(++position);
    if (isDigit(code)) {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid number, unexpected digit after 0: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  } else {
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46) {
    isFloat = true;
    code = body.charCodeAt(++position);
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 69 || code === 101) {
    isFloat = true;
    code = body.charCodeAt(++position);
    if (code === 43 || code === 45) {
      code = body.charCodeAt(++position);
    }
    position = readDigits(lexer, position, code);
    code = body.charCodeAt(position);
  }
  if (code === 46 || isNameStart(code)) {
    throw syntaxError(
      lexer.source,
      position,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        position
      )}.`
    );
  }
  return createToken(
    lexer,
    isFloat ? TokenKind.FLOAT : TokenKind.INT,
    start,
    position,
    body.slice(start, position)
  );
}
function readDigits(lexer, start, firstCode) {
  if (!isDigit(firstCode)) {
    throw syntaxError(
      lexer.source,
      start,
      `Invalid number, expected digit but got: ${printCodePointAt(
        lexer,
        start
      )}.`
    );
  }
  const body = lexer.source.body;
  let position = start + 1;
  while (isDigit(body.charCodeAt(position))) {
    ++position;
  }
  return position;
}
function readString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  let chunkStart = position;
  let value = "";
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34) {
      value += body.slice(chunkStart, position);
      return createToken(lexer, TokenKind.STRING, start, position + 1, value);
    }
    if (code === 92) {
      value += body.slice(chunkStart, position);
      const escape = body.charCodeAt(position + 1) === 117 ? body.charCodeAt(position + 2) === 123 ? readEscapedUnicodeVariableWidth(lexer, position) : readEscapedUnicodeFixedWidth(lexer, position) : readEscapedCharacter(lexer, position);
      value += escape.value;
      position += escape.size;
      chunkStart = position;
      continue;
    }
    if (code === 10 || code === 13) {
      break;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readEscapedUnicodeVariableWidth(lexer, position) {
  const body = lexer.source.body;
  let point = 0;
  let size = 3;
  while (size < 12) {
    const code = body.charCodeAt(position + size++);
    if (code === 125) {
      if (size < 5 || !isUnicodeScalarValue(point)) {
        break;
      }
      return {
        value: String.fromCodePoint(point),
        size
      };
    }
    point = point << 4 | readHexDigit(code);
    if (point < 0) {
      break;
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(
      position,
      position + size
    )}".`
  );
}
function readEscapedUnicodeFixedWidth(lexer, position) {
  const body = lexer.source.body;
  const code = read16BitHexCode(body, position + 2);
  if (isUnicodeScalarValue(code)) {
    return {
      value: String.fromCodePoint(code),
      size: 6
    };
  }
  if (isLeadingSurrogate(code)) {
    if (body.charCodeAt(position + 6) === 92 && body.charCodeAt(position + 7) === 117) {
      const trailingCode = read16BitHexCode(body, position + 8);
      if (isTrailingSurrogate(trailingCode)) {
        return {
          value: String.fromCodePoint(code, trailingCode),
          size: 12
        };
      }
    }
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid Unicode escape sequence: "${body.slice(position, position + 6)}".`
  );
}
function read16BitHexCode(body, position) {
  return readHexDigit(body.charCodeAt(position)) << 12 | readHexDigit(body.charCodeAt(position + 1)) << 8 | readHexDigit(body.charCodeAt(position + 2)) << 4 | readHexDigit(body.charCodeAt(position + 3));
}
function readHexDigit(code) {
  return code >= 48 && code <= 57 ? code - 48 : code >= 65 && code <= 70 ? code - 55 : code >= 97 && code <= 102 ? code - 87 : -1;
}
function readEscapedCharacter(lexer, position) {
  const body = lexer.source.body;
  const code = body.charCodeAt(position + 1);
  switch (code) {
    case 34:
      return {
        value: '"',
        size: 2
      };
    case 92:
      return {
        value: "\\",
        size: 2
      };
    case 47:
      return {
        value: "/",
        size: 2
      };
    case 98:
      return {
        value: "\b",
        size: 2
      };
    case 102:
      return {
        value: "\f",
        size: 2
      };
    case 110:
      return {
        value: "\n",
        size: 2
      };
    case 114:
      return {
        value: "\r",
        size: 2
      };
    case 116:
      return {
        value: "	",
        size: 2
      };
  }
  throw syntaxError(
    lexer.source,
    position,
    `Invalid character escape sequence: "${body.slice(
      position,
      position + 2
    )}".`
  );
}
function readBlockString(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let lineStart = lexer.lineStart;
  let position = start + 3;
  let chunkStart = position;
  let currentLine = "";
  const blockLines = [];
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (code === 34 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      const token = createToken(
        lexer,
        TokenKind.BLOCK_STRING,
        start,
        position + 3,
        dedentBlockStringLines(blockLines).join("\n")
      );
      lexer.line += blockLines.length - 1;
      lexer.lineStart = lineStart;
      return token;
    }
    if (code === 92 && body.charCodeAt(position + 1) === 34 && body.charCodeAt(position + 2) === 34 && body.charCodeAt(position + 3) === 34) {
      currentLine += body.slice(chunkStart, position);
      chunkStart = position + 1;
      position += 4;
      continue;
    }
    if (code === 10 || code === 13) {
      currentLine += body.slice(chunkStart, position);
      blockLines.push(currentLine);
      if (code === 13 && body.charCodeAt(position + 1) === 10) {
        position += 2;
      } else {
        ++position;
      }
      currentLine = "";
      chunkStart = position;
      lineStart = position;
      continue;
    }
    if (isUnicodeScalarValue(code)) {
      ++position;
    } else if (isSupplementaryCodePoint(body, position)) {
      position += 2;
    } else {
      throw syntaxError(
        lexer.source,
        position,
        `Invalid character within String: ${printCodePointAt(
          lexer,
          position
        )}.`
      );
    }
  }
  throw syntaxError(lexer.source, position, "Unterminated string.");
}
function readName(lexer, start) {
  const body = lexer.source.body;
  const bodyLength = body.length;
  let position = start + 1;
  while (position < bodyLength) {
    const code = body.charCodeAt(position);
    if (isNameContinue(code)) {
      ++position;
    } else {
      break;
    }
  }
  return createToken(
    lexer,
    TokenKind.NAME,
    start,
    position,
    body.slice(start, position)
  );
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/inspect.mjs
var MAX_ARRAY_LENGTH = 10;
var MAX_RECURSIVE_DEPTH = 2;
function inspect(value) {
  return formatValue(value, []);
}
function formatValue(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue(value, seenValues);
    default:
      return String(value);
  }
}
function formatObjectValue(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray(value, seenValues);
  }
  return formatObject(value, seenValues);
}
function isJSONable(value) {
  return typeof value.toJSON === "function";
}
function formatObject(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[" + getObjectTag(object) + "]";
  }
  const properties = entries.map(
    ([key, value]) => key + ": " + formatValue(value, seenValues)
  );
  return "{ " + properties.join(", ") + " }";
}
function formatArray(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH) {
    return "[Array]";
  }
  const len = Math.min(MAX_ARRAY_LENGTH, array.length);
  const remaining = array.length - len;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/instanceOf.mjs
var instanceOf = false ? function instanceOf2(value, constructor) {
  return value instanceof constructor;
} : function instanceOf3(value, constructor) {
  if (value instanceof constructor) {
    return true;
  }
  if (typeof value === "object" && value !== null) {
    var _value$constructor;
    const className = constructor.prototype[Symbol.toStringTag];
    const valueClassName = Symbol.toStringTag in value ? value[Symbol.toStringTag] : (_value$constructor = value.constructor) === null || _value$constructor === void 0 ? void 0 : _value$constructor.name;
    if (className === valueClassName) {
      const stringifiedValue = inspect(value);
      throw new Error(`Cannot use ${className} "${stringifiedValue}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`);
    }
  }
  return false;
};

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/source.mjs
var Source = class {
  constructor(body, name = "GraphQL request", locationOffset = {
    line: 1,
    column: 1
  }) {
    typeof body === "string" || devAssert(false, `Body must be a string. Received: ${inspect(body)}.`);
    this.body = body;
    this.name = name;
    this.locationOffset = locationOffset;
    this.locationOffset.line > 0 || devAssert(
      false,
      "line in locationOffset is 1-indexed and must be positive."
    );
    this.locationOffset.column > 0 || devAssert(
      false,
      "column in locationOffset is 1-indexed and must be positive."
    );
  }
  get [Symbol.toStringTag]() {
    return "Source";
  }
};
function isSource(source) {
  return instanceOf(source, Source);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/parser.mjs
function parse(source, options) {
  const parser = new Parser(source, options);
  return parser.parseDocument();
}
var Parser = class {
  constructor(source, options = {}) {
    const sourceObj = isSource(source) ? source : new Source(source);
    this._lexer = new Lexer(sourceObj);
    this._options = options;
    this._tokenCounter = 0;
  }
  parseName() {
    const token = this.expectToken(TokenKind.NAME);
    return this.node(token, {
      kind: Kind.NAME,
      value: token.value
    });
  }
  parseDocument() {
    return this.node(this._lexer.token, {
      kind: Kind.DOCUMENT,
      definitions: this.many(
        TokenKind.SOF,
        this.parseDefinition,
        TokenKind.EOF
      )
    });
  }
  parseDefinition() {
    if (this.peek(TokenKind.BRACE_L)) {
      return this.parseOperationDefinition();
    }
    const hasDescription = this.peekDescription();
    const keywordToken = hasDescription ? this._lexer.lookahead() : this._lexer.token;
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaDefinition();
        case "scalar":
          return this.parseScalarTypeDefinition();
        case "type":
          return this.parseObjectTypeDefinition();
        case "interface":
          return this.parseInterfaceTypeDefinition();
        case "union":
          return this.parseUnionTypeDefinition();
        case "enum":
          return this.parseEnumTypeDefinition();
        case "input":
          return this.parseInputObjectTypeDefinition();
        case "directive":
          return this.parseDirectiveDefinition();
      }
      if (hasDescription) {
        throw syntaxError(
          this._lexer.source,
          this._lexer.token.start,
          "Unexpected description, descriptions are supported only on type definitions."
        );
      }
      switch (keywordToken.value) {
        case "query":
        case "mutation":
        case "subscription":
          return this.parseOperationDefinition();
        case "fragment":
          return this.parseFragmentDefinition();
        case "extend":
          return this.parseTypeSystemExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  parseOperationDefinition() {
    const start = this._lexer.token;
    if (this.peek(TokenKind.BRACE_L)) {
      return this.node(start, {
        kind: Kind.OPERATION_DEFINITION,
        operation: OperationTypeNode.QUERY,
        name: void 0,
        variableDefinitions: [],
        directives: [],
        selectionSet: this.parseSelectionSet()
      });
    }
    const operation = this.parseOperationType();
    let name;
    if (this.peek(TokenKind.NAME)) {
      name = this.parseName();
    }
    return this.node(start, {
      kind: Kind.OPERATION_DEFINITION,
      operation,
      name,
      variableDefinitions: this.parseVariableDefinitions(),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseOperationType() {
    const operationToken = this.expectToken(TokenKind.NAME);
    switch (operationToken.value) {
      case "query":
        return OperationTypeNode.QUERY;
      case "mutation":
        return OperationTypeNode.MUTATION;
      case "subscription":
        return OperationTypeNode.SUBSCRIPTION;
    }
    throw this.unexpected(operationToken);
  }
  parseVariableDefinitions() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseVariableDefinition,
      TokenKind.PAREN_R
    );
  }
  parseVariableDefinition() {
    return this.node(this._lexer.token, {
      kind: Kind.VARIABLE_DEFINITION,
      variable: this.parseVariable(),
      type: (this.expectToken(TokenKind.COLON), this.parseTypeReference()),
      defaultValue: this.expectOptionalToken(TokenKind.EQUALS) ? this.parseConstValueLiteral() : void 0,
      directives: this.parseConstDirectives()
    });
  }
  parseVariable() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.DOLLAR);
    return this.node(start, {
      kind: Kind.VARIABLE,
      name: this.parseName()
    });
  }
  parseSelectionSet() {
    return this.node(this._lexer.token, {
      kind: Kind.SELECTION_SET,
      selections: this.many(
        TokenKind.BRACE_L,
        this.parseSelection,
        TokenKind.BRACE_R
      )
    });
  }
  parseSelection() {
    return this.peek(TokenKind.SPREAD) ? this.parseFragment() : this.parseField();
  }
  parseField() {
    const start = this._lexer.token;
    const nameOrAlias = this.parseName();
    let alias;
    let name;
    if (this.expectOptionalToken(TokenKind.COLON)) {
      alias = nameOrAlias;
      name = this.parseName();
    } else {
      name = nameOrAlias;
    }
    return this.node(start, {
      kind: Kind.FIELD,
      alias,
      name,
      arguments: this.parseArguments(false),
      directives: this.parseDirectives(false),
      selectionSet: this.peek(TokenKind.BRACE_L) ? this.parseSelectionSet() : void 0
    });
  }
  parseArguments(isConst) {
    const item = isConst ? this.parseConstArgument : this.parseArgument;
    return this.optionalMany(TokenKind.PAREN_L, item, TokenKind.PAREN_R);
  }
  parseArgument(isConst = false) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.ARGUMENT,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  parseConstArgument() {
    return this.parseArgument(true);
  }
  parseFragment() {
    const start = this._lexer.token;
    this.expectToken(TokenKind.SPREAD);
    const hasTypeCondition = this.expectOptionalKeyword("on");
    if (!hasTypeCondition && this.peek(TokenKind.NAME)) {
      return this.node(start, {
        kind: Kind.FRAGMENT_SPREAD,
        name: this.parseFragmentName(),
        directives: this.parseDirectives(false)
      });
    }
    return this.node(start, {
      kind: Kind.INLINE_FRAGMENT,
      typeCondition: hasTypeCondition ? this.parseNamedType() : void 0,
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseFragmentDefinition() {
    const start = this._lexer.token;
    this.expectKeyword("fragment");
    if (this._options.allowLegacyFragmentVariables === true) {
      return this.node(start, {
        kind: Kind.FRAGMENT_DEFINITION,
        name: this.parseFragmentName(),
        variableDefinitions: this.parseVariableDefinitions(),
        typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
        directives: this.parseDirectives(false),
        selectionSet: this.parseSelectionSet()
      });
    }
    return this.node(start, {
      kind: Kind.FRAGMENT_DEFINITION,
      name: this.parseFragmentName(),
      typeCondition: (this.expectKeyword("on"), this.parseNamedType()),
      directives: this.parseDirectives(false),
      selectionSet: this.parseSelectionSet()
    });
  }
  parseFragmentName() {
    if (this._lexer.token.value === "on") {
      throw this.unexpected();
    }
    return this.parseName();
  }
  parseValueLiteral(isConst) {
    const token = this._lexer.token;
    switch (token.kind) {
      case TokenKind.BRACKET_L:
        return this.parseList(isConst);
      case TokenKind.BRACE_L:
        return this.parseObject(isConst);
      case TokenKind.INT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.INT,
          value: token.value
        });
      case TokenKind.FLOAT:
        this.advanceLexer();
        return this.node(token, {
          kind: Kind.FLOAT,
          value: token.value
        });
      case TokenKind.STRING:
      case TokenKind.BLOCK_STRING:
        return this.parseStringLiteral();
      case TokenKind.NAME:
        this.advanceLexer();
        switch (token.value) {
          case "true":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: true
            });
          case "false":
            return this.node(token, {
              kind: Kind.BOOLEAN,
              value: false
            });
          case "null":
            return this.node(token, {
              kind: Kind.NULL
            });
          default:
            return this.node(token, {
              kind: Kind.ENUM,
              value: token.value
            });
        }
      case TokenKind.DOLLAR:
        if (isConst) {
          this.expectToken(TokenKind.DOLLAR);
          if (this._lexer.token.kind === TokenKind.NAME) {
            const varName = this._lexer.token.value;
            throw syntaxError(
              this._lexer.source,
              token.start,
              `Unexpected variable "$${varName}" in constant value.`
            );
          } else {
            throw this.unexpected(token);
          }
        }
        return this.parseVariable();
      default:
        throw this.unexpected();
    }
  }
  parseConstValueLiteral() {
    return this.parseValueLiteral(true);
  }
  parseStringLiteral() {
    const token = this._lexer.token;
    this.advanceLexer();
    return this.node(token, {
      kind: Kind.STRING,
      value: token.value,
      block: token.kind === TokenKind.BLOCK_STRING
    });
  }
  parseList(isConst) {
    const item = () => this.parseValueLiteral(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.LIST,
      values: this.any(TokenKind.BRACKET_L, item, TokenKind.BRACKET_R)
    });
  }
  parseObject(isConst) {
    const item = () => this.parseObjectField(isConst);
    return this.node(this._lexer.token, {
      kind: Kind.OBJECT,
      fields: this.any(TokenKind.BRACE_L, item, TokenKind.BRACE_R)
    });
  }
  parseObjectField(isConst) {
    const start = this._lexer.token;
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    return this.node(start, {
      kind: Kind.OBJECT_FIELD,
      name,
      value: this.parseValueLiteral(isConst)
    });
  }
  parseDirectives(isConst) {
    const directives = [];
    while (this.peek(TokenKind.AT)) {
      directives.push(this.parseDirective(isConst));
    }
    return directives;
  }
  parseConstDirectives() {
    return this.parseDirectives(true);
  }
  parseDirective(isConst) {
    const start = this._lexer.token;
    this.expectToken(TokenKind.AT);
    return this.node(start, {
      kind: Kind.DIRECTIVE,
      name: this.parseName(),
      arguments: this.parseArguments(isConst)
    });
  }
  parseTypeReference() {
    const start = this._lexer.token;
    let type;
    if (this.expectOptionalToken(TokenKind.BRACKET_L)) {
      const innerType = this.parseTypeReference();
      this.expectToken(TokenKind.BRACKET_R);
      type = this.node(start, {
        kind: Kind.LIST_TYPE,
        type: innerType
      });
    } else {
      type = this.parseNamedType();
    }
    if (this.expectOptionalToken(TokenKind.BANG)) {
      return this.node(start, {
        kind: Kind.NON_NULL_TYPE,
        type
      });
    }
    return type;
  }
  parseNamedType() {
    return this.node(this._lexer.token, {
      kind: Kind.NAMED_TYPE,
      name: this.parseName()
    });
  }
  peekDescription() {
    return this.peek(TokenKind.STRING) || this.peek(TokenKind.BLOCK_STRING);
  }
  parseDescription() {
    if (this.peekDescription()) {
      return this.parseStringLiteral();
    }
  }
  parseSchemaDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.many(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R
    );
    return this.node(start, {
      kind: Kind.SCHEMA_DEFINITION,
      description,
      directives,
      operationTypes
    });
  }
  parseOperationTypeDefinition() {
    const start = this._lexer.token;
    const operation = this.parseOperationType();
    this.expectToken(TokenKind.COLON);
    const type = this.parseNamedType();
    return this.node(start, {
      kind: Kind.OPERATION_TYPE_DEFINITION,
      operation,
      type
    });
  }
  parseScalarTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_DEFINITION,
      description,
      name,
      directives
    });
  }
  parseObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseImplementsInterfaces() {
    return this.expectOptionalKeyword("implements") ? this.delimitedMany(TokenKind.AMP, this.parseNamedType) : [];
  }
  parseFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseFieldDefinition,
      TokenKind.BRACE_R
    );
  }
  parseFieldDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.FIELD_DEFINITION,
      description,
      name,
      arguments: args,
      type,
      directives
    });
  }
  parseArgumentDefs() {
    return this.optionalMany(
      TokenKind.PAREN_L,
      this.parseInputValueDef,
      TokenKind.PAREN_R
    );
  }
  parseInputValueDef() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseName();
    this.expectToken(TokenKind.COLON);
    const type = this.parseTypeReference();
    let defaultValue;
    if (this.expectOptionalToken(TokenKind.EQUALS)) {
      defaultValue = this.parseConstValueLiteral();
    }
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.INPUT_VALUE_DEFINITION,
      description,
      name,
      type,
      defaultValue,
      directives
    });
  }
  parseInterfaceTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_DEFINITION,
      description,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseUnionTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    return this.node(start, {
      kind: Kind.UNION_TYPE_DEFINITION,
      description,
      name,
      directives,
      types
    });
  }
  parseUnionMemberTypes() {
    return this.expectOptionalToken(TokenKind.EQUALS) ? this.delimitedMany(TokenKind.PIPE, this.parseNamedType) : [];
  }
  parseEnumTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    return this.node(start, {
      kind: Kind.ENUM_TYPE_DEFINITION,
      description,
      name,
      directives,
      values
    });
  }
  parseEnumValuesDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseEnumValueDefinition,
      TokenKind.BRACE_R
    );
  }
  parseEnumValueDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    const name = this.parseEnumValueName();
    const directives = this.parseConstDirectives();
    return this.node(start, {
      kind: Kind.ENUM_VALUE_DEFINITION,
      description,
      name,
      directives
    });
  }
  parseEnumValueName() {
    if (this._lexer.token.value === "true" || this._lexer.token.value === "false" || this._lexer.token.value === "null") {
      throw syntaxError(
        this._lexer.source,
        this._lexer.token.start,
        `${getTokenDesc(
          this._lexer.token
        )} is reserved and cannot be used for an enum value.`
      );
    }
    return this.parseName();
  }
  parseInputObjectTypeDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
      description,
      name,
      directives,
      fields
    });
  }
  parseInputFieldsDefinition() {
    return this.optionalMany(
      TokenKind.BRACE_L,
      this.parseInputValueDef,
      TokenKind.BRACE_R
    );
  }
  parseTypeSystemExtension() {
    const keywordToken = this._lexer.lookahead();
    if (keywordToken.kind === TokenKind.NAME) {
      switch (keywordToken.value) {
        case "schema":
          return this.parseSchemaExtension();
        case "scalar":
          return this.parseScalarTypeExtension();
        case "type":
          return this.parseObjectTypeExtension();
        case "interface":
          return this.parseInterfaceTypeExtension();
        case "union":
          return this.parseUnionTypeExtension();
        case "enum":
          return this.parseEnumTypeExtension();
        case "input":
          return this.parseInputObjectTypeExtension();
      }
    }
    throw this.unexpected(keywordToken);
  }
  parseSchemaExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("schema");
    const directives = this.parseConstDirectives();
    const operationTypes = this.optionalMany(
      TokenKind.BRACE_L,
      this.parseOperationTypeDefinition,
      TokenKind.BRACE_R
    );
    if (directives.length === 0 && operationTypes.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCHEMA_EXTENSION,
      directives,
      operationTypes
    });
  }
  parseScalarTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("scalar");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    if (directives.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.SCALAR_TYPE_EXTENSION,
      name,
      directives
    });
  }
  parseObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("type");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.OBJECT_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseInterfaceTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("interface");
    const name = this.parseName();
    const interfaces = this.parseImplementsInterfaces();
    const directives = this.parseConstDirectives();
    const fields = this.parseFieldsDefinition();
    if (interfaces.length === 0 && directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INTERFACE_TYPE_EXTENSION,
      name,
      interfaces,
      directives,
      fields
    });
  }
  parseUnionTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("union");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const types = this.parseUnionMemberTypes();
    if (directives.length === 0 && types.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.UNION_TYPE_EXTENSION,
      name,
      directives,
      types
    });
  }
  parseEnumTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("enum");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const values = this.parseEnumValuesDefinition();
    if (directives.length === 0 && values.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.ENUM_TYPE_EXTENSION,
      name,
      directives,
      values
    });
  }
  parseInputObjectTypeExtension() {
    const start = this._lexer.token;
    this.expectKeyword("extend");
    this.expectKeyword("input");
    const name = this.parseName();
    const directives = this.parseConstDirectives();
    const fields = this.parseInputFieldsDefinition();
    if (directives.length === 0 && fields.length === 0) {
      throw this.unexpected();
    }
    return this.node(start, {
      kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
      name,
      directives,
      fields
    });
  }
  parseDirectiveDefinition() {
    const start = this._lexer.token;
    const description = this.parseDescription();
    this.expectKeyword("directive");
    this.expectToken(TokenKind.AT);
    const name = this.parseName();
    const args = this.parseArgumentDefs();
    const repeatable = this.expectOptionalKeyword("repeatable");
    this.expectKeyword("on");
    const locations = this.parseDirectiveLocations();
    return this.node(start, {
      kind: Kind.DIRECTIVE_DEFINITION,
      description,
      name,
      arguments: args,
      repeatable,
      locations
    });
  }
  parseDirectiveLocations() {
    return this.delimitedMany(TokenKind.PIPE, this.parseDirectiveLocation);
  }
  parseDirectiveLocation() {
    const start = this._lexer.token;
    const name = this.parseName();
    if (Object.prototype.hasOwnProperty.call(DirectiveLocation, name.value)) {
      return name;
    }
    throw this.unexpected(start);
  }
  node(startToken, node) {
    if (this._options.noLocation !== true) {
      node.loc = new Location(
        startToken,
        this._lexer.lastToken,
        this._lexer.source
      );
    }
    return node;
  }
  peek(kind) {
    return this._lexer.token.kind === kind;
  }
  expectToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return token;
    }
    throw syntaxError(
      this._lexer.source,
      token.start,
      `Expected ${getTokenKindDesc(kind)}, found ${getTokenDesc(token)}.`
    );
  }
  expectOptionalToken(kind) {
    const token = this._lexer.token;
    if (token.kind === kind) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  expectKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
    } else {
      throw syntaxError(
        this._lexer.source,
        token.start,
        `Expected "${value}", found ${getTokenDesc(token)}.`
      );
    }
  }
  expectOptionalKeyword(value) {
    const token = this._lexer.token;
    if (token.kind === TokenKind.NAME && token.value === value) {
      this.advanceLexer();
      return true;
    }
    return false;
  }
  unexpected(atToken) {
    const token = atToken !== null && atToken !== void 0 ? atToken : this._lexer.token;
    return syntaxError(
      this._lexer.source,
      token.start,
      `Unexpected ${getTokenDesc(token)}.`
    );
  }
  any(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    while (!this.expectOptionalToken(closeKind)) {
      nodes.push(parseFn.call(this));
    }
    return nodes;
  }
  optionalMany(openKind, parseFn, closeKind) {
    if (this.expectOptionalToken(openKind)) {
      const nodes = [];
      do {
        nodes.push(parseFn.call(this));
      } while (!this.expectOptionalToken(closeKind));
      return nodes;
    }
    return [];
  }
  many(openKind, parseFn, closeKind) {
    this.expectToken(openKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (!this.expectOptionalToken(closeKind));
    return nodes;
  }
  delimitedMany(delimiterKind, parseFn) {
    this.expectOptionalToken(delimiterKind);
    const nodes = [];
    do {
      nodes.push(parseFn.call(this));
    } while (this.expectOptionalToken(delimiterKind));
    return nodes;
  }
  advanceLexer() {
    const { maxTokens } = this._options;
    const token = this._lexer.advance();
    if (maxTokens !== void 0 && token.kind !== TokenKind.EOF) {
      ++this._tokenCounter;
      if (this._tokenCounter > maxTokens) {
        throw syntaxError(
          this._lexer.source,
          token.start,
          `Document contains more that ${maxTokens} tokens. Parsing aborted.`
        );
      }
    }
  }
};
function getTokenDesc(token) {
  const value = token.value;
  return getTokenKindDesc(token.kind) + (value != null ? ` "${value}"` : "");
}
function getTokenKindDesc(kind) {
  return isPunctuatorTokenKind(kind) ? `"${kind}"` : kind;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/didYouMean.mjs
var MAX_SUGGESTIONS = 5;
function didYouMean(firstArg, secondArg) {
  const [subMessage, suggestionsArg] = secondArg ? [firstArg, secondArg] : [void 0, firstArg];
  let message = " Did you mean ";
  if (subMessage) {
    message += subMessage + " ";
  }
  const suggestions = suggestionsArg.map((x) => `"${x}"`);
  switch (suggestions.length) {
    case 0:
      return "";
    case 1:
      return message + suggestions[0] + "?";
    case 2:
      return message + suggestions[0] + " or " + suggestions[1] + "?";
  }
  const selected = suggestions.slice(0, MAX_SUGGESTIONS);
  const lastItem = selected.pop();
  return message + selected.join(", ") + ", or " + lastItem + "?";
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/identityFunc.mjs
function identityFunc(x) {
  return x;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/keyMap.mjs
function keyMap(list, keyFn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result[keyFn(item)] = item;
  }
  return result;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/keyValMap.mjs
function keyValMap(list, keyFn, valFn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const item of list) {
    result[keyFn(item)] = valFn(item);
  }
  return result;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/mapValue.mjs
function mapValue(map2, fn) {
  const result = /* @__PURE__ */ Object.create(null);
  for (const key of Object.keys(map2)) {
    result[key] = fn(map2[key], key);
  }
  return result;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/naturalCompare.mjs
function naturalCompare(aStr, bStr) {
  let aIndex = 0;
  let bIndex = 0;
  while (aIndex < aStr.length && bIndex < bStr.length) {
    let aChar = aStr.charCodeAt(aIndex);
    let bChar = bStr.charCodeAt(bIndex);
    if (isDigit2(aChar) && isDigit2(bChar)) {
      let aNum = 0;
      do {
        ++aIndex;
        aNum = aNum * 10 + aChar - DIGIT_0;
        aChar = aStr.charCodeAt(aIndex);
      } while (isDigit2(aChar) && aNum > 0);
      let bNum = 0;
      do {
        ++bIndex;
        bNum = bNum * 10 + bChar - DIGIT_0;
        bChar = bStr.charCodeAt(bIndex);
      } while (isDigit2(bChar) && bNum > 0);
      if (aNum < bNum) {
        return -1;
      }
      if (aNum > bNum) {
        return 1;
      }
    } else {
      if (aChar < bChar) {
        return -1;
      }
      if (aChar > bChar) {
        return 1;
      }
      ++aIndex;
      ++bIndex;
    }
  }
  return aStr.length - bStr.length;
}
var DIGIT_0 = 48;
var DIGIT_9 = 57;
function isDigit2(code) {
  return !isNaN(code) && DIGIT_0 <= code && code <= DIGIT_9;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/suggestionList.mjs
function suggestionList(input, options) {
  const optionsByDistance = /* @__PURE__ */ Object.create(null);
  const lexicalDistance = new LexicalDistance(input);
  const threshold = Math.floor(input.length * 0.4) + 1;
  for (const option of options) {
    const distance = lexicalDistance.measure(option, threshold);
    if (distance !== void 0) {
      optionsByDistance[option] = distance;
    }
  }
  return Object.keys(optionsByDistance).sort((a, b) => {
    const distanceDiff = optionsByDistance[a] - optionsByDistance[b];
    return distanceDiff !== 0 ? distanceDiff : naturalCompare(a, b);
  });
}
var LexicalDistance = class {
  constructor(input) {
    this._input = input;
    this._inputLowerCase = input.toLowerCase();
    this._inputArray = stringToArray(this._inputLowerCase);
    this._rows = [
      new Array(input.length + 1).fill(0),
      new Array(input.length + 1).fill(0),
      new Array(input.length + 1).fill(0)
    ];
  }
  measure(option, threshold) {
    if (this._input === option) {
      return 0;
    }
    const optionLowerCase = option.toLowerCase();
    if (this._inputLowerCase === optionLowerCase) {
      return 1;
    }
    let a = stringToArray(optionLowerCase);
    let b = this._inputArray;
    if (a.length < b.length) {
      const tmp = a;
      a = b;
      b = tmp;
    }
    const aLength = a.length;
    const bLength = b.length;
    if (aLength - bLength > threshold) {
      return void 0;
    }
    const rows = this._rows;
    for (let j = 0; j <= bLength; j++) {
      rows[0][j] = j;
    }
    for (let i = 1; i <= aLength; i++) {
      const upRow = rows[(i - 1) % 3];
      const currentRow = rows[i % 3];
      let smallestCell = currentRow[0] = i;
      for (let j = 1; j <= bLength; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let currentCell = Math.min(
          upRow[j] + 1,
          currentRow[j - 1] + 1,
          upRow[j - 1] + cost
        );
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          const doubleDiagonalCell = rows[(i - 2) % 3][j - 2];
          currentCell = Math.min(currentCell, doubleDiagonalCell + 1);
        }
        if (currentCell < smallestCell) {
          smallestCell = currentCell;
        }
        currentRow[j] = currentCell;
      }
      if (smallestCell > threshold) {
        return void 0;
      }
    }
    const distance = rows[aLength % 3][bLength];
    return distance <= threshold ? distance : void 0;
  }
};
function stringToArray(str) {
  const strLength = str.length;
  const array = new Array(strLength);
  for (let i = 0; i < strLength; ++i) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/toObjMap.mjs
function toObjMap(obj) {
  if (obj == null) {
    return /* @__PURE__ */ Object.create(null);
  }
  if (Object.getPrototypeOf(obj) === null) {
    return obj;
  }
  const map2 = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of Object.entries(obj)) {
    map2[key] = value;
  }
  return map2;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/printString.mjs
function printString(str) {
  return `"${str.replace(escapedRegExp, escapedReplacer)}"`;
}
var escapedRegExp = /[\x00-\x1f\x22\x5c\x7f-\x9f]/g;
function escapedReplacer(str) {
  return escapeSequences[str.charCodeAt(0)];
}
var escapeSequences = [
  "\\u0000",
  "\\u0001",
  "\\u0002",
  "\\u0003",
  "\\u0004",
  "\\u0005",
  "\\u0006",
  "\\u0007",
  "\\b",
  "\\t",
  "\\n",
  "\\u000B",
  "\\f",
  "\\r",
  "\\u000E",
  "\\u000F",
  "\\u0010",
  "\\u0011",
  "\\u0012",
  "\\u0013",
  "\\u0014",
  "\\u0015",
  "\\u0016",
  "\\u0017",
  "\\u0018",
  "\\u0019",
  "\\u001A",
  "\\u001B",
  "\\u001C",
  "\\u001D",
  "\\u001E",
  "\\u001F",
  "",
  "",
  '\\"',
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\\\",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "\\u007F",
  "\\u0080",
  "\\u0081",
  "\\u0082",
  "\\u0083",
  "\\u0084",
  "\\u0085",
  "\\u0086",
  "\\u0087",
  "\\u0088",
  "\\u0089",
  "\\u008A",
  "\\u008B",
  "\\u008C",
  "\\u008D",
  "\\u008E",
  "\\u008F",
  "\\u0090",
  "\\u0091",
  "\\u0092",
  "\\u0093",
  "\\u0094",
  "\\u0095",
  "\\u0096",
  "\\u0097",
  "\\u0098",
  "\\u0099",
  "\\u009A",
  "\\u009B",
  "\\u009C",
  "\\u009D",
  "\\u009E",
  "\\u009F"
];

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/visitor.mjs
var BREAK = Object.freeze({});
function visit(root, visitor, visitorKeys = QueryDocumentKeys) {
  const enterLeaveMap = /* @__PURE__ */ new Map();
  for (const kind of Object.values(Kind)) {
    enterLeaveMap.set(kind, getEnterLeaveForKind(visitor, kind));
  }
  let stack = void 0;
  let inArray = Array.isArray(root);
  let keys = [root];
  let index = -1;
  let edits = [];
  let node = root;
  let key = void 0;
  let parent = void 0;
  const path = [];
  const ancestors = [];
  do {
    index++;
    const isLeaving = index === keys.length;
    const isEdited = isLeaving && edits.length !== 0;
    if (isLeaving) {
      key = ancestors.length === 0 ? void 0 : path[path.length - 1];
      node = parent;
      parent = ancestors.pop();
      if (isEdited) {
        if (inArray) {
          node = node.slice();
          let editOffset = 0;
          for (const [editKey, editValue] of edits) {
            const arrayKey = editKey - editOffset;
            if (editValue === null) {
              node.splice(arrayKey, 1);
              editOffset++;
            } else {
              node[arrayKey] = editValue;
            }
          }
        } else {
          node = Object.defineProperties(
            {},
            Object.getOwnPropertyDescriptors(node)
          );
          for (const [editKey, editValue] of edits) {
            node[editKey] = editValue;
          }
        }
      }
      index = stack.index;
      keys = stack.keys;
      edits = stack.edits;
      inArray = stack.inArray;
      stack = stack.prev;
    } else if (parent) {
      key = inArray ? index : keys[index];
      node = parent[key];
      if (node === null || node === void 0) {
        continue;
      }
      path.push(key);
    }
    let result;
    if (!Array.isArray(node)) {
      var _enterLeaveMap$get, _enterLeaveMap$get2;
      isNode(node) || devAssert(false, `Invalid AST Node: ${inspect(node)}.`);
      const visitFn = isLeaving ? (_enterLeaveMap$get = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get === void 0 ? void 0 : _enterLeaveMap$get.leave : (_enterLeaveMap$get2 = enterLeaveMap.get(node.kind)) === null || _enterLeaveMap$get2 === void 0 ? void 0 : _enterLeaveMap$get2.enter;
      result = visitFn === null || visitFn === void 0 ? void 0 : visitFn.call(visitor, node, key, parent, path, ancestors);
      if (result === BREAK) {
        break;
      }
      if (result === false) {
        if (!isLeaving) {
          path.pop();
          continue;
        }
      } else if (result !== void 0) {
        edits.push([key, result]);
        if (!isLeaving) {
          if (isNode(result)) {
            node = result;
          } else {
            path.pop();
            continue;
          }
        }
      }
    }
    if (result === void 0 && isEdited) {
      edits.push([key, node]);
    }
    if (isLeaving) {
      path.pop();
    } else {
      var _node$kind;
      stack = {
        inArray,
        index,
        keys,
        edits,
        prev: stack
      };
      inArray = Array.isArray(node);
      keys = inArray ? node : (_node$kind = visitorKeys[node.kind]) !== null && _node$kind !== void 0 ? _node$kind : [];
      index = -1;
      edits = [];
      if (parent) {
        ancestors.push(parent);
      }
      parent = node;
    }
  } while (stack !== void 0);
  if (edits.length !== 0) {
    return edits[edits.length - 1][1];
  }
  return root;
}
function visitInParallel(visitors) {
  const skipping = new Array(visitors.length).fill(null);
  const mergedVisitor = /* @__PURE__ */ Object.create(null);
  for (const kind of Object.values(Kind)) {
    let hasVisitor = false;
    const enterList = new Array(visitors.length).fill(void 0);
    const leaveList = new Array(visitors.length).fill(void 0);
    for (let i = 0; i < visitors.length; ++i) {
      const { enter, leave } = getEnterLeaveForKind(visitors[i], kind);
      hasVisitor || (hasVisitor = enter != null || leave != null);
      enterList[i] = enter;
      leaveList[i] = leave;
    }
    if (!hasVisitor) {
      continue;
    }
    const mergedEnterLeave = {
      enter(...args) {
        const node = args[0];
        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _enterList$i;
            const result = (_enterList$i = enterList[i]) === null || _enterList$i === void 0 ? void 0 : _enterList$i.apply(visitors[i], args);
            if (result === false) {
              skipping[i] = node;
            } else if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0) {
              return result;
            }
          }
        }
      },
      leave(...args) {
        const node = args[0];
        for (let i = 0; i < visitors.length; i++) {
          if (skipping[i] === null) {
            var _leaveList$i;
            const result = (_leaveList$i = leaveList[i]) === null || _leaveList$i === void 0 ? void 0 : _leaveList$i.apply(visitors[i], args);
            if (result === BREAK) {
              skipping[i] = BREAK;
            } else if (result !== void 0 && result !== false) {
              return result;
            }
          } else if (skipping[i] === node) {
            skipping[i] = null;
          }
        }
      }
    };
    mergedVisitor[kind] = mergedEnterLeave;
  }
  return mergedVisitor;
}
function getEnterLeaveForKind(visitor, kind) {
  const kindVisitor = visitor[kind];
  if (typeof kindVisitor === "object") {
    return kindVisitor;
  } else if (typeof kindVisitor === "function") {
    return {
      enter: kindVisitor,
      leave: void 0
    };
  }
  return {
    enter: visitor.enter,
    leave: visitor.leave
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/printer.mjs
function print(ast) {
  return visit(ast, printDocASTReducer);
}
var MAX_LINE_LENGTH = 80;
var printDocASTReducer = {
  Name: {
    leave: (node) => node.value
  },
  Variable: {
    leave: (node) => "$" + node.name
  },
  Document: {
    leave: (node) => join(node.definitions, "\n\n")
  },
  OperationDefinition: {
    leave(node) {
      const varDefs = wrap("(", join(node.variableDefinitions, ", "), ")");
      const prefix2 = join(
        [
          node.operation,
          join([node.name, varDefs]),
          join(node.directives, " ")
        ],
        " "
      );
      return (prefix2 === "query" ? "" : prefix2 + " ") + node.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap(" = ", defaultValue) + wrap(" ", join(directives, " "))
  },
  SelectionSet: {
    leave: ({ selections }) => block(selections)
  },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix2 = wrap("", alias, ": ") + name;
      let argsLine = prefix2 + wrap("(", join(args, ", "), ")");
      if (argsLine.length > MAX_LINE_LENGTH) {
        argsLine = prefix2 + wrap("(\n", indent(join(args, "\n")), "\n)");
      }
      return join([argsLine, join(directives, " "), selectionSet], " ");
    }
  },
  Argument: {
    leave: ({ name, value }) => name + ": " + value
  },
  FragmentSpread: {
    leave: ({ name, directives }) => "..." + name + wrap(" ", join(directives, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) => join(
      [
        "...",
        wrap("on ", typeCondition),
        join(directives, " "),
        selectionSet
      ],
      " "
    )
  },
  FragmentDefinition: {
    leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => `fragment ${name}${wrap("(", join(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap("", join(directives, " "), " ")}` + selectionSet
  },
  IntValue: {
    leave: ({ value }) => value
  },
  FloatValue: {
    leave: ({ value }) => value
  },
  StringValue: {
    leave: ({ value, block: isBlockString }) => isBlockString ? printBlockString(value) : printString(value)
  },
  BooleanValue: {
    leave: ({ value }) => value ? "true" : "false"
  },
  NullValue: {
    leave: () => "null"
  },
  EnumValue: {
    leave: ({ value }) => value
  },
  ListValue: {
    leave: ({ values }) => "[" + join(values, ", ") + "]"
  },
  ObjectValue: {
    leave: ({ fields }) => "{" + join(fields, ", ") + "}"
  },
  ObjectField: {
    leave: ({ name, value }) => name + ": " + value
  },
  Directive: {
    leave: ({ name, arguments: args }) => "@" + name + wrap("(", join(args, ", "), ")")
  },
  NamedType: {
    leave: ({ name }) => name
  },
  ListType: {
    leave: ({ type }) => "[" + type + "]"
  },
  NonNullType: {
    leave: ({ type }) => type + "!"
  },
  SchemaDefinition: {
    leave: ({ description, directives, operationTypes }) => wrap("", description, "\n") + join(["schema", join(directives, " "), block(operationTypes)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ": " + type
  },
  ScalarTypeDefinition: {
    leave: ({ description, name, directives }) => wrap("", description, "\n") + join(["scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
      [
        "type",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  FieldDefinition: {
    leave: ({ description, name, arguments: args, type, directives }) => wrap("", description, "\n") + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + ": " + type + wrap(" ", join(directives, " "))
  },
  InputValueDefinition: {
    leave: ({ description, name, type, defaultValue, directives }) => wrap("", description, "\n") + join(
      [name + ": " + type, wrap("= ", defaultValue), join(directives, " ")],
      " "
    )
  },
  InterfaceTypeDefinition: {
    leave: ({ description, name, interfaces, directives, fields }) => wrap("", description, "\n") + join(
      [
        "interface",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  UnionTypeDefinition: {
    leave: ({ description, name, directives, types }) => wrap("", description, "\n") + join(
      ["union", name, join(directives, " "), wrap("= ", join(types, " | "))],
      " "
    )
  },
  EnumTypeDefinition: {
    leave: ({ description, name, directives, values }) => wrap("", description, "\n") + join(["enum", name, join(directives, " "), block(values)], " ")
  },
  EnumValueDefinition: {
    leave: ({ description, name, directives }) => wrap("", description, "\n") + join([name, join(directives, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ description, name, directives, fields }) => wrap("", description, "\n") + join(["input", name, join(directives, " "), block(fields)], " ")
  },
  DirectiveDefinition: {
    leave: ({ description, name, arguments: args, repeatable, locations }) => wrap("", description, "\n") + "directive @" + name + (hasMultilineItems(args) ? wrap("(\n", indent(join(args, "\n")), "\n)") : wrap("(", join(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join(locations, " | ")
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) => join(
      ["extend schema", join(directives, " "), block(operationTypes)],
      " "
    )
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) => join(["extend scalar", name, join(directives, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join(
      [
        "extend type",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join(
      [
        "extend interface",
        name,
        wrap("implements ", join(interfaces, " & ")),
        join(directives, " "),
        block(fields)
      ],
      " "
    )
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) => join(
      [
        "extend union",
        name,
        join(directives, " "),
        wrap("= ", join(types, " | "))
      ],
      " "
    )
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) => join(["extend enum", name, join(directives, " "), block(values)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) => join(["extend input", name, join(directives, " "), block(fields)], " ")
  }
};
function join(maybeArray, separator = "") {
  var _maybeArray$filter$jo;
  return (_maybeArray$filter$jo = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.filter((x) => x).join(separator)) !== null && _maybeArray$filter$jo !== void 0 ? _maybeArray$filter$jo : "";
}
function block(array) {
  return wrap("{\n", indent(join(array, "\n")), "\n}");
}
function wrap(start, maybeString, end = "") {
  return maybeString != null && maybeString !== "" ? start + maybeString + end : "";
}
function indent(str) {
  return wrap("  ", str.replace(/\n/g, "\n  "));
}
function hasMultilineItems(maybeArray) {
  var _maybeArray$some;
  return (_maybeArray$some = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _maybeArray$some !== void 0 ? _maybeArray$some : false;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/valueFromASTUntyped.mjs
function valueFromASTUntyped(valueNode, variables) {
  switch (valueNode.kind) {
    case Kind.NULL:
      return null;
    case Kind.INT:
      return parseInt(valueNode.value, 10);
    case Kind.FLOAT:
      return parseFloat(valueNode.value);
    case Kind.STRING:
    case Kind.ENUM:
    case Kind.BOOLEAN:
      return valueNode.value;
    case Kind.LIST:
      return valueNode.values.map(
        (node) => valueFromASTUntyped(node, variables)
      );
    case Kind.OBJECT:
      return keyValMap(
        valueNode.fields,
        (field) => field.name.value,
        (field) => valueFromASTUntyped(field.value, variables)
      );
    case Kind.VARIABLE:
      return variables === null || variables === void 0 ? void 0 : variables[valueNode.name.value];
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/assertName.mjs
function assertName(name) {
  name != null || devAssert(false, "Must provide name.");
  typeof name === "string" || devAssert(false, "Expected name to be a string.");
  if (name.length === 0) {
    throw new GraphQLError("Expected name to be a non-empty string.");
  }
  for (let i = 1; i < name.length; ++i) {
    if (!isNameContinue(name.charCodeAt(i))) {
      throw new GraphQLError(
        `Names must only contain [_a-zA-Z0-9] but "${name}" does not.`
      );
    }
  }
  if (!isNameStart(name.charCodeAt(0))) {
    throw new GraphQLError(
      `Names must start with [_a-zA-Z] but "${name}" does not.`
    );
  }
  return name;
}
function assertEnumValueName(name) {
  if (name === "true" || name === "false" || name === "null") {
    throw new GraphQLError(`Enum values cannot be named: ${name}`);
  }
  return assertName(name);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/definition.mjs
function isType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type) || isListType(type) || isNonNullType(type);
}
function isScalarType(type) {
  return instanceOf(type, GraphQLScalarType);
}
function isObjectType(type) {
  return instanceOf(type, GraphQLObjectType);
}
function isInterfaceType(type) {
  return instanceOf(type, GraphQLInterfaceType);
}
function isUnionType(type) {
  return instanceOf(type, GraphQLUnionType);
}
function isEnumType(type) {
  return instanceOf(type, GraphQLEnumType);
}
function isInputObjectType(type) {
  return instanceOf(type, GraphQLInputObjectType);
}
function isListType(type) {
  return instanceOf(type, GraphQLList);
}
function isNonNullType(type) {
  return instanceOf(type, GraphQLNonNull);
}
function isInputType(type) {
  return isScalarType(type) || isEnumType(type) || isInputObjectType(type) || isWrappingType(type) && isInputType(type.ofType);
}
function isOutputType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isWrappingType(type) && isOutputType(type.ofType);
}
function isLeafType(type) {
  return isScalarType(type) || isEnumType(type);
}
function isCompositeType(type) {
  return isObjectType(type) || isInterfaceType(type) || isUnionType(type);
}
function isAbstractType(type) {
  return isInterfaceType(type) || isUnionType(type);
}
var GraphQLList = class {
  constructor(ofType) {
    isType(ofType) || devAssert(false, `Expected ${inspect(ofType)} to be a GraphQL type.`);
    this.ofType = ofType;
  }
  get [Symbol.toStringTag]() {
    return "GraphQLList";
  }
  toString() {
    return "[" + String(this.ofType) + "]";
  }
  toJSON() {
    return this.toString();
  }
};
var GraphQLNonNull = class {
  constructor(ofType) {
    isNullableType(ofType) || devAssert(
      false,
      `Expected ${inspect(ofType)} to be a GraphQL nullable type.`
    );
    this.ofType = ofType;
  }
  get [Symbol.toStringTag]() {
    return "GraphQLNonNull";
  }
  toString() {
    return String(this.ofType) + "!";
  }
  toJSON() {
    return this.toString();
  }
};
function isWrappingType(type) {
  return isListType(type) || isNonNullType(type);
}
function isNullableType(type) {
  return isType(type) && !isNonNullType(type);
}
function getNullableType(type) {
  if (type) {
    return isNonNullType(type) ? type.ofType : type;
  }
}
function isNamedType(type) {
  return isScalarType(type) || isObjectType(type) || isInterfaceType(type) || isUnionType(type) || isEnumType(type) || isInputObjectType(type);
}
function getNamedType(type) {
  if (type) {
    let unwrappedType = type;
    while (isWrappingType(unwrappedType)) {
      unwrappedType = unwrappedType.ofType;
    }
    return unwrappedType;
  }
}
function resolveReadonlyArrayThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
function resolveObjMapThunk(thunk) {
  return typeof thunk === "function" ? thunk() : thunk;
}
var GraphQLScalarType = class {
  constructor(config) {
    var _config$parseValue, _config$serialize, _config$parseLiteral, _config$extensionASTN;
    const parseValue2 = (_config$parseValue = config.parseValue) !== null && _config$parseValue !== void 0 ? _config$parseValue : identityFunc;
    this.name = assertName(config.name);
    this.description = config.description;
    this.specifiedByURL = config.specifiedByURL;
    this.serialize = (_config$serialize = config.serialize) !== null && _config$serialize !== void 0 ? _config$serialize : identityFunc;
    this.parseValue = parseValue2;
    this.parseLiteral = (_config$parseLiteral = config.parseLiteral) !== null && _config$parseLiteral !== void 0 ? _config$parseLiteral : (node, variables) => parseValue2(valueFromASTUntyped(node, variables));
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
    config.specifiedByURL == null || typeof config.specifiedByURL === "string" || devAssert(
      false,
      `${this.name} must provide "specifiedByURL" as a string, but got: ${inspect(config.specifiedByURL)}.`
    );
    config.serialize == null || typeof config.serialize === "function" || devAssert(
      false,
      `${this.name} must provide "serialize" function. If this custom Scalar is also used as an input type, ensure "parseValue" and "parseLiteral" functions are also provided.`
    );
    if (config.parseLiteral) {
      typeof config.parseValue === "function" && typeof config.parseLiteral === "function" || devAssert(
        false,
        `${this.name} must provide both "parseValue" and "parseLiteral" functions.`
      );
    }
  }
  get [Symbol.toStringTag]() {
    return "GraphQLScalarType";
  }
  toConfig() {
    return {
      name: this.name,
      description: this.description,
      specifiedByURL: this.specifiedByURL,
      serialize: this.serialize,
      parseValue: this.parseValue,
      parseLiteral: this.parseLiteral,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes
    };
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.toString();
  }
};
var GraphQLObjectType = class {
  constructor(config) {
    var _config$extensionASTN2;
    this.name = assertName(config.name);
    this.description = config.description;
    this.isTypeOf = config.isTypeOf;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN2 = config.extensionASTNodes) !== null && _config$extensionASTN2 !== void 0 ? _config$extensionASTN2 : [];
    this._fields = () => defineFieldMap(config);
    this._interfaces = () => defineInterfaces(config);
    config.isTypeOf == null || typeof config.isTypeOf === "function" || devAssert(
      false,
      `${this.name} must provide "isTypeOf" as a function, but got: ${inspect(config.isTypeOf)}.`
    );
  }
  get [Symbol.toStringTag]() {
    return "GraphQLObjectType";
  }
  getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  }
  getInterfaces() {
    if (typeof this._interfaces === "function") {
      this._interfaces = this._interfaces();
    }
    return this._interfaces;
  }
  toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      isTypeOf: this.isTypeOf,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes
    };
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.toString();
  }
};
function defineInterfaces(config) {
  var _config$interfaces;
  const interfaces = resolveReadonlyArrayThunk(
    (_config$interfaces = config.interfaces) !== null && _config$interfaces !== void 0 ? _config$interfaces : []
  );
  Array.isArray(interfaces) || devAssert(
    false,
    `${config.name} interfaces must be an Array or a function which returns an Array.`
  );
  return interfaces;
}
function defineFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    var _fieldConfig$args;
    isPlainObj(fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field config must be an object.`
    );
    fieldConfig.resolve == null || typeof fieldConfig.resolve === "function" || devAssert(
      false,
      `${config.name}.${fieldName} field resolver must be a function if provided, but got: ${inspect(fieldConfig.resolve)}.`
    );
    const argsConfig = (_fieldConfig$args = fieldConfig.args) !== null && _fieldConfig$args !== void 0 ? _fieldConfig$args : {};
    isPlainObj(argsConfig) || devAssert(
      false,
      `${config.name}.${fieldName} args must be an object with argument names as keys.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      args: defineArguments(argsConfig),
      resolve: fieldConfig.resolve,
      subscribe: fieldConfig.subscribe,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function defineArguments(config) {
  return Object.entries(config).map(([argName, argConfig]) => ({
    name: assertName(argName),
    description: argConfig.description,
    type: argConfig.type,
    defaultValue: argConfig.defaultValue,
    deprecationReason: argConfig.deprecationReason,
    extensions: toObjMap(argConfig.extensions),
    astNode: argConfig.astNode
  }));
}
function isPlainObj(obj) {
  return isObjectLike(obj) && !Array.isArray(obj);
}
function fieldsToFieldsConfig(fields) {
  return mapValue(fields, (field) => ({
    description: field.description,
    type: field.type,
    args: argsToArgsConfig(field.args),
    resolve: field.resolve,
    subscribe: field.subscribe,
    deprecationReason: field.deprecationReason,
    extensions: field.extensions,
    astNode: field.astNode
  }));
}
function argsToArgsConfig(args) {
  return keyValMap(
    args,
    (arg) => arg.name,
    (arg) => ({
      description: arg.description,
      type: arg.type,
      defaultValue: arg.defaultValue,
      deprecationReason: arg.deprecationReason,
      extensions: arg.extensions,
      astNode: arg.astNode
    })
  );
}
function isRequiredArgument(arg) {
  return isNonNullType(arg.type) && arg.defaultValue === void 0;
}
var GraphQLInterfaceType = class {
  constructor(config) {
    var _config$extensionASTN3;
    this.name = assertName(config.name);
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN3 = config.extensionASTNodes) !== null && _config$extensionASTN3 !== void 0 ? _config$extensionASTN3 : [];
    this._fields = defineFieldMap.bind(void 0, config);
    this._interfaces = defineInterfaces.bind(void 0, config);
    config.resolveType == null || typeof config.resolveType === "function" || devAssert(
      false,
      `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
    );
  }
  get [Symbol.toStringTag]() {
    return "GraphQLInterfaceType";
  }
  getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  }
  getInterfaces() {
    if (typeof this._interfaces === "function") {
      this._interfaces = this._interfaces();
    }
    return this._interfaces;
  }
  toConfig() {
    return {
      name: this.name,
      description: this.description,
      interfaces: this.getInterfaces(),
      fields: fieldsToFieldsConfig(this.getFields()),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes
    };
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.toString();
  }
};
var GraphQLUnionType = class {
  constructor(config) {
    var _config$extensionASTN4;
    this.name = assertName(config.name);
    this.description = config.description;
    this.resolveType = config.resolveType;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN4 = config.extensionASTNodes) !== null && _config$extensionASTN4 !== void 0 ? _config$extensionASTN4 : [];
    this._types = defineTypes.bind(void 0, config);
    config.resolveType == null || typeof config.resolveType === "function" || devAssert(
      false,
      `${this.name} must provide "resolveType" as a function, but got: ${inspect(config.resolveType)}.`
    );
  }
  get [Symbol.toStringTag]() {
    return "GraphQLUnionType";
  }
  getTypes() {
    if (typeof this._types === "function") {
      this._types = this._types();
    }
    return this._types;
  }
  toConfig() {
    return {
      name: this.name,
      description: this.description,
      types: this.getTypes(),
      resolveType: this.resolveType,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes
    };
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.toString();
  }
};
function defineTypes(config) {
  const types = resolveReadonlyArrayThunk(config.types);
  Array.isArray(types) || devAssert(
    false,
    `Must provide Array of types or a function which returns such an array for Union ${config.name}.`
  );
  return types;
}
var GraphQLEnumType = class {
  constructor(config) {
    var _config$extensionASTN5;
    this.name = assertName(config.name);
    this.description = config.description;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN5 = config.extensionASTNodes) !== null && _config$extensionASTN5 !== void 0 ? _config$extensionASTN5 : [];
    this._values = defineEnumValues(this.name, config.values);
    this._valueLookup = new Map(
      this._values.map((enumValue) => [enumValue.value, enumValue])
    );
    this._nameLookup = keyMap(this._values, (value) => value.name);
  }
  get [Symbol.toStringTag]() {
    return "GraphQLEnumType";
  }
  getValues() {
    return this._values;
  }
  getValue(name) {
    return this._nameLookup[name];
  }
  serialize(outputValue) {
    const enumValue = this._valueLookup.get(outputValue);
    if (enumValue === void 0) {
      throw new GraphQLError(
        `Enum "${this.name}" cannot represent value: ${inspect(outputValue)}`
      );
    }
    return enumValue.name;
  }
  parseValue(inputValue) {
    if (typeof inputValue !== "string") {
      const valueStr = inspect(inputValue);
      throw new GraphQLError(
        `Enum "${this.name}" cannot represent non-string value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr)
      );
    }
    const enumValue = this.getValue(inputValue);
    if (enumValue == null) {
      throw new GraphQLError(
        `Value "${inputValue}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, inputValue)
      );
    }
    return enumValue.value;
  }
  parseLiteral(valueNode, _variables) {
    if (valueNode.kind !== Kind.ENUM) {
      const valueStr = print(valueNode);
      throw new GraphQLError(
        `Enum "${this.name}" cannot represent non-enum value: ${valueStr}.` + didYouMeanEnumValue(this, valueStr),
        {
          nodes: valueNode
        }
      );
    }
    const enumValue = this.getValue(valueNode.value);
    if (enumValue == null) {
      const valueStr = print(valueNode);
      throw new GraphQLError(
        `Value "${valueStr}" does not exist in "${this.name}" enum.` + didYouMeanEnumValue(this, valueStr),
        {
          nodes: valueNode
        }
      );
    }
    return enumValue.value;
  }
  toConfig() {
    const values = keyValMap(
      this.getValues(),
      (value) => value.name,
      (value) => ({
        description: value.description,
        value: value.value,
        deprecationReason: value.deprecationReason,
        extensions: value.extensions,
        astNode: value.astNode
      })
    );
    return {
      name: this.name,
      description: this.description,
      values,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes
    };
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.toString();
  }
};
function didYouMeanEnumValue(enumType, unknownValueStr) {
  const allNames = enumType.getValues().map((value) => value.name);
  const suggestedValues = suggestionList(unknownValueStr, allNames);
  return didYouMean("the enum value", suggestedValues);
}
function defineEnumValues(typeName, valueMap) {
  isPlainObj(valueMap) || devAssert(
    false,
    `${typeName} values must be an object with value names as keys.`
  );
  return Object.entries(valueMap).map(([valueName, valueConfig]) => {
    isPlainObj(valueConfig) || devAssert(
      false,
      `${typeName}.${valueName} must refer to an object with a "value" key representing an internal value but got: ${inspect(valueConfig)}.`
    );
    return {
      name: assertEnumValueName(valueName),
      description: valueConfig.description,
      value: valueConfig.value !== void 0 ? valueConfig.value : valueName,
      deprecationReason: valueConfig.deprecationReason,
      extensions: toObjMap(valueConfig.extensions),
      astNode: valueConfig.astNode
    };
  });
}
var GraphQLInputObjectType = class {
  constructor(config) {
    var _config$extensionASTN6;
    this.name = assertName(config.name);
    this.description = config.description;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN6 = config.extensionASTNodes) !== null && _config$extensionASTN6 !== void 0 ? _config$extensionASTN6 : [];
    this._fields = defineInputFieldMap.bind(void 0, config);
  }
  get [Symbol.toStringTag]() {
    return "GraphQLInputObjectType";
  }
  getFields() {
    if (typeof this._fields === "function") {
      this._fields = this._fields();
    }
    return this._fields;
  }
  toConfig() {
    const fields = mapValue(this.getFields(), (field) => ({
      description: field.description,
      type: field.type,
      defaultValue: field.defaultValue,
      deprecationReason: field.deprecationReason,
      extensions: field.extensions,
      astNode: field.astNode
    }));
    return {
      name: this.name,
      description: this.description,
      fields,
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes
    };
  }
  toString() {
    return this.name;
  }
  toJSON() {
    return this.toString();
  }
};
function defineInputFieldMap(config) {
  const fieldMap = resolveObjMapThunk(config.fields);
  isPlainObj(fieldMap) || devAssert(
    false,
    `${config.name} fields must be an object with field names as keys or a function which returns such an object.`
  );
  return mapValue(fieldMap, (fieldConfig, fieldName) => {
    !("resolve" in fieldConfig) || devAssert(
      false,
      `${config.name}.${fieldName} field has a resolve property, but Input Types cannot define resolvers.`
    );
    return {
      name: assertName(fieldName),
      description: fieldConfig.description,
      type: fieldConfig.type,
      defaultValue: fieldConfig.defaultValue,
      deprecationReason: fieldConfig.deprecationReason,
      extensions: toObjMap(fieldConfig.extensions),
      astNode: fieldConfig.astNode
    };
  });
}
function isRequiredInputField(field) {
  return isNonNullType(field.type) && field.defaultValue === void 0;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/typeComparators.mjs
function isEqualType(typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isNonNullType(typeA) && isNonNullType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  if (isListType(typeA) && isListType(typeB)) {
    return isEqualType(typeA.ofType, typeB.ofType);
  }
  return false;
}
function isTypeSubTypeOf(schema, maybeSubType, superType) {
  if (maybeSubType === superType) {
    return true;
  }
  if (isNonNullType(superType)) {
    if (isNonNullType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isNonNullType(maybeSubType)) {
    return isTypeSubTypeOf(schema, maybeSubType.ofType, superType);
  }
  if (isListType(superType)) {
    if (isListType(maybeSubType)) {
      return isTypeSubTypeOf(schema, maybeSubType.ofType, superType.ofType);
    }
    return false;
  }
  if (isListType(maybeSubType)) {
    return false;
  }
  return isAbstractType(superType) && (isInterfaceType(maybeSubType) || isObjectType(maybeSubType)) && schema.isSubType(superType, maybeSubType);
}
function doTypesOverlap(schema, typeA, typeB) {
  if (typeA === typeB) {
    return true;
  }
  if (isAbstractType(typeA)) {
    if (isAbstractType(typeB)) {
      return schema.getPossibleTypes(typeA).some((type) => schema.isSubType(typeB, type));
    }
    return schema.isSubType(typeA, typeB);
  }
  if (isAbstractType(typeB)) {
    return schema.isSubType(typeB, typeA);
  }
  return false;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/scalars.mjs
var GRAPHQL_MAX_INT = 2147483647;
var GRAPHQL_MIN_INT = -2147483648;
var GraphQLInt = new GraphQLScalarType({
  name: "Int",
  description: "The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.",
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);
    if (typeof coercedValue === "boolean") {
      return coercedValue ? 1 : 0;
    }
    let num = coercedValue;
    if (typeof coercedValue === "string" && coercedValue !== "") {
      num = Number(coercedValue);
    }
    if (typeof num !== "number" || !Number.isInteger(num)) {
      throw new GraphQLError(
        `Int cannot represent non-integer value: ${inspect(coercedValue)}`
      );
    }
    if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
      throw new GraphQLError(
        "Int cannot represent non 32-bit signed integer value: " + inspect(coercedValue)
      );
    }
    return num;
  },
  parseValue(inputValue) {
    if (typeof inputValue !== "number" || !Number.isInteger(inputValue)) {
      throw new GraphQLError(
        `Int cannot represent non-integer value: ${inspect(inputValue)}`
      );
    }
    if (inputValue > GRAPHQL_MAX_INT || inputValue < GRAPHQL_MIN_INT) {
      throw new GraphQLError(
        `Int cannot represent non 32-bit signed integer value: ${inputValue}`
      );
    }
    return inputValue;
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        `Int cannot represent non-integer value: ${print(valueNode)}`,
        {
          nodes: valueNode
        }
      );
    }
    const num = parseInt(valueNode.value, 10);
    if (num > GRAPHQL_MAX_INT || num < GRAPHQL_MIN_INT) {
      throw new GraphQLError(
        `Int cannot represent non 32-bit signed integer value: ${valueNode.value}`,
        {
          nodes: valueNode
        }
      );
    }
    return num;
  }
});
var GraphQLFloat = new GraphQLScalarType({
  name: "Float",
  description: "The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).",
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);
    if (typeof coercedValue === "boolean") {
      return coercedValue ? 1 : 0;
    }
    let num = coercedValue;
    if (typeof coercedValue === "string" && coercedValue !== "") {
      num = Number(coercedValue);
    }
    if (typeof num !== "number" || !Number.isFinite(num)) {
      throw new GraphQLError(
        `Float cannot represent non numeric value: ${inspect(coercedValue)}`
      );
    }
    return num;
  },
  parseValue(inputValue) {
    if (typeof inputValue !== "number" || !Number.isFinite(inputValue)) {
      throw new GraphQLError(
        `Float cannot represent non numeric value: ${inspect(inputValue)}`
      );
    }
    return inputValue;
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.FLOAT && valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        `Float cannot represent non numeric value: ${print(valueNode)}`,
        valueNode
      );
    }
    return parseFloat(valueNode.value);
  }
});
var GraphQLString = new GraphQLScalarType({
  name: "String",
  description: "The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.",
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);
    if (typeof coercedValue === "string") {
      return coercedValue;
    }
    if (typeof coercedValue === "boolean") {
      return coercedValue ? "true" : "false";
    }
    if (typeof coercedValue === "number" && Number.isFinite(coercedValue)) {
      return coercedValue.toString();
    }
    throw new GraphQLError(
      `String cannot represent value: ${inspect(outputValue)}`
    );
  },
  parseValue(inputValue) {
    if (typeof inputValue !== "string") {
      throw new GraphQLError(
        `String cannot represent a non string value: ${inspect(inputValue)}`
      );
    }
    return inputValue;
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.STRING) {
      throw new GraphQLError(
        `String cannot represent a non string value: ${print(valueNode)}`,
        {
          nodes: valueNode
        }
      );
    }
    return valueNode.value;
  }
});
var GraphQLBoolean = new GraphQLScalarType({
  name: "Boolean",
  description: "The `Boolean` scalar type represents `true` or `false`.",
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);
    if (typeof coercedValue === "boolean") {
      return coercedValue;
    }
    if (Number.isFinite(coercedValue)) {
      return coercedValue !== 0;
    }
    throw new GraphQLError(
      `Boolean cannot represent a non boolean value: ${inspect(coercedValue)}`
    );
  },
  parseValue(inputValue) {
    if (typeof inputValue !== "boolean") {
      throw new GraphQLError(
        `Boolean cannot represent a non boolean value: ${inspect(inputValue)}`
      );
    }
    return inputValue;
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.BOOLEAN) {
      throw new GraphQLError(
        `Boolean cannot represent a non boolean value: ${print(valueNode)}`,
        {
          nodes: valueNode
        }
      );
    }
    return valueNode.value;
  }
});
var GraphQLID = new GraphQLScalarType({
  name: "ID",
  description: 'The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.',
  serialize(outputValue) {
    const coercedValue = serializeObject(outputValue);
    if (typeof coercedValue === "string") {
      return coercedValue;
    }
    if (Number.isInteger(coercedValue)) {
      return String(coercedValue);
    }
    throw new GraphQLError(
      `ID cannot represent value: ${inspect(outputValue)}`
    );
  },
  parseValue(inputValue) {
    if (typeof inputValue === "string") {
      return inputValue;
    }
    if (typeof inputValue === "number" && Number.isInteger(inputValue)) {
      return inputValue.toString();
    }
    throw new GraphQLError(`ID cannot represent value: ${inspect(inputValue)}`);
  },
  parseLiteral(valueNode) {
    if (valueNode.kind !== Kind.STRING && valueNode.kind !== Kind.INT) {
      throw new GraphQLError(
        "ID cannot represent a non-string and non-integer value: " + print(valueNode),
        {
          nodes: valueNode
        }
      );
    }
    return valueNode.value;
  }
});
var specifiedScalarTypes = Object.freeze([
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLID
]);
function isSpecifiedScalarType(type) {
  return specifiedScalarTypes.some(({ name }) => type.name === name);
}
function serializeObject(outputValue) {
  if (isObjectLike(outputValue)) {
    if (typeof outputValue.valueOf === "function") {
      const valueOfResult = outputValue.valueOf();
      if (!isObjectLike(valueOfResult)) {
        return valueOfResult;
      }
    }
    if (typeof outputValue.toJSON === "function") {
      return outputValue.toJSON();
    }
  }
  return outputValue;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/directives.mjs
function isDirective(directive) {
  return instanceOf(directive, GraphQLDirective);
}
var GraphQLDirective = class {
  constructor(config) {
    var _config$isRepeatable, _config$args;
    this.name = assertName(config.name);
    this.description = config.description;
    this.locations = config.locations;
    this.isRepeatable = (_config$isRepeatable = config.isRepeatable) !== null && _config$isRepeatable !== void 0 ? _config$isRepeatable : false;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    Array.isArray(config.locations) || devAssert(false, `@${config.name} locations must be an Array.`);
    const args = (_config$args = config.args) !== null && _config$args !== void 0 ? _config$args : {};
    isObjectLike(args) && !Array.isArray(args) || devAssert(
      false,
      `@${config.name} args must be an object with argument names as keys.`
    );
    this.args = defineArguments(args);
  }
  get [Symbol.toStringTag]() {
    return "GraphQLDirective";
  }
  toConfig() {
    return {
      name: this.name,
      description: this.description,
      locations: this.locations,
      args: argsToArgsConfig(this.args),
      isRepeatable: this.isRepeatable,
      extensions: this.extensions,
      astNode: this.astNode
    };
  }
  toString() {
    return "@" + this.name;
  }
  toJSON() {
    return this.toString();
  }
};
var GraphQLIncludeDirective = new GraphQLDirective({
  name: "include",
  description: "Directs the executor to include this field or fragment only when the `if` argument is true.",
  locations: [
    DirectiveLocation.FIELD,
    DirectiveLocation.FRAGMENT_SPREAD,
    DirectiveLocation.INLINE_FRAGMENT
  ],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Included when true."
    }
  }
});
var GraphQLSkipDirective = new GraphQLDirective({
  name: "skip",
  description: "Directs the executor to skip this field or fragment when the `if` argument is true.",
  locations: [
    DirectiveLocation.FIELD,
    DirectiveLocation.FRAGMENT_SPREAD,
    DirectiveLocation.INLINE_FRAGMENT
  ],
  args: {
    if: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "Skipped when true."
    }
  }
});
var DEFAULT_DEPRECATION_REASON = "No longer supported";
var GraphQLDeprecatedDirective = new GraphQLDirective({
  name: "deprecated",
  description: "Marks an element of a GraphQL schema as no longer supported.",
  locations: [
    DirectiveLocation.FIELD_DEFINITION,
    DirectiveLocation.ARGUMENT_DEFINITION,
    DirectiveLocation.INPUT_FIELD_DEFINITION,
    DirectiveLocation.ENUM_VALUE
  ],
  args: {
    reason: {
      type: GraphQLString,
      description: "Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax, as specified by [CommonMark](https://commonmark.org/).",
      defaultValue: DEFAULT_DEPRECATION_REASON
    }
  }
});
var GraphQLSpecifiedByDirective = new GraphQLDirective({
  name: "specifiedBy",
  description: "Exposes a URL that specifies the behavior of this scalar.",
  locations: [DirectiveLocation.SCALAR],
  args: {
    url: {
      type: new GraphQLNonNull(GraphQLString),
      description: "The URL that specifies the behavior of this scalar."
    }
  }
});
var specifiedDirectives = Object.freeze([
  GraphQLIncludeDirective,
  GraphQLSkipDirective,
  GraphQLDeprecatedDirective,
  GraphQLSpecifiedByDirective
]);
function isSpecifiedDirective(directive) {
  return specifiedDirectives.some(({ name }) => name === directive.name);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/isIterableObject.mjs
function isIterableObject(maybeIterable) {
  return typeof maybeIterable === "object" && typeof (maybeIterable === null || maybeIterable === void 0 ? void 0 : maybeIterable[Symbol.iterator]) === "function";
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/astFromValue.mjs
function astFromValue(value, type) {
  if (isNonNullType(type)) {
    const astValue = astFromValue(value, type.ofType);
    if ((astValue === null || astValue === void 0 ? void 0 : astValue.kind) === Kind.NULL) {
      return null;
    }
    return astValue;
  }
  if (value === null) {
    return {
      kind: Kind.NULL
    };
  }
  if (value === void 0) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(value)) {
      const valuesNodes = [];
      for (const item of value) {
        const itemNode = astFromValue(item, itemType);
        if (itemNode != null) {
          valuesNodes.push(itemNode);
        }
      }
      return {
        kind: Kind.LIST,
        values: valuesNodes
      };
    }
    return astFromValue(value, itemType);
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(value)) {
      return null;
    }
    const fieldNodes = [];
    for (const field of Object.values(type.getFields())) {
      const fieldValue = astFromValue(value[field.name], field.type);
      if (fieldValue) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: {
            kind: Kind.NAME,
            value: field.name
          },
          value: fieldValue
        });
      }
    }
    return {
      kind: Kind.OBJECT,
      fields: fieldNodes
    };
  }
  if (isLeafType(type)) {
    const serialized = type.serialize(value);
    if (serialized == null) {
      return null;
    }
    if (typeof serialized === "boolean") {
      return {
        kind: Kind.BOOLEAN,
        value: serialized
      };
    }
    if (typeof serialized === "number" && Number.isFinite(serialized)) {
      const stringNum = String(serialized);
      return integerStringRegExp.test(stringNum) ? {
        kind: Kind.INT,
        value: stringNum
      } : {
        kind: Kind.FLOAT,
        value: stringNum
      };
    }
    if (typeof serialized === "string") {
      if (isEnumType(type)) {
        return {
          kind: Kind.ENUM,
          value: serialized
        };
      }
      if (type === GraphQLID && integerStringRegExp.test(serialized)) {
        return {
          kind: Kind.INT,
          value: serialized
        };
      }
      return {
        kind: Kind.STRING,
        value: serialized
      };
    }
    throw new TypeError(`Cannot convert value to AST: ${inspect(serialized)}.`);
  }
  invariant(false, "Unexpected input type: " + inspect(type));
}
var integerStringRegExp = /^-?(?:0|[1-9][0-9]*)$/;

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/introspection.mjs
var __Schema = new GraphQLObjectType({
  name: "__Schema",
  description: "A GraphQL Schema defines the capabilities of a GraphQL server. It exposes all available types and directives on the server, as well as the entry points for query, mutation, and subscription operations.",
  fields: () => ({
    description: {
      type: GraphQLString,
      resolve: (schema) => schema.description
    },
    types: {
      description: "A list of all types supported by this server.",
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(__Type))),
      resolve(schema) {
        return Object.values(schema.getTypeMap());
      }
    },
    queryType: {
      description: "The type that query operations will be rooted at.",
      type: new GraphQLNonNull(__Type),
      resolve: (schema) => schema.getQueryType()
    },
    mutationType: {
      description: "If this server supports mutation, the type that mutation operations will be rooted at.",
      type: __Type,
      resolve: (schema) => schema.getMutationType()
    },
    subscriptionType: {
      description: "If this server support subscription, the type that subscription operations will be rooted at.",
      type: __Type,
      resolve: (schema) => schema.getSubscriptionType()
    },
    directives: {
      description: "A list of all directives supported by this server.",
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__Directive))
      ),
      resolve: (schema) => schema.getDirectives()
    }
  })
});
var __Directive = new GraphQLObjectType({
  name: "__Directive",
  description: "A Directive provides a way to describe alternate runtime execution and type validation behavior in a GraphQL document.\n\nIn some cases, you need to provide options to alter GraphQL's execution behavior in ways field arguments will not suffice, such as conditionally including or skipping a field. Directives provide this by describing additional information to the executor.",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (directive) => directive.name
    },
    description: {
      type: GraphQLString,
      resolve: (directive) => directive.description
    },
    isRepeatable: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (directive) => directive.isRepeatable
    },
    locations: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__DirectiveLocation))
      ),
      resolve: (directive) => directive.locations
    },
    args: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__InputValue))
      ),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false
        }
      },
      resolve(field, { includeDeprecated }) {
        return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
      }
    }
  })
});
var __DirectiveLocation = new GraphQLEnumType({
  name: "__DirectiveLocation",
  description: "A Directive can be adjacent to many parts of the GraphQL language, a __DirectiveLocation describes one such possible adjacencies.",
  values: {
    QUERY: {
      value: DirectiveLocation.QUERY,
      description: "Location adjacent to a query operation."
    },
    MUTATION: {
      value: DirectiveLocation.MUTATION,
      description: "Location adjacent to a mutation operation."
    },
    SUBSCRIPTION: {
      value: DirectiveLocation.SUBSCRIPTION,
      description: "Location adjacent to a subscription operation."
    },
    FIELD: {
      value: DirectiveLocation.FIELD,
      description: "Location adjacent to a field."
    },
    FRAGMENT_DEFINITION: {
      value: DirectiveLocation.FRAGMENT_DEFINITION,
      description: "Location adjacent to a fragment definition."
    },
    FRAGMENT_SPREAD: {
      value: DirectiveLocation.FRAGMENT_SPREAD,
      description: "Location adjacent to a fragment spread."
    },
    INLINE_FRAGMENT: {
      value: DirectiveLocation.INLINE_FRAGMENT,
      description: "Location adjacent to an inline fragment."
    },
    VARIABLE_DEFINITION: {
      value: DirectiveLocation.VARIABLE_DEFINITION,
      description: "Location adjacent to a variable definition."
    },
    SCHEMA: {
      value: DirectiveLocation.SCHEMA,
      description: "Location adjacent to a schema definition."
    },
    SCALAR: {
      value: DirectiveLocation.SCALAR,
      description: "Location adjacent to a scalar definition."
    },
    OBJECT: {
      value: DirectiveLocation.OBJECT,
      description: "Location adjacent to an object type definition."
    },
    FIELD_DEFINITION: {
      value: DirectiveLocation.FIELD_DEFINITION,
      description: "Location adjacent to a field definition."
    },
    ARGUMENT_DEFINITION: {
      value: DirectiveLocation.ARGUMENT_DEFINITION,
      description: "Location adjacent to an argument definition."
    },
    INTERFACE: {
      value: DirectiveLocation.INTERFACE,
      description: "Location adjacent to an interface definition."
    },
    UNION: {
      value: DirectiveLocation.UNION,
      description: "Location adjacent to a union definition."
    },
    ENUM: {
      value: DirectiveLocation.ENUM,
      description: "Location adjacent to an enum definition."
    },
    ENUM_VALUE: {
      value: DirectiveLocation.ENUM_VALUE,
      description: "Location adjacent to an enum value definition."
    },
    INPUT_OBJECT: {
      value: DirectiveLocation.INPUT_OBJECT,
      description: "Location adjacent to an input object type definition."
    },
    INPUT_FIELD_DEFINITION: {
      value: DirectiveLocation.INPUT_FIELD_DEFINITION,
      description: "Location adjacent to an input object field definition."
    }
  }
});
var __Type = new GraphQLObjectType({
  name: "__Type",
  description: "The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.\n\nDepending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByURL`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.",
  fields: () => ({
    kind: {
      type: new GraphQLNonNull(__TypeKind),
      resolve(type) {
        if (isScalarType(type)) {
          return TypeKind.SCALAR;
        }
        if (isObjectType(type)) {
          return TypeKind.OBJECT;
        }
        if (isInterfaceType(type)) {
          return TypeKind.INTERFACE;
        }
        if (isUnionType(type)) {
          return TypeKind.UNION;
        }
        if (isEnumType(type)) {
          return TypeKind.ENUM;
        }
        if (isInputObjectType(type)) {
          return TypeKind.INPUT_OBJECT;
        }
        if (isListType(type)) {
          return TypeKind.LIST;
        }
        if (isNonNullType(type)) {
          return TypeKind.NON_NULL;
        }
        invariant(false, `Unexpected type: "${inspect(type)}".`);
      }
    },
    name: {
      type: GraphQLString,
      resolve: (type) => "name" in type ? type.name : void 0
    },
    description: {
      type: GraphQLString,
      resolve: (type) => "description" in type ? type.description : void 0
    },
    specifiedByURL: {
      type: GraphQLString,
      resolve: (obj) => "specifiedByURL" in obj ? obj.specifiedByURL : void 0
    },
    fields: {
      type: new GraphQLList(new GraphQLNonNull(__Field)),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false
        }
      },
      resolve(type, { includeDeprecated }) {
        if (isObjectType(type) || isInterfaceType(type)) {
          const fields = Object.values(type.getFields());
          return includeDeprecated ? fields : fields.filter((field) => field.deprecationReason == null);
        }
      }
    },
    interfaces: {
      type: new GraphQLList(new GraphQLNonNull(__Type)),
      resolve(type) {
        if (isObjectType(type) || isInterfaceType(type)) {
          return type.getInterfaces();
        }
      }
    },
    possibleTypes: {
      type: new GraphQLList(new GraphQLNonNull(__Type)),
      resolve(type, _args, _context, { schema }) {
        if (isAbstractType(type)) {
          return schema.getPossibleTypes(type);
        }
      }
    },
    enumValues: {
      type: new GraphQLList(new GraphQLNonNull(__EnumValue)),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false
        }
      },
      resolve(type, { includeDeprecated }) {
        if (isEnumType(type)) {
          const values = type.getValues();
          return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
        }
      }
    },
    inputFields: {
      type: new GraphQLList(new GraphQLNonNull(__InputValue)),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false
        }
      },
      resolve(type, { includeDeprecated }) {
        if (isInputObjectType(type)) {
          const values = Object.values(type.getFields());
          return includeDeprecated ? values : values.filter((field) => field.deprecationReason == null);
        }
      }
    },
    ofType: {
      type: __Type,
      resolve: (type) => "ofType" in type ? type.ofType : void 0
    }
  })
});
var __Field = new GraphQLObjectType({
  name: "__Field",
  description: "Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type.",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (field) => field.name
    },
    description: {
      type: GraphQLString,
      resolve: (field) => field.description
    },
    args: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(__InputValue))
      ),
      args: {
        includeDeprecated: {
          type: GraphQLBoolean,
          defaultValue: false
        }
      },
      resolve(field, { includeDeprecated }) {
        return includeDeprecated ? field.args : field.args.filter((arg) => arg.deprecationReason == null);
      }
    },
    type: {
      type: new GraphQLNonNull(__Type),
      resolve: (field) => field.type
    },
    isDeprecated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (field) => field.deprecationReason != null
    },
    deprecationReason: {
      type: GraphQLString,
      resolve: (field) => field.deprecationReason
    }
  })
});
var __InputValue = new GraphQLObjectType({
  name: "__InputValue",
  description: "Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value.",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (inputValue) => inputValue.name
    },
    description: {
      type: GraphQLString,
      resolve: (inputValue) => inputValue.description
    },
    type: {
      type: new GraphQLNonNull(__Type),
      resolve: (inputValue) => inputValue.type
    },
    defaultValue: {
      type: GraphQLString,
      description: "A GraphQL-formatted string representing the default value for this input value.",
      resolve(inputValue) {
        const { type, defaultValue } = inputValue;
        const valueAST = astFromValue(defaultValue, type);
        return valueAST ? print(valueAST) : null;
      }
    },
    isDeprecated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (field) => field.deprecationReason != null
    },
    deprecationReason: {
      type: GraphQLString,
      resolve: (obj) => obj.deprecationReason
    }
  })
});
var __EnumValue = new GraphQLObjectType({
  name: "__EnumValue",
  description: "One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string.",
  fields: () => ({
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (enumValue) => enumValue.name
    },
    description: {
      type: GraphQLString,
      resolve: (enumValue) => enumValue.description
    },
    isDeprecated: {
      type: new GraphQLNonNull(GraphQLBoolean),
      resolve: (enumValue) => enumValue.deprecationReason != null
    },
    deprecationReason: {
      type: GraphQLString,
      resolve: (enumValue) => enumValue.deprecationReason
    }
  })
});
var TypeKind;
(function(TypeKind2) {
  TypeKind2["SCALAR"] = "SCALAR";
  TypeKind2["OBJECT"] = "OBJECT";
  TypeKind2["INTERFACE"] = "INTERFACE";
  TypeKind2["UNION"] = "UNION";
  TypeKind2["ENUM"] = "ENUM";
  TypeKind2["INPUT_OBJECT"] = "INPUT_OBJECT";
  TypeKind2["LIST"] = "LIST";
  TypeKind2["NON_NULL"] = "NON_NULL";
})(TypeKind || (TypeKind = {}));
var __TypeKind = new GraphQLEnumType({
  name: "__TypeKind",
  description: "An enum describing what kind of type a given `__Type` is.",
  values: {
    SCALAR: {
      value: TypeKind.SCALAR,
      description: "Indicates this type is a scalar."
    },
    OBJECT: {
      value: TypeKind.OBJECT,
      description: "Indicates this type is an object. `fields` and `interfaces` are valid fields."
    },
    INTERFACE: {
      value: TypeKind.INTERFACE,
      description: "Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields."
    },
    UNION: {
      value: TypeKind.UNION,
      description: "Indicates this type is a union. `possibleTypes` is a valid field."
    },
    ENUM: {
      value: TypeKind.ENUM,
      description: "Indicates this type is an enum. `enumValues` is a valid field."
    },
    INPUT_OBJECT: {
      value: TypeKind.INPUT_OBJECT,
      description: "Indicates this type is an input object. `inputFields` is a valid field."
    },
    LIST: {
      value: TypeKind.LIST,
      description: "Indicates this type is a list. `ofType` is a valid field."
    },
    NON_NULL: {
      value: TypeKind.NON_NULL,
      description: "Indicates this type is a non-null. `ofType` is a valid field."
    }
  }
});
var SchemaMetaFieldDef = {
  name: "__schema",
  type: new GraphQLNonNull(__Schema),
  description: "Access the current type schema of this server.",
  args: [],
  resolve: (_source, _args, _context, { schema }) => schema,
  deprecationReason: void 0,
  extensions: /* @__PURE__ */ Object.create(null),
  astNode: void 0
};
var TypeMetaFieldDef = {
  name: "__type",
  type: __Type,
  description: "Request the type information of a single type.",
  args: [
    {
      name: "name",
      description: void 0,
      type: new GraphQLNonNull(GraphQLString),
      defaultValue: void 0,
      deprecationReason: void 0,
      extensions: /* @__PURE__ */ Object.create(null),
      astNode: void 0
    }
  ],
  resolve: (_source, { name }, _context, { schema }) => schema.getType(name),
  deprecationReason: void 0,
  extensions: /* @__PURE__ */ Object.create(null),
  astNode: void 0
};
var TypeNameMetaFieldDef = {
  name: "__typename",
  type: new GraphQLNonNull(GraphQLString),
  description: "The name of the current Object type at runtime.",
  args: [],
  resolve: (_source, _args, _context, { parentType }) => parentType.name,
  deprecationReason: void 0,
  extensions: /* @__PURE__ */ Object.create(null),
  astNode: void 0
};
var introspectionTypes = Object.freeze([
  __Schema,
  __Directive,
  __DirectiveLocation,
  __Type,
  __Field,
  __InputValue,
  __EnumValue,
  __TypeKind
]);
function isIntrospectionType(type) {
  return introspectionTypes.some(({ name }) => type.name === name);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/schema.mjs
function isSchema(schema) {
  return instanceOf(schema, GraphQLSchema);
}
function assertSchema(schema) {
  if (!isSchema(schema)) {
    throw new Error(`Expected ${inspect(schema)} to be a GraphQL schema.`);
  }
  return schema;
}
var GraphQLSchema = class {
  constructor(config) {
    var _config$extensionASTN, _config$directives;
    this.__validationErrors = config.assumeValid === true ? [] : void 0;
    isObjectLike(config) || devAssert(false, "Must provide configuration object.");
    !config.types || Array.isArray(config.types) || devAssert(
      false,
      `"types" must be Array if provided but got: ${inspect(config.types)}.`
    );
    !config.directives || Array.isArray(config.directives) || devAssert(
      false,
      `"directives" must be Array if provided but got: ${inspect(config.directives)}.`
    );
    this.description = config.description;
    this.extensions = toObjMap(config.extensions);
    this.astNode = config.astNode;
    this.extensionASTNodes = (_config$extensionASTN = config.extensionASTNodes) !== null && _config$extensionASTN !== void 0 ? _config$extensionASTN : [];
    this._queryType = config.query;
    this._mutationType = config.mutation;
    this._subscriptionType = config.subscription;
    this._directives = (_config$directives = config.directives) !== null && _config$directives !== void 0 ? _config$directives : specifiedDirectives;
    const allReferencedTypes = new Set(config.types);
    if (config.types != null) {
      for (const type of config.types) {
        allReferencedTypes.delete(type);
        collectReferencedTypes(type, allReferencedTypes);
      }
    }
    if (this._queryType != null) {
      collectReferencedTypes(this._queryType, allReferencedTypes);
    }
    if (this._mutationType != null) {
      collectReferencedTypes(this._mutationType, allReferencedTypes);
    }
    if (this._subscriptionType != null) {
      collectReferencedTypes(this._subscriptionType, allReferencedTypes);
    }
    for (const directive of this._directives) {
      if (isDirective(directive)) {
        for (const arg of directive.args) {
          collectReferencedTypes(arg.type, allReferencedTypes);
        }
      }
    }
    collectReferencedTypes(__Schema, allReferencedTypes);
    this._typeMap = /* @__PURE__ */ Object.create(null);
    this._subTypeMap = /* @__PURE__ */ Object.create(null);
    this._implementationsMap = /* @__PURE__ */ Object.create(null);
    for (const namedType of allReferencedTypes) {
      if (namedType == null) {
        continue;
      }
      const typeName = namedType.name;
      typeName || devAssert(
        false,
        "One of the provided types for building the Schema is missing a name."
      );
      if (this._typeMap[typeName] !== void 0) {
        throw new Error(
          `Schema must contain uniquely named types but contains multiple types named "${typeName}".`
        );
      }
      this._typeMap[typeName] = namedType;
      if (isInterfaceType(namedType)) {
        for (const iface of namedType.getInterfaces()) {
          if (isInterfaceType(iface)) {
            let implementations = this._implementationsMap[iface.name];
            if (implementations === void 0) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: []
              };
            }
            implementations.interfaces.push(namedType);
          }
        }
      } else if (isObjectType(namedType)) {
        for (const iface of namedType.getInterfaces()) {
          if (isInterfaceType(iface)) {
            let implementations = this._implementationsMap[iface.name];
            if (implementations === void 0) {
              implementations = this._implementationsMap[iface.name] = {
                objects: [],
                interfaces: []
              };
            }
            implementations.objects.push(namedType);
          }
        }
      }
    }
  }
  get [Symbol.toStringTag]() {
    return "GraphQLSchema";
  }
  getQueryType() {
    return this._queryType;
  }
  getMutationType() {
    return this._mutationType;
  }
  getSubscriptionType() {
    return this._subscriptionType;
  }
  getRootType(operation) {
    switch (operation) {
      case OperationTypeNode.QUERY:
        return this.getQueryType();
      case OperationTypeNode.MUTATION:
        return this.getMutationType();
      case OperationTypeNode.SUBSCRIPTION:
        return this.getSubscriptionType();
    }
  }
  getTypeMap() {
    return this._typeMap;
  }
  getType(name) {
    return this.getTypeMap()[name];
  }
  getPossibleTypes(abstractType) {
    return isUnionType(abstractType) ? abstractType.getTypes() : this.getImplementations(abstractType).objects;
  }
  getImplementations(interfaceType) {
    const implementations = this._implementationsMap[interfaceType.name];
    return implementations !== null && implementations !== void 0 ? implementations : {
      objects: [],
      interfaces: []
    };
  }
  isSubType(abstractType, maybeSubType) {
    let map2 = this._subTypeMap[abstractType.name];
    if (map2 === void 0) {
      map2 = /* @__PURE__ */ Object.create(null);
      if (isUnionType(abstractType)) {
        for (const type of abstractType.getTypes()) {
          map2[type.name] = true;
        }
      } else {
        const implementations = this.getImplementations(abstractType);
        for (const type of implementations.objects) {
          map2[type.name] = true;
        }
        for (const type of implementations.interfaces) {
          map2[type.name] = true;
        }
      }
      this._subTypeMap[abstractType.name] = map2;
    }
    return map2[maybeSubType.name] !== void 0;
  }
  getDirectives() {
    return this._directives;
  }
  getDirective(name) {
    return this.getDirectives().find((directive) => directive.name === name);
  }
  toConfig() {
    return {
      description: this.description,
      query: this.getQueryType(),
      mutation: this.getMutationType(),
      subscription: this.getSubscriptionType(),
      types: Object.values(this.getTypeMap()),
      directives: this.getDirectives(),
      extensions: this.extensions,
      astNode: this.astNode,
      extensionASTNodes: this.extensionASTNodes,
      assumeValid: this.__validationErrors !== void 0
    };
  }
};
function collectReferencedTypes(type, typeSet) {
  const namedType = getNamedType(type);
  if (!typeSet.has(namedType)) {
    typeSet.add(namedType);
    if (isUnionType(namedType)) {
      for (const memberType of namedType.getTypes()) {
        collectReferencedTypes(memberType, typeSet);
      }
    } else if (isObjectType(namedType) || isInterfaceType(namedType)) {
      for (const interfaceType of namedType.getInterfaces()) {
        collectReferencedTypes(interfaceType, typeSet);
      }
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
        for (const arg of field.args) {
          collectReferencedTypes(arg.type, typeSet);
        }
      }
    } else if (isInputObjectType(namedType)) {
      for (const field of Object.values(namedType.getFields())) {
        collectReferencedTypes(field.type, typeSet);
      }
    }
  }
  return typeSet;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/type/validate.mjs
function validateSchema(schema) {
  assertSchema(schema);
  if (schema.__validationErrors) {
    return schema.__validationErrors;
  }
  const context = new SchemaValidationContext(schema);
  validateRootTypes(context);
  validateDirectives(context);
  validateTypes(context);
  const errors = context.getErrors();
  schema.__validationErrors = errors;
  return errors;
}
function assertValidSchema(schema) {
  const errors = validateSchema(schema);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}
var SchemaValidationContext = class {
  constructor(schema) {
    this._errors = [];
    this.schema = schema;
  }
  reportError(message, nodes) {
    const _nodes = Array.isArray(nodes) ? nodes.filter(Boolean) : nodes;
    this._errors.push(
      new GraphQLError(message, {
        nodes: _nodes
      })
    );
  }
  getErrors() {
    return this._errors;
  }
};
function validateRootTypes(context) {
  const schema = context.schema;
  const queryType = schema.getQueryType();
  if (!queryType) {
    context.reportError("Query root type must be provided.", schema.astNode);
  } else if (!isObjectType(queryType)) {
    var _getOperationTypeNode;
    context.reportError(
      `Query root type must be Object type, it cannot be ${inspect(
        queryType
      )}.`,
      (_getOperationTypeNode = getOperationTypeNode(
        schema,
        OperationTypeNode.QUERY
      )) !== null && _getOperationTypeNode !== void 0 ? _getOperationTypeNode : queryType.astNode
    );
  }
  const mutationType = schema.getMutationType();
  if (mutationType && !isObjectType(mutationType)) {
    var _getOperationTypeNode2;
    context.reportError(
      `Mutation root type must be Object type if provided, it cannot be ${inspect(mutationType)}.`,
      (_getOperationTypeNode2 = getOperationTypeNode(
        schema,
        OperationTypeNode.MUTATION
      )) !== null && _getOperationTypeNode2 !== void 0 ? _getOperationTypeNode2 : mutationType.astNode
    );
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType && !isObjectType(subscriptionType)) {
    var _getOperationTypeNode3;
    context.reportError(
      `Subscription root type must be Object type if provided, it cannot be ${inspect(subscriptionType)}.`,
      (_getOperationTypeNode3 = getOperationTypeNode(
        schema,
        OperationTypeNode.SUBSCRIPTION
      )) !== null && _getOperationTypeNode3 !== void 0 ? _getOperationTypeNode3 : subscriptionType.astNode
    );
  }
}
function getOperationTypeNode(schema, operation) {
  var _flatMap$find;
  return (_flatMap$find = [schema.astNode, ...schema.extensionASTNodes].flatMap(
    (schemaNode) => {
      var _schemaNode$operation;
      return (_schemaNode$operation = schemaNode === null || schemaNode === void 0 ? void 0 : schemaNode.operationTypes) !== null && _schemaNode$operation !== void 0 ? _schemaNode$operation : [];
    }
  ).find((operationNode) => operationNode.operation === operation)) === null || _flatMap$find === void 0 ? void 0 : _flatMap$find.type;
}
function validateDirectives(context) {
  for (const directive of context.schema.getDirectives()) {
    if (!isDirective(directive)) {
      context.reportError(
        `Expected directive but got: ${inspect(directive)}.`,
        directive === null || directive === void 0 ? void 0 : directive.astNode
      );
      continue;
    }
    validateName(context, directive);
    for (const arg of directive.args) {
      validateName(context, arg);
      if (!isInputType(arg.type)) {
        context.reportError(
          `The type of @${directive.name}(${arg.name}:) must be Input Type but got: ${inspect(arg.type)}.`,
          arg.astNode
        );
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode;
        context.reportError(
          `Required argument @${directive.name}(${arg.name}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode = arg.astNode) === null || _arg$astNode === void 0 ? void 0 : _arg$astNode.type
          ]
        );
      }
    }
  }
}
function validateName(context, node) {
  if (node.name.startsWith("__")) {
    context.reportError(
      `Name "${node.name}" must not begin with "__", which is reserved by GraphQL introspection.`,
      node.astNode
    );
  }
}
function validateTypes(context) {
  const validateInputObjectCircularRefs = createInputObjectCircularRefsValidator(context);
  const typeMap = context.schema.getTypeMap();
  for (const type of Object.values(typeMap)) {
    if (!isNamedType(type)) {
      context.reportError(
        `Expected GraphQL named type but got: ${inspect(type)}.`,
        type.astNode
      );
      continue;
    }
    if (!isIntrospectionType(type)) {
      validateName(context, type);
    }
    if (isObjectType(type)) {
      validateFields(context, type);
      validateInterfaces(context, type);
    } else if (isInterfaceType(type)) {
      validateFields(context, type);
      validateInterfaces(context, type);
    } else if (isUnionType(type)) {
      validateUnionMembers(context, type);
    } else if (isEnumType(type)) {
      validateEnumValues(context, type);
    } else if (isInputObjectType(type)) {
      validateInputFields(context, type);
      validateInputObjectCircularRefs(type);
    }
  }
}
function validateFields(context, type) {
  const fields = Object.values(type.getFields());
  if (fields.length === 0) {
    context.reportError(`Type ${type.name} must define one or more fields.`, [
      type.astNode,
      ...type.extensionASTNodes
    ]);
  }
  for (const field of fields) {
    validateName(context, field);
    if (!isOutputType(field.type)) {
      var _field$astNode;
      context.reportError(
        `The type of ${type.name}.${field.name} must be Output Type but got: ${inspect(field.type)}.`,
        (_field$astNode = field.astNode) === null || _field$astNode === void 0 ? void 0 : _field$astNode.type
      );
    }
    for (const arg of field.args) {
      const argName = arg.name;
      validateName(context, arg);
      if (!isInputType(arg.type)) {
        var _arg$astNode2;
        context.reportError(
          `The type of ${type.name}.${field.name}(${argName}:) must be Input Type but got: ${inspect(arg.type)}.`,
          (_arg$astNode2 = arg.astNode) === null || _arg$astNode2 === void 0 ? void 0 : _arg$astNode2.type
        );
      }
      if (isRequiredArgument(arg) && arg.deprecationReason != null) {
        var _arg$astNode3;
        context.reportError(
          `Required argument ${type.name}.${field.name}(${argName}:) cannot be deprecated.`,
          [
            getDeprecatedDirectiveNode(arg.astNode),
            (_arg$astNode3 = arg.astNode) === null || _arg$astNode3 === void 0 ? void 0 : _arg$astNode3.type
          ]
        );
      }
    }
  }
}
function validateInterfaces(context, type) {
  const ifaceTypeNames = /* @__PURE__ */ Object.create(null);
  for (const iface of type.getInterfaces()) {
    if (!isInterfaceType(iface)) {
      context.reportError(
        `Type ${inspect(type)} must only implement Interface types, it cannot implement ${inspect(iface)}.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    if (type === iface) {
      context.reportError(
        `Type ${type.name} cannot implement itself because it would create a circular reference.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    if (ifaceTypeNames[iface.name]) {
      context.reportError(
        `Type ${type.name} can only implement ${iface.name} once.`,
        getAllImplementsInterfaceNodes(type, iface)
      );
      continue;
    }
    ifaceTypeNames[iface.name] = true;
    validateTypeImplementsAncestors(context, type, iface);
    validateTypeImplementsInterface(context, type, iface);
  }
}
function validateTypeImplementsInterface(context, type, iface) {
  const typeFieldMap = type.getFields();
  for (const ifaceField of Object.values(iface.getFields())) {
    const fieldName = ifaceField.name;
    const typeField = typeFieldMap[fieldName];
    if (!typeField) {
      context.reportError(
        `Interface field ${iface.name}.${fieldName} expected but ${type.name} does not provide it.`,
        [ifaceField.astNode, type.astNode, ...type.extensionASTNodes]
      );
      continue;
    }
    if (!isTypeSubTypeOf(context.schema, typeField.type, ifaceField.type)) {
      var _ifaceField$astNode, _typeField$astNode;
      context.reportError(
        `Interface field ${iface.name}.${fieldName} expects type ${inspect(ifaceField.type)} but ${type.name}.${fieldName} is type ${inspect(typeField.type)}.`,
        [
          (_ifaceField$astNode = ifaceField.astNode) === null || _ifaceField$astNode === void 0 ? void 0 : _ifaceField$astNode.type,
          (_typeField$astNode = typeField.astNode) === null || _typeField$astNode === void 0 ? void 0 : _typeField$astNode.type
        ]
      );
    }
    for (const ifaceArg of ifaceField.args) {
      const argName = ifaceArg.name;
      const typeArg = typeField.args.find((arg) => arg.name === argName);
      if (!typeArg) {
        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expected but ${type.name}.${fieldName} does not provide it.`,
          [ifaceArg.astNode, typeField.astNode]
        );
        continue;
      }
      if (!isEqualType(ifaceArg.type, typeArg.type)) {
        var _ifaceArg$astNode, _typeArg$astNode;
        context.reportError(
          `Interface field argument ${iface.name}.${fieldName}(${argName}:) expects type ${inspect(ifaceArg.type)} but ${type.name}.${fieldName}(${argName}:) is type ${inspect(typeArg.type)}.`,
          [
            (_ifaceArg$astNode = ifaceArg.astNode) === null || _ifaceArg$astNode === void 0 ? void 0 : _ifaceArg$astNode.type,
            (_typeArg$astNode = typeArg.astNode) === null || _typeArg$astNode === void 0 ? void 0 : _typeArg$astNode.type
          ]
        );
      }
    }
    for (const typeArg of typeField.args) {
      const argName = typeArg.name;
      const ifaceArg = ifaceField.args.find((arg) => arg.name === argName);
      if (!ifaceArg && isRequiredArgument(typeArg)) {
        context.reportError(
          `Object field ${type.name}.${fieldName} includes required argument ${argName} that is missing from the Interface field ${iface.name}.${fieldName}.`,
          [typeArg.astNode, ifaceField.astNode]
        );
      }
    }
  }
}
function validateTypeImplementsAncestors(context, type, iface) {
  const ifaceInterfaces = type.getInterfaces();
  for (const transitive of iface.getInterfaces()) {
    if (!ifaceInterfaces.includes(transitive)) {
      context.reportError(
        transitive === type ? `Type ${type.name} cannot implement ${iface.name} because it would create a circular reference.` : `Type ${type.name} must implement ${transitive.name} because it is implemented by ${iface.name}.`,
        [
          ...getAllImplementsInterfaceNodes(iface, transitive),
          ...getAllImplementsInterfaceNodes(type, iface)
        ]
      );
    }
  }
}
function validateUnionMembers(context, union) {
  const memberTypes = union.getTypes();
  if (memberTypes.length === 0) {
    context.reportError(
      `Union type ${union.name} must define one or more member types.`,
      [union.astNode, ...union.extensionASTNodes]
    );
  }
  const includedTypeNames = /* @__PURE__ */ Object.create(null);
  for (const memberType of memberTypes) {
    if (includedTypeNames[memberType.name]) {
      context.reportError(
        `Union type ${union.name} can only include type ${memberType.name} once.`,
        getUnionMemberTypeNodes(union, memberType.name)
      );
      continue;
    }
    includedTypeNames[memberType.name] = true;
    if (!isObjectType(memberType)) {
      context.reportError(
        `Union type ${union.name} can only include Object types, it cannot include ${inspect(memberType)}.`,
        getUnionMemberTypeNodes(union, String(memberType))
      );
    }
  }
}
function validateEnumValues(context, enumType) {
  const enumValues = enumType.getValues();
  if (enumValues.length === 0) {
    context.reportError(
      `Enum type ${enumType.name} must define one or more values.`,
      [enumType.astNode, ...enumType.extensionASTNodes]
    );
  }
  for (const enumValue of enumValues) {
    validateName(context, enumValue);
  }
}
function validateInputFields(context, inputObj) {
  const fields = Object.values(inputObj.getFields());
  if (fields.length === 0) {
    context.reportError(
      `Input Object type ${inputObj.name} must define one or more fields.`,
      [inputObj.astNode, ...inputObj.extensionASTNodes]
    );
  }
  for (const field of fields) {
    validateName(context, field);
    if (!isInputType(field.type)) {
      var _field$astNode2;
      context.reportError(
        `The type of ${inputObj.name}.${field.name} must be Input Type but got: ${inspect(field.type)}.`,
        (_field$astNode2 = field.astNode) === null || _field$astNode2 === void 0 ? void 0 : _field$astNode2.type
      );
    }
    if (isRequiredInputField(field) && field.deprecationReason != null) {
      var _field$astNode3;
      context.reportError(
        `Required input field ${inputObj.name}.${field.name} cannot be deprecated.`,
        [
          getDeprecatedDirectiveNode(field.astNode),
          (_field$astNode3 = field.astNode) === null || _field$astNode3 === void 0 ? void 0 : _field$astNode3.type
        ]
      );
    }
  }
}
function createInputObjectCircularRefsValidator(context) {
  const visitedTypes = /* @__PURE__ */ Object.create(null);
  const fieldPath = [];
  const fieldPathIndexByTypeName = /* @__PURE__ */ Object.create(null);
  return detectCycleRecursive;
  function detectCycleRecursive(inputObj) {
    if (visitedTypes[inputObj.name]) {
      return;
    }
    visitedTypes[inputObj.name] = true;
    fieldPathIndexByTypeName[inputObj.name] = fieldPath.length;
    const fields = Object.values(inputObj.getFields());
    for (const field of fields) {
      if (isNonNullType(field.type) && isInputObjectType(field.type.ofType)) {
        const fieldType = field.type.ofType;
        const cycleIndex = fieldPathIndexByTypeName[fieldType.name];
        fieldPath.push(field);
        if (cycleIndex === void 0) {
          detectCycleRecursive(fieldType);
        } else {
          const cyclePath = fieldPath.slice(cycleIndex);
          const pathStr = cyclePath.map((fieldObj) => fieldObj.name).join(".");
          context.reportError(
            `Cannot reference Input Object "${fieldType.name}" within itself through a series of non-null fields: "${pathStr}".`,
            cyclePath.map((fieldObj) => fieldObj.astNode)
          );
        }
        fieldPath.pop();
      }
    }
    fieldPathIndexByTypeName[inputObj.name] = void 0;
  }
}
function getAllImplementsInterfaceNodes(type, iface) {
  const { astNode, extensionASTNodes } = type;
  const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
  return nodes.flatMap((typeNode) => {
    var _typeNode$interfaces;
    return (_typeNode$interfaces = typeNode.interfaces) !== null && _typeNode$interfaces !== void 0 ? _typeNode$interfaces : [];
  }).filter((ifaceNode) => ifaceNode.name.value === iface.name);
}
function getUnionMemberTypeNodes(union, typeName) {
  const { astNode, extensionASTNodes } = union;
  const nodes = astNode != null ? [astNode, ...extensionASTNodes] : extensionASTNodes;
  return nodes.flatMap((unionNode) => {
    var _unionNode$types;
    return (_unionNode$types = unionNode.types) !== null && _unionNode$types !== void 0 ? _unionNode$types : [];
  }).filter((typeNode) => typeNode.name.value === typeName);
}
function getDeprecatedDirectiveNode(definitionNode) {
  var _definitionNode$direc;
  return definitionNode === null || definitionNode === void 0 ? void 0 : (_definitionNode$direc = definitionNode.directives) === null || _definitionNode$direc === void 0 ? void 0 : _definitionNode$direc.find(
    (node) => node.name.value === GraphQLDeprecatedDirective.name
  );
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/typeFromAST.mjs
function typeFromAST(schema, typeNode) {
  switch (typeNode.kind) {
    case Kind.LIST_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLList(innerType);
    }
    case Kind.NON_NULL_TYPE: {
      const innerType = typeFromAST(schema, typeNode.type);
      return innerType && new GraphQLNonNull(innerType);
    }
    case Kind.NAMED_TYPE:
      return schema.getType(typeNode.name.value);
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/TypeInfo.mjs
var TypeInfo = class {
  constructor(schema, initialType, getFieldDefFn) {
    this._schema = schema;
    this._typeStack = [];
    this._parentTypeStack = [];
    this._inputTypeStack = [];
    this._fieldDefStack = [];
    this._defaultValueStack = [];
    this._directive = null;
    this._argument = null;
    this._enumValue = null;
    this._getFieldDef = getFieldDefFn !== null && getFieldDefFn !== void 0 ? getFieldDefFn : getFieldDef;
    if (initialType) {
      if (isInputType(initialType)) {
        this._inputTypeStack.push(initialType);
      }
      if (isCompositeType(initialType)) {
        this._parentTypeStack.push(initialType);
      }
      if (isOutputType(initialType)) {
        this._typeStack.push(initialType);
      }
    }
  }
  get [Symbol.toStringTag]() {
    return "TypeInfo";
  }
  getType() {
    if (this._typeStack.length > 0) {
      return this._typeStack[this._typeStack.length - 1];
    }
  }
  getParentType() {
    if (this._parentTypeStack.length > 0) {
      return this._parentTypeStack[this._parentTypeStack.length - 1];
    }
  }
  getInputType() {
    if (this._inputTypeStack.length > 0) {
      return this._inputTypeStack[this._inputTypeStack.length - 1];
    }
  }
  getParentInputType() {
    if (this._inputTypeStack.length > 1) {
      return this._inputTypeStack[this._inputTypeStack.length - 2];
    }
  }
  getFieldDef() {
    if (this._fieldDefStack.length > 0) {
      return this._fieldDefStack[this._fieldDefStack.length - 1];
    }
  }
  getDefaultValue() {
    if (this._defaultValueStack.length > 0) {
      return this._defaultValueStack[this._defaultValueStack.length - 1];
    }
  }
  getDirective() {
    return this._directive;
  }
  getArgument() {
    return this._argument;
  }
  getEnumValue() {
    return this._enumValue;
  }
  enter(node) {
    const schema = this._schema;
    switch (node.kind) {
      case Kind.SELECTION_SET: {
        const namedType = getNamedType(this.getType());
        this._parentTypeStack.push(
          isCompositeType(namedType) ? namedType : void 0
        );
        break;
      }
      case Kind.FIELD: {
        const parentType = this.getParentType();
        let fieldDef;
        let fieldType;
        if (parentType) {
          fieldDef = this._getFieldDef(schema, parentType, node);
          if (fieldDef) {
            fieldType = fieldDef.type;
          }
        }
        this._fieldDefStack.push(fieldDef);
        this._typeStack.push(isOutputType(fieldType) ? fieldType : void 0);
        break;
      }
      case Kind.DIRECTIVE:
        this._directive = schema.getDirective(node.name.value);
        break;
      case Kind.OPERATION_DEFINITION: {
        const rootType = schema.getRootType(node.operation);
        this._typeStack.push(isObjectType(rootType) ? rootType : void 0);
        break;
      }
      case Kind.INLINE_FRAGMENT:
      case Kind.FRAGMENT_DEFINITION: {
        const typeConditionAST = node.typeCondition;
        const outputType = typeConditionAST ? typeFromAST(schema, typeConditionAST) : getNamedType(this.getType());
        this._typeStack.push(isOutputType(outputType) ? outputType : void 0);
        break;
      }
      case Kind.VARIABLE_DEFINITION: {
        const inputType = typeFromAST(schema, node.type);
        this._inputTypeStack.push(
          isInputType(inputType) ? inputType : void 0
        );
        break;
      }
      case Kind.ARGUMENT: {
        var _this$getDirective;
        let argDef;
        let argType;
        const fieldOrDirective = (_this$getDirective = this.getDirective()) !== null && _this$getDirective !== void 0 ? _this$getDirective : this.getFieldDef();
        if (fieldOrDirective) {
          argDef = fieldOrDirective.args.find(
            (arg) => arg.name === node.name.value
          );
          if (argDef) {
            argType = argDef.type;
          }
        }
        this._argument = argDef;
        this._defaultValueStack.push(argDef ? argDef.defaultValue : void 0);
        this._inputTypeStack.push(isInputType(argType) ? argType : void 0);
        break;
      }
      case Kind.LIST: {
        const listType = getNullableType(this.getInputType());
        const itemType = isListType(listType) ? listType.ofType : listType;
        this._defaultValueStack.push(void 0);
        this._inputTypeStack.push(isInputType(itemType) ? itemType : void 0);
        break;
      }
      case Kind.OBJECT_FIELD: {
        const objectType = getNamedType(this.getInputType());
        let inputFieldType;
        let inputField;
        if (isInputObjectType(objectType)) {
          inputField = objectType.getFields()[node.name.value];
          if (inputField) {
            inputFieldType = inputField.type;
          }
        }
        this._defaultValueStack.push(
          inputField ? inputField.defaultValue : void 0
        );
        this._inputTypeStack.push(
          isInputType(inputFieldType) ? inputFieldType : void 0
        );
        break;
      }
      case Kind.ENUM: {
        const enumType = getNamedType(this.getInputType());
        let enumValue;
        if (isEnumType(enumType)) {
          enumValue = enumType.getValue(node.value);
        }
        this._enumValue = enumValue;
        break;
      }
      default:
    }
  }
  leave(node) {
    switch (node.kind) {
      case Kind.SELECTION_SET:
        this._parentTypeStack.pop();
        break;
      case Kind.FIELD:
        this._fieldDefStack.pop();
        this._typeStack.pop();
        break;
      case Kind.DIRECTIVE:
        this._directive = null;
        break;
      case Kind.OPERATION_DEFINITION:
      case Kind.INLINE_FRAGMENT:
      case Kind.FRAGMENT_DEFINITION:
        this._typeStack.pop();
        break;
      case Kind.VARIABLE_DEFINITION:
        this._inputTypeStack.pop();
        break;
      case Kind.ARGUMENT:
        this._argument = null;
        this._defaultValueStack.pop();
        this._inputTypeStack.pop();
        break;
      case Kind.LIST:
      case Kind.OBJECT_FIELD:
        this._defaultValueStack.pop();
        this._inputTypeStack.pop();
        break;
      case Kind.ENUM:
        this._enumValue = null;
        break;
      default:
    }
  }
};
function getFieldDef(schema, parentType, fieldNode) {
  const name = fieldNode.name.value;
  if (name === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  }
  if (name === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  }
  if (name === TypeNameMetaFieldDef.name && isCompositeType(parentType)) {
    return TypeNameMetaFieldDef;
  }
  if (isObjectType(parentType) || isInterfaceType(parentType)) {
    return parentType.getFields()[name];
  }
}
function visitWithTypeInfo(typeInfo, visitor) {
  return {
    enter(...args) {
      const node = args[0];
      typeInfo.enter(node);
      const fn = getEnterLeaveForKind(visitor, node.kind).enter;
      if (fn) {
        const result = fn.apply(visitor, args);
        if (result !== void 0) {
          typeInfo.leave(node);
          if (isNode(result)) {
            typeInfo.enter(result);
          }
        }
        return result;
      }
    },
    leave(...args) {
      const node = args[0];
      const fn = getEnterLeaveForKind(visitor, node.kind).leave;
      let result;
      if (fn) {
        result = fn.apply(visitor, args);
      }
      typeInfo.leave(node);
      return result;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/language/predicates.mjs
function isDefinitionNode(node) {
  return isExecutableDefinitionNode(node) || isTypeSystemDefinitionNode(node) || isTypeSystemExtensionNode(node);
}
function isExecutableDefinitionNode(node) {
  return node.kind === Kind.OPERATION_DEFINITION || node.kind === Kind.FRAGMENT_DEFINITION;
}
function isTypeSystemDefinitionNode(node) {
  return node.kind === Kind.SCHEMA_DEFINITION || isTypeDefinitionNode(node) || node.kind === Kind.DIRECTIVE_DEFINITION;
}
function isTypeDefinitionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION || node.kind === Kind.OBJECT_TYPE_DEFINITION || node.kind === Kind.INTERFACE_TYPE_DEFINITION || node.kind === Kind.UNION_TYPE_DEFINITION || node.kind === Kind.ENUM_TYPE_DEFINITION || node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
function isTypeSystemExtensionNode(node) {
  return node.kind === Kind.SCHEMA_EXTENSION || isTypeExtensionNode(node);
}
function isTypeExtensionNode(node) {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION || node.kind === Kind.OBJECT_TYPE_EXTENSION || node.kind === Kind.INTERFACE_TYPE_EXTENSION || node.kind === Kind.UNION_TYPE_EXTENSION || node.kind === Kind.ENUM_TYPE_EXTENSION || node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/ExecutableDefinitionsRule.mjs
function ExecutableDefinitionsRule(context) {
  return {
    Document(node) {
      for (const definition of node.definitions) {
        if (!isExecutableDefinitionNode(definition)) {
          const defName = definition.kind === Kind.SCHEMA_DEFINITION || definition.kind === Kind.SCHEMA_EXTENSION ? "schema" : '"' + definition.name.value + '"';
          context.reportError(
            new GraphQLError(`The ${defName} definition is not executable.`, {
              nodes: definition
            })
          );
        }
      }
      return false;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/FieldsOnCorrectTypeRule.mjs
function FieldsOnCorrectTypeRule(context) {
  return {
    Field(node) {
      const type = context.getParentType();
      if (type) {
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          const schema = context.getSchema();
          const fieldName = node.name.value;
          let suggestion = didYouMean(
            "to use an inline fragment on",
            getSuggestedTypeNames(schema, type, fieldName)
          );
          if (suggestion === "") {
            suggestion = didYouMean(getSuggestedFieldNames(type, fieldName));
          }
          context.reportError(
            new GraphQLError(
              `Cannot query field "${fieldName}" on type "${type.name}".` + suggestion,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}
function getSuggestedTypeNames(schema, type, fieldName) {
  if (!isAbstractType(type)) {
    return [];
  }
  const suggestedTypes = /* @__PURE__ */ new Set();
  const usageCount = /* @__PURE__ */ Object.create(null);
  for (const possibleType of schema.getPossibleTypes(type)) {
    if (!possibleType.getFields()[fieldName]) {
      continue;
    }
    suggestedTypes.add(possibleType);
    usageCount[possibleType.name] = 1;
    for (const possibleInterface of possibleType.getInterfaces()) {
      var _usageCount$possibleI;
      if (!possibleInterface.getFields()[fieldName]) {
        continue;
      }
      suggestedTypes.add(possibleInterface);
      usageCount[possibleInterface.name] = ((_usageCount$possibleI = usageCount[possibleInterface.name]) !== null && _usageCount$possibleI !== void 0 ? _usageCount$possibleI : 0) + 1;
    }
  }
  return [...suggestedTypes].sort((typeA, typeB) => {
    const usageCountDiff = usageCount[typeB.name] - usageCount[typeA.name];
    if (usageCountDiff !== 0) {
      return usageCountDiff;
    }
    if (isInterfaceType(typeA) && schema.isSubType(typeA, typeB)) {
      return -1;
    }
    if (isInterfaceType(typeB) && schema.isSubType(typeB, typeA)) {
      return 1;
    }
    return naturalCompare(typeA.name, typeB.name);
  }).map((x) => x.name);
}
function getSuggestedFieldNames(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type)) {
    const possibleFieldNames = Object.keys(type.getFields());
    return suggestionList(fieldName, possibleFieldNames);
  }
  return [];
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/FragmentsOnCompositeTypesRule.mjs
function FragmentsOnCompositeTypesRule(context) {
  return {
    InlineFragment(node) {
      const typeCondition = node.typeCondition;
      if (typeCondition) {
        const type = typeFromAST(context.getSchema(), typeCondition);
        if (type && !isCompositeType(type)) {
          const typeStr = print(typeCondition);
          context.reportError(
            new GraphQLError(
              `Fragment cannot condition on non composite type "${typeStr}".`,
              {
                nodes: typeCondition
              }
            )
          );
        }
      }
    },
    FragmentDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.typeCondition);
      if (type && !isCompositeType(type)) {
        const typeStr = print(node.typeCondition);
        context.reportError(
          new GraphQLError(
            `Fragment "${node.name.value}" cannot condition on non composite type "${typeStr}".`,
            {
              nodes: node.typeCondition
            }
          )
        );
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/KnownArgumentNamesRule.mjs
function KnownArgumentNamesRule(context) {
  return {
    ...KnownArgumentNamesOnDirectivesRule(context),
    Argument(argNode) {
      const argDef = context.getArgument();
      const fieldDef = context.getFieldDef();
      const parentType = context.getParentType();
      if (!argDef && fieldDef && parentType) {
        const argName = argNode.name.value;
        const knownArgsNames = fieldDef.args.map((arg) => arg.name);
        const suggestions = suggestionList(argName, knownArgsNames);
        context.reportError(
          new GraphQLError(
            `Unknown argument "${argName}" on field "${parentType.name}.${fieldDef.name}".` + didYouMean(suggestions),
            {
              nodes: argNode
            }
          )
        );
      }
    }
  };
}
function KnownArgumentNamesOnDirectivesRule(context) {
  const directiveArgs = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    directiveArgs[directive.name] = directive.args.map((arg) => arg.name);
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argsNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      directiveArgs[def.name.value] = argsNodes.map((arg) => arg.name.value);
    }
  }
  return {
    Directive(directiveNode) {
      const directiveName = directiveNode.name.value;
      const knownArgs = directiveArgs[directiveName];
      if (directiveNode.arguments && knownArgs) {
        for (const argNode of directiveNode.arguments) {
          const argName = argNode.name.value;
          if (!knownArgs.includes(argName)) {
            const suggestions = suggestionList(argName, knownArgs);
            context.reportError(
              new GraphQLError(
                `Unknown argument "${argName}" on directive "@${directiveName}".` + didYouMean(suggestions),
                {
                  nodes: argNode
                }
              )
            );
          }
        }
      }
      return false;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/KnownDirectivesRule.mjs
function KnownDirectivesRule(context) {
  const locationsMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    locationsMap[directive.name] = directive.locations;
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      locationsMap[def.name.value] = def.locations.map((name) => name.value);
    }
  }
  return {
    Directive(node, _key, _parent, _path, ancestors) {
      const name = node.name.value;
      const locations = locationsMap[name];
      if (!locations) {
        context.reportError(
          new GraphQLError(`Unknown directive "@${name}".`, {
            nodes: node
          })
        );
        return;
      }
      const candidateLocation = getDirectiveLocationForASTPath(ancestors);
      if (candidateLocation && !locations.includes(candidateLocation)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${name}" may not be used on ${candidateLocation}.`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getDirectiveLocationForASTPath(ancestors) {
  const appliedTo = ancestors[ancestors.length - 1];
  "kind" in appliedTo || invariant(false);
  switch (appliedTo.kind) {
    case Kind.OPERATION_DEFINITION:
      return getDirectiveLocationForOperation(appliedTo.operation);
    case Kind.FIELD:
      return DirectiveLocation.FIELD;
    case Kind.FRAGMENT_SPREAD:
      return DirectiveLocation.FRAGMENT_SPREAD;
    case Kind.INLINE_FRAGMENT:
      return DirectiveLocation.INLINE_FRAGMENT;
    case Kind.FRAGMENT_DEFINITION:
      return DirectiveLocation.FRAGMENT_DEFINITION;
    case Kind.VARIABLE_DEFINITION:
      return DirectiveLocation.VARIABLE_DEFINITION;
    case Kind.SCHEMA_DEFINITION:
    case Kind.SCHEMA_EXTENSION:
      return DirectiveLocation.SCHEMA;
    case Kind.SCALAR_TYPE_DEFINITION:
    case Kind.SCALAR_TYPE_EXTENSION:
      return DirectiveLocation.SCALAR;
    case Kind.OBJECT_TYPE_DEFINITION:
    case Kind.OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.OBJECT;
    case Kind.FIELD_DEFINITION:
      return DirectiveLocation.FIELD_DEFINITION;
    case Kind.INTERFACE_TYPE_DEFINITION:
    case Kind.INTERFACE_TYPE_EXTENSION:
      return DirectiveLocation.INTERFACE;
    case Kind.UNION_TYPE_DEFINITION:
    case Kind.UNION_TYPE_EXTENSION:
      return DirectiveLocation.UNION;
    case Kind.ENUM_TYPE_DEFINITION:
    case Kind.ENUM_TYPE_EXTENSION:
      return DirectiveLocation.ENUM;
    case Kind.ENUM_VALUE_DEFINITION:
      return DirectiveLocation.ENUM_VALUE;
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return DirectiveLocation.INPUT_OBJECT;
    case Kind.INPUT_VALUE_DEFINITION: {
      const parentNode = ancestors[ancestors.length - 3];
      "kind" in parentNode || invariant(false);
      return parentNode.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION ? DirectiveLocation.INPUT_FIELD_DEFINITION : DirectiveLocation.ARGUMENT_DEFINITION;
    }
    default:
      invariant(false, "Unexpected kind: " + inspect(appliedTo.kind));
  }
}
function getDirectiveLocationForOperation(operation) {
  switch (operation) {
    case OperationTypeNode.QUERY:
      return DirectiveLocation.QUERY;
    case OperationTypeNode.MUTATION:
      return DirectiveLocation.MUTATION;
    case OperationTypeNode.SUBSCRIPTION:
      return DirectiveLocation.SUBSCRIPTION;
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/KnownFragmentNamesRule.mjs
function KnownFragmentNamesRule(context) {
  return {
    FragmentSpread(node) {
      const fragmentName = node.name.value;
      const fragment = context.getFragment(fragmentName);
      if (!fragment) {
        context.reportError(
          new GraphQLError(`Unknown fragment "${fragmentName}".`, {
            nodes: node.name
          })
        );
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/KnownTypeNamesRule.mjs
function KnownTypeNamesRule(context) {
  const schema = context.getSchema();
  const existingTypesMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = true;
    }
  }
  const typeNames = [
    ...Object.keys(existingTypesMap),
    ...Object.keys(definedTypes)
  ];
  return {
    NamedType(node, _1, parent, _2, ancestors) {
      const typeName = node.name.value;
      if (!existingTypesMap[typeName] && !definedTypes[typeName]) {
        var _ancestors$;
        const definitionNode = (_ancestors$ = ancestors[2]) !== null && _ancestors$ !== void 0 ? _ancestors$ : parent;
        const isSDL = definitionNode != null && isSDLNode(definitionNode);
        if (isSDL && standardTypeNames.includes(typeName)) {
          return;
        }
        const suggestedTypes = suggestionList(
          typeName,
          isSDL ? standardTypeNames.concat(typeNames) : typeNames
        );
        context.reportError(
          new GraphQLError(
            `Unknown type "${typeName}".` + didYouMean(suggestedTypes),
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
var standardTypeNames = [...specifiedScalarTypes, ...introspectionTypes].map(
  (type) => type.name
);
function isSDLNode(value) {
  return "kind" in value && (isTypeSystemDefinitionNode(value) || isTypeSystemExtensionNode(value));
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/LoneAnonymousOperationRule.mjs
function LoneAnonymousOperationRule(context) {
  let operationCount = 0;
  return {
    Document(node) {
      operationCount = node.definitions.filter(
        (definition) => definition.kind === Kind.OPERATION_DEFINITION
      ).length;
    },
    OperationDefinition(node) {
      if (!node.name && operationCount > 1) {
        context.reportError(
          new GraphQLError(
            "This anonymous operation must be the only defined operation.",
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/LoneSchemaDefinitionRule.mjs
function LoneSchemaDefinitionRule(context) {
  var _ref, _ref2, _oldSchema$astNode;
  const oldSchema = context.getSchema();
  const alreadyDefined = (_ref = (_ref2 = (_oldSchema$astNode = oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.astNode) !== null && _oldSchema$astNode !== void 0 ? _oldSchema$astNode : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getQueryType()) !== null && _ref2 !== void 0 ? _ref2 : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getMutationType()) !== null && _ref !== void 0 ? _ref : oldSchema === null || oldSchema === void 0 ? void 0 : oldSchema.getSubscriptionType();
  let schemaDefinitionsCount = 0;
  return {
    SchemaDefinition(node) {
      if (alreadyDefined) {
        context.reportError(
          new GraphQLError(
            "Cannot define a new schema within a schema extension.",
            {
              nodes: node
            }
          )
        );
        return;
      }
      if (schemaDefinitionsCount > 0) {
        context.reportError(
          new GraphQLError("Must provide only one schema definition.", {
            nodes: node
          })
        );
      }
      ++schemaDefinitionsCount;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/NoFragmentCyclesRule.mjs
function NoFragmentCyclesRule(context) {
  const visitedFrags = /* @__PURE__ */ Object.create(null);
  const spreadPath = [];
  const spreadPathIndexByName = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      detectCycleRecursive(node);
      return false;
    }
  };
  function detectCycleRecursive(fragment) {
    if (visitedFrags[fragment.name.value]) {
      return;
    }
    const fragmentName = fragment.name.value;
    visitedFrags[fragmentName] = true;
    const spreadNodes = context.getFragmentSpreads(fragment.selectionSet);
    if (spreadNodes.length === 0) {
      return;
    }
    spreadPathIndexByName[fragmentName] = spreadPath.length;
    for (const spreadNode of spreadNodes) {
      const spreadName = spreadNode.name.value;
      const cycleIndex = spreadPathIndexByName[spreadName];
      spreadPath.push(spreadNode);
      if (cycleIndex === void 0) {
        const spreadFragment = context.getFragment(spreadName);
        if (spreadFragment) {
          detectCycleRecursive(spreadFragment);
        }
      } else {
        const cyclePath = spreadPath.slice(cycleIndex);
        const viaPath = cyclePath.slice(0, -1).map((s) => '"' + s.name.value + '"').join(", ");
        context.reportError(
          new GraphQLError(
            `Cannot spread fragment "${spreadName}" within itself` + (viaPath !== "" ? ` via ${viaPath}.` : "."),
            {
              nodes: cyclePath
            }
          )
        );
      }
      spreadPath.pop();
    }
    spreadPathIndexByName[fragmentName] = void 0;
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/NoUndefinedVariablesRule.mjs
function NoUndefinedVariablesRule(context) {
  let variableNameDefined = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        variableNameDefined = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          const varName = node.name.value;
          if (variableNameDefined[varName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${varName}" is not defined by operation "${operation.name.value}".` : `Variable "$${varName}" is not defined.`,
                {
                  nodes: [node, operation]
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(node) {
      variableNameDefined[node.variable.name.value] = true;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/NoUnusedFragmentsRule.mjs
function NoUnusedFragmentsRule(context) {
  const operationDefs = [];
  const fragmentDefs = [];
  return {
    OperationDefinition(node) {
      operationDefs.push(node);
      return false;
    },
    FragmentDefinition(node) {
      fragmentDefs.push(node);
      return false;
    },
    Document: {
      leave() {
        const fragmentNameUsed = /* @__PURE__ */ Object.create(null);
        for (const operation of operationDefs) {
          for (const fragment of context.getRecursivelyReferencedFragments(
            operation
          )) {
            fragmentNameUsed[fragment.name.value] = true;
          }
        }
        for (const fragmentDef of fragmentDefs) {
          const fragName = fragmentDef.name.value;
          if (fragmentNameUsed[fragName] !== true) {
            context.reportError(
              new GraphQLError(`Fragment "${fragName}" is never used.`, {
                nodes: fragmentDef
              })
            );
          }
        }
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/NoUnusedVariablesRule.mjs
function NoUnusedVariablesRule(context) {
  let variableDefs = [];
  return {
    OperationDefinition: {
      enter() {
        variableDefs = [];
      },
      leave(operation) {
        const variableNameUsed = /* @__PURE__ */ Object.create(null);
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node } of usages) {
          variableNameUsed[node.name.value] = true;
        }
        for (const variableDef of variableDefs) {
          const variableName = variableDef.variable.name.value;
          if (variableNameUsed[variableName] !== true) {
            context.reportError(
              new GraphQLError(
                operation.name ? `Variable "$${variableName}" is never used in operation "${operation.name.value}".` : `Variable "$${variableName}" is never used.`,
                {
                  nodes: variableDef
                }
              )
            );
          }
        }
      }
    },
    VariableDefinition(def) {
      variableDefs.push(def);
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/sortValueNode.mjs
function sortValueNode(valueNode) {
  switch (valueNode.kind) {
    case Kind.OBJECT:
      return { ...valueNode, fields: sortFields(valueNode.fields) };
    case Kind.LIST:
      return { ...valueNode, values: valueNode.values.map(sortValueNode) };
    case Kind.INT:
    case Kind.FLOAT:
    case Kind.STRING:
    case Kind.BOOLEAN:
    case Kind.NULL:
    case Kind.ENUM:
    case Kind.VARIABLE:
      return valueNode;
  }
}
function sortFields(fields) {
  return fields.map((fieldNode) => ({
    ...fieldNode,
    value: sortValueNode(fieldNode.value)
  })).sort(
    (fieldA, fieldB) => naturalCompare(fieldA.name.value, fieldB.name.value)
  );
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/OverlappingFieldsCanBeMergedRule.mjs
function reasonMessage(reason) {
  if (Array.isArray(reason)) {
    return reason.map(
      ([responseName, subReason]) => `subfields "${responseName}" conflict because ` + reasonMessage(subReason)
    ).join(" and ");
  }
  return reason;
}
function OverlappingFieldsCanBeMergedRule(context) {
  const comparedFragmentPairs = new PairSet();
  const cachedFieldsAndFragmentNames = /* @__PURE__ */ new Map();
  return {
    SelectionSet(selectionSet) {
      const conflicts = findConflictsWithinSelectionSet(
        context,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        context.getParentType(),
        selectionSet
      );
      for (const [[responseName, reason], fields1, fields2] of conflicts) {
        const reasonMsg = reasonMessage(reason);
        context.reportError(
          new GraphQLError(
            `Fields "${responseName}" conflict because ${reasonMsg}. Use different aliases on the fields to fetch both if this was intentional.`,
            {
              nodes: fields1.concat(fields2)
            }
          )
        );
      }
    }
  };
}
function findConflictsWithinSelectionSet(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentType, selectionSet) {
  const conflicts = [];
  const [fieldMap, fragmentNames] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType,
    selectionSet
  );
  collectConflictsWithin(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    fieldMap
  );
  if (fragmentNames.length !== 0) {
    for (let i = 0; i < fragmentNames.length; i++) {
      collectConflictsBetweenFieldsAndFragment(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        false,
        fieldMap,
        fragmentNames[i]
      );
      for (let j = i + 1; j < fragmentNames.length; j++) {
        collectConflictsBetweenFragments(
          context,
          conflicts,
          cachedFieldsAndFragmentNames,
          comparedFragmentPairs,
          false,
          fragmentNames[i],
          fragmentNames[j]
        );
      }
    }
  }
  return conflicts;
}
function collectConflictsBetweenFieldsAndFragment(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fieldMap, fragmentName) {
  const fragment = context.getFragment(fragmentName);
  if (!fragment) {
    return;
  }
  const [fieldMap2, referencedFragmentNames] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment
  );
  if (fieldMap === fieldMap2) {
    return;
  }
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap,
    fieldMap2
  );
  for (const referencedFragmentName of referencedFragmentNames) {
    if (comparedFragmentPairs.has(
      referencedFragmentName,
      fragmentName,
      areMutuallyExclusive
    )) {
      continue;
    }
    comparedFragmentPairs.add(
      referencedFragmentName,
      fragmentName,
      areMutuallyExclusive
    );
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap,
      referencedFragmentName
    );
  }
}
function collectConflictsBetweenFragments(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, fragmentName1, fragmentName2) {
  if (fragmentName1 === fragmentName2) {
    return;
  }
  if (comparedFragmentPairs.has(
    fragmentName1,
    fragmentName2,
    areMutuallyExclusive
  )) {
    return;
  }
  comparedFragmentPairs.add(fragmentName1, fragmentName2, areMutuallyExclusive);
  const fragment1 = context.getFragment(fragmentName1);
  const fragment2 = context.getFragment(fragmentName2);
  if (!fragment1 || !fragment2) {
    return;
  }
  const [fieldMap1, referencedFragmentNames1] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment1
  );
  const [fieldMap2, referencedFragmentNames2] = getReferencedFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragment2
  );
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const referencedFragmentName2 of referencedFragmentNames2) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fragmentName1,
      referencedFragmentName2
    );
  }
  for (const referencedFragmentName1 of referencedFragmentNames1) {
    collectConflictsBetweenFragments(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      referencedFragmentName1,
      fragmentName2
    );
  }
}
function findConflictsBetweenSubSelectionSets(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, areMutuallyExclusive, parentType1, selectionSet1, parentType2, selectionSet2) {
  const conflicts = [];
  const [fieldMap1, fragmentNames1] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType1,
    selectionSet1
  );
  const [fieldMap2, fragmentNames2] = getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    parentType2,
    selectionSet2
  );
  collectConflictsBetween(
    context,
    conflicts,
    cachedFieldsAndFragmentNames,
    comparedFragmentPairs,
    areMutuallyExclusive,
    fieldMap1,
    fieldMap2
  );
  for (const fragmentName2 of fragmentNames2) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap1,
      fragmentName2
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    collectConflictsBetweenFieldsAndFragment(
      context,
      conflicts,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      fieldMap2,
      fragmentName1
    );
  }
  for (const fragmentName1 of fragmentNames1) {
    for (const fragmentName2 of fragmentNames2) {
      collectConflictsBetweenFragments(
        context,
        conflicts,
        cachedFieldsAndFragmentNames,
        comparedFragmentPairs,
        areMutuallyExclusive,
        fragmentName1,
        fragmentName2
      );
    }
  }
  return conflicts;
}
function collectConflictsWithin(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, fieldMap) {
  for (const [responseName, fields] of Object.entries(fieldMap)) {
    if (fields.length > 1) {
      for (let i = 0; i < fields.length; i++) {
        for (let j = i + 1; j < fields.length; j++) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            false,
            responseName,
            fields[i],
            fields[j]
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function collectConflictsBetween(context, conflicts, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, fieldMap1, fieldMap2) {
  for (const [responseName, fields1] of Object.entries(fieldMap1)) {
    const fields2 = fieldMap2[responseName];
    if (fields2) {
      for (const field1 of fields1) {
        for (const field2 of fields2) {
          const conflict = findConflict(
            context,
            cachedFieldsAndFragmentNames,
            comparedFragmentPairs,
            parentFieldsAreMutuallyExclusive,
            responseName,
            field1,
            field2
          );
          if (conflict) {
            conflicts.push(conflict);
          }
        }
      }
    }
  }
}
function findConflict(context, cachedFieldsAndFragmentNames, comparedFragmentPairs, parentFieldsAreMutuallyExclusive, responseName, field1, field2) {
  const [parentType1, node1, def1] = field1;
  const [parentType2, node2, def2] = field2;
  const areMutuallyExclusive = parentFieldsAreMutuallyExclusive || parentType1 !== parentType2 && isObjectType(parentType1) && isObjectType(parentType2);
  if (!areMutuallyExclusive) {
    const name1 = node1.name.value;
    const name2 = node2.name.value;
    if (name1 !== name2) {
      return [
        [responseName, `"${name1}" and "${name2}" are different fields`],
        [node1],
        [node2]
      ];
    }
    if (stringifyArguments(node1) !== stringifyArguments(node2)) {
      return [
        [responseName, "they have differing arguments"],
        [node1],
        [node2]
      ];
    }
  }
  const type1 = def1 === null || def1 === void 0 ? void 0 : def1.type;
  const type2 = def2 === null || def2 === void 0 ? void 0 : def2.type;
  if (type1 && type2 && doTypesConflict(type1, type2)) {
    return [
      [
        responseName,
        `they return conflicting types "${inspect(type1)}" and "${inspect(
          type2
        )}"`
      ],
      [node1],
      [node2]
    ];
  }
  const selectionSet1 = node1.selectionSet;
  const selectionSet2 = node2.selectionSet;
  if (selectionSet1 && selectionSet2) {
    const conflicts = findConflictsBetweenSubSelectionSets(
      context,
      cachedFieldsAndFragmentNames,
      comparedFragmentPairs,
      areMutuallyExclusive,
      getNamedType(type1),
      selectionSet1,
      getNamedType(type2),
      selectionSet2
    );
    return subfieldConflicts(conflicts, responseName, node1, node2);
  }
}
function stringifyArguments(fieldNode) {
  var _fieldNode$arguments;
  const args = (_fieldNode$arguments = fieldNode.arguments) !== null && _fieldNode$arguments !== void 0 ? _fieldNode$arguments : [];
  const inputObjectWithArgs = {
    kind: Kind.OBJECT,
    fields: args.map((argNode) => ({
      kind: Kind.OBJECT_FIELD,
      name: argNode.name,
      value: argNode.value
    }))
  };
  return print(sortValueNode(inputObjectWithArgs));
}
function doTypesConflict(type1, type2) {
  if (isListType(type1)) {
    return isListType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isListType(type2)) {
    return true;
  }
  if (isNonNullType(type1)) {
    return isNonNullType(type2) ? doTypesConflict(type1.ofType, type2.ofType) : true;
  }
  if (isNonNullType(type2)) {
    return true;
  }
  if (isLeafType(type1) || isLeafType(type2)) {
    return type1 !== type2;
  }
  return false;
}
function getFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, parentType, selectionSet) {
  const cached = cachedFieldsAndFragmentNames.get(selectionSet);
  if (cached) {
    return cached;
  }
  const nodeAndDefs = /* @__PURE__ */ Object.create(null);
  const fragmentNames = /* @__PURE__ */ Object.create(null);
  _collectFieldsAndFragmentNames(
    context,
    parentType,
    selectionSet,
    nodeAndDefs,
    fragmentNames
  );
  const result = [nodeAndDefs, Object.keys(fragmentNames)];
  cachedFieldsAndFragmentNames.set(selectionSet, result);
  return result;
}
function getReferencedFieldsAndFragmentNames(context, cachedFieldsAndFragmentNames, fragment) {
  const cached = cachedFieldsAndFragmentNames.get(fragment.selectionSet);
  if (cached) {
    return cached;
  }
  const fragmentType = typeFromAST(context.getSchema(), fragment.typeCondition);
  return getFieldsAndFragmentNames(
    context,
    cachedFieldsAndFragmentNames,
    fragmentType,
    fragment.selectionSet
  );
}
function _collectFieldsAndFragmentNames(context, parentType, selectionSet, nodeAndDefs, fragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        const fieldName = selection.name.value;
        let fieldDef;
        if (isObjectType(parentType) || isInterfaceType(parentType)) {
          fieldDef = parentType.getFields()[fieldName];
        }
        const responseName = selection.alias ? selection.alias.value : fieldName;
        if (!nodeAndDefs[responseName]) {
          nodeAndDefs[responseName] = [];
        }
        nodeAndDefs[responseName].push([parentType, selection, fieldDef]);
        break;
      }
      case Kind.FRAGMENT_SPREAD:
        fragmentNames[selection.name.value] = true;
        break;
      case Kind.INLINE_FRAGMENT: {
        const typeCondition = selection.typeCondition;
        const inlineFragmentType = typeCondition ? typeFromAST(context.getSchema(), typeCondition) : parentType;
        _collectFieldsAndFragmentNames(
          context,
          inlineFragmentType,
          selection.selectionSet,
          nodeAndDefs,
          fragmentNames
        );
        break;
      }
    }
  }
}
function subfieldConflicts(conflicts, responseName, node1, node2) {
  if (conflicts.length > 0) {
    return [
      [responseName, conflicts.map(([reason]) => reason)],
      [node1, ...conflicts.map(([, fields1]) => fields1).flat()],
      [node2, ...conflicts.map(([, , fields2]) => fields2).flat()]
    ];
  }
}
var PairSet = class {
  constructor() {
    this._data = /* @__PURE__ */ new Map();
  }
  has(a, b, areMutuallyExclusive) {
    var _this$_data$get;
    const [key1, key2] = a < b ? [a, b] : [b, a];
    const result = (_this$_data$get = this._data.get(key1)) === null || _this$_data$get === void 0 ? void 0 : _this$_data$get.get(key2);
    if (result === void 0) {
      return false;
    }
    return areMutuallyExclusive ? true : areMutuallyExclusive === result;
  }
  add(a, b, areMutuallyExclusive) {
    const [key1, key2] = a < b ? [a, b] : [b, a];
    const map2 = this._data.get(key1);
    if (map2 === void 0) {
      this._data.set(key1, /* @__PURE__ */ new Map([[key2, areMutuallyExclusive]]));
    } else {
      map2.set(key2, areMutuallyExclusive);
    }
  }
};

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/PossibleFragmentSpreadsRule.mjs
function PossibleFragmentSpreadsRule(context) {
  return {
    InlineFragment(node) {
      const fragType = context.getType();
      const parentType = context.getParentType();
      if (isCompositeType(fragType) && isCompositeType(parentType) && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    },
    FragmentSpread(node) {
      const fragName = node.name.value;
      const fragType = getFragmentType(context, fragName);
      const parentType = context.getParentType();
      if (fragType && parentType && !doTypesOverlap(context.getSchema(), fragType, parentType)) {
        const parentTypeStr = inspect(parentType);
        const fragTypeStr = inspect(fragType);
        context.reportError(
          new GraphQLError(
            `Fragment "${fragName}" cannot be spread here as objects of type "${parentTypeStr}" can never be of type "${fragTypeStr}".`,
            {
              nodes: node
            }
          )
        );
      }
    }
  };
}
function getFragmentType(context, name) {
  const frag = context.getFragment(name);
  if (frag) {
    const type = typeFromAST(context.getSchema(), frag.typeCondition);
    if (isCompositeType(type)) {
      return type;
    }
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/PossibleTypeExtensionsRule.mjs
function PossibleTypeExtensionsRule(context) {
  const schema = context.getSchema();
  const definedTypes = /* @__PURE__ */ Object.create(null);
  for (const def of context.getDocument().definitions) {
    if (isTypeDefinitionNode(def)) {
      definedTypes[def.name.value] = def;
    }
  }
  return {
    ScalarTypeExtension: checkExtension,
    ObjectTypeExtension: checkExtension,
    InterfaceTypeExtension: checkExtension,
    UnionTypeExtension: checkExtension,
    EnumTypeExtension: checkExtension,
    InputObjectTypeExtension: checkExtension
  };
  function checkExtension(node) {
    const typeName = node.name.value;
    const defNode = definedTypes[typeName];
    const existingType = schema === null || schema === void 0 ? void 0 : schema.getType(typeName);
    let expectedKind;
    if (defNode) {
      expectedKind = defKindToExtKind[defNode.kind];
    } else if (existingType) {
      expectedKind = typeToExtKind(existingType);
    }
    if (expectedKind) {
      if (expectedKind !== node.kind) {
        const kindStr = extensionKindToTypeName(node.kind);
        context.reportError(
          new GraphQLError(`Cannot extend non-${kindStr} type "${typeName}".`, {
            nodes: defNode ? [defNode, node] : node
          })
        );
      }
    } else {
      const allTypeNames = Object.keys({
        ...definedTypes,
        ...schema === null || schema === void 0 ? void 0 : schema.getTypeMap()
      });
      const suggestedTypes = suggestionList(typeName, allTypeNames);
      context.reportError(
        new GraphQLError(
          `Cannot extend type "${typeName}" because it is not defined.` + didYouMean(suggestedTypes),
          {
            nodes: node.name
          }
        )
      );
    }
  }
}
var defKindToExtKind = {
  [Kind.SCALAR_TYPE_DEFINITION]: Kind.SCALAR_TYPE_EXTENSION,
  [Kind.OBJECT_TYPE_DEFINITION]: Kind.OBJECT_TYPE_EXTENSION,
  [Kind.INTERFACE_TYPE_DEFINITION]: Kind.INTERFACE_TYPE_EXTENSION,
  [Kind.UNION_TYPE_DEFINITION]: Kind.UNION_TYPE_EXTENSION,
  [Kind.ENUM_TYPE_DEFINITION]: Kind.ENUM_TYPE_EXTENSION,
  [Kind.INPUT_OBJECT_TYPE_DEFINITION]: Kind.INPUT_OBJECT_TYPE_EXTENSION
};
function typeToExtKind(type) {
  if (isScalarType(type)) {
    return Kind.SCALAR_TYPE_EXTENSION;
  }
  if (isObjectType(type)) {
    return Kind.OBJECT_TYPE_EXTENSION;
  }
  if (isInterfaceType(type)) {
    return Kind.INTERFACE_TYPE_EXTENSION;
  }
  if (isUnionType(type)) {
    return Kind.UNION_TYPE_EXTENSION;
  }
  if (isEnumType(type)) {
    return Kind.ENUM_TYPE_EXTENSION;
  }
  if (isInputObjectType(type)) {
    return Kind.INPUT_OBJECT_TYPE_EXTENSION;
  }
  invariant(false, "Unexpected type: " + inspect(type));
}
function extensionKindToTypeName(kind) {
  switch (kind) {
    case Kind.SCALAR_TYPE_EXTENSION:
      return "scalar";
    case Kind.OBJECT_TYPE_EXTENSION:
      return "object";
    case Kind.INTERFACE_TYPE_EXTENSION:
      return "interface";
    case Kind.UNION_TYPE_EXTENSION:
      return "union";
    case Kind.ENUM_TYPE_EXTENSION:
      return "enum";
    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return "input object";
    default:
      invariant(false, "Unexpected kind: " + inspect(kind));
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/ProvidedRequiredArgumentsRule.mjs
function ProvidedRequiredArgumentsRule(context) {
  return {
    ...ProvidedRequiredArgumentsOnDirectivesRule(context),
    Field: {
      leave(fieldNode) {
        var _fieldNode$arguments;
        const fieldDef = context.getFieldDef();
        if (!fieldDef) {
          return false;
        }
        const providedArgs = new Set(
          (_fieldNode$arguments = fieldNode.arguments) === null || _fieldNode$arguments === void 0 ? void 0 : _fieldNode$arguments.map((arg) => arg.name.value)
        );
        for (const argDef of fieldDef.args) {
          if (!providedArgs.has(argDef.name) && isRequiredArgument(argDef)) {
            const argTypeStr = inspect(argDef.type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldDef.name}" argument "${argDef.name}" of type "${argTypeStr}" is required, but it was not provided.`,
                {
                  nodes: fieldNode
                }
              )
            );
          }
        }
      }
    }
  };
}
function ProvidedRequiredArgumentsOnDirectivesRule(context) {
  var _schema$getDirectives;
  const requiredArgsMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = (_schema$getDirectives = schema === null || schema === void 0 ? void 0 : schema.getDirectives()) !== null && _schema$getDirectives !== void 0 ? _schema$getDirectives : specifiedDirectives;
  for (const directive of definedDirectives) {
    requiredArgsMap[directive.name] = keyMap(
      directive.args.filter(isRequiredArgument),
      (arg) => arg.name
    );
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      var _def$arguments;
      const argNodes = (_def$arguments = def.arguments) !== null && _def$arguments !== void 0 ? _def$arguments : [];
      requiredArgsMap[def.name.value] = keyMap(
        argNodes.filter(isRequiredArgumentNode),
        (arg) => arg.name.value
      );
    }
  }
  return {
    Directive: {
      leave(directiveNode) {
        const directiveName = directiveNode.name.value;
        const requiredArgs = requiredArgsMap[directiveName];
        if (requiredArgs) {
          var _directiveNode$argume;
          const argNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
          const argNodeMap = new Set(argNodes.map((arg) => arg.name.value));
          for (const [argName, argDef] of Object.entries(requiredArgs)) {
            if (!argNodeMap.has(argName)) {
              const argType = isType(argDef.type) ? inspect(argDef.type) : print(argDef.type);
              context.reportError(
                new GraphQLError(
                  `Directive "@${directiveName}" argument "${argName}" of type "${argType}" is required, but it was not provided.`,
                  {
                    nodes: directiveNode
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}
function isRequiredArgumentNode(arg) {
  return arg.type.kind === Kind.NON_NULL_TYPE && arg.defaultValue == null;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/ScalarLeafsRule.mjs
function ScalarLeafsRule(context) {
  return {
    Field(node) {
      const type = context.getType();
      const selectionSet = node.selectionSet;
      if (type) {
        if (isLeafType(getNamedType(type))) {
          if (selectionSet) {
            const fieldName = node.name.value;
            const typeStr = inspect(type);
            context.reportError(
              new GraphQLError(
                `Field "${fieldName}" must not have a selection since type "${typeStr}" has no subfields.`,
                {
                  nodes: selectionSet
                }
              )
            );
          }
        } else if (!selectionSet) {
          const fieldName = node.name.value;
          const typeStr = inspect(type);
          context.reportError(
            new GraphQLError(
              `Field "${fieldName}" of type "${typeStr}" must have a selection of subfields. Did you mean "${fieldName} { ... }"?`,
              {
                nodes: node
              }
            )
          );
        }
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/printPathArray.mjs
function printPathArray(path) {
  return path.map(
    (key) => typeof key === "number" ? "[" + key.toString() + "]" : "." + key
  ).join("");
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/Path.mjs
function addPath(prev, key, typename) {
  return {
    prev,
    key,
    typename
  };
}
function pathToArray(path) {
  const flattened = [];
  let curr = path;
  while (curr) {
    flattened.push(curr.key);
    curr = curr.prev;
  }
  return flattened.reverse();
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/coerceInputValue.mjs
function coerceInputValue(inputValue, type, onError = defaultOnError) {
  return coerceInputValueImpl(inputValue, type, onError, void 0);
}
function defaultOnError(path, invalidValue, error) {
  let errorPrefix = "Invalid value " + inspect(invalidValue);
  if (path.length > 0) {
    errorPrefix += ` at "value${printPathArray(path)}"`;
  }
  error.message = errorPrefix + ": " + error.message;
  throw error;
}
function coerceInputValueImpl(inputValue, type, onError, path) {
  if (isNonNullType(type)) {
    if (inputValue != null) {
      return coerceInputValueImpl(inputValue, type.ofType, onError, path);
    }
    onError(
      pathToArray(path),
      inputValue,
      new GraphQLError(
        `Expected non-nullable type "${inspect(type)}" not to be null.`
      )
    );
    return;
  }
  if (inputValue == null) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (isIterableObject(inputValue)) {
      return Array.from(inputValue, (itemValue, index) => {
        const itemPath = addPath(path, index, void 0);
        return coerceInputValueImpl(itemValue, itemType, onError, itemPath);
      });
    }
    return [coerceInputValueImpl(inputValue, itemType, onError, path)];
  }
  if (isInputObjectType(type)) {
    if (!isObjectLike(inputValue)) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}" to be an object.`)
      );
      return;
    }
    const coercedValue = {};
    const fieldDefs = type.getFields();
    for (const field of Object.values(fieldDefs)) {
      const fieldValue = inputValue[field.name];
      if (fieldValue === void 0) {
        if (field.defaultValue !== void 0) {
          coercedValue[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          const typeStr = inspect(field.type);
          onError(
            pathToArray(path),
            inputValue,
            new GraphQLError(
              `Field "${field.name}" of required type "${typeStr}" was not provided.`
            )
          );
        }
        continue;
      }
      coercedValue[field.name] = coerceInputValueImpl(
        fieldValue,
        field.type,
        onError,
        addPath(path, field.name, type.name)
      );
    }
    for (const fieldName of Object.keys(inputValue)) {
      if (!fieldDefs[fieldName]) {
        const suggestions = suggestionList(
          fieldName,
          Object.keys(type.getFields())
        );
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(
            `Field "${fieldName}" is not defined by type "${type.name}".` + didYouMean(suggestions)
          )
        );
      }
    }
    return coercedValue;
  }
  if (isLeafType(type)) {
    let parseResult;
    try {
      parseResult = type.parseValue(inputValue);
    } catch (error) {
      if (error instanceof GraphQLError) {
        onError(pathToArray(path), inputValue, error);
      } else {
        onError(
          pathToArray(path),
          inputValue,
          new GraphQLError(`Expected type "${type.name}". ` + error.message, {
            originalError: error
          })
        );
      }
      return;
    }
    if (parseResult === void 0) {
      onError(
        pathToArray(path),
        inputValue,
        new GraphQLError(`Expected type "${type.name}".`)
      );
    }
    return parseResult;
  }
  invariant(false, "Unexpected input type: " + inspect(type));
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/valueFromAST.mjs
function valueFromAST(valueNode, type, variables) {
  if (!valueNode) {
    return;
  }
  if (valueNode.kind === Kind.VARIABLE) {
    const variableName = valueNode.name.value;
    if (variables == null || variables[variableName] === void 0) {
      return;
    }
    const variableValue = variables[variableName];
    if (variableValue === null && isNonNullType(type)) {
      return;
    }
    return variableValue;
  }
  if (isNonNullType(type)) {
    if (valueNode.kind === Kind.NULL) {
      return;
    }
    return valueFromAST(valueNode, type.ofType, variables);
  }
  if (valueNode.kind === Kind.NULL) {
    return null;
  }
  if (isListType(type)) {
    const itemType = type.ofType;
    if (valueNode.kind === Kind.LIST) {
      const coercedValues = [];
      for (const itemNode of valueNode.values) {
        if (isMissingVariable(itemNode, variables)) {
          if (isNonNullType(itemType)) {
            return;
          }
          coercedValues.push(null);
        } else {
          const itemValue = valueFromAST(itemNode, itemType, variables);
          if (itemValue === void 0) {
            return;
          }
          coercedValues.push(itemValue);
        }
      }
      return coercedValues;
    }
    const coercedValue = valueFromAST(valueNode, itemType, variables);
    if (coercedValue === void 0) {
      return;
    }
    return [coercedValue];
  }
  if (isInputObjectType(type)) {
    if (valueNode.kind !== Kind.OBJECT) {
      return;
    }
    const coercedObj = /* @__PURE__ */ Object.create(null);
    const fieldNodes = keyMap(valueNode.fields, (field) => field.name.value);
    for (const field of Object.values(type.getFields())) {
      const fieldNode = fieldNodes[field.name];
      if (!fieldNode || isMissingVariable(fieldNode.value, variables)) {
        if (field.defaultValue !== void 0) {
          coercedObj[field.name] = field.defaultValue;
        } else if (isNonNullType(field.type)) {
          return;
        }
        continue;
      }
      const fieldValue = valueFromAST(fieldNode.value, field.type, variables);
      if (fieldValue === void 0) {
        return;
      }
      coercedObj[field.name] = fieldValue;
    }
    return coercedObj;
  }
  if (isLeafType(type)) {
    let result;
    try {
      result = type.parseLiteral(valueNode, variables);
    } catch (_error) {
      return;
    }
    if (result === void 0) {
      return;
    }
    return result;
  }
  invariant(false, "Unexpected input type: " + inspect(type));
}
function isMissingVariable(valueNode, variables) {
  return valueNode.kind === Kind.VARIABLE && (variables == null || variables[valueNode.name.value] === void 0);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/execution/values.mjs
function getVariableValues(schema, varDefNodes, inputs, options) {
  const errors = [];
  const maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors;
  try {
    const coerced = coerceVariableValues(
      schema,
      varDefNodes,
      inputs,
      (error) => {
        if (maxErrors != null && errors.length >= maxErrors) {
          throw new GraphQLError(
            "Too many errors processing variables, error limit reached. Execution aborted."
          );
        }
        errors.push(error);
      }
    );
    if (errors.length === 0) {
      return {
        coerced
      };
    }
  } catch (error) {
    errors.push(error);
  }
  return {
    errors
  };
}
function coerceVariableValues(schema, varDefNodes, inputs, onError) {
  const coercedValues = {};
  for (const varDefNode of varDefNodes) {
    const varName = varDefNode.variable.name.value;
    const varType = typeFromAST(schema, varDefNode.type);
    if (!isInputType(varType)) {
      const varTypeStr = print(varDefNode.type);
      onError(
        new GraphQLError(
          `Variable "$${varName}" expected value of type "${varTypeStr}" which cannot be used as an input type.`,
          {
            nodes: varDefNode.type
          }
        )
      );
      continue;
    }
    if (!hasOwnProperty(inputs, varName)) {
      if (varDefNode.defaultValue) {
        coercedValues[varName] = valueFromAST(varDefNode.defaultValue, varType);
      } else if (isNonNullType(varType)) {
        const varTypeStr = inspect(varType);
        onError(
          new GraphQLError(
            `Variable "$${varName}" of required type "${varTypeStr}" was not provided.`,
            {
              nodes: varDefNode
            }
          )
        );
      }
      continue;
    }
    const value = inputs[varName];
    if (value === null && isNonNullType(varType)) {
      const varTypeStr = inspect(varType);
      onError(
        new GraphQLError(
          `Variable "$${varName}" of non-null type "${varTypeStr}" must not be null.`,
          {
            nodes: varDefNode
          }
        )
      );
      continue;
    }
    coercedValues[varName] = coerceInputValue(
      value,
      varType,
      (path, invalidValue, error) => {
        let prefix2 = `Variable "$${varName}" got invalid value ` + inspect(invalidValue);
        if (path.length > 0) {
          prefix2 += ` at "${varName}${printPathArray(path)}"`;
        }
        onError(
          new GraphQLError(prefix2 + "; " + error.message, {
            nodes: varDefNode,
            originalError: error.originalError
          })
        );
      }
    );
  }
  return coercedValues;
}
function getArgumentValues(def, node, variableValues) {
  var _node$arguments;
  const coercedValues = {};
  const argumentNodes = (_node$arguments = node.arguments) !== null && _node$arguments !== void 0 ? _node$arguments : [];
  const argNodeMap = keyMap(argumentNodes, (arg) => arg.name.value);
  for (const argDef of def.args) {
    const name = argDef.name;
    const argType = argDef.type;
    const argumentNode = argNodeMap[name];
    if (!argumentNode) {
      if (argDef.defaultValue !== void 0) {
        coercedValues[name] = argDef.defaultValue;
      } else if (isNonNullType(argType)) {
        throw new GraphQLError(
          `Argument "${name}" of required type "${inspect(argType)}" was not provided.`,
          {
            nodes: node
          }
        );
      }
      continue;
    }
    const valueNode = argumentNode.value;
    let isNull = valueNode.kind === Kind.NULL;
    if (valueNode.kind === Kind.VARIABLE) {
      const variableName = valueNode.name.value;
      if (variableValues == null || !hasOwnProperty(variableValues, variableName)) {
        if (argDef.defaultValue !== void 0) {
          coercedValues[name] = argDef.defaultValue;
        } else if (isNonNullType(argType)) {
          throw new GraphQLError(
            `Argument "${name}" of required type "${inspect(argType)}" was provided the variable "$${variableName}" which was not provided a runtime value.`,
            {
              nodes: valueNode
            }
          );
        }
        continue;
      }
      isNull = variableValues[variableName] == null;
    }
    if (isNull && isNonNullType(argType)) {
      throw new GraphQLError(
        `Argument "${name}" of non-null type "${inspect(argType)}" must not be null.`,
        {
          nodes: valueNode
        }
      );
    }
    const coercedValue = valueFromAST(valueNode, argType, variableValues);
    if (coercedValue === void 0) {
      throw new GraphQLError(
        `Argument "${name}" has invalid value ${print(valueNode)}.`,
        {
          nodes: valueNode
        }
      );
    }
    coercedValues[name] = coercedValue;
  }
  return coercedValues;
}
function getDirectiveValues(directiveDef, node, variableValues) {
  var _node$directives;
  const directiveNode = (_node$directives = node.directives) === null || _node$directives === void 0 ? void 0 : _node$directives.find(
    (directive) => directive.name.value === directiveDef.name
  );
  if (directiveNode) {
    return getArgumentValues(directiveDef, directiveNode, variableValues);
  }
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/execution/collectFields.mjs
function collectFields(schema, fragments, variableValues, runtimeType, selectionSet) {
  const fields = /* @__PURE__ */ new Map();
  collectFieldsImpl(
    schema,
    fragments,
    variableValues,
    runtimeType,
    selectionSet,
    fields,
    /* @__PURE__ */ new Set()
  );
  return fields;
}
function collectSubfields(schema, fragments, variableValues, returnType, fieldNodes) {
  const subFieldNodes = /* @__PURE__ */ new Map();
  const visitedFragmentNames = /* @__PURE__ */ new Set();
  for (const node of fieldNodes) {
    if (node.selectionSet) {
      collectFieldsImpl(
        schema,
        fragments,
        variableValues,
        returnType,
        node.selectionSet,
        subFieldNodes,
        visitedFragmentNames
      );
    }
  }
  return subFieldNodes;
}
function collectFieldsImpl(schema, fragments, variableValues, runtimeType, selectionSet, fields, visitedFragmentNames) {
  for (const selection of selectionSet.selections) {
    switch (selection.kind) {
      case Kind.FIELD: {
        if (!shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        const name = getFieldEntryKey(selection);
        const fieldList = fields.get(name);
        if (fieldList !== void 0) {
          fieldList.push(selection);
        } else {
          fields.set(name, [selection]);
        }
        break;
      }
      case Kind.INLINE_FRAGMENT: {
        if (!shouldIncludeNode(variableValues, selection) || !doesFragmentConditionMatch(schema, selection, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          selection.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
      case Kind.FRAGMENT_SPREAD: {
        const fragName = selection.name.value;
        if (visitedFragmentNames.has(fragName) || !shouldIncludeNode(variableValues, selection)) {
          continue;
        }
        visitedFragmentNames.add(fragName);
        const fragment = fragments[fragName];
        if (!fragment || !doesFragmentConditionMatch(schema, fragment, runtimeType)) {
          continue;
        }
        collectFieldsImpl(
          schema,
          fragments,
          variableValues,
          runtimeType,
          fragment.selectionSet,
          fields,
          visitedFragmentNames
        );
        break;
      }
    }
  }
}
function shouldIncludeNode(variableValues, node) {
  const skip = getDirectiveValues(GraphQLSkipDirective, node, variableValues);
  if ((skip === null || skip === void 0 ? void 0 : skip.if) === true) {
    return false;
  }
  const include = getDirectiveValues(
    GraphQLIncludeDirective,
    node,
    variableValues
  );
  if ((include === null || include === void 0 ? void 0 : include.if) === false) {
    return false;
  }
  return true;
}
function doesFragmentConditionMatch(schema, fragment, type) {
  const typeConditionNode = fragment.typeCondition;
  if (!typeConditionNode) {
    return true;
  }
  const conditionalType = typeFromAST(schema, typeConditionNode);
  if (conditionalType === type) {
    return true;
  }
  if (isAbstractType(conditionalType)) {
    return schema.isSubType(conditionalType, type);
  }
  return false;
}
function getFieldEntryKey(node) {
  return node.alias ? node.alias.value : node.name.value;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/SingleFieldSubscriptionsRule.mjs
function SingleFieldSubscriptionsRule(context) {
  return {
    OperationDefinition(node) {
      if (node.operation === "subscription") {
        const schema = context.getSchema();
        const subscriptionType = schema.getSubscriptionType();
        if (subscriptionType) {
          const operationName = node.name ? node.name.value : null;
          const variableValues = /* @__PURE__ */ Object.create(null);
          const document = context.getDocument();
          const fragments = /* @__PURE__ */ Object.create(null);
          for (const definition of document.definitions) {
            if (definition.kind === Kind.FRAGMENT_DEFINITION) {
              fragments[definition.name.value] = definition;
            }
          }
          const fields = collectFields(
            schema,
            fragments,
            variableValues,
            subscriptionType,
            node.selectionSet
          );
          if (fields.size > 1) {
            const fieldSelectionLists = [...fields.values()];
            const extraFieldSelectionLists = fieldSelectionLists.slice(1);
            const extraFieldSelections = extraFieldSelectionLists.flat();
            context.reportError(
              new GraphQLError(
                operationName != null ? `Subscription "${operationName}" must select only one top level field.` : "Anonymous Subscription must select only one top level field.",
                {
                  nodes: extraFieldSelections
                }
              )
            );
          }
          for (const fieldNodes of fields.values()) {
            const field = fieldNodes[0];
            const fieldName = field.name.value;
            if (fieldName.startsWith("__")) {
              context.reportError(
                new GraphQLError(
                  operationName != null ? `Subscription "${operationName}" must not select an introspection top level field.` : "Anonymous Subscription must not select an introspection top level field.",
                  {
                    nodes: fieldNodes
                  }
                )
              );
            }
          }
        }
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/groupBy.mjs
function groupBy(list, keyFn) {
  const result = /* @__PURE__ */ new Map();
  for (const item of list) {
    const key = keyFn(item);
    const group = result.get(key);
    if (group === void 0) {
      result.set(key, [item]);
    } else {
      group.push(item);
    }
  }
  return result;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueArgumentDefinitionNamesRule.mjs
function UniqueArgumentDefinitionNamesRule(context) {
  return {
    DirectiveDefinition(directiveNode) {
      var _directiveNode$argume;
      const argumentNodes = (_directiveNode$argume = directiveNode.arguments) !== null && _directiveNode$argume !== void 0 ? _directiveNode$argume : [];
      return checkArgUniqueness(`@${directiveNode.name.value}`, argumentNodes);
    },
    InterfaceTypeDefinition: checkArgUniquenessPerField,
    InterfaceTypeExtension: checkArgUniquenessPerField,
    ObjectTypeDefinition: checkArgUniquenessPerField,
    ObjectTypeExtension: checkArgUniquenessPerField
  };
  function checkArgUniquenessPerField(typeNode) {
    var _typeNode$fields;
    const typeName = typeNode.name.value;
    const fieldNodes = (_typeNode$fields = typeNode.fields) !== null && _typeNode$fields !== void 0 ? _typeNode$fields : [];
    for (const fieldDef of fieldNodes) {
      var _fieldDef$arguments;
      const fieldName = fieldDef.name.value;
      const argumentNodes = (_fieldDef$arguments = fieldDef.arguments) !== null && _fieldDef$arguments !== void 0 ? _fieldDef$arguments : [];
      checkArgUniqueness(`${typeName}.${fieldName}`, argumentNodes);
    }
    return false;
  }
  function checkArgUniqueness(parentName, argumentNodes) {
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `Argument "${parentName}(${argName}:)" can only be defined once.`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
    return false;
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueArgumentNamesRule.mjs
function UniqueArgumentNamesRule(context) {
  return {
    Field: checkArgUniqueness,
    Directive: checkArgUniqueness
  };
  function checkArgUniqueness(parentNode) {
    var _parentNode$arguments;
    const argumentNodes = (_parentNode$arguments = parentNode.arguments) !== null && _parentNode$arguments !== void 0 ? _parentNode$arguments : [];
    const seenArgs = groupBy(argumentNodes, (arg) => arg.name.value);
    for (const [argName, argNodes] of seenArgs) {
      if (argNodes.length > 1) {
        context.reportError(
          new GraphQLError(
            `There can be only one argument named "${argName}".`,
            {
              nodes: argNodes.map((node) => node.name)
            }
          )
        );
      }
    }
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueDirectiveNamesRule.mjs
function UniqueDirectiveNamesRule(context) {
  const knownDirectiveNames = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  return {
    DirectiveDefinition(node) {
      const directiveName = node.name.value;
      if (schema !== null && schema !== void 0 && schema.getDirective(directiveName)) {
        context.reportError(
          new GraphQLError(
            `Directive "@${directiveName}" already exists in the schema. It cannot be redefined.`,
            {
              nodes: node.name
            }
          )
        );
        return;
      }
      if (knownDirectiveNames[directiveName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one directive named "@${directiveName}".`,
            {
              nodes: [knownDirectiveNames[directiveName], node.name]
            }
          )
        );
      } else {
        knownDirectiveNames[directiveName] = node.name;
      }
      return false;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueDirectivesPerLocationRule.mjs
function UniqueDirectivesPerLocationRule(context) {
  const uniqueDirectiveMap = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  const definedDirectives = schema ? schema.getDirectives() : specifiedDirectives;
  for (const directive of definedDirectives) {
    uniqueDirectiveMap[directive.name] = !directive.isRepeatable;
  }
  const astDefinitions = context.getDocument().definitions;
  for (const def of astDefinitions) {
    if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      uniqueDirectiveMap[def.name.value] = !def.repeatable;
    }
  }
  const schemaDirectives = /* @__PURE__ */ Object.create(null);
  const typeDirectivesMap = /* @__PURE__ */ Object.create(null);
  return {
    enter(node) {
      if (!("directives" in node) || !node.directives) {
        return;
      }
      let seenDirectives;
      if (node.kind === Kind.SCHEMA_DEFINITION || node.kind === Kind.SCHEMA_EXTENSION) {
        seenDirectives = schemaDirectives;
      } else if (isTypeDefinitionNode(node) || isTypeExtensionNode(node)) {
        const typeName = node.name.value;
        seenDirectives = typeDirectivesMap[typeName];
        if (seenDirectives === void 0) {
          typeDirectivesMap[typeName] = seenDirectives = /* @__PURE__ */ Object.create(null);
        }
      } else {
        seenDirectives = /* @__PURE__ */ Object.create(null);
      }
      for (const directive of node.directives) {
        const directiveName = directive.name.value;
        if (uniqueDirectiveMap[directiveName]) {
          if (seenDirectives[directiveName]) {
            context.reportError(
              new GraphQLError(
                `The directive "@${directiveName}" can only be used once at this location.`,
                {
                  nodes: [seenDirectives[directiveName], directive]
                }
              )
            );
          } else {
            seenDirectives[directiveName] = directive;
          }
        }
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueEnumValueNamesRule.mjs
function UniqueEnumValueNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownValueNames = /* @__PURE__ */ Object.create(null);
  return {
    EnumTypeDefinition: checkValueUniqueness,
    EnumTypeExtension: checkValueUniqueness
  };
  function checkValueUniqueness(node) {
    var _node$values;
    const typeName = node.name.value;
    if (!knownValueNames[typeName]) {
      knownValueNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const valueNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
    const valueNames = knownValueNames[typeName];
    for (const valueDef of valueNodes) {
      const valueName = valueDef.name.value;
      const existingType = existingTypeMap[typeName];
      if (isEnumType(existingType) && existingType.getValue(valueName)) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: valueDef.name
            }
          )
        );
      } else if (valueNames[valueName]) {
        context.reportError(
          new GraphQLError(
            `Enum value "${typeName}.${valueName}" can only be defined once.`,
            {
              nodes: [valueNames[valueName], valueDef.name]
            }
          )
        );
      } else {
        valueNames[valueName] = valueDef.name;
      }
    }
    return false;
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueFieldDefinitionNamesRule.mjs
function UniqueFieldDefinitionNamesRule(context) {
  const schema = context.getSchema();
  const existingTypeMap = schema ? schema.getTypeMap() : /* @__PURE__ */ Object.create(null);
  const knownFieldNames = /* @__PURE__ */ Object.create(null);
  return {
    InputObjectTypeDefinition: checkFieldUniqueness,
    InputObjectTypeExtension: checkFieldUniqueness,
    InterfaceTypeDefinition: checkFieldUniqueness,
    InterfaceTypeExtension: checkFieldUniqueness,
    ObjectTypeDefinition: checkFieldUniqueness,
    ObjectTypeExtension: checkFieldUniqueness
  };
  function checkFieldUniqueness(node) {
    var _node$fields;
    const typeName = node.name.value;
    if (!knownFieldNames[typeName]) {
      knownFieldNames[typeName] = /* @__PURE__ */ Object.create(null);
    }
    const fieldNodes = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
    const fieldNames = knownFieldNames[typeName];
    for (const fieldDef of fieldNodes) {
      const fieldName = fieldDef.name.value;
      if (hasField(existingTypeMap[typeName], fieldName)) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" already exists in the schema. It cannot also be defined in this type extension.`,
            {
              nodes: fieldDef.name
            }
          )
        );
      } else if (fieldNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `Field "${typeName}.${fieldName}" can only be defined once.`,
            {
              nodes: [fieldNames[fieldName], fieldDef.name]
            }
          )
        );
      } else {
        fieldNames[fieldName] = fieldDef.name;
      }
    }
    return false;
  }
}
function hasField(type, fieldName) {
  if (isObjectType(type) || isInterfaceType(type) || isInputObjectType(type)) {
    return type.getFields()[fieldName] != null;
  }
  return false;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueFragmentNamesRule.mjs
function UniqueFragmentNamesRule(context) {
  const knownFragmentNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      const fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one fragment named "${fragmentName}".`,
            {
              nodes: [knownFragmentNames[fragmentName], node.name]
            }
          )
        );
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueInputFieldNamesRule.mjs
function UniqueInputFieldNamesRule(context) {
  const knownNameStack = [];
  let knownNames = /* @__PURE__ */ Object.create(null);
  return {
    ObjectValue: {
      enter() {
        knownNameStack.push(knownNames);
        knownNames = /* @__PURE__ */ Object.create(null);
      },
      leave() {
        const prevKnownNames = knownNameStack.pop();
        prevKnownNames || invariant(false);
        knownNames = prevKnownNames;
      }
    },
    ObjectField(node) {
      const fieldName = node.name.value;
      if (knownNames[fieldName]) {
        context.reportError(
          new GraphQLError(
            `There can be only one input field named "${fieldName}".`,
            {
              nodes: [knownNames[fieldName], node.name]
            }
          )
        );
      } else {
        knownNames[fieldName] = node.name;
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueOperationNamesRule.mjs
function UniqueOperationNamesRule(context) {
  const knownOperationNames = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition(node) {
      const operationName = node.name;
      if (operationName) {
        if (knownOperationNames[operationName.value]) {
          context.reportError(
            new GraphQLError(
              `There can be only one operation named "${operationName.value}".`,
              {
                nodes: [
                  knownOperationNames[operationName.value],
                  operationName
                ]
              }
            )
          );
        } else {
          knownOperationNames[operationName.value] = operationName;
        }
      }
      return false;
    },
    FragmentDefinition: () => false
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueOperationTypesRule.mjs
function UniqueOperationTypesRule(context) {
  const schema = context.getSchema();
  const definedOperationTypes = /* @__PURE__ */ Object.create(null);
  const existingOperationTypes = schema ? {
    query: schema.getQueryType(),
    mutation: schema.getMutationType(),
    subscription: schema.getSubscriptionType()
  } : {};
  return {
    SchemaDefinition: checkOperationTypes,
    SchemaExtension: checkOperationTypes
  };
  function checkOperationTypes(node) {
    var _node$operationTypes;
    const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
    for (const operationType of operationTypesNodes) {
      const operation = operationType.operation;
      const alreadyDefinedOperationType = definedOperationTypes[operation];
      if (existingOperationTypes[operation]) {
        context.reportError(
          new GraphQLError(
            `Type for ${operation} already defined in the schema. It cannot be redefined.`,
            {
              nodes: operationType
            }
          )
        );
      } else if (alreadyDefinedOperationType) {
        context.reportError(
          new GraphQLError(
            `There can be only one ${operation} type in schema.`,
            {
              nodes: [alreadyDefinedOperationType, operationType]
            }
          )
        );
      } else {
        definedOperationTypes[operation] = operationType;
      }
    }
    return false;
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueTypeNamesRule.mjs
function UniqueTypeNamesRule(context) {
  const knownTypeNames = /* @__PURE__ */ Object.create(null);
  const schema = context.getSchema();
  return {
    ScalarTypeDefinition: checkTypeName,
    ObjectTypeDefinition: checkTypeName,
    InterfaceTypeDefinition: checkTypeName,
    UnionTypeDefinition: checkTypeName,
    EnumTypeDefinition: checkTypeName,
    InputObjectTypeDefinition: checkTypeName
  };
  function checkTypeName(node) {
    const typeName = node.name.value;
    if (schema !== null && schema !== void 0 && schema.getType(typeName)) {
      context.reportError(
        new GraphQLError(
          `Type "${typeName}" already exists in the schema. It cannot also be defined in this type definition.`,
          {
            nodes: node.name
          }
        )
      );
      return;
    }
    if (knownTypeNames[typeName]) {
      context.reportError(
        new GraphQLError(`There can be only one type named "${typeName}".`, {
          nodes: [knownTypeNames[typeName], node.name]
        })
      );
    } else {
      knownTypeNames[typeName] = node.name;
    }
    return false;
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/UniqueVariableNamesRule.mjs
function UniqueVariableNamesRule(context) {
  return {
    OperationDefinition(operationNode) {
      var _operationNode$variab;
      const variableDefinitions = (_operationNode$variab = operationNode.variableDefinitions) !== null && _operationNode$variab !== void 0 ? _operationNode$variab : [];
      const seenVariableDefinitions = groupBy(
        variableDefinitions,
        (node) => node.variable.name.value
      );
      for (const [variableName, variableNodes] of seenVariableDefinitions) {
        if (variableNodes.length > 1) {
          context.reportError(
            new GraphQLError(
              `There can be only one variable named "$${variableName}".`,
              {
                nodes: variableNodes.map((node) => node.variable.name)
              }
            )
          );
        }
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/ValuesOfCorrectTypeRule.mjs
function ValuesOfCorrectTypeRule(context) {
  return {
    ListValue(node) {
      const type = getNullableType(context.getParentInputType());
      if (!isListType(type)) {
        isValidValueNode(context, node);
        return false;
      }
    },
    ObjectValue(node) {
      const type = getNamedType(context.getInputType());
      if (!isInputObjectType(type)) {
        isValidValueNode(context, node);
        return false;
      }
      const fieldNodeMap = keyMap(node.fields, (field) => field.name.value);
      for (const fieldDef of Object.values(type.getFields())) {
        const fieldNode = fieldNodeMap[fieldDef.name];
        if (!fieldNode && isRequiredInputField(fieldDef)) {
          const typeStr = inspect(fieldDef.type);
          context.reportError(
            new GraphQLError(
              `Field "${type.name}.${fieldDef.name}" of required type "${typeStr}" was not provided.`,
              {
                nodes: node
              }
            )
          );
        }
      }
    },
    ObjectField(node) {
      const parentType = getNamedType(context.getParentInputType());
      const fieldType = context.getInputType();
      if (!fieldType && isInputObjectType(parentType)) {
        const suggestions = suggestionList(
          node.name.value,
          Object.keys(parentType.getFields())
        );
        context.reportError(
          new GraphQLError(
            `Field "${node.name.value}" is not defined by type "${parentType.name}".` + didYouMean(suggestions),
            {
              nodes: node
            }
          )
        );
      }
    },
    NullValue(node) {
      const type = context.getInputType();
      if (isNonNullType(type)) {
        context.reportError(
          new GraphQLError(
            `Expected value of type "${inspect(type)}", found ${print(node)}.`,
            {
              nodes: node
            }
          )
        );
      }
    },
    EnumValue: (node) => isValidValueNode(context, node),
    IntValue: (node) => isValidValueNode(context, node),
    FloatValue: (node) => isValidValueNode(context, node),
    StringValue: (node) => isValidValueNode(context, node),
    BooleanValue: (node) => isValidValueNode(context, node)
  };
}
function isValidValueNode(context, node) {
  const locationType = context.getInputType();
  if (!locationType) {
    return;
  }
  const type = getNamedType(locationType);
  if (!isLeafType(type)) {
    const typeStr = inspect(locationType);
    context.reportError(
      new GraphQLError(
        `Expected value of type "${typeStr}", found ${print(node)}.`,
        {
          nodes: node
        }
      )
    );
    return;
  }
  try {
    const parseResult = type.parseLiteral(
      node,
      void 0
    );
    if (parseResult === void 0) {
      const typeStr = inspect(locationType);
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}.`,
          {
            nodes: node
          }
        )
      );
    }
  } catch (error) {
    const typeStr = inspect(locationType);
    if (error instanceof GraphQLError) {
      context.reportError(error);
    } else {
      context.reportError(
        new GraphQLError(
          `Expected value of type "${typeStr}", found ${print(node)}; ` + error.message,
          {
            nodes: node,
            originalError: error
          }
        )
      );
    }
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/VariablesAreInputTypesRule.mjs
function VariablesAreInputTypesRule(context) {
  return {
    VariableDefinition(node) {
      const type = typeFromAST(context.getSchema(), node.type);
      if (type !== void 0 && !isInputType(type)) {
        const variableName = node.variable.name.value;
        const typeName = print(node.type);
        context.reportError(
          new GraphQLError(
            `Variable "$${variableName}" cannot be non-input type "${typeName}".`,
            {
              nodes: node.type
            }
          )
        );
      }
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/rules/VariablesInAllowedPositionRule.mjs
function VariablesInAllowedPositionRule(context) {
  let varDefMap = /* @__PURE__ */ Object.create(null);
  return {
    OperationDefinition: {
      enter() {
        varDefMap = /* @__PURE__ */ Object.create(null);
      },
      leave(operation) {
        const usages = context.getRecursiveVariableUsages(operation);
        for (const { node, type, defaultValue } of usages) {
          const varName = node.name.value;
          const varDef = varDefMap[varName];
          if (varDef && type) {
            const schema = context.getSchema();
            const varType = typeFromAST(schema, varDef.type);
            if (varType && !allowedVariableUsage(
              schema,
              varType,
              varDef.defaultValue,
              type,
              defaultValue
            )) {
              const varTypeStr = inspect(varType);
              const typeStr = inspect(type);
              context.reportError(
                new GraphQLError(
                  `Variable "$${varName}" of type "${varTypeStr}" used in position expecting type "${typeStr}".`,
                  {
                    nodes: [varDef, node]
                  }
                )
              );
            }
          }
        }
      }
    },
    VariableDefinition(node) {
      varDefMap[node.variable.name.value] = node;
    }
  };
}
function allowedVariableUsage(schema, varType, varDefaultValue, locationType, locationDefaultValue) {
  if (isNonNullType(locationType) && !isNonNullType(varType)) {
    const hasNonNullVariableDefaultValue = varDefaultValue != null && varDefaultValue.kind !== Kind.NULL;
    const hasLocationDefaultValue = locationDefaultValue !== void 0;
    if (!hasNonNullVariableDefaultValue && !hasLocationDefaultValue) {
      return false;
    }
    const nullableLocationType = locationType.ofType;
    return isTypeSubTypeOf(schema, varType, nullableLocationType);
  }
  return isTypeSubTypeOf(schema, varType, locationType);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/specifiedRules.mjs
var specifiedRules = Object.freeze([
  ExecutableDefinitionsRule,
  UniqueOperationNamesRule,
  LoneAnonymousOperationRule,
  SingleFieldSubscriptionsRule,
  KnownTypeNamesRule,
  FragmentsOnCompositeTypesRule,
  VariablesAreInputTypesRule,
  ScalarLeafsRule,
  FieldsOnCorrectTypeRule,
  UniqueFragmentNamesRule,
  KnownFragmentNamesRule,
  NoUnusedFragmentsRule,
  PossibleFragmentSpreadsRule,
  NoFragmentCyclesRule,
  UniqueVariableNamesRule,
  NoUndefinedVariablesRule,
  NoUnusedVariablesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  KnownArgumentNamesRule,
  UniqueArgumentNamesRule,
  ValuesOfCorrectTypeRule,
  ProvidedRequiredArgumentsRule,
  VariablesInAllowedPositionRule,
  OverlappingFieldsCanBeMergedRule,
  UniqueInputFieldNamesRule
]);
var specifiedSDLRules = Object.freeze([
  LoneSchemaDefinitionRule,
  UniqueOperationTypesRule,
  UniqueTypeNamesRule,
  UniqueEnumValueNamesRule,
  UniqueFieldDefinitionNamesRule,
  UniqueArgumentDefinitionNamesRule,
  UniqueDirectiveNamesRule,
  KnownTypeNamesRule,
  KnownDirectivesRule,
  UniqueDirectivesPerLocationRule,
  PossibleTypeExtensionsRule,
  KnownArgumentNamesOnDirectivesRule,
  UniqueArgumentNamesRule,
  UniqueInputFieldNamesRule,
  ProvidedRequiredArgumentsOnDirectivesRule
]);

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/ValidationContext.mjs
var ASTValidationContext = class {
  constructor(ast, onError) {
    this._ast = ast;
    this._fragments = void 0;
    this._fragmentSpreads = /* @__PURE__ */ new Map();
    this._recursivelyReferencedFragments = /* @__PURE__ */ new Map();
    this._onError = onError;
  }
  get [Symbol.toStringTag]() {
    return "ASTValidationContext";
  }
  reportError(error) {
    this._onError(error);
  }
  getDocument() {
    return this._ast;
  }
  getFragment(name) {
    let fragments;
    if (this._fragments) {
      fragments = this._fragments;
    } else {
      fragments = /* @__PURE__ */ Object.create(null);
      for (const defNode of this.getDocument().definitions) {
        if (defNode.kind === Kind.FRAGMENT_DEFINITION) {
          fragments[defNode.name.value] = defNode;
        }
      }
      this._fragments = fragments;
    }
    return fragments[name];
  }
  getFragmentSpreads(node) {
    let spreads = this._fragmentSpreads.get(node);
    if (!spreads) {
      spreads = [];
      const setsToVisit = [node];
      let set;
      while (set = setsToVisit.pop()) {
        for (const selection of set.selections) {
          if (selection.kind === Kind.FRAGMENT_SPREAD) {
            spreads.push(selection);
          } else if (selection.selectionSet) {
            setsToVisit.push(selection.selectionSet);
          }
        }
      }
      this._fragmentSpreads.set(node, spreads);
    }
    return spreads;
  }
  getRecursivelyReferencedFragments(operation) {
    let fragments = this._recursivelyReferencedFragments.get(operation);
    if (!fragments) {
      fragments = [];
      const collectedNames = /* @__PURE__ */ Object.create(null);
      const nodesToVisit = [operation.selectionSet];
      let node;
      while (node = nodesToVisit.pop()) {
        for (const spread of this.getFragmentSpreads(node)) {
          const fragName = spread.name.value;
          if (collectedNames[fragName] !== true) {
            collectedNames[fragName] = true;
            const fragment = this.getFragment(fragName);
            if (fragment) {
              fragments.push(fragment);
              nodesToVisit.push(fragment.selectionSet);
            }
          }
        }
      }
      this._recursivelyReferencedFragments.set(operation, fragments);
    }
    return fragments;
  }
};
var SDLValidationContext = class extends ASTValidationContext {
  constructor(ast, schema, onError) {
    super(ast, onError);
    this._schema = schema;
  }
  get [Symbol.toStringTag]() {
    return "SDLValidationContext";
  }
  getSchema() {
    return this._schema;
  }
};
var ValidationContext = class extends ASTValidationContext {
  constructor(schema, ast, typeInfo, onError) {
    super(ast, onError);
    this._schema = schema;
    this._typeInfo = typeInfo;
    this._variableUsages = /* @__PURE__ */ new Map();
    this._recursiveVariableUsages = /* @__PURE__ */ new Map();
  }
  get [Symbol.toStringTag]() {
    return "ValidationContext";
  }
  getSchema() {
    return this._schema;
  }
  getVariableUsages(node) {
    let usages = this._variableUsages.get(node);
    if (!usages) {
      const newUsages = [];
      const typeInfo = new TypeInfo(this._schema);
      visit(
        node,
        visitWithTypeInfo(typeInfo, {
          VariableDefinition: () => false,
          Variable(variable) {
            newUsages.push({
              node: variable,
              type: typeInfo.getInputType(),
              defaultValue: typeInfo.getDefaultValue()
            });
          }
        })
      );
      usages = newUsages;
      this._variableUsages.set(node, usages);
    }
    return usages;
  }
  getRecursiveVariableUsages(operation) {
    let usages = this._recursiveVariableUsages.get(operation);
    if (!usages) {
      usages = this.getVariableUsages(operation);
      for (const frag of this.getRecursivelyReferencedFragments(operation)) {
        usages = usages.concat(this.getVariableUsages(frag));
      }
      this._recursiveVariableUsages.set(operation, usages);
    }
    return usages;
  }
  getType() {
    return this._typeInfo.getType();
  }
  getParentType() {
    return this._typeInfo.getParentType();
  }
  getInputType() {
    return this._typeInfo.getInputType();
  }
  getParentInputType() {
    return this._typeInfo.getParentInputType();
  }
  getFieldDef() {
    return this._typeInfo.getFieldDef();
  }
  getDirective() {
    return this._typeInfo.getDirective();
  }
  getArgument() {
    return this._typeInfo.getArgument();
  }
  getEnumValue() {
    return this._typeInfo.getEnumValue();
  }
};

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/validation/validate.mjs
function validate(schema, documentAST, rules = specifiedRules, options, typeInfo = new TypeInfo(schema)) {
  var _options$maxErrors;
  const maxErrors = (_options$maxErrors = options === null || options === void 0 ? void 0 : options.maxErrors) !== null && _options$maxErrors !== void 0 ? _options$maxErrors : 100;
  documentAST || devAssert(false, "Must provide document.");
  assertValidSchema(schema);
  const abortObj = Object.freeze({});
  const errors = [];
  const context = new ValidationContext(
    schema,
    documentAST,
    typeInfo,
    (error) => {
      if (errors.length >= maxErrors) {
        errors.push(
          new GraphQLError(
            "Too many validation errors, error limit reached. Validation aborted."
          )
        );
        throw abortObj;
      }
      errors.push(error);
    }
  );
  const visitor = visitInParallel(rules.map((rule) => rule(context)));
  try {
    visit(documentAST, visitWithTypeInfo(typeInfo, visitor));
  } catch (e) {
    if (e !== abortObj) {
      throw e;
    }
  }
  return errors;
}
function validateSDL(documentAST, schemaToExtend, rules = specifiedSDLRules) {
  const errors = [];
  const context = new SDLValidationContext(
    documentAST,
    schemaToExtend,
    (error) => {
      errors.push(error);
    }
  );
  const visitors = rules.map((rule) => rule(context));
  visit(documentAST, visitInParallel(visitors));
  return errors;
}
function assertValidSDL(documentAST) {
  const errors = validateSDL(documentAST);
  if (errors.length !== 0) {
    throw new Error(errors.map((error) => error.message).join("\n\n"));
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/memoize3.mjs
function memoize3(fn) {
  let cache0;
  return function memoized(a1, a2, a3) {
    if (cache0 === void 0) {
      cache0 = /* @__PURE__ */ new WeakMap();
    }
    let cache1 = cache0.get(a1);
    if (cache1 === void 0) {
      cache1 = /* @__PURE__ */ new WeakMap();
      cache0.set(a1, cache1);
    }
    let cache2 = cache1.get(a2);
    if (cache2 === void 0) {
      cache2 = /* @__PURE__ */ new WeakMap();
      cache1.set(a2, cache2);
    }
    let fnResult = cache2.get(a3);
    if (fnResult === void 0) {
      fnResult = fn(a1, a2, a3);
      cache2.set(a3, fnResult);
    }
    return fnResult;
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/promiseForObject.mjs
function promiseForObject(object) {
  return Promise.all(Object.values(object)).then((resolvedValues) => {
    const resolvedObject = /* @__PURE__ */ Object.create(null);
    for (const [i, key] of Object.keys(object).entries()) {
      resolvedObject[key] = resolvedValues[i];
    }
    return resolvedObject;
  });
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/promiseReduce.mjs
function promiseReduce(values, callbackFn, initialValue) {
  let accumulator = initialValue;
  for (const value of values) {
    accumulator = isPromise(accumulator) ? accumulator.then((resolved) => callbackFn(resolved, value)) : callbackFn(accumulator, value);
  }
  return accumulator;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/toError.mjs
function toError(thrownValue) {
  return thrownValue instanceof Error ? thrownValue : new NonErrorThrown(thrownValue);
}
var NonErrorThrown = class extends Error {
  constructor(thrownValue) {
    super("Unexpected error value: " + inspect(thrownValue));
    this.name = "NonErrorThrown";
    this.thrownValue = thrownValue;
  }
};

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/error/locatedError.mjs
function locatedError(rawOriginalError, nodes, path) {
  var _nodes;
  const originalError = toError(rawOriginalError);
  if (isLocatedGraphQLError(originalError)) {
    return originalError;
  }
  return new GraphQLError(originalError.message, {
    nodes: (_nodes = originalError.nodes) !== null && _nodes !== void 0 ? _nodes : nodes,
    source: originalError.source,
    positions: originalError.positions,
    path,
    originalError
  });
}
function isLocatedGraphQLError(error) {
  return Array.isArray(error.path);
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/execution/execute.mjs
var collectSubfields2 = memoize3(
  (exeContext, returnType, fieldNodes) => collectSubfields(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    returnType,
    fieldNodes
  )
);
function execute(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const { schema, document, variableValues, rootValue } = args;
  assertValidExecutionArguments(schema, document, variableValues);
  const exeContext = buildExecutionContext(args);
  if (!("schema" in exeContext)) {
    return {
      errors: exeContext
    };
  }
  try {
    const { operation } = exeContext;
    const result = executeOperation(exeContext, operation, rootValue);
    if (isPromise(result)) {
      return result.then(
        (data) => buildResponse(data, exeContext.errors),
        (error) => {
          exeContext.errors.push(error);
          return buildResponse(null, exeContext.errors);
        }
      );
    }
    return buildResponse(result, exeContext.errors);
  } catch (error) {
    exeContext.errors.push(error);
    return buildResponse(null, exeContext.errors);
  }
}
function buildResponse(data, errors) {
  return errors.length === 0 ? {
    data
  } : {
    errors,
    data
  };
}
function assertValidExecutionArguments(schema, document, rawVariableValues) {
  document || devAssert(false, "Must provide document.");
  assertValidSchema(schema);
  rawVariableValues == null || isObjectLike(rawVariableValues) || devAssert(
    false,
    "Variables must be provided as an Object where each property is a variable value. Perhaps look to see if an unparsed JSON string was provided."
  );
}
function buildExecutionContext(args) {
  var _definition$name, _operation$variableDe;
  const {
    schema,
    document,
    rootValue,
    contextValue,
    variableValues: rawVariableValues,
    operationName,
    fieldResolver,
    typeResolver,
    subscribeFieldResolver
  } = args;
  let operation;
  const fragments = /* @__PURE__ */ Object.create(null);
  for (const definition of document.definitions) {
    switch (definition.kind) {
      case Kind.OPERATION_DEFINITION:
        if (operationName == null) {
          if (operation !== void 0) {
            return [
              new GraphQLError(
                "Must provide operation name if query contains multiple operations."
              )
            ];
          }
          operation = definition;
        } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
          operation = definition;
        }
        break;
      case Kind.FRAGMENT_DEFINITION:
        fragments[definition.name.value] = definition;
        break;
      default:
    }
  }
  if (!operation) {
    if (operationName != null) {
      return [new GraphQLError(`Unknown operation named "${operationName}".`)];
    }
    return [new GraphQLError("Must provide an operation.")];
  }
  const variableDefinitions = (_operation$variableDe = operation.variableDefinitions) !== null && _operation$variableDe !== void 0 ? _operation$variableDe : [];
  const coercedVariableValues = getVariableValues(
    schema,
    variableDefinitions,
    rawVariableValues !== null && rawVariableValues !== void 0 ? rawVariableValues : {},
    {
      maxErrors: 50
    }
  );
  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }
  return {
    schema,
    fragments,
    rootValue,
    contextValue,
    operation,
    variableValues: coercedVariableValues.coerced,
    fieldResolver: fieldResolver !== null && fieldResolver !== void 0 ? fieldResolver : defaultFieldResolver,
    typeResolver: typeResolver !== null && typeResolver !== void 0 ? typeResolver : defaultTypeResolver,
    subscribeFieldResolver: subscribeFieldResolver !== null && subscribeFieldResolver !== void 0 ? subscribeFieldResolver : defaultFieldResolver,
    errors: []
  };
}
function executeOperation(exeContext, operation, rootValue) {
  const rootType = exeContext.schema.getRootType(operation.operation);
  if (rootType == null) {
    throw new GraphQLError(
      `Schema is not configured to execute ${operation.operation} operation.`,
      {
        nodes: operation
      }
    );
  }
  const rootFields = collectFields(
    exeContext.schema,
    exeContext.fragments,
    exeContext.variableValues,
    rootType,
    operation.selectionSet
  );
  const path = void 0;
  switch (operation.operation) {
    case OperationTypeNode.QUERY:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
    case OperationTypeNode.MUTATION:
      return executeFieldsSerially(
        exeContext,
        rootType,
        rootValue,
        path,
        rootFields
      );
    case OperationTypeNode.SUBSCRIPTION:
      return executeFields(exeContext, rootType, rootValue, path, rootFields);
  }
}
function executeFieldsSerially(exeContext, parentType, sourceValue, path, fields) {
  return promiseReduce(
    fields.entries(),
    (results, [responseName, fieldNodes]) => {
      const fieldPath = addPath(path, responseName, parentType.name);
      const result = executeField(
        exeContext,
        parentType,
        sourceValue,
        fieldNodes,
        fieldPath
      );
      if (result === void 0) {
        return results;
      }
      if (isPromise(result)) {
        return result.then((resolvedResult) => {
          results[responseName] = resolvedResult;
          return results;
        });
      }
      results[responseName] = result;
      return results;
    },
    /* @__PURE__ */ Object.create(null)
  );
}
function executeFields(exeContext, parentType, sourceValue, path, fields) {
  const results = /* @__PURE__ */ Object.create(null);
  let containsPromise = false;
  for (const [responseName, fieldNodes] of fields.entries()) {
    const fieldPath = addPath(path, responseName, parentType.name);
    const result = executeField(
      exeContext,
      parentType,
      sourceValue,
      fieldNodes,
      fieldPath
    );
    if (result !== void 0) {
      results[responseName] = result;
      if (isPromise(result)) {
        containsPromise = true;
      }
    }
  }
  if (!containsPromise) {
    return results;
  }
  return promiseForObject(results);
}
function executeField(exeContext, parentType, source, fieldNodes, path) {
  var _fieldDef$resolve;
  const fieldDef = getFieldDef2(exeContext.schema, parentType, fieldNodes[0]);
  if (!fieldDef) {
    return;
  }
  const returnType = fieldDef.type;
  const resolveFn = (_fieldDef$resolve = fieldDef.resolve) !== null && _fieldDef$resolve !== void 0 ? _fieldDef$resolve : exeContext.fieldResolver;
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    parentType,
    path
  );
  try {
    const args = getArgumentValues(
      fieldDef,
      fieldNodes[0],
      exeContext.variableValues
    );
    const contextValue = exeContext.contextValue;
    const result = resolveFn(source, args, contextValue, info);
    let completed;
    if (isPromise(result)) {
      completed = result.then(
        (resolved) => completeValue(exeContext, returnType, fieldNodes, info, path, resolved)
      );
    } else {
      completed = completeValue(
        exeContext,
        returnType,
        fieldNodes,
        info,
        path,
        result
      );
    }
    if (isPromise(completed)) {
      return completed.then(void 0, (rawError) => {
        const error = locatedError(rawError, fieldNodes, pathToArray(path));
        return handleFieldError(error, returnType, exeContext);
      });
    }
    return completed;
  } catch (rawError) {
    const error = locatedError(rawError, fieldNodes, pathToArray(path));
    return handleFieldError(error, returnType, exeContext);
  }
}
function buildResolveInfo(exeContext, fieldDef, fieldNodes, parentType, path) {
  return {
    fieldName: fieldDef.name,
    fieldNodes,
    returnType: fieldDef.type,
    parentType,
    path,
    schema: exeContext.schema,
    fragments: exeContext.fragments,
    rootValue: exeContext.rootValue,
    operation: exeContext.operation,
    variableValues: exeContext.variableValues
  };
}
function handleFieldError(error, returnType, exeContext) {
  if (isNonNullType(returnType)) {
    throw error;
  }
  exeContext.errors.push(error);
  return null;
}
function completeValue(exeContext, returnType, fieldNodes, info, path, result) {
  if (result instanceof Error) {
    throw result;
  }
  if (isNonNullType(returnType)) {
    const completed = completeValue(
      exeContext,
      returnType.ofType,
      fieldNodes,
      info,
      path,
      result
    );
    if (completed === null) {
      throw new Error(
        `Cannot return null for non-nullable field ${info.parentType.name}.${info.fieldName}.`
      );
    }
    return completed;
  }
  if (result == null) {
    return null;
  }
  if (isListType(returnType)) {
    return completeListValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result
    );
  }
  if (isLeafType(returnType)) {
    return completeLeafValue(returnType, result);
  }
  if (isAbstractType(returnType)) {
    return completeAbstractValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result
    );
  }
  if (isObjectType(returnType)) {
    return completeObjectValue(
      exeContext,
      returnType,
      fieldNodes,
      info,
      path,
      result
    );
  }
  invariant(
    false,
    "Cannot complete value of unexpected output type: " + inspect(returnType)
  );
}
function completeListValue(exeContext, returnType, fieldNodes, info, path, result) {
  if (!isIterableObject(result)) {
    throw new GraphQLError(
      `Expected Iterable, but did not find one for field "${info.parentType.name}.${info.fieldName}".`
    );
  }
  const itemType = returnType.ofType;
  let containsPromise = false;
  const completedResults = Array.from(result, (item, index) => {
    const itemPath = addPath(path, index, void 0);
    try {
      let completedItem;
      if (isPromise(item)) {
        completedItem = item.then(
          (resolved) => completeValue(
            exeContext,
            itemType,
            fieldNodes,
            info,
            itemPath,
            resolved
          )
        );
      } else {
        completedItem = completeValue(
          exeContext,
          itemType,
          fieldNodes,
          info,
          itemPath,
          item
        );
      }
      if (isPromise(completedItem)) {
        containsPromise = true;
        return completedItem.then(void 0, (rawError) => {
          const error = locatedError(
            rawError,
            fieldNodes,
            pathToArray(itemPath)
          );
          return handleFieldError(error, itemType, exeContext);
        });
      }
      return completedItem;
    } catch (rawError) {
      const error = locatedError(rawError, fieldNodes, pathToArray(itemPath));
      return handleFieldError(error, itemType, exeContext);
    }
  });
  return containsPromise ? Promise.all(completedResults) : completedResults;
}
function completeLeafValue(returnType, result) {
  const serializedResult = returnType.serialize(result);
  if (serializedResult == null) {
    throw new Error(
      `Expected \`${inspect(returnType)}.serialize(${inspect(result)})\` to return non-nullable value, returned: ${inspect(serializedResult)}`
    );
  }
  return serializedResult;
}
function completeAbstractValue(exeContext, returnType, fieldNodes, info, path, result) {
  var _returnType$resolveTy;
  const resolveTypeFn = (_returnType$resolveTy = returnType.resolveType) !== null && _returnType$resolveTy !== void 0 ? _returnType$resolveTy : exeContext.typeResolver;
  const contextValue = exeContext.contextValue;
  const runtimeType = resolveTypeFn(result, contextValue, info, returnType);
  if (isPromise(runtimeType)) {
    return runtimeType.then(
      (resolvedRuntimeType) => completeObjectValue(
        exeContext,
        ensureValidRuntimeType(
          resolvedRuntimeType,
          exeContext,
          returnType,
          fieldNodes,
          info,
          result
        ),
        fieldNodes,
        info,
        path,
        result
      )
    );
  }
  return completeObjectValue(
    exeContext,
    ensureValidRuntimeType(
      runtimeType,
      exeContext,
      returnType,
      fieldNodes,
      info,
      result
    ),
    fieldNodes,
    info,
    path,
    result
  );
}
function ensureValidRuntimeType(runtimeTypeName, exeContext, returnType, fieldNodes, info, result) {
  if (runtimeTypeName == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}". Either the "${returnType.name}" type should provide a "resolveType" function or each possible type should provide an "isTypeOf" function.`,
      fieldNodes
    );
  }
  if (isObjectType(runtimeTypeName)) {
    throw new GraphQLError(
      "Support for returning GraphQLObjectType from resolveType was removed in graphql-js@16.0.0 please return type name instead."
    );
  }
  if (typeof runtimeTypeName !== "string") {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" must resolve to an Object type at runtime for field "${info.parentType.name}.${info.fieldName}" with value ${inspect(result)}, received "${inspect(runtimeTypeName)}".`
    );
  }
  const runtimeType = exeContext.schema.getType(runtimeTypeName);
  if (runtimeType == null) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a type "${runtimeTypeName}" that does not exist inside the schema.`,
      {
        nodes: fieldNodes
      }
    );
  }
  if (!isObjectType(runtimeType)) {
    throw new GraphQLError(
      `Abstract type "${returnType.name}" was resolved to a non-object type "${runtimeTypeName}".`,
      {
        nodes: fieldNodes
      }
    );
  }
  if (!exeContext.schema.isSubType(returnType, runtimeType)) {
    throw new GraphQLError(
      `Runtime Object type "${runtimeType.name}" is not a possible type for "${returnType.name}".`,
      {
        nodes: fieldNodes
      }
    );
  }
  return runtimeType;
}
function completeObjectValue(exeContext, returnType, fieldNodes, info, path, result) {
  const subFieldNodes = collectSubfields2(exeContext, returnType, fieldNodes);
  if (returnType.isTypeOf) {
    const isTypeOf = returnType.isTypeOf(result, exeContext.contextValue, info);
    if (isPromise(isTypeOf)) {
      return isTypeOf.then((resolvedIsTypeOf) => {
        if (!resolvedIsTypeOf) {
          throw invalidReturnTypeError(returnType, result, fieldNodes);
        }
        return executeFields(
          exeContext,
          returnType,
          result,
          path,
          subFieldNodes
        );
      });
    }
    if (!isTypeOf) {
      throw invalidReturnTypeError(returnType, result, fieldNodes);
    }
  }
  return executeFields(exeContext, returnType, result, path, subFieldNodes);
}
function invalidReturnTypeError(returnType, result, fieldNodes) {
  return new GraphQLError(
    `Expected value of type "${returnType.name}" but got: ${inspect(result)}.`,
    {
      nodes: fieldNodes
    }
  );
}
var defaultTypeResolver = function(value, contextValue, info, abstractType) {
  if (isObjectLike(value) && typeof value.__typename === "string") {
    return value.__typename;
  }
  const possibleTypes = info.schema.getPossibleTypes(abstractType);
  const promisedIsTypeOfResults = [];
  for (let i = 0; i < possibleTypes.length; i++) {
    const type = possibleTypes[i];
    if (type.isTypeOf) {
      const isTypeOfResult = type.isTypeOf(value, contextValue, info);
      if (isPromise(isTypeOfResult)) {
        promisedIsTypeOfResults[i] = isTypeOfResult;
      } else if (isTypeOfResult) {
        return type.name;
      }
    }
  }
  if (promisedIsTypeOfResults.length) {
    return Promise.all(promisedIsTypeOfResults).then((isTypeOfResults) => {
      for (let i = 0; i < isTypeOfResults.length; i++) {
        if (isTypeOfResults[i]) {
          return possibleTypes[i].name;
        }
      }
    });
  }
};
var defaultFieldResolver = function(source, args, contextValue, info) {
  if (isObjectLike(source) || typeof source === "function") {
    const property = source[info.fieldName];
    if (typeof property === "function") {
      return source[info.fieldName](args, contextValue, info);
    }
    return property;
  }
};
function getFieldDef2(schema, parentType, fieldNode) {
  const fieldName = fieldNode.name.value;
  if (fieldName === SchemaMetaFieldDef.name && schema.getQueryType() === parentType) {
    return SchemaMetaFieldDef;
  } else if (fieldName === TypeMetaFieldDef.name && schema.getQueryType() === parentType) {
    return TypeMetaFieldDef;
  } else if (fieldName === TypeNameMetaFieldDef.name) {
    return TypeNameMetaFieldDef;
  }
  return parentType.getFields()[fieldName];
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/jsutils/isAsyncIterable.mjs
function isAsyncIterable(maybeAsyncIterable) {
  return typeof (maybeAsyncIterable === null || maybeAsyncIterable === void 0 ? void 0 : maybeAsyncIterable[Symbol.asyncIterator]) === "function";
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/execution/mapAsyncIterator.mjs
function mapAsyncIterator(iterable, callback) {
  const iterator = iterable[Symbol.asyncIterator]();
  async function mapResult(result) {
    if (result.done) {
      return result;
    }
    try {
      return {
        value: await callback(result.value),
        done: false
      };
    } catch (error) {
      if (typeof iterator.return === "function") {
        try {
          await iterator.return();
        } catch (_e) {
        }
      }
      throw error;
    }
  }
  return {
    async next() {
      return mapResult(await iterator.next());
    },
    async return() {
      return typeof iterator.return === "function" ? mapResult(await iterator.return()) : {
        value: void 0,
        done: true
      };
    },
    async throw(error) {
      if (typeof iterator.throw === "function") {
        return mapResult(await iterator.throw(error));
      }
      throw error;
    },
    [Symbol.asyncIterator]() {
      return this;
    }
  };
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/execution/subscribe.mjs
async function subscribe(args) {
  arguments.length < 2 || devAssert(
    false,
    "graphql@16 dropped long-deprecated support for positional arguments, please pass an object instead."
  );
  const resultOrStream = await createSourceEventStream(args);
  if (!isAsyncIterable(resultOrStream)) {
    return resultOrStream;
  }
  const mapSourceToResponse = (payload) => execute({ ...args, rootValue: payload });
  return mapAsyncIterator(resultOrStream, mapSourceToResponse);
}
function toNormalizedArgs(args) {
  const firstArg = args[0];
  if (firstArg && "document" in firstArg) {
    return firstArg;
  }
  return {
    schema: firstArg,
    document: args[1],
    rootValue: args[2],
    contextValue: args[3],
    variableValues: args[4],
    operationName: args[5],
    subscribeFieldResolver: args[6]
  };
}
async function createSourceEventStream(...rawArgs) {
  const args = toNormalizedArgs(rawArgs);
  const { schema, document, variableValues } = args;
  assertValidExecutionArguments(schema, document, variableValues);
  const exeContext = buildExecutionContext(args);
  if (!("schema" in exeContext)) {
    return {
      errors: exeContext
    };
  }
  try {
    const eventStream = await executeSubscription(exeContext);
    if (!isAsyncIterable(eventStream)) {
      throw new Error(
        `Subscription field must return Async Iterable. Received: ${inspect(eventStream)}.`
      );
    }
    return eventStream;
  } catch (error) {
    if (error instanceof GraphQLError) {
      return {
        errors: [error]
      };
    }
    throw error;
  }
}
async function executeSubscription(exeContext) {
  const { schema, fragments, operation, variableValues, rootValue } = exeContext;
  const rootType = schema.getSubscriptionType();
  if (rootType == null) {
    throw new GraphQLError(
      "Schema is not configured to execute subscription operation.",
      {
        nodes: operation
      }
    );
  }
  const rootFields = collectFields(
    schema,
    fragments,
    variableValues,
    rootType,
    operation.selectionSet
  );
  const [responseName, fieldNodes] = [...rootFields.entries()][0];
  const fieldDef = getFieldDef2(schema, rootType, fieldNodes[0]);
  if (!fieldDef) {
    const fieldName = fieldNodes[0].name.value;
    throw new GraphQLError(
      `The subscription field "${fieldName}" is not defined.`,
      {
        nodes: fieldNodes
      }
    );
  }
  const path = addPath(void 0, responseName, rootType.name);
  const info = buildResolveInfo(
    exeContext,
    fieldDef,
    fieldNodes,
    rootType,
    path
  );
  try {
    var _fieldDef$subscribe;
    const args = getArgumentValues(fieldDef, fieldNodes[0], variableValues);
    const contextValue = exeContext.contextValue;
    const resolveFn = (_fieldDef$subscribe = fieldDef.subscribe) !== null && _fieldDef$subscribe !== void 0 ? _fieldDef$subscribe : exeContext.subscribeFieldResolver;
    const eventStream = await resolveFn(rootValue, args, contextValue, info);
    if (eventStream instanceof Error) {
      throw eventStream;
    }
    return eventStream;
  } catch (error) {
    throw locatedError(error, fieldNodes, pathToArray(path));
  }
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/getOperationAST.mjs
function getOperationAST(documentAST, operationName) {
  let operation = null;
  for (const definition of documentAST.definitions) {
    if (definition.kind === Kind.OPERATION_DEFINITION) {
      var _definition$name;
      if (operationName == null) {
        if (operation) {
          return null;
        }
        operation = definition;
      } else if (((_definition$name = definition.name) === null || _definition$name === void 0 ? void 0 : _definition$name.value) === operationName) {
        return definition;
      }
    }
  }
  return operation;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/extendSchema.mjs
function extendSchemaImpl(schemaConfig, documentAST, options) {
  var _schemaDef, _schemaDef$descriptio, _schemaDef2, _options$assumeValid;
  const typeDefs = [];
  const typeExtensionsMap = /* @__PURE__ */ Object.create(null);
  const directiveDefs = [];
  let schemaDef;
  const schemaExtensions = [];
  for (const def of documentAST.definitions) {
    if (def.kind === Kind.SCHEMA_DEFINITION) {
      schemaDef = def;
    } else if (def.kind === Kind.SCHEMA_EXTENSION) {
      schemaExtensions.push(def);
    } else if (isTypeDefinitionNode(def)) {
      typeDefs.push(def);
    } else if (isTypeExtensionNode(def)) {
      const extendedTypeName = def.name.value;
      const existingTypeExtensions = typeExtensionsMap[extendedTypeName];
      typeExtensionsMap[extendedTypeName] = existingTypeExtensions ? existingTypeExtensions.concat([def]) : [def];
    } else if (def.kind === Kind.DIRECTIVE_DEFINITION) {
      directiveDefs.push(def);
    }
  }
  if (Object.keys(typeExtensionsMap).length === 0 && typeDefs.length === 0 && directiveDefs.length === 0 && schemaExtensions.length === 0 && schemaDef == null) {
    return schemaConfig;
  }
  const typeMap = /* @__PURE__ */ Object.create(null);
  for (const existingType of schemaConfig.types) {
    typeMap[existingType.name] = extendNamedType(existingType);
  }
  for (const typeNode of typeDefs) {
    var _stdTypeMap$name;
    const name = typeNode.name.value;
    typeMap[name] = (_stdTypeMap$name = stdTypeMap[name]) !== null && _stdTypeMap$name !== void 0 ? _stdTypeMap$name : buildType(typeNode);
  }
  const operationTypes = {
    query: schemaConfig.query && replaceNamedType(schemaConfig.query),
    mutation: schemaConfig.mutation && replaceNamedType(schemaConfig.mutation),
    subscription: schemaConfig.subscription && replaceNamedType(schemaConfig.subscription),
    ...schemaDef && getOperationTypes([schemaDef]),
    ...getOperationTypes(schemaExtensions)
  };
  return {
    description: (_schemaDef = schemaDef) === null || _schemaDef === void 0 ? void 0 : (_schemaDef$descriptio = _schemaDef.description) === null || _schemaDef$descriptio === void 0 ? void 0 : _schemaDef$descriptio.value,
    ...operationTypes,
    types: Object.values(typeMap),
    directives: [
      ...schemaConfig.directives.map(replaceDirective),
      ...directiveDefs.map(buildDirective)
    ],
    extensions: /* @__PURE__ */ Object.create(null),
    astNode: (_schemaDef2 = schemaDef) !== null && _schemaDef2 !== void 0 ? _schemaDef2 : schemaConfig.astNode,
    extensionASTNodes: schemaConfig.extensionASTNodes.concat(schemaExtensions),
    assumeValid: (_options$assumeValid = options === null || options === void 0 ? void 0 : options.assumeValid) !== null && _options$assumeValid !== void 0 ? _options$assumeValid : false
  };
  function replaceType(type) {
    if (isListType(type)) {
      return new GraphQLList(replaceType(type.ofType));
    }
    if (isNonNullType(type)) {
      return new GraphQLNonNull(replaceType(type.ofType));
    }
    return replaceNamedType(type);
  }
  function replaceNamedType(type) {
    return typeMap[type.name];
  }
  function replaceDirective(directive) {
    const config = directive.toConfig();
    return new GraphQLDirective({
      ...config,
      args: mapValue(config.args, extendArg)
    });
  }
  function extendNamedType(type) {
    if (isIntrospectionType(type) || isSpecifiedScalarType(type)) {
      return type;
    }
    if (isScalarType(type)) {
      return extendScalarType(type);
    }
    if (isObjectType(type)) {
      return extendObjectType(type);
    }
    if (isInterfaceType(type)) {
      return extendInterfaceType(type);
    }
    if (isUnionType(type)) {
      return extendUnionType(type);
    }
    if (isEnumType(type)) {
      return extendEnumType(type);
    }
    if (isInputObjectType(type)) {
      return extendInputObjectType(type);
    }
    invariant(false, "Unexpected type: " + inspect(type));
  }
  function extendInputObjectType(type) {
    var _typeExtensionsMap$co;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co !== void 0 ? _typeExtensionsMap$co : [];
    return new GraphQLInputObjectType({
      ...config,
      fields: () => ({
        ...mapValue(config.fields, (field) => ({
          ...field,
          type: replaceType(field.type)
        })),
        ...buildInputFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendEnumType(type) {
    var _typeExtensionsMap$ty;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$ty = typeExtensionsMap[type.name]) !== null && _typeExtensionsMap$ty !== void 0 ? _typeExtensionsMap$ty : [];
    return new GraphQLEnumType({
      ...config,
      values: { ...config.values, ...buildEnumValueMap(extensions) },
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendScalarType(type) {
    var _typeExtensionsMap$co2;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co2 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co2 !== void 0 ? _typeExtensionsMap$co2 : [];
    let specifiedByURL = config.specifiedByURL;
    for (const extensionNode of extensions) {
      var _getSpecifiedByURL;
      specifiedByURL = (_getSpecifiedByURL = getSpecifiedByURL(extensionNode)) !== null && _getSpecifiedByURL !== void 0 ? _getSpecifiedByURL : specifiedByURL;
    }
    return new GraphQLScalarType({
      ...config,
      specifiedByURL,
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendObjectType(type) {
    var _typeExtensionsMap$co3;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co3 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co3 !== void 0 ? _typeExtensionsMap$co3 : [];
    return new GraphQLObjectType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions)
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendInterfaceType(type) {
    var _typeExtensionsMap$co4;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co4 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co4 !== void 0 ? _typeExtensionsMap$co4 : [];
    return new GraphQLInterfaceType({
      ...config,
      interfaces: () => [
        ...type.getInterfaces().map(replaceNamedType),
        ...buildInterfaces(extensions)
      ],
      fields: () => ({
        ...mapValue(config.fields, extendField),
        ...buildFieldMap(extensions)
      }),
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendUnionType(type) {
    var _typeExtensionsMap$co5;
    const config = type.toConfig();
    const extensions = (_typeExtensionsMap$co5 = typeExtensionsMap[config.name]) !== null && _typeExtensionsMap$co5 !== void 0 ? _typeExtensionsMap$co5 : [];
    return new GraphQLUnionType({
      ...config,
      types: () => [
        ...type.getTypes().map(replaceNamedType),
        ...buildUnionTypes(extensions)
      ],
      extensionASTNodes: config.extensionASTNodes.concat(extensions)
    });
  }
  function extendField(field) {
    return {
      ...field,
      type: replaceType(field.type),
      args: field.args && mapValue(field.args, extendArg)
    };
  }
  function extendArg(arg) {
    return { ...arg, type: replaceType(arg.type) };
  }
  function getOperationTypes(nodes) {
    const opTypes = {};
    for (const node of nodes) {
      var _node$operationTypes;
      const operationTypesNodes = (_node$operationTypes = node.operationTypes) !== null && _node$operationTypes !== void 0 ? _node$operationTypes : [];
      for (const operationType of operationTypesNodes) {
        opTypes[operationType.operation] = getNamedType2(operationType.type);
      }
    }
    return opTypes;
  }
  function getNamedType2(node) {
    var _stdTypeMap$name2;
    const name = node.name.value;
    const type = (_stdTypeMap$name2 = stdTypeMap[name]) !== null && _stdTypeMap$name2 !== void 0 ? _stdTypeMap$name2 : typeMap[name];
    if (type === void 0) {
      throw new Error(`Unknown type: "${name}".`);
    }
    return type;
  }
  function getWrappedType(node) {
    if (node.kind === Kind.LIST_TYPE) {
      return new GraphQLList(getWrappedType(node.type));
    }
    if (node.kind === Kind.NON_NULL_TYPE) {
      return new GraphQLNonNull(getWrappedType(node.type));
    }
    return getNamedType2(node);
  }
  function buildDirective(node) {
    var _node$description;
    return new GraphQLDirective({
      name: node.name.value,
      description: (_node$description = node.description) === null || _node$description === void 0 ? void 0 : _node$description.value,
      locations: node.locations.map(({ value }) => value),
      isRepeatable: node.repeatable,
      args: buildArgumentMap(node.arguments),
      astNode: node
    });
  }
  function buildFieldMap(nodes) {
    const fieldConfigMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$fields;
      const nodeFields = (_node$fields = node.fields) !== null && _node$fields !== void 0 ? _node$fields : [];
      for (const field of nodeFields) {
        var _field$description;
        fieldConfigMap[field.name.value] = {
          type: getWrappedType(field.type),
          description: (_field$description = field.description) === null || _field$description === void 0 ? void 0 : _field$description.value,
          args: buildArgumentMap(field.arguments),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return fieldConfigMap;
  }
  function buildArgumentMap(args) {
    const argsNodes = args !== null && args !== void 0 ? args : [];
    const argConfigMap = /* @__PURE__ */ Object.create(null);
    for (const arg of argsNodes) {
      var _arg$description;
      const type = getWrappedType(arg.type);
      argConfigMap[arg.name.value] = {
        type,
        description: (_arg$description = arg.description) === null || _arg$description === void 0 ? void 0 : _arg$description.value,
        defaultValue: valueFromAST(arg.defaultValue, type),
        deprecationReason: getDeprecationReason(arg),
        astNode: arg
      };
    }
    return argConfigMap;
  }
  function buildInputFieldMap(nodes) {
    const inputFieldMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$fields2;
      const fieldsNodes = (_node$fields2 = node.fields) !== null && _node$fields2 !== void 0 ? _node$fields2 : [];
      for (const field of fieldsNodes) {
        var _field$description2;
        const type = getWrappedType(field.type);
        inputFieldMap[field.name.value] = {
          type,
          description: (_field$description2 = field.description) === null || _field$description2 === void 0 ? void 0 : _field$description2.value,
          defaultValue: valueFromAST(field.defaultValue, type),
          deprecationReason: getDeprecationReason(field),
          astNode: field
        };
      }
    }
    return inputFieldMap;
  }
  function buildEnumValueMap(nodes) {
    const enumValueMap = /* @__PURE__ */ Object.create(null);
    for (const node of nodes) {
      var _node$values;
      const valuesNodes = (_node$values = node.values) !== null && _node$values !== void 0 ? _node$values : [];
      for (const value of valuesNodes) {
        var _value$description;
        enumValueMap[value.name.value] = {
          description: (_value$description = value.description) === null || _value$description === void 0 ? void 0 : _value$description.value,
          deprecationReason: getDeprecationReason(value),
          astNode: value
        };
      }
    }
    return enumValueMap;
  }
  function buildInterfaces(nodes) {
    return nodes.flatMap(
      (node) => {
        var _node$interfaces$map, _node$interfaces;
        return (_node$interfaces$map = (_node$interfaces = node.interfaces) === null || _node$interfaces === void 0 ? void 0 : _node$interfaces.map(getNamedType2)) !== null && _node$interfaces$map !== void 0 ? _node$interfaces$map : [];
      }
    );
  }
  function buildUnionTypes(nodes) {
    return nodes.flatMap(
      (node) => {
        var _node$types$map, _node$types;
        return (_node$types$map = (_node$types = node.types) === null || _node$types === void 0 ? void 0 : _node$types.map(getNamedType2)) !== null && _node$types$map !== void 0 ? _node$types$map : [];
      }
    );
  }
  function buildType(astNode) {
    var _typeExtensionsMap$na;
    const name = astNode.name.value;
    const extensionASTNodes = (_typeExtensionsMap$na = typeExtensionsMap[name]) !== null && _typeExtensionsMap$na !== void 0 ? _typeExtensionsMap$na : [];
    switch (astNode.kind) {
      case Kind.OBJECT_TYPE_DEFINITION: {
        var _astNode$description;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLObjectType({
          name,
          description: (_astNode$description = astNode.description) === null || _astNode$description === void 0 ? void 0 : _astNode$description.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INTERFACE_TYPE_DEFINITION: {
        var _astNode$description2;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInterfaceType({
          name,
          description: (_astNode$description2 = astNode.description) === null || _astNode$description2 === void 0 ? void 0 : _astNode$description2.value,
          interfaces: () => buildInterfaces(allNodes),
          fields: () => buildFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.ENUM_TYPE_DEFINITION: {
        var _astNode$description3;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLEnumType({
          name,
          description: (_astNode$description3 = astNode.description) === null || _astNode$description3 === void 0 ? void 0 : _astNode$description3.value,
          values: buildEnumValueMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.UNION_TYPE_DEFINITION: {
        var _astNode$description4;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLUnionType({
          name,
          description: (_astNode$description4 = astNode.description) === null || _astNode$description4 === void 0 ? void 0 : _astNode$description4.value,
          types: () => buildUnionTypes(allNodes),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.SCALAR_TYPE_DEFINITION: {
        var _astNode$description5;
        return new GraphQLScalarType({
          name,
          description: (_astNode$description5 = astNode.description) === null || _astNode$description5 === void 0 ? void 0 : _astNode$description5.value,
          specifiedByURL: getSpecifiedByURL(astNode),
          astNode,
          extensionASTNodes
        });
      }
      case Kind.INPUT_OBJECT_TYPE_DEFINITION: {
        var _astNode$description6;
        const allNodes = [astNode, ...extensionASTNodes];
        return new GraphQLInputObjectType({
          name,
          description: (_astNode$description6 = astNode.description) === null || _astNode$description6 === void 0 ? void 0 : _astNode$description6.value,
          fields: () => buildInputFieldMap(allNodes),
          astNode,
          extensionASTNodes
        });
      }
    }
  }
}
var stdTypeMap = keyMap(
  [...specifiedScalarTypes, ...introspectionTypes],
  (type) => type.name
);
function getDeprecationReason(node) {
  const deprecated = getDirectiveValues(GraphQLDeprecatedDirective, node);
  return deprecated === null || deprecated === void 0 ? void 0 : deprecated.reason;
}
function getSpecifiedByURL(node) {
  const specifiedBy = getDirectiveValues(GraphQLSpecifiedByDirective, node);
  return specifiedBy === null || specifiedBy === void 0 ? void 0 : specifiedBy.url;
}

// node_modules/.pnpm/graphql@16.6.0/node_modules/graphql/utilities/buildASTSchema.mjs
function buildASTSchema(documentAST, options) {
  documentAST != null && documentAST.kind === Kind.DOCUMENT || devAssert(false, "Must provide valid Document AST.");
  if ((options === null || options === void 0 ? void 0 : options.assumeValid) !== true && (options === null || options === void 0 ? void 0 : options.assumeValidSDL) !== true) {
    assertValidSDL(documentAST);
  }
  const emptySchemaConfig = {
    description: void 0,
    types: [],
    directives: [],
    extensions: /* @__PURE__ */ Object.create(null),
    extensionASTNodes: [],
    assumeValid: false
  };
  const config = extendSchemaImpl(emptySchemaConfig, documentAST, options);
  if (config.astNode == null) {
    for (const type of config.types) {
      switch (type.name) {
        case "Query":
          config.query = type;
          break;
        case "Mutation":
          config.mutation = type;
          break;
        case "Subscription":
          config.subscription = type;
          break;
      }
    }
  }
  const directives = [
    ...config.directives,
    ...specifiedDirectives.filter(
      (stdDirective) => config.directives.every(
        (directive) => directive.name !== stdDirective.name
      )
    )
  ];
  return new GraphQLSchema({ ...config, directives });
}
function buildSchema(source, options) {
  const document = parse(source, {
    noLocation: options === null || options === void 0 ? void 0 : options.noLocation,
    allowLegacyFragmentVariables: options === null || options === void 0 ? void 0 : options.allowLegacyFragmentVariables
  });
  return buildASTSchema(document, {
    assumeValidSDL: options === null || options === void 0 ? void 0 : options.assumeValidSDL,
    assumeValid: options === null || options === void 0 ? void 0 : options.assumeValid
  });
}

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/traced-schema.js
var trackedSchemaSymbol = Symbol("TRACKED_SCHEMA");
var resolversHooksSymbol = Symbol("RESOLVERS_HOOKS");
function prepareTracedSchema(schema) {
  if (!schema || schema[trackedSchemaSymbol]) {
    return;
  }
  schema[trackedSchemaSymbol] = true;
  const entries = Object.values(schema.getTypeMap());
  for (const type of entries) {
    if (!isIntrospectionType(type) && isObjectType(type)) {
      const fields = Object.values(type.getFields());
      for (const field of fields) {
        let resolverFn = field.resolve || defaultFieldResolver;
        field.resolve = async (root, args, context, info) => {
          if (context && context[resolversHooksSymbol]) {
            const hooks = context[resolversHooksSymbol];
            const afterCalls = [];
            for (const hook of hooks) {
              const afterFn = await hook({
                root,
                args,
                context,
                info,
                resolverFn,
                replaceResolverFn: (newFn) => {
                  resolverFn = newFn;
                }
              });
              afterFn && afterCalls.push(afterFn);
            }
            try {
              let result = await resolverFn(root, args, context, info);
              for (const afterFn of afterCalls) {
                afterFn({
                  result,
                  setResult: (newResult) => {
                    result = newResult;
                  }
                });
              }
              return result;
            } catch (e) {
              let resultErr = e;
              for (const afterFn of afterCalls) {
                afterFn({
                  result: resultErr,
                  setResult: (newResult) => {
                    resultErr = newResult;
                  }
                });
              }
              throw resultErr;
            }
          } else {
            return resolverFn(root, args, context, info);
          }
        };
      }
    }
  }
}

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/utils.js
var envelopIsIntrospectionSymbol = Symbol("ENVELOP_IS_INTROSPECTION");
function isIntrospectionOperationString(operation) {
  return (typeof operation === "string" ? operation : operation.body).indexOf("__schema") !== -1;
}
function getSubscribeArgs(args) {
  return args.length === 1 ? args[0] : {
    schema: args[0],
    document: args[1],
    rootValue: args[2],
    contextValue: args[3],
    variableValues: args[4],
    operationName: args[5],
    fieldResolver: args[6],
    subscribeFieldResolver: args[7]
  };
}
var makeSubscribe = (subscribeFn) => (...polyArgs) => subscribeFn(getSubscribeArgs(polyArgs));
function mapAsyncIterator2(source, mapper) {
  const iterator = source[Symbol.asyncIterator]();
  async function mapResult(result) {
    var _a2;
    if (result.done) {
      return result;
    }
    try {
      return { value: await mapper(result.value), done: false };
    } catch (error) {
      try {
        await ((_a2 = iterator.return) === null || _a2 === void 0 ? void 0 : _a2.call(iterator));
      } catch (_error) {
      }
      throw error;
    }
  }
  const stream = {
    [Symbol.asyncIterator]() {
      return stream;
    },
    async next() {
      return await mapResult(await iterator.next());
    },
    async return() {
      var _a2;
      const promise = (_a2 = iterator.return) === null || _a2 === void 0 ? void 0 : _a2.call(iterator);
      return promise ? await mapResult(await promise) : { value: void 0, done: true };
    },
    async throw(error) {
      var _a2;
      const promise = (_a2 = iterator.throw) === null || _a2 === void 0 ? void 0 : _a2.call(iterator);
      if (promise) {
        return await mapResult(await promise);
      }
      throw error;
    }
  };
  return stream;
}
function getExecuteArgs(args) {
  return args.length === 1 ? args[0] : {
    schema: args[0],
    document: args[1],
    rootValue: args[2],
    contextValue: args[3],
    variableValues: args[4],
    operationName: args[5],
    fieldResolver: args[6],
    typeResolver: args[7]
  };
}
var makeExecute = (executeFn) => (...polyArgs) => executeFn(getExecuteArgs(polyArgs));
function isAsyncIterable2(maybeAsyncIterable) {
  return typeof maybeAsyncIterable === "object" && maybeAsyncIterable != null && typeof maybeAsyncIterable[Symbol.asyncIterator] === "function";
}
function handleStreamOrSingleExecutionResult(payload, fn) {
  if (isAsyncIterable2(payload.result)) {
    return { onNext: fn };
  }
  fn({
    args: payload.args,
    result: payload.result,
    setResult: payload.setResult
  });
  return void 0;
}
function finalAsyncIterator(source, onFinal) {
  const iterator = source[Symbol.asyncIterator]();
  let isDone = false;
  const stream = {
    [Symbol.asyncIterator]() {
      return stream;
    },
    async next() {
      const result = await iterator.next();
      if (result.done && isDone === false) {
        isDone = true;
        onFinal();
      }
      return result;
    },
    async return() {
      var _a2;
      const promise = (_a2 = iterator.return) === null || _a2 === void 0 ? void 0 : _a2.call(iterator);
      if (isDone === false) {
        isDone = true;
        onFinal();
      }
      return promise ? await promise : { done: true, value: void 0 };
    },
    async throw(error) {
      var _a2;
      const promise = (_a2 = iterator.throw) === null || _a2 === void 0 ? void 0 : _a2.call(iterator);
      if (promise) {
        return await promise;
      }
      throw error;
    }
  };
  return stream;
}
function errorAsyncIterator(source, onError) {
  const iterator = source[Symbol.asyncIterator]();
  const stream = {
    [Symbol.asyncIterator]() {
      return stream;
    },
    async next() {
      try {
        return await iterator.next();
      } catch (error) {
        onError(error);
        return { done: true, value: void 0 };
      }
    },
    async return() {
      var _a2;
      const promise = (_a2 = iterator.return) === null || _a2 === void 0 ? void 0 : _a2.call(iterator);
      return promise ? await promise : { done: true, value: void 0 };
    },
    async throw(error) {
      var _a2;
      const promise = (_a2 = iterator.throw) === null || _a2 === void 0 ? void 0 : _a2.call(iterator);
      if (promise) {
        return await promise;
      }
      throw error;
    }
  };
  return stream;
}

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/orchestrator.js
function createEnvelopOrchestrator(plugins) {
  let schema = null;
  let initDone = false;
  const onResolversHandlers = [];
  for (const plugin of plugins) {
    if (plugin.onResolverCalled) {
      onResolversHandlers.push(plugin.onResolverCalled);
    }
  }
  const replaceSchema = (newSchema, ignorePluginIndex = -1) => {
    if (onResolversHandlers.length) {
      prepareTracedSchema(newSchema);
    }
    schema = newSchema;
    if (initDone) {
      for (const [i, plugin] of plugins.entries()) {
        if (i !== ignorePluginIndex) {
          plugin.onSchemaChange && plugin.onSchemaChange({
            schema,
            replaceSchema: (schemaToSet) => {
              replaceSchema(schemaToSet, i);
            }
          });
        }
      }
    }
  };
  const contextErrorHandlers = [];
  for (const [i, plugin] of plugins.entries()) {
    plugin.onPluginInit && plugin.onPluginInit({
      plugins,
      addPlugin: (newPlugin) => {
        plugins.push(newPlugin);
      },
      setSchema: (modifiedSchema) => replaceSchema(modifiedSchema, i),
      registerContextErrorHandler: (handler) => contextErrorHandlers.push(handler)
    });
  }
  const beforeCallbacks = {
    init: [],
    parse: [],
    validate: [],
    subscribe: [],
    execute: [],
    context: []
  };
  for (const { onContextBuilding, onExecute, onParse, onSubscribe, onValidate, onEnveloped } of plugins) {
    onEnveloped && beforeCallbacks.init.push(onEnveloped);
    onContextBuilding && beforeCallbacks.context.push(onContextBuilding);
    onExecute && beforeCallbacks.execute.push(onExecute);
    onParse && beforeCallbacks.parse.push(onParse);
    onSubscribe && beforeCallbacks.subscribe.push(onSubscribe);
    onValidate && beforeCallbacks.validate.push(onValidate);
  }
  const init = (initialContext) => {
    for (const [i, onEnveloped] of beforeCallbacks.init.entries()) {
      onEnveloped({
        context: initialContext,
        extendContext: (extension) => {
          if (!initialContext) {
            return;
          }
          Object.assign(initialContext, extension);
        },
        setSchema: (modifiedSchema) => replaceSchema(modifiedSchema, i)
      });
    }
  };
  const customParse = beforeCallbacks.parse.length ? (initialContext) => (source, parseOptions) => {
    let result = null;
    let parseFn = parse;
    const context = initialContext;
    const afterCalls = [];
    for (const onParse of beforeCallbacks.parse) {
      const afterFn = onParse({
        context,
        extendContext: (extension) => {
          Object.assign(context, extension);
        },
        params: { source, options: parseOptions },
        parseFn,
        setParseFn: (newFn) => {
          parseFn = newFn;
        },
        setParsedDocument: (newDoc) => {
          result = newDoc;
        }
      });
      afterFn && afterCalls.push(afterFn);
    }
    if (result === null) {
      try {
        result = parseFn(source, parseOptions);
      } catch (e) {
        result = e;
      }
    }
    for (const afterCb of afterCalls) {
      afterCb({
        context,
        extendContext: (extension) => {
          Object.assign(context, extension);
        },
        replaceParseResult: (newResult) => {
          result = newResult;
        },
        result
      });
    }
    if (result === null) {
      throw new Error(`Failed to parse document.`);
    }
    if (result instanceof Error) {
      throw result;
    }
    return result;
  } : () => parse;
  const customValidate = beforeCallbacks.validate.length ? (initialContext) => (schema2, documentAST, rules, typeInfo, validationOptions) => {
    let actualRules = rules ? [...rules] : void 0;
    let validateFn = validate;
    let result = null;
    const context = initialContext;
    const afterCalls = [];
    for (const onValidate of beforeCallbacks.validate) {
      const afterFn = onValidate({
        context,
        extendContext: (extension) => {
          Object.assign(context, extension);
        },
        params: {
          schema: schema2,
          documentAST,
          rules: actualRules,
          typeInfo,
          options: validationOptions
        },
        validateFn,
        addValidationRule: (rule) => {
          if (!actualRules) {
            actualRules = [...specifiedRules];
          }
          actualRules.push(rule);
        },
        setValidationFn: (newFn) => {
          validateFn = newFn;
        },
        setResult: (newResults) => {
          result = newResults;
        }
      });
      afterFn && afterCalls.push(afterFn);
    }
    if (!result) {
      result = validateFn(schema2, documentAST, actualRules, typeInfo, validationOptions);
    }
    const valid = result.length === 0;
    for (const afterCb of afterCalls) {
      afterCb({
        valid,
        result,
        context,
        extendContext: (extension) => {
          Object.assign(context, extension);
        },
        setResult: (newResult) => {
          result = newResult;
        }
      });
    }
    return result;
  } : () => validate;
  const customContextFactory = beforeCallbacks.context.length ? (initialContext) => async (orchestratorCtx) => {
    const afterCalls = [];
    let context = orchestratorCtx ? { ...initialContext, ...orchestratorCtx } : initialContext;
    try {
      let isBreakingContextBuilding = false;
      for (const onContext of beforeCallbacks.context) {
        const afterHookResult = await onContext({
          context,
          extendContext: (extension) => {
            context = { ...context, ...extension };
          },
          breakContextBuilding: () => {
            isBreakingContextBuilding = true;
          }
        });
        if (typeof afterHookResult === "function") {
          afterCalls.push(afterHookResult);
        }
        if (isBreakingContextBuilding === true) {
          break;
        }
      }
      for (const afterCb of afterCalls) {
        afterCb({
          context,
          extendContext: (extension) => {
            context = { ...context, ...extension };
          }
        });
      }
      return context;
    } catch (err) {
      let error = err;
      for (const errorCb of contextErrorHandlers) {
        errorCb({
          context,
          error,
          setError: (err2) => {
            error = err2;
          }
        });
      }
      throw error;
    }
  } : (initialContext) => (orchestratorCtx) => orchestratorCtx ? { ...initialContext, ...orchestratorCtx } : initialContext;
  const useCustomSubscribe = beforeCallbacks.subscribe.length || onResolversHandlers.length;
  const customSubscribe = useCustomSubscribe ? makeSubscribe(async (args) => {
    let subscribeFn = subscribe;
    const afterCalls = [];
    const subscribeErrorHandlers = [];
    let context = args.contextValue || {};
    let result;
    for (const onSubscribe of beforeCallbacks.subscribe) {
      const after = await onSubscribe({
        subscribeFn,
        setSubscribeFn: (newSubscribeFn) => {
          subscribeFn = newSubscribeFn;
        },
        extendContext: (extension) => {
          context = { ...context, ...extension };
        },
        args,
        setResultAndStopExecution: (stopResult) => {
          result = stopResult;
        }
      });
      if (after) {
        if (after.onSubscribeResult) {
          afterCalls.push(after.onSubscribeResult);
        }
        if (after.onSubscribeError) {
          subscribeErrorHandlers.push(after.onSubscribeError);
        }
      }
      if (result !== void 0) {
        break;
      }
    }
    if (onResolversHandlers.length) {
      context[resolversHooksSymbol] = onResolversHandlers;
    }
    if (result === void 0) {
      result = await subscribeFn({
        ...args,
        contextValue: context
      });
    }
    const onNextHandler = [];
    const onEndHandler = [];
    for (const afterCb of afterCalls) {
      const hookResult = afterCb({
        args,
        result,
        setResult: (newResult) => {
          result = newResult;
        }
      });
      if (hookResult) {
        if (hookResult.onNext) {
          onNextHandler.push(hookResult.onNext);
        }
        if (hookResult.onEnd) {
          onEndHandler.push(hookResult.onEnd);
        }
      }
    }
    if (onNextHandler.length && isAsyncIterable2(result)) {
      result = mapAsyncIterator2(result, async (result2) => {
        for (const onNext of onNextHandler) {
          await onNext({
            args,
            result: result2,
            setResult: (newResult) => result2 = newResult
          });
        }
        return result2;
      });
    }
    if (onEndHandler.length && isAsyncIterable2(result)) {
      result = finalAsyncIterator(result, () => {
        for (const onEnd of onEndHandler) {
          onEnd();
        }
      });
    }
    if (subscribeErrorHandlers.length && isAsyncIterable2(result)) {
      result = errorAsyncIterator(result, (err) => {
        let error = err;
        for (const handler of subscribeErrorHandlers) {
          handler({
            error,
            setError: (err2) => {
              error = err2;
            }
          });
        }
        throw error;
      });
    }
    return result;
  }) : makeSubscribe(subscribe);
  const useCustomExecute = beforeCallbacks.execute.length || onResolversHandlers.length;
  const customExecute = useCustomExecute ? makeExecute(async (args) => {
    let executeFn = execute;
    let result;
    const afterCalls = [];
    let context = args.contextValue || {};
    for (const onExecute of beforeCallbacks.execute) {
      const after = await onExecute({
        executeFn,
        setExecuteFn: (newExecuteFn) => {
          executeFn = newExecuteFn;
        },
        setResultAndStopExecution: (stopResult) => {
          result = stopResult;
        },
        extendContext: (extension) => {
          if (typeof extension === "object") {
            context = {
              ...context,
              ...extension
            };
          } else {
            throw new Error(`Invalid context extension provided! Expected "object", got: "${JSON.stringify(extension)}" (${typeof extension})`);
          }
        },
        args
      });
      if (after === null || after === void 0 ? void 0 : after.onExecuteDone) {
        afterCalls.push(after.onExecuteDone);
      }
      if (result !== void 0) {
        break;
      }
    }
    if (onResolversHandlers.length) {
      context[resolversHooksSymbol] = onResolversHandlers;
    }
    if (result === void 0) {
      result = await executeFn({
        ...args,
        contextValue: context
      });
    }
    const onNextHandler = [];
    const onEndHandler = [];
    for (const afterCb of afterCalls) {
      const hookResult = await afterCb({
        args,
        result,
        setResult: (newResult) => {
          result = newResult;
        }
      });
      if (hookResult) {
        if (hookResult.onNext) {
          onNextHandler.push(hookResult.onNext);
        }
        if (hookResult.onEnd) {
          onEndHandler.push(hookResult.onEnd);
        }
      }
    }
    if (onNextHandler.length && isAsyncIterable2(result)) {
      result = mapAsyncIterator2(result, async (result2) => {
        for (const onNext of onNextHandler) {
          await onNext({
            args,
            result: result2,
            setResult: (newResult) => {
              result2 = newResult;
            }
          });
        }
        return result2;
      });
    }
    if (onEndHandler.length && isAsyncIterable2(result)) {
      result = finalAsyncIterator(result, () => {
        for (const onEnd of onEndHandler) {
          onEnd();
        }
      });
    }
    return result;
  }) : makeExecute(execute);
  initDone = true;
  if (schema) {
    for (const [i, plugin] of plugins.entries()) {
      plugin.onSchemaChange && plugin.onSchemaChange({
        schema,
        replaceSchema: (modifiedSchema) => replaceSchema(modifiedSchema, i)
      });
    }
  }
  return {
    getCurrentSchema() {
      return schema;
    },
    init,
    parse: customParse,
    validate: customValidate,
    execute: customExecute,
    subscribe: customSubscribe,
    contextFactory: customContextFactory
  };
}

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/traced-orchestrator.js
var _a;
var getTimestamp = typeof globalThis !== "undefined" && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.performance) === null || _a === void 0 ? void 0 : _a.now) ? () => globalThis.performance.now() : () => Date.now();
var measure = () => {
  const start = getTimestamp();
  return () => {
    const end = getTimestamp();
    return end - start;
  };
};
var tracingSymbol = Symbol("envelopTracing");
function traceOrchestrator(orchestrator) {
  const createTracer = (name, ctx) => {
    const end = measure();
    return () => {
      ctx[tracingSymbol][name] = end();
    };
  };
  return {
    ...orchestrator,
    init: (ctx = {}) => {
      ctx[tracingSymbol] = ctx[tracingSymbol] || {};
      const done = createTracer("init", ctx || {});
      try {
        return orchestrator.init(ctx);
      } finally {
        done();
      }
    },
    parse: (ctx = {}) => {
      ctx[tracingSymbol] = ctx[tracingSymbol] || {};
      const actualFn = orchestrator.parse(ctx);
      return (...args) => {
        const done = createTracer("parse", ctx);
        try {
          return actualFn(...args);
        } finally {
          done();
        }
      };
    },
    validate: (ctx = {}) => {
      ctx[tracingSymbol] = ctx[tracingSymbol] || {};
      const actualFn = orchestrator.validate(ctx);
      return (...args) => {
        const done = createTracer("validate", ctx);
        try {
          return actualFn(...args);
        } finally {
          done();
        }
      };
    },
    execute: async (argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, typeResolver) => {
      const args = argsOrSchema instanceof GraphQLSchema ? {
        schema: argsOrSchema,
        document,
        rootValue,
        contextValue,
        variableValues,
        operationName,
        fieldResolver,
        typeResolver
      } : argsOrSchema;
      const done = createTracer("execute", args.contextValue || {});
      try {
        const result = await orchestrator.execute(args);
        done();
        if (!isAsyncIterable2(result)) {
          result.extensions = result.extensions || {};
          result.extensions.envelopTracing = args.contextValue[tracingSymbol];
        } else {
          console.warn(`"traceOrchestrator" encountered a AsyncIterator which is not supported yet, so tracing data is not available for the operation.`);
        }
        return result;
      } catch (e) {
        done();
        throw e;
      }
    },
    subscribe: async (argsOrSchema, document, rootValue, contextValue, variableValues, operationName, fieldResolver, subscribeFieldResolver) => {
      const args = argsOrSchema instanceof GraphQLSchema ? {
        schema: argsOrSchema,
        document,
        rootValue,
        contextValue,
        variableValues,
        operationName,
        fieldResolver,
        subscribeFieldResolver
      } : argsOrSchema;
      const done = createTracer("subscribe", args.contextValue || {});
      try {
        return await orchestrator.subscribe(args);
      } finally {
        done();
      }
    },
    contextFactory: (ctx = {}) => {
      const actualFn = orchestrator.contextFactory(ctx);
      return async (childCtx) => {
        const done = createTracer("contextFactory", ctx);
        try {
          return await actualFn(childCtx);
        } finally {
          done();
        }
      };
    }
  };
}

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/create.js
function envelop(options) {
  const plugins = options.plugins.filter(isPluginEnabled);
  let orchestrator = createEnvelopOrchestrator(plugins);
  if (options.enableInternalTracing) {
    orchestrator = traceOrchestrator(orchestrator);
  }
  const getEnveloped = (initialContext = {}) => {
    const typedOrchestrator = orchestrator;
    typedOrchestrator.init(initialContext);
    return {
      parse: typedOrchestrator.parse(initialContext),
      validate: typedOrchestrator.validate(initialContext),
      contextFactory: typedOrchestrator.contextFactory(initialContext),
      execute: typedOrchestrator.execute,
      subscribe: typedOrchestrator.subscribe,
      schema: typedOrchestrator.getCurrentSchema()
    };
  };
  getEnveloped._plugins = plugins;
  return getEnveloped;
}

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/plugins/use-logger.js
var DEFAULT_OPTIONS = {
  logFn: console.log
};
var useLogger = (rawOptions = DEFAULT_OPTIONS) => {
  const options = {
    DEFAULT_OPTIONS,
    ...rawOptions
  };
  return {
    onParse({ extendContext, params }) {
      if (options.skipIntrospection && isIntrospectionOperationString(params.source)) {
        extendContext({
          [envelopIsIntrospectionSymbol]: true
        });
      }
    },
    onExecute({ args }) {
      if (args.contextValue[envelopIsIntrospectionSymbol]) {
        return;
      }
      options.logFn("execute-start", { args });
      return {
        onExecuteDone: ({ result }) => {
          options.logFn("execute-end", { args, result });
        }
      };
    },
    onSubscribe({ args }) {
      if (args.contextValue[envelopIsIntrospectionSymbol]) {
        return;
      }
      options.logFn("subscribe-start", { args });
      return {
        onSubscribeResult: ({ result }) => {
          options.logFn("subscribe-end", { args, result });
        }
      };
    }
  };
};

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/plugins/use-schema.js
var useSchema = (schema) => {
  return {
    onPluginInit({ setSchema }) {
      setSchema(schema);
    }
  };
};

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/plugins/use-extend-context.js
var useExtendContext = (contextFactory) => ({
  async onContextBuilding({ context, extendContext }) {
    extendContext(await contextFactory(context));
  }
});

// node_modules/.pnpm/@envelop+core@2.6.0_graphql@16.6.0/node_modules/@envelop/core/esm/plugins/use-masked-errors.js
var DEFAULT_ERROR_MESSAGE = "Unexpected error.";
var EnvelopError = class extends GraphQLError {
  constructor(message, extensions) {
    super(message, void 0, void 0, void 0, void 0, void 0, extensions);
  }
};
var formatError2 = (err, message, isDev) => {
  var _a2, _b, _c, _d;
  if (err instanceof GraphQLError) {
    if (err.originalError && err.originalError instanceof EnvelopError === false || err.originalError === void 0 && err instanceof EnvelopError === false) {
      return new GraphQLError(message, err.nodes, err.source, err.positions, err.path, void 0, isDev ? {
        originalError: {
          message: (_b = (_a2 = err.originalError) === null || _a2 === void 0 ? void 0 : _a2.message) !== null && _b !== void 0 ? _b : err.message,
          stack: (_d = (_c = err.originalError) === null || _c === void 0 ? void 0 : _c.stack) !== null && _d !== void 0 ? _d : err.stack
        }
      } : void 0);
    }
    return err;
  }
  return new GraphQLError(message);
};
var makeHandleResult = (format, message, isDev) => ({ result, setResult }) => {
  if (result.errors != null) {
    setResult({ ...result, errors: result.errors.map((error) => format(error, message, isDev)) });
  }
};
var useMaskedErrors = (opts) => {
  var _a2, _b;
  const format = (_a2 = opts === null || opts === void 0 ? void 0 : opts.formatError) !== null && _a2 !== void 0 ? _a2 : formatError2;
  const message = (opts === null || opts === void 0 ? void 0 : opts.errorMessage) || DEFAULT_ERROR_MESSAGE;
  const isDev = (_b = opts === null || opts === void 0 ? void 0 : opts.isDev) !== null && _b !== void 0 ? _b : typeof process !== "undefined" ? false : false;
  const handleResult = makeHandleResult(format, message, isDev);
  return {
    onParse: (opts === null || opts === void 0 ? void 0 : opts.handleParseErrors) === true ? function onParse() {
      return function onParseEnd({ result, replaceParseResult }) {
        if (result instanceof Error) {
          replaceParseResult(format(result, message, isDev));
        }
      };
    } : void 0,
    onValidate: (opts === null || opts === void 0 ? void 0 : opts.handleValidationErrors) === true ? function onValidate() {
      return function onValidateEnd({ valid, result, setResult }) {
        if (valid === false) {
          setResult(result.map((error) => format(error, message, isDev)));
        }
      };
    } : void 0,
    onPluginInit(context) {
      context.registerContextErrorHandler(({ error, setError }) => {
        if (error instanceof GraphQLError === false && error instanceof Error) {
          error = new GraphQLError(error.message, void 0, void 0, void 0, void 0, error);
        }
        setError(format(error, message, isDev));
      });
    },
    onExecute() {
      return {
        onExecuteDone(payload) {
          return handleStreamOrSingleExecutionResult(payload, handleResult);
        }
      };
    },
    onSubscribe() {
      return {
        onSubscribeResult(payload) {
          return handleStreamOrSingleExecutionResult(payload, handleResult);
        },
        onSubscribeError({ error, setError }) {
          setError(format(error, message, isDev));
        }
      };
    }
  };
};

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/logger.js
var ANSI_CODES = {
  black: "\x1B[30m",
  red: "\x1B[31m",
  green: "\x1B[32m",
  yellow: "\x1B[33m",
  blue: "\x1B[34m",
  magenta: "\x1B[35m",
  cyan: "\x1B[36m",
  white: "\x1B[37m",
  reset: "\x1B[0m",
  bold: "\x1B[1m",
  orange: "\x1B[48:5:166m"
};
var titleBold = (msg) => ANSI_CODES.bold + msg + ANSI_CODES.reset;
var LEVEL_COLOR = {
  warn: ANSI_CODES.orange,
  info: ANSI_CODES.cyan,
  error: ANSI_CODES.red,
  debug: ANSI_CODES.magenta,
  title: ANSI_CODES.bold,
  reset: ANSI_CODES.reset
};
var isDebug = () => typeof process === "object" ? process.env.DEBUG : typeof DEBUG !== "undefined" ? true : false;
var prefix = [LEVEL_COLOR.title, `\u{1F9D8} Yoga -`, LEVEL_COLOR.reset];
var defaultYogaLogger = {
  debug(...args) {
    if (isDebug()) {
      const fullMessage = [
        `\u{1F41B} `,
        ...prefix,
        LEVEL_COLOR.debug,
        ...args,
        LEVEL_COLOR.reset
      ];
      if (console.debug) {
        console.debug(...fullMessage);
      } else {
        console.log(...fullMessage);
      }
    }
  },
  info(...args) {
    const fullMessage = [
      `\u{1F4A1} `,
      ...prefix,
      LEVEL_COLOR.info,
      ...args,
      LEVEL_COLOR.reset
    ];
    if (console.info) {
      console.info(...fullMessage);
    } else {
      console.log(...fullMessage);
    }
  },
  warn(...args) {
    const fullMessage = [
      `\u26A0\uFE0F `,
      ...prefix,
      LEVEL_COLOR.warn,
      ...args,
      LEVEL_COLOR.reset
    ];
    if (console.warn) {
      console.warn(...fullMessage);
    } else {
      console.log(...fullMessage);
    }
  },
  error(...args) {
    const fullMessage = [
      `\u274C `,
      ...prefix,
      LEVEL_COLOR.error,
      ...args,
      LEVEL_COLOR.reset
    ];
    if (console.error) {
      console.error(...fullMessage);
    } else {
      console.log(...fullMessage);
    }
  }
};

// node_modules/.pnpm/@envelop+validation-cache@4.7.0_4hr55tbjlvoppd2sokdhrbpreq/node_modules/@envelop/validation-cache/esm/index.js
var import_lru_cache = __toESM(require_lru_cache(), 1);
var DEFAULT_MAX = 1e3;
var DEFAULT_TTL = 36e5;
var rawDocumentSymbol = Symbol("rawDocument");
var useValidationCache = (pluginOptions = {}) => {
  const resultCache = typeof pluginOptions.cache !== "undefined" ? pluginOptions.cache : new import_lru_cache.default({
    max: DEFAULT_MAX,
    maxAge: DEFAULT_TTL
  });
  return {
    onSchemaChange() {
      var _a2, _b;
      if (resultCache.reset) {
        (_a2 = resultCache.reset) === null || _a2 === void 0 ? void 0 : _a2.call(resultCache);
      } else if ("clear" in resultCache) {
        (_b = resultCache.clear) === null || _b === void 0 ? void 0 : _b.call(resultCache);
      }
    },
    onParse({ params, extendContext }) {
      extendContext({ [rawDocumentSymbol]: params.source.toString() });
    },
    onValidate({ params, context, setResult }) {
      var _a2;
      const key = (_a2 = context[rawDocumentSymbol]) !== null && _a2 !== void 0 ? _a2 : print(params.documentAST);
      const cachedResult = resultCache.get(key);
      if (cachedResult !== void 0) {
        setResult(cachedResult);
      }
      return ({ result }) => {
        resultCache.set(key, result);
      };
    }
  };
};

// node_modules/.pnpm/@envelop+parser-cache@4.7.0_4hr55tbjlvoppd2sokdhrbpreq/node_modules/@envelop/parser-cache/esm/index.js
var import_lru_cache2 = __toESM(require_lru_cache(), 1);
var DEFAULT_MAX2 = 1e3;
var DEFAULT_TTL2 = 36e5;
var useParserCache = (pluginOptions = {}) => {
  const documentCache = typeof pluginOptions.documentCache !== "undefined" ? pluginOptions.documentCache : new import_lru_cache2.default({ max: DEFAULT_MAX2, maxAge: DEFAULT_TTL2 });
  const errorCache = typeof pluginOptions.errorCache !== "undefined" ? pluginOptions.errorCache : new import_lru_cache2.default({ max: DEFAULT_MAX2, maxAge: DEFAULT_TTL2 });
  return {
    onParse({ params, setParsedDocument }) {
      const { source } = params;
      const key = source instanceof Source ? source.body : source;
      const cachedError = errorCache.get(key);
      if (cachedError !== void 0) {
        throw cachedError;
      }
      const cachedDocument = documentCache.get(key);
      if (cachedDocument !== void 0) {
        setParsedDocument(cachedDocument);
      }
      return ({ result }) => {
        if (result instanceof Error) {
          errorCache.set(key, result);
        } else if (result !== null) {
          documentCache.set(key, result);
        }
      };
    }
  };
};

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/helpers.js
var asArray = (fns) => Array.isArray(fns) ? fns : fns ? [fns] : [];
function compareStrings(a, b) {
  if (String(a) < String(b)) {
    return -1;
  }
  if (String(a) > String(b)) {
    return 1;
  }
  return 0;
}
function nodeToString(a) {
  var _a2, _b;
  let name;
  if ("alias" in a) {
    name = (_a2 = a.alias) === null || _a2 === void 0 ? void 0 : _a2.value;
  }
  if (name == null && "name" in a) {
    name = (_b = a.name) === null || _b === void 0 ? void 0 : _b.value;
  }
  if (name == null) {
    name = a.kind;
  }
  return name;
}
function compareNodes(a, b, customFn) {
  const aStr = nodeToString(a);
  const bStr = nodeToString(b);
  if (typeof customFn === "function") {
    return customFn(aStr, bStr);
  }
  return compareStrings(aStr, bStr);
}
function isSome(input) {
  return input != null;
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/errors.js
function createGraphQLError(message, options) {
  if (versionInfo.major >= 17) {
    return new GraphQLError(message, options);
  }
  return new GraphQLError(message, options === null || options === void 0 ? void 0 : options.nodes, options === null || options === void 0 ? void 0 : options.source, options === null || options === void 0 ? void 0 : options.positions, options === null || options === void 0 ? void 0 : options.path, options === null || options === void 0 ? void 0 : options.originalError, options === null || options === void 0 ? void 0 : options.extensions);
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/AggregateError.js
var AggregateErrorImpl;
if (typeof AggregateError === "undefined") {
  class AggregateErrorClass extends Error {
    constructor(errors, message = "") {
      super(message);
      this.errors = errors;
      this.name = "AggregateError";
      Error.captureStackTrace(this, AggregateErrorClass);
    }
  }
  AggregateErrorImpl = function(errors, message) {
    return new AggregateErrorClass(errors, message);
  };
} else {
  AggregateErrorImpl = AggregateError;
}
function isAggregateError(error) {
  return "errors" in error && Array.isArray(error["errors"]);
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/inspect.js
var MAX_RECURSIVE_DEPTH2 = 3;
function inspect2(value) {
  return formatValue2(value, []);
}
function formatValue2(value, seenValues) {
  switch (typeof value) {
    case "string":
      return JSON.stringify(value);
    case "function":
      return value.name ? `[function ${value.name}]` : "[function]";
    case "object":
      return formatObjectValue2(value, seenValues);
    default:
      return String(value);
  }
}
function formatError3(value) {
  if (value instanceof GraphQLError) {
    return value.toString();
  }
  return `${value.name}: ${value.message};
 ${value.stack}`;
}
function formatObjectValue2(value, previouslySeenValues) {
  if (value === null) {
    return "null";
  }
  if (value instanceof Error) {
    if (isAggregateError(value)) {
      return formatError3(value) + "\n" + formatArray2(value.errors, previouslySeenValues);
    }
    return formatError3(value);
  }
  if (previouslySeenValues.includes(value)) {
    return "[Circular]";
  }
  const seenValues = [...previouslySeenValues, value];
  if (isJSONable2(value)) {
    const jsonValue = value.toJSON();
    if (jsonValue !== value) {
      return typeof jsonValue === "string" ? jsonValue : formatValue2(jsonValue, seenValues);
    }
  } else if (Array.isArray(value)) {
    return formatArray2(value, seenValues);
  }
  return formatObject2(value, seenValues);
}
function isJSONable2(value) {
  return typeof value.toJSON === "function";
}
function formatObject2(object, seenValues) {
  const entries = Object.entries(object);
  if (entries.length === 0) {
    return "{}";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH2) {
    return "[" + getObjectTag2(object) + "]";
  }
  const properties = entries.map(([key, value]) => key + ": " + formatValue2(value, seenValues));
  return "{ " + properties.join(", ") + " }";
}
function formatArray2(array, seenValues) {
  if (array.length === 0) {
    return "[]";
  }
  if (seenValues.length > MAX_RECURSIVE_DEPTH2) {
    return "[Array]";
  }
  const len = array.length;
  const remaining = array.length;
  const items = [];
  for (let i = 0; i < len; ++i) {
    items.push(formatValue2(array[i], seenValues));
  }
  if (remaining === 1) {
    items.push("... 1 more item");
  } else if (remaining > 1) {
    items.push(`... ${remaining} more items`);
  }
  return "[" + items.join(", ") + "]";
}
function getObjectTag2(object) {
  const tag = Object.prototype.toString.call(object).replace(/^\[object /, "").replace(/]$/, "");
  if (tag === "Object" && typeof object.constructor === "function") {
    const name = object.constructor.name;
    if (typeof name === "string" && name !== "") {
      return name;
    }
  }
  return tag;
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/get-directives.js
function getDirectivesInExtensions(node, pathToDirectivesInExtensions = ["directives"]) {
  return pathToDirectivesInExtensions.reduce((acc, pathSegment) => acc == null ? acc : acc[pathSegment], node === null || node === void 0 ? void 0 : node.extensions);
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/astFromType.js
function astFromType(type) {
  if (isNonNullType(type)) {
    const innerType = astFromType(type.ofType);
    if (innerType.kind === Kind.NON_NULL_TYPE) {
      throw new Error(`Invalid type node ${inspect2(type)}. Inner type of non-null type cannot be a non-null type.`);
    }
    return {
      kind: Kind.NON_NULL_TYPE,
      type: innerType
    };
  } else if (isListType(type)) {
    return {
      kind: Kind.LIST_TYPE,
      type: astFromType(type.ofType)
    };
  }
  return {
    kind: Kind.NAMED_TYPE,
    name: {
      kind: Kind.NAME,
      value: type.name
    }
  };
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/astFromValueUntyped.js
function astFromValueUntyped(value) {
  if (value === null) {
    return { kind: Kind.NULL };
  }
  if (value === void 0) {
    return null;
  }
  if (Array.isArray(value)) {
    const valuesNodes = [];
    for (const item of value) {
      const itemNode = astFromValueUntyped(item);
      if (itemNode != null) {
        valuesNodes.push(itemNode);
      }
    }
    return { kind: Kind.LIST, values: valuesNodes };
  }
  if (typeof value === "object") {
    const fieldNodes = [];
    for (const fieldName in value) {
      const fieldValue = value[fieldName];
      const ast = astFromValueUntyped(fieldValue);
      if (ast) {
        fieldNodes.push({
          kind: Kind.OBJECT_FIELD,
          name: { kind: Kind.NAME, value: fieldName },
          value: ast
        });
      }
    }
    return { kind: Kind.OBJECT, fields: fieldNodes };
  }
  if (typeof value === "boolean") {
    return { kind: Kind.BOOLEAN, value };
  }
  if (typeof value === "number" && isFinite(value)) {
    const stringNum = String(value);
    return integerStringRegExp2.test(stringNum) ? { kind: Kind.INT, value: stringNum } : { kind: Kind.FLOAT, value: stringNum };
  }
  if (typeof value === "string") {
    return { kind: Kind.STRING, value };
  }
  throw new TypeError(`Cannot convert value to AST: ${value}.`);
}
var integerStringRegExp2 = /^-?(?:0|[1-9][0-9]*)$/;

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/memoize.js
function memoize1(fn) {
  const memoize1cache = /* @__PURE__ */ new WeakMap();
  return function memoized(a1) {
    const cachedValue = memoize1cache.get(a1);
    if (cachedValue === void 0) {
      const newValue = fn(a1);
      memoize1cache.set(a1, newValue);
      return newValue;
    }
    return cachedValue;
  };
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/rootTypes.js
var getRootTypeNames = memoize1(function getRootTypeNames2(schema) {
  const rootTypes = getRootTypes(schema);
  return new Set([...rootTypes].map((type) => type.name));
});
var getRootTypes = memoize1(function getRootTypes2(schema) {
  const rootTypeMap = getRootTypeMap(schema);
  return new Set(rootTypeMap.values());
});
var getRootTypeMap = memoize1(function getRootTypeMap2(schema) {
  const rootTypeMap = /* @__PURE__ */ new Map();
  const queryType = schema.getQueryType();
  if (queryType) {
    rootTypeMap.set("query", queryType);
  }
  const mutationType = schema.getMutationType();
  if (mutationType) {
    rootTypeMap.set("mutation", mutationType);
  }
  const subscriptionType = schema.getSubscriptionType();
  if (subscriptionType) {
    rootTypeMap.set("subscription", subscriptionType);
  }
  return rootTypeMap;
});

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/print-schema-with-directives.js
function getDocumentNodeFromSchema(schema, options = {}) {
  const pathToDirectivesInExtensions = options.pathToDirectivesInExtensions;
  const typesMap = schema.getTypeMap();
  const schemaNode = astFromSchema(schema, pathToDirectivesInExtensions);
  const definitions = schemaNode != null ? [schemaNode] : [];
  const directives = schema.getDirectives();
  for (const directive of directives) {
    if (isSpecifiedDirective(directive)) {
      continue;
    }
    definitions.push(astFromDirective(directive, schema, pathToDirectivesInExtensions));
  }
  for (const typeName in typesMap) {
    const type = typesMap[typeName];
    const isPredefinedScalar = isSpecifiedScalarType(type);
    const isIntrospection = isIntrospectionType(type);
    if (isPredefinedScalar || isIntrospection) {
      continue;
    }
    if (isObjectType(type)) {
      definitions.push(astFromObjectType(type, schema, pathToDirectivesInExtensions));
    } else if (isInterfaceType(type)) {
      definitions.push(astFromInterfaceType(type, schema, pathToDirectivesInExtensions));
    } else if (isUnionType(type)) {
      definitions.push(astFromUnionType(type, schema, pathToDirectivesInExtensions));
    } else if (isInputObjectType(type)) {
      definitions.push(astFromInputObjectType(type, schema, pathToDirectivesInExtensions));
    } else if (isEnumType(type)) {
      definitions.push(astFromEnumType(type, schema, pathToDirectivesInExtensions));
    } else if (isScalarType(type)) {
      definitions.push(astFromScalarType(type, schema, pathToDirectivesInExtensions));
    } else {
      throw new Error(`Unknown type ${type}.`);
    }
  }
  return {
    kind: Kind.DOCUMENT,
    definitions
  };
}
function astFromSchema(schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  const operationTypeMap = /* @__PURE__ */ new Map([
    ["query", void 0],
    ["mutation", void 0],
    ["subscription", void 0]
  ]);
  const nodes = [];
  if (schema.astNode != null) {
    nodes.push(schema.astNode);
  }
  if (schema.extensionASTNodes != null) {
    for (const extensionASTNode of schema.extensionASTNodes) {
      nodes.push(extensionASTNode);
    }
  }
  for (const node of nodes) {
    if (node.operationTypes) {
      for (const operationTypeDefinitionNode of node.operationTypes) {
        operationTypeMap.set(operationTypeDefinitionNode.operation, operationTypeDefinitionNode);
      }
    }
  }
  const rootTypeMap = getRootTypeMap(schema);
  for (const [operationTypeNode, operationTypeDefinitionNode] of operationTypeMap) {
    const rootType = rootTypeMap.get(operationTypeNode);
    if (rootType != null) {
      const rootTypeAST = astFromType(rootType);
      if (operationTypeDefinitionNode != null) {
        operationTypeDefinitionNode.type = rootTypeAST;
      } else {
        operationTypeMap.set(operationTypeNode, {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation: operationTypeNode,
          type: rootTypeAST
        });
      }
    }
  }
  const operationTypes = [...operationTypeMap.values()].filter(isSome);
  const directives = getDirectiveNodes(schema, schema, pathToDirectivesInExtensions);
  if (!operationTypes.length && !directives.length) {
    return null;
  }
  const schemaNode = {
    kind: operationTypes != null ? Kind.SCHEMA_DEFINITION : Kind.SCHEMA_EXTENSION,
    operationTypes,
    directives
  };
  schemaNode.description = ((_b = (_a2 = schema.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : schema.description != null) ? {
    kind: Kind.STRING,
    value: schema.description,
    block: true
  } : void 0;
  return schemaNode;
}
function astFromDirective(directive, schema, pathToDirectivesInExtensions) {
  var _a2, _b, _c, _d;
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    description: (_b = (_a2 = directive.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : directive.description ? {
      kind: Kind.STRING,
      value: directive.description
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: directive.name
    },
    arguments: (_c = directive.args) === null || _c === void 0 ? void 0 : _c.map((arg) => astFromArg(arg, schema, pathToDirectivesInExtensions)),
    repeatable: directive.isRepeatable,
    locations: ((_d = directive.locations) === null || _d === void 0 ? void 0 : _d.map((location) => ({
      kind: Kind.NAME,
      value: location
    }))) || []
  };
}
function getDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
  const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
  let nodes = [];
  if (entity.astNode != null) {
    nodes.push(entity.astNode);
  }
  if ("extensionASTNodes" in entity && entity.extensionASTNodes != null) {
    nodes = nodes.concat(entity.extensionASTNodes);
  }
  let directives;
  if (directivesInExtensions != null) {
    directives = makeDirectiveNodes(schema, directivesInExtensions);
  } else {
    directives = [];
    for (const node of nodes) {
      if (node.directives) {
        directives.push(...node.directives);
      }
    }
  }
  return directives;
}
function getDeprecatableDirectiveNodes(entity, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  let directiveNodesBesidesDeprecated = [];
  let deprecatedDirectiveNode = null;
  const directivesInExtensions = getDirectivesInExtensions(entity, pathToDirectivesInExtensions);
  let directives;
  if (directivesInExtensions != null) {
    directives = makeDirectiveNodes(schema, directivesInExtensions);
  } else {
    directives = (_a2 = entity.astNode) === null || _a2 === void 0 ? void 0 : _a2.directives;
  }
  if (directives != null) {
    directiveNodesBesidesDeprecated = directives.filter((directive) => directive.name.value !== "deprecated");
    if (entity.deprecationReason != null) {
      deprecatedDirectiveNode = (_b = directives.filter((directive) => directive.name.value === "deprecated")) === null || _b === void 0 ? void 0 : _b[0];
    }
  }
  if (entity.deprecationReason != null && deprecatedDirectiveNode == null) {
    deprecatedDirectiveNode = makeDeprecatedDirective(entity.deprecationReason);
  }
  return deprecatedDirectiveNode == null ? directiveNodesBesidesDeprecated : [deprecatedDirectiveNode].concat(directiveNodesBesidesDeprecated);
}
function astFromArg(arg, schema, pathToDirectivesInExtensions) {
  var _a2, _b, _c;
  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    description: (_b = (_a2 = arg.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : arg.description ? {
      kind: Kind.STRING,
      value: arg.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: arg.name
    },
    type: astFromType(arg.type),
    defaultValue: arg.defaultValue !== void 0 ? (_c = astFromValue(arg.defaultValue, arg.type)) !== null && _c !== void 0 ? _c : void 0 : void 0,
    directives: getDeprecatableDirectiveNodes(arg, schema, pathToDirectivesInExtensions)
  };
}
function astFromObjectType(type, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    description: (_b = (_a2 = type.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : type.description ? {
      kind: Kind.STRING,
      value: type.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: type.name
    },
    fields: Object.values(type.getFields()).map((field) => astFromField(field, schema, pathToDirectivesInExtensions)),
    interfaces: Object.values(type.getInterfaces()).map((iFace) => astFromType(iFace)),
    directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions)
  };
}
function astFromInterfaceType(type, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  const node = {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    description: (_b = (_a2 = type.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : type.description ? {
      kind: Kind.STRING,
      value: type.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: type.name
    },
    fields: Object.values(type.getFields()).map((field) => astFromField(field, schema, pathToDirectivesInExtensions)),
    directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions)
  };
  if ("getInterfaces" in type) {
    node.interfaces = Object.values(type.getInterfaces()).map((iFace) => astFromType(iFace));
  }
  return node;
}
function astFromUnionType(type, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    description: (_b = (_a2 = type.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : type.description ? {
      kind: Kind.STRING,
      value: type.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: type.name
    },
    directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions),
    types: type.getTypes().map((type2) => astFromType(type2))
  };
}
function astFromInputObjectType(type, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    description: (_b = (_a2 = type.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : type.description ? {
      kind: Kind.STRING,
      value: type.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: type.name
    },
    fields: Object.values(type.getFields()).map((field) => astFromInputField(field, schema, pathToDirectivesInExtensions)),
    directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions)
  };
}
function astFromEnumType(type, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    description: (_b = (_a2 = type.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : type.description ? {
      kind: Kind.STRING,
      value: type.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: type.name
    },
    values: Object.values(type.getValues()).map((value) => astFromEnumValue(value, schema, pathToDirectivesInExtensions)),
    directives: getDirectiveNodes(type, schema, pathToDirectivesInExtensions)
  };
}
function astFromScalarType(type, schema, pathToDirectivesInExtensions) {
  var _a2, _b, _c;
  const directivesInExtensions = getDirectivesInExtensions(type, pathToDirectivesInExtensions);
  const directives = directivesInExtensions ? makeDirectiveNodes(schema, directivesInExtensions) : ((_a2 = type.astNode) === null || _a2 === void 0 ? void 0 : _a2.directives) || [];
  const specifiedByValue = type["specifiedByUrl"] || type["specifiedByURL"];
  if (specifiedByValue && !directives.some((directiveNode) => directiveNode.name.value === "specifiedBy")) {
    const specifiedByArgs = {
      url: specifiedByValue
    };
    directives.push(makeDirectiveNode("specifiedBy", specifiedByArgs));
  }
  return {
    kind: Kind.SCALAR_TYPE_DEFINITION,
    description: (_c = (_b = type.astNode) === null || _b === void 0 ? void 0 : _b.description) !== null && _c !== void 0 ? _c : type.description ? {
      kind: Kind.STRING,
      value: type.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: type.name
    },
    directives
  };
}
function astFromField(field, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  return {
    kind: Kind.FIELD_DEFINITION,
    description: (_b = (_a2 = field.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : field.description ? {
      kind: Kind.STRING,
      value: field.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: field.name
    },
    arguments: field.args.map((arg) => astFromArg(arg, schema, pathToDirectivesInExtensions)),
    type: astFromType(field.type),
    directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions)
  };
}
function astFromInputField(field, schema, pathToDirectivesInExtensions) {
  var _a2, _b, _c;
  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    description: (_b = (_a2 = field.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : field.description ? {
      kind: Kind.STRING,
      value: field.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: field.name
    },
    type: astFromType(field.type),
    directives: getDeprecatableDirectiveNodes(field, schema, pathToDirectivesInExtensions),
    defaultValue: (_c = astFromValue(field.defaultValue, field.type)) !== null && _c !== void 0 ? _c : void 0
  };
}
function astFromEnumValue(value, schema, pathToDirectivesInExtensions) {
  var _a2, _b;
  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    description: (_b = (_a2 = value.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : value.description ? {
      kind: Kind.STRING,
      value: value.description,
      block: true
    } : void 0,
    name: {
      kind: Kind.NAME,
      value: value.name
    },
    directives: getDeprecatableDirectiveNodes(value, schema, pathToDirectivesInExtensions)
  };
}
function makeDeprecatedDirective(deprecationReason) {
  return makeDirectiveNode("deprecated", { reason: deprecationReason }, GraphQLDeprecatedDirective);
}
function makeDirectiveNode(name, args, directive) {
  const directiveArguments = [];
  if (directive != null) {
    for (const arg of directive.args) {
      const argName = arg.name;
      const argValue = args[argName];
      if (argValue !== void 0) {
        const value = astFromValue(argValue, arg.type);
        if (value) {
          directiveArguments.push({
            kind: Kind.ARGUMENT,
            name: {
              kind: Kind.NAME,
              value: argName
            },
            value
          });
        }
      }
    }
  } else {
    for (const argName in args) {
      const argValue = args[argName];
      const value = astFromValueUntyped(argValue);
      if (value) {
        directiveArguments.push({
          kind: Kind.ARGUMENT,
          name: {
            kind: Kind.NAME,
            value: argName
          },
          value
        });
      }
    }
  }
  return {
    kind: Kind.DIRECTIVE,
    name: {
      kind: Kind.NAME,
      value: name
    },
    arguments: directiveArguments
  };
}
function makeDirectiveNodes(schema, directiveValues) {
  const directiveNodes = [];
  for (const directiveName in directiveValues) {
    const arrayOrSingleValue = directiveValues[directiveName];
    const directive = schema === null || schema === void 0 ? void 0 : schema.getDirective(directiveName);
    if (Array.isArray(arrayOrSingleValue)) {
      for (const value of arrayOrSingleValue) {
        directiveNodes.push(makeDirectiveNode(directiveName, value, directive));
      }
    } else {
      directiveNodes.push(makeDirectiveNode(directiveName, arrayOrSingleValue, directive));
    }
  }
  return directiveNodes;
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/comments.js
var MAX_LINE_LENGTH2 = 80;
var commentsRegistry = {};
function resetComments() {
  commentsRegistry = {};
}
function collectComment(node) {
  var _a2;
  const entityName = (_a2 = node.name) === null || _a2 === void 0 ? void 0 : _a2.value;
  if (entityName == null) {
    return;
  }
  pushComment(node, entityName);
  switch (node.kind) {
    case "EnumTypeDefinition":
      if (node.values) {
        for (const value of node.values) {
          pushComment(value, entityName, value.name.value);
        }
      }
      break;
    case "ObjectTypeDefinition":
    case "InputObjectTypeDefinition":
    case "InterfaceTypeDefinition":
      if (node.fields) {
        for (const field of node.fields) {
          pushComment(field, entityName, field.name.value);
          if (isFieldDefinitionNode(field) && field.arguments) {
            for (const arg of field.arguments) {
              pushComment(arg, entityName, field.name.value, arg.name.value);
            }
          }
        }
      }
      break;
  }
}
function pushComment(node, entity, field, argument) {
  const comment = getComment(node);
  if (typeof comment !== "string" || comment.length === 0) {
    return;
  }
  const keys = [entity];
  if (field) {
    keys.push(field);
    if (argument) {
      keys.push(argument);
    }
  }
  const path = keys.join(".");
  if (!commentsRegistry[path]) {
    commentsRegistry[path] = [];
  }
  commentsRegistry[path].push(comment);
}
function printComment(comment) {
  return "\n# " + comment.replace(/\n/g, "\n# ");
}
function join2(maybeArray, separator) {
  return maybeArray ? maybeArray.filter((x) => x).join(separator || "") : "";
}
function hasMultilineItems2(maybeArray) {
  var _a2;
  return (_a2 = maybeArray === null || maybeArray === void 0 ? void 0 : maybeArray.some((str) => str.includes("\n"))) !== null && _a2 !== void 0 ? _a2 : false;
}
function addDescription(cb) {
  return (node, _key, _parent, path, ancestors) => {
    var _a2;
    const keys = [];
    const parent = path.reduce((prev, key2) => {
      if (["fields", "arguments", "values"].includes(key2) && prev.name) {
        keys.push(prev.name.value);
      }
      return prev[key2];
    }, ancestors[0]);
    const key = [...keys, (_a2 = parent === null || parent === void 0 ? void 0 : parent.name) === null || _a2 === void 0 ? void 0 : _a2.value].filter(Boolean).join(".");
    const items = [];
    if (node.kind.includes("Definition") && commentsRegistry[key]) {
      items.push(...commentsRegistry[key]);
    }
    return join2([...items.map(printComment), node.description, cb(node, _key, _parent, path, ancestors)], "\n");
  };
}
function indent2(maybeString) {
  return maybeString && `  ${maybeString.replace(/\n/g, "\n  ")}`;
}
function block2(array) {
  return array && array.length !== 0 ? `{
${indent2(join2(array, "\n"))}
}` : "";
}
function wrap2(start, maybeString, end) {
  return maybeString ? start + maybeString + (end || "") : "";
}
function printBlockString2(value, isDescription = false) {
  const escaped = value.replace(/"""/g, '\\"""');
  return (value[0] === " " || value[0] === "	") && value.indexOf("\n") === -1 ? `"""${escaped.replace(/"$/, '"\n')}"""` : `"""
${isDescription ? escaped : indent2(escaped)}
"""`;
}
var printDocASTReducer2 = {
  Name: { leave: (node) => node.value },
  Variable: { leave: (node) => "$" + node.name },
  Document: {
    leave: (node) => join2(node.definitions, "\n\n")
  },
  OperationDefinition: {
    leave: (node) => {
      const varDefs = wrap2("(", join2(node.variableDefinitions, ", "), ")");
      const prefix2 = join2([node.operation, join2([node.name, varDefs]), join2(node.directives, " ")], " ");
      return prefix2 + " " + node.selectionSet;
    }
  },
  VariableDefinition: {
    leave: ({ variable, type, defaultValue, directives }) => variable + ": " + type + wrap2(" = ", defaultValue) + wrap2(" ", join2(directives, " "))
  },
  SelectionSet: { leave: ({ selections }) => block2(selections) },
  Field: {
    leave({ alias, name, arguments: args, directives, selectionSet }) {
      const prefix2 = wrap2("", alias, ": ") + name;
      let argsLine = prefix2 + wrap2("(", join2(args, ", "), ")");
      if (argsLine.length > MAX_LINE_LENGTH2) {
        argsLine = prefix2 + wrap2("(\n", indent2(join2(args, "\n")), "\n)");
      }
      return join2([argsLine, join2(directives, " "), selectionSet], " ");
    }
  },
  Argument: { leave: ({ name, value }) => name + ": " + value },
  FragmentSpread: {
    leave: ({ name, directives }) => "..." + name + wrap2(" ", join2(directives, " "))
  },
  InlineFragment: {
    leave: ({ typeCondition, directives, selectionSet }) => join2(["...", wrap2("on ", typeCondition), join2(directives, " "), selectionSet], " ")
  },
  FragmentDefinition: {
    leave: ({ name, typeCondition, variableDefinitions, directives, selectionSet }) => `fragment ${name}${wrap2("(", join2(variableDefinitions, ", "), ")")} on ${typeCondition} ${wrap2("", join2(directives, " "), " ")}` + selectionSet
  },
  IntValue: { leave: ({ value }) => value },
  FloatValue: { leave: ({ value }) => value },
  StringValue: {
    leave: ({ value, block: isBlockString }) => {
      if (isBlockString) {
        return printBlockString2(value);
      }
      return JSON.stringify(value);
    }
  },
  BooleanValue: { leave: ({ value }) => value ? "true" : "false" },
  NullValue: { leave: () => "null" },
  EnumValue: { leave: ({ value }) => value },
  ListValue: { leave: ({ values }) => "[" + join2(values, ", ") + "]" },
  ObjectValue: { leave: ({ fields }) => "{" + join2(fields, ", ") + "}" },
  ObjectField: { leave: ({ name, value }) => name + ": " + value },
  Directive: {
    leave: ({ name, arguments: args }) => "@" + name + wrap2("(", join2(args, ", "), ")")
  },
  NamedType: { leave: ({ name }) => name },
  ListType: { leave: ({ type }) => "[" + type + "]" },
  NonNullType: { leave: ({ type }) => type + "!" },
  SchemaDefinition: {
    leave: ({ directives, operationTypes }) => join2(["schema", join2(directives, " "), block2(operationTypes)], " ")
  },
  OperationTypeDefinition: {
    leave: ({ operation, type }) => operation + ": " + type
  },
  ScalarTypeDefinition: {
    leave: ({ name, directives }) => join2(["scalar", name, join2(directives, " ")], " ")
  },
  ObjectTypeDefinition: {
    leave: ({ name, interfaces, directives, fields }) => join2(["type", name, wrap2("implements ", join2(interfaces, " & ")), join2(directives, " "), block2(fields)], " ")
  },
  FieldDefinition: {
    leave: ({ name, arguments: args, type, directives }) => name + (hasMultilineItems2(args) ? wrap2("(\n", indent2(join2(args, "\n")), "\n)") : wrap2("(", join2(args, ", "), ")")) + ": " + type + wrap2(" ", join2(directives, " "))
  },
  InputValueDefinition: {
    leave: ({ name, type, defaultValue, directives }) => join2([name + ": " + type, wrap2("= ", defaultValue), join2(directives, " ")], " ")
  },
  InterfaceTypeDefinition: {
    leave: ({ name, interfaces, directives, fields }) => join2(["interface", name, wrap2("implements ", join2(interfaces, " & ")), join2(directives, " "), block2(fields)], " ")
  },
  UnionTypeDefinition: {
    leave: ({ name, directives, types }) => join2(["union", name, join2(directives, " "), wrap2("= ", join2(types, " | "))], " ")
  },
  EnumTypeDefinition: {
    leave: ({ name, directives, values }) => join2(["enum", name, join2(directives, " "), block2(values)], " ")
  },
  EnumValueDefinition: {
    leave: ({ name, directives }) => join2([name, join2(directives, " ")], " ")
  },
  InputObjectTypeDefinition: {
    leave: ({ name, directives, fields }) => join2(["input", name, join2(directives, " "), block2(fields)], " ")
  },
  DirectiveDefinition: {
    leave: ({ name, arguments: args, repeatable, locations }) => "directive @" + name + (hasMultilineItems2(args) ? wrap2("(\n", indent2(join2(args, "\n")), "\n)") : wrap2("(", join2(args, ", "), ")")) + (repeatable ? " repeatable" : "") + " on " + join2(locations, " | ")
  },
  SchemaExtension: {
    leave: ({ directives, operationTypes }) => join2(["extend schema", join2(directives, " "), block2(operationTypes)], " ")
  },
  ScalarTypeExtension: {
    leave: ({ name, directives }) => join2(["extend scalar", name, join2(directives, " ")], " ")
  },
  ObjectTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join2(["extend type", name, wrap2("implements ", join2(interfaces, " & ")), join2(directives, " "), block2(fields)], " ")
  },
  InterfaceTypeExtension: {
    leave: ({ name, interfaces, directives, fields }) => join2(["extend interface", name, wrap2("implements ", join2(interfaces, " & ")), join2(directives, " "), block2(fields)], " ")
  },
  UnionTypeExtension: {
    leave: ({ name, directives, types }) => join2(["extend union", name, join2(directives, " "), wrap2("= ", join2(types, " | "))], " ")
  },
  EnumTypeExtension: {
    leave: ({ name, directives, values }) => join2(["extend enum", name, join2(directives, " "), block2(values)], " ")
  },
  InputObjectTypeExtension: {
    leave: ({ name, directives, fields }) => join2(["extend input", name, join2(directives, " "), block2(fields)], " ")
  }
};
var printDocASTReducerWithComments = Object.keys(printDocASTReducer2).reduce((prev, key) => ({
  ...prev,
  [key]: {
    leave: addDescription(printDocASTReducer2[key].leave)
  }
}), {});
function printWithComments(ast) {
  return visit(ast, printDocASTReducerWithComments);
}
function isFieldDefinitionNode(node) {
  return node.kind === "FieldDefinition";
}
function getComment(node) {
  const rawValue = getLeadingCommentBlock(node);
  if (rawValue !== void 0) {
    return dedentBlockStringValue(`
${rawValue}`);
  }
}
function getLeadingCommentBlock(node) {
  const loc = node.loc;
  if (!loc) {
    return;
  }
  const comments = [];
  let token = loc.startToken.prev;
  while (token != null && token.kind === TokenKind.COMMENT && token.next != null && token.prev != null && token.line + 1 === token.next.line && token.line !== token.prev.line) {
    const value = String(token.value);
    comments.push(value);
    token = token.prev;
  }
  return comments.length > 0 ? comments.reverse().join("\n") : void 0;
}
function dedentBlockStringValue(rawString) {
  const lines = rawString.split(/\r\n|[\n\r]/g);
  const commonIndent = getBlockStringIndentation(lines);
  if (commonIndent !== 0) {
    for (let i = 1; i < lines.length; i++) {
      lines[i] = lines[i].slice(commonIndent);
    }
  }
  while (lines.length > 0 && isBlank(lines[0])) {
    lines.shift();
  }
  while (lines.length > 0 && isBlank(lines[lines.length - 1])) {
    lines.pop();
  }
  return lines.join("\n");
}
function getBlockStringIndentation(lines) {
  let commonIndent = null;
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const indent3 = leadingWhitespace2(line);
    if (indent3 === line.length) {
      continue;
    }
    if (commonIndent === null || indent3 < commonIndent) {
      commonIndent = indent3;
      if (commonIndent === 0) {
        break;
      }
    }
  }
  return commonIndent === null ? 0 : commonIndent;
}
function leadingWhitespace2(str) {
  let i = 0;
  while (i < str.length && (str[i] === " " || str[i] === "	")) {
    i++;
  }
  return i;
}
function isBlank(str) {
  return leadingWhitespace2(str) === str.length;
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/Interfaces.js
var MapperKind;
(function(MapperKind2) {
  MapperKind2["TYPE"] = "MapperKind.TYPE";
  MapperKind2["SCALAR_TYPE"] = "MapperKind.SCALAR_TYPE";
  MapperKind2["ENUM_TYPE"] = "MapperKind.ENUM_TYPE";
  MapperKind2["COMPOSITE_TYPE"] = "MapperKind.COMPOSITE_TYPE";
  MapperKind2["OBJECT_TYPE"] = "MapperKind.OBJECT_TYPE";
  MapperKind2["INPUT_OBJECT_TYPE"] = "MapperKind.INPUT_OBJECT_TYPE";
  MapperKind2["ABSTRACT_TYPE"] = "MapperKind.ABSTRACT_TYPE";
  MapperKind2["UNION_TYPE"] = "MapperKind.UNION_TYPE";
  MapperKind2["INTERFACE_TYPE"] = "MapperKind.INTERFACE_TYPE";
  MapperKind2["ROOT_OBJECT"] = "MapperKind.ROOT_OBJECT";
  MapperKind2["QUERY"] = "MapperKind.QUERY";
  MapperKind2["MUTATION"] = "MapperKind.MUTATION";
  MapperKind2["SUBSCRIPTION"] = "MapperKind.SUBSCRIPTION";
  MapperKind2["DIRECTIVE"] = "MapperKind.DIRECTIVE";
  MapperKind2["FIELD"] = "MapperKind.FIELD";
  MapperKind2["COMPOSITE_FIELD"] = "MapperKind.COMPOSITE_FIELD";
  MapperKind2["OBJECT_FIELD"] = "MapperKind.OBJECT_FIELD";
  MapperKind2["ROOT_FIELD"] = "MapperKind.ROOT_FIELD";
  MapperKind2["QUERY_ROOT_FIELD"] = "MapperKind.QUERY_ROOT_FIELD";
  MapperKind2["MUTATION_ROOT_FIELD"] = "MapperKind.MUTATION_ROOT_FIELD";
  MapperKind2["SUBSCRIPTION_ROOT_FIELD"] = "MapperKind.SUBSCRIPTION_ROOT_FIELD";
  MapperKind2["INTERFACE_FIELD"] = "MapperKind.INTERFACE_FIELD";
  MapperKind2["INPUT_OBJECT_FIELD"] = "MapperKind.INPUT_OBJECT_FIELD";
  MapperKind2["ARGUMENT"] = "MapperKind.ARGUMENT";
  MapperKind2["ENUM_VALUE"] = "MapperKind.ENUM_VALUE";
})(MapperKind || (MapperKind = {}));

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/getObjectTypeFromTypeMap.js
function getObjectTypeFromTypeMap(typeMap, type) {
  if (type) {
    const maybeObjectType = typeMap[type.name];
    if (isObjectType(maybeObjectType)) {
      return maybeObjectType;
    }
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/stub.js
function isNamedStub(type) {
  if ("getFields" in type) {
    const fields = type.getFields();
    for (const fieldName in fields) {
      const field = fields[fieldName];
      return field.name === "_fake";
    }
  }
  return false;
}
function getBuiltInForStub(type) {
  switch (type.name) {
    case GraphQLInt.name:
      return GraphQLInt;
    case GraphQLFloat.name:
      return GraphQLFloat;
    case GraphQLString.name:
      return GraphQLString;
    case GraphQLBoolean.name:
      return GraphQLBoolean;
    case GraphQLID.name:
      return GraphQLID;
    default:
      return type;
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/rewire.js
function rewireTypes(originalTypeMap, directives) {
  const referenceTypeMap = /* @__PURE__ */ Object.create(null);
  for (const typeName in originalTypeMap) {
    referenceTypeMap[typeName] = originalTypeMap[typeName];
  }
  const newTypeMap = /* @__PURE__ */ Object.create(null);
  for (const typeName in referenceTypeMap) {
    const namedType = referenceTypeMap[typeName];
    if (namedType == null || typeName.startsWith("__")) {
      continue;
    }
    const newName = namedType.name;
    if (newName.startsWith("__")) {
      continue;
    }
    if (newTypeMap[newName] != null) {
      throw new Error(`Duplicate schema type name ${newName}`);
    }
    newTypeMap[newName] = namedType;
  }
  for (const typeName in newTypeMap) {
    newTypeMap[typeName] = rewireNamedType(newTypeMap[typeName]);
  }
  const newDirectives = directives.map((directive) => rewireDirective(directive));
  return {
    typeMap: newTypeMap,
    directives: newDirectives
  };
  function rewireDirective(directive) {
    if (isSpecifiedDirective(directive)) {
      return directive;
    }
    const directiveConfig = directive.toConfig();
    directiveConfig.args = rewireArgs(directiveConfig.args);
    return new GraphQLDirective(directiveConfig);
  }
  function rewireArgs(args) {
    const rewiredArgs = {};
    for (const argName in args) {
      const arg = args[argName];
      const rewiredArgType = rewireType(arg.type);
      if (rewiredArgType != null) {
        arg.type = rewiredArgType;
        rewiredArgs[argName] = arg;
      }
    }
    return rewiredArgs;
  }
  function rewireNamedType(type) {
    if (isObjectType(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        fields: () => rewireFields(config.fields),
        interfaces: () => rewireNamedTypes(config.interfaces)
      };
      return new GraphQLObjectType(newConfig);
    } else if (isInterfaceType(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        fields: () => rewireFields(config.fields)
      };
      if ("interfaces" in newConfig) {
        newConfig.interfaces = () => rewireNamedTypes(config.interfaces);
      }
      return new GraphQLInterfaceType(newConfig);
    } else if (isUnionType(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        types: () => rewireNamedTypes(config.types)
      };
      return new GraphQLUnionType(newConfig);
    } else if (isInputObjectType(type)) {
      const config = type.toConfig();
      const newConfig = {
        ...config,
        fields: () => rewireInputFields(config.fields)
      };
      return new GraphQLInputObjectType(newConfig);
    } else if (isEnumType(type)) {
      const enumConfig = type.toConfig();
      return new GraphQLEnumType(enumConfig);
    } else if (isScalarType(type)) {
      if (isSpecifiedScalarType(type)) {
        return type;
      }
      const scalarConfig = type.toConfig();
      return new GraphQLScalarType(scalarConfig);
    }
    throw new Error(`Unexpected schema type: ${type}`);
  }
  function rewireFields(fields) {
    const rewiredFields = {};
    for (const fieldName in fields) {
      const field = fields[fieldName];
      const rewiredFieldType = rewireType(field.type);
      if (rewiredFieldType != null && field.args) {
        field.type = rewiredFieldType;
        field.args = rewireArgs(field.args);
        rewiredFields[fieldName] = field;
      }
    }
    return rewiredFields;
  }
  function rewireInputFields(fields) {
    const rewiredFields = {};
    for (const fieldName in fields) {
      const field = fields[fieldName];
      const rewiredFieldType = rewireType(field.type);
      if (rewiredFieldType != null) {
        field.type = rewiredFieldType;
        rewiredFields[fieldName] = field;
      }
    }
    return rewiredFields;
  }
  function rewireNamedTypes(namedTypes) {
    const rewiredTypes = [];
    for (const namedType of namedTypes) {
      const rewiredType = rewireType(namedType);
      if (rewiredType != null) {
        rewiredTypes.push(rewiredType);
      }
    }
    return rewiredTypes;
  }
  function rewireType(type) {
    if (isListType(type)) {
      const rewiredType = rewireType(type.ofType);
      return rewiredType != null ? new GraphQLList(rewiredType) : null;
    } else if (isNonNullType(type)) {
      const rewiredType = rewireType(type.ofType);
      return rewiredType != null ? new GraphQLNonNull(rewiredType) : null;
    } else if (isNamedType(type)) {
      let rewiredType = referenceTypeMap[type.name];
      if (rewiredType === void 0) {
        rewiredType = isNamedStub(type) ? getBuiltInForStub(type) : rewireNamedType(type);
        newTypeMap[rewiredType.name] = referenceTypeMap[type.name] = rewiredType;
      }
      return rewiredType != null ? newTypeMap[rewiredType.name] : null;
    }
    return null;
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/transformInputValue.js
function transformInputValue(type, value, inputLeafValueTransformer = null, inputObjectValueTransformer = null) {
  if (value == null) {
    return value;
  }
  const nullableType = getNullableType(type);
  if (isLeafType(nullableType)) {
    return inputLeafValueTransformer != null ? inputLeafValueTransformer(nullableType, value) : value;
  } else if (isListType(nullableType)) {
    return value.map((listMember) => transformInputValue(nullableType.ofType, listMember, inputLeafValueTransformer, inputObjectValueTransformer));
  } else if (isInputObjectType(nullableType)) {
    const fields = nullableType.getFields();
    const newValue = {};
    for (const key in value) {
      const field = fields[key];
      if (field != null) {
        newValue[key] = transformInputValue(field.type, value[key], inputLeafValueTransformer, inputObjectValueTransformer);
      }
    }
    return inputObjectValueTransformer != null ? inputObjectValueTransformer(nullableType, newValue) : newValue;
  }
}
function serializeInputValue(type, value) {
  return transformInputValue(type, value, (t, v) => {
    try {
      return t.serialize(v);
    } catch (_a2) {
      return v;
    }
  });
}
function parseInputValue(type, value) {
  return transformInputValue(type, value, (t, v) => {
    try {
      return t.parseValue(v);
    } catch (_a2) {
      return v;
    }
  });
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/mapSchema.js
function mapSchema(schema, schemaMapper = {}) {
  const newTypeMap = mapArguments(mapFields(mapTypes(mapDefaultValues(mapEnumValues(mapTypes(mapDefaultValues(schema.getTypeMap(), schema, serializeInputValue), schema, schemaMapper, (type) => isLeafType(type)), schema, schemaMapper), schema, parseInputValue), schema, schemaMapper, (type) => !isLeafType(type)), schema, schemaMapper), schema, schemaMapper);
  const originalDirectives = schema.getDirectives();
  const newDirectives = mapDirectives(originalDirectives, schema, schemaMapper);
  const { typeMap, directives } = rewireTypes(newTypeMap, newDirectives);
  return new GraphQLSchema({
    ...schema.toConfig(),
    query: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema.getQueryType())),
    mutation: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema.getMutationType())),
    subscription: getObjectTypeFromTypeMap(typeMap, getObjectTypeFromTypeMap(newTypeMap, schema.getSubscriptionType())),
    types: Object.values(typeMap),
    directives
  });
}
function mapTypes(originalTypeMap, schema, schemaMapper, testFn = () => true) {
  const newTypeMap = {};
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__")) {
      const originalType = originalTypeMap[typeName];
      if (originalType == null || !testFn(originalType)) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const typeMapper = getTypeMapper(schema, schemaMapper, typeName);
      if (typeMapper == null) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const maybeNewType = typeMapper(originalType, schema);
      if (maybeNewType === void 0) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      newTypeMap[typeName] = maybeNewType;
    }
  }
  return newTypeMap;
}
function mapEnumValues(originalTypeMap, schema, schemaMapper) {
  const enumValueMapper = getEnumValueMapper(schemaMapper);
  if (!enumValueMapper) {
    return originalTypeMap;
  }
  return mapTypes(originalTypeMap, schema, {
    [MapperKind.ENUM_TYPE]: (type) => {
      const config = type.toConfig();
      const originalEnumValueConfigMap = config.values;
      const newEnumValueConfigMap = {};
      for (const externalValue in originalEnumValueConfigMap) {
        const originalEnumValueConfig = originalEnumValueConfigMap[externalValue];
        const mappedEnumValue = enumValueMapper(originalEnumValueConfig, type.name, schema, externalValue);
        if (mappedEnumValue === void 0) {
          newEnumValueConfigMap[externalValue] = originalEnumValueConfig;
        } else if (Array.isArray(mappedEnumValue)) {
          const [newExternalValue, newEnumValueConfig] = mappedEnumValue;
          newEnumValueConfigMap[newExternalValue] = newEnumValueConfig === void 0 ? originalEnumValueConfig : newEnumValueConfig;
        } else if (mappedEnumValue !== null) {
          newEnumValueConfigMap[externalValue] = mappedEnumValue;
        }
      }
      return correctASTNodes(new GraphQLEnumType({
        ...config,
        values: newEnumValueConfigMap
      }));
    }
  }, (type) => isEnumType(type));
}
function mapDefaultValues(originalTypeMap, schema, fn) {
  const newTypeMap = mapArguments(originalTypeMap, schema, {
    [MapperKind.ARGUMENT]: (argumentConfig) => {
      if (argumentConfig.defaultValue === void 0) {
        return argumentConfig;
      }
      const maybeNewType = getNewType(originalTypeMap, argumentConfig.type);
      if (maybeNewType != null) {
        return {
          ...argumentConfig,
          defaultValue: fn(maybeNewType, argumentConfig.defaultValue)
        };
      }
    }
  });
  return mapFields(newTypeMap, schema, {
    [MapperKind.INPUT_OBJECT_FIELD]: (inputFieldConfig) => {
      if (inputFieldConfig.defaultValue === void 0) {
        return inputFieldConfig;
      }
      const maybeNewType = getNewType(newTypeMap, inputFieldConfig.type);
      if (maybeNewType != null) {
        return {
          ...inputFieldConfig,
          defaultValue: fn(maybeNewType, inputFieldConfig.defaultValue)
        };
      }
    }
  });
}
function getNewType(newTypeMap, type) {
  if (isListType(type)) {
    const newType = getNewType(newTypeMap, type.ofType);
    return newType != null ? new GraphQLList(newType) : null;
  } else if (isNonNullType(type)) {
    const newType = getNewType(newTypeMap, type.ofType);
    return newType != null ? new GraphQLNonNull(newType) : null;
  } else if (isNamedType(type)) {
    const newType = newTypeMap[type.name];
    return newType != null ? newType : null;
  }
  return null;
}
function mapFields(originalTypeMap, schema, schemaMapper) {
  const newTypeMap = {};
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__")) {
      const originalType = originalTypeMap[typeName];
      if (!isObjectType(originalType) && !isInterfaceType(originalType) && !isInputObjectType(originalType)) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const fieldMapper = getFieldMapper(schema, schemaMapper, typeName);
      if (fieldMapper == null) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const config = originalType.toConfig();
      const originalFieldConfigMap = config.fields;
      const newFieldConfigMap = {};
      for (const fieldName in originalFieldConfigMap) {
        const originalFieldConfig = originalFieldConfigMap[fieldName];
        const mappedField = fieldMapper(originalFieldConfig, fieldName, typeName, schema);
        if (mappedField === void 0) {
          newFieldConfigMap[fieldName] = originalFieldConfig;
        } else if (Array.isArray(mappedField)) {
          const [newFieldName, newFieldConfig] = mappedField;
          if (newFieldConfig.astNode != null) {
            newFieldConfig.astNode = {
              ...newFieldConfig.astNode,
              name: {
                ...newFieldConfig.astNode.name,
                value: newFieldName
              }
            };
          }
          newFieldConfigMap[newFieldName] = newFieldConfig === void 0 ? originalFieldConfig : newFieldConfig;
        } else if (mappedField !== null) {
          newFieldConfigMap[fieldName] = mappedField;
        }
      }
      if (isObjectType(originalType)) {
        newTypeMap[typeName] = correctASTNodes(new GraphQLObjectType({
          ...config,
          fields: newFieldConfigMap
        }));
      } else if (isInterfaceType(originalType)) {
        newTypeMap[typeName] = correctASTNodes(new GraphQLInterfaceType({
          ...config,
          fields: newFieldConfigMap
        }));
      } else {
        newTypeMap[typeName] = correctASTNodes(new GraphQLInputObjectType({
          ...config,
          fields: newFieldConfigMap
        }));
      }
    }
  }
  return newTypeMap;
}
function mapArguments(originalTypeMap, schema, schemaMapper) {
  const newTypeMap = {};
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__")) {
      const originalType = originalTypeMap[typeName];
      if (!isObjectType(originalType) && !isInterfaceType(originalType)) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const argumentMapper = getArgumentMapper(schemaMapper);
      if (argumentMapper == null) {
        newTypeMap[typeName] = originalType;
        continue;
      }
      const config = originalType.toConfig();
      const originalFieldConfigMap = config.fields;
      const newFieldConfigMap = {};
      for (const fieldName in originalFieldConfigMap) {
        const originalFieldConfig = originalFieldConfigMap[fieldName];
        const originalArgumentConfigMap = originalFieldConfig.args;
        if (originalArgumentConfigMap == null) {
          newFieldConfigMap[fieldName] = originalFieldConfig;
          continue;
        }
        const argumentNames = Object.keys(originalArgumentConfigMap);
        if (!argumentNames.length) {
          newFieldConfigMap[fieldName] = originalFieldConfig;
          continue;
        }
        const newArgumentConfigMap = {};
        for (const argumentName of argumentNames) {
          const originalArgumentConfig = originalArgumentConfigMap[argumentName];
          const mappedArgument = argumentMapper(originalArgumentConfig, fieldName, typeName, schema);
          if (mappedArgument === void 0) {
            newArgumentConfigMap[argumentName] = originalArgumentConfig;
          } else if (Array.isArray(mappedArgument)) {
            const [newArgumentName, newArgumentConfig] = mappedArgument;
            newArgumentConfigMap[newArgumentName] = newArgumentConfig;
          } else if (mappedArgument !== null) {
            newArgumentConfigMap[argumentName] = mappedArgument;
          }
        }
        newFieldConfigMap[fieldName] = {
          ...originalFieldConfig,
          args: newArgumentConfigMap
        };
      }
      if (isObjectType(originalType)) {
        newTypeMap[typeName] = new GraphQLObjectType({
          ...config,
          fields: newFieldConfigMap
        });
      } else if (isInterfaceType(originalType)) {
        newTypeMap[typeName] = new GraphQLInterfaceType({
          ...config,
          fields: newFieldConfigMap
        });
      } else {
        newTypeMap[typeName] = new GraphQLInputObjectType({
          ...config,
          fields: newFieldConfigMap
        });
      }
    }
  }
  return newTypeMap;
}
function mapDirectives(originalDirectives, schema, schemaMapper) {
  const directiveMapper = getDirectiveMapper(schemaMapper);
  if (directiveMapper == null) {
    return originalDirectives.slice();
  }
  const newDirectives = [];
  for (const directive of originalDirectives) {
    const mappedDirective = directiveMapper(directive, schema);
    if (mappedDirective === void 0) {
      newDirectives.push(directive);
    } else if (mappedDirective !== null) {
      newDirectives.push(mappedDirective);
    }
  }
  return newDirectives;
}
function getTypeSpecifiers(schema, typeName) {
  var _a2, _b, _c;
  const type = schema.getType(typeName);
  const specifiers = [MapperKind.TYPE];
  if (isObjectType(type)) {
    specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.OBJECT_TYPE);
    if (typeName === ((_a2 = schema.getQueryType()) === null || _a2 === void 0 ? void 0 : _a2.name)) {
      specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.QUERY);
    } else if (typeName === ((_b = schema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name)) {
      specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.MUTATION);
    } else if (typeName === ((_c = schema.getSubscriptionType()) === null || _c === void 0 ? void 0 : _c.name)) {
      specifiers.push(MapperKind.ROOT_OBJECT, MapperKind.SUBSCRIPTION);
    }
  } else if (isInputObjectType(type)) {
    specifiers.push(MapperKind.INPUT_OBJECT_TYPE);
  } else if (isInterfaceType(type)) {
    specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.INTERFACE_TYPE);
  } else if (isUnionType(type)) {
    specifiers.push(MapperKind.COMPOSITE_TYPE, MapperKind.ABSTRACT_TYPE, MapperKind.UNION_TYPE);
  } else if (isEnumType(type)) {
    specifiers.push(MapperKind.ENUM_TYPE);
  } else if (isScalarType(type)) {
    specifiers.push(MapperKind.SCALAR_TYPE);
  }
  return specifiers;
}
function getTypeMapper(schema, schemaMapper, typeName) {
  const specifiers = getTypeSpecifiers(schema, typeName);
  let typeMapper;
  const stack = [...specifiers];
  while (!typeMapper && stack.length > 0) {
    const next = stack.pop();
    typeMapper = schemaMapper[next];
  }
  return typeMapper != null ? typeMapper : null;
}
function getFieldSpecifiers(schema, typeName) {
  var _a2, _b, _c;
  const type = schema.getType(typeName);
  const specifiers = [MapperKind.FIELD];
  if (isObjectType(type)) {
    specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.OBJECT_FIELD);
    if (typeName === ((_a2 = schema.getQueryType()) === null || _a2 === void 0 ? void 0 : _a2.name)) {
      specifiers.push(MapperKind.ROOT_FIELD, MapperKind.QUERY_ROOT_FIELD);
    } else if (typeName === ((_b = schema.getMutationType()) === null || _b === void 0 ? void 0 : _b.name)) {
      specifiers.push(MapperKind.ROOT_FIELD, MapperKind.MUTATION_ROOT_FIELD);
    } else if (typeName === ((_c = schema.getSubscriptionType()) === null || _c === void 0 ? void 0 : _c.name)) {
      specifiers.push(MapperKind.ROOT_FIELD, MapperKind.SUBSCRIPTION_ROOT_FIELD);
    }
  } else if (isInterfaceType(type)) {
    specifiers.push(MapperKind.COMPOSITE_FIELD, MapperKind.INTERFACE_FIELD);
  } else if (isInputObjectType(type)) {
    specifiers.push(MapperKind.INPUT_OBJECT_FIELD);
  }
  return specifiers;
}
function getFieldMapper(schema, schemaMapper, typeName) {
  const specifiers = getFieldSpecifiers(schema, typeName);
  let fieldMapper;
  const stack = [...specifiers];
  while (!fieldMapper && stack.length > 0) {
    const next = stack.pop();
    fieldMapper = schemaMapper[next];
  }
  return fieldMapper !== null && fieldMapper !== void 0 ? fieldMapper : null;
}
function getArgumentMapper(schemaMapper) {
  const argumentMapper = schemaMapper[MapperKind.ARGUMENT];
  return argumentMapper != null ? argumentMapper : null;
}
function getDirectiveMapper(schemaMapper) {
  const directiveMapper = schemaMapper[MapperKind.DIRECTIVE];
  return directiveMapper != null ? directiveMapper : null;
}
function getEnumValueMapper(schemaMapper) {
  const enumValueMapper = schemaMapper[MapperKind.ENUM_VALUE];
  return enumValueMapper != null ? enumValueMapper : null;
}
function correctASTNodes(type) {
  if (isObjectType(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const fields = [];
      for (const fieldName in config.fields) {
        const fieldConfig = config.fields[fieldName];
        if (fieldConfig.astNode != null) {
          fields.push(fieldConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        kind: Kind.OBJECT_TYPE_DEFINITION,
        fields
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        kind: Kind.OBJECT_TYPE_EXTENSION,
        fields: void 0
      }));
    }
    return new GraphQLObjectType(config);
  } else if (isInterfaceType(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const fields = [];
      for (const fieldName in config.fields) {
        const fieldConfig = config.fields[fieldName];
        if (fieldConfig.astNode != null) {
          fields.push(fieldConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        fields
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        kind: Kind.INTERFACE_TYPE_EXTENSION,
        fields: void 0
      }));
    }
    return new GraphQLInterfaceType(config);
  } else if (isInputObjectType(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const fields = [];
      for (const fieldName in config.fields) {
        const fieldConfig = config.fields[fieldName];
        if (fieldConfig.astNode != null) {
          fields.push(fieldConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        fields
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
        fields: void 0
      }));
    }
    return new GraphQLInputObjectType(config);
  } else if (isEnumType(type)) {
    const config = type.toConfig();
    if (config.astNode != null) {
      const values = [];
      for (const enumKey in config.values) {
        const enumValueConfig = config.values[enumKey];
        if (enumValueConfig.astNode != null) {
          values.push(enumValueConfig.astNode);
        }
      }
      config.astNode = {
        ...config.astNode,
        values
      };
    }
    if (config.extensionASTNodes != null) {
      config.extensionASTNodes = config.extensionASTNodes.map((node) => ({
        ...node,
        values: void 0
      }));
    }
    return new GraphQLEnumType(config);
  } else {
    return type;
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/heal.js
function healSchema(schema) {
  healTypes(schema.getTypeMap(), schema.getDirectives());
  return schema;
}
function healTypes(originalTypeMap, directives) {
  const actualNamedTypeMap = /* @__PURE__ */ Object.create(null);
  for (const typeName in originalTypeMap) {
    const namedType = originalTypeMap[typeName];
    if (namedType == null || typeName.startsWith("__")) {
      continue;
    }
    const actualName = namedType.name;
    if (actualName.startsWith("__")) {
      continue;
    }
    if (actualName in actualNamedTypeMap) {
      throw new Error(`Duplicate schema type name ${actualName}`);
    }
    actualNamedTypeMap[actualName] = namedType;
  }
  for (const typeName in actualNamedTypeMap) {
    const namedType = actualNamedTypeMap[typeName];
    originalTypeMap[typeName] = namedType;
  }
  for (const decl of directives) {
    decl.args = decl.args.filter((arg) => {
      arg.type = healType(arg.type);
      return arg.type !== null;
    });
  }
  for (const typeName in originalTypeMap) {
    const namedType = originalTypeMap[typeName];
    if (!typeName.startsWith("__") && typeName in actualNamedTypeMap) {
      if (namedType != null) {
        healNamedType(namedType);
      }
    }
  }
  for (const typeName in originalTypeMap) {
    if (!typeName.startsWith("__") && !(typeName in actualNamedTypeMap)) {
      delete originalTypeMap[typeName];
    }
  }
  function healNamedType(type) {
    if (isObjectType(type)) {
      healFields(type);
      healInterfaces(type);
      return;
    } else if (isInterfaceType(type)) {
      healFields(type);
      if ("getInterfaces" in type) {
        healInterfaces(type);
      }
      return;
    } else if (isUnionType(type)) {
      healUnderlyingTypes(type);
      return;
    } else if (isInputObjectType(type)) {
      healInputFields(type);
      return;
    } else if (isLeafType(type)) {
      return;
    }
    throw new Error(`Unexpected schema type: ${type}`);
  }
  function healFields(type) {
    const fieldMap = type.getFields();
    for (const [key, field] of Object.entries(fieldMap)) {
      field.args.map((arg) => {
        arg.type = healType(arg.type);
        return arg.type === null ? null : arg;
      }).filter(Boolean);
      field.type = healType(field.type);
      if (field.type === null) {
        delete fieldMap[key];
      }
    }
  }
  function healInterfaces(type) {
    if ("getInterfaces" in type) {
      const interfaces = type.getInterfaces();
      interfaces.push(...interfaces.splice(0).map((iface) => healType(iface)).filter(Boolean));
    }
  }
  function healInputFields(type) {
    const fieldMap = type.getFields();
    for (const [key, field] of Object.entries(fieldMap)) {
      field.type = healType(field.type);
      if (field.type === null) {
        delete fieldMap[key];
      }
    }
  }
  function healUnderlyingTypes(type) {
    const types = type.getTypes();
    types.push(...types.splice(0).map((t) => healType(t)).filter(Boolean));
  }
  function healType(type) {
    if (isListType(type)) {
      const healedType = healType(type.ofType);
      return healedType != null ? new GraphQLList(healedType) : null;
    } else if (isNonNullType(type)) {
      const healedType = healType(type.ofType);
      return healedType != null ? new GraphQLNonNull(healedType) : null;
    } else if (isNamedType(type)) {
      const officialType = originalTypeMap[type.name];
      if (officialType && type !== officialType) {
        return officialType;
      }
    }
    return type;
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/forEachField.js
function forEachField(schema, fn) {
  const typeMap = schema.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if (!getNamedType(type).name.startsWith("__") && isObjectType(type)) {
      const fields = type.getFields();
      for (const fieldName in fields) {
        const field = fields[fieldName];
        fn(field, typeName, fieldName);
      }
    }
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/forEachDefaultValue.js
function forEachDefaultValue(schema, fn) {
  const typeMap = schema.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if (!getNamedType(type).name.startsWith("__")) {
      if (isObjectType(type)) {
        const fields = type.getFields();
        for (const fieldName in fields) {
          const field = fields[fieldName];
          for (const arg of field.args) {
            arg.defaultValue = fn(arg.type, arg.defaultValue);
          }
        }
      } else if (isInputObjectType(type)) {
        const fields = type.getFields();
        for (const fieldName in fields) {
          const field = fields[fieldName];
          field.defaultValue = fn(field.type, field.defaultValue);
        }
      }
    }
  }
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/mergeDeep.js
function mergeDeep(sources, respectPrototype = false) {
  const target = sources[0] || {};
  const output = {};
  if (respectPrototype) {
    Object.setPrototypeOf(output, Object.create(Object.getPrototypeOf(target)));
  }
  for (const source of sources) {
    if (isObject(target) && isObject(source)) {
      if (respectPrototype) {
        const outputPrototype = Object.getPrototypeOf(output);
        const sourcePrototype = Object.getPrototypeOf(source);
        if (sourcePrototype) {
          for (const key of Object.getOwnPropertyNames(sourcePrototype)) {
            const descriptor = Object.getOwnPropertyDescriptor(sourcePrototype, key);
            if (isSome(descriptor)) {
              Object.defineProperty(outputPrototype, key, descriptor);
            }
          }
        }
      }
      for (const key in source) {
        if (isObject(source[key])) {
          if (!(key in output)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = mergeDeep([output[key], source[key]], respectPrototype);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      }
    }
  }
  return output;
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/isAsyncIterable.js
function isAsyncIterable3(value) {
  return typeof value === "object" && value != null && Symbol.asyncIterator in value && typeof value[Symbol.asyncIterator] === "function";
}

// node_modules/.pnpm/@graphql-tools+utils@8.10.1_graphql@16.6.0/node_modules/@graphql-tools/utils/esm/isDocumentNode.js
function isDocumentNode(object) {
  return object && typeof object === "object" && "kind" in object && object.kind === Kind.DOCUMENT;
}

// node_modules/.pnpm/@graphql-tools+schema@9.0.2_graphql@16.6.0/node_modules/@graphql-tools/schema/esm/assertResolversPresent.js
function assertResolversPresent(schema, resolverValidationOptions = {}) {
  const { requireResolversForArgs, requireResolversForNonScalar, requireResolversForAllFields } = resolverValidationOptions;
  if (requireResolversForAllFields && (requireResolversForArgs || requireResolversForNonScalar)) {
    throw new TypeError("requireResolversForAllFields takes precedence over the more specific assertions. Please configure either requireResolversForAllFields or requireResolversForArgs / requireResolversForNonScalar, but not a combination of them.");
  }
  forEachField(schema, (field, typeName, fieldName) => {
    if (requireResolversForAllFields) {
      expectResolver("requireResolversForAllFields", requireResolversForAllFields, field, typeName, fieldName);
    }
    if (requireResolversForArgs && field.args.length > 0) {
      expectResolver("requireResolversForArgs", requireResolversForArgs, field, typeName, fieldName);
    }
    if (requireResolversForNonScalar !== "ignore" && !isScalarType(getNamedType(field.type))) {
      expectResolver("requireResolversForNonScalar", requireResolversForNonScalar, field, typeName, fieldName);
    }
  });
}
function expectResolver(validator, behavior, field, typeName, fieldName) {
  if (!field.resolve) {
    const message = `Resolver missing for "${typeName}.${fieldName}".
To disable this validator, use:
  resolverValidationOptions: {
    ${validator}: 'ignore'
  }`;
    if (behavior === "error") {
      throw new Error(message);
    }
    if (behavior === "warn") {
      console.warn(message);
    }
    return;
  }
  if (typeof field.resolve !== "function") {
    throw new Error(`Resolver "${typeName}.${fieldName}" must be a function`);
  }
}

// node_modules/.pnpm/@graphql-tools+schema@9.0.2_graphql@16.6.0/node_modules/@graphql-tools/schema/esm/checkForResolveTypeResolver.js
function checkForResolveTypeResolver(schema, requireResolversForResolveType) {
  mapSchema(schema, {
    [MapperKind.ABSTRACT_TYPE]: (type) => {
      if (!type.resolveType) {
        const message = `Type "${type.name}" is missing a "__resolveType" resolver. Pass 'ignore' into "resolverValidationOptions.requireResolversForResolveType" to disable this error.`;
        if (requireResolversForResolveType === "error") {
          throw new Error(message);
        }
        if (requireResolversForResolveType === "warn") {
          console.warn(message);
        }
      }
      return void 0;
    }
  });
}

// node_modules/.pnpm/@graphql-tools+schema@9.0.2_graphql@16.6.0/node_modules/@graphql-tools/schema/esm/extendResolversFromInterfaces.js
function extendResolversFromInterfaces(schema, resolvers) {
  const extendedResolvers = {};
  const typeMap = schema.getTypeMap();
  for (const typeName in typeMap) {
    const type = typeMap[typeName];
    if ("getInterfaces" in type) {
      extendedResolvers[typeName] = {};
      for (const iFace of type.getInterfaces()) {
        if (resolvers[iFace.name]) {
          for (const fieldName in resolvers[iFace.name]) {
            if (fieldName === "__isTypeOf" || !fieldName.startsWith("__")) {
              extendedResolvers[typeName][fieldName] = resolvers[iFace.name][fieldName];
            }
          }
        }
      }
      const typeResolvers = resolvers[typeName];
      extendedResolvers[typeName] = {
        ...extendedResolvers[typeName],
        ...typeResolvers
      };
    } else {
      const typeResolvers = resolvers[typeName];
      if (typeResolvers != null) {
        extendedResolvers[typeName] = typeResolvers;
      }
    }
  }
  return extendedResolvers;
}

// node_modules/.pnpm/@graphql-tools+schema@9.0.2_graphql@16.6.0/node_modules/@graphql-tools/schema/esm/addResolversToSchema.js
function addResolversToSchema({ schema, resolvers: inputResolvers, defaultFieldResolver: defaultFieldResolver2, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false }) {
  const { requireResolversToMatchSchema = "error", requireResolversForResolveType } = resolverValidationOptions;
  const resolvers = inheritResolversFromInterfaces ? extendResolversFromInterfaces(schema, inputResolvers) : inputResolvers;
  for (const typeName in resolvers) {
    const resolverValue = resolvers[typeName];
    const resolverType = typeof resolverValue;
    if (resolverType !== "object") {
      throw new Error(`"${typeName}" defined in resolvers, but has invalid value "${resolverValue}". The resolver's value must be of type object.`);
    }
    const type = schema.getType(typeName);
    if (type == null) {
      if (requireResolversToMatchSchema === "ignore") {
        continue;
      }
      throw new Error(`"${typeName}" defined in resolvers, but not in schema`);
    } else if (isSpecifiedScalarType(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
        } else {
          type[fieldName] = resolverValue[fieldName];
        }
      }
    } else if (isEnumType(type)) {
      const values = type.getValues();
      for (const fieldName in resolverValue) {
        if (!fieldName.startsWith("__") && !values.some((value) => value.name === fieldName) && requireResolversToMatchSchema && requireResolversToMatchSchema !== "ignore") {
          throw new Error(`${type.name}.${fieldName} was defined in resolvers, but not present within ${type.name}`);
        }
      }
    } else if (isUnionType(type)) {
      for (const fieldName in resolverValue) {
        if (!fieldName.startsWith("__") && requireResolversToMatchSchema && requireResolversToMatchSchema !== "ignore") {
          throw new Error(`${type.name}.${fieldName} was defined in resolvers, but ${type.name} is not an object or interface type`);
        }
      }
    } else if (isObjectType(type) || isInterfaceType(type)) {
      for (const fieldName in resolverValue) {
        if (!fieldName.startsWith("__")) {
          const fields = type.getFields();
          const field = fields[fieldName];
          if (field == null) {
            if (requireResolversToMatchSchema && requireResolversToMatchSchema !== "ignore") {
              throw new Error(`${typeName}.${fieldName} defined in resolvers, but not in schema`);
            }
          } else {
            const fieldResolve = resolverValue[fieldName];
            if (typeof fieldResolve !== "function" && typeof fieldResolve !== "object") {
              throw new Error(`Resolver ${typeName}.${fieldName} must be object or function`);
            }
          }
        }
      }
    }
  }
  schema = updateResolversInPlace ? addResolversToExistingSchema(schema, resolvers, defaultFieldResolver2) : createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver2);
  if (requireResolversForResolveType && requireResolversForResolveType !== "ignore") {
    checkForResolveTypeResolver(schema, requireResolversForResolveType);
  }
  return schema;
}
function addResolversToExistingSchema(schema, resolvers, defaultFieldResolver2) {
  var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
  const typeMap = schema.getTypeMap();
  for (const typeName in resolvers) {
    const type = schema.getType(typeName);
    const resolverValue = resolvers[typeName];
    if (isScalarType(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
        } else if (fieldName === "astNode" && type.astNode != null) {
          type.astNode = {
            ...type.astNode,
            description: (_b = (_a2 = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : type.astNode.description,
            directives: ((_c = type.astNode.directives) !== null && _c !== void 0 ? _c : []).concat((_e = (_d = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _d === void 0 ? void 0 : _d.directives) !== null && _e !== void 0 ? _e : [])
          };
        } else if (fieldName === "extensionASTNodes" && type.extensionASTNodes != null) {
          type.extensionASTNodes = type.extensionASTNodes.concat((_f = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _f !== void 0 ? _f : []);
        } else if (fieldName === "extensions" && type.extensions != null && resolverValue.extensions != null) {
          type.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
        } else {
          type[fieldName] = resolverValue[fieldName];
        }
      }
    } else if (isEnumType(type)) {
      const config = type.toConfig();
      const enumValueConfigMap = config.values;
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          config[fieldName.substring(2)] = resolverValue[fieldName];
        } else if (fieldName === "astNode" && config.astNode != null) {
          config.astNode = {
            ...config.astNode,
            description: (_h = (_g = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _g === void 0 ? void 0 : _g.description) !== null && _h !== void 0 ? _h : config.astNode.description,
            directives: ((_j = config.astNode.directives) !== null && _j !== void 0 ? _j : []).concat((_l = (_k = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _k === void 0 ? void 0 : _k.directives) !== null && _l !== void 0 ? _l : [])
          };
        } else if (fieldName === "extensionASTNodes" && config.extensionASTNodes != null) {
          config.extensionASTNodes = config.extensionASTNodes.concat((_m = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _m !== void 0 ? _m : []);
        } else if (fieldName === "extensions" && type.extensions != null && resolverValue.extensions != null) {
          type.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
        } else if (enumValueConfigMap[fieldName]) {
          enumValueConfigMap[fieldName].value = resolverValue[fieldName];
        }
      }
      typeMap[typeName] = new GraphQLEnumType(config);
    } else if (isUnionType(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
        }
      }
    } else if (isObjectType(type) || isInterfaceType(type)) {
      for (const fieldName in resolverValue) {
        if (fieldName.startsWith("__")) {
          type[fieldName.substring(2)] = resolverValue[fieldName];
          continue;
        }
        const fields = type.getFields();
        const field = fields[fieldName];
        if (field != null) {
          const fieldResolve = resolverValue[fieldName];
          if (typeof fieldResolve === "function") {
            field.resolve = fieldResolve.bind(resolverValue);
          } else {
            setFieldProperties(field, fieldResolve);
          }
        }
      }
    }
  }
  forEachDefaultValue(schema, serializeInputValue);
  healSchema(schema);
  forEachDefaultValue(schema, parseInputValue);
  if (defaultFieldResolver2 != null) {
    forEachField(schema, (field) => {
      if (!field.resolve) {
        field.resolve = defaultFieldResolver2;
      }
    });
  }
  return schema;
}
function createNewSchemaWithResolvers(schema, resolvers, defaultFieldResolver2) {
  schema = mapSchema(schema, {
    [MapperKind.SCALAR_TYPE]: (type) => {
      var _a2, _b, _c, _d, _e, _f;
      const config = type.toConfig();
      const resolverValue = resolvers[type.name];
      if (!isSpecifiedScalarType(type) && resolverValue != null) {
        for (const fieldName in resolverValue) {
          if (fieldName.startsWith("__")) {
            config[fieldName.substring(2)] = resolverValue[fieldName];
          } else if (fieldName === "astNode" && config.astNode != null) {
            config.astNode = {
              ...config.astNode,
              description: (_b = (_a2 = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : config.astNode.description,
              directives: ((_c = config.astNode.directives) !== null && _c !== void 0 ? _c : []).concat((_e = (_d = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _d === void 0 ? void 0 : _d.directives) !== null && _e !== void 0 ? _e : [])
            };
          } else if (fieldName === "extensionASTNodes" && config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.concat((_f = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _f !== void 0 ? _f : []);
          } else if (fieldName === "extensions" && config.extensions != null && resolverValue.extensions != null) {
            config.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
          } else {
            config[fieldName] = resolverValue[fieldName];
          }
        }
        return new GraphQLScalarType(config);
      }
    },
    [MapperKind.ENUM_TYPE]: (type) => {
      var _a2, _b, _c, _d, _e, _f;
      const resolverValue = resolvers[type.name];
      const config = type.toConfig();
      const enumValueConfigMap = config.values;
      if (resolverValue != null) {
        for (const fieldName in resolverValue) {
          if (fieldName.startsWith("__")) {
            config[fieldName.substring(2)] = resolverValue[fieldName];
          } else if (fieldName === "astNode" && config.astNode != null) {
            config.astNode = {
              ...config.astNode,
              description: (_b = (_a2 = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _a2 === void 0 ? void 0 : _a2.description) !== null && _b !== void 0 ? _b : config.astNode.description,
              directives: ((_c = config.astNode.directives) !== null && _c !== void 0 ? _c : []).concat((_e = (_d = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.astNode) === null || _d === void 0 ? void 0 : _d.directives) !== null && _e !== void 0 ? _e : [])
            };
          } else if (fieldName === "extensionASTNodes" && config.extensionASTNodes != null) {
            config.extensionASTNodes = config.extensionASTNodes.concat((_f = resolverValue === null || resolverValue === void 0 ? void 0 : resolverValue.extensionASTNodes) !== null && _f !== void 0 ? _f : []);
          } else if (fieldName === "extensions" && config.extensions != null && resolverValue.extensions != null) {
            config.extensions = Object.assign(/* @__PURE__ */ Object.create(null), type.extensions, resolverValue.extensions);
          } else if (enumValueConfigMap[fieldName]) {
            enumValueConfigMap[fieldName].value = resolverValue[fieldName];
          }
        }
        return new GraphQLEnumType(config);
      }
    },
    [MapperKind.UNION_TYPE]: (type) => {
      const resolverValue = resolvers[type.name];
      if (resolverValue != null) {
        const config = type.toConfig();
        if (resolverValue["__resolveType"]) {
          config.resolveType = resolverValue["__resolveType"];
        }
        return new GraphQLUnionType(config);
      }
    },
    [MapperKind.OBJECT_TYPE]: (type) => {
      const resolverValue = resolvers[type.name];
      if (resolverValue != null) {
        const config = type.toConfig();
        if (resolverValue["__isTypeOf"]) {
          config.isTypeOf = resolverValue["__isTypeOf"];
        }
        return new GraphQLObjectType(config);
      }
    },
    [MapperKind.INTERFACE_TYPE]: (type) => {
      const resolverValue = resolvers[type.name];
      if (resolverValue != null) {
        const config = type.toConfig();
        if (resolverValue["__resolveType"]) {
          config.resolveType = resolverValue["__resolveType"];
        }
        return new GraphQLInterfaceType(config);
      }
    },
    [MapperKind.COMPOSITE_FIELD]: (fieldConfig, fieldName, typeName) => {
      const resolverValue = resolvers[typeName];
      if (resolverValue != null) {
        const fieldResolve = resolverValue[fieldName];
        if (fieldResolve != null) {
          const newFieldConfig = { ...fieldConfig };
          if (typeof fieldResolve === "function") {
            newFieldConfig.resolve = fieldResolve.bind(resolverValue);
          } else {
            setFieldProperties(newFieldConfig, fieldResolve);
          }
          return newFieldConfig;
        }
      }
    }
  });
  if (defaultFieldResolver2 != null) {
    schema = mapSchema(schema, {
      [MapperKind.OBJECT_FIELD]: (fieldConfig) => ({
        ...fieldConfig,
        resolve: fieldConfig.resolve != null ? fieldConfig.resolve : defaultFieldResolver2
      })
    });
  }
  return schema;
}
function setFieldProperties(field, propertiesObj) {
  for (const propertyName in propertiesObj) {
    field[propertyName] = propertiesObj[propertyName];
  }
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/merge-resolvers.js
function mergeResolvers(resolversDefinitions, options) {
  if (!resolversDefinitions || Array.isArray(resolversDefinitions) && resolversDefinitions.length === 0) {
    return {};
  }
  if (!Array.isArray(resolversDefinitions)) {
    return resolversDefinitions;
  }
  if (resolversDefinitions.length === 1) {
    return resolversDefinitions[0] || {};
  }
  const resolvers = new Array();
  for (let resolversDefinition of resolversDefinitions) {
    if (Array.isArray(resolversDefinition)) {
      resolversDefinition = mergeResolvers(resolversDefinition);
    }
    if (typeof resolversDefinition === "object" && resolversDefinition) {
      resolvers.push(resolversDefinition);
    }
  }
  const result = mergeDeep(resolvers, true);
  if (options === null || options === void 0 ? void 0 : options.exclusions) {
    for (const exclusion of options.exclusions) {
      const [typeName, fieldName] = exclusion.split(".");
      if (!fieldName || fieldName === "*") {
        delete result[typeName];
      } else if (result[typeName]) {
        delete result[typeName][fieldName];
      }
    }
  }
  return result;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/arguments.js
function mergeArguments(args1, args2, config) {
  const result = deduplicateArguments([...args2, ...args1].filter(isSome));
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  return result;
}
function deduplicateArguments(args) {
  return args.reduce((acc, current) => {
    const dup = acc.find((arg) => arg.name.value === current.name.value);
    if (!dup) {
      return acc.concat([current]);
    }
    return acc;
  }, []);
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/directives.js
function directiveAlreadyExists(directivesArr, otherDirective) {
  return !!directivesArr.find((directive) => directive.name.value === otherDirective.name.value);
}
function nameAlreadyExists(name, namesArr) {
  return namesArr.some(({ value }) => value === name.value);
}
function mergeArguments2(a1, a2) {
  const result = [...a2];
  for (const argument of a1) {
    const existingIndex = result.findIndex((a) => a.name.value === argument.name.value);
    if (existingIndex > -1) {
      const existingArg = result[existingIndex];
      if (existingArg.value.kind === "ListValue") {
        const source = existingArg.value.values;
        const target = argument.value.values;
        existingArg.value.values = deduplicateLists(source, target, (targetVal, source2) => {
          const value = targetVal.value;
          return !value || !source2.some((sourceVal) => sourceVal.value === value);
        });
      } else {
        existingArg.value = argument.value;
      }
    } else {
      result.push(argument);
    }
  }
  return result;
}
function deduplicateDirectives(directives) {
  return directives.map((directive, i, all) => {
    const firstAt = all.findIndex((d) => d.name.value === directive.name.value);
    if (firstAt !== i) {
      const dup = all[firstAt];
      directive.arguments = mergeArguments2(directive.arguments, dup.arguments);
      return null;
    }
    return directive;
  }).filter(isSome);
}
function mergeDirectives(d1 = [], d2 = [], config) {
  const reverseOrder = config && config.reverseDirectives;
  const asNext = reverseOrder ? d1 : d2;
  const asFirst = reverseOrder ? d2 : d1;
  const result = deduplicateDirectives([...asNext]);
  for (const directive of asFirst) {
    if (directiveAlreadyExists(result, directive)) {
      const existingDirectiveIndex = result.findIndex((d) => d.name.value === directive.name.value);
      const existingDirective = result[existingDirectiveIndex];
      result[existingDirectiveIndex].arguments = mergeArguments2(directive.arguments || [], existingDirective.arguments || []);
    } else {
      result.push(directive);
    }
  }
  return result;
}
function validateInputs(node, existingNode) {
  const printedNode = print({
    ...node,
    description: void 0
  });
  const printedExistingNode = print({
    ...existingNode,
    description: void 0
  });
  const leaveInputs = new RegExp("(directive @w*d*)|( on .*$)", "g");
  const sameArguments = printedNode.replace(leaveInputs, "") === printedExistingNode.replace(leaveInputs, "");
  if (!sameArguments) {
    throw new Error(`Unable to merge GraphQL directive "${node.name.value}". 
Existing directive:  
	${printedExistingNode} 
Received directive: 
	${printedNode}`);
  }
}
function mergeDirective(node, existingNode) {
  if (existingNode) {
    validateInputs(node, existingNode);
    return {
      ...node,
      locations: [
        ...existingNode.locations,
        ...node.locations.filter((name) => !nameAlreadyExists(name, existingNode.locations))
      ]
    };
  }
  return node;
}
function deduplicateLists(source, target, filterFn) {
  return source.concat(target.filter((val) => filterFn(val, source)));
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/enum-values.js
function mergeEnumValues(first, second, config) {
  if (config === null || config === void 0 ? void 0 : config.consistentEnumMerge) {
    const reversed = [];
    if (first) {
      reversed.push(...first);
    }
    first = second;
    second = reversed;
  }
  const enumValueMap = /* @__PURE__ */ new Map();
  if (first) {
    for (const firstValue of first) {
      enumValueMap.set(firstValue.name.value, firstValue);
    }
  }
  if (second) {
    for (const secondValue of second) {
      const enumValue = secondValue.name.value;
      if (enumValueMap.has(enumValue)) {
        const firstValue = enumValueMap.get(enumValue);
        firstValue.description = secondValue.description || firstValue.description;
        firstValue.directives = mergeDirectives(secondValue.directives, firstValue.directives);
      } else {
        enumValueMap.set(enumValue, secondValue);
      }
    }
  }
  const result = [...enumValueMap.values()];
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  return result;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/enum.js
function mergeEnum(e1, e2, config) {
  if (e2) {
    return {
      name: e1.name,
      description: e1["description"] || e2["description"],
      kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || e1.kind === "EnumTypeDefinition" || e2.kind === "EnumTypeDefinition" ? "EnumTypeDefinition" : "EnumTypeExtension",
      loc: e1.loc,
      directives: mergeDirectives(e1.directives, e2.directives, config),
      values: mergeEnumValues(e1.values, e2.values, config)
    };
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...e1,
    kind: Kind.ENUM_TYPE_DEFINITION
  } : e1;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/utils.js
function isStringTypes(types) {
  return typeof types === "string";
}
function isSourceTypes(types) {
  return types instanceof Source;
}
function extractType(type) {
  let visitedType = type;
  while (visitedType.kind === Kind.LIST_TYPE || visitedType.kind === "NonNullType") {
    visitedType = visitedType.type;
  }
  return visitedType;
}
function isWrappingTypeNode(type) {
  return type.kind !== Kind.NAMED_TYPE;
}
function isListTypeNode(type) {
  return type.kind === Kind.LIST_TYPE;
}
function isNonNullTypeNode(type) {
  return type.kind === Kind.NON_NULL_TYPE;
}
function printTypeNode(type) {
  if (isListTypeNode(type)) {
    return `[${printTypeNode(type.type)}]`;
  }
  if (isNonNullTypeNode(type)) {
    return `${printTypeNode(type.type)}!`;
  }
  return type.name.value;
}
var CompareVal;
(function(CompareVal2) {
  CompareVal2[CompareVal2["A_SMALLER_THAN_B"] = -1] = "A_SMALLER_THAN_B";
  CompareVal2[CompareVal2["A_EQUALS_B"] = 0] = "A_EQUALS_B";
  CompareVal2[CompareVal2["A_GREATER_THAN_B"] = 1] = "A_GREATER_THAN_B";
})(CompareVal || (CompareVal = {}));
function defaultStringComparator(a, b) {
  if (a == null && b == null) {
    return CompareVal.A_EQUALS_B;
  }
  if (a == null) {
    return CompareVal.A_SMALLER_THAN_B;
  }
  if (b == null) {
    return CompareVal.A_GREATER_THAN_B;
  }
  if (a < b)
    return CompareVal.A_SMALLER_THAN_B;
  if (a > b)
    return CompareVal.A_GREATER_THAN_B;
  return CompareVal.A_EQUALS_B;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/fields.js
function fieldAlreadyExists(fieldsArr, otherField, config) {
  const result = fieldsArr.find((field) => field.name.value === otherField.name.value);
  if (result && !(config === null || config === void 0 ? void 0 : config.ignoreFieldConflicts)) {
    const t1 = extractType(result.type);
    const t2 = extractType(otherField.type);
    if (t1.name.value !== t2.name.value) {
      throw new Error(`Field "${otherField.name.value}" already defined with a different type. Declared as "${t1.name.value}", but you tried to override with "${t2.name.value}"`);
    }
  }
  return !!result;
}
function mergeFields(type, f1, f2, config) {
  const result = [];
  if (f2 != null) {
    result.push(...f2);
  }
  if (f1 != null) {
    for (const field of f1) {
      if (fieldAlreadyExists(result, field, config)) {
        const existing = result.find((f) => f.name.value === field.name.value);
        if (!(config === null || config === void 0 ? void 0 : config.ignoreFieldConflicts)) {
          if (config === null || config === void 0 ? void 0 : config.throwOnConflict) {
            preventConflicts(type, existing, field, false);
          } else {
            preventConflicts(type, existing, field, true);
          }
          if (isNonNullTypeNode(field.type) && !isNonNullTypeNode(existing.type)) {
            existing.type = field.type;
          }
        }
        existing.arguments = mergeArguments(field["arguments"] || [], existing.arguments || [], config);
        existing.directives = mergeDirectives(field.directives, existing.directives, config);
        existing.description = field.description || existing.description;
      } else {
        result.push(field);
      }
    }
  }
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  if (config && config.exclusions) {
    const exclusions = config.exclusions;
    return result.filter((field) => !exclusions.includes(`${type.name.value}.${field.name.value}`));
  }
  return result;
}
function preventConflicts(type, a, b, ignoreNullability = false) {
  const aType = printTypeNode(a.type);
  const bType = printTypeNode(b.type);
  if (aType !== bType && !safeChangeForFieldType(a.type, b.type, ignoreNullability)) {
    throw new Error(`Field '${type.name.value}.${a.name.value}' changed type from '${aType}' to '${bType}'`);
  }
}
function safeChangeForFieldType(oldType, newType, ignoreNullability = false) {
  if (!isWrappingTypeNode(oldType) && !isWrappingTypeNode(newType)) {
    return oldType.toString() === newType.toString();
  }
  if (isNonNullTypeNode(newType)) {
    const ofType = isNonNullTypeNode(oldType) ? oldType.type : oldType;
    return safeChangeForFieldType(ofType, newType.type);
  }
  if (isNonNullTypeNode(oldType)) {
    return safeChangeForFieldType(newType, oldType, ignoreNullability);
  }
  if (isListTypeNode(oldType)) {
    return isListTypeNode(newType) && safeChangeForFieldType(oldType.type, newType.type) || isNonNullTypeNode(newType) && safeChangeForFieldType(oldType, newType["type"]);
  }
  return false;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/input-type.js
function mergeInputType(node, existingNode, config) {
  if (existingNode) {
    try {
      return {
        name: node.name,
        description: node["description"] || existingNode["description"],
        kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || node.kind === "InputObjectTypeDefinition" || existingNode.kind === "InputObjectTypeDefinition" ? "InputObjectTypeDefinition" : "InputObjectTypeExtension",
        loc: node.loc,
        fields: mergeFields(node, node.fields, existingNode.fields, config),
        directives: mergeDirectives(node.directives, existingNode.directives, config)
      };
    } catch (e) {
      throw new Error(`Unable to merge GraphQL input type "${node.name.value}": ${e.message}`);
    }
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...node,
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION
  } : node;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/interface.js
function mergeInterface(node, existingNode, config) {
  if (existingNode) {
    try {
      return {
        name: node.name,
        description: node["description"] || existingNode["description"],
        kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || node.kind === "InterfaceTypeDefinition" || existingNode.kind === "InterfaceTypeDefinition" ? "InterfaceTypeDefinition" : "InterfaceTypeExtension",
        loc: node.loc,
        fields: mergeFields(node, node.fields, existingNode.fields, config),
        directives: mergeDirectives(node.directives, existingNode.directives, config),
        interfaces: node["interfaces"] ? mergeNamedTypeArray(node["interfaces"], existingNode["interfaces"], config) : void 0
      };
    } catch (e) {
      throw new Error(`Unable to merge GraphQL interface "${node.name.value}": ${e.message}`);
    }
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...node,
    kind: Kind.INTERFACE_TYPE_DEFINITION
  } : node;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-named-type-array.js
function alreadyExists(arr, other) {
  return !!arr.find((i) => i.name.value === other.name.value);
}
function mergeNamedTypeArray(first = [], second = [], config = {}) {
  const result = [...second, ...first.filter((d) => !alreadyExists(second, d))];
  if (config && config.sort) {
    result.sort(compareNodes);
  }
  return result;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/type.js
function mergeType(node, existingNode, config) {
  if (existingNode) {
    try {
      return {
        name: node.name,
        description: node["description"] || existingNode["description"],
        kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || node.kind === "ObjectTypeDefinition" || existingNode.kind === "ObjectTypeDefinition" ? "ObjectTypeDefinition" : "ObjectTypeExtension",
        loc: node.loc,
        fields: mergeFields(node, node.fields, existingNode.fields, config),
        directives: mergeDirectives(node.directives, existingNode.directives, config),
        interfaces: mergeNamedTypeArray(node.interfaces, existingNode.interfaces, config)
      };
    } catch (e) {
      throw new Error(`Unable to merge GraphQL type "${node.name.value}": ${e.message}`);
    }
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...node,
    kind: Kind.OBJECT_TYPE_DEFINITION
  } : node;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/scalar.js
function mergeScalar(node, existingNode, config) {
  if (existingNode) {
    return {
      name: node.name,
      description: node["description"] || existingNode["description"],
      kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || node.kind === "ScalarTypeDefinition" || existingNode.kind === "ScalarTypeDefinition" ? "ScalarTypeDefinition" : "ScalarTypeExtension",
      loc: node.loc,
      directives: mergeDirectives(node.directives, existingNode.directives, config)
    };
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...node,
    kind: Kind.SCALAR_TYPE_DEFINITION
  } : node;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/union.js
function mergeUnion(first, second, config) {
  if (second) {
    return {
      name: first.name,
      description: first["description"] || second["description"],
      directives: mergeDirectives(first.directives, second.directives, config),
      kind: (config === null || config === void 0 ? void 0 : config.convertExtensions) || first.kind === "UnionTypeDefinition" || second.kind === "UnionTypeDefinition" ? Kind.UNION_TYPE_DEFINITION : Kind.UNION_TYPE_EXTENSION,
      loc: first.loc,
      types: mergeNamedTypeArray(first.types, second.types, config)
    };
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...first,
    kind: Kind.UNION_TYPE_DEFINITION
  } : first;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/schema-def.js
var DEFAULT_OPERATION_TYPE_NAME_MAP = {
  query: "Query",
  mutation: "Mutation",
  subscription: "Subscription"
};
function mergeOperationTypes(opNodeList = [], existingOpNodeList = []) {
  const finalOpNodeList = [];
  for (const opNodeType in DEFAULT_OPERATION_TYPE_NAME_MAP) {
    const opNode = opNodeList.find((n) => n.operation === opNodeType) || existingOpNodeList.find((n) => n.operation === opNodeType);
    if (opNode) {
      finalOpNodeList.push(opNode);
    }
  }
  return finalOpNodeList;
}
function mergeSchemaDefs(node, existingNode, config) {
  if (existingNode) {
    return {
      kind: node.kind === Kind.SCHEMA_DEFINITION || existingNode.kind === Kind.SCHEMA_DEFINITION ? Kind.SCHEMA_DEFINITION : Kind.SCHEMA_EXTENSION,
      description: node["description"] || existingNode["description"],
      directives: mergeDirectives(node.directives, existingNode.directives, config),
      operationTypes: mergeOperationTypes(node.operationTypes, existingNode.operationTypes)
    };
  }
  return (config === null || config === void 0 ? void 0 : config.convertExtensions) ? {
    ...node,
    kind: Kind.SCHEMA_DEFINITION
  } : node;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-nodes.js
var schemaDefSymbol = "SCHEMA_DEF_SYMBOL";
function isNamedDefinitionNode(definitionNode) {
  return "name" in definitionNode;
}
function mergeGraphQLNodes(nodes, config) {
  var _a2, _b, _c;
  const mergedResultMap = {};
  for (const nodeDefinition of nodes) {
    if (isNamedDefinitionNode(nodeDefinition)) {
      const name = (_a2 = nodeDefinition.name) === null || _a2 === void 0 ? void 0 : _a2.value;
      if (config === null || config === void 0 ? void 0 : config.commentDescriptions) {
        collectComment(nodeDefinition);
      }
      if (name == null) {
        continue;
      }
      if (((_b = config === null || config === void 0 ? void 0 : config.exclusions) === null || _b === void 0 ? void 0 : _b.includes(name + ".*")) || ((_c = config === null || config === void 0 ? void 0 : config.exclusions) === null || _c === void 0 ? void 0 : _c.includes(name))) {
        delete mergedResultMap[name];
      } else {
        switch (nodeDefinition.kind) {
          case Kind.OBJECT_TYPE_DEFINITION:
          case Kind.OBJECT_TYPE_EXTENSION:
            mergedResultMap[name] = mergeType(nodeDefinition, mergedResultMap[name], config);
            break;
          case Kind.ENUM_TYPE_DEFINITION:
          case Kind.ENUM_TYPE_EXTENSION:
            mergedResultMap[name] = mergeEnum(nodeDefinition, mergedResultMap[name], config);
            break;
          case Kind.UNION_TYPE_DEFINITION:
          case Kind.UNION_TYPE_EXTENSION:
            mergedResultMap[name] = mergeUnion(nodeDefinition, mergedResultMap[name], config);
            break;
          case Kind.SCALAR_TYPE_DEFINITION:
          case Kind.SCALAR_TYPE_EXTENSION:
            mergedResultMap[name] = mergeScalar(nodeDefinition, mergedResultMap[name], config);
            break;
          case Kind.INPUT_OBJECT_TYPE_DEFINITION:
          case Kind.INPUT_OBJECT_TYPE_EXTENSION:
            mergedResultMap[name] = mergeInputType(nodeDefinition, mergedResultMap[name], config);
            break;
          case Kind.INTERFACE_TYPE_DEFINITION:
          case Kind.INTERFACE_TYPE_EXTENSION:
            mergedResultMap[name] = mergeInterface(nodeDefinition, mergedResultMap[name], config);
            break;
          case Kind.DIRECTIVE_DEFINITION:
            mergedResultMap[name] = mergeDirective(nodeDefinition, mergedResultMap[name]);
            break;
        }
      }
    } else if (nodeDefinition.kind === Kind.SCHEMA_DEFINITION || nodeDefinition.kind === Kind.SCHEMA_EXTENSION) {
      mergedResultMap[schemaDefSymbol] = mergeSchemaDefs(nodeDefinition, mergedResultMap[schemaDefSymbol], config);
    }
  }
  return mergedResultMap;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/typedefs-mergers/merge-typedefs.js
function mergeTypeDefs(typeSource, config) {
  resetComments();
  const doc = {
    kind: Kind.DOCUMENT,
    definitions: mergeGraphQLTypes(typeSource, {
      useSchemaDefinition: true,
      forceSchemaDefinition: false,
      throwOnConflict: false,
      commentDescriptions: false,
      ...config
    })
  };
  let result;
  if (config === null || config === void 0 ? void 0 : config.commentDescriptions) {
    result = printWithComments(doc);
  } else {
    result = doc;
  }
  resetComments();
  return result;
}
function visitTypeSources(typeSource, options, allNodes = [], visitedTypeSources = /* @__PURE__ */ new Set()) {
  if (typeSource && !visitedTypeSources.has(typeSource)) {
    visitedTypeSources.add(typeSource);
    if (typeof typeSource === "function") {
      visitTypeSources(typeSource(), options, allNodes, visitedTypeSources);
    } else if (Array.isArray(typeSource)) {
      for (const type of typeSource) {
        visitTypeSources(type, options, allNodes, visitedTypeSources);
      }
    } else if (isSchema(typeSource)) {
      const documentNode = getDocumentNodeFromSchema(typeSource, options);
      visitTypeSources(documentNode.definitions, options, allNodes, visitedTypeSources);
    } else if (isStringTypes(typeSource) || isSourceTypes(typeSource)) {
      const documentNode = parse(typeSource, options);
      visitTypeSources(documentNode.definitions, options, allNodes, visitedTypeSources);
    } else if (typeof typeSource === "object" && isDefinitionNode(typeSource)) {
      allNodes.push(typeSource);
    } else if (isDocumentNode(typeSource)) {
      visitTypeSources(typeSource.definitions, options, allNodes, visitedTypeSources);
    } else {
      throw new Error(`typeDefs must contain only strings, documents, schemas, or functions, got ${typeof typeSource}`);
    }
  }
  return allNodes;
}
function mergeGraphQLTypes(typeSource, config) {
  var _a2, _b, _c;
  resetComments();
  const allNodes = visitTypeSources(typeSource, config);
  const mergedNodes = mergeGraphQLNodes(allNodes, config);
  if (config === null || config === void 0 ? void 0 : config.useSchemaDefinition) {
    const schemaDef = mergedNodes[schemaDefSymbol] || {
      kind: Kind.SCHEMA_DEFINITION,
      operationTypes: []
    };
    const operationTypes = schemaDef.operationTypes;
    for (const opTypeDefNodeType in DEFAULT_OPERATION_TYPE_NAME_MAP) {
      const opTypeDefNode = operationTypes.find((operationType) => operationType.operation === opTypeDefNodeType);
      if (!opTypeDefNode) {
        const possibleRootTypeName = DEFAULT_OPERATION_TYPE_NAME_MAP[opTypeDefNodeType];
        const existingPossibleRootType = mergedNodes[possibleRootTypeName];
        if (existingPossibleRootType != null && existingPossibleRootType.name != null) {
          operationTypes.push({
            kind: Kind.OPERATION_TYPE_DEFINITION,
            type: {
              kind: Kind.NAMED_TYPE,
              name: existingPossibleRootType.name
            },
            operation: opTypeDefNodeType
          });
        }
      }
    }
    if (((_a2 = schemaDef === null || schemaDef === void 0 ? void 0 : schemaDef.operationTypes) === null || _a2 === void 0 ? void 0 : _a2.length) != null && schemaDef.operationTypes.length > 0) {
      mergedNodes[schemaDefSymbol] = schemaDef;
    }
  }
  if ((config === null || config === void 0 ? void 0 : config.forceSchemaDefinition) && !((_c = (_b = mergedNodes[schemaDefSymbol]) === null || _b === void 0 ? void 0 : _b.operationTypes) === null || _c === void 0 ? void 0 : _c.length)) {
    mergedNodes[schemaDefSymbol] = {
      kind: Kind.SCHEMA_DEFINITION,
      operationTypes: [
        {
          kind: Kind.OPERATION_TYPE_DEFINITION,
          operation: "query",
          type: {
            kind: Kind.NAMED_TYPE,
            name: {
              kind: Kind.NAME,
              value: "Query"
            }
          }
        }
      ]
    };
  }
  const mergedNodeDefinitions = Object.values(mergedNodes);
  if (config === null || config === void 0 ? void 0 : config.sort) {
    const sortFn = typeof config.sort === "function" ? config.sort : defaultStringComparator;
    mergedNodeDefinitions.sort((a, b) => {
      var _a3, _b2;
      return sortFn((_a3 = a.name) === null || _a3 === void 0 ? void 0 : _a3.value, (_b2 = b.name) === null || _b2 === void 0 ? void 0 : _b2.value);
    });
  }
  return mergedNodeDefinitions;
}

// node_modules/.pnpm/@graphql-tools+merge@8.3.4_graphql@16.6.0/node_modules/@graphql-tools/merge/esm/extensions.js
function mergeExtensions(extensions) {
  return mergeDeep(extensions);
}
function applyExtensionObject(obj, extensions) {
  if (!obj) {
    return;
  }
  obj.extensions = mergeDeep([obj.extensions || {}, extensions || {}]);
}
function applyExtensions(schema, extensions) {
  applyExtensionObject(schema, extensions.schemaExtensions);
  for (const [typeName, data] of Object.entries(extensions.types || {})) {
    const type = schema.getType(typeName);
    if (type) {
      applyExtensionObject(type, data.extensions);
      if (data.type === "object" || data.type === "interface") {
        for (const [fieldName, fieldData] of Object.entries(data.fields)) {
          const field = type.getFields()[fieldName];
          if (field) {
            applyExtensionObject(field, fieldData.extensions);
            for (const [arg, argData] of Object.entries(fieldData.arguments)) {
              applyExtensionObject(field.args.find((a) => a.name === arg), argData);
            }
          }
        }
      } else if (data.type === "input") {
        for (const [fieldName, fieldData] of Object.entries(data.fields)) {
          const field = type.getFields()[fieldName];
          applyExtensionObject(field, fieldData.extensions);
        }
      } else if (data.type === "enum") {
        for (const [valueName, valueData] of Object.entries(data.values)) {
          const value = type.getValue(valueName);
          applyExtensionObject(value, valueData);
        }
      }
    }
  }
  return schema;
}

// node_modules/.pnpm/@graphql-tools+schema@9.0.2_graphql@16.6.0/node_modules/@graphql-tools/schema/esm/makeExecutableSchema.js
function makeExecutableSchema({ typeDefs, resolvers = {}, resolverValidationOptions = {}, inheritResolversFromInterfaces = false, updateResolversInPlace = false, schemaExtensions, ...otherOptions }) {
  if (typeof resolverValidationOptions !== "object") {
    throw new Error("Expected `resolverValidationOptions` to be an object");
  }
  if (!typeDefs) {
    throw new Error("Must provide typeDefs");
  }
  let schema;
  if (isSchema(typeDefs)) {
    schema = typeDefs;
  } else if (otherOptions === null || otherOptions === void 0 ? void 0 : otherOptions.commentDescriptions) {
    const mergedTypeDefs = mergeTypeDefs(typeDefs, {
      ...otherOptions,
      commentDescriptions: true
    });
    schema = buildSchema(mergedTypeDefs, otherOptions);
  } else {
    const mergedTypeDefs = mergeTypeDefs(typeDefs, otherOptions);
    schema = buildASTSchema(mergedTypeDefs, otherOptions);
  }
  schema = addResolversToSchema({
    schema,
    resolvers: mergeResolvers(resolvers),
    resolverValidationOptions,
    inheritResolversFromInterfaces,
    updateResolversInPlace
  });
  if (Object.keys(resolverValidationOptions).length > 0) {
    assertResolversPresent(schema, resolverValidationOptions);
  }
  if (schemaExtensions) {
    schemaExtensions = mergeExtensions(asArray(schemaExtensions));
    applyExtensions(schema, schemaExtensions);
  }
  return schema;
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/server.js
var crossUndiciFetch = __toESM(require_global_ponyfill(), 1);

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/processRequest.js
async function processRequest({ request, params, enveloped, fetchAPI, onResultProcessHooks }) {
  const document = enveloped.parse(params.query);
  enveloped.validate(enveloped.schema, document);
  const contextValue = await enveloped.contextFactory();
  const executionArgs = {
    schema: enveloped.schema,
    document,
    contextValue,
    variableValues: params.variables,
    operationName: params.operationName
  };
  const operation = getOperationAST(document, params.operationName);
  const executeFn = (operation === null || operation === void 0 ? void 0 : operation.operation) === "subscription" ? enveloped.subscribe : enveloped.execute;
  const result = await executeFn(executionArgs);
  let resultProcessor;
  for (const onResultProcessHook of onResultProcessHooks) {
    await onResultProcessHook({
      request,
      result,
      resultProcessor,
      setResultProcessor(newResultProcessor) {
        resultProcessor = newResultProcessor;
      }
    });
  }
  if (!resultProcessor) {
    return new fetchAPI.Response(null, {
      status: 406,
      statusText: "Not Acceptable"
    });
  }
  return resultProcessor(result, fetchAPI);
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/useCORS.js
function getCORSHeadersByRequestAndOptions(request, corsOptions) {
  var _a2, _b;
  const headers = {};
  if (corsOptions === false) {
    return headers;
  }
  if (corsOptions.origin == null || corsOptions.origin.length === 0 || corsOptions.origin.includes("*")) {
    const currentOrigin = request.headers.get("origin");
    if (currentOrigin != null) {
      headers["Access-Control-Allow-Origin"] = currentOrigin;
      headers["Vary"] = "Origin";
    } else {
      headers["Access-Control-Allow-Origin"] = "*";
    }
  } else if (typeof corsOptions.origin === "string") {
    headers["Access-Control-Allow-Origin"] = corsOptions.origin;
  } else if (Array.isArray(corsOptions.origin)) {
    if (corsOptions.origin.length === 1) {
      headers["Access-Control-Allow-Origin"] = corsOptions.origin[0];
    } else {
      const currentOrigin = request.headers.get("origin");
      if (currentOrigin != null && corsOptions.origin.includes(currentOrigin)) {
        headers["Access-Control-Allow-Origin"] = currentOrigin;
        headers["Vary"] = "Origin";
      } else {
        headers["Access-Control-Allow-Origin"] = "null";
      }
    }
  }
  if ((_a2 = corsOptions.methods) === null || _a2 === void 0 ? void 0 : _a2.length) {
    headers["Access-Control-Allow-Methods"] = corsOptions.methods.join(", ");
  } else {
    const requestMethod = request.headers.get("access-control-request-method");
    if (requestMethod) {
      headers["Access-Control-Allow-Methods"] = requestMethod;
    }
  }
  if ((_b = corsOptions.allowedHeaders) === null || _b === void 0 ? void 0 : _b.length) {
    headers["Access-Control-Allow-Headers"] = corsOptions.allowedHeaders.join(", ");
  } else {
    const requestHeaders = request.headers.get("access-control-request-headers");
    if (requestHeaders) {
      headers["Access-Control-Allow-Headers"] = requestHeaders;
      if (headers["Vary"]) {
        headers["Vary"] += ", Access-Control-Request-Headers";
      }
      headers["Vary"] = "Access-Control-Request-Headers";
    }
  }
  if (corsOptions.credentials != null) {
    if (corsOptions.credentials === true) {
      headers["Access-Control-Allow-Credentials"] = "true";
    }
  } else if (headers["Access-Control-Allow-Origin"] !== "*") {
    headers["Access-Control-Allow-Credentials"] = "true";
  }
  if (corsOptions.exposedHeaders) {
    headers["Access-Control-Expose-Headers"] = corsOptions.exposedHeaders.join(", ");
  }
  if (corsOptions.maxAge) {
    headers["Access-Control-Max-Age"] = corsOptions.maxAge.toString();
  }
  return headers;
}
async function getCORSResponseHeaders(request, corsOptionsFactory, serverContext) {
  const corsOptions = await corsOptionsFactory(request, serverContext);
  return getCORSHeadersByRequestAndOptions(request, corsOptions);
}
function useCORS(options) {
  let corsOptionsFactory = () => ({});
  if (options != null) {
    if (typeof options === "function") {
      corsOptionsFactory = options;
    } else if (typeof options === "object") {
      const corsOptions = {
        ...options
      };
      corsOptionsFactory = () => corsOptions;
    } else if (options === false) {
      corsOptionsFactory = () => false;
    }
  }
  return {
    async onRequest({ request, serverContext, fetchAPI, endResponse }) {
      if (request.method.toUpperCase() === "OPTIONS") {
        const headers = await getCORSResponseHeaders(request, corsOptionsFactory, serverContext);
        const response = new fetchAPI.Response(null, {
          status: 204,
          headers
        });
        endResponse(response);
      }
    },
    async onResponse({ request, serverContext, response }) {
      const headers = await getCORSResponseHeaders(request, corsOptionsFactory, serverContext);
      for (const headerName in headers) {
        response.headers.set(headerName, headers[headerName]);
      }
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/useHealthCheck.js
function useHealthCheck(options) {
  const id = (options === null || options === void 0 ? void 0 : options.id) || Date.now().toString();
  const logger = (options === null || options === void 0 ? void 0 : options.logger) || console;
  return {
    async onRequest({ request, endResponse, fetchAPI }) {
      const requestPath = request.url.split("?")[0];
      if (requestPath.endsWith("/health")) {
        logger.debug(`Responding Health Check`);
        const response = new fetchAPI.Response(JSON.stringify({
          message: "alive"
        }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "x-yoga-id": id
          }
        });
        endResponse(response);
      } else if (requestPath.endsWith("/readiness")) {
        logger.debug(`Responding Readiness Check`);
        const readinessResponse = await fetchAPI.fetch(request.url.replace("/readiness", "/health"));
        const { message } = await readinessResponse.json();
        if (readinessResponse.status === 200 && readinessResponse.headers.get("x-yoga-id") === id && message === "alive") {
          const response = new fetchAPI.Response(JSON.stringify({
            message: "ready"
          }), {
            status: 200,
            headers: {
              "Content-Type": "application/json"
            }
          });
          endResponse(response);
        } else {
          throw createGraphQLError(`Readiness check failed with status ${readinessResponse.status}`);
        }
      }
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/graphiqlHTML.js
var graphiqlHTML_default = '<!DOCTYPE html><html lang=en><head><meta charset=utf-8><title>__TITLE__</title><link rel=icon href=https://www.graphql-yoga.com/favicon.ico><link rel=stylesheet href=https://unpkg.com/@graphql-yoga/graphiql@2.4.2/dist/style.css></head><body id=body class=no-focus-outline><noscript>You need to enable JavaScript to run this app.</noscript><div id=root></div><script type=module>import{renderYogaGraphiQL}from"https://unpkg.com/@graphql-yoga/graphiql@2.4.2/dist/yoga-graphiql.es.js";renderYogaGraphiQL(root,__OPTS__)<\/script></body></html>';

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/useGraphiQL.js
function shouldRenderGraphiQL({ headers, method }) {
  var _a2;
  return method === "GET" && !!((_a2 = headers === null || headers === void 0 ? void 0 : headers.get("accept")) === null || _a2 === void 0 ? void 0 : _a2.includes("text/html"));
}
var renderGraphiQL = (opts) => graphiqlHTML_default.replace("__TITLE__", (opts === null || opts === void 0 ? void 0 : opts.title) || "Yoga GraphiQL").replace("__OPTS__", JSON.stringify(opts !== null && opts !== void 0 ? opts : {}));
function useGraphiQL(config) {
  var _a2, _b;
  const logger = (_a2 = config === null || config === void 0 ? void 0 : config.logger) !== null && _a2 !== void 0 ? _a2 : console;
  let graphiqlOptionsFactory;
  if (typeof (config === null || config === void 0 ? void 0 : config.options) === "function") {
    graphiqlOptionsFactory = config === null || config === void 0 ? void 0 : config.options;
  } else if (typeof (config === null || config === void 0 ? void 0 : config.options) === "object") {
    graphiqlOptionsFactory = () => config === null || config === void 0 ? void 0 : config.options;
  } else if ((config === null || config === void 0 ? void 0 : config.options) === false) {
    graphiqlOptionsFactory = () => false;
  } else {
    graphiqlOptionsFactory = () => ({});
  }
  const renderer = (_b = config === null || config === void 0 ? void 0 : config.render) !== null && _b !== void 0 ? _b : renderGraphiQL;
  return {
    async onRequest({ request, serverContext, fetchAPI, endResponse }) {
      const requestPath = request.url.split("?")[0];
      if ((config === null || config === void 0 ? void 0 : config.endpoint) != null && !requestPath.endsWith(config === null || config === void 0 ? void 0 : config.endpoint)) {
        logger.debug(`Responding 404 Not Found`);
        const response = new fetchAPI.Response(`Unable to ${request.method} ${requestPath}`, {
          status: 404,
          statusText: `Not Found`
        });
        endResponse(response);
      } else if (shouldRenderGraphiQL(request)) {
        logger.debug(`Rendering GraphiQL`);
        const graphiqlOptions = graphiqlOptionsFactory(request, serverContext);
        if (graphiqlOptions) {
          const graphiQLBody = await renderer({
            endpoint: config === null || config === void 0 ? void 0 : config.endpoint,
            ...graphiqlOptions === true ? {} : graphiqlOptions
          });
          const response = new fetchAPI.Response(graphiQLBody, {
            headers: {
              "Content-Type": "text/html"
            },
            status: 200
          });
          endResponse(response);
        }
      }
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/useRequestParser.js
var DEFAULT_MATCHER = () => true;
function useRequestParser(options) {
  const matchFn = options.match || DEFAULT_MATCHER;
  return {
    onRequestParse({ request, setRequestParser }) {
      if (matchFn(request)) {
        setRequestParser(function useRequestParserFn(request2) {
          return options.parse(request2);
        });
      }
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestParser/utils.js
function parseURLSearchParams(requestBody) {
  const searchParams = new URLSearchParams(requestBody);
  const operationName = searchParams.get("operationName") || void 0;
  const query = searchParams.get("query") || void 0;
  const variablesStr = searchParams.get("variables") || void 0;
  const extensionsStr = searchParams.get("extensions") || void 0;
  return {
    operationName,
    query,
    variables: variablesStr ? JSON.parse(variablesStr) : void 0,
    extensions: extensionsStr ? JSON.parse(extensionsStr) : void 0
  };
}
function isContentTypeMatch(request, expectedContentType) {
  const contentType = request.headers.get("content-type");
  return contentType === expectedContentType || !!(contentType === null || contentType === void 0 ? void 0 : contentType.startsWith(`${expectedContentType};`));
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestParser/GET.js
function isGETRequest(request) {
  return request.method === "GET";
}
function parseGETRequest(request) {
  const [, searchParamsStr] = request.url.split("?");
  return parseURLSearchParams(searchParamsStr);
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestParser/POSTJson.js
function isPOSTJsonRequest(request) {
  return request.method === "POST";
}
async function parsePOSTJsonRequest(request) {
  const requestBody = await request.json();
  return {
    operationName: requestBody.operationName,
    query: requestBody.query,
    variables: requestBody.variables,
    extensions: requestBody.extensions
  };
}

// node_modules/.pnpm/dset@3.1.2/node_modules/dset/dist/index.mjs
function dset(obj, keys, val) {
  keys.split && (keys = keys.split("."));
  var i = 0, l = keys.length, t = obj, x, k;
  while (i < l) {
    k = keys[i++];
    if (k === "__proto__" || k === "constructor" || k === "prototype")
      break;
    t = t[k] = i === l ? val : typeof (x = t[k]) === typeof keys ? x : keys[i] * 0 !== 0 || !!~("" + keys[i]).indexOf(".") ? {} : [];
  }
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestParser/POSTMultipart.js
function isPOSTMultipartRequest(request) {
  return request.method === "POST" && isContentTypeMatch(request, "multipart/form-data");
}
async function parsePOSTMultipartRequest(request) {
  var _a2, _b;
  let requestBody;
  try {
    requestBody = await request.formData();
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("File size limit exceeded: ")) {
      throw createGraphQLError(e.message, {
        extensions: {
          http: {
            status: 413
          }
        }
      });
    }
    throw e;
  }
  const operationsStr = ((_a2 = requestBody.get("operations")) === null || _a2 === void 0 ? void 0 : _a2.toString()) || "{}";
  const operations = JSON.parse(operationsStr);
  const mapStr = ((_b = requestBody.get("map")) === null || _b === void 0 ? void 0 : _b.toString()) || "{}";
  const map2 = JSON.parse(mapStr);
  for (const fileIndex in map2) {
    const file = requestBody.get(fileIndex);
    const keys = map2[fileIndex];
    for (const key of keys) {
      dset(operations, key, file);
    }
  }
  return {
    operationName: operations.operationName,
    query: operations.query,
    variables: operations.variables,
    extensions: operations.extensions
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestParser/POSTGraphQLString.js
function isPOSTGraphQLStringRequest(request) {
  return request.method === "POST" && isContentTypeMatch(request, "application/graphql");
}
async function parsePOSTGraphQLStringRequest(request) {
  const requestBody = await request.text();
  return {
    query: requestBody
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/useResultProcessor.js
function useResultProcessor(options) {
  const isMatch = options.match || (() => true);
  return {
    onResultProcess({ request, result, setResultProcessor }) {
      if (isMatch(request, result)) {
        setResultProcessor(options.processResult);
      }
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/encodeString.js
var encodeString;
if (globalThis.Buffer) {
  encodeString = function encodeStringWithBuffer(str) {
    return globalThis.Buffer.from(str, "utf8");
  };
} else {
  const textEncoder = new TextEncoder();
  encodeString = function encodeStringWithTextEncoder(str) {
    return textEncoder.encode(str);
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/resultProcessor/regular.js
function isRegularResult(request, result) {
  return !isAsyncIterable3(result);
}
function processRegularResult(executionResult, fetchAPI) {
  const responseBody = JSON.stringify(executionResult);
  const decodedString = encodeString(responseBody);
  const headersInit = {
    "Content-Type": "application/json",
    "Content-Length": decodedString.byteLength.toString()
  };
  const responseInit = {
    headers: headersInit,
    status: 200
  };
  return new fetchAPI.Response(decodedString, responseInit);
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/resultProcessor/push.js
function isPushResult(request, result) {
  var _a2;
  return isAsyncIterable2(result) && !!((_a2 = request.headers.get("accept")) === null || _a2 === void 0 ? void 0 : _a2.includes("text/event-stream"));
}
function processPushResult(result, fetchAPI) {
  const headersInit = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
    "Content-Encoding": "none"
  };
  const responseInit = {
    headers: headersInit,
    status: 200
  };
  let iterator;
  const readableStream = new fetchAPI.ReadableStream({
    start() {
      iterator = result[Symbol.asyncIterator]();
    },
    async pull(controller) {
      const { done, value } = await iterator.next();
      if (value != null) {
        const chunk = JSON.stringify(value);
        controller.enqueue(encodeString(`data: ${chunk}

`));
      }
      if (done) {
        controller.close();
      }
    },
    async cancel(e) {
      var _a2;
      await ((_a2 = iterator.return) === null || _a2 === void 0 ? void 0 : _a2.call(iterator, e));
    }
  });
  return new fetchAPI.Response(readableStream, responseInit);
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/resultProcessor/multipart.js
function isMultipartResult(request, result) {
  var _a2;
  return isAsyncIterable2(result) && !!((_a2 = request.headers.get("accept")) === null || _a2 === void 0 ? void 0 : _a2.includes("multipart/mixed"));
}
function processMultipartResult(executionPatchResultIterable, fetchAPI) {
  const headersInit = {
    Connection: "keep-alive",
    "Content-Type": 'multipart/mixed; boundary="-"',
    "Transfer-Encoding": "chunked"
  };
  const responseInit = {
    headers: headersInit,
    status: 200
  };
  let iterator;
  const readableStream = new fetchAPI.ReadableStream({
    start(controller) {
      iterator = executionPatchResultIterable[Symbol.asyncIterator]();
      controller.enqueue(encodeString(`---`));
    },
    async pull(controller) {
      const { done, value } = await iterator.next();
      if (value != null) {
        controller.enqueue(encodeString("\r\n"));
        controller.enqueue(encodeString("Content-Type: application/json; charset=utf-8"));
        controller.enqueue(encodeString("\r\n"));
        const chunk = JSON.stringify(value);
        const encodedChunk = encodeString(chunk);
        controller.enqueue(encodeString("Content-Length: " + encodedChunk.byteLength));
        controller.enqueue(encodeString("\r\n"));
        controller.enqueue(encodeString("\r\n"));
        controller.enqueue(encodedChunk);
        controller.enqueue(encodeString("\r\n"));
        controller.enqueue(encodeString("---"));
      }
      if (done) {
        controller.enqueue(encodeString("\r\n-----\r\n"));
        controller.close();
      }
    },
    async cancel(e) {
      var _a2;
      await ((_a2 = iterator.return) === null || _a2 === void 0 ? void 0 : _a2.call(iterator, e));
    }
  });
  return new fetchAPI.Response(readableStream, responseInit);
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestParser/POSTFormUrlEncoded.js
function isPOSTFormUrlEncodedRequest(request) {
  return request.method === "POST" && isContentTypeMatch(request, "application/x-www-form-urlencoded");
}
async function parsePOSTFormUrlEncodedRequest(request) {
  const requestBody = await request.text();
  return parseURLSearchParams(requestBody);
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/GraphQLYogaError.js
function isAggregateError2(obj) {
  return obj != null && typeof obj === "object" && "errors" in obj;
}
function hasToString(obj) {
  return obj != null && typeof obj.toString === "function";
}
function handleError(error, errors = []) {
  if (isAggregateError2(error)) {
    for (const singleError of error.errors) {
      errors.push(...handleError(singleError));
    }
  } else if (error instanceof GraphQLError) {
    errors.push(error);
  } else if (error instanceof Error) {
    errors.push(createGraphQLError(error.message));
  } else if (typeof error === "string") {
    errors.push(createGraphQLError(error));
  } else if (hasToString(error)) {
    errors.push(createGraphQLError(error.toString()));
  } else {
    errors.push(createGraphQLError("Unexpected error!"));
  }
  return errors;
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestValidation/useCheckMethodForGraphQL.js
function useCheckMethodForGraphQL() {
  return {
    onRequest({ request }) {
      if (request.method !== "GET" && request.method !== "POST") {
        throw createGraphQLError("GraphQL only supports GET and POST requests.", {
          extensions: {
            http: {
              status: 405,
              headers: {
                Allow: "GET, POST"
              }
            }
          }
        });
      }
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestValidation/useCheckGraphQLQueryParam.js
function useCheckGraphQLQueryParam() {
  return {
    onRequestParse() {
      return {
        onRequestParseDone({ params }) {
          if (params.query == null) {
            throw createGraphQLError("Must provide query string.", {
              extensions: {
                http: {
                  status: 400,
                  headers: {
                    Allow: "GET, POST"
                  }
                }
              }
            });
          }
          const queryParamType = typeof params.query;
          if (queryParamType !== "string") {
            throw createGraphQLError(`Expected "query" to be "string" but given "${queryParamType}".`, {
              extensions: {
                http: {
                  status: 400,
                  headers: {
                    Allow: "GET, POST"
                  }
                }
              }
            });
          }
        }
      };
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestValidation/useHTTPValidationError.js
function useHTTPValidationError() {
  return {
    onValidate() {
      return ({ valid, result }) => {
        if (!valid) {
          result.forEach((error) => {
            error.extensions.http = {
              status: 400
            };
          });
          throw new AggregateErrorImpl(result);
        }
      };
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/plugins/requestValidation/usePreventMutationViaGET.js
function usePreventMutationViaGET() {
  return {
    onParse() {
      return ({ result, context: { request, operationName } }) => {
        var _a2;
        if (result instanceof Error) {
          if (result instanceof GraphQLError) {
            result.extensions.http = {
              status: 400
            };
          }
          throw result;
        }
        const operation = result ? (_a2 = getOperationAST(result, operationName)) !== null && _a2 !== void 0 ? _a2 : void 0 : void 0;
        if (!operation) {
          throw createGraphQLError("Could not determine what operation to execute.", {
            extensions: {
              http: {
                status: 400
              }
            }
          });
        }
        if (operation.operation === "mutation" && request.method === "GET") {
          throw createGraphQLError("Can only perform a mutation operation from a POST request.", {
            extensions: {
              http: {
                status: 405,
                headers: {
                  Allow: "POST"
                }
              }
            }
          });
        }
      };
    }
  };
}

// node_modules/.pnpm/@graphql-yoga+common@2.12.10_graphql@16.6.0/node_modules/@graphql-yoga/common/esm/server.js
function getDefaultSchema() {
  return makeExecutableSchema({
    typeDefs: `
      """
      Greetings from GraphQL Yoga!
      """
      type Query {
        greetings: String
      }
      type Subscription {
        """
        Current Time
        """
        time: String
      }
    `,
    resolvers: {
      Query: {
        greetings: () => "This is the `greetings` field of the root `Query` type"
      },
      Subscription: {
        time: {
          async *subscribe() {
            while (true) {
              yield { time: new Date().toISOString() };
              await new Promise((resolve) => setTimeout(resolve, 1e3));
            }
          }
        }
      }
    }
  });
}
var YogaServer = class {
  constructor(options) {
    var _a2, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    this.handleRequest = async (request, ...args) => {
      const response = await this.getResponse(request, ...args);
      for (const onResponseHook of this.onResponseHooks) {
        await onResponseHook({
          request,
          response,
          serverContext: args[0]
        });
      }
      return response;
    };
    this.fetch = (input, init) => {
      let request;
      if (typeof input === "string") {
        request = new this.fetchAPI.Request(input, init);
      } else {
        request = input;
      }
      return this.handleRequest(request, init);
    };
    this.fetchEventListener = (event) => event.respondWith(this.handleRequest(event.request, event));
    this.id = (_a2 = options === null || options === void 0 ? void 0 : options.id) !== null && _a2 !== void 0 ? _a2 : "yoga";
    this.fetchAPI = {
      Request: (_c = (_b = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _b === void 0 ? void 0 : _b.Request) !== null && _c !== void 0 ? _c : crossUndiciFetch.Request,
      Response: (_e = (_d = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _d === void 0 ? void 0 : _d.Response) !== null && _e !== void 0 ? _e : crossUndiciFetch.Response,
      fetch: (_g = (_f = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _f === void 0 ? void 0 : _f.fetch) !== null && _g !== void 0 ? _g : crossUndiciFetch.fetch,
      ReadableStream: (_j = (_h = options === null || options === void 0 ? void 0 : options.fetchAPI) === null || _h === void 0 ? void 0 : _h.ReadableStream) !== null && _j !== void 0 ? _j : crossUndiciFetch.ReadableStream
    };
    const schema = (options === null || options === void 0 ? void 0 : options.schema) ? isSchema(options.schema) ? options.schema : makeExecutableSchema({
      typeDefs: options.schema.typeDefs,
      resolvers: options.schema.resolvers
    }) : getDefaultSchema();
    const logger = (options === null || options === void 0 ? void 0 : options.logging) != null ? options.logging : true;
    this.logger = typeof logger === "boolean" ? logger === true ? defaultYogaLogger : {
      debug: () => {
      },
      error: () => {
      },
      warn: () => {
      },
      info: () => {
      }
    } : logger;
    const maskedErrors = (_k = options === null || options === void 0 ? void 0 : options.maskedErrors) !== null && _k !== void 0 ? _k : true;
    const server2 = this;
    this.endpoint = options === null || options === void 0 ? void 0 : options.endpoint;
    this.plugins = [
      enableIf(schema != null, useSchema(schema)),
      enableIf((options === null || options === void 0 ? void 0 : options.parserCache) !== false, () => useParserCache(typeof (options === null || options === void 0 ? void 0 : options.parserCache) === "object" ? options === null || options === void 0 ? void 0 : options.parserCache : void 0)),
      enableIf((options === null || options === void 0 ? void 0 : options.validationCache) !== false, () => useValidationCache({
        cache: typeof (options === null || options === void 0 ? void 0 : options.validationCache) === "object" ? options === null || options === void 0 ? void 0 : options.validationCache : void 0
      })),
      enableIf(logger !== false, useLogger({
        skipIntrospection: true,
        logFn: (eventName, events) => {
          switch (eventName) {
            case "execute-start":
            case "subscribe-start":
              this.logger.debug(titleBold("Execution start"));
              const { query, operationName, variables, extensions } = events.args.contextValue;
              this.logger.debug(titleBold("Received GraphQL operation:"));
              this.logger.debug({
                query,
                operationName,
                variables,
                extensions
              });
              break;
            case "execute-end":
            case "subscribe-end":
              this.logger.debug(titleBold("Execution end"));
              this.logger.debug({
                result: events.result
              });
              break;
          }
        }
      })),
      enableIf((options === null || options === void 0 ? void 0 : options.context) != null, useExtendContext(async (initialContext) => {
        if (options === null || options === void 0 ? void 0 : options.context) {
          if (typeof options.context === "function") {
            return options.context(initialContext);
          }
          return options.context;
        }
      })),
      useHealthCheck({
        id: this.id,
        logger: this.logger
      }),
      enableIf((options === null || options === void 0 ? void 0 : options.graphiql) !== false, () => useGraphiQL({
        get endpoint() {
          return server2.endpoint;
        },
        options: options === null || options === void 0 ? void 0 : options.graphiql,
        render: options === null || options === void 0 ? void 0 : options.renderGraphiQL,
        logger: this.logger
      })),
      enableIf((options === null || options === void 0 ? void 0 : options.cors) !== false, () => useCORS(options === null || options === void 0 ? void 0 : options.cors)),
      useCheckMethodForGraphQL(),
      useRequestParser({
        match: isGETRequest,
        parse: parseGETRequest
      }),
      useRequestParser({
        match: isPOSTJsonRequest,
        parse: parsePOSTJsonRequest
      }),
      enableIf((options === null || options === void 0 ? void 0 : options.multipart) !== false, () => useRequestParser({
        match: isPOSTMultipartRequest,
        parse: parsePOSTMultipartRequest
      })),
      useRequestParser({
        match: isPOSTGraphQLStringRequest,
        parse: parsePOSTGraphQLStringRequest
      }),
      useRequestParser({
        match: isPOSTFormUrlEncodedRequest,
        parse: parsePOSTFormUrlEncodedRequest
      }),
      useResultProcessor({
        match: isRegularResult,
        processResult: processRegularResult
      }),
      useResultProcessor({
        match: isPushResult,
        processResult: processPushResult
      }),
      useResultProcessor({
        match: isMultipartResult,
        processResult: processMultipartResult
      }),
      ...(_l = options === null || options === void 0 ? void 0 : options.plugins) !== null && _l !== void 0 ? _l : [],
      useCheckGraphQLQueryParam(),
      {
        onPluginInit({ addPlugin }) {
          addPlugin(
            usePreventMutationViaGET()
          );
          if (!!maskedErrors) {
            addPlugin(useMaskedErrors(typeof maskedErrors === "object" ? maskedErrors : void 0));
          }
          addPlugin(
            useHTTPValidationError()
          );
        }
      }
    ];
    this.getEnveloped = envelop({
      plugins: this.plugins
    });
    this.onRequestHooks = [];
    this.onRequestParseHooks = [];
    this.onResultProcessHooks = [];
    this.onResponseHooks = [];
    for (const plugin of this.plugins) {
      if (plugin) {
        if (plugin.onRequestParse) {
          this.onRequestParseHooks.push(plugin.onRequestParse);
        }
        if (plugin.onRequest) {
          this.onRequestHooks.push(plugin.onRequest);
        }
        if (plugin.onResultProcess) {
          this.onResultProcessHooks.push(plugin.onResultProcess);
        }
        if (plugin.onResponse) {
          this.onResponseHooks.push(plugin.onResponse);
        }
      }
    }
  }
  async getResponse(request, ...args) {
    var _a2, _b;
    const serverContext = args[0];
    try {
      for (const onRequestHook of this.onRequestHooks) {
        let response;
        await onRequestHook({
          request,
          serverContext,
          fetchAPI: this.fetchAPI,
          endResponse(newResponse) {
            response = newResponse;
          }
        });
        if (response) {
          return response;
        }
      }
      let requestParser;
      const onRequestParseDoneList = [];
      for (const onRequestParse of this.onRequestParseHooks) {
        const onRequestParseResult = await onRequestParse({
          request,
          requestParser,
          setRequestParser(parser) {
            requestParser = parser;
          }
        });
        if ((onRequestParseResult === null || onRequestParseResult === void 0 ? void 0 : onRequestParseResult.onRequestParseDone) != null) {
          onRequestParseDoneList.push(onRequestParseResult.onRequestParseDone);
        }
      }
      this.logger.debug(`Parsing request to extract GraphQL parameters`);
      if (!requestParser) {
        return new this.fetchAPI.Response("Request is not valid", {
          status: 400,
          statusText: "Bad Request"
        });
      }
      let params = await requestParser(request);
      for (const onRequestParseDone of onRequestParseDoneList) {
        await onRequestParseDone({
          params,
          setParams(newParams) {
            params = newParams;
          }
        });
      }
      const initialContext = {
        request,
        ...params,
        ...serverContext
      };
      const enveloped = this.getEnveloped(initialContext);
      this.logger.debug(`Processing GraphQL Parameters`);
      const result = await processRequest({
        request,
        params,
        enveloped,
        fetchAPI: this.fetchAPI,
        onResultProcessHooks: this.onResultProcessHooks
      });
      return result;
    } catch (error) {
      const finalResponseInit = {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      };
      const errors = handleError(error);
      for (const error2 of errors) {
        if ((_a2 = error2.extensions) === null || _a2 === void 0 ? void 0 : _a2.http) {
          if (error2.extensions.http.status && ((_b = error2.extensions) === null || _b === void 0 ? void 0 : _b.http.status) > finalResponseInit.status) {
            finalResponseInit.status = error2.extensions.http.status;
          }
          if (error2.extensions.http.headers) {
            Object.assign(finalResponseInit.headers, error2.extensions.http.headers);
          }
          error2.extensions.http = void 0;
        }
      }
      const payload = {
        data: null,
        errors
      };
      const decodedString = encodeString(JSON.stringify(payload));
      finalResponseInit.headers["Content-Length"] = decodedString.byteLength.toString();
      return new this.fetchAPI.Response(decodedString, finalResponseInit);
    }
  }
  async inject({ document, variables, operationName, headers, serverContext }) {
    const request = new this.fetchAPI.Request("http://localhost/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      body: JSON.stringify({
        query: document && (typeof document === "string" ? document : print(document)),
        variables,
        operationName
      })
    });
    const response = await this.handleRequest(request, serverContext);
    let executionResult = null;
    if (response.headers.get("content-type") === "application/json") {
      executionResult = await response.json();
    }
    return {
      response,
      executionResult
    };
  }
  start() {
    self.addEventListener("fetch", this.fetchEventListener);
  }
  stop() {
    self.removeEventListener("fetch", this.fetchEventListener);
  }
};
function createServer(options) {
  const server2 = new YogaServer(options);
  const fnHandler = (input, ctx) => {
    if (input.request) {
      return server2.handleRequest(input.request, input);
    }
    return server2.handleRequest(input, ctx);
  };
  return new Proxy(server2, {
    has: (_, prop) => {
      return prop in fnHandler || prop in server2;
    },
    get: (_, prop) => {
      if (server2[prop]) {
        if (server2[prop].bind) {
          return server2[prop].bind(server2);
        }
        return server2[prop];
      }
      if (fnHandler[prop]) {
        if (fnHandler[prop].bind) {
          return fnHandler[prop].bind(fnHandler);
        }
        return fnHandler[prop];
      }
    },
    apply(_, __, [input, ctx]) {
      return fnHandler(input, ctx);
    }
  });
}

// node_modules/.pnpm/@repeaterjs+repeater@3.0.4/node_modules/@repeaterjs/repeater/repeater.js
var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
    d2.__proto__ = b2;
  } || function(d2, b2) {
    for (var p in b2)
      if (b2.hasOwnProperty(p))
        d2[p] = b2[p];
  };
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject2) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject2(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject2(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m)
    return m.call(o);
  if (o && typeof o.length === "number")
    return {
      next: function() {
        if (o && i >= o.length)
          o = void 0;
        return { value: o && o[i++], done: !o };
      }
    };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
    return this;
  }, i;
  function verb(n) {
    if (g[n])
      i[n] = function(v) {
        return new Promise(function(a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject2) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject2(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if (f(v), q.shift(), q.length)
      resume(q[0][0], q[0][1]);
  }
}
var RepeaterOverflowError = function(_super) {
  __extends(RepeaterOverflowError2, _super);
  function RepeaterOverflowError2(message) {
    var _this = _super.call(this, message) || this;
    Object.defineProperty(_this, "name", {
      value: "RepeaterOverflowError",
      enumerable: false
    });
    if (typeof Object.setPrototypeOf === "function") {
      Object.setPrototypeOf(_this, _this.constructor.prototype);
    } else {
      _this.__proto__ = _this.constructor.prototype;
    }
    if (typeof Error.captureStackTrace === "function") {
      Error.captureStackTrace(_this, _this.constructor);
    }
    return _this;
  }
  return RepeaterOverflowError2;
}(Error);
var FixedBuffer = function() {
  function FixedBuffer2(capacity) {
    if (capacity < 0) {
      throw new RangeError("Capacity may not be less than 0");
    }
    this._c = capacity;
    this._q = [];
  }
  Object.defineProperty(FixedBuffer2.prototype, "empty", {
    get: function() {
      return this._q.length === 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FixedBuffer2.prototype, "full", {
    get: function() {
      return this._q.length >= this._c;
    },
    enumerable: false,
    configurable: true
  });
  FixedBuffer2.prototype.add = function(value) {
    if (this.full) {
      throw new Error("Buffer full");
    } else {
      this._q.push(value);
    }
  };
  FixedBuffer2.prototype.remove = function() {
    if (this.empty) {
      throw new Error("Buffer empty");
    }
    return this._q.shift();
  };
  return FixedBuffer2;
}();
var SlidingBuffer = function() {
  function SlidingBuffer2(capacity) {
    if (capacity < 1) {
      throw new RangeError("Capacity may not be less than 1");
    }
    this._c = capacity;
    this._q = [];
  }
  Object.defineProperty(SlidingBuffer2.prototype, "empty", {
    get: function() {
      return this._q.length === 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SlidingBuffer2.prototype, "full", {
    get: function() {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  SlidingBuffer2.prototype.add = function(value) {
    while (this._q.length >= this._c) {
      this._q.shift();
    }
    this._q.push(value);
  };
  SlidingBuffer2.prototype.remove = function() {
    if (this.empty) {
      throw new Error("Buffer empty");
    }
    return this._q.shift();
  };
  return SlidingBuffer2;
}();
var DroppingBuffer = function() {
  function DroppingBuffer2(capacity) {
    if (capacity < 1) {
      throw new RangeError("Capacity may not be less than 1");
    }
    this._c = capacity;
    this._q = [];
  }
  Object.defineProperty(DroppingBuffer2.prototype, "empty", {
    get: function() {
      return this._q.length === 0;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(DroppingBuffer2.prototype, "full", {
    get: function() {
      return false;
    },
    enumerable: false,
    configurable: true
  });
  DroppingBuffer2.prototype.add = function(value) {
    if (this._q.length < this._c) {
      this._q.push(value);
    }
  };
  DroppingBuffer2.prototype.remove = function() {
    if (this.empty) {
      throw new Error("Buffer empty");
    }
    return this._q.shift();
  };
  return DroppingBuffer2;
}();
function swallow(value) {
  if (value != null && typeof value.then === "function") {
    value.then(NOOP, NOOP);
  }
}
var Initial = 0;
var Started = 1;
var Stopped = 2;
var Done = 3;
var Rejected = 4;
var MAX_QUEUE_LENGTH = 1024;
var NOOP = function() {
};
function consumeExecution(r) {
  var err = r.err;
  var execution = Promise.resolve(r.execution).then(function(value) {
    if (err != null) {
      throw err;
    }
    return value;
  });
  r.err = void 0;
  r.execution = execution.then(function() {
    return void 0;
  }, function() {
    return void 0;
  });
  return r.pending === void 0 ? execution : r.pending.then(function() {
    return execution;
  });
}
function createIteration(r, value) {
  var done = r.state >= Done;
  return Promise.resolve(value).then(function(value2) {
    if (!done && r.state >= Rejected) {
      return consumeExecution(r).then(function(value3) {
        return {
          value: value3,
          done: true
        };
      });
    }
    return { value: value2, done };
  });
}
function stop(r, err) {
  var e_1, _a2;
  if (r.state >= Stopped) {
    return;
  }
  r.state = Stopped;
  r.onnext();
  r.onstop();
  if (r.err == null) {
    r.err = err;
  }
  if (r.pushes.length === 0 && (typeof r.buffer === "undefined" || r.buffer.empty)) {
    finish(r);
  } else {
    try {
      for (var _b = __values(r.pushes), _d = _b.next(); !_d.done; _d = _b.next()) {
        var push_1 = _d.value;
        push_1.resolve();
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 };
    } finally {
      try {
        if (_d && !_d.done && (_a2 = _b.return))
          _a2.call(_b);
      } finally {
        if (e_1)
          throw e_1.error;
      }
    }
  }
}
function finish(r) {
  var e_2, _a2;
  if (r.state >= Done) {
    return;
  }
  if (r.state < Stopped) {
    stop(r);
  }
  r.state = Done;
  r.buffer = void 0;
  try {
    for (var _b = __values(r.nexts), _d = _b.next(); !_d.done; _d = _b.next()) {
      var next = _d.value;
      var execution = r.pending === void 0 ? consumeExecution(r) : r.pending.then(function() {
        return consumeExecution(r);
      });
      next.resolve(createIteration(r, execution));
    }
  } catch (e_2_1) {
    e_2 = { error: e_2_1 };
  } finally {
    try {
      if (_d && !_d.done && (_a2 = _b.return))
        _a2.call(_b);
    } finally {
      if (e_2)
        throw e_2.error;
    }
  }
  r.pushes = [];
  r.nexts = [];
}
function reject(r) {
  if (r.state >= Rejected) {
    return;
  }
  if (r.state < Done) {
    finish(r);
  }
  r.state = Rejected;
}
function push(r, value) {
  swallow(value);
  if (r.pushes.length >= MAX_QUEUE_LENGTH) {
    throw new RepeaterOverflowError("No more than " + MAX_QUEUE_LENGTH + " pending calls to push are allowed on a single repeater.");
  } else if (r.state >= Stopped) {
    return Promise.resolve(void 0);
  }
  var valueP = r.pending === void 0 ? Promise.resolve(value) : r.pending.then(function() {
    return value;
  });
  valueP = valueP.catch(function(err) {
    if (r.state < Stopped) {
      r.err = err;
    }
    reject(r);
    return void 0;
  });
  var nextP;
  if (r.nexts.length) {
    var next_1 = r.nexts.shift();
    next_1.resolve(createIteration(r, valueP));
    if (r.nexts.length) {
      nextP = Promise.resolve(r.nexts[0].value);
    } else {
      nextP = new Promise(function(resolve) {
        return r.onnext = resolve;
      });
    }
  } else if (typeof r.buffer !== "undefined" && !r.buffer.full) {
    r.buffer.add(valueP);
    nextP = Promise.resolve(void 0);
  } else {
    nextP = new Promise(function(resolve) {
      return r.pushes.push({ resolve, value: valueP });
    });
  }
  var floating = true;
  var next = {};
  var unhandled = nextP.catch(function(err) {
    if (floating) {
      throw err;
    }
    return void 0;
  });
  next.then = function(onfulfilled, onrejected) {
    floating = false;
    return Promise.prototype.then.call(nextP, onfulfilled, onrejected);
  };
  next.catch = function(onrejected) {
    floating = false;
    return Promise.prototype.catch.call(nextP, onrejected);
  };
  next.finally = nextP.finally.bind(nextP);
  r.pending = valueP.then(function() {
    return unhandled;
  }).catch(function(err) {
    r.err = err;
    reject(r);
  });
  return next;
}
function createStop(r) {
  var stop1 = stop.bind(null, r);
  var stopP = new Promise(function(resolve) {
    return r.onstop = resolve;
  });
  stop1.then = stopP.then.bind(stopP);
  stop1.catch = stopP.catch.bind(stopP);
  stop1.finally = stopP.finally.bind(stopP);
  return stop1;
}
function execute2(r) {
  if (r.state >= Started) {
    return;
  }
  r.state = Started;
  var push1 = push.bind(null, r);
  var stop1 = createStop(r);
  r.execution = new Promise(function(resolve) {
    return resolve(r.executor(push1, stop1));
  });
  r.execution.catch(function() {
    return stop(r);
  });
}
var records = /* @__PURE__ */ new WeakMap();
var Repeater = function() {
  function Repeater2(executor, buffer) {
    records.set(this, {
      executor,
      buffer,
      err: void 0,
      state: Initial,
      pushes: [],
      nexts: [],
      pending: void 0,
      execution: void 0,
      onnext: NOOP,
      onstop: NOOP
    });
  }
  Repeater2.prototype.next = function(value) {
    swallow(value);
    var r = records.get(this);
    if (r === void 0) {
      throw new Error("WeakMap error");
    }
    if (r.nexts.length >= MAX_QUEUE_LENGTH) {
      throw new RepeaterOverflowError("No more than " + MAX_QUEUE_LENGTH + " pending calls to next are allowed on a single repeater.");
    }
    if (r.state <= Initial) {
      execute2(r);
    }
    r.onnext(value);
    if (typeof r.buffer !== "undefined" && !r.buffer.empty) {
      var result = createIteration(r, r.buffer.remove());
      if (r.pushes.length) {
        var push_2 = r.pushes.shift();
        r.buffer.add(push_2.value);
        r.onnext = push_2.resolve;
      }
      return result;
    } else if (r.pushes.length) {
      var push_3 = r.pushes.shift();
      r.onnext = push_3.resolve;
      return createIteration(r, push_3.value);
    } else if (r.state >= Stopped) {
      finish(r);
      return createIteration(r, consumeExecution(r));
    }
    return new Promise(function(resolve) {
      return r.nexts.push({ resolve, value });
    });
  };
  Repeater2.prototype.return = function(value) {
    swallow(value);
    var r = records.get(this);
    if (r === void 0) {
      throw new Error("WeakMap error");
    }
    finish(r);
    r.execution = Promise.resolve(r.execution).then(function() {
      return value;
    });
    return createIteration(r, consumeExecution(r));
  };
  Repeater2.prototype.throw = function(err) {
    var r = records.get(this);
    if (r === void 0) {
      throw new Error("WeakMap error");
    }
    if (r.state <= Initial || r.state >= Stopped || typeof r.buffer !== "undefined" && !r.buffer.empty) {
      finish(r);
      if (r.err == null) {
        r.err = err;
      }
      return createIteration(r, consumeExecution(r));
    }
    return this.next(Promise.reject(err));
  };
  Repeater2.prototype[Symbol.asyncIterator] = function() {
    return this;
  };
  Repeater2.race = race;
  Repeater2.merge = merge;
  Repeater2.zip = zip;
  Repeater2.latest = latest;
  return Repeater2;
}();
function getIterators(values, options) {
  var e_3, _a2;
  var iters = [];
  var _loop_1 = function(value2) {
    if (value2 != null && typeof value2[Symbol.asyncIterator] === "function") {
      iters.push(value2[Symbol.asyncIterator]());
    } else if (value2 != null && typeof value2[Symbol.iterator] === "function") {
      iters.push(value2[Symbol.iterator]());
    } else {
      iters.push(function valueToAsyncIterator() {
        return __asyncGenerator(this, arguments, function valueToAsyncIterator_1() {
          return __generator(this, function(_a3) {
            switch (_a3.label) {
              case 0:
                if (!options.yieldValues)
                  return [3, 3];
                return [4, __await(value2)];
              case 1:
                return [4, _a3.sent()];
              case 2:
                _a3.sent();
                _a3.label = 3;
              case 3:
                if (!options.returnValues)
                  return [3, 5];
                return [4, __await(value2)];
              case 4:
                return [2, _a3.sent()];
              case 5:
                return [2];
            }
          });
        });
      }());
    }
  };
  try {
    for (var values_1 = __values(values), values_1_1 = values_1.next(); !values_1_1.done; values_1_1 = values_1.next()) {
      var value = values_1_1.value;
      _loop_1(value);
    }
  } catch (e_3_1) {
    e_3 = { error: e_3_1 };
  } finally {
    try {
      if (values_1_1 && !values_1_1.done && (_a2 = values_1.return))
        _a2.call(values_1);
    } finally {
      if (e_3)
        throw e_3.error;
    }
  }
  return iters;
}
function race(contenders) {
  var _this = this;
  var iters = getIterators(contenders, { returnValues: true });
  return new Repeater(function(push2, stop2) {
    return __awaiter(_this, void 0, void 0, function() {
      var advance, stopped, finalIteration, iteration, i_1, _loop_2;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!iters.length) {
              stop2();
              return [2];
            }
            stopped = false;
            stop2.then(function() {
              advance();
              stopped = true;
            });
            _a2.label = 1;
          case 1:
            _a2.trys.push([1, , 5, 7]);
            iteration = void 0;
            i_1 = 0;
            _loop_2 = function() {
              var j, iters_1, iters_1_1, iter;
              var e_4, _a3;
              return __generator(this, function(_b) {
                switch (_b.label) {
                  case 0:
                    j = i_1;
                    try {
                      for (iters_1 = (e_4 = void 0, __values(iters)), iters_1_1 = iters_1.next(); !iters_1_1.done; iters_1_1 = iters_1.next()) {
                        iter = iters_1_1.value;
                        Promise.resolve(iter.next()).then(function(iteration2) {
                          if (iteration2.done) {
                            stop2();
                            if (finalIteration === void 0) {
                              finalIteration = iteration2;
                            }
                          } else if (i_1 === j) {
                            i_1++;
                            advance(iteration2);
                          }
                        }, function(err) {
                          return stop2(err);
                        });
                      }
                    } catch (e_4_1) {
                      e_4 = { error: e_4_1 };
                    } finally {
                      try {
                        if (iters_1_1 && !iters_1_1.done && (_a3 = iters_1.return))
                          _a3.call(iters_1);
                      } finally {
                        if (e_4)
                          throw e_4.error;
                      }
                    }
                    return [4, new Promise(function(resolve) {
                      return advance = resolve;
                    })];
                  case 1:
                    iteration = _b.sent();
                    if (!(iteration !== void 0))
                      return [3, 3];
                    return [4, push2(iteration.value)];
                  case 2:
                    _b.sent();
                    _b.label = 3;
                  case 3:
                    return [2];
                }
              });
            };
            _a2.label = 2;
          case 2:
            if (!!stopped)
              return [3, 4];
            return [5, _loop_2()];
          case 3:
            _a2.sent();
            return [3, 2];
          case 4:
            return [2, finalIteration && finalIteration.value];
          case 5:
            stop2();
            return [4, Promise.race(iters.map(function(iter) {
              return iter.return && iter.return();
            }))];
          case 6:
            _a2.sent();
            return [7];
          case 7:
            return [2];
        }
      });
    });
  });
}
function merge(contenders) {
  var _this = this;
  var iters = getIterators(contenders, { yieldValues: true });
  return new Repeater(function(push2, stop2) {
    return __awaiter(_this, void 0, void 0, function() {
      var advances, stopped, finalIteration;
      var _this2 = this;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!iters.length) {
              stop2();
              return [2];
            }
            advances = [];
            stopped = false;
            stop2.then(function() {
              var e_5, _a3;
              stopped = true;
              try {
                for (var advances_1 = __values(advances), advances_1_1 = advances_1.next(); !advances_1_1.done; advances_1_1 = advances_1.next()) {
                  var advance = advances_1_1.value;
                  advance();
                }
              } catch (e_5_1) {
                e_5 = { error: e_5_1 };
              } finally {
                try {
                  if (advances_1_1 && !advances_1_1.done && (_a3 = advances_1.return))
                    _a3.call(advances_1);
                } finally {
                  if (e_5)
                    throw e_5.error;
                }
              }
            });
            _a2.label = 1;
          case 1:
            _a2.trys.push([1, , 3, 4]);
            return [4, Promise.all(iters.map(function(iter, i) {
              return __awaiter(_this2, void 0, void 0, function() {
                var iteration, _a3;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                    case 0:
                      _b.trys.push([0, , 6, 9]);
                      _b.label = 1;
                    case 1:
                      if (!!stopped)
                        return [3, 5];
                      Promise.resolve(iter.next()).then(function(iteration2) {
                        return advances[i](iteration2);
                      }, function(err) {
                        return stop2(err);
                      });
                      return [4, new Promise(function(resolve) {
                        advances[i] = resolve;
                      })];
                    case 2:
                      iteration = _b.sent();
                      if (!(iteration !== void 0))
                        return [3, 4];
                      if (iteration.done) {
                        finalIteration = iteration;
                        return [2];
                      }
                      return [4, push2(iteration.value)];
                    case 3:
                      _b.sent();
                      _b.label = 4;
                    case 4:
                      return [3, 1];
                    case 5:
                      return [3, 9];
                    case 6:
                      _a3 = iter.return;
                      if (!_a3)
                        return [3, 8];
                      return [4, iter.return()];
                    case 7:
                      _a3 = _b.sent();
                      _b.label = 8;
                    case 8:
                      return [7];
                    case 9:
                      return [2];
                  }
                });
              });
            }))];
          case 2:
            _a2.sent();
            return [2, finalIteration && finalIteration.value];
          case 3:
            stop2();
            return [7];
          case 4:
            return [2];
        }
      });
    });
  });
}
function zip(contenders) {
  var _this = this;
  var iters = getIterators(contenders, { returnValues: true });
  return new Repeater(function(push2, stop2) {
    return __awaiter(_this, void 0, void 0, function() {
      var advance, stopped, iterations, values;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!iters.length) {
              stop2();
              return [2, []];
            }
            stopped = false;
            stop2.then(function() {
              advance();
              stopped = true;
            });
            _a2.label = 1;
          case 1:
            _a2.trys.push([1, , 6, 8]);
            _a2.label = 2;
          case 2:
            if (!!stopped)
              return [3, 5];
            Promise.all(iters.map(function(iter) {
              return iter.next();
            })).then(function(iterations2) {
              return advance(iterations2);
            }, function(err) {
              return stop2(err);
            });
            return [4, new Promise(function(resolve) {
              return advance = resolve;
            })];
          case 3:
            iterations = _a2.sent();
            if (iterations === void 0) {
              return [2];
            }
            values = iterations.map(function(iteration) {
              return iteration.value;
            });
            if (iterations.some(function(iteration) {
              return iteration.done;
            })) {
              return [2, values];
            }
            return [4, push2(values)];
          case 4:
            _a2.sent();
            return [3, 2];
          case 5:
            return [3, 8];
          case 6:
            stop2();
            return [4, Promise.all(iters.map(function(iter) {
              return iter.return && iter.return();
            }))];
          case 7:
            _a2.sent();
            return [7];
          case 8:
            return [2];
        }
      });
    });
  });
}
function latest(contenders) {
  var _this = this;
  var iters = getIterators(contenders, {
    yieldValues: true,
    returnValues: true
  });
  return new Repeater(function(push2, stop2) {
    return __awaiter(_this, void 0, void 0, function() {
      var advance, advances, stopped, iterations_1, values_2;
      var _this2 = this;
      return __generator(this, function(_a2) {
        switch (_a2.label) {
          case 0:
            if (!iters.length) {
              stop2();
              return [2, []];
            }
            advances = [];
            stopped = false;
            stop2.then(function() {
              var e_6, _a3;
              advance();
              try {
                for (var advances_2 = __values(advances), advances_2_1 = advances_2.next(); !advances_2_1.done; advances_2_1 = advances_2.next()) {
                  var advance1 = advances_2_1.value;
                  advance1();
                }
              } catch (e_6_1) {
                e_6 = { error: e_6_1 };
              } finally {
                try {
                  if (advances_2_1 && !advances_2_1.done && (_a3 = advances_2.return))
                    _a3.call(advances_2);
                } finally {
                  if (e_6)
                    throw e_6.error;
                }
              }
              stopped = true;
            });
            _a2.label = 1;
          case 1:
            _a2.trys.push([1, , 5, 7]);
            Promise.all(iters.map(function(iter) {
              return iter.next();
            })).then(function(iterations) {
              return advance(iterations);
            }, function(err) {
              return stop2(err);
            });
            return [4, new Promise(function(resolve) {
              return advance = resolve;
            })];
          case 2:
            iterations_1 = _a2.sent();
            if (iterations_1 === void 0) {
              return [2];
            }
            values_2 = iterations_1.map(function(iteration) {
              return iteration.value;
            });
            if (iterations_1.every(function(iteration) {
              return iteration.done;
            })) {
              return [2, values_2];
            }
            return [4, push2(values_2.slice())];
          case 3:
            _a2.sent();
            return [4, Promise.all(iters.map(function(iter, i) {
              return __awaiter(_this2, void 0, void 0, function() {
                var iteration;
                return __generator(this, function(_a3) {
                  switch (_a3.label) {
                    case 0:
                      if (iterations_1[i].done) {
                        return [2, iterations_1[i].value];
                      }
                      _a3.label = 1;
                    case 1:
                      if (!!stopped)
                        return [3, 4];
                      Promise.resolve(iter.next()).then(function(iteration2) {
                        return advances[i](iteration2);
                      }, function(err) {
                        return stop2(err);
                      });
                      return [4, new Promise(function(resolve) {
                        return advances[i] = resolve;
                      })];
                    case 2:
                      iteration = _a3.sent();
                      if (iteration === void 0) {
                        return [2, iterations_1[i].value];
                      } else if (iteration.done) {
                        return [2, iteration.value];
                      }
                      values_2[i] = iteration.value;
                      return [4, push2(values_2.slice())];
                    case 3:
                      _a3.sent();
                      return [3, 1];
                    case 4:
                      return [2];
                  }
                });
              });
            }))];
          case 4:
            return [2, _a2.sent()];
          case 5:
            stop2();
            return [4, Promise.all(iters.map(function(iter) {
              return iter.return && iter.return();
            }))];
          case 6:
            _a2.sent();
            return [7];
          case 7:
            return [2];
        }
      });
    });
  });
}

// index.js
var server = createServer({
  schema: {
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello from Yoga!"
      }
    }
  }
});
var worker_default = {
  fetch(request) {
    return server.handleRequest(request);
  }
};
export {
  worker_default as default
};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
//# sourceMappingURL=index.js.map
