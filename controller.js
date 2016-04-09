function Controller() {
	this.buttons = [];

	var self = this;
	this.addButton(5, 5, 20, 20,
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
	this.addButton(30, 5, 20, 20,
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
	this.addButton(55, 5, 20, 20,
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
	this.addButton(80, 5, 20, 20,
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
	this.addButton(120, 5, 20, 20,
        function (ctx, x, y) {
            x += 9; y += 9;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.lineTo(x - 7, y - 2);
            ctx.lineTo(x - 7, y + 2);
            ctx.lineTo(x + 7, y + 2);
            ctx.lineTo(x + 7, y - 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            alert("pohe");
        });
	this.addButton(145, 5, 20, 20,
        function (ctx, x, y) {
            x += 9; y += 9;
            x += 0.5; y += 0.5;
            ctx.strokeStyle = "#000000";
            ctx.fillStyle = "#000000";
            ctx.beginPath();
            ctx.moveTo(x - 2, y - 2);
            ctx.lineTo(x - 7, y - 2);
            ctx.lineTo(x - 7, y + 2);
            ctx.lineTo(x - 2, y + 2);
            ctx.lineTo(x - 2, y + 7);
            ctx.lineTo(x + 2, y + 7);
            ctx.lineTo(x + 2, y + 2);
            ctx.lineTo(x + 7, y + 2);
            ctx.lineTo(x + 7, y - 2);
            ctx.lineTo(x + 2, y - 2);
            ctx.lineTo(x + 2, y - 7);
            ctx.lineTo(x - 2, y - 7);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        },
        function () {
            alert("pohe");
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
}
Controller.prototype.paintButton = function (id, pushed) {
	var ctx = this.ctx;
	var button = this.buttons[id];

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

	// TODO: paint icon
}
Controller.prototype.getHeight = function () {
	return 30;
}
Controller.prototype.getMinimumWidth = function () {
	return 100;
}
Controller.prototype.addButton = function (left, top, width, height, painter, action) {
	this.buttons.push({
		left: left,
		top: top,
		width: width,
		height: height,
        painter: painter,
		action: action
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
Controller.prototype.mouseDown = function (x, y, b) {
	var id = this.getButtonId(x, y);
	if (id == -1) return;
	this.paintButton(id, true);
	this.pushedButtonId = id;
}
Controller.prototype.mouseMove = function (x, y, b) {
	var id = this.getButtonId(x, y);
	if (this.pushedButtonId != -1 && id == -1) {
		this.paintButton(this.pushedButtonId, false);
		this.pushedButtonId = -1;
	}
}
Controller.prototype.mouseUp = function (x, y, b) {
	if (this.pushedButtonId != -1) {
		var id = this.pushedButtonId;
		this.paintButton(id, false);
		this.pushedButtonId = -1;
		this.buttons[id].action();
	}
}
