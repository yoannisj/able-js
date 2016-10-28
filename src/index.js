// ============================================================================
// =Module
// ============================================================================

var Lilo = require('lilo-js');

// include Lilo's functionality
var Kiso = module.exports = Object.create(Lilo);

// container property for custom component defaults
Kiso.defaults = {};

// ============================================================================
// =jQuery plugin
// ============================================================================

var $ = require('jquery');

// initialize variables
var $el, instance, Component;

$.fn.lilo = function(name, options, init) {
  // loop over elements
  for (var i = 0, ln = this.length; i < ln; i++)
  {
    // get element and maybe attached instance
    $el = this.eq(i);
    instance = $el.data('kiso_' + name);

    // if no instance was attached yet
    if (!instance) {
      // get component definition and create instance
      Component = Lilo.get(component);
      instance = Object.create(Component);

      // store reference to instance on DOM element
      $el.data('kiso_' + name, instance);

      // store reference to DOM element on instance
      instance.$el = $el;
      instance.el = $el[0];

      // inject component defaults, in developer defaults, in instance options
      instance.options = $.extend(true, {},
        Component.defaults || {},
        Lilo.defaults[name] || {},
        options || {}
      );

      // optionally initialize component
      if (typeof Component.init == 'function' &&
          (init || $el.attr('data-kiso-init').split(' ').indexOf(name))
      ) {
        Component.init();
      }
    }
  }

  // return instance of first DOM element
  // - so `$el.lilo('name')` can be used to get/attach component instance
  return this.first().data('kiso_' + name);

};