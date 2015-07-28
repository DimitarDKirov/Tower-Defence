var game = {
    ticks: 0,
    _ticks: 0,
    _tick: 0,
    ticker: -1,
    run: [],
    fast: false,
    paused: true,

    wave: 0,
    _wave: 0,

    creeps: [],
    hp: 1,
    hpinc: 1.3,
    lives: 10,

    turrets: [],
    spent: 0,
    kills: 0,
    cash: 35,
    selection: false,

    //добавянето на тези две променливи подобряват баланса (тези и други помощни коментари после ще ги изтрием от финания проект)
    incommingCreepsCount: 7,
    creepsOffsetPosition: 20,

    tiles: {},

    tick: function() {
        ///////////////////////////////////////////////////////////////////////////////
        // fps
        ///////////////////////////////////////////////////////////////////////////////
        if (game.ticks - game._ticks === 60) {
            ui.fps.textContent = Math.round(60000 / (Date.now() - game._tick));
            game._tick = Date.now();
            game._ticks = game.ticks;
        }

        ///////////////////////////////////////////////////////////////////////////////
        // wave
        ///////////////////////////////////////////////////////////////////////////////
        if ((game.ticks - game._wave) % 30 === 29) {
            ui.timer.style.opacity = 1 - (((game.ticks - game._wave) / 60) * 0.05);
        }

        if (game._wave + 1200 === game.ticks) {
            ui.wave.textContent = ++game.wave;

            game.hpinc = {
                10: 1.2,
                25: 1.1,
                50: 1.06,
                100: 1.04,
                150: 1.02,
                200: 1.01
            }[game.wave] || game.hpinc;
            game.hp *= game.hpinc;

            game.incommingCreepsCount += 2;
            game.creepsOffsetPosition += 2;

            for (var i = 1; i <= game.incommingCreepsCount; i++) {
                game.creeps.push({
                    x: -(i * 46) - 10,
                    y: game.map[0].y,
                    offset: GetRandom(9),
                    nextpoint: 0,
                    creepFrame: 0,
                    speed: 1,
                    rotation: 0,
                    slowfor: 0,
                    hp: game.hp,
                    _hp: game.hp,
                    burning: false,
                    color: Math.ceil(GetRandom(3)),
                    cash: 1
                });
            }

            game._wave = game.ticks;
        }


        ///////////////////////////////////////////////////////////////////////////////
        // map
        ///////////////////////////////////////////////////////////////////////////////



        //TODO - Extrackt this in method!!!!!!!!
        if (game.map.name == 'Loopy') {
            canvas.drawImage(backgroundImage1, 0, 0, 800, 500);

            canvas.drawImage(backgroundImage1, 0, 0, 800, 500);

            var map = game.map.slice(1),
                start = game.map[0];

            canvas.beginPath();
            canvas.moveTo(start.x, start.y);
            map.forEach(function(cur, i) {
                canvas.lineTo(cur.x, cur.y);
            });
            canvas.stroke();
            canvas.lineWidth = 50;

            var pat = canvas.createPattern(floorPatternMap1, "repeat");
            canvas.strokeStyle = pat;


        } else if (game.map.name == 'Backtrack') {
            canvas.drawImage(backgroundImage2, 0, 0, 800, 500);

            var map = game.map.slice(1),
                start = game.map[0];

            canvas.beginPath();
            canvas.moveTo(start.x, start.y);
            map.forEach(function(cur, i) {
                canvas.lineTo(cur.x, cur.y);
            });
            canvas.stroke();
            canvas.lineWidth = 50;

            var pat = canvas.createPattern(floorPatternMap2, "repeat");
            canvas.strokeStyle = pat;

        } else if (game.map.name == 'Dash') {
            canvas.drawImage(backgroundImage3, 0, 0, 800, 500);

            var map = game.map.slice(1),
                start = game.map[0];

            canvas.beginPath();
            canvas.moveTo(start.x, start.y);
            map.forEach(function(cur, i) {
                canvas.lineTo(cur.x, cur.y);
            });
            canvas.stroke();
            canvas.lineWidth = 50;

            var pat = canvas.createPattern(floorPatternMap3, "repeat");
            canvas.strokeStyle = pat;
        }


        canvas.beginPath();
        canvas.moveTo(start.x, start.y);
        map.forEach(function(cur, i) {
            canvas.lineTo(cur.x, cur.y);
        });
        canvas.stroke();


        ///////////////////////////////////////////////////////////////////////////////
        // creeps
        ///////////////////////////////////////////////////////////////////////////////

        

        var currY;
        game.creeps.forEach(function(creep, i, a) {
            var _hp = creep.hp;
            var burning = creep.burning;

            if (burning) {
                creep.hp -= 30;

            }

            if (creep.hp <= 0) {
                if (_hp > 0) {
                    burning.kills++;
                }
                game.kills++;
                game.cash += creep.cash;
                //create a blast
                boom.push({
                    x: creep.x,
                    y: creep.y,
                    color: creep.color,
                    frame: 7
                });
                delete a[i];


                ui.action.refresh();
            } else if (creep.nextpoint === game.map.length) {
                delete a[i];

                ui.lives.textContent = --game.lives;

                if (!game.lives) {
                    game.end();
                }
            } else {
                if (--creep.slowfor <= 0) {
                    creep.speed = 1;
                }
                var waypoint = game.map[creep.nextpoint];
                var hue = (creep.speed < 1 || burning) ? (burning ? (creep.speed < 1 ? 300 : 33) : 240) : 0;
                var sat = 100 * (creep.hp / creep._hp);

                if (MoveObject(creep, {
                        x: waypoint.x + 18 + creep.offset,
                        y: waypoint.y + 18 + creep.offset
                    }, creep.speed)) {
                    creep.nextpoint += 1;
                    //rotate the creep to follow the path
                    if (game.map[creep.nextpoint] !== undefined) {
                        currY = game.map[creep.nextpoint].y;
                        currX = game.map[creep.nextpoint].x;

                        if (currY > waypoint.y) {
                            creep.rotation = 1.570796326795;
                        } else if (currY < waypoint.y) {
                            creep.rotation = -1.570796326795;
                        } else if (currX < waypoint.x) {
                            creep.rotation = 3.14;
                        } else {
                            creep.rotation = 0;
                        }
                    } else {
                        creep.rotation = 0;
                    }
                }
                // console.log('frame is ' + creep.creepFrameCount)
                if (game.ticks % 5 === 0) {
                    if (creep.creepFrame >= 0 && creep.creepFrame < 6) {
                        creep.creepFrame++;
                    } else {
                        creep.creepFrame = 0;
                    }
                }
                
                ////Swithc for the creep image
                var creepImg;

                switch (creep.color) {
                    case 0:
                        if (game.map.name == 'Dash') {
                            creepImg = creep3y;
                        }
                        else if (game.map.name == 'Loopy') {
                            creepImg = creep2y;
                        }
                        else {
                            creepImg = creep1y
                        }
                        break;
                    case 1:
                        if (game.map.name == 'Dash') {
                            creepImg = creep3b;
                        }
                        else if (game.map.name == 'Loopy') {
                            creepImg = creep2b;
                        }
                        else {
                            creepImg = creep1b;
                        }
                        break;
                    case 2:
                        if (game.map.name == 'Dash') {
                            creepImg = creep3g;
                        }
                        else if (game.map.name == 'Loopy') {
                            creepImg = creep2g;
                        }
                        else {
                            creepImg = creep1g;
                        }
                        break;
                    default:
                        if (game.map.name == 'Dash') {
                            creepImg = creep3r;
                        }
                        else if (game.map.name == 'Loopy') {
                            creepImg = creep2r;
                        }
                        else {
                            creepImg = creep1r;
                        }
                        break;
                }



                //here drowing the creep image

                /*                var creep = new Kinetic.Rect({
                                    x: creep.x - 5,
                                    y: creep.y - 5,
                                    width: 19,
                                    height: 19,
                                    fill: 'orange'
                                });

                                layer.add(creep);
                                stage.add(layer);*/
                canvas.save();
                canvas.translate(creep.x - 23, creep.y - 23);
                canvas.rotate(creep.rotation);
                canvas.drawImage(creepImg, creep.creepFrame * 46, 0, 46, 46, -23, -23, 46, 46);
                canvas.restore();
                //canvas.drawImage(creepImage, creep.x - 5, creep.y - 5, 23, 17);

                // the original code
                /*  canvas.fillStyle = "yellow";
                  canvas.fillRect(creep.x - 5, creep.y - 5, 15, 15);*/
            }
        });
        ////Swithc for the creep image
        var creepImg;

        

        /// blasts
        if (boom.length > 0) {
            var j,
                len = boom.length;

            for (j = 0; j < len; j += 1) {

                switch (game.map.name) {
                    case 'Dash':
                        creepImg = creep1y;
                        break;
                    default:
                        creepImg = creep1b;
                        break;
                }

                if (boom[j] !== undefined) {
                    canvas.drawImage(creepImg, boom[j].frame * 46, 0, 46, 46, boom[j].x - 46, boom[j].y - 46, 46, 46);
                    if (game.ticks % 3 === 0) {
                        boom[j].frame += 1;
                    }
                    if (boom[j].frame > 16) {
                        boom.splice(j, 1);
                    }
                }
            }
        }
        //missle
        if (boom1.length > 0) {
            var j,
                len = boom1.length;

            for (j = 0; j < len; j += 1) {

                if (boom1[j] !== undefined) {
                    canvas.drawImage(expl1, boom1[j].frame * 64, 0, 64, 64, boom1[j].x - 55, boom1[j].y - 55, 64, 64);
                    if (game.ticks % 3 === 0) {
                        boom1[j].frame += 1;
                    }
                    if (boom1[j].frame > 16) {
                        boom1.splice(j, 1);
                    }
                }
            }
        }

        //mortar
        if (boom2.length > 0) {
            var j,
                len = boom2.length;

            for (j = 0; j < len; j += 1) {

                if (boom2[j] !== undefined) {
                    canvas.drawImage(expl2, boom2[j].frame * 128, 0, 128, 128, boom2[j].x - 80, boom2[j].y - 60, 128, 128);
                    if (game.ticks % 3 === 0) {
                        boom2[j].frame += 1;
                    }
                    if (boom2[j].frame > 16) {
                        boom2.splice(j, 1);
                    }
                }
            }
        }


        ///////////////////////////////////////////////////////////////////////////////
        // turrets
        ///////////////////////////////////////////////////////////////////////////////
        game.turrets.forEach(function(turret) {
            if (turret.lastshot + turret.rate <= game.ticks) {
                var creeps = game.creeps.filter(function(creep) {
                    return IsInRange(creep, turret, turret.range);
                });

                if (creeps.length > 0) {
                    turret.shoot(creeps);
                    turret.lastshot = game.ticks;
                }
            }

            canvas.drawImage(turret.img, turret.x - 12.5, turret.y - 12.5);
        });

        var selection = game.selection;
        var turret = selection.turret;
        if (selection) {
            canvas.beginPath();
            canvas.fillStyle = selection.status === "selected" || selection.placeable ? "rgba(255, 255, 255, .3)" : "rgba(255, 0, 0, .3)";
            canvas.arc(turret.x + 8, turret.y + 8, turret.range, 0, Math.PI * 2, true);
            canvas.fill();

            canvas.drawImage(turret.img, turret.x - 12.5, turret.y - 12.5);
        }


        ///////////////////////////////////////////////////////////////////////////////
        // finish
        ///////////////////////////////////////////////////////////////////////////////
        game.run.forEach(function(something, i, a) {
            if (something.what() === false || --something.until === 0) {
                delete a[i];
            }
        });

        game.ticks++;
    },
    start: function() {
        game._ticks = game.ticks;
        game._tick = Date.now();
        game.ticker = window.setInterval(game.tick, 1000 / (game.fast ? 180 : 60));
        game.paused = false;
        game.tick();
    },
    pause: function() {
        window.clearInterval(game.ticker);
        game.paused = true;
    },
    end: function() {
        game.pause();
        document.removeEventListener("keydown", ui.handleshortcuts, false);
        window.removeEventListener("beforeunload", ui.handleunload, false);

        var map = game.map.name;
        var kills = game.kills;
        var spent = game.spent;
        var score = kills * spent;
        var text = score + " (" + kills + " kills, $" + spent + " spent)";
        var top = JSON.parse(localStorage.scores || '{"Loopy":[],"Backtrack":[],"Dash":[]}');
        var topmap = top[map];

        if (score > (topmap.length === 5 && topmap[4].score)) {
            topmap.splice(4, 1);
            topmap.push({
                score: score,
                kills: kills,
                spent: spent,
                date: Date.now()
            });
            topmap.sort(function(a, b) {
                return b.score - a.score;
            });
            localStorage.scores = JSON.stringify(top);
            ui.action.scores();
        }

        $("control-score-text").textContent = text;
        

        ui.panel("score");
        $("pages-overlay").style.display = "block";

        _gaq.push(["_trackEvent", "Game", "End", map]);
        _gaq.push(["_trackEvent", "Game", "Creeps killed", map, kills]);
        _gaq.push(["_trackEvent", "Game", "Money spent", map, spent]);
        _gaq.push(["_trackEvent", "Game", "Money available", map, game.cash]);
        _gaq.push(["_trackEvent", "Game", "Turrets placed", map, game.turrets.length]);
        _gaq.push(["_trackEvent", "Game", "Last FPS", map, Number(ui.fps.textContent)]);
    }
};
