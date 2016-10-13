//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemy extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    this.data['velocityX'] = 100;
    this.data['life'] = 3;
    this.animations.add('left', [0, 1, 2, 3], 8, true);
    this.animations.add('right', [5, 6, 7, 8], 8, true);
    this.animations.play('right');
  }

  //Code ran on each frame of game
  update() {


  }


}

export default Enemy;
