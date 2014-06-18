define(function (require) {

  'use strict';

  /**
   * Module dependencies
   */

  var defineComponent = require('flight/lib/component');

  var BASE_URL = 'https://query.yahooapis.com/v1/public';

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

    this.baseUri = 'https://query.yahooapis.com/v1/public/yql';
    this.options = {
      method: 'GET',
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    };

    this.yqlQuery = function(query, contentType, cb) {
      var data = {},
          options;

      options = this.options;
      data = {
        format: contentType,
        q: query
      };
      options.data = data;
      return $.get(this.baseUri, options, cb); 
    };

  }
});
