$(function(){
    $(".meme-gallery").off().on('click', "div[data-toggle='buttons'] label",function(e){
        var t = $(this).children("input");
        var badge = $(this).parent().next(".niceys-count").children("span.badge");
        var memName = $(this).parent().parent().prev().attr("src");
        var memes = JSON.parse(localStorage.getItem("memes"));
        var mem = getMem(memes, memName);
        var currentSet = $(this).parent().attr("set");
        var votetype = t.attr("value");
        if(currentSet !== votetype){
            if(currentSet == null || currentSet == "")
                incVotes(t, badge, 1);
            else
                incVotes(t, badge, 2);
            $(this).parent().attr("set", votetype);
            saveMemes(memes, mem, badge, votetype);
        }
        else{
            $(this).removeClass('active');
            t.first().prop("checked", false);
            incVotes(t, badge, -1);
            $(this).parent().attr("set", null);
            saveMemes(memes, mem, badge, votetype);

            e.stopPropagation();
            e.preventDefault();
        }
    });
});
function incVotes(t, badge, num){
    if(t.attr("value") == "nicey"){
        badge.html(num + Number(badge.html()));
    }
    else{
        badge.html( Number(badge.html()) - num);
    }
}

function getMem(memes, name){
    for(var i = 0; i < memes.length; i++){
        if(memes[i].name === name){
            return memes[i];
        }
    }
}

function setMem(memes, mem){
    for(var i = 0; i < memes.length; i++){
        if(memes[i] === mem)
            memes[i] = mem;
    }
}

function saveMemes(memes, mem, badge, votetype){
    if(typeof(Storage) !== "undefined"){
        mem.rating = Number(badge.html());
        mem.vote = votetype;
        localStorage.setItem("memes", JSON.stringify(memes));
    }
}