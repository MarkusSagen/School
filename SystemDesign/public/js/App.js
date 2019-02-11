// TODO:: Get details with coordinates
// TODO:: Get only new updates on send
// TODO:: Make sure all areas are filled






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
      name: "",
      burgerChosen: [],
      email: {
        value: "",
        valid: true
      },

      street: "",
      house: {
        value: "",
        valid: true
      },
      details: "",
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
    }
  },

  // Calls on functions in "method: " and makes it reactive
  created: function () {
    for (var i = 0; i < food.burgers.length; i++) {
      this.print(i);
    }


    

    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('SendCoordinates', function (data) {
      this.orders = data.orders;
    }.bind(this));

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
      // FUUUUUUK YEAH!!!
      // Stored name of all burgers to the button, read the name from button and pass to here
      var burgerName = e.target.name;
      var isInList = false;

      var i;
      for (i = 0; i < this.burgerChosen.length; i++) {
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
    },

    // submit form handler
    submit: function () {
      this.submitted = true;
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
    // check or uncheck all
    checkAll: function (event) {
      this.selection.features = event.target.checked ? this.features : [];
    },




    // From sender of map
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      // var orderId = this.getNext();
      // socket.emit("addOrder", this.orders);


      var offset = {
        x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top
      };
      socket.emit("addOrder", {
        orderId: this.getNext(),
        details: {
          x: event.clientX - 10 - offset.x,
          y: event.clientY - 10 - offset.y
        },
        orderItems: ["Beans", "Curry"],
      });

    },

    displayOrder: function (event) {
      var offset = {
        x: event.currentTarget.getBoundingClientRect().left,
        y: event.currentTarget.getBoundingClientRect().top
      };
      this.orders = [{
        orderId: 'T',
        details: {
          x: event.clientX - 10 - offset.x,
          y: event.clientY - 10 - offset.y
        },
        orderItems: [],
        orderBurgers: this.burgers,
        name: this.name,
        email: this.email
      }];
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