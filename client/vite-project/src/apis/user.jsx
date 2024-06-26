import axios from '../axios'
export const apiGetCurrent = () => axios({
    method: 'GET',
    url: '/user/current'
})

export const apiGetRole = () => axios({
    method: 'GET',
    url: '/user/roles',
})