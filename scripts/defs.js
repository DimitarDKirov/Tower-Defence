var GameUnit=(function(){
    function Model() {
///////////////////////////////////////////////////////////////////////////////
// Maps
///////////////////////////////////////////////////////////////////////////////
        this.maps = {
            Loopy: [
                {x: 0, y: 70},
                {x: 730, y: 70},
                {x: 730, y: 430},
                {x: 70, y: 430},
                {x: 70, y: 160},
                {x: 640, y: 160},
                {x: 640, y: 340},
                {x: 160, y: 340},
                {x: 160, y: 250},
                {x: 800, y: 250}
            ],
    
            Backtrack: [
                {x: 0, y: 170},
                {x: 120, y: 170},
                {x: 120, y: 415},
                {x: 460, y: 415},
                {x: 460, y: 185},
                {x: 230, y: 185},
                {x: 230, y: 70},
                {x: 345, y: 70},
                {x: 345, y: 300},
                {x: 700, y: 300},
                {x: 700, y: 0}
            ],
    
            Dash: [
                {x: 0, y: 250},
                {x: 800, y: 250}
            ]
        };
    
    ///////////////////////////////////////////////////////////////////////////////
    // Turrets
    ///////////////////////////////////////////////////////////////////////////////
        this.turrets = {
            upgrades: [25, 40, 75, 150, 250, 400, 500, 700, 900, 1000, 1200, 1400, 1600, 1800, 2000],
            Laser: new Laser(),
            Missile: new Missile(),
            Tazer: new Tazer(),
            Mortar: new Mortar()
        };
    }

    return Model;
}());

var Turret = (function() {
    function Turret(cost, damage, rate, range, type, upgrades) {
        if (typeof(cost) !== 'number') {
            throw new Error('Invalid turret cost');
        }
        if (typeof(damage) !== 'number') {
            throw new Error('Invalid turret damage');
        }
        if (typeof(rate) !== 'number') {
            throw new Error('Invalid turret rate');
        }
        if (typeof(range) !== 'number') {
            throw new Error('Invalid turret range');
        }
        if (typeof(type) !== 'number') {
            throw new Error('Invalid turret type');
        }
        if (!Array.isArray(upgrades)) {
            throw new Error('Turret upgrade rates should be in an array');
        }
        this.cost = cost;
        this.damage = damage;
        this.rate = rate;
        this.range = range;
        this.type = type;
        this.upgrades = upgrades;
    }

    Turret.prototype.shoot = function(creeps) {

    }

    return Turret;
})();

var Laser = (function() {
	//Initial values
    var COST = 15,
        DAMAGE = 10,
        RATE = 40,
        RANGE = 80,
        TYPE = 1,
        UPGRADES = [
            {damage: 15, rate: 38, range: 85},
        	{damage: 25, rate: 36, range: 90},
        	{damage: 50, rate: 34, range: 95},
        	{damage: 75, rate: 32, range: 100},
        	{damage: 100, rate: 30, range: 105},
        	{damage: 150, rate: 28, range: 110},
        	{damage: 200, rate: 26, range: 120},
        	{damage: 400, rate: 25, range: 130},
        	{damage: 600, rate: 24, range: 140},
        	{damage: 800, rate: 22, range: 150},
        	{damage: 1000, rate: 21, range: 160},
        	{damage: 1200, rate: 20, range: 170},
        	{damage: 1500, rate: 18, range: 180},
        	{damage: 1800, rate: 16, range: 190},
	        {damage: 2100, rate: 14, range: 200}
	        ];

    function Laser() {
        /*this.cost = 15;
        this.damage = 10;
        this.rate = 40;
        this.range = 80;
        this.upgrades = [
            {damage: 15, rate: 38, range: 85},
            {damage: 25, rate: 36, range: 90},
            {damage: 50, rate: 34, range: 95},
            {damage: 75, rate: 32, range: 100},
            {damage: 100, rate: 30, range: 105},
            {damage: 150, rate: 28, range: 110},
            {damage: 200, rate: 26, range: 120},
            {damage: 400, rate: 25, range: 130},
            {damage: 600, rate: 24, range: 140},
            {damage: 800, rate: 22, range: 150},
            {damage: 1000, rate: 21, range: 160},
            {damage: 1200, rate: 20, range: 170},
            {damage: 1500, rate: 18, range: 180},
            {damage: 1800, rate: 16, range: 190},
            {damage: 2100, rate: 14, range: 200},
        ];*/
        Turret.call(this, COST, DAMAGE, RATE, RANGE, TYPE, UPGRADES);
    }

    Laser.prototype = Object.create(Turret);

    //this.shoot = function (creeps) {
    Laser.prototype.shoot = function(creeps) {
        var creep = creeps[0];
        var _hp = creep.hp;
        var turret = this;

        if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
            turret.kills += 1;
        }

        if (turret.levels.full && GetRandom(9) === 0) {
            var start = game.map[0];
            creep.x = start.x;
            creep.y = start.y;
            creep.nextPoint = 0;
        }

        game.run.push({
            what: function() {

                canvas.beginPath();
                var flash = document.getElementById("flash");
                canvas.drawImage(flash, creep.x - 46, creep.y - 46);
                canvas.fill();

                canvas.lineCap = "round";
                canvas.lineWidth = 3;
                canvas.strokeStyle = "#EE82EE";
                canvas.shadowColor = "#EE82EE";
                canvas.save();
                canvas.shadowBlur = 20;
                canvas.beginPath();
                canvas.moveTo(turret.x + 7, turret.y - 5);
                canvas.lineTo(creep.x - 23, creep.y - 23);
                canvas.stroke();
                canvas.shadowColor = 'rgba(0,0,0,0)';
                canvas.restore();

            },
            until: 6
        });
    };
    return Laser;
}());

