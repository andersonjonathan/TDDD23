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
        this.platforms = undefined;
        this.player = undefined;
        this.cursors = undefined;
        this.all_gui_obj = [];  // Add all objects except from the player in this array
        this.player_speed = 200;
        this.map_movement_border = 150;
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
    }

    //Load operations (uses Loader), method called first
    preload() {
        this.game.load.image('sky', 'assets/sky.png');
        this.game.load.image('ground', 'assets/platform.png');
        this.game.load.image('star', 'assets/star.png');
        this.game.load.image('pencil', 'assets/pencil.png');
        this.game.load.spritesheet('dude', 'assets/student.png', 40, 40);
        this.game.load.spritesheet('exam', 'assets/exam.jpg');
        this.game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles.png');
        this.game.load.image('tiled_school', 'assets/tiled_school.png');
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

        var colliders = [17, 43];
        for (var i = 0; i < colliders.length; i++)
        {
            this.map.setCollision(colliders[i], true, this.layer);
        }

        this.player = this.game.add.sprite(1870, 8076, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

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
        this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);


        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.currentWeapon = 0;


        //Lets create some baddies
        this.enemies = this.game.add.group();
        this.enemies.enableBody = true;
        this.enemies.lives = 3;

        this.map.createFromObjects('Others', 150, 'exam', 0, true, false, this.enemies);


    }

    //Code ran on each frame of game
    update() {
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.enemies);
        this.game.physics.arcade.collide(this.enemies, this.layer);
        //  Reset the players velocity (movement)
        this.move();

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.weapons[this.currentWeapon].fire(this.player, this);
        }

        this.game.physics.arcade.overlap(this.weapons, this.enemies, this.collisionHandler, null, this);

    }

    collisionHandler (bullet, enemy) {

        //  When a bullet hits an alien we kill them both
        bullet.kill();
        enemy.kill();


    }

    move(){
        this.update_counter++;
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        var fLen = this.all_gui_obj.length;
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
        if (this.update_counter % 10 == 0) {
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



    //Called when game is paused
    paused() {
        console.log("PAAAAUSE!");
    }

    //You're able to do any final post-processing style effects here.
    render() {

            this.game.debug.cameraInfo(this.game.camera, 32, 32);
            this.game.debug.spriteCoords(this.player, 32, 500);

    }

    //Called when switching to a new state
    shutdown() {

    }

}

export default Game;
