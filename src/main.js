 import Boot from './states/boot';
 import Game from './states/game';
 import Menu from './states/menu';
 import Preloader from './states/preloader';
 import HighScore from './states/high_score';
 import Help from './states/help';


const game = new Phaser.Game(800, 600, Phaser.AUTO, 'awesome-game');

 game.state.add('boot', new Boot());
 game.state.add('game', new Game());
 game.state.add('menu', new Menu());
 game.state.add('preloader', new Preloader());
 game.state.add('high_score', new HighScore());
 game.state.add('help', new Help());

game.state.start('boot');
