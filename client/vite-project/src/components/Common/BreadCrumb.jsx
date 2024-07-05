import clsx from 'clsx';
import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import withRouter from 'src/hocs/withRouter';
import { twMerge } from 'tailwind-merge';
import useBreadcrumbs from "use-react-router-breadcrumbs";

const DynamicBreadcrumbs = ({ location }) => {
  return <span>{location?.state?.name}</span>
}
const breadcrumbRoutes = [
    { path: "/", breadcrumb: 'Home' },
    { path: "/properties", breadcrumb: 'Properties' },
    { path: "/properties/:id", breadcrumb: DynamicBreadcrumbs}
  ];


const BreadCrumb = () => {
    const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);
  return (
    <div className='flex'>
    {breadcrumbs.map(({ match, breadcrumb, location}, index) => (
      <NavLink className='h-5' key={match.pathname} state={{name: location?.state?.name}} to={match.pathname}>
        <span className={twMerge(clsx('hover:underline', Object.keys(match?.params).length > 0 &&  'w-[300px] line-clamp-1'))}>{breadcrumb}</span>
        <span className='px-2'>{index < breadcrumbs.length-1 && " /"}</span>
      </NavLink>
    ))}
    </div>
  )
}

export default withRouter(BreadCrumb)