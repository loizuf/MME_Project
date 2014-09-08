BlobApp.HintBubble = (function HintBubble(x_pos, y_pos, sizeX, sizeY, additionalInfo) {
	this.prototype = new BlobApp.Entity(x_pos, y_pos, sizeX, sizeY);
	var thisVar = this,
		sprite,
		tilesetSheet,
		tileset;
	this.hintID = additionalInfo.id; // contains "bubbleGreen" or "bubbleRed"
	this.bubbleType = additionalInfo.bubbleType; // contains "down" (blinking down key) or "redBlob" or "greenBlob"

	this.prototype.init = function() {
		var tileset = new Image();
		tileset.src = "res/img/sign.png";

		_listeners();

		// callback for loading sprite after tileset is loaded
		tileset.onLoad = thisVar._initSprite(tileset, sizeX, sizeY);		
		thisVar._listeners();
	},	

	this._listeners = function() {
		$('body').on("animateHintBubble", thisVar._animate);		
		$('body').on("startSlingshot", thisVar._removeBubbles);
		$('body').on("startTele", thisVar._removeBubbles);
	},

	this._removeBubbles = function() {
		$('body').trigger("juiceRequested", {removeByName : ["bubbleredBlob"]});
		$('body').trigger("juiceRequested", {removeByName : ["bubblegreenBlob"]});
	},

	this._initSprite = function(tileset, width, height) {
		var imageData = {
			images : [ tileset ],
			frames : {
				width : width,
				height : height,
			},

			animations : {
				blinkController: [0, 1, "blinkController", 0.035],
				blinkPlayer1: [4, 5, "blinkPlayer1", 0.035],
				blinkPlayer2: [2, 3, "blinkPlayer2", 0.035],
				waitingForPlayer2: [6, 7, "waitingForPlayer2", 0.035],
				waitingForPlayer1: [8, 9, "waitingForPlayer1", 0.035]
			}
		}

		// create spritesheet for generic objects (ground e.g.)
		tilesetSheet = new createjs.SpriteSheet(imageData);

		sprite = new createjs.Sprite(tilesetSheet);

		/* koordinaten kommen aus dem levelloader */
		sprite.regX = width / 2;
		sprite.regY = height / 2;
		
		sprite.name= thisVar.hintID;

		sprite.x = x_pos;
		sprite.y = y_pos;

		sprite.snapToPixel = true;
		sprite.mouseEnabled = false;

		var aniName;
		if(thisVar.hintID == "bubblegreenBlob") {
			if(Controls.p1 == 1) {
				aniName = "blinkPlayer1";
			} else {
				aniName = "blinkController";
			}
		} else {
			if(Controls.p2 == 1) {
				aniName = "blinkPlayer2";
			} else {
				aniName = "blinkController";
			}
		}
 
		sprite.gotoAndPlay(aniName);
	},

	this._animate = function(event, data) {
		var aniName = "";
		switch(data.animationKey) {
			case AnimationKeys.PRESSBUTTON:
				if(thisVar.hintID == "bubblegreenBlob" && data.blobID =="p1") {
					if(Controls.p1 == 1) {
						aniName = "blinkPlayer1";
					} else {
						aniName = "blinkController";
					}
				} else if(thisVar.hintID == "bubbleredBlob" && data.blobID =="p2"){
					if(Controls.p2 == 1) {
						aniName = "blinkPlayer2";
					} else {
						aniName = "blinkController";
					}
				}
			break;
			case AnimationKeys.WAITING:
				if(thisVar.hintID == "bubblegreenBlob" && data.blobID =="p1") {
					aniName = "waitingForPlayer2";
				} else if(thisVar.hintID == "bubbleredBlob" && data.blobID =="p2") {
					aniName = "waitingForPlayer1";
				}
			break;
		}
		if(aniName != "") sprite.gotoAndPlay(aniName);
	};

	this.prototype.init();
	this.sprite = sprite;
});