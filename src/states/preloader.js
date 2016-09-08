class Preloader extends Phaser.State {

  constructor() {
    super();
    this.asset = null;
    this.ready = false;
  }

  preload() {
    //setup loading bar
    this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
    this.load.setPreloadSprite(this.asset);

    //Setup loading and its events
    this.loadResources();
    console.log("preloader");
      console.log("menu");
      this.game.state.start('menu');
  }

  loadResources() {
      console.log("wtf");
    //this.game.load.image('background','assets/bg_wood.png');
  }


    //Setup code, method called after preload
    create() {

    }

    //Code ran on each frame of game
    update() {

    }

    //Called when game is paused
    paused() {

    }

    //You're able to do any final post-processing style effects here.
    render() {

    }

    //Called when switching to a new state
    shutdown() {

    }
}

export default Preloader;
