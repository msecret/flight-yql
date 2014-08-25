'use strict';

describeMixin('lib/with_yql', function () {
  beforeEach(function () {
    var self = this;
    setupComponent();

    this.data = {};
    this.callback = function(data) {
      self.data = data; 
    };
  });

  it('should call the callback passed in on success', function() {
    var testCallback = jasmine.createSpy();

    var s = this.component.query(
        'select * from yahoo.finance.stocks where symbol="yhoo"',
        testCallback);

    waitsFor(function() {
        return testCallback.callCount > 0;
    }, "The Ajax call timed out.", 5000);

    runs(function() {
      expect(testCallback).toHaveBeenCalled();
    });
  });
  it('should call the callback passed in on success', function() {
    var testCallback = spyOn(this, 'callback').andCallThrough(),
        self = this;

    var s = this.component.query(
        'select * from yahoo.finance.stocks where symbol="yhoo"',
        testCallback);

    waitsFor(function() {
      return testCallback.callCount > 0;
    }, "The Ajax call timed out.", 5000);

    runs(function() {
      var data = self.data.query;

      expect(data.count).toEqual(1);
      expect(data.results).toBeDefined();
      expect(data.results.stock.symbol.toLowerCase()).toEqual('yhoo');
    });
  });
});
