// Save original favicon
var orig_favicon = $('#favicon').clone();

// Resolve relative links to absolute
// Taken from http://stackoverflow.com/a/12965135
function resolve(url, base_url) {
    var old_base = document.getElementsByTagName('base')[0],
        old_href = old_base && old_base.href,
        doc_head = document.head || document.getElementsByTagName('head')[0],
        our_base = old_base || doc_head.appendChild(document.createElement('base')),
        resolver = document.createElement('a'),
        resolved_url;
    our_base.href = base_url;
    resolver.href = url;
    resolved_url = resolver.href; // browser magic at work here

    if (old_base) old_base.href = old_href;
    else doc_head.removeChild(our_base);
    return resolved_url;
}

// Function to sync iframe's title and favicon to the main page
function changeTitle() {
    if (top.iframe.document.title) {
        top.document.title = top.iframe.document.title;
    } else {
        top.document.title = 'Loading...';
    }
    var icon;
    $('#iframe').each(function() {
        icon = $('link[rel="shortcut icon"]:first', this.contentWindow.document || this.contentDocument).clone();
        icon.attr('href', resolve(icon.attr('href'), top.iframe.document.location.href));
    });
    if (icon.attr('href')) {
        icon.attr('id', 'favicon');
    } else {
        icon = orig_favicon.clone();
    }
    $('#favicon').remove(); // Firefox bug : need to replace the element instead of changing href
    $('head').append(icon);
}

// Callback function for navbar links
// When link is clicked, load in iframe and change URL hash
function loadlink(link, event) {
    event.preventDefault();
    $("#loading").fadeIn("slow");
    window.location.hash = '#' + link.attr('counter');
    parent.iframe.location.href = link.attr('to');
    jQuery('#nav a.active').removeClass('active');
    link.addClass('active');
}

// Open a specific link if a URL hash is found
function loadfromhash() {
    if (window.location.hash) {
        var number = parseInt(window.location.hash.substring(1));
        if (number) {
            var link = $("#nav a:nth-of-type(" + number + ")");
            link.trigger("click");
        }
    }
}

// Parse JSON configuration
function parseconf(conf) {
    // Set navbar orientation
    if (conf.horizontal) {
        $("html").addClass("hn");
    } else {
        $("html").addClass("vn");
    }
    // Set navbar position
    if (conf.position) {
        $("html").addClass(conf.position);
    } else {
        $("html").addClass("left");
    }

    // Load start page
    if (conf.startpage) {
        parent.iframe.location.href = conf.startpage;
    } else {
        $("#loading").fadeOut("slow");
    }

    // Load links
    var a_counter = 1;
    $.each(conf.links, function(key, item) {
        if (item.url && item.icon) {
            var link = $("<a>" + item.icon + "</a>")
                .attr('counter', a_counter)
                .attr('href', "#" + a_counter++)
                .attr('to', item.url)
                .attr('title', item.title)
                .click(function(event) {
                    loadlink($(this), event)
                });
            $("#nav").append(link);
        } else {
            $("#nav").append('<span class="spacer"></span>');
        }
    });
}

jQuery(document).ready(function() {
    // When iframe is loaded, sync title and favicon
    jQuery("#iframe").load(function() {
        $("#loading").fadeOut("slow");
        changeTitle();
    });
    
    // Set a 1 second timeout if config.json hangs
    var noconftimeout = setTimeout('$("#noconfig").fadeIn("slow");', 1000);

    // Load config.json
    $.getJSON('config.json', function(conf) {
        if (conf.links) {
            clearTimeout(noconftimeout);
            parseconf(conf);
            loadfromhash();
            $("#noconfig").fadeOut("slow");
        } else {
            $("#noconfig").fadeIn("slow");
        }
    });

    // Sync title and favicon every 10 seconds
    var tid = setInterval(changeTitle, 10000);
    function abortTimer() {
        clearInterval(tid);
    }

    // Menu mouseover scroll if height > window
    jQuery('html.vn #nav').mousemove(function(e) {
        var h = $(this).height() + 13;
        var offset = $(this).offset();
        var position = (e.pageY - offset.top) / $(this).height();
        if (position < 0.33) {
            $(this).stop().animate({
                scrollTop: 0
            }, 2500);
        } else if (position > 0.66) {
            $(this).stop().animate({
                scrollTop: h
            }, 2500);
        } else {
            $(this).stop();
        }
    });
});
