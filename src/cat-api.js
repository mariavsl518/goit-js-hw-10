import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_ArQyfV7RbgcU2hbgOXiun5IAmN07cWLpekNaKMpTCi0Q4LGpgXaJIORfxq5CnLOV";
axios.defaults.baseURL = 'https://api.thecatapi.com/v1';

export function fetchBreeds() {
    return axios.get(`/breeds`)
        .then(resp => {
            return resp.data;
    });
}

export function fetchCatByBreed(breedId) { 
    return axios.get(`/images/${breedId}`)
        .then(resp => {
            return resp.data;
        });
}
