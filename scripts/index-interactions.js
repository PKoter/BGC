/**
 * Invoked, when click event happens on meme rating buttons, and steers meme rating. Saves result.
 */
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
/**
 * Increments or decrements votes basing on num.
 * @param {any} t 
 * @param {any} badge - object with vote number
 * @param {any} num - value determined by load function. Equals -1, 1 or 2 
 */
function incVotes(t, badge, num){
    if(t.attr("value") == "nicey"){
        badge.html(num + Number(badge.html()));
    }
    else{
        badge.html( Number(badge.html()) - num);
    }
}

/**
 * returns meme from memes of name
 * @param {any} memes 
 * @param {any} name 
 * @returns 
 */
function getMem(memes, name){
    for(var i = 0; i < memes.length; i++){
        if(memes[i].name === name){
            return memes[i];
        }
    }
}

/**
 * sets mem rating, vote type and saves memes to localStorage
 * @param {any} memes - array of memes
 * @param {any} mem - meme object being voted on.
 * @param {any} badge
 * @param {any} votetype
 */
function saveMemes(memes, mem, badge, votetype){
    if(typeof(Storage) !== "undefined"){
        mem.rating = Number(badge.html());
        mem.vote = votetype;
        localStorage.setItem("memes", JSON.stringify(memes));
    }
}