<?php 

$address = array(
        'id' => '27832',
        'customer_id' => '34146',
        'entry_name' => 'Default',
        'field_data' => array(
            'company' => '',
            'firstname' => 'Max',
            'lastname' => 'Muster',
            'email' => 'info@testes.at',
            'phone' => '(23) 14231-4132',
            'address1' => 'Estrada do Colégio',
            'address2' => '',
            'city' => 'Rio de Janeiro',
            'zip' => '21235-280',
            'anumber' => '2',
            'district' => 'Colégio',
            'reference' => '',
            'cnpj' => '',
            'company_registration' => '',
            'company_alt' => '',
            'country' => 'Brazil',
            'country_code' => 'BR',
            'zone_id' => '1',
            'country_id' => '1',
            'zone' => 'RJ',
        ),
        'site_id' => '9',
    );

$data['design_mode'] = true;

$data['categories'] = array(
        array('category'=>array('id'=>1, 'name'=>'Novidades', 'slug'=>'#')),
        array('category'=>array('id'=>2, 'name'=>'Sandalias', 'slug'=>'#'), 
                'children'=>array(
                    array('category'=>array('id'=>3, 'name'=>'Sandalias verão', 'slug'=>'#'), 'children'=>array()),
                    array('category'=>array('id'=>4, 'name'=>'Sandalias inverno', 'slug'=>'#'), 'children'=>array()),
                    )),
        array('category'=>array('id'=>6, 'name'=>'Coleções', 'slug'=>'#')),
        array('category'=>array('id'=>7, 'name'=>'Acessorios', 'slug'=>'#')),
        array('category'=>array('id'=>8, 'name'=>'Sale', 'slug'=>'sale')),
    );

$data['categories_flatten'] = array(
        8 => $data['categories'][4]['category'],
        7 => $data['categories'][3]['category']
);
$twig->addGlobal('categories_flatten',  $data['categories_flatten']);

$data['testimonials'] = array(
        array('firstname' => 'Max', 'created_at' => '05/05/2014', 'message' => 'Superbom', 'total' => 4, 'rating_look' => 3, 'rating_usability' => 2, 'rating_support' => 1),
    );

$data['testimonial_totals'] = array('total' => 4, 'rating_look' => 3, 'rating_usability' => 2, 'rating_support' => 1);

$data['products'] = array(
        array('quantity' => 0, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6, 'saleprice' => 1.00),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6, 'saleprice' => 1.00, 'categories' => array($data['categories_flatten'][8])),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
        array('quantity' => 1, 'name' => 'Python Dourado', 'price' => 2.20, 'installments' => 6),
    );

$data['banners'] = array(
        array('title' => 'Banner', 'image' => 'banner1.jpg'),
        array('title' => 'Banner 2', 'image' => 'banner1.jpg'),
    );

$data['pages'] = array(
        array('title' => 'Page 1'),
        array('title' => 'Page 2'),
    );

if ($page == 'homepage') {
    $data['homepage'] = true;
}

if ($page == 'product' || $page == 'order_detail') {
    $data['related'] = $data['products'];
};

$data['product'] = array(
    'name' => 'Python Dourado', 
    'sku' => 'OFDSA', 
    'saleprice'=>20, 
    'price' => 20.99, 
    'installments' => 6, 
    'quantity' => 2, 
    'description' => '<p>Lorem ipsum dolor sit amet dolorem proident utilitatis magnus agris. Abutebatur architecto propter ut materia. Quam quo aliquip, officii voluptatem. Qui pariatur officii eos. </p>',
    'excerpt' => 'Lorem ipsum dolor sit amet dolorem proident utilitatis magnus agris. Abutebatur architecto propter ut materia. Quam quo aliquip, officii voluptatem. Qui pariatur officii eos. ',
    'images' => array(
        array('filename'=>'500x500', 'alt'=>'Lorem ipsum'),
        array('filename'=>'500x500', 'alt'=>'Lorem ipsum'),
        ),
    'options' => array(
        '80' => array(
            'id' => '80',
            'product_id' => '0',
            'sequence' => '2',
            'name' => 'Tamanho',
            'type' => 'droplist',
            'required' => '1',
            'global' => '1',
            'site_id' => '9',
            'values' => array(
                '303' => array(
                    'id' => '303',
                    'option_id' => '80',
                    'name' => '34',
                    'value' => '',
                    'price' => '0.00',
                    'weight' => '0.00',
                    'sequence' => '0',
                    'limit' => '',
                    'quantity' => '0',
                    'site_id' => '9',
                )
            )
        )
    )
);


