import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGetPropertyById } from 'src/apis/property'
import { BoxInfo, BreadCrumb, PropertyImage } from 'src/components'
import withRouter from 'src/hocs/withRouter'
import { usePropertiesStore } from 'src/store/usePropertiesStore'
import { FaMapMarkerAlt } from "react-icons/fa";
import DOMPurify from 'dompurify'
import { formatMoney } from 'src/utils/fn'
import moment from 'moment'

const Info = ({title, value, unit=''}) => {
  return <tr>
  <td className='border p-3 text-center font-semibold'>{title}</td>
  <td className='border p-3 text-center'>{value}</td>
  <td className='border p-3 text-center'>{unit}</td>
</tr>
}

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
    <div className='w-full pb-[500px]'>
      <div className='relative w-full'>
        <img src='/Rectangle 25.png' alt='' className='w-full object-contain'/>
        <div className='absolute inset-0 text-white items-center justify-center flex flex-col '>
          <h1 className='text-[48px] font-medium'>Detail</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      <div className='w-main mx-auto my-8'>
        {propertyDetail?.images &&
        <PropertyImage images = {propertyDetail?.images}/>
        }
        <div className='grid grid-cols-10 gap-4 mt-8'>
          <div className='col-span-7'>
            <h1 className='font-bold text-2xl line-clamp-2'>{propertyDetail?.name}</h1>
            <span className='flex items-center gap-3'>
              <FaMapMarkerAlt size={18} color='#2C3A61'/>
              <span>{propertyDetail?.address}</span>
            </span>
            <div className='my-4' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(propertyDetail?.description)}}></div>
            <div>
              <h3 className='font-bold text-lg'>
                Property Information
              </h3>
              <table className='w-full my-4 table-fixed'>
                <thead>
                  <tr>
                    <th className='border p-3 text-center bg-main-300'>Property Features</th>
                    <th className='border p-3 text-center bg-main-300'>Value</th>
                    <th className='border p-3 text-center bg-main-300'>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <Info title='Price' value={propertyDetail?.price} unit='USD'/>
                  <Info title='Size' value={propertyDetail?.size} unit={<span>m<sup>2</sup></span>}/>
                  <Info title='Property Type' value={propertyDetail?.rPropertyType?.name} />
                  <Info title='Year Built' value={propertyDetail?.yearBuilt} />
                  <Info title='Listing Type' value={propertyDetail?.listingType} />
                  <Info title='Bathroom' value={propertyDetail?.bathRoom} unit='room (s)'/>
                  <Info title='Bedroom' value={propertyDetail?.bedRoom} unit='room (s)'/>
                  <Info title='Available' value={propertyDetail?.isAvailable ? 'Yes' : 'No'} />
                  <Info title='Posting Date' value={moment(propertyDetail?.createdAt).format('DD-MM-YYYY')} />
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-span-3 flex flex-col gap-6'>
            <BoxInfo role='Agent' roleStyle='text-green-600' data={propertyDetail?.rPostedBy}/>
            <BoxInfo role='Owner' roleStyle='text-red-600' data={propertyDetail?.rOwner}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(PropertyDetail)