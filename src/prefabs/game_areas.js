/**
 * Created by jonathan on 2016-10-11.
 */
import GameArea from '../prefabs/game_area';
var game_areas = [
    new GameArea(0, 46, 233, 54, 239, "PG1"),
    new GameArea(1, 37, 233, 44, 239, "PG2"),
];

class GameAreas{
    constructor() {
    }

    static get game_areas(){
        return game_areas;
    }

    static set_fire_doors(fire_doors){
        this.game_areas.forEach(function (game_area, index, array) {
            fire_doors.children.forEach(function (element, index, array) {
                var x = element.position.x/32;
                var y = element.position.y/32;
                if (game_area.x0-2 <= x && x <= game_area.x1+2 && game_area.y0-2 <= y && y <= game_area.y1+2){
                    game_area.fire_doors.push(element);
                }
            });
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