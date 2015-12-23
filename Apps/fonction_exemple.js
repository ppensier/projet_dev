//fonction qui cree un tableau de 4 col et plein de lignes à partir de l'attribut cartesian du czml
	function fonction_temp(json) {
		//on parse le json
		var jsonParse = JSON.parse(json);
		//taille du json
		var len = jsonParse.length;
		
		//on cree la variable coordonnees
		var cartesian = jsonParse[len-1].position.cartesian;


		return {epoch,cartesian};
	}
	

	
	//fonction qui ouvre les fichiers orbite et en recupere le contenu
	function lire_fichier(nom_fichier) {
		var fs = require("fs");
		var contenu;
		contenu=fs.readFileSync(nom_fichier,"UTF-8");
		//console.log(contenu);
		return contenu;
	}
	
	
	
	
	
	
	//fonction qui cree un tableau de 4 col et plein de lignes à partir de l'attribut cartesian du czml
	function fonction_temp(nom_fichierJson) {
		var json = lire_fichier(nom_fichierJson);//à virer peut etre
		//on parse le json
		var jsonParse = JSON.parse(json);
		//taille du json
		var len = jsonParse.length;
		
		//on cree la variable coordonnees
		var cartesian = jsonParse[len-1].position.cartesian;//cartesian est un tableau
		var new_cartesian = [];
		
		var compt = 0;
		var k=0;
		var i=0;
		while(i<cartesian.length){
			console.log("taille : " + cartesian.length)
			new_cartesian[k] = new Array(4);
			new_cartesian[k][0] = cartesian[i];
			new_cartesian[k][1] = cartesian[i+1];
			new_cartesian[k][2] = cartesian[i+2];
			new_cartesian[k][3] = cartesian[i+3];
			i = i + 4;
			k = k + 1;
			//console.log(new_cartesian[k,1]);
		}
		console.log(new_cartesian);
		return new_cartesian
	}
	
	
	fonction_temp("addresse du czml")
	/*ATTENTION : COMMENT ACCEDER AUX ELEMENTS DU TABLEAU	::  console.log(new_cartesian[k,1]);
	ET PAS console.log(new_cartesian[k][1]);
	*/	
	
	
	
	