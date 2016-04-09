function SlitherlinkApplet() {
	this.outerMargin = 20;
	this.lineMargin = 1;
	this.edgeMaximumDistanceFromActualEdge = 5;
	this.edgeMinimumDistanceFromVertex = 5;
	this.vertexMaximumDistanceFromActualVertex = 15;
	this.cellMaximumDistanceFromEdge = 12;
	this.maximumTapDistance = 3;

	this.isMouseClicking = false;
	this.isLineAllowed = false;
	this.isBlankAllowed = false;
	this.moveDistance = 0;
	this.lastVertexX = -2;
	this.lastVertexY = -2;
	this.lastCellX = -2;
	this.lastCellY = -2;

	this.isFinished = false;

	this.undoHistory = [];
	this.redoHistory = [];

	this.setZoom(3);
	this.field = new SlitherlinkField;
}
SlitherlinkApplet.prototype.setProblem = function (id) {

}
SlitherlinkApplet.prototype.setApplet = function (a) {
	this.applet = a;
}
SlitherlinkApplet.prototype.setCanvas = function (c) {
	this.canvas = c;
	this.ctx = c.getContext("2d");
}
SlitherlinkApplet.prototype.getHeight = function () {
	return this.outerMargin * 2 + this.dotSize + (this.dotSize + this.cellSize) * this.field.getHeight();
}
SlitherlinkApplet.prototype.getMinimumWidth = function () {
	return this.outerMargin * 2 + this.dotSize + (this.dotSize + this.cellSize) * this.field.getWidth();
}
SlitherlinkApplet.prototype.setZoom = function (z) {
	this.zoom = z;
	this.dotSize = z * 2;
	this.cellSize = z * 10;
	this.blankXSize = z * 1.5;
}
SlitherlinkApplet.prototype.repaint = function () {
	var ctx = this.ctx;
	ctx.setTransform(1, 0, 0, 1, 0, this.applet.getControllerHeight());

	ctx.fillStyle = "#ffffff";
	ctx.strokeStyle = "#ffffff";
	ctx.lineWidth = 1.0;
	ctx.fillRect(0, 0, this.applet.getWidth(), this.getHeight());

	ctx.strokeStyle = "#666666";
	ctx.lineWidth = 1.0;
	ctx.strokeRect(1, 1, this.applet.getWidth() - 2, this.getHeight() - 2);

	var field_width = this.field.getWidth();
	var field_height = this.field.getHeight();
	var cellSize = this.cellSize;
	var dotSize = this.dotSize;
	var outerMargin = this.outerMargin;

	ctx.fillStyle = "#000000";
	for (var x = 0; x <= field_width; ++x) {
		for (var y = 0; y <= field_height; ++y) {
			ctx.fillRect(outerMargin + x * (cellSize + dotSize), outerMargin + y * (cellSize + dotSize), dotSize, dotSize);
		}
	}

	var field = this.field;
	ctx.font = this.cellSize + "px 'Consolas'";
	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	for (var y = 0; y < field.height; ++y) {
	    for (var x = 0; x < field.width; ++x) {
	        var clue = field.getClue(y, x);
	        if (0 <= clue && clue <= 3) {
	            ctx.fillText(clue,
					outerMargin + x * (dotSize + cellSize) + dotSize + cellSize / 2,
					outerMargin + (y + 1) * (dotSize + cellSize),
					cellSize
					);
	        }
	    }
	}

	ctx.setTransform(1, 0, 0, 1, 0, 0);
}
SlitherlinkApplet.prototype.showAndUpdateIfComplete = function () {
    this.isFinished = this.field.isFinished();
    var ctx = this.ctx;
    var color = this.isFinished ? "#ff0000" : "#ffffff";

    ctx.strokeStyle = color;
    ctx.lineWidth = 2.0;
    ctx.strokeRect(4, this.applet.getControllerHeight() + 4, this.applet.getWidth() - 8, this.getHeight() - 8);
}
SlitherlinkApplet.prototype.performUndo = function () {
    if (this.undoHistory.length == 0) return;
    var undo = this.undoHistory.pop();
    this.redoHistory.push({ x: undo.x, y: undo.y, state: this.field.getEdge(undo.x, undo.y) });
    this.field.setEdge(undo.x, undo.y, undo.state);
    this.paintEdge(undo.x, undo.y);
    this.showAndUpdateIfComplete();
}
SlitherlinkApplet.prototype.performRedo = function () {
    if (this.redoHistory.length == 0) return;
    var undo = this.redoHistory.pop();
    this.undoHistory.push({ x: undo.x, y: undo.y, state: this.field.getEdge(undo.x, undo.y) });
    this.field.setEdge(undo.x, undo.y, undo.state);
    this.paintEdge(undo.x, undo.y);
    this.showAndUpdateIfComplete();
}
SlitherlinkApplet.prototype.performUndoAll = function () {
    while (this.undoHistory.length != 0) this.performUndo();
}
SlitherlinkApplet.prototype.performRedoAll = function () {
    while (this.redoHistory.length != 0) this.performRedo();
}
SlitherlinkApplet.prototype.updateEdge = function (x, y, v) {
    if (this.field.getEdge(x, y) == v) return;
    this.redoHistory = [];
    this.undoHistory.push({ x: x, y: y, state: this.field.getEdge(x, y) });
	this.field.setEdge(x, y, v);
	this.paintEdge(x, y);
	this.showAndUpdateIfComplete();
}
SlitherlinkApplet.prototype.paintEdge = function (x, y) {
	var ctx = this.ctx;
	var cellSize = this.cellSize;
	var dotSize = this.dotSize;
	var outerMargin = this.outerMargin;
	var lineMargin = this.lineMargin;

	ctx.setTransform(1, 0, 0, 1, 0, this.applet.getControllerHeight());

	ctx.fillStyle = "#ffffff";
	if (x % 2 == 1 && y % 2 == 0) {
		ctx.fillRect(outerMargin + (x - 1) / 2 * (cellSize + dotSize) + lineMargin + dotSize, outerMargin + y / 2 * (cellSize + dotSize) + lineMargin, cellSize - 2 * lineMargin, dotSize - 2 * lineMargin);
	} else if (x % 2 == 0 && y % 2 == 1) {
		ctx.fillRect(outerMargin + x / 2 * (cellSize + dotSize) + lineMargin, outerMargin + (y - 1) / 2 * (cellSize + dotSize) + lineMargin + dotSize, dotSize - 2 * lineMargin, cellSize - 2 * lineMargin);
	}

	var center_x, center_y;
	if (x % 2 == 1 && y % 2 == 0) {
	    center_x = outerMargin + (x - 1) / 2 * (cellSize + dotSize) + dotSize + cellSize / 2;
	    center_y = outerMargin + y / 2 * (cellSize + dotSize) + dotSize / 2;
	} else {
	    center_x = outerMargin + x / 2 * (cellSize + dotSize) + dotSize / 2;
	    center_y = outerMargin + (y - 1) / 2 * (cellSize + dotSize) + dotSize + cellSize / 2;
	}
	ctx.fillRect(center_x - this.blankXSize, center_y - this.blankXSize, 2 * this.blankXSize + 1, 2 * this.blankXSize + 1);

	var edge_state = this.field.getEdge(x, y);
	if (edge_state == 1) { // line
		ctx.fillStyle = "#000000";
		if (x % 2 == 1 && y % 2 == 0) {
			ctx.fillRect(outerMargin + (x - 1) / 2 * (cellSize + dotSize) + lineMargin + dotSize, outerMargin + y / 2 * (cellSize + dotSize) + lineMargin, cellSize - 2 * lineMargin, dotSize - 2 * lineMargin);
		} else if (x % 2 == 0 && y % 2 == 1) {
			ctx.fillRect(outerMargin + x / 2 * (cellSize + dotSize) + lineMargin, outerMargin + (y - 1) / 2 * (cellSize + dotSize) + lineMargin + dotSize, dotSize - 2 * lineMargin, cellSize - 2 * lineMargin);
		}
	} else if (edge_state == 2) { // blank
	    center_x += 0.5;
	    center_y += 0.5;
	    ctx.strokeStyle = "#000000";
	    ctx.lineWidth = 1.0;
	    ctx.beginPath();
	    ctx.moveTo(center_x - this.blankXSize, center_y - this.blankXSize);
	    ctx.lineTo(center_x + this.blankXSize, center_y + this.blankXSize);
	    ctx.stroke();
	    ctx.beginPath();
	    ctx.moveTo(center_x + this.blankXSize, center_y - this.blankXSize);
	    ctx.lineTo(center_x - this.blankXSize, center_y + this.blankXSize);
	    ctx.stroke();
    }

	ctx.setTransform(1, 0, 0, 1, 0, 0);
}
SlitherlinkApplet.prototype.mouseDown = function (x, y, b) {
    var loc = this.getLocation(x, y);
    this.moveDistance = 0;
    this.isMouseClicking = true;
    this.isLineAllowed = true;
    this.isBlankAllowed = true;
    this.lastMouseX = x;
    this.lastMouseY = y;
    this.lastVertexX = loc.vertexX;
    this.lastVertexY = loc.vertexY;
    this.lastCellX = loc.cellX;
    this.lastCellY = loc.cellY;
}
SlitherlinkApplet.prototype.mouseMove = function (x, y, b) {
    if (!this.isMouseClicking) return;
    this.moveDistance += Math.abs(this.lastMouseX - x) + Math.abs(this.lastMouseY - y);
    this.lastMouseX = x;
    this.lastMouseY = y;

    var loc = this.getLocation(x, y);
    if (loc.cellX == -2 && loc.vertexX == -2) {
        if (loc.edgeX != -2) return;
        this.lastVertexX = -2;
        this.lastVertexY = -2;
        this.lastCellX = -2;
        this.lastCellY = -2;
    }
    if (this.isLineAllowed && this.lastVertexX != -2 && loc.vertexX != -2 && Math.abs(this.lastVertexX - loc.vertexX) + Math.abs(this.lastVertexY - loc.vertexY) == 2) {
        if (!this.isFinished) this.updateEdge((this.lastVertexX + loc.vertexX) / 2, (this.lastVertexY + loc.vertexY) / 2, 1);
        this.isBlankAllowed = false;
    }
    if (this.isBlankAllowed && this.lastCellX != -2 && loc.cellX != -2 && Math.abs(this.lastCellX - loc.cellX) + Math.abs(this.lastCellY - loc.cellY) == 2) {
        if (!this.isFinished) this.updateEdge((this.lastCellX + loc.cellX) / 2, (this.lastCellY + loc.cellY) / 2, 2);
        this.isLineAllowed = false;
    }

    if (loc.vertexX != -2) {
        this.lastVertexX = loc.vertexX;
        this.lastVertexY = loc.vertexY;
    }
    if (loc.cellX != -2) {
        this.lastCellX = loc.cellX;
        this.lastCellY = loc.cellY;
    }
}
SlitherlinkApplet.prototype.mouseUp = function (x, y, b) {
    this.isMouseClicking = false;
    var loc = this.getLocation(x, y);
    if (!this.isFinished && this.moveDistance <= this.maximumTapDistance && loc.edgeX != -2) {
        var s = this.field.getEdge(loc.edgeX, loc.edgeY);
        var s2;
        if (s == 0) s2 = 2;
        else s2 = 0;
        this.updateEdge(loc.edgeX, loc.edgeY, s2);
    }
}
SlitherlinkApplet.prototype.getLocation = function (x, y) {
	// (x, y): position given by Applet
	x -= this.outerMargin; y -= this.outerMargin;
	var ret = {};
	var dotSize = this.dotSize, cellSize = this.cellSize;

	var vtx_x = Math.floor(x / (dotSize + cellSize)), vtx_y = Math.floor(y / (dotSize + cellSize));
	var x_ofs = x - vtx_x * (dotSize + cellSize), y_ofs = y - vtx_y * (dotSize + cellSize);

	if (x_ofs < dotSize && y_ofs < dotSize) {
		// on vertex
		ret.edgeX = ret.edgeY = -2;
		ret.cellX = -2; ret.cellY = -2;
		ret.vertexX = vtx_x * 2; ret.vertexY = vtx_y * 2;
	} else if (dotSize <= x_ofs && y_ofs < dotSize) {
		ret.edgeX = vtx_x * 2 + 1; ret.edgeY = vtx_y * 2;
		ret.cellX = -2; ret.cellY = -2;
		if (x_ofs - dotSize <= this.vertexMaximumDistanceFromActualVertex) {
			ret.vertexX = vtx_x * 2; ret.vertexY = vtx_y * 2;
		} else if (dotSize + cellSize - x_ofs <= this.vertexMaximumDistanceFromActualVertex) {
			ret.vertexX = vtx_x * 2 + 2; ret.vertexY = vtx_y * 2;
		} else {
			ret.vertexX = -2; ret.vertexY = -2;
		}
	} else if (x_ofs < dotSize && dotSize <= y_ofs) {
		ret.edgeX = vtx_x * 2; ret.edgeY = vtx_y * 2 + 1;
		ret.cellX = -2; ret.cellY = -2;
		if (y_ofs - dotSize <= this.vertexMaximumDistanceFromActualVertex) {
			ret.vertexX = vtx_x * 2; ret.vertexY = vtx_y * 2;
		} else if (dotSize + cellSize - y_ofs <= this.vertexMaximumDistanceFromActualVertex) {
			ret.vertexX = vtx_x * 2; ret.vertexY = vtx_y * 2 + 2;
		} else {
			ret.vertexX = -2; ret.vertexY = -2;
		}
	} else {
		// on cell; find the nearest edge
		var edge_distance = cellSize;
		x_ofs -= dotSize; y_ofs -= dotSize;
		if (x_ofs < edge_distance) {
			edge_distance = x_ofs;
			ret.edgeX = vtx_x * 2;
			ret.edgeY = vtx_y * 2 + 1;
		}
		if (y_ofs < edge_distance) {
			edge_distance = y_ofs;
			ret.edgeX = vtx_x * 2 + 1;
			ret.edgeY = vtx_y * 2;
		}
		if (cellSize - x_ofs < edge_distance) {
			edge_distance = cellSize - x_ofs;
			ret.edgeX = vtx_x * 2 + 2;
			ret.edgeY = vtx_y * 2 + 1;
		}
		if (cellSize - y_ofs < edge_distance) {
			edge_distance = cellSize - y_ofs;
			ret.edgeX = vtx_x * 2 + 1;
			ret.edgeY = vtx_y * 2 + 2;
		}
		if (edge_distance > this.edgeMaximumDistanceFromActualEdge) {
			ret.edgeX = ret.edgeY = -2;
		}
		if (edge_distance <= this.cellMaximumDistanceFromEdge) {
			ret.cellX = vtx_x * 2 + 1;
			ret.cellY = vtx_y * 2 + 1;
		} else {
			ret.cellX = -2; ret.cellY = -2;
		}

		var vertex_distance;
		if (x_ofs <= cellSize / 2 && y_ofs <= cellSize / 2) {
			vertex_distance = Math.sqrt(x_ofs * x_ofs + y_ofs * y_ofs);
			ret.vertexX = vtx_x * 2;
			ret.vertexY = vtx_y * 2;
		} else if (x_ofs <= cellSize / 2 && y_ofs > cellSize / 2) {
			vertex_distance = Math.sqrt(x_ofs * x_ofs + (cellSize - y_ofs) * (cellSize - y_ofs));
			ret.vertexX = vtx_x * 2;
			ret.vertexY = vtx_y * 2 + 2;
		} else if (x_ofs > cellSize / 2 && y_ofs <= cellSize / 2) {
			vertex_distance = Math.sqrt((cellSize - x_ofs) * (cellSize - x_ofs) + y_ofs * y_ofs);
			ret.vertexX = vtx_x * 2 + 2;
			ret.vertexY = vtx_y * 2;
		} else if (x_ofs > cellSize / 2 && y_ofs > cellSize / 2) {
			vertex_distance = Math.sqrt((cellSize - x_ofs) * (cellSize - x_ofs) + (cellSize - y_ofs) * (cellSize - y_ofs));
			ret.vertexX = vtx_x * 2 + 2;
			ret.vertexY = vtx_y * 2 + 2;
		}
		if (vertex_distance > this.vertexMaximumDistanceFromActualVertex) {
			ret.vertexX = -2; ret.vertexY = -2;
		}
	}
	if (ret.edgeX < 0 || ret.edgeY < 0 || ret.edgeX > 2 * this.field.getWidth() || ret.edgeY > 2 * this.field.getHeight()) {
		ret.edgeX = -2; ret.edgeY = -2;
	}
	if (ret.cellX < -1 || ret.cellY < -1 || ret.cellX > 2 * this.field.getWidth() + 1 || ret.cellY > 2 * this.field.getHeight() + 1) {
		ret.cellX = -2; ret.cellY = -2;
	}
	if (ret.vertexX < 0 || ret.vertexY < 0 || ret.vertexX > 2 * this.field.getWidth() || ret.vertexY > 2 * this.field.getHeight()) {
		ret.vertexX = -2; ret.vertexY = -2;
	}
	return ret;
}