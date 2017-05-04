$(function(){
    
    var memes = [
        // comment this out for tests #if SLOW_INTERNET 

        { name: "http://i68.tinypic.com/majoti.png", comment:"", vote: null, rating:11 },
        { name: "https://s-media-cache-ak0.pinimg.com/564x/c9/b8/26/c9b82634650ee4d79dd7efa79c3ff6f7.jpg", comment:"", vote: null, rating:5 },
        { name: "http://i64.tinypic.com/124io39.png", comment:"", vote: null, rating:25 },
        { name: "https://preview.ibb.co/couKO5/YWf50_NNii3r4k.gif", comment:"", vote: null, rating:99 },
        { name: "http://i68.tinypic.com/2j1u06s.png", comment:"", vote: null, rating:23 }
    
    /*
        { name: "16dfdbd2.png", comment:"", vote: null, rating:11 },
        { name: "zyska_nigg1.png", comment:"", vote: null, rating:5 },
        { name: "promieniowanie_w_kiblu.png", comment:"", vote: null, rating:25 }
    */
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
                    <input type="radio" name="vote" value="nicey" autocomplete="off" {1.1}/><span class="glyphicon glyphicon-thumbs-up"></span><span class="space-hide-text"> Nicey</span>
                </label>
                <label class="btn btn-primary{2}">
                    <input type="radio" name="vote" value="nope" autocomplete="off" {2.1}/><span class="glyphicon glyphicon-thumbs-down"></span><span class="space-hide-text"> Nope</span>
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