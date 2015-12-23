(function() {
    "use strict";
    /*global console,require,__dirname,process*/
    /*jshint es3:false*/
    
    
    
    /*
    Adaptation du server au besoin du projet O.V.O.S
    */
    
    
    //fonction qui ouvre les fichiers orbite et en recupere le contenu
    function lire_fichier(nom_fichier){
        var fs = require("fs");
        var contenu;
        contenu=fs.readFileSync(nom_fichier,"UTF-8");
        return contenu;
    }
    
    //fonction qui met le contenu dans un tableau
    function parse_fichier(contenu) {
        var i;
        var ligne =  new Array;
        var nombre_de_lignes_au_total=contenu.split(/\n/g).length;
        //console.log(nombre_de_lignes_au_total);
        var i=0;//variable qui suit le parcours du fichier
        var j=0;//variable qui suit le remplissage du tableau
        while(i<nombre_de_lignes_au_total)      
        {
            if((contenu.split(/\n/g)[i]=="\r")||(contenu.split(/\n/g)[i]=="\t\r")||(contenu.split(/\n/g)[i]=="\t")){
            }else{
                //console.log(contenu.split(/\n/g)[i]);
                ligne[j] = contenu.split(/\n/g)[i];//on cree la ligne               
                var reg=new RegExp("[ ]+", "g");
                ligne[j] =  ligne[j].split(reg);//la ligne[j] devient  un tableau contenant les differents elements de la ligne
                ligne[j] = ligne[j].filter( function(val){return val !== ''} );
                j = j+1;
            }   
            i = i+1;

        }
        //console.log(ligne);
        return ligne;
    }

    //fonction qui cree le tableau de coordonnees qui va remplir le czml
    function nouveauContenu(cell) {
        //var pas=300;
        var pas=30;
        var compt = 0;
        var contenu1 = [];
        //console.log(contenu1);
        var pos= 0;
        for (var i=0;i<cell.length;i++){
            //contenu1[i] = new Array()         
            //contenu1[i][0] = compt;
            contenu1[pos] = compt;
            compt = compt + pas;
            pos = pos + 1;
            for (var j=1;j<cell[0].length-3;j++){
                contenu1[pos] = parseFloat(cell[i][j]);
                //contenu1[pos] = -1;//à virer
                pos = pos + 1;
                //var u = parseFloat(cell[i][j]);
                //contenu1 = contenu1.push(u);
                //console.log(contenu1);            
            }
        }
        //console.log("contenu1 : " +contenu1);
        return contenu1;
    }

    //fonction qui remplit le json avec le nouveau tableau des coordonnees d orbites
    function fill_json(nom_fichierJson,contenu) {
        var json = lire_fichier(nom_fichierJson);
        var jsonParse = JSON.parse(json);
        //console.log(jsonParse[0].id);
        var len = jsonParse.length;
        //console.log(jsonParse[0]);
        jsonParse[len-1].position.cartesian = contenu;
        //console.log(jsonParse[len-1].position);
        return jsonParse;
    }
    
    //fonction qui ecrit le json dans le fichier
    function ecrire_fichier(nom_new_fichierJson,contenu){
        contenu = JSON.stringify(contenu,null,'\t');
        var fs = require("fs");
        fs.writeFileSync(nom_new_fichierJson, contenu, "UTF-8");
    }
    

    ////TEMPORAIRE !!!!! AJOUT DES GNSS DS LE CZML
    //
    //
    //var orbito = lire_fichier("C:/Users/Actif/Documents/cours_lalanne/projetdev_lalanne/projetDev_orbites/data_coulot/Orbits_GPS/orbit_GPS_PRN01_30s");
    //var cell = parse_fichier(orbito);
    //
    ////fonction qui garde les trois premieres colonne
    //function temp1(cell){
    //  var new_cell = new Array(cell.length);
    //  //console.log(new_cell);
    //  var compt =0;
    //  var pas = 300;
    //  for (var i=0;i<cell.length;i++){
    //      new_cell[i] = new Array(4);
    //      new_cell[i][0] = compt;
    //      compt = compt + 300;
    //      //for (var j=1;j<4;j++){
    //      //  new_cell[i][j] = cell[i][j];            
    //      //}
    //  } 
    //  console.log(new_cell);
    //  return new_cell
    //}
    //
    //var contenu = temp1(cell);
    //
    ////ecriture ds un fichier
    //function temp2(nom_fichier,contenu){
    //  //contenu = JSON.stringify(contenu,null,'\t');
    //  var fs = require("fs");
    //  fs.writeFileSync(nom_fichier, contenu, "UTF-8");
    //}
    //
    //
    ////temp2("TESTASUPPR.txt",contenu);
    //
    //
    //
    
    

    // A ADAPTER  LE SERVER DOIT CAPTER QU IL Y A UN NOUVEAU DEPOT DE FICHIER D ORBITES ET DOIT EN FAIRE UN NOUVEAU CZML 
    
    
    //fonction qui ecrit le json dans le fichier
    function main(nom_fichierJson){
        
        //appel des fonctions
        var contenu = lire_fichier(nom_fichierJson);
        var cell = parse_fichier(contenu);
        var contenu1 = nouveauContenu(cell);
        var newJson = fill_json("./Apps/SampleData/essai0.czml",contenu1);
        ecrire_fichier("./Apps/SampleData/TESTASUPPR.czml",newJson);
        //ecrire_fichier("./Apps/SampleData/essai.czml",newJson);
    }
    
    //main("C:/Users/Actif/Documents/cours_lalanne/projetdev_lalanne/projetDev_sauvegarde/test.txt");
    //main("./Apps/SampleData/orbite_itrf.txt");


    
    /*
    Fin de l'adaptation du server au besoin du projet OVOS
    */
    
    
     
    
    
    
    
    var express = require('express');
    var compression = require('compression');
    var url = require('url');
    var request = require('request');

    var yargs = require('yargs').options({
        'port' : {
            'default' : 8080,
            'description' : 'Port to listen on.'
        },
        'public' : {
            'type' : 'boolean',
            'description' : 'Run a public server that listens on all interfaces.'
        },
        'upstream-proxy' : {
            'description' : 'A standard proxy server that will be used to retrieve data.  Specify a URL including port, e.g. "http://proxy:8000".'
        },
        'bypass-upstream-proxy-hosts' : {
            'description' : 'A comma separated list of hosts that will bypass the specified upstream_proxy, e.g. "lanhost1,lanhost2"'
        },
        'help' : {
            'alias' : 'h',
            'type' : 'boolean',
            'description' : 'Show this help.'
        }
    });
    var argv = yargs.argv;

    if (argv.help) {
        return yargs.showHelp();
    }

    // eventually this mime type configuration will need to change
    // https://github.com/visionmedia/send/commit/d2cb54658ce65948b0ed6e5fb5de69d022bef941
    var mime = express.static.mime;
    mime.define({
        'application/json' : ['czml', 'json', 'geojson', 'topojson', 'gltf'],
        'text/plain' : ['glsl']
    });

    var app = express();
    app.use(compression());
    app.use(express.static(__dirname));

    function getRemoteUrlFromParam(req) {
        var remoteUrl = req.params[0];
        if (remoteUrl) {
            // add http:// to the URL if no protocol is present
            if (!/^https?:\/\//.test(remoteUrl)) {
                remoteUrl = 'http://' + remoteUrl;
            }
            remoteUrl = url.parse(remoteUrl);
            // copy query string
            remoteUrl.search = url.parse(req.url).search;
        }
        return remoteUrl;
    }

    var dontProxyHeaderRegex = /^(?:Host|Proxy-Connection|Connection|Keep-Alive|Transfer-Encoding|TE|Trailer|Proxy-Authorization|Proxy-Authenticate|Upgrade)$/i;

    function filterHeaders(req, headers) {
        var result = {};
        // filter out headers that are listed in the regex above
        Object.keys(headers).forEach(function(name) {
            if (!dontProxyHeaderRegex.test(name)) {
                result[name] = headers[name];
            }
        });
        return result;
    }

    var upstreamProxy = argv['upstream-proxy'];
    var bypassUpstreamProxyHosts = {};
    if (argv['bypass-upstream-proxy-hosts']) {
        argv['bypass-upstream-proxy-hosts'].split(',').forEach(function(host) {
            bypassUpstreamProxyHosts[host.toLowerCase()] = true;
        });
    }

    app.get('/proxy/*', function(req, res, next) {
        // look for request like http://localhost:8080/proxy/http://example.com/file?query=1
        var remoteUrl = getRemoteUrlFromParam(req);
        if (!remoteUrl) {
            // look for request like http://localhost:8080/proxy/?http%3A%2F%2Fexample.com%2Ffile%3Fquery%3D1
            remoteUrl = Object.keys(req.query)[0];
            if (remoteUrl) {
                remoteUrl = url.parse(remoteUrl);
            }
        }

        if (!remoteUrl) {
            return res.send(400, 'No url specified.');
        }

        if (!remoteUrl.protocol) {
            remoteUrl.protocol = 'http:';
        }

        var proxy;
        if (upstreamProxy && !(remoteUrl.host in bypassUpstreamProxyHosts)) {
            proxy = upstreamProxy;
        }

        // encoding : null means "body" passed to the callback will be raw bytes

        request.get({
            url : url.format(remoteUrl),
            headers : filterHeaders(req, req.headers),
            encoding : null,
            proxy : proxy
        }, function(error, response, body) {
            var code = 500;

            if (response) {
                code = response.statusCode;
                res.header(filterHeaders(req, response.headers));
            }

            res.send(code, body);
        });
    });

    var server = app.listen(argv.port, argv.public ? undefined : 'localhost', function() {
        if (argv.public) {
            console.log('Cesium development server running publicly.  Connect to http://localhost:%d/', server.address().port);
        } else {
            console.log('Cesium development server running locally.  Connect to http://localhost:%d/', server.address().port);
        }
    });

    server.on('error', function (e) {
        if (e.code === 'EADDRINUSE') {
            console.log('Error: Port %d is already in use, select a different port.', argv.port);
            console.log('Example: node server.js --port %d', argv.port + 1);
        } else if (e.code === 'EACCES') {
            console.log('Error: This process does not have permission to listen on port %d.', argv.port);
            if (argv.port < 1024) {
                console.log('Try a port number higher than 1024.');
            }
        }
        console.log(e);
        process.exit(1);
    });

    server.on('close', function() {
        console.log('Cesium development server stopped.');
    });

    process.on('SIGINT', function() {
        server.close(function() {
            process.exit(0);
        });
    });

}   )();



var exec = require('child_process').exec;
exec('g++ -o Applications/test.exe C:/C++/MAINWINDOWFINAL/main.cpp', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});

// window.open('file:///C:/Windows/.exe');

// window.open('file:///D:/projet_dev2/test.exe');
console.log('première exécution ok');


var exec2 = require('child_process').exec;
exec('start D:/projet_dev2/Applications/test.exe', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});



//ligne de commande pour lancer le deuxième serveur: clientServer.js
/*var exec = require('child_process').exec;
exec('node ./clientServer2.js', function(error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);
    if (error !== null) {
        console.log('exec error: ', error);
    }
});
*/