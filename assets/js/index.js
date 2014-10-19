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