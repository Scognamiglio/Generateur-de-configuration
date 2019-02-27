<html>
	<head>
		<style>
	
			td {
				border: 2px solid grey;
				padding:2em;
				border-radius:0.6em;
			}
			
			input[type=button]{
				border-radius:0.6em;
				box-shadow: 1px 1px grey;
				
			}
	
	
	
		</style>
		<script>
			function copie(){ //Permet simplement de copié le contenu d'une div dans le press papier (div invisible)

				renvoi="";
				cons=document.getElementsByName('console')[0].value;
				ena=document.getElementsByName('ena')[0].value;
				tab=document.getElementsByName('copie')[0].innerHTML.split("<br>"); //utilisation de split pour séparer à chaque retour à la ligne rencontré.
				
				tab[0]=""; //On mets le première élément à rien du tout (il était à "enable" avant)
				if(cons!=""){tab[0]=cons+"<br>";} 	//Si un mot de passe console a était indiqué, on le rentre ici pour le stocker.
				tab[0]+="enable";					//Quoi qu'il arrive, on indique un "enable" pour passer en mode priviligié.
				if(ena!=""){tab[0]+="<br>"+ena;}	//Si un mot de passe priviligié est indiqué, il sera stocké ici pour être utilisé pour la connexion.
				
				for(i=0;i<(tab.length)-1;i++){
					renvoi+=tab[i]+"<br>";			//On retransforme le tableau que l'on a obtenu avec notre "split" en une chaine de caractère qui sera notre nouvelle configuration réseau.
				}
				
			   var lien = renvoi+"<br>";				
			   var container = document.createElement("div"); 	//Un div est crée
			   container.innerHTML = lien;						//on rempli la Div avec la configuration réseaux
			   container.style.opacity = 0 ;					//On rend la Div invisible
			   document.body.appendChild(container);			//On intégère la div à la page

			   var sel = window.getSelection();					//On fait appel à la capacité de sélectionner de notre ordinateur
			   var rangeObj = document.createRange();
			   rangeObj.selectNodeContents(container);			//On selection(comme avec la souris, mais sans le voir) le contenu du Div
			   sel.removeAllRanges();
			   sel.addRange(rangeObj);

			   if (document.execCommand('copy')) {				//On essaye de copié le contenu selectionner dans le presse papier(le copier coller)
				  alert("copie reussi");						//Si ça réussi, c'est indiqué.
			   }
			   else {
				  alert("retenter");							//Sinon on demande de retenter.
			   }					
			}
							
		</script>
	</head>
<body>
<?php
$str=$_POST['final-script']; //Récupération de la configuration réseaux établi à la page précédente.
echo "<table><tr><td>";
echo "<div name='copie'>".str_replace("\n","<br/>", $str)."</div></td>";	//On remplace les \n par des </br> pour que le retour à la ligne sois toujours visible.
echo "<td><label>Un mot de passe priviligie a preciser pour le routeur ?(laiss&eacute; vide si il n'y en a pas.)</label><input name='ena'></input></br>";
echo "<label>Un mot de passe console a preciser pour le routeur ?(laiss&eacute; vide si il n'y en a pas.)</label><input name='console'></input></br></br>";
echo "<input type='button' onclick='copie()' value='Copier' ><input type='button' onclick='envoyer_routeur' value='envoyer_routeur'";
echo "</td></tr></table>";

?>
</body>
</html>