/**
 * Created by jonathan on 2016-10-11.
 */
import GameArea from '../prefabs/game_area';
var game_areas = [
    new GameArea(0, 9, 221, 36, 247, "Tutorial", [0, 1]),
    new GameArea(1, 9, 188, 67, 247, "Area 2", [2, 3]),
    new GameArea(2, 9, 150, 127, 176, "Area 3", [4, 5]),
    new GameArea(3, 67, 176, 127, 247, "Area 4", [6, 9, 10, 11]),
    new GameArea(4, 127, 176, 199, 247, "Area 5", [7, 8, 15, 16, 18, 19]),
    new GameArea(5, 127, 105, 199, 176, "Area 6", [21]),
    new GameArea(6, 199, 22, 271, 67, "Area 7", [26]),
    new GameArea(7, 271, 22, 313, 67, "Area 8", [25]),
    new GameArea(8, 276, 67, 321, 150, "Area 9", [17, 20, 24, 23]),
    new GameArea(9, 199, 105, 276, 176, "Area 10", [12, 13, 14, 22]),
    new GameArea(10, 199, 176, 302, 262, "Final", [])
];

class GameAreas{
    constructor() {
    }

    static get game_areas(){
        return game_areas;
    }

    static set_fire_doors(fire_doors){

        this.game_areas.forEach(function (game_area, index, array) {
            for (let fire_door_index of game_area.fire_door_indexes){
                game_area.fire_doors.push(fire_doors[fire_door_index][0]);
                game_area.fire_doors.push(fire_doors[fire_door_index][1]);
            }
        });
    }

    static xy_in_game_area(x, y){
        for (var i = 0; i < GameAreas.game_areas.length; i++) {
            if (GameAreas.game_areas[i].x0 <= x && x <= GameAreas.game_areas[i].x1 && GameAreas.game_areas[i].y0 <= y && y <= GameAreas.game_areas[i].y1){
                return GameAreas.game_areas[i];
            }
        }
        return null;
    }
}
export default GameAreas;