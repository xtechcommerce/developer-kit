var ProductVariants = {};

(function ($) {

    ProductVariants = function (element, options) {
        this.variant_validation_msg = 'Por favor selecione todos opções do produto para continuar a compra.';
        this.defaultOptions = {
            container: 'body',
            customInput: 'input[name=variant_id]',
            disableClass: 'disabled',
            variant_map: [],
            variant_map_keyed: [],
            allow_os_purchase: true,
            button_selects: false,
            validationSuccess: function() {},
            validationOutofstock: function() {},
            validationNotAvailable: function() {},
            validationRequiredOption: function() {}
        };

        this.options = $.extend({}, this.defaultOptions, options);
        this.$wrapper = $(element);
        this.$container = $(this.options.container);
        this.$reminderForm = this.$container.find('.remindme-form');

        if (this.$reminderForm.length > 0) {
            this.options.disableClass = 'variant-unavailable';
        }

        $selects = this.$wrapper.find('.product_option');
        $selects.on('change', $.proxy(this.toggle_variant_form, this));
        $('.buy-btn').on('click', $.proxy(this.buy, this));
        this.toggle_variant_form();

        if (this.options.button_selects) {
            this.init_button_select();
        }
    };

    ProductVariants.prototype = {
        constructor: ProductVariants,
        buy: function(e) {
            e.stopImmediatePropagation();
            $(e.target).blur();
            if ($(e.target).hasClass('buy-btn-disabled')) {
                alert(this.variant_validation_msg);
                return false;
            }
        },
        init_button_select: function () {
            that = this;

            $('.prod-variant-li:first-child').find('.prod-variant-btn').each(function(){
                if(typeof that.options.variant_map_keyed[$(this).data('id').toString()] != 'undefined'){
                    $(this).removeClass(that.options.disableClass);
                }else{
                    $(this).addClass(that.options.disableClass);
                }
            });

            $('.prod-variant-btn').click(function(e){
                e.preventDefault();
                self = $(this);
                self.addClass('active').parent().siblings().find('.prod-variant-btn').removeClass('active');
                $('.product_option option[value='+self.data('id')+']').prop('selected', true);
                  
                if(self.closest('.prod-variant-li').is(':first-child') == true){
                  var options_available = that.options.variant_map_keyed[self.data('id')];
                  $('.prod-variant-btn').each(function(){
                    if($(this).closest('.prod-variant-li').is(':first-child') == false){
                      if($.inArray($(this).data('id').toString(), options_available) > -1){
                          $(this).removeClass(that.options.disableClass);
                      }else{
                        $(this).addClass(that.options.disableClass);
                      }
                    }
                  });
                }

                self.blur();
                that.toggle_variant_form();
            });

            $('.prod-variant-btn[data-id='+$('.product_option option:selected').val()+']').addClass('active');
        },
        toggle_variant_form: function () {

            var selected = new Array(); var qty_sel = 0;
            var qty = this.$wrapper.find('.product_option').length;
            this.$wrapper.find('.product_option option:selected').each(function(){
                selected.push($(this).val());
                if ($(this).val().length > 0) {
                    qty_sel++;
                }
            });

            var selected_key = selected.sort(function(a, b){return a-b}).join('_');

            if(this.options.variant_map[selected_key]) {
                var variant_price = parseFloat(this.options.variant_map[selected_key].price_num);
                if ($('.variant_price').length > 0) {
                    if (variant_price > 0) {
                        $('.variant_price').text(this.options.variant_map[selected_key].price);
                        $('.variant_price').show();
                        $('.product_price').hide();
                    }else{
                        $('.variant_price').hide();
                        $('.product_price').show();
                    }
                }

                if (parseInt(this.options.variant_map[selected_key].quantity) > 0 || this.options.allow_os_purchase > 0) {
                    this.validation_success(selected_key);
                    this.options.validationSuccess.call(this);
                }else{
                    this.validation_fail('Outofstock', 'Indisponível.', 'Esta opção esta indisponível, por favor selecione outra.', selected_key);
                    this.options.validationOutofstock.call(this);
                }
            } else {
                if(qty == qty_sel){
                    this.validation_fail('NotAvailable', 'Indisponível.', 'Esta opção esta indisponível, por favor selecione outra.');
                    this.options.validationNotAvailable.call(this);
                } else{
                    this.validation_fail('RequiredOption', 'Escolha uma opção.', 'Por favor selecione todos opções do produto para continuar a compra.');
                    this.options.validationRequiredOption.call(this);
                }
            }
        },
        validation_success: function (selected_key) {
            if ($('#not_available').length > 0) {
                $('#buy_btn').show();
                $('#not_available').hide();
            }
            this.$reminderForm.addClass('hide');
            this.$container.find('.buy-btn').removeClass('buy-btn-disabled');
            this.$container.find(this.options.customInput).val(this.options.variant_map[selected_key].id);
            this.$container.find('.buy-message').addClass('hide');
        },
        validation_fail: function (errorcode, error, error_description, selected_key) {
            if (errorcode === 'Outofstock' && $('#not_available').length > 0) {
                $('#buy_btn').hide();
                $('#not_available').show();
            }else{
                $('#buy_btn').show();
                $('#not_available').hide();
            }
            if(errorcode === 'Outofstock'){
                this.$reminderForm.removeClass('hide');
                this.$container.find(this.options.customInput).val(this.options.variant_map[selected_key].id);
            }else{
                this.$container.find(this.options.customInput).val('');
            }
            variant_validation_msg = error + ': ' + error_description;
            this.$container.find('.buy-btn').addClass('buy-btn-disabled');
            this.$container.find('.buy-message').removeClass('hide').html(error);
        }
    };

}(jQuery));
