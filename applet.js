function Applet(canvas, controller, puzzle) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.controller = controller;
	this.puzzle = puzzle;

	if (canvas.addEventListener) {
		var self = this;
		canvas.addEventListener("mousedown", function (event) {
			var x = event.clientX, y = event.clientY, button = (event.button == 2);
			var rect = event.target.getBoundingClientRect();
			self.mouseDown(x - rect.left, y - rect.top, button);
		});
		canvas.addEventListener("touchstart", function (event) {
			event.preventDefault();
			var x = event.changedTouches[0].clientX, y = event.changedTouches[0].clientY, button = false;
			var rect = event.target.getBoundingClientRect();
			self.mouseDown(x - rect.left, y - rect.top, button);
		});
		canvas.addEventListener("mousemove", function (event) {
			var x = event.clientX, y = event.clientY, button = (event.button == 2);
			var rect = event.target.getBoundingClientRect();
			self.mouseMove(x - rect.left, y - rect.top, button);
		});
		canvas.addEventListener("touchmove", function (event) {
			event.preventDefault();
			var x = event.changedTouches[0].clientX, y = event.changedTouches[0].clientY, button = false;
			var rect = event.target.getBoundingClientRect();
			self.mouseMove(x - rect.left, y - rect.top, button);
		});
		canvas.addEventListener("mouseup", function (event) {
			var x = event.clientX, y = event.clientY, button = (event.button == 2);
			var rect = event.target.getBoundingClientRect();
			self.mouseUp(x - rect.left, y - rect.top, button);
		});
		canvas.addEventListener("touchend", function (event) {
			event.preventDefault();
			var x = event.changedTouches[0].clientX, y = event.changedTouches[0].clientY, button = false;
			var rect = event.target.getBoundingClientRect();
			self.mouseUp(x - rect.left, y - rect.top, button);
		});
		canvas.addEventListener("mouseout", function (event) {
		    self.mouseOut();
		});
		canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });
	}

	this.puzzle.setProblem(0);

	this.controller.setCanvas(this.canvas);
	this.controller.setApplet(this);
	this.puzzle.setCanvas(this.canvas);
	this.puzzle.setApplet(this);

	this.adjustSize();
}
Applet.prototype.adjustSize = function () {
	this.canvas.height = this.controller.getHeight() + this.puzzle.getHeight();
	this.canvas.width = Math.max(this.controller.getMinimumWidth(), this.puzzle.getMinimumWidth());

	this.repaint();
}
Applet.prototype.getHeight = function () {
	return this.canvas.height;
}
Applet.prototype.getWidth = function () {
	return this.canvas.width;
}
Applet.prototype.getControllerHeight = function () {
	return this.controller.getHeight();
}
Applet.prototype.repaint = function () {
	this.controller.repaint();
	this.puzzle.repaint();
}
Applet.prototype.mouseDown = function (x, y, b) {
	if (y < this.controller.getHeight()) this.controller.mouseDown(x, y, b);
	else this.puzzle.mouseDown(x, y - this.controller.getHeight(), b);
}
Applet.prototype.mouseMove = function (x, y, b) {
	if (y < this.controller.getHeight()) this.controller.mouseMove(x, y, b);
	else this.puzzle.mouseMove(x, y - this.controller.getHeight(), b);
}
Applet.prototype.mouseUp = function (x, y, b) {
	if (y < this.controller.getHeight()) this.controller.mouseUp(x, y, b);
	else this.puzzle.mouseUp(x, y - this.controller.getHeight(), b);
}
Applet.prototype.mouseOut = function () {
    this.controller.mouseUp(-32768, -32768, false);
    this.puzzle.mouseUp(-32768, -32768, false);
}
Applet.prototype.getNumberOfProblems = function () {
	return puzzle.getNumberOfProblems();
}
Applet.prototype.setProblem = function (i) {
	puzzle.setProblem(i);
}
Applet.prototype.zoomIn = function () {
	this.puzzle.zoomIn();
	this.resize();
}
Applet.prototype.zoomOut = function () {
	this.puzzle.zoomOut();
	this.resize();
}
Applet.prototype.performUndo = function () {
	this.puzzle.performUndo();
}
Applet.prototype.performRedo = function () {
	this.puzzle.performRedo();
}
Applet.prototype.performUndoAll = function () {
    this.puzzle.performUndoAll();
}
Applet.prototype.performRedoAll = function () {
    this.puzzle.performRedoAll();
}
