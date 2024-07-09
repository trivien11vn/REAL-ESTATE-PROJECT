import React, { useEffect, useState } from 'react'
import { apiGetLongitudeAndLatitudeFromAddress } from 'src/apis/beyond'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const Map = ({address='', zoom=12}) => {
  const [center, setCenter] = useState(null)

  useEffect(() => {
    const fetchCenter = async () => {
      const response = await apiGetLongitudeAndLatitudeFromAddress(address)
      if (response.status === 200 && response?.data?.features?.length > 0) {
        console.log('222')
        setCenter([
          response?.data?.features[0]?.geometry?.coordinates[1],
          response?.data?.features[0]?.geometry?.coordinates[0]
        ])
      } else {
        window.navigator.geolocation.getCurrentPosition((position) => { 
          setCenter([position?.coords?.latitude, position?.coords?.longitude])
        })
      }
    }

    if (address) {
      console.log('111')
      fetchCenter()
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => { 
        setCenter([position?.coords?.latitude, position?.coords?.longitude])
      })
    }
  }, [address])

  useEffect(() => {
    console.log('Center updated:', center)
  }, [center])

  return (
    <div className='w-full h-[300px]'>
      {center &&  
      <MapContainer
        center={center}
        zoom={zoom}
        className='w-full h-full'
        scrollWheelZoom={false}
      >
        <TileLayer url={url} attribution={attribution} />
        <Marker position={center}>
          <Popup>
            {address}
          </Popup>
        </Marker>
      </MapContainer>}
    </div>
  )
}

export default Map