var Missile=(function(){
	function Missile() {
		var COST = 25,
        	DAMAGE = 15,
        	RATE = 60,
        	RANGE = 120,
            TYPE = 2,
        	UPGRADES = [
        		{damage: 20, rate: 57, range: 125},
        		{damage: 30, rate: 54, range: 130},
        		{damage: 40, rate: 51, range: 135},
        		{damage: 80, rate: 48, range: 140},
        		{damage: 120, rate: 45, range: 145},
        		{damage: 220, rate: 42, range: 150},
        		{damage: 320, rate: 40, range: 160},
        		{damage: 450, rate: 38, range: 170},
        		{damage: 600, rate: 36, range: 180},
        		{damage: 700, rate: 33, range: 190},
        		{damage: 800, rate: 32, range: 200},
        		{damage: 900, rate: 31, range: 210},
        		{damage: 1000, rate: 30, range: 220},
        		{damage: 1200, rate: 28, range: 230},
        		{damage: 1400, rate: 26, range: 240},
	    	];
    	/*this.cost = 25;
    	this.damage = 15;
    	this.rate = 60;
    	this.range = 120;
    	this.upgrades = [
        	{damage: 20, rate: 57, range: 125},
        	{damage: 30, rate: 54, range: 130},
        	{damage: 40, rate: 51, range: 135},
        	{damage: 80, rate: 48, range: 140},
        	{damage: 120, rate: 45, range: 145},
        	{damage: 220, rate: 42, range: 150},
        	{damage: 320, rate: 40, range: 160},
        	{damage: 450, rate: 38, range: 170},
        	{damage: 600, rate: 36, range: 180},
        	{damage: 700, rate: 33, range: 190},
        	{damage: 800, rate: 32, range: 200},
        	{damage: 900, rate: 31, range: 210},
        	{damage: 1000, rate: 30, range: 220},
        	{damage: 1200, rate: 28, range: 230},
        	{damage: 1400, rate: 26, range: 240},
    	];*/
    	Turret.call(this,COST, DAMAGE, RATE, RANGE, TYPE, UPGRADES);
    	this.cell=0;
	}
	Missile.prototype = Object.create(Turret);

    //this.cell = 0,
    //    this.shoot = function (creeps) {
    Missile.prototype.shoot = function(creeps) {
    	var creep = creeps[GetRandom(creeps.length - 1)],
        	cell = this.cell % 4,
        	missile = {
            	x: this.x + (cell % 2 === 0 ? -5 : 5),
            	y: this.y + (cell < 2 ? -5 : 5)
        	},
        	turret = this;
	
    	game.run.push({
        	what: function() {
            	if (creep.hp <= 0) {
                	var creeps = game.creeps.filter(function() {
                    	return true;
                	});
	
                	if (creeps.length) {
                    	creep = creeps[GetRandom(creeps.length - 1)];
                	} else {
                    	return false;
                	}
            	}
	
            	if (MoveObject(missile, creep, 3)) {
                	if (turret.levels.full) {
                    	game.creeps.forEach(function(c) {
                        	if (IsInRange(creep, c, 20)) {
                            	var _hp = c.hp;
                            	if ((c.hp -= turret.damage) <= 0 && _hp > 0) {
                                	turret.kills += 1;
                            	}
                        	}
                    	});
	
                    	game.run.push({
                        	what: function() {
                            	canvas.fillStyle = "#FF0";
                            	canvas.beginPath();
                            	canvas.moveTo(creep.x, creep.y);
                            	canvas.arc(creep.x, creep.y, 20, 0, Math.PI * 2, true);
                            	canvas.fill();
                        	},
                        	until: 3
                    	});
                	} else {
                    	var _hp = creep.hp;
                    	if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
                        	boom1.push({
                            	x: creep.x,
                            	y: creep.y,
                            	frame: 0
                        	});
                        	turret.kills += 1;
                    	}
                	}
	
                	return false;
            	} else {
	
                	canvas.beginPath();
                	var smallRocket = document.getElementById("missle-bomb");
                	canvas.drawImage(smallRocket, missile.x - 20, missile.y - 20);
                	canvas.fill();
	
            	}
        	},
        	until: Infinity
    	});
	
    	turret.cell += 1;
	};
	return Missile;
}());

