
'use strict';
var socket = io();


// Regular expression from W3C HTML5.2 input specification:
// https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Regular expression to only allow positive wholenumbers, not beginning with 0
var houseRegExp = /^(|[1-9][0-9]*)$/;









new Vue({
  el: '#app',
  data: function () {
    return {
      burgerMessage: 'Select Burger',
      burgers: [],
      name: null,
      burgerChosen: [],
      isBurgerChosen: "",
      email: {
        value: null,
        valid: true
      },

      street: "",
      house: {
        value: "",
        valid: true
      },
      features: ["Online card", "Credit", "Swish", "Burger Heaven card"],
      selection: {
        payment: "Bank Card",
        gender: "Undisclosed",
        features: []
      },
      message: {
        text: `Dear Mr. President,\n...`,
        maxlength: 255
      },
      submitted: false,
      newTodoText: '',

      orders: {},
      orderId: "",
      details: {
        x: "",
        y: "",
        chosen: false
      },
      orderItems: "",
      custumerInfo: {
        name: "",
        email: "",
        payment: "",
        gender: ""
      },
      coordinates: {}
    }
  },

  // Calls on functions in "method: " and makes it reactive
  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('SendCoordinates', function (c) {
      this.coordinates = c.coordinates;
    }.bind(this));


    for (var i = 0; i < food.burgers.length; i++) {
      this.print(i);
    };

    this.details = {
      x: -99,
      y: -99
    };

    
  },


  // initalize static functions to be called later 
  methods: {
    print: function (i) {
      this.burgers.push({
        name: food.burgers[i].name,
        kCal: food.burgers[i].kCal,
        lactose: food.burgers[i].lactose,
        gluten: food.burgers[i].gluten,
        img: food.burgers[i].img,
        price: food.burgers[i].price,
        checked: food.burgers[i].checked
      })
    },

    addBurger: function (e) {
      var burgerName = e.target.name;
      this.isBurgerChosen = "";
      var isInList = "";

      for (let i = 0; i < this.burgerChosen.length; i++) {
        if (this.burgerChosen[i] === burgerName) {
          isInList = true;
        }
      }
 
      if (isInList === true) {
        var index = this.burgerChosen.indexOf(burgerName);
        if (index !== -1)
          this.burgerChosen.splice(index, 1);
      } else
        this.burgerChosen.push(burgerName);


        
      if(this.burgerChosen.length > 0)
        this.isBurgerChosen = true;
    },

    // submit form handler
    submit: function (e) {
      if(this.name && this.email.valid && this.details.chosen) {
        this.addOrder();
        return true;
      }
    },


    // validate by type and value
    validate: function (type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },
    
    // validate by type and value
    validateHouse: function (type, value) {
      if (type === "house") {
        this.house.valid = this.isHouse(value) ? true : false;
      }
    },
    


    // check for valid email adress
    isEmail: function (value) {
      return emailRegExp.test(value);
    },
    
    // check for valid email adress
    isHouse: function (value) {
      return houseRegExp.test(value);
    },

    isCoordinat: function (value) {
      var valid = false;
      var choosenCoord = this.details.x
      if (choosenCoord !== -99 && choosenCoord !== "")
        valid = true;

      return valid;
    },


    // check or uncheck all - Not implemented
    checkAll: function (event) {
      this.selection.features = event.target.checked ? this.features : [];
    },


    // Map section
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },





    // New 




    // New
    SendCoord: function (e) {

      socket.emit("SendCoord", {
        coordinates: this.coordinates
      });
      e.preventDefault();
      
    },

    addOrder: function (e) {
      var xpos = this.details.x;
      var ypos = this.details.y;

      socket.emit("addOrder", {
        orderId: this.getNext(),
        details: {
          x: xpos,
          y: ypos
        },
        
        burgerChosen: this.burgerChosen,
        custumerInfo: {
          name: this.name,
          email: this.email.value,
          payment: this.selection.payment,
          gender: this.selection.gender
        }        
      });
    },

    displayOrder: function (event) {
      var offset = {
        x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top
      };

      this.orderId = 'T';
      this.details = {
          x: event.clientX - 10 - offset.x,
          y: event.clientY - 10 - offset.y,
          chosen: true
        };
        this.orderItems = this.burgerChosen;
    }
  },

  watch: {
    // watching nested property
    "email.value": function (value) {
      this.validate("email", value);
    },

    // watching nested property
    "house.value": function (value) {
      this.validateHouse("house", value);
    },
  },

});