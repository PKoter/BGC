$(function(e){
    $("div[data-toggle='buttons'] label").click(function(){
        var t = $(this).children("input");
        var badge = $(this).parent().next(".niceys-count").children("span.badge");
        var memName = $(this).parent().parent().prev().attr("src");
        var currentSet = $(this).parent().attr("set");
        if(currentSet !== t.attr("name")){
            if(currentSet == null)
                incVotes(t, badge, 1);
            else
                incVotes(t, badge, 2);
            $(this).parent().attr("set", t.attr("name"));
            if(typeof(Storage) !== "undefined"){
                var mem = { name: memName, comment:"", vote: t.attr("name") };
                localStorage.setItem(memName, JSON.stringify(mem));
            }
        }
        else{
            $("*").removeClass('active');
            t.prop("checked", false);
            incVotes(t, badge, -1);
            $(this).parent().attr("set", null);
            if(typeof(Storage) !== "undefined"){
                localStorage.removeItem(memName);
            }
        }
    });
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
});

function incVotes(t, badge, num){
    if(t.attr("name") == "nicey"){
        badge.html(num + Number(badge.html()));
    }
    else{
        badge.html( Number(badge.html()) - num);
    }
}