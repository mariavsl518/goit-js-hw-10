import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loaderMesage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const infoBox = document.querySelector('.cat-info');

hide(loaderMesage);
hide(errorMessage);

select.addEventListener('change', handleSelect);

breedsLoad();

function breedsLoad() {
    show(loaderMesage);
    hide(infoBox);
    fetchBreeds()
        .then(resp => {
            const cats = resp.map(({ reference_image_id, name }) =>
                markupSelect(reference_image_id, name)).join('');
            select.insertAdjacentHTML('afterbegin', cats);
        })
        .catch(() => {
            Report.failure(`Error`, `${errorMessage.textContent}`, `Got it!`)
        })
        .finally(() => {
            show(infoBox);
            hide(loaderMesage)
        })
}

function handleSelect(evt) {
    show(loaderMesage);
    hide(infoBox);
    const breedId = evt.target.value;

    fetchCatByBreed(breedId)
        .then(resp => {
            infoBox.innerHTML = markupInfo(resp);
        })
        .catch(() => {
            Report.failure(`Error`,`${errorMessage.textContent}`,`Got it!`)
        })
        .finally(() => {show(infoBox);
                        hide(loaderMesage);})
}

function markupSelect(reference_image_id
                        , name) { 
            return `<option value="${reference_image_id}">${name}</option>`;
}

function markupInfo(resp) { 
    show(loaderMesage);
    const {
            url,
            breeds: {
            0: { description, temperament, name },
          }, } = resp;
    
    return `<img src="${url}" alt="${name}" class="image">
            <div class="info-box">
            <h2 class="name-title">${name}</h2>
            <p>${description}</p>
            <p><span style="font-weight:bold">Temperament:</span>${temperament}</p>
            </div>`
}

function show (el) { 
    return el.hidden = false;
}

function hide(el) { 
    return el.hidden = true;
}

