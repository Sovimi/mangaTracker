var user = {
    email:"admin@demo",
    password:"admin"
};

function myFunction() {
    var x,y, text;

    // Get the value of the input field with id="numb"
    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;

    // If x is Not a Number or less than one or greater than 10
    if (x.isEqualNode(user.email) && y.isEqualNode(user.password)) {
        text = "Input vvalid";
    } else {
        text = "Not a user";
    }
    document.getElementById("demo").innerHTML = text;
}