 import Boot from './states/boot';
 import Menu from './states/menu';
 import Preloader from './states/preloader';


const game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'Awesome-game-game');

 game.state.add('boot', new Boot());
 game.state.add('menu', new Menu());
 game.state.add('preloader', new Preloader());

game.state.start('boot');
