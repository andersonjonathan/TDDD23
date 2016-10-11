import Rooms from '../prefabs/rooms';
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
      map.createFromObjects('Doors', door.tile, door.sprite, 0, true, false, this);
      this.children.forEach(function (element, index, array) {
        element.body.immovable = true;
        element.anchor.setTo(0, 0);
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
    
    this.children.forEach(function (element, index, array) {
      // Add a open and close function to the doors
      element.open = function () {
          var angle = 90;
          var xsign = 0;
          var ysign = 0;

          if ((this.data['hinge'] == "right" && this.data['open'] == "down")||(this.data['hinge'] == "left" && this.data['open'] == "up")){
            angle = angle * -1;
            ysign = -1
          }

          if ((this.data['hinge'] == "up" && this.data['open'] == "right")||(this.data['hinge'] == "down" && this.data['open'] == "left")){
            angle = angle * -1;
          } else if ((this.data['hinge'] == "up" && this.data['open'] == "left")||(this.data['hinge'] == "down" && this.data['open'] == "right")){
            xsign = -1;
          }
          game.add.tween(this).to( { angle: angle }, 1000, Phaser.Easing.Linear.None, true);
          this.body.setSize(this.data.size.y, this.data.size.x, this.data.size.y*xsign, this.data.size.x*ysign);

      };

      element.close = function (){
        game.add.tween(this).to({angle: 0}, 1000, Phaser.Easing.Linear.None, true);
        this.body.setSize(this.data.size.x, this.data.size.y, 0, 0);
      };
      
      // Store which room it goes to.
      var x = element.position.x/32;
      var y = element.position.y/32;
      var potential_rooms = [
        Rooms.xy_in_room(x, y),
        Rooms.xy_in_room(x+2, y),
        Rooms.xy_in_room(x-2, y),
        Rooms.xy_in_room(x, y+2),
        Rooms.xy_in_room(x, y-2)
      ];
      element.data.room = null;
      for (var i = 0; i < potential_rooms.length; i++) {
        if (potential_rooms[i] !== null){
          element.data.room = potential_rooms[i];
          break;
        }
      }
    });
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
