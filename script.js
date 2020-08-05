/* 
JAVASCRIPT 2D PLATFORMER GAME MADE BY: PERIKLIS KALAFATAKIS 2019/2020
ALL CODE/IDEAS RIGHTS RESERVED
CONTACT : periklis.kalatakis@gmail.com
 */



// DECLARING THE CANVASIES!
var canvasstatic = document.getElementById('canvasstatic');
var canvasdynamic = document.getElementById('canvasdynamic');
var canvasstats = document.getElementById('canvasstats');
var canvaseffects = document.getElementById('canvaseffects');


//DECLARING THE 2 CTX's!
var ctxs = canvasstatic.getContext("2d");
var ctxd = canvasdynamic.getContext("2d");
var ctxst = canvasstats.getContext("2d");
var ctxe = canvaseffects.getContext("2d");

//////////////////////////
//VARIABLE DECLAREATIION//
//////////////////////////

///////IMAGES///////

var limage = new Image();
limage.src="images/loading.png";

var forestbackground = new Image();
forestbackground.src="images/fb2.png";

var citybackground = new Image();
citybackground.src = "images/city.png"

var dirtblock = new Image();
dirtblock.src = "images/dirt.jpg";

var woodblock = new Image();
woodblock.src = "images/wood.jpg";

var stoneblock = new Image();
stoneblock.src = "images/stone.jpg"

var underdirt = new Image();
underdirt.src = "images/underdirt.jpg";

var leavesblock = new Image();
leavesblock.src = "images/leaves.png";

var knight = new Image();
knight.src = "images/knight.png";

var knight1run = new Image();
knight1run.src = "images/knight1run.png";

var knight2run = new Image();
knight2run.src = "images/knight2run.png";

var knight1runleft = new Image();
knight1runleft.src = "images/knight1runleft.png";

var knightattack = new Image();
knightattack.src = "images/knightattack.png";

var knightleft = new Image();
knightleft.src = "images/knightleft.png";

var knightattackleft = new Image();
knightattackleft.src = "images/knightattackleft.png";

var enemyimg1 = new Image();
enemyimg1.src = "images/enemy1.png";

var firstsword = new Image();
firstsword.src = "images/firstsword.png";

var firstswordleft = new Image();
firstswordleft.src = "images/firstswordleft.png";

var silverchest = new Image();
silverchest.src = "images/silverchest.png";

var openedsilverchest = new Image();
openedsilverchest.src = "images/openedsilverchest.png";

var goldchest = new Image();
goldchest.src = "images/goldchest.png";

var openedgoldchest = new Image();
openedgoldchest.src = "images/openedgoldchest.png";

var goldstat = new Image();
goldstat.src = "images/goldstat.png";

var portal = new Image();
portal.src = "images/portal.png";

var dash = new Image();
dash.src = "images/dash.png"

var fireball = new Image();
fireball.src = "images/fireball.png"

var fireballleft = new Image();
fireballleft.src = "images/fireballleft.png"

var powerup = new Image();
powerup.src = "images/powerup.png"

var heal = new Image();
heal.src = "images/heal.png"


//GLOBAL VARIABLES
var test;
var times=0;
var velocity = 14;
var gravitystrength = 2.5;
var id= 1;
var distancetravel = 0;
var activategravity = true;
var moveblock = false;
var moveright = true;
var abletoattack = true;
var playerattackstate = false;
var invisibility = false;
var spell1cast = false;
var learneddash = false;
var learnedfireball = false;
var learnedpowerup = false;
var learnedheal = false;
var movedirection = "right"
var activeimage = knight;
var collisionarray =[];
var enemyarray = [];
var breakablearray = [];
var objectsarray =[];
var fireballsarray = [];

//DEFINING LEVELS
var levels=["FOREST", "CITY", "MINE", "CASTLE"];

//GAME STATES ARE:
//1 - LOADING SCREEN
//2 - GAME SCREEN
//3 - MENU SCREEN
//4 - PAUSE SCREEN
var gamestate=1;


///////CLASSES AND OBJECTS///////


//PLAYER OBJECT
var player = {
    x: 25,
    y: 725,
    dmg: 3,
    lvl: 1,
    xp: 0,
    skillpoints: 0,
    hp: 15,
    mp: 10,
    mreg: 0.025,
    jump: true,
    speed: 2.5,
    h: 40,
    w: 25,
    facing: "right",
    gold: 0

};

//ENEMY CLASS
class enemy {
    constructor(xe,ye,we,he,hp,dmg,xp,ranger,rangel,golde){
        this.xe = xe;
        this.ye = ye;
        this.we = we;
        this.he = he;
        this.hp = hp;
        this.dmg = dmg;
        this.xp = xp;
        this.ranger = ranger;
        this.rangel = rangel;
        this.golde= Math.floor(Math.random()*5+1)

    }
}

//CLACK FOR COLLISON POSSIBLE BLOCKS
class Collisionblock {
    constructor(x,y,w,h,br){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.br = br;
    }
}

class Breakable {
    constructor(xb,yb,wb,hb){
        this.xb = xb;
        this.yb = yb;
        this.wb = wb;
        this.hb = hb;
    }
}

class interactiveobject {
    constructor(id,xo,yo,wo,ho,type){
        this.id = id;
        this.xo = xo;
        this.yo = yo;
        this.wo = wo;
        this.ho = ho;
        this.type = type;
        
    }
}

