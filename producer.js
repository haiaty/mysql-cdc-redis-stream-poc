"use strict";


var client = require("../redis_client");


client.XTRIM ("stream2", "MAXLEN", 1000, function (err, reply) {
    console.log(err, reply);
});


var count = 1;
setInterval(function () {
    // * means autogenerate the id
    // then key, values pair
    client.XADD("stream2", "*", "count", count, function (err, reply) {
        console.log(err, reply);
    });


    client.XLEN("stream2", function (err, reply) {
        console.log(err, reply);
    });

    count ++
}, 1000);