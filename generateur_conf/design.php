

<?php
	//Fait Tristan Lienard et organisé par dossier par Loïc scognamiglio
	header("Content-type:text/css");
	
	$tab_menu_lien = array("design.css","conf_global.css","interfaces.css","routage_statique.css","RoutageDynamique.css");
	//Stocage du nom des fichiers css qui seront lu et utilisé comme css par le fênetre principale 

	$contenu;
	foreach ($tab_menu_lien as $cle => $lien) {
			$fp = fopen("css/".$lien, "r"); //ouverture des fichiers css stocké dans /css

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
