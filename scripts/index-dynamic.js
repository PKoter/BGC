$(function(){
    
    var memes = [
        { name: "http://i68.tinypic.com/majoti.png", comment:"", vote: null, rating:11 },
        { name: "http://i67.tinypic.com/2cf840g.png", comment:"", vote: null, rating:5 },
        { name: "http://i65.tinypic.com/23lnjns.jpg", comment:"", vote: null, rating:2 },
        { name: "https://preview.ibb.co/couKO5/YWf50_NNii3r4k.gif", comment:"", vote: null, rating:99 },
        { name: "http://i68.tinypic.com/2j1u06s.png", comment:"", vote: null, rating:23 }
    ];
    var memCount = memes.length;
    if(typeof(Storage) !== "undefined"){
        var count = localStorage.getItem("memCount");
        var ms = localStorage.getItem("memes");
        if(count >= memCount && ms != null){
            memes = JSON.parse(ms);
            memCount = count;
        }
        else{
            localStorage.setItem("memes", JSON.stringify(memes));
            localStorage.setItem("memCount", memCount);
        }
        var gallery = $(".meme-gallery");
        var content = "";
        var r = Array(5);
        for(var i = 0; i < memes.length; i++){
            content += getDynamicMeme(memes[i], r);
        }
        gallery.html(content);
        $("#mem-count").html(memCount);
    }
})

function getDynamicMeme(meme, r){
    var cnt = `<div class="meme">
        <img class="img-responsive" src="`+meme.name+`" alt="meme" />
        <div class="well well-layout">
            <div class="btn-group" data-toggle="buttons" set="{0}">
                <label class="btn btn-primary{1}">
                    <input type="radio" name="vote" value="nicey" autocomplete="off" {1.1}/><span class="glyphicon glyphicon-thumbs-up"></span> Nicey
                </label>
                <label class="btn btn-primary{2}">
                    <input type="radio" name="vote" value="nope" autocomplete="off" {2.1}/><span class="glyphicon glyphicon-thumbs-down"></span> Nope
                </label>
            </div>
            <div class="niceys-count">
                <span class="glyphicon glyphicon-fire"></span>  <span class="badge">`+meme.rating+`</span>
            </div>
        </div>
    </div>`;
    if(meme.vote === 'nicey'){
        r = [meme.vote, " active", "checked", "", ""];
    }
    else if(meme.vote === 'nope'){
        r = [meme.vote, "", "", " active", "checked"];
    }
    else{
        r = ["", "", "", "", ""];
    }
    cnt = cnt.replace("{0}", r[0]).replace('{1}', r[1]).replace("{1.1}", r[2]).replace("{2}", r[3]).replace("{2.1}", r[4]);
    return cnt;
}

function addMeme(){
    var mname = $("#meme-url").val();
    if(typeof(Storage) !== "undefined"){
        var memes = JSON.parse(localStorage.getItem("memes"));
        for(var i = 0; i < memes.length; i++){
            if(memes[i].name === mname)
                return;
        }
        var meme = {name:mname, comment:"", vote:null, rating: Math.round(Math.random()*33)}
        memes.push(meme);
        localStorage.setItem("memCount", memes.length);
        localStorage.setItem("memes", JSON.stringify(memes));
        var content = $(".meme-gallery").html();
        content += getDynamicMeme(meme, Array(5));

        $(".meme-gallery").html(content);
        $("#mem-count").html(memes.length);
        $("#meme-url").val("");
    }
}