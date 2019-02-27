<?php
	function load() { //charge et ordonne ce qui s'affiche sur le site.
		
		$tab_menu_lien = array("conf_global.html","interfaces.html","routage_statique.html","RoutageDynamique.html");
		//Stockage des liens des pages html utilisé.
		$tab_menu_texte = array("Configuration globale","Interface","Routage Statique","Routage Dynamique");
		//Indication du noms des onglets en question.
		$page = "<div id=\"menu\">\n<ul id=\"onglets\">\n";

		foreach($tab_menu_texte as $cle=>$txt) {
			$page .= "	<li id=\"".str_replace(" ", "-", $txt)."-menu\"";

			if($cle == 0) //rend la première page html, stocké dans une div, visible dans le site, et rend les autres invisibles.
				$page .= " class=\"active\"";
			else
				$page .= " class=\"unactive\"";

			$page .= "><a onclick=\"active('".str_replace(" ", "-", $txt)."')\">".$txt."</a></li>\n"; //Création d'un élément onclick pour changer la page visible au clique sur l'onglet.
		}

		$page .= "</ul>\n</div>\n";

		foreach ($tab_menu_lien as $cle => $lien) { //Ouvre, puis lis les différents pages html pour les stocké séparément dans des div.
			$fp = fopen("html/".$lien, "r");

			if( !($fp)){}else {

				if($cle == 0)
					$page .= "<div id=\"".str_replace(" ", "-", $tab_menu_texte[$cle])."-body\" class=\"visible\">";
				else
					$page .= "<div id=\"".str_replace(" ", "-", $tab_menu_texte[$cle])."-body\" class=\"cache\">";

				$contenu;
				while(!feof($fp)) {
					$ligne = fgets($fp, 255);
					$contenu .= $ligne;
				}
				preg_match_all('`<body[^>]*>(.*)</body[^>]*>`isU', $contenu, $matches, PREG_PATTERN_ORDER);
				$page .= $matches[1][$cle];
				$page .= "</div>\n";
			}
		}
		$page .= //création du formulaire qui permetra d'envoyer la configuration réseau dans traitement.php
		"<div id=\"formulaire\">
			<form method=\"post\" action=\"traitement.php\">
				<textarea name=\"final-script\" id=\"final-script\">enable\nconf t\n</textarea><br />
				<input type=\"submit\" name=\"Envoyer\" /> <input type=\"reset\" name=\"Reset\" />
			</form>
		</div>
		<script>active('".str_replace(" ", "-", $tab_menu_texte[0])."')</script>";
		return $page;
	}
?>