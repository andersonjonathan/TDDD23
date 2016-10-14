import GameArea from '../prefabs/game_areas';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class FireDoor extends Phaser.Sprite {

    //initialization code in the constructor
    constructor(game, x, y, sprite) {
        super(game, x, y, sprite);
        // Add a open and close function to the fire doors

        this.anchor.setTo(0, 0);
        // Store which game_area it goes to.
        var x = this.position.x/32;
        var y = this.position.y/32;
        var potential_game_areas = [
            GameArea.xy_in_game_area(x, y),
        ];
        this.data.game_area = null;
        for (var i = 0; i < potential_game_areas.length; i++) {
            if (potential_game_areas[i] !== null){
                this.data.game_area = potential_game_areas[i];
                break;
            }
        }
        this.locked = true;
    }

    open() {
        if (this.locked){
            return false;
        }
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
        this.game.add.tween(this).to( { angle: angle }, 1000, Phaser.Easing.Linear.None, true);
        this.body.setSize(this.data.size.y, this.data.size.x, this.data.size.y*xsign, this.data.size.x*ysign);
        return true;
    }

    close(){
        this.game.add.tween(this).to({angle: 0}, 1000, Phaser.Easing.Linear.None, true);
        this.body.setSize(this.data.size.x, this.data.size.y, 0, 0);
    }

    //Code ran on each frame of game
    update() {

    }
    lock(){
        this.locked = true;
    }
    unlock(){
        this.locked = false;
    }
}

export default FireDoor;