class fireballobjects{
    constructor(xf,yf,wf,hf,direction){
        this.xf = xf;
        this.yf = yf;
        this.wf = wf;
        this.hf = hf;
        this.direction = direction;
        this.rangef = xf + 200;
        this.rangefleft = xf - 200;
        
        
    }
}
//////////////////////////////////////////////////////////////MAPS//////////////////////////////////////////////////////////////

var forestmap = [

[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,21,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,0,2,2,2,0,0,2,2,2,2],
[0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,0,0,0,2,2,0,0,2,2],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
[0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,0,0,0,0,0,0,0,0],
[0,0,4,0,0,0,21,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,0,2,2,2,2],
[0,0,4,0,2,2,2,2,2,0,0,10,10,0,0,2,2,2,2,2,0,0,10,0,0,2,2,2,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,0,0,0,0],
[0,0,2,2,2,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,2,2,2,0,0,0,0,0,0],
[0,0,4,4,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,10,0,0],
[0,0,4,4,0,0,2,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,2,2,2,2],
[0,0,2,2,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
[0,0,0,2,0,0,10,0,20,2,0,0,2,2,2,2,2,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0,0,0,0,2,2,0,2,2,2,0,0,0,0,0,0],
[0,0,0,2,2,2,2,2,2,2,0,0,2,2,0,0,2,2,2,0,0,0,0,2,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,2,0,0,0,0,2,2,2,2],
[0,0,0,0,0,0,0,0,0,0,0,21,2,20,4,4,4,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,2,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,2,0,2,2,2,2,2,2,2,2,2,2,0,0,0,0,2,2,2,2,0,0,0,0,2,2,2,2,2,2,2,2,20,0,0,0,0,0,0,0],
[0,0,0,0,0,0,2,0,2,0,2,2,2,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0,0],
[0,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,2,2,2,2,2,2,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,2,0,0,0,0,0,0,2,0,0,0,2,2,2,2,2,0,0,4,0,0,0,2,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,2,2,2,2,0,0,0,2,0,0,0,0,0,0,0,4,0,0,0,2,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,20,2,0,0,0],
[0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,0,0,0,0,4,0,2,2,2,0,0,0],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], //DIRT
[3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3] //UNDER DIRT

];

var citymap = [

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [5,5,5,5,5,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] 
    ];

//FUNCTION TO LOAD LEVELS FROM ARRAYS
function loadlevel(level){
    var n =0;
    let posX=0;
    let posY=0;

    if(level === forestmap){
        drawimage(ctxs,portal,1150,700,25,50);
        drawimage(ctxs,portal,350,25,25,50);
        drawimage(ctxs,portal,1175,25,25,50);
    }
    
    for(var i=0; i < level.length; i++){
        for(var j=0; j < level[i].length; j++){

//IF AIR
if(level[i][j]===0){
    
}
    
    //IF EARTH BLOCK
    else if(level[i][j]===1){
    drawimage(ctxs,dirtblock,posX,posY,25,25);
    block = new Collisionblock(posX,posY,25,25);
    collisionarray.push(block);

    }
        //IF WOOD BLOCK
        else if(level[i][j]===2){
            drawimage(ctxs,woodblock,posX,posY,25,25);
            // CREATING OBJECTS FOR EACH WOODEN BLOCK AND ADDING THEM TO COLISSION OBJECTS TO CHECK LATER
            block = new Collisionblock(posX,posY,25,25,"no");
            collisionarray.push(block);


        }
            //IF UNDER DIRT
            else if(level[i][j]===3){
                drawimage(ctxs,underdirt,posX,posY,25,25,"no");
                
            }

            //IF LEAVES
            else if(level[i][j]===4){
                drawimage(ctxd,leavesblock,posX,posY,25,25);
                breakableblock = new Breakable(posX,posY,25,25);
                breakablearray.push(breakableblock);

                 
            }

            //IF STONE
            else if(level[i][j]===5){
                drawimage(ctxs,stoneblock,posX,posY,25,25);
                // CREATING OBJECTS FOR EACH STONE BLOCK AND ADDING THEM TO COLISSION OBJECTS TO CHECK LATER
                block = new Collisionblock(posX,posY,25,25,"no");
                collisionarray.push(block);
    
    
            }

            //IF ENEMY ORC
           else if(level[i][j]===10){
            drawimage(ctxd,enemyimg1,posX,posY,25,25);
            enemies = new enemy(posX,posY,25,25,10,1,25,posX-50,posX+50,2);
            enemyarray.push(enemies)
           }


           // IF SILVER CHEST
           else if(level[i][j]===20){
            
            drawimage(ctxd,silverchest,posX,posY,25,25);
            interobj = new interactiveobject(id,posX,posY,25,25,"silver")
            objectsarray.push(interobj);
           }

           //IF GOLD CHEST
           else if(level[i][j]===21){
            
            drawimage(ctxd,goldchest,posX,posY,25,25);
            interobj = new interactiveobject(id,posX,posY,25,25,"gold")
            objectsarray.push(interobj);
           }


posX+=25;
}

posY+=25;
posX=0;

    }
}

///////////////////////
//FUNCTIONS AND START//
///////////////////////

//FUNCTION TO DRAW FILLED RECTANGLES
function drawrect(ctx,x,y,w,h,color){
    ctx.fillStyle=color;
    ctx.fillRect(x,y,w,h);
    
}

