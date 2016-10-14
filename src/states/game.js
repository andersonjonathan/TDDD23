//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
import Weapon from '../prefabs/weapon';
import Doors from '../prefabs/doors';
import Player from '../prefabs/player';
import Rooms from '../prefabs/rooms';
import Enemies from '../prefabs/enemies';
import Boots from '../prefabs/boots';
import Baljan from '../prefabs/baljan';

class Game extends Phaser.State {

    constructor(game, parent) {
        super(game, parent);
        
        this.killRate = 2000;
        this.nextDeath = 0;
        this.baljanTime = 60000;
        this.nextLife = 0;
        this.player = undefined;
        this.enemies = undefined;
        this.text_group = null;


        this.weapons = [];
        this.currentWeapon = 0;
        this.weaponName = null;
        this.map = undefined;
        this.layer = undefined;
        this.solid_tiles = [17, 45];

        var circle = Math.PI*2;
        this.shadow_mapping = {
            "ne": [0, circle*0.75],
            "e": [circle*0.125, circle*0.875],
            "se": [circle*0.25, 0],
            "s": [circle*0.375, circle*0.125],
            "sw": [circle*0.5, circle*0.25],
            "w": [circle*0.625, circle*0.375],
            "nw": [circle*0.75, circle*0.5],
            "n": [circle*0.875, circle*0.625]
        };
        this.night = false;
        this.release_N = true;
        this.release_A = true;
    }

    //Load operations (uses Loader), method called first
    preload() {
        // Prefab assets:
        // pencil
        this.game.load.image('pencil', 'assets/pencil.png');
        // player
        this.game.load.spritesheet('student', 'assets/student.png', 40, 40);
        this.game.load.spritesheet('student2', 'assets/student2.png', 40, 40);
        // doors
        this.game.load.spritesheet('door_3_1', 'assets/doors/door_3_1.png');
        this.game.load.spritesheet('door_2_1', 'assets/doors/door_2_1.png');
        this.game.load.spritesheet('door_1_3', 'assets/doors/door_1_3.png');
        this.game.load.spritesheet('door_1_2', 'assets/doors/door_1_2.png');

        //Bonus items
        this.game.load.spritesheet('boots', 'assets/boots.png', 48, 48);

        // Local assets
        this.game.load.spritesheet('dude2', 'assets/dude.png', 32, 48);
        this.game.load.image('baljan', 'assets/baljan-logo.png');

        this.game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles.png');
        this.game.load.image('tiled_school', 'assets/tiled_school.png');
        this.game.load.image('invisibleBlock', 'assets/invisibleBlock.png');
        this.game.load.spritesheet('dude','assets/dude.png');
    }

