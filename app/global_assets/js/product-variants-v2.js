var ProductVariants = {};

(function ($) {

    ProductVariants = function (element, options) {
        this.local_lang;

        if (typeof(lang) == 'undefined') {
            this.local_lang = {
                out_of_stock: "Esgotado.",
                out_of_stock_long: "Esta opção esta esgotado, por favor selecione outra.",
                all_not_available: "Indisponível.",
                all_not_available_long: "Este produto esta indisponível.",
                not_available: "Indisponível.",
                not_available_long: "Esta opção esta indisponível, por favor selecione outra.",
                choose_option: "Escolha uma opção.",
                choose_option_long: "Por favor, selecione todas as opções do produto para continuar a compra.",
            };
        }else{
            this.local_lang = lang;
        }

        this.variant_validation_msg = this.local_lang.choose_option_long;
        this.defaultOptions = {
            container: 'body',
            customInput: 'input[name=variant_id]',
            disableClass: 'disabled',
            variant_map: [],
            variant_map_keyed: [],
            allow_os_purchase: true,
            overall_quantity: 0,
            button_selects: false,
            installments: 12,
            currency_symbol: '$',
            validationSuccess: function() {},
            validationOutofstock: function() {},
            validationAlloutofstock: function() {},
            validationNotAvailable: function() {},
            validationRequiredOption: function() {}
        };
        this.selected_variant = null;

        this.options = $.extend({}, this.defaultOptions, options);
        this.$wrapper = $(element);
        this.$container = $(this.options.container);
        this.$reminderForm = this.$container.find('.remindme-form');
        this.$alertUnavailable = this.$container.find('.alert-unavailable');
        this.$buyBtn = this.$container.find('button.buy-btn');
        this.$buyMessage = this.$container.find('.buy-message');
        this.$variantInput = this.$container.find(this.options.customInput);

        if (this.$reminderForm.length > 0) {
            this.options.disableClass = 'variant-unavailable';
        }

        $selects = this.$wrapper.find('.product_option');
        $selects.on('change', $.proxy(this.toggle_variant_form, this));
        this.$buyBtn.on('click', $.proxy(this.buy, this));
        this.toggle_variant_form();

        if (this.options.button_selects) {
            this.init_button_select();
        }
    };

    ProductVariants.prototype = {
        constructor: ProductVariants,
        allUnavailable: function() {
            this.$buyBtn.addClass('hide');
            this.$reminderForm.removeClass('hide');
            this.$alertUnavailable.removeClass('hide');
        },
        someAvailable: function() {
            this.$buyBtn.removeClass('hide');
            this.$reminderForm.addClass('hide');
            this.$alertUnavailable.addClass('hide');
        },
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

            var selected_key = selected.sort(function(a, b){ return a-b; }).join('_');

            if(this.options.variant_map[selected_key]) {
                this.selected_variant = this.options.variant_map[selected_key];
                
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
                    if ($('.installment-price').length > 0) {
                        $('.installment-price').text(this.options.currency_symbol + ' ' + (parseInt(this.selected_variant.price_num) / this.options.installments).toFixed(2).replace('.', ','));
                    }
                }

                if (parseInt(this.options.variant_map[selected_key].quantity) > 0 || this.options.allow_os_purchase > 0) {
                    this.validation_success(selected_key);
                    this.options.validationSuccess.call(this);
                }else{
                    this.validation_fail('Outofstock', this.local_lang.out_of_stock, this.local_lang.out_of_stock_long, selected_key);
                    this.options.validationOutofstock.call(this);
                }
            } else {
                if (this.options.overall_quantity <= 0 && this.options.allow_os_purchase === false) {
                    this.validation_fail('Alloutofstock', this.local_lang.all_not_available, this.local_lang.all_not_available_long);
                    this.options.validationAlloutofstock.call(this);
                }else{
                    if (Object.keys(this.options.variant_map).length > 0) {
                        if(qty == qty_sel){
                            this.validation_fail('NotAvailable', this.local_lang.not_available, this.local_lang.not_available_long);
                            this.options.validationNotAvailable.call(this);
                        } else{
                            this.validation_fail('RequiredOption', this.local_lang.choose_option, this.local_lang.choose_option_long);
                            this.options.validationRequiredOption.call(this);
                        }
                    }
                }
            }
        },
        validation_success: function (selected_key) {
            this.someAvailable();

            this.$variantInput.val(this.options.variant_map[selected_key].id);

            this.$buyBtn.removeClass('buy-btn-disabled');
            this.$buyMessage.addClass('hide').html('');
        },
        validation_fail: function (errorcode, error, error_description, selected_key) {
            variant_validation_msg = error + ': ' + error_description;
            
            if (errorcode === 'Alloutofstock') {
                this.allUnavailable();
            }else if(errorcode === 'Outofstock') {
                this.$variantInput.val(this.options.variant_map[selected_key].id);
                this.$reminderForm.removeClass('hide');
                
                if (this.options.overall_quantity > 0) {
                    this.$buyBtn.addClass('buy-btn-disabled');
                    this.$buyMessage.removeClass('hide').html(error);
                }
            }else{
                this.someAvailable();
                this.$variantInput.val('');
                
                this.$buyBtn.addClass('buy-btn-disabled');
                this.$buyMessage.removeClass('hide').html(error);
            }
        }
    };

}(jQuery));
