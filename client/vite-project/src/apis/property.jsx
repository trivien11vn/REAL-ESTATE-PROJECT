import axios from '../axios'
export const apiGetProperty = (params) => axios({
    method: 'GET',
    url: '/property/',
    params
})
