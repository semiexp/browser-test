$(document).ready(function () {
    var defaultProblem = new NurikabeProblem(4, 4);
    defaultProblem.setClue(1, 1, 4);
    var cont = new NurikabeController([defaultProblem]);
    var view = new NurikabeView();

    var canvas = document.getElementById("player");
    canvas.addEventListener("mousedown", function (event) {
        var x = event.clientX, y = event.clientY, button = (event.button == 2);
        var rect = event.target.getBoundingClientRect();
        cont.mouseDown(x - rect.left, y - rect.top, button);
    });
    canvas.addEventListener("touchstart", function (event) {
        event.preventDefault();
        var x = event.changedTouches[0].clientX, y = event.changedTouches[0].clientY, button = false;
        var rect = event.target.getBoundingClientRect();
        cont.mouseDown(x - rect.left, y - rect.top, button);
    });
    canvas.addEventListener("mousemove", function (event) {
        var x = event.clientX, y = event.clientY, button = (event.button == 2);
        var rect = event.target.getBoundingClientRect();
        cont.mouseMove(x - rect.left, y - rect.top, button);
    });
    canvas.addEventListener("touchmove", function (event) {
        event.preventDefault();
        var x = event.changedTouches[0].clientX, y = event.changedTouches[0].clientY, button = false;
        var rect = event.target.getBoundingClientRect();
        cont.mouseMove(x - rect.left, y - rect.top, button);
    });
    canvas.addEventListener("mouseup", function (event) {
        var x = event.clientX, y = event.clientY, button = (event.button == 2);
        var rect = event.target.getBoundingClientRect();
        cont.mouseUp(x - rect.left, y - rect.top, button);
    });
    canvas.addEventListener("touchend", function (event) {
        event.preventDefault();
        var x = event.changedTouches[0].clientX, y = event.changedTouches[0].clientY, button = false;
        var rect = event.target.getBoundingClientRect();
        cont.mouseUp(x - rect.left, y - rect.top, button);
    });
    canvas.addEventListener("mouseout", function (event) {
        cont.mouseUp(-32768, -32768);
    });
    canvas.addEventListener("contextmenu", function (e) { e.preventDefault(); });
    
    var problemIdBox = $("<span style='vertical-align:middle'></span>");
    var setProblemIdBox = function () {
        problemIdBox.text((cont.getProblemId() + 1) + "/" + cont.getNumberOfProblems());
    }
    Module.nkGeneratorInit();
    var problemGenerator = function () {
        var problem = Module.nkGeneratorGenerate(10, 10);
        if (problem == "") return null;
        var ret = new NurikabeProblem(10, 10);
        problem = problem.split(",");
        for (var y = 0; y < 10; ++y) {
            for (var x = 0; x < 10; ++x) {
                var c = problem[y].charAt(x);
                if (c != ".") {
                    ret.setClue(x, y, parseInt(c, 36));
                }
            }
        }
        return ret;
    }
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="50,10 50,90 10,50" stroke="#000" fill="#000" />\
            <polygon points="90,10 90,90 50,50" stroke="#000" fill="#000" /></svg>', function () { cont.performUndoAll(); }));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="70,10 70,90 30,50" stroke="#000" fill="#000" /></svg>', function () { cont.performUndo(); }, true));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="30,10 30,90 70,50" stroke="#000" fill="#000" /></svg>', function () { cont.performRedo(); }, true));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="10,10 10,90 50,50" stroke="#000" fill="#000" />\
            <polygon points="50,10 50,90 90,50" stroke="#000" fill="#000" /></svg>', function () { cont.performRedoAll(); }));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="10,40 90,40 90,60 10,60" stroke="#000" fill="#000" /></svg>', function () { cont.zoomOut(); }));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="10,40 40,40 40,10 60,10 60,40 90,40 90,60 60,60 60,90 40,90 40,60 10,60" stroke="#000" fill="#000" /></svg>', function () { cont.zoomIn(); }));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="10,50 40,20 40,40 90,40 90,60 40,60 40,80" stroke="#000" fill="#000" /></svg>', function () { cont.previousProblem(); setProblemIdBox(); }, true));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="90,50 60,20 60,40 10,40 10,60 60,60 60,80" stroke="#000" fill="#000" /></svg>', function () { cont.nextProblem(); setProblemIdBox(); }, true));
    $("#toolbar").append(createButton('<svg viewBox="0 0 100 100" height="20px" width="20px" style="vertical-align:-50%; position: relative; top: 50%;">\
            <polygon points="90,70 70,50 70,60 10,60 10,80 70,80 70,90" stroke="#000" fill="#000" />\
            <polygon points="60,5 75,5 75,20 90,20 90,35 75,35 75,50 60,50 60,35 45,35 45,20 60,20" stroke="#000" fill="#000" /></svg>', function () {
                var problem = problemGenerator();
                if (problem) {
                    cont.addProblem(problem);
                    cont.setProblemId(cont.getNumberOfProblems() - 1);
                    setProblemIdBox();
                }
            }, true));
    $("#toolbar").append(problemIdBox);

    view.setCanvas(canvas);
    cont.setView(view);
    setProblemIdBox();
});
