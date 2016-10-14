import GameAreas from '../prefabs/game_areas';
import FireDoor from '../prefabs/fire_door';

var fire_doors_data = [
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':37, 'y':241, 'door': 0},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':37, 'y':244, 'door': 0}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':30, 'y':240, 'door': 1},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':33, 'y':240, 'door': 1}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':21, 'y':195, 'door': 2},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':24, 'y':195, 'door': 2}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':56, 'y':195, 'door': 3},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':59, 'y':195, 'door': 3}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':63, 'y':196, 'door': 4},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':63, 'y':199, 'door': 4}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':63, 'y':241, 'door': 5},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':63, 'y':244, 'door': 5}],
    [{'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':127, 'y':151, 'door': 6},
        {'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':127, 'y':154, 'door': 6}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':128, 'y':150, 'door': 7},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':131, 'y':150, 'door': 7}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':135, 'y':151, 'door': 8},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':135, 'y':154, 'door': 8}],
    [{'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':127, 'y':196, 'door': 9},
        {'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':127, 'y':199, 'door': 9}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':135, 'y':241, 'door': 10},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':135, 'y':244, 'door': 10}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':128, 'y':240, 'door': 11},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':131, 'y':240, 'door': 11}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':240, 'door': 12},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':240, 'door': 12}],
    [{'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':203, 'door': 13},
        {'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':203, 'door': 13}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':207, 'y':196, 'door': 14},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':207, 'y':199, 'door': 14}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':195, 'door': 15},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':195, 'door': 15}],
    [{'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':158, 'door': 16},
        {'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':158, 'door': 16}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':207, 'y':151, 'door': 17},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':207, 'y':154, 'door': 17}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':150, 'door': 18},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':150, 'door': 18}],
    [{'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':113, 'door': 19},
        {'sprite': 'fire_door_3_1', 'open':'down', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':113, 'door': 19}],
    [{'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':207, 'y':106, 'door': 20},
        {'sprite': 'fire_door_1_3', 'open':'right', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':207, 'y':109, 'door': 20}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':200, 'y':105, 'door': 21},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':203, 'y':105, 'door': 21}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':277, 'y':195, 'door': 22},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':280, 'y':195, 'door': 22}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':277, 'y':150, 'door': 23},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':280, 'y':150, 'door': 23}],
    [{'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':271, 'y':106, 'door': 24},
        {'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':271, 'y':109, 'door': 24}],
    [{'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'left', 'pivot_x': 0, 'pivot_y': 0, 'x':277, 'y':67, 'door': 25},
        {'sprite': 'fire_door_3_1', 'open':'up', 'size': {'x':96, 'y':5}, 'hinge': 'right', 'pivot_x': 96, 'pivot_y': 0, 'x':280, 'y':67, 'door': 25}],
    [{'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'up', 'pivot_x': 0, 'pivot_y': 0, 'x':276, 'y':42, 'door': 26},
        {'sprite': 'fire_door_1_3', 'open':'left', 'size': {'x':5, 'y':96}, 'hinge': 'down', 'pivot_x': 0, 'pivot_y':96, 'x':276, 'y':45, 'door': 26}]
];

class FireDoors extends Phaser.Group {

    //initialization code in the constructor
    constructor(game, map) {
        super(game, game.world, 'FireDoors', false, true, Phaser.Physics.ARCADE);
        //super(game, parent);
        this.enableBody = true;
        this.sets_of_fire_doors = [];
        for (let fire_door_set of fire_doors_data){
            this.sets_of_fire_doors.push([]);
            for (let fire_door of fire_door_set){
                this.sets_of_fire_doors[fire_door.door].push(this.add(new FireDoor(game, fire_door.x*32, fire_door.y*32, fire_door.sprite)))

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
        }
        GameAreas.set_fire_doors(this.sets_of_fire_doors);
    }

    //Setup code, method called after preload
    create() {

    }

    //Code ran on each frame of game
    update() {

    }

}

export default FireDoors;
