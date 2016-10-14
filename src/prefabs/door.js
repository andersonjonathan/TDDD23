import Rooms from '../prefabs/rooms';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Door extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, sprite) {
    super(game, x, y, sprite);
    // Add a open and close function to the doors
    
    this.anchor.setTo(0, 0);
    // Store which room it goes to.
    var tile_x = this.position.x/32;
    var tile_y = this.position.y/32;
    var potential_rooms = [
      Rooms.xy_in_room(tile_x, tile_y) 
    ];
    this.data.room = null;
    for (var i = 0; i < potential_rooms.length; i++) {
      if (potential_rooms[i] !== null){
        this.data.room = potential_rooms[i];
        break;
      }
    }
    this.locked = false;
    this.opening = false;
    this.closing = false;
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
    if (!this.opening){
      this.opening = true;
      var tween = this.game.add.tween(this).to( { angle: angle }, 1000, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(function () {
        this.opening = false;
      }, this);
      this.body.setSize(this.data.size.y, this.data.size.x, this.data.size.y*xsign, this.data.size.x*ysign);
    }

    return true;
  }

  close(){
    if (!this.closing) {
      this.closing = true;
      var tween = this.game.add.tween(this).to({angle: 0}, 500, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(function () {
        this.closing = false;
      }, this);
      this.body.setSize(this.data.size.x, this.data.size.y, 0, 0);
    }
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

export default Door;
