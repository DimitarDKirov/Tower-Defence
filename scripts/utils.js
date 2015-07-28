///////////////////////////////////////////////////////////////////////////////
// Math
///////////////////////////////////////////////////////////////////////////////
//refactor - stabdalone functions
//Math.inRadius = function (target, obj, rad) {
//	return (obj.x - target.x)*(obj.x - target.x) + (obj.y - target.y)*(obj.y - target.y) < rad*rad;
//};

//Math.move = function(obj, target, speed) {
//    var distx = target.x - obj.x;
//    var disty = target.y - obj.y;
//    var angle = Math.atan2(disty, distx);
//
//    obj.x += speed * Math.cos(angle);
//    obj.y += speed * Math.sin(angle);
//
//    return (distx < 0 ? -distx : distx) + (disty < 0 ? -disty : disty) < 2;
//};

//Math.rand = function(max) {
 //   return Math.floor(Math.random() * (max + 1));
//};

function IsInRange(targetPoint, sourcePoint, radius) {
    var distance = (sourcePoint.x - targetPoint.x) * (sourcePoint.x - targetPoint.x) + (sourcePoint.y - targetPoint.y) * (sourcePoint.y - targetPoint.y);
    return distance < radius * radius;
};

function MoveObject(object, target, speed) {
    var distancex = target.x - object.x;
    var distancey = target.y - object.y;
    var angle = Math.atan2(distancey, distancex);

    object.x += speed * Math.cos(angle);
    object.y += speed * Math.sin(angle);

    return Math.abs(distancex) + Math.abs(distancey) < 2;
};

function GetRandom(maxNumber){
	return Math.floor(Math.random() * (maxNumber + 1));
}
///////////////////////////////////////////////////////////////////////////////
// Elements
///////////////////////////////////////////////////////////////////////////////
//var $ = function(id) {
function Element(id){
    return document.getElementById(id);
};

window.ui = {
    timer: Element("control-timer"),
    cash: Element("control-cash"),
    lives: Element("control-lives"),
    wave: Element("control-wave"),
    fps: Element("control-fps"),

    nav: ["start"],
    action: {},

    bind: function(evt, elems, fn) {
        Array.prototype.slice.call(elems).forEach(function(elem) {
            elem.addEventListener(evt, fn, false);
        });
    },
    page: function(name) {
        if (name) {
            ui.nav.unshift(name);
        } else {
            ui.page(ui.nav[1]);
            return;
        }

        Array.prototype.slice.call(Element("pages").children).forEach(function(elem) {
            if (elem.id !== "pages-overlay") {
                elem.style.display = "none";
            }
        });

        Element("pages-" + name).style.display = "block";

    },
    panel: function(name) {
        Array.prototype.slice.call(Element("control-left").children).forEach(function(elem) {
            elem.style.display = "none";
        });

        Element("control-" + name).style.display = "block";
    }
};

var about = document.getElementById("about");
var aboutRecipient = document.getElementById("about-text");
var hotkeys = document.getElementById("hotkeys");
var hotkeysRecipient = document.getElementById("hotkeys-text");
var authors = document.getElementById("authors");
var authorsRecipient = document.getElementById("authors-text");
var credits = document.getElementById("credits");
var creditsRecipient = document.getElementById("credits-text");
var instructions = document.getElementById("instructions");
var instructionsRecipient = document.getElementById("instructions-text");


about.addEventListener("click",function(){
    aboutRecipient.style.display = 'block';
    hotkeysRecipient.style.display = 'none';
    authorsRecipient.style.display = 'none';
    creditsRecipient.style.display = 'none';
    instructionsRecipient.style.display = 'none';
},false );
aboutRecipient.addEventListener("click",function(){
    aboutRecipient.style.display = 'none';
},false );

hotkeys.addEventListener("click",function(){
    hotkeysRecipient.style.display = 'block';
    aboutRecipient.style.display = 'none';
    authorsRecipient.style.display = 'none';
    creditsRecipient.style.display = 'none';
    instructionsRecipient.style.display = 'none';
},false );
hotkeysRecipient.addEventListener("click",function(){
    hotkeysRecipient.style.display = 'none';
},false );

authors.addEventListener("click",function(){
    var recipient = document.getElementById("authors-text");
    authorsRecipient.style.display = 'block';
    aboutRecipient.style.display = 'none';
    hotkeysRecipient.style.display = 'none';
    creditsRecipient.style.display = 'none';
    instructionsRecipient.style.display = 'none';
},false );
authorsRecipient.addEventListener("click",function(){
    authorsRecipient.style.display = 'none';
},false );


credits.addEventListener("click",function(){
    var recipient = document.getElementById("credits-text");
    creditsRecipient.style.display = 'block';
    aboutRecipient.style.display = 'none';
    authorsRecipient.style.display = 'none';
    hotkeysRecipient.style.display = 'none';
    instructionsRecipient.style.display = 'none';
},false );
creditsRecipient.addEventListener("click",function(){
    creditsRecipient.style.display = 'none';
},false );


instructions.addEventListener("click",function(){
    var recipient = document.getElementById("instructions-text");
    instructionsRecipient.style.display = 'block';
    aboutRecipient.style.display = 'none';
    authorsRecipient.style.display = 'none';
    creditsRecipient.style.display = 'none';
    hotkeysRecipient.style.display = 'none';
},false );
instructionsRecipient.addEventListener("click",function(){
    instructionsRecipient.style.display = 'none';
},false );