var Tazer = (function(){
	var COST = 40,
		DAMAGE = 1,
		RATE = 40,
		RANGE = 60,
        TYPE = 3,
		UPGRADES = [
			{damage: 5, rate: 38, range: 62},
        	{damage: 10, rate: 36, range: 64},
        	{damage: 15, rate: 34, range: 66},
        	{damage: 25, rate: 32, range: 68},
        	{damage: 50, rate: 30, range: 70},
        	{damage: 100, rate: 29, range: 75},
        	{damage: 200, rate: 28, range: 80},
        	{damage: 300, rate: 27, range: 85},
        	{damage: 400, rate: 26, range: 90},
        	{damage: 500, rate: 24, range: 100},
        	{damage: 600, rate: 23, range: 105},
        	{damage: 700, rate: 22, range: 110},
        	{damage: 800, rate: 21, range: 115},
        	{damage: 900, rate: 20, range: 120},
        	{damage: 1000, rate: 18, range: 125}
    	];
	function Tazer() {
    //this.cost = 40;
    //this.damage = 1;
    //this.rate = 40;
    //this.range = 60;
    //this.upgrades = [
        //{damage: 5, rate: 38, range: 62},
        //{damage: 10, rate: 36, range: 64},
        //{damage: 15, rate: 34, range: 66},
        //{damage: 25, rate: 32, range: 68},
        //{damage: 50, rate: 30, range: 70},
        //{damage: 100, rate: 29, range: 75},
        //{damage: 200, rate: 28, range: 80},
        //{damage: 300, rate: 27, range: 85},
        //{damage: 400, rate: 26, range: 90},
        //{damage: 500, rate: 24, range: 100},
        //{damage: 600, rate: 23, range: 105},
        //{damage: 700, rate: 22, range: 110},
        //{damage: 800, rate: 21, range: 115},
        //{damage: 900, rate: 20, range: 120},
        //{damage: 1000, rate: 18, range: 125}
    //];
    	Turret.call(this, COST, DAMAGE, RATE, RANGE, TYPE, UPGRADES);
	}

	Tazer.prototype = Object.create(Turret);

    //this.shoot = function (creeps) {
    Tazer.prototype.shoot = function(creeps){
        var creep = creeps.sort(function (a, b) {
            return b.speed - a.speed;
        })[0],
            _hp = creep.hp,
            turret = this,
            speed = 0.6 - (turret.damage / 1000),
            slowfor = 60 + turret.damage;

        if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
            turret.kills+=1;
        }

        creep.speed = creep.speed > speed ? speed : creep.speed;
        creep.slowfor = turret.levels.full ? Infinity : (creep.slowfor < slowfor ? slowfor : creep.slowfor);

        game.run.push({
            what: function () {

                canvas.drawImage(lightningImg, creep.x - 46, creep.y - 46);
                canvas.lineCap = "round";
                canvas.lineWidth = 2;
                canvas.strokeStyle = "#fff";
                canvas.shadowColor = "#fff";
                canvas.save();
                canvas.shadowBlur = 30;
                canvas.beginPath();
                canvas.moveTo(turret.x + 10, turret.y);
                canvas.lineTo(creep.x - 23, creep.y - 23);
                canvas.stroke();
                canvas.shadowColor = 'rgba(0,0,0,0)';
                canvas.restore();
            }, until: 6
        });
    };

	return Tazer;
}());

