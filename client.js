"use strict";


//var retryStrategy = require("node-redis-retry-strategy")();
var redis = require("redis");

var client = redis.createClient();

module.exports = client;