    //Setup code, method called after preload
    create() {
        //  We're going to be using physics, so enable the Arcade
        this.game.physics.startSystem(Phaser.Physics.Arcade);
        
        // Create the world/map
        this.game.world.setBounds(0, 0, 10880, 8640);
        
        this.map = this.add.tilemap('map');

        this.map.addTilesetImage('tiles', 'tiles');
        this.map.addTilesetImage('tiled_school', 'tiled_school');

        this.layer = this.map.createLayer('Tile Layer 1');

        for (var i = 0; i < this.solid_tiles.length; i++)
        {
            this.map.setCollision(this.solid_tiles[i], true, this.layer);
        }

        // Add the player
        this.player = this.game.add.existing(new Player(this.game, 1886, 8090, this.input));
        this.game.data = {};
        this.game.data['player'] = this.player;
        
        this.player.body.bounce.set(0.4);  // Can't set this in the player file for some retarded reason.
        
        this.game.camera.follow(this.player);
  
        // Add some keyboard listeners
        this.input.keyboard.addKeyCapture([
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.A,
            Phaser.Keyboard.R,
            Phaser.Keyboard.N,
            Phaser.Keyboard.PAGE_DOWN // only for debugging
        ]);
        
        // Add listener to the p button for pausing
        var p_key = this.input.keyboard.addKey(Phaser.Keyboard.P);
        p_key.onDown.add(this.togglePause, this);
        
        // Add some weapons
        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.currentWeapon = 0;

        // Enemies
        this.enemies = new Enemies(this.game, this.map, this.player);

        // Doors
        this.doors = new Doors(this.game, this.map);

        //Boots
        this.boots = new Boots(this.game, this.map);
        this.boots.children.forEach(function(element, index, array){
            element.alpha = 0;
        })

        //Baljan
        this.baljan = new Baljan(this.game, this.map);
        //this.baljanKey = this.game.input.keyboard.addKey(Phaser.Keyboard.B);


        // Who wants basic timing...
        this.game.time.advancedTiming = true;
        
        // start for helptext texts:
        // this.text_group = this.game.add.group();
        // this.text_group.add(this.game.add.text(400, 300, "- You have clicked -\n0 times !", {
        //     font: "65px Arial",
        //     fill: "#ff0044",
        //     align: "center"
        // }));
        // this.text_group.fixedToCamera = true;
        // console.log(this.text_group);
        
        // Night Mode settings:
        //this.shadow_overlay = this.game.add.sprite(0, 0, 'invisibleBlock');
        this.game.stage.backgroundColor = 0x4488cc;
        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);
        //this.shadow_overlay.fixedToCamera = true;
        //this.shadow_overlay.addChild(this.shadowTexture);
        // Create an object that will use the bitmap as a texture
        var lightSprite = this.game.add.image(0, 0, this.shadowTexture);
        lightSprite.fixedToCamera = true;
        // Set the blend mode to MULTIPLY. This will darken the colors of
        // everything below this sprite.
        lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

    }


    togglePause() {
        // Toggle pause on/off
        this.player.animations.stop();
        this.enemies.children.forEach(function(element, index, array){
            element.animations.stop();
        });
        this.game.physics.arcade.isPaused = (!this.game.physics.arcade.isPaused);
        if (this.game.physics.arcade.isPaused){
            console.log("PAAAAUSE!");
        } else {
            console.log("RESUME!!!");
        }
    }


    //Code ran on each frame of game
    update() {
        if (this.game.physics.arcade.isPaused){ return }  // skip this if we have paused
        
        // Check collisions
        this.game.physics.arcade.collide(this.player, this.layer);
        this.game.physics.arcade.collide(this.player, this.enemies, this.collisionHandlerPlayerEnemies, null, this);
        this.game.physics.arcade.collide(this.enemies, this.layer, this.collisionHandlerEnemies, null, this);
        this.game.physics.arcade.collide(this.player, this.doors);
        this.game.physics.arcade.collide(this.enemies, this.doors);
        this.game.physics.arcade.collide(this.player, this.baljan);
        this.game.physics.arcade.collide(this.enemies, this.enemies);


        this.game.physics.arcade.overlap(this.weapons, this.enemies, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.weapons, this.layer, this.collisionHandlerWall, null, this);
        this.game.physics.arcade.overlap(this.weapons, this.doors, this.collisionHandlerDoor, null, this);
        this.game.physics.arcade.overlap(this.doors, this.player.halo, this.toggleDoor, null, this);
        this.game.physics.arcade.overlap(this.player, this.boots, this.pickUpBoots, null, this);
        this.game.physics.arcade.overlap(this.player.halo, this.baljan, this.shopInBaljan, null, this);
        
        // Some keyboard action
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.weapons[this.currentWeapon].fire(this.player, this);
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.N)) {
            if (this.release_N) {

                this.night = this.night ? false : true;
                this.release_N = false;
            }
        } else {
            this.release_N = true;
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.PAGE_DOWN)) {
            console.log(Rooms.rooms[5].get_enemies(this.enemies))
        }

        if (this.player.data.last_room == null){

            var x = Math.round(this.player.position.x / 32);
            var y = Math.round(this.player.position.y / 32);
            if(this.player.data.last_room != Rooms.xy_in_room(x, y)) {
                var maybeNight = Math.floor((Math.random() * 10) + 1);
                if (maybeNight == 3) {
                    this.night = true;
                }
            };
        }

        if (this.player.data.last_room != null){
            var enemies_in_room = this.player.data.last_room.get_enemies(this.enemies);
            if (enemies_in_room.length !== 0){
                this.player.data.last_room.lock();
                this.player.data.last_room.close();
            } else {
                this.player.data.last_room.unlock();
                this.player.data.last_room.open();
                this.night = false;
            }

        }

        if (this.game.time.time >= this.nextDeath) {
            this.player.data['invincible'] = false;
        }
        
        // Update night mode
        this.updateShadowTexture();
        
    }



    updateShadowTexture() {
        if (!this.night){
            this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
            this.shadowTexture.context.fillRect(0, 0, this.game.world.width, this.game.world.height);
            this.shadowTexture.dirty = true;
            return
        }
        // This function updates the shadow texture (this.shadowTexture).
        // First, it fills the entire texture with a dark shadow color.
        // Then it draws a white circle centered on the pointer position.
        // Because the texture is drawn to the screen using the MULTIPLY
        // blend mode, the dark areas of the texture make all of the colors
        // underneath it darker, while the white area is unaffected.

        // Draw shadow
        this.shadowTexture.context.fillStyle = 'rgb(25, 25, 25)';
        this.shadowTexture.context.fillRect(0, 0, this.game.world.width, this.game.world.height);

        // Draw circle of light
        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';

        this.shadowTexture.context.arc(
            400, 
            300, 
            250, 
            this.shadow_mapping[this.player.data.facing][0], 
            this.shadow_mapping[this.player.data.facing][1], 
            true
        );
        this.shadowTexture.context.lineTo(400, 300);
        this.shadowTexture.context.closePath();
        this.shadowTexture.context.fill();

        // This just tells the engine it should update the texture cache
        this.shadowTexture.dirty = true;
    };

    toggleDoor(halo, door){
        // Open or close the door.
        if (this.player.data.last_room != null){
            if (this.player.data.last_room.name == "Toalett 1"){
                this.boots.children.forEach(function(element, index, array){
                    element.alpha = 1;
                });
            }
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.A))
        {
            if (door.angle == 0){
                door.open();
            } else {
                if (this.release_A) {
                    // Close the door
                    door.close();
                }
            }
            //console.log(door.data.room);
            this.release_A = false;
        } else {
            this.release_A = true
        }
    }

    pickUpBoots(player, boots){
        boots.kill();
        this.player.data.speed = this.player.data.original_speed * 3;
    }

    collisionHandler (bullet, enemy) {
        //  When a bullet hits an alien we kill them both
        bullet.kill();
        console.log("Enemy life left = " + enemy.data['life']);
        if(enemy.data['life'] <= 1){
            enemy.data['life'] = enemy.data['life'] - 1;
            enemy.kill();
        } else {
            enemy.data['life'] = enemy.data['life'] - 1;
        }


    }
    collisionHandlerWall (bullet, wall) {
        // kill bullets that hits the wall
        if (this.solid_tiles.includes(wall.index)){
            bullet.kill();
        }
    }

    collisionHandlerDoor (bullet, door) {
        // kill bullets that hits a door
        bullet.kill();
    }

    collisionHandlerEnemies (enemy, wall) {
        // Make the enemies change direction when hitting a wall
        if(enemy.data['velocityX'] > 0){
            enemy.body.velocity.x = -200;
            enemy.animations.play('left');
            enemy.data['velocityX'] = -100;
        } else {
            enemy.body.velocity.x = 200;
            enemy.animations.play('right');
            enemy.data['velocityX'] = 100;
        }

    }

    collisionHandlerPlayerEnemies (player, enemy){

        // When the player runs in to an enemy.
        if (this.game.time.time < this.nextDeath) {
            return;
        }

        if (this.player.data['life'] <= 1){
            this.player.data['life'] -= 1;
            player.kill();
            //this.game.state.restart(true, false); // This works like crap.
            this.game.physics.arcade.isPaused = (!this.game.physics.arcade.isPaused);
        } else {
            this.player.data['life'] -= 1;
        }

        this.nextDeath = this.game.time.time + this.killRate;
        this.player.data['invincible'] = true;
        console.log('Liv kvar = ' + this.player.data['life']);

    }

    shopInBaljan (halo, baljan){
        if (this.input.keyboard.isDown(Phaser.Keyboard.B))
        {

            if (this.release_B) {
                // Close the door
                this.addLife();
            }
            //console.log(door.data.room);
            this.release_B = false;
        } else {
            this.release_B = true
        }
    }

    addLife (halo, baljan) {
        if (this.player.data['life'] < 3) {
            if (this.game.time.time < this.nextLife) {
                if(this.text_group == null) {
                    /*var text = "You must wait " + (this.nextLife - this.game.time.time) / 1000 + " more seconds.";
                    this.text_group = this.game.add.group();
                    this.text_group.add(this.game.add.text(100, 100, text, {
                        font: "32px Arial",
                        fill: "#ff8000",
                        align: "center"
                    }));
                    this.text_group.fixedToCamera = true;
                    this.time.events.add(2000, this.destroyText, this);*/
                    this.createText("You must wait " + (this.nextLife - this.game.time.time) / 1000 + " more seconds.");
                    return;
                }
            }
            console.log("Köpa kaffe i baljan");
            this.player.data['life'] = this.player.data['life'] + 1;
            this.createText("Life increased to " + this.player.data['life'])
            this.nextLife = this.game.time.time + this.baljanTime;
        } else {
            console.log("You already have full health");
            if (this.text_group == null){
                this.createText("You already have full health");
                return;
            }
        }
    }

    createText (text) {
        this.text_group = this.game.add.group();
        this.text_group.add(this.game.add.text(100, 100, text, {
            font: "32px Arial",
            fill: "#ff8000",
            align: "center"
        }));
        this.text_group.fixedToCamera = true;
        this.time.events.add(2000, this.destroyText, this);
    }

    destroyText (){
        console.log("destroying text");
        this.time.events.add(0, this.text_group.destroy, this.text_group);
        this.text_group = null;
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
        if (this.player.data.last_room != null){
            this.game.debug.text(this.player.data.last_room.name, 62, 14, "#00ff00");
        }


    }

    //Called when switching to a new state
    shutdown() {

    }

}

export default Game;
