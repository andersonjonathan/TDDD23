/**
 * Created by jonathan on 2016-10-12.
 */
class GameArea{
    constructor(id, x0, y0, x1, y1, name) {
        this.id = id;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1;
        this.y1 = y1;
        this.name = name;
        this.fire_doors = [];
        this.locked = false;
    }
    get_enemies(all_enemies) {
        var tmp = [];
        var game_area = this;
        all_enemies.children.forEach(function (enemy, index, array) {
            var x = enemy.position.x/32;
            var y = enemy.position.y/32;
            if (game_area.x0 <= x && x <= game_area.x1 && game_area.y0 <= y && y <= game_area.y1 && enemy.data['life']>0){
                tmp.push(enemy);
            }
        });
        return tmp;
    };
    lock(){
        this.locked = true;
        this.fire_doors.forEach(function (fire_door, index, array) {
            fire_door.lock();
        });
    }
    unlock(){
        this.locked = false;
        this.fire_doors.forEach(function (fire_door, index, array) {
            fire_door.unlock();
        });
    }
    open(){
        this.fire_doors.forEach(function (fire_door, index, array) {
            fire_door.open();
        });
    }
    close(){
        this.fire_doors.forEach(function (fire_door, index, array) {
            fire_door.close();
        });
    }
}
export default GameArea;