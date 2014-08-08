/*
	Overall Communication happens here. This Controller talks to sub-Controller for View and Model,
	and initializes them.
*/
BlobApp.MainController = (function() {
	var that = {},
	_modelController = null,
	_viewController = null,
	_physicsHandler = null,
	_levelloader = null,
	
	lID,
	p1ID,
	p2ID,

	init = function(lvlID, p1ControlsID, p2ControlsID) {
		lID = lvlID;
		p1ID = p1ControlsID;
		p2ID = p2ControlsID;

		_initModules();
		_registerListeners();
	},

	_initModules = function() {
		_modelController = BlobApp.ModelController;
		_viewController = BlobApp.ViewController;
		_physicsHandler = BlobApp.PhysicsHandler;
		_levelloader = BlobApp.LevelLoader;

		_modelController.init(p1ID, p2ID);
		_viewController.init();
		_physicsHandler.init();
		_levelloader.init(lvlID);
	},

	_registerListeners = function(){
		$("body").on('onTick', _sceneUpdate);
		$("body").on('onReloadGame', _reload);
		$('body').on('onResetGame', _reset);
	},

	_reload = function(){
		_modelController = undefined,
		_levelloader = undefined;
		_modelController = BlobApp.ModelController;
		_levelloader = BlobApp.LevelLoader;
		_modelController.init(p1ID, p2ID);
		_levelloader.init(lID);
	},

	_reset = function() {
		console.log("resetting game", "empty function");
	},

	_sceneUpdate = function(){
		_physicsHandler.update();
		_viewController.update();
	};

	that.init = init;
	return that;
})();