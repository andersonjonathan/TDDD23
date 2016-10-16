//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class KamikazeEnemy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.data['velocity'] = 100;
    this.data['velocityX'] = 80;
    this.data['velocityY'] = 20;
    this.data['life'] = 3;
    this.animations.add('left', [0, 1, 2, 3], 8, true);
    this.animations.add('right', [5, 6, 7, 8], 8, true);
    this.animations.play('right');
  }

  //Code ran on each frame of game
  update(game) {
    game.physics.arcade.moveToObject(this, game.data.player, 180, 0);
  }
  
  setup(){
    this.body.velocity.x = this.data['velocityX'];
    this.body.bounce.x = 0.7 + Math.random() * 0.2;
    this.body.bounce.y = 1;
  }


}

export default KamikazeEnemy;