$data['look'] = array(
        'id' => '7',
        'created_at' => '2014-03-06 13:41:28',
        'name' => 'Look Inverno',
        'discount' => '10',
        'discount_type' => 'percent',
        'site_id' => '9',
        'images' => array(
            'fd856c827dd857fe1681dcb70096fa5b' => array(
            'filename' => 'fd856c827dd857fe1681dcb70096fa5b.JPG',
            'primary' => '1',
            ),
        ),
        'seo_title' => '',
        'seo_description' => '',
        'seo_keywords' => '',
        'excerpt' => 'Look',
        'description' => 'Look description',
        'slug' => 'Look',
        'price' => '1554.00',
        'saleprice' => '1398.6',
        'products' => array($data['product'], $data['product'], $data['product'])
    );

$data['looks'] = array(
    $data['look'],
    $data['look'],
    $data['look'],
    $data['look'],
);

$data['campaign'] = array(
    'mission' => '10 % OFF'
);


if ($page == 'category') {
    $data['category'] = array('name' => 'Sandalias', 'description' => 'Lorem ipsum dolor sit amet dolorem proident utilitatis magnus agris.', 'root_category' => 1);
    $data['properties'] = array('2314' => array('category' => array('id' => '2314','parent_id' => '0','name' => 'Gênero','slug' => 'genero','route_id' => '13613','description' => '','excerpt' => '','sequence' => '0','image' => '','seo_title' => '0','meta' => '0','site_id' => '87','property' => '1','on_category_id' => '0','seo_description' => '0','seo_keywords' => '0','root_category' => '2314',),'children' => array('2315' => array('category' => array('id' => '2315','parent_id' => '2314','name' => 'Masculino','slug' => 'Masculino','route_id' => '13614','description' => '','excerpt' => '','sequence' => '1','image' => '','seo_title' => '0','meta' => '0','site_id' => '87','property' => '1','on_category_id' => '0','seo_description' => '0','seo_keywords' => '0','root_category' => '2314',),'children' => array(),),'2316' => array('category' => array('id' => '2316','parent_id' => '2314','name' => 'Feminino','slug' => 'Feminino','route_id' => '13615','description' => '','excerpt' => '','sequence' => '2','image' => '','seo_title' => '0','meta' => '0','site_id' => '87','property' => '1','on_category_id' => '0','seo_description' => '0','seo_keywords' => '0','root_category' => '2314',),'children' => array(),),'2317' => array('category' => array('id' => '2317','parent_id' => '2314','name' => 'Infantil','slug' => 'Infantil','route_id' => '13616','description' => '','excerpt' => '','sequence' => '3','image' => '','seo_title' => '0','meta' => '0','site_id' => '87','property' => '1','on_category_id' => '0','seo_description' => '0','seo_keywords' => '0','root_category' => '2314',),'children' => array(),),'2318' => array('category' => array('id' => '2318','parent_id' => '2314','name' => 'Plus Sizes','slug' => 'Plus-Sizes','route_id' => '13617','description' => '','excerpt' => '','sequence' => '4','image' => '','seo_title' => '0','meta' => '0','site_id' => '87','property' => '1','on_category_id' => '0','seo_description' => '0','seo_keywords' => '0','root_category' => '2314',),'children' => array(),),),),);
    $data['global_options'] = array('0' => array('id' => '274','product_id' => '0','sequence' => '1','name' => 'Cor','type' => 'droplist','required' => '1','site_id' => '87','global' => '1','values' => array('0' => array('id' => '2633','option_id' => '274','name' => 'Azul Marinho/Preto','value' => '','price' => '0.00','weight' => '0.00','sequence' => '0','limit' => '','site_id' => '87','quantity' => '0',),'1' => array('id' => '2634','option_id' => '274','name' => 'Preto/Taupe','value' => '','price' => '0.00','weight' => '0.00','sequence' => '1','limit' => '','site_id' => '87','quantity' => '0',),'2' => array('id' => '2635','option_id' => '274','name' => 'Preto','value' => '','price' => '0.00','weight' => '0.00','sequence' => '2','limit' => '','site_id' => '87','quantity' => '0',),'3' => array('id' => '2636','option_id' => '274','name' => 'Azul Marinho/Branco','value' => '','price' => '0.00','weight' => '0.00','sequence' => '3','limit' => '','site_id' => '87','quantity' => '0',),'4' => array('id' => '2957','option_id' => '274','name' => 'Amarelo','value' => '','price' => '0.00','weight' => '0.00','sequence' => '4','limit' => '','site_id' => '87','quantity' => '0',),),),'1' => array('id' => '273','product_id' => '0','sequence' => '2','name' => 'Tamanho','type' => 'droplist','required' => '1','site_id' => '87','global' => '1','values' => array('0' => array('id' => '2630','option_id' => '273','name' => 'P','value' => '','price' => '0.00','weight' => '0.00','sequence' => '0','limit' => '','site_id' => '87','quantity' => '0',),'1' => array('id' => '2631','option_id' => '273','name' => 'M','value' => '','price' => '0.00','weight' => '0.00','sequence' => '1','limit' => '','site_id' => '87','quantity' => '0',),'2' => array('id' => '2632','option_id' => '273','name' => 'G','value' => '','price' => '0.00','weight' => '0.00','sequence' => '2','limit' => '','site_id' => '87','quantity' => '0',),),),);
}

