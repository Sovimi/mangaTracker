var userData;
var ofyear="", oftype="", ofstatus="", sortby="", ofgenres=[], oftags=[], input;
var mystatus="", mychapter="", myvolume=""; 
var authorized = isAuthorized();
var xmlDoc = loadXML("/mangaTrackers/data/manga.xml");
var xmlDocUser = loadXML("/mangaTrackers/data/user.xml");
parser = new DOMParser();
var xmlDocList = loadXML("/mangaTrackers/data/myMangaList.xml");

function removeArrayDuplicates(array){
  newArray =[];
  newArray = array.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);
  return newArray;
}

/* Login */
function authenticator() {
    var x,y,text;

    x = document.getElementById("inputEmail").value;
    y = document.getElementById("inputPassword").value;

    userData = JSON.parse(loadJSON("data/data.json"));

    for (var i = userData.users.length - 1; i >= 0; i--) {

        if (x === userData.users[i].email && y === userData.users[i].password) {
            text = "valid user";
            this.setCookie("user", userData.users[i].username, 15);
            window.location = 'home.html';
        } else {
            text = "Not a user";
        }
    }
    document.getElementById("demoTT").innerHTML = text;
}

function isAuthorized() {
  cookie=getCookie("user");
  if (cookie === "" || cookie == null) {
    return false;
  }
  else {
    return true;
  }
}

function checkLoggedUser() {
  if (isAuthorized()) {
    window.location = 'home.html';
  }
}

function checkUserLogout(){
  if (!isAuthorized()) {
    window.location = 'index.html';
  }
}

function userLogout(){
  deleteCookie("user");
  window.location = "index.html";
}

/*-------------- SEARCH ------------------*/

function checkGenres (xGenres) {
  if(this.ofgenres.length == 0) {
    return true;
  }
  else if(this.ofgenres.length > xGenres.length){
    return false;
  }

  var found=0;
  for (var i = 0; i < xGenres.length; i++) {
    for (var j = 0; j < ofgenres.length; j++) {
      if (xGenres[i].childNodes[0].nodeValue.toLowerCase() == this.ofgenres[j]) {
        found++;
      }
    }
  }
  if (found == this.ofgenres.length) {
   return true;
  }
  else return false;
}

function checkTags (xTags) {
 if(this.oftags.length == 0) {
    return true;
  }
  else if(this.oftags.length > xTags.length){
    return false;
  }

  var found=0;
  for (var i = 0; i < xTags.length; i++) {
    for (var j = 0; j < oftags.length; j++) {
      if (xTags[i].childNodes[0].nodeValue.toLowerCase() == this.oftags[j]) {
        found++;
      }
    }
  }
  if (found == this.oftags.length) {
   return true;
  }
  else return false;
}

