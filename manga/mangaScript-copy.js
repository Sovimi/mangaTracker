var http_request = false;
var xml_tree;

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

function getMangaPage(x){
  page = '';
  for (var j = 0; j<x.length; j++) {
    
    for (i = 0; i < 6 && i<x.length; i++, j++) { 
    }
  }

}

function getSearchResults(mangaTitle) {
  var x, i, xmlDoc, table;
  xmlDoc = loadXML("manga.xml");
  x = xmlDoc.getElementsByTagName("MANGA");

  document.getElementById("info-container").innerHTML = getMangaPage(x);
}