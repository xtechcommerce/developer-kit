// Shipping Form
$(document).ready(function(){

	mask_fields();

	$('#zip_code').delayKeyup(function(el){
		populate_frete(el.val(), true, true);
	}, 1000);
	
	$('#zip_code_submit').click(function(){
		populate_frete($('#zip_code_val').val(), false, true);
	});

	populate_frete($('#zip_code').val(), false, true);

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

function populate_frete(value, focus, update_address)
{
	if (value.length==9 && value.indexOf('_') == -1) {
		$('#shipping_table').html('<div class="loading"><i class="icon-refresh"></i> Calculando o frete</div>');
		$('#zip_code_val').val(value);
		var old_zip = $('#zip_code').val();
		var zip = value.replace("-", "");
		$.getJSON(busca_cep_url,{zip:zip}, function(data) {
			if(data["resultado"] == "1" && update_address){
				$('#zip_code').val(value);
			    $("#a_district").val(unescape(data["bairro"]));
			    $("#a_city").val(unescape(data["cidade"]));
			    $("#zone_id").val(unescape( eval("zone_map."+data["uf"]) ));
			    $("#a_street").val(unescape(data["logradouro"]));
			    if (focus) {
			    	$("#a_number").focus();
			    };
			}
			$.post(get_frete_url, {zip:zip,data:data,curr_shipping_code:$('#curr_shipping_code').val()}, function(fdata) {
				$('#shipping_table').html(fdata);
				$('#shipping_table input').change(function(){
					$('#curr_shipping_code').val($(this).val());
					update_cart($(this).val());
				});
			});
		});
	};
}


function mask_fields () {
	$('#phone').mask_brazilian_phone();
	$('#zip_code').mask("99999-999");
	$('#zip_code_val').mask("99999-999");
	$('#a_cnpj').mask('99.999.999/9999-99');
	$('#a_cpf').mask('999.999.999-99');
	$('#a_birthday').mask('99/99/9999');
}


// Address Form
function populate_address(address_id)
{
	if(address_id == '' || addresses.length==0 || typeof addresses[address_id] == 'undefined')
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
	mask_fields();
	populate_frete($('#zip_code').val(), false, false);
}