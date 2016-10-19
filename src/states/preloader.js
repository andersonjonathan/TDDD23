
import game_assets from './game/load_assets';

class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    this.game.stage.backgroundColor = "#54d8e0";
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.loadResources();
  }

  loadResources() {

    game_assets.load(this.game)
  }

  onLoadComplete() {
    this.game.state.start('menu');
  }
}

export default Preloader;
