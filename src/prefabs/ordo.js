/**
 * Created by lehtonen on 2016-10-14.
 */


import OrdoBullet from '../prefabs/ordo_bullet';

class Ordo extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.data['velocity'] = 100;
    this.data['velocityX'] = 80;
    this.data['velocityY'] = 20;
    this.data['life'] = 3;
    this.data['points'] = 500;
    this.nextFire = 0;
    this.weapon = new OrdoBullet(this.game);

  }

  //Code ran on each frame of game
  update(game) {
    game.physics.arcade.moveToObject(this, game.data.player, 180, 0);
    this.weapon.fire(this, game.data['player']);
  }

  setup(game){
    this.body.velocity.x = 100;
    this.body.bounce.x = 0.7 + Math.random() * 0.2;
    this.body.bounce.y = 1;
    this.anchor.set(0.5);
    this.data['life'] = 10;
    game.data['enemy_weapons'].push(this.weapon)
  }

}

export default Ordo;