"use strict";


var client = require("./client");



function consumeAll () {
    // 0 means block forever until a new item
    // 0 means give me everything from beginning
    client.XREAD ("BLOCK", 0, "STREAMS", "stream2", 0, function (err, reply) {
        console.log(err, JSON.stringify(reply));
        consumeNew();
    });
}


function consumeNew () {
    // $ means give me only new items
    client.XREAD ("BLOCK", 0, "STREAMS", "users", "$", function (err, reply) {
        console.log(err, JSON.stringify(reply));
        consumeNew();
    });
}


consumeNew();


// setInterval(function () {
//
// }, 100)



// read all items
// read 2 starting from 0
// client.XRANGE ("stream2", "-", "+", "COUNT", 2,  function (err, reply) {
//     console.log(err, JSON.stringify(reply));
// });




