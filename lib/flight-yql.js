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
      ERROR_NO_QUERY: 'No query specified',
      ERROR_MALFORMED_QUERY: 'Query malformed',
      ERROR_CB_NOT_A_FUNCTION: 'Callback not a function',
      baseUri: 'https://query.yahooapis.com/v1/public/yql'
    });

    this.options = {
      contentType: 'json',
      env: 'store://datatables.org/alltableswithkeys',
      headers: {'Content-type': 'application/x-www-form-urlencoded'}
    };

    /**
     * Will execute a YQL query by making an XHR GET request.
     *
     * @param {string} query The yql query to execute
     * @param {function} cb The callback to call once XHR has responded.
     *
     * @return {object} jQuery Deferred.
     */
    this.query = function(query, cb) {
      this._checkParams(query, cb);
      var data = {},
          options;

      options = this.options;
      data = {
        format: this.options.contentType,
        // TODO I think this has to be changed depending on query.
        env: this.options.env,
        q: query
      };
      return $.get(this.attr.baseUri, data, cb, this.options.contentType); 
    };

    this._checkParams = function(query, cb) {
      if (!query) {
        throw new Error(this.attr.ERROR_NO_QUERY);
      }
      if (typeof query !== 'string') {
        throw new Error(this.attr.ERROR_MALFORMED_QUERY);
      }
      if (cb && typeof cb !== 'function') {
        throw new Error(this.attr.ERROR_CB_NOT_A_FUNCTION);
      }
    };
  }
});
