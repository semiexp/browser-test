function Controller() {
    this.buttons = [];
    this.problemIndex = 0;
    this.timer = null;

	var self = this;
	this.addButton(5, 5, 20, 20, false,
        function (ctx, x, y) {
            x -= 2; y -= 1;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x + 9, y + 15);
            ctx.lineTo(x + 9, y + 5);
            ctx.lineTo(x + 4, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x + 16, y + 15);
            ctx.lineTo(x + 16, y + 5);
            ctx.lineTo(x + 11, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            self.applet.performUndoAll();
        });
	this.addButton(30, 5, 20, 20, true,
        function (ctx, x, y) {
            x -= 2; y -= 1;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x + 13, y + 15);
            ctx.lineTo(x + 13, y + 5);
            ctx.lineTo(x + 8, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            self.applet.performUndo();
        });
	this.addButton(55, 5, 20, 20, true, 
        function (ctx, x, y) {
            x -= 2; y -= 1;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x + 9, y + 15);
            ctx.lineTo(x + 9, y + 5);
            ctx.lineTo(x + 14, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            self.applet.performRedo();
        });
	this.addButton(80, 5, 20, 20, false,
        function (ctx, x, y) {
            x -= 2; y -= 1;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x + 5, y + 15);
            ctx.lineTo(x + 5, y + 5);
            ctx.lineTo(x + 10, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x + 12, y + 15);
            ctx.lineTo(x + 12, y + 5);
            ctx.lineTo(x + 17, y + 10);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            self.applet.performRedoAll();
        });
	this.addButton(110, 5, 20, 20, true,
        function (ctx, x, y) {
        	x += 9; y += 9;
        	x += 0.5; y += 0.5;
        	ctx.strokeStyle = "#000000";
        	ctx.fillStyle = "#000000";
        	ctx.beginPath();
        	ctx.lineTo(x - 5, y - 1);
        	ctx.lineTo(x - 5, y + 1);
        	ctx.lineTo(x + 5, y + 1);
        	ctx.lineTo(x + 5, y - 1);
        	ctx.closePath();
        	ctx.stroke();
        	ctx.fill();
        },
        function () {
            self.applet.zoomOut();
        });
	this.addButton(135, 5, 20, 20, true,
        function (ctx, x, y) {
            x += 9; y += 9;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x - 1, y - 1);
            ctx.lineTo(x - 5, y - 1);
            ctx.lineTo(x - 5, y + 1);
            ctx.lineTo(x - 1, y + 1);
            ctx.lineTo(x - 1, y + 5);
            ctx.lineTo(x + 1, y + 5);
            ctx.lineTo(x + 1, y + 1);
            ctx.lineTo(x + 5, y + 1);
            ctx.lineTo(x + 5, y - 1);
            ctx.lineTo(x + 1, y - 1);
            ctx.lineTo(x + 1, y - 5);
            ctx.lineTo(x - 1, y - 5);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            self.applet.zoomIn();
        });
	this.addButton(165, 5, 20, 20, true,
        function (ctx, x, y) {
        	x -= 2; y -= 1;
        	x += 0.5; y += 0.5;
        	ctx.strokeStyle = "#000000";
        	ctx.fillStyle = "#000000";
        	ctx.beginPath();
        	ctx.moveTo(x + 4, y + 10);
        	ctx.lineTo(x + 9, y + 15);
        	ctx.lineTo(x + 9, y + 12);
        	ctx.lineTo(x + 17, y + 12);
        	ctx.lineTo(x + 17, y + 8);
        	ctx.lineTo(x + 9, y + 8);
        	ctx.lineTo(x + 9, y + 5);
        	ctx.closePath();
        	ctx.stroke();
        	ctx.fill();
        },
        function () {
        	self.previousProblem();
        });
	this.addButton(190, 5, 20, 20, true,
        function (ctx, x, y) {
        	x -= 1; y -= 1;
        	x += 0.5; y += 0.5;
        	ctx.strokeStyle = "#000000";
        	ctx.fillStyle = "#000000";
        	ctx.beginPath();
        	ctx.moveTo(x + 17, y + 10);
        	ctx.lineTo(x + 12, y + 15);
        	ctx.lineTo(x + 12, y + 12);
        	ctx.lineTo(x + 4, y + 12);
        	ctx.lineTo(x + 4, y + 8);
        	ctx.lineTo(x + 12, y + 8);
        	ctx.lineTo(x + 12, y + 5);
        	ctx.closePath();
        	ctx.stroke();
        	ctx.fill();
        },
        function () {
        	self.nextProblem();
        });
	this.addButton(215, 5, 20, 20, false,
        function (ctx, x, y) {
            x -= 1; y -= 1;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x + 17, y + 12);
            ctx.lineTo(x + 13, y + 16);
            ctx.lineTo(x + 13, y + 13);
            ctx.lineTo(x + 4, y + 13);
            ctx.lineTo(x + 4, y + 11);
            ctx.lineTo(x + 13, y + 11);
            ctx.lineTo(x + 13, y + 8);

            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            var y2 = y + 5, x2 = x + 8;
            ctx.beginPath();
            ctx.moveTo(x2 - 1, y2 - 1);
            ctx.lineTo(x2 - 4, y2 - 1);
            ctx.lineTo(x2 - 4, y2 + 1);
            ctx.lineTo(x2 - 1, y2 + 1);
            ctx.lineTo(x2 - 1, y2 + 4);
            ctx.lineTo(x2 + 1, y2 + 4);
            ctx.lineTo(x2 + 1, y2 + 1);
            ctx.lineTo(x2 + 4, y2 + 1);
            ctx.lineTo(x2 + 4, y2 - 1);
            ctx.lineTo(x2 + 1, y2 - 1);
            ctx.lineTo(x2 + 1, y2 - 4);
            ctx.lineTo(x2 - 1, y2 - 4);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            self.generateAndAddProblem();
        });
	this.pushedButtonId = -1;
}