//FUNCTION TO DRAW OUTLINE RECTANGLES
function drawrectoutline(ctx,x,y,w,h,l,color){
    ctx.strokeStyle=color;
    ctx.lineWidth=l;
    ctx.strokeRect(x,y,w,h);
    
}

//FUNCTION TO DRAW TEXT
function drawtext(ctx,x,y,text,font,color){
        ctx.font=font;
        ctx.fillStyle=color;
        ctx.fillText(text,x,y);
}
        
//FUNCTION TO DRAW IMAGE
function drawimage(ctx,imagelink,x,y,w,h){
    ctx.drawImage(imagelink,x,y,w,h);
}

//FUNCTION TO DETECT COLLISION OF 2 RECTANGLES
function collision(x1,x2,y1,y2,w1,w2,h1,h2) {
if (x1 < x2 + w2 && x1 + w1 > x2 && y1 < y2 + h2 && y1 + h1 > y2) {
    return true;

    }
}

//FUNCTION TO DRAW LINES IF NEEDED
function drawline(ctx,x1,y1,x2,y2,w,color){


    ctx.beginPath();
    ctx.lineWidth = w;
    ctx.strokeStyle = color;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();

}

//FUNCTION TO CHECK IF THERE IS A PLAYER COLLISION WITH THE ENEMY, NOT TO MAKE DAMAGE TO FOR THE PLAYER TO TAKE DAMAGE
function checkingcollisionwithenemy(){

    for(i=0;i<enemyarray.length;i++){
    if(collision(player.x,enemyarray[i].xe,player.y,enemyarray[i].ye,player.w,enemyarray[i].we,player.h,enemyarray[i].he) && invisibility === false){

        invisibility = true;
        player.hp -= enemyarray[i].dmg

    setTimeout(function(){invisibility=false},2000);        
    }
}

}
//FUNCTION TO CLEAR CANVAS
function clearcanvas(ctx){
    ctx.clearRect(0,0,1200,800);
}

//FUNCTION FOR GAMELOOP
function gameloop(){
    playermovement();
}


//FUNCTION FOR NEW GAME
function NewGame(){

drawimage(ctxs,forestbackground,0,0,1200,800);
loadlevel(forestmap);
igameloop = setInterval(gameloop,20);

}

function tipsforgame(){
    
    for(i=0;i<objectsarray.length;i++){
        if(collision(player.x,objectsarray[i].xo,player.y,objectsarray[i].yo,player.w,objectsarray[i].wo,player.h,objectsarray[i].ho)){
            drawtext(ctxd,player.x-2,player.y-2,"E","12px Arial","black");
        }
    }
}

//FUNCTION FOR ONCE THE LEVEL JUNGLE IS OVER TO GO TO CITY LEVEL
function nextlevel(){

collisionarray.splice(0,collisionarray.length)
enemyarray.splice(0,enemyarray.length)
breakablearray.splice(0,breakablearray.length)
objectsarray.splice(0,objectsarray.length)
fireballsarray.splice(0,fireballsarray.length)
drawimage(ctxs,citybackground,0,0,1200,800)
loadlevel(citymap)
drawtext(ctxs,400,400,"TO BE CONTINUE","50px Arial","black")
player.x=25;
player.y=125;
}
//GAMELOOP FUNCTION

function gameloop(){

playermovement();
update();
gravity();
loadenemies();
checkingcollision();
stats();
checkingcollisionwithenemy();
breakableblocks();
checkingcollisionforbreak();
loadobjects();
portalcollision();
tipsforgame();
manareg();
secondspell();


}

//FUNCTION FOR GRAVITY 
function gravity(){
    if(activategravity){
        player.y += gravitystrength
        gravitystrength += 0.08;
    }
    
}

//FUNCTION FOR SPEED UP 
function firstspell(){
    player.speed = player.speed/2;
    spell1cast = false;
}

//FUNCTION FOR FIREBALL HANDLING
function secondspell(){
    for(i=0;i<fireballsarray.length;i++){

        if(fireballsarray[i].direction === "right"){

        if(fireballsarray[i].xf < fireballsarray[i].rangef){
            fireballsarray[i].xf +=5;
        }
        else if(fireballsarray[i].xf >= fireballsarray[i].rangef){
            fireballsarray.splice(i,1)
            
        }
            for(j=0;j<enemyarray.length;j++){
                if(collision(fireballsarray[i].xf,enemyarray[j].xe,fireballsarray[i].yf,enemyarray[j].ye,fireballsarray[i].hf,enemyarray[j].he,fireballsarray[i].wf,enemyarray[j].we)){
                    fireballsarray.splice(i,1)
                    enemyarray[j].hp -= player.dmg*2;

                    if(enemyarray[j].hp<=0){
                        player.xp += enemyarray[i].xp;
                        player.gold += enemyarray[i].golde;
                        enemyarray.splice(j,1); 
                    }
                }
         
            }
        drawimage(ctxd,fireball,fireballsarray[i].xf,fireballsarray[i].yf,fireballsarray[i].wf,fireballsarray[i].hf)
    }

        else if(fireballsarray[i].direction === "left"){
            
        if(fireballsarray[i].xf > fireballsarray[i].rangefleft){
            fireballsarray[i].xf -=5;
        }
        else if(fireballsarray[i].xf <= fireballsarray[i].rangefleft){
            fireballsarray.splice(i,1)
        }

        for(j=0;j<enemyarray.length;j++){
            if(collision(fireballsarray[i].xf,enemyarray[j].xe,fireballsarray[i].yf,enemyarray[j].ye,fireballsarray[i].hf,enemyarray[j].he,fireballsarray[i].wf,enemyarray[j].we)){
                fireballsarray.splice(i,1)
                enemyarray[j].hp -= player.dmg*2;

                if(enemyarray[j].hp<=0){
                    player.xp += enemyarray[i].xp; 
                    player.gold += enemyarray[i].golde;
                    enemyarray.splice(j,1); 
                }
            }
     
        }

        drawimage(ctxd,fireballleft,fireballsarray[i].xf,fireballsarray[i].yf,fireballsarray[i].wf,fireballsarray[i].hf)
    }

        
    }
}


