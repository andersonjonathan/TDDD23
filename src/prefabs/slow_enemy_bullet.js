/**
 * Created by jonathan on 2016-10-16.
 */
import MathBullet from '../prefabs/math_bullet';

class SlowEnemyBullet extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent) {
    super(game, game.world, 'Ordo Bullet', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.bulletSpeed = 300;
    this.fireRate = 1500;
    for (var i = 0; i < 64; i++)
    {
      this.add(new MathBullet(game, 'ordoBullet'), true);
    }
    this.throw_sound = this.game.add.audio('throw_sound');
    return this;
  }

  fire(source, game) {
    if (this.game.time.time < this.nextFire) { return; }

    var x = source.x;
    var y = source.y;
    this.getFirstExists(false).fire(x, y, this.game.physics.arcade.angleBetween(source, this.game.data['player'])* (180/Math.PI), this.bulletSpeed, 0, 0);
    if (this.game.data.settings.sound.sfx !== 0){
      this.throw_sound.play();
      this.throw_sound.volume = this.game.data.settings.sound.sfx;
    }
    if (this.game.data.score !== 0) {
      this.game.data.score -= 1;
    }
    this.nextFire = this.game.time.time + this.fireRate;

  };

  //Code ran on each frame of game
  update() {

  }

}

export default SlowEnemyBullet;
