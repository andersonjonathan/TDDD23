import Weapon from '../prefabs/weapon';
import Doors from '../prefabs/doors';
import Player from '../prefabs/player';
import Rooms from '../prefabs/rooms';
import Enemies from '../prefabs/enemies';
import GameAreas from '../prefabs/game_areas';
import FireDoors from '../prefabs/fire_doors';

import Boots from '../prefabs/boots';
import Baljan from '../prefabs/baljan';
import ajax from '../utils/ajax';

import game_assets from './game/load_assets';
import sound from '../utils/sound';

class Game extends Phaser.State {

    constructor(game, parent) {
        super(game, parent);

        this.map = undefined;
        this.layer = undefined;
        this.solid_tiles = [17, 45, 59, 28];
        var circle = Math.PI * 2;
        this.shadow_mapping = {
            "ne": [0, circle * 0.75],
            "e": [circle * 0.125, circle * 0.875],
            "se": [circle * 0.25, 0],
            "s": [circle * 0.375, circle * 0.125],
            "sw": [circle * 0.5, circle * 0.25],
            "w": [circle * 0.625, circle * 0.375],
            "nw": [circle * 0.75, circle * 0.5],
            "n": [circle * 0.875, circle * 0.625]
        };
        this.night = false;
        this.release_E = true;
        this.release_A = true;
        this.game_settings = {
            'sound': {
                'music': undefined,
                'sfx': undefined
            },
            'help': {
                'open_door': undefined
            }
        };

        this.reset()
    }

    //Load operations (uses Loader), method called first
    preload() {
        game_assets.load(this.game)
    }

    reset() {
        this.killRate = 2000;
        this.nextDeath = 0;
        this.baljanTime = 60000;
        this.nextLife = 0;
        this.player = undefined;
        this.enemies = undefined;
        this.text_group = null;
        this.weapons = undefined;
        this.currentWeapon = 0;
        this.night = false;
        this.current_game_area = 0;
        this.pause_menu_data = undefined;
        this.final_score = 0;
        this.score = 0;
        this.removePoint = 0;
        this.removeRate = 1000;
        this.life_sprites = undefined;
        this.score_group = undefined;
        this.reported_hs = false;
        this.text_group = undefined;
        this.text_group = [];
        this.key_group = undefined;
        this.key_group = [];
        this.nextOpenDoorTip = 0;
        this.helpRate = 2500;
    }

    init(settings){
        this.game.data = {};
        if(settings != undefined){
            this.game_settings = settings;
        } else {
            this.game_settings = {
                'sound': {
                    'music': 0,
                    'sfx': 0,
                    'bg_music': undefined
                },
                'help': {
                    'open_door': 2,
                    'shoot': 1,
                    'baljan': 1,
                    'superpower': 1
                }
            };
        }
        this.game.data.settings = this.game_settings
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

        for (var t = 0; t < this.solid_tiles.length; t++)
        {
            this.map.setCollision(this.solid_tiles[t], true, this.layer);
        }

        // Add the player
        this.player = this.game.add.existing(new Player(this.game, 12*32, 244*32, this.input));
        this.game.data['player'] = this.player;
        this.player.body.bounce.set(0.4);  // Can't set this in the player file for some retarded reason.
        
        this.game.camera.follow(this.player);
  
        // Add some keyboard listeners
        this.input.keyboard.addKeyCapture([
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.A,
            Phaser.Keyboard.W,
            Phaser.Keyboard.E,
            Phaser.Keyboard.Q,
        ]);
        
        // Add listener to the esc button for pausing
        var esc_key = this.input.keyboard.addKey(Phaser.Keyboard.ESC);
        esc_key.onDown.add(this.togglePause, this);
        
        // Add some weapons
        this.weapons = [];
        this.weapons.push(new Weapon.SingleBullet(this.game));
        this.currentWeapon = 0;

        // Enemies
        this.enemies = new Enemies(this.game, this.map, this.player);

        // Doors
        this.doors = new Doors(this.game, this.map);

        // Fire doors
        this.fire_doors = new FireDoors(this.game, this.map);

        //Boots
        this.boots = new Boots(this.game, this.map);
        this.boots.children.forEach(function(element, index, array){
            element.alpha = 0;
        });

        //Baljan
        this.baljan = new Baljan(this.game, this.map);

        this.game.time.advancedTiming = true;

        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

        // Create an object that will use the bitmap as a texture
        var lightSprite = this.game.add.image(0, 0, this.shadowTexture);
        lightSprite.fixedToCamera = true;
        // Set the blend mode to MULTIPLY. This will darken the colors of
        // everything below this sprite.
        lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

        this.unlockPreviousLevels();

        this.game.add.audio('throw_sound');

        this.game.add.plugin(Fabrique.Plugins.InputField);
        
        this.addPlayerInfo();
        sound.init(this.game);
        var pause = this.game.add.sprite(10, 10, 'pause');
        pause.fixedToCamera = true;
        pause.inputEnabled = true;
        pause.events.onInputDown.add(this.pauseMenu, this);
        pause.scale.setTo(0.4, 0.4);

    }

