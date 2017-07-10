var userData;
var ofyear="", oftype="", ofstatus="", sortby="", input;

/* Login */
function authenticator() {
    var x,y,text;

    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;

    userData = JSON.parse(loadJSON("/data/data.json"));

    for (var i = userData.users.length - 1; i >= 0; i--) {

        if (x === userData.users[i].email && y === userData.users[i].password) {
            text = "valid user";
            this.setCookie("user", userData.users[i].username);
            window.location = '/home.html';
        } else {
            text = "Not a user";
        }
    }
    document.getElementById("demoTT").innerHTML = text;
}


/*-------------- SEARCH ------------------*/

function getGridResults(x){
  table="";
  for (var j = 0; j<x.length; j++) {
    table += "<div class='row'>";
    for (i = 0; i < 6 && i<x.length; i++, j++) { 
      titleXML = x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
      yearXML = x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
      statusXML = x[i].getElementsByTagName("STATUS")[0].childNodes[0].nodeValue;
      typeXML = x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue;

      if ((titleXML.toUpperCase() == input.toUpperCase() || 
          titleXML.toUpperCase().indexOf(input.toUpperCase()) != -1 || 
          input == null || input == "" || input == "") &&
          (yearXML == ofyear || ofyear == null || ofyear == "" )&&(
          statusXML == ofstatus || ofstatus == null || ofstatus == "" )&&(
          typeXML == oftype || oftype == null || oftype == "")) {
        table += '<div class="col-sm-2 cover-card"><a id="cover-img" href="' + 
        x[i].getElementsByTagName('PAGEURL')[0].childNodes[0].nodeValue +
        '" title="cover card" style="background-image: url(' + 
        x[i].getElementsByTagName('IMGURL')[0].childNodes[0].nodeValue +
        ')"></a><div class="cover-data"><a href="'+
        x[i].getElementsByTagName('PAGEURL')[0].childNodes[0].nodeValue+
        '">'+
        titleXML +
        '</a><span><div title="type" class="manga-info-type">'+
        typeXML + 
        '</div><div title="average score" class="manga-info-score">'+
        x[i].getElementsByTagName('SCORE')[0].childNodes[0].nodeValue+
        '</div></span></div></div>';
      }
    }
  }
  return table;
}

function getSearchResults(newInput) {
  var x, i, xmlDoc, table;
  if (newInput == null) {input="";}
  else{this.input = newInput;}
  xmlDoc = loadXML("/data/manga.xml");
  x = xmlDoc.getElementsByTagName("MANGA");

  document.getElementById("search-results-div").innerHTML = getGridResults(x);
}

function getSelectedResults(year, type, status, sort){
  if(year != null) {this.ofyear = year;} else {this.ofyear = "";}
  if(type != null) {this.oftype = type;} else {this.oftype ="";}
  if(status != null){ this.ofstatus = status;} else {this.ofstatus="";}
  if(sort != null) {this.sortby = sort;} else {this.sortby="";}
  this.getSearchResults('');
}

function search(ele) {
  if(event.keyCode == 13) { 
    getSearchResults(ele.value);  
  }
}


/*-------- LISTS ----------------*/

function changeUserStatistics(){

}

function populateList(){

}