<!-- Fait Tristan Lienard-->


<?php
	require_once("./Configurateur.php"); 	//Récupère le return de Configurateur.php
	$menu = load();							//Le charge dans $menu
?>
<!DOCTYPE html>
<html>
<head>
	<title>Projet</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="design.php"> <!-- passer par un .php au lieu d'un .css permet de lire le fichier css qui sera utilisé en fonction de la catégorie -->
	<script type="text/javascript" src="script.php"></script> <!-- même raison que pour le .css -->
</head>
<body onLoad="int_set_select();"> <!--colorie le premier onglet lié au interface -->
<?php
	echo $menu; //affiche $menu, une variable qui contient l'affichage des différents menu séparé dans des div différent.
?>
</body>
</html>