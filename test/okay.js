
const {bindings} = require('..');
const t = require('tap');

t.ok(bindings);

// t.equal(bindings.hello(), "hello");
t.ok(bindings.createAndBind);