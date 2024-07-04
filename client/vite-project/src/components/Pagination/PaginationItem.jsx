import clsx from 'clsx'
import React from 'react'
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom'
import withRouter from 'src/hocs/withRouter'
import { twJoin, twMerge } from 'tailwind-merge'

const PaginationItem = ({content, page, navigate, location}) => {
  const [searchParams] = useSearchParams()
  const handleChangePage = () => { 
    const params = Object.fromEntries([...searchParams])
    if(params.price){
      params.price = searchParams.getAll('price')
    }
    params.page = content
    navigate({
      pathname: location?.pathname,
      search: createSearchParams(params).toString(),
    })
   }
  if(!Number(content)){
    return <div className='w-10 h-10 rounded-sm bg-main-50 text-main-500 flex items-end justify-center'>
            {content}
          </div>
  }
  return (
    <button type='button' onClick={handleChangePage} className={twMerge(clsx('cursor-pointer w-10 h-10 rounded-sm bg-main-50 text-main-500 flex items-center justify-center font-bold', !page && +content === 1 && 'bg-main-500 text-white', +page && +content === +page && 'bg-main-500 text-white' ))}>{content}</button>
  )
}

export default withRouter(PaginationItem)