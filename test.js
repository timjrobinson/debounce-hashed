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

test("It should only call the original function once after debounce time", function(t) {
    var callCount = 0;
    var done = function() {
        callCount++;
    };
    var doneBounced = dh(done, function() { return "hash" }, 5);
    doneBounced();
    doneBounced();
    doneBounced();
    t.equal(callCount, 0);
    setTimeout(function() {
        t.equal(callCount, 1);
        t.end(); 
    }, 10);
});

test("It should have different debounces for different hashes", function(t) {
    var callCount = {};
    var done = function(user) {
        callCount[user.name] = callCount[user.name] || 0;
        callCount[user.name]++;
    };
    var generateHash = function(user) {
        return user.name;
    };
    var doneBounced = dh(done, generateHash, 5);
    doneBounced({name: "alice"});
    doneBounced({name: "bob"});
    doneBounced({name: "alice"});
    doneBounced({name: "alice"});
    doneBounced({name: "bob"});
    setTimeout(function() {
        t.equal(callCount["alice"], 1);
        t.equal(callCount["bob"], 1);
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

test("It should work with options.immediate", function(t) {
    var callCount = 0;
    var done = function() {
        callCount++;
    };
    var doneBounced = dh(done, function() { return "hash" }, 5, {immediate: true});
    doneBounced();
    t.equal(callCount, 1);
    doneBounced();
    t.equal(callCount, 1);
    doneBounced();
    t.equal(callCount, 1);
    t.end(); 
});

test("It should not call immediate if it's not in the options", function(t) {
    var callCount = 0;
    var done = function() {
        callCount++;
    };
    var doneBounced = dh(done, function() { return "hash" }, 5, {});
    doneBounced();
    doneBounced();
    doneBounced();
    t.equal(callCount, 0);
    setTimeout(function() {
        t.equal(callCount, 1);
        t.end(); 
    }, 10);
});

test("It should work with maxWait", function(t) {
    var callCount = 0;
    var timeout;
    var done = function() {
        callCount++;
    };
    var doneBounced = dh(done, function() { return "hash" }, 10, {maxWait: 20});
    function doBounce() {
        doneBounced();
        timeout = setTimeout(doBounce, 5);
    }
    doBounce();
    setTimeout(function() {
        t.equal(callCount, 1);
        clearTimeout(timeout);
        t.end(); 
    }, 25);
});
