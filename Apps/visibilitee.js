//var viewer = new Cesium.Viewer('cesiumContainer');
 function getCol(matrix, col){
       var column = [];

       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);     
       }
       return column;
}

function include(fileName){
  document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
}

// var viewer = new Cesium.Viewer('cesiumContainer');

include('affichage.js');
var elevationValue=0;

var Fichier = function Fichier(fichier)
{
    if(window.XMLHttpRequest) obj = new XMLHttpRequest(); //Pour Firefox, Opera,...

    else if(window.ActiveXObject) obj = new ActiveXObject("Microsoft.XMLHTTP"); //Pour Internet Explorer 

    else return(false);
    

    if (obj.overrideMimeType) obj.overrideMimeType("text/xml"); //Évite un bug de Safari

   
    obj.open("GET", fichier, false);
    obj.send(null);
   
    if(obj.readyState == 4) return(obj.responseText);
    else return(false);
}


var ajout = 2433282.5;
var difference = [];

var Contenu = Fichier("exemple2.txt");	
var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;

var i;
var a = new Array(nombre_de_lignes_au_total);
var ligne =  new Array();

//Initialisation du tableau orbites-Stations
for (i=0;i<nombre_de_lignes_au_total;i++) {
 		a[i]=new Array(4);
 		for (j=0;j<4;j++) {
  			a[i][j]=0.0;
 	}
}

	for (var i=0;i<nombre_de_lignes_au_total;i++) {

		ligne[i]=Contenu.split(/\n/g)[i];
		var reg=new RegExp("[,]+", "g");
		var temp = ligne[i].split(reg);
		
		a[i][0] = temp[0];
		a[i][1] = temp[1];
		a[i][2] = temp[2];
		a[i][3] = temp[3];
		
	}

	// console.log(a);
	var col = getCol(a, 0);//colonne des temps


function PositionSatellite () {

	//On calcule la date du viewer
	var seconds = (viewer.clock.currentTime.secondsOfDay)/(24*3600);
	var julianDay = viewer.clock.currentTime.dayNumber;
	var date = (julianDay+seconds)-ajout;

	var difference = [];
	var Contenu2 = Fichier("temps.txt");	
	var i;
	var dates_intermediaires =  new Array;
	var dates = new Array;
	var nombre_de_lignes=Contenu2.split(/\n/g).length;
	for (var i=0;i<nombre_de_lignes;i++) {
		dates[i]=Contenu2.split(/\n/g)[i];
		difference.push(Math.abs(dates[i]-date-1));
	}
	
	var min = Math.min.apply(null, difference);
	var position = difference.indexOf(min);//La position correspond à la position du temps le plus proche de la date du viewer
	var val = parseFloat(dates[position]);//val correspond au temps le plus proche de la dta du viewer
	var indice = $.inArray(val.toString(), col);
	
	if (indice != -1) {

		for (var k=indice; k<=indice+59; k++) {
			elevation(a[k][2], a[k][1], a[k][3], 20);

		}	

		}

}

//Intervalle de temps à partir duquell est déclenchée la fonction


function elevation(latStation, LonStation, angle, angleLim) {	
//function elevation(EstStation, NordStation, hStation, EstGRASP, NordGRASP, hGRASP, angleLim) {
	
	if (angle>angleLim) {

		AffichageVrai(latStation,LonStation);
		// Affichage('Networks_Stations/Network_ILRS_ell');	
	}
	else {
	// console.log("satellite pas visible");
		AffichageFaux(latStation,LonStation);
		// alert("faux");
}
}

