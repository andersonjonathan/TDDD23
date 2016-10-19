import Rooms from '../prefabs/rooms';
import GameAreas from '../prefabs/game_areas';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, input) {
    super(game, x, y, 'student2');

    //  We need to enable physics on the player
    game.physics.arcade.enable(this);
    this.input = input;

    this.data['life'] = 3;
    this.data['invincible'] = false;
    this.data['immovable'] = false;
    this.anchor.setTo(0.5, 0.5);
    this.halo = game.add.sprite(0, 0, 'invisibleBlock'); //invisibleBlock is a 1x1 px transparent png
    this.halo.anchor.setTo(0.5, 0.5);
    this.addChild(this.halo);
    game.physics.enable(this.halo, Phaser.Physics.ARCADE);
    this.halo.body.setSize(this.width +64, this.height +64, -52, -52);

    this.body.collideWorldBounds = true;

    // animations
    this.animations.add('w', [9, 10, 6], 10, true);
    this.animations.add('e', [11, 7, 8], 10, true);
    this.animations.add('n', [5, 0, 1], 10, true);
    this.animations.add('s', [2, 3, 4], 10, true);
    this.animations.add('nw', [18, 21, 22], 10, true);
    this.animations.add('ne', [12, 13, 17], 10, true);
    this.animations.add('sw', [14, 15, 16], 10, true);
    this.animations.add('se', [19, 20, 23], 10, true);
    this.animations.add('flashing_w', [9, 24, 10, 24, 6, 24], 10, true);
    this.animations.add('flashing_e', [11, 24, 7, 24, 8, 24], 10, true);
    this.animations.add('flashing_n', [5, 24, 0, 24, 1, 24], 10, true);
    this.animations.add('flashing_s', [2, 24, 3, 24, 4, 24], 10, true);
    this.animations.add('flashing_nw', [18, 24, 21, 24, 22, 24], 10, true);
    this.animations.add('flashing_ne', [12, 24, 13, 24, 17, 24], 10, true);
    this.animations.add('flashing_sw', [14, 24, 15, 24, 16, 24], 10, true);
    this.animations.add('flashing_se', [19, 24, 20, 24, 23, 24], 10, true);
    this.animations.add('flashing_still_w', [6, 24], 10, true);
    this.animations.add('flashing_still_e', [11, 24], 10, true);
    this.animations.add('flashing_still_n', [5, 24], 10, true);
    this.animations.add('flashing_still_s', [2, 24], 10, true);
    this.animations.add('flashing_still_nw', [18, 24], 10, true);
    this.animations.add('flashing_still_ne', [17, 24], 10, true);
    this.animations.add('flashing_still_sw', [14, 24], 10, true);
    this.animations.add('flashing_still_se', [23, 24], 10, true);

    this.data.original_speed = 320;
    this.data.super_speed = 320;
    this.data.speed = 320;
    this.data.facing = "n";
    this.data.facing_mapping = {
      "e": 11,
      "se": 23,
      "s": 2,
      "sw": 14,
      "w": 6,
      "nw": 18,
      "n": 5,
      "ne": 17
    };
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.nextUpdate = 0;
    this.updateRate = 20;
    this.data.last_room = null;
    this.data.last_area = null;
    
  }

  get_direction(){
    var direction = {
      "e": 0,
      "se": 45,
      "s": 90,
      "sw": 135,
      "w": 180,
      "nw": 225,
      "n": 270,
      "ne": 315
    };
    return direction[this.data.facing]
  }
  //Load operations (uses Loader), method called first
  preload() {


  }

  //Setup code, method called after preload
  create() {

  }

  //Code ran on each frame of game
  update() {
   if (this.input.keyboard.isDown(Phaser.Keyboard.W))
    {
      this.data.speed = this.data.super_speed;
    } else {
      this.data.speed = this.data.original_speed;
    }
    this.move();
    this.in_room();
    this.in_game_area();
  }