if ($page == 'my_account') {
    $data['orders'] = array(
        array('order_number' => '2341423141234', 'status' => 'Pending', 'ordered_on' => '2014-01-10 17:00:10'),
        array('order_number' => '3241243214123', 'status' => 'Pending', 'ordered_on' => '2014-01-11 17:00:10'),
        array('order_number' => '3241243214123', 'status' => 'Pending', 'ordered_on' => '2014-01-12 17:00:10'),
    );
    $data['customer'] = array(
        'id'=> "34146",
        'firstname'=> "Max",
        'lastname'=> "Muster",
        'email'=> "info@testes.at",
        'email_subscribe'=> "1",
        'phone'=> "(23) 14231-4132",
        'company'=> "",
        'default_billing_address'=> "27832",
        'default_shipping_address'=> "27832",
        'ship_to_bill_address'=> "true",
        'password'=> "23412412341234231",
        'active'=> "1",
        'group_id'=> "1",
        'confirmed'=> "0",
        'sex'=> "0",
        'cpf'=> "823.164.186-60",
        'birthday'=> "1985-03-03",
        'mobile'=> "",
        'cnpj'=> "",
        'company_alt'=> "",
        'company_registration'=> "",
        'company_registration_alt'=> "",
        'subscribed'=> "0",
        'job'=> "",
        'company_description'=> "",
        'facebook_uid'=> "0"
    );
    $data['default_address'] = $address;
    $data['addresses'] = array(
            $address,
            $address,
            $address
        );
}

if ($page == 'view_cart') {
    $data['zones_menu'] = array('RJ' => 'Rio de Janeiro', 'SP' => 'São Paulo');
    $data['payment_methods'] = array(
            'pagseguro' => array('name' => 'Pagseguro', 'form' => '<div class="logo text-center"><img src="http://placehold.it/800x200"></div>')
        );
}

