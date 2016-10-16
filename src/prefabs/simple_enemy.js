//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class SimpleEnemy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.data['velocity'] = 200;
    this.data['velocity_obj'] = {x: 180, y: 40 };
    this.data['life'] = 3;
    this.animations.add('left', [0, 1, 2, 3], 8, true);
    this.animations.add('right', [5, 6, 7, 8], 8, true);
    this.animations.play('right');
  }

  //Code ran on each frame of game
  update(game) {
  }
  
  setup(){
    this.body.velocity = this.data['velocity_obj'];
    this.body.bounce.x = 1;
    this.body.bounce.y = 1;
  }


}

export default SimpleEnemy;
