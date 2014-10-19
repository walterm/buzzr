var app = angular.module("buzzrApp", []);
$('#myGallery').spacegallery({loadingClass: 'loading'});

app.controller("galleryController", function ($scope) {
    var cur_time = new Date();
    var prev_time = new Date();
    $scope.buzzes = [];
    $scope.header = "";
    $scope.likes = [];
    prev_time.setDate(prev_time.getDate() - 1);
    // Setting up leap motion controller
    var controllerOptions = {enableGestures: true};
    var time = new Date().getTime(),
        threshold = 500,
        loopcontroller = new Leap.Controller(controllerOptions);
    loopcontroller.connect();

    loopcontroller.on("gesture", function(gesture){
        if(gesture.type === "swipe"){
            if($("#myGallery img")[$("myGallery img").length-1].attr("data-done") == "true") {
                $("#myGallery").html("You are done! Wait 24 hours.");
            }

            var now = new Date().getTime();
            if(now - time > 500){
                if(gesture.direction[0] > 0) {
                    // right case
                    $scope.likes.push(scope.buzzes.pop())
                } else {
                    // left case
                    $scope.buzzes.pop();
                }
                $scope.header = $scope.buzzes[$scope.buzzes.length].title;
                $("#myGallery img")[$("myGallery img").length-1].css('display', 'none').attr('data-done', 'true');
                $("#myGallery a").click();
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
