import React from 'react'
import usePagination from 'src/hooks/usePagination'
import PaginationItem from './PaginationItem'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Button } from '..';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import withRouter from 'src/hocs/withRouter';

const Pagination = ({total, limit, page, sibling, navigate, location}) => {
  const pagination = usePagination({total, currentPage: page, limit, sibling})
  
  const [searchParams] = useSearchParams()
  const handleChangePrevPage = () => {
    if(+page < 1 || !page) return
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({page: page-1}).toString(),
    })
  }
  const handleChangeNextPage = () => {
    console.log(page, total, limit)
    if(+page >= Math.ceil(+total / +limit)) return
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({page: page+1}).toString(),
    })
  }
  return (
    <div className='flex items-center justify-center gap-2 '>
    <Button onClick={handleChangePrevPage} className={twMerge(clsx('bg-main-500',(!page || +page === 1) ? 'bg-overlay-50 cursor-not-allowed' : 'bg-main-500 cursor-pointer'))}>
      <FaArrowLeft size={20}/>
    </Button>
    {pagination?.map((el,idx) => (
      <PaginationItem page={searchParams?.get('page')} content={el} key={idx}/>
    ))}
    <Button onClick={handleChangeNextPage} className={twMerge(clsx('bg-main-500',(+page === Math.ceil( +total / +limit)) ? 'bg-overlay-50 cursor-not-allowed' : 'bg-main-500 cursor-pointer'))}>
      <FaArrowRight size={20}/>
    </Button>
    </div>
  )
}

export default withRouter(Pagination)