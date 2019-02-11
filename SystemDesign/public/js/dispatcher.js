/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */




'use strict';
var socket = io();

var vm9 = new Vue({
  el: '#orders',
  data: {
    orders: {},
    name: "",
    email: "",
    coordinates: {}

  },
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));


    socket.on('SendCoordinates', function (c) {
      this.coordinates = c.orders;
    }.bind(this));

  }
});

