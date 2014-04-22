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

	// Equalheight for homepage and category
	if ($('.product-list-item').length > 0) {
		$('.product-list-item .prod-info h3').equalHeights();
		$('.product-list-item .prod-info .price').equalHeights();
		$('.product-list-item .prod-image').equalHeights();
		$('.product-list-item .prod-wrapper').equalHeights();
	}

	$('.jqzoom').jqzoom({
		zoomType: 'innerzoom',
		title: false,
		lens: true,
		preloadImages: true,
		alwaysOn: false
	});

	$('.imgLiquidFill').imgLiquid({
		fill: false,
		horizontalAlign: "center",
		verticalAlign: "center"
	});

	search_current_selection = 0;
	search_current_url = '';

	$('#search-engine').focus(function(){
		if($('#search-results-in a').size() > 1){
			search_show();
		}
	});

	$('#top-search input').on('keyup', function(e){

		var key = e.keyCode;
		
		//Navegar pelo direcional do teclado
		if(key == 38 || key == 40 || key == 13){

			if($("#search-results a.up").size() == 0) search_current_selection = -1;
			switch(e.keyCode){
				// Para cima
				case 38:
					if(search_current_selection != -1 && search_current_selection != 0) search_current_selection--;
					break;
				// Para baixo
				case 40:
					if(search_current_selection != $("#search-results a").size()-1) search_current_selection++;
					break;
				// Enter
				case 13:
					if(search_current_url == '') $('#form-search').submit();
					if(search_current_url != '') document.location = search_current_url;
					break;
			}
			search_set_selected(search_current_selection);
		} else if(!((key >= 16 && key <= 20) || (key >= 33 && key <= 37) || key == 39 || key == 45 || (key >= 112 && key <= 145))){
			run_search_query();
		}

	});

});

search_show = function(){
	$('#search-results').show();
};

search_close = function(){
	$("body").click(function(event){
		var targ = $(event.target);
		if(!targ.is('#search-results') && !targ.is('#top-search input')){
			$('#search-results').hide();
			$('#search-loader').hide();
		}
	});
};

search_mouse_navigation = function(){
	$("#search-results a").hover(function(){
		if($(this).attr('id') != ''){
			search_current_selection = $(this).attr('id').substr(14);
			search_set_selected(search_current_selection);
		}
	}, function(){
		$("#search-results a").removeClass("up");
		search_current_url = '';
	});
};

search_set_selected = function(cur_selection){
	$("#search-results a").removeClass("up");
	$("#search-results a").eq(cur_selection).addClass("up");
	search_current_url = $("#search-results a").eq(cur_selection).attr("href");
};

run_search_query = function(){
	$('#search-loader').show();
	$.post(site_url.search_ajax, { name: $('#search-engine').val(), limit: 10 },
		function(data){
			$('#search-results-in').html('');
			var count = 'Nenhum produto foi encontrado.';
			var num = 0;
			$.each(data, function(index, product){
				if(index == 'count'){
					if(product == 50){
						count = 'Foram encontrados mais de '+product+' produtos.';
					} else{
						count = 'Foram encontrados '+product+' produtos.';
					}
				} else{
					$('#search-results').show();
					if($('.search-result-'+index).length == 0){
						var saleprice = '';
						var preco = '';
						var modelo = '';
						$.each(product.categories, function(){
							modelo = this.name;
						});
						if(product.saleprice == '0.00'){
							product_price = product.price.replace(".", ",");
							preco = '<span class="price">R$ '+product_price+'</span>';
						} else{
							product_saleprice = product.saleprice.replace(".", ",");
							product_price = product.price.replace(".", ",");
							preco = '<span class="price"><span class="saleprice">R$ '+product_price+'</span> R$ '+product_saleprice+'</span>';
						}
						$('#search-results-in').append('<a href="' + site_url.base + product.slug + '" id="search-result-' + num + '" class="search-result-' + index +'">' +
															'<div class="line">' +
																'<div class="image text-center">' +
																	product.image +
																'</div>' +
																'<div class="desc">' +
																	'<span class="name">' +
																		product.name +
																	'</span>' +
																	'<span class="category">'
																		+ modelo +
																	'</span> ' +
																	preco +
																'</div>' +
																'<div class="clearfix"></div>' +
															'</div>' +
														'</a>');
						num++;
					}
				}
			});
			$('#search-results-in').append('<div class="last text-center"><a href="#" onclick="$(\'#form-search\').submit();"><strong>Listar resultados</strong><br />'+count+'</a></div>');
			$('#search-loader').hide();
			search_show();
			search_mouse_navigation();
			search_close();
	}, 'json');
};