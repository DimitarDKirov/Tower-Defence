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
var $ = function(id) {
    return document.getElementById(id);
};

window.ui = {
    timer: $("control-timer"),
    cash: $("control-cash"),
    lives: $("control-lives"),
    wave: $("control-wave"),
    fps: $("control-fps"),

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

        Array.prototype.slice.call($("pages").children).forEach(function(elem) {
            if (elem.id !== "pages-overlay") {
                elem.style.display = "none";
            }
        });

        $("pages-" + name).style.display = "block";

    },
    panel: function(name) {
        Array.prototype.slice.call($("control-left").children).forEach(function(elem) {
            elem.style.display = "none";
        });

        $("control-" + name).style.display = "block";
    }
};
