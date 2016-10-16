import KamikazeEnemy from '../prefabs/kamikaze_enemy';
import SimpleEnemy from '../prefabs/simple_enemy';
import StillShootingEnemy from '../prefabs/still_shooting_enemy';

import Rooms from '../prefabs/rooms';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemies extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map, player) {
    super(game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);

    // Lets create some baddies
    this.player = player;

    this.enableBody = true;

    map.createFromObjects('Others', 150, 'dude2', 4, true, false, this, KamikazeEnemy);
    map.createFromObjects('Others', 166, 'dude2', 4, true, false, this, SimpleEnemy);
    map.createFromObjects('Others', 245, 'dude2', 4, true, false, this, StillShootingEnemy);
    this.children.forEach(function (element, index, array){
      element.setup();
    });

  }

  //Code ran on each frame of game
  update() {
    var game = this.game;
    this.children.forEach(function (element, index, array){
      if (Rooms.xy_in_room(element.position.x/32, element.position.y/32)===Rooms.xy_in_room(game.data.player.position.x/32, game.data.player.position.y/32)){
        element.update(game);
      }

    });
  }


}

export default Enemies;