$data['cart'] = unserialize('a:30:{s:21:"order_insurable_value";d:519;s:12:"order_weight";d:0.80000000000000004;s:14:"group_discount";i:0;s:15:"coupon_discount";i:0;s:23:"taxable_coupon_discount";i:0;s:17:"gift_card_balance";i:0;s:18:"gift_card_discount";i:0;s:9:"downloads";a:0:{}s:13:"cart_subtotal";d:519;s:22:"cp_discounted_subtotal";d:519;s:13:"taxable_total";i:0;s:10:"cart_total";d:519;s:11:"total_items";i:1;s:14:"shipping_total";i:0;s:3:"tax";s:4:"0.00";s:5:"items";a:1:{s:32:"28867fc5b6d676d35507af0f8e4691d2";a:35:{s:2:"id";s:2:"10";s:3:"sku";s:8:"NW015-LP";s:4:"name";s:17:"Mochila esportiva";s:4:"slug";s:26:"16-Mochila-esportiva-NW015";s:8:"route_id";s:2:"70";s:11:"description";s:0:"";s:7:"excerpt";s:0:"";s:5:"price";s:6:"519.00";s:9:"saleprice";s:4:"0.00";s:13:"free_shipping";s:1:"0";s:9:"shippable";s:1:"1";s:7:"taxable";s:1:"0";s:14:"fixed_quantity";s:1:"0";s:6:"weight";s:3:"0.8";s:11:"track_stock";s:1:"1";s:16:"related_products";s:0:"";s:6:"images";s:0:"";s:9:"seo_title";s:0:"";s:4:"meta";s:0:"";s:7:"enabled";s:1:"1";s:5:"video";s:0:"";s:6:"height";s:5:"50.00";s:5:"width";s:5:"39.00";s:5:"depth";s:5:"10.00";s:13:"factory_price";s:6:"156.76";s:9:"video_img";s:0:"";s:10:"base_price";s:6:"519.00";s:9:"file_list";a:0:{}s:7:"variant";s:2:"25";s:8:"alert_at";s:1:"1";s:9:"available";s:2:"-1";s:7:"options";a:1:{s:3:"Cor";s:13:"Lumiere Preto";}s:5:"is_gc";b:0;s:8:"quantity";d:1;s:8:"subtotal";d:519;}}s:8:"customer";b:0;s:14:"custom_charges";a:0:{}s:8:"shipping";a:3:{s:6:"method";b:0;s:5:"price";b:0;s:4:"code";b:0;}s:7:"gc_list";a:0:{}s:11:"coupon_list";a:0:{}s:15:"applied_coupons";a:0:{}s:21:"whole_order_discounts";a:0:{}s:20:"free_shipping_coupon";b:0;s:17:"requires_shipping";b:1;s:7:"payment";b:0;s:7:"address";a:6:{s:9:"resultado";s:1:"1";s:10:"logradouro";s:1:" ";s:6:"bairro";s:0:"";s:6:"cidade";s:12:"Picada Café";s:2:"uf";s:2:"RS";s:3:"cep";s:8:"95175000";}s:13:"delivery_time";i:3;s:16:"payment_discount";i:0;s:12:"order_number";s:12:"137511692824";}');

$data['page'] = array(
    'title' => 'Lorem ipsum dolor sit amet',
    'slug' => (isset($_GET['slug']) ? $_GET['slug'] : 'page'),
    'content' => '<p>Lorem ipsum dolor sit amet dolorem proident utilitatis magnus agris. Abutebatur architecto propter ut materia. Quam quo aliquip, officii voluptatem. Qui pariatur officii eos. </p>',
    );


if ($page == 'order_detail') {
    $data['customer'] = array('firstname'=>'Max',
                                'lastname'=>'Muster',
                                'email'=>'info@example.com',
                                'company'=>'Apple Inc',
                                'phone'=>'(21) 2313-1232',
                                'customer_id'=>'0');

    $data['customer']['ship_address'] = array('company'=>'Apple Inc',
                                                'firstname'=>'Max',
                                                'lastname'=>'Muster',
                                                'email'=>'info@example.com',
                                                'phone'=>'(21) 2313-1232',
                                                'address1'=>'Estrada do Colégio',
                                                'address2'=>'',
                                                'city'=>'Rio de Janeiro',
                                                'zone'=>'RJ',
                                                'country'=>'Brazil',
                                                'country_code'=>'BR',
                                                'country_id'=>'1',
                                                'zip'=>'21235-280',
                                                'anumber'=>'2',
                                                'district'=>'Colégio',
                                                'reference'=>''
                                                );

    $data['customer']['bill_address'] = $data['customer']['ship_address'];

    $data['gift_cards_enabled'] = 'gift_cards_enabled';
    $data['download_section']   = '';

    $data['shipping']['method'] = 'PAC';
    $data['payment']['description'] = 'Pagseguro';
    $data['payment_method'] = 'Pagseguro';
    
    $data['boletourl'] = 'http://www.example.com';

    $data['product']['options'] = array('Color'=>'Black');

    $data['loja']['group_discount']      = 2.20;
    $data['order_id']                    = '2341243214312';
    $data['loja']['subtotal']            = 2.20;
    $data['loja']['history']             = array();
    $data['loja']['coupon_discount']     = 2.20;
    $data['loja']['order_tax']           = 2.20;
    $data['loja']['discounted_subtotal'] = 2.20;
    $data['loja']['shipping_cost']       = 2.20;
    $data['loja']['gift_card_discount']  = 2.20;
    $data['loja']['payment_discount']    = 2.20;
    $data['loja']['total']               = 2.20;
    $data['loja']['contents']            = array(
            $data['product'],
            $data['product'],
        );
    $data['loja']['delivery_time']       = 2;
}

