//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html

var Pencil = function (game, key){
            Phaser.Sprite.call(this, game, 0, 0, key);
            this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
            this.anchor.set(0.5);
            this.checkWorldBounds = true;
            this.outOfBoundsKill = true;
            this.exists = false;

            this.tracking = false;
            this.scaleSpeed = 0;
        };

Pencil.prototype = Object.create(Phaser.Sprite.prototype);
Pencil.prototype.constructor = Pencil;

Pencil.prototype.fire = function (x, y, angle, speed, gx, gy) {
    gx = gx || 0;
    gy = gy || 0;
    this.reset(x, y);
    this.scale.set(1);

    this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

    this.angle = angle;

    this.body.gravity.set(gx, gy);
};

Pencil.prototype.update = function () {

if (this.tracking)
{
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
}
if (this.scaleSpeed > 0)
{
    this.scale.x += this.scaleSpeed;
    this.scale.y += this.scaleSpeed;
}
};

var Weapon = {};


Weapon.SingleBullet = function (game) {

    Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 300;
    for (var i = 0; i < 64; i++)
    {
        this.add(new Pencil(game, 'pencil'), true);
    }
    return this;

};

Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;
Weapon.SingleBullet.prototype.fire = function (source, game) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;
    this.getFirstExists(false).fire(x, y, game.player_shooting_mapping[game.player_facing], this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

};





class Game extends Phaser.State {