var Mortar = (function(){
	var COST = 60,
        DAMAGE = 50,
        RATE = 120,
        RANGE = 200,
        TYPE = 4,
        UPGRADES = [
        	{damage: 75, rate: 115, range: 205},
        	{damage: 100, rate: 110, range: 210},
        	{damage: 150, rate: 105, range: 215},
        	{damage: 250, rate: 100, range: 220},
        	{damage: 400, rate: 96, range: 225},
        	{damage: 600, rate: 92, range: 230},
        	{damage: 800, rate: 88, range: 235},
        	{damage: 1000, rate: 84, range: 240},
        	{damage: 1200, rate: 80, range: 245},
        	{damage: 1400, rate: 75, range: 250},
        	{damage: 1600, rate: 71, range: 250},
        	{damage: 1900, rate: 66, range: 255},
        	{damage: 2200, rate: 60, range: 260},
        	{damage: 2600, rate: 52, range: 265},
        	{damage: 3000, rate: 45, range: 280},
	    ];

	function Mortar() {
    //this.cost = 60;
    //this.damage = 50;
    //this.rate = 120;
    //this.range = 200;
    //this.upgrades = [
        //{damage: 75, rate: 115, range: 205},
        //{damage: 100, rate: 110, range: 210},
        //{damage: 150, rate: 105, range: 215},
        //{damage: 250, rate: 100, range: 220},
        //{damage: 400, rate: 96, range: 225},
        //{damage: 600, rate: 92, range: 230},
        //{damage: 800, rate: 88, range: 235},
        //{damage: 1000, rate: 84, range: 240},
        //{damage: 1200, rate: 80, range: 245},
        //{damage: 1400, rate: 75, range: 250},
        //{damage: 1600, rate: 71, range: 250},
        //{damage: 1900, rate: 66, range: 255},
        //{damage: 2200, rate: 60, range: 260},
        //{damage: 2600, rate: 52, range: 265},
        //{damage: 3000, rate: 45, range: 280},
	//];

		Turret.call(this, COST, DAMAGE, RATE, RANGE, TYPE, UPGRADES);
	}

	Mortar.prototype = Object.create(Turret);

    //this.shoot = function (creeps) {
    Mortar.prototype.shoot = function(creeps){
        var creep = creeps[0],
            turret = this,
            target = {x: creep.x + 10 / 1, y: creep.y + 10 / 1},
            shell = {x: turret.x / 1, y: turret.y / 1},
            radius = 25;    

        game.run.push({
            what: function () {
                var smallRocket;

                if (MoveObject(shell, target, 1.5)) {

                    game.creeps.forEach(function (creep) {
                        var _hp;
                        if (IsInRange(creep, target, radius)) {
                            _hp = creep.hp;

                            if ((creep.hp -= turret.damage) <= 0 && _hp > 0) {
                                turret.kills+=1;
                            }

                            if (turret.levels.full && !creep.burning) {
                                creep.burning = turret;
                            }
                        }
                    });

                    game.run.push({
                        what: function () {
                            canvas.beginPath();
                            boom2.push({
                                x: target.x -30,
                                y: target.y - 20,
                                frame: 0
                            });

                            canvas.fill();
                        }, until: 3
                    });

                    return false;
                } else {    

                    canvas.beginPath();
                    smallRocket = document.getElementById("bomb");
                    canvas.drawImage(smallRocket, shell.x - 30, shell.y - 20);
                    canvas.fill();
                    
                }
            }, until: Infinity
        });
    };

    return Mortar;
}());


