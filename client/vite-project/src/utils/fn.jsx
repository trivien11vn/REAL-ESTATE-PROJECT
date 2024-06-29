export const formatMoney = (number) => {
    if(!+number){
        return 0
    }
    else{
        return Number(+number.toFixed(1)).toLocaleString()
    }
}