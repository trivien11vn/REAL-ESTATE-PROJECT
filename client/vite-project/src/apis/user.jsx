import axios from '../axios'
export const apiGetCurrent = (data) => axios({
    method: 'GET',
    url: '/user/current'
})