//FUNCTION FOR POWERUP
function thirdspell(){
    player.dmg /=2;
}

//FUNCTION FOR HEAL

function manareg(){
    if(player.mp<10)
    player.mp += player.mreg;
}

//FUNCTION JUMP
function jumpup(){

    if(times <10){
        player.jump=false;
        player.y -= velocity;
        velocity = velocity - 0.8
        times++
        player.speed=4;

        }
    
    else if(times===10){
        times=0;
        clearInterval(sjumpup)
        player.speed = 2.5
        velocity = 14;
    }
}

//FUNCTION TO ATTACK

function attack(){

    if(abletoattack === true){

        //IF PLAYER IS FACING RIGHT WHEN ATTACKING
if(player.facing === "right") {
    activeimage = knightattack
    drawimage(ctxe,firstsword,player.x+15,player.y+18,30,8)
    
    }

    //IF PLAYER IS FACING LEFT WHEN ATTACKING
else if(player.facing === "left"){
    activeimage = knightattackleft;
    drawimage(ctxe,firstswordleft,player.x-23,player.y+18,30,8)
    
}

    abletoattack = false;
    moveblock = true;
    setTimeout(function(){abletoattack = true
    clearcanvas(ctxe)},200)
    

}



//GOING THRU ENEMY ARRAY TO FIND IF THERE IS COLLISION
for(i=0;i<enemyarray.length;i++) {

        //CHECKING ATTACKING COLLISION ON RIGHT SIDE
    if(collision(player.x+15,enemyarray[i].xe,player.y+18,enemyarray[i].ye,30,enemyarray[i].we,8,enemyarray[i].he) && player.facing ==="right"){
        enemyarray[i].hp -= player.dmg
            
        //IF IT KILLS THE ENEMY
        if(enemyarray[i].hp<=0){
            player.xp += enemyarray[i].xp;
            player.gold += enemyarray[i].golde;
            enemyarray.splice(i,1);
            
            
        }
    }

    //CHECKING ATTACKING COLLISION ON LEFT SIDE
else if(collision(player.x-23,enemyarray[i].xe,player.y+18,enemyarray[i].ye,30,enemyarray[i].we,8,enemyarray[i].he) && player.facing==="left"){
    enemyarray[i].hp -= player.dmg
    
    //IF IT KILLS THE ENEMY
    if(enemyarray[i].hp<=0){
        player.xp += enemyarray[i].xp;
        player.gold += enemyarray[i].golde;
        enemyarray.splice(i,1);
        
    }
}


}

//GOING THRU BREAKABLE ARRAY TO FIND IF SOMETHING IS HIT BY THE PLAYER
for(i=0;i<breakablearray.length;i++){
if(collision(player.x+15,breakablearray[i].xb,player.y+18,breakablearray[i].yb,30,breakablearray[i].wb,8,breakablearray[i].hb) && player.facing ==="right"){
    breakablearray[i] = 0;
    }

    else if(collision(player.x-23,breakablearray[i].xb,player.y+18,breakablearray[i].yb,30,breakablearray[i].wb,8,breakablearray[i].hb) && player.facing ==="left"){
        breakablearray[i] = 0;
        }
    }
}
 
//FUNCTION FOR PLAYER MOVEMENT AND BORDERS
function playermovement(){
    clearcanvas(ctxd);
    drawimage(ctxd,activeimage,player.x,player.y,player.w,player.h)

    if(player.x<0) {
        player.x=0;
    }
    else if(player.x >= 1175){
        player.x=1175;
    }

    else if(player.y<0){
        player.y = 0;
    }
}

 function portalcollision(){
    
    if(collision(player.x,1150,player.y,700,player.w,25,player.h,50)){
        player.x = 350;
        player.y = 50;
        }
        
    if(collision(player.x,1175,player.y,25,player.w,25,player.h,50)){
        nextlevel();
    }
 }

 //FUNCTION TO LOAD ENEMIES ON THE MAP
function loadenemies(){


    for(i=0;i<enemyarray.length;i++){

        if(enemyarray[i].xe < enemyarray[i].rangel && movedirection === "right"){

             enemyarray[i].xe += 1;

             if(enemyarray[i].xe === enemyarray[i].rangel) {
                 movedirection = "left"
             }
             
        }

        else if (enemyarray[i].xe > enemyarray[i].ranger && movedirection === "left"){
            enemyarray[i].xe -= 1;

            if(enemyarray[i].xe === enemyarray[i].ranger){
                movedirection = "right"
            }
        }
    

        drawimage(ctxd,enemyimg1,enemyarray[i].xe, enemyarray[i].ye, enemyarray[i].we, enemyarray[i].he)
        drawrect(ctxd,enemyarray[i].xe,enemyarray[i].ye-10,enemyarray[i].hp*3,2,"#ba0000");
    }
}

