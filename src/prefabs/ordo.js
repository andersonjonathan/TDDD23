/**
 * Created by lehtonen on 2016-10-14.
 */

import Rooms from '../prefabs/rooms';
import OrdoBullet from '../prefabs/ordo_bullet';

//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Ordo extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map, player) {
    super(game, game.world, 'Ordo', false, true, Phaser.Physics.ARCADE);
    this.game2 = game;

    // Lets create some baddies
    this.player = player;
    this.nextFire = 0;
    this.ordoBullet = OrdoBullet;
    game.physics.arcade.enable(this);

    this.enableBody = true;
    map.createFromObjects('Others', 166, 'ordo', 4, true, false, this);
    this.children.forEach(function (element, index, array){
        element.body.velocity.x = 100;
        element.body.bounce.x = 0.7 + Math.random() * 0.2;
        element.body.bounce.y = 1;
        element.data['life'] = 10;
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

export default Ordo;
