//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class FastEnemy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.data['velocityX'] = 580;
      this.data['velocityY'] = 80;
    this.data['velocity_obj'] = {x: 580, y: 80 };
    this.data['life'] = 3;
    // this.animations.add('left', [0, 1, 2, 3], 8, true);
    // this.animations.add('right', [5, 6, 7, 8], 8, true);
    // this.animations.play('right');
    this.data['points'] = 150;
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

export default FastEnemy;
