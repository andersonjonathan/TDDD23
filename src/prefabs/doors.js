import Rooms from '../prefabs/rooms';
import Door from '../prefabs/door';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Doors extends Phaser.Group {

  //initialization code in the constructor
  constructor(game, map) {
    super(game, game.world, 'Doors', false, true, Phaser.Physics.ARCADE);
    //super(game, parent);
    this.enableBody = true;
    var door_data = [
      {'tile': 402, 'sprite': 'door_2_1', 'open':'down', 'size': {'x':64, 'y':5}, 'hinge': 'right', 'pivot_x': 64, 'pivot_y': 0},
      {'tile': 404, 'sprite': 'door_2_1', 'open':'down', 'size': {'x':64, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0},
      {'tile': 401, 'sprite': 'door_2_1', 'open':'up', 'size': {'x':64, 'y':5}, 'hinge': 'right', 'pivot_x': 64, 'pivot_y': 0},
      {'tile': 403, 'sprite': 'door_2_1', 'open':'up', 'size': {'x':64, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0},

      {'tile': 398, 'sprite': 'door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0},
      {'tile': 400, 'sprite': 'door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0},
      {'tile': 397, 'sprite': 'door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0},
      {'tile': 399, 'sprite': 'door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0},

      {'tile': 405, 'sprite': 'door_1_2', 'open':'right', 'size': {'x':5, 'y':64}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0},
      {'tile': 407, 'sprite': 'door_1_2', 'open':'left', 'size': {'x':5, 'y':64}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0},
      {'tile': 406, 'sprite': 'door_1_2', 'open':'right', 'size': {'x':5, 'y':64}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y': 64},
      {'tile': 408, 'sprite': 'door_1_2', 'open':'left', 'size': {'x':5, 'y':64}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y': 64},

      {'tile': 409, 'sprite': 'door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0},
      {'tile': 411, 'sprite': 'door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0},
      {'tile': 410, 'sprite': 'door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y': 96},
      {'tile': 412, 'sprite': 'door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y': 96},

    ];
    for (let door of door_data){
      map.createFromObjects('Doors', door.tile, door.sprite, 0, true, false, this, Door);
      this.children.forEach(function (element, index, array) {
        element.body.immovable = true;
        if (!element.data.hasOwnProperty('open')) {
          element.data['open'] = door.open;
        }
        if (!element.data.hasOwnProperty('size')) {
          element.data['size'] = door.size;
        }
        if (!element.data.hasOwnProperty('hinge')) {
          element.data['hinge'] = door.hinge;
          element.pivot.x = door.pivot_x;
          element.x += door.pivot_x;
          element.pivot.y = door.pivot_y;
          element.y += door.pivot_y;
        }
      });
    }
    Rooms.set_doors(this);
  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {

  }

}

export default Doors;
