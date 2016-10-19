//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
import SlowEnemyBullet from '../prefabs/slow_enemy_bullet';
class StillShootingEnemy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.data['velocityX'] = 0;
    this.data['velocityY'] = 0;
    this.data['velocity_obj'] = {x: 0, y: 0};
    this.data['life'] = 3;
    this.data['points'] = 200;
    this.weapon = new SlowEnemyBullet(this.game);
  }

  //Code ran on each frame of game
  update(game) {
    this.weapon.fire(this, game.data['player']);
  }
  
  setup(game){
    game.data['enemy_weapons'].push(this.weapon)
    this.body.bounce.x = 0;
    this.body.bounce.y = 0;
    this.body.immovable = true;
    this.body.moves = false;
  }


}

export default StillShootingEnemy;
