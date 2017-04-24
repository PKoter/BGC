/*$(function(){
    $("div[data-toggle='buttons'] label").off().click(function(e){
        var t = $(this).children("input");
        var badge = $(this).parent().next(".niceys-count").children("span.badge");
        var memName = $(this).parent().parent().prev().attr("src");
        var memes = localStorage.getItem("memes");
        var mem = getMem(memes, memName);
        var currentSet = $(this).parent().attr("set");
        if(currentSet !== t.attr("value")){
            if(currentSet == null)
                incVotes(t, badge, 1);
            else
                incVotes(t, badge, 2);
            $(this).parent().attr("set", t.attr("value"));
            saveMemes(memes, mem, badge);
        }
        else{
            $(this).removeClass('active');
            t.first().prop("checked", false);
            incVotes(t, badge, -1);
            $(this).parent().attr("set", null);
            saveMemes(memes, mem, badge);

            e.stopPropagation();
            e.preventDefault();
        }
    });
    /*
    $(".meme img").each(function(){
        
        var memName = $(this).attr("src");
        if(typeof(Storage) !== "undefined"){
            var memjson = localStorage.getItem(memName);
            if(memjson != null){
                var mem = JSON.parse(memjson);
                var vote = mem.vote;
                var group = $(this).next().children(".btn-group");
                group.first().attr("set", vote);
                var input = group.first().children("label");
                var imp;
                var num;
                if(vote === "nicey"){
                    imp = input.first();
                    num = 1;
                }
                else{
                    imp = input.last();
                    num = -1;
                }
                imp.addClass("active");
                var badge = imp.parent().next(".niceys-count").children("span.badge");
                badge.html(num + Number(badge.html()));
            }
        }
    })
    
});*/


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