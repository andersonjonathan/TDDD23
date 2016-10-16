class Help extends Phaser.State {

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
    this.game.load.spritesheet('a', 'assets/key_a.png');
    this.game.load.spritesheet('s', 'assets/key_s.png');
    this.game.load.spritesheet('d', 'assets/key_d.png');
    this.game.load.spritesheet('q', 'assets/key_q.png');
    this.game.load.spritesheet('w', 'assets/key_w.png');
    this.game.load.spritesheet('e', 'assets/key_e.png');
    this.game.load.spritesheet('esc', 'assets/key_esc.png');
    this.game.load.spritesheet('space', 'assets/key_space.png');
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

    var a = this.game.add.sprite(200, 50, 'a');
    a.scale.setTo(0.7, 0.7);
    a.anchor.set(1, 0);
    this.game.add.text(220, 57, "Open/Close doors", {
      font: "22px Arial",
      fill: "#ffffff"
    });

    var s = this.game.add.sprite(200, 100, 's');
    s.scale.setTo(0.7, 0.7);
    s.anchor.set(1, 0);
    this.game.add.text(220, 107, "", {
      font: "22px Arial",
      fill: "#ffffff"
    });
    var d = this.game.add.sprite(200, 150, 'd');
    d.scale.setTo(0.7, 0.7);
    d.anchor.set(1, 0);
    this.game.add.text(220, 157, "", {
      font: "22px Arial",
      fill: "#ffffff"
    });
    var q = this.game.add.sprite(200, 200, 'q');
    q.scale.setTo(0.7, 0.7);
    q.anchor.set(1, 0);
    this.game.add.text(220, 207, "Shop in Baljan", {
      font: "22px Arial",
      fill: "#ffffff"
    });
    var w = this.game.add.sprite(200, 250, 'w');
    w.scale.setTo(0.7, 0.7);
    w.anchor.set(1, 0);
    this.game.add.text(220, 257, "Superpower", {
      font: "22px Arial",
      fill: "#ffffff"
    });
    var e = this.game.add.sprite(200, 300, 'e');
    e.scale.setTo(0.7, 0.7);
    e.anchor.set(1, 0);
    this.game.add.text(220, 307, "Turn on/off the lights", {
      font: "22px Arial",
      fill: "#ffffff"
    });
    var esc = this.game.add.sprite(200, 350, 'esc');
    esc.scale.setTo(0.7, 0.7);
    esc.anchor.set(1, 0);
    this.game.add.text(220, 357, "Pause / Resume", {
      font: "22px Arial",
      fill: "#ffffff"
    });
    var space = this.game.add.sprite(200, 400, 'space');
    space.scale.setTo(0.7, 0.7);
    space.anchor.set(1, 0);
    this.game.add.text(220, 407, "Shoot", {
      font: "22px Arial",
      fill: "#ffffff"
    });


    if(this.game.data.settings.sound.bg_music == undefined){
      this.game.data.settings.sound.bg_music = this.game.add.audio('background_sound');
      this.game.data.settings.sound.bg_music.loopFull();
      this.game.data.settings.sound.bg_music.volume = this.game.data.settings.sound.music;
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

export default Help;
