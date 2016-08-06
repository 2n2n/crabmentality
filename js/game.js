(function(CM) {
	'use strict';
	var HITAREA = {
		width: 70,
		height: 50
	}

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
			// this.player.addChild();
			this.player.hitArea = new Phaser.Rectangle(this.player.x-(HITAREA.width/2), this.player.centerY-(HITAREA.height/2), HITAREA.width,HITAREA.height);
			this.camera.follow(this.player);

			this.dummy = this.game.add.sprite(300, 1168);
			this.dummy.hitArea = new Phaser.Rectangle(this.player.centerX-(HITAREA.width/2), this.player.centerY-(HITAREA.height/2), HITAREA.width,HITAREA.height);
			// enable physics
			this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
			this.game.physics.enable(this.dummy, Phaser.Physics.ARCADE);
			
			this.player.body.collideWorldBounds = true;
			this.player.body.bounce.y = 0.2;
			this.dummy.body.collideWorldBounds = true;
			this.dummy.body.bounce.y = 0.2;
			// console.log(this.player, this.player);

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
			console.log(this.player.width);
			this.dummy['dbug_color'] = 'rgba(255,0,0,0.5)';
		},
		update: function() {
			this.player.hitArea.x = (this.player.x + this.player.width/2);
			this.player.hitArea.y = this.player.centerY-(HITAREA.height/2);
			this.player.body.velocity.x = 0;

			if(Phaser.Rectangle.intersects(this.player.hitArea, this.dummy.hitArea) ) {
				this.dummy['dbug_color'] = 'rgba(255,225,0,0.5)';

			}
			else {
				this.dummy['dbug_color'] = 'rgba(255,0,0,0.5)';
			}
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
		  	this.jumptimer = 0;

		    if(this.jump.isDown && (this.player.body.onFloor() || this.player.body.touching.down) && this.game.time.now > this.jumptimer) {
		    	this.player.body.velocity.y = -450;
		    	this.jumptimer = this.game.time.now + 10;
		    }
		},
		render: function() {
			// this.game.debug.cameraInfo(this.game.camera, 32,32);
        	this.game.debug.body(this.player);
        	this.game.debug.text(this.jumptimer, 32,32);
        	this.game.debug.text(this.game.time.now, 32,50);
        	this.game.debug.geom(this.player.hitArea, 'rgba(255,0,0,0.5)');
        	this.game.debug.geom(this.dummy.hitArea, this.dummy['dbug_color']);
        	this.game.debug.text(this.player.hitArea, 32, 10);

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
