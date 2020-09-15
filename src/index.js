import '../css/index.css'
import {
    body,
    img,
    color,
    icons,
    btnCalculate,
    btnReset,
    outputs,
    topMountVal,
    bottomMountVal,
    sideMountVal
} from './variables'
import validate from './validate/valdate'
import reset from './reset'
import send from './send'
import calculate from './calculate'
import {
    Popup
} from './popup/popup.js';
import {
    data
} from './popup/data-popup.js'

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

const top = document.querySelector('#img-top');
const bottom = document.querySelector('#img-bottom');
const side = document.querySelector('#img-side');


validate();

send();

btnCalculate.addEventListener('click', () => {

    outputs.forEach((output) => {
        output.textContent = 0;
    })

    calculate()

})
btnReset.onclick = function () {
    reset();
}
topMountVal.onchange = function (e) {
    let value = topMountVal.value;
    let url = `./img/calculator/${data.mount[value].article}-top.png`;
    if (data.mount[value].article == 'none') url = `./img/calculator/${data.mount[value].article}.png`
    top.setAttribute('src', url)
}
bottomMountVal.onchange = function (e) {
    let value = bottomMountVal.value;
    let url = `./img/calculator/${data.mount[value].article}-bottom.png`;
    if (data.mount[value].article == 'none') url = `./img/calculator/${data.mount[value].article}.png`
    bottom.setAttribute('src', url)
}
sideMountVal.onchange = function (e) {
    let value = sideMountVal.value;
    let url = `./img/calculator/${data.mount[value].article}-side.png`;
    if (data.mount[value].article == 'none') url = `./img/calculator/${data.mount[value].article}.png`
    side.setAttribute('src', url)
}


color.onchange = function (e) {
    let value = color.value;
    let url = `./img/calculator/window-${value}.jpg`;
    img.setAttribute('src', url)

}



icons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        if (icon.dataset.icon == 'fill') {
            const fill = document.querySelector('#fillingAperture').value;
            const popup = new Popup(body, {
                img: data.edging[fill].img,
                alt: data.edging[fill].alt,
                text: data.edging[fill].text
            })
            popup.render();
        } else if (icon.dataset.icon == 'edging') {
            const edg = document.querySelector('#material-edging').value;
            const popup = new Popup(body, {
                img: data.edging[edg].img,
                alt: data.edging[edg].alt,
                text: data.edging[edg].text
            })
            popup.render();
        } else if (icon.dataset.icon == 'color') {
            console.log('color');
        } else if (icon.dataset.icon == 'mount') {
            const mount = event.target.previousElementSibling.value;
            const popup = new Popup(body, {
                img: data.mount[mount].img,
                alt: data.mount[mount].alt,
                text: data.mount[mount].text
            })
            popup.render();
        }
    });

});