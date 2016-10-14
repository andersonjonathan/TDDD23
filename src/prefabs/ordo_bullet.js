/**
 * Created by lehtonen on 2016-10-14.
 */
import MathBullet from '../prefabs/math_bullet';

class OrdoBullet extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, parent) {
    super(game, game.world, 'Ordo Bullet', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 0;
    this.bulletSpeed = 800;
    this.fireRate = 200;

    this.enableBody = true;
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.createMultiple(30, 'ordoBullet');
    this.setAll('anchor.x', 0.5);
    this.setAll('anchor.y', 1);
    this.setAll('outOfBoundsKill', true);
    this.setAll('checkWorldBounds', true);


    return this;
  }

  fire(source, player) {
    /*if (this.game.time.time < this.nextFire) { return; }

    var dest_x = player.position.x;
    var dest_y = player.position.y;
    var src_x = source.children[0].position.x/32;
    var src_y = source.children[0].position.y/32;
    this.getFirstExists(false).fire(dest_x, dest_y, source, this.bulletSpeed, src_x, src_y);
    //game.physics.arcade.moveToXY(source, game.data.player.position.x, game.data.player.position.y, 200)

    this.nextFire = this.game.time.time + this.fireRate;*/

  };

  //Code ran on each frame of game
  update() {

  }

}

export default OrdoBullet;
