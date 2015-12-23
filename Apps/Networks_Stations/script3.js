var gmstConstant0 = 6 * 3600 + 41 * 60 + 50.54841;
        var gmstConstant1 = 8640184.812866;
        var gmstConstant2 = 0.093104;
        var gmstConstant3 = -6.2E-6;
        var rateCoef = 1.1772758384668e-19;
        var wgs84WRPrecessing = 7.2921158553E-5;
        var dateInUtc = date.addSeconds(-date.getTaiMinusUtc());

        var t;
        var diffDays = dateInUtc.getJulianDayNumber() - 2451545;
        if (dateInUtc.getSecondsOfDay() >= 43200.0) {
            t = (diffDays + 0.5) / Cesium.TimeConstants.DAYS_PER_JULIAN_CENTURY;
        } else {
            t = (diffDays - 0.5) / Cesium.TimeConstants.DAYS_PER_JULIAN_CENTURY;
        }

        var gmst0 = gmstConstant0 + t * (gmstConstant1 + t * (gmstConstant2 + t * gmstConstant3));
        var angle = (gmst0 * Cesium.Math.TWO_PI / 86400.0) % Cesium.Math.TWO_PI;
        var ratio = wgs84WRPrecessing + rateCoef * (dateInUtc.getJulianDayNumber() - 0.5 - 2451545);

        var secondsSinceMidnight = (dateInUtc.getSecondsOfDay() + Cesium.TimeConstants.SECONDS_PER_DAY / 2.0) % 86400.0;

        var gha = angle + (ratio * secondsSinceMidnight);

        var cosGha = Math.cos(gha);
        var sinGha = Math.sin(gha);
        return new Cesium.Matrix3(cosGha, sinGha, 0.0, -sinGha, cosGha, 0.0, 0.0, 0.0, 1.0);
    }

    var time = new Cesium.JulianDate();

    scene.setAnimation(function() {
        scene.setSunPosition(Cesium.SunPosition.compute(time).position);
        time = time.addSeconds(20.0);

        scene.getCamera().transform = new Cesium.Matrix4(computeTemeToPseudoFixedMatrix(time), Cesium.Cartesian3.ZERO);
    });