if ($page == 'order_placed') {
    $data['order'] = array(
        'id' => '29697',
        'order_number' => '139083405246',
        'customer_id' => '34146',
        'status' => 'Pending',
        'ordered_on' => '2014-01-27 13:17:49',
        'shipped_on' => '',
        'tax' => '0.00',
        'total' => '598.00',
        'subtotal' => '548.00',
        'gift_card_discount' => '0.00',
        'coupon_discount' => '0.00',
        'shipping' => '50.00',
        'shipping_notes' => '',
        'shipping_method' => 'FIXO',
        'notes' => '',
        'payment_info' => 'MoIP',
        'referral' => '',
        'company' => '',
        'firstname' => 'Alexander1',
        'lastname' => 'Feiglstorfer2',
        'phone' => '(23) 14231-4132',
        'email' => 'info@delooks.at',
        'ship_company' => '',
        'ship_firstname' => 'Alexander1',
        'ship_lastname' => 'Feiglstorfer2',
        'ship_email' => 'info@delooks.at',
        'ship_phone' => '(23) 14231-4132',
        'ship_address1' => 'Estrada do Colégio',
        'ship_address2' => '',
        'ship_city' => 'Rio de Janeiro',
        'ship_zip' => '21235-280',
        'ship_zone' => 'RJ',
        'ship_zone_id' => '458',
        'ship_country' => 'Brazil',
        'ship_country_code' => '',
        'ship_country_id' => '0',
        'ship_reference' => '',
        'ship_district' => 'Colégio',
        'ship_anumber' => '2',
        'bill_company' => '',
        'bill_firstname' => 'Alexander1',
        'bill_lastname' => 'Feiglstorfer2',
        'bill_email' => 'info@delooks.at',
        'bill_phone' => '(23) 14231-4132',
        'bill_address1' => 'Estrada do Colégio',
        'bill_address2' => '',
        'bill_city' => 'Rio de Janeiro',
        'bill_zip' => '21235-280',
        'bill_zone' => 'RJ',
        'bill_zone_id' => '458',
        'bill_country' => 'Brazil',
        'bill_country_code' => '',
        'bill_country_id' => '0',
        'bill_anumber' => '2',
        'bill_district' => 'Colégio',
        'bill_reference' => '',
        'history' => '',
        'tracking_number' => '',
        'payment_discount' => '0.00',
        'delivery_time' => '15',
        'production_time' => '0',
        'days_until_shipped' => '0',
        'approved_on' => '0000-00-00 00:00:00',
        'test' => '1',
        'contaazul' => '0',
        'sentalert' => '0',
        'nota_fiscal' => '',
        'shipping_method_alt' => '',
        'extra' => '',
        'site_id' => '9',
        'payment_type' => 'BOLETO',
        'delivering_on' => '',
        'contents' => array(
            '0' => array(
                'order_id' => '29697',
                'variant_id' => '',
                'excerpt' => 'afdasfdsafsdaf',
                'description' => 'fdafadsffdsafdsafsad',
                'order_item_id' => '34639',
                'id' => '6911',
                'sku' => 'NO9000',
                'name' => 'Anabela Caramelo',
                'slug' => 'teste-02111',
                'route_id' => '8577',
                'price' => '548.00',
                'saleprice' => '0.00',
                'free_shipping' => '0',
                'shippable' => '1',
                'taxable' => '0',
                'fixed_quantity' => '0',
                'weight' => '1000',
                'track_stock' => '1',
                'seo_title' => '',
                'enabled' => '1',
                'height' => '0.00',
                'width' => '0.00',
                'depth' => '0.00',
                'factory_price' => '0.00',
                'video_img' => 'http://b.vimeocdn.com/ts/348/144/348144833_640.jpg',
                'site_id' => '9',
                'installments' => '3',
                'stared' => '0',
                'seo_description' => '',
                'seo_keywords' => '',
                'base_price' => '548.00',
                'file_list' => array(),
                'is_gc' => '',
                'quantity' => '1',
                'subtotal' => '548',
            )
        )
    );
}


?>