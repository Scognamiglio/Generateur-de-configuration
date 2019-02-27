//Fait par Sylvain Meunier

//Renvoit la couleur attribué au nom de l'interface donné à l'argument
function int_get_color(nom){

	if(nom.includes("GigabitEthernet")){
		color = " int_blue";
	}
	else if(nom.includes("FastEthernet")){
		color = " int_cyan";
	}
	else if (nom.includes("Vlan")) {
		color = " int_green"
	}
	else if(nom.includes("Serial")){
		color = " int_red";
	}
	else{
		color = " int_white";
	}

	return color;
}

//Met à jour la couleur de la ligne de sélection de l'interface à partir du type d'interface sélectionné dans le formulaire
function int_set_select(){
	var nom = document.getElementById("int_type_select").value;
	var color = int_get_color(nom);

	document.getElementById("int_select").className = "int_title"+color;
}

//Vérifie l'état des champs d'adresse et de masque IPv4
function int_verif(){

	//Récupération des champs et de leurs valeurs
	var input_ipv4 = document.forms["int_conf"].elements["addressV4"];
	var masq_ipv4 = document.forms["int_conf"].elements["masqueV4"];
	var ipv4 = input_ipv4.value;
	var masque_v4 = masq_ipv4.value;

	//Remet par défaut les attributs "title" des champs
	masq_ipv4.title = "";
	input_ipv4.title = "";
	//Rend les champs facultatifs
	masq_ipv4.required = false;
	input_ipv4.required = false;

	if ((ipv4 != "") && (masque_v4 == "")) {		//Si l'adresse IP est indiqué, mais pas le masque ...
		masq_ipv4.title = ("Un masque doit être spécifié !");
		masq_ipv4.required = true;
		return -1;
	}
	else if ((ipv4 == "") && (masque_v4 != "")) {	//Si le masque est indiqué, mais pas l'adresse IP ...
		input_ipv4.title = ("Une adresse ip doit être spécifié !");
		input_ipv4.required = true;
		return -2;
	}
	else if ((ipv4 != "") && (masque_v4 != "")) { 	//Si les 2 champs sont indiqués ...
		masq_ipv4.required = true;
		input_ipv4.required = true;
		return 0;
	}
	else{	//Sinon (aucun des champs est indiqué) ...
		return 1;
	}
}

//Fonction lançé à l'appui du bouton "sauvegarder"
function int_submit(){

	//Récupération des valeurs décrivant le nom de l'interface
	var int_type = document.forms["int_conf"].elements["int_type_select"].value;
	var int_card = document.forms["int_conf"].elements["int_card_select"].value;
	var int_mod = document.forms["int_conf"].elements["int_mod_select"].value;
	var int_num = document.forms["int_conf"].elements["int_num_select"].value;

	var interface = int_type + int_card + int_mod + int_num; 	//Reconstitution du nom complet de l'interface
	var commande = "interface "+interface+"\n";					//Commande généré : Configuration de l'interface
	var code_int = int_verif();									//Vérification des champs d'adresse et de masque

	if(code_int == 0){	//Si les 2 champs sont indiqués ...
		//Récupération des valeurs des champs d'adresse IP et de masque
		var ipv4 = document.forms["int_conf"].elements["addressV4"].value;
		var masque_v4 = document.forms["int_conf"].elements["masqueV4"].value;

		commande += "ip address "+ipv4+" "+masque_v4+"\n";	//Commande généré : Configuration de l'adresse et du masque de l'interface
	} else if (code_int < 0){	//sinon (formulaire ou état des champs incorrect) ...
		return false;	//La sauvegarde est annulé
	}

	var enable = document.forms["int_conf"].elements["enable"].checked;		//Récupération de la valeur de la checkbox "enable" (activer l'interface ?)

	if (enable){	//Si la checkbox est coché
		commande += "no shutdown\n";	//Commande généré : activation de l'interface
	}
	else{			//Sinon (chekbox non coché)
		commande += "shutdown\n";		//Commande généré : désactivation de l'interface
	}
	commande += "exit\n";		//Commande généré : sortie d'interface (fin du formulaire)

	//Récupération de la boite (textarea) contenant toute la configuration généré par le formulaire
	var textarea = document.getElementById("final-script");

	if(textarea != null){	//Si la boite existe
		textarea.value += commande;	//Ajout des commandes générés dans la boite
	}
	else{	//Sinon... (boite indisponible, cas de test)
		alert("La zone d'affichage des commandes est inactifs !\nVoici les commandes générés :\n\n"+commande);	//Affichage des commandes générés dans une popup
	}
}
