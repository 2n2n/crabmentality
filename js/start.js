(function(Phaser) {
	var game = new Phaser.Game(960,640, Phaser.Canvas, 'game');
	
	game.state.add('Game', CM.Game);

	game.state.start('Game');
})(Phaser)