function getGridResults(x){
  table="";
  for (var j = 0; j<x.length; j++) {
    table += "<div class='row'>";
    for (i = 0; i < 6 && i<x.length; i++, j++) { 
      var titleXML = x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
      var yearXML = x[i].getElementsByTagName("YEAR")[0].childNodes[0].nodeValue;
      var statusXML = x[i].getElementsByTagName("STATUS")[0].childNodes[0].nodeValue;
      var typeXML = x[i].getElementsByTagName("TYPE")[0].childNodes[0].nodeValue;
      var genresXML = x[i].getElementsByTagName("GENRE");
      var tagsXML = x[i].getElementsByTagName("TAG");

      if ((titleXML.toUpperCase() == input.toUpperCase() || 
          titleXML.toUpperCase().indexOf(input.toUpperCase()) == 0 || 
          input == null || input == "" || input == "") &&
          (yearXML == ofyear || ofyear == null || ofyear == "" )&&(
          statusXML == ofstatus || ofstatus == null || ofstatus == "" )&&(
          typeXML == oftype || oftype == null || oftype == "") &&(
          checkGenres(genresXML) && (checkTags(tagsXML)))) {
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
  var x, i;
  if (newInput == null || newInput == '') {
    input="";
  }
  else{
    this.input = newInput;
  }
  x = xmlDoc.getElementsByTagName("MANGA");

  document.getElementById("search-results-div").innerHTML = getGridResults(x);
}

function getSelectedResults(menuType, value){
  if(menuType == 'year') {this.ofyear = value;}
  if(menuType == 'type') {this.oftype = value;}
  if(menuType == 'status'){ this.ofstatus = value;}
  if(menuType == 'sort') {this.sortby = value;}

  this.getSearchResults('');
}

function search(ele) {
  if(event.keyCode == 13) { 
    getSearchResults(ele.value);  
  }
}

function populateSearchMenu(x, menuType){
  var menu = '<li onclick="getSelectedResults(' + "'" + menuType+"'" + ', null)">none</li>';
  var values =[];
  for (var i = 0; i < x.length; i++) {
    values.push(x[i].childNodes[0].nodeValue);
  }
  values = removeArrayDuplicates(values);
  values.sort(function(a, b){return b-a;});

  for (var j in values) {
    menu += "<li onclick='getSelectedResults(" + '"'+ 
    menuType + '"'+ "," + '"'+ values[j]+ '"'+")'>"+
    values[j] + '</li>';
  }
  return menu;
}

function getDropdownMenu(menu, id){
  var x;
  x = xmlDoc.getElementsByTagName(menu.toUpperCase());

  document.getElementById(id).innerHTML = populateSearchMenu(x, menu);
}

function populateRows (x, type) {
  var rows='';
  var values = [];
  for (var i = 0; i < x.length; i++) {
    values.push(x[i].childNodes[0].nodeValue);
  }
  values = removeArrayDuplicates(values);
  values.sort();

  for (var j in values) {
    rows +='<li class="search-rows" id=' + '"' + values[j].toLowerCase() + '"'+ ' onclick="toogleTag('+"'" + 
    type + "'" +
    ',' + "'" +values[j].toLowerCase() + "'"+ 
    ')">'+ values[j].toLowerCase() + '</li>';
  }

  return rows;
}

function getTagsRows(type){
  var x;
  if (type === 'genres') {
    if (document.getElementById('span-genres').className != 'active'){
      x = xmlDoc.getElementsByTagName(type.slice(0, type.length-1).toUpperCase());
      document.getElementById('genres-div-content').innerHTML = populateRows(x, type.slice(0, type.length-1));
    }
  }
  else if (type === 'tags') {
    if (document.getElementById('span-tags').className != 'active'){
      x = xmlDoc.getElementsByTagName(type.slice(0, type.length-1).toUpperCase());
      document.getElementById('genres-div-content').innerHTML = populateRows(x, type.slice(0, type.length-1));
    }
  }
}

function toogleTag(type, tag){
  if (type === 'tag') {
    if (oftags.indexOf(tag) == -1) {
      oftags.push(tag);
      document.getElementById(tag).className = "selected-tag";
    }
    else{
      if(oftags.length > 1){
         if (oftags.indexOf(tag) > 1) {
          oftags.splice(oftags.indexOf(tag), 1);
        }
        else {
          oftags.splice(oftags.indexOf(tag), 1);
        }
        
      }
      else {
        oftags.pop();
      }
      document.getElementById(tag).className = "";
    }
  }
  else if(type === 'genre'){
    if (ofgenres.indexOf(tag) == -1) {
      ofgenres.push(tag);
      document.getElementById(tag).className = "selected-tag";
    }
    else{
      if(ofgenres.length > 1) {
        if (ofgenres.indexOf(tag) > 1) {
        ofgenres.splice(ofgenres.indexOf(tag), 1);
        }
        else {
          ofgenres.splice(ofgenres.indexOf(tag), 1);
        }
      }
      else {
        ofgenres.pop();
      }
      document.getElementById(tag).className = "";
    }
  }
  getSearchResults('');
}











/*-------- LISTS ----------------*/

function changeUserStatistics(){

}

function populateList(){
  var x, list, status, title, chapter, volume;

  list = '';
  x =xmlDocList.getElementsByTagName("MANGA");


  for (var i = 0; i < x.length; i++) {
    title = x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
    status = x[i].getElementsByTagName("STATUS")[0].childNodes[0].nodeValue;
    chapter = x[i].getElementsByTagName("CHAPTER")[0].childNodes[0].nodeValue;
    volume = x[i].getElementsByTagName("VOLUME")[0].childNodes[0].nodeValue;
    score = x[i].getElementsByTagName("SCORE")[0].childNodes[0].nodeValue;
    list = '<div class="col-lg-8"><a href="#" title="Go to Manga Page">' +
    title + '</a></div><div class="col-lg-1">' +
    score +'</div><div class="col-lg-1">' +
    chapter +'</div><div class="col-lg-1">' +
    volume + '</div>';

    setList(status, list);
  }
}

function setList(status, list){
  switch (status.toLowerCase()) {
    case 'completed':
      document.getElementById('completed-list').innerHTML += list;
      break;
    case 'onhold':
      document.getElementById('onhold-list').innerHTML += list;
      break;
    case 'dropped':
      document.getElementById('dropped-list').innerHTML += list;
      break;
    case 'reading':
      document.getElementById('reading-list').innerHTML += list;
      break;
    default:
      break;
  }
}

function setStatus(status){
  mystatus = status;
  addToList(' ', mytitle);
}

function setChapter(chapter){
  mychapter = chapter;
  addToList(' ', mytitle);
}

function setVolume(volume){
  myvolume = volume;
  addToList(' ', mytitle);
}

function addToList(listName, title){
  mytitle=title;
  var x, newManga, newChapter, newStatus, newTitle, newVolume, newText;

  x = xmlDocList.getElementsByTagName("MANGA");
  for (var i = 0; i < x.length; i++) {
    if(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue == title){
      x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue = title;
      x[i].getElementsByTagName("STATUS")[0].childNodes[0].nodeValue = mystatus;
      x[i].getElementsByTagName("VOLUME")[0].childNodes[0].nodeValue = myvolume;
      x[i].getElementsByTagName("CHAPTER")[0].childNodes[0].nodeValue = mychapter;

      sessionStorage.setItem("myListXML",xmlDocList);
      return;
    }
  }

  //To add values
  x = xmlDocList.getElementsByTagName('MANGA');
  
  newManga = xmlDoc.createElement("MANGA");
  newChapter = xmlDoc.createElement("CHAPTER");  
  newText = xmlDoc.createTextNode(mychapter);
  newChapter.appendChild(newText);
  newStatus = xmlDoc.createElement("STATUS");
  newText = xmlDoc.createTextNode(mystatus);
  newStatus.appendChild(newText);
  newVolume = xmlDoc.createElement("VOLUME");
  newText = xmlDoc.createTextNode(myvolume);
  newVolume.appendChild(newText);
  newTitle = xmlDoc.createElement("TITLE");
  newText = xmlDoc.createTextNode(title);
  newTitle.appendChild(newText);

  xmlDocList.getElementsByTagName('MANGALIST')[0].appendChild(newManga);
  xmlDocList.getElementsByTagName('MANGA')[x.length-1].appendChild(newChapter);
  xmlDocList.getElementsByTagName('MANGA')[x.length-1].appendChild(newVolume);
  xmlDocList.getElementsByTagName('MANGA')[x.length-1].appendChild(newStatus);
  xmlDocList.getElementsByTagName('MANGA')[x.length-1].appendChild(newTitle);

  document.getElementById('edit-manga-list').className += " active";
  sessionStorage.setItem("myListXML",xmlDocList);

}














/*---------HOME--------------*/
function changeHomeTo(goto){
  if (goto === "feed") {
    document.getElementsByClassName("home-div")[0].innerHTML = "FEED HERE I GUESS";
    document.getElementById("feed-link").className = "active";
    document.getElementById("reviews-link").className = "";
    document.getElementById("new-link").className = "";
    document.getElementById("popular-link").className = "";
  }
  if (goto === "reviews") {
     document.getElementsByClassName("home-div")[0].innerHTML = "REVIEWS HERE I GUESS";
    document.getElementById("feed-link").className = "";
    document.getElementById("reviews-link").className = "active";
    document.getElementById("new-link").className = "";
    document.getElementById("popular-link").className = "";
  }
  if (goto === "new") {
    return;
  }
  if (goto === "popular") {
    return; 
  }
}

/*---------MANGA PAGES---------------*/

function populateBasicInfo (title) {
  var x, genresXML, text;

  x = xmlDoc.getElementsByTagName('MANGA');
  for (var i = 0; i < x.length; i++) {
    if(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue == title){
      document.getElementById('manga-cover').src = x[i].getElementsByTagName("IMGURL")[0].childNodes[0].nodeValue;
      document.getElementById("title").innerHTML = x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue;
      document.getElementById("rom-title").innerHTML = x[i].getElementsByTagName("ROMANJI")[0].childNodes[0].nodeValue;
      document.getElementById("jap-title").innerHTML = x[i].getElementsByTagName("NATIVE")[0].childNodes[0].nodeValue;
      document.getElementById("description").innerHTML = x[i].getElementsByTagName("DESCRIPTION")[0].childNodes[0].nodeValue;
      document.getElementById("author").innerHTML = x[i].getElementsByTagName("AUTHOR")[0].childNodes[0].nodeValue;
      genresXML = x[i].getElementsByTagName("GENRE");

      text = '<h4>Genres</h4><span>';
      for (var k = 0; k < genresXML.length; k++) {
        text += '<div>'+ 
        genresXML[k].childNodes[0].nodeValue +
        '</div>';
      }
      text += '</span>';
      document.getElementsByClassName('genres-div')[0].innerHTML = text;

      text="";
      x = xmlDocUser.getElementsByTagName('LIST-NAME');
      for (var j = 0; j < x.length; j++) {
        text += '<li onclick="addToList(' +
         "'" + x[j].childNodes[0].nodeValue + "'," +
         "'" + title + "'" +')">'+ x[j].childNodes[0].nodeValue +'</li>';
      }
      document.getElementById("list-dropdown-menu").innerHTML = text;

      break;
    }
  }
}

function populateCards (title) {
  var x, y, text;

  x = xmlDoc.getElementsByTagName('MANGA');
  for (var i = 0; i < x.length; i++) {
    if(x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue == title){
      y = x[i].getElementsByTagName("TAG");
      document.getElementById('tagsCard').innerHTML = "Tags" + populateRows(y, 'tag');
      for (var k = 0; k < y.length; k++) {
        document.getElementById(y[k].childNodes[0].nodeValue.toLowerCase()).onclick = "";
      }

      y = x[i].getElementsByTagName("STATUS");
      document.getElementById('statusCard').innerHTML = "Status" + 
      '<li>'+ y[0].childNodes[0].nodeValue +'</li>';

      y = x[i].getElementsByTagName("SCORE");
      document.getElementById('statsCard').innerHTML = "Statistics" + 
      '<li>'+ "Average Score: " + y[0].childNodes[0].nodeValue +'</li>';


      //y = x[i].getElementsByTagName("SCORE");
      document.getElementById('ratingCard').innerHTML = "Rating";

      //y = x[i].getElementsByTagName("SCORE");
      document.getElementById('publisherCard').innerHTML = "Publishers";
    }
  }
}


/*-------ANGULAR JS--------*/
var app = angular.module('myapp', []);

app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
      $scope.isAuthenticated = $window.authorized;
      $scope.isListed=false;
}]);