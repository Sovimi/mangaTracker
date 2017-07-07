var userData;   
var http_request = false;
var xml_tree;

function authenticator() {
    var x,y,text;

    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;

    userData = JSON.parse(loadJSON("data.json"));

    for (var i = userData.users.length - 1; i >= 0; i--) {

        if (x === userData.users[i].email && y === userData.users[i].password) {
            text = "valid user";
        } else {
            text = "Not a user";
        }
    }
    document.getElementById("demoTT").innerHTML = text;
}

function saveUser(){
    var x,y,myJSON;
    userData = JSON.parse(loadJSON("data.json"));

    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;
    z = document.getElementById("inputUsername").value;

    userData.users.push({
        email: x,
        password: y,
        username: z
    });

    myJSON = JSON.stringify(userData);

      // construct an HTTP request
      http_request = false;
        
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new window.XMLHttpRequest();         
            
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        
        http_request.open("GET", "saveData.php?myJSON="+myJSON, false);
        http_request.setRequestHeader("Content-type", "application/json; charset=UTF-8");

}

function loadJSON(jsonFile) {
        
        http_request = false;
        
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new window.XMLHttpRequest();         
            
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        
        http_request.open("GET", jsonFile, false);
        
        http_request.send("");
        //return http_request.responseXML;
        return http_request.responseText;
}

function loadXML(xmlFile) {
 http_request = false;
        
        if (window.XMLHttpRequest) { // Mozilla, Safari,...
            http_request = new window.XMLHttpRequest();         
            
        } else if (window.ActiveXObject) { // IE
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    http_request = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {}
            }
        }

        if (!http_request) {
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        
        http_request.open("GET", xmlFile, false);
        
        http_request.send("");
        return http_request.responseXML;
}

function myFunction(xml) {
  var x, i, xmlDoc, table;
  xmlDoc = loadXML("manga.xml");
  table = "<tr><th>Artist</th><th>Title</th></tr>";
  x = xmlDoc.getElementsByTagName("CD");
  for (i = 0; i < x.length; i++) { 
    table += "<tr><td>" + 
    x[i].getElementsByTagName("Artist")[0].childNodes[0].nodeValue +
    "</td><td>" +
    x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
    "</td></tr>";
  }
  document.getElementById("demo").innerHTML = table;
}