Controller.prototype.setCanvas = function (c) {
	this.canvas = c;
	this.ctx = c.getContext("2d");
}
Controller.prototype.setApplet = function (a) {
	this.applet = a;
}
Controller.prototype.repaint = function () {
	var ctx = this.ctx;

	ctx.fillStyle = "#cccccc";
	ctx.lineWidth = 1.0;
	ctx.fillRect(0, 0, this.applet.getWidth(), this.getHeight());

	for (var i = 0; i < this.buttons.length; ++i) {
		this.paintButton(i, false);
	}

    // TODO: paint icon
	ctx.font = "20px 'Consolas'";
	ctx.textAlign = "left";
	ctx.textBaseline = "alphabetic";
	ctx.fillText((this.problemIndex + 1) + "/" + this.applet.getNumberOfProblems(),
		240,
		23,
		100
		);
}
Controller.prototype.paintButton = function (id) {
	var ctx = this.ctx;
	var button = this.buttons[id];
	var pushed = button.isPushed;

	ctx.fillStyle = "#cccccc";
	ctx.fillRect(button.left, button.top, button.height, button.width);

	ctx.strokeStyle = pushed ? "#000000" : "#ffffff";
	ctx.lineWidth = 1.0;
	ctx.beginPath();
	ctx.moveTo(button.left + 0.5, button.top + button.height + 0.5);
	ctx.lineTo(button.left + 0.5, button.top + 0.5);
	ctx.lineTo(button.left + button.width + 0.5, button.top + 0.5);
	ctx.stroke();

	ctx.strokeStyle = pushed ? "#ffffff" : "#000000";
	ctx.lineWidth = 1.0;
	ctx.beginPath();
	ctx.moveTo(button.left + 0.5, button.top + button.height + 0.5);
	ctx.lineTo(button.left + button.width + 0.5, button.top + button.height + 0.5);
	ctx.lineTo(button.left + button.width + 0.5, button.top + 0.5);
	ctx.stroke();

	if (pushed) button.painter(ctx, button.left + 2, button.top + 2);
	else button.painter(ctx, button.left + 1, button.top + 1);

}
Controller.prototype.getHeight = function () {
	return 30;
}
Controller.prototype.getMinimumWidth = function () {
	return 300;
}
Controller.prototype.addButton = function (left, top, width, height, longPress, painter, action) {
	this.buttons.push({
		left: left,
		top: top,
		width: width,
		height: height,
        painter: painter,
        action: action,
        isPushed: false,
        enableLongPress: longPress
	});
}
Controller.prototype.getButtonId = function (x, y) {
	for (var i = 0; i < this.buttons.length; ++i) {
		var button = this.buttons[i];
		if (button.left <= x && x < button.left + button.width && button.top <= y && y < button.top + button.height) {
			return i;
		}
	}
	return -1;
}
Controller.prototype.timerEvent = function (action) {
    this.timer = setTimeout(this.timerEvent.bind(this, action), 100);
    action();
}
Controller.prototype.mouseDown = function (x, y, b) {
    var id = this.getButtonId(x, y);
    if (id == -1) return;
    this.buttons[id].isPushed = true;
    this.paintButton(id);
    this.pushedButtonId = id;
    this.buttons[id].action();
    if (this.buttons[id].enableLongPress) {
        this.timer = setTimeout(this.timerEvent.bind(this, this.buttons[id].action), 500);
    }
}
Controller.prototype.mouseMove = function (x, y, b) {
	var id = this.getButtonId(x, y);
	if (this.pushedButtonId != -1 && id == -1) {
	    this.buttons[this.pushedButtonId].isPushed = false;
	    this.paintButton(this.pushedButtonId);
	    this.pushedButtonId = -1;
	    if (this.timer != null) {
	        clearTimeout(this.timer);
	        this.timer = null;
	    }
	}
}
Controller.prototype.mouseUp = function (x, y, b) {
	if (this.pushedButtonId != -1) {
		var id = this.pushedButtonId;
		this.buttons[id].isPushed = false;
		this.paintButton(id);
		this.pushedButtonId = -1;
		if (this.timer != null) {
		    clearTimeout(this.timer);
		    this.timer = null;
		}
    }
}
Controller.prototype.previousProblem = function () {
    this.problemIndex -= 1;
    if (this.problemIndex < 0) this.problemIndex = this.applet.getNumberOfProblems() - 1;
    this.repaint();
    this.applet.setProblem(this.problemIndex);
}
Controller.prototype.nextProblem = function () {
    this.problemIndex += 1;
    if (this.problemIndex >= this.applet.getNumberOfProblems()) this.problemIndex = 0;
    this.repaint();
    this.applet.setProblem(this.problemIndex);
}
Controller.prototype.generateAndAddProblem = function () {
    var problem = "";
    while (problem == "") {
        problem = Module.slGeneratorGenerate(10, 10, 32, 2);
    }
    this.applet.addProblem(problem);

    this.problemIndex = this.applet.getNumberOfProblems() - 1;
    this.repaint();
    this.applet.setProblem(this.problemIndex);
}
