$(document).ready(function(){

    var has_errors = false;
    var confirmed = false;

    var validationOptions = {
      onError: function(errors){
        has_errors = true;
      },
      onValid: function(){
        has_errors = false;
      }
    };
    
    $('#confirm_checkoutform').submit(function(e){
        $('#confirm_checkoutform').tinyValidation(validationOptions);
        if(has_errors){
            e.preventDefault();
            alert('Por favor, preencha todos os campos com * antes de prosseguir.');
            return false;
        }else{
            if (confirmed === true) {
                return true;
            }

            $('#summary_in_modal').html('Loading...');
            $('#confirm_modal').modal('show');
            
            var formdata = $(this).serialize();

            $.post('/checkout/create', formdata, function(data) {
                $('#summary_in_modal').html(data);
            });

            return false;
        }
    });

    $(document).on('click', '#confirm-order-btn', function(e){
        e.preventDefault();
        confirmed = true;
        $('#confirm_checkoutform').append('<input type="hidden" value="1" name="confirmed" />');
        $('#confirm_checkoutform button[type=submit]').trigger('click');
    });

});