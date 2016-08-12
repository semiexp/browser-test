window.onload = function () {
    Module.slGeneratorInit();
    var canvas = document.getElementById("player");
    var controller = new Controller;
    var problems = document.getElementsByName("problem")[0].value.split(",");
    var puzzle = new SlitherlinkApplet(problems);
    var app = new Applet(canvas, controller, puzzle);
}