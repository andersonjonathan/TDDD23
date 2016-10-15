import ajax from '../utils/ajax';

class HighScore extends Phaser.State {

  constructor() {
    super();

  }

  //Load operations (uses Loader), method called first
  preload() {
    this.game.load.spritesheet('back', 'assets/buttons/back.png', 200, 35);

    this.game.load.spritesheet('mute_music','assets/mute_music.png');
    this.game.load.spritesheet('mute_sfx','assets/mute_sfx.png');
    this.game.load.spritesheet('sound_music','assets/sound_music.png');
    this.game.load.spritesheet('sound_sfx','assets/sound_sfx.png');
    this.game.load.audio('background_sound', 'assets/sound/background.mp3');
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
        }
      };

    }
    this.game.data.settings = this.game_settings
  }
  //Setup code, method called after preload
  create() {
    this.game.stage.backgroundColor = "#54d8e0";
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

    var exit = this.game.add.button(300, 500, 'back', this.toMenu, this, 1, 0, 0);


    if(this.game.data.settings.sound.bg_music == undefined){
      this.game.data.settings.sound.bg_music = this.game.add.audio('background_sound');
      this.game.data.settings.sound.bg_music.loopFull();
      this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
    }
    var _this = this;
    ajax.get('http://liucrawler-skogsjonis.rhcloud.com/api/v1/get/', null, function (data) {
      var data_obj = JSON.parse(data);
      var score_list = _this.game.add.group();
        var text = undefined;
        for (let obj in data_obj){
            text = _this.game.add.text(150, 100+30*obj, parseInt(obj)+1, {
              font: "22px Arial",
              fill: "#ffffff"
            });
            text.anchor.set(1, 0);
            score_list.add(text);
            text = _this.game.add.text(200, 100+30*obj, data_obj[obj].fields.name, {
              font: "22px Arial",
              fill: "#ffffff"
            });
            text.anchor.set(0, 0);
            score_list.add(text);
            text = _this.game.add.text(650, 100+30*obj, data_obj[obj].fields.score, {
              font: "22px Arial",
              fill: "#ffffff"
            });
            text.anchor.set(1, 0);
            score_list.add(text);


      }
      score_list.fixedToCamera = true;
    }, true);

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
  //Code ran on each frame of game
  update() {

  }
  toMenu(){
    this.game.state.start('menu',true, false,
        {
          'sound': {'sfx': this.game.data.settings.sound.sfx, 'music': this.game.data.settings.sound.music, 'bg_music': this.game.data.settings.sound.bg_music}
        });
  }

  //Called when game is paused
  paused() {

  }

  //You're able to do any final post-processing style effects here.
  render() {

  }

  //Called when switching to a new state
  shutdown() {
    this.game.world.removeAll();
  }

}

export default HighScore;
