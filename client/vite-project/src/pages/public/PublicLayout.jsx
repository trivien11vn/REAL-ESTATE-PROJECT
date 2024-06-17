import clsx from 'clsx'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigation, TopHeader } from 'src/components'
import withRouter from 'src/hocs/withRouter'

const PublicLayout = ({location}) => {

  return (
    <main>
      <TopHeader />
      <Navigation />
      <div className={clsx(location?.pathname === '/' ? 'pt-0' : 'pt-[170px]')}>

        <Outlet />
      </div>
    </main>
  )
}

export default withRouter(PublicLayout)