	

function point(lat, lon, namePoint, fichier) {
	if (fichier=='Networks_Stations/Network_IDS_ell'){	
		//var image = new Image();
		//image.src = "../Apps/GroundStation.png";
		var positions_GNSS = viewer.entities.add({
			name : namePoint,
			show:true,
			description:'type: Station GNSS',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost:8080/Apps/GroundStation.png',
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(10, 10)

			}

		});

		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && (pickedObject.id === positions_GNSS)) {
            positions_GNSS.billboard.scale = 1.5;
            positions_GNSS.billboard.color = Cesium.Color.YELLOW;
            positions_GNSS.label.show = true;
            positions_GNSS.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost:8080/Apps/GroundStation.png'.height);
            positions_GNSS.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);         
            positions_GNSS.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
            positions_GNSS.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
        } else {
            positions_GNSS.billboard.scale = 1;
            positions_GNSS.billboard.color = Cesium.Color.WHITE;
            positions_GNSS.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}

	else if(fichier=='Networks_Stations/Network_ILRS_ell'){
		var positions_Laser = viewer.entities.add({
			name : namePoint,
			show:true,
			description:'type: Station Laser',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost:8080/Apps/LaserStation.png',
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(10, 10)
			}
		});
		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && (pickedObject.id === positions_Laser)) {
            positions_Laser.billboard.scale = 1.5;
            positions_Laser.billboard.color = Cesium.Color.YELLOW;
            positions_Laser.label.show = true;
            positions_Laser.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
            positions_Laser.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
            positions_Laser.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);
            positions_Laser.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost:8080/Apps/GroundStation.png'.height);
        } else {
            positions_Laser.billboard.scale = 1;
            positions_Laser.billboard.color = Cesium.Color.WHITE;
            positions_Laser.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);



	}

	else if(fichier=='Networks_Stations/Network_IVS_ell'){
		var positions_VLBI = viewer.entities.add({
			name : namePoint,
			show:true,
			description:'type: Station VLBI',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost:8080/Apps/OpticalTrackingStation.png',
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20
			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(50, 50)
			}
		});

		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && (pickedObject.id === positions_VLBI)) {
            positions_VLBI.billboard.scale = 1.5;
            positions_VLBI.billboard.color = Cesium.Color.YELLOW;
            positions_VLBI.label.show = true;
            positions_VLBI.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
            positions_VLBI.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost:8080/Apps/GroundStation.png'.height);
            positions_VLBI.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);
            positions_VLBI.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
        } else {
            positions_VLBI.billboard.scale = 1;
            positions_VLBI.billboard.color = Cesium.Color.WHITE;
            positions_VLBI.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);


	}

	else if(fichier=='Networks_Stations/Network_NEN_ell'){
		var positions_DORIS = viewer.entities.add({
			name : namePoint,
			show:true,
			description:'type: Station DORIS',
			position : Cesium.Cartesian3.fromDegrees(lon, lat),
			billboard : {
				image : 'http://localhost:8080/Apps/RadarStation.png',
				width : 20,
				scaleByDistance : new Cesium.NearFarScalar(1.5e2, 5.0, 1.5e7, 0.7),
				height : 20

			},
            label : {
				show : false,
				text : namePoint,
				position : Cesium.Cartesian3.fromDegrees(lon+10, lat+10),
				pixeloffset : new Cesium.Cartesian2(10, 10)
			}
		});

		handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    	handler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && (pickedObject.id === positions_DORIS)) {
            positions_DORIS.billboard.scale = 1.5;
            positions_DORIS.billboard.color = Cesium.Color.YELLOW;
            positions_DORIS.label.show = true;
            positions_DORIS.label.horizontalOrigin = Cesium.HorizontalOrigin.LEFT;
            positions_DORIS.label.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
            positions_DORIS.label.position = Cesium.Cartesian3.fromDegrees(lon+10, lat+10);
            positions_DORIS.label.pixeloffset = new Cesium.Cartesian2(0.0, -'http://localhost:8080/Apps/GroundStation.png'.height);
        } else {
            positions_DORIS.billboard.scale = 1;
            positions_DORIS.billboard.color = Cesium.Color.WHITE;
            positions_DORIS.label.show = false;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);



	}
		
	}


function Affichage(fichier) {
var Contenu = Fichier(fichier);
var i;
var ligne =  new Array;
var nombre_de_lignes_au_total=Contenu.split(/\n/g).length;
for (var i=0;i<nombre_de_lignes_au_total;i++)
{
	ligne[i]=Contenu.split(/\n/g)[i]
	var reg=new RegExp("[        ]+", "g");
	var a = ligne[i].split(reg);
	//if (fichier=='Networks_Stations/Network_IDS_ell'){
		
		point(a[2],a[1],a[0],fichier);
	//}
	
}
}


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




