/**
 * geolocation start point.
 * Invoked by link click
 */
function locate(){
    if(navigator.geolocation){
        var options={ 
            enableHighAccuracy:true, 
            timeout:10000 
        };
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
    else {
        onError(null);
    }
}

/**
 * localization is successfull
 * @param {any} position - position parameter passed by browser
 */
function onSuccess(position){
    var lat= position.coords.latitude;
    var long = position.coords.longitude;
    var imgUrl = "http://maps.googleapis.com/maps/api/staticmap?center=" 
    + lat + "," + long+ "&zoom=15&size=400x400&sensor=false";
    document.getElementById("slenderman-local-map").src = imgUrl;
    document.getElementById("FSM-title").innerHTML = "Slenderman is in this region...";
}

/**
 * localization is unsuccessfull (either not supported or user-cancelled)
 * @param {any} error - @CanBeNull isn't used anywhere
 */
function onError(error){
    document.getElementById("slenderman-local-map").src = "slendermans_hideout.png";
    document.getElementById("FSM-title").innerHTML = "We were unable to determine accurate location of Slenderman...";
}