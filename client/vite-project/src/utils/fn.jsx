export const formatMoney = (number) => {
    if(!+number){
        return 0
    }
    else{
        return Number(+number.toFixed(1)).toLocaleString()
    }
}

export const renderRangeNumber = (start, end) => { 
    const length = end - start + 1
    return Array.from({length}, (_, i) => start + i)

 }