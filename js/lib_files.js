var http_request = false;
var xml_tree;



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
       
    http_request.open("GET",xmlFile,false);
       
    http_request.send("");
    return http_request.responseXML;
}

/*------ NOT WORKING PROPERLY ---------*/
function saveUser(){
    var x,y,myJSON;
    userData = JSON.parse(loadJSON("/data/data.json"));

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
        
        http_request.open("GET", "/saveData.php?myJSON="+myJSON, false);
        http_request.setRequestHeader("Content-type", "application/php; charset=UTF-8");

}