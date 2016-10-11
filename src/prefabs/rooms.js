/**
 * Created by jonathan on 2016-10-11.
 */
var rooms = [
    {id: 0, x0: 46, y0: 233, x1: 54, y1: 239, name: "PG1"},
    {id: 1, x0: 37, y0: 233, x1: 44, y1: 239, name: "PG2"},
    {id: 2, x0: 37, y0: 203, x1: 54, y1: 231, name: "Kök 12"},
    {id: 3, x0: 10, y0: 222, x1: 28, y1: 239, name: "P44"},
    {id: 4, x0: 68, y0: 222, x1: 96, y1: 239, name: "P42"},
    {id: 5, x0: 98, y0: 222, x1: 111, y1: 239, name: "P36"},
    {id: 6, x0: 113, y0: 222, x1: 126, y1: 239, name: "P34"},
    {id: 7, x0: 140, y0: 222, x1: 153, y1: 239, name: "P30"},
    {id: 8, x0: 155, y0: 222, x1: 168, y1: 239, name: "P26"},
    {id: 9, x0: 170, y0: 222, x1: 183, y1: 239, name: "P22"},
    {id: 10, x0: 185, y0: 222, x1: 198, y1: 239, name: "P18"},
    {id: 11, x0: 10, y0: 203, x1: 28, y1: 220, name: "R43"},
    {id: 12, x0: 68, y0: 203, x1: 96, y1: 220, name: "R41"},
    {id: 13, x0: 98, y0: 203, x1: 111, y1: 220, name: "R37"},
    {id: 14, x0: 113, y0: 203, x1: 126, y1: 220, name: "R35"},
    {id: 15, x0: 140, y0: 203, x1: 153, y1: 220, name: "Kök R"},
    {id: 16, x0: 155, y0: 203, x1: 168, y1: 220, name: "R27"},
    {id: 17, x0: 170, y0: 203, x1: 183, y1: 220, name: "R23"},
    {id: 18, x0: 185, y0: 203, x1: 198, y1: 220, name: "R19"},
    {id: 19, x0: 212, y0: 232, x1: 243, y1: 249, name: "C2"},
    {id: 20, x0: 220, y0: 229, x1: 235, y1: 254, name: "C2"},
    {id: 21, x0: 231, y0: 251, x1: 243, y1: 258, name: "C2"},
    {id: 22, x0: 209, y0: 241, x1: 212, y1: 248, name: "C2"},
    {id: 23, x0: 249, y0: 244, x1: 275, y1: 262, name: "C1"},
    {id: 24, x0: 253, y0: 232, x1: 274, y1: 243, name: "C1"},
    {id: 25, x0: 276, y0: 238, x1: 278, y1: 260, name: "C1"},
    {id: 26, x0: 278, y0: 243, x1: 282, y1: 258, name: "C1"},
    {id: 27, x0: 10, y0: 189, x1: 19, y1: 194, name: "RG1"},
    {id: 28, x0: 10, y0: 177, x1: 19, y1: 187, name: "RG2"},
    {id: 29, x0: 10, y0: 166, x1: 19, y1: 175, name: "RG3"},
    {id: 30, x0: 10, y0: 158, x1: 19, y1: 164, name: "SG1"},
    {id: 31, x0: 68, y0: 177, x1: 81, y1: 194, name: "R44"},
    {id: 32, x0: 83, y0: 177, x1: 96, y1: 194, name: "R42"},
    {id: 33, x0: 98, y0: 177, x1: 111, y1: 194, name: "R36"},
    {id: 34, x0: 113, y0: 177, x1: 126, y1: 194, name: "R34"},
    {id: 35, x0: 155, y0: 177, x1: 168, y1: 194, name: "R26"},
    {id: 36, x0: 170, y0: 177, x1: 183, y1: 194, name: "R22"},
    {id: 37, x0: 185, y0: 177, x1: 198, y1: 194, name: "R18"},
    {id: 38, x0: 212, y0: 177, x1: 240, y1: 194, name: "C3"},
    {id: 39, x0: 242, y0: 177, x1: 255, y1: 194, name: "R6"},
    {id: 40, x0: 257, y0: 177, x1: 270, y1: 194, name: "Börssalen"},
    {id: 41, x0: 68, y0: 158, x1: 96, y1: 175, name: "S41"},
    {id: 42, x0: 98, y0: 158, x1: 111, y1: 175, name: "S37"},
    {id: 43, x0: 113, y0: 158, x1: 126, y1: 175, name: "S35"},
    {id: 44, x0: 140, y0: 158, x1: 153, y1: 175, name: "S27"},
    {id: 45, x0: 155, y0: 158, x1: 168, y1: 175, name: "S25"},
    {id: 46, x0: 170, y0: 158, x1: 183, y1: 175, name: "S23"},
    {id: 47, x0: 185, y0: 158, x1: 198, y1: 175, name: "S19"},
    {id: 48, x0: 212, y0: 158, x1: 225, y1: 175, name: "S15"},
    {id: 49, x0: 227, y0: 158, x1: 240, y1: 175, name: "S11"},
    {id: 50, x0: 242, y0: 158, x1: 255, y1: 175, name: "S7"},
    {id: 51, x0: 257, y0: 158, x1: 270, y1: 175, name: "S3"},
    {id: 52, x0: 140, y0: 132, x1: 168, y1: 149, name: "S26"},
    {id: 53, x0: 170, y0: 132, x1: 183, y1: 149, name: "S22"},
    {id: 54, x0: 185, y0: 132, x1: 198, y1: 149, name: "S18"},
    {id: 55, x0: 212, y0: 132, x1: 225, y1: 149, name: "S14"},
    {id: 56, x0: 227, y0: 132, x1: 240, y1: 149, name: "S10"},
    {id: 57, x0: 242, y0: 132, x1: 255, y1: 149, name: "S6"},
    {id: 58, x0: 257, y0: 132, x1: 270, y1: 149, name: "S2"},
    {id: 59, x0: 140, y0: 113, x1: 153, y1: 130, name: "T31"},
    {id: 60, x0: 155, y0: 113, x1: 168, y1: 130, name: "T27"},
    {id: 61, x0: 170, y0: 113, x1: 183, y1: 130, name: "T23"},
    {id: 62, x0: 185, y0: 113, x1: 198, y1: 130, name: "T19"},
    {id: 63, x0: 212, y0: 113, x1: 225, y1: 130, name: "T15"},
    {id: 64, x0: 227, y0: 113, x1: 240, y1: 130, name: "T11"},
    {id: 65, x0: 289, y0: 132, x1: 312, y1: 149, name: "T1"},
    {id: 66, x0: 292, y0: 106, x1: 312, y1: 123, name: "T2"},
    {id: 67, x0: 289, y0: 75, x1: 320, y1: 97, name: "C4"},
    {id: 68, x0: 212, y0: 49, x1: 225, y1: 66, name: "U15"},
    {id: 69, x0: 227, y0: 49, x1: 240, y1: 66, name: "U11"},
    {id: 70, x0: 242, y0: 49, x1: 255, y1: 66, name: "U7"},
    {id: 71, x0: 257, y0: 49, x1: 270, y1: 66, name: "U3"},
    {id: 72, x0: 293, y0: 49, x1: 312, y1: 66, name: "U1"},
    {id: 73, x0: 284, y0: 59, x1: 291, y1: 66, name: "UG1"},
    {id: 74, x0: 284, y0: 49, x1: 291, y1: 57, name: "UG2"},
    {id: 75, x0: 212, y0: 23, x1: 225, y1: 40, name: "U14"},
    {id: 76, x0: 227, y0: 23, x1: 240, y1: 40, name: "U10"},
    {id: 77, x0: 242, y0: 23, x1: 255, y1: 40, name: "U6"},
    {id: 78, x0: 257, y0: 23, x1: 270, y1: 40, name: "U4"},
    {id: 79, x0: 293, y0: 23, x1: 312, y1: 40, name: "U2"},
    {id: 80, x0: 284, y0: 23, x1: 291, y1: 31, name: "Kök U"},
    {id: 81, x0: 207, y0: 68, x1: 270, y1: 104, name: "Innergård"},
];

