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
        this.pause_menu_data = undefined;

        this.removePoint = 0;
        this.removeRate = 1000;

        this.weapons = undefined;
        this.currentWeapon = 0;
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
        this.current_game_area = 0;
        this.background_sound = undefined;
        this.final_score = 0;
        this.score = 0;
        this.life_sprites = undefined;
        this.score_group = undefined;
        this.reported_hs = false;
    }

    //Load operations (uses Loader), method called first
    preload() {
        // Map
        this.game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
        this.game.load.image('tiles', 'assets/tiles.png');
        this.game.load.image('tiled_school', 'assets/tiled_school.png');
        
        // Prefab assets:
        // pencil
        this.game.load.spritesheet('pencil', 'assets/pencil.png');
        // player
        this.game.load.spritesheet('student', 'assets/student.png', 40, 40);
        this.game.load.spritesheet('student2', 'assets/student2.png', 40, 40);
        // doors
        this.game.load.spritesheet('door_3_1', 'assets/doors/door_3_1.png');
        this.game.load.spritesheet('door_2_1', 'assets/doors/door_2_1.png');
        this.game.load.spritesheet('door_1_3', 'assets/doors/door_1_3.png');
        this.game.load.spritesheet('door_1_2', 'assets/doors/door_1_2.png');

        // fire door
        this.game.load.spritesheet('fire_door_3_1', 'assets/doors/fire_door_3_1.png');
        this.game.load.spritesheet('fire_door_1_3', 'assets/doors/fire_door_1_3.png');

        //Bonus items
        this.game.load.spritesheet('boots', 'assets/boots.png', 48, 48);

        // Local assets
        this.game.load.spritesheet('dude2', 'assets/dude.png', 32, 48);
        this.game.load.spritesheet('baljan', 'assets/baljan-logo.png');


        this.game.load.spritesheet('invisibleBlock', 'assets/invisibleBlock.png');
        this.game.load.spritesheet('dude','assets/dude.png');
        this.game.load.spritesheet('mute_music','assets/mute_music.png');
        this.game.load.spritesheet('mute_sfx','assets/mute_sfx.png');
        this.game.load.spritesheet('sound_music','assets/sound_music.png');
        this.game.load.spritesheet('sound_sfx','assets/sound_sfx.png');
        this.game.load.audio('background_sound', 'assets/sound/background.mp3');
        this.game.load.audio('throw_sound', 'assets/sound/throw.mp3');

        this.game.load.spritesheet('54d8e0','assets/54d8e0.png');

        this.game.load.spritesheet('continue', 'assets/buttons/continue3.png', 200, 35);
        this.game.load.spritesheet('restart', 'assets/buttons/restart.png', 200, 35);
        this.game.load.spritesheet('help', 'assets/buttons/help.png', 200, 35);
        this.game.load.spritesheet('exit', 'assets/buttons/exit3.png', 200, 35);
        this.game.load.spritesheet('back', 'assets/buttons/back.png', 200, 35);

        this.game.load.spritesheet('heart', 'assets/heart.png');

        this.game.load.spritesheet('a', 'assets/key_a.png');
        this.game.load.spritesheet('s', 'assets/key_s.png');
        this.game.load.spritesheet('d', 'assets/key_d.png');
        this.game.load.spritesheet('q', 'assets/key_q.png');
        this.game.load.spritesheet('w', 'assets/key_w.png');
        this.game.load.spritesheet('e', 'assets/key_e.png');
        this.game.load.spritesheet('esc', 'assets/key_esc.png');
        this.game.load.spritesheet('space', 'assets/key_space.png');
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
                    'open_door': true
                }
            };
        }
        this.game.data.settings = this.game_settings
    }
    //Setup code, method called after preload
    create() {
        //  We're going to be using physics, so enable the Arcade
        this.game.physics.startSystem(Phaser.Physics.Arcade);

        if(this.game.data.settings.sound.bg_music == undefined){
            this.game.data.settings.sound.bg_music = this.game.add.audio('background_sound');
            this.game.data.settings.sound.bg_music.loopFull();
            this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
        }

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
        //this.player.body.immovable = true;
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
        
        // Add listener to the p button for pausing
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

        this.game.stage.backgroundColor = 0x4488cc;
        this.shadowTexture = this.game.add.bitmapData(this.game.width, this.game.height);

        // Create an object that will use the bitmap as a texture
        var lightSprite = this.game.add.image(0, 0, this.shadowTexture);
        lightSprite.fixedToCamera = true;
        // Set the blend mode to MULTIPLY. This will darken the colors of
        // everything below this sprite.
        lightSprite.blendMode = Phaser.blendModes.MULTIPLY;

        if (this.current_game_area !== 0){

            for (var i = 0; i < this.current_game_area; i++){
                var ga = GameAreas.game_areas[i];
                var ga_enemies = ga.get_enemies(this.enemies);
                for (var j = 0; j < ga_enemies.length; j++){
                    ga_enemies[j]['data']['life'] = 0;
                    ga_enemies[j].kill();
                }
                console.log("Next area");
                ga.unlock();
                ga.open();
                if (this.current_game_area == 12){
                    console.log("Winner!");
                }
            }
        }
        this.game.add.audio('throw_sound');

        var music_sprite = 'sound_music';
        var sfx_sprite = 'sound_music';
        if (this.game.data.settings.sound.music == 0){
            music_sprite = 'mute_music';
        }
        if (this.game.data.settings.sound.sfx == 0){
            sfx_sprite = 'mute_sfx';
        }
        var music = this.game.add.sprite(10, 526, music_sprite);
        music.scale.setTo(0.5, 0.5);
        music.fixedToCamera = true;
        music.inputEnabled = true;
        music.events.onInputDown.add(this.toggleMusic, this);

        var sfx = this.game.add.sprite(10, 462, sfx_sprite);
        sfx.scale.setTo(0.5, 0.5);
        sfx.fixedToCamera = true;
        sfx.inputEnabled = true;
        sfx.events.onInputDown.add(this.toggleSFX, this);

        this.game.add.plugin(Fabrique.Plugins.InputField);
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

    toggleMusic (music) {
        if (music.key == 'sound_music'){
            music.loadTexture('mute_music', 0);
            this.game.data.settings.sound.music = 0;
            this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
        } else {
            music.loadTexture('sound_music', 0);
            this.game.data.settings.sound.music = 1;
            this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
        }
    }

    toggleSFX (sfx) {
        if (sfx.key == 'sound_sfx'){
            sfx.loadTexture('mute_sfx', 0);
            this.game.data.settings.sound.sfx = 0;
        } else {
            sfx.loadTexture('sound_sfx', 0);
            this.game.data.settings.sound.sfx = 1;
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
        console.log("PAAAAUSE!");
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
        console.log("PAAAAUSE!");
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
        console.log("RESUME!!!");
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


    //Code ran on each frame of game
    update() {
        if (this.game.physics.arcade.isPaused){ return }  // skip this if we have paused
        
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





        if (this.current_game_area == 11){
            this.player.kill();
            this.highScore();
            console.log("Winner!");
            return
        }
        var ga = GameAreas.game_areas[this.current_game_area];
        if (ga.get_enemies(this.enemies).length === 0){
            ga.unlock();
            ga.open();
            this.current_game_area += 1;

        }

        if (this.game.time.time >= this.nextDeath) {
            this.player.data['invincible'] = false;
        }

        if (this.game.time.time >= this.removePoint && this.score !== 0) {
            this.score -= 1;
            this.removePoint = this.game.time.time + this.removeRate;
        }
        // Update night mode
        this.updateShadowTexture();
        this.score_group.children[0].setText(this.score);
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
        this.pause_menu_data.push(this.game.add.sprite(200, 65, 'a'));
        this.pause_menu_data[2].scale.setTo(0.7, 0.7);
        this.pause_menu_data[2].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 72, "Open/Close doors", {
            font: "22px Arial",
            fill: "#ffffff"
        }));

        this.pause_menu_data.push(this.game.add.sprite(200, 115, 's'));
        this.pause_menu_data[4].scale.setTo(0.7, 0.7);
        this.pause_menu_data[4].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 122, "", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        this.pause_menu_data.push(this.game.add.sprite(200, 165, 'd'));
        this.pause_menu_data[6].scale.setTo(0.7, 0.7);
        this.pause_menu_data[6].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 172, "", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        this.pause_menu_data.push(this.game.add.sprite(200, 215, 'q'));
        this.pause_menu_data[8].scale.setTo(0.7, 0.7);
        this.pause_menu_data[8].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 222, "Shop in Baljan", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        this.pause_menu_data.push(this.game.add.sprite(200, 265, 'w'));
        this.pause_menu_data[10].scale.setTo(0.7, 0.7);
        this.pause_menu_data[10].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 272, "Superpower", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        this.pause_menu_data.push(this.game.add.sprite(200, 315, 'e'));
        this.pause_menu_data[12].scale.setTo(0.7, 0.7);
        this.pause_menu_data[12].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 322, "Turn on/off the lights", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        this.pause_menu_data.push(this.game.add.sprite(200, 365, 'esc'));
        this.pause_menu_data[14].scale.setTo(0.7, 0.7);
        this.pause_menu_data[14].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 372, "Pause / Resume", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        this.pause_menu_data.push(this.game.add.sprite(200, 415, 'space'));
        this.pause_menu_data[16].scale.setTo(0.7, 0.7);
        this.pause_menu_data[16].anchor.set(1, 0);
        this.pause_menu_data.push(this.game.add.text(220, 422, "Shoot", {
            font: "22px Arial",
            fill: "#ffffff"
        }));
        for (let tmp in this.pause_menu_data){
            this.pause_menu_data[tmp].fixedToCamera = true;
        }
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
        if(this.game.data.settings.help.open_door){
            this.game.data.settings.help.open_door = false;
            this.createText("Press A to open.");
        }
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
                if(door.position.y < 247*32 && door.open()) {

                    this.player.data.immovable = true;
                    var in_door_frame = new Phaser.Point();
                    door.position.clone(in_door_frame);
                    if(door.data.hinge == "right"){
                        in_door_frame.subtract(door.data['size'].x / 2, 0);
                    } else {
                        in_door_frame.add(door.data['size'].x / 2, 0);
                    }
                    if(door.data.hinge == "down"){
                        in_door_frame.subtract(0, door.data['size'].y / 2);
                    } else {
                        in_door_frame.add(0, door.data['size'].y / 2);
                    }

                    var in_room = new Phaser.Point();
                    in_door_frame.clone(in_room);
                    if (door.data.open == "down") {
                        in_room.add(0, -80);
                        this.player.animations.play('up');
                        this.player.data.facing = 'n';
                    } else if (door.data.open == "up") {
                        in_room.add(0, 80);
                        this.player.animations.play('down');
                        this.player.data.facing = 's';
                    } else if (door.data.open == "right") {
                        this.player.animations.play('left');
                        this.player.data.facing = 'w';
                        in_room.add(-80, 0);
                    } else if (door.data.open == "left") {
                        this.player.animations.play('right');
                        this.player.data.facing = 'e';
                        in_room.add(80, 0);
                    }
                    var tween = this.game.add.tween(this.player).to(in_door_frame, 500, Phaser.Easing.Linear.None, true);
                    tween.onComplete.add(function () {
                        var tween2 = this.game.add.tween(this.player).to(in_room, 0, Phaser.Easing.Linear.None, true);
                        tween2.onComplete.add(function () {
                            this.player.data.immovable = false;
                        }, this);
                    }, this);
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
        console.log('Liv kvar = ' + this.player.data['life']);

    }

    shopInBaljan (halo, baljan){
        if (this.input.keyboard.isDown(Phaser.Keyboard.Q))
        {

            if (this.release_Q) {
                // Close the door
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
                    this.createText("You must wait " + Math.floor((this.nextLife - this.game.time.time) / 1000) + " more seconds.");
                    return;
                }
            }
            console.log("Köpa kaffe i baljan");
            this.life_sprites[this.player.data['life']].alpha = 1;
            this.player.data['life'] = this.player.data['life'] + 1;
            this.nextLife = this.game.time.time + this.baljanTime;
            this.createText("Life increased to " + this.player.data['life'])
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
        var text = this.game.add.text(400, 400, text, {
            font: "32px Arial",
            fill: "#ff8000",
            align: "center"
        });
        this.text_group.add(text);
        text.anchor.set(0.5);
        this.text_group.fixedToCamera = true;
        this.time.events.add(2000, this.destroyText, this);
    }

    destroyText (){
        console.log("destroying text");
        this.time.events.add(0, this.text_group.destroy, this.text_group);
        this.text_group = null;
        //this.text_group.destroy();
        //this.text_group = null;
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
        // if (this.player.data.last_room != null){
        //     this.game.debug.text(this.player.data.last_room.name, 62, 14, "#00ff00");
        // }
        // if (this.player.data.last_area != null){
        //     this.game.debug.text(this.player.data.last_area.name, 162, 14, "#00ff00");
        // }
        // this.game.debug.text(this.score, 262, 14, "#00ff00");


    }
    restart(){
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
