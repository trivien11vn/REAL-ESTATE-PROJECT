import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetPropertyById } from 'src/apis/property'
import { BreadCrumb } from 'src/components'
import withRouter from 'src/hocs/withRouter'
import { usePropertiesStore } from 'src/store/usePropertiesStore'

const PropertyDetail = ({navigate, location}) => {
  
  const {id} = useParams()
  const [propertyDetail, setPropertyDetail] = useState(null)
  useEffect(() => {
    const fetchDetailProperty = async() => {
      const response = await apiGetPropertyById(id)
      if(response?.success){
        setPropertyDetail(response?.property)
      }
    }
    fetchDetailProperty()
  }, [id])
  
  return (
    <div className='w-full'>
      <div className='relative w-full'>
        <img src='/Rectangle 25.png' alt='' className='w-full object-contain'/>
        <div className='absolute inset-0 text-white items-center justify-center flex flex-col '>
          <h1 className='text-[48px] font-medium'>Detail</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PropertyDetail)