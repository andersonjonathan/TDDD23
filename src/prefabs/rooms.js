/**
 * Created by jonathan on 2016-10-11.
 */
import Room from '../prefabs/room';
var rooms = [
    new Room(0, 46, 233, 54, 239, "PG1"),
    new Room(1, 37, 233, 44, 239, "PG2"),
    new Room(2, 37, 203, 54, 231, "Kök 12"),
    new Room(3, 10, 222, 28, 239, "P44"),
    new Room(4, 68, 222, 96, 239, "P42"),
    new Room(5, 98, 222, 111, 239, "P36"),
    new Room(6, 113, 222, 126, 239, "P34"),
    new Room(7, 140, 222, 153, 239, "P30"),
    new Room(8, 155, 222, 168, 239, "P26"),
    new Room(9, 170, 222, 183, 239, "P22"),
    new Room(10, 185, 222, 198, 239, "P18"),
    new Room(11, 10, 203, 28, 220, "R43"),
    new Room(12, 68, 203, 96, 220, "R41"),
    new Room(13, 98, 203, 111, 220, "R37"),
    new Room(14, 113, 203, 126, 220, "R35"),
    new Room(15, 140, 203, 153, 220, "Kök R"),
    new Room(16, 155, 203, 168, 220, "R27"),
    new Room(17, 170, 203, 183, 220, "R23"),
    new Room(18, 185, 203, 198, 220, "R19"),
    new Room(19, 207, 225, 244, 259, "C2"),
    new Room(20, 0, 0, 0, 0, ""),
    new Room(21, 0, 0, 0, 0, ""),
    new Room(22, 0, 0, 0, 0, ""),
    new Room(23, 251, 228, 286, 262, "C1"),
    new Room(24, 0, 0, 0, 0, ""),
    new Room(25, 0, 0, 0, 0, ""),
    new Room(26, 0, 0, 0, 0, ""),
    new Room(27, 10, 189, 19, 194, "RG1"),
    new Room(28, 10, 177, 19, 187, "RG2"),
    new Room(29, 10, 166, 19, 175, "RG3"),
    new Room(30, 10, 158, 19, 164, "SG1"),
    new Room(31, 68, 177, 81, 194, "R44"),
    new Room(32, 83, 177, 96, 194, "R42"),
    new Room(33, 98, 177, 111, 194, "R36"),
    new Room(34, 113, 177, 126, 194, "R34"),
    new Room(35, 155, 177, 168, 194, "R26"),
    new Room(36, 170, 177, 183, 194, "R22"),
    new Room(37, 185, 177, 198, 194, "R18"),
    new Room(38, 212, 177, 240, 194, "C3"),
    new Room(39, 242, 177, 255, 194, "R6"),
    new Room(40, 257, 177, 270, 194, "Börssalen"),
    new Room(41, 68, 158, 96, 175, "S41"),
    new Room(42, 98, 158, 111, 175, "S37"),
    new Room(43, 113, 158, 126, 175, "S35"),
    new Room(44, 140, 158, 153, 175, "S27"),
    new Room(45, 155, 158, 168, 175, "S25"),
    new Room(46, 170, 158, 183, 175, "S23"),
    new Room(47, 185, 158, 198, 175, "S19"),
    new Room(48, 212, 158, 225, 175, "S15"),
    new Room(49, 227, 158, 240, 175, "S11"),
    new Room(50, 242, 158, 255, 175, "S7"),
    new Room(51, 257, 158, 270, 175, "S3"),
    new Room(52, 140, 132, 168, 149, "S26"),
    new Room(53, 170, 132, 183, 149, "S22"),
    new Room(54, 185, 132, 198, 149, "S18"),
    new Room(55, 212, 132, 225, 149, "S14"),
    new Room(56, 227, 132, 240, 149, "S10"),
    new Room(57, 242, 132, 255, 149, "S6"),
    new Room(58, 257, 132, 270, 149, "S2"),
    new Room(59, 140, 113, 153, 130, "T31"),
    new Room(60, 155, 113, 168, 130, "T27"),
    new Room(61, 170, 113, 183, 130, "T23"),
    new Room(62, 185, 113, 198, 130, "T19"),
    new Room(63, 212, 113, 225, 130, "T15"),
    new Room(64, 227, 113, 240, 130, "T11"),
    new Room(65, 289, 132, 312, 149, "T1"),
    new Room(66, 292, 106, 312, 123, "T2"),
    new Room(67, 289, 75, 320, 97, "C4"),
    new Room(68, 212, 49, 225, 66, "U15"),
    new Room(69, 227, 49, 240, 66, "U11"),
    new Room(70, 242, 49, 255, 66, "U7"),
    new Room(71, 257, 49, 270, 66, "U3"),
    new Room(72, 293, 49, 312, 66, "U1"),
    new Room(73, 284, 59, 291, 66, "UG1"),
    new Room(74, 284, 49, 291, 57, "UG2"),
    new Room(75, 212, 23, 225, 40, "U14"),
    new Room(76, 227, 23, 240, 40, "U10"),
    new Room(77, 242, 23, 255, 40, "U6"),
    new Room(78, 257, 23, 270, 40, "U4"),
    new Room(79, 293, 23, 312, 40, "U2"),
    new Room(80, 284, 23, 291, 31, "Kök U"),
    new Room(81, 207, 68, 270, 104, "Innergård"),
    new Room(82, 62, 234, 67, 240, "Toalett 1"),
    new Room(83, 62, 217, 67, 221, "Toalett 2"),
    new Room(84, 62, 211, 67, 217, "Toalett 3"),
    new Room(85, 62, 202, 67, 207, "Toalett 4"),
    new Room(86, 29, 189, 32, 193, "Toalett 5"),
    new Room(87, 32, 189, 36, 193, "Toalett 6"),
    new Room(88, 62, 189, 67, 195, "Toalett 7"),
    new Room(89, 62, 157, 67, 163, "Toalett 8"),
    new Room(90, 134, 234, 139, 240, "Toalett 9"),
    new Room(91, 134, 212, 139, 221, "Toalett 10"),
    new Room(92, 134, 202, 139, 208, "Toalett 11"),
    new Room(93, 134, 165, 139, 169, "Toalett 12"),
    new Room(94, 134, 157, 139, 161, "Toalett 13"),
    new Room(95, 134, 142, 139, 150, "Toalett 14"),
    new Room(96, 134, 112, 139, 121, "Toalett 15"),
    new Room(97,  206, 145, 211, 150, "Toalett 16"),
    new Room(98,  206, 134, 211, 141, "Toalett 17"),
    new Room(99,  206, 112, 211, 118, "Toalett 18"),
    new Room(100, 206, 48, 211, 54, "Toalett 19"),
    new Room(101, 206, 36, 211, 41, "Toalett 20"),
    new Room(102, 271, 34, 276, 41, "Toalett 21"),
    new Room(103, 271, 48, 276, 53, "Toalett 22"),
    new Room(104, 271, 131, 276, 140, "Toalett 23"),
    new Room(105, 271, 144, 276, 150, "Toalett 24"),
    new Room(106, 271, 157, 276, 164, "Toalett 25"),
    new Room(107, 271, 168, 276, 176, "Toalett 26"),
    new Room(108, 271, 176, 276, 185, "Toalett 27"),
    new Room(109, 271, 189, 276, 195, "Toalett 28"),
];

class Rooms{
    constructor() {
    }
    
    static get rooms(){
        return rooms;
    }
    
    static set_doors(doors){
        doors.children.forEach(function (door, index, array) {
            if (door.data.room !== null){
                Rooms.rooms[door.data.room].doors.push(door);
            }
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