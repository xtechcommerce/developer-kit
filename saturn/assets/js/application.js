$.fn.extend({
	mask_brazilian_phone: function(){
		$(this[0]).focusout(function(){
			var phone, element;
			element = $(this);
			element.unmask();
			phone = element.val().replace(/\D/g, '');
			if(phone.length > 10){
				element.mask("(99) 99999-999?9");
			} else{
				element.mask("(99) 9999-9999?9");
			}
		}).trigger('focusout');
	}
});

$(document).ready(function(){
	$('.show-search').click(function(e){
		e.preventDefault();
		$('#search').show();
	});
	$('.close-search').click(function(e){
		e.preventDefault();
		$('#search').hide();
	});
	$('li.dropdown').hover(function(e){
		if ($('button.navbar-toggle').is(':hidden')) {
			$(this).addClass('open');
		}
	}, function(){
		if ($('button.navbar-toggle').is(':hidden')) {
			$(this).removeClass('open');
		}
	});
	$('[data-toggle=tooltip]').tooltip();
});