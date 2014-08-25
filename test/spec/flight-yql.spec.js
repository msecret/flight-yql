'use strict';

describeMixin('lib/with_yql', function () {

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should have the base uri set correctly for yql', function() {
    var expected = 'https://query.yahooapis.com/v1/public/yql';

    expect(this.component.attributes.baseUri).toEqual(expected);
  });

  it('should set default attributes for request as method GET', function() {
    var expected = 'GET';

    expect(this.component.attributes.method).toEqual(expected);
  });

  it('should set the default headers of request to form encoded header',
     function() {
    var expected =  {'Content-type': 'application/x-www-form-urlencoded'};

    expect(this.component.attributes.headers).toEqual(expected);
  });

  describe('queryYql()', function() {
    var server;

    beforeEach(function() {
      server = sinon.fakeServer.create();
    });

    afterEach(function() {
      server.restore();
    });

    it('should throw an error if there is no query passed in', function() {
      var expected = new Error('No query specified'),
          self = this;
      expect(function() {
        self.component.queryYql();
      }).toThrow(expected);
    });
    it('should throw an error if the query is not a string', function() {
      var expected = new Error('Query malformed'),
          self = this;

      expect(function() {
        self.component.queryYql({});
      }).toThrow(expected);

      expect(function() {
        self.component.queryYql([]);
      }).toThrow(expected);

      expect(function() {
        self.component.queryYql(1);
      }).toThrow(expected);

      expect(function() {
        self.component.queryYql(true);
      }).toThrow(expected);
    });
    it('should throw an error if callback is not a function', function() {
      var expected = new Error(
            'Callback not a function'),
          self = this;

      expect(function() {
        self.component.queryYql('hello', 'world');
      }).toThrow(expected);
    });
    it('should return a jquery deferred', function() {
      var actual = this.component.queryYql('hello', function(){});

      expect(actual.then).toBeDefined();
    });
    it('should always make a GET request by default', function() {
      this.component.queryYql('a', function(){});

      expect(server.requests[0]).toBeDefined();
      expect(server.requests[0].method).toEqual('GET');
    });
    it('should set the format attribute to JSON by default', function() {
      this.component.queryYql('a', function(){});

      expect(server.requests[0]).toBeDefined();
      expect(server.requests[0].url.search('format=JSON')).toBeTruthy();
    });
    it('should set the q attribute to the query passed in', function() {
      this.component.queryYql('a', function(){});

      expect(server.requests[0]).toBeDefined();
      expect(server.requests[0].url.search('q=a')).toBeTruthy();
    });
  });
});
