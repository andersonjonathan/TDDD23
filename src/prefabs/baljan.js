/**
 * Created by lehtonen on 2016-10-13.
 */

//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Baljan extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map) {
    super(game, game.world, 'Baljan', false, true, Phaser.Physics.ARCADE);
    // Lets create some baddies

    this.enableBody = true;
    map.createFromObjects('Others', 41, 'baljan', 12, true, false, this);
    this.children.forEach(function (element, index, array){
        element.body.immovable = true;
        element.body.moves = false;
    });

  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {

  }


}

export default Baljan;
/**
 * Created by lehtonen on 2016-10-14.
 */