    //Code ran on each frame of game
    update() {
        if (this.game.physics.arcade.isPaused){ return }  // skip this if we have paused
        this.updateShadowTexture();
        // Check collisions
        this.game.physics.arcade.collide(this.player, this.enemies, this.collisionHandlerPlayerEnemies, null, this);
        this.game.physics.arcade.collide(this.enemies, this.layer, this.collisionHandlerEnemies, null, this);
        this.game.physics.arcade.collide(this.player, this.doors);
        this.game.physics.arcade.collide(this.enemies, this.doors);
        this.game.physics.arcade.collide(this.player, this.fire_doors);
        this.game.physics.arcade.collide(this.enemies, this.fire_doors);
        this.game.physics.arcade.collide(this.player, this.baljan);
        this.game.physics.arcade.collide(this.enemies, this.enemies);

        this.game.physics.arcade.collide(this.weapons, this.enemies, this.collisionHandler, null, this);
        this.game.physics.arcade.collide(this.weapons, this.layer, this.collisionHandlerWall, null, this);
        this.game.physics.arcade.collide(this.weapons, this.doors, this.collisionHandlerDoor, null, this);
        this.game.physics.arcade.collide(this.weapons, this.fire_doors, this.collisionHandlerDoor, null, this);
        this.game.physics.arcade.collide(this.doors, this.player.halo, this.toggleDoor, null, this);
        this.game.physics.arcade.collide(this.fire_doors, this.player.halo, this.toggleFireDoor, null, this);
        this.game.physics.arcade.collide(this.player, this.boots, this.pickUpBoots, null, this);
        this.game.physics.arcade.collide(this.player.halo, this.baljan, this.shopInBaljan, null, this);

        // this must be last to not let the enemies push the player through the walls.
        this.game.physics.arcade.collide(this.player, this.layer);

        // Some keyboard action
        if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            this.weapons[this.currentWeapon].fire(this.player, this);
        }

        if (this.input.keyboard.isDown(Phaser.Keyboard.E)) {
            if (this.release_E) {
                this.night = this.night ? false : true;
                this.release_E = false;
            }
        } else {
            this.release_E = true;
        }

        if (this.player.data.last_room == null){
            var x = Math.round(this.player.position.x / 32);
            var y = Math.round(this.player.position.y / 32);
            if(this.player.data.last_room != Rooms.xy_in_room(x, y)) {
                var maybeNight = Math.floor((Math.random() * 10) + 1);
                if (maybeNight == 3) {
                    this.night = true;
                }
            }
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
        
        // Player has won
        if (this.current_game_area == 11){
            this.player.kill();
            this.highScore();
            return
        }
        
        var ga = GameAreas.game_areas[this.current_game_area];
        if (ga.get_enemies(this.enemies).length === 0){
            // Next game area
            ga.unlock();
            ga.open();
            this.current_game_area += 1;
            this.createText("You have unlocked more classrooms!")
        }
        
        if (this.game.time.time >= this.nextDeath) {
            // No longer invincible
            this.player.data['invincible'] = false;
        }

        if (this.game.time.time >= this.removePoint && this.score !== 0) {
            this.score -= 1;  // time penalty on the score
            this.removePoint = this.game.time.time + this.removeRate;
        }
        // Update night mode
        this.score_group.children[0].setText(this.score);
    }

