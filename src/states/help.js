import sound from '../utils/sound';
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
    this.game.load.spritesheet('arrows', 'assets/key_arrows.png');
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

    var exit = this.game.add.button(300, 500, 'back', this.toMenu, this, 1, 0, 0);

    var tmp = this.game.add.sprite(550, 65, 'arrows');

    tmp.scale.setTo(0.7, 0.7);
    tmp.anchor.set(0, 0);
    var txt = this.game.add.text(618, 160, 'Moving', {
      font: "22px Arial",
      fill: "#ffffff"
    });

    txt.anchor.set(0.5, 0);

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
      tmp = this.game.add.sprite(250, 65+item*50, help_data[item].key);
      tmp.scale.setTo(0.7, 0.7);
      tmp.anchor.set(1, 0);
      this.game.add.text(270, 72+item*50, help_data[item].help_text, {
        font: "22px Arial",
        fill: "#ffffff"
      });
    }
    for (let tmp in this.pause_menu_data){
      this.pause_menu_data[tmp].fixedToCamera = true;
    }

    sound.init(this.game)
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
