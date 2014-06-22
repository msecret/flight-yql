'use strict';

describeComponent('lib/flight-yql', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should have the base uri set correctly for yql', function() {
    var expected = 'https://query.yahooapis.com/v1/public/yql';

    expect(this.component.baseUri).toEqual(expected);
  });

  it('should set default options for request as method GET', function() {
    var expected = 'GET';

    expect(this.component.options.method).toEqual(expected);
  });

  it('should set the default headers of request to form encoded header', 
     function() {
    var expected =  {'Content-type': 'application/x-www-form-urlencoded'};

    expect(this.component.options.headers).toEqual(expected);
  });

  describe('query()', function() {
    it('should throw an error if there is no query passed in', function() {
      var expected = new Error(this.component.attr.ERROR_NO_QUERY),
          self = this;
      expect(function() {
        self.component.query();
      }).toThrow(expected);
    });
    it('should throw an error if the query is not a string', function() {
      var expected = new Error(this.component.attr.ERROR_MALFORMED_QUERY),
          self = this;

      expect(function() {
        self.component.query({});
      }).toThrow(expected);

      expect(function() {
        self.component.query([]);
      }).toThrow(expected);

      expect(function() {
        self.component.query(1);
      }).toThrow(expected);

      expect(function() {
        self.component.query(true);
      }).toThrow(expected);
    });
    it('should throw an error if callback is not a function', function() {
      var expected = new Error(this.component.attr.ERROR_CB_NOT_A_FUNCTION),
          self = this;

      expect(function() {
        self.component.query('hello', 'world');
      }).toThrow(expected);
    });
  });
});