//FUNCTION TO LOAD OBJECTS
function loadobjects(){
    for(i=0;i<objectsarray.length;i++){

        if(objectsarray[i].type === "silver"){
        //DRAWING OBJECTS ON DYNAMIC MAP
        drawimage(ctxd,silverchest,objectsarray[i].xo,objectsarray[i].yo,objectsarray[i].wo,objectsarray[i].ho)
        }

        else if(objectsarray[i].type === "gold"){
            drawimage(ctxd,goldchest,objectsarray[i].xo,objectsarray[i].yo,objectsarray[i].wo,objectsarray[i].ho)
        }
        
    }
}

//FUNCTION FOR BREAKABLE BLOCKS

function breakableblocks(){
for(i=0;i<breakablearray.length;i++){        
    drawimage(ctxd,leavesblock,breakablearray[i].xb,breakablearray[i].yb,breakablearray[i].wb,breakablearray[i].hb);
    }
}

// ADVANVED COLLISION TO KNOW WHICH SIDE IS BEING COLIDED
function sidecollision(r1,r2){
  var dx=(r1.x+r1.w/2)-(r2.x+r2.w/2);
  var dy=(r1.y+r1.h/2)-(r2.y+r2.h/2);
  var width=(r1.w+r2.w)/2;
  var height=(r1.h+r2.h)/2;
  var crossWidth=width*dy;
  var crossHeight=height*dx;
  var collision='none';
  //
  if(Math.abs(dx)<width && Math.abs(dy)<height) {

    if(crossWidth>crossHeight){
      collision=(crossWidth>(-crossHeight))?'bottom':'left';
    }

    else if (crossWidth< crossHeight){
      collision=(crossWidth>-(crossHeight))?'right':'top';
    }
  }
  return(collision);
}


//TAKING SIDECOLLISION AND TAKING THE SIDE IT HAPPENS ALSO A FUNCTION TO SET THE INTERVAL TO
function checkingcollision(){

    for(var i=0 ; i<collisionarray.length ; i++){
            var side = sidecollision(collisionarray[i],player)


                if(side==="top") {
                    player.y = collisionarray[i].y + player.h;
                    clearInterval(sjumpup)
                    times=0;
                    player.speed = 2.5
                    velocity = 14;
                }

                if(side==="bottom"){
                    player.y = collisionarray[i].y - player.h; 
                    player.jump = true;    
                    gravitystrength = 2.5;            
                
                }

                if(side==="left"){
                    player.x = collisionarray[i].x + player.w;
    
                }

                if(side==="right") {
                    player.x = collisionarray[i].x - player.w;


                }
                
            }                
}

/////////////////////////// MAKING SPECIAL COLLISION FOR BREAKABLE BECAUSE ABOVE DOES NOT WORK ///////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




function sidecollisionforbreak(r1,r2){
    var dx=(r1.x+r1.w/2)-(r2.xb+r2.wb/2);
    var dy=(r1.y+r1.h/2)-(r2.yb+r2.hb/2);
    var width=(r1.w+r2.wb)/2;
    var height=(r1.h+r2.hb)/2;
    var crossWidth=width*dy;
    var crossHeight=height*dx;
    var collision='none';
    
    if(Math.abs(dx)<width && Math.abs(dy)<height) {
  
      if(crossWidth>crossHeight){
        collision=(crossWidth>(-crossHeight))?'bottom':'left';
      }
  
      else if (crossWidth< crossHeight){
        collision=(crossWidth>-(crossHeight))?'right':'top';
      }
    }
    return(collision);
  }
  
  
 
  function checkingcollisionforbreak(){
  
      for(var j=0 ; j<breakablearray.length ; j++){
              var side = sidecollisionforbreak(player,breakablearray[j])
  
  
                  if(side==="top") {
                      player.y = breakablearray[j].yb - player.h;
                      clearInterval(sjumpup)
                      times=0;
                      player.speed = 2.5
                      velocity = 14;
                  }
  
                  if(side==="bottom"){
                      player.y = breakablearray[j].yb + player.h; 
                      player.jump = true;                
                  
                  }
  
                  if(side==="left"){
                      player.x = breakablearray[j].xb - player.w;
      
                  }
  
                  if(side==="right") {
                      player.x = breakablearray[j].xb + player.w;
  
  
                  }
              }                
  }




//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////
//////GAME INPUTS//////
///////////////////////


///////KEYBOARD//////
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

