'use strict';

describeComponent('lib/flight-yql', function () {
  beforeEach(function () {
    setupComponent();
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
});
