'use strict';

var dh = require("./index");
var test = require("tape");

test("Basic usage", function(t) {
    var done = function() {
        t.end();
    };
    var doneBounced = dh(done, function() { return "hash" }, 5);
    doneBounced();
});

test("It should only call the original function once", function(t) {
    var callCount = 0;
    var done = function() {
        callCount++;
    };
    var doneBounced = dh(done, function() { return "hash" }, 5);
    doneBounced();
    doneBounced();
    doneBounced();
    setTimeout(function() {
        t.equal(callCount, 1);
        t.end(); 
    }, 10);
});

test("It should call immediately if immediate is true, and ignore further calls", function(t) {
    var callCount = 0;
    var done = function() {
        callCount++;
    };
    var doneBounced = dh(done, function() { return "hash" }, 5, true);
    doneBounced();
    t.equal(callCount, 1);
    doneBounced();
    t.equal(callCount, 1);
    doneBounced();
    t.equal(callCount, 1);
    t.end(); 
});