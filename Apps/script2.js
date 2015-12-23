
var citizensBankPark = viewer.entities.add({
  name : 'Paris',
  position : Cesium.Cartesian3.fromDegrees(2, 48),
  point : {
    pixelSize : 5,
	color : Cesium.Color.BLACK,
	outlineColor : Cesium.Color.WHITE,
	outlineWidth : 2,
	show:false
  },
  label : {
	text : 'Paris',
    font : '10pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth : 2,
    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
    pixelOffset : new Cesium.Cartesian2(0, -9)
  }
});

var citizensBankPark1 = viewer.entities.add({
  position : Cesium.Cartesian3.fromDegrees(-75.166493, 39.9060534),
  billboard : {
      image : 'http://localhost:8080/Apps/GroundStation.png',
      width : 20,
      height : 20
  },
  label : {
	text : 'Citizens Bank Park',
    font : '14pt monospace',
    style: Cesium.LabelStyle.FILL_AND_OUTLINE,
    outlineWidth : 2,
    verticalOrigin : Cesium.VerticalOrigin.TOP,
    pixelOffset : new Cesium.Cartesian2(0, 32)
  }
});

	  //citizensBankPark.scaleByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0);
	citizensBankPark1.scaleByDistance = new Cesium.NearFarScalar(1.5e2, 1.5, 8.0e6, 0.0);

//viewer.zoomTo(viewer.entities);

