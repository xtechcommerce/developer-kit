<?php 

date_default_timezone_set('America/Sao_Paulo');

Twig_Autoloader::register();

$page = isset($_GET['p']) ? $_GET['p'] : 'homepage';
$template_settings = array();

$loader1 = new Twig_Loader_Filesystem('./' . $GLOBALS['template']);
$loader2 = new Twig_Loader_Filesystem('./app');
$loader3 = new Twig_Loader_Filesystem('./app/global_templates');

$twig = new Twig_Environment(new Twig_Loader_Chain(array($loader1, $loader2, $loader3)));

$functions = array(
  'site_url', 
  'base_url', 
  'uri_string', 
  'anchor', 
  'url_title',
  'customer_name',
  'banner_img',
  'boleto_discount_price',
  'boleto_discount',
  'product_img',
  'category_img',
  'host_url',
  'theme_url',
  'theme_img',
  'theme_js',
  'theme_css',
  'url',
  'buy_button',
  'variation_select',
  'onepage_checkout',
  'testimonials_widget',
  'breadcrumbs_widget',
  'get_children_of_page',
  'get_page',
  'logged_in',
  'items_in_cart',
  'form_open',
  'lang',
  'theme_upload_url',
  'format_properties',
  'header_code',
  'register_widget',
  'account_managment',
  'order_detail_widget',
  'order_placed_widget',
  'shop_config',
  'document_title',
  'linked_banner',
  'template_navigator',
  'form_close',
  'login_widget',
  'forgot_password_widget',
  'social_link',
  'logo_url',
  'validation_errors',
  'global_js',
  'global_css',
  'cart',
  'form_input',
  'form_dropdown',
  'form_hidden',
  'form_textarea',
  'set_value',
  'set_radio',
  'format_payment_desc',
  'product_properties',
  'get_product_category',
  'pagination',
  'current_url',
  'form_select',
  'wishlist_button',
  'template_settings',
  'filters_widget',
  'ts',
  'global_asset',
);

foreach ($functions as $function) {
    $function = new Twig_SimpleFunction($function, $function, array('is_safe' => array('html')) );
    $twig->addFunction($function);
}

$filters = array(
  'format_address',
  'priceval',
  'format_metrics',
  'format_currency',
  'nl2br',
  'count',
  'html_entity_decode',
  'json_encode',
  'json_decode',
  'key',
  'to_formated_date',
  'format_address_nl2br',
  'var_dump',
  'get_status_label',
  'translate_order_status',
  'number_format',
  'trans',
  'round',
);

foreach ($filters as $filter) {
  $filter = new Twig_SimpleFilter($filter, $filter, array('is_safe' => array('html')) );
  $twig->addFilter($filter);
}

$twig->addGlobal('_layout',  '/_layouts/index.html');


if (isset($_GET['ajax'])) {
  switch ($_GET['ajax']) {
    case '/search/find':
      if(isset($_POST['name']) && strlen($_POST['name']) > 2){
        echo '{"count":2,"6913":{"name":"Tacha Azul Royal NO8990","slug":"tacha-azul-royal","price":"410.00","saleprice":"150.00","image":"<img src=\"https:\/\/xtechfiles-dev.s3.amazonaws.com\/uploads\/images\/thumbnails\/1384122717-not_a_shoe_-_alto_verao-061_ok.jpg\" alt=\"Tacha Azul Royal NO8990\" title=\"\" \/>","categories":[{"product_id":"6913","category_id":"3386","sequence":"0","site_id":"9","id":"3386","parent_id":"0","name":"Home","slug":"home","route_id":"8556","description":"","excerpt":"","image":"477023b573fcfd0978eac2e519853e51.jpg","seo_title":"","meta":"","property":"0","on_category_id":"0","seo_description":"","seo_keywords":""},{"product_id":"6913","category_id":"3388","sequence":"4","site_id":"9","id":"3388","parent_id":"0","name":"COLE\u00c7\u00d5ES","slug":"colecoes","route_id":"8558","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""},{"product_id":"6913","category_id":"3389","sequence":"6","site_id":"9","id":"3389","parent_id":"0","name":"SALE","slug":"sale","route_id":"8559","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""},{"product_id":"6913","category_id":"3390","sequence":"2","site_id":"9","id":"3390","parent_id":"0","name":"SAND\u00c1LIAS","slug":"sandalias","route_id":"8560","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""},{"product_id":"6913","category_id":"3395","sequence":"2","site_id":"9","id":"3395","parent_id":"3388","name":"Primavera \/  Ver\u00e3o","slug":"primavera-verao","route_id":"8565","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""}]},"6914":{"name":"Tacha Salm\u00e3o NO8989","slug":"tacha-salmao","price":"410.00","saleprice":"150.00","image":"<img src=\"https:\/\/xtechfiles-dev.s3.amazonaws.com\/uploads\/images\/thumbnails\/1384122694-not_a_shoe_-_alto_verao-056_ok.jpg\" alt=\"Tacha Salm\u00e3o NO8989\" title=\"\" \/>","categories":[{"product_id":"6914","category_id":"3386","sequence":"0","site_id":"9","id":"3386","parent_id":"0","name":"Home","slug":"home","route_id":"8556","description":"","excerpt":"","image":"477023b573fcfd0978eac2e519853e51.jpg","seo_title":"","meta":"","property":"0","on_category_id":"0","seo_description":"","seo_keywords":""},{"product_id":"6914","category_id":"3388","sequence":"4","site_id":"9","id":"3388","parent_id":"0","name":"COLE\u00c7\u00d5ES","slug":"colecoes","route_id":"8558","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""},{"product_id":"6914","category_id":"3389","sequence":"6","site_id":"9","id":"3389","parent_id":"0","name":"SALE","slug":"sale","route_id":"8559","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""},{"product_id":"6914","category_id":"3390","sequence":"2","site_id":"9","id":"3390","parent_id":"0","name":"SAND\u00c1LIAS","slug":"sandalias","route_id":"8560","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""},{"product_id":"6914","category_id":"3393","sequence":"2","site_id":"9","id":"3393","parent_id":"3388","name":"Alto Ver\u00e3o","slug":"alto-verao","route_id":"8563","description":"","excerpt":"","image":null,"seo_title":"","meta":"","property":"0","on_category_id":null,"seo_description":"","seo_keywords":""}]}}';
      }else{
        echo '{"count":0}';
      }
      break;
    
    default:
      echo '';
      break;
  }
  die();
}

?>