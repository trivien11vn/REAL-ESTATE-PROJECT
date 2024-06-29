import React from 'react'
import { NavLink } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";

const breadcrumbRoutes = [
    { path: "/", breadcrumb: 'Home' },
    { path: "/properties", breadcrumb: 'Properties' },
  ];


const BreadCrumb = () => {
    const breadcrumbs = useBreadcrumbs(breadcrumbRoutes);
  return (
    <React.Fragment>
    {breadcrumbs.map(({ match, breadcrumb}, index) => (
      <NavLink key={match.pathname} to={match.pathname}>
        <span className='hover:underline'>{breadcrumb}</span>
        {index < breadcrumbs.length-1 && ` / `}
      </NavLink>
    ))}
    </React.Fragment>
  )
}

export default BreadCrumb