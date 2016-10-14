import Enemy from '../prefabs/enemy';
import Rooms from '../prefabs/rooms';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemies extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map, player) {
    super(game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);

    // Lets create some baddies
    this.player = player;

    this.enableBody = true;

    map.createFromObjects('Others', 150, 'dude2', 4, true, false, this, Enemy);
    this.children.forEach(function (element, index, array){
      element.body.velocity.x = 100;
      element.body.bounce.x = 0.7 + Math.random() * 0.2;
      element.body.bounce.y = 1;
    });

  }

  //Code ran on each frame of game
  update() {
    var game = this.game;
    this.children.forEach(function (element, index, array){
      if (Rooms.xy_in_room(element.position.x/32, element.position.y/32)===Rooms.xy_in_room(game.data.player.position.x/32, game.data.player.position.y/32)){
        game.physics.arcade.moveToObject(element, game.data.player, 180, 0);
      }

    });
  }


}

export default Enemies;
