"use strict";

var ZongJi = require('zongji');
var client = require("./client");


var zongji = new ZongJi({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database: 'the_scientist'
  });

// Each change to the replication log results in an event
zongji.on('binlog', function(evt) {
  //evt.dump();

  var rows = evt.rows;

  //console.log(rows);

  client.XADD("users", "*", "payload", rows, function (err, reply) {
    console.log(err, reply);
});

});

// Binlog must be started, optionally pass in filters
zongji.start({
  includeEvents: ['tablemap', 'writerows', 'updaterows', 'deleterows']
});




/*
var client = require("./client");


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
}, 1000);*/