    addPlayerInfo(){
        this.score_group = this.game.add.group();
        var text = this.game.add.text(790, 10, this.score, {
            font: "22px Arial",
            fill: "#ffffff"
        });
        text.anchor.set(1, 0);
        this.score_group.add(text);
        this.score_group.fixedToCamera = true;
        this.life_sprites = [
            this.game.add.sprite(760, 40, 'heart'),
            this.game.add.sprite(730, 40, 'heart'),
            this.game.add.sprite(700, 40, 'heart')
        ];
        for (let life in this.life_sprites){
            this.life_sprites[life].fixedToCamera = true;
            this.life_sprites[life].scale.setTo(0.1, 0.1);
        }
    }

    unlockPreviousLevels(){
        if (this.current_game_area !== 0){
            for (var i = 0; i < this.current_game_area; i++){
                var ga = GameAreas.game_areas[i];
                var ga_enemies = ga.get_enemies(this.enemies);
                for (var j = 0; j < ga_enemies.length; j++){
                    ga_enemies[j]['data']['life'] = 0;
                    ga_enemies[j].kill();
                }
                ga.unlock();
                ga.open();
            }
        }
    }


    toMenu(){
        this.game.state.start('menu', true, false,
            {
                'sound': {'sfx': this.game.data.settings.sound.sfx, 'music': this.game.data.settings.sound.music, 'bg_music': this.game.data.settings.sound.bg_music}
            });
    }

    pauseMenu(){
        this.game.physics.arcade.isPaused = true;
        this.player.data.immovable = true;
        for (let menu_item in this.pause_menu_data){
            this.pause_menu_data[menu_item].destroy();
        }
        this.pause_menu_data = undefined;
        this.pause_menu_data = [];

        this.pause_menu_data.push(this.game.add.sprite(280, 200, '54d8e0'));
        this.pause_menu_data[0].scale.setTo(240, 195);
        this.pause_menu_data[0].fixedToCamera = true;
        this.pause_menu_data[0].alpha = 0.95;
        this.pause_menu_data.push(this.game.add.button(300, 220, 'continue', this.togglePause, this, 1, 0, 0));
        this.pause_menu_data.push(this.game.add.button(300, 260, 'restart', this.restart, this, 1, 0, 0));
        this.pause_menu_data.push(this.game.add.button(300, 300, 'help', this.help, this, 1, 0, 0));
        this.pause_menu_data.push(this.game.add.button(300, 340, 'exit', this.toMenu, this, 1, 0, 0));
        this.pause_menu_data[1].fixedToCamera = true;
        this.pause_menu_data[2].fixedToCamera = true;
        this.pause_menu_data[3].fixedToCamera = true;
        this.pause_menu_data[4].fixedToCamera = true;
    }

    highScore(){
        this.score += 1000 * this.player.data.life;
        this.final_score = this.score;
        this.score_group.children[0].setText(this.score);
        this.game.physics.arcade.isPaused = true;
        this.player.data.immovable = true;
        for (let menu_item in this.pause_menu_data){
            this.pause_menu_data[menu_item].destroy();
        }
        this.pause_menu_data = undefined;
        this.pause_menu_data = [];

        this.pause_menu_data.push(this.game.add.sprite(280, 200, '54d8e0'));
        this.pause_menu_data[0].scale.setTo(240, 195);
        this.pause_menu_data[0].fixedToCamera = true;
        this.pause_menu_data[0].alpha = 0.95;
        this.pause_menu_data.push(this.game.add.button(300, 340, 'continue', this.reportHighScore, this, 1, 0, 0));
        this.pause_menu_data.push(this.game.add.inputField(300, 280, {
            font: '18px Arial',
            fill: '#212121',
            fontWeight: 'bold',
            width: 182,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 6,
            placeHolder: 'Name'
        }));

        this.pause_menu_data.push(this.game.add.group());
        var text = this.game.add.text(400, 220, "Game Over!", {
            font: "18px Arial",
            fill: "#ffffff",
            align: "center"
        });
        text.anchor.set(0.5, 0);
        this.pause_menu_data[3].add(text);
        this.pause_menu_data[1].fixedToCamera = true;
        this.pause_menu_data[2].fixedToCamera = true;
        this.pause_menu_data[3].fixedToCamera = true;

    }

    reportHighScore(){
        if (this.reported_hs == false){
            this.reported_hs = true;

            ajax.post(
                'http://liucrawler-skogsjonis.rhcloud.com/api/v1/add/',
                {
                    'name': this.pause_menu_data[2].value,
                    'score': this.final_score
                },
                function (){},
                true
            );
            this.toMenu();
        }

    }
    resumeFromPause(){
        this.game.physics.arcade.isPaused = false;
        this.player.data.immovable = false;
        for (let menu_item in this.pause_menu_data){
            this.pause_menu_data[menu_item].destroy();
        }
        this.pause_menu_data = undefined;
    }

