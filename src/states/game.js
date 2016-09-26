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
Weapon.SingleBullet.prototype.fire = function (source) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

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
    }

    //Setup code, method called after preload
    create() {
        //  We're going to be using physics, so enable the Ninja
        this.game.physics.startSystem(Phaser.Physics.Arcade);

        //  A simple background for our game
        this.game.add.sprite(0, 0, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.game.add.group();

        //  We will enable physics for any object that is created in this group
        this.platforms.enableBody = true;

        // Here we create the ground.
        var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
        this.all_gui_obj.push(ground);

        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        ground.scale.setTo(2, 2);

        //  This stops it from falling away when you jump on it
        ground.body.immovable = true;

        //  Now let's create two ledges
        var ledge = this.platforms.create(400, 400, 'ground');
        this.all_gui_obj.push(ledge);
        ledge.body.immovable = true;

        ledge = this.platforms.create(-150, 250, 'ground');
        this.all_gui_obj.push(ledge);
        ledge.body.immovable = true;

        this.player = this.game.add.sprite(100, this.game.world.height - 150, 'dude');

        //  We need to enable physics on the player
        this.game.physics.arcade.enable(this.player);

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.body.bounce.y = 0;
        this.player.body.gravity.y = 0;
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


    }

    //Code ran on each frame of game
    update() {
        this.game.physics.arcade.collide(this.player, this.platforms);
        //  Reset the players velocity (movement)
        this.move();

        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
        {
            this.weapons[this.currentWeapon].fire(this.player);
        }

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
            for (var i = 0; i < fLen; i++) {
                this.all_gui_obj[i].body.velocity.x = 0;
                this.all_gui_obj[i].body.velocity.y = 0;
            }
            this.player.animations.stop();

            this.player.frame = 4;
        } else if (this.cursors.up.isDown) {
            //  Move up
            if(!(this.player.position.y > this.map_movement_border)){
                if(this.player.body.touching.up){
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.y = 0;
                    }
                } else {
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.y = speed;
                    }
                }
            } else {
                this.player.body.velocity.y = -speed;
            }
        } else if (this.cursors.down.isDown) {
            //  Move up
            if(!(this.player.position.y < (this.game.world.height - this.map_movement_border))){
                if(this.player.body.touching.down){
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.y = 0;
                    }
                } else {
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.y = -speed;
                    }
                }
            } else {
                this.player.body.velocity.y = speed;
            }
        } else {
            for (var i = 0; i < fLen; i++) {
                this.all_gui_obj[i].body.velocity.y = 0;
            }
        }

        if (this.cursors.left.isDown && this.cursors.right.isDown){
            for (var i = 0; i < fLen; i++) {
                this.all_gui_obj[i].body.velocity.x = 0;
                this.all_gui_obj[i].body.velocity.y = 0;
            }
            this.player.animations.stop();

            this.player.frame = 4;
        } else if (this.cursors.left.isDown) {
            //  Move to the left
            if(!(this.player.position.x > this.map_movement_border )){
                if(this.player.body.touching.left){
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.x = 0;
                    }
                } else {
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.x = speed;
                    }
                }
            } else {
                this.player.body.velocity.x = -speed;
            }
        } else if (this.cursors.right.isDown) {
            //  Move to the right
            if (!(this.player.position.x < (this.game.world.width - this.map_movement_border))){
                if(this.player.body.touching.right){
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.x = 0;
                    }
                } else {
                    for (var i = 0; i < fLen; i++) {
                        this.all_gui_obj[i].body.velocity.x = -speed;
                    }
                }
            } else {
                this.player.body.velocity.x = speed;
            }
        } else {
            for (var i = 0; i < fLen; i++) {
                this.all_gui_obj[i].body.velocity.x = 0;
            }
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
            for (var i = 0; i < fLen; i++) {
                this.all_gui_obj[i].body.velocity.x = 0;
                this.all_gui_obj[i].body.velocity.y = 0;
            }
            this.player.animations.stop();
            this.player.frame = this.player_facing_mapping[this.player_facing];
        }
        console.log(this.update_counter);
    }



    //Called when game is paused
    paused() {
        console.log("PAAAAUSE!");
    }

    //You're able to do any final post-processing style effects here.
    render() {

    }

    //Called when switching to a new state
    shutdown() {

    }

}

export default Game;
