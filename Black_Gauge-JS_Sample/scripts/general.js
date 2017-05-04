var snd = new Audio("music/astley.mp3");
snd.loop = true;
snd.autoplay = false;
snd.volume = 1;
var start_complaints = [
    {name: "Gandalf", comment: "Najlepsza strona na świecie. Serdecznie polecam!"},
    {name: "Bezimienny", comment: "Ta strona jest bardziej epicka niż moje przygody w Górniczej Dolinie."}
];

window.onload = function(){
    var guzik = document.getElementById('przycisk');
    var hrefs = document.getElementsByTagName('a');
    for (var i=0;i<hrefs.length;i++){
        hrefs[i].onclick = function(){
            changesite(this.className);
        };
    }
    var guzik2 = document.getElementById('newComplaint');
    guzik2.onclick = newComplaint;
    guzik.onclick = hlep;
    myMove();
    //refresh();
};

function hlep(){
    snd.play();
    
    var cname = document.getElementById('cname').value;
    var comment = document.getElementById('content').value;
    
    var temp = localStorage.getItem('gauge_comments');
    
    var newcom = {name: cname, comment: comment};
    
    temp+=newcom;
    localStorage.setItem('gauge_comments',temp);
    
    var elem1 = document.getElementById('formularz');
    var elem2 = document.getElementById('nosacz');
    var elem3 = document.getElementById('animate'); 
    var elem5 = document.getElementById('newform');
    elem1.style.display = "none";
    elem2.style.display = "block";
    elem3.style.display = "block";
    elem5.style.display = "block";
    
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
        size1 = screen.width;
        size2 = screen.height;
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

function changesite(zm) {
    if (zm === "old" || zm === "new"){
        if (zm === "old") refresh();
        var neew = document.getElementById('new');
        var old = document.getElementById('old');
        neew.style.display = "none";
        old.style.display = "none";
        var ch = document.getElementById(zm);
        ch.style.display = "block";
    }
}

function newComplaint(){
    snd.pause();
    var elem1 = document.getElementById('formularz');
    var elem2 = document.getElementById('nosacz');
    var elem3 = document.getElementById('animate');
    var elem5 = document.getElementById('newform');
    elem1.style.display = "block";
    elem2.style.display = "none";
    elem3.style.display = "none";
    elem5.style.display = "none";
    return false;
}

function refresh(){
    var complaints = start_complaints;
    if (typeof(Storage) !== "undefined") {
        var elem = document.getElementById('allcomplains');
        elem.innerHTML = null;
        var extra_complaints = localStorage.getItem('gauge_comments');

        if (extra_complaints !== null) complaints += extra_complaints;

        for (var i=0;i<complaints.length;i++){
            elem.innerHTML += `<div class="complaint">
            <p class="name">` + complaints[i].name + `</p>
            <p class="content">` + complaints[i].comment + `</p>
            </div>`;
        }
    } else {
        alert('Pamięć podręczna nie jest obsługiwaną przez Twoją przeglądarkę. Proponujemy zainstalować coś lepszego niż Internet Explorer 2.0');
    }
}

function new_complain(){
    
}