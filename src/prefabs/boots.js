/**
 * Created by lehtonen on 2016-10-13.
 */

//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Boots extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map) {
    super(game, game.world, 'Objects', false, true, Phaser.Physics.ARCADE);
    // Lets create some baddies

    this.enableBody = true;
    map.createFromObjects('Others', 111, 'boots', 12, true, false, this);


  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {

  }


}

export default Boots;
