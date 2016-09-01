var renderer;
var stats;

var meshArr=new Array(3);
meshArr[0]=new Array();
meshArr[1]=new Array();
meshArr[2]=new Array();

function initThree() {
    width = document.getElementById('canvas-frame').clientWidth;
    height = document.getElementById('canvas-frame').clientHeight;
    renderer = new THREE.WebGLRenderer({
        antialias : true
    });
    renderer.setSize(width, height);
    document.getElementById('canvas-frame').appendChild(renderer.domElement);
    renderer.setClearColor(0xFFFFFF, 1.0);

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.getElementById('canvas-frame').appendChild(stats.domElement);
}

var camera;
function initCamera() {
    camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
    camera.position.x = 300;
    camera.position.y = 300;
    camera.position.z = 600;
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });
}

var scene;
function initScene() {
    scene = new THREE.Scene();
}

var light;
function initLight() {
    light = new THREE.AmbientLight(0xFF0000);
    light.position.set(100, 100, 200);
    scene.add(light);

}

var cube;
var mesh;
function initObject() {
   
	var geometry = new THREE.BoxGeometry( 100, 100, 100 );
	geometry.faces[ 0 ].color.setHex( 0x000000 );
    geometry.faces[ 1 ].color.setHex( 0x000000 );
    geometry.faces[ 2 ].color.setHex( 0xff0000 );
    geometry.faces[ 3 ].color.setHex( 0xff0000 );
    geometry.faces[ 4 ].color.setHex( 0x00ff00 );
    geometry.faces[ 5 ].color.setHex( 0x00ff00 );
    geometry.faces[ 6 ].color.setHex( 0xff00ff );
    geometry.faces[ 7 ].color.setHex( 0xff00ff );
    geometry.faces[ 8 ].color.setHex( 0xffff00 );
    geometry.faces[ 9 ].color.setHex( 0xffff00 );
    geometry.faces[ 10 ].color.setHex( 0x0000ff );
    geometry.faces[ 11 ].color.setHex( 0x0000ff );

	
    var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors} );

   

    for(var y=-100;y<=100;y+=100){
        for (var x=-100; x <=100; x+=100) {
            for (var z=-100; z <=100; z+=100){
                if(y==-100){
                    mesh = new THREE.Mesh( geometry,material);
                    mesh.position.x=x;mesh.position.y=y;mesh.position.z=z;
                    meshArr[0].push(mesh);
                }
                if(y==0){
                    mesh = new THREE.Mesh( geometry,material);
                    mesh.position.x=x;mesh.position.y=y;mesh.position.z=z;
                    meshArr[1].push(mesh);
                }
                if(y==100){
                    mesh = new THREE.Mesh( geometry,material);
                    mesh.position.x=x;mesh.position.y=y;mesh.position.z=z;
                    meshArr[2].push(mesh);
                }
            }
        }
    }
    for(var i=0;i<3;i++){
        for(var j=0;j<9;j++){
            scene.add(meshArr[i][j]);
        }
    }
  
}

function initGrid(){
	var helper = new THREE.GridHelper( 1000, 50 );
	helper.setColors( 0x0000ff, 0x808080 );
	scene.add( helper );
}

function threeStart() {
    initThree();
    initCamera();
    initScene();
    initLight();


    initObject();
	initGrid();
	
    renderer.render(scene, camera);

}


var angle=0;
var index=1;
function topClockwise(){
    if(angle<90*index){
        angle++;
        requestAnimationFrame(topClockwise);
    }else{
        index=(index%4)+1;
        for(var j=0;j<9;j++){
            meshArr[2][j].position.x=Math.ceil(meshArr[2][j].position.x);
            meshArr[2][j].position.z=Math.ceil(meshArr[2][j].position.z);
        }
        return;
    }
    for(var j=0;j<9;j++){
        meshArr[2][j].setRotationFromMatrix(new THREE. Matrix4().set(
                                                    Math.cos(2*Math.PI/360*angle) ,0,-Math.sin(2*Math.PI/360*angle),0,
                                                    0,1,0,0,
                                                    Math.sin(2*Math.PI/360*angle),0,Math.cos(2*Math.PI/360*angle),0,
                                                    0,0,0,1));
        /*meshArr[2][j].position.set(meshArr[2][j].position.x*Math.cos(2*Math.PI/360*angle)-meshArr[2][j].position.z*Math.sin(2*Math.PI/360*angle),
                                    100,
                                    meshArr[2][j].position.x*Math.sin(2*Math.PI/360*angle)+meshArr[2][j].position.z*Math.cos(2*Math.PI/360*angle));*/
        meshArr[2][j].position.x=meshArr[2][j].position.x*Math.cos(2*Math.PI/360*1)-meshArr[2][j].position.z*Math.sin(2*Math.PI/360*1);
        meshArr[2][j].position.z=meshArr[2][j].position.x*Math.sin(2*Math.PI/360*1)+meshArr[2][j].position.z*Math.cos(2*Math.PI/360*1);
    }
    
    renderer.render(scene, camera);
}