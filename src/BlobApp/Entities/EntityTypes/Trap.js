BlobApp.Trap = (function Trap(x_pos, y_pos, sizeX, sizeY, trapID) {
	this.prototype = new BlobApp.Entity(sprite, x_pos, y_pos, sizeX, sizeY);
	this.prototype.applyPhysicsBody = function() { 

	};
	
	this.trapID = trapID;
});