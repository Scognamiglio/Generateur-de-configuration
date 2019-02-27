// Fait Loïc Scognamiglio

function ChangeP(Protocole){ //gère l'affichage du protocol selectionné.
				//ChangeP(Protocol) récupère en argument RIP OSPF ou EIGRP en fonction de ce qui est selection dans la liste déroulante.

	var divs = ["RIP", "OSPF", "EIGRP"];

	for (i=0; i<3; i++){
		if (Protocole == divs[i]){document.getElementsByName("div")[i].className = "visible";} //la première div nommé "div" contient l'affichage de RIP, la deuxième de OSPF et la troisième de EIGRP
		else 					 {document.getElementsByName("div")[i].className = "invisible";}
				}
}

function entrer(){ //gère envoi de la configuration dans la fênetre à droite. // fait par Lucas Borg.
		config="";
		var proto= document.getElementById("selectProtocol").value;
		
		
		if(proto == "RIP"){ //Quand le rip est selectionné, c'est ici que le code s'exécute.
			var config = "router rip \n";
			if(document.getElementById("RIP_version_2").checked == true){
				config += "version 2 \n";
			}

			if(document.getElementById("RIP_redistribute_static").checked == true){
				config += "redistribute static \n";
			}
			config+=document.getElementsByName("area")[0].value; //voir plus bas nreseaux() et dreseaux()
		}
		

		if(proto == "OSPF"){ //ici, c'est pour OSPF
			if(document.getElementById("OSPF_input_process_id").value != ""){config += "router OSPF " + document.getElementById("OSPF_input_process_id").value + "\n";}
			else 															{alert("Veuillez entrer un ID de processus");exit;}

			if(document.getElementById("OSPF_input_router_id").value != ""){config += "router-id " + document.getElementById("OSPF_input_router_id").value + "\n"}
			
			

			var OSPF_RID = document.getElementById("OSPF_input_router_id").value;
				config+=document.getElementsByName("area")[1].value;
				if (document.getElementById("OSPF_redistribute_static").checked == true){config += "redistribute static \n";}
				if (document.getElementById("OSPF_default_router_originate").checked == true){config += "default-information originate\n"}
				
		}
		
		
		if(proto == "EIGRP"){ //et ici pour EIGRP
			config = "router eigrp "+document.getElementById("EIGRP_input_process_id").value+"\n";
			if(document.getElementById("EIGRP_auto_summary").checked==true){
				config +="no auto-summary\n"
			}
			config+=document.getElementsByName("area")[2].value;
		}
		
		
		config += "exit\n";
		document.getElementById("final-script").value+=config; //envoi la configuration crée dans la fênetre à gauche.
}


function nreseaux(){ //Fonction qui permet le rajout de network.
	var zone=document.getElementsByName("zone")[0].value;
	var proto= document.getElementById("selectProtocol").value;
	
	var arear=document.getElementsByName("area"); 
	var ip=document.getElementsByName("ip");
	var msk=document.getElementsByName("msk");
	//Les 3 variables plus haut sont des tableaux de tout les objets qui ont le même nom, l'élément 0 représente le RIP et ...
	

	if(proto=="RIP"){arear[0].value+="network "+ip[0].value+"\n";}
	if(proto=="OSPF"){arear[1].value+="network "+ip[1].value+" "+msk[0].value+" area "+zone+"\n";}
	if(proto=="EIGRP"){arear[2].value+="network "+ip[2].value+" "+msk[1].value+"\n";}
	
}
function dreseaux(){
	var proto=document.getElementById("selectProtocol").value;
	
	if(proto=="RIP"){b=0;}
	if(proto=="OSPF"){b=1;}
	if(proto=="EIGRP"){b=2;}
	taba=document.getElementsByName("area")[b].value.split("\n");
	renvoi="";
	for(i=0;i<taba.length-2;i++){
		renvoi+=taba[i]+"\n";
	}
	document.getElementsByName("area")[b].value=renvoi;
}