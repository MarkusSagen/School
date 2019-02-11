

// Handle the for to order burger
function processFormData() {

    var name = order_name.value.replace(/^\s+|\s+$/g, '');
    var email = order_mail.value.replace(/^\s+|\s+$/g, '');
    var street = order_street.value.replace(/^\s+|\s+$/g, '');
    var house_number = order_house_nr.value.replace(/^\s+|\s+$/g, '');
    var recipient = order_recipiant.value.replace(/^\s+|\s+$/g, '');
    var gender = document.querySelector('input[name = "gender"]:checked').value;



    var error_message = 'The following fields had errors in them: \n\n';
    var data = 'You entered the following information: \n\n';

    var error_flag = false;


    // Check name
    if (name == '') {
        error_message += 'Please enter your name\n';
        error_flag = true;
    } else {
        data += 'Name: ' + name + '\n';
    }

    // Check mail
    if (!checkEmail(email)) {
        error_message += 'Please enter a valid email address\n';
        error_flag = true;
    } else {
        data += 'Email: ' + email + '\n';
    }

    // Check street
    if (street == '') {
        error_message += 'Please enter a valid street name\n';
        error_flag = true;
    } else {
        data += 'Street: ' + street + '\n';
    }
    
    // Check house number
    if (house_number == '') {
        error_message += 'Please enter a valid house number\n';
        error_flag = true;
    } else {
        data += 'House number: ' + house_number + '\n';
    }

    if (recipient == '') {
        error_message += 'Please enter a payment option\n';
        error_flag = true;
    } else {
        data += 'Payment option: ' + recipient + '\n';
    }

    if (gender == '') {
        error_message += 'Please specify your gender\n';
        error_flag = true;
    } else {
        data += 'Gender: ' + gender + '\n';
    }


    if (error_flag) {
        alert(error_message);

    } else {
        alert(data);
    }
    
}