var update = function (modifier) {



    //PLAYER HOLDING UP
    //- IT CAN NOT WORK GOOD BECAUSE IT PRINTS UP A LOT OF TIMES.
    //- USING A VARIABLE FOR KEY INPUT MAKES ERRORS FOR KEYS THAT MUCH BE CLICK ONCE AND ONLY.
    //if (38 in keysDown) { }

    //PLAYER HOLDING DOWN
    if (40 in keysDown) { 
        
    }

    //PLAYER HOLDING A - LEFT
    if (65 in keysDown && moveblock != true) { 
        player.x -= player.speed;
        activeimage = knight1runleft;
        player.facing = "left";

    }

    

    //PLAYER HOLDING D - RIGHT
    if (68 in keysDown && moveblock != true && moveright) { 

        player.x += player.speed;
        activeimage = knight1run
        player.facing = "right";
}
       
    if(75 in keysDown){
 

    } 

//ADDING THE IDLE
    if (!(65 in keysDown) && !(68 in keysDown)){
       

       player.w = 25;
    player.h = 40;

       if(player.facing === "right"){
        activeimage = knight;
        
    }

    else if(player.facing === "left"){
        activeimage = knightleft;
    }

    
    }
}

//SPECIAL FOR JUMP AND MAYBE MENU
document.addEventListener('keydown', function(event) {

    //JUMPING WIHT W
    if(event.keyCode === 87 && player.jump && gamestate === 2) {
        sjumpup = setInterval(jumpup,20);

    }

    //P KEY FOR PAUSE
    if(event.keyCode === 80){

        //PAUSE
        if(gamestate === 2 ){

        clearInterval(igameloop);
        gamestate = 4;

        drawrect(ctxd,0,0,1200,800,"rgba(0, 0, 0, 0.5");
        drawtext(ctxd,430,400,"GAME PAUSED","50px Times","white")

        }

        else if(gamestate === 4){
            igameloop = setInterval(gameloop,20);
            gamestate = 2;
        }
        
        
    }

    //I KEY FOR INVENTORY/SKILLS
    if(event.keyCode === 73){
        //SKILLS / MENU FUNCTION.

        if(gamestate === 2){
            clearInterval(igameloop);
            gamestate = 3;

            //UPPER PART WHERE THAT DISPLAYS STATS
            drawrect(ctxd,500,100,600,600,"black");
            drawrectoutline(ctxd,500,100,600,600,3,"white");
            drawline(ctxd,540,150,1040,150,2,"white")
            drawtext(ctxd,550,140,"Level: " + player.lvl,"25px Times","white")
            drawtext(ctxd,650,140,"Skillpoints:  " + player.skillpoints,"25px Times","white")
            drawtext(ctxd,810,140,"ATK:  " + player.dmg,"25px Times","white")
            drawtext(ctxd,920,140,"HP:  " + player.hp,"25px Times","white")
            drawline(ctxd,640,115,640,142,2,"white");
            drawline(ctxd,800,115,800,142,2,"white");
            drawline(ctxd,905,115,905,142,2,"white");

            //SKILLS TREE


            //DASH
            if(learneddash) {
                drawrectoutline(ctxd,575,580,75,75,4,"green")
                drawimage(ctxd,dash,575,580,75,75)
                drawline(ctxd,612,580,612,495,4,"green")
            }

            else if(!learneddash){
                drawrectoutline(ctxd,575,580,75,75,4,"white")
                drawimage(ctxd,dash,575,580,75,75)
                drawline(ctxd,612,580,612,500,4,"white")
            }
            
            

            //FIREBALL
            if(learnedfireball){
            drawimage(ctxd,fireball,750,580,75,75)
            drawrectoutline(ctxd,750,580,75,75,4,"green")
            drawline(ctxd,790,580,790,505,4,"green")
            }

            else if(!learnedfireball){
                drawimage(ctxd,fireball,750,580,75,75)
                drawrectoutline(ctxd,750,580,75,75,4,"white")
                drawline(ctxd,790,580,790,505,4,"white")
                }
          

            //POWERUP
            if(learnedpowerup){
                drawimage(ctxd,powerup,575,430,75,75)
                drawrectoutline(ctxd,575,430,75,75,4,"green")
                }
    
            else if(!learnedpowerup){
                drawimage(ctxd,powerup,575,430,75,75)
                drawrectoutline(ctxd,575,430,75,75,4,"white")
                }

                //HEAL
            if(learnedheal){
                drawimage(ctxd,heal,750,430,75,75)
                drawrectoutline(ctxd,750,430,75,75,4,"green")
                }
    
            else if(!learnedheal){
                drawimage(ctxd,heal,750,430,75,75)
                drawrectoutline(ctxd,750,430,75,75,4,"white")
                }

 

        }

        else if(gamestate === 3){
            igameloop = setInterval(gameloop,20);
            gamestate = 2;
        }

    }


    //K Or ATTACK KEY
    if(event.keyCode === 75 && gamestate === 2) {
            attack();

    }

    //1 OR SPEEDUP 
    if(event.keyCode === 49 && gamestate === 2 && learneddash === true && spell1cast === false && player.mp >= 5) {
        spell1cast = true;
        player.mp-=5;
        player.speed = player.speed*2
        setTimeout(firstspell,4000);
}

    //2 OR FIREBALL SPELL
    if(event.keyCode === 50 && gamestate === 2 && learnedfireball === true && player.mp >=5) {
            player.mp -=5;
            fireballobj = new fireballobjects(player.x,player.y+15,13,13,player.facing)
            fireballsarray.push(fireballobj)
    }

    //3 OR POWERUP SPELL
    if(event.keyCode === 51 && gamestate === 2 && learnedpowerup === true && player.mp >=5) {
        player.mp -=5;
        player.dmg *= 2;
        setTimeout(thirdspell,5000);
}

if(event.keyCode === 52 && gamestate === 2 && learnedfireball === true && player.mp >=5) {
    player.hp+=1;
    player.mp -= 5;
}

    //E OR INTERACT KEY
    if(event.keyCode === 69 && gamestate === 2) {
        for(i=0;i<objectsarray.length;i++){
        if(collision(player.x,objectsarray[i].xo,player.y,objectsarray[i].yo,player.w,objectsarray[i].wo,player.h,objectsarray[i].ho)){
        
            if(objectsarray[i].type ==="silver"){
            drawimage(ctxs,openedsilverchest,objectsarray[i].xo,objectsarray[i].yo,objectsarray[i].wo,objectsarray[i].ho);
            player.gold += Math.floor(Math.random()*10+8);
            objectsarray[i] = 0;
            }
            
            else if(objectsarray[i].type ==="gold"){

                drawimage(ctxs,openedgoldchest,objectsarray[i].xo,objectsarray[i].yo,objectsarray[i].wo,objectsarray[i].ho);
                player.gold += Math.floor(Math.random()*40+15);
                objectsarray[i] = 0;
            }
        }
    }

}

});