stop_animation(){
  this.animations.stop();
  this.frame = 4;
}

  move(){
    if (this.data['immovable']){
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      return;
    }
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    var diagonal_penalty = 1;
    if ((this.cursors.up.isDown || this.cursors.down.isDown) && (this.cursors.up.isDown || this.cursors.down.isDown)){
      diagonal_penalty = 1/Math.sqrt(2);
    }
    var speed = this.data.speed * diagonal_penalty;

    if (this.cursors.up.isDown && this.cursors.down.isDown){
      this.stop_animation();
    } else if (this.cursors.up.isDown) {
      //  Move up
      this.body.velocity.y = -speed;
    } else if (this.cursors.down.isDown) {
      //  Move up
      this.body.velocity.y = speed;
    }

    if (this.cursors.left.isDown && this.cursors.right.isDown){
      this.stop_animation();
    } else if (this.cursors.left.isDown) {
      //  Move to the left

      this.body.velocity.x = -speed;

    } else if (this.cursors.right.isDown) {
      //  Move to the right

      this.body.velocity.x = speed;

    }

    if (this.game.time.time > this.nextUpdate) {
      var animation_prefix = '';
      if (this.data['invincible'] == true) {
        animation_prefix = 'flashing_';
      }
      if (this.cursors.up.isDown && this.cursors.right.isDown){
        this.data.facing = "ne";
      } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
        this.data.facing = "nw";
      } else if (this.cursors.up.isDown) {
        this.data.facing = "n";
      } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
        this.data.facing = "se";
      } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
        this.data.facing = "sw";
      } else if (this.cursors.down.isDown) {
        this.data.facing = "s";
      } else if (this.cursors.right.isDown) {
        this.data.facing = "e";
      } else if (this.cursors.left.isDown) {
        this.data.facing = "w";
      }

      this.nextUpdate = this.game.time.time + this.updateRate;
    }
    if (!(this.cursors.right.isDown || this.cursors.left.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
      //  Stand still
      if (this.data['invincible'] == true) {
        animation_prefix += 'still_';
      } else {
        this.animations.stop();
        this.frame = this.data.facing_mapping[this.data.facing];
      }
    }
    this.animations.play(animation_prefix + this.data.facing);
  }

  in_room(){
    var x = Math.round(this.position.x / 32);
    var y = Math.round(this.position.y / 32);
    if (this.data.last_room == null){
      this.data.last_room = Rooms.xy_in_room(x, y)
    } else {
      if (!(this.data.last_room.x0 <= x && x <= this.data.last_room.x1 && this.data.last_room.y0 <= y && y <= this.data.last_room.y1)){
        this.data.last_room = null;
      }
    }
  }
  in_game_area(){
    var x = Math.round(this.position.x / 32);
    var y = Math.round(this.position.y / 32);
    if (this.data.last_area == null){
      this.data.last_area = GameAreas.xy_in_game_area(x, y);
    } else {
      if (!(this.data.last_area.x0 <= x && x <= this.data.last_area.x1 && this.data.last_area.y0 <= y && y <= this.data.last_area.y1)){
        this.data.last_area = null;
      }
    }
  }
  moveThroughDoor(door){
    this.data.immovable = true;
    var in_door_frame = new Phaser.Point();
    door.position.clone(in_door_frame);
    if(door.data.hinge == "right"){
      in_door_frame.subtract(door.data['size'].x / 2, 0);
    } else {
      in_door_frame.add(door.data['size'].x / 2, 0);
    }
    if(door.data.hinge == "down"){
      in_door_frame.subtract(0, door.data['size'].y / 2);
    } else {
      in_door_frame.add(0, door.data['size'].y / 2);
    }

    var in_room = new Phaser.Point();
    in_door_frame.clone(in_room);
    if (door.data.open == "down") {
      in_room.add(0, -80);
      this.animations.play('n');
      this.data.facing = 'n';
    } else if (door.data.open == "up") {
      in_room.add(0, 80);
      this.animations.play('s');
      this.data.facing = 's';
    } else if (door.data.open == "right") {
      this.animations.play('w');
      this.data.facing = 'w';
      in_room.add(-80, 0);
    } else if (door.data.open == "left") {
      this.animations.play('e');
      this.data.facing = 'e';
      in_room.add(80, 0);
    }
    var tween = this.game.add.tween(this).to(in_door_frame, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function () {
      var tween2 = this.game.add.tween(this).to(in_room, 0, Phaser.Easing.Linear.None, true);
      tween2.onComplete.add(function () {
        this.data.immovable = false;
      }, this);
    }, this);
  }
  
  //Called when game is paused
  paused() {

  }

  //You're able to do any final post-processing style effects here.
  render() {

  }

  //Called when switching to a new state
  shutdown() {

  }

}

export default Player;