rooms.forEach(function (room, index, array) {
    room.get_enemies = function (all_enemies) {
        var tmp = [];
        all_enemies.children.forEach(function (enemy, index, array) {
            var x = enemy.position.x/32;
            var y = enemy.position.y/32;
            if (room.x0 <= x && x <= room.x1 && room.y0 <= y && y <= room.y1 && enemy.data['life']>0){
                tmp.push(enemy);
            }
        });
        return tmp;
    };
    room.doors = [];
});

class Rooms{
    constructor() {
    }
    
    static get rooms(){
        return rooms;
    }
    
    static set_doors(doors){
        this.rooms.forEach(function (room, index, array) {
            doors.children.forEach(function (element, index, array) {
                var x = element.position.x/32;
                var y = element.position.y/32;
                if (room.x0-2 <= x && x <= room.x1+2 && room.y0-2 <= y && y <= room.y1+2){
                    room.doors.push(element);
                }
            });
        });
    }
    
    static xy_in_room(x, y){
        for (var i = 0; i < Rooms.rooms.length; i++) {
            if (Rooms.rooms[i].x0 <= x && x <= Rooms.rooms[i].x1 && Rooms.rooms[i].y0 <= y && y <= Rooms.rooms[i].y1){
                return Rooms.rooms[i];
            }
        }
        return null;
    }


}
export default Rooms;