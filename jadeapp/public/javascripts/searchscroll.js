var ctr = 1;
var search_term;

var getMoreResults = function(q, start) {
    $.get("/glist?q=" + q + "&start=" + start, function(data) {
        var block = "";
        $.each(data.links, function() {
            var str = "<hr class='fade' /><div class='result'>";
            if (this.a)   str += "<p class='a'>" + this.a + "</p>";
            if (this.url) str += "<p class='url'>" + this.url + "</p>"
            if (this.description) str+= "<p class='description'>" + this.description + "</p>";
            if (this.images) str+= "<p class='images'>" + this.images + "</p>";
            str += "</div>";
            block += str;
        });
        $("div#list").append(block);
    }); 
};


$(window).scroll(function(){
    if  ($(window).scrollTop() == $(document).height() - $(window).height()){
        getMoreResults(search_term, ctr++ * 10);
    }
});


/**
 * SETUP READY FUNCTIONS
 */
$(function() {
    search_term = $("#search_box").val();

    $("#search_box").keyup(function(event){
        if(event.keyCode == 13){ // "Enter" was pressed
            search_term = $(this).val();
            window.location.replace("/g?q=" + encodeURIComponent(search_term));
            
            // $("div#list").html("");
//             ctr = 1;
//             getMoreResults(search_term, 0);
        }
    });
});