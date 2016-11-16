var LiloBase = require('lilo-js/base');

module.exports = LiloBase.extend({
  merge: ['defaults']
}, {

  // container property for Component defaults
  defaults: {},

  // method for initializing Component instance
  init: function() {
    this.$el.addClass('has-' + this.name);
  },

  // method for removing Component instance
  destroy: function() {
    this.$el.removeClass('has-' + this.name);
    this.$el.removeData('able_' + this.name);
    delete this.$el;
    delete this.el;
  }

});