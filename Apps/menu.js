
//Fonction d'inclusion permettant d'inclure des fichiers
function include(fileName){
  document.write("<script type='text/javascript' src='"+fileName+"'></script>" );
}

//Appel des deux fichiers contenant les fonctions d'affichage et de visibilité
include('visibilitee.js');
include('affichage.js');


//Fonction pour calculer les éléments premettant de présenter une vue en ICRF
function icrf(scene, time) {
    if (scene.mode !== Cesium.SceneMode.SCENE3D) {
        return;
    }

    var icrfToFixed = Cesium.Transforms.computeIcrfToFixedMatrix(time);
    if (Cesium.defined(icrfToFixed)) {
        var camera = viewer.camera;
        var offset = Cesium.Cartesian3.clone(camera.position);
        var transform = Cesium.Matrix4.fromRotationTranslation(icrfToFixed);
        camera.lookAtTransform(transform, offset);
    }
}

//Fonction recupérant les résultats de la fonction précédante et les affectant au viewer
function viewInICRF() {
    Sandcastle.declare(viewInICRF);

    var vm = viewer.homeButton.viewModel;
    vm.duration = 0.0;
    vm.command();
    vm.duration = 3.0;

    clock.multiplier = 3 * 60 * 60;
    scene.preRender.addEventListener(icrf);
    scene.globe.enableLighting = true;
}
//var viewer = new Cesium.Viewer('cesiumContainer');//Initialisation du viewer
// viewer.dataSources.add(Cesium.CzmlDataSource.load('GRASP1.czml'));//Affichage du satellite GRASP
// viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/essai.czml'));//Affichage des satellites GNSS
            

var options = [{
    text : 'Choix du satellite'//Initialisation de la liste déroulante du choix des satellites
}];

//Fonction récupérant le nom des satellites présents dans le répertoire approprié et affichant les données propres à chaque fichier
function addsatellite (data) {
    var lignes =data.split("|");
    for( var i in lignes ){
        var option1 = {text : lignes[i],
        onselect : function() {//Evènements qui se passent quand on chage un satellite
            console.log(lignes[0]);
            viewer.dataSources.add(Cesium.CzmlDataSource.load('GRASP1.czml'));//Affichage du satellite GRASP
            viewer.dataSources.add(Cesium.CzmlDataSource.load('SampleData/essai.czml'));//Affichage des satellites GNSS
            viewInICRF();
            window.setInterval(function(){
    // alert(elevationValue);
    viewer.entities.removeAll();
    PositionSatellite();

}, 5000);//Affichage de la vue en ICRF
            //Affichage('Networks_Stations/Network_IDS_ell');//Doris
            //Affichage('Networks_Stations/Network_ILRS_ell');//Laser
            //Affichage('Networks_Stations/Network_IVS_ell');//VLBI
            //Affichage('Networks_Stations/Network_NEN_ell');//Near Earth Network
            Sandcastle.highlight(viewInICRF);}};
        options.push(option1);//Construction de la liste déroulante pour le choix des satellites
      
    }

Sandcastle.addToolbarMenu(options);//Affichage de la barre de choix du satellite
}

//Fonction permettant de réinitialiser la vue
Sandcastle.reset = function() {
    viewer.entities.removeAll();
    viewer.dataSources.removeAll();
};

