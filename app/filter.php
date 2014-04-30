<?php 

function format_address($val){
    return 'Rua XY 12, CEP, ...';
}

function priceval($val){
    return $val;
}

function format_metrics($val){
    return $val;
}

function format_currency($val){
    return 'R$ ' . number_format((float)$val, 2, ',', '.');
}

function get_status_label($val){
    return 'label-default';
}

function translate_order_status($val){
    return 'Aguardando Pagamento';
}

function to_formated_date($val)
{
    return '01/10/2014';
}

function form_select()
{
    return '';
}

function format_address_nl2br($fields)
{
    if(empty($fields)){
        return;
    }
    $formatted = "{firstname} {lastname}\n{address1} {anumber}\n{address2}\n{city}, {district}, {zone} {zip}\n{country}\n{reference}";
    $keys = preg_split("/[\s,{}]+/", $formatted);
    foreach ($keys as $id=>$key) {
        $formatted = array_key_exists($key, $fields) ? str_replace('{'.$key.'}', $fields[$key], $formatted) : str_replace('{'.$key.'}', '', $formatted);
    }
    $formatted      = preg_replace('`[\r\n]+`',"\n",$formatted);
    return nl2br($formatted);
}

function trans($value)
{
    return $value;
}



?>
