import Pencil from '../prefabs/pencil';

class SingleBullet extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent) {
    super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.bulletSpeed = 500;
    this.fireRate = 300;
    for (var i = 0; i < 64; i++)
    {
      this.add(new Pencil(game, 'pencil'), true);
    }
    return this;
  }

  fire(source, game) {

    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x + 10;
    var y = source.y + 10;
    this.getFirstExists(false).fire(x, y, game.player_shooting_mapping[game.player_facing], this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

  };

  //Load operations (uses Loader), method called first
  preload() {

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

export default SingleBullet;