    //initialization code in the constructor
    constructor(game, parent) {
        super(game, parent);
        this.player = undefined;
        this.cursors = undefined;
        this.original_player_speed = 200;
        this.player_speed = 200;
        this.player_facing = "s";
        this.player_facing_mapping = {
            "n": 5,
            "ne": 17,
            "nw": 18,
            "s": 2,
            "se": 23,
            "sw": 14,
            "e": 11,
            "w": 6,
        };
        this.player_shooting_mapping = {
            "n": 270,
            "ne": 315,
            "nw": 225,
            "s": 90,
            "se": 45,
            "sw": 135,
            "e": 0,
            "w": 180,
        };
        this.update_counter = 0;

        this.weapons = [];
        this.currentWeapon = 0;
        this.weaponName = null;
        this.map = undefined;
        this.layer = undefined;
        this.solid_tiles = [17, 45];
        this.rooms = [
            {id: 0, x0: 46,  y0: 233, x1: 54,  y1: 239, name: "PG1"},
            {id: 1, x0: 37,  y0: 233, x1: 44,  y1: 239, name: "PG2"},
            {id: 2, x0: 37,  y0: 203, x1: 54,  y1: 231, name: "Kök 12"},
            {id: 3, x0: 10,  y0: 222, x1: 28,  y1: 239, name: "P44"},
            {id: 4, x0: 68,  y0: 222, x1: 96,  y1: 239, name: "P42"},
            {id: 5, x0: 98,  y0: 222, x1: 111, y1: 239, name: "P36"},
            {id: 6, x0: 113, y0: 222, x1: 126, y1: 239, name: "P34"},
            {id: 7, x0: 140, y0: 222, x1: 153, y1: 239, name: "P30"},
            {id: 8, x0: 155, y0: 222, x1: 168, y1: 239, name: "P26"},
            {id: 9, x0: 170, y0: 222, x1: 183, y1: 239, name: "P22"},
            {id: 10, x0: 185, y0: 222, x1: 198, y1: 239, name: "P18"},
            {id: 11, x0: 10,  y0: 203, x1: 28,  y1: 220, name: "R43"},
            {id: 12, x0: 68,  y0: 203, x1: 96,  y1: 220, name: "R41"},
            {id: 13, x0: 98,  y0: 203, x1: 111, y1: 220, name: "R37"},
            {id: 14, x0: 113, y0: 203, x1: 126, y1: 220, name: "R35"},
            {id: 15, x0: 140, y0: 203, x1: 153, y1: 220, name: "Kök R"},
            {id: 16, x0: 155, y0: 203, x1: 168, y1: 220, name: "R27"},
            {id: 17, x0: 170, y0: 203, x1: 183, y1: 220, name: "R23"},
            {id: 18, x0: 185, y0: 203, x1: 198, y1: 220, name: "R19"},
            {id: 19, x0: 212, y0: 232, x1: 243,  y1: 249, name: "C2"},
            {id: 20, x0: 220, y0: 229, x1: 235,  y1: 254, name: "C2"},
            {id: 21, x0: 231, y0: 251, x1: 243,  y1: 258, name: "C2"},
            {id: 22, x0: 209, y0: 241, x1: 212,  y1: 248, name: "C2"},
            {id: 23, x0: 249,  y0: 244, x1: 275,  y1: 262, name: "C1"},
            {id: 24, x0: 253,  y0: 232, x1: 274,  y1: 243, name: "C1"},
            {id: 25, x0: 276,  y0: 238, x1: 278,  y1: 260, name: "C1"},
            {id: 26, x0: 278,  y0: 243, x1: 282,  y1: 258, name: "C1"},
            {id: 27, x0: 10,  y0: 189, x1: 19,  y1: 194, name: "RG1"},
            {id: 28, x0: 10,  y0: 177, x1: 19,  y1: 187, name: "RG2"},
            {id: 29, x0: 10,  y0: 166, x1: 19,  y1: 175, name: "RG3"},
            {id: 30, x0: 10,  y0: 158, x1: 19,  y1: 164, name: "SG1"},
            {id: 31, x0: 68,  y0: 177, x1: 81,  y1: 194, name: "R44"},
            {id: 32, x0: 83,  y0: 177, x1: 96,  y1: 194, name: "R42"},
            {id: 33, x0: 98,  y0: 177, x1: 111, y1: 194, name: "R36"},
            {id: 34, x0: 113, y0: 177, x1: 126, y1: 194, name: "R34"},
            {id: 35, x0: 155, y0: 177, x1: 168, y1: 194, name: "R26"},
            {id: 36, x0: 170, y0: 177, x1: 183, y1: 194, name: "R22"},
            {id: 37, x0: 185, y0: 177, x1: 198, y1: 194, name: "R18"},
            {id: 38, x0: 212, y0: 177, x1: 240, y1: 194, name: "C3"},
            {id: 39, x0: 242, y0: 177, x1: 255, y1: 194, name: "R6"},
            {id: 40, x0: 257, y0: 177, x1: 270, y1: 194, name: "Börssalen"},
            {id: 41, x0: 68,  y0: 158, x1: 96,  y1: 175, name: "S41"},
            {id: 42, x0: 98,  y0: 158, x1: 111, y1: 175, name: "S37"},
            {id: 43, x0: 113, y0: 158, x1: 126, y1: 175, name: "S35"},
            {id: 44, x0: 140, y0: 158, x1: 153, y1: 175, name: "S27"},
            {id: 45, x0: 155, y0: 158, x1: 168, y1: 175, name: "S25"},
            {id: 46, x0: 170, y0: 158, x1: 183, y1: 175, name: "S23"},
            {id: 47, x0: 185, y0: 158, x1: 198, y1: 175, name: "S19"},
            {id: 48, x0: 212, y0: 158, x1: 225, y1: 175, name: "S15"},
            {id: 49, x0: 227, y0: 158, x1: 240, y1: 175, name: "S11"},
            {id: 50, x0: 242, y0: 158, x1: 255, y1: 175, name: "S7"},
            {id: 51, x0: 257, y0: 158, x1: 270, y1: 175, name: "S3"},
            {id: 52, x0: 140, y0: 132, x1: 168, y1: 149, name: "S26"},
            {id: 53, x0: 170, y0: 132, x1: 183, y1: 149, name: "S22"},
            {id: 54, x0: 185, y0: 132, x1: 198, y1: 149, name: "S18"},
            {id: 55, x0: 212, y0: 132, x1: 225, y1: 149, name: "S14"},
            {id: 56, x0: 227, y0: 132, x1: 240, y1: 149, name: "S10"},
            {id: 57, x0: 242, y0: 132, x1: 255, y1: 149, name: "S6"},
            {id: 58, x0: 257, y0: 132, x1: 270, y1: 149, name: "S2"},
            {id: 59, x0: 140, y0: 113, x1: 153, y1: 130, name: "T31"},
            {id: 60, x0: 155, y0: 113, x1: 168, y1: 130, name: "T27"},
            {id: 61, x0: 170, y0: 113, x1: 183, y1: 130, name: "T23"},
            {id: 62, x0: 185, y0: 113, x1: 198, y1: 130, name: "T19"},
            {id: 63, x0: 212, y0: 113, x1: 225, y1: 130, name: "T15"},
            {id: 64, x0: 227, y0: 113, x1: 240, y1: 130, name: "T11"},
            {id: 65, x0: 289, y0: 132, x1: 312, y1: 149, name: "T1"},
            {id: 66, x0: 292, y0: 106, x1: 312, y1: 123, name: "T2"},
            {id: 67, x0: 289, y0: 75, x1: 320, y1: 97, name: "C4"},
            {id: 68, x0: 212, y0: 49, x1: 225, y1: 66, name: "U15"},
            {id: 69, x0: 227, y0: 49, x1: 240, y1: 66, name: "U11"},
            {id: 70, x0: 242, y0: 49, x1: 255, y1: 66, name: "U7"},
            {id: 71, x0: 257, y0: 49, x1: 270, y1: 66, name: "U3"},
            {id: 72, x0: 293, y0: 49, x1: 312, y1: 66, name: "U1"},
            {id: 73, x0: 284, y0: 59, x1: 291, y1: 66, name: "UG1"},
            {id: 74, x0: 284, y0: 49, x1: 291, y1: 57, name: "UG2"},
            {id: 75, x0: 212, y0: 23, x1: 225, y1: 40, name: "U14"},
            {id: 76, x0: 227, y0: 23, x1: 240, y1: 40, name: "U10"},
            {id: 77, x0: 242, y0: 23, x1: 255, y1: 40, name: "U6"},
            {id: 78, x0: 257, y0: 23, x1: 270, y1: 40, name: "U4"},
            {id: 79, x0: 293, y0: 23, x1: 312, y1: 40, name: "U2"},
            {id: 80, x0: 284, y0: 23, x1: 291, y1: 31, name: "Kök U"},
            {id: 81, x0: 207, y0: 68, x1: 270, y1: 104, name: "Innergård"},
        ];
        this.last_room = null;

    }

