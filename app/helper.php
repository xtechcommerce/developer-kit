<?php 

// Functions only for template-designer

function humanize($str) {
 
    $str = trim(strtolower($str));
    $str = preg_replace('/[^a-z0-9\s+]/', ' ', $str);
    $str = preg_replace('/\s+/', ' ', $str);
    $str = explode(' ', $str);
 
    $str = array_map('ucwords', $str);
 
    return implode(' ', $str);
}

function template_navigator()
{
    $templates = array('category', 'forgot_password', 'homepage', 'login', 'my_account', 'order_detail', 'order_placed', 'page', 'product', 'register', 'view_cart', 'looks', 'look', 'landingpage');
    $nav = '<ul style="list-style:none;background-color:#FFF;position:fixed;top:0;left:0;font-size:12px;margin:10px;padding:10px;z-index:99999">';
    foreach ($templates as $template) {
        $nav .= '<li class="template-designer-close"><a style="color:#898989" href="index.php?p=' . $template . '">' . $template . '.html</a></li>';
        if ($template == 'page') {
            $nav .= '<li class="template-designer-close"><a style="color:#898989" href="index.php?p=page&slug=contato">page.html (with contato as slug)</a></li>';
        }
    }
    $nav .= '<li class="template-designer-close" style="text-align:right;"><a style="color:#898989;" href="#" onclick="$(\'.template-designer-close\').hide(); $(\'.template-designer-open\').show();">(-) Fechar</a></li>';
    $nav .= '<li class="template-designer-open" style="text-align:right; display:none;"><a style="color:#898989;" href="#" onclick="$(\'.template-designer-close\').show(); $(\'.template-designer-open\').hide();">(+) Abrir</a></li>';
    $nav .= '</ul>';
    return $nav;
}

function _parse_options($options)
{
    if (!is_array($options)) {
        return $options;
    }
    $attr = '';
    foreach ($options as $k=>$v)
    {
        $attr .= " $k=\"$v\"";
    }
    return $attr;
}

// Functions of shop

function social_link(){
    return 'http://www.facebook.com/test';
}
function logo_url(){
    return 'http://placehold.it/300x100';
}
function validation_errors(){
    return '';
}
function global_js($uri, $tag=false)
{
    if($tag)
    {
        return '<script type="text/javascript" src="app/global_assets/js/'.$uri.'"></script>';
    }
    else
    {
        return 'app/global_assets/js/'.$uri;
    }
}

function global_css($uri, $tag=false)
{
    if($tag)
    {
        return '<link href="app/global_assets/css/'.$uri.'" type="text/css" rel="stylesheet" />';
    }
    else
    {
        return 'app/global_assets/css/'.$uri;
    }
}

function global_asset($uri)
{
    return 'app/global_assets/'.$uri;
}
function cart($key){
    global $data;
    switch ($key) {
        case 'contents':
            return cart_contents();
            break;
        
        default:
            if (isset($data['cart'][$key])) {
                return $data['cart'][$key];
            }
            break;
    }
    return '';
}

function pagination()
{
    return '';
}

function cart_contents()
{
    global $data;
    return $data['cart']['items'];
}
function form_input($options){
    if (is_array($options) && !isset($options['type'])) {
        $options['type'] = 'text';
    }
    return '<input'._parse_options($options).'>';
}
function form_dropdown($name = '', $options = array(), $selected = array(), $extra = ''){
    $form = '<select name="'.$name.'"'.$extra.'">';
    foreach ($options as $key => $value) {
        $form .= '<option value="'.$key.'">'.(string)$value."</option>\n";
    }
    $form .= '</select>';
    return $form;
}
function form_hidden($name = '', $value = ''){
    return '<input type="hidden" name="'.$name.'" value="'.$value.'">';
}
function form_textarea($options = array()){
    return '<textarea'._parse_options($options).'></textarea>';
}
function set_value($input, $alt = ''){
    return $alt;
}
function set_radio(){
    return '';
}
function format_payment_desc(){
    return 'Pagseguro';
}

function site_url($path = '/'){
    return $path;
}

function form_close(){
    return '</form>';
}

