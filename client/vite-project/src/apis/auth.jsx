import axios from '../axios'

export const apiRegister = (data) => axios({
    method: 'POST',
    url: '/auth/register',
    data
})

export const apiSignin = (data) => axios({
    method: 'POST',
    url: '/auth/signin',
    data
})


