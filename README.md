# flight-yql

[![Build Status](https://travis-ci.org/msecret/flight-yql.svg?branch=master)](https://travis-ci.org/msecret/flight-yql)

A [Flight](https://github.com/flightjs/flight) component for querying Yahoo's
YQL API.

## Installation

```bash
bower install --save flight-yql
```

## Example

```javascript
var flight = require('flight');
var withYql = require('flight-yql/lib/with_yql');

return flight.component(newThing, withYql);

functin newThing() {
  this.queryYql('select * from yahoo.finance.stocks where symbol="yhoo"',
    function(data) {
      doSomethingWith(data);
  });
}

## Development

Development of this component requires [Bower](http://bower.io) to be globally
installed:

```bash
npm install -g bower
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install && bower install
```

To run unit tests:

```bash
npm run test
```

Or to continuously run the tests in Chrome during development, just run:

```bash
npm run watch-test
```

To run integration tests run:

```bash
npm run integration
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
