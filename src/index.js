import axios from "axios";
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const select = document.querySelector('.breed-select');
const loaderMesage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const info = document.querySelector('.cat-info');

hide(loaderMesage);
hide(errorMessage);

// console.log(fetchBreeds());

fetchBreeds()
    .then(resp => {
        const obj = resp.data;
        const markup = obj.map(({ id, name }) => `<option value="${id}">${name}</option>`).join('');
        
        select.insertAdjacentHTML("afterbegin", markup);
        select.addEventListener('change', handleSelect);

        function handleSelect(evt) {

            breedId = evt.target.value;
            const findInfo = obj.find(info => info.id === breedId);
            fetchCatByBreed(breedId)
                .then(resp => {
                    
                    // if (resp.response !== '') {
                    //     show(loaderMesage);
                    //     hide(info)
                    // } else {
                    //     show(info);
                    //     hide(loaderMesage)
                    // }
                    resp.data.map(({ url, name }) => info.innerHTML = `
                <div style="margin:20px">
                <img src="${url}" alt="${name} height="250px">
                <h2>${findInfo.name}</h2>
                <p>${findInfo.description}</p>
                <p>${findInfo.temperament}</p>
                </div>
                `).join('');
                })
                .catch(() => {
                    Report.failure(`Error`,`${errorMessage.textContent}`,`Got it!`)
                    // hide(info)
                }
                );
        }
    })
    .catch(() => {
        Report.failure(`Error`,`${errorMessage.textContent}`,`Got it!`)
    })

function show (el) { 
    return el.hidden = 'false';
}

function hide(el) { 
    return el.hidden = 'true';
}

