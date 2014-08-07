BlobApp.Goal = (function Goal(x_pos, y_pos, sizeX, sizeY, GOALID) {
	this.prototype = new BlobApp.DynamicEntity(sprite, x_pos, y_pos, sizeX, sizeY);

	var sprite, tilesetSheet;

	this.prototype.init =function(){
		var tileset = new Image();
		tileset.src = "res/img/goal.png"
		// callback for loading sprite after tileset is loaded
		tileset.onLoad = _initSprite(tileset, sizeX,sizeY);		
	},	
	

	_initSprite = function(tileset, w,h){
		var imageData = {
			images : [ tileset ],
			frames : {
				width : w,
				height : h,
				count: 1
			}
		}

		// create spritesheet for generic objects (ground e.g.)
		tilesetSheet = new createjs.SpriteSheet(imageData);

		sprite = new createjs.Sprite(tilesetSheet);
		/* koordinaten kommen aus dem levelloader */
		sprite.regX = imageData.frames.width/2;
		sprite.regY = imageData.frames.height/2;
		sprite.x = x_pos;
		sprite.y = y_pos;

	
		sprite.snapToPixel = true;
		sprite.mouseEnabled = false;
	},

	this.prototype.init();
	this.keyID = GOALID;
	this.sprite = sprite;
});