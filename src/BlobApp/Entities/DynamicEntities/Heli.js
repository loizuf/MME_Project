BlobApp.Heli = (function Heli(x_pos, y_pos, sizeX, sizeY) {

	var that = this,

	sprite, 
	tilesetSheet, 
	tileset;

	this.prototype = new BlobApp.DynamicEntity(x_pos, y_pos, sizeX, sizeY);
	
	this.prototype.init = function() {
		tileset = new Image();
		tileset.src = "res/img/Heli.png";//mapData.tilesets[0].image;

		var height;		
		height = sizeY;

		// getting imagefile from first tileset
		_listeners();

		// callback for loading layers after tileset is loaded
		tileset.onLoad = _initSprite(tileset, sizeX,sizeY);		
	},

	_initSprite = function(tileset, width, height) {
		var imageData = {
			images : [ tileset ],
			frames : {
				width : width,
				height : height,
			},

			animations: {
				startAni: [0,19, "moveRight"],
				moveRight: [20, 39],
				moveLeft: [40, 59]
			}
		}

		// create spritesheet for generic objects (ground e.g.)
		tilesetSheet = new createjs.SpriteSheet(imageData);

		sprite = new createjs.Sprite(tilesetSheet);
		sprite.name = "heli";

		/* koordinaten kommen aus dem levelloader */
		sprite.regX = width / 2;
		sprite.regY = height / 2;

		sprite.x = x_pos;
		sprite.y = y_pos;

		/* setzen auf höhe/2, breite /2 */
		sprite.regX = imageData.frames.width/2;
		sprite.regY = imageData.frames.height/2;

		sprite.snapToPixel = true;
		sprite.mouseEnabled = false;
		sprite.gotoAndPlay("startAni");
	},


	_listeners = function(){
		$('body').on('heliAnimationChanged', _animate);
	},

	_animate = function(event, data){	
		switch(data.animationKey){
			case AnimationKeys.MOVERIGHT:
				sprite.gotoAndPlay("moveRight");
			break;
			
			case AnimationKeys.MOVELEFT:
				sprite.gotoAndPlay("moveLeft");
			break;
		}
	};

	this.prototype.init();
	this.sprite = sprite;
});