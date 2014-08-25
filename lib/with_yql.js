define(function (require) {

  'use strict';

      /** @constant {string} */
  var ERROR_NO_QUERY = 'No query specified',
      /** @constant {string} */
      ERROR_MALFORMED_QUERY = 'Query malformed',
      /** @constant {string} */
      ERROR_CB_NOT_A_FUNCTION = 'Callback not a function';

  /**
   * Module function
   */
  function withYql() {
    this.attributes = {
      baseUri: 'https://query.yahooapis.com/v1/public/yql',
      contentType: 'json',
      env: 'store://datatables.org/alltableswithkeys',
      headers: {'Content-type': 'application/x-www-form-urlencoded'},
      method: 'GET'
    };

    /**
     * Will execute a YQL query by making an XHR GET request.
     *
     * @param {string} query The yql query to execute
     * @param {function} cb The callback to call once XHR has responded.
     *
     * @return {object} jQuery Deferred.
     */
    this.queryYql = function(query, cb) {
      this._checkParams(query, cb);
      var data = {};

      data = {
        format: this.attributes.contentType,
        // TODO I think this has to be changed depending on query.
        env: this.attributes.env,
        q: query
      };
      return $.get(this.attributes.baseUri, data, cb,
        this.attributes.contentType);
    };

    this._checkParams = function(query, cb) {
      if (!query) {
        throw new Error(ERROR_NO_QUERY);
      }
      if (typeof query !== 'string') {
        throw new Error(ERROR_MALFORMED_QUERY);
      }
      if (cb && typeof cb !== 'function') {
        throw new Error(ERROR_CB_NOT_A_FUNCTION);
      }
    };
  }

  /**
   * Module exports
   */

  return withYql;
});
