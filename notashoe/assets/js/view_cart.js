// Shipping Form
$(document).ready(function(){

	$('#phone').mask_brazilian_phone();
	$('#zip_code').mask("99999-999");
	$('#zip_code_val').mask("99999-999");
	$('#a_cnpj').mask('99.999.999/9999-99');
	$('#a_cpf').mask('999.999.999-99');

	$('#zip_code').delayKeyup(function(el){

		populate_frete(el.val(), true);

	}, 1000);
	
	$('#zip_code_submit').click(function(){

		populate_frete($('#zip_code_val').val(), false);

	});

	populate_frete($('#zip_code').val(), false);

	$('.shippingwrap input').change(function(){

		update_cart($(this).val());

	});

	$('#person_fields_btn, #company_fields_btn').click(function(){

		if($('#company_fields').hasClass('hide')){

			$('#person_fields_btn').removeClass('hide');
			$('#company_fields_btn').addClass('hide');
			$('#person_fields').addClass('hide');
			$('#company_fields').removeClass('hide');

		} else{

			$('#person_fields_btn').addClass('hide');
			$('#company_fields_btn').removeClass('hide');
			$('#person_fields').removeClass('hide');
			$('#company_fields').addClass('hide');

		}

	});

	var has_errors = false;

	var options = {
	  onError: function(errors){
	    has_errors = true;
	  },
	  onValid: function(){
	  	has_errors = false;
	  }
	};
	
	$('#payment_tabs a.payment-method-nav').each(function(){
	    var $this = $(this);
	    $this.click(function (e){
	        e.preventDefault();
	        $this.tab('show');
	        var id = $('#payment_tabs div.payment-method.active').attr('id');
	        var method = id.split('-')[1];
	        $('input[name=module]').val(method);
	    });
	});

	$('#onepage_checkoutform').submit(function(e){

		var complete_name = $('#complete_name').val();
		var name_array = complete_name.split(' ');
		var firstname = name_array.slice(0, -1).join(' ');
		var lastname = name_array.slice(-1).join(' ');
		$('input[name=firstname]').val(firstname);
		$('input[name=lastname]').val(lastname);

	    $('#onepage_checkoutform').tinyValidation(options);
	    if(has_errors){
	         
	         e.preventDefault();
	         alert('Por favor, preencha todos os campos com * antes de prosseguir.');
	         return false;

	    } else{

	    	return true;

	    }
	});

});

$.fn.delayKeyup = function(callback, ms){
    var timer = 0;
    var el = $(this);
    $(this).keyup(function(){                   
    clearTimeout (timer);
    timer = setTimeout(function(){
        callback(el)
        }, ms);
    });
    return $(this);
};

function toggle_shipping(key)
{
	var check = $('#'+key);
	if(!check.attr('checked'))
	{
		check.attr('checked', true);
		update_cart(check.val());
	}
}

function update_cart(val, zip){
	$.post(update_cart_url,{shipping_method:val,zip:$('#zip_code').val(),ajax:true}, function(data){
		$('.shipping_cost').html(data);
	});
}

function populate_frete(value, focus)
{
	if (value.length==9 && value.indexOf('_') == -1){
		$('#shipping_table').html('<tr><td colspan="3"><i class="icon-refresh"></i> Carregando.</td></tr>');
		var zip = value.replace("-", "");
		$.getJSON(busca_cep_url,{zip:zip}, function(data){

			$("#a_district,#a_city,#zone_id,#a_street,#a_number").val('');

			if(data['resultado'] != "0"){
				$("#zone_id").val(unescape( eval('zone_map.'+data["uf"]) ));

				if(data["resultado"] == "1"){
				    $("#a_district").val(unescape(data["bairro"]));
				    $("#a_city").val(unescape(data["cidade"]));
				    $("#a_street").val(unescape(data["logradouro"]));
				    if (focus){
				    	$("#a_number").focus();
				    };
				}

			    $.post(get_frete_url, {zip:zip,data:data,curr_shipping_code:$('#curr_shipping_code').val()}, function(fdata){
					$('#shipping_table').html(fdata);
					$('#shipping_table input').change(function(){
						$('#curr_shipping_code').val($(this).val());
						update_cart($(this).val());
					});
				});
			} else {
				alert('CEP não existente. Tente novamente.');
			}
		});
	};
}



// Address Form
function populate_address(address_id)
{
	if(address_id == '')
	{
		return;
	}
	$.each(addresses[address_id], function(key, value){
		$('#address_id').val(address_id);
		$('.address[name='+key+']').val(value);
		if(key=='zone_id')
		{
			zone_id = value;
			$('#zone_id').val(zone_id);
		}
	});
	populate_frete($('#zip_code').val(), false);
}