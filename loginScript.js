var userData;

function authenticator() {
    var x,y,text;

    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;


    for (var i = userData.length - 1; i >= 0; i--) {

        if (x === userData.users[i].email && y === userData.users[i].password) {
            text = "valid user";
        } else {
            text = "Not a user";
        }
    }
    document.getElementById("demoTT").innerHTML = text;
}

function saveUser(data){
    var x,y,myJSON;
    userData = JSON.parse(data);  

    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;
    z = document.getElementById("inputUsername").value;

    userData.users.push({
        email: x,
        password: y,
        username: z
    });

    myJSON = JSON.stringify(userData);
    //localStorage.setItem("data", myJSON);
}


function loadDoc(url, cFunction) {
  var xhttp;

    document.getElementById("DemoTT").innerHTML = "TESTING DAMMIT";
  xhttp=new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  //True for asynchronus mode
  xhttp.open("GET", url, true);
  xhttp.send();
}

function init(xhttp) {
    //DO ALL THE STUFF WITH THE DATA HERE
    this.userData = JSON.parse(xhttp.responseText);
    //document.getElementById("DemoTT").innerHTML = xhttp.responseText;
}
