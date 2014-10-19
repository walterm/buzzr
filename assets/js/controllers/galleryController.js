var app = angular.module("buzzrApp", []);

var buzzes = []
// Setting up leap motion controller
var controllerOptions = {enableGestures: true};
var time = new Date().getTime(),
    threshold = 500,
    loopcontroller = new Leap.Controller(controllerOptions);
loopcontroller.connect();

app.controller("galleryController", function ($scope, $sce) {
    var cur_time = new Date();
    var prev_time = new Date();
    $scope.buzzes = [];
    $scope.header = "";
    $scope.likes = [];
    prev_time.setDate(prev_time.getDate() - 1);

    $scope.toTrusted = function (htmlCode) {
        var out = htmlCode.replace(/&#(\d+);/g, function (m, n) { return String.fromCharCode(n); });
        console.dir(out);
        return out;
    };

    loopcontroller.on("gesture", function(gesture){
        if(gesture.type === "swipe"){
            var leng = $("#myGallery img").length;
            if(!$scope.buzzes) {
                console.dir($($("#myGallery img")[leng - 1]).attr("data-done"));
                $("#myGallery").html("You are done! Wait 24 hours.");
            }

            var now = new Date().getTime();
            if(now - time > 500){
                if(gesture.direction[0] > 0) {
                    // right case
                    console.dir("swipe right");
                    $($("#myGallery img")[leng-1]).show("slide", { direction: "left" }, 1000);
                    $scope.likes.push($scope.buzzes.pop());
                } else {
                    // left case
                    console.dir("swipe left");
                    $scope.buzzes.pop();
                }
                time = now;
                $scope.header = $scope.toTrusted($scope.buzzes[$scope.buzzes.length-1].title)
                $scope.$apply();
            }
        }
    });
    $.ajax({
        url: "http://www.buzzfeed.com/buzzfeed/api/buzzes?since=" + Math.floor(prev_time.getTime() / 1000 )+ "&until=" + Math.floor(cur_time.getTime() / 1000) + "&session_key=4621030e12e085226f2cba99d0b19f1a2cc1337b9c7ed8fd91668ec97d1e844ehackathon3",
        async: false,
        dataiType: "json"
    }).done( function (e) {
        $scope.buzzes.push(e.buzzes);
        $scope.buzzes = $scope.buzzes[0];
        $scope.header = $scope.toTrusted($scope.buzzes[$scope.buzzes.length-1].title)
        buzzes = $scope.buzzes;
    });
});

