import {error as e} from 'tata-js/src/tata'
import calculate from './calculate'
import {name, phone, form, btn} from './variables'
import reset from './reset'


export default  function send() {

btn.style.position = 'relative';

const success = function() {
    const el = document.createElement('div');
    el.classList.add('success-form');
    el.style.position = 'absolute';
    el.innerHTML = 'Расчет успешно отправлен!';
    btn.parentNode.prepend(el);
}
function error() {
    const el = document.createElement('div');
    el.classList.add('error-form');
    el.style.position = 'absolute';
    el.innerHTML = 'Произошла ошибка! Позвоните нам';
    btn.parentNode.prepend(el);
}

function ajax(method, url, data, success, error) {
    btn.disabled = true;
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Accept', 'application/json');
    xhr.onreadystatechange = function() {

        if(xhr.readyState === 4 && xhr.status == 200) {
            success()
            reset()
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            error();
        }
    };
    xhr.send(data)
}


let url = 'server.php';


form.onsubmit = async function (event) {
    event.preventDefault();
    const dataCalculate = await calculate();
    if (name.value && phone.value && dataCalculate.price > 0) {
        let json = JSON.stringify(dataCalculate);
        ajax('POST', url,  json, success, error);
        setTimeout(()=> {
            btn.disabled = false;
            
            btn.parentNode.firstChild.remove();
        }, 5000)
    }  else {
    e('Ошибка', 'Заполните поля', {
        duration: 5000
    });
    if(!name.value) {
        name.classList.add('is-invalid')
     }
     if(!phone.value) {
        phone.classList.add('is-invalid')
     } 
     return false;
};

}
}