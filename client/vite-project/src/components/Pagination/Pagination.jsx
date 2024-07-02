import React from 'react'
import usePagination from 'src/hooks/usePagination'

const Pagination = () => {
  const pagination = usePagination({total: 23, currentPage: 9, limit: 2, sibling:0})
  console.log(pagination)
  return (
    <div>Pagination</div>
  )
}

export default Pagination