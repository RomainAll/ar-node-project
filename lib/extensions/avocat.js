'use strict';

const Toys   = require('@hapipal/toys');
const Avocat = require('@hapipal/avocat');


module.exports = Toys.onPreResponse(({ response }, h) => {

    Avocat.rethrow(response);

    return h.continue;
});
