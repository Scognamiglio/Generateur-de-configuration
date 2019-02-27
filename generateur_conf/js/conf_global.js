//Fait par Loïc Scognamiglio

    function envoig(){ //Crée la configuration et l'envoi dans le cadre à gauche.
		erreur=false;
		message="";
		envoi="";
		//Stockage des informations nécéssaire dans des variables car utilisation à plusieurs reprise et que ça rend la lecture plus facile.
		
       host=document.getElementsByName("conf-host")[0].value;
	   dnl=document.getElementsByName("conf-dnl")[0].checked;
	   NDNS=document.getElementsByName("conf-NDNS")[0].value;
	   mdp_ena=document.getElementsByName("conf-mdp-ena")[0].value;
	   mdp_ena_secret=document.getElementsByName("conf-crypt-ena")[0].checked;
	   mdp_routeur=document.getElementsByName("conf-mdp_routeur")[0].value;
	   mdp_telnet=document.getElementsByName("conf-mdp_telnet")[0].value;
	   etm=document.getElementsByName("conf-exec-timeout_m")[0].value;
	   ets=document.getElementsByName("conf-exec-timeout_s")[0].value;
	   crpya=document.getElementsByName("conf-encry")[0].checked;
	   veille=document.getElementsByName("veille")[0].checked;
	   
		if(veille){ //Si la veille est activé, vérification des valeurs indiqué.
			if(isNaN(parseInt(etm))){
				message+="le nombre de minute doit être un nombre\n";
				erreur=true;
			}
			if(isNaN(parseInt(ets))){
				message+="le nombre de seconde doit être un nombre";
				erreur=true;
			}
			if(erreur){
				alert(message);
			}
		}
		if(host!=""){
			envoi="hostname "+host+"\n";
		}
		if(dnl==true){
			envoi+="no ip domain-lookup\n";
		}
		if(NDNS!=""){
			envoi+="ip name-server "+NDNS+"\n";
		}
		if(mdp_ena!=""){
			if(mdp_ena_secret==true){ // Si la case "secret" est coché, le mot de passe est 
				envoi+="enable secret "+mdp_ena+"\n";
			}
			else{
				envoi+="enable password "+mdp_ena+"\n";
			}
		}
		if(mdp_routeur!=""){
			envoi+="line console 0\nno login\nlogging sync\npassword "+mdp_routeur+"\nexit\n";
		}
		if(mdp_telnet!=""){
			envoi+="line vty 0 4\nno login\npassword "+mdp_telnet+"\nexit\n";
		}
		if(veille==true){
			envoi+="line console 0\nexec-timeout "+etm+" "+ets+"\nexit\n";
		}
		if(crpya==true){
			envoi+="service password-encryption\n";
		}
		document.getElementById("final-script").value+=envoi; //envoi la configuration dans la fênetre de droite.
		}
