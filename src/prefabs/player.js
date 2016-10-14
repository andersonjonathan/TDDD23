import Rooms from '../prefabs/rooms';
import GameAreas from '../prefabs/game_areas';
//Documentation for Phaser's (2.5.0) states:: phaser.io/docs/2.5.0/Phaser.State.html
class Player extends Phaser.Sprite {

  //initialization code in the constructor
  constructor(game, x, y, input) {
    super(game, x, y, 'student');

    //  We need to enable physics on the player
    game.physics.arcade.enable(this);
    this.input = input;

    this.data['life'] = 3;
    this.anchor.setTo(0.5, 0.5);
    this.halo = game.add.sprite(0, 0, 'invisibleBlock'); //invisibleBlock is a 1x1 px transparent png
    this.halo.anchor.setTo(0.5, 0.5);
    this.addChild(this.halo);
    game.physics.enable(this.halo, Phaser.Physics.ARCADE);
    this.halo.body.setSize(this.width +64, this.height +64, -52, -52);

    this.body.collideWorldBounds = true;

    // animations
    this.animations.add('left', [9, 10, 6], 10, true);
    this.animations.add('right', [11, 7, 8], 10, true);
    this.animations.add('up', [5, 0, 1], 10, true);
    this.animations.add('down', [2, 3, 4], 10, true);
    this.animations.add('leftup', [18, 21, 22], 10, true);
    this.animations.add('rightup', [12, 13, 17], 10, true);
    this.animations.add('leftdown', [14, 15, 16], 10, true);
    this.animations.add('rightdown', [19, 20, 23], 10, true);

    this.data.original_speed = 200;
    this.data.speed = 200;
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
    if (this.input.keyboard.isDown(Phaser.Keyboard.R))
    {
      this.data.speed = this.data.original_speed * 3
    } else {
      this.data.speed = this.data.original_speed
    }
    this.move();
    this.in_room();
    this.in_game_area();
  }


  move(){
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    var diagonal_penalty = 1;
    if ((this.cursors.up.isDown || this.cursors.down.isDown) && (this.cursors.up.isDown || this.cursors.down.isDown)){
      diagonal_penalty = 1/Math.sqrt(2);
    }
    var speed = this.data.speed * diagonal_penalty;

    if (this.cursors.up.isDown && this.cursors.down.isDown){

      this.animations.stop();

      this.frame = 4;
    } else if (this.cursors.up.isDown) {
      //  Move up
      this.body.velocity.y = -speed;
    } else if (this.cursors.down.isDown) {
      //  Move up
      this.body.velocity.y = speed;
    }

    if (this.cursors.left.isDown && this.cursors.right.isDown){

      this.animations.stop();

      this.frame = 4;
    } else if (this.cursors.left.isDown) {
      //  Move to the left

      this.body.velocity.x = -speed;

    } else if (this.cursors.right.isDown) {
      //  Move to the right

      this.body.velocity.x = speed;

    }

    if (this.game.time.time > this.nextUpdate) {
      if (this.cursors.up.isDown && this.cursors.right.isDown) {
        this.animations.play('rightup');
        this.data.facing = "ne";
      } else if (this.cursors.up.isDown && this.cursors.left.isDown) {
        this.animations.play('leftup');
        this.data.facing = "nw";
      } else if (this.cursors.up.isDown) {
        this.animations.play('up');
        this.data.facing = "n";
      } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
        this.animations.play('rightdown');
        this.data.facing = "se";
      } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
        this.animations.play('leftdown');
        this.data.facing = "sw";
      } else if (this.cursors.down.isDown) {
        this.animations.play('down');
        this.data.facing = "s";
      } else if (this.cursors.right.isDown) {
        this.animations.play('right');
        this.data.facing = "e";
      } else if (this.cursors.left.isDown) {
        this.animations.play('left');
        this.data.facing = "w";
      }
      this.nextUpdate = this.game.time.time + this.updateRate;
    }
    if (!(this.cursors.right.isDown || this.cursors.left.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
      //  Stand still

      this.animations.stop();
      this.frame = this.data.facing_mapping[this.data.facing];
    }
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
