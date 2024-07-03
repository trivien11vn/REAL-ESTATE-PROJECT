import { apiGetAllPropertyType } from 'src/apis/propertyType'
import { create } from 'zustand'

export const usePropertiesStore = create((set) => (
    {
        propertyType: [],
        getPropertyTypes: async (params) => {
            const response = await apiGetAllPropertyType(params)
            console.log(response)
            if(response.success){
                return set(() => ({propertyType: response.propertyType}))
            }
            else {
                return set(() => ({propertyType: []}))
            }
        }
    }
))