define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  /**
   * Module exports
   */

  return defineComponent(flightYql);

  /**
   * Module function
   */

  function flightYql() {
    this.defaultAttrs({

    });

    this.after('initialize', function () {

    });
  }

});
