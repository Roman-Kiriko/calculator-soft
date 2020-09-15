<?php
function sendCalculation() {
    $inputJSON = file_get_contents('php://input');

    $input = json_decode($inputJSON, TRUE);
    
    $name = htmlentities($input['name']);
    $phone = htmlentities($input['phone']);
    $price = $input['price'];
    $color = $input['color'];
    $width = htmlentities($input['width']);
    $height = htmlentities($input['height']);
    $comment = htmlentities($input['comment']);
    $props = $input['props'];
    
    $area = $props['area'];
    $areaField =  $props['areaField'];
    $belts = htmlentities($props['belts']);
    $beltsSelect = $props['beltsSelect'];
    $bottomMount = $props['bottomMount'];
    $checkDoor = $props['checkDoor'];
    $dots = $props['dots'];
    $materialEdging = $props['materialEdging'];
    $sideMount = $props['sideMount'];
    $stepMount = $props['stepMount'];
    $topMount = $props['topMount'];
    $mounting = $input['mounting'];
    $delivery = $input['delivery'];
    $deliveryKm = $input['deliveryKm'];
    
    
    if ($checkDoor == 'Да') {
        $doorArea = $props['doorArea'];
        $zipper = $props['zipper'];
        $widthDoor = $props['widthDoor'];
        $heightDoor = $props['heightDoor'];
    
        $door = 'Заполнение двери: ' . $doorArea . '<br>Высота двери: ' . $heightDoor . '<br>Ширина двери: ' . $widthDoor . '<br>Количество молний: ' . $zipper;
    } else {
        $door = '';
    }
    
    $message =  '<br>Имя: ' . $name . 
                '<br>Телефон: '. $phone . 
                '<br>Цена изделия: ' . $price .
                '<br>Цвет: '. $color .
                '<br>Ширина изделия: ' . $width . 
                '<br>Высота изделия: ' . $height . 
                '<br>Площадь: ' . $area .
                '<br>Заполнение проема: ' . $areaField . 
                '<br>Материал окантовки: ' . $materialEdging . 
                '<br>Верхнее крепление окна: ' . $topMount . 
                '<br>Нижнее крепление окна: ' . $bottomMount . 
                '<br>Стороны крепления окна: ' . $sideMount . 
                '<br>Шаг крепления: ' . $stepMount . 
                '<br>Точек крепления: ' . $dots .
                '<br>Ремни для скручивания: ' . $beltsSelect . '  шт: ' . $belts .
                '<br>Наличие двери: ' . $checkDoor . 
                '<br>Параметры двери: ' . $door .
                '<br>Монтаж: ' . $mounting .
                '<br>Доставка: ' . $delivery .
                '<br>Км от МКАД: ' . $deliveryKm .
                '<br>Комментарий: ' . $comment;
    
    
    
               
                // формируем URL в переменной $queryUrl
                 $queryUrl = '' ; 
                
                // формируем URL в переменной $queryUrl
                $queryData = http_build_query(array(
                 'fields' => array(
                        // Устанавливаем название для заголовка лида
                        'TITLE' => 'Заявка с Калькулятора мягких окон',
                       'PHONE' => Array(
                           "n0" => Array(
                               "VALUE" => $phone,
                               "VALUE_TYPE" => "WORK",
                           ),
                ),
                   'COMMENTS' =>  "Заполнил на странице: Калькулятор мягких окон 
                    <br> Комментарий к заявке: $message <br> "  ,
                         'SOURCE_ID' => "Заявка с сайта",
                         'NAME' => $name,
                      ),
                              'params' => array("REGISTER_SONET_EVENT" => "Y")
                        )
                );
                
                // обращаемся к Битрикс24 при помощи функции curl_exec
                $curl = curl_init();
                curl_setopt_array($curl, array(
                  CURLOPT_SSL_VERIFYPEER => 0,
                  CURLOPT_POST => 1,
                  CURLOPT_HEADER => 0,
                  CURLOPT_RETURNTRANSFER => 1,
                  CURLOPT_URL => $queryUrl,
                  CURLOPT_POSTFIELDS => $queryData,
                ));
                $result = curl_exec($curl);
                curl_close($curl);
                $result = json_decode($result, 1);
                if (array_key_exists('error', $result)) echo "Ошибка при сохранении лида: ".$result['error_description']."<br/>";
                 
}

    if (file_get_contents('php://input')) {
        sendCalculation();
    } else {
        print('Calculation not sent! Use the calculator on the website!');
    }
?>