//WHEN PLAYER LETS K THEN HE CAN GOES BACK TO NORMAL AND DOES NOT BLOCK ANYMORE
document.addEventListener('keyup', function(event) {

    if(event.keyCode === 75 && gamestate === 2) {
        moveblock = false;
        player.w = 25;
        player.h = 40;
        clearcanvas(ctxe)
        
    }



});


///////////////////////
/////MOUSE EVENTS//////
///////////////////////

window.addEventListener('click', draw, false);
window.addEventListener('mousemove', hover, false);

//////MOUSE CLICK///////

function draw(e) {

    
    var pos = getMousePos(canvasstatic, e);
    posx = pos.x;
    posy = pos.y;

    //IF NEW GAME IS CLICKED
    if(collision(posx,200,posy,250,5,220,5,70) && gamestate===1){

        drawrect(ctxs,200,250,220,70,"#b19572");
        drawtext(ctxs,215,297,"Are you sure?","35px Times","black");
        drawrectoutline(ctxs,200,340,80,40,2,"#b19572");
        drawrectoutline(ctxs,340,340,80,40,2,"#b19572");
        drawtext(ctxs,212,370,"YES","30px Times","white");
        drawtext(ctxs,360,370,"NO","30px Times","white");
        test = 1; //ALLOWING THE YES CONFIRMATION TO BE CLICKED TO AVOID ACCIDENTS.
        
        
    }

            //YES CONFIRMATION
                if(collision(posx,200,posy,340,5,80,5,40) && test===1) {
                  console.log("Starting the game.")
                  clearcanvas(ctxs);
                  clearcanvas(ctxd);
                  gamestate=2;
                  test=0;
                  NewGame();
        
        }

        //NO CONFIRMATION - ABADONED NEW GAME OPTION.
         else if(collision(posx,340,posy,340,5,80,5,40) && test===1) {
            console.log("Abadoned New Game.")
            test=0;
            drawrect(ctxs,200,250,220,70,"#b19572");
            drawtext(ctxs,215,297,"NEW GAME","35px Times","black");
            drawrect(ctxs,180,330,280,60,"black"); //DELETING YES AND NO
            drawrectoutline(ctxs,200,250,220,70,5,"#857056")
            

        }

    //IF LOAD GAME IS CLICKED
    else if(collision(posx,200,posy,400,5,220,5,70) && test ===1){
        console.log("Load Game")
}

        //IF GAME STATE IS THE SKILL MENU
        else if(gamestate === 3){

            //IF COLLISION ON CLICK WITH DASH.
            if(collision(posx,575,posy,580,5,75,5,70) && player.skillpoints>0 && learneddash === false){
                
                player.skillpoints -= 1;
                learneddash = true;
                drawrect(ctxd,770,120,25,25,"black") ///////////////////////////////////IMPORTANT DO DELETE THE SKILL NUMBER AND ADD A NEW ONE 
                drawrectoutline(ctxd,575,580,75,75,4,"green")
                drawline(ctxd,612,580,612,507,4,"green")
                drawtext(ctxd,650,140,"Skillpoints:  " + player.skillpoints,"25px Times","white")

                
                
            }

            //IF COLLISION WITH FIREBALL
            if(collision(posx,750,posy,580,5,75,5,70) && player.skillpoints>0 && learnedfireball === false){
                
                player.skillpoints -= 1;
                learnedfireball= true;
                drawrect(ctxd,770,120,25,25,"black") ///////////////////////////////////IMPORTANT DO DELETE THE SKILL NUMBER AND ADD A NEW ONE 
                drawrectoutline(ctxd,750,580,75,75,4,"green")
                drawline(ctxd,790,580,790,507,4,"green")
                drawtext(ctxd,650,140,"Skillpoints:  " + player.skillpoints,"25px Times","white")

                
            }

            //IF COLLISION WITH POWERUP BOX
            if(collision(posx,575,posy,430,5,75,5,70) && player.skillpoints>0 && learnedpowerup === false && learneddash === true){
                
                player.skillpoints -= 1;
                learnedpowerup= true;
                drawrect(ctxd,770,120,25,25,"black") ///////////////////////////////////IMPORTANT DO DELETE THE SKILL NUMBER AND ADD A NEW ONE 
                drawrectoutline(ctxd,575,430,75,75,4,"green")
                drawtext(ctxd,650,140,"Skillpoints:  " + player.skillpoints,"25px Times","white")

            }

            // IF COLLISION WITH HEAL BOX
            if(collision(posx,750,posy,430,5,75,5,70) && player.skillpoints>0 && learnedheal === false && learnedfireball === true){
                
                player.skillpoints -= 1;
                learnedheal = true;
                drawrect(ctxd,770,120,25,25,"black") ///////////////////////////////////IMPORTANT DO DELETE THE SKILL NUMBER AND ADD A NEW ONE 
                drawrectoutline(ctxd,750,430,75,75,4,"green")
                drawtext(ctxd,650,140,"Skillpoints:  " + player.skillpoints,"25px Times","white")

            }

            
        }
        
    }   


    //GETTING MOUSE POSITION ON CANVAS ON MOVE
