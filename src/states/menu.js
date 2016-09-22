class Menu extends Phaser.State {

  constructor() {
    super();

  }

  //Load operations (uses Loader), method called first
  preload() {
    this.game.state.start('game');
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

export default Menu;
