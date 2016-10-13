import GameAreas from '../prefabs/game_areas';
import FireDoor from '../prefabs/fire_door';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class FireDoors extends Phaser.Group {

    //initialization code in the constructor
    constructor(game, map) {
        super(game, game.world, 'FireDoors', false, true, Phaser.Physics.ARCADE);
        //super(game, parent);
        this.enableBody = true;
        var fire_door_data = [

            {'tile': 414, 'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0},
            {'tile': 416, 'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0},
            {'tile': 413, 'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0},
            {'tile': 415, 'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0},

            {'tile': 417, 'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0},
            {'tile': 419, 'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0},
            {'tile': 418, 'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y': 96},
            {'tile': 420, 'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y': 96},

        ];
        for (let fire_door of fire_door_data){
            map.createFromObjects('FireDoors', fire_door.tile, fire_door.sprite, 0, true, false, this, FireDoor);
            this.children.forEach(function (element, index, array) {
                element.body.immovable = true;
                if (!element.data.hasOwnProperty('open')) {
                    element.data['open'] = fire_door.open;
                }
                if (!element.data.hasOwnProperty('size')) {
                    element.data['size'] = fire_door.size;
                }
                if (!element.data.hasOwnProperty('hinge')) {
                    element.data['hinge'] = fire_door.hinge;
                    element.pivot.x = fire_door.pivot_x;
                    element.x += fire_door.pivot_x;
                    element.pivot.y = fire_door.pivot_y;
                    element.y += fire_door.pivot_y;
                }
            });
        }
        GameAreas.set_fire_doors(this);
    }

    //Setup code, method called after preload
    create() {

    }

    //Code ran on each frame of game
    update() {

    }

}

export default FireDoors;
