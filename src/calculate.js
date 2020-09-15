import {error} from 'tata-js/src/tata'
import {
    PRICE_DELIVERY, PRICE_DELIVERY_KM, name,
    phone, form, door as checkDoor, priceDoorField, priceHardwareField, priceProductField, priceAll, deliveryField, mountField, fillingApertureVal, materialEdgingVal, color, topMountVal, sideMountVal, beltsSelectVal, bottomMountVal, fillingDoorVal, mounting, delivery, deliveryKm, textarea, zipper, doorWidth
} from './variables'
import {
    getMountPrice
} from './mount-price/MountPrice';



let price = null;

export default async function calculate() {
    price = 0;
    const props = {};

    const dataCalculator = {
        props: props,
    }

    let perimetr,
        area,
        aperture,
        topMountPosition = 0,
        sideMountPosition = 0,
        bottomMountPosition = 0,
        priceMount,
        edging,
        beltsPrice,
        priceDoor = 0,
        fillingDoor,
        widthDoor;



    let width = form.querySelector('#width').value;
    let height = form.querySelector('#height').value;


    let fillingAperture = fillingApertureVal.value;

    let materialEdging = materialEdgingVal.value;

    let colorEdging = color.value;

    let topMount = topMountVal.value;

    let sideMount = sideMountVal.value;

    let bottomMount = bottomMountVal.value;

    let stepMount = form.querySelector('#stepInput').value;

    let belts = form.querySelector('#beltsInput').value;
    
    let beltsSelect = beltsSelectVal.value;

    beltsPrice = belts * beltsSelect;

    let price_mounting = null;
    let resultPriceMount = await getMountPrice('Moscow')


    if (resultPriceMount >= 10) {
        price_mounting = 650;
    } else if (resultPriceMount >= -15) {
        price_mounting = 950;
    } else {
        price_mounting = 1100;
    }

    if (checkDoor.checked) {

        fillingDoor = fillingDoorVal.value;
        widthDoor = doorWidth.value;
        let areaDoor = (widthDoor * height) / 1000000;

        priceDoor = (fillingDoor * areaDoor) + (height / 1000 * zipper.value * 1800);

    }

    if (topMount > 0) {
        topMountPosition = Math.ceil(width / stepMount);
    }


    if (sideMount > 0) {
        sideMountPosition = Math.ceil(height / stepMount) * 2 - 2;
    }

    if (bottomMount > 0) {
        bottomMountPosition = Math.ceil(width / stepMount);
    }


    priceMount = Math.floor(topMount * topMountPosition + sideMount * sideMountPosition + bottomMount * bottomMountPosition + priceDoor);

    perimetr = ((width * 2) + (height * 2)) / 1000;
    area = (width * height / 1000000).toFixed(2);
    edging = perimetr * materialEdging;
    aperture = area * Number(fillingAperture);



    let priceProduct = Math.round(+aperture + Number(edging) + priceMount + beltsPrice);


    if (priceProduct > 0 && priceProduct != Infinity) {
        if (mounting.checked) {


            let price_mount = price_mounting * area
            price += price_mount;

            mountField.textContent = price_mount.toFixed();
            dataCalculator.mounting = price_mount.toFixed();
        }

        if (delivery.checked) {

            let temp = 0;
            price += PRICE_DELIVERY;

            if (deliveryKm.value) {
                temp = deliveryKm.value * PRICE_DELIVERY_KM;
                price += temp;
            }
            deliveryField.textContent = (PRICE_DELIVERY + temp).toFixed();
            dataCalculator.delivery = (PRICE_DELIVERY + temp).toFixed();
            dataCalculator.deliveryKm = deliveryKm.value;
        }

        priceAll.textContent = price ? (price + priceProduct).toFixed() : priceProduct;
        priceProductField.textContent = priceProduct;

        let dots = topMountPosition + bottomMountPosition + sideMountPosition;

        priceHardwareField.textContent = priceMount + beltsPrice - priceDoor.toFixed();

        priceDoorField.textContent = priceDoor.toFixed();



        props.area = area;
        props.dots = dots;
        props.areaField = getValSelect(fillingApertureVal);
        props.materialEdging = getValSelect(materialEdgingVal);
        props.topMount = getValSelect(topMountVal);
        props.sideMount = getValSelect(sideMountVal);
        props.bottomMount = getValSelect(bottomMountVal);
        props.stepMount = stepMount;
        props.belts = belts;
        props.beltsSelect = getValSelect(beltsSelectVal);
        props.checkDoor = checkDoor.checked ? "Да" : "Нет";
        if (checkDoor.checked) {
            props.doorArea = getValSelect(fillingDoorVal);
            props.zipper = zipper.value;
            props.widthDoor = widthDoor;
            props.heightDoor = height;

        }

        dataCalculator.name = name.value;
        dataCalculator.phone = phone.value;
        dataCalculator.price = price ? (price + priceProduct).toFixed() : priceProduct;
        dataCalculator.width = width;
        dataCalculator.height = height;
        dataCalculator.color = colorEdging;

        dataCalculator.comment = textarea.value;

    } else {
       error('Ошибка', 'Введите корректные значения', {
           duration: 5000
       })
    }
    return dataCalculator

}



function getValSelect(node) {
    return node.options[node.selectedIndex].textContent
}