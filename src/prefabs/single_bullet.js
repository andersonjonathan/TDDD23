import Pencil from '../prefabs/pencil';

class SingleBullet extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent) {
    super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.bulletSpeed = 800;
    this.fireRate = 200;
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
    this.getFirstExists(false).fire(x, y, source.get_direction(), this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.time + this.fireRate;

  };

  //Code ran on each frame of game
  update() {

  }

}

export default SingleBullet;
