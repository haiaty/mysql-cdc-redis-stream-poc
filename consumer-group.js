"use strict";


var client = require("../redis_client");



function consumeAll () {
    // 0 means block forever until a new item
    // 0 means give me everything from beginning
    client.XREADGROUP ("GROUP", "my_group", "consumer01", "BLOCK", 0, "STREAMS", "stream2", 0, function (err, reply) {
        console.log(err, JSON.stringify(reply));
        consumeNew();
    });
}


function consumeNew () {
    // > means messages never delivered to other consumers so far
    client.XREADGROUP ("GROUP", "my_group", "consumer01", "BLOCK", 0, "STREAMS", "stream2", ">", function (err, reply) {
        try {

            console.log(err, JSON.stringify(reply));
            var id = reply[0][1][0][0];

            client.XACK("my_group", "consumer01", id, function (err, reply) {
                console.log(err, JSON.stringify(reply));
                consumeNew();
            });
        } catch (e) {
            console.log(e)
        }

        consumeNew();
    });
}