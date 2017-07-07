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

    function getSearchResults() {
      var x, i, xmlDoc, table;
      xmlDoc = loadXML("manga.xml");
      table = "";
      x = xmlDoc.getElementsByTagName("MANGA");
      for (var j = 0; j<x.length; j++) {
          table += "<div class='row'>";
           for (i = 0; i < 6 || i<x.length; i++, j++) { 
            table += "<div class='col-sm-2'><div class='cover-card'></div><a href='" + 
            x[i].getElementsByTagName("PAGE-URL")[0].childNodes[0].childNodes[0] +
            "'<img src='" + 
            x[i].getElementsByTagName("IMG-URL")[0].childNodes[0].childNodes[0] +
            "' alt=''>></a><div class='cover-data'><a href='"+
            x[i].getElementsByTagName("PAGE-URL")[0].childNodes[0].childNodes[0]+
            "'>"+
            x[i].getElementsByTagName("TITLE")[0].childNodes[0].childNodes[0] +
            "</a></div><span><div title='type' class='manga-info-type'>"+
            x[i].getElementsByTagName("TYPE")[0].childNodes[0].childNodes[0] +
            "</div><div title='average score' class='manga-info-score'>"+
            x[i].getElementsByTagName("SCORE")[0].childNodes[0].childNodes[0]+
            "</div></span></div>";
          }
      }
      document.getElementById("search-results-div").innerHTML = table;
    }