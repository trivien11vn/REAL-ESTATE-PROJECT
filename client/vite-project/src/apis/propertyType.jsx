import axios from '../axios'
export const apiCreateNewPropertyType = (data) => axios({
    method: 'POST',
    url: '/property_type/',
    data
})

export const apiGetAllPropertyType = (params) => axios({
    method: 'GET',
    url: '/property_type/',
    params
})
