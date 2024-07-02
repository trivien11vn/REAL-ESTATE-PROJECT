//tra ve 1 array
import React, { useMemo } from 'react'
import { renderRangeNumber } from 'src/utils/fn'
import { BsThreeDots } from "react-icons/bs";

const usePagination = ({total = 0, currentPage = 1, limit = 1, sibling = 0}) => {
  const paginationArray = useMemo(() => { 
    // gioi han so bai dang trong moi trang
    const pageSize = +limit

    // tong so trang
    const totalPages = Math.ceil(total/pageSize)

    const totalPaginationItem = 5 + sibling*2
    if(totalPages < totalPaginationItem){
        return renderRangeNumber(1, totalPages)
    }
    const isShowLeft = currentPage - sibling > 3
    const isShowRight = currentPage + sibling < totalPages - 2

    if(isShowLeft && !isShowRight){
      const rightStart = totalPages - 2 - sibling * 2
      const rightArray = renderRangeNumber(rightStart, totalPages)
      return [1, <BsThreeDots />, ...rightArray]
    }
    if(!isShowLeft && isShowRight){
      const leftArray = renderRangeNumber(1, 3 + sibling * 2)
      return [...leftArray, <BsThreeDots />, totalPages] 
    }
     
    //
    const siblingLeft = Math.max(1, currentPage - sibling)
    const siblingRight = Math.min(totalPages, currentPage + sibling)
    
    if(isShowLeft && isShowRight){
      const middleArray = renderRangeNumber(siblingLeft, siblingRight)
      return [1,<BsThreeDots />, ...middleArray, <BsThreeDots />, totalPages]
    }
   },[total, limit, currentPage, sibling])


  return paginationArray
}

export default usePagination