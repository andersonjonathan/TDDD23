/**
 * Created by jonathan on 2016-10-12.
 */
class Room{
    constructor(id, x0, y0, x1, y1, name) {
        this.id = id;
        this.x0 = x0;
        this.y0 = y0;
        this.x1 = x1+1;
        this.y1 = y1+1;
        this.name = name;
        this.doors = [];
        this.locked = false;
    }
    get_enemies(all_enemies) {
        var tmp = [];
        var room = this;
        all_enemies.children.forEach(function (enemy, index, array) {
            var x = enemy.position.x/32;
            var y = enemy.position.y/32;
            if (room.x0 <= x && x <= room.x1 && room.y0 <= y && y <= room.y1 && enemy.data['life']>0){
                tmp.push(enemy);
            }
        });
        return tmp;
    };
    lock(){
        this.locked = true;
        this.doors.forEach(function (door, index, array) {
            door.lock();
        });
    }
    unlock(){
        this.locked = false;
        this.doors.forEach(function (door, index, array) {
            door.unlock();
        });
    }
    open(){
        this.doors.forEach(function (door, index, array) {
            door.open();
        });
    }
    close(){
        this.doors.forEach(function (door, index, array) {
            door.close();
        });
    }
}
export default Room;