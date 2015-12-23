	
var fs = require("fs");

	function lire_fichier(nom_fichier){
		var fs = require("fs");
		var contenu;
		contenu=fs.readFileSync(nom_fichier,"UTF-8");
		return contenu;
	}

	//fonction qui récupère l attribut cartesian d un fichier czml mis en entree
	function fonction_temp(nom_fichierJson) {
		var json = lire_fichier(nom_fichierJson);
		//on parse le json
		var jsonParse = JSON.parse(json);
		//taille du json
		var len = jsonParse.length;
		
		//on cree la variable coordonnees
		var cartesian = jsonParse[len-1].position.cartesian;//cartesian est un tableau
		
		console.log(cartesian);
		return cartesian
	}
fonction_temp("./Apps/GRASP1.czml");

//Serveur qui récupère le contenu du czml
var http = require('http');
http.createServer(function (req, res) {
    console.log('request received');
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('_testcb(\''+ fonction_temp("./Apps/GRASP1.czml") + '\')');
    res.end();
}).listen(8124);