function base_url($path = ''){
    return $GLOBALS['template'] . '/' . $path;
}

function uri_string(){
    return '';
}

function anchor(){
    return '<a href="#">Link</a>';
}

function url_title(){
    return 'test';
}

function customer_name(){
    return '';
}

function banner_img(){
    return '<img src="http://placehold.it/1170x350" />';
}

function boleto_discount_price(){
    return '';
}

function boleto_discount(){
    return '';
}

function product_img($product, $size, $options=array()){
    $map = array(
        'thumbnails' => '192x192',
        'small' => '350x350',
        'medium' => '1000x1000',
        'original' => '1500x1500',
        );
    $extra = '';
    if (isset($options['width'])) {
        $extra .= ' width="'.$options['width'].'"';
    }
    if (isset($options['class'])) {
        $extra .= ' class="'.$options['class'].'"';
    }
    if (isset($options['jqzoom'])) {
        return '<a href="http://placehold.it/'.$map[$size].'" class="jqzoom" rel="gal1" alt="Lorem ipsum" ><img src="http://placehold.it/'.$map[$size].'"'.$extra.' /></a>';
    }
    if (isset($options['only_link'])) {
        return 'http://placehold.it/'.$map[$size];
    }
    return '<img src="http://placehold.it/'.$map[$size].'"'.$extra.' />';
}

function category_img($category, $size){
    $map = array(
        'thumbnails' => '192x192',
        'small' => '350x350',
        'medium' => '1000x1000',
        'original' => '1500x1500',
        );
    return '<img src="http://placehold.it/'.$map[$size].'" />';
}

function host_url($path){
    return $GLOBALS['template'] . '/' . $path;
}

function theme_url($path){
    return $GLOBALS['template'] . '/' . $path;
}

function theme_img($file, $tag=false, $additional_html=''){
    if($tag)
    {
        $attr = '';
        if ( is_array($additional_html) )
        {
            foreach ($additional_html as $k=>$v)
            {
                $attr .= " $k=\"$v\"";
            }
        }else{
            $attr = $additional_html;
        }
        return '<img src="' . $GLOBALS['template'] . '/assets/img/' . $file . '" alt="'.$tag.'"'.$attr.' />';
    }
    else
    {
        return $GLOBALS['template'] . '/assets/img/' . $file;
    }
}

function theme_js($file){
    return '<script type="text/javascript" src="' . $GLOBALS['template'] . '/assets/js/' . $file . '"></script>';
}

function theme_css($file){
    return '<link href="' . $GLOBALS['template'] . '/assets/css/' . $file . '" type="text/css" rel="stylesheet" />';
}

function url(){
    return '';
}

function buy_button(){
    return '<form action="http://demo.securelocalhost.com/cart/add_to_cart" class="form-horizontal buy-btn-form" method="post" accept-charset="utf-8"><div style="display:none">
<input type="hidden" name="cartkey" value="">
<input type="hidden" name="id" value="6905">
<input type="hidden" name="variant_id" value="">
</div><button id="buy-btn" class="btn btn-primary btn-lg buy-btn buy-btn-disabled" type="submit" value="submit"><i class="glyphicon glyphicon-shopping-cart"></i> Comprar</button><p class="buy-message">Escolha uma opção.</p><div class="alert-unavailable alert alert-danger hide">Produto indisponível</div></form>';
}

function variation_select(){
    return '<div id="product-variants-6912" class="product-variants-wrapper"><script type="text/javascript">$(document).ready(function() {$(\'#buy_btn\').show(); $(\'#not_available\').hide();});</script>
        <script type="text/javascript">
        var productvariants_settings_6912 = {
            variant_map: {"299":{"price":"R$ 548,00","price_num":"548.00","id":6004,"quantity":"1"},"300":{"price":"R$ 548,00","price_num":"548.00","id":6005,"quantity":"1"},"297":{"price":"R$ 548,00","price_num":"548.00","id":6006,"quantity":"1"}},
            variant_map_keyed: {"299":[],"300":[],"297":[]},
            allow_os_purchase: false,
            overall_quantity: 3,
            button_selects: false
        };</script><label>Tamanho</label><select id="product_option_6912_80" class="product_option form-control" name="option[80]"><option value="">Escolha uma opção</option><option value="299">36</option><option value="300">37</option><option value="297">38</option></select></div>';
}

