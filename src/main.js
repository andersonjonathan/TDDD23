 import Boot from './states/boot';
 import Menu from './states/menu';
 import Preloader from './states/preloader';
 import Game from './states/game';


const game = new Phaser.Game(800, 600, Phaser.AUTO, 'awesome-game');

 game.state.add('boot', new Boot());
 game.state.add('menu', new Menu());
 game.state.add('preloader', new Preloader());
 game.state.add('game', new Game());

game.state.start('boot');
