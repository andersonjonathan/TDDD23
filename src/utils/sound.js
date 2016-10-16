/**
 * Created by jonathan on 2016-10-16.
 */
var sound = {};
sound.init = function (game){
    sound.game = game;
    this.loadMusic();
    this.addSoundControllers();
};
sound.addSoundControllers = function (){
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
};

sound.loadMusic = function (){
    if(this.game.data.settings.sound.bg_music == undefined){
        this.game.data.settings.sound.bg_music = this.game.add.audio('background_sound');
        this.game.data.settings.sound.bg_music.loopFull();
        this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
    }
};
sound.toggleMusic = function (music) {
    if (music.key == 'sound_music'){
        music.loadTexture('mute_music', 0);
        this.game.data.settings.sound.music = 0;
        this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
    } else {
        music.loadTexture('sound_music', 0);
        this.game.data.settings.sound.music = 1;
        this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
    }
};

sound.toggleSFX = function (sfx) {
    if (sfx.key == 'sound_sfx'){
        sfx.loadTexture('mute_sfx', 0);
        this.game.data.settings.sound.sfx = 0;
    } else {
        sfx.loadTexture('sound_sfx', 0);
        this.game.data.settings.sound.sfx = 1;
    }
};
export default sound;