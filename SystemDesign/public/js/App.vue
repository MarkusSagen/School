




Vue.component('child', {
  template: '#child-template',
  data: function () {
    return { msg: 'hello' }
  },
  methods: {
    notify: function () {
      if (this.msg.trim()) {
        this.$dispatch('child-msg', this.msg)
        this.msg = ''
      }
    }
  }
})














// Send "Burger Menu"
var vm1 = new Vue({
    el: '#selectBurger',
    data: {
        burgerMessage: 'Select', 
    }
})





var example2 = new Vue({
    el: '#wrapper',
    data: {
        parentMessage: 'Parent',
        newTodoText: '',
        burgers: [ ] 
    }, 

    // Calls on functions in "method: " and makes it reactive
    created: function() {
        for(var i = 0; i < food.burgers.length; i++) {
            this.print(i);
        }    
    },

    // initalize static functions to be called later 
    methods: {
        print: function(i) {
            this.burgers.push({
                name: food.burgers[i].name,
                kCal: food.burgers[i].kCal,
                lactose: food.burgers[i].lactose,
                gluten: food.burgers[i].gluten,
                img: food.burgers[i].img,
                price: food.burgers[i].price,
                checked: food.burgers[i].checked
            })
        }
    },     
})



// This way you can initalize staticly ...
//example2.print(0);
//example2.print(3);


// new Vue({
//   el: '#exxx',
//   data: {
//     buyerInfo: []
//   }
// })


new Vue({
  el: '#sendForm',
  methods: {
    logMessage: function (message) {
      console.log(message);
      processFormData();
    }
  }
})





var vm = new Vue({
  el: '#getBurgers',
  data: function() {
    return {
      burgers: []
    }
  },

  methods: {
    get: function(event) {

    }
  },
  watch: {

  }
})






















// Regular expression from W3C HTML5.2 input specification:
// https://www.w3.org/TR/html/sec-forms.html#email-state-typeemail
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Regular expression to only allow positive wholenumbers, not beginning with 0
var houseRegExp = /^(|[1-9][0-9]*)$/;


new Vue({
  // root node
  el: "#app",
  // the instance state
  data: function() {
    return {
      burgers: [],
      name: "",
      email: {
        value: "",
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
      submitted: false
    };
  },

  // Calls on functions in "method: " and makes it reactive
    created: function() {
        for(var i = 0; i < food.burgers.length; i++) {
            this.print(i);
        }    
    },




  methods: {

    
    // submit form handler
    submit: function() {
      this.submitted = true;
    },
    // validate by type and value
    validate: function(type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },
   // validate by type and value
    validateHouse: function(type, value) {
      if (type === "house") {
        this.house.valid = this.isHouse(value) ? true : false;
      }
    },
    // check for valid email adress
    isEmail: function(value) {
      return emailRegExp.test(value);
    },
    // check for valid email adress
    isHouse: function(value) {
      return houseRegExp.test(value);
    },
    // check or uncheck all
    checkAll: function(event) {
      this.selection.features = event.target.checked ? this.features : [];
    },


    print: function(i) {
            this.burgers.push({
                name: food.burgers[i].name,
                checked: food.burgers[i].checked,
                
            })
        }




  },
  watch: {
    // watching nested property
    "email.value": function(value) {
      this.validate("email", value);
    },

    // watching nested property
    "house.value": function(value) {
      this.validateHouse("house", value);
    },

  }
});







// bootstrap parent, which pushes message into an array
// when receiving the event
var parent = new Vue({
  el: '#events-example',
  data: {
    messages: []
  },
  // the `events` option simply calls `$on` for you
  // when the instance is created
  events: {
    'child-msg': function (msg) {
      // `this` in event callbacks are automatically bound
      // to the instance that registered it
      this.messages.push(msg)
    }
  }
})
