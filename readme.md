# kiso-js

Small frontend javascript framework with UI components built on top of [lilo-js](https://github.com/yoannisj/lilo-js).

**STILL UNDER ACTIVE DEVELOPMENT**

## Write components

The **base** component MUST be in the prototype chain of ALL your custom components. It comes with two useful methods to create inheriting objects:
- `include` to add own properties from another object
- `extend` to create an inheriting object, and optionally mixin own properties from other objects.

It also implements the very minimal interface that is expected by Lilo's jquery bridge, used to attach/handle your components' instances on DOM elements:
- the `init` method used to initialize the instance's behaviour
- the `destroy` method used to delete the component's instance and make it available to the Garbage collector.

## API

### Define and register component

```js
var Kiso = require('kiso-js');
var Base = require('kiso-js/components/base');
var Collapse = require('kiso-js/mixins/collapse');
var Panel = require('kiso-js/mixins/panel');

// register and expose component
var CollapsePanel = Base.extend([Collapse, Panel], {
  merge: [/* merged props */],
  omit: [/* omitted props */],
  select: [/* selected props */]
}, {
  /* props */
});

// register component
module.exports = Kiso('collapsepanel', CollapsePanel);
```

### Use your component in jQuery

```js
var $el = $('.selector');

// set custom default options for component
kiso.defaults.collapsepanel = {/* custom defaults */};

// instantiate component on DOM element
collapsepanel = $el.kiso('collapsepanel', {/* options */});

// run methods
collapsepanel.open();
collapsepanel.destroy();

// access component instance on element
var collapsepanel = $el.kiso('collapsepanel');

// access element on component instance
var $el = collapsepanel.$el;
var el = collapsepanel.el;

// means this useless code works
$el = $el.kiso('collapsepanel').$el;
el = el.kiso('collapsepanel').el;
collapsepanel = collapsepanel.el.kiso('collapsepanel');
```