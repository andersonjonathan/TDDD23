import Enemy from '../prefabs/enemy';
import Rooms from '../prefabs/rooms';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemies extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map, player) {
    super(game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);
    this.game2 = game;

    // Lets create some baddies
    this.player = player;

    this.enableBody = true;
    map.createFromObjects('Others', 150, 'dude2', 4, true, false, this, Enemy);
    this.children.forEach(function (element, index, array){
      element.body.velocity.x = 100;
      element.body.bounce.x = 0.7 + Math.random() * 0.2;
      element.body.bounce.y = 1;

      //game.physics.arcade.moveToObject(element, player, 60, 0);

    });

  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {
    var game = this.game;
    //console.log(this.game.data['player']);
    this.children.forEach(function (element, index, array){
      if (Rooms.xy_in_room(element.position.x/32, element.position.y/32)===Rooms.xy_in_room(game.data.player.position.x/32, game.data.player.position.y/32)){
        game.physics.arcade.moveToXY(element, game.data.player.position.x, game.data.player.position.y, 200)
      }

    });
    //this.game.physics.arcade.moveToObject(this, this.game.data['player'], 60, 0);

  }


}

export default Enemies;
