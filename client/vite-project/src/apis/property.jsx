import axios from '../axios'
export const apiGetProperty = (params) => axios({
    method: 'GET',
    url: '/property/',
    params
})

export const apiGetPropertyById = (id) => axios({
    method: 'GET',
    url: '/property/detail/' + id,
})

