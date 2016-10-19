import KamikazeEnemy from '../prefabs/kamikaze_enemy';
import SimpleEnemy from '../prefabs/simple_enemy';
import StillShootingEnemy from '../prefabs/still_shooting_enemy';
import Ordo from '../prefabs/ordo';
import FastEnemy from '../prefabs/fast_enemy';

import Rooms from '../prefabs/rooms';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Enemies extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map, player) {
    super(game, game.world, 'Enemies', false, true, Phaser.Physics.ARCADE);

    // Lets create some baddies
    this.player = player;

    this.enableBody = true;


  }

  generate_enemies(game, map, current_game_area){
    map.createFromObjects('Others', 150, 'dude2', 4, true, false, this, KamikazeEnemy, undefined, current_game_area);
    map.createFromObjects('Others', 246, 'dude2', 4, true, false, this, SimpleEnemy, undefined, current_game_area);
    map.createFromObjects('Others', 245, 'dude2', 4, true, false, this, StillShootingEnemy, undefined, current_game_area);
    map.createFromObjects('Others', 244, 'dude2', 4, true, false, this, FastEnemy, undefined, current_game_area);
    map.createFromObjects('Others', 166, 'ordo', 4, true, false, this, Ordo, undefined, current_game_area);

    this.children.forEach(function (element, index, array){
      element.setup(game);
    });
  }
  //Code ran on each frame of game
  update() {
    if (this.game.physics.arcade.isPaused){return;}
    var game = this.game;
    var player_room = Rooms.xy_in_room(game.data.player.position.x/32, game.data.player.position.y/32);

    this.children.forEach(function (element, index, array){
      element.body.moves = true;
        if (element.data.life > 0){
          if (Rooms.xy_in_room(element.position.x/32, element.position.y/32)===player_room){
            element.update(game);
          }
        } else {
            element.destroy();
        }
    });
  }


}

export default Enemies;
