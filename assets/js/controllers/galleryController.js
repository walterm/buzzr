var app = angular.module("buzzrApp", []);

app.controller("galleryController", function ($scope) {
    var cur_time = new Date();
    var prev_time = new Date();
    $scope.buzzes = [];
    $scope.header = "";
    prev_time.setDate(prev_time.getDate() - 1);
    // Setting up leap motion controller
    var controllerOptions = {enableGestures: true};
    var time = new Date().getTime(),
        threshold = 500,
        loopcontroller = new Leap.Controller(controllerOptions);
    loopcontroller.connect();

    loopcontroller.on("gesture", function(gesture){
        if(gesture.type === "swipe"){
            var now = new Date().getTime();
            if(now - time > 500){
                if(gesture.direction[0] > 0)
                    // right case
                else // left case
            }
        }
    });
    $.ajax({
        url: "www.buzfeed/buzfeed/api/buzzes?since=" + prev_time.getTime() + "&until=" + cur_time.getTime() + "& session_key=4621030e12e085226f2cba99d0b19f1a2cc1337b9c7ed8fd91668ec97d1e844ehackathon3",
        async: false,
        dataiType: "json"
    }).done( function (e) {
        console.dir(e);
        $scope.buzzes.push(e.buzzes)
    });
});
