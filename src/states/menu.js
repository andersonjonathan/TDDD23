import sound from '../utils/sound';

class Menu extends Phaser.State {

  constructor() {
    super();
    this.new_game = undefined;
    this.high_score = undefined;
    this.help = undefined;
  }

  //Load operations (uses Loader), method called first
  preload() {
    this.game.load.spritesheet('new_game', 'assets/buttons/new_game.png', 200, 35);
    this.game.load.spritesheet('high_score', 'assets/buttons/high_score3.png', 200, 35);
    this.game.load.spritesheet('help', 'assets/buttons/help.png', 200, 35);
    this.game.load.spritesheet('settings', 'assets/buttons/settings3.png', 200, 35);

    this.game.load.spritesheet('mute_music','assets/mute_music.png');
    this.game.load.spritesheet('mute_sfx','assets/mute_sfx.png');
    this.game.load.spritesheet('sound_music','assets/sound_music.png');
    this.game.load.spritesheet('sound_sfx','assets/sound_sfx.png');
    this.game.load.audio('background_sound', 'assets/sound/background.mp3');
  }
  init(settings){
    this.new_game = undefined;
    this.high_score = undefined;
    this.help = undefined;
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
    var play_key = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    play_key.onDown.add(this.startGame, this);

    this.new_game = this.game.add.button(300, 250, 'new_game', this.startGame, this, 1, 0, 0);
    this.new_game.fixedToCamera = true;
    this.high_score = this.game.add.button(300, 290, 'high_score', this.highScore, this, 1, 0, 0);
    this.high_score.fixedToCamera = true;
    this.help = this.game.add.button(300, 330, 'help', this.toHelp, this, 1, 0, 0);
    this.help.fixedToCamera = true;
    // var settings = this.game.add.button(this.game.world.centerX - 100, 370, 'settings', this.startGame, this, 1, 0, 0);
    sound.init(this.game)
  }

  //Code ran on each frame of game
  update() {

  }
  startGame(){
    this.game.state.start('game',true, false,
        {
          'sound': {'sfx': this.game.data.settings.sound.sfx, 'music': this.game.data.settings.sound.music, 'bg_music': this.game.data.settings.sound.bg_music},
          'help': {'open_door': 2, 'shoot': 1, 'baljan': 1, 'superpower': 1, 'nightmode': 1}
        });
  }
  highScore(){
    this.game.state.start('high_score', true, false,
        {
          'sound': {'sfx': this.game.data.settings.sound.sfx, 'music': this.game.data.settings.sound.music, 'bg_music': this.game.data.settings.sound.bg_music}
        });
  }
  toHelp(){
    this.game.state.start('help', true, false,
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

export default Menu;
