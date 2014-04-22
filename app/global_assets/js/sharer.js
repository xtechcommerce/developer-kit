$(document).ready(function(){
    $('.share-product').click(function(e){
        e.preventDefault();
        $('.share-product').removeClass('active');
        $(this).addClass('active');
    });
    $('.twitterbtn-link').click(function(event) {
        $active = $('.share-product-list .active');
        var width  = 575,
            height = 300,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = 'https://twitter.com/share?url='+$active.data('link')+'&text='+$active.data('name'),
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;

        window.open(url, 'socialpopup', opts);
        return false;
    });
    $('.facebookbtn-link').click(function(e){
        $active = $('.share-product-list .active');
        var width  = 600,
            height = 600,
            left   = ($(window).width()  - width)  / 2,
            top    = ($(window).height() - height) / 2,
            url    = 'https://www.facebook.com/share.php?u='+$active.data('link'),
            opts   = 'status=1' +
                     ',width='  + width  +
                     ',height=' + height +
                     ',top='    + top    +
                     ',left='   + left;

        window.open(url, 'socialpopup_fb', opts);
        return false;
    });
});