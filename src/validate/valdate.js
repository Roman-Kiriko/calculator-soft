import {zipper, delivery, btnCalculate, inputMain, doorWidth} from '../variables'
export default function validate() {

const width = form.querySelector('#width');

const inputs = document.querySelectorAll('input');

for ( let input of inputs) {
    if ( input.type != "checkbox" && input.type != "button" && input.type != "submit") {
        input.classList.add('form-control');

        input.onblur = focusValid;
    } 
    
}


function focusValid() {
    if(!this.value || +this.value < 0) {
        event.target.classList.add('is-invalid'); 
        event.target.classList.remove('is-valid');
       
    } else {
        event.target.classList.add('is-valid'); 
        event.target.classList.remove('is-invalid');
     }
}


zipper.oninput = function () {
    inputValidateZipper(this);
}


btnCalculate.onclick = function () {
    
    
    inputMain.forEach((el) => {
        if(!el.value) {
            el.classList.remove('is-valid');
            el.classList.add('is-invalid');
            
        } else {
            el.classList.remove('is-invalid');
            el.classList.add('is-valid');
        }
    })

   
}


delivery.oninput = function() {
    
    
    if (delivery.value < 0) {
        delivery.value = ''
    }
    delivery.value = delivery.value.toString().replace(/,/g, '.');

}

doorWidth.onchange = function() {
    validateWidthDoor(this, width)
}

 
  
}

const inputValidateZipper = function (node) {
    if(node.type = 'number') {
        if (node.value > 2) {
            node.value = 2;
        } else if (node.value < 1) {
            node.value = 1;
        } 
    }
}

const validateWidthDoor = function (node, width) {
    if (node.type = 'text') {
        if(+node.value > +width.value) {
            node.value = width.value;
            node.classList.add('is-invalid');
         }
    }
}