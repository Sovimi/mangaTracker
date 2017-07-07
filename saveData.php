<?php
	$myJSON = $_GET["myJSON"];
	//Save the file.
	file_put_contents('data.json', $myJSON);
	echo $myJSON;
?>