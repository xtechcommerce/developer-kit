$(document).ready(function(){
    if ($('.filters').length>0) {
        // For IE and mobile
        $('.filters .main').click(function(e){
            e.preventDefault();
            $(this).next().show();
        });

        // Apply Filters
        $('.filters .sub').click(function(e){
            e.preventDefault();
            href = $(this).attr('href');
            if ($(href).prop('checked')==true) {
                $(href).prop('checked', false);
                $(this).removeClass('active');
                $(this).remove('.glyphicon');
            }else{
                if ($(this).parents('.order').length>0) {
                    $(this).parents('.order').find('.sub').removeClass('active');
                    $('.order_by_hidden').prop('checked', false);
                };
                $(href).prop('checked', true);
                $(this).addClass('active');
                $(this).prepend('<span class="glyphicon glyphicon-ok"></span> ');
            };
            $('#filter_form').submit();
        });
    };
    $('.price-filters .sub').click(function(e){
        e.preventDefault();
        $('input[name=price_min]').val($(this).data('min'));
        $('input[name=price_max]').val($(this).data('max'));
        var check = true;
        if ($(this).data('min') == '' && $(this).data('max') == '') {
            check = false;
        }
        $('input[name=price_min]').prop('checked', check);
        $('input[name=price_max]').prop('checked', check);
        $('#filter_form').submit();
    });
    $('.filters .sub').each(function(){
        href = $(this).attr('href');
        if ($(href).prop('checked')==true) {
            $(this).addClass('active');
            $(this).prepend('<span class="glyphicon glyphicon-ok"></span> ');
        };
    })
});