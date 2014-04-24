var Checkout = {};

(function ($) {

    Checkout = function (options) {
        this.$email = $('#a_email');
        this.$btnSearchAddress = $('.btn-search-address');
        this.$zip = $('#zip_code');

        if (this.$email.length > 0) {
            this.$loginModal = $('#login_modal');
            this.$email.focusout(this.checkEmail);
            if (this.$email.val().length === 0) {
                this.$email.val(' ');
                this.$email.click(function(){ $(this).val(''); });
            }
        }

        that = this;

        mask_fields();
        this.$btnSearchAddress.click(function(e){ e.preventDefault(); searchAddress(true, true); });
        this.$zip.delayKeyup(function(){ searchAddress(true, true); }, 1000);
        searchAddress(false, true);
    };

    Checkout.prototype = {
        constructor: Checkout,
        checkEmail: function() {
            var email = that.$email.val();
            if (email.length > 5) {
                $.ajax({
                    url: site_url.base + 'cart/check_email',
                    type: 'GET',
                    data: {'email': email},
                    dataType: 'json',
                    success: function(data){
                        if (data.result) {
                            that.$loginModal.modal('show');
                            that.$loginModal.find('.alert-account-exists').removeClass('hide');
                            that.$loginModal.find('input[name=email]').val(email);
                        }
                    }
                });
            }
        },
    };

}(jQuery));

$(document).ready(function(){

    var Cart = new Checkout();

    $('.btn-open-login').click(function(e){
        e.preventDefault();
        $('#login_modal').modal('show');
    });

    $('.shippingwrap input').change(function(){
        update_cart($(this).val());
    });

    $('#person_fields_btn, #company_fields_btn').click(function(){

        if($('#company_fields').hasClass('hide')){
            $('#person_fields_btn, #company_fields').removeClass('hide');
            $('#company_fields_btn, #person_fields').addClass('hide');
        } else{
            $('#person_fields_btn, #company_fields').addClass('hide');
            $('#company_fields_btn, #person_fields').removeClass('hide');
        }

    });

    var has_errors = false;

    var validationOptions = {
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
        $('#onepage_checkoutform').tinyValidation(validationOptions);
        if(has_errors){
            e.preventDefault();
            alert('Por favor, preencha todos os campos com * antes de prosseguir.');
            return false;
        }else{
            $button = $(this).find('button[type=submit]');
            $button.blur();
            $button.addClass('disabled');
            $button.html('Carregando...');
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
        callback(el);
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


function searchAddress(focus, update_address) {
    value = that.$zip.val();
    if (value.length==9 && value.indexOf('_') == -1) {
        $('#shipping_table').html('<tr><td><div class="loading"><i class="icon-refresh"></i> Calculando o frete</div></td></tr>');
        var zip = value.replace("-", "");

        $('.btn-search-address').addClass('disabled');
        $('.btn-search-address').text('Buscando...');

        $.getJSON(busca_cep_url,{zip: zip}, function(data) {
            $('.btn-search-address').removeClass('disabled');
            $('.btn-search-address').text('Buscar endereço');

            if(data["resultado"] == "1" && update_address){

                $("input[name=district]").val(unescape(data["bairro"]));
                $("input[name=city]").val(unescape(data["cidade"]));
                $("select[name=zone_id]").val(unescape( eval("zone_map."+data["uf"]) ));
                $("input[name=address1]").val(unescape(data["logradouro"]));
                if (focus) {
                    $("input[name=anumber]").focus();
                }
            }
            $.post(get_frete_url, {zip: zip, data: data, curr_shipping_code: $('#curr_shipping_code').val()}, function(fdata) {
                $('#shipping_table').html(fdata);
                $('#shipping_table input').change(function(){
                    $('#curr_shipping_code').val($(this).val());
                    update_cart($(this).val());
                });
            });
        });
    }
}

function mask_fields() {
    $('#phone').mask_brazilian_phone();
    $('#zip_code').mask("99999-999");
    $('#zip_code_val').mask("99999-999");
    $('#a_cnpj').mask('99.999.999/9999-99');
    $('#a_cpf').mask('999.999.999-99');
    $('#a_birthday').mask('99/99/9999');
}

function populate_address(address_id) {
    if(address_id === '' || addresses.length === 0 || typeof addresses[address_id] == 'undefined')
    {
        return;
    }
    $('input[name=address_id]').val(address_id);

    $.each(addresses[address_id], function(key, value){
        if (key != 'cnpj') {
            $('.address[name='+key+']').val(value);
        }
        if(key=='zone_id')
        {
            zone_id = value;
            $('#zone_id').val(zone_id);
            
        }
    });

    mask_fields();
    searchAddress(false, false);
}