    togglePause() {
        // Toggle pause on/off
        if (this.player.data.life == 0){
            this.toMenu();
        }
        this.player.animations.stop();
        this.enemies.children.forEach(function(element, index, array){
            element.animations.stop();
        });
        this.game.physics.arcade.isPaused = (!this.game.physics.arcade.isPaused);
        if (this.game.physics.arcade.isPaused){
            this.pauseMenu();
        } else {
            this.resumeFromPause();
        }
    }


    help(){
        for (let menu_item in this.pause_menu_data){
            this.pause_menu_data[menu_item].destroy();
        }
        this.pause_menu_data = undefined;
        this.pause_menu_data = [];

        this.pause_menu_data.push(this.game.add.sprite(100, 50, '54d8e0'));
        this.pause_menu_data[0].scale.setTo(600, 500);
        this.pause_menu_data[0].alpha = 0.95;
        this.pause_menu_data.push(this.game.add.button(485, 500, 'back', this.pauseMenu, this, 1, 0, 0));

        var list_index = 1;
        var help_data = [
            {'key': 'a', 'help_text': 'Open/Close doors'},
            {'key': 's', 'help_text': ''},
            {'key': 'd', 'help_text': ''},
            {'key': 'q', 'help_text': 'Shop in Baljan'},
            {'key': 'w', 'help_text': 'Superpower'},
            {'key': 'e', 'help_text': 'Turn on/off the lights'},
            {'key': 'esc', 'help_text': 'Pause / Resume'},
            {'key': 'space', 'help_text': 'Shoot'}
        ];
        for (let item in help_data){
            this.pause_menu_data.push(this.game.add.sprite(250, 65+item*50, help_data[item].key));
            list_index += 1;
            this.pause_menu_data[list_index].scale.setTo(0.7, 0.7);
            this.pause_menu_data[list_index].anchor.set(1, 0);
            this.pause_menu_data.push(this.game.add.text(270, 72+item*50, help_data[item].help_text, {
                font: "22px Arial",
                fill: "#ffffff"
            }));
            list_index += 1;
        }
        for (let tmp in this.pause_menu_data){
            this.pause_menu_data[tmp].fixedToCamera = true;
        }
    }

    updateShadowTexture() {
        // used for night mode
        if (!this.night){
            this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
            this.shadowTexture.context.fillRect(0, 0, this.game.world.width, this.game.world.height);
            this.shadowTexture.dirty = true;
            return
        }

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

    toggleFireDoor(halo, door){

        if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
            if (this.release_A) {
                this.createText("You can't open this door!");
                this.createText("Clear all classrooms from enemies to open!");
            }
            this.release_A = false;
        } else {
            this.release_A = true
        }

    }