function onepage_checkout(){
    global $twig, $data;
    return $twig->render('bs3/checkout/view_cart.html', $data);
}

function testimonials_widget(){
    global $twig, $data;
    return $twig->render('bs3/product/testimonials.html', $data);
}

function breadcrumbs_widget(){
    global $twig;
    return $twig->render('widgets/breadcrumbs.html');
}

function get_children_of_page($slug){
    global $data;
    return $data['pages'];
}

function get_page(){
    return '';
}

function logged_in(){
    return '';
}

function items_in_cart(){
    return '0';
}

function form_open($url, $extra=''){
    return '<form '._parse_options($extra).'>';
}

function lang($var){
    return humanize($var);
}

function theme_upload_url(){
    return '';
}

function format_properties(){
    return '';
}

function product_properties()
{
    return '';
}

function header_code(){
    $url = parse_url('http://' . $_SERVER['SERVER_NAME'] . $_SERVER['SCRIPT_NAME']);
    $host = json_encode($_SERVER['HTTP_HOST'] . $url['path'] . '?ajax=');
    return <<<EOF
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="Keywords" content="">
    <meta name="Description" content="">
    <script type="text/javascript">
        var site_url = {"address_form":"http:\/\/$host\/secure\/address_form","delete_address":"http:\/\/$host\/secure\/delete_address","base":"http:\/\/$host\/","add_to_cart":"http:\/\/$host\/cart\/add_to_cart","save_cart":"http:\/\/$host\/cart\/save_cart","my_orders":"http:\/\/$host\/secure\/my_orders","set_address":"http:\/\/$host\/cart\/set_address","busca_cep":"http:\/\/$host\/shipping\/busca_cep","get_frete":"http:\/\/$host\/shipping\/get_frete","search_list":"http:\/\/$host\/search\/listing","search_ajax":"http:\/\/$host\/search\/find","variant_detail":"http:\/\/$host\/cart\/variant"}
    </script>
EOF;
}

function register_widget(){
    global $twig, $data;
    return $twig->render('bs3/account/register.html', $data);
}

function account_managment(){
    global $twig, $data;
    return $twig->render('bs3/account/account.html', $data);
}

function order_detail_widget(){
    global $twig, $data;
    return $twig->render('bs3/account/order_detail.html', $data);
}

function order_placed_widget(){
    global $twig, $data;
    return $twig->render('bs3/checkout/order_placed.html', $data);
}

function forgot_password_widget(){
    global $twig, $data;
    return $twig->render('bs3/account/forgot_password.html', $data);
}

function login_widget(){
    global $twig, $data;
    return $twig->render('bs3/account/login.html', $data);
}

function shop_config($key){
    switch ($key) {
        case 'base_http':
            return 'http';
            break;
        
        default:
            return 'Lorem ipsum';
            break;
    }
}

function document_title(){
    return 'Lorem ipsum';
}

function linked_banner(){
    return '<a href="#">' . banner_img() . '</a>';
}

function get_product_category()
{
    return 'Sandalias';
}

function current_url()
{
    return 'http://modacommerce.ecommerce.pro.br';
}

function template_settings($array)
{
    global $template_settings;

    if (is_string($array) && isset($template_settings[$array])) {
        return $template_settings[$array]['default'];
    }
    if (empty($template_settings)) {
        $template_settings = $array;
    }
    return '';
}

function ts($setting)
{
    return template_settings($setting);
}

function wishlist_button($label, $product, $variant_id = '')
{
    $hidden = array(
        'id' => 5,
        'variant_id' => $variant_id,
        );
    $content = form_open('cart/add_to_cart', 'class="addwish-btn-form"', $hidden);
    $content .= '<p class="add-to-wishlist"><button class="btn buy-btn btn-default btn-sm" type="submit" name="action" value="addwish">' . $label . '</button></p>';
    $content .= '</form>';
    return $content;
}

function filters_widget()
{
    global $twig;
    return $twig->render('bs3/category/filters.html');
}
