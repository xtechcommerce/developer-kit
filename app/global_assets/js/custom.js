$.fn.extend({
	mask_brazilian_phone: function() {
		$(this[0]).focusout(function(){
	    var phone, element;
	    element = $(this);
	    element.unmask();
	    phone = element.val().replace(/\D/g, '');
	    if(phone.length > 10) {
	        element.mask("(99) 99999-999?9");
	    } else {
	        element.mask("(99) 9999-9999?9");
	    }
	  	}).trigger('focusout');
	}
});


$(document).ready(function() {

	$('#search_engine').keyup(function(){
		$('#search_results').html('');
		run_category_query();
	});

	function run_category_query()
	{
		var baseurl = $('meta[name=baseurl]').attr("content");
		$.post(baseurl+"index.php/search/find/", { name: $('#search_engine').val(), limit:10},
			function(data) {
				if ($('#search_engine').val()=='') {
					$('#search_results').hide();
				};
				$('#search_results').html('');
				var count = 'Nenhum produto foi encontrado.';
				$.each(data, function(index, product){
					if (index=='count') {
						if (product==50) {
							count = 'Foram encontrados mais de '+product+' productos.';
						}else{
							count = 'Foram encontrados '+product+' productos.';
						}
					}else{
						$('#search_results').show();
						if($('#search_result_'+index).length == 0)
						{
							var saleprice = '';
							if (product.saleprice == '0.00') {
								saleprice = '<span class="saleprice">'+product.saleprice+'</span> ';
							};
							$('#search_results').append('<a href="'+baseurl+'index.php/product/'+ index +'" id="search_result_'+index+'">'+
								product.image +
								'<div class="desc"><span class="name">'+product.name+'</span>' +
								saleprice +
								'<span class="price">'+product.price+'</span></div>' +
								'</a>');
						}
					}
					
				});
				$('#search_results').append('<div class="last"><a href="#" onclick="$(this).parents(\'form:first\').submit()">Listar resultados<br />'+count+'</a></div>');
		}, 'json');
	}


});

