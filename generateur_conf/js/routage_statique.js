//Fait par Tristan Lienard

error ="Certaine valeur ne sont pas conforme !\nUne adresse IP s'écrit de la forme : " //erreur utilisable pour toute les fonctions, donc stocké hors des fonctions pour ne pas avoir à l'indiquer plusieurs fois.
		+ "ip route @logicalnet @netmask @netdest [distance]\nExemple :\n"
		+ "ip route 192.168.0.0 255.255.255.0 10.0.0.1 2";
		
		
function checkIp(ip){ //Vérif que l'ip est dans un format convenable.
	elements = ip.split(".");
	if (elements.length!=4) return false;
	for (i=0; i<4; i++)	{ if (elements[i]<0 || elements[i]>255) return false; }
	if (i==0 && elements[i]==0) return false;
  	return true;
}

function createRoad(logicalnet, netmask, netdest, distance){ //crée la route en question.
	if(!checkIp(logicalnet) || !checkIp(netmask) || !checkIp(netdest)) return null;
	road = "ip route "+logicalnet+" "+netmask+" "+netdest;
	parsed = Number(distance);
	if(isNaN(parsed) || parsed == 0) return road;
	return road+" "+parsed;	
}

function addToScript(string){ //Ajoute la configuration à la fênetre de droite.
	document.getElementById("final-script").value += string + "\n";
}

function addRoad(logicalnet, netmask, netdest, distance){ //Ajoute la route qui a était crée.
	var string = createRoad(logicalnet, netmask, netdest, distance);
	if(string != null) addToScript(string);
	else alert(error);
}

function delRoad(logicalnet, netmask, netdest, distance){ //supprime une route à l'aide du préfixe "no"
	var string = createRoad(logicalnet, netmask, netdest, distance);
	if(string != null) addToScript("no " + string);
	else alert(error);
}
function getValue(name){ //Renvoi la valeur d'un objet à l'aide de son nom.
	return document.getElementsByName(name)[0].value;
}