import React, { useEffect, useState } from 'react'
import { apiGetLongitudeAndLatitudeFromAddress } from 'src/apis/beyond'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
const url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

const Map = ({address='', zoom=12}) => {
  const [center, setCenter] = useState(null)

  useEffect(() => {
    const fetchCenter = async () => {
      const response = await apiGetLongitudeAndLatitudeFromAddress(address)
      if (response.status === 200 && response?.data?.features?.length > 0) {
        setCenter([
          response?.data?.features[0]?.geometry?.coordinates[1],
          response?.data?.features[0]?.geometry?.coordinates[0]
        ])
      } 
      else {
        window.navigator.geolocation.getCurrentPosition((position) => { 
          setCenter([position?.coords?.latitude, position?.coords?.longitude])
        })
      }
    }

    if (address) {
      fetchCenter()
    } else {
      window.navigator.geolocation.getCurrentPosition((position) => { 
        console.log(position)
        setCenter([position?.coords?.latitude, position?.coords?.longitude])
      })
    }
  }, [address])

  useEffect(() => {
    console.log('Center updated:', center)
  }, [center])

const FlyMapTo = () => {

  const map = useMap()

  useEffect(() => {
      map.setView(center)
  }, [center])

  return null
}

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
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <FlyMapTo />
      </MapContainer>
      }
    </div>
  )
}

export default Map
