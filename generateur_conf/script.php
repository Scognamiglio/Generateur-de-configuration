

<?php
	//Fait Tristan Lienard et organisé par dossier par Loïc scognamiglio
	$tab_menu_lien = array("script.js","conf_global.js","interfaces.js","routage_statique.js","RoutageDynamique.js");
		//Stocage du nom des fichiers css qui seront lu et utilisé comme css par le fênetre principale 
	$contenu;
	foreach ($tab_menu_lien as $cle => $lien) {
			$fp = fopen("js/".$lien, "r"); //ouverture des fichiers js stocké dans /js

		if( !($fp)){}else {

				while(!feof($fp)) {
					$ligne = fgets($fp, 255); //lit ligne par ligne le fichier en question
					$contenu .= $ligne;
				}
				$contenu .= "\n";
			}
		}
	echo $contenu;
?>