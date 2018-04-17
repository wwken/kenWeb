/*!
 *
 * MediaElement.js
 * HTML5 <video> and <audio> shim and player
 * http://mediaelementjs.com/
 *
 * Creates a JavaScript object that mimics HTML5 MediaElement API
 * for browsers that don't understand HTML5 or can't play the provided codec
 * Can play MP4 (H.264), Ogg, WebM, FLV, WMV, WMA, ACC, and MP3
 *
 * Copyright 2010-2014, John Dyer (http://j.hn)
 * License: MIT
 *
 */
var mejs = mejs || {};
(mejs.version = '2.22.0'),
  (mejs.meIndex = 0),
  (mejs.plugins = {
    silverlight: [
      {
        version: [3, 0],
        types: [
          'video/mp4',
          'video/m4v',
          'video/mov',
          'video/wmv',
          'audio/wma',
          'audio/m4a',
          'audio/mp3',
          'audio/wav',
          'audio/mpeg',
        ],
      },
    ],
    flash: [
      {
        version: [9, 0, 124],
        types: [
          'video/mp4',
          'video/m4v',
          'video/mov',
          'video/flv',
          'video/rtmp',
          'video/x-flv',
          'audio/flv',
          'audio/x-flv',
          'audio/mp3',
          'audio/m4a',
          'audio/mpeg',
          'video/dailymotion',
          'video/x-dailymotion',
          'application/x-mpegURL',
        ],
      },
    ],
    youtube: [
      {
        version: null,
        types: [
          'video/youtube',
          'video/x-youtube',
          'audio/youtube',
          'audio/x-youtube',
        ],
      },
    ],
    vimeo: [{ version: null, types: ['video/vimeo', 'video/x-vimeo'] }],
  }),
  (mejs.Utility = {
    encodeUrl: function(a) {
      return encodeURIComponent(a);
    },
    escapeHTML: function(a) {
      return a
        .toString()
        .split('&')
        .join('&amp;')
        .split('<')
        .join('&lt;')
        .split('"')
        .join('&quot;');
    },
    absolutizeUrl: function(a) {
      var b = document.createElement('div');
      return (
        (b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>'),
        b.firstChild.href
      );
    },
    getScriptPath: function(a) {
      for (
        var b,
          c,
          d,
          e,
          f,
          g,
          h = 0,
          i = '',
          j = '',
          k = document.getElementsByTagName('script'),
          l = k.length,
          m = a.length;
        l > h;
        h++
      ) {
        for (
          e = k[h].src,
            c = e.lastIndexOf('/'),
            c > -1
              ? ((g = e.substring(c + 1)), (f = e.substring(0, c + 1)))
              : ((g = e), (f = '')),
            b = 0;
          m > b;
          b++
        )
          if (((j = a[b]), (d = g.indexOf(j)), d > -1)) {
            i = f;
            break;
          }
        if ('' !== i) break;
      }
      return i;
    },
    calculateTimeFormat: function(a, b, c) {
      0 > a && (a = 0), 'undefined' == typeof c && (c = 25);
      var d = b.timeFormat,
        e = d[0],
        f = d[1] == d[0],
        g = f ? 2 : 1,
        h = ':',
        i = Math.floor(a / 3600) % 24,
        j = Math.floor(a / 60) % 60,
        k = Math.floor(a % 60),
        l = Math.floor(((a % 1) * c).toFixed(3)),
        m = [[l, 'f'], [k, 's'], [j, 'm'], [i, 'h']];
      d.length < g && (h = d[g]);
      for (var n = !1, o = 0, p = m.length; p > o; o++)
        if (-1 !== d.indexOf(m[o][1])) n = !0;
        else if (n) {
          for (var q = !1, r = o; p > r; r++)
            if (m[r][0] > 0) {
              q = !0;
              break;
            }
          if (!q) break;
          f || (d = e + d),
            (d = m[o][1] + h + d),
            f && (d = m[o][1] + d),
            (e = m[o][1]);
        }
      b.currentTimeFormat = d;
    },
    twoDigitsString: function(a) {
      return 10 > a ? '0' + a : String(a);
    },
    secondsToTimeCode: function(a, b) {
      if ((0 > a && (a = 0), 'object' != typeof b)) {
        var c = 'm:ss';
        (c = arguments[1] ? 'hh:mm:ss' : c),
          (c = arguments[2] ? c + ':ff' : c),
          (b = { currentTimeFormat: c, framesPerSecond: arguments[3] || 25 });
      }
      var d = b.framesPerSecond;
      'undefined' == typeof d && (d = 25);
      var c = b.currentTimeFormat,
        e = Math.floor(a / 3600) % 24,
        f = Math.floor(a / 60) % 60,
        g = Math.floor(a % 60),
        h = Math.floor(((a % 1) * d).toFixed(3));
      lis = [[h, 'f'], [g, 's'], [f, 'm'], [e, 'h']];
      var j = c;
      for (i = 0, len = lis.length; i < len; i++)
        (j = j.replace(lis[i][1] + lis[i][1], this.twoDigitsString(lis[i][0]))),
          (j = j.replace(lis[i][1], lis[i][0]));
      return j;
    },
    timeCodeToSeconds: function(a, b, c, d) {
      'undefined' == typeof c ? (c = !1) : 'undefined' == typeof d && (d = 25);
      var e = a.split(':'),
        f = parseInt(e[0], 10),
        g = parseInt(e[1], 10),
        h = parseInt(e[2], 10),
        i = 0,
        j = 0;
      return c && (i = parseInt(e[3]) / d), (j = 3600 * f + 60 * g + h + i);
    },
    convertSMPTEtoSeconds: function(a) {
      if ('string' != typeof a) return !1;
      a = a.replace(',', '.');
      var b = 0,
        c = -1 != a.indexOf('.') ? a.split('.')[1].length : 0,
        d = 1;
      a = a.split(':').reverse();
      for (var e = 0; e < a.length; e++)
        (d = 1), e > 0 && (d = Math.pow(60, e)), (b += Number(a[e]) * d);
      return Number(b.toFixed(c));
    },
    removeSwf: function(a) {
      var b = document.getElementById(a);
      b &&
        /object|embed/i.test(b.nodeName) &&
        (mejs.MediaFeatures.isIE
          ? ((b.style.display = 'none'),
            (function() {
              4 == b.readyState
                ? mejs.Utility.removeObjectInIE(a)
                : setTimeout(arguments.callee, 10);
            })())
          : b.parentNode.removeChild(b));
    },
    removeObjectInIE: function(a) {
      var b = document.getElementById(a);
      if (b) {
        for (var c in b) 'function' == typeof b[c] && (b[c] = null);
        b.parentNode.removeChild(b);
      }
    },
    determineScheme: function(a) {
      return a && -1 != a.indexOf('://')
        ? a.substr(0, a.indexOf('://') + 3)
        : '//';
    },
  }),
  (mejs.PluginDetector = {
    hasPluginVersion: function(a, b) {
      var c = this.plugins[a];
      return (
        (b[1] = b[1] || 0),
        (b[2] = b[2] || 0),
        c[0] > b[0] ||
        (c[0] == b[0] && c[1] > b[1]) ||
        (c[0] == b[0] && c[1] == b[1] && c[2] >= b[2])
          ? !0
          : !1
      );
    },
    nav: window.navigator,
    ua: window.navigator.userAgent.toLowerCase(),
    plugins: [],
    addPlugin: function(a, b, c, d, e) {
      this.plugins[a] = this.detectPlugin(b, c, d, e);
    },
    detectPlugin: function(a, b, c, d) {
      var e,
        f,
        g,
        h = [0, 0, 0];
      if (
        'undefined' != typeof this.nav.plugins &&
        'object' == typeof this.nav.plugins[a]
      ) {
        if (
          ((e = this.nav.plugins[a].description),
          e &&
            ('undefined' == typeof this.nav.mimeTypes ||
              !this.nav.mimeTypes[b] ||
              this.nav.mimeTypes[b].enabledPlugin))
        )
          for (
            h = e
              .replace(a, '')
              .replace(/^\s+/, '')
              .replace(/\sr/gi, '.')
              .split('.'),
              f = 0;
            f < h.length;
            f++
          )
            h[f] = parseInt(h[f].match(/\d+/), 10);
      } else if ('undefined' != typeof window.ActiveXObject)
        try {
          (g = new ActiveXObject(c)), g && (h = d(g));
        } catch (i) {}
      return h;
    },
  }),
  mejs.PluginDetector.addPlugin(
    'flash',
    'Shockwave Flash',
    'application/x-shockwave-flash',
    'ShockwaveFlash.ShockwaveFlash',
    function(a) {
      var b = [],
        c = a.GetVariable('$version');
      return (
        c &&
          ((c = c.split(' ')[1].split(',')),
          (b = [parseInt(c[0], 10), parseInt(c[1], 10), parseInt(c[2], 10)])),
        b
      );
    }
  ),
  mejs.PluginDetector.addPlugin(
    'silverlight',
    'Silverlight Plug-In',
    'application/x-silverlight-2',
    'AgControl.AgControl',
    function(a) {
      var b = [0, 0, 0, 0],
        c = function(a, b, c, d) {
          for (
            ;
            a.isVersionSupported(b[0] + '.' + b[1] + '.' + b[2] + '.' + b[3]);

          )
            b[c] += d;
          b[c] -= d;
        };
      return (
        c(a, b, 0, 1),
        c(a, b, 1, 1),
        c(a, b, 2, 1e4),
        c(a, b, 2, 1e3),
        c(a, b, 2, 100),
        c(a, b, 2, 10),
        c(a, b, 2, 1),
        c(a, b, 3, 1),
        b
      );
    }
  ),
  (mejs.MediaFeatures = {
    init: function() {
      var a,
        b,
        c = this,
        d = document,
        e = mejs.PluginDetector.nav,
        f = mejs.PluginDetector.ua.toLowerCase(),
        g = ['source', 'track', 'audio', 'video'];
      (c.isiPad = null !== f.match(/ipad/i)),
        (c.isiPhone = null !== f.match(/iphone/i)),
        (c.isiOS = c.isiPhone || c.isiPad),
        (c.isAndroid = null !== f.match(/android/i)),
        (c.isBustedAndroid = null !== f.match(/android 2\.[12]/)),
        (c.isBustedNativeHTTPS =
          'https:' === location.protocol &&
          (null !== f.match(/android [12]\./) ||
            null !== f.match(/macintosh.* version.* safari/))),
        (c.isIE =
          -1 != e.appName.toLowerCase().indexOf('microsoft') ||
          null !== e.appName.toLowerCase().match(/trident/gi)),
        (c.isChrome = null !== f.match(/chrome/gi)),
        (c.isChromium = null !== f.match(/chromium/gi)),
        (c.isFirefox = null !== f.match(/firefox/gi)),
        (c.isWebkit = null !== f.match(/webkit/gi)),
        (c.isGecko = null !== f.match(/gecko/gi) && !c.isWebkit && !c.isIE),
        (c.isOpera = null !== f.match(/opera/gi)),
        (c.hasTouch = 'ontouchstart' in window),
        (c.svgAsImg = !!document.implementation.hasFeature(
          'http://www.w3.org/TR/SVG11/feature#Image',
          '1.1'
        ));
      for (a = 0; a < g.length; a++) b = document.createElement(g[a]);
      c.supportsMediaTag =
        'undefined' != typeof b.canPlayType || c.isBustedAndroid;
      try {
        b.canPlayType('video/mp4');
      } catch (h) {
        c.supportsMediaTag = !1;
      }
      (c.supportsPointerEvents = (function() {
        var a,
          b = document.createElement('x'),
          c = document.documentElement,
          d = window.getComputedStyle;
        return 'pointerEvents' in b.style
          ? ((b.style.pointerEvents = 'auto'),
            (b.style.pointerEvents = 'x'),
            c.appendChild(b),
            (a = d && 'auto' === d(b, '').pointerEvents),
            c.removeChild(b),
            !!a)
          : !1;
      })()),
        (c.hasFirefoxPluginMovingProblem = !1),
        (c.hasiOSFullScreen = 'undefined' != typeof b.webkitEnterFullscreen),
        (c.hasNativeFullscreen = 'undefined' != typeof b.requestFullscreen),
        (c.hasWebkitNativeFullScreen =
          'undefined' != typeof b.webkitRequestFullScreen),
        (c.hasMozNativeFullScreen =
          'undefined' != typeof b.mozRequestFullScreen),
        (c.hasMsNativeFullScreen = 'undefined' != typeof b.msRequestFullscreen),
        (c.hasTrueNativeFullScreen =
          c.hasWebkitNativeFullScreen ||
          c.hasMozNativeFullScreen ||
          c.hasMsNativeFullScreen),
        (c.nativeFullScreenEnabled = c.hasTrueNativeFullScreen),
        c.hasMozNativeFullScreen
          ? (c.nativeFullScreenEnabled = document.mozFullScreenEnabled)
          : c.hasMsNativeFullScreen &&
            (c.nativeFullScreenEnabled = document.msFullscreenEnabled),
        c.isChrome && (c.hasiOSFullScreen = !1),
        c.hasTrueNativeFullScreen &&
          ((c.fullScreenEventName = ''),
          c.hasWebkitNativeFullScreen
            ? (c.fullScreenEventName = 'webkitfullscreenchange')
            : c.hasMozNativeFullScreen
              ? (c.fullScreenEventName = 'mozfullscreenchange')
              : c.hasMsNativeFullScreen &&
                (c.fullScreenEventName = 'MSFullscreenChange'),
          (c.isFullScreen = function() {
            return c.hasMozNativeFullScreen
              ? d.mozFullScreen
              : c.hasWebkitNativeFullScreen
                ? d.webkitIsFullScreen
                : c.hasMsNativeFullScreen
                  ? null !== d.msFullscreenElement
                  : void 0;
          }),
          (c.requestFullScreen = function(a) {
            c.hasWebkitNativeFullScreen
              ? a.webkitRequestFullScreen()
              : c.hasMozNativeFullScreen
                ? a.mozRequestFullScreen()
                : c.hasMsNativeFullScreen && a.msRequestFullscreen();
          }),
          (c.cancelFullScreen = function() {
            c.hasWebkitNativeFullScreen
              ? document.webkitCancelFullScreen()
              : c.hasMozNativeFullScreen
                ? document.mozCancelFullScreen()
                : c.hasMsNativeFullScreen && document.msExitFullscreen();
          })),
        c.hasiOSFullScreen &&
          f.match(/mac os x 10_5/i) &&
          ((c.hasNativeFullScreen = !1), (c.hasiOSFullScreen = !1));
    },
  }),
  mejs.MediaFeatures.init(),
  (mejs.HtmlMediaElement = {
    pluginType: 'native',
    isFullScreen: !1,
    setCurrentTime: function(a) {
      this.currentTime = a;
    },
    setMuted: function(a) {
      this.muted = a;
    },
    setVolume: function(a) {
      this.volume = a;
    },
    stop: function() {
      this.pause();
    },
    setSrc: function(a) {
      for (var b = this.getElementsByTagName('source'); b.length > 0; )
        this.removeChild(b[0]);
      if ('string' == typeof a) this.src = a;
      else {
        var c, d;
        for (c = 0; c < a.length; c++)
          if (((d = a[c]), this.canPlayType(d.type))) {
            this.src = d.src;
            break;
          }
      }
    },
    setVideoSize: function(a, b) {
      (this.width = a), (this.height = b);
    },
  }),
  (mejs.PluginMediaElement = function(a, b, c) {
    (this.id = a),
      (this.pluginType = b),
      (this.src = c),
      (this.events = {}),
      (this.attributes = {});
  }),
  (mejs.PluginMediaElement.prototype = {
    pluginElement: null,
    pluginType: '',
    isFullScreen: !1,
    playbackRate: -1,
    defaultPlaybackRate: -1,
    seekable: [],
    played: [],
    paused: !0,
    ended: !1,
    seeking: !1,
    duration: 0,
    error: null,
    tagName: '',
    muted: !1,
    volume: 1,
    currentTime: 0,
    play: function() {
      null != this.pluginApi &&
        ('youtube' == this.pluginType || 'vimeo' == this.pluginType
          ? this.pluginApi.playVideo()
          : this.pluginApi.playMedia(),
        (this.paused = !1));
    },
    load: function() {
      null != this.pluginApi &&
        ('youtube' == this.pluginType ||
          'vimeo' == this.pluginType ||
          this.pluginApi.loadMedia(),
        (this.paused = !1));
    },
    pause: function() {
      null != this.pluginApi &&
        ('youtube' == this.pluginType || 'vimeo' == this.pluginType
          ? 1 == this.pluginApi.getPlayerState() && this.pluginApi.pauseVideo()
          : this.pluginApi.pauseMedia(),
        (this.paused = !0));
    },
    stop: function() {
      null != this.pluginApi &&
        ('youtube' == this.pluginType || 'vimeo' == this.pluginType
          ? this.pluginApi.stopVideo()
          : this.pluginApi.stopMedia(),
        (this.paused = !0));
    },
    canPlayType: function(a) {
      var b,
        c,
        d,
        e = mejs.plugins[this.pluginType];
      for (b = 0; b < e.length; b++)
        if (
          ((d = e[b]),
          mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version))
        )
          for (c = 0; c < d.types.length; c++)
            if (a == d.types[c]) return 'probably';
      return '';
    },
    positionFullscreenButton: function(a, b, c) {
      null != this.pluginApi &&
        this.pluginApi.positionFullscreenButton &&
        this.pluginApi.positionFullscreenButton(
          Math.floor(a),
          Math.floor(b),
          c
        );
    },
    hideFullscreenButton: function() {
      null != this.pluginApi &&
        this.pluginApi.hideFullscreenButton &&
        this.pluginApi.hideFullscreenButton();
    },
    setSrc: function(a) {
      if ('string' == typeof a)
        this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a)),
          (this.src = mejs.Utility.absolutizeUrl(a));
      else {
        var b, c;
        for (b = 0; b < a.length; b++)
          if (((c = a[b]), this.canPlayType(c.type))) {
            this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src)),
              (this.src = mejs.Utility.absolutizeUrl(c.src));
            break;
          }
      }
    },
    setCurrentTime: function(a) {
      null != this.pluginApi &&
        ('youtube' == this.pluginType || 'vimeo' == this.pluginType
          ? this.pluginApi.seekTo(a)
          : this.pluginApi.setCurrentTime(a),
        (this.currentTime = a));
    },
    setVolume: function(a) {
      null != this.pluginApi &&
        ('youtube' == this.pluginType
          ? this.pluginApi.setVolume(100 * a)
          : this.pluginApi.setVolume(a),
        (this.volume = a));
    },
    setMuted: function(a) {
      null != this.pluginApi &&
        ('youtube' == this.pluginType
          ? (a ? this.pluginApi.mute() : this.pluginApi.unMute(),
            (this.muted = a),
            this.dispatchEvent({ type: 'volumechange' }))
          : this.pluginApi.setMuted(a),
        (this.muted = a));
    },
    setVideoSize: function(a, b) {
      this.pluginElement &&
        this.pluginElement.style &&
        ((this.pluginElement.style.width = a + 'px'),
        (this.pluginElement.style.height = b + 'px')),
        null != this.pluginApi &&
          this.pluginApi.setVideoSize &&
          this.pluginApi.setVideoSize(a, b);
    },
    setFullscreen: function(a) {
      null != this.pluginApi &&
        this.pluginApi.setFullscreen &&
        this.pluginApi.setFullscreen(a);
    },
    enterFullScreen: function() {
      null != this.pluginApi &&
        this.pluginApi.setFullscreen &&
        this.setFullscreen(!0);
    },
    exitFullScreen: function() {
      null != this.pluginApi &&
        this.pluginApi.setFullscreen &&
        this.setFullscreen(!1);
    },
    addEventListener: function(a, b, c) {
      (this.events[a] = this.events[a] || []), this.events[a].push(b);
    },
    removeEventListener: function(a, b) {
      if (!a) return (this.events = {}), !0;
      var c = this.events[a];
      if (!c) return !0;
      if (!b) return (this.events[a] = []), !0;
      for (var d = 0; d < c.length; d++)
        if (c[d] === b) return this.events[a].splice(d, 1), !0;
      return !1;
    },
    dispatchEvent: function(a) {
      var b,
        c = this.events[a.type];
      if (c) for (b = 0; b < c.length; b++) c[b].apply(this, [a]);
    },
    hasAttribute: function(a) {
      return a in this.attributes;
    },
    removeAttribute: function(a) {
      delete this.attributes[a];
    },
    getAttribute: function(a) {
      return this.hasAttribute(a) ? this.attributes[a] : '';
    },
    setAttribute: function(a, b) {
      this.attributes[a] = b;
    },
    remove: function() {
      mejs.Utility.removeSwf(this.pluginElement.id);
    },
  }),
  (mejs.MediaElementDefaults = {
    mode: 'auto',
    plugins: ['flash', 'silverlight', 'youtube', 'vimeo'],
    enablePluginDebug: !1,
    httpsBasicAuthSite: !1,
    type: '',
    pluginPath: mejs.Utility.getScriptPath([
      'mediaelement.js',
      'mediaelement.min.js',
      'mediaelement-and-player.js',
      'mediaelement-and-player.min.js',
    ]),
    flashName: 'flashmediaelement.swf',
    flashStreamer: '',
    flashScriptAccess: 'sameDomain',
    enablePluginSmoothing: !1,
    enablePseudoStreaming: !1,
    pseudoStreamingStartQueryParam: 'start',
    silverlightName: 'silverlightmediaelement.xap',
    defaultVideoWidth: 480,
    defaultVideoHeight: 270,
    pluginWidth: -1,
    pluginHeight: -1,
    pluginVars: [],
    timerRate: 250,
    startVolume: 0.8,
    success: function() {},
    error: function() {},
  }),
  (mejs.MediaElement = function(a, b) {
    return mejs.HtmlMediaElementShim.create(a, b);
  }),
  (mejs.HtmlMediaElementShim = {
    create: function(a, b) {
      var c,
        d,
        e = {},
        f = 'string' == typeof a ? document.getElementById(a) : a,
        g = f.tagName.toLowerCase(),
        h = 'audio' === g || 'video' === g,
        i = h ? f.getAttribute('src') : f.getAttribute('href'),
        j = f.getAttribute('poster'),
        k = f.getAttribute('autoplay'),
        l = f.getAttribute('preload'),
        m = f.getAttribute('controls');
      for (d in mejs.MediaElementDefaults) e[d] = mejs.MediaElementDefaults[d];
      for (d in b) e[d] = b[d];
      return (
        (i = 'undefined' == typeof i || null === i || '' == i ? null : i),
        (j = 'undefined' == typeof j || null === j ? '' : j),
        (l =
          'undefined' == typeof l || null === l || 'false' === l ? 'none' : l),
        (k = !('undefined' == typeof k || null === k || 'false' === k)),
        (m = !('undefined' == typeof m || null === m || 'false' === m)),
        (c = this.determinePlayback(
          f,
          e,
          mejs.MediaFeatures.supportsMediaTag,
          h,
          i
        )),
        (c.url = null !== c.url ? mejs.Utility.absolutizeUrl(c.url) : ''),
        (c.scheme = mejs.Utility.determineScheme(c.url)),
        'native' == c.method
          ? (mejs.MediaFeatures.isBustedAndroid &&
              ((f.src = c.url),
              f.addEventListener(
                'click',
                function() {
                  f.play();
                },
                !1
              )),
            this.updateNative(c, e, k, l))
          : '' !== c.method
            ? this.createPlugin(c, e, j, k, l, m)
            : (this.createErrorMessage(c, e, j), this)
      );
    },
    determinePlayback: function(a, b, c, d, e) {
      var f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q = [],
        r = {
          method: '',
          url: '',
          htmlMediaElement: a,
          isVideo: 'audio' != a.tagName.toLowerCase(),
          scheme: '',
        };
      if ('undefined' != typeof b.type && '' !== b.type)
        if ('string' == typeof b.type) q.push({ type: b.type, url: e });
        else
          for (f = 0; f < b.type.length; f++)
            q.push({ type: b.type[f], url: e });
      else if (null !== e)
        (k = this.formatType(e, a.getAttribute('type'))),
          q.push({ type: k, url: e });
      else
        for (f = 0; f < a.childNodes.length; f++)
          (j = a.childNodes[f]),
            1 == j.nodeType &&
              'source' == j.tagName.toLowerCase() &&
              ((e = j.getAttribute('src')),
              (k = this.formatType(e, j.getAttribute('type'))),
              (p = j.getAttribute('media')),
              (!p ||
                !window.matchMedia ||
                (window.matchMedia && window.matchMedia(p).matches)) &&
                q.push({ type: k, url: e }));
      if (
        (!d &&
          q.length > 0 &&
          null !== q[0].url &&
          this.getTypeFromFile(q[0].url).indexOf('audio') > -1 &&
          (r.isVideo = !1),
        mejs.MediaFeatures.isBustedAndroid &&
          (a.canPlayType = function(a) {
            return null !== a.match(/video\/(mp4|m4v)/gi) ? 'maybe' : '';
          }),
        mejs.MediaFeatures.isChromium &&
          (a.canPlayType = function(a) {
            return null !== a.match(/video\/(webm|ogv|ogg)/gi) ? 'maybe' : '';
          }),
        c &&
          ('auto' === b.mode ||
            'auto_plugin' === b.mode ||
            'native' === b.mode) &&
          (!mejs.MediaFeatures.isBustedNativeHTTPS ||
            b.httpsBasicAuthSite !== !0))
      ) {
        for (
          d ||
            ((o = document.createElement(r.isVideo ? 'video' : 'audio')),
            a.parentNode.insertBefore(o, a),
            (a.style.display = 'none'),
            (r.htmlMediaElement = a = o)),
            f = 0;
          f < q.length;
          f++
        )
          if (
            'video/m3u8' == q[f].type ||
            '' !== a.canPlayType(q[f].type).replace(/no/, '') ||
            '' !==
              a
                .canPlayType(q[f].type.replace(/mp3/, 'mpeg'))
                .replace(/no/, '') ||
            '' !==
              a.canPlayType(q[f].type.replace(/m4a/, 'mp4')).replace(/no/, '')
          ) {
            (r.method = 'native'), (r.url = q[f].url);
            break;
          }
        if (
          'native' === r.method &&
          (null !== r.url && (a.src = r.url), 'auto_plugin' !== b.mode)
        )
          return r;
      }
      if ('auto' === b.mode || 'auto_plugin' === b.mode || 'shim' === b.mode)
        for (f = 0; f < q.length; f++)
          for (k = q[f].type, g = 0; g < b.plugins.length; g++)
            for (
              l = b.plugins[g], m = mejs.plugins[l], h = 0;
              h < m.length;
              h++
            )
              if (
                ((n = m[h]),
                null == n.version ||
                  mejs.PluginDetector.hasPluginVersion(l, n.version))
              )
                for (i = 0; i < n.types.length; i++)
                  if (k.toLowerCase() == n.types[i].toLowerCase())
                    return (r.method = l), (r.url = q[f].url), r;
      return 'auto_plugin' === b.mode && 'native' === r.method
        ? r
        : ('' === r.method && q.length > 0 && (r.url = q[0].url), r);
    },
    formatType: function(a, b) {
      return a && !b
        ? this.getTypeFromFile(a)
        : b && ~b.indexOf(';') ? b.substr(0, b.indexOf(';')) : b;
    },
    getTypeFromFile: function(a) {
      a = a.split('?')[0];
      var b = a.substring(a.lastIndexOf('.') + 1).toLowerCase(),
        c = /(mp4|m4v|ogg|ogv|m3u8|webm|webmv|flv|wmv|mpeg|mov)/gi.test(b)
          ? 'video/'
          : 'audio/';
      return this.getTypeFromExtension(b, c);
    },
    getTypeFromExtension: function(a, b) {
      switch (((b = b || ''), a)) {
        case 'mp4':
        case 'm4v':
        case 'm4a':
        case 'f4v':
        case 'f4a':
          return b + 'mp4';
        case 'flv':
          return b + 'x-flv';
        case 'webm':
        case 'webma':
        case 'webmv':
          return b + 'webm';
        case 'ogg':
        case 'oga':
        case 'ogv':
          return b + 'ogg';
        case 'm3u8':
          return 'application/x-mpegurl';
        case 'ts':
          return b + 'mp2t';
        default:
          return b + a;
      }
    },
    createErrorMessage: function(a, b, c) {
      var d = a.htmlMediaElement,
        e = document.createElement('div'),
        f = b.customError;
      e.className = 'me-cannotplay';
      try {
        (e.style.width = d.width + 'px'), (e.style.height = d.height + 'px');
      } catch (g) {}
      f ||
        ((f = '<a href="' + a.url + '">'),
        '' !== c &&
          (f += '<img src="' + c + '" width="100%" height="100%" alt="" />'),
        (f += '<span>' + mejs.i18n.t('Download File') + '</span></a>')),
        (e.innerHTML = f),
        d.parentNode.insertBefore(e, d),
        (d.style.display = 'none'),
        b.error(d);
    },
    createPlugin: function(a, b, c, d, e, f) {
      var g,
        h,
        i,
        j = a.htmlMediaElement,
        k = 1,
        l = 1,
        m = 'me_' + a.method + '_' + mejs.meIndex++,
        n = new mejs.PluginMediaElement(m, a.method, a.url),
        o = document.createElement('div');
      n.tagName = j.tagName;
      for (var p = 0; p < j.attributes.length; p++) {
        var q = j.attributes[p];
        q.specified && n.setAttribute(q.name, q.value);
      }
      for (
        h = j.parentNode;
        null !== h &&
        null != h.tagName &&
        'body' !== h.tagName.toLowerCase() &&
        null != h.parentNode &&
        null != h.parentNode.tagName &&
        null != h.parentNode.constructor &&
        'ShadowRoot' === h.parentNode.constructor.name;

      ) {
        if ('p' === h.parentNode.tagName.toLowerCase()) {
          h.parentNode.parentNode.insertBefore(h, h.parentNode);
          break;
        }
        h = h.parentNode;
      }
      switch ((a.isVideo
        ? ((k =
            b.pluginWidth > 0
              ? b.pluginWidth
              : b.videoWidth > 0
                ? b.videoWidth
                : null !== j.getAttribute('width')
                  ? j.getAttribute('width')
                  : b.defaultVideoWidth),
          (l =
            b.pluginHeight > 0
              ? b.pluginHeight
              : b.videoHeight > 0
                ? b.videoHeight
                : null !== j.getAttribute('height')
                  ? j.getAttribute('height')
                  : b.defaultVideoHeight),
          (k = mejs.Utility.encodeUrl(k)),
          (l = mejs.Utility.encodeUrl(l)))
        : b.enablePluginDebug && ((k = 320), (l = 240)),
      (n.success = b.success),
      (o.className = 'me-plugin'),
      (o.id = m + '_container'),
      a.isVideo
        ? j.parentNode.insertBefore(o, j)
        : document.body.insertBefore(o, document.body.childNodes[0]),
      ('flash' === a.method || 'silverlight' === a.method) &&
        ((i = [
          'id=' + m,
          'isvideo=' + (a.isVideo ? 'true' : 'false'),
          'autoplay=' + (d ? 'true' : 'false'),
          'preload=' + e,
          'width=' + k,
          'startvolume=' + b.startVolume,
          'timerrate=' + b.timerRate,
          'flashstreamer=' + b.flashStreamer,
          'height=' + l,
          'pseudostreamstart=' + b.pseudoStreamingStartQueryParam,
        ]),
        null !== a.url &&
          ('flash' == a.method
            ? i.push('file=' + mejs.Utility.encodeUrl(a.url))
            : i.push('file=' + a.url)),
        b.enablePluginDebug && i.push('debug=true'),
        b.enablePluginSmoothing && i.push('smoothing=true'),
        b.enablePseudoStreaming && i.push('pseudostreaming=true'),
        f && i.push('controls=true'),
        b.pluginVars && (i = i.concat(b.pluginVars)),
        (window[m + '_init'] = function() {
          switch (n.pluginType) {
            case 'flash':
              n.pluginElement = n.pluginApi = document.getElementById(m);
              break;
            case 'silverlight':
              (n.pluginElement = document.getElementById(n.id)),
                (n.pluginApi = n.pluginElement.Content.MediaElementJS);
          }
          null != n.pluginApi && n.success && n.success(n, j);
        }),
        (window[m + '_event'] = function(a, b) {
          var c, d, e;
          c = { type: a, target: n };
          for (d in b) (n[d] = b[d]), (c[d] = b[d]);
          (e = b.bufferedTime || 0),
            (c.target.buffered = c.buffered = {
              start: function(a) {
                return 0;
              },
              end: function(a) {
                return e;
              },
              length: 1,
            }),
            n.dispatchEvent(c);
        })),
      a.method)) {
        case 'silverlight':
          o.innerHTML =
            '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' +
            m +
            '" name="' +
            m +
            '" width="' +
            k +
            '" height="' +
            l +
            '" class="mejs-shim"><param name="initParams" value="' +
            i.join(',') +
            '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' +
            b.pluginPath +
            b.silverlightName +
            '" /></object>';
          break;
        case 'flash':
          mejs.MediaFeatures.isIE
            ? ((g = document.createElement('div')),
              o.appendChild(g),
              (g.outerHTML =
                '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' +
                m +
                '" width="' +
                k +
                '" height="' +
                l +
                '" class="mejs-shim"><param name="movie" value="' +
                b.pluginPath +
                b.flashName +
                '?' +
                new Date().getTime() +
                '" /><param name="flashvars" value="' +
                i.join('&amp;') +
                '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' +
                b.flashScriptAccess +
                '" /><param name="allowFullScreen" value="true" /><param name="scale" value="default" /></object>'))
            : (o.innerHTML =
                '<embed id="' +
                m +
                '" name="' +
                m +
                '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="' +
                b.flashScriptAccess +
                '" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' +
                b.pluginPath +
                b.flashName +
                '" flashvars="' +
                i.join('&') +
                '" width="' +
                k +
                '" height="' +
                l +
                '" scale="default"class="mejs-shim"></embed>');
          break;
        case 'youtube':
          var r;
          if (-1 != a.url.lastIndexOf('youtu.be'))
            (r = a.url.substr(a.url.lastIndexOf('/') + 1)),
              -1 != r.indexOf('?') && (r = r.substr(0, r.indexOf('?')));
          else {
            var s = a.url.match(/[?&]v=([^&#]+)|&|#|$/);
            s && (r = s[1]);
          }
          (youtubeSettings = {
            container: o,
            containerId: o.id,
            pluginMediaElement: n,
            pluginId: m,
            videoId: r,
            height: l,
            width: k,
            scheme: a.scheme,
          }),
            window.postMessage
              ? mejs.YouTubeApi.enqueueIframe(youtubeSettings)
              : mejs.PluginDetector.hasPluginVersion('flash', [10, 0, 0]) &&
                mejs.YouTubeApi.createFlash(youtubeSettings, b);
          break;
        case 'vimeo':
          var t = m + '_player';
          if (
            ((n.vimeoid = a.url.substr(a.url.lastIndexOf('/') + 1)),
            (o.innerHTML =
              '<iframe src="' +
              a.scheme +
              'player.vimeo.com/video/' +
              n.vimeoid +
              '?api=1&portrait=0&byline=0&title=0&player_id=' +
              t +
              '" width="' +
              k +
              '" height="' +
              l +
              '" frameborder="0" class="mejs-shim" id="' +
              t +
              '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),
            'function' == typeof $f)
          ) {
            var u = $f(o.childNodes[0]),
              v = -1;
            u.addEvent('ready', function() {
              function a(a, b, c, d) {
                var e = { type: c, target: b };
                'timeupdate' == c &&
                  ((b.currentTime = e.currentTime = d.seconds),
                  (b.duration = e.duration = d.duration)),
                  b.dispatchEvent(e);
              }
              (u.playVideo = function() {
                u.api('play');
              }),
                (u.stopVideo = function() {
                  u.api('unload');
                }),
                (u.pauseVideo = function() {
                  u.api('pause');
                }),
                (u.seekTo = function(a) {
                  u.api('seekTo', a);
                }),
                (u.setVolume = function(a) {
                  u.api('setVolume', a);
                }),
                (u.setMuted = function(a) {
                  a
                    ? ((u.lastVolume = u.api('getVolume')),
                      u.api('setVolume', 0))
                    : (u.api('setVolume', u.lastVolume), delete u.lastVolume);
                }),
                (u.getPlayerState = function() {
                  return v;
                }),
                u.addEvent('play', function() {
                  (v = 1), a(u, n, 'play'), a(u, n, 'playing');
                }),
                u.addEvent('pause', function() {
                  (v = 2), a(u, n, 'pause');
                }),
                u.addEvent('finish', function() {
                  (v = 0), a(u, n, 'ended');
                }),
                u.addEvent('playProgress', function(b) {
                  a(u, n, 'timeupdate', b);
                }),
                u.addEvent('seek', function(b) {
                  (v = 3), a(u, n, 'seeked', b);
                }),
                u.addEvent('loadProgress', function(b) {
                  (v = 3), a(u, n, 'progress', b);
                }),
                (n.pluginElement = o),
                (n.pluginApi = u),
                n.success(n, n.pluginElement);
            });
          } else
            console.warn('You need to include froogaloop for vimeo to work');
      }
      return (j.style.display = 'none'), j.removeAttribute('autoplay'), n;
    },
    updateNative: function(a, b, c, d) {
      var e,
        f = a.htmlMediaElement;
      for (e in mejs.HtmlMediaElement) f[e] = mejs.HtmlMediaElement[e];
      return b.success(f, f), f;
    },
  }),
  (mejs.YouTubeApi = {
    isIframeStarted: !1,
    isIframeLoaded: !1,
    loadIframeApi: function(a) {
      if (!this.isIframeStarted) {
        var b = document.createElement('script');
        b.src = a.scheme + 'www.youtube.com/player_api';
        var c = document.getElementsByTagName('script')[0];
        c.parentNode.insertBefore(b, c), (this.isIframeStarted = !0);
      }
    },
    iframeQueue: [],
    enqueueIframe: function(a) {
      this.isLoaded
        ? this.createIframe(a)
        : (this.loadIframeApi(a), this.iframeQueue.push(a));
    },
    createIframe: function(a) {
      var b = a.pluginMediaElement,
        c = new YT.Player(a.containerId, {
          height: a.height,
          width: a.width,
          videoId: a.videoId,
          playerVars: { controls: 0, wmode: 'transparent' },
          events: {
            onReady: function() {
              (c.setVideoSize = function(a, b) {
                c.setSize(a, b);
              }),
                (a.pluginMediaElement.pluginApi = c),
                (a.pluginMediaElement.pluginElement = document.getElementById(
                  a.containerId
                )),
                b.success(b, b.pluginElement),
                setInterval(function() {
                  mejs.YouTubeApi.createEvent(c, b, 'timeupdate');
                }, 250);
            },
            onStateChange: function(a) {
              mejs.YouTubeApi.handleStateChange(a.data, c, b);
            },
          },
        });
    },
    createEvent: function(a, b, c) {
      var d = { type: c, target: b };
      if (a && a.getDuration) {
        (b.currentTime = d.currentTime = a.getCurrentTime()),
          (b.duration = d.duration = a.getDuration()),
          (d.paused = b.paused),
          (d.ended = b.ended),
          (d.muted = a.isMuted()),
          (d.volume = a.getVolume() / 100),
          (d.bytesTotal = a.getVideoBytesTotal()),
          (d.bufferedBytes = a.getVideoBytesLoaded());
        var e = d.bufferedBytes / d.bytesTotal * d.duration;
        d.target.buffered = d.buffered = {
          start: function(a) {
            return 0;
          },
          end: function(a) {
            return e;
          },
          length: 1,
        };
      }
      b.dispatchEvent(d);
    },
    iFrameReady: function() {
      for (
        this.isLoaded = !0, this.isIframeLoaded = !0;
        this.iframeQueue.length > 0;

      ) {
        var a = this.iframeQueue.pop();
        this.createIframe(a);
      }
    },
    flashPlayers: {},
    createFlash: function(a) {
      this.flashPlayers[a.pluginId] = a;
      var b,
        c =
          a.scheme +
          'www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=' +
          a.pluginId +
          '&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0';
      mejs.MediaFeatures.isIE
        ? ((b = document.createElement('div')),
          a.container.appendChild(b),
          (b.outerHTML =
            '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' +
            a.scheme +
            'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' +
            a.pluginId +
            '" width="' +
            a.width +
            '" height="' +
            a.height +
            '" class="mejs-shim"><param name="movie" value="' +
            c +
            '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="' +
            options.flashScriptAccess +
            '" /><param name="allowFullScreen" value="true" /></object>'))
        : (a.container.innerHTML =
            '<object type="application/x-shockwave-flash" id="' +
            a.pluginId +
            '" data="' +
            c +
            '" width="' +
            a.width +
            '" height="' +
            a.height +
            '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="' +
            options.flashScriptAccess +
            '"><param name="wmode" value="transparent"></object>');
    },
    flashReady: function(a) {
      var b = this.flashPlayers[a],
        c = document.getElementById(a),
        d = b.pluginMediaElement;
      (d.pluginApi = d.pluginElement = c),
        b.success(d, d.pluginElement),
        c.cueVideoById(b.videoId);
      var e = b.containerId + '_callback';
      (window[e] = function(a) {
        mejs.YouTubeApi.handleStateChange(a, c, d);
      }),
        c.addEventListener('onStateChange', e),
        setInterval(function() {
          mejs.YouTubeApi.createEvent(c, d, 'timeupdate');
        }, 250),
        mejs.YouTubeApi.createEvent(c, d, 'canplay');
    },
    handleStateChange: function(a, b, c) {
      switch (a) {
        case -1:
          (c.paused = !0),
            (c.ended = !0),
            mejs.YouTubeApi.createEvent(b, c, 'loadedmetadata');
          break;
        case 0:
          (c.paused = !1),
            (c.ended = !0),
            mejs.YouTubeApi.createEvent(b, c, 'ended');
          break;
        case 1:
          (c.paused = !1),
            (c.ended = !1),
            mejs.YouTubeApi.createEvent(b, c, 'play'),
            mejs.YouTubeApi.createEvent(b, c, 'playing');
          break;
        case 2:
          (c.paused = !0),
            (c.ended = !1),
            mejs.YouTubeApi.createEvent(b, c, 'pause');
          break;
        case 3:
          mejs.YouTubeApi.createEvent(b, c, 'progress');
          break;
        case 5:
      }
    },
  }),
  (window.onYouTubePlayerAPIReady = function() {
    mejs.YouTubeApi.iFrameReady();
  }),
  (window.onYouTubePlayerReady = function(a) {
    mejs.YouTubeApi.flashReady(a);
  }),
  (window.mejs = mejs),
  (window.MediaElement = mejs.MediaElement),
  (function(a, b, c) {
    'use strict';
    var d = {
      locale: {
        language: (b.i18n && b.i18n.locale.language) || '',
        strings: (b.i18n && b.i18n.locale.strings) || {},
      },
      ietf_lang_regex: /^(x\-)?[a-z]{2,}(\-\w{2,})?(\-\w{2,})?$/,
      methods: {},
    };
    (d.getLanguage = function() {
      var a =
        d.locale.language ||
        window.navigator.userLanguage ||
        window.navigator.language;
      return d.ietf_lang_regex.exec(a) ? a : null;
    }),
      'undefined' != typeof mejsL10n && (d.locale.language = mejsL10n.language),
      (d.methods.checkPlain = function(a) {
        var b,
          c,
          d = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
        a = String(a);
        for (b in d)
          d.hasOwnProperty(b) &&
            ((c = new RegExp(b, 'g')), (a = a.replace(c, d[b])));
        return a;
      }),
      (d.methods.t = function(a, b) {
        return (
          d.locale.strings &&
            d.locale.strings[b.context] &&
            d.locale.strings[b.context][a] &&
            (a = d.locale.strings[b.context][a]),
          d.methods.checkPlain(a)
        );
      }),
      (d.t = function(a, b) {
        if ('string' == typeof a && a.length > 0) {
          var c = d.getLanguage();
          return (b = b || { context: c }), d.methods.t(a, b);
        }
        throw {
          name: 'InvalidArgumentException',
          message: 'First argument is either not a string or empty.',
        };
      }),
      (b.i18n = d);
  })(document, mejs),
  (function(a, b) {
    'use strict';
    'undefined' != typeof mejsL10n && (a[mejsL10n.language] = mejsL10n.strings);
  })(
    mejs.i18n.locale.strings
  ) /*!
 *
 * MediaElementPlayer
 * http://mediaelementjs.com/
 *
 * Creates a controller bar for HTML5 <video> add <audio> tags
 * using jQuery and MediaElement.js (HTML5 Flash/Silverlight wrapper)
 *
 * Copyright 2010-2013, John Dyer (http://j.hn/)
 * License: MIT
 *
 */,
  'undefined' != typeof jQuery
    ? (mejs.$ = jQuery)
    : 'undefined' != typeof Zepto
      ? ((mejs.$ = Zepto),
        (Zepto.fn.outerWidth = function(a) {
          var b = $(this).width();
          return (
            a &&
              ((b += parseInt($(this).css('margin-right'), 10)),
              (b += parseInt($(this).css('margin-left'), 10))),
            b
          );
        }))
      : 'undefined' != typeof ender && (mejs.$ = ender),
  (function(a) {
    (mejs.MepDefaults = {
      poster: '',
      showPosterWhenEnded: !1,
      defaultVideoWidth: 480,
      defaultVideoHeight: 270,
      videoWidth: -1,
      videoHeight: -1,
      defaultAudioWidth: 400,
      defaultAudioHeight: 30,
      defaultSeekBackwardInterval: function(a) {
        return 0.05 * a.duration;
      },
      defaultSeekForwardInterval: function(a) {
        return 0.05 * a.duration;
      },
      setDimensions: !0,
      audioWidth: -1,
      audioHeight: -1,
      startVolume: 0.8,
      loop: !1,
      autoRewind: !0,
      enableAutosize: !0,
      timeFormat: '',
      alwaysShowHours: !1,
      showTimecodeFrameCount: !1,
      framesPerSecond: 25,
      autosizeProgress: !0,
      alwaysShowControls: !1,
      hideVideoControlsOnLoad: !1,
      clickToPlayPause: !0,
      iPadUseNativeControls: !1,
      iPhoneUseNativeControls: !1,
      AndroidUseNativeControls: !1,
      features: [
        'playpause',
        'current',
        'progress',
        'duration',
        'tracks',
        'volume',
        'fullscreen',
      ],
      isVideo: !0,
      stretching: 'auto',
      enableKeyboard: !0,
      pauseOtherPlayers: !0,
      keyActions: [
        {
          keys: [32, 179],
          action: function(a, b) {
            b.paused || b.ended ? b.play() : b.pause();
          },
        },
        {
          keys: [38],
          action: function(a, b) {
            a.container.find('.mejs-volume-slider').css('display', 'block'),
              a.isVideo && (a.showControls(), a.startControlsTimer());
            var c = Math.min(b.volume + 0.1, 1);
            b.setVolume(c);
          },
        },
        {
          keys: [40],
          action: function(a, b) {
            a.container.find('.mejs-volume-slider').css('display', 'block'),
              a.isVideo && (a.showControls(), a.startControlsTimer());
            var c = Math.max(b.volume - 0.1, 0);
            b.setVolume(c);
          },
        },
        {
          keys: [37, 227],
          action: function(a, b) {
            if (!isNaN(b.duration) && b.duration > 0) {
              a.isVideo && (a.showControls(), a.startControlsTimer());
              var c = Math.max(
                b.currentTime - a.options.defaultSeekBackwardInterval(b),
                0
              );
              b.setCurrentTime(c);
            }
          },
        },
        {
          keys: [39, 228],
          action: function(a, b) {
            if (!isNaN(b.duration) && b.duration > 0) {
              a.isVideo && (a.showControls(), a.startControlsTimer());
              var c = Math.min(
                b.currentTime + a.options.defaultSeekForwardInterval(b),
                b.duration
              );
              b.setCurrentTime(c);
            }
          },
        },
        {
          keys: [70],
          action: function(a, b) {
            'undefined' != typeof a.enterFullScreen &&
              (a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen());
          },
        },
        {
          keys: [77],
          action: function(a, b) {
            a.container.find('.mejs-volume-slider').css('display', 'block'),
              a.isVideo && (a.showControls(), a.startControlsTimer()),
              a.media.muted ? a.setMuted(!1) : a.setMuted(!0);
          },
        },
      ],
    }),
      (mejs.mepIndex = 0),
      (mejs.players = {}),
      (mejs.MediaElementPlayer = function(b, c) {
        if (!(this instanceof mejs.MediaElementPlayer))
          return new mejs.MediaElementPlayer(b, c);
        var d = this;
        return (
          (d.$media = d.$node = a(b)),
          (d.node = d.media = d.$media[0]),
          d.node
            ? 'undefined' != typeof d.node.player
              ? d.node.player
              : ('undefined' == typeof c && (c = d.$node.data('mejsoptions')),
                (d.options = a.extend({}, mejs.MepDefaults, c)),
                d.options.timeFormat ||
                  ((d.options.timeFormat = 'mm:ss'),
                  d.options.alwaysShowHours &&
                    (d.options.timeFormat = 'hh:mm:ss'),
                  d.options.showTimecodeFrameCount &&
                    (d.options.timeFormat += ':ff')),
                mejs.Utility.calculateTimeFormat(
                  0,
                  d.options,
                  d.options.framesPerSecond || 25
                ),
                (d.id = 'mep_' + mejs.mepIndex++),
                (mejs.players[d.id] = d),
                d.init(),
                d)
            : void 0
        );
      }),
      (mejs.MediaElementPlayer.prototype = {
        hasFocus: !1,
        controlsAreVisible: !0,
        init: function() {
          var b = this,
            c = mejs.MediaFeatures,
            d = a.extend(!0, {}, b.options, {
              success: function(a, c) {
                b.meReady(a, c);
              },
              error: function(a) {
                b.handleError(a);
              },
            }),
            e = b.media.tagName.toLowerCase();
          if (
            ((b.isDynamic = 'audio' !== e && 'video' !== e),
            b.isDynamic
              ? (b.isVideo = b.options.isVideo)
              : (b.isVideo = 'audio' !== e && b.options.isVideo),
            (c.isiPad && b.options.iPadUseNativeControls) ||
              (c.isiPhone && b.options.iPhoneUseNativeControls))
          )
            b.$media.attr('controls', 'controls'),
              c.isiPad && null !== b.media.getAttribute('autoplay') && b.play();
          else if (c.isAndroid && b.options.AndroidUseNativeControls);
          else {
            b.$media.removeAttr('controls');
            var f = b.isVideo
              ? mejs.i18n.t('Video Player')
              : mejs.i18n.t('Audio Player');
            a('<span class="mejs-offscreen">' + f + '</span>').insertBefore(
              b.$media
            ),
              (b.container = a(
                '<div id="' +
                  b.id +
                  '" class="mejs-container ' +
                  (mejs.MediaFeatures.svgAsImg ? 'svg' : 'no-svg') +
                  '" tabindex="0" role="application" aria-label="' +
                  f +
                  '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>'
              )
                .addClass(b.$media[0].className)
                .insertBefore(b.$media)
                .focus(function(a) {
                  if (
                    !b.controlsAreVisible &&
                    !b.hasFocus &&
                    (b.showControls(!0), !b.hasMsNativeFullScreen)
                  ) {
                    var c = b.container.find('.mejs-playpause-button > button');
                    c.focus();
                  }
                })),
              'fill' !== b.options.stretching ||
                b.container.parent('mejs-fill-container').length ||
                ((b.outerContainer = b.$media.parent()),
                b.container.wrap('<div class="mejs-fill-container"/>')),
              b.container.addClass(
                (c.isAndroid ? 'mejs-android ' : '') +
                  (c.isiOS ? 'mejs-ios ' : '') +
                  (c.isiPad ? 'mejs-ipad ' : '') +
                  (c.isiPhone ? 'mejs-iphone ' : '') +
                  (b.isVideo ? 'mejs-video ' : 'mejs-audio ')
              ),
              b.container.find('.mejs-mediaelement').append(b.$media),
              (b.node.player = b),
              (b.controls = b.container.find('.mejs-controls')),
              (b.layers = b.container.find('.mejs-layers'));
            var g = b.isVideo ? 'video' : 'audio',
              h = g.substring(0, 1).toUpperCase() + g.substring(1);
            b.options[g + 'Width'] > 0 ||
            b.options[g + 'Width'].toString().indexOf('%') > -1
              ? (b.width = b.options[g + 'Width'])
              : '' !== b.media.style.width && null !== b.media.style.width
                ? (b.width = b.media.style.width)
                : null !== b.media.getAttribute('width')
                  ? (b.width = b.$media.attr('width'))
                  : (b.width = b.options['default' + h + 'Width']),
              b.options[g + 'Height'] > 0 ||
              b.options[g + 'Height'].toString().indexOf('%') > -1
                ? (b.height = b.options[g + 'Height'])
                : '' !== b.media.style.height && null !== b.media.style.height
                  ? (b.height = b.media.style.height)
                  : null !== b.$media[0].getAttribute('height')
                    ? (b.height = b.$media.attr('height'))
                    : (b.height = b.options['default' + h + 'Height']),
              b.setPlayerSize(b.width, b.height),
              (d.pluginWidth = b.width),
              (d.pluginHeight = b.height);
          }
          mejs.MediaElement(b.$media[0], d),
            'undefined' != typeof b.container &&
              b.controlsAreVisible &&
              b.container.trigger('controlsshown');
        },
        showControls: function(a) {
          var b = this;
          (a = 'undefined' == typeof a || a),
            b.controlsAreVisible ||
              (a
                ? (b.controls
                    .removeClass('mejs-offscreen')
                    .stop(!0, !0)
                    .fadeIn(200, function() {
                      (b.controlsAreVisible = !0),
                        b.container.trigger('controlsshown');
                    }),
                  b.container
                    .find('.mejs-control')
                    .removeClass('mejs-offscreen')
                    .stop(!0, !0)
                    .fadeIn(200, function() {
                      b.controlsAreVisible = !0;
                    }))
                : (b.controls
                    .removeClass('mejs-offscreen')
                    .css('display', 'block'),
                  b.container
                    .find('.mejs-control')
                    .removeClass('mejs-offscreen')
                    .css('display', 'block'),
                  (b.controlsAreVisible = !0),
                  b.container.trigger('controlsshown')),
              b.setControlsSize());
        },
        hideControls: function(b) {
          var c = this;
          (b = 'undefined' == typeof b || b),
            !c.controlsAreVisible ||
              c.options.alwaysShowControls ||
              c.keyboardAction ||
              (b
                ? (c.controls.stop(!0, !0).fadeOut(200, function() {
                    a(this)
                      .addClass('mejs-offscreen')
                      .css('display', 'block'),
                      (c.controlsAreVisible = !1),
                      c.container.trigger('controlshidden');
                  }),
                  c.container
                    .find('.mejs-control')
                    .stop(!0, !0)
                    .fadeOut(200, function() {
                      a(this)
                        .addClass('mejs-offscreen')
                        .css('display', 'block');
                    }))
                : (c.controls
                    .addClass('mejs-offscreen')
                    .css('display', 'block'),
                  c.container
                    .find('.mejs-control')
                    .addClass('mejs-offscreen')
                    .css('display', 'block'),
                  (c.controlsAreVisible = !1),
                  c.container.trigger('controlshidden')));
        },
        controlsTimer: null,
        startControlsTimer: function(a) {
          var b = this;
          (a = 'undefined' != typeof a ? a : 1500),
            b.killControlsTimer('start'),
            (b.controlsTimer = setTimeout(function() {
              b.hideControls(), b.killControlsTimer('hide');
            }, a));
        },
        killControlsTimer: function(a) {
          var b = this;
          null !== b.controlsTimer &&
            (clearTimeout(b.controlsTimer),
            delete b.controlsTimer,
            (b.controlsTimer = null));
        },
        controlsEnabled: !0,
        disableControls: function() {
          var a = this;
          a.killControlsTimer(),
            a.hideControls(!1),
            (this.controlsEnabled = !1);
        },
        enableControls: function() {
          var a = this;
          a.showControls(!1), (a.controlsEnabled = !0);
        },
        meReady: function(b, c) {
          var d,
            e,
            f = this,
            g = mejs.MediaFeatures,
            h = c.getAttribute('autoplay'),
            i = !('undefined' == typeof h || null === h || 'false' === h);
          if (!f.created) {
            if (
              ((f.created = !0),
              (f.media = b),
              (f.domNode = c),
              !(
                (g.isAndroid && f.options.AndroidUseNativeControls) ||
                (g.isiPad && f.options.iPadUseNativeControls) ||
                (g.isiPhone && f.options.iPhoneUseNativeControls)
              ))
            ) {
              f.buildposter(f, f.controls, f.layers, f.media),
                f.buildkeyboard(f, f.controls, f.layers, f.media),
                f.buildoverlays(f, f.controls, f.layers, f.media),
                f.findTracks();
              for (d in f.options.features)
                if (((e = f.options.features[d]), f['build' + e]))
                  try {
                    f['build' + e](f, f.controls, f.layers, f.media);
                  } catch (j) {}
              f.container.trigger('controlsready'),
                f.setPlayerSize(f.width, f.height),
                f.setControlsSize(),
                f.isVideo &&
                  (mejs.MediaFeatures.hasTouch
                    ? f.$media.bind('touchstart', function() {
                        f.controlsAreVisible
                          ? f.hideControls(!1)
                          : f.controlsEnabled && f.showControls(!1);
                      })
                    : ((f.clickToPlayPauseCallback = function() {
                        f.options.clickToPlayPause &&
                          (f.media.paused ? f.play() : f.pause());
                      }),
                      f.media.addEventListener(
                        'click',
                        f.clickToPlayPauseCallback,
                        !1
                      ),
                      f.container
                        .bind('mouseenter', function() {
                          f.controlsEnabled &&
                            (f.options.alwaysShowControls ||
                              (f.killControlsTimer('enter'),
                              f.showControls(),
                              f.startControlsTimer(2500)));
                        })
                        .bind('mousemove', function() {
                          f.controlsEnabled &&
                            (f.controlsAreVisible || f.showControls(),
                            f.options.alwaysShowControls ||
                              f.startControlsTimer(2500));
                        })
                        .bind('mouseleave', function() {
                          f.controlsEnabled &&
                            (f.media.paused ||
                              f.options.alwaysShowControls ||
                              f.startControlsTimer(1e3));
                        })),
                  f.options.hideVideoControlsOnLoad && f.hideControls(!1),
                  i && !f.options.alwaysShowControls && f.hideControls(),
                  f.options.enableAutosize &&
                    f.media.addEventListener(
                      'loadedmetadata',
                      function(a) {
                        f.options.videoHeight <= 0 &&
                          null === f.domNode.getAttribute('height') &&
                          !isNaN(a.target.videoHeight) &&
                          (f.setPlayerSize(
                            a.target.videoWidth,
                            a.target.videoHeight
                          ),
                          f.setControlsSize(),
                          f.media.setVideoSize(
                            a.target.videoWidth,
                            a.target.videoHeight
                          ));
                      },
                      !1
                    )),
                f.media.addEventListener(
                  'play',
                  function() {
                    var a;
                    for (a in mejs.players) {
                      var b = mejs.players[a];
                      b.id == f.id ||
                        !f.options.pauseOtherPlayers ||
                        b.paused ||
                        b.ended ||
                        b.pause(),
                        (b.hasFocus = !1);
                    }
                    f.hasFocus = !0;
                  },
                  !1
                ),
                f.media.addEventListener(
                  'ended',
                  function(b) {
                    if (f.options.autoRewind)
                      try {
                        f.media.setCurrentTime(0),
                          window.setTimeout(function() {
                            a(f.container)
                              .find('.mejs-overlay-loading')
                              .parent()
                              .hide();
                          }, 20);
                      } catch (c) {}
                    f.media.pause(),
                      f.setProgressRail && f.setProgressRail(),
                      f.setCurrentRail && f.setCurrentRail(),
                      f.options.loop
                        ? f.play()
                        : !f.options.alwaysShowControls &&
                          f.controlsEnabled &&
                          f.showControls();
                  },
                  !1
                ),
                f.media.addEventListener(
                  'loadedmetadata',
                  function(a) {
                    f.updateDuration && f.updateDuration(),
                      f.updateCurrent && f.updateCurrent(),
                      f.isFullScreen ||
                        (f.setPlayerSize(f.width, f.height),
                        f.setControlsSize());
                  },
                  !1
                );
              var k = null;
              f.media.addEventListener(
                'timeupdate',
                function() {
                  k !== this.duration &&
                    ((k = this.duration),
                    mejs.Utility.calculateTimeFormat(
                      k,
                      f.options,
                      f.options.framesPerSecond || 25
                    ),
                    f.updateDuration && f.updateDuration(),
                    f.updateCurrent && f.updateCurrent(),
                    f.setControlsSize());
                },
                !1
              ),
                f.container.focusout(function(b) {
                  if (b.relatedTarget) {
                    var c = a(b.relatedTarget);
                    f.keyboardAction &&
                      0 === c.parents('.mejs-container').length &&
                      ((f.keyboardAction = !1), f.hideControls(!0));
                  }
                }),
                setTimeout(function() {
                  f.setPlayerSize(f.width, f.height), f.setControlsSize();
                }, 50),
                f.globalBind('resize', function() {
                  f.isFullScreen ||
                    (mejs.MediaFeatures.hasTrueNativeFullScreen &&
                      document.webkitIsFullScreen) ||
                    f.setPlayerSize(f.width, f.height),
                    f.setControlsSize();
                }),
                'youtube' == f.media.pluginType &&
                  (g.isiOS || g.isAndroid) &&
                  (f.container.find('.mejs-overlay-play').hide(),
                  f.container.find('.mejs-poster').hide());
            }
            i && 'native' == b.pluginType && f.play(),
              f.options.success &&
                ('string' == typeof f.options.success
                  ? window[f.options.success](f.media, f.domNode, f)
                  : f.options.success(f.media, f.domNode, f));
          }
        },
        handleError: function(a) {
          var b = this;
          b.controls && b.controls.hide(),
            b.options.error && b.options.error(a);
        },
        setPlayerSize: function(a, b) {
          var c = this;
          if (!c.options.setDimensions) return !1;
          switch (('undefined' != typeof a && (c.width = a),
          'undefined' != typeof b && (c.height = b),
          c.options.stretching)) {
            case 'fill':
              c.isVideo
                ? this.setFillMode()
                : this.setDimensions(c.width, c.height);
              break;
            case 'responsive':
              this.setResponsiveMode();
              break;
            case 'none':
              this.setDimensions(c.width, c.height);
              break;
            default:
              this.hasFluidMode() === !0
                ? this.setResponsiveMode()
                : this.setDimensions(c.width, c.height);
          }
        },
        hasFluidMode: function() {
          var a = this;
          return (
            a.height.toString().indexOf('%') > 0 ||
            ('none' !== a.$node.css('max-width') &&
              't.width' !== a.$node.css('max-width')) ||
            (a.$node[0].currentStyle &&
              '100%' === a.$node[0].currentStyle.maxWidth)
          );
        },
        setResponsiveMode: function() {
          var b = this,
            c = (function() {
              return b.isVideo
                ? b.media.videoWidth && b.media.videoWidth > 0
                  ? b.media.videoWidth
                  : null !== b.media.getAttribute('width')
                    ? b.media.getAttribute('width')
                    : b.options.defaultVideoWidth
                : b.options.defaultAudioWidth;
            })(),
            d = (function() {
              return b.isVideo
                ? b.media.videoHeight && b.media.videoHeight > 0
                  ? b.media.videoHeight
                  : null !== b.media.getAttribute('height')
                    ? b.media.getAttribute('height')
                    : b.options.defaultVideoHeight
                : b.options.defaultAudioHeight;
            })(),
            e = b.container
              .parent()
              .closest(':visible')
              .width(),
            f = b.container
              .parent()
              .closest(':visible')
              .height(),
            g =
              b.isVideo || !b.options.autosizeProgress
                ? parseInt(e * d / c, 10)
                : d;
          (isNaN(g) || (0 !== f && g > f && f > d)) && (g = f),
            b.container.parent().length > 0 &&
              'body' === b.container.parent()[0].tagName.toLowerCase() &&
              ((e = a(window).width()), (g = a(window).height())),
            g &&
              e &&
              (b.container.width(e).height(g),
              b.$media
                .add(b.container.find('.mejs-shim'))
                .width('100%')
                .height('100%'),
              b.isVideo && b.media.setVideoSize && b.media.setVideoSize(e, g),
              b.layers
                .children('.mejs-layer')
                .width('100%')
                .height('100%'));
        },
        setFillMode: function() {
          var a = this,
            b = a.outerContainer;
          b.width() || b.height(a.$media.width()),
            b.height() || b.height(a.$media.height());
          var c = b.width(),
            d = b.height();
          a.setDimensions('100%', '100%'),
            a.container.find('.mejs-poster img').css('display', 'block'),
            (targetElement = a.container.find('object, embed, iframe, video'));
          var e = a.height,
            f = a.width,
            g = c,
            h = e * c / f,
            i = f * d / e,
            j = d,
            k = !(i > c),
            l = k ? Math.floor(g) : Math.floor(i),
            m = k ? Math.floor(h) : Math.floor(j);
          k
            ? (targetElement.height(m).width(c),
              a.media.setVideoSize && a.media.setVideoSize(c, m))
            : (targetElement.height(d).width(l),
              a.media.setVideoSize && a.media.setVideoSize(l, d)),
            targetElement.css({
              'margin-left': Math.floor((c - l) / 2),
              'margin-top': 0,
            });
        },
        setDimensions: function(a, b) {
          var c = this;
          c.container.width(a).height(b),
            c.layers
              .children('.mejs-layer')
              .width(a)
              .height(b);
        },
        setControlsSize: function() {
          var b = this,
            c = 0,
            d = 0,
            e = b.controls.find('.mejs-time-rail'),
            f = b.controls.find('.mejs-time-total'),
            g = e.siblings(),
            h = g.last(),
            i = null;
          if (b.container.is(':visible') && e.length && e.is(':visible')) {
            b.options &&
              !b.options.autosizeProgress &&
              (d = parseInt(e.css('width'), 10)),
              (0 !== d && d) ||
                (g.each(function() {
                  var b = a(this);
                  'absolute' != b.css('position') &&
                    b.is(':visible') &&
                    (c += a(this).outerWidth(!0));
                }),
                (d = b.controls.width() - c - (e.outerWidth(!0) - e.width())));
            do
              e.width(d),
                f.width(d - (f.outerWidth(!0) - f.width())),
                'absolute' != h.css('position') &&
                  ((i = h.length ? h.position() : null), d--);
            while (null !== i && i.top.toFixed(2) > 0 && d > 0);
            b.container.trigger('controlsresize');
          }
        },
        buildposter: function(b, c, d, e) {
          var f = this,
            g = a('<div class="mejs-poster mejs-layer"></div>').appendTo(d),
            h = b.$media.attr('poster');
          '' !== b.options.poster && (h = b.options.poster),
            h ? f.setPoster(h) : g.hide(),
            e.addEventListener(
              'play',
              function() {
                g.hide();
              },
              !1
            ),
            b.options.showPosterWhenEnded &&
              b.options.autoRewind &&
              e.addEventListener(
                'ended',
                function() {
                  g.show();
                },
                !1
              );
        },
        setPoster: function(b) {
          var c = this,
            d = c.container.find('.mejs-poster'),
            e = d.find('img');
          0 === e.length &&
            (e = a('<img width="100%" height="100%" alt="" />').appendTo(d)),
            e.attr('src', b),
            d.css({ 'background-image': 'url(' + b + ')' });
        },
        buildoverlays: function(b, c, d, e) {
          var f = this;
          if (b.isVideo) {
            var g = a(
                '<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>'
              )
                .hide()
                .appendTo(d),
              h = a(
                '<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>'
              )
                .hide()
                .appendTo(d),
              i = a(
                '<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>'
              )
                .appendTo(d)
                .bind('click', function() {
                  f.options.clickToPlayPause && e.paused && e.play();
                });
            e.addEventListener(
              'play',
              function() {
                i.hide(),
                  g.hide(),
                  c.find('.mejs-time-buffering').hide(),
                  h.hide();
              },
              !1
            ),
              e.addEventListener(
                'playing',
                function() {
                  i.hide(),
                    g.hide(),
                    c.find('.mejs-time-buffering').hide(),
                    h.hide();
                },
                !1
              ),
              e.addEventListener(
                'seeking',
                function() {
                  g.show(), c.find('.mejs-time-buffering').show();
                },
                !1
              ),
              e.addEventListener(
                'seeked',
                function() {
                  g.hide(), c.find('.mejs-time-buffering').hide();
                },
                !1
              ),
              e.addEventListener(
                'pause',
                function() {
                  mejs.MediaFeatures.isiPhone || i.show();
                },
                !1
              ),
              e.addEventListener(
                'waiting',
                function() {
                  g.show(), c.find('.mejs-time-buffering').show();
                },
                !1
              ),
              e.addEventListener(
                'loadeddata',
                function() {
                  g.show(),
                    c.find('.mejs-time-buffering').show(),
                    mejs.MediaFeatures.isAndroid &&
                      (e.canplayTimeout = window.setTimeout(function() {
                        if (document.createEvent) {
                          var a = document.createEvent('HTMLEvents');
                          return (
                            a.initEvent('canplay', !0, !0), e.dispatchEvent(a)
                          );
                        }
                      }, 300));
                },
                !1
              ),
              e.addEventListener(
                'canplay',
                function() {
                  g.hide(),
                    c.find('.mejs-time-buffering').hide(),
                    clearTimeout(e.canplayTimeout);
                },
                !1
              ),
              e.addEventListener(
                'error',
                function(a) {
                  f.handleError(a),
                    g.hide(),
                    i.hide(),
                    h.show(),
                    h
                      .find('.mejs-overlay-error')
                      .html('Error loading this resource');
                },
                !1
              ),
              e.addEventListener(
                'keydown',
                function(a) {
                  f.onkeydown(b, e, a);
                },
                !1
              );
          }
        },
        buildkeyboard: function(b, c, d, e) {
          var f = this;
          f.container.keydown(function() {
            f.keyboardAction = !0;
          }),
            f.globalBind('keydown', function(c) {
              return (
                (b.hasFocus =
                  0 !== a(c.target).closest('.mejs-container').length &&
                  a(c.target)
                    .closest('.mejs-container')
                    .attr('id') ===
                    b.$media.closest('.mejs-container').attr('id')),
                f.onkeydown(b, e, c)
              );
            }),
            f.globalBind('click', function(c) {
              b.hasFocus = 0 !== a(c.target).closest('.mejs-container').length;
            });
        },
        onkeydown: function(a, b, c) {
          if (a.hasFocus && a.options.enableKeyboard)
            for (var d = 0, e = a.options.keyActions.length; e > d; d++)
              for (
                var f = a.options.keyActions[d], g = 0, h = f.keys.length;
                h > g;
                g++
              )
                if (c.keyCode == f.keys[g])
                  return (
                    'function' == typeof c.preventDefault && c.preventDefault(),
                    f.action(a, b, c.keyCode, c),
                    !1
                  );
          return !0;
        },
        findTracks: function() {
          var b = this,
            c = b.$media.find('track');
          (b.tracks = []),
            c.each(function(c, d) {
              (d = a(d)),
                b.tracks.push({
                  srclang: d.attr('srclang')
                    ? d.attr('srclang').toLowerCase()
                    : '',
                  src: d.attr('src'),
                  kind: d.attr('kind'),
                  label: d.attr('label') || '',
                  entries: [],
                  isLoaded: !1,
                });
            });
        },
        changeSkin: function(a) {
          (this.container[0].className = 'mejs-container ' + a),
            this.setPlayerSize(this.width, this.height),
            this.setControlsSize();
        },
        play: function() {
          this.load(), this.media.play();
        },
        pause: function() {
          try {
            this.media.pause();
          } catch (a) {}
        },
        load: function() {
          this.isLoaded || this.media.load(), (this.isLoaded = !0);
        },
        setMuted: function(a) {
          this.media.setMuted(a);
        },
        setCurrentTime: function(a) {
          this.media.setCurrentTime(a);
        },
        getCurrentTime: function() {
          return this.media.currentTime;
        },
        setVolume: function(a) {
          this.media.setVolume(a);
        },
        getVolume: function() {
          return this.media.volume;
        },
        setSrc: function(a) {
          this.media.setSrc(a);
        },
        remove: function() {
          var a,
            b,
            c = this;
          c.container.prev('.mejs-offscreen').remove();
          for (a in c.options.features)
            if (((b = c.options.features[a]), c['clean' + b]))
              try {
                c['clean' + b](c);
              } catch (d) {}
          c.isDynamic
            ? c.$node.insertBefore(c.container)
            : (c.$media.prop('controls', !0),
              c.$node
                .clone()
                .insertBefore(c.container)
                .show(),
              c.$node.remove()),
            'native' !== c.media.pluginType && c.media.remove(),
            delete mejs.players[c.id],
            'object' == typeof c.container && c.container.remove(),
            c.globalUnbind(),
            delete c.node.player;
        },
        rebuildtracks: function() {
          var a = this;
          a.findTracks(), a.buildtracks(a, a.controls, a.layers, a.media);
        },
        resetSize: function() {
          var a = this;
          setTimeout(function() {
            a.setPlayerSize(a.width, a.height), a.setControlsSize();
          }, 50);
        },
      }),
      (function() {
        function b(b, d) {
          var e = { d: [], w: [] };
          return (
            a.each((b || '').split(' '), function(a, b) {
              var f = b + '.' + d;
              0 === f.indexOf('.')
                ? (e.d.push(f), e.w.push(f))
                : e[c.test(b) ? 'w' : 'd'].push(f);
            }),
            (e.d = e.d.join(' ')),
            (e.w = e.w.join(' ')),
            e
          );
        }
        var c = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        (mejs.MediaElementPlayer.prototype.globalBind = function(c, d, e) {
          var f = this,
            g = f.node ? f.node.ownerDocument : document;
          (c = b(c, f.id)),
            c.d && a(g).bind(c.d, d, e),
            c.w && a(window).bind(c.w, d, e);
        }),
          (mejs.MediaElementPlayer.prototype.globalUnbind = function(c, d) {
            var e = this,
              f = e.node ? e.node.ownerDocument : document;
            (c = b(c, e.id)),
              c.d && a(f).unbind(c.d, d),
              c.w && a(window).unbind(c.w, d);
          });
      })(),
      'undefined' != typeof a &&
        ((a.fn.mediaelementplayer = function(b) {
          return (
            b === !1
              ? this.each(function() {
                  var b = a(this).data('mediaelementplayer');
                  b && b.remove(), a(this).removeData('mediaelementplayer');
                })
              : this.each(function() {
                  a(this).data(
                    'mediaelementplayer',
                    new mejs.MediaElementPlayer(this, b)
                  );
                }),
            this
          );
        }),
        a(document).ready(function() {
          a('.mejs-player').mediaelementplayer();
        })),
      (window.MediaElementPlayer = mejs.MediaElementPlayer);
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      playText: mejs.i18n.t('Play'),
      pauseText: mejs.i18n.t('Pause'),
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildplaypause: function(b, c, d, e) {
          function f(a) {
            'play' === a
              ? (i.removeClass('mejs-play').addClass('mejs-pause'),
                j.attr({ title: h.pauseText, 'aria-label': h.pauseText }))
              : (i.removeClass('mejs-pause').addClass('mejs-play'),
                j.attr({ title: h.playText, 'aria-label': h.playText }));
          }
          var g = this,
            h = g.options,
            i = a(
              '<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' +
                g.id +
                '" title="' +
                h.playText +
                '" aria-label="' +
                h.playText +
                '"></button></div>'
            )
              .appendTo(c)
              .click(function(a) {
                return a.preventDefault(), e.paused ? e.play() : e.pause(), !1;
              }),
            j = i.find('button');
          f('pse'),
            e.addEventListener(
              'play',
              function() {
                f('play');
              },
              !1
            ),
            e.addEventListener(
              'playing',
              function() {
                f('play');
              },
              !1
            ),
            e.addEventListener(
              'pause',
              function() {
                f('pse');
              },
              !1
            ),
            e.addEventListener(
              'paused',
              function() {
                f('pse');
              },
              !1
            );
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, { stopText: 'Stop' }),
      a.extend(MediaElementPlayer.prototype, {
        buildstop: function(b, c, d, e) {
          var f = this;
          a(
            '<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' +
              f.id +
              '" title="' +
              f.options.stopText +
              '" aria-label="' +
              f.options.stopText +
              '"></button></div>'
          )
            .appendTo(c)
            .click(function() {
              e.paused || e.pause(),
                e.currentTime > 0 &&
                  (e.setCurrentTime(0),
                  e.pause(),
                  c.find('.mejs-time-current').width('0px'),
                  c.find('.mejs-time-handle').css('left', '0px'),
                  c
                    .find('.mejs-time-float-current')
                    .html(mejs.Utility.secondsToTimeCode(0, b.options)),
                  c
                    .find('.mejs-currenttime')
                    .html(mejs.Utility.secondsToTimeCode(0, b.options)),
                  d.find('.mejs-poster').show());
            });
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      progessHelpText: mejs.i18n.t(
        'Use Left/Right Arrow keys to advance one second, Up/Down arrows to advance ten seconds.'
      ),
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildprogress: function(b, c, d, e) {
          a(
            '<div class="mejs-time-rail"><span  class="mejs-time-total mejs-time-slider"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>'
          ).appendTo(c),
            c.find('.mejs-time-buffering').hide();
          var f = this,
            g = c.find('.mejs-time-total'),
            h = c.find('.mejs-time-loaded'),
            i = c.find('.mejs-time-current'),
            j = c.find('.mejs-time-handle'),
            k = c.find('.mejs-time-float'),
            l = c.find('.mejs-time-float-current'),
            m = c.find('.mejs-time-slider'),
            n = function(a) {
              var c,
                d = g.offset(),
                f = g.width(),
                h = 0,
                i = 0,
                j = 0;
              (c =
                a.originalEvent && a.originalEvent.changedTouches
                  ? a.originalEvent.changedTouches[0].pageX
                  : a.changedTouches ? a.changedTouches[0].pageX : a.pageX),
                e.duration &&
                  (c < d.left
                    ? (c = d.left)
                    : c > f + d.left && (c = f + d.left),
                  (j = c - d.left),
                  (h = j / f),
                  (i = 0.02 >= h ? 0 : h * e.duration),
                  o && i !== e.currentTime && e.setCurrentTime(i),
                  mejs.MediaFeatures.hasTouch ||
                    (k.css('left', j),
                    l.html(mejs.Utility.secondsToTimeCode(i, b.options)),
                    k.show()));
            },
            o = !1,
            p = !1,
            q = 0,
            r = !1,
            s = b.options.autoRewind,
            t = function(a) {
              var c = e.currentTime,
                d = mejs.i18n.t('Time Slider'),
                f = mejs.Utility.secondsToTimeCode(c, b.options),
                g = e.duration;
              m.attr({
                'aria-label': d,
                'aria-valuemin': 0,
                'aria-valuemax': g,
                'aria-valuenow': c,
                'aria-valuetext': f,
                role: 'slider',
                tabindex: 0,
              });
            },
            u = function() {
              var a = new Date();
              a - q >= 1e3 && e.play();
            };
          m.bind('focus', function(a) {
            b.options.autoRewind = !1;
          }),
            m.bind('blur', function(a) {
              b.options.autoRewind = s;
            }),
            m.bind('keydown', function(a) {
              new Date() - q >= 1e3 && (r = e.paused);
              var c = a.keyCode,
                d = e.duration,
                f = e.currentTime,
                g = b.options.defaultSeekForwardInterval(d),
                h = b.options.defaultSeekBackwardInterval(d);
              switch (c) {
                case 37:
                case 40:
                  f -= h;
                  break;
                case 39:
                case 38:
                  f += g;
                  break;
                case 36:
                  f = 0;
                  break;
                case 35:
                  f = d;
                  break;
                case 32:
                case 13:
                  return void (e.paused ? e.play() : e.pause());
                default:
                  return;
              }
              return (
                (f = 0 > f ? 0 : f >= d ? d : Math.floor(f)),
                (q = new Date()),
                r || e.pause(),
                f < e.duration && !r && setTimeout(u, 1100),
                e.setCurrentTime(f),
                a.preventDefault(),
                a.stopPropagation(),
                !1
              );
            }),
            g
              .bind('mousedown touchstart', function(a) {
                (1 === a.which || 0 === a.which) &&
                  ((o = !0),
                  n(a),
                  f.globalBind('mousemove.dur touchmove.dur', function(a) {
                    n(a);
                  }),
                  f.globalBind('mouseup.dur touchend.dur', function(a) {
                    (o = !1), k.hide(), f.globalUnbind('.dur');
                  }));
              })
              .bind('mouseenter', function(a) {
                (p = !0),
                  f.globalBind('mousemove.dur', function(a) {
                    n(a);
                  }),
                  mejs.MediaFeatures.hasTouch || k.show();
              })
              .bind('mouseleave', function(a) {
                (p = !1), o || (f.globalUnbind('.dur'), k.hide());
              }),
            e.addEventListener(
              'progress',
              function(a) {
                b.setProgressRail(a), b.setCurrentRail(a);
              },
              !1
            ),
            e.addEventListener(
              'timeupdate',
              function(a) {
                b.setProgressRail(a), b.setCurrentRail(a), t(a);
              },
              !1
            ),
            f.container.on('controlsresize', function() {
              b.setProgressRail(), b.setCurrentRail();
            }),
            (f.loaded = h),
            (f.total = g),
            (f.current = i),
            (f.handle = j);
        },
        setProgressRail: function(a) {
          var b = this,
            c = void 0 !== a ? a.target : b.media,
            d = null;
          c &&
          c.buffered &&
          c.buffered.length > 0 &&
          c.buffered.end &&
          c.duration
            ? (d = c.buffered.end(c.buffered.length - 1) / c.duration)
            : c &&
              void 0 !== c.bytesTotal &&
              c.bytesTotal > 0 &&
              void 0 !== c.bufferedBytes
              ? (d = c.bufferedBytes / c.bytesTotal)
              : a &&
                a.lengthComputable &&
                0 !== a.total &&
                (d = a.loaded / a.total),
            null !== d &&
              ((d = Math.min(1, Math.max(0, d))),
              b.loaded && b.total && b.loaded.width(b.total.width() * d));
        },
        setCurrentRail: function() {
          var a = this;
          if (
            void 0 !== a.media.currentTime &&
            a.media.duration &&
            a.total &&
            a.handle
          ) {
            var b = Math.round(
                a.total.width() * a.media.currentTime / a.media.duration
              ),
              c = b - Math.round(a.handle.outerWidth(!0) / 2);
            a.current.width(b), a.handle.css('left', c);
          }
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      duration: -1,
      timeAndDurationSeparator: '<span> | </span>',
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildcurrent: function(b, c, d, e) {
          var f = this;
          a(
            '<div class="mejs-time" role="timer" aria-live="off"><span class="mejs-currenttime">' +
              mejs.Utility.secondsToTimeCode(0, b.options) +
              '</span></div>'
          ).appendTo(c),
            (f.currenttime = f.controls.find('.mejs-currenttime')),
            e.addEventListener(
              'timeupdate',
              function() {
                b.updateCurrent();
              },
              !1
            );
        },
        buildduration: function(b, c, d, e) {
          var f = this;
          c
            .children()
            .last()
            .find('.mejs-currenttime').length > 0
            ? a(
                f.options.timeAndDurationSeparator +
                  '<span class="mejs-duration">' +
                  mejs.Utility.secondsToTimeCode(
                    f.options.duration,
                    f.options
                  ) +
                  '</span>'
              ).appendTo(c.find('.mejs-time'))
            : (c
                .find('.mejs-currenttime')
                .parent()
                .addClass('mejs-currenttime-container'),
              a(
                '<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' +
                  mejs.Utility.secondsToTimeCode(
                    f.options.duration,
                    f.options
                  ) +
                  '</span></div>'
              ).appendTo(c)),
            (f.durationD = f.controls.find('.mejs-duration')),
            e.addEventListener(
              'timeupdate',
              function() {
                b.updateDuration();
              },
              !1
            );
        },
        updateCurrent: function() {
          var a = this,
            b = a.media.currentTime;
          isNaN(b) && (b = 0),
            a.currenttime &&
              a.currenttime.html(mejs.Utility.secondsToTimeCode(b, a.options));
        },
        updateDuration: function() {
          var a = this,
            b = a.media.duration;
          a.options.duration > 0 && (b = a.options.duration),
            isNaN(b) && (b = 0),
            a.container.toggleClass('mejs-long-video', b > 3600),
            a.durationD &&
              b > 0 &&
              a.durationD.html(mejs.Utility.secondsToTimeCode(b, a.options));
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      muteText: mejs.i18n.t('Mute Toggle'),
      allyVolumeControlText: mejs.i18n.t(
        'Use Up/Down Arrow keys to increase or decrease volume.'
      ),
      hideVolumeOnTouchDevices: !0,
      audioVolume: 'horizontal',
      videoVolume: 'vertical',
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildvolume: function(b, c, d, e) {
          if (
            (!mejs.MediaFeatures.isAndroid && !mejs.MediaFeatures.isiOS) ||
            !this.options.hideVolumeOnTouchDevices
          ) {
            var f = this,
              g = f.isVideo ? f.options.videoVolume : f.options.audioVolume,
              h =
                'horizontal' == g
                  ? a(
                      '<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' +
                        f.id +
                        '" title="' +
                        f.options.muteText +
                        '" aria-label="' +
                        f.options.muteText +
                        '"></button></div><a href="javascript:void(0);" class="mejs-horizontal-volume-slider"><span class="mejs-offscreen">' +
                        f.options.allyVolumeControlText +
                        '</span><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></a>'
                    ).appendTo(c)
                  : a(
                      '<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' +
                        f.id +
                        '" title="' +
                        f.options.muteText +
                        '" aria-label="' +
                        f.options.muteText +
                        '"></button><a href="javascript:void(0);" class="mejs-volume-slider"><span class="mejs-offscreen">' +
                        f.options.allyVolumeControlText +
                        '</span><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></a></div>'
                    ).appendTo(c),
              i = f.container.find(
                '.mejs-volume-slider, .mejs-horizontal-volume-slider'
              ),
              j = f.container.find(
                '.mejs-volume-total, .mejs-horizontal-volume-total'
              ),
              k = f.container.find(
                '.mejs-volume-current, .mejs-horizontal-volume-current'
              ),
              l = f.container.find(
                '.mejs-volume-handle, .mejs-horizontal-volume-handle'
              ),
              m = function(a, b) {
                if (!i.is(':visible') && 'undefined' == typeof b)
                  return i.show(), m(a, !0), void i.hide();
                (a = Math.max(0, a)),
                  (a = Math.min(a, 1)),
                  0 === a
                    ? (h.removeClass('mejs-mute').addClass('mejs-unmute'),
                      h
                        .children('button')
                        .attr('title', mejs.i18n.t('Unmute'))
                        .attr('aria-label', mejs.i18n.t('Unmute')))
                    : (h.removeClass('mejs-unmute').addClass('mejs-mute'),
                      h
                        .children('button')
                        .attr('title', mejs.i18n.t('Mute'))
                        .attr('aria-label', mejs.i18n.t('Mute')));
                var c = j.position();
                if ('vertical' == g) {
                  var d = j.height(),
                    e = d - d * a;
                  l.css('top', Math.round(c.top + e - l.height() / 2)),
                    k.height(d - e),
                    k.css('top', c.top + e);
                } else {
                  var f = j.width(),
                    n = f * a;
                  l.css('left', Math.round(c.left + n - l.width() / 2)),
                    k.width(Math.round(n));
                }
              },
              n = function(a) {
                var b = null,
                  c = j.offset();
                if ('vertical' === g) {
                  var d = j.height(),
                    f = a.pageY - c.top;
                  if (((b = (d - f) / d), 0 === c.top || 0 === c.left)) return;
                } else {
                  var h = j.width(),
                    i = a.pageX - c.left;
                  b = i / h;
                }
                (b = Math.max(0, b)),
                  (b = Math.min(b, 1)),
                  m(b),
                  0 === b ? e.setMuted(!0) : e.setMuted(!1),
                  e.setVolume(b);
              },
              o = !1,
              p = !1;
            h.hover(
              function() {
                i.show(), (p = !0);
              },
              function() {
                (p = !1), o || 'vertical' != g || i.hide();
              }
            );
            var q = function(a) {
              var b = Math.floor(100 * e.volume);
              i.attr({
                'aria-label': mejs.i18n.t('Volume Slider'),
                'aria-valuemin': 0,
                'aria-valuemax': 100,
                'aria-valuenow': b,
                'aria-valuetext': b + '%',
                role: 'slider',
                tabindex: 0,
              });
            };
            i
              .bind('mouseover', function() {
                p = !0;
              })
              .bind('mousedown', function(a) {
                return (
                  n(a),
                  f.globalBind('mousemove.vol', function(a) {
                    n(a);
                  }),
                  f.globalBind('mouseup.vol', function() {
                    (o = !1),
                      f.globalUnbind('.vol'),
                      p || 'vertical' != g || i.hide();
                  }),
                  (o = !0),
                  !1
                );
              })
              .bind('keydown', function(a) {
                var b = a.keyCode,
                  c = e.volume;
                switch (b) {
                  case 38:
                    c = Math.min(c + 0.1, 1);
                    break;
                  case 40:
                    c = Math.max(0, c - 0.1);
                    break;
                  default:
                    return !0;
                }
                return (o = !1), m(c), e.setVolume(c), !1;
              }),
              h.find('button').click(function() {
                e.setMuted(!e.muted);
              }),
              h.find('button').bind('focus', function() {
                i.show();
              }),
              e.addEventListener(
                'volumechange',
                function(a) {
                  o ||
                    (e.muted
                      ? (m(0),
                        h.removeClass('mejs-mute').addClass('mejs-unmute'))
                      : (m(e.volume),
                        h.removeClass('mejs-unmute').addClass('mejs-mute'))),
                    q(a);
                },
                !1
              ),
              0 === b.options.startVolume && e.setMuted(!0),
              'native' === e.pluginType && e.setVolume(b.options.startVolume),
              f.container.on('controlsresize', function() {
                m(e.volume);
              });
          }
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      usePluginFullScreen: !0,
      newWindowCallback: function() {
        return '';
      },
      fullscreenText: mejs.i18n.t('Fullscreen'),
    }),
      a.extend(MediaElementPlayer.prototype, {
        isFullScreen: !1,
        isNativeFullScreen: !1,
        isInIframe: !1,
        fullscreenMode: '',
        buildfullscreen: function(b, c, d, e) {
          if (b.isVideo) {
            (b.isInIframe = window.location != window.parent.location),
              e.addEventListener('play', function() {
                b.detectFullscreenMode();
              });
            var f = this,
              g = null,
              h = a(
                '<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' +
                  f.id +
                  '" title="' +
                  f.options.fullscreenText +
                  '" aria-label="' +
                  f.options.fullscreenText +
                  '"></button></div>'
              )
                .appendTo(c)
                .on('click', function() {
                  var a =
                    (mejs.MediaFeatures.hasTrueNativeFullScreen &&
                      mejs.MediaFeatures.isFullScreen()) ||
                    b.isFullScreen;
                  a ? b.exitFullScreen() : b.enterFullScreen();
                })
                .on('mouseover', function() {
                  if ('plugin-hover' == f.fullscreenMode) {
                    null !== g && (clearTimeout(g), delete g);
                    var a = h.offset(),
                      c = b.container.offset();
                    e.positionFullscreenButton(
                      a.left - c.left,
                      a.top - c.top,
                      !0
                    );
                  }
                })
                .on('mouseout', function() {
                  'plugin-hover' == f.fullscreenMode &&
                    (null !== g && (clearTimeout(g), delete g),
                    (g = setTimeout(function() {
                      e.hideFullscreenButton();
                    }, 1500)));
                });
            if (
              ((b.fullscreenBtn = h),
              f.globalBind('keydown', function(a) {
                27 == a.keyCode &&
                  ((mejs.MediaFeatures.hasTrueNativeFullScreen &&
                    mejs.MediaFeatures.isFullScreen()) ||
                    f.isFullScreen) &&
                  b.exitFullScreen();
              }),
              (f.normalHeight = 0),
              (f.normalWidth = 0),
              mejs.MediaFeatures.hasTrueNativeFullScreen)
            ) {
              var i = function(a) {
                b.isFullScreen &&
                  (mejs.MediaFeatures.isFullScreen()
                    ? ((b.isNativeFullScreen = !0), b.setControlsSize())
                    : ((b.isNativeFullScreen = !1), b.exitFullScreen()));
              };
              b.globalBind(mejs.MediaFeatures.fullScreenEventName, i);
            }
          }
        },
        detectFullscreenMode: function() {
          var a = this,
            b = '',
            c = mejs.MediaFeatures;
          return (
            c.hasTrueNativeFullScreen && 'native' === a.media.pluginType
              ? (b = 'native-native')
              : c.hasTrueNativeFullScreen &&
                'native' !== a.media.pluginType &&
                !c.hasFirefoxPluginMovingProblem
                ? (b = 'plugin-native')
                : a.usePluginFullScreen
                  ? mejs.MediaFeatures.supportsPointerEvents
                    ? ((b = 'plugin-click'), a.createPluginClickThrough())
                    : (b = 'plugin-hover')
                  : (b = 'fullwindow'),
            (a.fullscreenMode = b),
            b
          );
        },
        isPluginClickThroughCreated: !1,
        createPluginClickThrough: function() {
          var b = this;
          if (!b.isPluginClickThroughCreated) {
            var c,
              d,
              e = !1,
              f = function() {
                if (e) {
                  for (var a in g) g[a].hide();
                  b.fullscreenBtn.css('pointer-events', ''),
                    b.controls.css('pointer-events', ''),
                    b.media.removeEventListener(
                      'click',
                      b.clickToPlayPauseCallback
                    ),
                    (e = !1);
                }
              },
              g = {},
              h = ['top', 'left', 'right', 'bottom'],
              i = function() {
                var a = fullscreenBtn.offset().left - b.container.offset().left,
                  d = fullscreenBtn.offset().top - b.container.offset().top,
                  e = fullscreenBtn.outerWidth(!0),
                  f = fullscreenBtn.outerHeight(!0),
                  h = b.container.width(),
                  i = b.container.height();
                for (c in g)
                  g[c].css({ position: 'absolute', top: 0, left: 0 });
                g.top.width(h).height(d),
                  g.left
                    .width(a)
                    .height(f)
                    .css({ top: d }),
                  g.right
                    .width(h - a - e)
                    .height(f)
                    .css({ top: d, left: a + e }),
                  g.bottom
                    .width(h)
                    .height(i - f - d)
                    .css({ top: d + f });
              };
            for (
              b.globalBind('resize', function() {
                i();
              }),
                c = 0,
                d = h.length;
              d > c;
              c++
            )
              g[h[c]] = a('<div class="mejs-fullscreen-hover" />')
                .appendTo(b.container)
                .mouseover(f)
                .hide();
            fullscreenBtn.on('mouseover', function() {
              if (!b.isFullScreen) {
                var a = fullscreenBtn.offset(),
                  d = player.container.offset();
                media.positionFullscreenButton(
                  a.left - d.left,
                  a.top - d.top,
                  !1
                ),
                  b.fullscreenBtn.css('pointer-events', 'none'),
                  b.controls.css('pointer-events', 'none'),
                  b.media.addEventListener('click', b.clickToPlayPauseCallback);
                for (c in g) g[c].show();
                i(), (e = !0);
              }
            }),
              media.addEventListener('fullscreenchange', function(a) {
                (b.isFullScreen = !b.isFullScreen),
                  b.isFullScreen
                    ? b.media.removeEventListener(
                        'click',
                        b.clickToPlayPauseCallback
                      )
                    : b.media.addEventListener(
                        'click',
                        b.clickToPlayPauseCallback
                      ),
                  f();
              }),
              b.globalBind('mousemove', function(a) {
                if (e) {
                  var c = fullscreenBtn.offset();
                  (a.pageY < c.top ||
                    a.pageY > c.top + fullscreenBtn.outerHeight(!0) ||
                    a.pageX < c.left ||
                    a.pageX > c.left + fullscreenBtn.outerWidth(!0)) &&
                    (fullscreenBtn.css('pointer-events', ''),
                    b.controls.css('pointer-events', ''),
                    (e = !1));
                }
              }),
              (b.isPluginClickThroughCreated = !0);
          }
        },
        cleanfullscreen: function(a) {
          a.exitFullScreen();
        },
        containerSizeTimeout: null,
        enterFullScreen: function() {
          var b = this;
          return mejs.MediaFeatures.hasiOSFullScreen
            ? void b.media.webkitEnterFullscreen()
            : (a(document.documentElement).addClass('mejs-fullscreen'),
              (b.normalHeight = b.container.height()),
              (b.normalWidth = b.container.width()),
              'native-native' === b.fullscreenMode ||
              'plugin-native' === b.fullscreenMode
                ? (mejs.MediaFeatures.requestFullScreen(b.container[0]),
                  b.isInIframe &&
                    setTimeout(function c() {
                      if (b.isNativeFullScreen) {
                        var d = 0.002,
                          e = a(window).width(),
                          f = screen.width,
                          g = Math.abs(f - e),
                          h = f * d;
                        g > h ? b.exitFullScreen() : setTimeout(c, 500);
                      }
                    }, 1e3))
                : 'fullwindow' == b.fullscreeMode,
              b.container
                .addClass('mejs-container-fullscreen')
                .width('100%')
                .height('100%'),
              (b.containerSizeTimeout = setTimeout(function() {
                b.container.css({ width: '100%', height: '100%' }),
                  b.setControlsSize();
              }, 500)),
              'native' === b.media.pluginType
                ? b.$media.width('100%').height('100%')
                : (b.container
                    .find('.mejs-shim')
                    .width('100%')
                    .height('100%'),
                  setTimeout(function() {
                    var c = a(window),
                      d = c.width(),
                      e = c.height();
                    b.media.setVideoSize(d, e);
                  }, 500)),
              b.layers
                .children('div')
                .width('100%')
                .height('100%'),
              b.fullscreenBtn &&
                b.fullscreenBtn
                  .removeClass('mejs-fullscreen')
                  .addClass('mejs-unfullscreen'),
              b.setControlsSize(),
              (b.isFullScreen = !0),
              b.container
                .find('.mejs-captions-text')
                .css('font-size', screen.width / b.width * 1 * 100 + '%'),
              b.container.find('.mejs-captions-position').css('bottom', '45px'),
              void b.container.trigger('enteredfullscreen'));
        },
        exitFullScreen: function() {
          var b = this;
          clearTimeout(b.containerSizeTimeout),
            mejs.MediaFeatures.hasTrueNativeFullScreen &&
              (mejs.MediaFeatures.isFullScreen() || b.isFullScreen) &&
              mejs.MediaFeatures.cancelFullScreen(),
            a(document.documentElement).removeClass('mejs-fullscreen'),
            b.container
              .removeClass('mejs-container-fullscreen')
              .width(b.normalWidth)
              .height(b.normalHeight),
            'native' === b.media.pluginType
              ? b.$media.width(b.normalWidth).height(b.normalHeight)
              : (b.container
                  .find('.mejs-shim')
                  .width(b.normalWidth)
                  .height(b.normalHeight),
                b.media.setVideoSize(b.normalWidth, b.normalHeight)),
            b.layers
              .children('div')
              .width(b.normalWidth)
              .height(b.normalHeight),
            b.fullscreenBtn
              .removeClass('mejs-unfullscreen')
              .addClass('mejs-fullscreen'),
            b.setControlsSize(),
            (b.isFullScreen = !1),
            b.container.find('.mejs-captions-text').css('font-size', ''),
            b.container.find('.mejs-captions-position').css('bottom', ''),
            b.container.trigger('exitedfullscreen');
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      speeds: ['2.00', '1.50', '1.25', '1.00', '0.75'],
      defaultSpeed: '1.00',
      speedChar: 'x',
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildspeed: function(b, c, d, e) {
          var f = this;
          if ('native' == f.media.pluginType) {
            for (
              var g = null,
                h = null,
                i = null,
                j = null,
                k = [],
                l = !1,
                m = 0,
                n = f.options.speeds.length;
              n > m;
              m++
            ) {
              var o = f.options.speeds[m];
              'string' == typeof o
                ? (k.push({ name: o + f.options.speedChar, value: o }),
                  o === f.options.defaultSpeed && (l = !0))
                : (k.push(o), o.value === f.options.defaultSpeed && (l = !0));
            }
            l ||
              k.push({
                name: f.options.defaultSpeed + f.options.speedChar,
                value: f.options.defaultSpeed,
              }),
              k.sort(function(a, b) {
                return parseFloat(b.value) - parseFloat(a.value);
              });
            var p = function(a) {
                for (m = 0, n = k.length; n > m; m++)
                  if (k[m].value === a) return k[m].name;
              },
              q =
                '<div class="mejs-button mejs-speed-button"><button type="button">' +
                p(f.options.defaultSpeed) +
                '</button><div class="mejs-speed-selector"><ul>';
            for (m = 0, il = k.length; m < il; m++)
              (j = f.id + '-speed-' + k[m].value),
                (q +=
                  '<li><input type="radio" name="speed" value="' +
                  k[m].value +
                  '" id="' +
                  j +
                  '" ' +
                  (k[m].value === f.options.defaultSpeed ? ' checked' : '') +
                  ' /><label for="' +
                  j +
                  '" ' +
                  (k[m].value === f.options.defaultSpeed
                    ? ' class="mejs-speed-selected"'
                    : '') +
                  '>' +
                  k[m].name +
                  '</label></li>');
            (q += '</ul></div></div>'),
              (g = a(q).appendTo(c)),
              (h = g.find('.mejs-speed-selector')),
              (i = f.options.defaultSpeed),
              e.addEventListener(
                'loadedmetadata',
                function(a) {
                  i && (e.playbackRate = parseFloat(i));
                },
                !0
              ),
              h.on('click', 'input[type="radio"]', function() {
                var b = a(this).attr('value');
                (i = b),
                  (e.playbackRate = parseFloat(b)),
                  g.find('button').html(p(b)),
                  g
                    .find('.mejs-speed-selected')
                    .removeClass('mejs-speed-selected'),
                  g
                    .find('input[type="radio"]:checked')
                    .next()
                    .addClass('mejs-speed-selected');
              }),
              g.one('mouseenter focusin', function() {
                h
                  .height(
                    g.find('.mejs-speed-selector ul').outerHeight(!0) +
                      g.find('.mejs-speed-translations').outerHeight(!0)
                  )
                  .css('top', -1 * h.height() + 'px');
              });
          }
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      startLanguage: '',
      tracksText: mejs.i18n.t('Captions/Subtitles'),
      tracksAriaLive: !1,
      hideCaptionsButtonWhenEmpty: !0,
      toggleCaptionsButtonWhenOnlyOne: !1,
      slidesSelector: '',
    }),
      a.extend(MediaElementPlayer.prototype, {
        hasChapters: !1,
        cleartracks: function(a, b, c, d) {
          a &&
            (a.captions && a.captions.remove(),
            a.chapters && a.chapters.remove(),
            a.captionsText && a.captionsText.remove(),
            a.captionsButton && a.captionsButton.remove());
        },
        buildtracks: function(b, c, d, e) {
          if (0 !== b.tracks.length) {
            var f,
              g = this,
              h = g.options.tracksAriaLive
                ? 'role="log" aria-live="assertive" aria-atomic="false"'
                : '';
            if (g.domNode.textTracks)
              for (f = g.domNode.textTracks.length - 1; f >= 0; f--)
                g.domNode.textTracks[f].mode = 'hidden';
            g.cleartracks(b, c, d, e),
              (b.chapters = a('<div class="mejs-chapters mejs-layer"></div>')
                .prependTo(d)
                .hide()),
              (b.captions = a(
                '<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover" ' +
                  h +
                  '><span class="mejs-captions-text"></span></div></div>'
              )
                .prependTo(d)
                .hide()),
              (b.captionsText = b.captions.find('.mejs-captions-text')),
              (b.captionsButton = a(
                '<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' +
                  g.id +
                  '" title="' +
                  g.options.tracksText +
                  '" aria-label="' +
                  g.options.tracksText +
                  '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' +
                  b.id +
                  '_captions" id="' +
                  b.id +
                  '_captions_none" value="none" checked="checked" /><label for="' +
                  b.id +
                  '_captions_none">' +
                  mejs.i18n.t('None') +
                  '</label></li></ul></div></div>'
              ).appendTo(c));
            var i = 0;
            for (f = 0; f < b.tracks.length; f++)
              'subtitles' == b.tracks[f].kind && i++;
            for (
              g.options.toggleCaptionsButtonWhenOnlyOne && 1 == i
                ? b.captionsButton.on('click', function() {
                    null === b.selectedTrack
                      ? (lang = b.tracks[0].srclang)
                      : (lang = 'none'),
                      b.setTrack(lang);
                  })
                : (b.captionsButton
                    .on('mouseenter focusin', function() {
                      a(this)
                        .find('.mejs-captions-selector')
                        .removeClass('mejs-offscreen');
                    })
                    .on('click', 'input[type=radio]', function() {
                      (lang = this.value), b.setTrack(lang);
                    }),
                  b.captionsButton.on('mouseleave focusout', function() {
                    a(this)
                      .find('.mejs-captions-selector')
                      .addClass('mejs-offscreen');
                  })),
                b.options.alwaysShowControls
                  ? b.container
                      .find('.mejs-captions-position')
                      .addClass('mejs-captions-position-hover')
                  : b.container
                      .bind('controlsshown', function() {
                        b.container
                          .find('.mejs-captions-position')
                          .addClass('mejs-captions-position-hover');
                      })
                      .bind('controlshidden', function() {
                        e.paused ||
                          b.container
                            .find('.mejs-captions-position')
                            .removeClass('mejs-captions-position-hover');
                      }),
                b.trackToLoad = -1,
                b.selectedTrack = null,
                b.isLoadingTrack = !1,
                f = 0;
              f < b.tracks.length;
              f++
            )
              'subtitles' == b.tracks[f].kind &&
                b.addTrackButton(b.tracks[f].srclang, b.tracks[f].label);
            b.loadNextTrack(),
              e.addEventListener(
                'timeupdate',
                function(a) {
                  b.displayCaptions();
                },
                !1
              ),
              '' !== b.options.slidesSelector &&
                ((b.slidesContainer = a(b.options.slidesSelector)),
                e.addEventListener(
                  'timeupdate',
                  function(a) {
                    b.displaySlides();
                  },
                  !1
                )),
              e.addEventListener(
                'loadedmetadata',
                function(a) {
                  b.displayChapters();
                },
                !1
              ),
              b.container.hover(
                function() {
                  b.hasChapters &&
                    (b.chapters.removeClass('mejs-offscreen'),
                    b.chapters
                      .fadeIn(200)
                      .height(b.chapters.find('.mejs-chapter').outerHeight()));
                },
                function() {
                  b.hasChapters &&
                    !e.paused &&
                    b.chapters.fadeOut(200, function() {
                      a(this).addClass('mejs-offscreen'),
                        a(this).css('display', 'block');
                    });
                }
              ),
              g.container.on('controlsresize', function() {
                g.adjustLanguageBox();
              }),
              null !== b.node.getAttribute('autoplay') &&
                b.chapters.addClass('mejs-offscreen');
          }
        },
        setTrack: function(a) {
          var b,
            c = this;
          if ('none' == a)
            (c.selectedTrack = null),
              c.captionsButton.removeClass('mejs-captions-enabled');
          else
            for (b = 0; b < c.tracks.length; b++)
              if (c.tracks[b].srclang == a) {
                null === c.selectedTrack &&
                  c.captionsButton.addClass('mejs-captions-enabled'),
                  (c.selectedTrack = c.tracks[b]),
                  c.captions.attr('lang', c.selectedTrack.srclang),
                  c.displayCaptions();
                break;
              }
        },
        loadNextTrack: function() {
          var a = this;
          a.trackToLoad++,
            a.trackToLoad < a.tracks.length
              ? ((a.isLoadingTrack = !0), a.loadTrack(a.trackToLoad))
              : ((a.isLoadingTrack = !1), a.checkForTracks());
        },
        loadTrack: function(b) {
          var c = this,
            d = c.tracks[b],
            e = function() {
              (d.isLoaded = !0),
                c.enableTrackButton(d.srclang, d.label),
                c.loadNextTrack();
            };
          a.ajax({
            url: d.src,
            dataType: 'text',
            success: function(a) {
              'string' == typeof a && /<tt\s+xml/gi.exec(a)
                ? (d.entries = mejs.TrackFormatParser.dfxp.parse(a))
                : (d.entries = mejs.TrackFormatParser.webvtt.parse(a)),
                e(),
                'chapters' == d.kind &&
                  c.media.addEventListener(
                    'play',
                    function(a) {
                      c.media.duration > 0 && c.displayChapters(d);
                    },
                    !1
                  ),
                'slides' == d.kind && c.setupSlides(d);
            },
            error: function() {
              c.removeTrackButton(d.srclang), c.loadNextTrack();
            },
          });
        },
        enableTrackButton: function(b, c) {
          var d = this;
          '' === c && (c = mejs.language.codes[b] || b),
            d.captionsButton
              .find('input[value=' + b + ']')
              .prop('disabled', !1)
              .siblings('label')
              .html(c),
            d.options.startLanguage == b &&
              a('#' + d.id + '_captions_' + b)
                .prop('checked', !0)
                .trigger('click'),
            d.adjustLanguageBox();
        },
        removeTrackButton: function(a) {
          var b = this;
          b.captionsButton
            .find('input[value=' + a + ']')
            .closest('li')
            .remove(),
            b.adjustLanguageBox();
        },
        addTrackButton: function(b, c) {
          var d = this;
          '' === c && (c = mejs.language.codes[b] || b),
            d.captionsButton
              .find('ul')
              .append(
                a(
                  '<li><input type="radio" name="' +
                    d.id +
                    '_captions" id="' +
                    d.id +
                    '_captions_' +
                    b +
                    '" value="' +
                    b +
                    '" disabled="disabled" /><label for="' +
                    d.id +
                    '_captions_' +
                    b +
                    '">' +
                    c +
                    ' (loading)</label></li>'
                )
              ),
            d.adjustLanguageBox(),
            d.container
              .find('.mejs-captions-translations option[value=' + b + ']')
              .remove();
        },
        adjustLanguageBox: function() {
          var a = this;
          a.captionsButton
            .find('.mejs-captions-selector')
            .height(
              a.captionsButton
                .find('.mejs-captions-selector ul')
                .outerHeight(!0) +
                a.captionsButton
                  .find('.mejs-captions-translations')
                  .outerHeight(!0)
            );
        },
        checkForTracks: function() {
          var a = this,
            b = !1;
          if (a.options.hideCaptionsButtonWhenEmpty) {
            for (i = 0; i < a.tracks.length; i++)
              if ('subtitles' == a.tracks[i].kind && a.tracks[i].isLoaded) {
                b = !0;
                break;
              }
            b || (a.captionsButton.hide(), a.setControlsSize());
          }
        },
        displayCaptions: function() {
          if ('undefined' != typeof this.tracks) {
            var a,
              b = this,
              c = b.selectedTrack;
            if (null !== c && c.isLoaded) {
              for (a = 0; a < c.entries.times.length; a++)
                if (
                  b.media.currentTime >= c.entries.times[a].start &&
                  b.media.currentTime <= c.entries.times[a].stop
                )
                  return (
                    b.captionsText
                      .html(c.entries.text[a])
                      .attr(
                        'class',
                        'mejs-captions-text ' +
                          (c.entries.times[a].identifier || '')
                      ),
                    void b.captions.show().height(0)
                  );
              b.captions.hide();
            } else b.captions.hide();
          }
        },
        setupSlides: function(a) {
          var b = this;
          (b.slides = a),
            (b.slides.entries.imgs = [b.slides.entries.text.length]),
            b.showSlide(0);
        },
        showSlide: function(b) {
          if (
            'undefined' != typeof this.tracks &&
            'undefined' != typeof this.slidesContainer
          ) {
            var c = this,
              d = c.slides.entries.text[b],
              e = c.slides.entries.imgs[b];
            'undefined' == typeof e || 'undefined' == typeof e.fadeIn
              ? (c.slides.entries.imgs[b] = e = a(
                  '<img src="' + d + '">'
                ).on('load', function() {
                  e
                    .appendTo(c.slidesContainer)
                    .hide()
                    .fadeIn()
                    .siblings(':visible')
                    .fadeOut();
                }))
              : e.is(':visible') ||
                e.is(':animated') ||
                e
                  .fadeIn()
                  .siblings(':visible')
                  .fadeOut();
          }
        },
        displaySlides: function() {
          if ('undefined' != typeof this.slides) {
            var a,
              b = this,
              c = b.slides;
            for (a = 0; a < c.entries.times.length; a++)
              if (
                b.media.currentTime >= c.entries.times[a].start &&
                b.media.currentTime <= c.entries.times[a].stop
              )
                return void b.showSlide(a);
          }
        },
        displayChapters: function() {
          var a,
            b = this;
          for (a = 0; a < b.tracks.length; a++)
            if ('chapters' == b.tracks[a].kind && b.tracks[a].isLoaded) {
              b.drawChapters(b.tracks[a]), (b.hasChapters = !0);
              break;
            }
        },
        drawChapters: function(b) {
          var c,
            d,
            e = this,
            f = 0,
            g = 0;
          for (e.chapters.empty(), c = 0; c < b.entries.times.length; c++)
            (d = b.entries.times[c].stop - b.entries.times[c].start),
              (f = Math.floor(d / e.media.duration * 100)),
              (f + g > 100 ||
                (c == b.entries.times.length - 1 && 100 > f + g)) &&
                (f = 100 - g),
              e.chapters.append(
                a(
                  '<div class="mejs-chapter" rel="' +
                    b.entries.times[c].start +
                    '" style="left: ' +
                    g.toString() +
                    '%;width: ' +
                    f.toString() +
                    '%;"><div class="mejs-chapter-block' +
                    (c == b.entries.times.length - 1
                      ? ' mejs-chapter-block-last'
                      : '') +
                    '"><span class="ch-title">' +
                    b.entries.text[c] +
                    '</span><span class="ch-time">' +
                    mejs.Utility.secondsToTimeCode(
                      b.entries.times[c].start,
                      e.options
                    ) +
                    '&ndash;' +
                    mejs.Utility.secondsToTimeCode(
                      b.entries.times[c].stop,
                      e.options
                    ) +
                    '</span></div></div>'
                )
              ),
              (g += f);
          e.chapters.find('div.mejs-chapter').click(function() {
            e.media.setCurrentTime(parseFloat(a(this).attr('rel'))),
              e.media.paused && e.media.play();
          }),
            e.chapters.show();
        },
      }),
      (mejs.language = {
        codes: {
          af: 'Afrikaans',
          sq: 'Albanian',
          ar: 'Arabic',
          be: 'Belarusian',
          bg: 'Bulgarian',
          ca: 'Catalan',
          zh: 'Chinese',
          'zh-cn': 'Chinese Simplified',
          'zh-tw': 'Chinese Traditional',
          hr: 'Croatian',
          cs: 'Czech',
          da: 'Danish',
          nl: 'Dutch',
          en: 'English',
          et: 'Estonian',
          fl: 'Filipino',
          fi: 'Finnish',
          fr: 'French',
          gl: 'Galician',
          de: 'German',
          el: 'Greek',
          ht: 'Haitian Creole',
          iw: 'Hebrew',
          hi: 'Hindi',
          hu: 'Hungarian',
          is: 'Icelandic',
          id: 'Indonesian',
          ga: 'Irish',
          it: 'Italian',
          ja: 'Japanese',
          ko: 'Korean',
          lv: 'Latvian',
          lt: 'Lithuanian',
          mk: 'Macedonian',
          ms: 'Malay',
          mt: 'Maltese',
          no: 'Norwegian',
          fa: 'Persian',
          pl: 'Polish',
          pt: 'Portuguese',
          ro: 'Romanian',
          ru: 'Russian',
          sr: 'Serbian',
          sk: 'Slovak',
          sl: 'Slovenian',
          es: 'Spanish',
          sw: 'Swahili',
          sv: 'Swedish',
          tl: 'Tagalog',
          th: 'Thai',
          tr: 'Turkish',
          uk: 'Ukrainian',
          vi: 'Vietnamese',
          cy: 'Welsh',
          yi: 'Yiddish',
        },
      }),
      (mejs.TrackFormatParser = {
        webvtt: {
          pattern_timecode: /^((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ((?:[0-9]{1,2}:)?[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
          parse: function(b) {
            for (
              var c,
                d,
                e,
                f = 0,
                g = mejs.TrackFormatParser.split2(b, /\r?\n/),
                h = { text: [], times: [] };
              f < g.length;
              f++
            ) {
              if (((c = this.pattern_timecode.exec(g[f])), c && f < g.length)) {
                for (
                  f - 1 >= 0 && '' !== g[f - 1] && (e = g[f - 1]),
                    f++,
                    d = g[f],
                    f++;
                  '' !== g[f] && f < g.length;

                )
                  (d = d + '\n' + g[f]), f++;
                (d = a
                  .trim(d)
                  .replace(
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                    "<a href='$1' target='_blank'>$1</a>"
                  )),
                  h.text.push(d),
                  h.times.push({
                    identifier: e,
                    start:
                      0 === mejs.Utility.convertSMPTEtoSeconds(c[1])
                        ? 0.2
                        : mejs.Utility.convertSMPTEtoSeconds(c[1]),
                    stop: mejs.Utility.convertSMPTEtoSeconds(c[3]),
                    settings: c[5],
                  });
              }
              e = '';
            }
            return h;
          },
        },
        dfxp: {
          parse: function(b) {
            b = a(b).filter('tt');
            var c,
              d,
              e = 0,
              f = b.children('div').eq(0),
              g = f.find('p'),
              h = b.find('#' + f.attr('style')),
              i = { text: [], times: [] };
            if (h.length) {
              var j = h.removeAttr('id').get(0).attributes;
              if (j.length)
                for (c = {}, e = 0; e < j.length; e++)
                  c[j[e].name.split(':')[1]] = j[e].value;
            }
            for (e = 0; e < g.length; e++) {
              var k,
                l = { start: null, stop: null, style: null };
              if (
                (g.eq(e).attr('begin') &&
                  (l.start = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e).attr('begin')
                  )),
                !l.start &&
                  g.eq(e - 1).attr('end') &&
                  (l.start = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e - 1).attr('end')
                  )),
                g.eq(e).attr('end') &&
                  (l.stop = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e).attr('end')
                  )),
                !l.stop &&
                  g.eq(e + 1).attr('begin') &&
                  (l.stop = mejs.Utility.convertSMPTEtoSeconds(
                    g.eq(e + 1).attr('begin')
                  )),
                c)
              ) {
                k = '';
                for (var m in c) k += m + ':' + c[m] + ';';
              }
              k && (l.style = k),
                0 === l.start && (l.start = 0.2),
                i.times.push(l),
                (d = a
                  .trim(g.eq(e).html())
                  .replace(
                    /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi,
                    "<a href='$1' target='_blank'>$1</a>"
                  )),
                i.text.push(d),
                0 === i.times.start && (i.times.start = 2);
            }
            return i;
          },
        },
        split2: function(a, b) {
          return a.split(b);
        },
      }),
      3 != 'x\n\ny'.split(/\n/gi).length &&
        (mejs.TrackFormatParser.split2 = function(a, b) {
          var c,
            d = [],
            e = '';
          for (c = 0; c < a.length; c++)
            (e += a.substring(c, c + 1)),
              b.test(e) && (d.push(e.replace(b, '')), (e = ''));
          return d.push(e), d;
        });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      contextMenuItems: [
        {
          render: function(a) {
            return 'undefined' == typeof a.enterFullScreen
              ? null
              : a.isFullScreen
                ? mejs.i18n.t('Turn off Fullscreen')
                : mejs.i18n.t('Go Fullscreen');
          },
          click: function(a) {
            a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen();
          },
        },
        {
          render: function(a) {
            return a.media.muted ? mejs.i18n.t('Unmute') : mejs.i18n.t('Mute');
          },
          click: function(a) {
            a.media.muted ? a.setMuted(!1) : a.setMuted(!0);
          },
        },
        { isSeparator: !0 },
        {
          render: function(a) {
            return mejs.i18n.t('Download Video');
          },
          click: function(a) {
            window.location.href = a.media.currentSrc;
          },
        },
      ],
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function(b, c, d, e) {
          (b.contextMenu = a('<div class="mejs-contextmenu"></div>')
            .appendTo(a('body'))
            .hide()),
            b.container.bind('contextmenu', function(a) {
              return b.isContextMenuEnabled
                ? (a.preventDefault(),
                  b.renderContextMenu(a.clientX - 1, a.clientY - 1),
                  !1)
                : void 0;
            }),
            b.container.bind('click', function() {
              b.contextMenu.hide();
            }),
            b.contextMenu.bind('mouseleave', function() {
              b.startContextMenuTimer();
            });
        },
        cleancontextmenu: function(a) {
          a.contextMenu.remove();
        },
        isContextMenuEnabled: !0,
        enableContextMenu: function() {
          this.isContextMenuEnabled = !0;
        },
        disableContextMenu: function() {
          this.isContextMenuEnabled = !1;
        },
        contextMenuTimeout: null,
        startContextMenuTimer: function() {
          var a = this;
          a.killContextMenuTimer(),
            (a.contextMenuTimer = setTimeout(function() {
              a.hideContextMenu(), a.killContextMenuTimer();
            }, 750));
        },
        killContextMenuTimer: function() {
          var a = this.contextMenuTimer;
          null != a && (clearTimeout(a), delete a, (a = null));
        },
        hideContextMenu: function() {
          this.contextMenu.hide();
        },
        renderContextMenu: function(b, c) {
          for (
            var d = this,
              e = '',
              f = d.options.contextMenuItems,
              g = 0,
              h = f.length;
            h > g;
            g++
          )
            if (f[g].isSeparator)
              e += '<div class="mejs-contextmenu-separator"></div>';
            else {
              var i = f[g].render(d);
              null != i &&
                (e +=
                  '<div class="mejs-contextmenu-item" data-itemindex="' +
                  g +
                  '" id="element-' +
                  1e6 * Math.random() +
                  '">' +
                  i +
                  '</div>');
            }
          d.contextMenu
            .empty()
            .append(a(e))
            .css({ top: c, left: b })
            .show(),
            d.contextMenu.find('.mejs-contextmenu-item').each(function() {
              var b = a(this),
                c = parseInt(b.data('itemindex'), 10),
                e = d.options.contextMenuItems[c];
              'undefined' != typeof e.show && e.show(b, d),
                b.click(function() {
                  'undefined' != typeof e.click && e.click(d),
                    d.contextMenu.hide();
                });
            }),
            setTimeout(function() {
              d.killControlsTimer('rev3');
            }, 100);
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, {
      skipBackInterval: 30,
      skipBackText: mejs.i18n.t('Skip back %1 seconds'),
    }),
      a.extend(MediaElementPlayer.prototype, {
        buildskipback: function(b, c, d, e) {
          var f = this,
            g = f.options.skipBackText.replace(
              '%1',
              f.options.skipBackInterval
            );
          a(
            '<div class="mejs-button mejs-skip-back-button"><button type="button" aria-controls="' +
              f.id +
              '" title="' +
              g +
              '" aria-label="' +
              g +
              '">' +
              f.options.skipBackInterval +
              '</button></div>'
          )
            .appendTo(c)
            .click(function() {
              e.setCurrentTime(
                Math.max(e.currentTime - f.options.skipBackInterval, 0)
              ),
                a(this)
                  .find('button')
                  .blur();
            });
        },
      });
  })(mejs.$),
  (function(a) {
    a.extend(mejs.MepDefaults, { postrollCloseText: mejs.i18n.t('Close') }),
      a.extend(MediaElementPlayer.prototype, {
        buildpostroll: function(b, c, d, e) {
          var f = this,
            g = f.container.find('link[rel="postroll"]').attr('href');
          'undefined' != typeof g &&
            ((b.postroll = a(
              '<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' +
                f.options.postrollCloseText +
                '</a><div class="mejs-postroll-layer-content"></div></div>'
            )
              .prependTo(d)
              .hide()),
            f.media.addEventListener(
              'ended',
              function(c) {
                a.ajax({
                  dataType: 'html',
                  url: g,
                  success: function(a, b) {
                    d.find('.mejs-postroll-layer-content').html(a);
                  },
                }),
                  b.postroll.show();
              },
              !1
            ));
        },
      });
  })(mejs.$);

/*!
 * The Grid – Responsive Grid Plugin
 * Copyright © 2015 All Rights Reserved. 
 * @author Themeone [http://theme-one.com/the-grid/]
 */

var tg_global_var = {
  url: 'https://theme-one.com/the-grid/wp-admin/admin-ajax.php',
  nonce: 'cb9ac66177',
  is_mobile: null,
  mediaelement: '1',
  mediaelement_ex: '1',
  lightbox_autoplay: '',
  debounce: '1',
  meta_data: null,
  main_query: {
    page: 0,
    pagename: 'brasilia',
    error: '',
    m: '',
    p: 0,
    post_parent: '',
    subpost: '',
    subpost_id: '',
    attachment: '',
    attachment_id: 0,
    name: 'brasilia',
    static: '',
    page_id: 0,
    second: '',
    minute: '',
    hour: '',
    day: 0,
    monthnum: 0,
    year: 0,
    w: 0,
    category_name: '',
    tag: '',
    cat: '',
    tag_id: '',
    author: '',
    author_name: '',
    feed: '',
    tb: '',
    paged: 0,
    meta_key: '',
    meta_value: '',
    preview: '',
    s: '',
    sentence: '',
    title: '',
    fields: '',
    menu_order: '',
    embed: '',
    category__in: [],
    category__not_in: [],
    category__and: [],
    post__in: [],
    post__not_in: [],
    post_name__in: [],
    tag__in: [],
    tag__not_in: [],
    tag__and: [],
    tag_slug__in: [],
    tag_slug__and: [],
    post_parent__in: [],
    post_parent__not_in: [],
    author__in: [],
    author__not_in: [],
    ignore_sticky_posts: false,
    suppress_filters: false,
    cache_results: true,
    update_post_term_cache: true,
    lazy_load_term_meta: true,
    update_post_meta_cache: true,
    post_type: '',
    posts_per_page: 9,
    nopaging: false,
    comments_per_page: '50',
    no_found_rows: false,
    order: 'DESC',
  },
};

/*!
 * The Grid – Responsive Grid Plugin
 * Copyright © 2015 All Rights Reserved. 
 * @author Themeone [http://theme-one.com/the-grid/]
 */
function throttle(t, e) {
  var i = 0;
  return function() {
    var o = Date.now();
    if (i + e < o) return (i = o), t.apply(this, arguments);
  };
}
function debounce(t, e) {
  'use strict';
  var i;
  return function() {
    i && clearTimeout(i),
      setTimeout(function() {
        t(), (i = null);
      }, e || 100);
  };
}
!(function(t) {
  function e(t) {
    function e(e) {
      e.prototype.option ||
        (e.prototype.option = function(e) {
          t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e));
        });
    }
    function o(e, o) {
      t.fn[e] = function(n) {
        if ('string' == typeof n) {
          for (
            var r = i.call(arguments, 1), a = 0, s = this.length;
            a < s;
            a++
          ) {
            var l = this[a],
              u = t.data(l, e);
            if (u && (t.isFunction(u[n]) && '_' !== n.charAt(0))) {
              var d = u[n].apply(u, r);
              if (void 0 !== d) return d;
            }
          }
          return this;
        }
        return this.each(function() {
          var i = t.data(this, e);
          i
            ? (i.option(n), i._init())
            : ((i = new o(this, n)), t.data(this, e, i));
        });
      };
    }
    if (t) {
      return (
        (t.bridget = function(t, i) {
          e(i), o(t, i);
        }),
        t.bridget
      );
    }
  }
  var i = Array.prototype.slice;
  'function' == typeof define && define.amd
    ? define('jquery-bridget/jquery.bridget', ['jquery'], e)
    : e('object' == typeof exports ? require('jquery') : t.jQuery);
})(window),
  (function(t) {
    function e(e) {
      var i = t.event;
      return (i.target = i.target || i.srcElement || e), i;
    }
    var i = document.documentElement,
      o = function() {};
    i.addEventListener
      ? (o = function(t, e, i) {
          t.addEventListener(e, i, !1);
        })
      : i.attachEvent &&
        (o = function(t, i, o) {
          (t[i + o] = o.handleEvent
            ? function() {
                var i = e(t);
                o.handleEvent.call(o, i);
              }
            : function() {
                var i = e(t);
                o.call(t, i);
              }),
            t.attachEvent('on' + i, t[i + o]);
        });
    var n = function() {};
    i.removeEventListener
      ? (n = function(t, e, i) {
          t.removeEventListener(e, i, !1);
        })
      : i.detachEvent &&
        (n = function(t, e, i) {
          t.detachEvent('on' + e, t[e + i]);
          try {
            delete t[e + i];
          } catch (o) {
            t[e + i] = void 0;
          }
        });
    var r = { bind: o, unbind: n };
    'function' == typeof define && define.amd
      ? define('eventie/eventie', r)
      : 'object' == typeof exports ? (module.exports = r) : (t.eventie = r);
  })(window),
  function() {
    'use strict';
    function t() {}
    function e(t, e) {
      for (var i = t.length; i--; ) if (t[i].listener === e) return i;
      return -1;
    }
    function i(t) {
      return function() {
        return this[t].apply(this, arguments);
      };
    }
    var o = t.prototype,
      n = this,
      r = n.EventEmitter;
    (o.getListeners = function(t) {
      var e,
        i,
        o = this._getEvents();
      if (t instanceof RegExp) {
        e = {};
        for (i in o) o.hasOwnProperty(i) && t.test(i) && (e[i] = o[i]);
      } else e = o[t] || (o[t] = []);
      return e;
    }),
      (o.flattenListeners = function(t) {
        var e,
          i = [];
        for (e = 0; e < t.length; e += 1) i.push(t[e].listener);
        return i;
      }),
      (o.getListenersAsObject = function(t) {
        var e,
          i = this.getListeners(t);
        return i instanceof Array && ((e = {})[t] = i), e || i;
      }),
      (o.addListener = function(t, i) {
        var o,
          n = this.getListenersAsObject(t),
          r = 'object' == typeof i;
        for (o in n)
          n.hasOwnProperty(o) &&
            -1 === e(n[o], i) &&
            n[o].push(r ? i : { listener: i, once: !1 });
        return this;
      }),
      (o.on = i('addListener')),
      (o.addOnceListener = function(t, e) {
        return this.addListener(t, { listener: e, once: !0 });
      }),
      (o.once = i('addOnceListener')),
      (o.defineEvent = function(t) {
        return this.getListeners(t), this;
      }),
      (o.defineEvents = function(t) {
        for (var e = 0; e < t.length; e += 1) this.defineEvent(t[e]);
        return this;
      }),
      (o.removeListener = function(t, i) {
        var o,
          n,
          r = this.getListenersAsObject(t);
        for (n in r)
          r.hasOwnProperty(n) && -1 !== (o = e(r[n], i)) && r[n].splice(o, 1);
        return this;
      }),
      (o.off = i('removeListener')),
      (o.addListeners = function(t, e) {
        return this.manipulateListeners(!1, t, e);
      }),
      (o.removeListeners = function(t, e) {
        return this.manipulateListeners(!0, t, e);
      }),
      (o.manipulateListeners = function(t, e, i) {
        var o,
          n,
          r = t ? this.removeListener : this.addListener,
          a = t ? this.removeListeners : this.addListeners;
        if ('object' != typeof e || e instanceof RegExp)
          for (o = i.length; o--; ) r.call(this, e, i[o]);
        else
          for (o in e)
            e.hasOwnProperty(o) &&
              (n = e[o]) &&
              ('function' == typeof n
                ? r.call(this, o, n)
                : a.call(this, o, n));
        return this;
      }),
      (o.removeEvent = function(t) {
        var e,
          i = typeof t,
          o = this._getEvents();
        if ('string' === i) delete o[t];
        else if (t instanceof RegExp)
          for (e in o) o.hasOwnProperty(e) && t.test(e) && delete o[e];
        else delete this._events;
        return this;
      }),
      (o.removeAllListeners = i('removeEvent')),
      (o.emitEvent = function(t, e) {
        var i,
          o,
          n,
          r = this.getListenersAsObject(t);
        for (n in r)
          if (r.hasOwnProperty(n))
            for (o = r[n].length; o--; )
              !0 === (i = r[n][o]).once && this.removeListener(t, i.listener),
                i.listener.apply(this, e || []) ===
                  this._getOnceReturnValue() &&
                  this.removeListener(t, i.listener);
        return this;
      }),
      (o.trigger = i('emitEvent')),
      (o.emit = function(t) {
        var e = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(t, e);
      }),
      (o.setOnceReturnValue = function(t) {
        return (this._onceReturnValue = t), this;
      }),
      (o._getOnceReturnValue = function() {
        return (
          !this.hasOwnProperty('_onceReturnValue') || this._onceReturnValue
        );
      }),
      (o._getEvents = function() {
        return this._events || (this._events = {});
      }),
      (t.noConflict = function() {
        return (n.EventEmitter = r), t;
      }),
      'function' == typeof define && define.amd
        ? define('eventEmitter/EventEmitter', [], function() {
            return t;
          })
        : 'object' == typeof module && module.exports
          ? (module.exports = t)
          : (n.EventEmitter = t);
  }.call(this),
  (function(t) {
    function e(t) {
      if (t) {
        if ('string' == typeof o[t]) return t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        for (var e, n = 0, r = i.length; n < r; n++)
          if (((e = i[n] + t), 'string' == typeof o[e])) return e;
      }
    }
    var i = 'Webkit Moz ms Ms O'.split(' '),
      o = document.documentElement.style;
    'function' == typeof define && define.amd
      ? define('get-style-property/get-style-property', [], function() {
          return e;
        })
      : 'object' == typeof exports
        ? (module.exports = e)
        : (t.getStyleProperty = e);
  })(window),
  (function(t, e) {
    function i(t) {
      var e = parseFloat(t);
      return -1 === t.indexOf('%') && !isNaN(e) && e;
    }
    function o() {
      for (
        var t = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0,
          },
          e = 0,
          i = a.length;
        e < i;
        e++
      )
        t[a[e]] = 0;
      return t;
    }
    function n(e) {
      function n() {
        if (!c) {
          c = !0;
          var o = t.getComputedStyle;
          if (
            ((l = (function() {
              var t = o
                ? function(t) {
                    return o(t, null);
                  }
                : function(t) {
                    return t.currentStyle;
                  };
              return function(e) {
                var i = t(e);
                return (
                  i ||
                    r(
                      'Style returned ' +
                        i +
                        '. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'
                    ),
                  i
                );
              };
            })()),
            (u = e('boxSizing')))
          ) {
            var n = document.createElement('div');
            (n.style.width = '200px'),
              (n.style.padding = '1px 2px 3px 4px'),
              (n.style.borderStyle = 'solid'),
              (n.style.borderWidth = '1px 2px 3px 4px'),
              (n.style[u] = 'border-box');
            var a = document.body || document.documentElement;
            a.appendChild(n);
            var s = l(n);
            (d = 200 === i(s.width)), a.removeChild(n);
          }
        }
      }
      function s(e, i) {
        if (t.getComputedStyle || -1 === i.indexOf('%')) return i;
        var o = e.style,
          n = o.left,
          r = e.runtimeStyle,
          a = r && r.left;
        return (
          a && (r.left = e.currentStyle.left),
          (o.left = i),
          (i = o.pixelLeft),
          (o.left = n),
          a && (r.left = a),
          i
        );
      }
      var l,
        u,
        d,
        c = !1;
      return function(t) {
        if (
          (n(),
          'string' == typeof t && (t = document.querySelector(t)),
          t && 'object' == typeof t && t.nodeType)
        ) {
          var e = l(t);
          if ('none' === e.display) return o();
          var r = {};
          (r.width = t.offsetWidth), (r.height = t.offsetHeight);
          for (
            var c = (r.isBorderBox = !(!u || !e[u] || 'border-box' !== e[u])),
              h = 0,
              p = a.length;
            h < p;
            h++
          ) {
            var f = a[h],
              m = e[f];
            m = s(t, m);
            var g = parseFloat(m);
            r[f] = isNaN(g) ? 0 : g;
          }
          var y = r.paddingLeft + r.paddingRight,
            v = r.paddingTop + r.paddingBottom,
            _ = r.marginLeft + r.marginRight,
            w = r.marginTop + r.marginBottom,
            b = r.borderLeftWidth + r.borderRightWidth,
            T = r.borderTopWidth + r.borderBottomWidth,
            x = c && d,
            z = i(e.width);
          !1 !== z && (r.width = z + (x ? 0 : y + b));
          var C = i(e.height);
          return (
            !1 !== C && (r.height = C + (x ? 0 : v + T)),
            (r.innerWidth = r.width - (y + b)),
            (r.innerHeight = r.height - (v + T)),
            (r.outerWidth = r.width + _),
            (r.outerHeight = r.height + w),
            r
          );
        }
      };
    }
    var r =
        'undefined' == typeof console
          ? function() {}
          : function(t) {
              console.error(t);
            },
      a = [
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'marginLeft',
        'marginRight',
        'marginTop',
        'marginBottom',
        'borderLeftWidth',
        'borderRightWidth',
        'borderTopWidth',
        'borderBottomWidth',
      ];
    'function' == typeof define && define.amd
      ? define(
          'get-size/get-size',
          ['get-style-property/get-style-property'],
          n
        )
      : 'object' == typeof exports
        ? (module.exports = n(require('desandro-get-style-property')))
        : (t.getSize = n(t.getStyleProperty));
  })(window),
  (function(t) {
    function e(t) {
      'function' == typeof t && (e.isReady ? t() : a.push(t));
    }
    function i(t) {
      var i = 'readystatechange' === t.type && 'complete' !== r.readyState;
      e.isReady || i || o();
    }
    function o() {
      e.isReady = !0;
      for (var t = 0, i = a.length; t < i; t++) (0, a[t])();
    }
    function n(n) {
      return (
        'complete' === r.readyState
          ? o()
          : (n.bind(r, 'DOMContentLoaded', i),
            n.bind(r, 'readystatechange', i),
            n.bind(t, 'load', i)),
        e
      );
    }
    var r = t.document,
      a = [];
    (e.isReady = !1),
      'function' == typeof define && define.amd
        ? define('doc-ready/doc-ready', ['eventie/eventie'], n)
        : 'object' == typeof exports
          ? (module.exports = n(require('eventie')))
          : (t.docReady = n(t.eventie));
  })(window),
  (function(t) {
    'use strict';
    function e(t, e) {
      return t[n](e);
    }
    function i(t) {
      t.parentNode || document.createDocumentFragment().appendChild(t);
    }
    var o,
      n = (function() {
        if (t.matches) return 'matches';
        if (t.matchesSelector) return 'matchesSelector';
        for (
          var e = ['webkit', 'moz', 'ms', 'o'], i = 0, o = e.length;
          i < o;
          i++
        ) {
          var n = e[i] + 'MatchesSelector';
          if (t[n]) return n;
        }
      })();
    if (n) {
      var r = e(document.createElement('div'), 'div');
      o = r
        ? e
        : function(t, o) {
            return i(t), e(t, o);
          };
    } else
      o = function(t, e) {
        i(t);
        for (
          var o = t.parentNode.querySelectorAll(e), n = 0, r = o.length;
          n < r;
          n++
        )
          if (o[n] === t) return !0;
        return !1;
      };
    'function' == typeof define && define.amd
      ? define('matches-selector/matches-selector', [], function() {
          return o;
        })
      : 'object' == typeof exports
        ? (module.exports = o)
        : (window.matchesSelector = o);
  })(Element.prototype),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'fizzy-ui-utils/utils',
          ['doc-ready/doc-ready', 'matches-selector/matches-selector'],
          function(i, o) {
            return e(t, i, o);
          }
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            t,
            require('doc-ready'),
            require('desandro-matches-selector')
          ))
        : (t.fizzyUIUtils = e(t, t.docReady, t.matchesSelector));
  })(window, function(t, e, i) {
    var o = {};
    (o.extend = function(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }),
      (o.modulo = function(t, e) {
        return (t % e + e) % e;
      });
    var n = Object.prototype.toString;
    (o.isArray = function(t) {
      return '[object Array]' == n.call(t);
    }),
      (o.makeArray = function(t) {
        var e = [];
        if (o.isArray(t)) e = t;
        else if (t && 'number' == typeof t.length)
          for (var i = 0, n = t.length; i < n; i++) e.push(t[i]);
        else e.push(t);
        return e;
      }),
      (o.indexOf = Array.prototype.indexOf
        ? function(t, e) {
            return t.indexOf(e);
          }
        : function(t, e) {
            for (var i = 0, o = t.length; i < o; i++) if (t[i] === e) return i;
            return -1;
          }),
      (o.removeFrom = function(t, e) {
        var i = o.indexOf(t, e);
        -1 != i && t.splice(i, 1);
      }),
      (o.isElement =
        'function' == typeof HTMLElement || 'object' == typeof HTMLElement
          ? function(t) {
              return t instanceof HTMLElement;
            }
          : function(t) {
              return (
                t &&
                'object' == typeof t &&
                1 == t.nodeType &&
                'string' == typeof t.nodeName
              );
            }),
      (o.setText = (function() {
        var t;
        return function(e, i) {
          e[
            (t =
              t ||
              (void 0 !== document.documentElement.textContent
                ? 'textContent'
                : 'innerText'))
          ] = i;
        };
      })()),
      (o.getParent = function(t, e) {
        for (; t != document.body; )
          if (((t = t.parentNode), i(t, e))) return t;
      }),
      (o.getQueryElement = function(t) {
        return 'string' == typeof t ? document.querySelector(t) : t;
      }),
      (o.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (o.filterFindElements = function(t, e) {
        for (var n = [], r = 0, a = (t = o.makeArray(t)).length; r < a; r++) {
          var s = t[r];
          if (o.isElement(s))
            if (e) {
              i(s, e) && n.push(s);
              for (
                var l = s.querySelectorAll(e), u = 0, d = l.length;
                u < d;
                u++
              )
                n.push(l[u]);
            } else n.push(s);
        }
        return n;
      }),
      (o.debounceMethod = function(t, e, i) {
        var o = t.prototype[e],
          n = e + 'Timeout';
        t.prototype[e] = function() {
          var t = this[n];
          t && clearTimeout(t);
          var e = arguments,
            r = this;
          this[n] = setTimeout(function() {
            o.apply(r, e), delete r[n];
          }, i || 100);
        };
      }),
      (o.toDashed = function(t) {
        return t
          .replace(/(.)([A-Z])/g, function(t, e, i) {
            return e + '-' + i;
          })
          .toLowerCase();
      });
    var r = t.console;
    return (
      (o.htmlInit = function(i, n) {
        e(function() {
          for (
            var e = o.toDashed(n),
              a = document.querySelectorAll('.js-' + e),
              s = 'data-' + e + '-options',
              l = 0,
              u = a.length;
            l < u;
            l++
          ) {
            var d,
              c = a[l],
              h = c.getAttribute(s);
            try {
              d = h && JSON.parse(h);
            } catch (t) {
              r &&
                r.error(
                  'Error parsing ' +
                    s +
                    ' on ' +
                    c.nodeName.toLowerCase() +
                    (c.id ? '#' + c.id : '') +
                    ': ' +
                    t
                );
              continue;
            }
            var p = new i(c, d),
              f = t.jQuery;
            f && f.data(c, n, p);
          }
        });
      }),
      o
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'outlayer/item',
          [
            'eventEmitter/EventEmitter',
            'get-size/get-size',
            'get-style-property/get-style-property',
            'fizzy-ui-utils/utils',
          ],
          function(i, o, n, r) {
            return e(t, i, o, n, r);
          }
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            t,
            require('wolfy87-eventemitter'),
            require('get-size'),
            require('desandro-get-style-property'),
            require('fizzy-ui-utils')
          ))
        : ((t.Outlayer = {}),
          (t.Outlayer.Item = e(
            t,
            t.EventEmitter,
            t.getSize,
            t.getStyleProperty,
            t.fizzyUIUtils
          )));
  })(window, function(t, e, i, o, n) {
    'use strict';
    function r(t) {
      for (var e in t) return !1;
      return null, !0;
    }
    function a(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    var s = t.getComputedStyle,
      l = s
        ? function(t) {
            return s(t, null);
          }
        : function(t) {
            return t.currentStyle;
          },
      u = o('transition'),
      d = o('transform'),
      c = u && d,
      h = !!o('perspective'),
      p = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'otransitionend',
        transition: 'transitionend',
      }[u],
      f = [
        'transform',
        'transition',
        'transitionDuration',
        'transitionProperty',
      ],
      m = (function() {
        for (var t = {}, e = 0, i = f.length; e < i; e++) {
          var n = f[e],
            r = o(n);
          r && r !== n && (t[n] = r);
        }
        return t;
      })();
    n.extend(a.prototype, e.prototype),
      (a.prototype._create = function() {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: 'absolute' });
      }),
      (a.prototype.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (a.prototype.getSize = function() {
        this.size = i(this.element);
      }),
      (a.prototype.css = function(t) {
        var e = this.element.style;
        for (var i in t) e[m[i] || i] = t[i];
      }),
      (a.prototype.getPosition = function() {
        var t = l(this.element),
          e = this.layout.options,
          i = e.isOriginLeft,
          o = e.isOriginTop,
          n = t[i ? 'left' : 'right'],
          r = t[o ? 'top' : 'bottom'],
          a = this.layout.size,
          s =
            -1 != n.indexOf('%')
              ? parseFloat(n) / 100 * a.width
              : parseInt(n, 10),
          u =
            -1 != r.indexOf('%')
              ? parseFloat(r) / 100 * a.height
              : parseInt(r, 10);
        (s = isNaN(s) ? 0 : s),
          (u = isNaN(u) ? 0 : u),
          (s -= i ? a.paddingLeft : a.paddingRight),
          (u -= o ? a.paddingTop : a.paddingBottom),
          (this.position.x = s),
          (this.position.y = u);
      }),
      (a.prototype.layoutPosition = function() {
        var t = this.layout.size,
          e = this.layout.options,
          i = {},
          o = e.isOriginLeft ? 'paddingLeft' : 'paddingRight',
          n = e.isOriginLeft ? 'left' : 'right',
          r = e.isOriginLeft ? 'right' : 'left',
          a = this.position.x + t[o];
        (i[n] = this.getXValue(a)), (i[r] = '');
        var s = e.isOriginTop ? 'paddingTop' : 'paddingBottom',
          l = e.isOriginTop ? 'top' : 'bottom',
          u = e.isOriginTop ? 'bottom' : 'top',
          d = this.position.y + t[s];
        (i[l] = this.getYValue(d)),
          (i[u] = ''),
          this.css(i),
          this.emitEvent('layout', [this]);
      }),
      (a.prototype.getXValue = function(t) {
        var e = this.layout.options;
        return e.percentPosition && !e.isHorizontal
          ? t / this.layout.size.width * 100 + '%'
          : t + 'px';
      }),
      (a.prototype.getYValue = function(t) {
        var e = this.layout.options;
        return e.percentPosition && e.isHorizontal
          ? t / this.layout.size.height * 100 + '%'
          : t + 'px';
      }),
      (a.prototype._transitionTo = function(t, e) {
        this.getPosition();
        var i = this.position.x,
          o = this.position.y,
          n = parseInt(t, 10),
          r = parseInt(e, 10),
          a = n === this.position.x && r === this.position.y;
        if ((this.setPosition(t, e), !a || this.isTransitioning)) {
          var s = t - i,
            l = e - o,
            u = {};
          (u.transform = this.getTranslate(s, l)),
            this.transition({
              to: u,
              onTransitionEnd: { transform: this.layoutPosition },
              isCleaning: !0,
            });
        } else this.layoutPosition();
      }),
      (a.prototype.getTranslate = function(t, e) {
        var i = this.layout.options;
        return (
          (t = i.isOriginLeft ? t : -t),
          (e = i.isOriginTop ? e : -e),
          h
            ? 'translate3d(' + t + 'px, ' + e + 'px, 0)'
            : 'translate(' + t + 'px, ' + e + 'px)'
        );
      }),
      (a.prototype.goTo = function(t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (a.prototype.moveTo = c ? a.prototype._transitionTo : a.prototype.goTo),
      (a.prototype.setPosition = function(t, e) {
        (this.position.x = parseInt(t, 10)),
          (this.position.y = parseInt(e, 10));
      }),
      (a.prototype._nonTransition = function(t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this);
      }),
      (a.prototype._transition = function(t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
          var e = this._transn;
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
          for (i in t.to)
            (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
          if (t.from) {
            this.css(t.from);
            this.element.offsetHeight;
            null;
          }
          this.enableTransition(t.to),
            this.css(t.to),
            (this.isTransitioning = !0);
        } else this._nonTransition(t);
      });
    var g =
      'opacity,' +
      (function(t) {
        return t.replace(/([A-Z])/g, function(t) {
          return '-' + t.toLowerCase();
        });
      })(m.transform || 'transform');
    (a.prototype.enableTransition = function() {
      this.isTransitioning ||
        (this.css({
          transitionProperty: g,
          transitionDuration: this.layout.options.transitionDuration,
        }),
        this.element.addEventListener(p, this, !1));
    }),
      (a.prototype.transition =
        a.prototype[u ? '_transition' : '_nonTransition']),
      (a.prototype.onwebkitTransitionEnd = function(t) {
        this.ontransitionend(t);
      }),
      (a.prototype.onotransitionend = function(t) {
        this.ontransitionend(t);
      });
    var y = {
      '-webkit-transform': 'transform',
      '-moz-transform': 'transform',
      '-o-transform': 'transform',
    };
    (a.prototype.ontransitionend = function(t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = y[t.propertyName] || t.propertyName;
        delete e.ingProperties[i],
          r(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ''), delete e.clean[i]),
          i in e.onEnd && (e.onEnd[i].call(this), delete e.onEnd[i]),
          this.emitEvent('transitionEnd', [this]);
      }
    }),
      (a.prototype.disableTransition = function() {
        this.removeTransitionStyles(),
          this.element.removeEventListener(p, this, !1),
          (this.isTransitioning = !1);
      }),
      (a.prototype._removeStyles = function(t) {
        var e = {};
        for (var i in t) e[i] = '';
        this.css(e);
      });
    var v = { transitionProperty: '', transitionDuration: '' };
    return (
      (a.prototype.removeTransitionStyles = function() {
        this.css(v);
      }),
      (a.prototype.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: '' }),
          this.emitEvent('remove', [this]);
      }),
      (a.prototype.remove = function() {
        if (u && parseFloat(this.layout.options.transitionDuration)) {
          var t = this;
          this.once('transitionEnd', function() {
            t.removeElem();
          }),
            this.hide();
        } else this.removeElem();
      }),
      (a.prototype.reveal = function() {
        delete this.isHidden, this.css({ display: '' });
        var t = this.layout.options,
          e = {};
        (e[
          this.getHideRevealTransitionEndProperty('visibleStyle')
        ] = this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (a.prototype.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent('reveal');
      }),
      (a.prototype.getHideRevealTransitionEndProperty = function(t) {
        var e = this.layout.options[t];
        if (e.opacity) return 'opacity';
        for (var i in e) return i;
      }),
      (a.prototype.hide = function() {
        (this.isHidden = !0), this.css({ display: '' });
        var t = this.layout.options,
          e = {};
        (e[
          this.getHideRevealTransitionEndProperty('hiddenStyle')
        ] = this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (a.prototype.onHideTransitionEnd = function() {
        this.isHidden &&
          (this.css({ display: 'none' }), this.emitEvent('hide'));
      }),
      (a.prototype.destroy = function() {
        this.css({
          position: '',
          left: '',
          right: '',
          top: '',
          bottom: '',
          transition: '',
          transform: '',
        });
      }),
      a
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'outlayer/outlayer',
          [
            'eventie/eventie',
            'eventEmitter/EventEmitter',
            'get-size/get-size',
            'fizzy-ui-utils/utils',
            './item',
          ],
          function(i, o, n, r, a) {
            return e(t, i, o, n, r, a);
          }
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            t,
            require('eventie'),
            require('wolfy87-eventemitter'),
            require('get-size'),
            require('fizzy-ui-utils'),
            require('./item')
          ))
        : (t.Outlayer = e(
            t,
            t.eventie,
            t.EventEmitter,
            t.getSize,
            t.fizzyUIUtils,
            t.Outlayer.Item
          ));
  })(window, function(t, e, i, o, n, r) {
    'use strict';
    function a(t, e) {
      var i = n.getQueryElement(t);
      if (i) {
        (this.element = i),
          l && (this.$element = l(this.element)),
          (this.options = n.extend({}, this.constructor.defaults)),
          this.option(e);
        var o = ++u;
        (this.element.outlayerGUID = o),
          (d[o] = this),
          this._create(),
          this.options.isInitLayout && this.layout();
      } else s && s.error('Bad element for ' + this.constructor.namespace + ': ' + (i || t));
    }
    var s = t.console,
      l = t.jQuery,
      u = 0,
      d = {};
    return (
      (a.namespace = 'outlayer'),
      (a.Item = r),
      (a.defaults = {
        containerStyle: { position: 'relative' },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: '0.4s',
        hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
        visibleStyle: { opacity: 1, transform: 'scale(1)' },
      }),
      n.extend(a.prototype, i.prototype),
      (a.prototype.option = function(t) {
        n.extend(this.options, t);
      }),
      (a.prototype._create = function() {
        this.reloadItems(),
          n.extend(this.element.style, this.options.containerStyle),
          this.options.isResizeBound && this.bindResize();
      }),
      (a.prototype.reloadItems = function() {
        this.items = this._itemize(this.element.children);
      }),
      (a.prototype._itemize = function(t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            o = [],
            n = 0,
            r = e.length;
          n < r;
          n++
        ) {
          var a = new i(e[n], this);
          o.push(a);
        }
        return o;
      }),
      (a.prototype._filterFindItemElements = function(t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (a.prototype.getItemElements = function() {
        for (var t = [], e = 0, i = this.items.length; e < i; e++)
          t.push(this.items[e].element);
        return t;
      }),
      (a.prototype.layout = function() {
        this._resetLayout();
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        this.layoutItems(this.items, t), (this._isLayoutInited = !0);
      }),
      (a.prototype._init = a.prototype.layout),
      (a.prototype._resetLayout = function() {
        this.getSize();
      }),
      (a.prototype.getSize = function() {
        this.size = o(this.element);
      }),
      (a.prototype._getMeasurement = function(t, e) {
        var i,
          r = this.options[t];
        r
          ? ('string' == typeof r
              ? (i = this.element.querySelector(r))
              : n.isElement(r) && (i = r),
            (this[t] = i ? o(i)[e] : r))
          : (this[t] = 0);
      }),
      (a.prototype.layoutItems = function(t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (a.prototype._getItemsForLayout = function(t) {
        for (var e = [], i = 0, o = t.length; i < o; i++) {
          var n = t[i];
          n.isIgnored || e.push(n);
        }
        return e;
      }),
      (a.prototype._layoutItems = function(t, e) {
        if ((this._emitCompleteOnItems('layout', t), t && t.length)) {
          for (var i = [], o = 0, n = t.length; o < n; o++) {
            var r = t[o],
              a = this._getItemLayoutPosition(r);
            (a.item = r), (a.isInstant = e || r.isLayoutInstant), i.push(a);
          }
          this._processLayoutQueue(i);
        }
      }),
      (a.prototype._getItemLayoutPosition = function() {
        return { x: 0, y: 0 };
      }),
      (a.prototype._processLayoutQueue = function(t) {
        for (var e = 0, i = t.length; e < i; e++) {
          var o = t[e];
          this._positionItem(o.item, o.x, o.y, o.isInstant);
        }
      }),
      (a.prototype._positionItem = function(t, e, i, o) {
        o ? t.goTo(e, i) : t.moveTo(e, i);
      }),
      (a.prototype._postLayout = function() {
        this.resizeContainer();
      }),
      (a.prototype.resizeContainer = function() {
        if (this.options.isResizingContainer) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (a.prototype._getContainerSize = function() {}),
      (a.prototype._setContainerMeasure = function(t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? 'width' : 'height'] = t + 'px');
        }
      }),
      (a.prototype._emitCompleteOnItems = function(t, e) {
        function i() {
          o.dispatchEvent(t + 'Complete', null, [e]);
        }
        var o = this,
          n = e.length;
        if (e && n)
          for (var r = 0, a = 0, s = e.length; a < s; a++)
            e[a].once(t, function() {
              ++r === n && i();
            });
        else i();
      }),
      (a.prototype.dispatchEvent = function(t, e, i) {
        var o = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, o), l))
          if (((this.$element = this.$element || l(this.element)), e)) {
            var n = l.Event(e);
            (n.type = t), this.$element.trigger(n, i);
          } else this.$element.trigger(t, i);
      }),
      (a.prototype.ignore = function(t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (a.prototype.unignore = function(t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (a.prototype._find = function(t) {
        if (t)
          return (
            'string' == typeof t && (t = this.element.querySelectorAll(t)),
            (t = n.makeArray(t))
          );
      }),
      (a.prototype._getBoundingRect = function() {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (a.prototype._getElementOffset = function(t) {
        var e = t.getBoundingClientRect(),
          i = this._boundingRect,
          n = o(t);
        return {
          left: e.left - i.left - n.marginLeft,
          top: e.top - i.top - n.marginTop,
          right: i.right - e.right - n.marginRight,
          bottom: i.bottom - e.bottom - n.marginBottom,
        };
      }),
      (a.prototype.handleEvent = function(t) {
        var e = 'on' + t.type;
        this[e] && this[e](t);
      }),
      (a.prototype.bindResize = function() {
        this.isResizeBound ||
          (e.bind(t, 'resize', this), (this.isResizeBound = !0));
      }),
      (a.prototype.unbindResize = function() {
        this.isResizeBound && e.unbind(t, 'resize', this),
          (this.isResizeBound = !1);
      }),
      (a.prototype.onresize = function() {
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var t = this;
        this.resizeTimeout = setTimeout(function() {
          t.resize(), delete t.resizeTimeout;
        }, 100);
      }),
      (a.prototype.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (a.prototype.needsResizeLayout = function() {
        var t = o(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth;
      }),
      (a.prototype.addItems = function(t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (a.prototype.appended = function(t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (a.prototype.reveal = function(t) {
        this._emitCompleteOnItems('reveal', t);
        for (var e = t && t.length, i = 0; e && i < e; i++) t[i].reveal();
      }),
      (a.prototype.hide = function(t) {
        this._emitCompleteOnItems('hide', t);
        for (var e = t && t.length, i = 0; e && i < e; i++) t[i].hide();
      }),
      (a.prototype.revealItemElements = function(t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (a.prototype.hideItemElements = function(t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (a.prototype.getItem = function(t) {
        for (var e = 0, i = this.items.length; e < i; e++) {
          var o = this.items[e];
          if (o.element === t) return o;
        }
      }),
      (a.prototype.getItems = function(t) {
        for (var e = [], i = 0, o = (t = n.makeArray(t)).length; i < o; i++) {
          var r = t[i],
            a = this.getItem(r);
          a && e.push(a);
        }
        return e;
      }),
      (a.prototype.remove = function(t) {
        var e = this.getItems(t);
        if ((this._emitCompleteOnItems('remove', e), e && e.length))
          for (var i = 0, o = e.length; i < o; i++) {
            var r = e[i];
            r.remove(), n.removeFrom(this.items, r);
          }
      }),
      (a.prototype.destroy = function() {
        var t = this.element.style;
        (t.height = ''), (t.position = ''), (t.width = '');
        for (var e = 0, i = this.items.length; e < i; e++)
          this.items[e].destroy();
        this.unbindResize();
        var o = this.element.outlayerGUID;
        delete d[o],
          delete this.element.outlayerGUID,
          l && l.removeData(this.element, this.constructor.namespace);
      }),
      (a.data = function(t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
        return e && d[e];
      }),
      (a.create = function(t, e) {
        function i() {
          a.apply(this, arguments);
        }
        return (
          Object.create
            ? (i.prototype = Object.create(a.prototype))
            : n.extend(i.prototype, a.prototype),
          (i.prototype.constructor = i),
          (i.defaults = n.extend({}, a.defaults)),
          n.extend(i.defaults, e),
          (i.prototype.settings = {}),
          (i.namespace = t),
          (i.data = a.data),
          (i.Item = function() {
            r.apply(this, arguments);
          }),
          (i.Item.prototype = new r()),
          n.htmlInit(i, t),
          l && l.bridget && l.bridget(t, i),
          i
        );
      }),
      (a.Item = r),
      a
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define('TG_Layout/js/item', ['outlayer/outlayer'], e)
      : 'object' == typeof exports
        ? (module.exports = e(require('outlayer')))
        : ((t.TG_Layout = t.TG_Layout || {}),
          (t.TG_Layout.Item = e(t.Outlayer)));
  })(window, function(t) {
    'use strict';
    function e() {
      t.Item.apply(this, arguments);
    }
    ((e.prototype = new t.Item())._create = function() {
      (this.id = this.layout.itemGUID++),
        t.Item.prototype._create.call(this),
        (this.sortData = {});
    }),
      (e.prototype.updateSortData = function() {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData['original-order'] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var o = e[i];
            this.sortData[i] = o(this.element, this);
          }
        }
      });
    var i = e.prototype.destroy;
    return (
      (e.prototype.destroy = function() {
        i.apply(this, arguments), this.css({ display: '' });
      }),
      e
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'TG_Layout/js/layout-mode',
          ['get-size/get-size', 'outlayer/outlayer'],
          e
        )
      : 'object' == typeof exports
        ? (module.exports = e(require('get-size'), require('outlayer')))
        : ((t.TG_Layout = t.TG_Layout || {}),
          (t.TG_Layout.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function(t, e) {
    'use strict';
    function i(t) {
      (this.TG_Layout = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    return (
      (function() {
        for (
          var t = [
              '_resetLayout',
              '_getItemLayoutPosition',
              '_getContainerSize',
              '_getElementOffset',
              'needsResizeLayout',
            ],
            o = 0,
            n = t.length;
          o < n;
          o++
        ) {
          var r = t[o];
          i.prototype[r] = (function(t) {
            return function() {
              return e.prototype[t].apply(this.TG_Layout, arguments);
            };
          })(r);
        }
      })(),
      (i.prototype.needsVerticalResizeLayout = function() {
        var e = t(this.TG_Layout.element);
        return (
          this.TG_Layout.size &&
          e &&
          e.innerHeight != this.TG_Layout.size.innerHeight
        );
      }),
      (i.prototype._getMeasurement = function() {
        this.TG_Layout._getMeasurement.apply(this, arguments);
      }),
      (i.prototype.getColumnWidth = function() {
        this.getSegmentSize('column', 'Width');
      }),
      (i.prototype.getRowHeight = function() {
        this.getSegmentSize('row', 'Height');
      }),
      (i.prototype.getSegmentSize = function(t, e) {
        var i = t + e,
          o = 'outer' + e;
        if ((this._getMeasurement(i, o), !this[i])) {
          var n = this.getFirstItemSize();
          this[i] = (n && n[o]) || this.TG_Layout.size['inner' + e];
        }
      }),
      (i.prototype.getFirstItemSize = function() {
        var e = this.TG_Layout.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (i.prototype.layout = function() {
        this.TG_Layout.layout.apply(this.TG_Layout, arguments);
      }),
      (i.prototype.getSize = function() {
        this.TG_Layout.getSize(), (this.size = this.TG_Layout.size);
      }),
      (i.modes = {}),
      (i.create = function(t, e) {
        function o() {
          i.apply(this, arguments);
        }
        return (
          (o.prototype = new i()),
          e && (o.options = e),
          (o.prototype.namespace = t),
          (i.modes[t] = o),
          o
        );
      }),
      i
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'masonry/masonry',
          ['outlayer/outlayer', 'get-size/get-size', 'fizzy-ui-utils/utils'],
          e
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            require('outlayer'),
            require('get-size'),
            require('fizzy-ui-utils')
          ))
        : (t.Masonry = e(t.Outlayer, t.getSize, t.fizzyUIUtils));
  })(window, function(t, e, i) {
    var o = t.create('masonry');
    return (
      (o.prototype._resetLayout = function() {
        this.getSize(),
          this._getMeasurement('columnWidth', 'outerWidth'),
          this._getMeasurement('gutter', 'outerWidth'),
          this.measureColumns();
        var t = this.cols;
        for (this.colYs = []; t--; ) this.colYs.push(0);
        (this.x = 0), (this.y = 0), (this.maxY = 0);
      }),
      (o.prototype.measureColumns = function() {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var o = (this.columnWidth += this.gutter),
          n = this.containerWidth + this.gutter,
          r = n / o,
          a = o - n % o,
          s = a && a < 1 ? 'round' : 'floor';
        (r = Math[s](r)), (this.cols = Math.max(r, 1));
      }),
      (o.prototype.getContainerWidth = function() {
        var t = this.options.isFitWidth
            ? this.element.parentNode
            : this.element,
          i = e(t);
        this.containerWidth = i && i.innerWidth;
      }),
      (o.prototype._getItemLayoutPosition = function(t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          o = e && e < 1 ? 'round' : 'ceil',
          n = Math[o](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        var r = this._getColGroup(n),
          a = Math.min.apply(Math, r),
          s = i.indexOf(r, a);
        if (this.options.isFitRows) {
          var l = t.size.outerWidth + this.gutter,
            u = this.TG_Layout.size.innerWidth + this.gutter;
          0 !== this.x &&
            l + this.x > u &&
            ((this.x = 0), (this.y = this.maxY));
        } else (this.x = this.columnWidth * s), (this.y = a);
        var d = { x: this.x, y: this.y };
        this.options.isFitRows &&
          ((this.maxY = Math.max(
            this.maxY,
            this.y + t.size.outerHeight + this.gutter
          )),
          (this.x += l));
        for (
          var c = a + t.size.outerHeight + this.gutter,
            h = this.cols + 1 - r.length,
            p = 0;
          p < h;
          p++
        )
          this.colYs[s + p] = c;
        return d;
      }),
      (o.prototype._getColGroup = function(t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) {
          var n = this.colYs.slice(o, o + t);
          e[o] = Math.max.apply(Math, n);
        }
        return e;
      }),
      (o.prototype._getContainerSize = function() {
        this.maxY = this.options.isFitRows
          ? this.maxY
          : Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY - this.gutter };
        return (
          this.options.isFitWidth && (t.width = this._getContainerFitWidth()), t
        );
      }),
      (o.prototype._getContainerFitWidth = function() {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (o.prototype.needsResizeLayout = function() {
        var t = this.containerWidth;
        return this.getContainerWidth(), t !== this.containerWidth;
      }),
      o
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          'TG_Layout/js/layout-modes/masonry',
          ['../layout-mode', 'masonry/masonry'],
          e
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            require('../layout-mode'),
            require('masonry-layout')
          ))
        : e(t.TG_Layout.LayoutMode, t.Masonry);
  })(window, function(t, e) {
    'use strict';
    var i = t.create('masonry'),
      o = i.prototype._getElementOffset,
      n = i.prototype.layout,
      r = i.prototype._getMeasurement;
    !(function(t, e) {
      for (var i in e) t[i] = e[i];
    })(i.prototype, e.prototype),
      (i.prototype._getElementOffset = o),
      (i.prototype.layout = n),
      (i.prototype._getMeasurement = r);
    var a = i.prototype.measureColumns;
    return (
      (i.prototype.measureColumns = function() {
        (this.items = this.TG_Layout.filteredItems), a.call(this);
      }),
      i
    );
  }),
  (function(t, e) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(
          [
            'outlayer/outlayer',
            'get-size/get-size',
            'matches-selector/matches-selector',
            'fizzy-ui-utils/utils',
            'TG_Layout/js/item',
            'TG_Layout/js/layout-mode',
            'TG_Layout/js/layout-modes/masonry',
          ],
          function(i, o, n, r, a, s) {
            return e(t, i, o, n, r, a, s);
          }
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            t,
            require('outlayer'),
            require('get-size'),
            require('desandro-matches-selector'),
            require('fizzy-ui-utils'),
            require('./item'),
            require('./layout-mode'),
            require('./layout-modes/masonry')
          ))
        : (t.TG_Layout = e(
            t,
            t.Outlayer,
            t.getSize,
            t.matchesSelector,
            t.fizzyUIUtils,
            t.TG_Layout.Item,
            t.TG_Layout.LayoutMode
          ));
  })(window, function(t, e, i, o, n, r, a) {
    function s(t, e) {
      return function(i, o) {
        for (var n = 0, r = t.length; n < r; n++) {
          var a = t[n],
            s = i.sortData[a],
            l = o.sortData[a];
          if (s > l || s < l) {
            var u = (void 0 !== e[a] ? e[a] : e) ? 1 : -1;
            return (s > l ? 1 : -1) * u;
          }
        }
        return 0;
      };
    }
    var l = t.jQuery,
      u = String.prototype.trim
        ? function(t) {
            return t.trim();
          }
        : function(t) {
            return t.replace(/^\s+|\s+$/g, '');
          },
      d = document.documentElement.textContent
        ? function(t) {
            return t.textContent;
          }
        : function(t) {
            return t.innerText;
          },
      c = e.create('TG_Layout', {
        layoutMode: 'masonry',
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (c.Item = r),
      (c.LayoutMode = a),
      (c.prototype._create = function() {
        (this.itemGUID = 0),
          (this._sorters = {}),
          this._getSorters(),
          e.prototype._create.call(this),
          (this.modes = {}),
          (this.filteredItems = this.items),
          (this.sortHistory = ['original-order']);
        for (var t in a.modes) this._initLayoutMode(t);
      }),
      (c.prototype.reloadItems = function() {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (c.prototype._itemize = function() {
        for (
          var t = e.prototype._itemize.apply(this, arguments),
            i = 0,
            o = t.length;
          i < o;
          i++
        )
          t[i].id = this.itemGUID++;
        return this._updateItemsSortData(t), t;
      }),
      (c.prototype._initLayoutMode = function(t) {
        var e = a.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? n.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (c.prototype.layout = function() {
        this._isLayoutInited || !this.options.isInitLayout
          ? this._layout()
          : this.arrange();
      }),
      (c.prototype._layout = function() {
        var t = this._getIsInstant();
        this._resetLayout(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (c.prototype.arrange = function(t) {
        function e() {
          o.reveal(i.needReveal), o.hide(i.needHide);
        }
        this.option(t), this._getIsInstant();
        var i = this._filter(this.items);
        this.filteredItems = i.matches;
        var o = this;
        this._bindArrangeComplete(),
          this._isInstant ? this._noTransition(e) : e(),
          this._sort(),
          this._layout();
      }),
      (c.prototype._init = c.prototype.arrange),
      (c.prototype._getIsInstant = function() {
        var t =
          void 0 !== this.options.isLayoutInstant
            ? this.options.isLayoutInstant
            : !this._isLayoutInited;
        return (this._isInstant = t), t;
      }),
      (c.prototype._bindArrangeComplete = function() {
        function t() {
          e &&
            i &&
            o &&
            n.dispatchEvent('arrangeComplete', null, [n.filteredItems]);
        }
        var e,
          i,
          o,
          n = this;
        this.once('layoutComplete', function() {
          (e = !0), t();
        }),
          this.once('hideComplete', function() {
            (i = !0), t();
          }),
          this.once('revealComplete', function() {
            (o = !0), t();
          });
      }),
      (c.prototype._filter = function(t) {
        var e = this.options.filter;
        e = e || '*';
        for (
          var i = [],
            o = [],
            n = [],
            r = this._getFilterTest(e),
            a = 0,
            s = t.length;
          a < s;
          a++
        ) {
          var l = t[a];
          if (!l.isIgnored) {
            var u = r(l);
            u && i.push(l),
              u && l.isHidden ? o.push(l) : u || l.isHidden || n.push(l);
          }
        }
        return { matches: i, needReveal: o, needHide: n };
      }),
      (c.prototype._getFilterTest = function(t) {
        return l && this.options.isJQueryFiltering
          ? function(e) {
              return l(e.element).is(t);
            }
          : 'function' == typeof t
            ? function(e) {
                return t(e.element);
              }
            : function(e) {
                return o(e.element, t);
              };
      }),
      (c.prototype.updateSortData = function(t) {
        var e;
        t ? ((t = n.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (c.prototype._getSorters = function() {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = h(i);
        }
      }),
      (c.prototype._updateItemsSortData = function(t) {
        for (var e = t && t.length, i = 0; e && i < e; i++)
          t[i].updateSortData();
      });
    var h = (function() {
      function t(t, e) {
        return t
          ? function(e) {
              return e.getAttribute(t);
            }
          : function(t) {
              var i = t.querySelector(e);
              return i && d(i);
            };
      }
      return function(e) {
        if ('string' != typeof e) return e;
        var i = u(e).split(' '),
          o = i[0],
          n = o.match(/^\[(.+)\]$/),
          r = t(n && n[1], o),
          a = c.sortDataParsers[i[1]];
        return (e = a
          ? function(t) {
              return t && a(r(t));
            }
          : function(t) {
              return t && r(t);
            });
      };
    })();
    return (
      (c.sortDataParsers = {
        parseInt: function(t) {
          return parseInt(t, 10);
        },
        parseFloat: function(t) {
          return parseFloat(t);
        },
      }),
      (c.prototype._sort = function() {
        var t = this.options.sortBy;
        if (t) {
          var e = s(
            [].concat.apply(t, this.sortHistory),
            this.options.sortAscending
          );
          this.filteredItems.sort(e),
            t != this.sortHistory[0] && this.sortHistory.unshift(t);
        }
      }),
      (c.prototype._mode = function() {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error('No layout mode: ' + t);
        return (e.options = this.options[t]), e;
      }),
      (c.prototype._resetLayout = function() {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (c.prototype._getItemLayoutPosition = function(t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (c.prototype._getContainerSize = function() {
        return this._mode()._getContainerSize();
      }),
      (c.prototype.needsResizeLayout = function() {
        return this._mode().needsResizeLayout();
      }),
      (c.prototype.appended = function(t) {
        var e = this.addItems(t);
        if (e.length)
          if ('justified' == this.options.layoutMode) {
            var i = this._filter(e);
            this.hide(i.needHide),
              this.reveal(i.matches),
              (this.filteredItems = this.filteredItems.concat(i.matches)),
              this.layoutItems(i.matches, !0);
          } else {
            var o = this._filterRevealAdded(e);
            this.filteredItems = this.filteredItems.concat(o);
          }
      }),
      (c.prototype._filterRevealAdded = function(t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (c.prototype._noTransition = function(t) {
        var e = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var i = t.call(this);
        return (this.options.transitionDuration = e), i;
      }),
      (c.prototype.getFilteredItemElements = function() {
        for (var t = [], e = 0, i = this.filteredItems.length; e < i; e++)
          t.push(this.filteredItems[e].element);
        return t;
      }),
      c
    );
  }),
  (function(t) {
    function e(t) {
      return new RegExp('(^|\\s+)' + t + '(\\s+|$)');
    }
    function i(t, e) {
      (o(t, e) ? r : n)(t, e);
    }
    var o, n, r;
    'classList' in document.documentElement
      ? ((o = function(t, e) {
          return t.classList.contains(e);
        }),
        (n = function(t, e) {
          t.classList.add(e);
        }),
        (r = function(t, e) {
          t.classList.remove(e);
        }))
      : ((o = function(t, i) {
          return e(i).test(t.className);
        }),
        (n = function(t, e) {
          o(t, e) || (t.className = t.className + ' ' + e);
        }),
        (r = function(t, i) {
          t.className = t.className.replace(e(i), ' ');
        }));
    var a = {
      hasClass: o,
      addClass: n,
      removeClass: r,
      toggleClass: i,
      has: o,
      add: n,
      remove: r,
      toggle: i,
    };
    'function' == typeof define && define.amd
      ? define('classie/classie', a)
      : 'object' == typeof exports ? (module.exports = a) : (t.classie = a);
  })(window),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define('packery/js/rect', e)
      : 'object' == typeof exports
        ? (module.exports = e())
        : ((t.Packery = t.Packery || {}), (t.Packery.Rect = e()));
  })(window, function() {
    function t(e) {
      for (var i in t.defaults) this[i] = t.defaults[i];
      for (i in e) this[i] = e[i];
    }
    return (
      ((window.Packery = function() {}).Rect = t),
      (t.defaults = { x: 0, y: 0, width: 0, height: 0 }),
      (t.prototype.contains = function(t) {
        var e = t.width || 0,
          i = t.height || 0;
        return (
          this.x <= t.x &&
          this.y <= t.y &&
          this.x + this.width >= t.x + e &&
          this.y + this.height >= t.y + i
        );
      }),
      (t.prototype.overlaps = function(t) {
        var e = this.x + this.width,
          i = this.y + this.height,
          o = t.x + t.width,
          n = t.y + t.height;
        return this.x < o && e > t.x && this.y < n && i > t.y;
      }),
      (t.prototype.getMaximalFreeRects = function(e) {
        if (!this.overlaps(e)) return !1;
        var i,
          o = [],
          n = this.x + this.width,
          r = this.y + this.height,
          a = e.x + e.width,
          s = e.y + e.height;
        return (
          this.y < e.y &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: this.width,
              height: e.y - this.y,
            })),
            o.push(i)),
          n > a &&
            ((i = new t({
              x: a,
              y: this.y,
              width: n - a,
              height: this.height,
            })),
            o.push(i)),
          r > s &&
            ((i = new t({ x: this.x, y: s, width: this.width, height: r - s })),
            o.push(i)),
          this.x < e.x &&
            ((i = new t({
              x: this.x,
              y: this.y,
              width: e.x - this.x,
              height: this.height,
            })),
            o.push(i)),
          o
        );
      }),
      (t.prototype.canFit = function(t) {
        return this.width >= t.width && this.height >= t.height;
      }),
      t
    );
  }),
  (function(t, e) {
    if ('function' == typeof define && define.amd)
      define('packery/js/packer', ['./rect'], e);
    else if ('object' == typeof exports) module.exports = e(require('./rect'));
    else {
      var i = (t.Packery = t.Packery || {});
      i.Packer = e(i.Rect);
    }
  })(window, function(t) {
    function e(t, e, i) {
      (this.width = t || 0),
        (this.height = e || 0),
        (this.sortDirection = i || 'downwardLeftToRight'),
        this.reset();
    }
    (e.prototype.reset = function() {
      (this.spaces = []), (this.newSpaces = []);
      var e = new t({ x: 0, y: 0, width: this.width, height: this.height });
      this.spaces.push(e),
        (this.sorter = i[this.sortDirection] || i.downwardLeftToRight);
    }),
      (e.prototype.pack = function(t) {
        for (var e = 0, i = this.spaces.length; e < i; e++) {
          var o = this.spaces[e];
          if (o.canFit(t)) {
            this.placeInSpace(t, o);
            break;
          }
        }
      }),
      (e.prototype.placeInSpace = function(t, e) {
        (t.x = e.x), (t.y = e.y), this.placed(t);
      }),
      (e.prototype.placed = function(t) {
        for (var e = [], i = 0, o = this.spaces.length; i < o; i++) {
          var n = this.spaces[i],
            r = n.getMaximalFreeRects(t);
          r ? e.push.apply(e, r) : e.push(n);
        }
        (this.spaces = e), this.mergeSortSpaces();
      }),
      (e.prototype.mergeSortSpaces = function() {
        e.mergeRects(this.spaces), this.spaces.sort(this.sorter);
      }),
      (e.prototype.addSpace = function(t) {
        this.spaces.push(t), this.mergeSortSpaces();
      }),
      (e.mergeRects = function(t) {
        for (var e = 0, i = t.length; e < i; e++) {
          var o = t[e];
          if (o) {
            var n = t.slice(0);
            n.splice(e, 1);
            for (var r = 0, a = 0, s = n.length; a < s; a++) {
              var l = n[a],
                u = e > a ? 0 : 1;
              o.contains(l) && (t.splice(a + u - r, 1), r++);
            }
          }
        }
        return t;
      });
    var i = {
      downwardLeftToRight: function(t, e) {
        return t.y - e.y || t.x - e.x;
      },
      rightwardTopToBottom: function(t, e) {
        return t.x - e.x || t.y - e.y;
      },
    };
    return e;
  }),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define(
          'packery/js/item',
          [
            'get-style-property/get-style-property',
            'outlayer/outlayer',
            './rect',
          ],
          e
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            require('desandro-get-style-property'),
            require('outlayer'),
            require('./rect')
          ))
        : (t.Packery.Item = e(t.getStyleProperty, t.Outlayer, t.Packery.Rect));
  })(window, function(t, e, i) {
    t('transform');
    var o = function() {
        e.Item.apply(this, arguments);
      },
      n = (o.prototype = new e.Item())._create;
    return (
      (o.prototype._create = function() {
        n.call(this), (this.rect = new i()), (this.placeRect = new i());
      }),
      (o.prototype.positionPlaceRect = function(t, e, i) {
        (this.placeRect.x = this.getPlaceRectCoord(t, !0)),
          (this.placeRect.y = this.getPlaceRectCoord(e, !1, i));
      }),
      (o.prototype.getPlaceRectCoord = function(t, e, i) {
        var o = e ? 'Width' : 'Height',
          n = this.size['outer' + o],
          r = this.layout[e ? 'columnWidth' : 'rowHeight'],
          a = this.layout.size['inner' + o];
        e ||
          ((a = Math.max(a, this.layout.maxY)),
          this.layout.rowHeight || (a -= this.layout.gutter));
        var s;
        if (r) {
          (r += this.layout.gutter),
            (a += e ? this.layout.gutter : 0),
            (t = Math.round(t / r));
          var l;
          l = this.layout.options.isHorizontal
            ? e ? 'ceil' : 'floor'
            : e ? 'floor' : 'ceil';
          var u = Math[l](a / r);
          s = u -= Math.ceil(n / r);
        } else s = a - n;
        return (t = i ? t : Math.min(t, s)), (t *= r || 1), Math.max(0, t);
      }),
      (o.prototype.copyPlaceRectPosition = function() {
        (this.rect.x = this.placeRect.x), (this.rect.y = this.placeRect.y);
      }),
      (o.prototype.removeElem = function() {
        this.element.parentNode.removeChild(this.element),
          this.layout.packer.addSpace(this.rect),
          this.emitEvent('remove', [this]);
      }),
      o
    );
  }),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define(
          'packery/js/packery',
          [
            'classie/classie',
            'get-size/get-size',
            'outlayer/outlayer',
            './rect',
            './packer',
            './item',
          ],
          e
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            require('desandro-classie'),
            require('get-size'),
            require('outlayer'),
            require('./rect'),
            require('./packer'),
            require('./item')
          ))
        : (t.Packery = e(
            t.classie,
            t.getSize,
            t.Outlayer,
            t.Packery.Rect,
            t.Packery.Packer,
            t.Packery.Item
          ));
  })(window, function(t, e, i, o, n, r) {
    function a(t, e) {
      return t.position.y - e.position.y || t.position.x - e.position.x;
    }
    function s(t, e) {
      return t.position.x - e.position.x || t.position.y - e.position.y;
    }
    o.prototype.canFit = function(t) {
      return this.width >= t.width - 1 && this.height >= t.height - 1;
    };
    var l = i.create('packery');
    return (
      (l.Item = r),
      (l.prototype._create = function() {
        i.prototype._create.call(this), (this.packer = new n());
      }),
      (l.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurements();
        var t = this.packer;
        this.options.isHorizontal
          ? ((t.width = Number.POSITIVE_INFINITY),
            (t.height = this.size.innerHeight + this.gutter),
            (t.sortDirection = 'rightwardTopToBottom'))
          : ((t.width = this.size.innerWidth + this.gutter),
            (t.height = Number.POSITIVE_INFINITY),
            (t.sortDirection = 'downwardLeftToRight')),
          t.reset(),
          (this.maxY = 0),
          (this.maxX = 0);
      }),
      (l.prototype._getMeasurements = function() {
        this._getMeasurement('columnWidth', 'width'),
          this._getMeasurement('rowHeight', 'height'),
          this._getMeasurement('gutter', 'width');
      }),
      (l.prototype._getItemLayoutPosition = function(t) {
        return this._packItem(t), t.rect;
      }),
      (l.prototype._packItem = function(t) {
        this._setRectSize(t.element, t.rect),
          this.packer.pack(t.rect),
          this._setMaxXY(t.rect);
      }),
      (l.prototype._setMaxXY = function(t) {
        (this.maxX = Math.max(t.x + t.width, this.maxX)),
          (this.maxY = Math.max(t.y + t.height, this.maxY));
      }),
      (l.prototype._setRectSize = function(t, i) {
        var o = e(t),
          n = o.outerWidth,
          r = o.outerHeight;
        (n || r) &&
          ((n = this._applyGridGutter(n, this.columnWidth)),
          (r = this._applyGridGutter(r, this.rowHeight))),
          (i.width = Math.min(n, this.packer.width)),
          (i.height = Math.min(r, this.packer.height));
      }),
      (l.prototype._applyGridGutter = function(t, e) {
        if (!e) return t + this.gutter;
        var i = t % (e += this.gutter),
          o = i && i < 1 ? 'round' : 'ceil';
        return (t = Math[o](t / e) * e);
      }),
      (l.prototype._getContainerSize = function() {
        return this.options.isHorizontal
          ? { width: this.maxX - this.gutter }
          : { height: this.maxY - this.gutter };
      }),
      (l.prototype.sortItemsByPosition = function() {
        var t = this.options.isHorizontal ? s : a;
        this.items.sort(t);
      }),
      (l.prototype.fit = function(t, e, i) {
        var o = this.getItem(t);
        o &&
          (this._getMeasurements(),
          o.getSize(),
          (o.isPlacing = !0),
          (e = void 0 === e ? o.rect.x : e),
          (i = void 0 === i ? o.rect.y : i),
          o.positionPlaceRect(e, i, !0),
          this._bindFitEvents(o),
          o.moveTo(o.placeRect.x, o.placeRect.y),
          this.layout(),
          this.unstamp(o.element),
          this.sortItemsByPosition(),
          (o.isPlacing = !1),
          o.copyPlaceRectPosition());
      }),
      (l.prototype._bindFitEvents = function(t) {
        function e() {
          2 == ++o && i.emitEvent('fitComplete', [t]);
        }
        var i = this,
          o = 0;
        t.on('layout', function() {
          return e(), !0;
        }),
          this.on('layoutComplete', function() {
            return e(), !0;
          });
      }),
      (l.prototype.resize = function() {
        var t = e(this.element),
          i = this.size && t,
          o = this.options.isHorizontal ? 'innerHeight' : 'innerWidth';
        (i && t[o] == this.size[o]) || this.layout();
      }),
      (l.Rect = o),
      (l.Packer = n),
      l
    );
  }),
  (function(t, e) {
    'function' == typeof define && define.amd
      ? define(
          [
            'TG_Layout/js/layout-mode',
            'packery/js/packery',
            'get-size/get-size',
          ],
          e
        )
      : 'object' == typeof exports
        ? (module.exports = e(
            require('TG_Layout-layout/js/layout-mode'),
            require('packery'),
            require('get-size')
          ))
        : e(t.TG_Layout.LayoutMode, t.Packery, t.getSize);
  })(window, function(t, e, i) {
    var o = t.create('packery'),
      n = o.prototype._getElementOffset,
      r = o.prototype._getMeasurement;
    !(function(t, e) {
      for (var i in e) t[i] = e[i];
    })(o.prototype, e.prototype),
      (o.prototype._getElementOffset = n),
      (o.prototype._getMeasurement = r);
    var a = o.prototype._resetLayout;
    o.prototype._resetLayout = function() {
      (this.packer = this.packer || new e.Packer()), a.apply(this, arguments);
    };
    var s = o.prototype._getItemLayoutPosition;
    return (
      (o.prototype._getItemLayoutPosition = function(t) {
        return (t.rect = t.rect || new e.Rect()), s.call(this, t);
      }),
      (o.prototype.needsResizeLayout = function() {
        var t = i(this.element),
          e = this.size && t,
          o = this.options.isHorizontal ? 'innerHeight' : 'innerWidth';
        return e && t[o] != this.size[o];
      }),
      o
    );
  }),
  (function(t) {
    'use strict';
    function e(t) {
      var e = t.create('horizontal');
      return (
        (e.prototype._resetLayout = function() {
          this.x = 0;
        }),
        (e.prototype._getItemLayoutPosition = function(t) {
          t.getSize(), this._getMeasurement('gutter', 'width');
          var e = this.x;
          return (this.x += t.size.outerWidth + this.gutter), { x: e, y: 0 };
        }),
        (e.prototype._getContainerSize = function() {
          return { width: this.x - this.gutter };
        }),
        (e.prototype.needsResizeLayout = function() {
          return this.needsVerticalResizeLayout();
        }),
        e
      );
    }
    'function' == typeof define && define.amd
      ? define(['TG_Layout/js/layout-mode'], e)
      : 'object' == typeof exports
        ? (module.exports = e(require('TG_Layout-layout/js/layout-mode')))
        : e(t.TG_Layout.LayoutMode);
  })(window),
  (function(t) {
    'use strict';
    'function' == typeof define && define.amd
      ? define(['TG_Layout/js/TG_Layout-mode'], cellsByRowDefinition)
      : (function(t) {
          var e = t.create('justified');
          (e.prototype._resetLayout = function() {
            (this.justified_data = []),
              (this.prev_width = 0),
              (this.prev_top = 0),
              (this.max_width = 0),
              (this.count = 0),
              this._getMeasurement('gutter', 'width'),
              this._getMeasurement('rowHeight', 'height');
            var t = this.TG_Layout.size.innerWidth + this.gutter,
              e = this.TG_Layout.filteredItems;
            if (this.options.isHorizontal) this.row(e);
            else {
              t: for (; e.length > 0; ) {
                for (var i = 1; i < e.length + 1; ++i) {
                  var o = e.slice(0, i),
                    n = this.getHeight(o, t);
                  if (n < this.rowHeight) {
                    this.setHeight(o, n), (e = e.slice(i));
                    continue t;
                  }
                }
                this.setHeight(o, Math.min(this.rowHeight, n));
                break;
              }
              this.checkWidth();
            }
          }),
            (e.prototype.row = function(t) {
              for (
                var e = this.options.row, i = this.rowHeight, o = 0;
                o < t.length;
                ++o
              ) {
                var n = jQuery(t[o].element).find(this.options.image),
                  r = n[0] ? this.getSize(n) : [],
                  a = r.width ? Math.round(i * r.width / r.height) : 16 * i / 9,
                  s = this.justified_data[o - e],
                  l = s ? s.x + s.width + this.gutter : 0,
                  u = s ? s.y : o * (i + this.gutter);
                this.justified_data.push({ width: a, height: i, x: l, y: u });
              }
            }),
            (e.prototype.getHeight = function(t, e) {
              e -= t.length * this.gutter;
              for (var i = 0, o = 0; o < t.length; ++o) {
                var n = jQuery(t[o].element).find(this.options.image),
                  r = n[0] ? this.getSize(n) : [];
                i +=
                  (r.width ? r.width : 16 * this.rowHeight / 9) /
                  (r.height ? r.height : this.rowHeight);
              }
              return e / i;
            }),
            (e.prototype.setHeight = function(t, e) {
              this.prev_width = 0;
              for (var i = 0; i < t.length; ++i) {
                var o = jQuery(t[i].element).find(this.options.image),
                  e = Math.round(e),
                  n = o[0] ? this.getSize(o) : [],
                  r = n.width ? Math.round(e * n.width / n.height) : 16 * e / 9;
                this.justified_data.push({
                  width: r,
                  height: e,
                  x: this.prev_width,
                  y: this.prev_top,
                }),
                  (this.prev_width += r + this.gutter);
              }
              this.prev_top += e + this.gutter;
            }),
            (e.prototype.getSize = function(t) {
              if (t[0].naturalWidth)
                var e = t[0] ? t[0].naturalWidth : null,
                  i = t[0] ? t[0].naturalHeight : null;
              else {
                var o = new Image();
                o.src = t[0] ? t.attr('src') : null;
                var e = o ? o.width : null,
                  i = o ? o.height : null;
              }
              return { width: e, height: i };
            }),
            (e.prototype.checkWidth = function() {
              for (
                var t = 0, e = this.justified_data.length, i = 0;
                i < this.justified_data.length;
                ++i
              )
                this.justified_data[i].y != t && this.adjustWidth(i - 1),
                  (t = this.justified_data[i].y);
              var o = this.justified_data[e - 1];
              o &&
                o.x + o.width > this.TG_Layout.size.innerWidth &&
                this.adjustWidth(e - 1);
            }),
            (e.prototype.adjustWidth = function(t) {
              var e = this.justified_data[t].x,
                i = this.justified_data[t].width,
                o = this.TG_Layout.size.innerWidth - (e + i);
              this.justified_data[t].width = i + o;
            }),
            (e.prototype._getItemLayoutPosition = function(t) {
              if (!this.justified_data[this.count]) {
                (this.pcount = this.count), this._resetLayout();
                for (var e = 0; e < this.pcount; ++e)
                  jQuery(this.TG_Layout.filteredItems[e].element)
                    .width(this.justified_data[e].width)
                    .height(this.justified_data[e].height)
                    .css('top', this.justified_data[e].y)
                    .css('left', this.justified_data[e].x),
                    (o =
                      this.justified_data[e].x + this.justified_data[e].width),
                    (this.max_width = o > this.max_width ? o : this.max_width);
                this.count = this.pcount;
              }
              (t.element.style.width =
                this.justified_data[this.count].width + 'px'),
                (t.element.style.height =
                  this.justified_data[this.count].height + 'px');
              var i = {
                  x: this.justified_data[this.count].x,
                  y: this.justified_data[this.count].y,
                },
                o = i.x + this.justified_data[this.count].width;
              return (
                (this.max_width = o > this.max_width ? o : this.max_width),
                ++this.count,
                i
              );
            }),
            (e.prototype._getContainerSize = function() {
              return this.options.isHorizontal
                ? {
                    width: this.max_width,
                    height:
                      (this.rowHeight + this.gutter) * this.options.row -
                      this.gutter,
                  }
                : { height: this.prev_top - this.gutter };
            }),
            (e.prototype.needsResizeLayout = function() {
              return this.max_width;
            });
        })(t.TG_Layout.LayoutMode);
  })(window),
  (function(t) {
    var e = TG_Layout.Item.prototype.reveal;
    TG_Layout.Item.prototype.reveal = function() {
      e.apply(this, arguments), t(this.element).removeClass('tg-item-hidden');
    };
    var i = TG_Layout.Item.prototype.hide;
    TG_Layout.Item.prototype.hide = function() {
      i.apply(this, arguments), t(this.element).addClass('tg-item-hidden');
    };
  })(jQuery),
  (function(t, e, i) {
    'use strict';
    function o(e, b, E) {
      function k(e) {
        var i = bt.length,
          o = dt.data('TG_Layout'),
          n = o ? o.options[o.options.layoutMode].gutter.offsetWidth : 0;
        if (!o) return !1;
        if (
          ((ct = ut.width()),
          (gt = ft.width()),
          (ht = dt.outerWidth()),
          (bt.length = 0),
          (pt.start = 0),
          (pt.end = P(ht - ct, 0)),
          Et)
        ) {
          xt.length, (Tt = dt.children(at.itemSelector)), (xt.length = 0);
          for (
            var r,
              a = u(dt, at.horizontal ? 'paddingLeft' : 'paddingTop'),
              s = u(dt, at.horizontal ? 'paddingRight' : 'paddingBottom'),
              l = 'border-box' === t(Tt).css('boxSizing'),
              c = o.filteredItems,
              h = 0,
              p = 0,
              f = [],
              m = [],
              g = 0;
            g < c.length;
            g++
          ) {
            var y = parseFloat(getComputedStyle(c[g].element).width) + n,
              v = c[g].position.x;
            (p = v + y > p ? v + y : p), f.push(v);
          }
          f.push(p),
            f.sort(function(t, e) {
              return t - e;
            });
          for (g = 1; g < f.length; g++) m.push(f[g] - f[g - 1]);
          (ht = 0),
            t(c).each(function(t, e) {
              var i = n / 2,
                o = n / 2,
                l = {};
              (l.el = e),
                (l.size = m[t]),
                (l.half = l.size / 2),
                (l.start = ht - i),
                (l.center = l.start - j(ct / 2 - l.size / 2)),
                (l.end = l.start - ct + l.size),
                t || (ht += a),
                (ht += l.size),
                at.horizontal || (o && i && t > 0 && (ht -= G(i, o))),
                0 === t && ((l.end += s), (ht += s), (h = o)),
                l.size && (xt.push(l), (r = l));
            }),
            (dt[0].style[at.horizontal ? 'width' : 'height'] =
              (l ? ht : ht - a - s) + 'px'),
            (ht -= h),
            xt.length
              ? ((pt.start = xt[0][Pt ? 'center' : 'start']),
                (pt.end = Pt ? r.center : ct < ht ? r.end : pt.start))
              : (pt.start = pt.end = 0);
        }
        if (((pt.center = j(pt.end / 2 + pt.start / 2)), A(), !lt && ct > 0)) {
          var _ = pt.start,
            w = '';
          if (Et)
            t.each(xt, function(t, e) {
              Pt
                ? bt.push(e.center)
                : e.start + e.size > _ &&
                  _ <= pt.end &&
                  ((_ = e.start),
                  bt.push(
                    e.size < ct && 'justified' === o.options.layoutMode
                      ? e.start + (e.size - ct) / 2
                      : e.start
                  ),
                  (_ += ct) > pt.end && _ < pt.end + ct && bt.push(pt.end));
            });
          else for (; _ - ct < pt.end; ) bt.push(_), (_ += ct);
          if (_t[0] && i !== bt.length) {
            for (g = 0; g < bt.length; g++) w += at.pageBuilder.call(st, g);
            1 === bt.length && (w = null),
              (wt = _t.html(w).children())
                .eq(zt.activePage)
                .addClass(at.activeClass);
          }
        }
        if (
          ((zt.slideeSize = ht),
          (zt.frameSize = ct),
          (zt.sbSize = gt),
          (zt.handleSize = yt),
          Et)
        ) {
          e &&
            null != at.startAt &&
            st[Gt ? 'toCenter' : 'toStart'](at.startAt);
          var b = xt[zt.activeItem];
          M(Gt && b ? b.center : d(pt.dest, pt.start, pt.end));
        } else
          e
            ? null != at.startAt && M(at.startAt, 1)
            : M(d(pt.dest, pt.start, pt.end));
        ot('load');
      }
      function M(t, e, i) {
        if (Et && Nt.released && !i) {
          var o = q(t),
            n = t > pt.start && t < pt.end;
          Gt
            ? (n && (t = xt[o.centerItem].center),
              Pt && at.activateMiddle && activate(o.centerItem))
            : n && (t = xt[o.firstItem].start);
        }
        Nt.init && Nt.slidee && at.elasticBounds
          ? t > pt.end
            ? (t = pt.end + (t - pt.end) / 6)
            : t < pt.start && (t = pt.start + (t - pt.start) / 6)
          : (t = d(t, pt.start, pt.end)),
          (Ht.start = +new Date()),
          (Ht.time = 0),
          (Ht.from = pt.cur),
          (Ht.to = t),
          (Ht.delta = t - pt.cur),
          (Ht.tweesing = Nt.tweese || (Nt.init && !Nt.slidee)),
          (Ht.immediate =
            !Ht.tweesing && (e || (Nt.init && Nt.slidee) || !at.speed)),
          (Nt.tweese = 0),
          t !== pt.dest && ((pt.dest = t), ot('change'), Yt || D()),
          N(),
          A(),
          H(),
          R();
      }
      function D() {
        if (st.initialized) {
          if (!Yt) return (Yt = g(D)), void (Nt.released && ot('moveStart'));
          Ht.immediate
            ? (pt.cur = Ht.to)
            : Ht.tweesing
              ? ((Ht.tweeseDelta = Ht.to - pt.cur),
                L(Ht.tweeseDelta) < 0.1
                  ? (pt.cur = Ht.to)
                  : (pt.cur +=
                      Ht.tweeseDelta *
                      (Nt.released ? at.swingSpeed : at.syncSpeed)))
              : ((Ht.time = G(+new Date() - Ht.start, at.speed)),
                (pt.cur =
                  Ht.from +
                  Ht.delta *
                    t.easing[at.easing](
                      Ht.time / at.speed,
                      Ht.time,
                      0,
                      1,
                      at.speed
                    ))),
            Ht.to === pt.cur
              ? ((pt.cur = Ht.to), (Nt.tweese = Yt = 0))
              : (Yt = g(D)),
            ot('move'),
            lt ||
              (h
                ? (dt[0].style[h] =
                    p +
                    (at.horizontal ? 'translateX' : 'translateY') +
                    '(' +
                    -pt.cur +
                    'px)')
                : (dt[0].style[at.horizontal ? 'left' : 'top'] =
                    -j(pt.cur) + 'px')),
            !Yt && Nt.released && ot('moveEnd');
        }
      }
      function R() {
        wt[0] &&
          At.page !== zt.activePage &&
          ((At.page = zt.activePage),
          wt
            .removeClass(at.activeClass)
            .eq(zt.activePage)
            .addClass(at.activeClass),
          ot('activePage', At.page));
      }
      function O() {
        (Ft.speed && pt.cur !== (Ft.speed > 0 ? pt.end : pt.start)) ||
          st.stop(),
          (Vt = Nt.init ? g(O) : 0),
          (Ft.now = +new Date()),
          (Ft.pos = pt.cur + (Ft.now - Ft.lastTime) / 1e3 * Ft.speed),
          M(Nt.init ? Ft.pos : j(Ft.pos)),
          Nt.init || pt.cur !== pt.dest || ot('moveEnd'),
          (Ft.lastTime = Ft.now);
      }
      function W(t, e, o) {
        if (('boolean' === n(e) && ((o = e), (e = i)), e === i)) M(pt[t], o);
        else {
          if (Gt && 'center' !== t) return;
          var r = st.getPos(e);
          r && M(r[t], o, !Gt);
        }
      }
      function B(t) {
        return null != t
          ? l(t) ? (t >= 0 && t < xt.length ? t : -1) : Tt.index(t)
          : -1;
      }
      function q(t) {
        t = d(l(t) ? t : pt.dest, pt.start, pt.end);
        var e = {},
          i = Pt ? 0 : ct / 2;
        if (!lt)
          for (var o = 0, n = bt.length; o < n; o++) {
            if (t >= pt.end || o === bt.length - 1) {
              e.activePage = bt.length - 1;
              break;
            }
            if (t <= bt[o] + i) {
              e.activePage = o;
              break;
            }
          }
        if (Et) {
          for (var r = !1, a = !1, s = !1, u = 0, c = xt.length; u < c; u++)
            if (
              (!1 === r && t <= xt[u].start + xt[u].half && (r = u),
              !1 === s && t <= xt[u].center + xt[u].half && (s = u),
              u === c - 1 || t <= xt[u].end + xt[u].half)
            ) {
              a = u;
              break;
            }
          (e.firstItem = l(r) ? r : 0),
            (e.centerItem = l(s) ? s : e.firstItem),
            (e.lastItem = l(a) ? a : e.centerItem);
        }
        return e;
      }
      function A(e) {
        t.extend(zt, q(e));
      }
      function H() {
        var t = pt.dest <= pt.start,
          e = pt.dest >= pt.end,
          i = (t ? 1 : 0) | (e ? 2 : 0);
        if (
          (At.slideePosState !== i &&
            ((At.slideePosState = i),
            Wt.is('button,input') && Wt.prop('disabled', t),
            Bt.is('button,input') && Bt.prop('disabled', e),
            Wt.add(Dt)[t ? 'addClass' : 'removeClass'](at.disabledClass),
            Bt.add(Mt)[e ? 'addClass' : 'removeClass'](at.disabledClass)),
          At.fwdbwdState !== i &&
            Nt.released &&
            ((At.fwdbwdState = i),
            Dt.is('button,input') && Dt.prop('disabled', t),
            Mt.is('button,input') && Mt.prop('disabled', e)),
          Et && null != zt.activeItem)
        ) {
          var o = 0 === zt.activeItem,
            n = zt.activeItem >= xt.length - 1,
            r = (o ? 1 : 0) | (n ? 2 : 0);
          At.itemsButtonState !== r &&
            ((At.itemsButtonState = r),
            Rt.is('button,input') && Rt.prop('disabled', o),
            Ot.is('button,input') && Ot.prop('disabled', n),
            Rt[o ? 'addClass' : 'removeClass'](at.disabledClass),
            Ot[n ? 'addClass' : 'removeClass'](at.disabledClass));
        }
      }
      function F(t, e) {
        for (var i = 0, o = qt[t].length; i < o; i++)
          if (qt[t][i] === e) return i;
        return -1;
      }
      function N() {
        Nt.released && !st.isPaused && st.resume();
      }
      function Y(t) {
        return (
          j(d(t, vt.start, vt.end) / vt.end * (pt.end - pt.start)) + pt.start
        );
      }
      function Q() {
        (Nt.history[0] = Nt.history[1]),
          (Nt.history[1] = Nt.history[2]),
          (Nt.history[2] = Nt.history[3]),
          (Nt.history[3] = Nt.delta);
      }
      function X(t) {
        (Nt.released = 0), (Nt.source = t), (Nt.slidee = 'slidee' === t);
      }
      function V(e) {
        var i = 'touchstart' === e.type,
          o = e.data.source,
          n = 'slidee' === o;
        Nt.init ||
          (!i && Z(e.target)) ||
          (('handle' !== o || (at.dragHandle && vt.start !== vt.end)) &&
            ((n && !(i ? at.touchDragging : at.mouseDragging && e.which < 2)) ||
              (i || r(e),
              X(o),
              (Nt.init = 0),
              (Nt.$source = t(e.target)),
              (Nt.touch = i),
              (Nt.pointer = i ? e.originalEvent.touches[0] : e),
              (Nt.initX = Nt.pointer.pageX),
              (Nt.initY = Nt.pointer.pageY),
              (Nt.initPos = n ? pt.cur : vt.cur),
              (Nt.start = +new Date()),
              (Nt.time = 0),
              (Nt.path = 0),
              (Nt.delta = 0),
              (Nt.locked = 0),
              (Nt.history = [0, 0, 0, 0]),
              (Nt.pathToLock = n ? (i ? 30 : 10) : 0),
              y.on(i ? w : _, U),
              st.pause(1),
              (n ? dt : mt).addClass(at.draggedClass),
              ot('moveStart'),
              n && (Qt = setInterval(Q, 10)))));
      }
      function U(t) {
        if (
          ((Nt.released = 'mouseup' === t.type || 'touchend' === t.type),
          (Nt.pointer = Nt.touch
            ? t.originalEvent[Nt.released ? 'changedTouches' : 'touches'][0]
            : t),
          (Nt.pathX = Nt.pointer.pageX - Nt.initX),
          (Nt.pathY = Nt.pointer.pageY - Nt.initY),
          (Nt.path = I(S(Nt.pathX, 2) + S(Nt.pathY, 2))),
          (Nt.delta = at.horizontal ? Nt.pathX : Nt.pathY),
          Nt.released || !(Nt.path < 1))
        ) {
          if (!Nt.init) {
            if (
              !(at.horizontal
                ? L(Nt.pathX) > L(Nt.pathY)
                : L(Nt.pathX) < L(Nt.pathY))
            )
              return $();
            Nt.init = 1;
          }
          r(t),
            !Nt.locked &&
              Nt.path > Nt.pathToLock &&
              Nt.slidee &&
              ((Nt.locked = 1), Nt.$source.on(T, a)),
            Nt.released &&
              ($(),
              at.releaseSwing &&
                Nt.slidee &&
                ((Nt.swing = (Nt.delta - Nt.history[0]) / 40 * 300),
                (Nt.delta += Nt.swing),
                (Nt.tweese = L(Nt.swing) > 10))),
            M(Nt.slidee ? j(Nt.initPos - Nt.delta) : Y(Nt.initPos + Nt.delta));
        }
      }
      function $() {
        clearInterval(Qt),
          (Nt.released = !0),
          y.off(Nt.touch ? w : _, U),
          (Nt.slidee ? dt : mt).removeClass(at.draggedClass),
          setTimeout(function() {
            Nt.$source.off(T, a);
          }),
          pt.cur === pt.dest && Nt.init && ot('moveEnd'),
          st.resume(1),
          (Nt.init = 0);
      }
      function Z(e) {
        return ~t.inArray(e.nodeName, z) || t(e).is(at.interactive);
      }
      function J() {
        st.stop(), y.off('mouseup', J);
      }
      function K(t) {
        switch ((r(t), this)) {
          case Mt[0]:
          case Dt[0]:
            st.moveBy(Mt.is(this) ? at.moveBy : -at.moveBy), y.on('mouseup', J);
            break;
          case Rt[0]:
            st.prev();
            break;
          case Ot[0]:
            st.next();
            break;
          case Wt[0]:
            st.prevPage();
            break;
          case Bt[0]:
            st.nextPage();
        }
      }
      function tt(t) {
        if (at.keyboardNavBy)
          switch (t.which) {
            case at.horizontal ? 37 : 38:
              r(t), st['pages' === at.keyboardNavBy ? 'prevPage' : 'prev']();
              break;
            case at.horizontal ? 39 : 40:
              r(t), st['pages' === at.keyboardNavBy ? 'nextPage' : 'next']();
          }
      }
      function et() {
        this.parentNode === _t[0] && st.activatePage(wt.index(this));
      }
      function it(t) {
        at.pauseOnHover && st['mouseenter' === t.type ? 'pause' : 'resume'](2);
      }
      function ot(t, e) {
        if (qt[t]) {
          for (rt = qt[t].length, C.length = 0, nt = 0; nt < rt; nt++)
            C.push(qt[t][nt]);
          for (nt = 0; nt < rt; nt++) C[nt].call(st, t, e);
        }
      }
      var nt,
        rt,
        at = t.extend({}, o.defaults, b),
        st = this,
        lt = l(e),
        ut = t(e),
        dt = at.slidee ? t(at.slidee).eq(0) : ut.children().eq(0),
        ct = 0,
        ht = 0,
        pt = { start: 0, center: 0, end: 0, cur: 0, dest: 0 },
        ft = t(at.scrollBar).eq(0),
        mt = ft.children().eq(0),
        gt = 0,
        yt = 0,
        vt = { start: 0, end: 0, cur: 0 },
        _t = t(at.pagesBar),
        wt = 0,
        bt = [],
        Tt = 0,
        xt = [],
        zt = {
          firstItem: 0,
          lastItem: 0,
          centerItem: 0,
          activeItem: null,
          activePage: 0,
        },
        Ct = new c(ut[0]),
        Lt = new c(dt[0]),
        It = new c(ft[0]),
        St = new c(mt[0]),
        jt = 'basic' === at.itemNav,
        Pt = 'forceCentered' === at.itemNav,
        Gt = 'centered' === at.itemNav || Pt,
        Et = !lt && (jt || Gt || Pt),
        kt = (at.scrollSource && t(at.scrollSource),
        at.dragSource ? t(at.dragSource) : ut),
        Mt = t(at.forward),
        Dt = t(at.backward),
        Rt = t(at.prev),
        Ot = t(at.next),
        Wt = t(at.prevPage),
        Bt = t(at.nextPage),
        qt = {},
        At = {},
        Ht = {},
        Ft = {},
        Nt = { released: 1 },
        Yt = 0,
        Qt = 0,
        Xt = 0,
        Vt = 0;
      lt || (e = ut[0]),
        (st.initialized = 0),
        (st.frame = e),
        (st.slidee = dt[0]),
        (st.pos = pt),
        (st.rel = zt),
        (st.items = xt),
        (st.pages = bt),
        (st.isPaused = 0),
        (st.options = at),
        (st.dragging = Nt),
        (st.reload = function() {
          k();
        }),
        (st.getPos = function(t) {
          if (Et) {
            var e = B(t);
            return -1 !== e && xt[e];
          }
          var i = dt.find(t).eq(0);
          if (i[0]) {
            var o = at.horizontal
                ? i.offset().left - dt.offset().left
                : i.offset().top - dt.offset().top,
              n = i[at.horizontal ? 'outerWidth' : 'outerHeight']();
            return {
              start: o,
              center: o - ct / 2 + n / 2,
              end: o - ct + n,
              size: n,
            };
          }
          return !1;
        }),
        (st.moveBy = function(t) {
          (Ft.speed = t),
            !Nt.init &&
              Ft.speed &&
              pt.cur !== (Ft.speed > 0 ? pt.end : pt.start) &&
              ((Ft.lastTime = +new Date()),
              (Ft.startPos = pt.cur),
              X('button'),
              (Nt.init = 1),
              ot('moveStart'),
              m(Vt),
              O());
        }),
        (st.stop = function() {
          'button' === Nt.source && ((Nt.init = 0), (Nt.released = 1));
        }),
        (st.prev = function() {
          st.activate(null == zt.activeItem ? 0 : zt.activeItem - 1);
        }),
        (st.next = function() {
          st.activate(null == zt.activeItem ? 0 : zt.activeItem + 1);
        }),
        (st.prevPage = function() {
          st.activatePage(zt.activePage - 1);
        }),
        (st.nextPage = function() {
          st.activatePage(zt.activePage + 1);
        }),
        (st.slideBy = function(t, e) {
          t &&
            (Et
              ? st[Gt ? 'toCenter' : 'toStart'](
                  d(
                    (Gt ? zt.centerItem : zt.firstItem) + at.scrollBy * t,
                    0,
                    xt.length
                  )
                )
              : M(pt.dest + t, e));
        }),
        (st.slideTo = function(t, e) {
          M(t, e);
        }),
        (st.toStart = function(t, e) {
          W('start', t, e);
        }),
        (st.toEnd = function(t, e) {
          W('end', t, e);
        }),
        (st.toCenter = function(t, e) {
          W('center', t, e);
        }),
        (st.getIndex = B),
        (st.activatePage = function(t, e) {
          l(t) && M(bt[d(t, 0, bt.length - 1)], e);
        }),
        (st.resume = function(t) {
          at.cycleBy &&
            at.cycleInterval &&
            ('items' !== at.cycleBy || (xt[0] && null != zt.activeItem)) &&
            !(t < st.isPaused) &&
            ((st.isPaused = 0),
            Xt ? (Xt = clearTimeout(Xt)) : ot('resume'),
            (Xt = setTimeout(function() {
              switch ((ot('cycle'), at.cycleBy)) {
                case 'items':
                  st.activate(
                    zt.activeItem >= xt.length - 1 ? 0 : zt.activeItem + 1
                  );
                  break;
                case 'pages':
                  st.activatePage(
                    zt.activePage >= bt.length - 1 ? 0 : zt.activePage + 1
                  );
              }
            }, at.cycleInterval)));
        }),
        (st.pause = function(t) {
          t < st.isPaused ||
            ((st.isPaused = t || 100),
            Xt && ((Xt = clearTimeout(Xt)), ot('pause')));
        }),
        (st.toggle = function() {
          st[Xt ? 'pause' : 'resume']();
        }),
        (st.on = function(t, e) {
          if ('object' === n(t))
            for (var i in t) t.hasOwnProperty(i) && st.on(i, t[i]);
          else if ('function' === n(e))
            for (var o = t.split(' '), r = 0, a = o.length; r < a; r++)
              (qt[o[r]] = qt[o[r]] || []),
                -1 === F(o[r], e) && qt[o[r]].push(e);
          else if ('array' === n(e))
            for (var s = 0, l = e.length; s < l; s++) st.on(t, e[s]);
        }),
        (st.init = function() {
          if (!st.initialized) {
            st.on(E);
            var t = ['overflow', 'position'],
              e = [
                'position',
                'webkitTransform',
                'msTransform',
                'transform',
                'left',
                'top',
                'width',
                'height',
              ];
            Ct.save.apply(Ct, t),
              It.save.apply(It, t),
              Lt.save.apply(Lt, e),
              St.save.apply(St, e);
            var i = mt;
            return (
              lt ||
                ((i = i.add(dt)),
                ut.css('overflow', 'hidden'),
                h ||
                  'static' !== ut.css('position') ||
                  ut.css('position', 'relative')),
              h
                ? p && i.css(h, p)
                : ('static' === ft.css('position') &&
                    ft.css('position', 'relative'),
                  i.css({ position: 'absolute' })),
              at.forward && Mt.on(x, K),
              at.backward && Dt.on(x, K),
              at.prev && Rt.on(T, K),
              at.next && Ot.on(T, K),
              at.prevPage && Wt.on(T, K),
              at.nextPage && Bt.on(T, K),
              _t[0] &&
                at.activatePageOn &&
                _t.on(at.activatePageOn + '.' + f, '*', et),
              kt.on(v, { source: 'slidee' }, V),
              mt && mt.on(v, { source: 'handle' }, V),
              y.on('keydown', tt),
              lt ||
                (ut.on('mouseenter.' + f + ' mouseleave.' + f, it),
                ut.on('scroll.' + f, s)),
              (st.initialized = 1),
              k(!0),
              at.cycleBy && !lt && st[at.startPaused ? 'pause' : 'resume'](),
              st
            );
          }
        });
    }
    function n(t) {
      return null == t
        ? String(t)
        : 'object' == typeof t || 'function' == typeof t
          ? Object.prototype.toString
              .call(t)
              .match(/\s([a-z]+)/i)[1]
              .toLowerCase() || 'object'
          : typeof t;
    }
    function r(t, e) {
      t.preventDefault(), e && t.stopPropagation();
    }
    function a(e) {
      r(e, 1), t(this).off(e.type, a);
    }
    function s() {
      (this.scrollLeft = 0), (this.scrollTop = 0);
    }
    function l(t) {
      return !isNaN(parseFloat(t)) && isFinite(t);
    }
    function u(t, e) {
      return 0 | j(String(t.css(e)).replace(/[^\-0-9.]/g, ''));
    }
    function d(t, e, i) {
      return t < e ? e : t > i ? i : t;
    }
    function c(t) {
      var e = {};
      return (
        (e.style = {}),
        (e.save = function() {
          if (t && t.nodeType) {
            for (var i = 0; i < arguments.length; i++)
              e.style[arguments[i]] = t.style[arguments[i]];
            return e;
          }
        }),
        (e.restore = function() {
          if (t && t.nodeType) {
            for (var i in e.style)
              e.style.hasOwnProperty(i) && (t.style[i] = e.style[i]);
            return e;
          }
        }),
        e
      );
    }
    var h,
      p,
      f = 'TG_Slider',
      m = e.cancelAnimationFrame || e.cancelRequestAnimationFrame,
      g = e.requestAnimationFrame,
      y = t(document),
      v = 'touchstart.' + f + ' mousedown.' + f,
      _ = 'mousemove.' + f + ' mouseup.' + f,
      w = 'touchmove.' + f + ' touchend.' + f,
      b =
        (document.implementation.hasFeature('Event.wheel', '3.0')
          ? 'wheel.'
          : 'mousewheel.') + f,
      T = 'click.' + f,
      x = 'mousedown.' + f,
      z = ['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'],
      C = [],
      L = Math.abs,
      I = Math.sqrt,
      S = Math.pow,
      j = Math.round,
      P = Math.max,
      G = Math.min,
      E = 0;
    y.on(b, function(t) {
      var e = t.originalEvent[f],
        i = +new Date();
      (!e || e.options.scrollHijack < i - E) && (E = i);
    }),
      (function(t) {
        g =
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          function(t) {
            var i = new Date().getTime(),
              o = Math.max(0, 16 - (i - e)),
              n = setTimeout(t, o);
            return (e = i), n;
          };
        var e = new Date().getTime(),
          i =
            t.cancelAnimationFrame ||
            t.webkitCancelAnimationFrame ||
            t.clearTimeout;
        m = function(e) {
          i.call(t, e);
        };
      })(window),
      (function() {
        function t(t) {
          for (var o = 0, n = e.length; o < n; o++) {
            var r = e[o] ? e[o] + t.charAt(0).toUpperCase() + t.slice(1) : t;
            if (null != i.style[r]) return r;
          }
        }
        var e = ['', 'Webkit', 'Moz', 'ms', 'O'],
          i = document.createElement('div');
        (h = t('transform')), (p = t('perspective') ? 'translateZ(0) ' : '');
      })(),
      (e.TG_Slider = o),
      (t.fn.TG_Slider = function(e, i) {
        var r, a;
        return (
          t.isPlainObject(e) ||
            (('string' !== n(e) && !1 !== e) ||
              ((r = !1 === e ? 'destroy' : e),
              (a = Array.prototype.slice.call(arguments, 1))),
            (e = {})),
          this.each(function(n, s) {
            var l = t.data(s, f);
            l || r
              ? l && r && l[r] && l[r].apply(l, a)
              : (l = t.data(s, f, new o(s, e, i).init()));
          })
        );
      });
  })(jQuery, window),
  jQuery.noConflict();
var The_Grid = {
    preview: '#tg-grid-preview-inner',
    wrapper: '.tg-grid-wrapper',
    slider: '.tg-grid-slider',
    grid: '.tg-grid-holder',
    loader: '.tg-grid-preloader',
    ajax: '.tg-ajax-button',
    ajaxMsg: '.tg-ajax-scroll-holder',
    sizer: '.tg-grid-sizer',
    gutter: '.tg-gutter-sizer',
    item: '.tg-item',
    itemImg: '.tg-item-image',
    gallery: '.tg-item-gallery-holder',
    tooltip: '.tg-filter-count',
    filterH: '.tg-filters-holder',
    filter: '.tg-filter, .tg-filters-holder select',
    search: '.tg-search',
    clear: '.tg-search-clear',
    sorter: '.tg-sorters-holder',
    sorterBy: '.tg-sorter li, select.tg-sorter',
    sortASC: '.tg-sorter-order',
    arrLeft: '.tg-left-arrow',
    arrRight: '.tg-right-arrow',
    bullets: '.tg-slider-bullets',
    pages: '.tg-page-ajax',
    sortData: {
      excerpt: 'p',
      title: function(t) {
        return jQuery(t).data('title');
      },
      id: function(t) {
        return jQuery(t).data('id');
      },
      date: function(t) {
        return jQuery(t).data('date');
      },
      author: function(t) {
        return jQuery(t).data('author');
      },
      comment: function(t) {
        return jQuery(t).data('comment');
      },
      popular_post: function(t) {
        return jQuery(t).data('popular-post');
      },
      total_sales: function(t) {
        return jQuery(t).data('total-sales');
      },
      regular_price: function(t) {
        return jQuery(t).data('regular-price');
      },
      sale_price: function(t) {
        return jQuery(t).data('sale-price');
      },
      featured: function(t) {
        return jQuery(t).data('featured');
      },
      stock: function(t) {
        return jQuery(t).data('stock');
      },
      sku: function(t) {
        return jQuery(t).data('sku');
      },
    },
    defaults: {
      style: 'grid',
      layout: 'vertical',
      fitrows: !1,
      fullWidth: null,
      fullHeight: null,
      rtl: !0,
      filterComb: !1,
      filterLogic: 'AND',
      filterLoad: '',
      sortByLoad: '',
      orderLoad: !1,
      row: 1,
      ratio: 1,
      gutters: [[9999, 0], [1200, 0], [980, 0], [768, 0], [480, 0], [320, 0]],
      cols: [[9999, 4], [1200, 3], [980, 3], [768, 2], [480, 1], [320, 1]],
      rows: [
        [9999, 240],
        [1200, 240],
        [980, 220],
        [768, 220],
        [480, 200],
        [320, 200],
      ],
      animation: [{ name: 'None' }, { visible: '' }, { hidden: '' }],
      transition: 0,
      itemNav: null,
      swingSpeed: 500,
      cycleBy: null,
      cycle: 5e3,
      startAt: 0,
      ajaxMethod: null,
      ajaxDelay: 0,
      preloader: 0,
      itemDelay: 0,
      gallery: !1,
    },
  },
  tg_meta_data = tg_global_var.meta_data,
  tg_custom_sorter = {};
if (tg_meta_data)
  for (var i = 0; i < tg_meta_data.length; i++) {
    var tg_cmk = tg_meta_data[i].key,
      tg_cma = (tg_cmk =
        tg_cmk.length && '_' == tg_cmk[0] ? tg_cmk.slice(1) : tg_cmk).replace(
        /\_/g,
        '-'
      );
    !(function(t) {
      tg_custom_sorter[tg_cmk] = function(e) {
        return jQuery(e).data(t);
      };
    })(tg_cma);
  }
The_Grid.sortData = jQuery.extend({}, The_Grid.sortData, tg_custom_sorter);
var tg_debounce_resize = tg_global_var.debounce ? 'debouncedresize' : 'resize',
  tg_is_mobile = tg_global_var.is_mobile;
!(function(t) {
  'use strict';
  t.fn.The_Grid = function(e) {
    return this.each(function() {
      function e(t) {
        var e = ot.not('.tg-item-hidden').length;
        t.length === e && j.reload();
      }
      function i(e) {
        for (var i = 0; i < t(e).length; i++)
          for (
            var o, n, r = t(e).eq(i), a = r.get(0).attributes, s = 0;
            s < a.length;
            s++
          )
            (o = a[s].name),
              (n = a[s].value),
              0 === o.indexOf('data-') &&
                'data-row' !== o &&
                'data-col' !== o &&
                (r.removeAttr(o), r.data(o.replace('data-', ''), n), s--);
      }
      function o(e) {
        if (!N) return !1;
        var i;
        ot.removeClass('tg-item-index'),
          at.val(''),
          yt.filterComb
            ? ((i = []),
              (B =
                '*' === e.data('filter')
                  ? e.nextAll('[data-filter]').removeClass('tg-filter-active')
                  : e
                      .prevAll('[data-filter="*"]')
                      .removeClass('tg-filter-active')),
              (B =
                '*' === e.data('filter')
                  ? e
                      .closest('select')
                      .find('option')
                      .prop('selected', !1)
                  : e
                      .closest('select')
                      .find('[data-filter="*"]')
                      .prop('selected', !0)),
              e.toggleClass('tg-filter-active'),
              U.find('.tg-filter-active').each(function() {
                '*' != t(this).data('filter') && i.push(t(this).data('filter'));
              }),
              (i = 'AND' === yt.filterLogic ? n(i) : i.join(', ')))
            : ((i = e.data('filter')),
              rt.removeClass('tg-filter-active'),
              e.addClass('tg-filter-active')),
          (B = !i && U.find('[data-filter="*"]').addClass('tg-filter-active')),
          r(),
          q.TG_Layout({ filter: i }),
          t.TG_Pause_Players();
      }
      function n(t) {
        var e = '';
        for (var i in t) t.hasOwnProperty(i) && (e += t[i]);
        return e;
      }
      function r() {
        nt.each(function(e, i) {
          var o = t(this).find(The_Grid.filter + '.tg-filter-active').length;
          B =
            0 === o &&
            t(this)
              .find('[data-filter="*"]')
              .addClass('tg-filter-active');
        });
      }
      function a(t) {
        if (!N) return !1;
        (z = 'none' === t.data('value') ? '' : t.data('value')),
          (C = t.text()),
          (H = dt.data('asc')),
          ot.removeClass('tg-item-index'),
          lt.find('.tg-dropdown-value').text(C),
          q.TG_Layout({ sortAscending: H, sortBy: z });
      }
      function s() {
        if (yt.fullWidth && 0 === $.length) {
          U.css('left', 0);
          var e = parseInt(U.css('margin-left')),
            i = parseInt(U.css('margin-right')),
            o = U.offset().left - e;
          U.width(t(window).width() - (e + i)), U.css('left', -o);
        }
      }
      function l() {
        if (yt.gallery) {
          var e;
          d(),
            !The_Grid.galleryInt &&
              t(The_Grid.gallery).length > 0 &&
              (The_Grid.galleryInt = setInterval(function() {
                (L = Math.floor(Math.random() * A.length)),
                  (I = I === L && A.length > 0 ? u(A, L + 1) : L),
                  (e = t(The_Grid.gallery).eq(I)),
                  (S =
                    A.length > 0
                      ? u(A[I], e.find('.show').index() - 1 + 2)
                      : 0),
                  e.find(The_Grid.itemImg).removeClass('show'),
                  e
                    .find(The_Grid.itemImg)
                    .eq(S)
                    .addClass('show');
              }, 3500));
        }
      }
      function u(t, e) {
        return (t.length + e % t.length) % t.length;
      }
      function d() {
        A = [];
        for (var e = t(The_Grid.gallery), i = 0; i < e.length; i++) {
          var o = t(e[i]).find(The_Grid.itemImg);
          A[i] = [];
          for (var n = 0; n < o.length; n++) A[i][n] = t(o[n]);
        }
      }
      function c() {
        for (var t = 0; t < rt.length; t++) {
          var e = rt.eq(t).data('filter'),
            i = ft.length > 0 ? '.tg-item-hidden' : null,
            o = '*' !== e ? q.find(e).not(i).length : ot.not(i).length;
          rt
            .eq(t)
            .find(The_Grid.tooltip)
            .html(o),
            (B =
              rt
                .eq(t)
                .find('span:first-child')
                .data('count') &&
              rt
                .eq(t)
                .find('span:first-child')
                .data('tooltip', o)),
            (B =
              0 === o
                ? rt.eq(t).removeClass('tg-show-filter')
                : rt.eq(t).addClass('tg-show-filter'));
        }
      }
      function h() {
        if (K.length > 0)
          if (
            (F = K.data('item-tt') ? K.data('item-tt') - ot.length : 99999) <= 0
          )
            K.addClass('tg-no-more'),
              K.find('span').html(K.data('no-more')),
              setTimeout(function() {
                K.fadeOut(500);
              }, 3e3);
          else {
            var t = K.data('button');
            B = K.data('remain')
              ? K.find('span').html(t + ' (' + F + ')')
              : K.find('span').html(t);
          }
      }
      function p() {
        var e,
          i = 0,
          o = q.data('TG_Layout');
        (B = 0 === ft.length ? J.remove() : J.hide()),
          U.removeClass('tg-grid-loading'),
          (x = o.filteredItems).length > 0
            ? (e = window.tgInterval(function() {
                q.closest('body').length > 0 &&
                  (t(x[i].element).removeClass('tg-item-reveal'),
                  (B = yt.itemDelay && q.TG_Layout('reveal', [x[i]])),
                  (i !== x.length - 1 && yt.itemDelay) ||
                    ((N = !0),
                    ot.removeClass('tg-item-reveal'),
                    U.addClass('tg-grid-loaded'),
                    (B = !yt.itemDelay && q.TG_Layout('reveal', x)),
                    e.clear()),
                  i++);
              }, yt.itemDelay))
            : ((N = !0),
              ot.removeClass('tg-item-reveal'),
              U.addClass('tg-grid-loaded'));
      }
      function f() {
        for (
          var e = 'justified' !== yt.style ? yt.cols : yt.rows,
            i = m().width,
            o = 0,
            n = e.length;
          o < n && e[o][0] >= i;
          o++
        )
          (M = e[o][1]), (P = yt.gutters[o][1]);
        if ((it.width(P), 'justified' !== yt.style)) {
          var r = U.width();
          if (
            ((D = r / M - P),
            'vertical' === yt.layout &&
              (q.width(''),
              (D =
                (D = (r - (O = (M - 1) * P)) / M) % 1 != 0 ? Math.ceil(D) : D),
              (W = M * D + O),
              q.css('left', -(W - q.width()) / 2 + 'px'),
              q.width(W)),
            yt.fullHeight && 'horizontal' === yt.layout)
          ) {
            var a = t('#wpadminbar').height();
            R =
              0 === $.length
                ? (t(window).height() - a - P * (yt.row - 1)) / yt.row
                : $.height() / yt.row;
          } else R = Math.round(D / yt.ratio);
        } else (R = M), et.height(R);
        B = 'null' === yt.itemNav && Z.css('padding', '0 ' + P / 2 + 'px');
      }
      function m() {
        if (0 === $.length) {
          var t = window,
            e = 'inner';
          return (
            'innerWidth' in window ||
              ((e = 'client'), (t = document.documentElement || document.body)),
            { width: t[e + 'Width'] }
          );
        }
        return { width: $.width() };
      }
      function g() {
        if ('justified' !== yt.style) {
          et.width(D);
          for (var t = 0; t < ot.length; t++) {
            var e = ot.eq(t).data('col'),
              i = ot.eq(t).data('row');
            (i = 'horizontal' === yt.layout && i > yt.row ? yt.row : i),
              1 === M
                ? ((G = D), (E = R))
                : M < e
                  ? ((k = Math.round(M / (e / i))),
                    (G = M * D + (M - 1) * P),
                    (E = 1 === (k = k <= 1 ? 1 : k) ? R : k * R + (k - 1) * P))
                  : ((G = e * D + (e - 1) * P), (E = i * R + (i - 1) * P)),
              ot.eq(t).width(G),
              (B = 'grid' === yt.style ? ot.eq(t).height(E) : null);
          }
        }
      }
      function y() {
        if ('horizontal' === yt.layout) {
          var e;
          'masonry' === yt.style
            ? (U.removeClass('tg-grid-loading'),
              (e = Math.max.apply(
                null,
                ot
                  .map(function() {
                    return t(this).height();
                  })
                  .get()
              )),
              q.add(Z).height(e))
            : ((e = R * yt.row + P * (yt.row - 1)), q.add(Z).height(e));
        }
      }
      function v() {
        var t,
          e,
          o = !1;
        'horizontal' === yt.layout
          ? ((o = !0),
            (t = e =
              'grid' === yt.style
                ? 'packery'
                : 'justified' === yt.style ? 'justified' : 'horizontal'))
          : (t = e = 'grid' === yt.style ? 'packery' : yt.style);
        var n = {};
        (n[e] = {}),
          (n.hiddenStyle = {}),
          (n.visibleStyle = {}),
          (n.layoutMode = t),
          (n.filter = yt.filterLoad),
          'none' !== yt.sortByLoad && (n.sortBy = yt.sortByLoad),
          (n.sortAscending = yt.orderLoad),
          (n.isOriginLeft = yt.rtl),
          (n.itemSelector = The_Grid.item),
          (n[e].gutter = it[0]),
          (n[e].rowHeight = et[0]),
          (n[e].columnWidth = et[0]),
          (n[e].isHorizontal = o),
          (n[e].isFitRows = yt.fitrows),
          (n[e].image = The_Grid.itemImg),
          (n[e].row = yt.row),
          (n[e].previewMode = $),
          (n.hiddenStyle.opacity = 0),
          (n.visibleStyle.opacity = 1),
          (n.hiddenStyle.transform = yt.animation.hidden),
          (n.visibleStyle.transform = yt.animation.visible),
          (n.transitionDuration = yt.transition),
          (n.getSortData = The_Grid.sortData),
          q.TG_Layout(n),
          i(ot);
      }
      function _() {
        if ('horizontal' === yt.layout) {
          var e = q.data('TG_Layout'),
            i = e.filteredItems,
            o = (yt.startAt =
              yt.startAt - 1 > i.length ? i.length : yt.startAt);
          'forceCentered' === yt.itemNav &&
            0 === pt.length &&
            (pt = t(t('<div class="tg-slider-bullets"></div>'))
              .appendTo(U)
              .hide()),
            (j = new TG_Slider(Z, {
              itemSelector: '.tg-item:not(.tg-item-hidden)',
              cycleBy: yt.cycleBy,
              cycleInterval: yt.cycle,
              pauseOnHover: 1,
              itemNav: yt.itemNav,
              startAt: yt.startAt - 1,
              smart: 1,
              horizontal: 1,
              easing: 'easeOutExpo',
              speed: 1e3,
              swingSpeed: yt.swingSpeed,
              releaseSwing: 1,
              mouseDragging: 1,
              touchDragging: 1,
              elasticBounds: 1,
              moveBy: G,
              syncSpeed: 0.8,
              keyboardNavBy: 'pages',
              activeClass: 'tg-active-item',
              disabledClass: 'tg-disabled',
              draggedClass: 'tg-slider-dragged',
              pageBuilder: function() {
                return '<li><span></span></li>';
              },
              pagesBar: pt,
              prevPage: ct,
              nextPage: ht,
              activatePageOn: 'click',
            }).init()),
            Z.data('slider', j).trigger('tg-slider-init'),
            'forceCentered' === yt.itemNav &&
              (t(i[o - 1].element).addClass('tg-active-item'),
              j.on('load activePage', function(o) {
                (o = this.rel.activePage),
                  (e = q.data('TG_Layout')),
                  (i = e.filteredItems),
                  ot.removeClass('tg-active-item'),
                  (B = i[o] && t(i[o].element).addClass('tg-active-item'));
              }));
        }
      }
      function w(e) {
        if (X && (3 == X.readyState || 2 == X.readyState || 1 == X.readyState))
          return !1;
        var o = {
          action: 'the_grid_load_more',
          grid_nonce: tg_global_var.nonce,
          grid_name: e.data('name'),
          grid_page: Q,
          grid_data: b(),
          grid_ajax: e.data('ajax'),
          main_query: tg_global_var.main_query,
        };
        X = t.ajax({
          url: tg_global_var.url,
          type: 'post',
          datatype: 'json',
          data: o,
          beforeSend: function() {
            (Y = !0),
              (Q += 1),
              (B =
                K.data('loading') &&
                !K.hasClass('tg-no-more') &&
                K.find('span').html(K.data('loading'))),
              (B =
                t(tt).length > 0 &&
                0 === K.length &&
                t(tt).addClass('tg-loading'));
          },
          success: function(o) {
            var n = o.success,
              r = o.message,
              a = o.content,
              s = o.ajax_data;
            try {
              s = t.parseJSON(s);
            } catch (t) {
              !1;
            }
            if ((e.data('ajax', s), !n))
              return (
                K.add(t(tt))
                  .add(ft)
                  .removeClass('tg-loading'),
                J.find('> div').html(r),
                K.find('span').html(r),
                t(tt)
                  .children('div')
                  .html(r),
                (Q -= 1),
                !1
              );
            if (!a)
              return (
                K.data('item-tt', -1),
                h(),
                t(tt)
                  .children('div')
                  .html(
                    t(tt)
                      .children('div')
                      .data('no-more')
                  ),
                setTimeout(function() {
                  t(tt).fadeOut(400);
                }, 1e3),
                (Q -= 1),
                !1
              );
            var u = t(a);
            (B = 0 === ft.length && u.addClass('tg-item-index')),
              u.find(The_Grid.grid).length > 0 &&
                (u = u.find(The_Grid.item).removeClass('tg-item-reveal')),
              e.append(u),
              (ot = e.find(The_Grid.item)),
              u.hide(),
              g(),
              t.TG_media_init(),
              c(),
              d(),
              l(),
              T();
            var p =
              (u = t(
                t.grep(u, function(t) {
                  return void 0 !== t.id;
                })
              )).length - 1;
            u.the_grid_images_loaded({
              complete: function() {
                var n,
                  r = 0;
                J.hide(),
                  (B = o && t(tt).removeClass('tg-loading')),
                  (B = 'horizontal' === yt.layout && e.css('min-height', '')),
                  (B =
                    'masonry' === yt.style &&
                    'horizontal' === yt.layout &&
                    y()),
                  (n = window.tgInterval(function() {
                    if (e.closest('body').length > 0) {
                      if (
                        ((B = yt.ajaxDelay && e.TG_Layout('appended', u.eq(r))),
                        (B = 'horizontal' === yt.layout && j.reload()),
                        p === r || !yt.ajaxDelay)
                      )
                        return (
                          c(),
                          h(),
                          (B = !yt.ajaxDelay && e.TG_Layout('appended', u)),
                          (B = 'horizontal' === yt.layout && j.reload()),
                          ft.removeClass('tg-loading'),
                          (Y = !1),
                          n.clear(),
                          (B =
                            'undefined' != typeof FOOBOX &&
                            t.isFunction(FOOBOX.init) &&
                            FOOBOX.init()),
                          (B =
                            t().fancybox &&
                            t('.tg-item a.fancybox').fancybox()),
                          (B =
                            t().prettyPhoto &&
                            t('.tg-item  a[rel^="prettyPhoto"]').prettyPhoto()),
                          i(ot),
                          !1
                        );
                      r++;
                    }
                  }, yt.ajaxDelay));
              },
            });
          },
          error: function(t, e, i) {
            (Q -= 1), console.error(t), console.error(e + ' :: ' + i);
          },
        });
      }
      function b() {
        if ($.length > 0)
          return new TG_metaData(t('#the_grid_metabox .tomb-row'));
      }
      function T() {
        $.length > 0 && TG_excludeItem();
      }
      var x,
        z,
        C,
        L,
        I,
        S,
        j,
        P,
        G,
        E,
        k,
        M,
        D,
        R,
        O,
        W,
        B,
        q = t(this),
        A = [],
        H = !0,
        F = !0,
        N = !1,
        Y = !1,
        Q = 1,
        X = null,
        V = q.closest(The_Grid.wrapper).attr('id'),
        U =
          t('[id="' + V + '"]').length > 1
            ? q.closest(The_Grid.wrapper)
            : t('#' + V),
        $ = U.closest(The_Grid.preview),
        Z = U.find(The_Grid.slider),
        J = U.find(The_Grid.loader),
        K = U.find(The_Grid.ajax),
        tt = U.find(The_Grid.ajaxMsg),
        et = U.find(The_Grid.sizer),
        it = U.find(The_Grid.gutter),
        ot = U.find(The_Grid.item),
        nt = U.find(The_Grid.filterH),
        rt = U.find(The_Grid.filter),
        at = U.find(The_Grid.search),
        st = U.find(The_Grid.clear),
        lt = U.find(The_Grid.sorter),
        ut = U.find(The_Grid.sorterBy),
        dt = U.find(The_Grid.sortASC),
        ct = U.find(The_Grid.arrLeft),
        ht = U.find(The_Grid.arrRight),
        pt = U.find(The_Grid.bullets),
        ft = U.find(The_Grid.pages),
        mt = q.data(),
        gt = {
          style: mt.style && mt.style,
          layout: mt.layout && mt.layout,
          fitrows: mt.fitrows && mt.fitrows,
          fullWidth: mt.fullwidth && mt.fullwidth,
          fullHeight: mt.fullheight && mt.fullheight,
          rtl: mt.rtl && mt.rtl,
          filterComb: mt.filtercomb && mt.filtercomb,
          filterLogic: mt.filterlogic && mt.filterlogic,
          filterLoad: mt.filterload && mt.filterload,
          sortByLoad: mt.sortbyload && mt.sortbyload,
          orderLoad: mt.orderload && mt.orderload,
          row: mt.row && mt.row,
          ratio: mt.ratio && mt.ratio,
          gutters: mt.gutters && mt.gutters,
          cols: mt.cols && mt.cols,
          rows: mt.rows && mt.rows,
          animation: mt.animation && mt.animation,
          transition: mt.transition && mt.transition,
          itemNav: mt.slider && mt.slider.itemNav,
          swingSpeed: mt.slider && mt.slider.swingSpeed,
          cycleBy: mt.slider && mt.slider.cycleBy,
          cycle: mt.slider && mt.slider.cycle,
          startAt: mt.slider && mt.slider.startAt,
          ajaxMethod: mt.ajaxmethod && mt.ajaxmethod,
          ajaxDelay: mt.ajaxdelay && mt.ajaxdelay,
          preloader: mt.preloader && mt.preloader,
          itemDelay: mt.itemdelay && mt.itemdelay,
          gallery: mt.gallery && mt.gallery,
        },
        yt = t.extend({}, The_Grid.defaults, gt);
      yt.cols.sort(function(t, e) {
        return e[0] - t[0];
      }),
        yt.gutters.sort(function(t, e) {
          return e[0] - t[0];
        }),
        yt.rows.sort(function(t, e) {
          return e[0] - t[0];
        }),
        (yt.rtl = !yt.rtl),
        (yt.ajaxDelay = ft.length > 0 ? yt.itemDelay : yt.ajaxDelay);
      for (
        var vt = t.map(mt, function(t, e) {
            return e;
          }),
          _t = 0;
        _t < vt.length;
        _t++
      )
        q.removeAttr('data-' + vt[_t]);
      s(),
        f(),
        g(),
        l(),
        c(),
        'masonry' === yt.style ||
        'justified' === yt.style ||
        yt.preloader ||
        'horizontal' === yt.layout
          ? ot.the_grid_images_loaded({
              complete: function() {
                y(),
                  v(),
                  _(),
                  (B = yt.preloader && p()),
                  (B =
                    'horizontal' === yt.layout &&
                    q.TG_Layout('on', 'arrangeComplete', function(t) {
                      e(t);
                    }));
              },
            })
          : (v(),
            _(),
            (B =
              'horizontal' === yt.layout &&
              q.TG_Layout('on', 'arrangeComplete', function(t) {
                e(t);
              }))),
        (N = !yt.preloader && !0),
        (B = N && U.addClass('tg-grid-loaded')),
        rt.on('click', function(e) {
          var i = t(this);
          i.is('select')
            ? rt.one('change', function() {
                o(i.find('option:selected'));
              })
            : o(i);
        }),
        tg_is_mobile
          ? ut.on('change', function() {
              a(t(this).find('option:selected'));
            })
          : ut.on('click', function() {
              a(t(this));
            }),
        dt.on('click', function() {
          if (!N) return !1;
          var e = t(this);
          (H = !0 !== e.data('asc')),
            e.data('asc', H).attr('data-asc', H),
            ot.removeClass('tg-item-index'),
            q.TG_Layout({ sortAscending: H });
        });
      var wt = at.keyup(
        debounce(function() {
          if (!N) return !1;
          var e = new RegExp(wt.val(), 'gi');
          ot.removeClass('tg-item-index'),
            rt.removeClass('tg-filter-active'),
            q.TG_Layout({
              filter: function() {
                var i = t(this),
                  o = !e || i.text().match(e);
                return (
                  t('.tg-filter[data-filter="*"]').addClass('tg-filter-active'),
                  o && !0
                );
              },
            }),
            t.TG_Pause_Players();
        }, 200)
      );
      st.on('click', function() {
        at.val('').trigger('keyup');
      }),
        t(window).on(tg_debounce_resize, function() {
          s(),
            f(),
            g(),
            y(),
            (B = N && q.closest('body').length > 0 && q.TG_Layout('layout')),
            (B =
              'horizontal' === yt.layout &&
              q.TG_Layout('once', 'layoutComplete', function(t) {
                e(t);
              }));
        }),
        ft.on('click', function(e) {
          e.preventDefault();
          var i = t(this);
          (Q = i.data('page')),
            i.is('.tg-page-current') ||
              (X && (!X || 4 != X.readyState)) ||
              Y ||
              !N ||
              (lt.find('.tg-dropdown-value').text(''),
              at.val(''),
              rt.removeClass('tg-filter-active'),
              t('.tg-filter[data-filter="*"]').addClass('tg-filter-active'),
              ft.removeClass('tg-page-current').addClass('tg-loading'),
              i.addClass('tg-page-current'),
              t('.tg-item-hidden').addClass('tg-item-removed'),
              t.TG_media_destroy(q),
              q
                .css('min-height', 250)
                .TG_Layout('remove', ot)
                .TG_Layout({ filter: '*' }),
              q.contents().each(function() {
                B = 8 == this.nodeType ? t(this).remove() : null;
              }),
              J.show(),
              w(q));
        }),
        K.on('click', function(t) {
          F && (t.preventDefault(), w(q));
        }),
        'on_scroll' == yt.ajaxMethod &&
          t(window).on('mousewheel resize scroll', function() {
            B =
              F &&
              U.length &&
              U[0].getBoundingClientRect().bottom < t(this).height() &&
              !0 === N &&
              w(q);
          });
    });
  };
  var e = [];
  (t.fn.the_grid_images_loaded = function() {
    function i() {
      if (++a >= s.length) return r.complete.call(n), !1;
    }
    var o,
      n = t(this),
      r = t.extend({ complete: function() {} }, arguments[0] || {}),
      a = 0,
      s = [];
    n.find('*').filter(function() {
      (o = t(this).css('background-image')),
        (o = /^url\((['"]?)(.*)\1\)$/.exec(o)),
        (o = o ? o[2] : null),
        (o = !o && t(this).is('img') ? t(this).attr('src') : o),
        (o =
          o &&
          (o.match(/\.(jpg|jpeg|png|bmp|gif|tif|tiff|jif|jfif)/g) ||
            o.indexOf('external.xx.fbcdn') >= 0 ||
            o.indexOf('drscdn.500px.org') >= 0)
            ? o
            : null) &&
          -1 == t.inArray(o, e) &&
          (s.push(o), e.push(o));
    });
    for (var l = [], u = 0; u < s.length; u++)
      (l[u] = new Image()),
        (l[u].onload = i),
        (l[u].onerror = i),
        (l[u].onabort = i),
        (l[u].src = s[u]);
    if (!s.length) return r.complete.call(n), !1;
  }),
    t(document).ready(function() {
      function e(e) {
        if (e.data('list-DOM')) {
          var i = e.data('list-DOM').removeClass(n),
            o = setTimeout(function() {
              i.remove(), (i = null), e.data('list-DOM', i);
            }, 400);
          t(e.data('list-DOM')).data('list-timer', o);
        }
        return !1;
      }
      function i(e) {
        var i = e.parent().offset(),
          o = e.parent().height(),
          n =
            'relative' === t('body').css('position')
              ? t(window).scrollTop() + t('body')[0].getBoundingClientRect().top
              : null,
          r = parseInt(e.css('margin-bottom')),
          a = e.outerWidth(),
          s = i.left,
          l = i.top + o - n - r,
          u = [];
        return (u.top = l), (u.left = s), (u.width = a), u;
      }
      var o,
        n = 'tg-dropdown-holder-animation';
      tg_is_mobile ||
        (t(document)
          .on('mouseenter', '.tg-dropdown-holder', function(e) {
            e.preventDefault(), e.stopPropagation();
            var r = t(this),
              a = t(r.data('list-DOM')).data('list-timer');
            if (a) return clearTimeout(a), r.data('list-DOM').addClass(n), !1;
            var s = (o = r.find('ul'))
              .clone(!0)
              .addClass('tg-list-appended')
              .attr('style', '')
              .appendTo('body');
            r.add(s).data('list-DOM', s), s.data('filter-DOM', r);
            var l = i(r);
            o.hide(),
              s
                .css({
                  position: 'absolute',
                  'z-index': 99999,
                  width: l.width,
                  top: l.top,
                  left: l.left,
                })
                .addClass(n);
          })
          .on('mouseleave', '.tg-dropdown-holder', function(i) {
            e(t(this));
          }),
        t(document)
          .on('mouseenter touchstart', '.tg-list-appended', function(e) {
            var i = t(this);
            if (i.data('list-DOM'))
              return (
                clearTimeout(i.data('list-timer')),
                i.data('list-DOM').addClass(n),
                !1
              );
          })
          .on('mouseleave touchend', '.tg-list-appended', function(i) {
            e(t(this));
          }),
        t(document).on('click touchstart', '.tg-list-appended li', function() {
          var e = t(this).closest('ul'),
            o = e.data('filter-DOM');
          o
            .find('[data-filter="' + t(this).data('filter') + '"]')
            .trigger('click'),
            o
              .find('[data-value="' + t(this).data('value') + '"]')
              .trigger('click'),
            e.width(o.outerWidth()),
            e.css('left', o.offset().left);
          var n = i(o);
          n.top !== e.position().top
            ? e.css('top', n.top)
            : (e.find('li').removeClass('tg-filter-active'),
              o.find('.tg-filter-active').each(function(i) {
                e
                  .find('li')
                  .eq(t(this).index())
                  .addClass('tg-filter-active');
              }));
        }));
    }),
    (t.fn.TG_ToolTip = function(e) {
      t(document)
        .on('mouseenter', t(this).selector, function() {
          var i = t(this);
          if (!i.data(e.data)) return !1;
          if (i.data('tooltip-DOM'))
            return (
              clearTimeout(i.data('tooltip-timer')),
              i.data('tooltip-DOM').addClass(e.hoverClass.split('.').join('')),
              !1
            );
          var o = t(
            '<div class="' + e.appendClass.split('.').join('') + '"></div>'
          ).appendTo('body');
          i.data('tooltip-DOM', o);
          var n = i.data(e.data),
            r = i.offset(),
            a =
              'relative' === t('body').css('position')
                ? t(window).scrollTop() +
                  t('body')[0].getBoundingClientRect().top
                : null,
            s = r.top - a,
            l = r.left,
            u = i.outerWidth(!0);
          o
            .html(n)
            .css({
              position: 'absolute',
              'z-index': e.zindex,
              width: u,
              top: s + e.spacing - o.outerHeight(!0),
              left: l + u / 2,
            })
            .addClass(e.hoverClass.split('.').join(''));
        })
        .on('mouseleave', t(this).selector, function() {
          var i = t(this);
          if (!i.data(e.data) || !i.data('tooltip-DOM')) return !1;
          var o = i
              .data('tooltip-DOM')
              .removeClass(e.hoverClass.split('.').join('')),
            n = setTimeout(function() {
              o.remove(), (o = null), i.data('tooltip-DOM', o);
            }, 400);
          i.data('tooltip-timer', n);
        });
    }),
    t(document).ready(function() {
      t('.tg-filter-name').TG_ToolTip({
        data: 'tooltip',
        zindex: 99999,
        place: 'top',
        appendClass: '.tg-filter-tooltip',
        hoverClass: '.tg-tooltip-hover',
        spacing: -2,
      });
    });
  var o = (function() {
    var t = 3,
      e = document.createElement('div'),
      i = e.getElementsByTagName('i');
    do {
      e.innerHTML = '\x3c!--[if gt IE ' + ++t + ']><i></i><![endif]--\x3e';
    } while (i[0]);
    return t > 4 ? t : document.documentMode;
  })();
  o && t('body').addClass('is-ie'),
    (t.fn.TG_SoundCloud = function() {
      return this.each(function() {
        var e = t(this).closest('.tg-item'),
          i = t(this).attr('src');
        if (!e.hasClass('tg-media-init') && 'about:blank' !== i) {
          var o = SC.Widget(t(this).attr('id'));
          o.bind(SC.Widget.Events.READY, function() {
            ((!o.getCurrentSound && tg_is_mobile) || !tg_is_mobile) && o.play(),
              t.TG_Media_Ready(e, o, 'STD'),
              o.bind(SC.Widget.Events.PAUSE, function() {
                t.TG_Media_Pause(e);
              }),
              o.bind(SC.Widget.Events.FINISH, function() {
                t.TG_Media_Pause(e);
              });
          });
        }
      });
    });
  var n = {};
  (t.fn.TG_Youtube = function() {
    return this.each(function() {
      var e = t(this).closest('.tg-item'),
        i = t(this).attr('src');
      if (!e.hasClass('tg-media-init') && 'about:blank' !== i) {
        var o = this.id;
        n[o] = new YT.Player(o, {
          events: {
            onReady: function(i) {
              tg_is_mobile || i.target.playVideo(),
                t.TG_Media_Ready(e, i.target, 'YT');
            },
            onStateChange: function(i) {
              1 === i.data && t.TG_Media_Play(e),
                (2 !== i.data && 0 !== i.data) || t.TG_Media_Pause(e);
            },
          },
        });
      }
    });
  }),
    (t.fn.TG_Vimeo = function() {
      return this.each(function() {
        var e = t(this).closest('.tg-item'),
          i = t(this).attr('src');
        if (
          (o <= 9 && (t(this).remove(), e.find('.tg-media-button').remove()),
          !e.hasClass('tg-media-init') && 'about:blank' !== i)
        ) {
          t(this).attr('src', t(this).attr('src'));
          var n = $f(this);
          n.addEvent('ready', function() {
            tg_is_mobile || n.api('play'),
              t.TG_Media_Ready(e, n, 'VM'),
              n.addEvent('play', function() {
                t.TG_Media_Play(e);
              }),
              n.addEvent('pause', function() {
                t.TG_Media_Pause(e);
              }),
              n.addEvent('finish', function() {
                t.TG_Media_Pause(e);
              });
          });
        }
      });
    }),
    (t.fn.TG_Wistia = function() {
      return this.each(function() {
        var e = t(this).closest('.tg-item'),
          i = t(this).attr('src');
        e.hasClass('tg-media-init') ||
          'about:blank' === i ||
          t(this).load(function() {
            var i = t(this)[0].wistiaApi,
              o = !1,
              n = !1,
              r = !1;
            t.TG_Media_Ready(e, i, 'STD'),
              i &&
                (i.play(),
                i.bind('seek', function() {
                  n = !0;
                }),
                i.bind('heightchange', function() {
                  r = !0;
                }),
                i.bind('play', function() {
                  !1 === n && !1 === r && o && t.TG_Media_Play(e), (n = r = !1);
                }),
                i.bind('pause', function() {
                  !1 === n && !1 === r && t.TG_Media_Pause(e), (r = o = !0);
                }),
                i.bind('finish', function() {
                  t.TG_Media_Pause(e);
                }));
          });
      });
    }),
    (t.fn.TG_HTML_Player = function() {
      return this.each(function() {
        var e = t(this).closest('.tg-item');
        if (!e.hasClass('tg-media-init')) {
          var i = t(this)[0];
          i.addEventListener &&
            (t.TG_Media_Ready(e, i, 'STD'),
            i.addEventListener('play', function() {
              t.TG_Media_Play(e);
            }),
            i.addEventListener('pause', function() {
              t.TG_Media_Pause(e);
            }),
            i.addEventListener('ended', function() {
              t.TG_Media_Pause(e);
            }));
        }
      });
    }),
    (t.TG_Media_Ready = function(t, e, i) {
      t
        .data('pause-method', i)
        .data('media-player', e)
        .addClass('tg-media-init');
    }),
    (t.TG_Media_Play = function(e) {
      e.hasClass('tg-force-play') || t.TG_Pause_Players(),
        e.addClass('tg-is-playing'),
        t('.tg-item').removeClass('tg-force-play');
    }),
    (t.TG_Media_Pause = function(t) {
      t.removeClass('tg-is-playing tg-force-play');
    }),
    t(
      document
    ).on(
      'webkitfullscreenchange mozfullscreenchange fullscreenchange',
      function(e) {
        var i = t(e.target);
        t('.tg-item-media').removeClass('tg-item-media-fullscreen'),
          i &&
            i.hasClass('tg-item-media') &&
            i.addClass('tg-item-media-fullscreen');
      }
    ),
    t(
      document
    ).on('click', '.tg-item:not(.tg-media-init) .tg-item-button-play', function(
      e
    ) {
      e.preventDefault();
      var i = t(this).closest('.tg-item'),
        o = i.find('iframe');
      o.attr('src', o.data('src')),
        t.TG_Pause_Players(),
        t.TG_media_init(),
        i.addClass('tg-force-play');
    }),
    t(
      document
    ).on('click', '.tg-item.tg-media-init .tg-item-button-play', function(e) {
      e.preventDefault();
      var i = t(this).closest('.tg-item'),
        o = i.data('pause-method'),
        n = i.data('media-player');
      if (i.is('.tg-force-play, .tg-is-playing'))
        return t.TG_Pause_Players(), !1;
      if (n && i.hasClass('tg-media-init'))
        switch ((i.find('.tg-item-media').show(),
        t.TG_Pause_Players(),
        t('.tg-item').removeClass('tg-force-play tg-play-error'),
        i.addClass('tg-force-play'),
        o)) {
          case 'STD':
            ((!n.getCurrentSound && tg_is_mobile) || !tg_is_mobile) && n.play();
            break;
          case 'YT':
            n.playVideo();
            break;
          case 'VM':
            n.api('play');
        }
    }),
    (t.TG_Pause_Players = function() {
      t('.tg-item.tg-is-playing, .tg-item.tg-force-play').each(function() {
        var e = t(this),
          i = e.data('pause-method'),
          o = e.data('media-player');
        if (o && e.hasClass('tg-media-init')) {
          switch (i) {
            case 'STD':
              o.pause();
              break;
            case 'YT':
              o.pauseVideo();
              break;
            case 'VM':
              o.api('pause');
          }
          e.closest('.tg-item').removeClass('tg-is-playing tg-force-play');
        }
      });
    }),
    (t.TG_media_init = function() {
      var e,
        i,
        o,
        n,
        r = [
          { ID: 'youtube', url: '//www.youtube.com/iframe_api' },
          { ID: 'vimeo', url: '//f.vimeocdn.com/js/froogaloop2.min.js' },
          { ID: 'soundcloud', url: '//w.soundcloud.com/player/api.js' },
          { ID: 'wistia', url: '//fast.wistia.com/assets/external/E-v1.js' },
        ];
      if (
        (t('.g-ytsubscribe').length &&
          (((e = document.createElement('script')).src =
            'https://apis.google.com/js/platform.js'),
          (e.id = 'tg-youtube-subscribe-api'),
          (n = document.getElementsByTagName(
            'script'
          )[0]).parentNode.insertBefore(e, n)),
        0 === t('.tg-item-media').length)
      )
        return !1;
      i = {
        youtube: function() {
          'undefined' == typeof YT || 0 === YT.loaded
            ? (window.onYouTubeIframeAPIReady = function() {
                t('[data-api="1"].tg-item-youtube').TG_Youtube();
              })
            : t('[data-api="1"].tg-item-youtube').TG_Youtube();
        },
        vimeo: function() {
          t('[data-api="1"].tg-item-vimeo').TG_Vimeo();
        },
        soundcloud: function() {
          t('[data-api="1"].tg-item-soundcloud').TG_SoundCloud();
        },
        wistia: function() {
          t('[data-api="1"].tg-item-wistia').TG_Wistia();
        },
      };
      for (var a = 0; a < r.length; a++)
        (o = r[a].ID),
          t('[data-api="1"].tg-item-' + o).length > 0 &&
            (r[a].url,
            0 === t('#tg-' + o + '-api').length
              ? (((e = document.createElement('script')).src = r[a].url),
                (e.id = 'tg-' + o + '-api'),
                (n = document.getElementsByTagName(
                  'script'
                )[0]).parentNode.insertBefore(e, n),
                (function(t, e) {
                  t.onload = function() {
                    i[e]();
                  };
                })(e, o))
              : i[o]());
      t(document).ready(function() {
        t('.tg-item .tg-item-audio-player').attr('width', '100%'),
          t('.tg-item-video-player,.tg-item-audio-player').TG_HTML_Player(),
          tg_global_var.mediaelement &&
            (t(
              '.tg-item-video-player:not(.tg-mediaelement-init), .tg-item-audio-player:not(.tg-mediaelement-init)'
            ).mediaelementplayer({
              audioVolume: 'vertical',
              videoVolume: 'vertical',
              features: [
                'playpause',
                'current',
                'progress',
                'fullscreen',
                'volume',
                'duration',
              ],
              startVolume: 0.8,
            }),
            t('.tg-item-video-player, .tg-item-audio-player').addClass(
              'tg-mediaelement-init'
            ));
      });
    }),
    (t.TG_media_destroy = function(e) {
      (e || t('.tg-item')).find('.tg-item-vimeo').each(function() {
        var e = t(this),
          i = e.closest('.tg-item').data('media-player');
        i && (i.api('pause'), e.attr('src', 'about:blank'));
      }),
        (e = e
          ? e.find('.tg-item video, .tg-item audio')
          : t('.tg-item video, .tg-item audio')).each(function() {
          var e = t(this),
            i = e.data('mediaelementplayer');
          e.closest('.tg-item').removeClass('tg-force-play tg-is-playing'),
            e.length &&
              (i
                ? ((i = e.data('mediaelementplayer')).pause(),
                  i.setSrc('about:blank'),
                  e.children('source').prop('src', ''),
                  i.remove())
                : (e[0].pause(),
                  (e[0].src = 'about:blank'),
                  e.children('source').prop('src', ''),
                  (e.remove().length = 0)));
        }),
        tg_global_var.mediaelement && (mejs.players = []);
    }),
    (t.TO_Lightbox = function() {
      function e() {
        var e = t(L).filter(':visible');
        for (z = e.length, i = 0; i < z; i++) {
          var o = e.eq(i);
          (C[i] = {}),
            (C[i].type = o.data('tolb-type')),
            (C[i].src = o.data('tolb-src')),
            (C[i].alt = o.data('tolb-alt')),
            (C[i].poster = o.data('tolb-poster')),
            o.data(M, i);
        }
        z > 1 ? t(E + ',' + k).show() : t(E + ',' + k).hide();
      }
      function o(e) {
        switch ((t(I).addClass(D + ' ' + O),
        (y = e.data(M)),
        (T = C[y].type),
        (_ = C[y].src),
        (w = C[y].alt),
        h(),
        T)) {
          case 'image':
            (b = t(
              '<img class="tolb-img" src="' + _ + '" alt="' + w + '"></img>'
            )),
              ((v = new Image()).onload = a),
              (v.onerror = a),
              (v.src = _);
            break;
          case 'youtube':
            (b = t(
              '<iframe class="tolb-video" src="' +
                (_ =
                  '//www.youtube.com/embed/' +
                  _ +
                  '?html5=1&controls=1&autohide=1&rel=0&showinfo=0&autoplay=' +
                  B) +
                '" allowfullscreen></iframe>'
            )),
              l();
            break;
          case 'vimeo':
            (b = t(
              '<iframe class="tolb-video" src="' +
                (_ =
                  '//player.vimeo.com/video/' +
                  _ +
                  '?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=' +
                  B) +
                '" allowfullscreen></iframe>'
            )),
              l();
            break;
          case 'wistia':
            (b = t(
              '<iframe class="tolb-video" src="' +
                (_ =
                  '//fast.wistia.net/embed/iframe/' +
                  _ +
                  '?title=0&amp;byline=0&amp;portrait=0&amp;autoPlay=' +
                  B) +
                '" allowfullscreen></iframe>'
            )),
              l();
            break;
          case 'video':
            for (var i = '', o = 0; o < _.length; o++)
              i +=
                '<source src="' +
                _[o][0].source +
                '" type="video/' +
                _[o][0].type +
                '" width="100%" height="100%"></source>';
            (x = C[y].poster),
              (b = t(
                '<video class="tolb-video" controls' +
                  (x = x ? ' poster="' + x + '"' : '') +
                  (B ? ' autoplay' : '') +
                  '>' +
                  i +
                  '</video>'
              )),
              s();
        }
      }
      function n() {
        var e = t(I)
          .find('iframe')
          .not(b);
        e.length > 0
          ? e.attr('src', 'about:blank').one('load', function() {
              r();
            })
          : r();
      }
      function r() {
        t(I).addClass(R),
          (m =
            'iframe' !== T
              ? t(S).html('')
              : t(S)
                  .find('*')
                  .not(b)
                  .remove()),
          (m = 'image' !== T ? t(I).addClass(W) : t(I).removeClass(W)),
          (m = 'iframe' !== T && t(S).append(b)),
          d(),
          c(),
          b.show(),
          t(I).removeClass(O);
      }
      function a() {
        n();
      }
      function s() {
        tg_is_mobile
          ? ((m = g && g.setSrc('about:blank')), n())
          : (b.one('loadeddata', function() {
              (m = g && g.setSrc('about:blank')),
                tg_global_var.mediaelement ? u() : n();
            }),
            b[0].addEventListener('error', function() {
              c(), t(I).removeClass(O);
            }));
      }
      function l() {
        (T = 'iframe'),
          t(S).append(b.hide()),
          b.one('load', function() {
            n();
          });
      }
      function u() {
        b.mediaelementplayer({
          features: [
            'playpause',
            'stop',
            'loop',
            'current',
            'progress',
            'duration',
            'volume',
            'sourcechooser',
            'fullscreen',
          ],
          videoVolume: 'horizontal',
          startVolume: 0.8,
          success: function(e, i) {
            (g = e),
              (b = t(i).closest('.mejs-container')),
              n(),
              g.addEventListener('ended', function() {
                b.find('.mejs-poster').show();
              });
          },
        });
      }
      function d() {
        t(j).css(
          'max-height',
          t(window).height() - 80 - t('#wpadminbar').height()
        );
      }
      function c() {
        t(P).text(w), t(G).text(y + 1 + '/' + z);
      }
      function h() {
        t(k).data(M, p(y - 1)), t(E).data(M, p(y + 1));
      }
      function p(t) {
        return (z + t % z) % z;
      }
      function f() {
        t(I).removeClass(D + ' ' + O + ' ' + R),
          setTimeout(function() {
            t(I).find('iframe').length > 0
              ? t(I)
                  .find('iframe')
                  .attr('src', 'about:blank')
                  .one('load', function() {
                    t(S).html('');
                  })
              : t(S).html('');
          }, 300);
      }
      var m,
        g,
        y,
        v,
        _,
        w,
        b,
        T,
        x,
        z,
        C = [],
        L = '[data-tolb-src]:not(.tolb-disabled)',
        I = '.tolb-holder',
        S = '.tolb-content',
        j = '.tolb-img',
        P = '.tolb-title',
        G = '.tolb-counter',
        E = '.tolb-next',
        k = '.tolb-prev',
        M = 'tolb-index',
        D = 'tolb-open',
        R = 'tolb-ready',
        O = 'tolb-loading',
        W = 'tolb-iframe',
        B = tg_global_var.lightbox_autoplay;
      t(window).on('resize', function() {
        d();
      }),
        t(document).on('click', L, function(i) {
          return (
            i.preventDefault(),
            t.TG_Pause_Players(),
            t('.tolb-video,' + j).remove(),
            e(),
            o(t(this)),
            !1
          );
        }),
        t(document).on('click touchend', E + ',' + k, function() {
          return o(t(this)), !1;
        }),
        t(document).on(
          'keydown',
          throttle(function(e) {
            t(I).hasClass(D) &&
              (37 == e.keyCode
                ? t(k).trigger('click')
                : 39 == e.keyCode
                  ? t(E).trigger('click')
                  : 27 == e.keyCode && f());
          }, 300)
        ),
        t(document).on('click touchend', '.tolb-inner,.tolb-close', function(
          e
        ) {
          return (
            e.stopPropagation(),
            (t(e.target).is('.tolb-inner') || t(e.target).is('.tolb-close')) &&
              f(),
            !1
          );
        }),
        t('body').append(
          t(
            '<div class="tolb-holder"><div class="tolb-loader"></div><div class="tolb-inner"><figure><div class="tolb-close tg-icon-close"></div><div class="tolb-content"></div><figcaption><div class="tolb-title"></div><div class="tolb-counter"></div></figcaption></figure></div><div class="tolb-prev"><i class="tg-icon-arrow-prev-thin"></i></div><div class="tolb-next"><i class="tg-icon-arrow-next-thin"></i></div></div>'
          )
        );
    }),
    t(document).on('click', '[data-tolb-id]', function(e) {
      e.preventDefault();
      var i = t(this).data('tolb-id');
      i && t('#' + i).trigger('click');
    }),
    (function() {
      var e,
        i,
        o,
        n,
        r,
        a,
        s = window.navigator.userAgent.indexOf('Edge/'),
        l =
          'div:not(.tg-item-gallery-holder) > .tg-item-image, .tg-item-media-poster, .tg-item-audio-poster, .tg-item-gallery-holder',
        u = 0;
      !('ontouchstart' in window || navigator.msMaxTouchPoints) &&
        !t('body').hasClass('is-ie') &&
        s < 0 &&
        t(document)
          .on('mousemove', '.tg-panZ', function(s) {
            (e = t(this)),
              (n = e.width()),
              (o = e.height()),
              (i = e.closest('.tg-item').offset());
            var d = Date.now();
            d > u + 80 &&
              ((u = d),
              window.requestAnimationFrame(function() {
                (r = 0.08 * -(s.pageX - i.left - n / 2) * 0.4),
                  (a = 0.08 * -(s.pageY - i.top - o / 2) * 0.4),
                  t(s.target)
                    .closest('.tg-item')
                    .find(l)
                    .css({
                      '-webkit-transform':
                        'matrix(1.08, 0, 0, 1.08,' + r + ',' + a + ')',
                      '-moz-transform':
                        'matrix(1.08, 0, 0, 1.08,' + r + ',' + a + ')',
                    });
              }));
          })
          .on('mouseleave', '.tg-panZ', function(e) {
            setTimeout(function() {
              t(e.target)
                .closest('.tg-item')
                .find(l)
                .css({ '-webkit-transform': '', '-moz-transform': '' });
            }, 80);
          });
    })(),
    (function() {
      function e(t, e) {
        var i = s.scrollTop || a.scrollTop,
          o = s.scrollLeft,
          n = t.pageX,
          r = t.pageY,
          l = e[0].getBoundingClientRect(),
          u = e[0].clientWidth || e[0].offsetWidth || e[0].scrollWidth,
          d = e[0].clientHeight || e[0].offsetHeight || e[0].scrollHeight,
          c = 320 / u,
          h = 0.52 - (n - l.left - o) / u,
          p = 0.52 - (r - l.top - i) / d,
          f = r - l.top - i - d / 2,
          m = 0.07 * c * (h - (n - l.left - o - u / 2)),
          g = 0.1 * c * (f - p),
          y =
            'perspective(' +
            3 * u * (d > u ? d / u * 2 : 1) +
            'px) rotateX(' +
            g +
            'deg) rotateY(' +
            m +
            'deg) scale3d(1.03,1.03,1.03)';
        e.css(
          'transform',
          y +
            ' translateX(' +
            2 * h * (2.5 / c) +
            'px) translateY(' +
            1 * p * (2.5 / c) +
            'px)'
        );
      }
      function i(t) {
        t.addClass('over');
      }
      function o(t) {
        t.removeClass('over'),
          setTimeout(function() {
            var e = t[0].clientWidth || t[0].offsetWidth || t[0].scrollWidth;
            t.css(
              'transform',
              'perspective(' +
                3 * e +
                'px) rotateX(0deg) rotateY(0deg) translateZ(0)'
            );
          }, 80);
      }
      var n = document,
        r = 0,
        a = n.getElementsByTagName('html')[0],
        s = n.getElementsByTagName('body')[0],
        l = 'ontouchstart' in window || navigator.msMaxTouchPoints,
        u = t('body').hasClass('is-ie') ? 1 : 80;
      l ||
        t(document)
          .on('mousemove', '.tg-atv-anim', function(i) {
            var o = t(this),
              n = Date.now();
            n > r + u &&
              ((r = n),
              window.requestAnimationFrame(function() {
                e(i, o);
              }));
          })
          .on('mouseenter', '.tg-atv-anim', function(e) {
            i(t(this));
          })
          .on('mouseleave', '.tg-atv-anim', function(e) {
            o(t(this));
          });
    })(),
    t(
      document
    ).on('click', '.tg-social-share:not(.tg-social-disabled)', function(e) {
      e.preventDefault();
      var i = t(this)[0].href,
        o = Math.round(window.screenX + (window.outerWidth - 626) / 2),
        n = Math.round(window.screenY + (window.outerHeight - 436) / 2);
      return (
        i &&
          window.open(
            i,
            'tg_share',
            'status=0,resizable=1,location=1,toolbar=0,width=626,height=436,top=' +
              n +
              ',left=' +
              o
          ),
        !1
      );
    }),
    t.TG_media_init(),
    t(document).ready(function() {
      t('.tg-grid-preloader-styles, .tg-grid-styles').removeAttr('scoped'),
        t('.tg-grid-holder').The_Grid(),
        t.TO_Lightbox();
    });
  var r,
    a,
    s,
    l = t.event;
  r = l.special.debouncedresize = {
    setup: function() {
      t(this).on('resize', r.handler);
    },
    teardown: function() {
      t(this).off('resize', r.handler);
    },
    handler: function(t, e) {
      var i = this,
        o = arguments,
        n = function() {
          (t.type = 'debouncedresize'), l.dispatch.apply(i, o);
        };
      s && clearTimeout(s), (a = e ? n() : (s = setTimeout(n, r.threshold)));
    },
    threshold: 100,
  };
})(jQuery),
  (function() {
    for (
      var t = 0, e = ['webkit', 'moz'], i = 0;
      i < e.length && !window.requestAnimationFrame;
      ++i
    )
      (window.requestAnimationFrame = window[e[i] + 'RequestAnimationFrame']),
        (window.cancelAnimationFrame =
          window[e[i] + 'CancelAnimationFrame'] ||
          window[e[i] + 'CancelRequestAnimationFrame']);
    window.requestAnimationFrame ||
      (window.requestAnimationFrame = function(e, i) {
        var o = new Date().getTime(),
          n = Math.max(0, 16 - (o - t)),
          r = window.setTimeout(function() {
            e(o + n);
          }, n);
        return (t = o + n), r;
      }),
      window.cancelAnimationFrame ||
        (window.cancelAnimationFrame = function(t) {
          clearTimeout(t);
        });
  })(),
  (window.tgInterval = function(t, e) {
    var i,
      o = Date.now,
      n = window.requestAnimationFrame,
      r = o(),
      a = function() {
        o() - r < e || ((r += e), t()), i || n(a);
      };
    return (
      n(a),
      {
        clear: function() {
          i = 1;
        },
      }
    );
  }),
  tg_global_var.mediaelement_ex &&
    ((function(t) {
      t.extend(mejs.MepDefaults, { sourcechooserText: 'Source Chooser' }),
        t.extend(MediaElementPlayer.prototype, {
          buildsourcechooser: function(e, i, o, n) {
            var r = this;
            e.sourcechooserButton = t(
              '<div class="mejs-button mejs-sourcechooser-button"><button type="button" aria-controls="' +
                r.id +
                '" title="' +
                r.options.sourcechooserText +
                '" aria-label="' +
                r.options.sourcechooserText +
                '"></button><div class="mejs-sourcechooser-selector"><ul></ul></div></div>'
            )
              .appendTo(i)
              .delegate('input[type=checkbox]', 'click', function() {
                var e = this.value;
                t(this)
                  .closest('.mejs-sourcechooser-selector')
                  .find('input')
                  .removeAttr('checked'),
                  t(this)
                    .closest('.mejs-sourcechooser-selector')
                    .find('label')
                    .removeClass('active'),
                  t(this)
                    .next('label')
                    .addClass('active'),
                  n.currentSrc != e &&
                    ((currentTime = n.currentTime),
                    (paused = n.paused),
                    n.setSrc(e),
                    n.load(),
                    n.addEventListener(
                      'loadedmetadata',
                      function() {
                        this.currentTime = currentTime;
                      },
                      !0
                    ),
                    n.addEventListener(
                      'canplay',
                      function() {
                        paused || this.play();
                      },
                      !0
                    ));
              });
            for (var a in n.children) {
              var s = n.children[a];
              'SOURCE' !== s.nodeName ||
                ('probably' != n.canPlayType(s.type) &&
                  'maybe' != n.canPlayType(s.type)) ||
                e.addSourceButton(s.src, s.title, s.type, n.src == s.src);
            }
          },
          addSourceButton: function(e, i, o, n) {
            var r = this;
            ('' === i || void 0 == i) && (i = e),
              (o = o.split('/')[1]),
              r.sourcechooserButton
                .find('ul')
                .append(
                  t(
                    '<li><input type="checkbox" name="' +
                      r.id +
                      '_sourcechooser" id="' +
                      r.id +
                      '_sourcechooser_' +
                      o +
                      '" value="' +
                      e +
                      '" ' +
                      (n ? 'checked="checked"' : '') +
                      ' /><label for="' +
                      r.id +
                      '_sourcechooser_' +
                      o +
                      '">' +
                      o +
                      '</label></li>'
                  )
                ),
              r.adjustSourcechooserBox();
          },
          adjustSourcechooserBox: function() {
            var t = this;
            t.sourcechooserButton
              .find('.mejs-sourcechooser-selector')
              .height(
                t.sourcechooserButton
                  .find('.mejs-sourcechooser-selector ul')
                  .outerHeight(!0)
              );
          },
        });
    })(mejs.$),
    (function(t) {
      t.extend(MediaElementPlayer.prototype, {
        buildloop: function(e, i) {
          var o = this,
            n = t(
              '<div class="mejs-button mejs-loop-button ' +
                (e.options.loop ? 'mejs-loop-on' : 'mejs-loop-off') +
                '"><button type="button" aria-controls="' +
                o.id +
                '" title="Toggle Loop" aria-label="Toggle Loop"></button></div>'
            )
              .appendTo(i)
              .click(function() {
                (e.options.loop = !e.options.loop),
                  e.options.loop
                    ? n.removeClass('mejs-loop-off').addClass('mejs-loop-on')
                    : n.removeClass('mejs-loop-on').addClass('mejs-loop-off');
              });
        },
      });
    })(mejs.$));
