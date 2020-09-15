import {inputMain, inputDoor, textarea, door, mounting, delivery, deliveryKm, outputs} from './variables'

export default function reset() {
    
        inputMain.forEach((el) => {
        el.value = "";
        el.classList.remove('is-valid');
        el.classList.remove('is-invalid')
    })

    textarea.value = '';
    door.checked = false;
    mounting.checked = false;
    delivery.checked = false;
    deliveryKm.value = '';

    inputDoor.forEach(el => {
        el.value = '';
        el.classList.remove('is-valid');
        el.classList.remove('is-invalid');
    })
    outputs.forEach((el) => {
        el.textContent = 0;
    })

}