    toggleDoor(halo, door){
        if(this.game.data.settings.help.open_door >= 0 && door.angle == 0){
            if (this.game.time.time > this.nextOpenDoorTip) {
                this.game.data.settings.help.open_door -= 1;
                this.createKey('a');
                this.nextOpenDoorTip = this.game.time.time + this.helpRate;
            }
        }
        // Open or close the door.
        if (this.player.data.last_room != null){
            if (this.player.data.last_room.name == "Toalett 1"){
                this.boots.children.forEach(function(element, index, array){
                    element.alpha = 1;
                });
            }
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.A)) {
            if (door.angle == 0){
                door.open();
                if(door.position.y < 247*32 && door.open()) {
                    this.player.moveThroughDoor(door);
                    if(this.game.data.settings.help.shoot > 0){
                        this.game.data.settings.help.shoot -= 1;
                        this.createKey('space');

                    }
                }
            } else {
                if (this.release_A) {
                    // Close the door
                    door.close();
                }
            }
            this.release_A = false;
        } else {
            this.release_A = true
        }
    }

    pickUpBoots(player, boots){
        boots.kill();
        
        this.player.data.super_speed = this.player.data.original_speed * 3;
        if(this.game.data.settings.help.superpower > 0){
            this.game.data.settings.help.superpower -= 1;
            this.createKey('w');
        }
    }

    collisionHandler (bullet, enemy) {
        //  When a bullet hits an alien we kill them both
        bullet.kill();
        console.log("Enemy life left = " + enemy.data['life']);
        if(enemy.data['life'] <= 1){
            enemy.data['life'] = enemy.data['life'] - 1;
            enemy.kill();
            this.score += 100;
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
            this.life_sprites[this.player.data['life']].alpha = 0;
            player.kill();
            this.highScore();
        } else {
            this.player.data['life'] -= 1;
            this.life_sprites[this.player.data['life']].alpha = 0;
        }

        this.nextDeath = this.game.time.time + this.killRate;
        this.player.data['invincible'] = true;

    }

    shopInBaljan (halo, baljan){
        if(this.game.data.settings.help.baljan > 0){
            this.game.data.settings.help.baljan -= 1;
            this.createKey('q');
        }
        if (this.input.keyboard.isDown(Phaser.Keyboard.Q))
        {
            if (this.release_Q) {
                this.addLife();
            }
            this.release_Q = false;
        } else {
            this.release_Q = true
        }
    }

    addLife (halo, baljan) {
        if (this.player.data['life'] < 3) {
            if (this.game.time.time < this.nextLife) {
                this.createText("You must wait " + Math.round((this.nextLife - this.game.time.time) / 1000) + " more seconds.");
                return;
            }
            this.life_sprites[this.player.data['life']].alpha = 1;
            this.player.data['life'] = this.player.data['life'] + 1;
            this.nextLife = this.game.time.time + this.baljanTime;
            this.createText("Life increased to " + this.player.data['life'])
        } else {
            this.createText("You already have full health");
        }
    }

    createText (text) {
        var tmp = this.game.add.group();
        this.text_group.push(tmp);
        var text_obj = this.game.add.text(400, 375+(this.text_group.length-1)*45, text, {
            font: "32px Arial",
            fill: "#54d8e0",
            align: "center"
        });
        text_obj.setShadow(3, 3, 'rgba(0,0,0,0.8)', 5);
        tmp.add(text_obj);
        text_obj.anchor.set(0.5);
        tmp.fixedToCamera = true;
        this.time.events.add(2000, this.destroyText, this);
    }

    destroyText (){
        this.text_group.shift().destroy();
        for (let text in this.text_group){
            var text_point = new Phaser.Point();
            this.text_group[text].children[0].position.clone(text_point);
            text_point.subtract(0, 50);
            this.game.add.tween(this.text_group[text].children[0]).to(text_point, 100, Phaser.Easing.Linear.None, true);
        }
    }

    createKey (key) {
        var tmp = this.game.add.group();
        this.key_group.push(tmp);

        var text_obj = this.game.add.sprite(400, 200-(this.key_group.length-1)*45, key);
        text_obj.alpha = 0;
        text_obj.scale.setTo(0.7, 0.7);
        this.game.add.tween(text_obj).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 500, true);
        tmp.add(text_obj);
        text_obj.anchor.set(0.5);
        tmp.fixedToCamera = true;
        this.time.events.add(2500, this.destroyKey, this);
    }

    destroyKey (){
        this.key_group.shift().destroy();
        for (let text in this.key_group){
            var text_point = new Phaser.Point();
            this.key_group[text].children[0].position.clone(text_point);
            text_point.add(0, 50);
            this.game.add.tween(this.key_group[text].children[0]).to(text_point, 100, Phaser.Easing.Linear.None, true);
        }
    }
    //Called when game is paused
    paused() {
        this.pauseMenu()
    }

    //You're able to do any final post-processing style effects here.
    render() {

        // this.game.debug.cameraInfo(this.game.camera, 32, 32);
        // this.game.debug.spriteCoords(this.player, 32, 500);
        this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
        // if (this.player.data.last_room != null){
        //     this.game.debug.text(this.player.data.last_room.name, 62, 14, "#00ff00");
        // }
        // if (this.player.data.last_area != null){
        //     this.game.debug.text(this.player.data.last_area.name, 162, 14, "#00ff00");
        // }
        // this.game.debug.text(this.score, 262, 14, "#00ff00");


    }
    restart(){
        this.game.data.settings['help'] = {'open_door': 3, 'shoot': 1, 'baljan': 1, 'superpower': 1};
        this.game.state.restart(true, false, this.game.data.settings);
    }

    //Called when switching to a new state
    shutdown() {
        this.game.physics.arcade.isPaused = false;
        this.game.world.removeAll();
        this.reset();

    }

}

export default Game;
