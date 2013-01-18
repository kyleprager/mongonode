var $ = require('jquery');

exports.list = function(req, res) {
	var q = req.param("q"),
		start = req.param("start");
	
	if (!q) q = "kyle";
	if (!start) start = 0;
	
	search(q, start, function(links) {
	    var obj = {
                title: "Google Search",
                links: links,
                q: q
            }
        res.render('search', obj);
	});
};

exports.search = function(req, res) {
    var q = req.param("q"),
		start = req.param("start");
	
	if (!q) q = "kyle";
	if (!start) start = 0;
	
	search(q, start, function(links) {
	    res.send({
	        links: links,
	        q: q
	    });
	});
};

var search = function(q, start, callback) {
    $.get("https://www.google.com/search?q=" + q + "&start=" + start, function(data) {
	
		var links = [];
		
		var csspath = "li.g";
		$.each($(data).find(csspath), function() {
			var titlelink = $(this).find("h3.r");
			var href = titlelink.find("a").attr("href");
			href = "https://www.google.com" + href;
			titlelink.find("a").attr("href", href);
			var urltext = $(this).find("div.s cite");
			var description = $(this).find("div.s span.st");
			var images = $(this).find("div");
			

            if (images.find("img").length) {
                $.each(images.find("img"), function() {
                    var src = $(this).attr("src");
                    src = "https://www.google.com" + src;
                    $(this).attr("src", src);
                });
                
                $.each(images.find("a"), function() {
                    var src = $(this).attr("href");
                    src = "https://www.google.com" + src;
                    $(this).attr("href", src);
                });
                images = images.html();
            } else {
                images = null;
            }
			if (images) console.log(images);

			var obj = {
				a  : titlelink.html(),
				url	   : urltext.html(),
				description: description.html(),
				images : images
			}
			links.push(obj);
		});
		
		callback(links);
	});
};