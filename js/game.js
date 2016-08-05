(function(CM) {
	'use strict';

	CM.Game = function() {
		this.player = {};
	};
	
	CM.Game.prototype = {
		preload: function() {
			// this.load.image('camerman', 'assets/images/down_orange_big.png');

		},
		create: function() {
			
			this.game.physics.startSystem(Phaser.Physics.Arcade);
			this.game.physics.arcade.gravity.y = 300;

			this.world.setBounds(0, 0, 2000, 2000);

			this.platforms = this.game.add.group();
			this.platforms.enableBody = true;
			this.platforms.enableBodyDebug = true;

			this.player = this.game.add.sprite(100,1000, 'camerman');
			this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.camera.follow(this.player);
			this.player.body.collideWorldBounds = true;
			this.player.body.bounce.y = 0.2;

			// this.game.camera.setPosition(0,2000);
			this.player.camera = this.game.input.keyboard.createCursorKeys();

			// make floor 1
			var floor1 = this.game.make.graphics(0,0);
			floor1.beginFill(0xa9a904);
			floor1.lineStyle(1, 0xa9a904, 1);
			floor1.moveTo(300, 2000);
		    floor1.lineTo(300, 1800);
		    floor1.lineTo(1700, 1800);
		    floor1.lineTo(1700, 2000);
		    floor1.endFill();

			this.platforms.add(this.game.make.sprite(0,0, floor1.generateTexture()));
			floor1.destroy();

			var floor2 = this.game.make.graphics(0,0);
			floor2.beginFill(0xa9a904);
			floor2.lineStyle(4, 0xa9a904, 1);
			floor2.moveTo(1500, 1600);
			floor2.lineTo(1500, 1550);
			floor2.lineTo(1200, 1550);
			floor2.lineTo(1200, 1600);
		    floor2.endFill();

			this.platforms.add(this.game.make.sprite(0,0, floor2.generateTexture()));
			this.platforms.add(this.game.make.sprite(0,0, floor2.generateTexture()));
			floor2.destroy();

			var floor3 = this.game.make.graphics(0,0);
			floor3.beginFill(0xa9a904);
			floor3.lineStyle(4, 0xa9a904, 1);
			floor3.moveTo(2000, 1350);
			floor3.lineTo(2000, 1300);
			floor3.lineTo(1400, 1300);
			floor3.lineTo(1400, 1350);
		    floor3.endFill();

			this.platforms.add(this.game.make.sprite(0,0, floor3.generateTexture()));
			this.platforms.add(this.game.make.sprite(0,0, floor3.generateTexture()));
			floor3.destroy();
			
			var floor4 = this.game.make.graphics(0,0);
			floor4.beginFill(0xa9a904);
			floor4.lineStyle(1, 0xa9a904, 1);
			floor4.moveTo(300, 1100);
		    floor4.lineTo(300, 1050);
		    floor4.lineTo(1700, 1050);
		    floor4.lineTo(1700, 1100);
		    floor4.endFill();

			this.platforms.add(this.game.make.sprite(0,0, floor4.generateTexture()));
			floor4.destroy();
			// set poisitions
			var pos = [
				[300, 1800],
				[500, 1500],
				[1192, 1500],
				[0, 1200],
				[1392, 1200],
				[300, 900]
			];

			var idx = 0;
			// do something with the bodies
			this.platforms.forEach(function(platform) {
				platform.position = new Phaser.Point(pos[idx][0], pos[idx][1]);
				idx++;
				platform.body.allowGravity = false;
				platform.body.immovable = true;  
				platform.body.collideWorldBounds = true; 
			}, this);

			this.controls = this.game.input.keyboard.createCursorKeys();
			this.jump = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			this.jumptimer = 0;
		},
		update: function() {
			this.player.body.velocity.x = 0;
			this.game.physics.arcade.collide(this.player, this.platforms, function(player, platform) {
				platform.body.checkCollision.down = false;
				platform.body.checkCollision.left = false;
				platform.body.checkCollision.right = false;
				return true;
			});

			if (this.controls.left.isDown) {
		        this.player.body.velocity.x = -300;
		    }

		    else if (this.controls.right.isDown) {
		        this.player.body.velocity.x = 300;
		    }
		  
		    if(this.jump.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && this.game.time.now > this.jumptimer) {
		    	this.player.body.velocity.y = -450;
		    	this.jumptimer = this.game.time.now + 750;
		    }
		},
		render: function() {
			// this.game.debug.cameraInfo(this.game.camera, 32,32);
        	this.game.debug.body(this.player) ;
			this.game.debug.bodyInfo(this.player, 32, 32);
		}
	}

	// function processHandler (player, platform) {
	// 	return true;
	// }

	// function collisionHandler(player, platform) {
	// 	console.log(player, platform);
	// }

})(CM);
