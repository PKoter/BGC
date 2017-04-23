$(function(){
    $("div[data-toggle='buttons'] label").click(function(){
        /*
        var fireys = $("div div.niceys-count").children("span.badge");
        fireys.each(function(){
            var num = Number($(this).html());
            console.log(num);
            $(this).html(num+1);
        })
        */
        var t = $(this).children("input");
        var badge = $(this).parent().next(".niceys-count").children("span.badge");
        console.log(t.prop("checked"));
        if(t.attr("name") == "nicey"){
            badge.html(1 + Number(badge.html()));
        }
        else{
            badge.html( Number(badge.html()) - 1);
        }
    })
});
