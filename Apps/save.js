function PositionSatellite () {
	var fichier='Networks_Stations/Satellite.txt';
	var Contenu = Fichier(fichier);	
		//console.log(Contenu);
	var i;
	var a = new Array();
	var ligne =  new Array;
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	for (var i=0;i<nombre_de_lignes_au_total;i++) {
		ligne[i]=Contenu.split(/\n/g)[i]
		var reg=new RegExp("[,]+", "g");
		a[i] = ligne[i].split(reg);
				
	}

	var seconds = viewer.clock.currentTime.secondsOfDay;
	var julianDay = viewer.clock.currentTime.dayNumber;

	var dateViewer = new Cesium.JulianDate(julianDay, seconds, Cesium.TimeStandard.UTC);

	var julianDateBeginning = new Array();

	julianDateBeginning [0] = Cesium.JulianDate.fromIso8601('2012-03-15T10:00:00Z');
	
	var difference = [];
	var maxTemps=a[nombre_de_lignes_au_total-1][0];
	var pas=maxTemps/(nombre_de_lignes_au_total-3);
	for (var i=1;i<nombre_de_lignes_au_total+1;i++){

		julianDateBeginning[i] = Cesium.JulianDate.addSeconds(julianDateBeginning[i-1], pas, new Cesium.JulianDate());
		difference.push(Math.abs(Cesium.JulianDate.daysDifference(julianDateBeginning[i],dateViewer)));

	}

	var min = Math.min.apply(null, difference);
	var position = difference.indexOf(min);

	var ContenuStations = Fichier('Networks_Stations/Network_IDS_ell');
	var i;
	var ligne =  new Array;
	var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
	for (var i=0;i<nombre_de_lignes_au_total;i++)
	{
		ligne[i]=Contenu.split(/\n/g)[i]
		var reg=new RegExp("[        ]+", "g");
		var b = ligne[i].split(reg);
		elevation(b[2], b[1], b[3], a[position][1], a[position][2], a[position][3], 5);
	
	}

	console.log(dateViewer);

	//console.log("x: "+a[position][1],"y: "+a[position][2],"z: "+a[position][3]);
		
}