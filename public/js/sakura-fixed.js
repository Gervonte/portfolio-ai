/*!
 * Sakura.js 1.1.1
 * Vanilla JS version of jQuery-Sakura: Make it rain sakura petals.
 * https://github.com/jhammann/sakura
 *
 * Copyright 2019-2019 Jeroen Hammann
 *
 * Released under the MIT License
 *
 * Released on: September 4, 2019
 */
var Sakura = function Sakura(selector, options) {
  var _this = this;

  if (typeof selector === 'undefined') {
    throw new Error('No selector present. Define an element.');
  }

  this.el = document.querySelector(selector); // Defaults for the option object, which gets extended below.

  var defaults = {
    className: 'sakura',
    // Classname of the petal. This corresponds with the css.
    fallSpeed: 1,
    // Speed factor in which the petal falls (higher is slower).
    maxSize: 14,
    // The maximum size of the petal.
    minSize: 10,
    // The minimum size of the petal.
    delay: 300,
    // Delay between petals.
    colors: [{
      // You can add multiple colors (chosen randomly) by adding elements to the array.
      gradientColorStart: 'rgba(255, 183, 197, 0.9)',
      // Gradient color start (rgba).
      gradientColorEnd: 'rgba(255, 197, 208, 0.9)',
      // Gradient color end (rgba).
      gradientColorDegree: 120 // Gradient degree angle.

    }]
  }; // Merge defaults with user options.

  var extend = function extend(originalObj, newObj) {
    Object.keys(originalObj).forEach(function (key) {
      if (newObj && Object.prototype.hasOwnProperty.call(newObj, key)) {
        var origin = originalObj;
        origin[key] = newObj[key];
      }
    });
  };

  extend(defaults, options);
  this.settings = defaults;
  this.el.style.overflowX = 'hidden';
  var prefixes = ['webkit', 'moz', 'MS', 'o', ''];

  function addPrefix(prop, event, callback) {
    for (var i = 0; i < prefixes.length; i += 1) {
      var prefix = event;
      if (!prefixes[i]) {
        prefix = event.toLowerCase();
      }
      prop.addEventListener(prefixes[i] + prefix, callback, false);
    }
  }

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
  }

  this.createPetal = function () {
    if (this.el.dataset.sakuraAnimId) {
      setTimeout(function () {
        window.requestAnimationFrame(_this.createPetal);
      }, this.settings.delay);
    }

    var swayAnimations = ['sway-0', 'sway-1', 'sway-2', 'sway-3', 'sway-4', 'sway-5', 'sway-6', 'sway-7', 'sway-8'];
    var windAnimations = ['blow-soft-left', 'blow-medium-left', 'blow-soft-right', 'blow-medium-right'];
    var sway = swayAnimations[Math.floor(Math.random() * swayAnimations.length)];
    var wind = windAnimations[Math.floor(Math.random() * windAnimations.length)];
    var fallTime = (0.007 * document.documentElement.clientHeight + Math.round(5 * Math.random())) * this.settings.fallSpeed;
    var animation = ['fall ' + fallTime + 's linear 0s 1', wind + ' ' + ((fallTime > 30 ? fallTime : 30) - 20 + Math.floor(Math.random() * (20 - 0 + 1)) + 0) + 's linear 0s infinite', sway + ' ' + (Math.floor(Math.random() * (4 - 2 + 1)) + 2) + 's linear 0s infinite'].join(', ');
    var petal = document.createElement('div');
    petal.classList.add(this.settings.className);
    var size = Math.floor(Math.random() * (this.settings.maxSize - this.settings.minSize + 1)) + this.settings.minSize;
    var width = size - Math.floor(Math.random() * (this.settings.minSize / 3));
    var color = this.settings.colors[Math.floor(Math.random() * this.settings.colors.length)];
    petal.style.background = 'linear-gradient(' + color.gradientColorDegree + 'deg, ' + color.gradientColorStart + ', ' + color.gradientColorEnd + ')';
    petal.style.webkitAnimation = animation;
    petal.style.animation = animation;
    petal.style.borderRadius = Math.floor(Math.random() * (this.settings.maxSize + Math.floor(10 * Math.random()) - this.settings.maxSize + 1)) + this.settings.maxSize + 'px ' + (Math.floor(Math.random() * (Math.floor(width / 4) - 1 + 1)) + 1) + 'px';
    petal.style.height = size + 'px';
    petal.style.left = Math.random() * document.documentElement.clientWidth - 100 + 'px';
    petal.style.marginTop = -(Math.floor(20 * Math.random()) + 15) + 'px';
    petal.style.width = width + 'px';
    addPrefix(petal, 'AnimationEnd', function () {
      if (!isElementInViewport(petal)) {
        petal.remove();
      }
    });
    addPrefix(petal, 'AnimationIteration', function () {
      if (!isElementInViewport(petal)) {
        petal.remove();
      }
    });
    this.el.appendChild(petal);
  };

  this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
};

Sakura.prototype.start = function () {
  if (this.el.dataset.sakuraAnimId) {
    throw new Error('Sakura is already running.');
  }
  this.el.setAttribute('data-sakura-anim-id', window.requestAnimationFrame(this.createPetal));
};

Sakura.prototype.stop = function (graceful) {
  var _this2 = this;

  if (this.el.dataset.sakuraAnimId) {
    window.cancelAnimationFrame(this.el.dataset.sakuraAnimId);
    this.el.setAttribute('data-sakura-anim-id', '');
  }

  if (!graceful) {
    setTimeout(function () {
      var petals = document.getElementsByClassName(_this2.settings.className);

      while (petals.length > 0) {
        petals[0].parentNode.removeChild(petals[0]);
      }
    }, this.settings.delay + 50);
  }
};

// Expose Sakura to the global scope
if (typeof window !== 'undefined') {
  window.Sakura = Sakura;
}