function getMousePos(canvas, evt) {
    var rect = canvasstatic.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvasstatic.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvasstatic.height
    };
}


/////////MOUSE HOVER/////////
function hover(e){
    if(gamestate===1){
        var pos = getMousePos(canvasstatic, e);
        posx = pos.x;
        posy = pos.y;

//IF NEW GAME IS HOVERED
if(collision(posx,200,posy,250,5,220,5,70)){
        drawrectoutline(ctxd,200,250,220,70,3,"white");
    }

    //ONCE NO MORE HOVER FOR NEW
    else if(!collision(posx,200,posy,250,5,220,5,70)){
        ctxd.clearRect(0,0,1200,800);
    }

    //IF LOAD GAME IS HOVERED
    if(collision(posx,200,posy,400,5,220,5,70)){
        drawrectoutline(ctxd,200,400,220,70,3,"white");
    }
        
        // ONCE NO MORE HOVERED FOR LOAD
        else if(!collision(posx,200,posy,400,5,220,5,70) && !collision(posx,200,posy,250,5,220,5,70)){
            ctxd.clearRect(0,0,1200,800);
        }
    }
}

function stats(){
    clearcanvas(ctxst)


    //BACKGROUND

    drawrect(ctxst,30,5,230,65,"#857056");
    drawrectoutline(ctxst,30,5,230,65,3,"black");
    //XP
    drawrect(ctxst,77,13,player.xp,2,"yellow");
    drawrectoutline(ctxst,75,12,1,5);
    drawrectoutline(ctxst,175,12,1,5);
    drawtext(ctxst,185,18,"XP","12px Times", "black");


    //HEALTH
    drawrectoutline(ctxst,75,25,152,12,"black");
    drawrectoutline(ctxst,75,45,102,12,"black");
    drawtext(ctxst,235,35,"HP","12px Times", "black");

    //MP
    drawrect(ctxst,76,26,player.hp*10,10,"green");
    drawrect(ctxst,76,46,player.mp*10,10,"blue");
    drawtext(ctxst,40,50,player.lvl,"30px Times","black")
    drawtext(ctxst,185,55,"MP","12px Times", "black")

    //GOLD
    drawimage(ctxst,goldstat,40,80,15,15);
    drawtext(ctxst,65,93,player.gold,"18px Times", "black")


    //HANDLING NEGATIVE AND OVER POSITIVE VALUES
    if(player.hp<0) {
        player.hp = 0;
    }

    if(player.hp>15){
        player.hp = 15;
    }
    if(player.mp<0) {
        player.mp = 0;
    }

    if(player.xp >= 97){
        player.xp = 0;
        player.lvl +=1;
        player.skillpoints +=1;
    }
}


//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////
///////GAME LOGIC//////
///////////////////////

//BACKGROUND
drawrect(ctxs,30,30,1140,740,"black");
drawrectoutline(ctxs,30,30,1140,740,10,"#857056");


//NEW GAME BOX
drawrect(ctxs,200,250,220,70,"#b19572");
drawrectoutline(ctxs,200,250,220,70,5,"#857056");
drawtext(ctxs,215,297,"NEW GAME","35px Times","black");

//BOX AROUND NEW AND LOAD
drawrectoutline(ctxs,150,200,320,320,5,"#857056");

//LOAD GAME BOX
drawrect(ctxs,200,400,220,70,"#b19572");
drawrectoutline(ctxs,200,400,220,70,5,"#857056");
drawtext(ctxs,205,447,"LOAD GAME","35px Times","black");

//TEXT ON TOP OF NEW/LOAD GAME
drawtext(ctxs,185,130,"THE ADVENTURES","30px Times","white");
drawtext(ctxs,220,165,"OF A KNIGHT","30px Times","white");


//LOAD IMAGE 
limage.onload = function(){
drawimage(ctxs,limage,600,125,350,500);
}

//CONTROLLS (LEFT)
drawtext(ctxs,220,590,"CONTROLS","35px Times","white");
drawtext(ctxs,150,640,"W - JUMP | K - ATTACK","35px Times","#857056");
drawtext(ctxs,150,680,"A - LEFT | D - RIGHT","35px Times","#857056");
drawtext(ctxs,150,720,"P - PAUSE | I - SKILLS","35px Times","#857056");

//CONTROLS (RIGHT)
drawtext(ctxs,550,680,"1 - SPEED UP | 2 - FIREBALL","35px Times","#857056");
drawtext(ctxs,550,720,"3 - ATTACK UP | 4 - HEAL","35px Times","#857056");


