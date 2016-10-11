
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemies extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map) {
    super(game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);
    // Lets create some baddies

    this.enableBody = true;
    map.createFromObjects('Others', 150, 'dude2', 4, true, false, this);
    this.children.forEach(function (element, index, array){
      element.data['velocityX'] = 100;
      element.data['life'] = 3;

      element.body.velocity.x = 100;
      element.body.bounce.x = 0.7 + Math.random() * 0.2;
      element.body.bounce.y = 1;
    });


    this.callAll('animations.add', 'animations', 'left', [0, 1, 2, 3], 2, true);
    this.callAll('animations.add', 'animations', 'right', [5, 6, 7, 8], 7, true);
    this.callAll('animations.play', 'animations', 'right');
  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {

  }


}

export default Enemies;
