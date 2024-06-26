import axios from '../axios'
export const apiCreateNewPropertyType = (data) => axios({
    method: 'POST',
    url: '/property_type/',
    data
})
