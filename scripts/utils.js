var update = {
    map: function(map){
        var createPattern,
            start;
            
        if (map == 'Loopy') {
            canvas.drawImage(backgroundImage1, 0, 0, 800, 500);

            map = game.map.slice(1);
            start = game.map[0];

            canvas.beginPath();
            canvas.moveTo(start.x, start.y);
            map.forEach(function(cur, i) {
                canvas.lineTo(cur.x, cur.y);
            });
            canvas.stroke();
            canvas.lineWidth = 50;

            createPattern = canvas.createPattern(floorPatternMap1, "repeat");
            canvas.strokeStyle = createPattern;

        } else if (map == 'Backtrack') {
            canvas.drawImage(backgroundImage2, 0, 0, 800, 500);

            map = game.map.slice(1);
            start = game.map[0];

            canvas.beginPath();
            canvas.moveTo(start.x, start.y);
            map.forEach(function(cur, i) {
                canvas.lineTo(cur.x, cur.y);
            });
            canvas.stroke();
            canvas.lineWidth = 50;

            createPattern = canvas.createPattern(floorPatternMap2, "repeat");
            canvas.strokeStyle = createPattern;

        } else if (map == 'Dash') {
            canvas.drawImage(backgroundImage3, 0, 0, 800, 500);

            map = game.map.slice(1);
            start = game.map[0];

            canvas.beginPath();
            canvas.moveTo(start.x, start.y);
            map.forEach(function(cur, i) {
                canvas.lineTo(cur.x, cur.y);
            });
            canvas.stroke();
            canvas.lineWidth = 50;

            createPattern = canvas.createPattern(floorPatternMap3, "repeat");
            canvas.strokeStyle = createPattern;
        }

        canvas.beginPath();
        canvas.moveTo(start.x, start.y);
        map.forEach(function(cur, i) {
            canvas.lineTo(cur.x, cur.y);
        });
        canvas.stroke();
    }
}

function IsInRange(targetPoint, sourcePoint, radius) {
    var distance = (sourcePoint.x - targetPoint.x) * (sourcePoint.x - targetPoint.x) + (sourcePoint.y - targetPoint.y) * (sourcePoint.y - targetPoint.y);
    return distance < radius * radius;
}

function MoveObject(object, target, speed) {
    var distancex = target.x - object.x,
        distancey = target.y - object.y,
        angle = Math.atan2(distancey, distancex);

    object.x += speed * Math.cos(angle);
    object.y += speed * Math.sin(angle);

    return Math.abs(distancex) + Math.abs(distancey) < 2;
}

function GetRandom(maxNumber){
	return Math.floor(Math.random() * (maxNumber + 1));
}

///////////////////////////////////////////////////////////////////////////////
// Elements
///////////////////////////////////////////////////////////////////////////////

function Element(id){
    return document.getElementById(id);
}

window.ui = {
    timer: document.getElementById("control-timer"),
    cash: document.getElementById("control-cash"),
    lives: document.getElementById("control-lives"),
    wave: document.getElementById("control-wave"),
    fps: document.getElementById("control-fps"),

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

        Array.prototype.slice.call(document.getElementById("pages").children).forEach(function(elem) {
            if (elem.id !== "pages-overlay") {
                elem.style.display = "none";
            }
        });
        document.getElementById("pages-" + name).style.display = "block";

    },
    panel: function(name) {
        Array.prototype.slice.call(document.getElementById("control-left").children).forEach(function(elem) {
            elem.style.display = "none";
        });

        document.getElementById("control-" + name).style.display = "block";
    }
};

$('#loopy').click(function () {
    $(this).parents('html').addClass('loopy');
});

$('#backtrack').click(function () {
    $(this).parents('html').addClass('backtrack');
});

$('#dash').click(function () {
    $(this).parents('html').addClass('dash');
});

var about = document.getElementById("about"),
    aboutRecipient = document.getElementById("about-text"),
    hotkeys = document.getElementById("hotkeys"),
    hotkeysRecipient = document.getElementById("hotkeys-text"),
    authors = document.getElementById("authors"),
    authorsRecipient = document.getElementById("authors-text"),
    credits = document.getElementById("credits"),
    creditsRecipient = document.getElementById("credits-text"),
    instructions = document.getElementById("instructions"),
    instructionsRecipient = document.getElementById("instructions-text");

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

