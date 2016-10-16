/**
 * Created by jonathan on 2016-10-16.
 */
var assets = {};
assets.load = function (game) {
    // Map
    game.load.tilemap('map', 'assets/maze.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tiles.png');
    game.load.image('tiled_school', 'assets/tiled_school.png');

    // Prefab assets:
    // pencil
    game.load.spritesheet('pencil', 'assets/pencil.png');
    // player
    game.load.spritesheet('student', 'assets/student.png', 40, 40);
    game.load.spritesheet('student2', 'assets/student2.png', 40, 40);
    // doors
    game.load.spritesheet('door_3_1', 'assets/doors/door_3_1.png');
    game.load.spritesheet('door_2_1', 'assets/doors/door_2_1.png');
    game.load.spritesheet('door_1_3', 'assets/doors/door_1_3.png');
    game.load.spritesheet('door_1_2', 'assets/doors/door_1_2.png');

    // fire door
    game.load.spritesheet('fire_door_3_1', 'assets/doors/fire_door_3_1.png');
    game.load.spritesheet('fire_door_1_3', 'assets/doors/fire_door_1_3.png');

    //Bonus items
    game.load.spritesheet('boots', 'assets/boots.png', 48, 48);

    // Local assets
    game.load.spritesheet('dude2', 'assets/dude.png', 32, 48);
    game.load.spritesheet('baljan', 'assets/baljan-logo.png');


    game.load.spritesheet('invisibleBlock', 'assets/invisibleBlock.png');
    game.load.spritesheet('dude', 'assets/dude.png');
    game.load.spritesheet('mute_music', 'assets/mute_music.png');
    game.load.spritesheet('mute_sfx', 'assets/mute_sfx.png');
    game.load.spritesheet('sound_music', 'assets/sound_music.png');
    game.load.spritesheet('sound_sfx', 'assets/sound_sfx.png');
    game.load.audio('background_sound', 'assets/sound/background.mp3');
    game.load.audio('throw_sound', 'assets/sound/throw.mp3');

    game.load.spritesheet('54d8e0', 'assets/54d8e0.png');

    game.load.spritesheet('continue', 'assets/buttons/continue3.png', 200, 35);
    game.load.spritesheet('restart', 'assets/buttons/restart.png', 200, 35);
    game.load.spritesheet('help', 'assets/buttons/help.png', 200, 35);
    game.load.spritesheet('exit', 'assets/buttons/exit3.png', 200, 35);
    game.load.spritesheet('back', 'assets/buttons/back.png', 200, 35);

    game.load.spritesheet('heart', 'assets/heart.png');

    game.load.spritesheet('a', 'assets/key_a.png');
    game.load.spritesheet('s', 'assets/key_s.png');
    game.load.spritesheet('d', 'assets/key_d.png');
    game.load.spritesheet('q', 'assets/key_q.png');
    game.load.spritesheet('w', 'assets/key_w.png');
    game.load.spritesheet('e', 'assets/key_e.png');
    game.load.spritesheet('esc', 'assets/key_esc.png');
    game.load.spritesheet('space', 'assets/key_space.png');
    game.load.spritesheet('arrows', 'assets/key_arrows.png');
    
    game.load.spritesheet('pause', 'assets/pause.png');
    game.load.spritesheet('infinity', 'assets/infinite.png');
    
    game.load.image('ordo', 'assets/ordo-boss.png');
    game.load.image('ordoBullet', 'assets/math_1.png');

};
export default assets;