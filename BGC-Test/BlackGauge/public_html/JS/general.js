var snd = new Audio("music/background.mp3");
snd.loop = true;
snd.autoplay = false;
snd.volume = 0.5;

window.onload = function(){
    snd.play();
    var guzik = document.getElementById('przycisk');
    guzik.onclick = hlep;
    myMove();
};

function hlep(){
    var elem1 = document.getElementById('formularz');
    var elem2 = document.getElementById('nosacz');
    elem1.style.display = "none";
    elem2.style.display = "block";
    return false;
}

function myMove() {
    var odwroc;
    var size1 = screen.width;
    var size2 = screen.height;
    var elem = document.getElementById("animate");
    var pos1 = size1/2;
    var pos2 = 0;
    var id = setInterval(frame, 5);
    function frame() {
        if (odwroc === true){
            pos1+= size1/1000;
            pos2-= size2/1000;
            elem.style.top = pos2 + 'px';
            elem.style.left = pos1 + 'px';
            if (pos1 >= size1/2){
                odwroc = false;
            }
        }
        else if (pos1 <= 0) {
            odwroc = true;
        } else {
            pos1-= size1/1000;
            pos2+= size2/1000;
            elem.style.top = pos2 + 'px';
            elem.style.left = pos1 + 'px';
        }
    }
}