var Checkout = {};

if (typeof(checkoutCallbacks) == 'undefined') {
    var checkoutCallbacks = $.Callbacks();
}

if (typeof(checkoutErrors) == 'undefined') {
    var checkoutErrors = false;
}

if (typeof(checkoutNoSubmit) == 'undefined') {
    var checkoutNoSubmit = false;
}

(function ($) {

    Checkout = function (options) {
        this.defaultOptions = {
            zonesMap: [],
            addresses: [],
            defaultAddress: false,
            installments: 12,
            currency_symbol: '$',
            total: 0,
            language: 'portugues',
            checkout_path: 'checkout',
            validate: []
        };

        this.options = $.extend({}, this.defaultOptions, options);

        this.country = $('#country_id').val();
        this.$email = $('#a_email');
        this.$btnSearchAddress = $('.btn-search-address');
        this.$zip = $('#zip_code');
        this.$shippingMethodRow = '.shippingwrap td, .shippingwrap input';
        this.$btnOpenLogin = $('.btn-open-login');
        this.$countrySelect = $('select[name=country_id]');
        this.$billCheckbox = $('.cart-bill-address .checkbox');
        this.$nameInputs = $('input[name=firstname], input[name=lastname]');
        this.$fullnameInputs = $('input[data-get=fullname]');

        this.$nameInputs.on('change', $.proxy(this.syncInputs, this));

        this.syncInputs();

        this.$billCheckbox.click(function(e){
            if($(e.target).is('input'))
            {
                $('.cart-bill-fields').toggle();
            }
        });

        var that = this;

        if (this.$countrySelect.length > 0 || this.country != 30) {
            this.$countrySelect.on('change', $.proxy(this.countryChange, this));
            this.toggleBrazilSpecificFields();
        }

        if (this.$email.length > 0) {
            this.$loginModal = $('#login_modal');
            this.$email.on('focusout', $.proxy(this.checkEmail, this));
            if (this.$email.val().length === 0) {
                this.$email.val(' ');
                this.$email.click(function(){ $(this).val(''); });
            }
            this.$btnOpenLogin.on('click', $.proxy(this.openLogin, this));
        }

        this.maskFields();

        this.$btnSearchAddress.on('click', $.proxy(this.doSearchAddress, this));
        $(document).on('click', this.$shippingMethodRow, $.proxy(this.setShipping, this));
        $(document).on('click', '.choose_address', $.proxy(this.chooseAddress, this));
        this.$zip.delayKeyup($.proxy(this.searchAddress, this, true, true), 1000);


        if (this.options.defaultAddress) {
            this.populateAddress(this.options.defaultAddress);
        }else{
            this.searchAddress(false, true);
        }

        this.updateCartCallback({total: this.options.total});

        $('#person_fields_btn, #company_fields_btn').click(function(){

            if($('#company_fields').hasClass('hide')){
                $('#company_fields, #person_fields_btn').removeClass('hide');
                $('#company_fields_btn').addClass('hide');
            } else{
                $('#company_fields, #person_fields_btn').addClass('hide');
                $('#company_fields_btn').removeClass('hide');
            }

        });

        $checkoutButton = $('#onepage_checkoutform').find('button[type=submit]');
        var oldcontent = $checkoutButton.html();

        $('#payment_tabs a.payment-method-nav').each(function(){
            var $this = $(this);
            $this.on('click', function (e){
                e.preventDefault();
                $this.tab('show');
                id = $('#payment_tabs div.payment-method.active').attr('id');
                module = id.split('-')[1];
                setTimeout(function(){
                    $('input[name="module"]').val(module);
                }, 300);
                that.setPaymentDiscount(module);
                //Pay-block
                block = $(this).data('payblock');
                if (block != '' && typeof block != 'undefined') {
                    $checkoutButton.addClass('disabled');
                } else {
                    $checkoutButton.removeClass('disabled');
                }
            });

            // Force update cart if this method has discount, for example
            if($this.parent().hasClass('active')){
                $this.trigger('click');
            }
        });

        $('#onepage_checkoutform').submit($.proxy(function(e){
            $checkoutButton.blur();

            that = this;
            inputErrors = false;
            $.each(this.options.validate, function(key, value){
                if(inputErrors === false){
                    var el = $('#onepage_checkoutform');
                    if (el.find('[name=' + value + ']').attr('type') === 'radio' && el.find('[name=' + value + ']:checked').length === 0) {
                        inputErrors = lang['radio_not_selected'] + '"' + lang[value] + '"!';
                    }else if(el.find('[name=' + value + ']').val() === '') {
                        inputErrors = lang['field_not_filled'] + '"' + lang[value] + '"!';
                    }
                }
            });

            if (inputErrors !== false) {
                e.preventDefault();
                alert(inputErrors);
                return false;
            }

            $checkoutButton.addClass('disabled');
            $checkoutButton.html(lang['loading']);

            checkoutCallbacks.fire('checkout');

            if (checkoutErrors === false) {
                
                if (checkoutNoSubmit === false) {
                    return true;
                }else{
                    e.preventDefault();
                    return false;
                }

            }else{
                $checkoutButton.removeClass('disabled');
                $checkoutButton.html(oldcontent);

                e.preventDefault();
                alert(checkoutErrors);
                return false;
            }
        }, this));
    };

    Checkout.prototype = {
        constructor: Checkout,
        setPaymentDiscount: function(module){
            $.post(site_url.base + 'checkout/set_payment_method/'+this.options.checkout_path, {module: module}, $.proxy(this.updateSummary, this), 'json');
        },
        money: function(money) {
            money = parseFloat(money);
            money = money.toFixed(2).replace('.', ',');
            return this.options.currency_symbol + ' ' + money;
        },
        syncInputs: function() {
            if (this.$nameInputs.length === 2 && this.$fullnameInputs.length > 0) {
                var fullname = $(this.$nameInputs[0]).val();
                fullname = fullname + ' ' + $(this.$nameInputs[1]).val();
                this.$fullnameInputs.val(fullname);
            }
        },
        countryChange: function() {
            this.country = this.$countrySelect.val();
            this.toggleBrazilSpecificFields();
            this.searchAddress();

            $('select[name=zone_id]').html('<option>'+ lang['loading'] +'</option>');
            $.post(site_url.base + 'locations/get_zone_menu', {id: this.country}, function(data) {
                $('select[name=zone_id]').html(data);
            });
        },
        toggleBrazilSpecificFields: function() {
            if (this.country != 30 && this.language != 'portugues') {
                // Remove cpf validation
                var iov = this.options.validate.indexOf('cpf');
                if (iov > -1) {
                    this.options.validate.splice(iov, 1);
                }

                $('.brasil-only').addClass('hide');
                $('.other-countries').removeClass('hide');
                $('#phone').unmask();
            }else{
                this.options.validate.push('cpf');

                $('.brasil-only').removeClass('hide');
                $('.other-countries').addClass('hide');
                $('#phone').mask_brazilian_phone();
            }
        },
        openLogin: function(e) {
            e.preventDefault();
            $('#login_modal').modal('show');
        },
        chooseAddress: function(e) {
            e.preventDefault();
            var address_id = $(e.target).data('address');
            this.populateAddress(address_id);
        },
        populateAddress: function(address_id) {
            if(address_id === '' || this.options.addresses.length === 0 || typeof this.options.addresses[address_id] == 'undefined')
            {
                return;
            }
            $('input[name=address_id]').val(address_id);

            $.each(this.options.addresses[address_id], function(key, value){
                if (key != 'cnpj') {
                    $('.address[name='+key+']').val(value);
                }
                if (key == 'zip') {
                    $('#zip_code').val(value);
                }
                if(key=='zone_id')
                {
                    zone_id = value;
                    $('#zone_id').val(zone_id);
                    
                }
            });

            this.maskFields();
            this.searchAddress(false, false);
        },
        maskFields: function() {
            if (this.country == 30) {
                $('#phone').mask_brazilian_phone();
            }else{
                $('#phone').unmask();
            }
            $('#zip_code').mask("99999-999");
            $('#zip_code_val').mask("99999-999");
            $('#a_cnpj').mask('99.999.999/9999-99');
            $('#a_cpf').mask('999.999.999-99');
            $('#a_birthday').mask('99/99/9999');
        },
        updateSummary: function(data) {
            $('.shipping_cost').html('<span class="total">'+ lang['summary_total'] +': '+this.money(data.total)+'</span>');
            if ($('#checkout_summary').length > 0) {
                $('#checkout_summary').html(data.summary);
            }
            if (data.shipping_cost > 0) {
                $('.shipping_cost').append(' <span class="shipping">('+this.money(data.subtotal)+' + '+ lang['summary_shipping'] +': '+this.money(data.shipping_cost)+')</span>');
            }
            checkoutCart = data;
            this.updateCartCallback(data);
        },
        updateCart: function(method, e) {
            $.post(site_url.base + 'checkout/set_shipping_method/'+this.options.checkout_path, {shipping_method: method, zip: $('#zip_code').val()}, $.proxy(this.updateSummary, this), 'json');
        },
        updateCartCallback: function(data) {
            var that = this;
            $updateTriggers = $('[data-update=cart]');
            $updateTriggers.each(function(){
                eval($(this).data('calc') + '({installments: '+that.options.installments+', shipping_cost: '+data.shipping_cost+', subtotal: '+data.subtotal+', discount: '+data.discount+', total: '+data.total+'});');
            });
        },
        setShipping: function(e) {
            e.stopPropagation();
            $check = $(e.target).closest('tr').find('input');
            if(!$check.attr('checked') || $(e.target).is('input'))
            {
                $check.attr('checked', true);
                this.updateCart($check.val());
                this.payBlock();
            }
        },
        payBlock: function(){
            var s_checked = $('#shipping_table input[name="shipping_method"]:checked');
            var module = s_checked.data('paymodule');
            if (s_checked.length == 0 || module == '') {
                $('.payment-method').css('height', 'auto');
                $('.tab-pane .pay-block-mask').remove();
                $('.payment-method-nav').css('color', '#000');
                $('.cart-actions button').removeClass('disabled');
                $('.payment-method-nav').attr('data-payblock', '');
            } else {
                $('.payment-method-nav').css('color', '#ccc');
                $('.payment-method-nav').attr('data-payblock', 'true');
                $('.payment-method').css('height', '100px');
                $('.tab-pane').append('<div class="pay-block-mask" style="background: #efefef; height: 100px; position: absolute; top: 0px; width: 100%;"><p style="color: #888; font-weight: bold; padding: 40px 0; text-align: center;">Meio de pagamento indisponível para esta forma de envio.</p></div>');
                $('.payment-method-nav[href="#payment-'+module+'"]').css('color', '#000');
                $('.payment-method-nav[href="#payment-'+module+'"]').attr('data-payblock', '');
                $('.payment-method-nav[href="#payment-'+module+'"]').trigger('click');
                $('#payment-'+module+' .pay-block-mask').remove();
                $('#payment-'+module).css('height', 'auto');
            }
        },
        doSearchAddress: function(e) {
            e.preventDefault();
            this.searchAddress(true, true);
        },
        searchAddress: function(focus, update_address, event) {
            var that = this,
                address = {country: this.country, zip: this.$zip.val()};

            if (address.country == 30) {
                $('input[name=zip]').val(address.zip);
    
                if (address.zip.length==9 && address.zip.indexOf('_') == -1) {
                    $('#shipping_table').html('<tr><td><div class="loading"><i class="icon-refresh"></i> Calculando o frete</div></td></tr>');
                    address.zip = address.zip.replace("-", "");
    
                    var last_btn_address_text = $('.btn-search-address').text();
                    $('.btn-search-address').addClass('disabled');
                    $('.btn-search-address').text('Buscando...');
    
                    $.getJSON(site_url.base + 'shipping/busca_cep', {zip: address.zip}, function(data) {
                        $('.btn-search-address').removeClass('disabled');
                        $('.btn-search-address').text(last_btn_address_text);
    
                        if(data["resultado"] == "1" && update_address){
    
                            $("input[name=district]").val(unescape(data["bairro"]));
                            $("input[name=city]").val(unescape(data["cidade"]));
                            $("select[name=zone_id]").val(unescape( that.options.zonesMap[data["uf"]] ));
                            $("input[name=address1]").val(unescape(data["logradouro"]));
                            if (focus) {
                                $("input[name=anumber]").focus();
                            }
                        }

                        data["country"] = address.country;

                        $.post(site_url.base + 'shipping/get_frete', {zip: address.zip, address: data}, function(fdata) {
                            $('#shipping_table').html(fdata);
                            if ($('#shipping_table input').length == 1) {
                                $('#shipping_table input').prop('checked', true);
                            }
                            if ($('#shipping_table input:checked').length > 0) {
                                that.updateCart($('#shipping_table input:checked').val());
                            }
                            that.payBlock();
                        });
                    });
                }
            }else{
                $.post(site_url.base + 'shipping/get_frete', {address: address}, function(fdata) {
                    $('#shipping_table').html(fdata);
                    if ($('#shipping_table input').length == 1) {
                        $('#shipping_table input').prop('checked', true);
                    }
                    if ($('#shipping_table input:checked').length > 0) {
                        that.updateCart($('#shipping_table input:checked').val());
                    }
                });
            }
        },
        checkEmail: function() {
            var email = this.$email.val();
            if (email.length > 5) {
                var that = this;
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

function populate_address(id) {
    
}

function toggle_shipping(key){
    
}