    //Load operations (uses Loader), method called first
    preload() {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('pencil', 'assets/pencil.png');
        this.game.load.spritesheet('dude', 'assets/student.png', 40, 40);
        this.game.load.spritesheet('exam', 'assets/exam.jpg');
        this.game.load.spritesheet('door', 'assets/door.png');
        this.game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles.png');
        this.game.load.image('tiled_school', 'assets/tiled_school.png');
        this.game.load.image('invisibleBlock', 'assets/invisibleBlock.png');

    }

    //Setup code, method called after preload
    create() {
        //  We're going to be using physics, so enable the Ninja
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        this.game.world.setBounds(0, 0, 10880, 8640);
        this.map = this.add.tilemap('map');

        this.map.addTilesetImage('tiles', 'tiles');
        this.map.addTilesetImage('tiled_school', 'tiled_school');

        this.layer = this.map.createLayer('Tile Layer 1');

        var colliders = [17, 45];
        for (var i = 0; i < colliders.length; i++)
        {
            this.map.setCollision(colliders[i], true, this.layer);
        }

        this.player = this.game.add.sprite(1870, 8076, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);


        this.halo = this.add.sprite(0, 0, 'invisibleBlock'); //invisibleBlock is a 1x1 px transparent png
        this.halo.anchor.setTo(0.5, 0.5);
        this.player.addChild(this.halo);
        this.physics.enable(this.halo, Phaser.Physics.ARCADE);
        this.halo.body.setSize(this.player.width +10, this.player.height +10, 0, 0);



        this.game.camera.follow(this.player);
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('left', [9, 10, 6], 10, true);
        this.player.animations.add('right', [11, 7, 8], 10, true);
        this.player.animations.add('up', [5, 0, 1], 10, true);
        this.player.animations.add('down', [2, 3, 4], 10, true);
        this.player.animations.add('leftup', [18, 21, 22], 10, true);
        this.player.animations.add('rightup', [12, 13, 17], 10, true);
        this.player.animations.add('leftdown', [14, 15, 16], 10, true);
        this.player.animations.add('rightdown', [19, 20, 23], 10, true);
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.A, Phaser.Keyboard.R ]);


        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.currentWeapon = 0;


        //Lets create some baddies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.lives = 3;
        this.map.createFromObjects('Others', 150, 'exam', 0, true, false, this.enemies);

        // Doors
        this.doors = this.game.add.group();
        this.doors.enableBody = true;

        this.map.createFromObjects('Doors', 397, 'door', 0, true, false, this.doors);
        this.doors.children.forEach(function (element, index, array) {
            element.body.immovable = true;
            element.anchor.setTo(0, 0);
        });
        this.game.time.advancedTiming = true;
    }

    //Code ran on each frame of game
    update() {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.enemies);
        this.game.physics.arcade.collide(this.enemies, this.layer);
        this.game.physics.arcade.collide(this.enemies, this.doors);
        this.game.physics.arcade.collide(this.player, this.doors);

        //  Reset the players velocity (movement)
        this.move();

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.weapons[this.currentWeapon].fire(this.player, this);
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.R))
        {
            this.player_speed = this.original_player_speed * 3
        } else {
            this.player_speed = this.original_player_speed
        }

        this.game.physics.arcade.overlap(this.weapons, this.enemies, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.weapons, this.layer, this.collisionHandlerWall, null, this);
        this.in_room();
        this.game.physics.arcade.overlap(this.halo, this.doors, this.checkNear, function(){}, this);


    }

    checkNear (chkObject){
        if (this.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            console.log(chkObject, 'is near');

            chkObject.angle = 70;
        }

    }
    collisionHandler (bullet, enemy) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        enemy.kill();


    }
    collisionHandlerWall (bullet, wall) {

        //  When a bullet hits an alien we kill them both
        if (this.solid_tiles.includes(wall.index)){
            bullet.kill();
        }


    }

    move(){
        this.update_counter++;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        var diagonal_penalty = 1;
        if ((this.cursors.up.isDown || this.cursors.down.isDown) && (this.cursors.up.isDown || this.cursors.down.isDown)){
            diagonal_penalty = 1/Math.sqrt(2);
        }
        var speed = this.player_speed * diagonal_penalty;

        if (this.cursors.up.isDown && this.cursors.down.isDown){

            this.player.animations.stop();

            this.player.frame = 4;
        } else if (this.cursors.up.isDown) {
            //  Move up
            this.player.body.velocity.y = -speed;
        } else if (this.cursors.down.isDown) {
            //  Move up
            this.player.body.velocity.y = speed;
        }

        if (this.cursors.left.isDown && this.cursors.right.isDown){

            this.player.animations.stop();

            this.player.frame = 4;
        } else if (this.cursors.left.isDown) {
            //  Move to the left

                this.player.body.velocity.x = -speed;

        } else if (this.cursors.right.isDown) {
            //  Move to the right

                this.player.body.velocity.x = speed;

        }
        if (this.update_counter % 5 == 0) {
            if (this.cursors.up.isDown && this.cursors.right.isDown) {
                this.player.animations.play('rightup');
                this.player_facing = "ne";
            } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
                this.player.animations.play('leftup');
                this.player_facing = "nw";
            } else if (this.cursors.up.isDown) {
                this.player.animations.play('up');
                this.player_facing = "n";
            } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
                this.player.animations.play('rightdown');
                this.player_facing = "se";
            } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
                this.player.animations.play('leftdown');
                this.player_facing = "sw";
            } else if (this.cursors.down.isDown) {
                this.player.animations.play('down');
                this.player_facing = "s";
            } else if (this.cursors.right.isDown) {
                this.player.animations.play('right');
                this.player_facing = "e";
            } else if (this.cursors.left.isDown) {
                this.player.animations.play('left');
                this.player_facing = "w";
            }
        }
        if (!(this.cursors.right.isDown || this.cursors.left.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            //  Stand still

            this.player.animations.stop();
            this.player.frame = this.player_facing_mapping[this.player_facing];
        }
    }

    in_room(){
        var x = Math.round(this.player.position.x / 32);
        var y = Math.round(this.player.position.y / 32);
        if (this.last_room == null){
            for (var i = 0; i < this.rooms.length; i++) {
                if (this.rooms[i].x0 <= x && x <= this.rooms[i].x1 && this.rooms[i].y0 <= y && y <= this.rooms[i].y1){
                    this.last_room = this.rooms[i].id;
                    break;
                }
            }
        } else {
            if (!(this.rooms[this.last_room].x0 <= x && x <= this.rooms[this.last_room].x1 && this.rooms[this.last_room].y0 <= y && y <= this.rooms[this.last_room].y1)){
                this.last_room = null;
            }
        }
    }



    //Called when game is paused
    paused() {
        console.log("PAAAAUSE!");
    }

    //You're able to do any final post-processing style effects here.
    render() {

        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.game.debug.spriteCoords(this.player, 32, 500);
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        if (this.last_room != null){
            this.game.debug.text(this.rooms[this.last_room].name, 62, 14, "#00ff00");
        }


    }

    //Called when switching to a new state
    shutdown() {

    }

}

export default Game;
