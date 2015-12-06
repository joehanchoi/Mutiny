//Reusable non plugin stuff goes in app
(function (win, doc) {
    'use strict';
    var app = app || {
        _isSafari : null,
        _isMobile : null,
        _searchedTag : null
    };

    app.isSafari = function(){
        if(app._isSafari === null){
            var userAgent = navigator.userAgent;
            var chrome = userAgent.indexOf('Chrome');
            var safari = userAgent.indexOf('Safari');

            if(safari != -1 &&  chrome == -1){
                app._isSafari = true;
            }else{
                app._isSafari = false;
            };
        }

        return app._isSafari;
    }


    app.isMobile = function(){
        if(app._isMobile === null){
            var mobileDevices = /(Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini)/i;
            if(mobileDevices.test(navigator.userAgent)){
                app._isMobile = true;
            }else{
                app._isMobile = false;
            };
        };

        return app._isMobile;
    }

    app.replaceAll = function(str,find,replace){
        return str.replace(new RegExp(find, 'g'), replace);
    }

    app.elemExists = function(elem){
        elem = $(elem);

        if(elem.length > 0){
            return true;
        }else{
            return false;
        };
    }



    app.getTag = function(elem){

        if(app._searchedTag === null){
            if(app.elemExists(elem)){
                var url = window.location.href;
                var splitURL = url.split('tag');
                var tag = app.replaceAll(splitURL[1],'/','');
                var tagFirstChar;

                tag = app.replaceAll(tag,'-',' ');
                tagFirstChar = tag.charAt(0).toUpperCase();
                tag = tagFirstChar + tag.substring(1,tag.length);

                app._searchedTag = tag;
            };
        };

        return app._searchedTag;
    }

    window.app = app;

})(window, document);



(function($) {
    'use strict';
    var $document = $(document);

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

    });

    function hexc(colorval) {
        var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        delete(parts[0]);
        for (var i = 1; i <= 3; ++i) {
    	    parts[i] = parseInt(parts[i]).toString(16);
	    if (parts[i].length == 1) parts[i] = '0' + parts[i];
        }
        return '#' + parts.join('');
    }

    //Check what page, check if link is in navbar, if true set to active.

    var navBG;

    //Get the tag searched for
    if(app.getTag('#tag-search') !== null){
        $('#tag-search').html(app.getTag('#tag-search'));
    };

})(jQuery);



