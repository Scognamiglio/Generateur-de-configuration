//Fait par Tristan Lienard.

function active(nom){ //gère la pages selectionner par l'onglet
	var element = document.getElementsByClassName('active')[0].getAttribute('id');
	document.getElementById(element).className='unactive'; 
	var name = nom + "-menu";
	document.getElementById(name).className='active'; 

	element = document.getElementsByClassName('visible')[0].getAttribute('id');
	document.getElementById(element).className='cache'; //applique une class qui le rend invisible à l'aide du css
	name = nom + "-body";
	document.getElementById(name).className='visible'; //applique une class qui le rend visible à l'aide du css

}