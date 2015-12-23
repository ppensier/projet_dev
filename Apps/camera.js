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
                pixeloffset : new Cesium.Cartesian2(25, 75)
            }

        });

        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        if (Cesium.defined(pickedObject) && (pickedObject.id === positions_GNSS)) {
            positions_GNSS.billboard.scale = 2.0;
            positions_GNSS.billboard.color = Cesium.Color.YELLOW;
            positions_GNSS.label.show = true;
        } else {
            positions_GNSS.billboard.scale = 1;
            positions_GNSS.billboard.color = Cesium.Color.WHITE;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);