/*! jQuery UI - v1.10.3 - 2013-10-16
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.tabs.js, jquery.ui.effect.js, jquery.ui.effect-fade.js
* Copyright 2013 jQuery Foundation and other contributors; Licensed MIT */

(function(e, t) {
  function i(t, i) {
    var s,
      a,
      o,
      r = t.nodeName.toLowerCase();
    return 'area' === r
      ? ((s = t.parentNode),
        (a = s.name),
        t.href && a && 'map' === s.nodeName.toLowerCase()
          ? ((o = e('img[usemap=#' + a + ']')[0]), !!o && n(o))
          : !1)
      : (/input|select|textarea|button|object/.test(r)
          ? !t.disabled
          : 'a' === r ? t.href || i : i) && n(t);
  }
  function n(t) {
    return (
      e.expr.filters.visible(t) &&
      !e(t)
        .parents()
        .addBack()
        .filter(function() {
          return 'hidden' === e.css(this, 'visibility');
        }).length
    );
  }
  var s = 0,
    a = /^ui-id-\d+$/;
  (e.ui = e.ui || {}),
    e.extend(e.ui, {
      version: '1.10.3',
      keyCode: {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        LEFT: 37,
        NUMPAD_ADD: 107,
        NUMPAD_DECIMAL: 110,
        NUMPAD_DIVIDE: 111,
        NUMPAD_ENTER: 108,
        NUMPAD_MULTIPLY: 106,
        NUMPAD_SUBTRACT: 109,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        PERIOD: 190,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
      },
    }),
    e.fn.extend({
      focus: (function(t) {
        return function(i, n) {
          return 'number' == typeof i
            ? this.each(function() {
                var t = this;
                setTimeout(function() {
                  e(t).focus(), n && n.call(t);
                }, i);
              })
            : t.apply(this, arguments);
        };
      })(e.fn.focus),
      scrollParent: function() {
        var t;
        return (
          (t =
            (e.ui.ie && /(static|relative)/.test(this.css('position'))) ||
            /absolute/.test(this.css('position'))
              ? this.parents()
                  .filter(function() {
                    return (
                      /(relative|absolute|fixed)/.test(
                        e.css(this, 'position')
                      ) &&
                      /(auto|scroll)/.test(
                        e.css(this, 'overflow') +
                          e.css(this, 'overflow-y') +
                          e.css(this, 'overflow-x')
                      )
                    );
                  })
                  .eq(0)
              : this.parents()
                  .filter(function() {
                    return /(auto|scroll)/.test(
                      e.css(this, 'overflow') +
                        e.css(this, 'overflow-y') +
                        e.css(this, 'overflow-x')
                    );
                  })
                  .eq(0)),
          /fixed/.test(this.css('position')) || !t.length ? e(document) : t
        );
      },
      zIndex: function(i) {
        if (i !== t) return this.css('zIndex', i);
        if (this.length)
          for (var n, s, a = e(this[0]); a.length && a[0] !== document; ) {
            if (
              ((n = a.css('position')),
              ('absolute' === n || 'relative' === n || 'fixed' === n) &&
                ((s = parseInt(a.css('zIndex'), 10)), !isNaN(s) && 0 !== s))
            )
              return s;
            a = a.parent();
          }
        return 0;
      },
      uniqueId: function() {
        return this.each(function() {
          this.id || (this.id = 'ui-id-' + ++s);
        });
      },
      removeUniqueId: function() {
        return this.each(function() {
          a.test(this.id) && e(this).removeAttr('id');
        });
      },
    }),
    e.extend(e.expr[':'], {
      data: e.expr.createPseudo
        ? e.expr.createPseudo(function(t) {
            return function(i) {
              return !!e.data(i, t);
            };
          })
        : function(t, i, n) {
            return !!e.data(t, n[3]);
          },
      focusable: function(t) {
        return i(t, !isNaN(e.attr(t, 'tabindex')));
      },
      tabbable: function(t) {
        var n = e.attr(t, 'tabindex'),
          s = isNaN(n);
        return (s || n >= 0) && i(t, !s);
      },
    }),
    e('<a>').outerWidth(1).jquery ||
      e.each(['Width', 'Height'], function(i, n) {
        function s(t, i, n, s) {
          return (
            e.each(a, function() {
              (i -= parseFloat(e.css(t, 'padding' + this)) || 0),
                n &&
                  (i -= parseFloat(e.css(t, 'border' + this + 'Width')) || 0),
                s && (i -= parseFloat(e.css(t, 'margin' + this)) || 0);
            }),
            i
          );
        }
        var a = 'Width' === n ? ['Left', 'Right'] : ['Top', 'Bottom'],
          o = n.toLowerCase(),
          r = {
            innerWidth: e.fn.innerWidth,
            innerHeight: e.fn.innerHeight,
            outerWidth: e.fn.outerWidth,
            outerHeight: e.fn.outerHeight,
          };
        (e.fn['inner' + n] = function(i) {
          return i === t
            ? r['inner' + n].call(this)
            : this.each(function() {
                e(this).css(o, s(this, i) + 'px');
              });
        }),
          (e.fn['outer' + n] = function(t, i) {
            return 'number' != typeof t
              ? r['outer' + n].call(this, t)
              : this.each(function() {
                  e(this).css(o, s(this, t, !0, i) + 'px');
                });
          });
      }),
    e.fn.addBack ||
      (e.fn.addBack = function(e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      }),
    e('<a>')
      .data('a-b', 'a')
      .removeData('a-b')
      .data('a-b') &&
      (e.fn.removeData = (function(t) {
        return function(i) {
          return arguments.length ? t.call(this, e.camelCase(i)) : t.call(this);
        };
      })(e.fn.removeData)),
    (e.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase())),
    (e.support.selectstart = 'onselectstart' in document.createElement('div')),
    e.fn.extend({
      disableSelection: function() {
        return this.bind(
          (e.support.selectstart ? 'selectstart' : 'mousedown') +
            '.ui-disableSelection',
          function(e) {
            e.preventDefault();
          }
        );
      },
      enableSelection: function() {
        return this.unbind('.ui-disableSelection');
      },
    }),
    e.extend(e.ui, {
      plugin: {
        add: function(t, i, n) {
          var s,
            a = e.ui[t].prototype;
          for (s in n)
            (a.plugins[s] = a.plugins[s] || []), a.plugins[s].push([i, n[s]]);
        },
        call: function(e, t, i) {
          var n,
            s = e.plugins[t];
          if (
            s &&
            e.element[0].parentNode &&
            11 !== e.element[0].parentNode.nodeType
          )
            for (n = 0; s.length > n; n++)
              e.options[s[n][0]] && s[n][1].apply(e.element, i);
        },
      },
      hasScroll: function(t, i) {
        if ('hidden' === e(t).css('overflow')) return !1;
        var n = i && 'left' === i ? 'scrollLeft' : 'scrollTop',
          s = !1;
        return t[n] > 0 ? !0 : ((t[n] = 1), (s = t[n] > 0), (t[n] = 0), s);
      },
    });
})(jQuery);
(function(t, e) {
  var i = 0,
    s = Array.prototype.slice,
    n = t.cleanData;
  (t.cleanData = function(e) {
    for (var i, s = 0; null != (i = e[s]); s++)
      try {
        t(i).triggerHandler('remove');
      } catch (o) {}
    n(e);
  }),
    (t.widget = function(i, s, n) {
      var o,
        a,
        r,
        h,
        l = {},
        c = i.split('.')[0];
      (i = i.split('.')[1]),
        (o = c + '-' + i),
        n || ((n = s), (s = t.Widget)),
        (t.expr[':'][o.toLowerCase()] = function(e) {
          return !!t.data(e, o);
        }),
        (t[c] = t[c] || {}),
        (a = t[c][i]),
        (r = t[c][i] = function(t, i) {
          return this._createWidget
            ? (arguments.length && this._createWidget(t, i), e)
            : new r(t, i);
        }),
        t.extend(r, a, {
          version: n.version,
          _proto: t.extend({}, n),
          _childConstructors: [],
        }),
        (h = new s()),
        (h.options = t.widget.extend({}, h.options)),
        t.each(n, function(i, n) {
          return t.isFunction(n)
            ? ((l[i] = (function() {
                var t = function() {
                    return s.prototype[i].apply(this, arguments);
                  },
                  e = function(t) {
                    return s.prototype[i].apply(this, t);
                  };
                return function() {
                  var i,
                    s = this._super,
                    o = this._superApply;
                  return (
                    (this._super = t),
                    (this._superApply = e),
                    (i = n.apply(this, arguments)),
                    (this._super = s),
                    (this._superApply = o),
                    i
                  );
                };
              })()),
              e)
            : ((l[i] = n), e);
        }),
        (r.prototype = t.widget.extend(
          h,
          { widgetEventPrefix: a ? h.widgetEventPrefix : i },
          l,
          { constructor: r, namespace: c, widgetName: i, widgetFullName: o }
        )),
        a
          ? (t.each(a._childConstructors, function(e, i) {
              var s = i.prototype;
              t.widget(s.namespace + '.' + s.widgetName, r, i._proto);
            }),
            delete a._childConstructors)
          : s._childConstructors.push(r),
        t.widget.bridge(i, r);
    }),
    (t.widget.extend = function(i) {
      for (var n, o, a = s.call(arguments, 1), r = 0, h = a.length; h > r; r++)
        for (n in a[r])
          (o = a[r][n]),
            a[r].hasOwnProperty(n) &&
              o !== e &&
              (i[n] = t.isPlainObject(o)
                ? t.isPlainObject(i[n])
                  ? t.widget.extend({}, i[n], o)
                  : t.widget.extend({}, o)
                : o);
      return i;
    }),
    (t.widget.bridge = function(i, n) {
      var o = n.prototype.widgetFullName || i;
      t.fn[i] = function(a) {
        var r = 'string' == typeof a,
          h = s.call(arguments, 1),
          l = this;
        return (
          (a = !r && h.length ? t.widget.extend.apply(null, [a].concat(h)) : a),
          r
            ? this.each(function() {
                var s,
                  n = t.data(this, o);
                return n
                  ? t.isFunction(n[a]) && '_' !== a.charAt(0)
                    ? ((s = n[a].apply(n, h)),
                      s !== n && s !== e
                        ? ((l = s && s.jquery ? l.pushStack(s.get()) : s), !1)
                        : e)
                    : t.error(
                        "no such method '" +
                          a +
                          "' for " +
                          i +
                          ' widget instance'
                      )
                  : t.error(
                      'cannot call methods on ' +
                        i +
                        ' prior to initialization; ' +
                        "attempted to call method '" +
                        a +
                        "'"
                    );
              })
            : this.each(function() {
                var e = t.data(this, o);
                e ? e.option(a || {})._init() : t.data(this, o, new n(a, this));
              }),
          l
        );
      };
    }),
    (t.Widget = function() {}),
    (t.Widget._childConstructors = []),
    (t.Widget.prototype = {
      widgetName: 'widget',
      widgetEventPrefix: '',
      defaultElement: '<div>',
      options: { disabled: !1, create: null },
      _createWidget: function(e, s) {
        (s = t(s || this.defaultElement || this)[0]),
          (this.element = t(s)),
          (this.uuid = i++),
          (this.eventNamespace = '.' + this.widgetName + this.uuid),
          (this.options = t.widget.extend(
            {},
            this.options,
            this._getCreateOptions(),
            e
          )),
          (this.bindings = t()),
          (this.hoverable = t()),
          (this.focusable = t()),
          s !== this &&
            (t.data(s, this.widgetFullName, this),
            this._on(!0, this.element, {
              remove: function(t) {
                t.target === s && this.destroy();
              },
            }),
            (this.document = t(s.style ? s.ownerDocument : s.document || s)),
            (this.window = t(
              this.document[0].defaultView || this.document[0].parentWindow
            ))),
          this._create(),
          this._trigger('create', null, this._getCreateEventData()),
          this._init();
      },
      _getCreateOptions: t.noop,
      _getCreateEventData: t.noop,
      _create: t.noop,
      _init: t.noop,
      destroy: function() {
        this._destroy(),
          this.element
            .unbind(this.eventNamespace)
            .removeData(this.widgetName)
            .removeData(this.widgetFullName)
            .removeData(t.camelCase(this.widgetFullName)),
          this.widget()
            .unbind(this.eventNamespace)
            .removeAttr('aria-disabled')
            .removeClass(
              this.widgetFullName + '-disabled ' + 'ui-state-disabled'
            ),
          this.bindings.unbind(this.eventNamespace),
          this.hoverable.removeClass('ui-state-hover'),
          this.focusable.removeClass('ui-state-focus');
      },
      _destroy: t.noop,
      widget: function() {
        return this.element;
      },
      option: function(i, s) {
        var n,
          o,
          a,
          r = i;
        if (0 === arguments.length) return t.widget.extend({}, this.options);
        if ('string' == typeof i)
          if (((r = {}), (n = i.split('.')), (i = n.shift()), n.length)) {
            for (
              o = r[i] = t.widget.extend({}, this.options[i]), a = 0;
              n.length - 1 > a;
              a++
            )
              (o[n[a]] = o[n[a]] || {}), (o = o[n[a]]);
            if (((i = n.pop()), s === e)) return o[i] === e ? null : o[i];
            o[i] = s;
          } else {
            if (s === e) return this.options[i] === e ? null : this.options[i];
            r[i] = s;
          }
        return this._setOptions(r), this;
      },
      _setOptions: function(t) {
        var e;
        for (e in t) this._setOption(e, t[e]);
        return this;
      },
      _setOption: function(t, e) {
        return (
          (this.options[t] = e),
          'disabled' === t &&
            (this.widget()
              .toggleClass(
                this.widgetFullName + '-disabled ui-state-disabled',
                !!e
              )
              .attr('aria-disabled', e),
            this.hoverable.removeClass('ui-state-hover'),
            this.focusable.removeClass('ui-state-focus')),
          this
        );
      },
      enable: function() {
        return this._setOption('disabled', !1);
      },
      disable: function() {
        return this._setOption('disabled', !0);
      },
      _on: function(i, s, n) {
        var o,
          a = this;
        'boolean' != typeof i && ((n = s), (s = i), (i = !1)),
          n
            ? ((s = o = t(s)), (this.bindings = this.bindings.add(s)))
            : ((n = s), (s = this.element), (o = this.widget())),
          t.each(n, function(n, r) {
            function h() {
              return i ||
              (a.options.disabled !== !0 &&
                !t(this).hasClass('ui-state-disabled'))
                ? ('string' == typeof r ? a[r] : r).apply(a, arguments)
                : e;
            }
            'string' != typeof r &&
              (h.guid = r.guid = r.guid || h.guid || t.guid++);
            var l = n.match(/^(\w+)\s*(.*)$/),
              c = l[1] + a.eventNamespace,
              u = l[2];
            u ? o.delegate(u, c, h) : s.bind(c, h);
          });
      },
      _off: function(t, e) {
        (e =
          (e || '').split(' ').join(this.eventNamespace + ' ') +
          this.eventNamespace),
          t.unbind(e).undelegate(e);
      },
      _delay: function(t, e) {
        function i() {
          return ('string' == typeof t ? s[t] : t).apply(s, arguments);
        }
        var s = this;
        return setTimeout(i, e || 0);
      },
      _hoverable: function(e) {
        (this.hoverable = this.hoverable.add(e)),
          this._on(e, {
            mouseenter: function(e) {
              t(e.currentTarget).addClass('ui-state-hover');
            },
            mouseleave: function(e) {
              t(e.currentTarget).removeClass('ui-state-hover');
            },
          });
      },
      _focusable: function(e) {
        (this.focusable = this.focusable.add(e)),
          this._on(e, {
            focusin: function(e) {
              t(e.currentTarget).addClass('ui-state-focus');
            },
            focusout: function(e) {
              t(e.currentTarget).removeClass('ui-state-focus');
            },
          });
      },
      _trigger: function(e, i, s) {
        var n,
          o,
          a = this.options[e];
        if (
          ((s = s || {}),
          (i = t.Event(i)),
          (i.type = (e === this.widgetEventPrefix
            ? e
            : this.widgetEventPrefix + e).toLowerCase()),
          (i.target = this.element[0]),
          (o = i.originalEvent))
        )
          for (n in o) n in i || (i[n] = o[n]);
        return (
          this.element.trigger(i, s),
          !(
            (t.isFunction(a) &&
              a.apply(this.element[0], [i].concat(s)) === !1) ||
            i.isDefaultPrevented()
          )
        );
      },
    }),
    t.each({ show: 'fadeIn', hide: 'fadeOut' }, function(e, i) {
      t.Widget.prototype['_' + e] = function(s, n, o) {
        'string' == typeof n && (n = { effect: n });
        var a,
          r = n ? (n === !0 || 'number' == typeof n ? i : n.effect || i) : e;
        (n = n || {}),
          'number' == typeof n && (n = { duration: n }),
          (a = !t.isEmptyObject(n)),
          (n.complete = o),
          n.delay && s.delay(n.delay),
          a && t.effects && t.effects.effect[r]
            ? s[e](n)
            : r !== e && s[r]
              ? s[r](n.duration, n.easing, o)
              : s.queue(function(i) {
                  t(this)[e](), o && o.call(s[0]), i();
                });
      };
    });
})(jQuery);
(function(t) {
  var e = !1;
  t(document).mouseup(function() {
    e = !1;
  }),
    t.widget('ui.mouse', {
      version: '1.10.3',
      options: {
        cancel: 'input,textarea,button,select,option',
        distance: 1,
        delay: 0,
      },
      _mouseInit: function() {
        var e = this;
        this.element
          .bind('mousedown.' + this.widgetName, function(t) {
            return e._mouseDown(t);
          })
          .bind('click.' + this.widgetName, function(i) {
            return !0 === t.data(i.target, e.widgetName + '.preventClickEvent')
              ? (t.removeData(i.target, e.widgetName + '.preventClickEvent'),
                i.stopImmediatePropagation(),
                !1)
              : undefined;
          }),
          (this.started = !1);
      },
      _mouseDestroy: function() {
        this.element.unbind('.' + this.widgetName),
          this._mouseMoveDelegate &&
            t(document)
              .unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
              .unbind('mouseup.' + this.widgetName, this._mouseUpDelegate);
      },
      _mouseDown: function(i) {
        if (!e) {
          this._mouseStarted && this._mouseUp(i), (this._mouseDownEvent = i);
          var s = this,
            n = 1 === i.which,
            a =
              'string' == typeof this.options.cancel && i.target.nodeName
                ? t(i.target).closest(this.options.cancel).length
                : !1;
          return n && !a && this._mouseCapture(i)
            ? ((this.mouseDelayMet = !this.options.delay),
              this.mouseDelayMet ||
                (this._mouseDelayTimer = setTimeout(function() {
                  s.mouseDelayMet = !0;
                }, this.options.delay)),
              this._mouseDistanceMet(i) &&
              this._mouseDelayMet(i) &&
              ((this._mouseStarted = this._mouseStart(i) !== !1),
              !this._mouseStarted)
                ? (i.preventDefault(), !0)
                : (!0 ===
                    t.data(i.target, this.widgetName + '.preventClickEvent') &&
                    t.removeData(
                      i.target,
                      this.widgetName + '.preventClickEvent'
                    ),
                  (this._mouseMoveDelegate = function(t) {
                    return s._mouseMove(t);
                  }),
                  (this._mouseUpDelegate = function(t) {
                    return s._mouseUp(t);
                  }),
                  t(document)
                    .bind(
                      'mousemove.' + this.widgetName,
                      this._mouseMoveDelegate
                    )
                    .bind('mouseup.' + this.widgetName, this._mouseUpDelegate),
                  i.preventDefault(),
                  (e = !0),
                  !0))
            : !0;
        }
      },
      _mouseMove: function(e) {
        return t.ui.ie &&
        (!document.documentMode || 9 > document.documentMode) &&
        !e.button
          ? this._mouseUp(e)
          : this._mouseStarted
            ? (this._mouseDrag(e), e.preventDefault())
            : (this._mouseDistanceMet(e) &&
                this._mouseDelayMet(e) &&
                ((this._mouseStarted =
                  this._mouseStart(this._mouseDownEvent, e) !== !1),
                this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)),
              !this._mouseStarted);
      },
      _mouseUp: function(e) {
        return (
          t(document)
            .unbind('mousemove.' + this.widgetName, this._mouseMoveDelegate)
            .unbind('mouseup.' + this.widgetName, this._mouseUpDelegate),
          this._mouseStarted &&
            ((this._mouseStarted = !1),
            e.target === this._mouseDownEvent.target &&
              t.data(e.target, this.widgetName + '.preventClickEvent', !0),
            this._mouseStop(e)),
          !1
        );
      },
      _mouseDistanceMet: function(t) {
        return (
          Math.max(
            Math.abs(this._mouseDownEvent.pageX - t.pageX),
            Math.abs(this._mouseDownEvent.pageY - t.pageY)
          ) >= this.options.distance
        );
      },
      _mouseDelayMet: function() {
        return this.mouseDelayMet;
      },
      _mouseStart: function() {},
      _mouseDrag: function() {},
      _mouseStop: function() {},
      _mouseCapture: function() {
        return !0;
      },
    });
})(jQuery);
(function(t, e) {
  function i(t, e, i) {
    return [
      parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1),
      parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1),
    ];
  }
  function s(e, i) {
    return parseInt(t.css(e, i), 10) || 0;
  }
  function n(e) {
    var i = e[0];
    return 9 === i.nodeType
      ? { width: e.width(), height: e.height(), offset: { top: 0, left: 0 } }
      : t.isWindow(i)
        ? {
            width: e.width(),
            height: e.height(),
            offset: { top: e.scrollTop(), left: e.scrollLeft() },
          }
        : i.preventDefault
          ? { width: 0, height: 0, offset: { top: i.pageY, left: i.pageX } }
          : {
              width: e.outerWidth(),
              height: e.outerHeight(),
              offset: e.offset(),
            };
  }
  t.ui = t.ui || {};
  var a,
    o = Math.max,
    r = Math.abs,
    l = Math.round,
    h = /left|center|right/,
    c = /top|center|bottom/,
    u = /[\+\-]\d+(\.[\d]+)?%?/,
    d = /^\w+/,
    p = /%$/,
    f = t.fn.position;
  (t.position = {
    scrollbarWidth: function() {
      if (a !== e) return a;
      var i,
        s,
        n = t(
          "<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"
        ),
        o = n.children()[0];
      return (
        t('body').append(n),
        (i = o.offsetWidth),
        n.css('overflow', 'scroll'),
        (s = o.offsetWidth),
        i === s && (s = n[0].clientWidth),
        n.remove(),
        (a = i - s)
      );
    },
    getScrollInfo: function(e) {
      var i = e.isWindow ? '' : e.element.css('overflow-x'),
        s = e.isWindow ? '' : e.element.css('overflow-y'),
        n =
          'scroll' === i ||
          ('auto' === i && e.width < e.element[0].scrollWidth),
        a =
          'scroll' === s ||
          ('auto' === s && e.height < e.element[0].scrollHeight);
      return {
        width: a ? t.position.scrollbarWidth() : 0,
        height: n ? t.position.scrollbarWidth() : 0,
      };
    },
    getWithinInfo: function(e) {
      var i = t(e || window),
        s = t.isWindow(i[0]);
      return {
        element: i,
        isWindow: s,
        offset: i.offset() || { left: 0, top: 0 },
        scrollLeft: i.scrollLeft(),
        scrollTop: i.scrollTop(),
        width: s ? i.width() : i.outerWidth(),
        height: s ? i.height() : i.outerHeight(),
      };
    },
  }),
    (t.fn.position = function(e) {
      if (!e || !e.of) return f.apply(this, arguments);
      e = t.extend({}, e);
      var a,
        p,
        g,
        m,
        v,
        _,
        b = t(e.of),
        y = t.position.getWithinInfo(e.within),
        k = t.position.getScrollInfo(y),
        w = (e.collision || 'flip').split(' '),
        D = {};
      return (
        (_ = n(b)),
        b[0].preventDefault && (e.at = 'left top'),
        (p = _.width),
        (g = _.height),
        (m = _.offset),
        (v = t.extend({}, m)),
        t.each(['my', 'at'], function() {
          var t,
            i,
            s = (e[this] || '').split(' ');
          1 === s.length &&
            (s = h.test(s[0])
              ? s.concat(['center'])
              : c.test(s[0]) ? ['center'].concat(s) : ['center', 'center']),
            (s[0] = h.test(s[0]) ? s[0] : 'center'),
            (s[1] = c.test(s[1]) ? s[1] : 'center'),
            (t = u.exec(s[0])),
            (i = u.exec(s[1])),
            (D[this] = [t ? t[0] : 0, i ? i[0] : 0]),
            (e[this] = [d.exec(s[0])[0], d.exec(s[1])[0]]);
        }),
        1 === w.length && (w[1] = w[0]),
        'right' === e.at[0]
          ? (v.left += p)
          : 'center' === e.at[0] && (v.left += p / 2),
        'bottom' === e.at[1]
          ? (v.top += g)
          : 'center' === e.at[1] && (v.top += g / 2),
        (a = i(D.at, p, g)),
        (v.left += a[0]),
        (v.top += a[1]),
        this.each(function() {
          var n,
            h,
            c = t(this),
            u = c.outerWidth(),
            d = c.outerHeight(),
            f = s(this, 'marginLeft'),
            _ = s(this, 'marginTop'),
            x = u + f + s(this, 'marginRight') + k.width,
            C = d + _ + s(this, 'marginBottom') + k.height,
            M = t.extend({}, v),
            T = i(D.my, c.outerWidth(), c.outerHeight());
          'right' === e.my[0]
            ? (M.left -= u)
            : 'center' === e.my[0] && (M.left -= u / 2),
            'bottom' === e.my[1]
              ? (M.top -= d)
              : 'center' === e.my[1] && (M.top -= d / 2),
            (M.left += T[0]),
            (M.top += T[1]),
            t.support.offsetFractions ||
              ((M.left = l(M.left)), (M.top = l(M.top))),
            (n = { marginLeft: f, marginTop: _ }),
            t.each(['left', 'top'], function(i, s) {
              t.ui.position[w[i]] &&
                t.ui.position[w[i]][s](M, {
                  targetWidth: p,
                  targetHeight: g,
                  elemWidth: u,
                  elemHeight: d,
                  collisionPosition: n,
                  collisionWidth: x,
                  collisionHeight: C,
                  offset: [a[0] + T[0], a[1] + T[1]],
                  my: e.my,
                  at: e.at,
                  within: y,
                  elem: c,
                });
            }),
            e.using &&
              (h = function(t) {
                var i = m.left - M.left,
                  s = i + p - u,
                  n = m.top - M.top,
                  a = n + g - d,
                  l = {
                    target: {
                      element: b,
                      left: m.left,
                      top: m.top,
                      width: p,
                      height: g,
                    },
                    element: {
                      element: c,
                      left: M.left,
                      top: M.top,
                      width: u,
                      height: d,
                    },
                    horizontal: 0 > s ? 'left' : i > 0 ? 'right' : 'center',
                    vertical: 0 > a ? 'top' : n > 0 ? 'bottom' : 'middle',
                  };
                u > p && p > r(i + s) && (l.horizontal = 'center'),
                  d > g && g > r(n + a) && (l.vertical = 'middle'),
                  (l.important =
                    o(r(i), r(s)) > o(r(n), r(a)) ? 'horizontal' : 'vertical'),
                  e.using.call(this, t, l);
              }),
            c.offset(t.extend(M, { using: h }));
        })
      );
    }),
    (t.ui.position = {
      fit: {
        left: function(t, e) {
          var i,
            s = e.within,
            n = s.isWindow ? s.scrollLeft : s.offset.left,
            a = s.width,
            r = t.left - e.collisionPosition.marginLeft,
            l = n - r,
            h = r + e.collisionWidth - a - n;
          e.collisionWidth > a
            ? l > 0 && 0 >= h
              ? ((i = t.left + l + e.collisionWidth - a - n), (t.left += l - i))
              : (t.left =
                  h > 0 && 0 >= l ? n : l > h ? n + a - e.collisionWidth : n)
            : l > 0
              ? (t.left += l)
              : h > 0 ? (t.left -= h) : (t.left = o(t.left - r, t.left));
        },
        top: function(t, e) {
          var i,
            s = e.within,
            n = s.isWindow ? s.scrollTop : s.offset.top,
            a = e.within.height,
            r = t.top - e.collisionPosition.marginTop,
            l = n - r,
            h = r + e.collisionHeight - a - n;
          e.collisionHeight > a
            ? l > 0 && 0 >= h
              ? ((i = t.top + l + e.collisionHeight - a - n), (t.top += l - i))
              : (t.top =
                  h > 0 && 0 >= l ? n : l > h ? n + a - e.collisionHeight : n)
            : l > 0
              ? (t.top += l)
              : h > 0 ? (t.top -= h) : (t.top = o(t.top - r, t.top));
        },
      },
      flip: {
        left: function(t, e) {
          var i,
            s,
            n = e.within,
            a = n.offset.left + n.scrollLeft,
            o = n.width,
            l = n.isWindow ? n.scrollLeft : n.offset.left,
            h = t.left - e.collisionPosition.marginLeft,
            c = h - l,
            u = h + e.collisionWidth - o - l,
            d =
              'left' === e.my[0]
                ? -e.elemWidth
                : 'right' === e.my[0] ? e.elemWidth : 0,
            p =
              'left' === e.at[0]
                ? e.targetWidth
                : 'right' === e.at[0] ? -e.targetWidth : 0,
            f = -2 * e.offset[0];
          0 > c
            ? ((i = t.left + d + p + f + e.collisionWidth - o - a),
              (0 > i || r(c) > i) && (t.left += d + p + f))
            : u > 0 &&
              ((s = t.left - e.collisionPosition.marginLeft + d + p + f - l),
              (s > 0 || u > r(s)) && (t.left += d + p + f));
        },
        top: function(t, e) {
          var i,
            s,
            n = e.within,
            a = n.offset.top + n.scrollTop,
            o = n.height,
            l = n.isWindow ? n.scrollTop : n.offset.top,
            h = t.top - e.collisionPosition.marginTop,
            c = h - l,
            u = h + e.collisionHeight - o - l,
            d = 'top' === e.my[1],
            p = d ? -e.elemHeight : 'bottom' === e.my[1] ? e.elemHeight : 0,
            f =
              'top' === e.at[1]
                ? e.targetHeight
                : 'bottom' === e.at[1] ? -e.targetHeight : 0,
            g = -2 * e.offset[1];
          0 > c
            ? ((s = t.top + p + f + g + e.collisionHeight - o - a),
              t.top + p + f + g > c &&
                (0 > s || r(c) > s) &&
                (t.top += p + f + g))
            : u > 0 &&
              ((i = t.top - e.collisionPosition.marginTop + p + f + g - l),
              t.top + p + f + g > u &&
                (i > 0 || u > r(i)) &&
                (t.top += p + f + g));
        },
      },
      flipfit: {
        left: function() {
          t.ui.position.flip.left.apply(this, arguments),
            t.ui.position.fit.left.apply(this, arguments);
        },
        top: function() {
          t.ui.position.flip.top.apply(this, arguments),
            t.ui.position.fit.top.apply(this, arguments);
        },
      },
    }),
    (function() {
      var e,
        i,
        s,
        n,
        a,
        o = document.getElementsByTagName('body')[0],
        r = document.createElement('div');
      (e = document.createElement(o ? 'div' : 'body')),
        (s = {
          visibility: 'hidden',
          width: 0,
          height: 0,
          border: 0,
          margin: 0,
          background: 'none',
        }),
        o &&
          t.extend(s, {
            position: 'absolute',
            left: '-1000px',
            top: '-1000px',
          });
      for (a in s) e.style[a] = s[a];
      e.appendChild(r),
        (i = o || document.documentElement),
        i.insertBefore(e, i.firstChild),
        (r.style.cssText = 'position: absolute; left: 10.7432222px;'),
        (n = t(r).offset().left),
        (t.support.offsetFractions = n > 10 && 11 > n),
        (e.innerHTML = ''),
        i.removeChild(e);
    })();
})(jQuery);
(function(t, e) {
  function i() {
    return ++n;
  }
  function s(t) {
    return (
      t.hash.length > 1 &&
      decodeURIComponent(t.href.replace(a, '')) ===
        decodeURIComponent(location.href.replace(a, ''))
    );
  }
  var n = 0,
    a = /#.*$/;
  t.widget('ui.tabs', {
    version: '1.10.3',
    delay: 300,
    options: {
      active: null,
      collapsible: !1,
      event: 'click',
      heightStyle: 'content',
      hide: null,
      show: null,
      activate: null,
      beforeActivate: null,
      beforeLoad: null,
      load: null,
    },
    _create: function() {
      var e = this,
        i = this.options;
      (this.running = !1),
        this.element
          .addClass('ui-tabs ui-widget ui-widget-content ui-corner-all')
          .toggleClass('ui-tabs-collapsible', i.collapsible)
          .delegate(
            '.ui-tabs-nav > li',
            'mousedown' + this.eventNamespace,
            function(e) {
              t(this).is('.ui-state-disabled') && e.preventDefault();
            }
          )
          .delegate(
            '.ui-tabs-anchor',
            'focus' + this.eventNamespace,
            function() {
              t(this)
                .closest('li')
                .is('.ui-state-disabled') && this.blur();
            }
          ),
        this._processTabs(),
        (i.active = this._initialActive()),
        t.isArray(i.disabled) &&
          (i.disabled = t
            .unique(
              i.disabled.concat(
                t.map(this.tabs.filter('.ui-state-disabled'), function(t) {
                  return e.tabs.index(t);
                })
              )
            )
            .sort()),
        (this.active =
          this.options.active !== !1 && this.anchors.length
            ? this._findActive(i.active)
            : t()),
        this._refresh(),
        this.active.length && this.load(i.active);
    },
    _initialActive: function() {
      var i = this.options.active,
        s = this.options.collapsible,
        n = location.hash.substring(1);
      return (
        null === i &&
          (n &&
            this.tabs.each(function(s, a) {
              return t(a).attr('aria-controls') === n ? ((i = s), !1) : e;
            }),
          null === i &&
            (i = this.tabs.index(this.tabs.filter('.ui-tabs-active'))),
          (null === i || -1 === i) && (i = this.tabs.length ? 0 : !1)),
        i !== !1 &&
          ((i = this.tabs.index(this.tabs.eq(i))),
          -1 === i && (i = s ? !1 : 0)),
        !s && i === !1 && this.anchors.length && (i = 0),
        i
      );
    },
    _getCreateEventData: function() {
      return {
        tab: this.active,
        panel: this.active.length ? this._getPanelForTab(this.active) : t(),
      };
    },
    _tabKeydown: function(i) {
      var s = t(this.document[0].activeElement).closest('li'),
        n = this.tabs.index(s),
        a = !0;
      if (!this._handlePageNav(i)) {
        switch (i.keyCode) {
          case t.ui.keyCode.RIGHT:
          case t.ui.keyCode.DOWN:
            n++;
            break;
          case t.ui.keyCode.UP:
          case t.ui.keyCode.LEFT:
            (a = !1), n--;
            break;
          case t.ui.keyCode.END:
            n = this.anchors.length - 1;
            break;
          case t.ui.keyCode.HOME:
            n = 0;
            break;
          case t.ui.keyCode.SPACE:
            return (
              i.preventDefault(),
              clearTimeout(this.activating),
              this._activate(n),
              e
            );
          case t.ui.keyCode.ENTER:
            return (
              i.preventDefault(),
              clearTimeout(this.activating),
              this._activate(n === this.options.active ? !1 : n),
              e
            );
          default:
            return;
        }
        i.preventDefault(),
          clearTimeout(this.activating),
          (n = this._focusNextTab(n, a)),
          i.ctrlKey ||
            (s.attr('aria-selected', 'false'),
            this.tabs.eq(n).attr('aria-selected', 'true'),
            (this.activating = this._delay(function() {
              this.option('active', n);
            }, this.delay)));
      }
    },
    _panelKeydown: function(e) {
      this._handlePageNav(e) ||
        (e.ctrlKey &&
          e.keyCode === t.ui.keyCode.UP &&
          (e.preventDefault(), this.active.focus()));
    },
    _handlePageNav: function(i) {
      return i.altKey && i.keyCode === t.ui.keyCode.PAGE_UP
        ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0)
        : i.altKey && i.keyCode === t.ui.keyCode.PAGE_DOWN
          ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0)
          : e;
    },
    _findNextTab: function(e, i) {
      function s() {
        return e > n && (e = 0), 0 > e && (e = n), e;
      }
      for (
        var n = this.tabs.length - 1;
        -1 !== t.inArray(s(), this.options.disabled);

      )
        e = i ? e + 1 : e - 1;
      return e;
    },
    _focusNextTab: function(t, e) {
      return (t = this._findNextTab(t, e)), this.tabs.eq(t).focus(), t;
    },
    _setOption: function(t, i) {
      return 'active' === t
        ? (this._activate(i), e)
        : 'disabled' === t
          ? (this._setupDisabled(i), e)
          : (this._super(t, i),
            'collapsible' === t &&
              (this.element.toggleClass('ui-tabs-collapsible', i),
              i || this.options.active !== !1 || this._activate(0)),
            'event' === t && this._setupEvents(i),
            'heightStyle' === t && this._setupHeightStyle(i),
            e);
    },
    _tabId: function(t) {
      return t.attr('aria-controls') || 'ui-tabs-' + i();
    },
    _sanitizeSelector: function(t) {
      return t ? t.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, '\\$&') : '';
    },
    refresh: function() {
      var e = this.options,
        i = this.tablist.children(':has(a[href])');
      (e.disabled = t.map(i.filter('.ui-state-disabled'), function(t) {
        return i.index(t);
      })),
        this._processTabs(),
        e.active !== !1 && this.anchors.length
          ? this.active.length && !t.contains(this.tablist[0], this.active[0])
            ? this.tabs.length === e.disabled.length
              ? ((e.active = !1), (this.active = t()))
              : this._activate(this._findNextTab(Math.max(0, e.active - 1), !1))
            : (e.active = this.tabs.index(this.active))
          : ((e.active = !1), (this.active = t())),
        this._refresh();
    },
    _refresh: function() {
      this._setupDisabled(this.options.disabled),
        this._setupEvents(this.options.event),
        this._setupHeightStyle(this.options.heightStyle),
        this.tabs
          .not(this.active)
          .attr({ 'aria-selected': 'false', tabIndex: -1 }),
        this.panels
          .not(this._getPanelForTab(this.active))
          .hide()
          .attr({ 'aria-expanded': 'false', 'aria-hidden': 'true' }),
        this.active.length
          ? (this.active
              .addClass('ui-tabs-active ui-state-active')
              .attr({ 'aria-selected': 'true', tabIndex: 0 }),
            this._getPanelForTab(this.active)
              .show()
              .attr({ 'aria-expanded': 'true', 'aria-hidden': 'false' }))
          : this.tabs.eq(0).attr('tabIndex', 0);
    },
    _processTabs: function() {
      var e = this;
      (this.tablist = this._getList()
        .addClass(
          'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'
        )
        .attr('role', 'tablist')),
        (this.tabs = this.tablist
          .find('> li:has(a[href])')
          .addClass('ui-state-default ui-corner-top')
          .attr({ role: 'tab', tabIndex: -1 })),
        (this.anchors = this.tabs
          .map(function() {
            return t('a', this)[0];
          })
          .addClass('ui-tabs-anchor')
          .attr({ role: 'presentation', tabIndex: -1 })),
        (this.panels = t()),
        this.anchors.each(function(i, n) {
          var a,
            o,
            r,
            h = t(n)
              .uniqueId()
              .attr('id'),
            l = t(n).closest('li'),
            c = l.attr('aria-controls');
          s(n)
            ? ((a = n.hash), (o = e.element.find(e._sanitizeSelector(a))))
            : ((r = e._tabId(l)),
              (a = '#' + r),
              (o = e.element.find(a)),
              o.length ||
                ((o = e._createPanel(r)),
                o.insertAfter(e.panels[i - 1] || e.tablist)),
              o.attr('aria-live', 'polite')),
            o.length && (e.panels = e.panels.add(o)),
            c && l.data('ui-tabs-aria-controls', c),
            l.attr({ 'aria-controls': a.substring(1), 'aria-labelledby': h }),
            o.attr('aria-labelledby', h);
        }),
        this.panels
          .addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
          .attr('role', 'tabpanel');
    },
    _getList: function() {
      return this.element.find('ol,ul').eq(0);
    },
    _createPanel: function(e) {
      return t('<div>')
        .attr('id', e)
        .addClass('ui-tabs-panel ui-widget-content ui-corner-bottom')
        .data('ui-tabs-destroy', !0);
    },
    _setupDisabled: function(e) {
      t.isArray(e) &&
        (e.length ? e.length === this.anchors.length && (e = !0) : (e = !1));
      for (var i, s = 0; (i = this.tabs[s]); s++)
        e === !0 || -1 !== t.inArray(s, e)
          ? t(i)
              .addClass('ui-state-disabled')
              .attr('aria-disabled', 'true')
          : t(i)
              .removeClass('ui-state-disabled')
              .removeAttr('aria-disabled');
      this.options.disabled = e;
    },
    _setupEvents: function(e) {
      var i = {
        click: function(t) {
          t.preventDefault();
        },
      };
      e &&
        t.each(e.split(' '), function(t, e) {
          i[e] = '_eventHandler';
        }),
        this._off(this.anchors.add(this.tabs).add(this.panels)),
        this._on(this.anchors, i),
        this._on(this.tabs, { keydown: '_tabKeydown' }),
        this._on(this.panels, { keydown: '_panelKeydown' }),
        this._focusable(this.tabs),
        this._hoverable(this.tabs);
    },
    _setupHeightStyle: function(e) {
      var i,
        s = this.element.parent();
      'fill' === e
        ? ((i = s.height()),
          (i -= this.element.outerHeight() - this.element.height()),
          this.element.siblings(':visible').each(function() {
            var e = t(this),
              s = e.css('position');
            'absolute' !== s && 'fixed' !== s && (i -= e.outerHeight(!0));
          }),
          this.element
            .children()
            .not(this.panels)
            .each(function() {
              i -= t(this).outerHeight(!0);
            }),
          this.panels
            .each(function() {
              t(this).height(
                Math.max(0, i - t(this).innerHeight() + t(this).height())
              );
            })
            .css('overflow', 'auto'))
        : 'auto' === e &&
          ((i = 0),
          this.panels
            .each(function() {
              i = Math.max(
                i,
                t(this)
                  .height('')
                  .height()
              );
            })
            .height(i));
    },
    _eventHandler: function(e) {
      var i = this.options,
        s = this.active,
        n = t(e.currentTarget),
        a = n.closest('li'),
        o = a[0] === s[0],
        r = o && i.collapsible,
        h = r ? t() : this._getPanelForTab(a),
        l = s.length ? this._getPanelForTab(s) : t(),
        c = { oldTab: s, oldPanel: l, newTab: r ? t() : a, newPanel: h };
      e.preventDefault(),
        a.hasClass('ui-state-disabled') ||
          a.hasClass('ui-tabs-loading') ||
          this.running ||
          (o && !i.collapsible) ||
          this._trigger('beforeActivate', e, c) === !1 ||
          ((i.active = r ? !1 : this.tabs.index(a)),
          (this.active = o ? t() : a),
          this.xhr && this.xhr.abort(),
          l.length ||
            h.length ||
            t.error('jQuery UI Tabs: Mismatching fragment identifier.'),
          h.length && this.load(this.tabs.index(a), e),
          this._toggle(e, c));
    },
    _toggle: function(e, i) {
      function s() {
        (a.running = !1), a._trigger('activate', e, i);
      }
      function n() {
        i.newTab.closest('li').addClass('ui-tabs-active ui-state-active'),
          o.length && a.options.show
            ? a._show(o, a.options.show, s)
            : (o.show(), s());
      }
      var a = this,
        o = i.newPanel,
        r = i.oldPanel;
      (this.running = !0),
        r.length && this.options.hide
          ? this._hide(r, this.options.hide, function() {
              i.oldTab
                .closest('li')
                .removeClass('ui-tabs-active ui-state-active'),
                n();
            })
          : (i.oldTab
              .closest('li')
              .removeClass('ui-tabs-active ui-state-active'),
            r.hide(),
            n()),
        r.attr({ 'aria-expanded': 'false', 'aria-hidden': 'true' }),
        i.oldTab.attr('aria-selected', 'false'),
        o.length && r.length
          ? i.oldTab.attr('tabIndex', -1)
          : o.length &&
            this.tabs
              .filter(function() {
                return 0 === t(this).attr('tabIndex');
              })
              .attr('tabIndex', -1),
        o.attr({ 'aria-expanded': 'true', 'aria-hidden': 'false' }),
        i.newTab.attr({ 'aria-selected': 'true', tabIndex: 0 });
    },
    _activate: function(e) {
      var i,
        s = this._findActive(e);
      s[0] !== this.active[0] &&
        (s.length || (s = this.active),
        (i = s.find('.ui-tabs-anchor')[0]),
        this._eventHandler({
          target: i,
          currentTarget: i,
          preventDefault: t.noop,
        }));
    },
    _findActive: function(e) {
      return e === !1 ? t() : this.tabs.eq(e);
    },
    _getIndex: function(t) {
      return (
        'string' == typeof t &&
          (t = this.anchors.index(this.anchors.filter("[href$='" + t + "']"))),
        t
      );
    },
    _destroy: function() {
      this.xhr && this.xhr.abort(),
        this.element.removeClass(
          'ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible'
        ),
        this.tablist
          .removeClass(
            'ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all'
          )
          .removeAttr('role'),
        this.anchors
          .removeClass('ui-tabs-anchor')
          .removeAttr('role')
          .removeAttr('tabIndex')
          .removeUniqueId(),
        this.tabs.add(this.panels).each(function() {
          t.data(this, 'ui-tabs-destroy')
            ? t(this).remove()
            : t(this)
                .removeClass(
                  'ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel'
                )
                .removeAttr('tabIndex')
                .removeAttr('aria-live')
                .removeAttr('aria-busy')
                .removeAttr('aria-selected')
                .removeAttr('aria-labelledby')
                .removeAttr('aria-hidden')
                .removeAttr('aria-expanded')
                .removeAttr('role');
        }),
        this.tabs.each(function() {
          var e = t(this),
            i = e.data('ui-tabs-aria-controls');
          i
            ? e.attr('aria-controls', i).removeData('ui-tabs-aria-controls')
            : e.removeAttr('aria-controls');
        }),
        this.panels.show(),
        'content' !== this.options.heightStyle && this.panels.css('height', '');
    },
    enable: function(i) {
      var s = this.options.disabled;
      s !== !1 &&
        (i === e
          ? (s = !1)
          : ((i = this._getIndex(i)),
            (s = t.isArray(s)
              ? t.map(s, function(t) {
                  return t !== i ? t : null;
                })
              : t.map(this.tabs, function(t, e) {
                  return e !== i ? e : null;
                }))),
        this._setupDisabled(s));
    },
    disable: function(i) {
      var s = this.options.disabled;
      if (s !== !0) {
        if (i === e) s = !0;
        else {
          if (((i = this._getIndex(i)), -1 !== t.inArray(i, s))) return;
          s = t.isArray(s) ? t.merge([i], s).sort() : [i];
        }
        this._setupDisabled(s);
      }
    },
    load: function(e, i) {
      e = this._getIndex(e);
      var n = this,
        a = this.tabs.eq(e),
        o = a.find('.ui-tabs-anchor'),
        r = this._getPanelForTab(a),
        h = { tab: a, panel: r };
      s(o[0]) ||
        ((this.xhr = t.ajax(this._ajaxSettings(o, i, h))),
        this.xhr &&
          'canceled' !== this.xhr.statusText &&
          (a.addClass('ui-tabs-loading'),
          r.attr('aria-busy', 'true'),
          this.xhr
            .success(function(t) {
              setTimeout(function() {
                r.html(t), n._trigger('load', i, h);
              }, 1);
            })
            .complete(function(t, e) {
              setTimeout(function() {
                'abort' === e && n.panels.stop(!1, !0),
                  a.removeClass('ui-tabs-loading'),
                  r.removeAttr('aria-busy'),
                  t === n.xhr && delete n.xhr;
              }, 1);
            })));
    },
    _ajaxSettings: function(e, i, s) {
      var n = this;
      return {
        url: e.attr('href'),
        beforeSend: function(e, a) {
          return n._trigger(
            'beforeLoad',
            i,
            t.extend({ jqXHR: e, ajaxSettings: a }, s)
          );
        },
      };
    },
    _getPanelForTab: function(e) {
      var i = t(e).attr('aria-controls');
      return this.element.find(this._sanitizeSelector('#' + i));
    },
  });
})(jQuery);
(function(t, e) {
  var i = 'ui-effects-';
  (t.effects = { effect: {} }),
    (function(t, e) {
      function i(t, e, i) {
        var s = u[e.type] || {};
        return null == t
          ? i || !e.def ? null : e.def
          : ((t = s.floor ? ~~t : parseFloat(t)),
            isNaN(t)
              ? e.def
              : s.mod
                ? (t + s.mod) % s.mod
                : 0 > t ? 0 : t > s.max ? s.max : t);
      }
      function s(i) {
        var s = h(),
          n = (s._rgba = []);
        return (
          (i = i.toLowerCase()),
          f(l, function(t, a) {
            var o,
              r = a.re.exec(i),
              l = r && a.parse(r),
              h = a.space || 'rgba';
            return l
              ? ((o = s[h](l)),
                (s[c[h].cache] = o[c[h].cache]),
                (n = s._rgba = o._rgba),
                !1)
              : e;
          }),
          n.length
            ? ('0,0,0,0' === n.join() && t.extend(n, a.transparent), s)
            : a[i]
        );
      }
      function n(t, e, i) {
        return (
          (i = (i + 1) % 1),
          1 > 6 * i
            ? t + 6 * (e - t) * i
            : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
        );
      }
      var a,
        o =
          'backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor',
        r = /^([\-+])=\s*(\d+\.?\d*)/,
        l = [
          {
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
              return [t[1], t[2], t[3], t[4]];
            },
          },
          {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(t) {
              return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]];
            },
          },
          {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(t) {
              return [
                parseInt(t[1], 16),
                parseInt(t[2], 16),
                parseInt(t[3], 16),
              ];
            },
          },
          {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(t) {
              return [
                parseInt(t[1] + t[1], 16),
                parseInt(t[2] + t[2], 16),
                parseInt(t[3] + t[3], 16),
              ];
            },
          },
          {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: 'hsla',
            parse: function(t) {
              return [t[1], t[2] / 100, t[3] / 100, t[4]];
            },
          },
        ],
        h = (t.Color = function(e, i, s, n) {
          return new t.Color.fn.parse(e, i, s, n);
        }),
        c = {
          rgba: {
            props: {
              red: { idx: 0, type: 'byte' },
              green: { idx: 1, type: 'byte' },
              blue: { idx: 2, type: 'byte' },
            },
          },
          hsla: {
            props: {
              hue: { idx: 0, type: 'degrees' },
              saturation: { idx: 1, type: 'percent' },
              lightness: { idx: 2, type: 'percent' },
            },
          },
        },
        u = {
          byte: { floor: !0, max: 255 },
          percent: { max: 1 },
          degrees: { mod: 360, floor: !0 },
        },
        d = (h.support = {}),
        p = t('<p>')[0],
        f = t.each;
      (p.style.cssText = 'background-color:rgba(1,1,1,.5)'),
        (d.rgba = p.style.backgroundColor.indexOf('rgba') > -1),
        f(c, function(t, e) {
          (e.cache = '_' + t),
            (e.props.alpha = { idx: 3, type: 'percent', def: 1 });
        }),
        (h.fn = t.extend(h.prototype, {
          parse: function(n, o, r, l) {
            if (n === e) return (this._rgba = [null, null, null, null]), this;
            (n.jquery || n.nodeType) && ((n = t(n).css(o)), (o = e));
            var u = this,
              d = t.type(n),
              p = (this._rgba = []);
            return (
              o !== e && ((n = [n, o, r, l]), (d = 'array')),
              'string' === d
                ? this.parse(s(n) || a._default)
                : 'array' === d
                  ? (f(c.rgba.props, function(t, e) {
                      p[e.idx] = i(n[e.idx], e);
                    }),
                    this)
                  : 'object' === d
                    ? (n instanceof h
                        ? f(c, function(t, e) {
                            n[e.cache] && (u[e.cache] = n[e.cache].slice());
                          })
                        : f(c, function(e, s) {
                            var a = s.cache;
                            f(s.props, function(t, e) {
                              if (!u[a] && s.to) {
                                if ('alpha' === t || null == n[t]) return;
                                u[a] = s.to(u._rgba);
                              }
                              u[a][e.idx] = i(n[t], e, !0);
                            }),
                              u[a] &&
                                0 > t.inArray(null, u[a].slice(0, 3)) &&
                                ((u[a][3] = 1),
                                s.from && (u._rgba = s.from(u[a])));
                          }),
                      this)
                    : e
            );
          },
          is: function(t) {
            var i = h(t),
              s = !0,
              n = this;
            return (
              f(c, function(t, a) {
                var o,
                  r = i[a.cache];
                return (
                  r &&
                    ((o = n[a.cache] || (a.to && a.to(n._rgba)) || []),
                    f(a.props, function(t, i) {
                      return null != r[i.idx] ? (s = r[i.idx] === o[i.idx]) : e;
                    })),
                  s
                );
              }),
              s
            );
          },
          _space: function() {
            var t = [],
              e = this;
            return (
              f(c, function(i, s) {
                e[s.cache] && t.push(i);
              }),
              t.pop()
            );
          },
          transition: function(t, e) {
            var s = h(t),
              n = s._space(),
              a = c[n],
              o = 0 === this.alpha() ? h('transparent') : this,
              r = o[a.cache] || a.to(o._rgba),
              l = r.slice();
            return (
              (s = s[a.cache]),
              f(a.props, function(t, n) {
                var a = n.idx,
                  o = r[a],
                  h = s[a],
                  c = u[n.type] || {};
                null !== h &&
                  (null === o
                    ? (l[a] = h)
                    : (c.mod &&
                        (h - o > c.mod / 2
                          ? (o += c.mod)
                          : o - h > c.mod / 2 && (o -= c.mod)),
                      (l[a] = i((h - o) * e + o, n))));
              }),
              this[n](l)
            );
          },
          blend: function(e) {
            if (1 === this._rgba[3]) return this;
            var i = this._rgba.slice(),
              s = i.pop(),
              n = h(e)._rgba;
            return h(
              t.map(i, function(t, e) {
                return (1 - s) * n[e] + s * t;
              })
            );
          },
          toRgbaString: function() {
            var e = 'rgba(',
              i = t.map(this._rgba, function(t, e) {
                return null == t ? (e > 2 ? 1 : 0) : t;
              });
            return 1 === i[3] && (i.pop(), (e = 'rgb(')), e + i.join() + ')';
          },
          toHslaString: function() {
            var e = 'hsla(',
              i = t.map(this.hsla(), function(t, e) {
                return (
                  null == t && (t = e > 2 ? 1 : 0),
                  e && 3 > e && (t = Math.round(100 * t) + '%'),
                  t
                );
              });
            return 1 === i[3] && (i.pop(), (e = 'hsl(')), e + i.join() + ')';
          },
          toHexString: function(e) {
            var i = this._rgba.slice(),
              s = i.pop();
            return (
              e && i.push(~~(255 * s)),
              '#' +
                t
                  .map(i, function(t) {
                    return (
                      (t = (t || 0).toString(16)), 1 === t.length ? '0' + t : t
                    );
                  })
                  .join('')
            );
          },
          toString: function() {
            return 0 === this._rgba[3] ? 'transparent' : this.toRgbaString();
          },
        })),
        (h.fn.parse.prototype = h.fn),
        (c.hsla.to = function(t) {
          if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
          var e,
            i,
            s = t[0] / 255,
            n = t[1] / 255,
            a = t[2] / 255,
            o = t[3],
            r = Math.max(s, n, a),
            l = Math.min(s, n, a),
            h = r - l,
            c = r + l,
            u = 0.5 * c;
          return (
            (e =
              l === r
                ? 0
                : s === r
                  ? 60 * (n - a) / h + 360
                  : n === r ? 60 * (a - s) / h + 120 : 60 * (s - n) / h + 240),
            (i = 0 === h ? 0 : 0.5 >= u ? h / c : h / (2 - c)),
            [Math.round(e) % 360, i, u, null == o ? 1 : o]
          );
        }),
        (c.hsla.from = function(t) {
          if (null == t[0] || null == t[1] || null == t[2])
            return [null, null, null, t[3]];
          var e = t[0] / 360,
            i = t[1],
            s = t[2],
            a = t[3],
            o = 0.5 >= s ? s * (1 + i) : s + i - s * i,
            r = 2 * s - o;
          return [
            Math.round(255 * n(r, o, e + 1 / 3)),
            Math.round(255 * n(r, o, e)),
            Math.round(255 * n(r, o, e - 1 / 3)),
            a,
          ];
        }),
        f(c, function(s, n) {
          var a = n.props,
            o = n.cache,
            l = n.to,
            c = n.from;
          (h.fn[s] = function(s) {
            if ((l && !this[o] && (this[o] = l(this._rgba)), s === e))
              return this[o].slice();
            var n,
              r = t.type(s),
              u = 'array' === r || 'object' === r ? s : arguments,
              d = this[o].slice();
            return (
              f(a, function(t, e) {
                var s = u['object' === r ? t : e.idx];
                null == s && (s = d[e.idx]), (d[e.idx] = i(s, e));
              }),
              c ? ((n = h(c(d))), (n[o] = d), n) : h(d)
            );
          }),
            f(a, function(e, i) {
              h.fn[e] ||
                (h.fn[e] = function(n) {
                  var a,
                    o = t.type(n),
                    l = 'alpha' === e ? (this._hsla ? 'hsla' : 'rgba') : s,
                    h = this[l](),
                    c = h[i.idx];
                  return 'undefined' === o
                    ? c
                    : ('function' === o &&
                        ((n = n.call(this, c)), (o = t.type(n))),
                      null == n && i.empty
                        ? this
                        : ('string' === o &&
                            ((a = r.exec(n)),
                            a &&
                              (n =
                                c +
                                parseFloat(a[2]) * ('+' === a[1] ? 1 : -1))),
                          (h[i.idx] = n),
                          this[l](h)));
                });
            });
        }),
        (h.hook = function(e) {
          var i = e.split(' ');
          f(i, function(e, i) {
            (t.cssHooks[i] = {
              set: function(e, n) {
                var a,
                  o,
                  r = '';
                if (
                  'transparent' !== n &&
                  ('string' !== t.type(n) || (a = s(n)))
                ) {
                  if (((n = h(a || n)), !d.rgba && 1 !== n._rgba[3])) {
                    for (
                      o = 'backgroundColor' === i ? e.parentNode : e;
                      ('' === r || 'transparent' === r) && o && o.style;

                    )
                      try {
                        (r = t.css(o, 'backgroundColor')), (o = o.parentNode);
                      } catch (l) {}
                    n = n.blend(r && 'transparent' !== r ? r : '_default');
                  }
                  n = n.toRgbaString();
                }
                try {
                  e.style[i] = n;
                } catch (l) {}
              },
            }),
              (t.fx.step[i] = function(e) {
                e.colorInit ||
                  ((e.start = h(e.elem, i)),
                  (e.end = h(e.end)),
                  (e.colorInit = !0)),
                  t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos));
              });
          });
        }),
        h.hook(o),
        (t.cssHooks.borderColor = {
          expand: function(t) {
            var e = {};
            return (
              f(['Top', 'Right', 'Bottom', 'Left'], function(i, s) {
                e['border' + s + 'Color'] = t;
              }),
              e
            );
          },
        }),
        (a = t.Color.names = {
          aqua: '#00ffff',
          black: '#000000',
          blue: '#0000ff',
          fuchsia: '#ff00ff',
          gray: '#808080',
          green: '#008000',
          lime: '#00ff00',
          maroon: '#800000',
          navy: '#000080',
          olive: '#808000',
          purple: '#800080',
          red: '#ff0000',
          silver: '#c0c0c0',
          teal: '#008080',
          white: '#ffffff',
          yellow: '#ffff00',
          transparent: [null, null, null, 0],
          _default: '#ffffff',
        });
    })(jQuery),
    (function() {
      function i(e) {
        var i,
          s,
          n = e.ownerDocument.defaultView
            ? e.ownerDocument.defaultView.getComputedStyle(e, null)
            : e.currentStyle,
          a = {};
        if (n && n.length && n[0] && n[n[0]])
          for (s = n.length; s--; )
            (i = n[s]), 'string' == typeof n[i] && (a[t.camelCase(i)] = n[i]);
        else for (i in n) 'string' == typeof n[i] && (a[i] = n[i]);
        return a;
      }
      function s(e, i) {
        var s,
          n,
          o = {};
        for (s in i)
          (n = i[s]),
            e[s] !== n &&
              (a[s] || ((t.fx.step[s] || !isNaN(parseFloat(n))) && (o[s] = n)));
        return o;
      }
      var n = ['add', 'remove', 'toggle'],
        a = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1,
        };
      t.each(
        [
          'borderLeftStyle',
          'borderRightStyle',
          'borderBottomStyle',
          'borderTopStyle',
        ],
        function(e, i) {
          t.fx.step[i] = function(t) {
            (('none' !== t.end && !t.setAttr) || (1 === t.pos && !t.setAttr)) &&
              (jQuery.style(t.elem, i, t.end), (t.setAttr = !0));
          };
        }
      ),
        t.fn.addBack ||
          (t.fn.addBack = function(t) {
            return this.add(
              null == t ? this.prevObject : this.prevObject.filter(t)
            );
          }),
        (t.effects.animateClass = function(e, a, o, r) {
          var l = t.speed(a, o, r);
          return this.queue(function() {
            var a,
              o = t(this),
              r = o.attr('class') || '',
              h = l.children ? o.find('*').addBack() : o;
            (h = h.map(function() {
              var e = t(this);
              return { el: e, start: i(this) };
            })),
              (a = function() {
                t.each(n, function(t, i) {
                  e[i] && o[i + 'Class'](e[i]);
                });
              }),
              a(),
              (h = h.map(function() {
                return (
                  (this.end = i(this.el[0])),
                  (this.diff = s(this.start, this.end)),
                  this
                );
              })),
              o.attr('class', r),
              (h = h.map(function() {
                var e = this,
                  i = t.Deferred(),
                  s = t.extend({}, l, {
                    queue: !1,
                    complete: function() {
                      i.resolve(e);
                    },
                  });
                return this.el.animate(this.diff, s), i.promise();
              })),
              t.when.apply(t, h.get()).done(function() {
                a(),
                  t.each(arguments, function() {
                    var e = this.el;
                    t.each(this.diff, function(t) {
                      e.css(t, '');
                    });
                  }),
                  l.complete.call(o[0]);
              });
          });
        }),
        t.fn.extend({
          addClass: (function(e) {
            return function(i, s, n, a) {
              return s
                ? t.effects.animateClass.call(this, { add: i }, s, n, a)
                : e.apply(this, arguments);
            };
          })(t.fn.addClass),
          removeClass: (function(e) {
            return function(i, s, n, a) {
              return arguments.length > 1
                ? t.effects.animateClass.call(this, { remove: i }, s, n, a)
                : e.apply(this, arguments);
            };
          })(t.fn.removeClass),
          toggleClass: (function(i) {
            return function(s, n, a, o, r) {
              return 'boolean' == typeof n || n === e
                ? a
                  ? t.effects.animateClass.call(
                      this,
                      n ? { add: s } : { remove: s },
                      a,
                      o,
                      r
                    )
                  : i.apply(this, arguments)
                : t.effects.animateClass.call(this, { toggle: s }, n, a, o);
            };
          })(t.fn.toggleClass),
          switchClass: function(e, i, s, n, a) {
            return t.effects.animateClass.call(
              this,
              { add: i, remove: e },
              s,
              n,
              a
            );
          },
        });
    })(),
    (function() {
      function s(e, i, s, n) {
        return (
          t.isPlainObject(e) && ((i = e), (e = e.effect)),
          (e = { effect: e }),
          null == i && (i = {}),
          t.isFunction(i) && ((n = i), (s = null), (i = {})),
          ('number' == typeof i || t.fx.speeds[i]) &&
            ((n = s), (s = i), (i = {})),
          t.isFunction(s) && ((n = s), (s = null)),
          i && t.extend(e, i),
          (s = s || i.duration),
          (e.duration = t.fx.off
            ? 0
            : 'number' == typeof s
              ? s
              : s in t.fx.speeds ? t.fx.speeds[s] : t.fx.speeds._default),
          (e.complete = n || i.complete),
          e
        );
      }
      function n(e) {
        return !e || 'number' == typeof e || t.fx.speeds[e]
          ? !0
          : 'string' != typeof e || t.effects.effect[e]
            ? t.isFunction(e) ? !0 : 'object' != typeof e || e.effect ? !1 : !0
            : !0;
      }
      t.extend(t.effects, {
        version: '1.10.3',
        save: function(t, e) {
          for (var s = 0; e.length > s; s++)
            null !== e[s] && t.data(i + e[s], t[0].style[e[s]]);
        },
        restore: function(t, s) {
          var n, a;
          for (a = 0; s.length > a; a++)
            null !== s[a] &&
              ((n = t.data(i + s[a])), n === e && (n = ''), t.css(s[a], n));
        },
        setMode: function(t, e) {
          return 'toggle' === e && (e = t.is(':hidden') ? 'show' : 'hide'), e;
        },
        getBaseline: function(t, e) {
          var i, s;
          switch (t[0]) {
            case 'top':
              i = 0;
              break;
            case 'middle':
              i = 0.5;
              break;
            case 'bottom':
              i = 1;
              break;
            default:
              i = t[0] / e.height;
          }
          switch (t[1]) {
            case 'left':
              s = 0;
              break;
            case 'center':
              s = 0.5;
              break;
            case 'right':
              s = 1;
              break;
            default:
              s = t[1] / e.width;
          }
          return { x: s, y: i };
        },
        createWrapper: function(e) {
          if (e.parent().is('.ui-effects-wrapper')) return e.parent();
          var i = {
              width: e.outerWidth(!0),
              height: e.outerHeight(!0),
              float: e.css('float'),
            },
            s = t('<div></div>')
              .addClass('ui-effects-wrapper')
              .css({
                fontSize: '100%',
                background: 'transparent',
                border: 'none',
                margin: 0,
                padding: 0,
              }),
            n = { width: e.width(), height: e.height() },
            a = document.activeElement;
          try {
            a.id;
          } catch (o) {
            a = document.body;
          }
          return (
            e.wrap(s),
            (e[0] === a || t.contains(e[0], a)) && t(a).focus(),
            (s = e.parent()),
            'static' === e.css('position')
              ? (s.css({ position: 'relative' }),
                e.css({ position: 'relative' }))
              : (t.extend(i, {
                  position: e.css('position'),
                  zIndex: e.css('z-index'),
                }),
                t.each(['top', 'left', 'bottom', 'right'], function(t, s) {
                  (i[s] = e.css(s)),
                    isNaN(parseInt(i[s], 10)) && (i[s] = 'auto');
                }),
                e.css({
                  position: 'relative',
                  top: 0,
                  left: 0,
                  right: 'auto',
                  bottom: 'auto',
                })),
            e.css(n),
            s.css(i).show()
          );
        },
        removeWrapper: function(e) {
          var i = document.activeElement;
          return (
            e.parent().is('.ui-effects-wrapper') &&
              (e.parent().replaceWith(e),
              (e[0] === i || t.contains(e[0], i)) && t(i).focus()),
            e
          );
        },
        setTransition: function(e, i, s, n) {
          return (
            (n = n || {}),
            t.each(i, function(t, i) {
              var a = e.cssUnit(i);
              a[0] > 0 && (n[i] = a[0] * s + a[1]);
            }),
            n
          );
        },
      }),
        t.fn.extend({
          effect: function() {
            function e(e) {
              function s() {
                t.isFunction(a) && a.call(n[0]), t.isFunction(e) && e();
              }
              var n = t(this),
                a = i.complete,
                r = i.mode;
              (n.is(':hidden') ? 'hide' === r : 'show' === r)
                ? (n[r](), s())
                : o.call(n[0], i, s);
            }
            var i = s.apply(this, arguments),
              n = i.mode,
              a = i.queue,
              o = t.effects.effect[i.effect];
            return t.fx.off || !o
              ? n
                ? this[n](i.duration, i.complete)
                : this.each(function() {
                    i.complete && i.complete.call(this);
                  })
              : a === !1 ? this.each(e) : this.queue(a || 'fx', e);
          },
          show: (function(t) {
            return function(e) {
              if (n(e)) return t.apply(this, arguments);
              var i = s.apply(this, arguments);
              return (i.mode = 'show'), this.effect.call(this, i);
            };
          })(t.fn.show),
          hide: (function(t) {
            return function(e) {
              if (n(e)) return t.apply(this, arguments);
              var i = s.apply(this, arguments);
              return (i.mode = 'hide'), this.effect.call(this, i);
            };
          })(t.fn.hide),
          toggle: (function(t) {
            return function(e) {
              if (n(e) || 'boolean' == typeof e)
                return t.apply(this, arguments);
              var i = s.apply(this, arguments);
              return (i.mode = 'toggle'), this.effect.call(this, i);
            };
          })(t.fn.toggle),
          cssUnit: function(e) {
            var i = this.css(e),
              s = [];
            return (
              t.each(['em', 'px', '%', 'pt'], function(t, e) {
                i.indexOf(e) > 0 && (s = [parseFloat(i), e]);
              }),
              s
            );
          },
        });
    })(),
    (function() {
      var e = {};
      t.each(['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'], function(t, i) {
        e[i] = function(e) {
          return Math.pow(e, t + 2);
        };
      }),
        t.extend(e, {
          Sine: function(t) {
            return 1 - Math.cos(t * Math.PI / 2);
          },
          Circ: function(t) {
            return 1 - Math.sqrt(1 - t * t);
          },
          Elastic: function(t) {
            return 0 === t || 1 === t
              ? t
              : -Math.pow(2, 8 * (t - 1)) *
                Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15);
          },
          Back: function(t) {
            return t * t * (3 * t - 2);
          },
          Bounce: function(t) {
            for (var e, i = 4; ((e = Math.pow(2, --i)) - 1) / 11 > t; );
            return (
              1 / Math.pow(4, 3 - i) -
              7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
            );
          },
        }),
        t.each(e, function(e, i) {
          (t.easing['easeIn' + e] = i),
            (t.easing['easeOut' + e] = function(t) {
              return 1 - i(1 - t);
            }),
            (t.easing['easeInOut' + e] = function(t) {
              return 0.5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2;
            });
        });
    })();
})(jQuery);
(function(t) {
  t.effects.effect.fade = function(e, i) {
    var s = t(this),
      n = t.effects.setMode(s, e.mode || 'toggle');
    s.animate(
      { opacity: n },
      { queue: !1, duration: e.duration, easing: e.easing, complete: i }
    );
  };
})(jQuery);
