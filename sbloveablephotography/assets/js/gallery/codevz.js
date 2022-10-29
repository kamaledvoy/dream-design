(function ($) {
  $.fn.superfish = function (op) {
    var sf = $.fn.superfish,
      c = sf.c,
      $arrow = $([""].join("")),
      over = function () {
        var $$ = $(this),
          menu = getMenu($$);
        clearTimeout(menu.sfTimer);
        $$.showSuperfishUl().siblings().hideSuperfishUl();
      },
      out = function () {
        var $$ = $(this),
          menu = getMenu($$),
          o = sf.op;
        clearTimeout(menu.sfTimer);
        menu.sfTimer = setTimeout(function () {
          o.retainPath = $.inArray($$[0], o.$path) > -1;
          $$.hideSuperfishUl();
          if (
            o.$path.length &&
            $$.parents(["li.", o.hoverClass].join("")).length < 1
          ) {
            over.call(o.$path);
          }
        }, o.delay);
      },
      getMenu = function ($menu) {
        var menu = $menu.parents(["ul.", c.menuClass, ":first"].join(""))[0];
        sf.op = sf.o[menu.serial];
        return menu;
      },
      addArrow = function ($a) {
        $a.addClass(c.anchorClass).append($arrow.clone());
      };
    return this.each(function () {
      var s = (this.serial = sf.o.length);
      var o = $.extend({}, sf.defaults, op);
      o.$path = $("li." + o.pathClass, this)
        .slice(0, o.pathLevels)
        .each(function () {
          $(this)
            .addClass([o.hoverClass, c.bcClass].join(" "))
            .filter("li:has(ul)")
            .removeClass(o.pathClass);
        });
      sf.o[s] = sf.op = o;
      $("li:has(ul)", this)
        [$.fn.hoverIntent && !o.disableHI ? "hoverIntent" : "hover"](over, out)
        .each(function () {
          if (o.autoArrows) addArrow($(">a:first-child", this));
        })
        .not("." + c.bcClass)
        .hideSuperfishUl();
      var $a = $("a", this);
      $a.each(function (i) {
        var $li = $a.eq(i).parents("li");
        $a.eq(i)
          .focus(function () {
            over.call($li);
          })
          .blur(function () {
            out.call($li);
          });
      });
      o.onInit.call(this);
    }).each(function () {
      var menuClasses = [c.menuClass];
      if (sf.op.dropShadows && !($.browser.msie && $.browser.version < 7))
        menuClasses.push(c.shadowClass);
      $(this).addClass(menuClasses.join(" "));
    });
  };
  var sf = $.fn.superfish;
  sf.o = [];
  sf.op = {};
  sf.IE7fix = function () {
    var o = sf.op;
    if (
      $.browser.msie &&
      $.browser.version > 6 &&
      o.dropShadows &&
      o.animation.opacity != undefined
    )
      this.toggleClass(sf.c.shadowClass + "-off");
  };
  sf.c = {
    bcClass: "sf-breadcrumb",
    menuClass: "sf-js-enabled",
    anchorClass: "sf-with-ul",
    arrowClass: "sf-sub-indicator",
    shadowClass: "sf-shadow",
  };
  sf.defaults = {
    hoverClass: "sfHover",
    pathClass: "overideThisToUse",
    pathLevels: 1,
    delay: 800,
    animation: { opacity: "show" },
    speed: "normal",
    autoArrows: true,
    dropShadows: true,
    disableHI: false,
    onInit: function () {},
    onBeforeShow: function () {},
    onShow: function () {},
    onHide: function () {},
  };
  $.fn.extend({
    hideSuperfishUl: function () {
      var o = sf.op,
        not = o.retainPath === true ? o.$path : "";
      o.retainPath = false;
      var $ul = $(["li.", o.hoverClass].join(""), this)
        .add(this)
        .not(not)
        .removeClass(o.hoverClass)
        .find(">ul")
        .hide()
        .css("visibility", "hidden");
      o.onHide.call($ul);
      return this;
    },
    showSuperfishUl: function () {
      var o = sf.op,
        sh = sf.c.shadowClass + "-off",
        $ul = this.addClass(o.hoverClass)
          .find(">ul:hidden")
          .css("visibility", "visible");
      sf.IE7fix.call($ul);
      o.onBeforeShow.call($ul);
      $ul.animate(o.animation, o.speed, function () {
        sf.IE7fix.call($ul);
        o.onShow.call($ul);
      });
      return this;
    },
  });
})(jQuery);
(function (jQuery) {
  jQuery.fn.lavaLamp = function (o) {
    o = jQuery.extend(
      {
        fx: "swing",
        speed: 500,
        click: function () {
          return true;
        },
        startItem: "no",
        autoReturn: true,
        returnDelay: 0,
        setOnClick: true,
        homeTop: 0,
        homeLeft: 0,
        homeWidth: 0,
        homeHeight: 0,
        returnHome: false,
      },
      o || {}
    );
    var $home;
    if (o.homeTop || o.homeLeft) {
      $home = jQuery('<li class="current"></li>').css({
        left: o.homeLeft,
        top: o.homeTop,
        width: o.homeWidth,
        height: o.homeHeight,
        position: "absolute",
      });
      jQuery(this).prepend($home);
    }
    return this.each(function () {
      var path = location.pathname + location.search + location.hash;
      var $selected = new Object();
      var delayTimer;
      var $back;
      var ce;
      jQuery.expr[":"].parents = function (a, i, m) {
        return jQuery(a).parents(m[3]).length < 1;
      };
      var $li = jQuery("li", this).filter(":parents(ul ul, .sub-menu)");
      if (o.startItem == "no")
        $selected = jQuery('li a[href$="' + path + '"]', this).parent("li");
      if ($selected.length == 0 && o.startItem == "no")
        $selected = jQuery(
          'li a[href$="' +
            location.pathname.substring(
              location.pathname.lastIndexOf("/") + 1
            ) +
            location.search +
            location.hash +
            '"]',
          this
        ).parent("li");
      if ($selected.length == 0 || o.startItem != "no") {
        if (o.startItem == "no") o.startItem = 0;
        $selected = jQuery($li[o.startItem]);
      }
      ce =
        jQuery("li.selectedLava", this)[0] ||
        jQuery($selected).addClass("selectedLava")[0];
      $li.mouseenter(function () {
        if (jQuery(this).hasClass("homeLava")) {
          ce = jQuery(this)[0];
        }
        move(this);
      });
      $back = jQuery('<li class="back"><div class="left"></div></li>').appendTo(
        this
      );
      jQuery(this).mouseleave(function () {
        if (o.autoReturn) {
          if (o.returnHome && $home) {
            move($home[0]);
          } else if (o.returnDelay) {
            if (delayTimer) clearTimeout(delayTimer);
            delayTimer = setTimeout(function () {
              move(null);
            }, o.returnDelay + o.speed);
          } else {
            move(null);
          }
        }
      });
      $li.click(function (e) {
        if (o.setOnClick) {
          jQuery(ce).removeClass("selectedLava");
          jQuery(this).addClass("selectedLava");
          ce = this;
        }
        return o.click.apply(this, [e, this]);
      });
      if (o.homeTop || o.homeLeft)
        $back.css({
          left: o.homeLeft,
          width: o.homeWidth,
          height: o.homeHeight,
        });
      else
        $back.css({
          left: ce.offsetLeft,
          width: ce.offsetWidth,
          height: ce.offsetHeight,
        });
      function move(el) {
        if (!el) el = ce;
        var bx = 0,
          by = 0;
        if (!jQuery.browser.msie) {
          bx = ($back.outerWidth() - $back.innerWidth()) / 2;
          by = ($back.outerHeight() - $back.innerHeight()) / 2;
        }
        $back
          .stop()
          .animate(
            {
              left: el.offsetLeft - bx,
              width: el.offsetWidth,
              height: el.offsetHeight,
            },
            o.speed,
            o.fx
          );
      }
    });
  };
})(jQuery);
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function (x, t, b, c, d) {
    return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
  },
  easeInQuad: function (x, t, b, c, d) {
    return c * (t /= d) * t + b;
  },
  easeOutQuad: function (x, t, b, c, d) {
    return -c * (t /= d) * (t - 2) + b;
  },
  easeInOutQuad: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
    return (-c / 2) * (--t * (t - 2) - 1) + b;
  },
  easeInCubic: function (x, t, b, c, d) {
    return c * (t /= d) * t * t + b;
  },
  easeOutCubic: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t + 1) + b;
  },
  easeInOutCubic: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t + 2) + b;
  },
  easeInQuart: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t + b;
  },
  easeOutQuart: function (x, t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  },
  easeInOutQuart: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  },
  easeInQuint: function (x, t, b, c, d) {
    return c * (t /= d) * t * t * t * t + b;
  },
  easeOutQuint: function (x, t, b, c, d) {
    return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
  },
  easeInOutQuint: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t * t + b;
    return (c / 2) * ((t -= 2) * t * t * t * t + 2) + b;
  },
  easeInSine: function (x, t, b, c, d) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },
  easeOutSine: function (x, t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },
  easeInOutSine: function (x, t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },
  easeInExpo: function (x, t, b, c, d) {
    return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
  },
  easeOutExpo: function (x, t, b, c, d) {
    return t == d ? b + c : c * (-Math.pow(2, (-10 * t) / d) + 1) + b;
  },
  easeInOutExpo: function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  },
  easeInCirc: function (x, t, b, c, d) {
    return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
  },
  easeOutCirc: function (x, t, b, c, d) {
    return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
  },
  easeInOutCirc: function (x, t, b, c, d) {
    if ((t /= d / 2) < 1) return (-c / 2) * (Math.sqrt(1 - t * t) - 1) + b;
    return (c / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
  },
  easeInElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },
  easeOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d) == 1) return b + c;
    if (!p) p = d * 0.3;
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },
  easeInOutElastic: function (x, t, b, c, d) {
    var s = 1.70158;
    var p = 0;
    var a = c;
    if (t == 0) return b;
    if ((t /= d / 2) == 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    if (a < Math.abs(c)) {
      a = c;
      var s = p / 4;
    } else var s = (p / (2 * Math.PI)) * Math.asin(c / a);
    if (t < 1)
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
      c +
      b
    );
  },
  easeInBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * (t /= d) * t * ((s + 1) * t - s) + b;
  },
  easeOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
  },
  easeInOutBack: function (x, t, b, c, d, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= d / 2) < 1)
      return (c / 2) * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
    return (c / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
  },
  easeInBounce: function (x, t, b, c, d) {
    return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
  },
  easeOutBounce: function (x, t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInOutBounce: function (x, t, b, c, d) {
    if (t < d / 2)
      return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * 0.5 + b;
    return (
      jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
    );
  },
});
(function ($) {
  $.fn.jflickrfeed = function (settings, callback) {
    settings = $.extend(
      true,
      {
        flickrbase: "http://api.flickr.com/services/feeds/",
        feedapi: "photos_public.gne",
        limit: 20,
        qstrings: { lang: "en-us", format: "json", jsoncallback: "?" },
        cleanDescription: true,
        useTemplate: true,
        itemTemplate: "",
        itemCallback: function () {},
      },
      settings
    );
    var url = settings.flickrbase + settings.feedapi + "?";
    var first = true;
    for (var key in settings.qstrings) {
      if (!first) url += "&";
      url += key + "=" + settings.qstrings[key];
      first = false;
    }
    return $(this).each(function () {
      var $container = $(this);
      var container = this;
      $.getJSON(url, function (data) {
        $.each(data.items, function (i, item) {
          if (i < settings.limit) {
            if (settings.cleanDescription) {
              var regex = /<p>(.*?)<\/p>/g;
              var input = item.description;
              if (regex.test(input)) {
                item.description = input.match(regex)[2];
                if (item.description != undefined)
                  item.description = item.description
                    .replace("<p>", "")
                    .replace("</p>", "");
              }
            }
            item["image_s"] = item.media.m.replace("_m", "_s");
            item["image_t"] = item.media.m.replace("_m", "_t");
            item["image_m"] = item.media.m.replace("_m", "_m");
            item["image"] = item.media.m.replace("_m", "");
            item["image_b"] = item.media.m.replace("_m", "_b");
            delete item.media;
            if (settings.useTemplate) {
              var template = settings.itemTemplate;
              for (var key in item) {
                var rgx = new RegExp("{{" + key + "}}", "g");
                template = template.replace(rgx, item[key]);
              }
              $container.append(template);
            }
            settings.itemCallback.call(container, item);
          }
        });
        if ($.isFunction(callback)) {
          callback.call(container, data);
        }
      });
    });
  };
})(jQuery);
(function (e) {
  e.fn.superfish = function (t) {
    var n = e.fn.superfish,
      r = n.c,
      i = e([""].join("")),
      s = function () {
        var t = e(this),
          n = u(t);
        clearTimeout(n.sfTimer);
        t.showSuperfishUl().siblings().hideSuperfishUl();
      },
      o = function () {
        var t = e(this),
          r = u(t),
          i = n.op;
        clearTimeout(r.sfTimer);
        r.sfTimer = setTimeout(function () {
          i.retainPath = e.inArray(t[0], i.$path) > -1;
          t.hideSuperfishUl();
          if (
            i.$path.length &&
            t.parents(["li.", i.hoverClass].join("")).length < 1
          ) {
            s.call(i.$path);
          }
        }, i.delay);
      },
      u = function (e) {
        var t = e.parents(["ul.", r.menuClass, ":first"].join(""))[0];
        n.op = n.o[t.serial];
        return t;
      },
      a = function (e) {
        e.addClass(r.anchorClass).append(i.clone());
      };
    return this.each(function () {
      var i = (this.serial = n.o.length);
      var u = e.extend({}, n.defaults, t);
      u.$path = e("li." + u.pathClass, this)
        .slice(0, u.pathLevels)
        .each(function () {
          e(this)
            .addClass([u.hoverClass, r.bcClass].join(" "))
            .filter("li:has(ul)")
            .removeClass(u.pathClass);
        });
      n.o[i] = n.op = u;
      e("li:has(ul)", this)
        [e.fn.hoverIntent && !u.disableHI ? "hoverIntent" : "hover"](s, o)
        .each(function () {
          if (u.autoArrows) a(e(">a:first-child", this));
        })
        .not("." + r.bcClass)
        .hideSuperfishUl();
      var f = e("a", this);
      f.each(function (e) {
        var t = f.eq(e).parents("li");
        f.eq(e)
          .focus(function () {
            s.call(t);
          })
          .blur(function () {
            o.call(t);
          });
      });
      u.onInit.call(this);
    }).each(function () {
      var t = [r.menuClass];
      if (n.op.dropShadows && !(e.browser.msie && e.browser.version < 7))
        t.push(r.shadowClass);
      e(this).addClass(t.join(" "));
    });
  };
  var t = e.fn.superfish;
  t.o = [];
  t.op = {};
  t.IE7fix = function () {
    var n = t.op;
    if (
      e.browser.msie &&
      e.browser.version > 6 &&
      n.dropShadows &&
      n.animation.opacity != undefined
    )
      this.toggleClass(t.c.shadowClass + "-off");
  };
  t.c = {
    bcClass: "sf-breadcrumb",
    menuClass: "sf-js-enabled",
    anchorClass: "sf-with-ul",
    arrowClass: "sf-sub-indicator",
    shadowClass: "sf-shadow",
  };
  t.defaults = {
    hoverClass: "sfHover",
    pathClass: "overideThisToUse",
    pathLevels: 1,
    delay: 800,
    animation: { opacity: "show" },
    speed: "normal",
    autoArrows: true,
    dropShadows: true,
    disableHI: false,
    onInit: function () {},
    onBeforeShow: function () {},
    onShow: function () {},
    onHide: function () {},
  };
  e.fn.extend({
    hideSuperfishUl: function () {
      var n = t.op,
        r = n.retainPath === true ? n.$path : "";
      n.retainPath = false;
      var i = e(["li.", n.hoverClass].join(""), this)
        .add(this)
        .not(r)
        .removeClass(n.hoverClass)
        .find(">ul")
        .hide()
        .css("visibility", "hidden");
      n.onHide.call(i);
      return this;
    },
    showSuperfishUl: function () {
      var e = t.op,
        n = t.c.shadowClass + "-off",
        r = this.addClass(e.hoverClass)
          .find(">ul:hidden")
          .css("visibility", "visible");
      t.IE7fix.call(r);
      e.onBeforeShow.call(r);
      r.animate(e.animation, e.speed, function () {
        t.IE7fix.call(r);
        e.onShow.call(r);
      });
      return this;
    },
  });
})(jQuery);
(function (e) {
  e.fn.lavaLamp = function (t) {
    t = e.extend(
      {
        fx: "swing",
        speed: 500,
        click: function () {
          return true;
        },
        startItem: "no",
        autoReturn: true,
        returnDelay: 0,
        setOnClick: true,
        homeTop: 0,
        homeLeft: 0,
        homeWidth: 0,
        homeHeight: 0,
        returnHome: false,
      },
      t || {}
    );
    var n;
    if (t.homeTop || t.homeLeft) {
      n = e('<li class="current"></li>').css({
        left: t.homeLeft,
        top: t.homeTop,
        width: t.homeWidth,
        height: t.homeHeight,
        position: "absolute",
      });
      e(this).prepend(n);
    }
    return this.each(function () {
      function l(n) {
        if (!n) n = a;
        var r = 0,
          i = 0;
        if (!e.browser.msie) {
          r = (u.outerWidth() - u.innerWidth()) / 2;
          i = (u.outerHeight() - u.innerHeight()) / 2;
        }
        u.stop().animate(
          {
            left: n.offsetLeft - r,
            width: n.offsetWidth,
            height: n.offsetHeight,
          },
          t.speed,
          t.fx
        );
      }
      var r = location.pathname + location.search + location.hash;
      var i = new Object();
      var s;
      var u;
      var a;
      e.expr[":"].parents = function (t, n, r) {
        return e(t).parents(r[3]).length < 1;
      };
      var f = e("li", this).filter(":parents(ul ul, .sub-menu)");
      if (t.startItem == "no")
        i = e('li a[href$="' + r + '"]', this).parent("li");
      if (i.length == 0 && t.startItem == "no")
        i = e(
          'li a[href$="' +
            location.pathname.substring(
              location.pathname.lastIndexOf("/") + 1
            ) +
            location.search +
            location.hash +
            '"]',
          this
        ).parent("li");
      if (i.length == 0 || t.startItem != "no") {
        if (t.startItem == "no") t.startItem = 0;
        i = e(f[t.startItem]);
      }
      a = e("li.selectedLava", this)[0] || e(i).addClass("selectedLava")[0];
      f.mouseenter(function () {
        if (e(this).hasClass("homeLava")) {
          a = e(this)[0];
        }
        l(this);
      });
      u = e('<li class="back"><div class="left"></div></li>').appendTo(this);
      e(this).mouseleave(function () {
        if (t.autoReturn) {
          if (t.returnHome && n) {
            l(n[0]);
          } else if (t.returnDelay) {
            if (s) clearTimeout(s);
            s = setTimeout(function () {
              l(null);
            }, t.returnDelay + t.speed);
          } else {
            l(null);
          }
        }
      });
      f.click(function (n) {
        if (t.setOnClick) {
          e(a).removeClass("selectedLava");
          e(this).addClass("selectedLava");
          a = this;
        }
        return t.click.apply(this, [n, this]);
      });
      if (t.homeTop || t.homeLeft)
        u.css({ left: t.homeLeft, width: t.homeWidth, height: t.homeHeight });
      else
        u.css({
          left: a.offsetLeft,
          width: a.offsetWidth,
          height: a.offsetHeight,
        });
    });
  };
})(jQuery);
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
  def: "easeOutQuad",
  swing: function (e, t, n, r, i) {
    return jQuery.easing[jQuery.easing.def](e, t, n, r, i);
  },
  easeInQuad: function (e, t, n, r, i) {
    return r * (t /= i) * t + n;
  },
  easeOutQuad: function (e, t, n, r, i) {
    return -r * (t /= i) * (t - 2) + n;
  },
  easeInOutQuad: function (e, t, n, r, i) {
    if ((t /= i / 2) < 1) return (r / 2) * t * t + n;
    return (-r / 2) * (--t * (t - 2) - 1) + n;
  },
  easeInCubic: function (e, t, n, r, i) {
    return r * (t /= i) * t * t + n;
  },
  easeOutCubic: function (e, t, n, r, i) {
    return r * ((t = t / i - 1) * t * t + 1) + n;
  },
  easeInOutCubic: function (e, t, n, r, i) {
    if ((t /= i / 2) < 1) return (r / 2) * t * t * t + n;
    return (r / 2) * ((t -= 2) * t * t + 2) + n;
  },
  easeInQuart: function (e, t, n, r, i) {
    return r * (t /= i) * t * t * t + n;
  },
  easeOutQuart: function (e, t, n, r, i) {
    return -r * ((t = t / i - 1) * t * t * t - 1) + n;
  },
  easeInOutQuart: function (e, t, n, r, i) {
    if ((t /= i / 2) < 1) return (r / 2) * t * t * t * t + n;
    return (-r / 2) * ((t -= 2) * t * t * t - 2) + n;
  },
  easeInQuint: function (e, t, n, r, i) {
    return r * (t /= i) * t * t * t * t + n;
  },
  easeOutQuint: function (e, t, n, r, i) {
    return r * ((t = t / i - 1) * t * t * t * t + 1) + n;
  },
  easeInOutQuint: function (e, t, n, r, i) {
    if ((t /= i / 2) < 1) return (r / 2) * t * t * t * t * t + n;
    return (r / 2) * ((t -= 2) * t * t * t * t + 2) + n;
  },
  easeInSine: function (e, t, n, r, i) {
    return -r * Math.cos((t / i) * (Math.PI / 2)) + r + n;
  },
  easeOutSine: function (e, t, n, r, i) {
    return r * Math.sin((t / i) * (Math.PI / 2)) + n;
  },
  easeInOutSine: function (e, t, n, r, i) {
    return (-r / 2) * (Math.cos((Math.PI * t) / i) - 1) + n;
  },
  easeInExpo: function (e, t, n, r, i) {
    return t == 0 ? n : r * Math.pow(2, 10 * (t / i - 1)) + n;
  },
  easeOutExpo: function (e, t, n, r, i) {
    return t == i ? n + r : r * (-Math.pow(2, (-10 * t) / i) + 1) + n;
  },
  easeInOutExpo: function (e, t, n, r, i) {
    if (t == 0) return n;
    if (t == i) return n + r;
    if ((t /= i / 2) < 1) return (r / 2) * Math.pow(2, 10 * (t - 1)) + n;
    return (r / 2) * (-Math.pow(2, -10 * --t) + 2) + n;
  },
  easeInCirc: function (e, t, n, r, i) {
    return -r * (Math.sqrt(1 - (t /= i) * t) - 1) + n;
  },
  easeOutCirc: function (e, t, n, r, i) {
    return r * Math.sqrt(1 - (t = t / i - 1) * t) + n;
  },
  easeInOutCirc: function (e, t, n, r, i) {
    if ((t /= i / 2) < 1) return (-r / 2) * (Math.sqrt(1 - t * t) - 1) + n;
    return (r / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + n;
  },
  easeInElastic: function (e, t, n, r, i) {
    var s = 1.70158;
    var o = 0;
    var u = r;
    if (t == 0) return n;
    if ((t /= i) == 1) return n + r;
    if (!o) o = i * 0.3;
    if (u < Math.abs(r)) {
      u = r;
      var s = o / 4;
    } else var s = (o / (2 * Math.PI)) * Math.asin(r / u);
    return (
      -(
        u *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * i - s) * 2 * Math.PI) / o)
      ) + n
    );
  },
  easeOutElastic: function (e, t, n, r, i) {
    var s = 1.70158;
    var o = 0;
    var u = r;
    if (t == 0) return n;
    if ((t /= i) == 1) return n + r;
    if (!o) o = i * 0.3;
    if (u < Math.abs(r)) {
      u = r;
      var s = o / 4;
    } else var s = (o / (2 * Math.PI)) * Math.asin(r / u);
    return (
      u * Math.pow(2, -10 * t) * Math.sin(((t * i - s) * 2 * Math.PI) / o) +
      r +
      n
    );
  },
  easeInOutElastic: function (e, t, n, r, i) {
    var s = 1.70158;
    var o = 0;
    var u = r;
    if (t == 0) return n;
    if ((t /= i / 2) == 2) return n + r;
    if (!o) o = i * 0.3 * 1.5;
    if (u < Math.abs(r)) {
      u = r;
      var s = o / 4;
    } else var s = (o / (2 * Math.PI)) * Math.asin(r / u);
    if (t < 1)
      return (
        -0.5 *
          u *
          Math.pow(2, 10 * (t -= 1)) *
          Math.sin(((t * i - s) * 2 * Math.PI) / o) +
        n
      );
    return (
      u *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * i - s) * 2 * Math.PI) / o) *
        0.5 +
      r +
      n
    );
  },
  easeInBack: function (e, t, n, r, i, s) {
    if (s == undefined) s = 1.70158;
    return r * (t /= i) * t * ((s + 1) * t - s) + n;
  },
  easeOutBack: function (e, t, n, r, i, s) {
    if (s == undefined) s = 1.70158;
    return r * ((t = t / i - 1) * t * ((s + 1) * t + s) + 1) + n;
  },
  easeInOutBack: function (e, t, n, r, i, s) {
    if (s == undefined) s = 1.70158;
    if ((t /= i / 2) < 1)
      return (r / 2) * t * t * (((s *= 1.525) + 1) * t - s) + n;
    return (r / 2) * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + n;
  },
  easeInBounce: function (e, t, n, r, i) {
    return r - jQuery.easing.easeOutBounce(e, i - t, 0, r, i) + n;
  },
  easeOutBounce: function (e, t, n, r, i) {
    if ((t /= i) < 1 / 2.75) {
      return r * 7.5625 * t * t + n;
    } else if (t < 2 / 2.75) {
      return r * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + n;
    } else if (t < 2.5 / 2.75) {
      return r * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + n;
    } else {
      return r * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + n;
    }
  },
  easeInOutBounce: function (e, t, n, r, i) {
    if (t < i / 2)
      return jQuery.easing.easeInBounce(e, t * 2, 0, r, i) * 0.5 + n;
    return (
      jQuery.easing.easeOutBounce(e, t * 2 - i, 0, r, i) * 0.5 + r * 0.5 + n
    );
  },
});
(function (e) {
  e.fn.jflickrfeed = function (t, n) {
    t = e.extend(
      true,
      {
        flickrbase: "http://api.flickr.com/services/feeds/",
        feedapi: "photos_public.gne",
        limit: 20,
        qstrings: { lang: "en-us", format: "json", jsoncallback: "?" },
        cleanDescription: true,
        useTemplate: true,
        itemTemplate: "",
        itemCallback: function () {},
      },
      t
    );
    var r = t.flickrbase + t.feedapi + "?";
    var i = true;
    for (var s in t.qstrings) {
      if (!i) r += "&";
      r += s + "=" + t.qstrings[s];
      i = false;
    }
    return e(this).each(function () {
      var i = e(this);
      var s = this;
      e.getJSON(r, function (r) {
        e.each(r.items, function (e, n) {
          if (e < t.limit) {
            if (t.cleanDescription) {
              var r = /<p>(.*?)<\/p>/g;
              var o = n.description;
              if (r.test(o)) {
                n.description = o.match(r)[2];
                if (n.description != undefined)
                  n.description = n.description
                    .replace("<p>", "")
                    .replace("</p>", "");
              }
            }
            n["image_s"] = n.media.m.replace("_m", "_s");
            n["image_t"] = n.media.m.replace("_m", "_t");
            n["image_m"] = n.media.m.replace("_m", "_m");
            n["image"] = n.media.m.replace("_m", "");
            n["image_b"] = n.media.m.replace("_m", "_b");
            delete n.media;
            if (t.useTemplate) {
              var u = t.itemTemplate;
              for (var a in n) {
                var f = new RegExp("{{" + a + "}}", "g");
                u = u.replace(f, n[a]);
              }
              i.append(u);
            }
            t.itemCallback.call(s, n);
          }
        });
        if (e.isFunction(n)) {
          n.call(s, r);
        }
      });
    });
  };
})(jQuery);
(function (e) {
  function t(t, n) {
    return parseInt(e.css(t[0], n)) || 0;
  }
  function n(e) {
    return e[0].offsetWidth + t(e, "marginLeft") + t(e, "marginRight");
  }
  function r(e) {
    return e[0].offsetHeight + t(e, "marginTop") + t(e, "marginBottom");
  }
  e.fn.jCarouselLite = function (t) {
    t = e.extend(
      {
        btnPrev: null,
        btnNext: null,
        btnGo: null,
        mouseWheel: false,
        auto: null,
        hoverPause: false,
        speed: 200,
        easing: null,
        vertical: false,
        circular: true,
        visible: 3,
        start: 0,
        scroll: 1,
        beforeStart: null,
        afterEnd: null,
      },
      t || {}
    );
    return this.each(function () {
      function w() {
        E();
        b = setInterval(function () {
          x(v + t.scroll);
        }, t.auto + t.speed);
      }
      function E() {
        clearInterval(b);
      }
      function S() {
        return p.slice(v).slice(0, h);
      }
      function x(n) {
        if (!i) {
          if (t.beforeStart) t.beforeStart.call(this, S());
          if (t.circular) {
            if (n < 0) {
              f.css(s, -((v + c) * m) + "px");
              v = n + c;
            } else if (n > d - h) {
              f.css(s, -((v - c) * m) + "px");
              v = n - c;
            } else v = n;
          } else {
            if (n < 0 || n > d - h) return;
            else v = n;
          }
          i = true;
          f.animate(
            s == "left" ? { left: -(v * m) } : { top: -(v * m) },
            t.speed,
            t.easing,
            function () {
              if (t.afterEnd) t.afterEnd.call(this, S());
              i = false;
            }
          );
          if (!t.circular) {
            e(t.btnPrev + "," + t.btnNext).removeClass("disabled");
            e(
              (v - t.scroll < 0 && t.btnPrev) ||
                (v + t.scroll > d - h && t.btnNext) ||
                []
            ).addClass("disabled");
          }
        }
        return false;
      }
      var i = false,
        s = t.vertical ? "top" : "left",
        u = t.vertical ? "height" : "width";
      var a = e(this),
        f = e("ul", a),
        l = e("li", f),
        c = l.size(),
        h = t.visible;
      if (t.circular) {
        f.prepend(l.slice(c - h + 1).clone()).append(
          l.slice(0, t.scroll).clone()
        );
        t.start += h - 1;
      }
      var p = e("li", f),
        d = p.size(),
        v = t.start;
      a.css("visibility", "visible");
      p.css({ overflow: "hidden", float: t.vertical ? "none" : "left" });
      f.css({
        margin: "0",
        padding: "0",
        position: "relative",
        "list-style-type": "none",
        "z-index": "1",
      });
      a.css({
        overflow: "hidden",
        position: "relative",
        "z-index": "2",
        left: "0px",
      });
      var m = t.vertical ? r(p) : n(p);
      var g = m * d;
      var y = m * h;
      p.css({ width: p.width(), height: p.height() });
      f.css(u, g + "px").css(s, -(v * m));
      a.css(u, y + "px");
      if (t.btnPrev) {
        e(t.btnPrev).click(function () {
          return x(v - t.scroll);
        });
        if (t.hoverPause) {
          e(t.btnPrev).hover(
            function () {
              E();
            },
            function () {
              w();
            }
          );
        }
      }
      if (t.btnNext) {
        e(t.btnNext).click(function () {
          return x(v + t.scroll);
        });
        if (t.hoverPause) {
          e(t.btnNext).hover(
            function () {
              E();
            },
            function () {
              w();
            }
          );
        }
      }
      if (t.btnGo)
        e.each(t.btnGo, function (n, r) {
          e(r).click(function () {
            return x(t.circular ? t.visible + n : n);
          });
        });
      if (t.mouseWheel && a.mousewheel)
        a.mousewheel(function (e, n) {
          return n > 0 ? x(v - t.scroll) : x(v + t.scroll);
        });
      var b;
      if (t.auto) {
        if (t.hoverPause) {
          a.hover(
            function () {
              E();
            },
            function () {
              w();
            }
          );
        }
        w();
      }
    });
  };
})(jQuery);
(function (e) {
  function t(e) {
    if (e.attr("title") || typeof e.attr("original-title") != "string") {
      e.attr("original-title", e.attr("title") || "").removeAttr("title");
    }
  }
  function n(n, r) {
    this.$element = e(n);
    this.options = r;
    this.enabled = true;
    t(this.$element);
  }
  n.prototype = {
    show: function () {
      var t = this.getTitle();
      if (t && this.enabled) {
        var n = this.tip();
        n.find(".tipsy-inner")[this.options.html ? "html" : "text"](t);
        n[0].className = "tipsy";
        n.remove()
          .css({ top: 0, left: 0, visibility: "hidden", display: "block" })
          .appendTo(document.body);
        var r = e.extend({}, this.$element.offset(), {
          width: this.$element[0].offsetWidth,
          height: this.$element[0].offsetHeight,
        });
        var i = n[0].offsetWidth,
          s = n[0].offsetHeight;
        var o =
          typeof this.options.gravity == "function"
            ? this.options.gravity.call(this.$element[0])
            : this.options.gravity;
        var u;
        switch (o.charAt(0)) {
          case "n":
            u = {
              top: r.top + r.height + this.options.offset,
              left: r.left + r.width / 2 - i / 2,
            };
            break;
          case "s":
            u = {
              top: r.top - s - this.options.offset,
              left: r.left + r.width / 2 - i / 2,
            };
            break;
          case "e":
            u = {
              top: r.top + r.height / 2 - s / 2,
              left: r.left - i - this.options.offset,
            };
            break;
          case "w":
            u = {
              top: r.top + r.height / 2 - s / 2,
              left: r.left + r.width + this.options.offset,
            };
            break;
        }
        if (o.length == 2) {
          if (o.charAt(1) == "w") {
            u.left = r.left + r.width / 2 - 15;
          } else {
            u.left = r.left + r.width / 2 - i + 15;
          }
        }
        n.css(u).addClass("tipsy-" + o);
        if (this.options.fade) {
          n.stop()
            .css({ opacity: 0, display: "block", visibility: "visible" })
            .animate({ opacity: this.options.opacity });
        } else {
          n.css({ visibility: "visible", opacity: this.options.opacity });
        }
      }
    },
    hide: function () {
      if (this.options.fade) {
        this.tip()
          .stop()
          .fadeOut(function () {
            e(this).remove();
          });
      } else {
        this.tip().remove();
      }
    },
    getTitle: function () {
      var e,
        n = this.$element,
        r = this.options;
      t(n);
      var e,
        r = this.options;
      if (typeof r.title == "string") {
        e = n.attr(r.title == "title" ? "original-title" : r.title);
      } else if (typeof r.title == "function") {
        e = r.title.call(n[0]);
      }
      e = ("" + e).replace(/(^\s*|\s*$)/, "");
      return e || r.fallback;
    },
    tip: function () {
      if (!this.$tip) {
        this.$tip = e('<div class="tipsy"></div>').html(
          '<div class="tipsy-arrow"></div><div class="tipsy-inner"/></div>'
        );
      }
      return this.$tip;
    },
    validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide();
        this.$element = null;
        this.options = null;
      }
    },
    enable: function () {
      this.enabled = true;
    },
    disable: function () {
      this.enabled = false;
    },
    toggleEnabled: function () {
      this.enabled = !this.enabled;
    },
  };
  e.fn.tipsy = function (t) {
    function r(r) {
      var i = e.data(r, "tipsy");
      if (!i) {
        i = new n(r, e.fn.tipsy.elementOptions(r, t));
        e.data(r, "tipsy", i);
      }
      return i;
    }
    function i() {
      var e = r(this);
      e.hoverState = "in";
      if (t.delayIn == 0) {
        e.show();
      } else {
        setTimeout(function () {
          if (e.hoverState == "in") e.show();
        }, t.delayIn);
      }
    }
    function s() {
      var e = r(this);
      e.hoverState = "out";
      if (t.delayOut == 0) {
        e.hide();
      } else {
        setTimeout(function () {
          if (e.hoverState == "out") e.hide();
        }, t.delayOut);
      }
    }
    if (t === true) {
      return this.data("tipsy");
    } else if (typeof t == "string") {
      return this.data("tipsy")[t]();
    }
    t = e.extend({}, e.fn.tipsy.defaults, t);
    if (!t.live)
      this.each(function () {
        r(this);
      });
    if (t.trigger != "manual") {
      var o = t.live ? "live" : "bind",
        u = t.trigger == "hover" ? "mouseenter" : "focus",
        a = t.trigger == "hover" ? "mouseleave" : "blur";
      this[o](u, i)[o](a, s);
    }
    return this;
  };
  e.fn.tipsy.defaults = {
    delayIn: 0,
    delayOut: 0,
    fade: false,
    fallback: "",
    gravity: "n",
    html: false,
    live: false,
    offset: 0,
    opacity: 0.8,
    title: "title",
    trigger: "hover",
  };
  e.fn.tipsy.elementOptions = function (t, n) {
    return e.metadata ? e.extend({}, n, e(t).metadata()) : n;
  };
  e.fn.tipsy.autoNS = function () {
    return e(this).offset().top >
      e(document).scrollTop() + e(window).height() / 2
      ? "s"
      : "n";
  };
  e.fn.tipsy.autoWE = function () {
    return e(this).offset().left >
      e(document).scrollLeft() + e(window).width() / 2
      ? "e"
      : "w";
  };
})(jQuery);
